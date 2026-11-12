import { Link } from 'react-router-dom'
import { useScrollToTopOnNavigate } from '../hooks/useScrollToTopOnNavigate'

const pageLinks = [
  { to: '/', label: 'Beranda' },
  { to: '/laporan', label: 'Cari barang' },
  { to: '/laporan-saya', label: 'Laporan saya' },
]

const exploreLinks = [
  { to: '/laporan?jenis=lost', label: 'Barang hilang' },
  { to: '/laporan?jenis=found', label: 'Barang temuan' },
  { to: '/laporkan', label: 'Laporkan barang' },
]

export default function Footer() {
  const handleLinkClick = useScrollToTopOnNavigate()

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-wordmark" onClick={handleLinkClick('/')}>
              TeBar
            </Link>
            <p className="footer-tagline">
              Papan temu barang untuk komunitas. Dibuat agar barang yang hilang bisa kembali
              ke pemiliknya.
            </p>
          </div>

          <nav className="footer-col" aria-label="Navigasi footer">
            <h2 className="footer-heading">Halaman</h2>
            <ul className="footer-nav">
              {pageLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} onClick={handleLinkClick(link.to)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Jelajahi laporan">
            <h2 className="footer-heading">Jelajahi</h2>
            <ul className="footer-nav">
              {exploreLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} onClick={handleLinkClick(link.to)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="site-footer-bottom">
          <p>© 2026 TeBar</p>
          <p>Temu barang, kembali ke pemiliknya.</p>
        </div>
      </div>
    </footer>
  )
}
