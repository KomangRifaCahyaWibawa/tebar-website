import { Link, Route, Routes, useLocation } from 'react-router-dom'
import EmptyState from './components/EmptyState'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import CreateReport from './pages/CreateReport'
import EditReport from './pages/EditReport'
import Home from './pages/Home'
import MyReports from './pages/MyReports'
import ReportDetail from './pages/ReportDetail'
import ReportList from './pages/ReportList'
import ReportsProvider from './context/ReportsProvider'

function NotFoundPage() {
  return (
    <div className="container page">
      <EmptyState
        icon="search"
        title="Halaman tidak ditemukan."
        description="Alamat yang kamu buka tidak tersedia."
      >
        <Link to="/" className="btn btn-secondary">
          Kembali ke Beranda
        </Link>
      </EmptyState>
    </div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <ReportsProvider>
      <div className="app-shell">
        <Navbar />
        <main className="site-main">
          <div className="page-transition" key={location.pathname}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/laporan" element={<ReportList />} />
              <Route path="/laporkan" element={<CreateReport />} />
              <Route path="/laporan/:id" element={<ReportDetail />} />
              <Route path="/laporan/:id/edit" element={<EditReport />} />
              <Route path="/laporan-saya" element={<MyReports />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </ReportsProvider>
  )
}
