// Daftar kategori barang yang dipakai di seluruh aplikasi.
export const categories = [
  { id: 'elektronik', label: 'Elektronik' },
  { id: 'dokumen', label: 'Dokumen' },
  { id: 'dompet', label: 'Dompet' },
  { id: 'tas', label: 'Tas' },
  { id: 'kunci', label: 'Kunci' },
  { id: 'pakaian', label: 'Pakaian' },
  { id: 'aksesori', label: 'Aksesori' },
  { id: 'kendaraan', label: 'Kendaraan' },
  { id: 'buku', label: 'Buku' },
  { id: 'lainnya', label: 'Lainnya' },
]

export function getCategoryLabel(id) {
  const category = categories.find((item) => item.id === id)
  return category ? category.label : id
}
