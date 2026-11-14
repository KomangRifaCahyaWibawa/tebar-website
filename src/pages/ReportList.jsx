import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import ReportCard from '../components/ReportCard'
import SearchBar from '../components/SearchBar'
import { categories, getCategoryLabel } from '../data/categories'
import { useReports } from '../context/useReports'

const typeFilters = [
  { value: '', label: 'Semua', ariaLabel: 'Tampilkan semua laporan' },
  { value: 'lost', label: 'Hilang', ariaLabel: 'Tampilkan barang hilang' },
  { value: 'found', label: 'Temuan', ariaLabel: 'Tampilkan barang temuan' },
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
      <div className="page-head">
        <p className="eyebrow">Direktori laporan</p>
        <h1>Cari barang</h1>
        <p className="page-lede">
          Telusuri laporan barang hilang dan temuan dari komunitas. Gunakan kata kunci, jenis,
          atau kategori.
        </p>
      </div>

      <div className="list-search">
        <SearchBar key={query} initialQuery={query} onSubmit={handleSearch} />
      </div>

      <div className="filter-bar">
        <div className="type-filter" role="group" aria-label="Filter jenis laporan">
          {typeFilters.map((filter) => (
            <button
              key={filter.label}
              type="button"
              className={[
                'type-filter-option',
                typeId === filter.value ? 'is-active' : '',
                filter.value ? `type-${filter.value}` : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-label={filter.ariaLabel}
              aria-pressed={typeId === filter.value}
              onClick={() => handleTypeChange(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="filter-select-wrap">
          <label htmlFor="filter-kategori" className="sr-only">
            Kategori
          </label>
          <select
            id="filter-kategori"
            className="filter-select"
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
        </div>

        {hasActiveFilter && (
          <button type="button" className="filter-reset" onClick={handleResetFilters}>
            Reset filter
          </button>
        )}

        <p className="filter-count" aria-live="polite">
          <strong>{filteredReports.length}</strong> laporan
        </p>
      </div>

      <h2 className="sr-only">Hasil pencarian</h2>

      {filteredReports.length === 0 ? (
        <EmptyState
          icon="search"
          title="Tidak ada laporan yang ditemukan"
          description="Coba ubah kata kunci atau hapus beberapa filter, lalu cari lagi."
        >
          {hasActiveFilter && (
            <button type="button" className="btn btn-secondary" onClick={handleResetFilters}>
              Reset filter
            </button>
          )}
        </EmptyState>
      ) : (
        <div className="report-grid">
          {filteredReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      )}
    </div>
  )
}
