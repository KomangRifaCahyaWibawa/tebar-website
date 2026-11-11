import { useNavigate } from 'react-router-dom'
import ReportForm from '../components/ReportForm'
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
      <h1>Laporkan Barang</h1>
      <p className="page-subtitle">
        Bagikan informasi barang yang kamu hilang atau kamu temukan agar bisa kembali ke pemiliknya.
      </p>

      <ReportForm submitLabel="Kirim Laporan" onSubmit={handleSubmit} />
    </div>
  )
}
