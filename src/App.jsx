import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'

import HomePage from './pages/shared/HomePage.jsx'
import MapPage from './pages/citizen/MapPage.jsx'
import ReportPage from './pages/citizen/ReportPage.jsx'
import TrackPage from './pages/citizen/TrackPage.jsx'
import LoginPage from './pages/shared/LoginPage.jsx'
import AdminDashboardPage from './pages/admin/AdminDashboardPage.jsx'
import AdminIssuesPage from './pages/admin/AdminIssuesPage.jsx'
import NotFoundPage from './pages/shared/NotFoundPage.jsx'
import AdminRoute from './routes/AdminRoute.jsx'

// App.jsx is the "traffic router" of the whole site.
// Public/citizen pages share MainLayout (navbar + footer).
// Admin pages share AdminLayout (sidebar dashboard shell) — built in a later milestone.
export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/track" element={<TrackPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/issues" element={<AdminIssuesPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
