import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ReportCard from '../components/ReportCard'
import SearchBar from '../components/SearchBar'
import { categories, getCategoryLabel } from '../data/categories'
import { useReports } from '../context/useReports'

export default function ReportList() {
  const { reports } = useReports()
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('q') ?? ''
  const categoryId = searchParams.get('kategori') ?? ''

  const filteredReports = useMemo(() => {
    const keyword = query.toLowerCase()
    return reports.filter((report) => {
      const matchesKeyword = !keyword
        || report.title.toLowerCase().includes(keyword)
        || report.location.toLowerCase().includes(keyword)
        || report.description.toLowerCase().includes(keyword)
        || getCategoryLabel(report.category).toLowerCase().includes(keyword)
      const matchesCategory = !categoryId || report.category === categoryId
      return matchesKeyword && matchesCategory
    })
  }, [reports, query, categoryId])

  function handleSearch(keyword) {
    const nextParams = new URLSearchParams(searchParams)
    if (keyword) {
      nextParams.set('q', keyword)
    } else {
      nextParams.delete('q')
    }
    setSearchParams(nextParams)
  }

  function handleCategoryChange(event) {
    const nextParams = new URLSearchParams(searchParams)
    if (event.target.value) {
      nextParams.set('kategori', event.target.value)
    } else {
      nextParams.delete('kategori')
    }
    setSearchParams(nextParams)
  }

  const hasActiveFilter = query !== '' || categoryId !== ''

  return (
    <div className="container page">
      <h1>Cari Barang</h1>
      <p className="page-subtitle">Cari laporan berdasarkan nama barang, lokasi, atau kategori.</p>

      <SearchBar key={query} initialQuery={query} onSubmit={handleSearch} />

      <div className="filter-row">
        <label htmlFor="filter-kategori" className="filter-label">
          Kategori
        </label>
        <select
          id="filter-kategori"
          className="field-input filter-select"
          value={categoryId}
          onChange={handleCategoryChange}
        >
          <option value="">Semua kategori</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>
        <p className="filter-count" aria-live="polite">
          {filteredReports.length} laporan
        </p>
      </div>

      {filteredReports.length === 0 ? (
        <div className="empty-state">
          <p>
            <strong>Tidak ada laporan yang cocok.</strong>
          </p>
          <p>Coba kata kunci lain atau hapus filter kategori.</p>
          {hasActiveFilter && (
            <Link to="/laporan" className="btn btn-secondary">
              Tampilkan semua laporan
            </Link>
          )}
        </div>
      ) : (
        <div className="report-grid">
          {filteredReports.map((report, index) => (
            <ReportCard key={report.id} report={report} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}
