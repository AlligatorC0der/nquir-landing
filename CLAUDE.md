# Claude Context for nquir-landing

## What This Is

Marketing landing page for Nquir with an AI-powered FAQ chatbot.

**This is NOT the main investigation-app.** Different repo, different patterns.

---

## Critical: How Credentials Work

**The Bedrock SDK uses the default AWS credential chain. DO NOT override this.**

```typescript
// CORRECT - let SDK use IAM role from Amplify compute environment
new AnthropicBedrock({ awsRegion: "us-east-1" })

// WRONG - don't explicitly pass credentials
new AnthropicBedrock({ awsAccessKey: "...", awsSecretKey: "..." })
```

Amplify's SSR compute environment has an IAM role attached that grants Bedrock access. The SDK automatically discovers and uses this role. No `amplify.yml` environment variables needed.

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
