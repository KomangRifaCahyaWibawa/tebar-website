import { Link } from 'react-router-dom'
import CategoryList from '../components/CategoryList'
import Icon from '../components/Icon'
import ReportCard from '../components/ReportCard'
import SearchBar from '../components/SearchBar'
import { categories } from '../data/categories'
import { useReports } from '../context/useReports'

export default function Home() {
  const { reports } = useReports()
  const latestReports = reports.slice(0, 6)

  const popularCategories = categories
    .map((category) => ({
      ...category,
      count: reports.filter((report) => report.category === category.id).length,
    }))
    .filter((category) => category.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 4)

  return (
    <>
      <section className="home-hero">
        <div className="container">
          {reports.length > 0 && (
            <p className="home-eyebrow">{reports.length} laporan dari komunitas</p>
          )}
          <h1>
            Temukan barang yang <span className="highlight-lost">hilang</span> atau bantu
            kembalikan yang <span className="highlight-found">ditemukan</span>.
          </h1>
          <p className="home-hero-desc">
            TeBar menghubungkan pelapor dan pencari barang di sekitarmu — cari laporan barang,
            atau buat laporan sendiri jika kamu kehilangan atau menemukan barang.
          </p>
          <SearchBar />
          {popularCategories.length > 0 && (
            <div className="home-hero-chips">
              {popularCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/laporan?kategori=${category.id}`}
                  className="home-chip"
                >
                  {category.label}
                  <span>{category.count}</span>
                </Link>
              ))}
            </div>
          )}
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
            <Icon name="arrow-right" size={14} />
          </Link>
        </div>
        <div className="report-grid">
          {latestReports.map((report, index) => (
            <ReportCard key={report.id} report={report} index={index} />
          ))}
        </div>
      </div>

      <section className="home-band">
        <div className="container">
          <h2>Kategori</h2>
          <p className="section-subtitle">Jelajahi laporan berdasarkan jenis barang.</p>
          <CategoryList />
        </div>
      </section>

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
