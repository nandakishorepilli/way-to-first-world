// Single source of truth for issue categories.
// IMPORTANT: Every component that needs categories should import from here,
// never hardcode a category list inline. This is what makes categories
// "swappable" for a live Firestore-driven list later without touching
// any other file in the app.

export const CATEGORIES = [
  { id: 'trashy-areas', label: 'Trashy Areas', icon: 'Trash2', priority: 'medium' },
  { id: 'drainage-issues', label: 'Drainage Issues', icon: 'Droplets', priority: 'high' },
  { id: 'road-potholes', label: 'Road Potholes', icon: 'Construction', priority: 'high' },
  { id: 'sand-dirt-roads', label: 'Sand or Dirt on Roads', icon: 'Wind', priority: 'low' },
  { id: 'broken-govt-property', label: 'Broken Government Property', icon: 'Landmark', priority: 'medium' },
  { id: 'road-white-lines', label: 'Road White Line Issues', icon: 'RulerIcon', priority: 'low' },
  { id: 'street-light', label: 'Street Light Problems', icon: 'Lightbulb', priority: 'medium' },
  { id: 'water-leakage', label: 'Water Leakage', icon: 'Droplet', priority: 'high' },
  { id: 'illegal-dumping', label: 'Illegal Garbage Dumping', icon: 'Trash', priority: 'medium' },
  { id: 'fallen-trees', label: 'Fallen Trees', icon: 'TreeDeciduous', priority: 'high' },
  { id: 'damaged-traffic-signals', label: 'Damaged Traffic Signals', icon: 'TrafficCone', priority: 'critical' },
  { id: 'broken-footpaths', label: 'Broken Footpaths', icon: 'Footprints', priority: 'medium' },
  { id: 'open-manholes', label: 'Open Manholes', icon: 'CircleAlert', priority: 'critical' },
  { id: 'public-toilet', label: 'Public Toilet Issues', icon: 'Bath', priority: 'medium' },
  { id: 'animal-carcass', label: 'Animal Carcass', icon: 'AlertTriangle', priority: 'critical' },
  { id: 'flooding', label: 'Flooding', icon: 'CloudRain', priority: 'critical' },
  { id: 'other', label: 'Other', icon: 'MoreHorizontal', priority: 'low' },
]

// Helper so components don't repeat this lookup logic themselves
export function getCategoryById(id) {
  return CATEGORIES.find((c) => c.id === id) || null
}
