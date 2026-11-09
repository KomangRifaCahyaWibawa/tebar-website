import { Link } from 'react-router-dom'
import { categories } from '../data/categories'
import { useReports } from '../context/useReports'

export default function CategoryList() {
  const { reports } = useReports()

  function countReportsFor(categoryId) {
    return reports.filter((report) => report.category === categoryId).length
  }

  return (
    <div className="category-list">
      {categories.map((category) => (
        <Link key={category.id} to={`/laporan?kategori=${category.id}`} className="category-item">
          <span className="category-name">{category.label}</span>
          <span className="category-count">{countReportsFor(category.id)} laporan</span>
        </Link>
      ))}
    </div>
  )
}
