import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from './Icon'

export default function SearchBar({ initialQuery = '', onSubmit }) {
  const [query, setQuery] = useState(initialQuery)
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    const keyword = query.trim()

    if (onSubmit) {
      onSubmit(keyword)
      return
    }

    navigate(keyword ? `/laporan?q=${encodeURIComponent(keyword)}` : '/laporan')
  }

  return (
    <form className="search-bar" role="search" onSubmit={handleSubmit}>
      <label htmlFor="search-input" className="sr-only">
        Cari laporan
      </label>
      <span className="search-bar-icon" aria-hidden="true">
        <Icon name="search" size={18} />
      </span>
      <input
        id="search-input"
        type="search"
        placeholder="Cari barang atau lokasi"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button type="submit" aria-label="Cari">
        <span className="search-submit-label">Cari</span>
        <Icon name="arrow-right" size={16} className="icon search-submit-icon" />
      </button>
    </form>
  )
}
