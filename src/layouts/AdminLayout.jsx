import { Outlet } from 'react-router-dom'

// Admin shell: sidebar + content area. Sidebar navigation links will be
// built out in the "Administrator Module" milestone, along with the
// route-protection guard that stops citizens from reaching /admin.
export default function AdminLayout() {
  return (
    <div className="min-h-screen flex">
      <aside className="w-60 border-r border-gray-200 dark:border-gray-800 p-4">
        <span className="font-bold text-brand-green-600">WTF Admin</span>
        {/* Sidebar nav links go here in a later milestone */}
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}
