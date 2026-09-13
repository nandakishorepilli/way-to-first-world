import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Report issue', to: '/report' },
  { label: 'Track complaint', to: '/track' },
  { label: 'Map', to: '/map' },
]

const authActionClass = 'rounded-lg bg-brand-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-green-700 focus:outline-none focus:ring-2 focus:ring-brand-green-600 focus:ring-offset-2'

export default function PublicNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [logoutError, setLogoutError] = useState(null)
  const { user, isLoading, logout } = useAuth()
  const closeMenu = () => setIsOpen(false)

  async function handleLogout() {
    setLogoutError(null)
    try {
      await logout()
      closeMenu()
    } catch {
      setLogoutError('Unable to sign out. Please try again.')
    }
  }

  const authAction = user ? (
    <button type="button" onClick={handleLogout} className={authActionClass}>Sign out</button>
  ) : (
    <Link to="/login" onClick={closeMenu} className={authActionClass}>Login / Register</Link>
  )

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Primary navigation">
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2 rounded-md text-lg font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-green-600">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-green-600 text-xs text-white">WTF</span><span>WTF</span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {links.map(({ label, to }) => <NavLink key={to} to={to} className={({ isActive }) => `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'bg-brand-green-50 text-brand-green-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>{label}</NavLink>)}
          {!isLoading && <div className="ml-3">{authAction}</div>}
        </div>
        <button type="button" onClick={() => setIsOpen((open) => !open)} className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-green-600 md:hidden" aria-expanded={isOpen} aria-controls="mobile-navigation" aria-label={isOpen ? 'Close navigation' : 'Open navigation'}>
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>
      {isOpen && <div id="mobile-navigation" className="border-t border-slate-200 bg-white px-4 py-3 md:hidden"><div className="mx-auto grid max-w-7xl gap-1">
        {links.map(({ label, to }) => <NavLink key={to} to={to} onClick={closeMenu} className={({ isActive }) => `rounded-lg px-3 py-3 text-base font-medium ${isActive ? 'bg-brand-green-50 text-brand-green-700' : 'text-slate-700 hover:bg-slate-100'}`}>{label}</NavLink>)}
        {!isLoading && <div className="mt-2">{authAction}</div>}
        {logoutError && <p className="mt-2 text-sm text-brand-red-600" role="alert">{logoutError}</p>}
      </div></div>}
    </header>
  )
}
