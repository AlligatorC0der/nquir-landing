import { NextRequest, NextResponse } from "next/server";
import AnthropicBedrock from "@anthropic-ai/bedrock-sdk";
import { readFileSync } from "fs";
import { join } from "path";

// Load FAQ knowledge at startup
let faqKnowledge: string;
try {
  faqKnowledge = readFileSync(
    join(process.cwd(), "content", "faq-knowledge.md"),
    "utf-8"
  );
} catch {
  faqKnowledge =
    "Nquir is an AI-powered platform for compliance-critical work.";
}

// AWS credentials are resolved in this order:
// 1. Explicit env vars: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
// 2. AWS_PROFILE for SSO/named profiles
// 3. IAM role (automatic on Amplify/EC2/Lambda)
const client = new AnthropicBedrock({
  awsRegion: process.env.AWS_REGION || "us-east-1",
  // Optional: explicit credentials (SDK uses credential chain if not provided)
  ...(process.env.AWS_ACCESS_KEY_ID && {
    awsAccessKey: process.env.AWS_ACCESS_KEY_ID,
    awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
    awsSessionToken: process.env.AWS_SESSION_TOKEN,
  }),
});

const SYSTEM_PROMPT = `You are a helpful FAQ assistant for Nquir, an AI-powered platform for compliance-critical work.

Your role:
- Answer questions about Nquir's features, pricing, compliance, and use cases
- Be professional, concise, and helpful
- If you don't know something specific, suggest joining the waitlist to learn more
- Never make up features or pricing that aren't in your knowledge base
- Keep responses brief (2-4 sentences unless more detail is clearly needed)

Knowledge Base:
${faqKnowledge}

Important:
- Stay on topic about Nquir and compliance work
- For detailed technical questions, recommend joining the waitlist
- Be warm but professional - this is for government and healthcare professionals`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { message, history = [] } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Build conversation history for context
    const messages: Message[] = [
      ...history.slice(-6), // Keep last 6 messages for context
      { role: "user" as const, content: message },
    ];

    const response = await client.messages.create({
      model: "anthropic.claude-3-haiku-20240307-v1:0",
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: messages,
    });

    const assistantMessage =
      response.content[0].type === "text"
        ? response.content[0].text
        : "I'm sorry, I couldn't process that request.";

    return NextResponse.json({
      message: assistantMessage,
      conversationId: Date.now().toString(),
    });
  } catch (error) {
    console.error("Chat API error:", error);

    // Provide helpful fallback
    return NextResponse.json({
      message:
        "I'm having trouble connecting right now. For questions about Nquir, please join our waitlist and our team will be happy to help!",
      error: true,
    });
  }
}
