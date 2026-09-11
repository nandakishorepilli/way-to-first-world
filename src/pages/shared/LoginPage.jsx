import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { missingFirebaseVariables } from '../../services/firebase/config.js'

function messageFor(error) {
  if (error?.code === 'auth/email-already-in-use') return 'An account already exists for this email address.'
  if (error?.code === 'auth/invalid-email') return 'Enter a valid email address.'
  if (error?.code === 'auth/weak-password') return 'Use a password with at least six characters.'
  if (error?.code === 'auth/invalid-credential' || error?.code === 'auth/wrong-password') return 'The email address or password is incorrect.'
  if (error?.code === 'auth/too-many-requests') return 'Too many attempts. Please try again later.'
  return 'We could not complete that request. Please try again.'
}

export default function LoginPage() {
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { signIn, register, isFirebaseConfigured } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const destination = location.state?.from?.pathname || '/'

  function chooseMode(nextMode) { setMode(nextMode); setError(null) }
  async function handleSubmit(event) {
    event.preventDefault(); setError(null)
    if (mode === 'register' && password !== confirmPassword) { setError('Passwords do not match.'); return }
    if (mode === 'register' && password.length < 6) { setError('Use a password with at least six characters.'); return }
    setIsSubmitting(true)
    try { if (mode === 'login') await signIn(email, password); else await register(name.trim(), email, password); navigate(destination, { replace: true }) } catch (authError) { setError(messageFor(authError)) } finally { setIsSubmitting(false) }
  }

  if (!isFirebaseConfigured) return <section className="mx-auto max-w-lg px-4 py-16 sm:px-6"><div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"><h1 className="text-2xl font-bold text-slate-900">Sign in unavailable</h1><p className="mt-3 text-slate-600">Firebase needs configuration before account access can be enabled.</p><p className="mt-3 break-words text-sm text-slate-500">Missing: {missingFirebaseVariables.join(', ')}</p></div></section>
  return <section className="mx-auto max-w-md px-4 py-12 sm:px-6 sm:py-16"><div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8"><p className="text-sm font-semibold text-brand-green-700">Citizen account</p><h1 className="mt-2 text-3xl font-bold text-slate-900">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1><p className="mt-2 text-sm text-slate-600">{mode === 'login' ? 'Sign in to submit and track your reports.' : 'Create a free account to submit civic issues.'}</p><div className="mt-6 grid grid-cols-2 rounded-lg bg-slate-100 p-1"><button type="button" onClick={() => chooseMode('login')} className={`rounded-md px-3 py-2 text-sm font-semibold ${mode === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}>Sign in</button><button type="button" onClick={() => chooseMode('register')} className={`rounded-md px-3 py-2 text-sm font-semibold ${mode === 'register' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}>Register</button></div><form className="mt-6 space-y-4" onSubmit={handleSubmit}>{mode === 'register' && <label className="block text-sm font-medium text-slate-700">Full name<input required minLength="2" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:border-brand-green-600 focus:outline-none focus:ring-2 focus:ring-brand-green-100" /></label>}<label className="block text-sm font-medium text-slate-700">Email<input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:border-brand-green-600 focus:outline-none focus:ring-2 focus:ring-brand-green-100" /></label><label className="block text-sm font-medium text-slate-700">Password<input required minLength="6" type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:border-brand-green-600 focus:outline-none focus:ring-2 focus:ring-brand-green-100" />{mode === 'register' && <span className="mt-1 block text-xs font-normal text-slate-500">At least six characters.</span>}</label>{mode === 'register' && <label className="block text-sm font-medium text-slate-700">Confirm password<input required minLength="6" type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:border-brand-green-600 focus:outline-none focus:ring-2 focus:ring-brand-green-100" /></label>}{error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-brand-red-600" role="alert">{error}</p>}<button disabled={isSubmitting} className="w-full rounded-lg bg-brand-green-600 px-4 py-3 font-semibold text-white hover:bg-brand-green-700 focus:outline-none focus:ring-2 focus:ring-brand-green-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}</button></form></div></section>
}
