import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import LogoTebar from '../assets/logotebar.svg'

const navLinks = [
  { to: '/', label: 'Beranda', end: true },
  { to: '/laporan', label: 'Cari Barang' },
  { to: '/laporan-saya', label: 'Laporan Saya' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link to="/" className="brand" onClick={closeMenu}>
          <img src={LogoTebar} alt = "Logo Tebar" className="navbar-logo"></img>
        </Link>

        <button
          type="button"
          className={`nav-toggle${menuOpen ? ' is-open' : ''}`}
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="nav-toggle-bar" aria-hidden="true" />
          <span className="nav-toggle-bar" aria-hidden="true" />
          <span className="nav-toggle-bar" aria-hidden="true" />
        </button>

        <nav id="site-nav" className={`site-nav${menuOpen ? ' is-open' : ''}`} aria-label="Navigasi utama">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className="site-nav-link"
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/laporkan" className="btn btn-primary site-nav-cta" onClick={closeMenu}>
            Laporkan Barang
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
