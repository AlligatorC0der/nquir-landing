'use client'

import { useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [organization, setOrganization] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent, source: string = 'hero') => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('https://xu58b9raka.execute-api.us-east-1.amazonaws.com/prod/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, organization, source })
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(data.message)
        setEmail('')
        setName('')
        setOrganization('')
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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-brand-600">nquir</span>
            </div>
            <div className="flex items-center">
              <a
                href="#waitlist"
                className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 font-medium transition-colors"
              >
                Join Waitlist
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-slate-100">
        {/* Gradient orbs */}
        <div
          className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full animate-blob"
          style={{
            background: 'radial-gradient(circle, rgba(191,219,254,0.8) 0%, transparent 70%)',
            transform: 'translate(-30%, -30%)',
          }}
        />
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full animate-blob animation-delay-2000"
          style={{
            background: 'radial-gradient(circle, rgba(219,234,254,0.7) 0%, transparent 70%)',
            transform: 'translate(30%, -20%)',
          }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-[600px] h-[400px] rounded-full animate-blob animation-delay-4000"
          style={{
            background: 'radial-gradient(circle, rgba(147,197,253,0.5) 0%, transparent 70%)',
            transform: 'translateY(40%)',
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(148,163,184,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.1) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="max-w-7xl mx-auto relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
              AI-Powered Platform for Compliance-Critical Work
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Professional toolkit for structured inquiries, evidence-based assessments, and compliant reporting. Built for organizations handling sensitive matters across government, corporate, and healthcare environments.
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="#waitlist"
                className="bg-brand-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-brand-700 transition-colors shadow-lg"
              >
                Join Early Access Waitlist
              </a>
              <a
                href="#features"
                className="bg-white text-brand-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-brand-600 hover:bg-brand-50 transition-colors shadow-md"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Badges */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">
              <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-slate-700 text-sm font-medium">FedRAMP Authorized Infrastructure</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">
              <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-slate-700 text-sm font-medium">HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">
              <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-slate-700 text-sm font-medium">SOC 2 Type II</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">
              <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-slate-700 text-sm font-medium">ISO 27001</span>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Purpose-built for professionals conducting high-stakes work
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Whether you&apos;re conducting evaluations, audits, reviews, inspections, or investigations—Nquir provides the structure and tools you need for thorough, defensible work.
          </p>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
            Built for those who can&apos;t afford to miss details
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Government &amp; Public Sector</h3>
              <ul className="text-slate-600 space-y-2">
                <li>• Federal, state, and local agencies</li>
                <li>• Compliance and oversight functions</li>
                <li>• Administrative inquiries</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Corporate &amp; Private Sector</h3>
              <ul className="text-slate-600 space-y-2">
                <li>• Internal audit teams</li>
                <li>• HR investigators</li>
                <li>• Compliance officers</li>
                <li>• Risk management</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Healthcare Organizations</h3>
              <ul className="text-slate-600 space-y-2">
                <li>• Quality assurance teams</li>
                <li>• Peer review coordinators</li>
                <li>• Patient safety investigations</li>
                <li>• Regulatory compliance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Everything you need. Nothing you don&apos;t.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div>
              <div className="w-14 h-14 bg-brand-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Structured Workflow
              </h3>
              <p className="text-slate-600">
                Guide your team through proven methodologies with built-in quality controls and checkpoints.
              </p>
            </div>

            {/* Feature 2 */}
            <div>
              <div className="w-14 h-14 bg-brand-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Evidence Organization
              </h3>
              <p className="text-slate-600">
                Secure document management with proper access controls, chain of custody, and audit trails.
              </p>
            </div>

            {/* Feature 3 - AI with sparkles icon */}
            <div>
              <div className="w-14 h-14 bg-brand-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                AI-Assisted Analysis
              </h3>
              <p className="text-slate-600">
                Leverage AI to identify patterns, flag gaps, and accelerate review—while you maintain full control.
              </p>
            </div>

            {/* Feature 4 */}
            <div>
              <div className="w-14 h-14 bg-brand-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Compliance by Design
              </h3>
              <p className="text-slate-600">
                Built on FedRAMP-authorized infrastructure with HIPAA compliance, complete audit logging, and industry-standard controls.
              </p>
            </div>

            {/* Feature 5 */}
            <div>
              <div className="w-14 h-14 bg-brand-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Team Collaboration
              </h3>
              <p className="text-slate-600">
                Role-based access, shared workspaces, and coordinated workflows for multi-person engagements.
              </p>
            </div>

            {/* Feature 6 */}
            <div>
              <div className="w-14 h-14 bg-brand-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Professional Documentation
              </h3>
              <p className="text-slate-600">
                Generate properly structured reports with evidence citations and compliance-ready formatting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-8 text-center">About Nquir</h2>
          <div className="prose prose-lg mx-auto text-slate-600">
            <p className="text-lg leading-relaxed mb-6">
              Nquir is being developed by an experienced federal oversight professional and healthcare provider with over 25 years conducting high-stakes inquiries across government and healthcare settings.
            </p>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Background:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Former military officer with deep federal compliance expertise</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Product owner for multiple software solutions deployed across federal agencies</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Extensive experience in healthcare quality, administrative investigations, and oversight functions</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Why Nquir?</h3>
              <p className="text-lg leading-relaxed">
                Nquir was born from a simple insight: professionals doing critical work deserve purpose-built software that understands their unique challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Early Access CTA Section */}
      <section id="waitlist" className="py-20 bg-gradient-to-br from-brand-600 to-brand-700">
        <div className="max-w-2xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Be among the first to access Nquir
          </h2>
          <p className="text-xl text-brand-100 mb-8">
            We&apos;re currently in private beta with select organizations. Join our waitlist to be notified when we open access to new users.
          </p>

          {status === 'success' ? (
            <div className="bg-white/10 backdrop-blur rounded-xl p-8">
              <svg className="w-16 h-16 text-white mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xl text-white font-medium">{message}</p>
            </div>
          ) : (
            <form onSubmit={(e) => handleSubmit(e, 'cta-section')} className="bg-white/10 backdrop-blur rounded-xl p-8">
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <input
                  type="text"
                  placeholder="Name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <input
                  type="text"
                  placeholder="Organization (optional)"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-white text-brand-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-slate-50 transition-colors shadow-lg disabled:opacity-50"
                >
                  {status === 'loading' ? 'Submitting...' : 'Request Early Access'}
                </button>
              </div>
              {status === 'error' && (
                <p className="text-red-200 mt-4">{message}</p>
              )}
            </form>
          )}

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-white mb-4">nquir</div>
              <p className="text-sm">
                Professional platform for compliance-critical work.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#waitlist" className="hover:text-white transition-colors">Early Access</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Use Cases</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-sm text-center">
            © 2025 Nquir. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
