import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import LogoTebar from '../assets/logotebar.svg'
import { useHomeScroll } from '../hooks/useHomeScroll'
import { useHideOnScroll } from '../hooks/useHideOnScroll'

const navLinks = [
  { to: '/', label: 'Beranda', end: true, isHome: true },
  { to: '/laporan', label: 'Cari barang' },
  { to: '/laporan-saya', label: 'Laporan saya' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef(null)
  const closeMenu = () => setMenuOpen(false)
  const handleHomeScroll = useHomeScroll()
  const scrollHidden = useHideOnScroll()
  const headerHidden = scrollHidden && !menuOpen

  useEffect(() => {
    if (!menuOpen) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  function handleHomeClick(event) {
    closeMenu()
    handleHomeScroll(event)
  }

  return (
    <header className={`site-header${headerHidden ? ' is-hidden' : ''}`}>
      <div className="container site-header-inner">
        <Link to="/" className="brand" onClick={handleHomeClick}>
          <img src={LogoTebar} alt="TeBar" className="navbar-logo" />
        </Link>

        <button
          ref={toggleRef}
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

        <nav
          id="site-nav"
          className={`site-nav${menuOpen ? ' is-open' : ''}`}
          aria-label="Navigasi utama"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className="site-nav-link"
              onClick={link.isHome ? handleHomeClick : closeMenu}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/laporkan" className="btn btn-primary site-nav-cta" onClick={closeMenu}>
            Laporkan barang
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
