import { CheckCircle2, Circle, Search } from 'lucide-react'
import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { getReportByReference } from '../../services/firebase/reports.js'

const statuses = ['submitted', 'under_review', 'assigned', 'in_progress', 'resolved']
const labels = { submitted: 'Submitted', under_review: 'Under review', assigned: 'Assigned', in_progress: 'In progress', resolved: 'Resolved', rejected: 'Rejected' }

export default function TrackPage() {
  const [searchParams] = useSearchParams()
  const [reference, setReference] = useState(searchParams.get('reference') || '')
  const [report, setReport] = useState(null)
  const [message, setMessage] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const { user, isFirebaseConfigured } = useAuth()
  async function handleSubmit(event) {
    event.preventDefault(); setMessage(null); setReport(null)
    if (!user) { setMessage('Sign in to look up reports submitted from your account.'); return }
    if (!isFirebaseConfigured) { setMessage('Firebase configuration is required before reports can be tracked.'); return }
    setIsSearching(true)
    try { const result = await getReportByReference({ userId: user.uid, referenceId: reference.trim().toUpperCase() }); if (result) setReport(result); else setMessage('No report was found with that reference ID in your account.') } catch { setMessage('We could not load this report. Please try again.') } finally { setIsSearching(false) }
  }
  const activeIndex = report ? statuses.indexOf(report.status) : -1
  return <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14"><p className="text-sm font-semibold text-brand-green-700">Complaint tracking</p><h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Track your complaint</h1><p className="mt-3 text-slate-600">Enter the reference ID provided after you submitted a report.</p><form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft sm:flex-row sm:p-6"><label className="sr-only" htmlFor="reference">Complaint reference ID</label><input id="reference" required value={reference} onChange={(event) => setReference(event.target.value.toUpperCase())} placeholder="Example: WTF-AB12CD34" className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-3 font-mono uppercase focus:border-brand-green-600 focus:outline-none focus:ring-2 focus:ring-brand-green-100" /><button disabled={isSearching} className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-green-600 px-5 py-3 font-semibold text-white hover:bg-brand-green-700 disabled:opacity-60"><Search className="h-4 w-4" aria-hidden="true" />{isSearching ? 'Checking…' : 'Track report'}</button></form>{message && <p className="mt-4 rounded-lg bg-slate-100 px-4 py-3 text-sm text-slate-700" role="status">{message}{!user && <> <Link to="/login" className="font-semibold text-brand-green-700 underline">Sign in or register</Link>.</>}</p>}{report && <article className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft sm:p-7"><div className="flex flex-col justify-between gap-2 sm:flex-row"><div><p className="text-sm font-medium text-slate-500">Reference ID</p><p className="font-mono font-bold text-slate-900">{report.referenceId}</p></div><span className="w-fit rounded-full bg-brand-green-50 px-3 py-1 text-sm font-semibold text-brand-green-700">{labels[report.status] || report.status}</span></div><h2 className="mt-6 text-xl font-bold text-slate-900">{report.category}</h2><p className="mt-2 text-slate-600">{report.description}</p><p className="mt-3 text-sm text-slate-500">Location: {report.location}</p>{report.status === 'rejected' ? <p className="mt-6 rounded-lg bg-red-50 p-3 text-sm text-brand-red-600">This report was rejected.</p> : <ol className="mt-7 space-y-4">{statuses.map((status, index) => <li key={status} className="flex items-center gap-3 text-sm"><span className={index <= activeIndex ? 'text-brand-green-600' : 'text-slate-300'}>{index <= activeIndex ? <CheckCircle2 className="h-5 w-5" aria-hidden="true" /> : <Circle className="h-5 w-5" aria-hidden="true" />}</span><span className={index <= activeIndex ? 'font-semibold text-slate-900' : 'text-slate-500'}>{labels[status]}</span></li>)}</ol>}</article>}<p className="mt-8 text-sm text-slate-600">Do not have a reference ID? <Link to="/report" className="font-semibold text-brand-green-700 underline">Start a report</Link>.</p></section>
}
