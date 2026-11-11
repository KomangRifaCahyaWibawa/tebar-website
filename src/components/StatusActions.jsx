import { useEffect, useRef, useState } from 'react'
import ConfirmDialog from './ConfirmDialog'
import { getStatusOptions, STATUS_LABELS, statusActionLabel } from '../lib/status'

export default function StatusActions({ report, onUpdateStatus }) {
  const [pendingStatus, setPendingStatus] = useState(null)
  const [feedback, setFeedback] = useState('')
  const feedbackTimerRef = useRef(null)

  const statusOptions = getStatusOptions(report.type, report.status)

  useEffect(() => {
    return () => clearTimeout(feedbackTimerRef.current)
  }, [])

  function handleConfirm() {
    if (!pendingStatus) return
    onUpdateStatus(pendingStatus)

    clearTimeout(feedbackTimerRef.current)
    setFeedback(`Status diperbarui jadi ${STATUS_LABELS[pendingStatus]}.`)
    feedbackTimerRef.current = setTimeout(() => setFeedback(''), 4000)
  }

  return (
    <div className="status-actions">
      {statusOptions.map((status) => (
        <button
          key={status}
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => setPendingStatus(status)}
        >
          {statusActionLabel(status)}
        </button>
      ))}

      {feedback && (
        <p className="status-feedback" role="status">
          {feedback}
        </p>
      )}

      <ConfirmDialog
        key={pendingStatus ?? 'none'}
        open={pendingStatus !== null}
        title="Ubah status laporan?"
        message={
          pendingStatus
            ? `Status laporan akan diubah menjadi "${STATUS_LABELS[pendingStatus]}". Perubahan disimpan pada perangkat ini.`
            : ''
        }
        confirmLabel={pendingStatus ? `Ya, ${STATUS_LABELS[pendingStatus]}` : 'Ya'}
        onConfirm={handleConfirm}
        onClose={() => setPendingStatus(null)}
      />
    </div>
  )
}
