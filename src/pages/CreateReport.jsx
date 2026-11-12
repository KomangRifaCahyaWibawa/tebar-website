import { useNavigate } from 'react-router-dom'
import ReportForm from '../components/ReportForm'
import ReportTips from '../components/ReportTips'
import { useReports } from '../context/useReports'

export default function CreateReport() {
  const navigate = useNavigate()
  const { addReport } = useReports()

  function handleSubmit(values) {
    const report = {
      id: `user-${Date.now()}`,
      ...values,
      status: values.type === 'lost' ? 'not-found' : 'unclaimed',
    }

    addReport(report)
    navigate(`/laporan/${report.id}`)
  }

  return (
    <div className="container page">
      <div className="page-head">
        <p className="eyebrow">Laporan baru</p>
        <h1>Laporkan barang</h1>
        <p className="page-lede">
          Isi informasi secukupnya. Laporan langsung tampil di papan dan bisa kamu ubah kapan
          saja.
        </p>
      </div>

      <div className="form-layout">
        <ReportForm submitLabel="Kirim laporan" onSubmit={handleSubmit} />
        <ReportTips />
      </div>
    </div>
  )
}
