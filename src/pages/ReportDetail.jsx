import { Link, useParams } from 'react-router-dom'
import Icon from '../components/Icon'
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

const contactIcons = {
  whatsapp: 'message',
  telepon: 'phone',
  email: 'mail',
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
        <Link to="/laporan" className="back-link">
          <Icon name="arrow-left" size={16} />
          Semua laporan
        </Link>
        <div className="page-head">
          <p className="eyebrow">Laporan</p>
          <h1>Laporan tidak ditemukan</h1>
          <p className="page-lede">Laporan yang kamu cari tidak ada atau sudah dihapus.</p>
        </div>
        <Link to="/laporan" className="btn btn-secondary">
          Kembali ke daftar laporan
        </Link>
      </div>
    )
  }

  const isOwnReport = report.id.startsWith('user-')
  const typeLabel = report.type === 'lost' ? 'Barang hilang' : 'Barang ditemukan'

  return (
    <div className="container page">
      <Link to="/laporan" className="back-link">
        <Icon name="arrow-left" size={16} />
        Semua laporan
      </Link>

      <div className="detail-grid">
        <div className="detail-media">
          {report.image ? (
            <img
              src={report.image}
              alt={`Foto ${report.title}`}
              decoding="async"
            />
          ) : (
            <div className="detail-no-photo">
              <Icon name="image" size={19} />
              <span>Tidak ada foto</span>
            </div>
          )}
        </div>

        <div className="detail-body">
          <div className="detail-kicker">
            <span className={`report-type-label ${report.type === 'lost' ? 'is-lost' : 'is-found'}`}>
              {typeLabel}
            </span>
            <StatusBadge status={report.status} key={report.status} />
          </div>

          <h1 className="detail-title">{report.title}</h1>

          {isOwnReport && (
            <div className="report-own">
              <p className="report-own-label">Laporanmu</p>
              <div className="report-own-actions">
                <Link to={`/laporan/${report.id}/edit`} className="btn btn-secondary btn-sm">
                  Edit laporan
                </Link>
                <StatusActions
                  report={report}
                  onUpdateStatus={(status) => updateReport(report.id, { status })}
                />
              </div>
            </div>
          )}

          <dl className="detail-facts">
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
            <section className="detail-section">
              <h2 className="detail-section-title">Deskripsi</h2>
              <p className="detail-description">{report.description}</p>
            </section>
          )}

          <section className="contact-panel" aria-labelledby="contact-title">
            <h2 id="contact-title" className="contact-heading">
              Hubungi pelapor
            </h2>
            <p className="contact-note">
              Sebutkan ciri barang saat menghubungi agar pelapor yakin.
            </p>

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
                      <span className="contact-icon" aria-hidden="true">
                        <Icon name={contactIcons[contact.platform] ?? 'message'} size={17} />
                      </span>
                      <span className="contact-text">
                        <span className="contact-platform">
                          {platformLabels[contact.platform] ?? contact.platform}
                        </span>
                        <span className="contact-value">{contact.value}</span>
                      </span>
                      <Icon
                        name="arrow-up-right"
                        size={16}
                        className="icon contact-arrow"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="field-help">Pelapor tidak mencantumkan kontak.</p>
            )}
          </section>

          <Link to="/laporan" className="back-link report-back-link">
            <Icon name="arrow-left" size={16} />
            Kembali ke semua laporan
          </Link>
        </div>
      </div>
    </div>
  )
}
