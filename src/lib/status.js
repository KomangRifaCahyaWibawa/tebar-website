export const STATUS_LABELS = {
  'not-found': 'Belum ditemukan',
  'found': 'Sudah ditemukan',
  'unclaimed': 'Belum diklaim',
  'claimed': 'Sudah diklaim',
}

export const STATUS_FLOW = {
  lost: ['not-found', 'found'],
  found: ['unclaimed', 'claimed'],
}

export function isValidStatus(type, status) {
  return STATUS_FLOW[type]?.includes(status) ?? false
}

export function getStatusOptions(type, currentStatus) {
  const flow = STATUS_FLOW[type] ?? []
  return flow.filter((status) => status !== currentStatus)
}

export function statusActionLabel(status) {
  return `Tandai "${STATUS_LABELS[status]}"`
}
