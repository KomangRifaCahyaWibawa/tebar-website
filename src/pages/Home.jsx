import { Link } from 'react-router-dom'
import CategoryList from '../components/CategoryList'
import Icon from '../components/Icon'
import ReportCard from '../components/ReportCard'
import SearchBar from '../components/SearchBar'
import { categories, getCategoryLabel } from '../data/categories'
import { useReports } from '../context/useReports'

export default function Home() {
  const { reports } = useReports()
  const latestReports = reports.slice(0, 6)
  const boardReports = latestReports.slice(0, 4)

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
      <section className="home-intro">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              Papan komunitas
              <span className="eyebrow-dot" aria-hidden="true" />
              <span className="eyebrow-count">{reports.length} laporan</span>
            </p>
            <h1 className="hero-title">
              Barang hilang punya <span className="hero-accent">jalan pulang</span>.
            </h1>
            <p className="hero-lede">
              TeBar mempertemukan orang yang kehilangan dengan yang menemukan. Cari laporan
              di sekitarmu, atau pasang laporanmu sendiri.
            </p>

            <div className="hero-search">
              <SearchBar />
            </div>

            <div className="hero-actions">
              <Link to="/laporkan" className="btn btn-secondary">
                Laporkan barang
                <Icon name="arrow-up-right" size={16} />
              </Link>
              <Link to="/laporan" className="text-link">
                Lihat semua laporan
                <Icon name="arrow-right" size={15} />
              </Link>
            </div>

            {popularCategories.length > 0 && (
              <div className="hero-popular">
                <span className="hero-popular-label">Sering dicari</span>
                <ul className="hero-popular-list">
                  {popularCategories.map((category) => (
                    <li key={category.id}>
                      <Link
                        to={`/laporan?kategori=${category.id}`}
                        className="hero-popular-link"
                      >
                        {category.label} <span>{category.count}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="hero-board" aria-labelledby="board-title">
            <div className="board-head">
              <h2 id="board-title" className="board-title">
                Baru di papan
              </h2>
              <Link to="/laporan" className="board-link">
                Semua laporan
                <Icon name="arrow-right" size={13} />
              </Link>
            </div>

            {boardReports.length > 0 ? (
              <ul className="board-list">
                {boardReports.map((report) => (
                  <li key={report.id}>
                    <Link to={`/laporan/${report.id}`} className="board-item">
                      <span className="board-thumb" aria-hidden="true">
                        {report.image ? (
                          <img src={report.image} alt="" loading="lazy" decoding="async" />
                        ) : (
                          <Icon name="image" size={17} />
                        )}
                      </span>
                      <span className="board-info">
                        <span className="board-item-title">{report.title}</span>
                        <span className="board-item-meta">
                          {getCategoryLabel(report.category)} · {report.location}
                        </span>
                      </span>
                      <span
                        className={`board-type ${
                          report.type === 'lost' ? 'is-lost' : 'is-found'
                        }`}
                      >
                        {report.type === 'lost' ? 'Hilang' : 'Temuan'}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="board-empty">Belum ada laporan di papan. Jadilah yang pertama.</p>
            )}

            <p className="board-foot">Diperbarui dari laporan komunitas.</p>
          </aside>
        </div>
      </section>

      <section className="home-section" aria-labelledby="latest-title">
        <div className="container">
          <div className="section-head">
            <div className="section-heading">
              <p className="eyebrow">Direktori</p>
              <h2 id="latest-title">Jelajahi laporan</h2>
              <p className="section-sub">Barang hilang dan temuan yang baru masuk.</p>
            </div>
            <Link to="/laporan" className="section-more-link">
              Semua laporan
              <Icon name="arrow-right" size={15} />
            </Link>
          </div>

          <div className="report-grid">
            {latestReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </div>
      </section>

      <section className="home-categories" aria-labelledby="categories-title">
        <div className="container">
          <div className="section-head">
            <div className="section-heading">
              <p className="eyebrow">Kategori</p>
              <h2 id="categories-title">Cari lewat jenis barang</h2>
              <p className="section-sub">Pilih kategori untuk mempersempit laporan.</p>
            </div>
          </div>
          <CategoryList />
        </div>
      </section>

      <section className="home-process" aria-labelledby="process-title">
        <div className="container process-grid">
          <div className="process-intro">
            <p className="eyebrow">Cara kerja</p>
            <h2 id="process-title">Dari laporan ke pemiliknya.</h2>
            <p>
              Tidak perlu akun atau langkah rumit. Tiga hal sederhana ini sudah cukup untuk
              membantu barang kembali ke tangan yang tepat.
            </p>
          </div>

          <ol className="steps">
            <li>
              <span className="step-number">01</span>
              <div className="step-body">
                <h3>Laporkan</h3>
                <p>Tulis ciri barang, lokasi, dan kontak yang bisa dihubungi.</p>
              </div>
            </li>
            <li>
              <span className="step-number">02</span>
              <div className="step-body">
                <h3>Temukan</h3>
                <p>Cari lewat nama, kategori, atau lokasi di halaman laporan.</p>
              </div>
            </li>
            <li>
              <span className="step-number">03</span>
              <div className="step-body">
                <h3>Kembalikan</h3>
                <p>Hubungi pelapor dan atur cara barang kembali dengan aman.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="home-cta" aria-labelledby="cta-title">
        <div className="container home-cta-inner">
          <div>
            <p className="eyebrow">Untuk komunitas</p>
            <h2 id="cta-title">Menemukan sesuatu? Pasang di papan.</h2>
            <p>
              Satu laporan kecil bisa menyelamatkan hari seseorang. Kamu juga bisa menandai
              status saat barang sudah kembali.
            </p>
          </div>
          <div className="home-cta-actions">
            <Link to="/laporkan" className="btn btn-contrast">
              Laporkan barang
              <Icon name="arrow-up-right" size={16} />
            </Link>
            <Link to="/laporan" className="btn btn-outline-light">
              Cari barang
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
