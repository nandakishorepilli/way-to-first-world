// Single source of truth for complaint statuses, in workflow order.
// The `order` field lets us compute a progress bar (e.g. "4 of 7 steps done")
// on the citizen tracking page later.

export const STATUS = {
  SUBMITTED: { id: 'submitted', label: 'Submitted', order: 1, color: 'gray' },
  UNDER_REVIEW: { id: 'under_review', label: 'Under Review', order: 2, color: 'blue' },
  ASSIGNED: { id: 'assigned', label: 'Assigned', order: 3, color: 'orange' },
  IN_PROGRESS: { id: 'in_progress', label: 'In Progress', order: 4, color: 'orange' },
  RESOLVED: { id: 'resolved', label: 'Resolved', order: 5, color: 'green' },
}

export const STATUS_LIST = Object.values(STATUS)

export function getStatusById(id) {
  return STATUS_LIST.find((s) => s.id === id) || null
}
