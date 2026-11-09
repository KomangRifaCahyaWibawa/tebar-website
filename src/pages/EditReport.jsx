import { Link, useNavigate, useParams } from 'react-router-dom'
import ReportForm from '../components/ReportForm'
import { useReports } from '../context/useReports'

export default function EditReport() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { reports, updateReport } = useReports()

  const report = reports.find((item) => item.id === id)

  if (!report) {
    return (
      <div className="container page">
        <h1>Laporan tidak ditemukan</h1>
        <p className="page-subtitle">Laporan yang kamu edit tidak ada atau sudah dihapus.</p>
        <Link to="/laporan-saya" className="btn btn-secondary">
          Kembali ke Laporan Saya
        </Link>
      </div>
    )
  }

  if (!report.id.startsWith('user-')) {
    return (
      <div className="container page">
        <h1>Laporan tidak dapat diedit</h1>
        <p className="page-subtitle">
          Hanya laporan yang kamu buat dari perangkat ini yang dapat diedit.
        </p>
        <Link to={`/laporan/${report.id}`} className="btn btn-secondary">
          Kembali ke detail laporan
        </Link>
      </div>
    )
  }

  function handleSubmit(values) {
    // updateReport menggabungkan data lama dengan perubahan tanpa membuat laporan baru.
    updateReport(report.id, values)
    navigate(`/laporan/${report.id}`)
  }

  return (
    <div className="container page">
      <h1>Edit Laporan</h1>
      <p className="page-subtitle">Perbarui informasi laporan agar tetap akurat.</p>

      <ReportForm
        initialReport={report}
        submitLabel="Simpan Perubahan"
        onSubmit={handleSubmit}
        lockType
      />
    </div>
  )
}
