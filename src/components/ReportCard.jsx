import { Link } from 'react-router-dom'
import { getCategoryLabel } from '../data/categories'
import { formatDate } from '../lib/formatDate'
import StatusBadge from './StatusBadge'

export default function ReportCard({ report, index = 0 }) {
  const typeLabel = report.type === 'lost' ? 'Barang Hilang' : 'Barang Ditemukan'

  return (
    <Link
      className="report-card"
      to={`/laporan/${report.id}`}
      style={{ '--appear-delay': `${Math.min(index, 8) * 45}ms` }}
    >
      <div className="report-card-photo">
        {report.image ? (
          <img src={report.image} alt={`Foto ${report.title}`} loading="lazy" />
        ) : (
          <span className="report-card-no-photo">Tidak ada foto</span>
        )}
      </div>
      <div className="report-card-body">
        <span className={`report-type-label ${report.type === 'lost' ? 'is-lost' : 'is-found'}`}>
          {typeLabel}
        </span>
        <h3 className="report-card-title">{report.title}</h3>
        <p className="report-card-meta">
          {getCategoryLabel(report.category)} · {report.location}
        </p>
        <p className="report-card-date">{formatDate(report.date)}</p>
        <StatusBadge status={report.status} />
      </div>
    </Link>
  )
}
