# nquir.ai Landing Page

Marketing website for nquir.ai investigation management platform.

## Tech Stack

- **Framework**: Next.js 14 (App Router, Static Export)
- **Styling**: Tailwind CSS
- **Deployment**: AWS Amplify (static hosting)

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build static site
npm run build
```

The site will be available at `http://localhost:3000`

## Deployment to AWS Amplify

### Option 1: Amplify Console (Recommended)

1. **Create new Amplify app**:
   - Go to AWS Amplify Console
   - Click "New app" → "Host web app"
   - Connect to your Git repository

2. **Configure build settings**:
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
       baseDirectory: out
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

3. **Deploy**:
   - Branch: `main`
   - Auto-deploy: Enabled
   - Framework: Next.js - SSG

4. **Custom domain** (after first deploy):
   - Domain management → Add domain
   - Add `nquir.ai`
   - Configure DNS records (provided by Amplify)

### Option 2: Amplify CLI

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize Amplify
amplify init

# Add hosting
amplify add hosting
# Choose: Hosting with Amplify Console
# Choose: Manual deployment

# Build and publish
npm run build
amplify publish
```

## Environment

No environment variables required for this static site.

The login/signup CTAs point to `https://app.nquir.ai` (update when production app is live).

## Project Structure

```
nquir-landing/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Landing page
│   └── globals.css      # Global styles
├── public/              # Static assets
├── next.config.js       # Next.js config (static export)
├── tailwind.config.js   # Tailwind config
└── package.json
```

## Notes

- This is a static export (`output: 'export'` in next.config.js)
- Perfect for Amplify's static hosting (cheap, fast)
- No server-side rendering or API routes
- Login/Signup buttons link to `app.nquir.ai` subdomain
