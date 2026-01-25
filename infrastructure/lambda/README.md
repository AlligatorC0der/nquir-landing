# nquir-waitlist-handler Lambda

Handles waitlist signups from the nquir.ai landing page.

## Infrastructure

- **Function Name:** `nquir-waitlist-handler`
- **Runtime:** Node.js 22.x
- **Region:** us-east-1
- **API Gateway:** https://xu58b9raka.execute-api.us-east-1.amazonaws.com/prod/waitlist

## Dependencies

Uses AWS SDK v3 (included in Lambda runtime):
- `@aws-sdk/client-dynamodb`
- `@aws-sdk/client-ses`

## Environment Variables

- `NOTIFY_EMAIL` - Email address for signup notifications (default: joe.etherage@gmail.com)

## DynamoDB Table

- **Table Name:** `nquir-waitlist`
- **Partition Key:** `email` (String)

## Deployment

To update the Lambda function:

```bash
# Zip the code
cd infrastructure/lambda
zip function.zip index.mjs

# Deploy
aws lambda update-function-code \
  --function-name nquir-waitlist-handler \
  --zip-file fileb://function.zip

# Clean up
rm function.zip
```

## Version History

- **2026-01-25:** Upgraded runtime from nodejs20.x to nodejs22.x
- **2026-01-23:** Initial deployment
