import { Link } from 'react-router-dom'
import StatusBadge from '../components/StatusBadge'
import StatusActions from '../components/StatusActions'
import { getCategoryLabel } from '../data/categories'
import { useReports } from '../context/useReports'
import { formatDate } from '../lib/formatDate'

export default function MyReports() {
  const { reports, removeReport, updateReport } = useReports()

  const myReports = reports.filter((report) => report.id.startsWith('user-'))

  function handleRemove(report) {
    const isConfirmed = window.confirm(`Hapus laporan "${report.title}"?`)
    if (isConfirmed) removeReport(report.id)
  }

  return (
    <div className="container page">
      <h1>Laporan Saya</h1>
      <p className="page-subtitle">Laporan yang kamu buat dari perangkat ini.</p>

      {myReports.length === 0 ? (
        <div className="empty-state">
          <p>
            <strong>Kamu belum membuat laporan.</strong>
          </p>
          <p>Laporan yang kamu buat akan tersimpan di perangkat ini.</p>
          <Link to="/laporkan" className="btn btn-primary">
            Laporkan Barang
          </Link>
        </div>
      ) : (
        <ul className="my-report-list">
          {myReports.map((report) => (
            <li key={report.id} className="my-report-row">
              <div className="my-report-info">
                <span className="report-type-label">
                  {report.type === 'lost' ? 'Barang Hilang' : 'Barang Ditemukan'}
                </span>
                <Link to={`/laporan/${report.id}`} className="my-report-title">
                  {report.title}
                </Link>
                <p className="my-report-meta">
                  {getCategoryLabel(report.category)} · {report.location} · {formatDate(report.date)}
                </p>
              </div>
              <div className="my-report-actions">
                <StatusBadge status={report.status} key={report.status} />
                <StatusActions
                  report={report}
                  onUpdateStatus={(status) => updateReport(report.id, { status })}
                />
                <Link to={`/laporan/${report.id}/edit`} className="btn btn-secondary btn-sm">
                  Edit Laporan
                </Link>
                <button type="button" className="btn btn-danger" onClick={() => handleRemove(report)}>
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
