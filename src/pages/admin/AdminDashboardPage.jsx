import { ArrowRight, ClipboardList } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AdminDashboardPage() {
  return <div className="mx-auto max-w-4xl"><p className="text-sm font-medium text-brand-green-700">Administrator workspace</p><h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1><p className="mt-2 max-w-2xl text-slate-600">Review incoming citizen reports and keep their progress up to date.</p><section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"><ClipboardList className="h-7 w-7 text-brand-green-600" aria-hidden="true" /><h2 className="mt-4 text-xl font-bold text-slate-900">Manage issues</h2><p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">Search, filter, review, and update the status of real citizen reports.</p><Link to="/admin/issues" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-green-700">Open issues <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></section></div>
}
