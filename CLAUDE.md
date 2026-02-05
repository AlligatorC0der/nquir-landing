# Claude Context for nquir-landing

## What This Is

Marketing landing page for Nquir with an AI-powered FAQ chatbot.

**This is NOT the main investigation-app.** Different repo, different patterns.

---

## Critical: How Credentials Work

**Amplify Console env vars do NOT reach SSR Lambda runtime.** Credentials are baked at build time.

```typescript
// Credentials imported from build-time generated file
import credentials from "@/lib/bedrock-credentials";

const client = new AnthropicBedrock({
  awsRegion: credentials.region,
  awsAccessKey: credentials.accessKeyId,
  awsSecretKey: credentials.secretAccessKey,
});
```

**How it works:**
1. `BEDROCK_ACCESS_KEY_ID`, `BEDROCK_SECRET_ACCESS_KEY`, `BEDROCK_REGION` set in Amplify Console
2. `amplify.yml` generates `lib/bedrock-credentials.js` during build with actual values
3. File gets bundled with Next.js SSR build
4. Route imports credentials from bundled file at runtime

**Do NOT** rely on `process.env.BEDROCK_*` at runtime - they won't be available.

---

## Before Making Changes

1. **Verify the problem exists.** Don't fix what isn't broken.
2. **Check git history.** Find the last known working state.
3. **Don't apply patterns from investigation-app.** That repo uses explicit credential passing. This one doesn't need it.

---

## Key Files

| File | Purpose |
|------|---------|
| `app/api/chat/route.ts` | FAQ chatbot API endpoint |
| `content/faq-knowledge.md` | Knowledge base for the bot |
| `components/chat-widget.tsx` | Frontend chat UI |

---

## Recent Incident

See `docs/postmortem-2026-02-04-credential-cascade.md` for details on a self-inflicted outage caused by unnecessary "fixes" to credential loading.
