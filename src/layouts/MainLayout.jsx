import { Outlet } from 'react-router-dom'
import PublicFooter from '../components/citizen/PublicFooter.jsx'
import PublicNav from '../components/citizen/PublicNav.jsx'

export default function MainLayout() {
  return <div className="flex min-h-screen flex-col bg-white"><PublicNav /><main className="flex-1"><Outlet /></main><PublicFooter /></div>
}
