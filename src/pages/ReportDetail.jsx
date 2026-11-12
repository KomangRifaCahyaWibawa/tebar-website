import { Link, useParams } from 'react-router-dom'
import StatusBadge from '../components/StatusBadge'
import StatusActions from '../components/StatusActions'
import { getCategoryLabel } from '../data/categories'
import { useReports } from '../context/useReports'
import { formatDate } from '../lib/formatDate'

const platformLabels = {
  whatsapp: 'WhatsApp',
  telepon: 'Telepon',
  email: 'Email',
}

function contactHref(contact) {
  if (contact.platform === 'email') return `mailto:${contact.value}`
  const digits = contact.value.replace(/[^+\d]/g, '')
  if (contact.platform === 'whatsapp') return `https://wa.me/${digits.replace('+', '')}`
  return `tel:${digits}`
}

export default function ReportDetail() {
  const { id } = useParams()
  const { reports, updateReport } = useReports()
  const report = reports.find((item) => item.id === id)

  if (!report) {
    return (
      <div className="container page">
        <h1>Laporan tidak ditemukan</h1>
        <p className="page-subtitle">Laporan yang kamu cari tidak ada atau sudah dihapus.</p>
        <Link to="/laporan" className="btn btn-secondary">
          Kembali ke daftar laporan
        </Link>
      </div>
    )
  }

  const isOwnReport = report.id.startsWith('user-')
  const typeLabel = report.type === 'lost' ? 'Barang Hilang' : 'Barang Ditemukan'

  return (
    <div className="container page">
      <div className="report-detail">
        <div className="report-detail-photo">
          {report.image ? (
            <img src={report.image} alt={`Foto ${report.title}`} />
          ) : (
            <div className="report-detail-no-photo">
              <span>Tidak ada foto</span>
            </div>
          )}
        </div>

        <div className="report-detail-info">
          <span className={`report-type-label ${report.type === 'lost' ? 'is-lost' : 'is-found'}`}>
            {typeLabel}
          </span>
          <h1 className="report-detail-title">{report.title}</h1>
          <StatusBadge status={report.status} key={report.status} />

          {isOwnReport && (
            <div className="report-own-actions">
              <Link to={`/laporan/${report.id}/edit`} className="btn btn-secondary btn-sm">
                Edit Laporan
              </Link>
              <StatusActions
                report={report}
                onUpdateStatus={(status) => updateReport(report.id, { status })}
              />
            </div>
          )}

          <dl className="detail-list">
            <div>
              <dt>Kategori</dt>
              <dd>{getCategoryLabel(report.category)}</dd>
            </div>
            <div>
              <dt>Lokasi</dt>
              <dd>{report.location}</dd>
            </div>
            <div>
              <dt>Tanggal</dt>
              <dd>{formatDate(report.date)}</dd>
            </div>
          </dl>

          {report.description && (
            <div className="detail-description">
              <h2 className="detail-section-title">Deskripsi</h2>
              <p>{report.description}</p>
            </div>
          )}

          <div className="detail-contact">
            <h2 className="detail-section-title">Hubungi Pelapor</h2>
            {report.contacts.length > 0 ? (
              <ul className="contact-list">
                {report.contacts.map((contact) => (
                  <li key={`${contact.platform}-${contact.value}`}>
                    <a
                      href={contactHref(contact)}
                      className="contact-link"
                      target={contact.platform === 'whatsapp' ? '_blank' : undefined}
                      rel={contact.platform === 'whatsapp' ? 'noreferrer' : undefined}
                    >
                      <span className="contact-platform">
                        {platformLabels[contact.platform] ?? contact.platform}
                      </span>
                      <span className="contact-value">{contact.value}</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="field-help">Pelapor tidak mencantumkan kontak.</p>
            )}
          </div>

          <Link to="/laporan" className="btn btn-secondary report-back-link">
            ← Kembali ke daftar laporan
          </Link>
        </div>
      </div>
    </div>
  )
}
