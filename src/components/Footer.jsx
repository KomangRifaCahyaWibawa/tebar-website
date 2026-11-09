import { Link } from 'react-router-dom'

const footerLinks = [
  { to: '/', label: 'Beranda' },
  { to: '/laporan', label: 'Cari Barang' },
  { to: '/laporkan', label: 'Laporkan Barang' },
  { to: '/laporan-saya', label: 'Laporan Saya' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <div className="site-footer-brand">
          <span className="brand">TeBar</span>
          <p>Membantu barang hilang menemukan kembali pemiliknya.</p>
        </div>
        <nav className="site-footer-nav" aria-label="Navigasi footer">
          {footerLinks.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="container site-footer-bottom">
        <p>© 2026 TeBar</p>
      </div>
    </footer>
  )
}
