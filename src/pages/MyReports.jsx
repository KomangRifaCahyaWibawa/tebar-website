import { useState } from 'react'
import { Link } from 'react-router-dom'
import ConfirmDialog from '../components/ConfirmDialog'
import EmptyState from '../components/EmptyState'
import Icon from '../components/Icon'
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
      <div className="page-head page-head-row">
        <div>
          <p className="eyebrow">Arsip di perangkat ini</p>
          <h1>Laporan saya</h1>
          <p className="page-lede">
            Laporan yang kamu buat dari perangkat ini. Status, isi, dan fotonya bisa diperbarui
            kapan saja.
          </p>
        </div>
        {myReports.length > 0 && (
          <Link to="/laporkan" className="btn btn-primary">
            Buat laporan
          </Link>
        )}
      </div>

      {myReports.length === 0 ? (
        <EmptyState
          icon="inbox"
          title="Kamu belum membuat laporan"
          description="Laporan yang kamu buat akan tersimpan di perangkat ini."
        >
          <Link to="/laporkan" className="btn btn-primary">
            Laporkan barang
          </Link>
        </EmptyState>
      ) : (
        <ul className="my-report-list">
          {myReports.map((report) => (
            <li key={report.id} className="my-report-row">
              <div className="my-report-thumb" aria-hidden="true">
                {report.image ? (
                  <img src={report.image} alt="" loading="lazy" decoding="async" />
                ) : (
                  <Icon name="image" size={18} />
                )}
              </div>

              <div className="my-report-info">
                <div className="my-report-kicker">
                  <span
                    className={`report-type-label ${
                      report.type === 'lost' ? 'is-lost' : 'is-found'
                    }`}
                  >
                    {report.type === 'lost' ? 'Barang hilang' : 'Barang ditemukan'}
                  </span>
                  <StatusBadge status={report.status} key={report.status} />
                </div>
                <Link to={`/laporan/${report.id}`} className="my-report-title">
                  {report.title}
                </Link>
                <p className="my-report-meta">
                  {getCategoryLabel(report.category)} · {report.location} ·{' '}
                  {formatDate(report.date)}
                </p>
              </div>

              <div className="my-report-actions">
                <StatusActions
                  report={report}
                  onUpdateStatus={(status) => updateReport(report.id, { status })}
                />
                <div className="my-report-manage">
                  <Link
                    to={`/laporan/${report.id}/edit`}
                    className="btn btn-secondary btn-sm"
                    aria-label={`Edit laporan ${report.title}`}
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    aria-label={`Hapus laporan ${report.title}`}
                    onClick={() => setReportToRemove(report)}
                  >
                    Hapus
                  </button>
                </div>
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
