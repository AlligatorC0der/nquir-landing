# Landing Page Update: Semantic Evidence Search

## Recommended Placement

Add a feature callout after the "AI that assists, not replaces" box in the How It Works section.

---

## Option A: Subtle Integration (Recommended)

Update the **Analysis** step (Step 3) bullet points:

**Current:**
- Evidence synthesis
- Gap identification  
- Self-audit checks

**Updated:**
- Evidence synthesis across all documents
- Automatic gap identification
- Self-audit checks

And add this callout box after the existing "AI that assists" box:

```jsx
{/* Evidence Intelligence Section */}
<div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-10 mt-6">
  <div className="flex flex-col md:flex-row md:items-center gap-6">
    <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0">
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Nothing falls through the cracks.</h3>
      <p className="text-gray-500 leading-relaxed">
        Nquir searches your entire evidence collection—every document, every transcript, every note—to surface what's relevant. No more wondering if you missed something buried on page 47.
      </p>
    </div>
  </div>
</div>
```

---

## Option B: More Prominent Feature

If you want to emphasize this more, add a dedicated section after "How It Works":

```jsx
{/* Evidence Intelligence Section */}
<section className="py-20">
  <div className="max-w-5xl mx-auto px-6">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-4">
          Intelligent Evidence Retrieval
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
          Your evidence tells the story.<br />
          <span className="text-gray-400">Nquir helps you hear it.</span>
        </h2>
        <p className="text-gray-500 text-lg leading-relaxed mb-6">
          When you ask a question, Nquir doesn't just search for keywords. It understands 
          meaning—finding relevant passages across hundreds of documents, even when the 
          exact words don't match.
        </p>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span className="text-gray-600">AI considers all your evidence, not just what you remembered to link</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span className="text-gray-600">Full audit trail shows exactly what evidence informed each finding</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span className="text-gray-600">Works the same whether you have 10 documents or 10,000</span>
          </li>
        </ul>
      </div>
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
        <div className="text-sm text-gray-400 uppercase tracking-wider mb-4">How it works</div>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0 text-sm font-semibold text-gray-600">1</div>
            <div>
              <p className="font-medium text-gray-900">Upload your evidence</p>
              <p className="text-sm text-gray-500">Documents are processed automatically in the background</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0 text-sm font-semibold text-gray-600">2</div>
            <div>
              <p className="font-medium text-gray-900">Ask your question</p>
              <p className="text-sm text-gray-500">Nquir finds semantically relevant passages</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0 text-sm font-semibold text-gray-600">3</div>
            <div>
              <p className="font-medium text-gray-900">Review the analysis</p>
              <p className="text-sm text-gray-500">See exactly which evidence supports each point</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

## Option C: Pain Point Enhancement

Update the existing "The nagging worry" pain point card to set up the solution:

**Current:**
> That feeling you missed something. A document you didn't review closely enough. A thread you didn't pull. It keeps you up at night.

**Keep as-is** - it already sets up the problem perfectly. The semantic search feature IS the answer to this pain point.

---

## Messaging Notes

**DO say:**
- "Searches your entire evidence collection"
- "Surfaces what's relevant"
- "Nothing falls through the cracks"
- "Full audit trail"
- "Works across all your documents"

**DON'T say:**
- "Vector search" / "semantic embeddings" (too technical)
- "AI understands everything" (overpromise)
- "Replaces manual review" (investigators want to feel in control)
- "Real-time" (there's processing time)

---

## Recommendation

Go with **Option A** for now. It's the lightest touch and reinforces your existing messaging without adding a whole new section. You can expand to Option B after launch if semantic search becomes a key differentiator in sales conversations.

The landing page already handles the "nothing missed" narrative well in the pain points. The feature callout just closes the loop.

---
---

# Appendix: Explaining Vector Search to Non-Technical Users

_Last updated: 2026-02-01_

---

## The Problem with the Word "Search"

When users hear "search," they think Ctrl+F or Google—type keywords, get matches. That's **keyword search**: the computer looks for the exact words you typed.

Semantic/vector search is **not better search**. It's a fundamentally different way of organizing and understanding how information relates to other information.

---

## The Mental Model That Works

**Traditional database:** A filing cabinet. Every document goes in a labeled folder. To find something, you need to know the label or look through every folder.

**Vector database:** A map of meaning. Every piece of information gets a location based on *what it means*, not what folder it's in. Similar ideas cluster together automatically—without anyone having to decide they're related.

Imagine a library where books aren't organized by author or title, but by *what they're actually about*. A book about "workplace stress" would be shelved near books about "burnout," "mental health at work," and "employee wellbeing"—even if none of them share the same words in their titles. You didn't have to create those connections. They emerged from the meaning.

---

## Why "Better Search" Undersells This

The real shift isn't finding things faster. It's three capabilities that keyword search fundamentally cannot provide:

### 1. Discovering Connections You Didn't Know Existed

With keyword search, you only find what you thought to look for. You search "overtime" and find documents with "overtime."

With semantic search, you discover that a paragraph about "feeling pressured to stay past my shift" is conceptually related to your overtime question—even though the word never appears. You didn't have to anticipate that phrasing. The system understood the relationship.

**For investigations:** This means finding corroborating or contradicting evidence you didn't know to look for.

### 2. Quantitative Analysis of Evidence Relationships

Every retrieved passage comes with a **relevance score** (0.0 to 1.0) representing how semantically close it is to your question. This unlocks analysis that was previously impossible:

- "Question 3 drew from evidence across 8 of 12 sources, while Question 1 relied heavily on just 2 sources."
- "No passages scored above 0.65 for this question—you may be missing evidence."
- "These 3 passages from different interviews cluster together semantically—they may be describing the same incident from different perspectives."

**For investigations:** You can now *measure* your evidence coverage, not just assert it.

### 3. Defensible Audit Trail with Metrics

When leadership asks "did you consider all the evidence?"—you can now show them:

- Exactly which passages the AI analyzed for each question
- Their relevance scores
- Which source documents they came from
- What was included vs. excluded and why

**For investigations:** Not "I think I reviewed everything" but "here are the 47 passages above 70% relevance that informed this finding."

---

## The "Aha" Explanation for Investigators

> "You know how you read a 50-page transcript and later can't remember where someone mentioned the thing you're looking for? Nquir remembers. Not just the words—the *meaning*.
>
> When you upload a document, we don't just store the text. We convert every passage into a mathematical representation of what it means. Similar ideas get similar coordinates—like plotting points on a map.
>
> When you run analysis on a question, we search that entire map for passages that are *conceptually close* to what you're asking—even if the exact words don't match.
>
> And here's what makes it different from search: we can *measure* those relationships. We can tell you 'this passage is 87% relevant to your question.' We can show you which evidence clusters together. We can identify gaps where no passages score above a threshold.
>
> It's not searching for your words. It's mapping the meaning of your evidence—and giving you a way to navigate it."

---

## The Quantitative Edge (What Makes It "Cool")

For someone who understands the investigator mindset, here's what vector infrastructure enables:

| Capability | Keyword Search | Semantic/Vector Search |
|------------|---------------|----------------------|
| Find exact phrases | ✅ Yes | ✅ Yes |
| Find synonyms/related concepts | ❌ No | ✅ Yes |
| Discover unexpected connections | ❌ No | ✅ Yes |
| Measure relevance quantitatively | ❌ No | ✅ Yes (0.0-1.0 scores) |
| Audit trail of what was considered | ❌ No | ✅ Yes |
| Coverage analysis across sources | ❌ No | ✅ Yes |
| Gap detection (weak matches = missing evidence) | ❌ No | ✅ Yes |
| Cross-reference discovery | ❌ No | ✅ Yes |

The paradigm shift: **From "did I find the right documents?" to "how does my evidence relate to my questions—and can I measure it?"**

---

## Example: Same Question, Different Paradigms

**Investigation question:** "Did employees report concerns about working conditions?"

**Keyword search approach:**
- Search "working conditions" → 3 hits
- Search "concerns" → 12 hits  
- Search "complaints" → 5 hits
- Manually read and decide which are relevant
- Hope you picked the right keywords

**Vector search approach:**
- System finds 47 passages semantically related to "concerns about working conditions"
- Includes: "I told my supervisor the schedule was unsustainable" (0.82 relevance)
- Includes: "Several of us talked about leaving" (0.71 relevance)
- Includes: "The building was always too cold" (0.54 relevance—maybe not relevant, low score)
- You see exactly what was considered and how relevant each passage was
- You can defend your analysis: "The AI reviewed 47 passages across 8 documents. Here's what informed the finding."

---

## Technical Accuracy Notes (For Marketing Copy)

**Accurate claims:**
- "Understands meaning, not just keywords"
- "Finds relevant passages even without exact word matches"
- "Searches your entire evidence collection automatically"
- "Provides relevance scores for transparency"
- "Creates audit trail of what evidence was considered"
- "Enables quantitative analysis of evidence relationships"

**Avoid these claims:**
- "Understands everything perfectly" (it's similarity-based, not comprehension)
- "Never misses anything" (there's a relevance threshold)
- "100% accurate" (no AI system should claim this)
- "Reads documents like a human" (it's mathematical similarity, not reading)
- "Real-time" (there's processing time for embedding)

---

## The Elevator Pitch (30 seconds)

> "Traditional search finds documents with your keywords. Nquir understands what you're asking and finds relevant passages even when the words don't match.
>
> But here's what really matters: we can *measure* those relationships. Every piece of evidence gets a relevance score. You can see exactly what informed each finding. You can prove you considered all the evidence—not just assert it.
>
> That's the difference between searching for words and mapping the meaning of your evidence."

---

## The Investigator Pitch (2 minutes)

> "Here's the problem with how we currently work: You collect 200 pieces of evidence. You read through them—or try to. You make mental notes. Then when you're writing your analysis, you try to remember where you saw that thing about the policy violation.
>
> Maybe you find it. Maybe you don't. Maybe you miss something important buried on page 47 of an interview transcript. And when leadership asks 'did you consider all the evidence?' you say yes, but you're not 100% sure.
>
> Nquir changes that fundamentally.
>
> When you upload evidence, we don't just store it—we convert it into a mathematical map of meaning. Every passage gets a location based on what it's about. Similar ideas end up near each other automatically.
>
> When you run analysis on a question, we don't just look at what you manually linked. We search that entire map for anything conceptually relevant. The AI sees passages you might have forgotten about. It finds connections across documents you didn't realize were related.
>
> And here's the real difference: everything is quantified. Every passage has a relevance score. You can see 'this interview segment is 84% relevant to Question 2.' You can measure which sources informed which findings. You can identify gaps—if no passages score above 70%, maybe you're missing evidence.
>
> So when leadership asks 'did you consider all the evidence?'—you don't just say yes. You show them: 'Here are the 47 passages above 70% relevance that the AI analyzed for this finding. They came from 8 different sources. Here's the full audit trail.'
>
> That's not better search. That's a fundamentally different way of working with evidence."

---

## Reference: How It Actually Works (For Your Own Understanding)

1. **Embedding**: Text is converted to vectors (arrays of ~1000 numbers) using an AI model. These numbers represent the text's semantic meaning in a mathematical space.

2. **Storage**: Vectors are stored in a way that makes similar vectors easy to find (using algorithms like HNSW—think of it as organizing the vectors into a navigable map).

3. **Query**: When you ask a question, your question is also converted to a vector.

4. **Search**: The database finds vectors that are "close" to your question's vector in that mathematical space. Closeness = similarity in meaning.

5. **Scoring**: Each result includes a similarity score (0.0-1.0) representing how semantically close it is.

6. **Retrieval**: The original text passages for those vectors are returned, along with their scores and source locations.

The magic is in step 1: modern AI models are remarkably good at putting semantically similar text into similar vector locations. "Overtime violations" and "pressured to stay past my shift" end up near each other in vector space because they're about the same concept—even though they share no words.

---

## The Paradigm in One Sentence

> **Keyword search asks: "Where did I put that document?"**
> **Semantic search asks: "What does my evidence say about this question—and how can I measure it?"**
