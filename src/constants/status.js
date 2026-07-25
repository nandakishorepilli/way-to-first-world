// Single source of truth for complaint statuses, in workflow order.
// The `order` field lets us compute a progress bar (e.g. "4 of 7 steps done")
// on the citizen tracking page later.

export const STATUS = {
  SUBMITTED: { id: 'submitted', label: 'Submitted', order: 1, color: 'gray' },
  UNDER_REVIEW: { id: 'under_review', label: 'Under Review', order: 2, color: 'blue' },
  APPROVED: { id: 'approved', label: 'Approved', order: 3, color: 'blue' },
  ASSIGNED: { id: 'assigned', label: 'Assigned', order: 4, color: 'orange' },
  IN_PROGRESS: { id: 'in_progress', label: 'In Progress', order: 5, color: 'orange' },
  RESOLVED: { id: 'resolved', label: 'Resolved', order: 6, color: 'green' },
  REJECTED: { id: 'rejected', label: 'Rejected', order: -1, color: 'red' }, // terminal, off the happy path
}

export const STATUS_LIST = Object.values(STATUS)

export function getStatusById(id) {
  return STATUS_LIST.find((s) => s.id === id) || null
}
