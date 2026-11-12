import { Link } from 'react-router-dom'
import { categories } from '../data/categories'
import { useReports } from '../context/useReports'
import Icon from './Icon'

export default function CategoryList() {
  const { reports } = useReports()

  function countReportsFor(categoryId) {
    return reports.filter((report) => report.category === categoryId).length
  }

  return (
    <ul className="category-list">
      {categories.map((category) => (
        <li key={category.id}>
          <Link to={`/laporan?kategori=${category.id}`} className="category-item">
            <span className="category-name">{category.label}</span>
            <span className="category-count">{countReportsFor(category.id)} laporan</span>
            <Icon
              name="arrow-up-right"
              size={16}
              className="icon category-arrow"
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}
