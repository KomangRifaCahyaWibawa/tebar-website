import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import ReportCard from '../components/ReportCard'
import SearchBar from '../components/SearchBar'
import { categories, getCategoryLabel } from '../data/categories'
import { useReports } from '../context/useReports'

const typeFilters = [
  { value: '', label: 'Semua' },
  { value: 'lost', label: 'Barang Hilang' },
  { value: 'found', label: 'Barang Ditemukan' },
]

export default function ReportList() {
  const { reports } = useReports()
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('q') ?? ''
  const rawType = searchParams.get('jenis') ?? ''
  const typeId = rawType === 'lost' || rawType === 'found' ? rawType : ''
  const categoryId = searchParams.get('kategori') ?? ''

  const filteredReports = useMemo(() => {
    const keyword = query.toLowerCase()
    return reports.filter((report) => {
      const matchesKeyword = !keyword
        || report.title.toLowerCase().includes(keyword)
        || report.location.toLowerCase().includes(keyword)
        || report.description.toLowerCase().includes(keyword)
        || getCategoryLabel(report.category).toLowerCase().includes(keyword)
      const matchesType = !typeId || report.type === typeId
      const matchesCategory = !categoryId || report.category === categoryId
      return matchesKeyword && matchesType && matchesCategory
    })
  }, [reports, query, typeId, categoryId])

  function setParam(key, value) {
    const nextParams = new URLSearchParams(searchParams)
    if (value) {
      nextParams.set(key, value)
    } else {
      nextParams.delete(key)
    }
    setSearchParams(nextParams)
  }

  function handleSearch(keyword) {
    setParam('q', keyword)
  }

  function handleTypeChange(type) {
    setParam('jenis', type)
  }

  function handleCategoryChange(event) {
    setParam('kategori', event.target.value)
  }

  function handleResetFilters() {
    setSearchParams(new URLSearchParams())
  }

  const hasActiveFilter = query !== '' || typeId !== '' || categoryId !== ''

  return (
    <div className="container page">
      <h1>Cari Barang</h1>
      <p className="page-subtitle">Cari laporan berdasarkan nama barang, lokasi, atau kategori.</p>

      <SearchBar key={query} initialQuery={query} onSubmit={handleSearch} />

      <div className="filter-bar">

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
          <div className="type-filter" role="group" aria-label="Filter jenis laporan">
          {typeFilters.map((filter) => (
            <button
              key={filter.label}
              type="button"
              className={`type-filter-option${typeId === filter.value ? ' is-active' : ''}`}
              aria-pressed={typeId === filter.value}
              onClick={() => handleTypeChange(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
          {hasActiveFilter && (
            <button type="button" className="btn btn-secondary btn-sm" onClick={handleResetFilters}>
              Reset Filter
            </button>
          )}
          <p className="filter-count" aria-live="polite">
            {filteredReports.length} laporan
          </p>
        </div>
      </div>

      {filteredReports.length === 0 ? (
        <div className="empty-state">
          <p>
            <strong>Tidak ada laporan yang ditemukan.</strong>
          </p>
          <p>Coba ubah kata kunci pencarian atau hapus beberapa filter, lalu coba lagi.</p>
          {hasActiveFilter && (
            <button type="button" className="btn btn-secondary" onClick={handleResetFilters}>
              Reset Filter
            </button>
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
