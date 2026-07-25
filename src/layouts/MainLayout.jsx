import { Outlet } from 'react-router-dom'

// <Outlet /> is a React Router placeholder: it renders whichever child page
// matched the URL (e.g. HomePage, MapPage, ReportPage). This lets every
// citizen-facing page automatically get the same navbar and footer wrapper.
//
// NOTE: Navbar and Footer are minimal stubs for now — real design comes in
// the "Homepage / UI" milestone.
export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-200 dark:border-gray-800 px-6 py-4">
        <span className="font-bold text-brand-green-600 text-lg">WTF</span>
        <span className="text-sm text-gray-500 ml-2">Way To First World Country</span>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 px-6 py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} WTF — Kakinada, Andhra Pradesh
      </footer>
    </div>
  )
}
