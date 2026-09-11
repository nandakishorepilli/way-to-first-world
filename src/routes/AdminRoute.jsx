import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { ShieldAlert } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { missingFirebaseVariables } from '../services/firebase/config.js'

function CenteredState({ children }) {
  return <main className="grid min-h-screen place-items-center bg-slate-100 p-6">{children}</main>
}

export default function AdminRoute() {
  const location = useLocation()
  const { user, isAdmin, isLoading, authError, isFirebaseConfigured } = useAuth()

  if (!isFirebaseConfigured) {
    return (
      <CenteredState>
        <section className="max-w-lg rounded-2xl bg-white p-8 shadow-soft">
          <h1 className="text-xl font-bold text-slate-900">Firebase configuration required</h1>
          <p className="mt-3 text-slate-600">The administration area cannot be initialized until Firebase environment variables are configured.</p>
          <p className="mt-3 break-words text-sm text-slate-500">Missing: {missingFirebaseVariables.join(', ')}</p>
        </section>
      </CenteredState>
    )
  }

  if (isLoading) {
    return <CenteredState><p className="text-slate-600">Restoring your secure session…</p></CenteredState>
  }

  if (authError) {
    return <CenteredState><p className="rounded-xl bg-white p-6 text-slate-700 shadow-soft">We could not verify this session. Please sign in again.</p></CenteredState>
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (!isAdmin) {
    return (
      <CenteredState>
        <section className="max-w-lg rounded-2xl bg-white p-8 text-center shadow-soft">
          <ShieldAlert className="mx-auto h-10 w-10 text-brand-red-500" aria-hidden="true" />
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Access not authorized</h1>
          <p className="mt-3 text-slate-600">Your account is signed in but does not have the administrator role required for this area.</p>
        </section>
      </CenteredState>
    )
  }

  return <Outlet />
}
