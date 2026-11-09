import { Link, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import CreateReport from './pages/CreateReport'
import Home from './pages/Home'
import MyReports from './pages/MyReports'
import ReportDetail from './pages/ReportDetail'
import ReportList from './pages/ReportList'
import ReportsProvider from './context/ReportsProvider'

function NotFoundPage() {
  return (
    <div className="container page">
      <h1>Halaman tidak ditemukan</h1>
      <p className="page-subtitle">Alamat yang kamu buka tidak tersedia.</p>
      <Link to="/" className="btn btn-secondary">
        Kembali ke Beranda
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <ReportsProvider>
      <div className="app-shell">
        <Navbar />
        <main className="site-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/laporan" element={<ReportList />} />
            <Route path="/laporkan" element={<CreateReport />} />
            <Route path="/laporan/:id" element={<ReportDetail />} />
            <Route path="/laporan-saya" element={<MyReports />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ReportsProvider>
  )
}
