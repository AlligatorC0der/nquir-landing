# CloudWatch Alarm for Bedrock Usage Spikes
# Alerts when FAQ bot usage exceeds expected thresholds

variable "alert_email" {
  description = "Email address for alarm notifications"
  type        = string
}

variable "alarm_threshold_per_hour" {
  description = "Number of Bedrock invocations per hour to trigger alarm"
  type        = number
  default     = 500 # ~$0.50/hour, adjust based on expected traffic
}

# SNS Topic for alerts
resource "aws_sns_topic" "bedrock_alerts" {
  name = "nquir-landing-bedrock-alerts"
}

resource "aws_sns_topic_subscription" "email" {
  topic_arn = aws_sns_topic.bedrock_alerts.arn
  protocol  = "email"
  endpoint  = var.alert_email
}

# CloudWatch Alarm for high invocation rate
resource "aws_cloudwatch_metric_alarm" "bedrock_invocations_high" {
  alarm_name          = "nquir-landing-bedrock-high-usage"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 1
  metric_name         = "Invocations"
  namespace           = "AWS/Bedrock"
  period              = 3600 # 1 hour
  statistic           = "Sum"
  threshold           = var.alarm_threshold_per_hour
  alarm_description   = "Bedrock invocations exceeded ${var.alarm_threshold_per_hour}/hour - possible bot abuse"

  dimensions = {
    ModelId = "anthropic.claude-3-haiku-20240307-v1:0"
  }

  alarm_actions = [aws_sns_topic.bedrock_alerts.arn]
  ok_actions    = [aws_sns_topic.bedrock_alerts.arn]

  tags = {
    Project     = "nquir-landing"
    Environment = "production"
  }
}

# CloudWatch Alarm for sudden spike (short-term burst)
resource "aws_cloudwatch_metric_alarm" "bedrock_invocations_spike" {
  alarm_name          = "nquir-landing-bedrock-spike"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 1
  metric_name         = "Invocations"
  namespace           = "AWS/Bedrock"
  period              = 300 # 5 minutes
  statistic           = "Sum"
  threshold           = 100 # 100 requests in 5 minutes = bot attack
  alarm_description   = "Sudden spike in Bedrock invocations - likely bot attack"

  dimensions = {
    ModelId = "anthropic.claude-3-haiku-20240307-v1:0"
  }

  alarm_actions = [aws_sns_topic.bedrock_alerts.arn]

  tags = {
    Project     = "nquir-landing"
    Environment = "production"
  }
}

# Output the SNS topic ARN
output "alerts_topic_arn" {
  value       = aws_sns_topic.bedrock_alerts.arn
  description = "SNS topic ARN for Bedrock usage alerts"
}
