import { Eye, RefreshCw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { STATUS_LIST, getStatusById } from '../../constants/status.js'
import { getAdminReports, updateReportStatus } from '../../services/firebase/reports.js'

function formatDate(timestamp) {
  if (!timestamp?.toDate) return 'Pending timestamp'
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(timestamp.toDate())
}

export default function AdminDashboardPage() {
  const [reports, setReports] = useState([])
  const [selectedReport, setSelectedReport] = useState(null)
  const [status, setStatus] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState(null)

  async function loadReports() {
    setIsLoading(true); setError(null)
    try { setReports(await getAdminReports()) } catch { setError('Reports could not be loaded. Confirm this account has the administrator claim and try again.') } finally { setIsLoading(false) }
  }

  useEffect(() => { loadReports() }, [])

  function selectReport(report) {
    setSelectedReport(report)
    setStatus(report.status)
  }

  async function saveStatus() {
    if (!selectedReport || !STATUS_LIST.some((item) => item.id === status)) return
    setIsSaving(true); setError(null)
    try {
      await updateReportStatus(selectedReport.id, status)
      const updated = { ...selectedReport, status }
      setSelectedReport(updated)
      setReports((current) => current.map((report) => report.id === updated.id ? { ...report, status } : report))
    } catch { setError('The status could not be updated. Please try again.') } finally { setIsSaving(false) }
  }

  return <div className="mx-auto max-w-7xl"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-medium text-brand-green-700">Administrator workspace</p><h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Issue management</h1><p className="mt-2 max-w-2xl text-slate-600">Review citizen reports and update their progress.</p></div><button type="button" onClick={loadReports} disabled={isLoading} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"><RefreshCw className="h-4 w-4" aria-hidden="true" />Refresh</button></div>{error && <p className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-brand-red-600" role="alert">{error}</p>}<div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(20rem,.65fr)]"><section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-200 px-5 py-4"><h2 className="font-semibold text-slate-900">Citizen reports</h2><p className="mt-1 text-sm text-slate-500">{isLoading ? 'Loading reports…' : `${reports.length} report${reports.length === 1 ? '' : 's'}`}</p></div>{!isLoading && reports.length === 0 && <p className="p-5 text-sm text-slate-600">No citizen reports have been submitted yet.</p>}{!isLoading && reports.length > 0 && <div className="overflow-x-auto"><table className="min-w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3 font-semibold">Reference</th><th className="px-5 py-3 font-semibold">Category</th><th className="px-5 py-3 font-semibold">Location</th><th className="px-5 py-3 font-semibold">Status</th><th className="px-5 py-3 font-semibold">Created</th><th className="px-5 py-3"><span className="sr-only">View report</span></th></tr></thead><tbody className="divide-y divide-slate-200">{reports.map((report) => <tr key={report.id} className={selectedReport?.id === report.id ? 'bg-brand-green-50/50' : 'hover:bg-slate-50'}><td className="whitespace-nowrap px-5 py-4 font-mono font-semibold text-slate-900">{report.referenceId}</td><td className="px-5 py-4 text-slate-700">{report.category}</td><td className="max-w-48 truncate px-5 py-4 text-slate-600">{report.location}</td><td className="whitespace-nowrap px-5 py-4"><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">{getStatusById(report.status)?.label || report.status}</span></td><td className="whitespace-nowrap px-5 py-4 text-slate-600">{formatDate(report.createdAt)}</td><td className="px-5 py-4"><button type="button" onClick={() => selectReport(report)} className="inline-flex items-center gap-1.5 font-semibold text-brand-green-700 hover:text-brand-green-800"><Eye className="h-4 w-4" aria-hidden="true" />View</button></td></tr>)}</tbody></table></div>}</section><aside className="h-fit rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="font-semibold text-slate-900">Report details</h2>{!selectedReport && <p className="mt-3 text-sm text-slate-600">Select a report to view its details and update its status.</p>}{selectedReport && <div className="mt-4 space-y-4 text-sm"><div><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Reference ID</p><p className="mt-1 font-mono font-bold text-slate-900">{selectedReport.referenceId}</p></div><div><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Issue</p><p className="mt-1 font-medium text-slate-900">{selectedReport.category}</p><p className="mt-1 whitespace-pre-wrap text-slate-600">{selectedReport.description}</p></div><div><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Location</p><p className="mt-1 text-slate-700">{selectedReport.location}</p></div>{selectedReport.additionalDetails && <div><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Additional details</p><p className="mt-1 whitespace-pre-wrap text-slate-600">{selectedReport.additionalDetails}</p></div>}<div className="border-t border-slate-200 pt-4"><label htmlFor="report-status" className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Status</label><select id="report-status" value={status} onChange={(event) => setStatus(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand-green-600 focus:outline-none focus:ring-2 focus:ring-brand-green-100">{STATUS_LIST.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select><button type="button" onClick={saveStatus} disabled={isSaving || status === selectedReport.status} className="mt-3 w-full rounded-lg bg-brand-green-600 px-4 py-2.5 font-semibold text-white hover:bg-brand-green-700 disabled:cursor-not-allowed disabled:opacity-60">{isSaving ? 'Saving…' : 'Save status'}</button></div></div>}</aside></div></div>
}
