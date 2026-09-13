import { collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, updateDoc, writeBatch } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { getFirebaseFirestore, getFirebaseStorage } from './auth.js'

function createReferenceId(documentId) {
  return `WTF-${documentId.slice(-8).toUpperCase()}`
}

function safeFileName(fileName) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, '_')
}

export async function submitReport({ user, category, description, location, additionalDetails, photo }) {
  const database = getFirebaseFirestore()
  const storage = getFirebaseStorage()
  const reportRef = doc(collection(database, 'reports'))
  const referenceId = createReferenceId(reportRef.id)
  let photoUrl = null

  if (photo) {
    const photoRef = ref(storage, `reports/${user.uid}/${reportRef.id}/${safeFileName(photo.name)}`)
    await uploadBytes(photoRef, photo, { contentType: photo.type })
    photoUrl = await getDownloadURL(photoRef)
  }

  const batch = writeBatch(database)
  batch.set(reportRef, {
    referenceId,
    userId: user.uid,
    category,
    description,
    location,
    additionalDetails: additionalDetails || null,
    photoUrl,
    status: 'submitted',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  batch.set(doc(database, 'reportReferences', referenceId), {
    reportId: reportRef.id,
    userId: user.uid,
  })
  await batch.commit()

  return referenceId
}

export async function getReportByReference({ userId, referenceId }) {
  const database = getFirebaseFirestore()
  const reportSnapshot = await getDoc(doc(database, 'reportReferences', referenceId))
  if (!reportSnapshot.exists() || reportSnapshot.data().userId !== userId) return null
  const report = await getDoc(doc(database, 'reports', reportSnapshot.data().reportId))
  return report.exists() ? { id: report.id, ...report.data() } : null
}

// These functions are rendered only behind AdminRoute. Firestore rules remain
// the authorization boundary and require the trusted `admin: true` custom claim.
export async function getAdminReports() {
  const database = getFirebaseFirestore()
  const reportsQuery = query(collection(database, 'reports'), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(reportsQuery)
  return snapshot.docs.map((report) => ({ id: report.id, ...report.data() }))
}

export async function updateReportStatus(reportId, status) {
  const database = getFirebaseFirestore()
  await updateDoc(doc(database, 'reports', reportId), {
    status,
    updatedAt: serverTimestamp(),
  })
}
