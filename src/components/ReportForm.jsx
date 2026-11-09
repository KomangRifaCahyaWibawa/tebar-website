import { useState } from 'react'
import ImageUpload from './ImageUpload'
import { categories } from '../data/categories'
import { todayISO } from '../lib/formatDate'

const contactPlatforms = [
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'telepon', label: 'Telepon' },
  { id: 'email', label: 'Email' },
]

export default function ReportForm({
  initialReport,
  submitLabel = 'Kirim Laporan',
  onSubmit,
  lockType = false,
}) {
  const [form, setForm] = useState(() => ({
    type: initialReport?.type ?? 'lost',
    title: initialReport?.title ?? '',
    category: initialReport?.category ?? '',
    location: initialReport?.location ?? '',
    date: initialReport?.date ?? todayISO(),
    description: initialReport?.description ?? '',
    contactPlatform: initialReport?.contacts?.[0]?.platform ?? 'whatsapp',
    contactValue: initialReport?.contacts?.[0]?.value ?? '',
  }))
  const [image, setImage] = useState(initialReport?.image ?? null)

  function handleFormChange(event) {
    const { name, value } = event.target
    setForm((previousForm) => ({ ...previousForm, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    onSubmit({
      type: form.type,
      title: form.title.trim(),
      category: form.category,
      description: form.description.trim(),
      location: form.location.trim(),
      date: form.date,
      image,
      contacts: form.contactValue.trim()
        ? [{ platform: form.contactPlatform, value: form.contactValue.trim() }]
        : [],
    })
  }

  return (
    <form className="report-form" onSubmit={handleSubmit}>
      <h2 className="form-section-title">Informasi Barang</h2>

      <div className="field">
        <span className="field-label">Jenis Laporan</span>
        <div className="radio-row">
          <label className={`radio-option${form.type === 'lost' ? ' is-active' : ''}`}>
            <input
              type="radio"
              name="type"
              value="lost"
              checked={form.type === 'lost'}
              onChange={handleFormChange}
              disabled={lockType}
            />
            Barang Hilang
          </label>
          <label className={`radio-option${form.type === 'found' ? ' is-active' : ''}`}>
            <input
              type="radio"
              name="type"
              value="found"
              checked={form.type === 'found'}
              onChange={handleFormChange}
              disabled={lockType}
            />
            Barang Ditemukan
          </label>
        </div>
        {lockType && (
          <p className="field-help">Jenis laporan tidak dapat diubah saat mengedit.</p>
        )}
      </div>

      <div className="field">
        <label className="field-label" htmlFor="report-title">
          Nama Barang
        </label>
        <input
          id="report-title"
          name="title"
          className="field-input"
          value={form.title}
          onChange={handleFormChange}
          required
          placeholder="contoh: Dompet Kulit Hitam"
        />
      </div>

      <div className="field-pair">
        <div className="field">
          <label className="field-label" htmlFor="report-category">
            Kategori
          </label>
          <select
            id="report-category"
            name="category"
            className="field-input"
            value={form.category}
            onChange={handleFormChange}
            required
          >
            <option value="" disabled>
              Pilih kategori
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label className="field-label" htmlFor="report-date">
            Tanggal
          </label>
          <input
            id="report-date"
            name="date"
            type="date"
            className="field-input"
            value={form.date}
            onChange={handleFormChange}
            required
          />
        </div>
      </div>

      <div className="field">
        <label className="field-label" htmlFor="report-location">
          Lokasi
        </label>
        <input
          id="report-location"
          name="location"
          className="field-input"
          value={form.location}
          onChange={handleFormChange}
          required
          placeholder="contoh: Universitas Udayana"
        />
      </div>

      <div className="field">
        <label className="field-label" htmlFor="report-description">
          Deskripsi <span className="field-optional">opsional</span>
        </label>
        <textarea
          id="report-description"
          name="description"
          className="field-input"
          rows={4}
          value={form.description}
          onChange={handleFormChange}
          placeholder="Ciri-ciri barang yang membantu orang mengenalinya"
        />
      </div>

      <h2 className="form-section-title">Foto Barang</h2>
      <ImageUpload value={image} onChange={setImage} />

      <h2 className="form-section-title">Kontak Pelapor</h2>
      <div className="field-pair">
        <div className="field">
          <label className="field-label" htmlFor="report-contact-platform">
            Platform
          </label>
          <select
            id="report-contact-platform"
            name="contactPlatform"
            className="field-input"
            value={form.contactPlatform}
            onChange={handleFormChange}
          >
            {contactPlatforms.map((platform) => (
              <option key={platform.id} value={platform.id}>
                {platform.label}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label className="field-label" htmlFor="report-contact-value">
            Kontak
          </label>
          <input
            id="report-contact-value"
            name="contactValue"
            className="field-input"
            value={form.contactValue}
            onChange={handleFormChange}
            required
            placeholder={
              form.contactPlatform === 'email'
                ? 'contoh: nama@example.com'
                : 'contoh: +62 812-3456-7890'
            }
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
