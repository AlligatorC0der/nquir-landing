'use client'

import { useState } from 'react'
import { PainSolutionCard, FeaturePreview } from '@/components/feature-preview'

export default function Home() {
  const [email, setEmail] = useState('')
  const [sector, setSector] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('https://xu58b9raka.execute-api.us-east-1.amazonaws.com/prod/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, sector, source: 'landing-page' })
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(data.message)
        setEmail('')
        setSector('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="bg-white text-gray-900 antialiased">
      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="text-lg font-semibold tracking-tight text-gray-900">
              nquir <span className="text-sm font-normal text-gray-400">[in-kwire]</span>
            </div>
            <a href="#waitlist" className="px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
              Join Waitlist
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="text-sm text-gray-600">Coming Q2 2026</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6 text-gray-900">
              Details hold the truth.<br />
              <span className="text-gray-400">Nquir helps you find it.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-500 max-w-xl mb-10 leading-relaxed">
              From scattered evidence to defensible report. Nquir guides your investigation from first question to final finding.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-12">
              <a href="#waitlist" className="group px-6 py-3.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Join the Waitlist
                <span className="inline-block ml-2 group-hover:translate-x-0.5 transition-transform">&rarr;</span>
              </a>
              <a href="#how-it-works" className="px-6 py-3.5 rounded-lg font-medium text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300 transition-all">
                See How It Works
              </a>
            </div>

            {/* Compliance badges */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-400">
              <span>Built on FedRAMP-authorized infrastructure</span>
              <span className="text-gray-300">&bull;</span>
              <span>HIPAA-ready architecture</span>
              <span className="text-gray-300">&bull;</span>
              <span>Designed for SOC 2 compliance</span>
            </div>
          </div>
        </div>
      </section>

      {/* Origin Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-4">Why Nquir Exists</p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-8 text-gray-900">
              Built by someone who&apos;s been in the hot seat.
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Nquir was designed by a veteran of federal oversight who has assembled evidence at midnight, defended findings to skeptical leadership, and knows what it takes to build a report that holds up under fire.
              </p>
              <div>
                <p className="mb-3">25+ years experience as:</p>
                <ul className="space-y-2 text-gray-500">
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                    A military officer
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                    Federal oversight lead
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                    A product owner for software deployed across government agencies
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-4">The Reality</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900">Sound familiar?</h2>

          <p className="text-sm text-gray-400 mb-8">Hover to see how Nquir helps →</p>
          <div className="grid md:grid-cols-2 gap-6">
            <PainSolutionCard
              icon={
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              }
              iconBg="bg-red-100"
              title="Evidence everywhere"
              pain="Documents in SharePoint. Notes in Word. Emails somewhere in Outlook. Audio on a shared drive. Good luck finding it all when leadership asks."
              solution="One secure location for all evidence. Upload once, link to questions, find instantly with semantic search."
            />

            <PainSolutionCard
              icon={
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              iconBg="bg-orange-100"
              title="Reports that take forever"
              pain="Two weeks writing. Another week of revisions. Then someone asks where finding #3 came from and you're digging through folders again."
              solution="AI drafts findings with citations already attached. Every claim traces back to evidence automatically."
            />

            <PainSolutionCard
              icon={
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              iconBg="bg-amber-100"
              title="Can't answer the question"
              pain='"What evidence supports this finding?" It&apos;s in there. You know it&apos;s in there. But articulating exactly where, right now, off the top of your head?'
              solution="Click any finding → see the exact evidence excerpts that support it. Instant traceability."
            />

            <PainSolutionCard
              icon={
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
              iconBg="bg-blue-100"
              title="The nagging worry"
              pain="That feeling you missed something. A document you didn't review closely enough. A thread you didn't pull. It keeps you up at night."
              solution="AI searches your entire evidence collection for each question. Flags gaps before you finalize."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-4">How It Works</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">From first question to final report.</h2>
          <p className="text-gray-500 text-lg max-w-2xl mb-16">Nquir guides you through a proven methodology—the same structure investigators use, now with assistance that actually helps.</p>

          {/* Workflow Steps */}
          <p className="text-sm text-gray-400 mb-8">Hover each step for details →</p>
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {/* Step 1 */}
            <FeaturePreview
              title="Planning Phase"
              description="Start with clarity. Define your scope, draft key questions, and set up the investigation structure before collecting a single document."
              details={[
                "Focus statement keeps you on track",
                "Questions guide evidence collection",
                "Background docs provide context",
                "Topics organize related questions",
              ]}
              trigger={
                <div className="group">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-lg mb-5 group-hover:bg-emerald-200 transition-colors">
                    1
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">Planning</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">Define what you&apos;re investigating and what questions need answers.</p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>&bull; Focus statement</li>
                    <li>&bull; Investigation questions</li>
                    <li>&bull; Background documents</li>
                  </ul>
                </div>
              }
            />

            {/* Step 2 */}
            <FeaturePreview
              title="Collection Phase"
              description="Gather evidence systematically. Every document, interview, and record gets cataloged and linked to the questions it helps answer."
              details={[
                "Drag-and-drop document upload",
                "Auto-extracts text for search",
                "Link evidence to specific questions",
                "Track what's collected vs. needed",
              ]}
              trigger={
                <div className="group">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-lg mb-5 group-hover:bg-emerald-200 transition-colors">
                    2
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">Collection</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">Gather evidence and link it directly to your questions.</p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>&bull; Documents &amp; records</li>
                    <li>&bull; Interview notes</li>
                    <li>&bull; Evidence linking</li>
                  </ul>
                </div>
              }
            />

            {/* Step 3 */}
            <FeaturePreview
              title="Analysis Phase"
              description="AI searches all your evidence for each question, surfaces relevant passages, and helps draft findings—with full citations."
              details={[
                "Semantic search finds relevant evidence",
                "AI drafts analysis with citations",
                "You review and edit every finding",
                "Gap detection flags weak areas",
              ]}
              trigger={
                <div className="group">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-lg mb-5 group-hover:bg-emerald-200 transition-colors">
                    3
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">Analysis</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">AI assists in connecting evidence to findings—you make the calls.</p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>&bull; Evidence synthesis</li>
                    <li>&bull; Gap identification</li>
                    <li>&bull; Self-audit checks</li>
                  </ul>
                </div>
              }
            />

            {/* Step 4 */}
            <FeaturePreview
              title="Reporting Phase"
              description="Generate polished reports where every finding links to supporting evidence. Export-ready for leadership review."
              details={[
                "Professional report templates",
                "Findings with inline citations",
                "Evidence appendix auto-generated",
                "Export to Word or PDF",
              ]}
              trigger={
                <div className="group">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-lg mb-5 group-hover:bg-emerald-200 transition-colors">
                    4
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">Reporting</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">Generate a professional report with every finding traced to evidence.</p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>&bull; Cited findings</li>
                    <li>&bull; Evidence endnotes</li>
                    <li>&bull; Export-ready</li>
                  </ul>
                </div>
              }
            />
          </div>

          {/* AI Section */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">AI that assists, not replaces.</h3>
                <p className="text-gray-500 leading-relaxed">Built-in self-audit catches potential errors and unsupported claims. You review every finding before it goes in the report. Your judgment, your conclusions—Nquir just helps you get there faster.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-4">Who It&apos;s For</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900">Built for investigators who can&apos;t afford to miss details.</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Federal */}
            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Federal Oversight</h3>
              <p className="text-gray-500 mb-6 leading-relaxed">Federal teams that need findings that hold up to scrutiny.</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>&bull; Inspector General offices</li>
                <li>&bull; Command-directed investigations</li>
                <li>&bull; Administrative inquiries</li>
              </ul>
            </div>

            {/* Healthcare */}
            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-6-6h12" />
                  <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={1.5} />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Healthcare Quality</h3>
              <p className="text-gray-500 mb-6 leading-relaxed">Clinical quality investigators and peer review coordinators handling sensitive patient care reviews.</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>&bull; Quality management</li>
                <li>&bull; Peer review boards</li>
                <li>&bull; Credentialing investigations</li>
              </ul>
            </div>

            {/* Corporate */}
            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Corporate Compliance</h3>
              <p className="text-gray-500 mb-6 leading-relaxed">HR investigators, internal auditors, and ethics officers managing sensitive workplace matters.</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>&bull; Workplace investigations</li>
                <li>&bull; Internal audit</li>
                <li>&bull; Ethics hotline reviews</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-20 bg-gray-950">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-xl">
            <p className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-4">Get Early Access</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Join the waitlist.</h2>
            <p className="text-gray-300 text-lg mb-10">Be first to know when Nquir launches. Early access members shape the product.</p>

            {status === 'success' ? (
              <div className="bg-white/10 backdrop-blur rounded-xl p-8">
                <svg className="w-16 h-16 text-emerald-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xl text-white font-medium text-center">{message}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="you@agency.gov"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3.5 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-lg bg-white/10 border border-white/10 text-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url('data:image/svg+xml;charset=US-ASCII,<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M5 8l5 5 5-5" stroke="%23666" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center'
                  }}
                >
                  <option value="" className="bg-gray-900">Select your sector (optional)</option>
                  <option value="federal" className="bg-gray-900">Federal Government</option>
                  <option value="state_local" className="bg-gray-900">State &amp; Local Government</option>
                  <option value="healthcare" className="bg-gray-900">Healthcare</option>
                  <option value="corporate" className="bg-gray-900">Corporate / Private Sector</option>
                  <option value="other" className="bg-gray-900">Other</option>
                </select>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full sm:w-auto px-8 py-3.5 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                  {status === 'loading' ? 'Submitting...' : 'Request Early Access \u2192'}
                </button>
                {status === 'error' && (
                  <p className="text-red-400 mt-2">{message}</p>
                )}
              </form>
            )}
            <p className="text-gray-500 text-sm mt-4">No spam. Just product updates.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-950 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <span className="text-lg font-semibold text-white">nquir</span>
              <span className="text-sm text-gray-500">&copy; 2026</span>
            </div>
            <div className="text-sm text-gray-500">
              Built on AWS
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
