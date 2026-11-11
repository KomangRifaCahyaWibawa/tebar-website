import { Link } from 'react-router-dom'
import CategoryList from '../components/CategoryList'
import ReportCard from '../components/ReportCard'
import SearchBar from '../components/SearchBar'
import { useReports } from '../context/useReports'

export default function Home() {
  const { reports } = useReports()
  const latestReports = reports.slice(0, 6)

  return (
    <>
      <section className="home-intro">
        <div className="container">
          <h1>Temukan barang yang hilang atau bantu kembalikan barang yang ditemukan.</h1>
          <p>
            Cari laporan barang di sekitarmu, atau buat laporan sendiri jika kamu kehilangan atau
            menemukan barang.
          </p>
          <SearchBar />
          <div className="home-intro-cta">
            <Link to="/laporkan" className="btn btn-primary">
              Laporkan Barang
            </Link>
          </div>
        </div>
      </section>

      <div className="container home-section">
        <div className="section-head">
          <h2>Laporan Terbaru</h2>
          <Link to="/laporan" className="section-more-link">
            Lihat semua laporan
          </Link>
        </div>
        <div className="report-grid">
          {latestReports.map((report, index) => (
            <ReportCard key={report.id} report={report} index={index} />
          ))}
        </div>
      </div>

      <div className="container home-section">
        <h2>Kategori</h2>
        <p className="section-subtitle">Jelajahi laporan berdasarkan jenis barang.</p>
        <CategoryList />
      </div>

      <div className="container home-section">
        <h2>Bagaimana TeBar bekerja?</h2>
        <ol className="steps">
          <li>
            <h3>1. Laporkan</h3>
            <p>Bagikan informasi barang yang hilang atau ditemukan.</p>
          </li>
          <li>
            <h3>2. Temukan</h3>
            <p>Cari laporan berdasarkan barang atau lokasi.</p>
          </li>
          <li>
            <h3>3. Hubungi</h3>
            <p>Hubungi pembuat laporan melalui kontak yang tersedia.</p>
          </li>
        </ol>
      </div>
    </>
  )
}
