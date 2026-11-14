import { Link, useNavigate, useParams } from 'react-router-dom'
import ReportForm from '../components/ReportForm'
import ReportTips from '../components/ReportTips'
import { useReports } from '../context/useReports'

export default function EditReport() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { reports, updateReport } = useReports()

  const report = reports.find((item) => item.id === id)

  if (!report) {
    return (
      <div className="container page">
        <div className="page-head">
          <p className="eyebrow">Edit laporan</p>
          <h1>Laporan tidak ditemukan</h1>
          <p className="page-lede">Laporan yang kamu edit tidak ada atau sudah dihapus.</p>
        </div>
        <Link to="/laporan-saya" className="btn btn-secondary">
          Kembali ke Laporan Saya
        </Link>
      </div>
    )
  }

  if (!report.id.startsWith('user-')) {
    return (
      <div className="container page">
        <div className="page-head">
          <p className="eyebrow">Edit laporan</p>
          <h1>Laporan tidak dapat diedit</h1>
          <p className="page-lede">
            Hanya laporan yang kamu buat dari perangkat ini yang dapat diedit.
          </p>
        </div>
        <Link to={`/laporan/${report.id}`} className="btn btn-secondary">
          Kembali ke detail laporan
        </Link>
      </div>
    )
  }

  function handleSubmit(values) {
    updateReport(report.id, values)
    navigate(`/laporan/${report.id}`)
  }

  return (
    <div className="container page">
      <div className="page-head">
        <p className="eyebrow">Perbarui laporan</p>
        <h1>Edit laporan</h1>
        <p className="page-lede">
          Perbarui informasi laporan agar tetap akurat dan mudah dikenali orang lain.
        </p>
      </div>

      <div className="form-layout">
        <ReportForm
          initialReport={report}
          submitLabel="Simpan perubahan"
          onSubmit={handleSubmit}
          lockType
        />
        <ReportTips />
      </div>
    </div>
  )
}
