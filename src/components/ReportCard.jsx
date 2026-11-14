import { Link } from 'react-router-dom'
import { getCategoryLabel } from '../data/categories'
import { formatDate } from '../lib/formatDate'
import Icon from './Icon'
import StatusBadge from './StatusBadge'

export default function ReportCard({ report }) {
  const typeLabel = report.type === 'lost' ? 'Hilang' : 'Temuan'

  return (
    <Link className="report-card" to={`/laporan/${report.id}`}>
      <div className="report-card-photo">
        {report.image ? (
          <img
            src={report.image}
            alt={`Foto ${report.title}`}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className="report-card-no-photo" aria-hidden="true">
            <Icon name="image" size={18} />
          </span>
        )}
      </div>
      <div className="report-card-body">
        <div className="report-card-top">
          <span className={`report-type-label ${report.type === 'lost' ? 'is-lost' : 'is-found'}`}>
            {typeLabel}
          </span>
          <StatusBadge status={report.status} />
        </div>
        <h3 className="report-card-title">{report.title}</h3>
        <p className="report-card-meta">
          {getCategoryLabel(report.category)} · {report.location}
        </p>
        <div className="report-card-foot">
          <span className="report-card-date">{formatDate(report.date)}</span>
          <span className="report-card-arrow" aria-hidden="true">
            <Icon name="arrow-up-right" size={14} />
          </span>
        </div>
      </div>
    </Link>
  )
}
