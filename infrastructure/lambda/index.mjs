import { DynamoDBClient, PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const dynamodb = new DynamoDBClient({ region: "us-east-1" });
const ses = new SESClient({ region: "us-east-1" });

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "joe.etherage@gmail.com";
const TABLE_NAME = "nquir-waitlist";

export const handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };

  // Handle CORS preflight
  if (event.requestContext?.http?.method === "OPTIONS" || event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { email, name, organization, source } = body;

    if (!email || !email.includes("@")) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Valid email is required" })
      };
    }

    // Check if already exists
    const existing = await dynamodb.send(new GetItemCommand({
      TableName: TABLE_NAME,
      Key: { email: { S: email.toLowerCase() } }
    }));

    if (existing.Item) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: "You're already on the waitlist!", existing: true })
      };
    }

    // Store in DynamoDB
    const timestamp = new Date().toISOString();
    await dynamodb.send(new PutItemCommand({
      TableName: TABLE_NAME,
      Item: {
        email: { S: email.toLowerCase() },
        name: { S: name || "" },
        organization: { S: organization || "" },
        source: { S: source || "landing-page" },
        createdAt: { S: timestamp }
      }
    }));

    // Send notification email
    try {
      await ses.send(new SendEmailCommand({
        Source: NOTIFY_EMAIL,
        Destination: { ToAddresses: [NOTIFY_EMAIL] },
        Message: {
          Subject: { Data: "New Nquir Waitlist Signup: " + email },
          Body: {
            Text: {
              Data: "New waitlist signup:\n\nEmail: " + email + "\nName: " + (name || "Not provided") + "\nOrganization: " + (organization || "Not provided") + "\nSource: " + (source || "landing-page") + "\nTime: " + timestamp
            }
          }
        }
      }));
    } catch (sesError) {
      console.error("SES error (non-fatal):", sesError);
      // Don't fail the request if email fails
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "You're on the list! We'll be in touch soon.", success: true })
    };

  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Something went wrong. Please try again." })
    };
  }
};
