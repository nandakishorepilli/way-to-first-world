import { BarChart3, ClipboardList, LayoutDashboard, MapPinned, Users } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navigation = [
  { label: 'Overview', to: '/admin', icon: LayoutDashboard, available: true },
  { label: 'Issues', to: '/admin/issues', icon: ClipboardList, available: true },
  { label: 'Map', icon: MapPinned },
  { label: 'Analytics', icon: BarChart3 },
  { label: 'Users', icon: Users },
]

export default function AdminNav({ onNavigate }) {
  return (
    <nav className="space-y-1" aria-label="Administrator navigation">
      {navigation.map(({ label, to, icon: Icon, available }) => available ? (
        <NavLink key={label} to={to} onClick={onNavigate} className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${isActive ? 'bg-brand-green-50 text-brand-green-700' : 'text-slate-600 hover:bg-slate-100'}`}>
          <Icon className="h-5 w-5" aria-hidden="true" />{label}
        </NavLink>
      ) : (
        <span key={label} className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400" title="Planned for a future milestone">
          <Icon className="h-5 w-5" aria-hidden="true" />{label}<span className="ml-auto text-xs">Planned</span>
        </span>
      ))}
    </nav>
  )
}
