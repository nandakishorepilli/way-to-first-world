import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { isFirebaseConfigured } from '../services/firebase/config.js'
import { getFirebaseAuth } from '../services/firebase/auth.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [claims, setClaims] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [authError, setAuthError] = useState(null)

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setIsLoading(false)
      return undefined
    }

    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), async (nextUser) => {
      setIsLoading(true)
      setAuthError(null)

      try {
        const tokenResult = nextUser ? await nextUser.getIdTokenResult() : null
        setUser(nextUser)
        setClaims(tokenResult?.claims ?? {})
      } catch (error) {
        setUser(null)
        setClaims({})
        setAuthError(error)
      } finally {
        setIsLoading(false)
      }
    })

    return unsubscribe
  }, [])

  const value = useMemo(() => ({
    user,
    claims,
    isAdmin: claims.admin === true,
    isLoading,
    authError,
    isFirebaseConfigured,
    async signIn(email, password) {
      setAuthError(null)
      return signInWithEmailAndPassword(getFirebaseAuth(), email, password)
    },
    async logout() {
      setAuthError(null)
      return signOut(getFirebaseAuth())
    },
    async register(name, email, password) {
      setAuthError(null)
      const credential = await createUserWithEmailAndPassword(getFirebaseAuth(), email, password)
      await updateProfile(credential.user, { displayName: name })
      setUser(credential.user)
      return credential
    },
  }), [authError, claims, isLoading, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.')
  }
  return context
}
