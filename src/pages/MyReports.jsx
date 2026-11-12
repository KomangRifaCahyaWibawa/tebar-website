import { useState } from 'react'
import { Link } from 'react-router-dom'
import ConfirmDialog from '../components/ConfirmDialog'
import EmptyState from '../components/EmptyState'
import StatusBadge from '../components/StatusBadge'
import StatusActions from '../components/StatusActions'
import { getCategoryLabel } from '../data/categories'
import { useReports } from '../context/useReports'
import { formatDate } from '../lib/formatDate'

export default function MyReports() {
  const { reports, removeReport, updateReport } = useReports()
  const [reportToRemove, setReportToRemove] = useState(null)

  const myReports = reports.filter((report) => report.id.startsWith('user-'))

  function handleConfirmRemove() {
    if (reportToRemove) removeReport(reportToRemove.id)
  }

  return (
    <div className="container page">
      <h1>Laporan Saya</h1>
      <p className="page-subtitle">Laporan yang kamu buat dari perangkat ini.</p>

      {myReports.length === 0 ? (
        <EmptyState
          icon="inbox"
          title="Kamu belum membuat laporan."
          description="Laporan yang kamu buat akan tersimpan di perangkat ini."
        >
          <Link to="/laporkan" className="btn btn-primary">
            Laporkan Barang
          </Link>
        </EmptyState>
      ) : (
        <ul className="my-report-list">
          {myReports.map((report) => (
            <li key={report.id} className="my-report-row">
              <div className="my-report-info">
                <span className={`report-type-label ${report.type === 'lost' ? 'is-lost' : 'is-found'}`}>
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
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setReportToRemove(report)}
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ConfirmDialog
        key={reportToRemove?.id ?? 'none'}
        open={reportToRemove !== null}
        title="Hapus laporan ini?"
        message={
          reportToRemove
            ? `Laporan "${reportToRemove.title}" akan dihapus dari perangkat ini. Tindakan ini tidak dapat dibatalkan.`
            : ''
        }
        confirmLabel="Ya, hapus"
        tone="danger"
        onConfirm={handleConfirmRemove}
        onClose={() => setReportToRemove(null)}
      />
    </div>
  )
}
