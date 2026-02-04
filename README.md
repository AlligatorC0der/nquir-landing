# nquir.ai Landing Page

Marketing website for nquir.ai investigation management platform.

## Tech Stack

- **Framework**: Next.js 14 (App Router, SSR)
- **Styling**: Tailwind CSS
- **AI**: AWS Bedrock (Claude Haiku for FAQ bot)
- **Deployment**: AWS Amplify (WEB_COMPUTE)

## Features

- Landing page with product information
- AI-powered FAQ chat bot (floating widget)
- Waitlist signup

## Development

```bash
# Install dependencies
npm install

# Copy env template
cp .env.example .env.local
# Edit .env.local with your AWS credentials

# Run dev server
npm run dev

# Build
npm run build
```

The site will be available at `http://localhost:3000`

## Environment Variables

```bash
# Required
AWS_REGION=us-east-1

# For local development (choose one):

# Option 1: Access keys
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret

# Option 2: SSO profile
AWS_PROFILE=your-sso-profile

# Option 3: On Amplify - uses IAM role automatically (no env vars needed)
```

## Deployment to AWS Amplify

### 1. Create Amplify App

- Go to AWS Amplify Console
- Click "New app" → "Host web app"
- Connect to your Git repository
- **Important**: Select "SSR" (not static) for platform

### 2. Configure Build Settings

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

### 3. Environment Variables (Amplify Console)

```
AWS_REGION=us-east-1
```

Note: Amplify uses its IAM role for Bedrock access. Make sure the Amplify service role has `bedrock:InvokeModel` permission for `anthropic.claude-3-haiku-*`.

### 4. IAM Role Policy

Add this to your Amplify service role:

```json
{
  "Effect": "Allow",
  "Action": "bedrock:InvokeModel",
  "Resource": "arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-haiku-*"
}
```

### 5. Custom Domain

- Domain management → Add domain
- Add `nquir.ai`
- Configure DNS records (provided by Amplify)

## Project Structure

```
nquir-landing/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts    # FAQ bot API endpoint
│   ├── layout.tsx          # Root layout + chat widget
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles
├── components/
│   └── chat-widget.tsx     # Floating chat UI
├── content/
│   └── faq-knowledge.md    # FAQ bot knowledge base
├── public/                 # Static assets
├── .env.example            # Environment template
├── next.config.js          # Next.js config
├── tailwind.config.js      # Tailwind config
└── package.json
```

## FAQ Bot

The FAQ bot uses:
- **Model**: Claude 3 Haiku (fast, cheap)
- **Knowledge**: `content/faq-knowledge.md`
- **Context**: Last 6 messages for conversation continuity
- **Fallback**: Graceful error handling suggests joining waitlist

To update FAQ content, edit `content/faq-knowledge.md`.

## Notes

- Uses SSR mode (not static export) to support the chat API
- Chat widget appears on all pages (bottom-right corner)
- Login/Signup buttons link to `app.nquir.ai` subdomain
