import Icon from './Icon'

const tips = [
  {
    title: 'Sebutkan ciri yang khas',
    description: 'Warna, merek, atau tanda khusus membantu orang mengenali barang.',
  },
  {
    title: 'Tulis lokasi dengan jelas',
    description: 'Sertakan nama gedung, lantai, atau patokan terdekat.',
  },
  {
    title: 'Pasang kontak yang aktif',
    description: 'Pilih kanal yang paling mudah kamu tanggapi.',
  },
]

export default function ReportTips() {
  return (
    <aside className="report-tips" aria-label="Tips membuat laporan">
      <p className="eyebrow">Sebelum kirim</p>
      <h2>Laporan yang memudahkan orang membantu.</h2>

      <ul className="report-tips-list">
        {tips.map((tip) => (
          <li key={tip.title} className="tip-item">
            <span className="tip-check" aria-hidden="true">
              <Icon name="check" size={13} />
            </span>
            <span className="tip-body">
              <strong>{tip.title}</strong>
              <span>{tip.description}</span>
            </span>
          </li>
        ))}
      </ul>

      <p className="report-tips-note">
        Laporan dan foto disimpan di perangkat ini, bukan di server. Kamu bisa mengubah atau
        menghapusnya kapan saja dari Laporan Saya.
      </p>
    </aside>
  )
}
