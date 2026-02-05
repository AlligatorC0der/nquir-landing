# Postmortem: Q&A Bot Credential Failure

**Date:** 2026-02-04
**Duration:** ~4 hours
**Severity:** P1 (feature completely broken)
**Author:** Claude (AI assistant)

---

## Summary

The Q&A bot on nquir-landing stopped working due to AWS credential loading failures. The root cause was **unnecessary "fixes" applied by Claude** that broke a working system.

---

## Timeline

| Time | Event |
|------|-------|
| 11:04 | `95e720a` - Honeypot bot protection deployed. **Bot working.** |
| ~12:00 | `a2069a1` - Claude adds "lazy initialize Bedrock client" fix |
| 12:00-16:00 | 14 additional "fix" and "debug" commits attempting to resolve credential issues |
| ~16:00 | User reports bot broken with "Could not load credentials from any providers" |
| ~20:00 | Root cause identified: unnecessary changes broke working system |
| 20:13 | `7af4273` - Fix deployed: remove all changes, return to working state |

---

## Root Cause

**Claude confused two different applications with different credential patterns.**

### nquir-landing (this repo)
- **Working pattern:** Default AWS credential chain
- **How it worked:** Amplify's compute environment has an IAM role attached. The Bedrock SDK automatically uses this role via the default credential chain. No explicit credential passing needed.
- **Code:** `new AnthropicBedrock({ awsRegion: "us-east-1" })`

### investigation-app (separate repo)
- **Pattern:** Explicit credential passing via environment variables
- **How it works:** Uses `BEDROCK_ACCESS_KEY_ID`, `BEDROCK_SECRET_ACCESS_KEY` env vars passed explicitly to the SDK
- **Code:** `new AnthropicBedrock({ awsRegion, awsAccessKey, awsSecretKey })`

### What Claude Did Wrong

1. While working on investigation-app credential issues, Claude context-switched to nquir-landing
2. Claude assumed nquir-landing needed the same explicit credential pattern
3. Claude started "fixing" credential loading without verifying the bot was actually broken
4. Each "fix" made things worse, leading to a cascade of 15 commits
5. Claude never checked the git history to see the last known working state

---

## Failed Approaches (in order)

| Commit | Approach | Why It Failed |
|--------|----------|---------------|
| `a2069a1` | Lazy initialization | Unnecessary - SDK was already working |
| `f723e5d` | Add amplify.yml with env vars | Introduced new config that wasn't needed |
| `50af4d6` | Rename to BEDROCK_* prefix | Variables weren't needed at all |
| `d7fe477` | Use BEDROCK_REGION | Same issue |
| `ada8040` | Use IAM role explicitly | Was already using IAM role implicitly |
| `16115b4` | AWS SDK credential providers | Over-engineering a non-problem |
| `76cac39` | Bake credentials at build time | Build env didn't have the variables |

---

## Resolution

**Delete all the "fixes" and return to the original working state.**

The bot was working before `a2069a1`. The fix was simply:
```bash
git rm amplify.yml  # Didn't exist before today
# Restore original simple client initialization
```

Final working code:
```typescript
function getBedrockClient(): AnthropicBedrock {
  if (!client) {
    client = new AnthropicBedrock({
      awsRegion: process.env.AWS_REGION || "us-east-1",
    });
  }
  return client;
}
```

---

## Lessons Learned

### For Claude (AI Assistant)

1. **Verify the problem exists before fixing.** Ask: "Is this actually broken? What error am I seeing?"

2. **Check git history first.** Before making changes, look at recent commits and identify the last known working state.

3. **Don't conflate different applications.** Each repo may have different patterns. Don't assume what works in one applies to another.

4. **Document before fixing.** Before the first "fix" commit, document:
   - What error was observed
   - What the expected behavior is
   - What the actual behavior is

5. **Recognize fix cascades.** If you're on your 3rd+ "fix" commit for the same issue, STOP. Step back and research properly.

6. **The simplest solution is often correct.** The Bedrock SDK has sensible defaults. Don't override them without a specific reason.

### For the Codebase

1. **Add a CLAUDE.md to nquir-landing** with context about how credentials work
2. **Document infrastructure assumptions** (e.g., "Amplify provides IAM role, no explicit creds needed")

---

## Action Items

- [x] Revert to working state
- [x] Document this incident
- [ ] Add CLAUDE.md to nquir-landing with credential documentation
- [ ] Verify bot is working in production

---

## Appendix: Commit Log

```
7af4273 fix: remove amplify.yml, let SDK use default credential chain  ← RESOLUTION
ba3aaee fix: map BEDROCK_* console vars to AWS_* runtime vars
9349807 fix: revert to working credential pattern
85aca5d fix: remove unused @ts-expect-error directive
76cac39 fix: bake credentials into build via amplify.yml config file
68eeccd debug: show which BEDROCK env vars are available at runtime
16115b4 fix: use AWS SDK credential providers to fetch credentials explicitly
ada8040 fix: use IAM role credentials instead of env vars for Bedrock
d40296b debug: list all relevant env var keys
d7fe477 fix: use BEDROCK_REGION env var to avoid AWS prefix restriction
50af4d6 fix: use custom env var names to avoid AWS reserved name conflicts
f723e5d fix: add amplify.yml with env var configuration
519e15d debug: include env var status in error response
9c79e89 debug: log env var presence and pass credentials explicitly
95151d7 debug: show actual error message in chat response
a2069a1 fix: lazy initialize Bedrock client for serverless env var loading  ← FIRST BAD COMMIT
```
