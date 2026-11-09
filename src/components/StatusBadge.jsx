const statusLabels = {
  'not-found': 'Belum ditemukan',
  'found': 'Sudah ditemukan',
  'unclaimed': 'Belum diklaim',
  'claimed': 'Sudah diklaim',
}

export default function StatusBadge({ status }) {
  return <span className={`status-badge status-${status}`}>{statusLabels[status] ?? status}</span>
}
