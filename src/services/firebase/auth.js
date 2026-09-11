import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { firebaseConfig, isFirebaseConfigured } from './config.js'

let authInstance = null
let firestoreInstance = null
let storageInstance = null

function getFirebaseApp() {
  return getApps().length ? getApp() : initializeApp(firebaseConfig)
}

export function getFirebaseAuth() {
  if (!isFirebaseConfigured) {
    return null
  }

  if (!authInstance) {
    authInstance = getAuth(getFirebaseApp())
  }

  return authInstance
}

export function getFirebaseFirestore() {
  if (!isFirebaseConfigured) return null
  if (!firestoreInstance) firestoreInstance = getFirestore(getFirebaseApp())
  return firestoreInstance
}

export function getFirebaseStorage() {
  if (!isFirebaseConfigured) return null
  if (!storageInstance) storageInstance = getStorage(getFirebaseApp())
  return storageInstance
}
