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
  submitLabel = 'Kirim laporan',
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
      <h2 className="form-section-title">
        <span className="form-section-num">01</span>
        <span>Informasi barang</span>
      </h2>

      <fieldset className="radio-fieldset">
        <legend className="field-label">Jenis laporan</legend>
        <div className="radio-row">
          <label className={`radio-option is-lost${form.type === 'lost' ? ' is-active' : ''}`}>
            <input
              className="radio-input"
              type="radio"
              name="type"
              value="lost"
              checked={form.type === 'lost'}
              onChange={handleFormChange}
              disabled={lockType}
            />
            <span className="radio-dot" aria-hidden="true" />
            <span className="radio-text">
              <span className="radio-title">Barang hilang</span>
              <span className="radio-desc">Saya kehilangan barang ini.</span>
            </span>
          </label>

          <label className={`radio-option is-found${form.type === 'found' ? ' is-active' : ''}`}>
            <input
              className="radio-input"
              type="radio"
              name="type"
              value="found"
              checked={form.type === 'found'}
              onChange={handleFormChange}
              disabled={lockType}
            />
            <span className="radio-dot" aria-hidden="true" />
            <span className="radio-text">
              <span className="radio-title">Barang ditemukan</span>
              <span className="radio-desc">Saya menemukan barang ini.</span>
            </span>
          </label>
        </div>
        {lockType && (
          <p className="field-help">Jenis laporan tidak dapat diubah saat mengedit.</p>
        )}
      </fieldset>

      <div className="field">
        <label className="field-label" htmlFor="report-title">
          Nama barang
        </label>
        <input
          id="report-title"
          name="title"
          className="field-input"
          value={form.title}
          onChange={handleFormChange}
          required
          placeholder="Contoh: Dompet kulit hitam"
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
          placeholder="Contoh: Universitas Udayana"
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

      <h2 className="form-section-title">
        <span className="form-section-num">02</span>
        <span>Foto barang</span>
      </h2>
      <ImageUpload value={image} onChange={setImage} />

      <h2 className="form-section-title">
        <span className="form-section-num">03</span>
        <span>Kontak pelapor</span>
      </h2>

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
                ? 'Contoh: nama@example.com'
                : 'Contoh: +62 812-3456-7890'
            }
          />
        </div>
      </div>
      <p className="field-help">
        Kontak akan tampil di halaman laporan agar orang bisa menghubungimu.
      </p>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {submitLabel}
        </button>
        <p className="form-actions-note">
          Laporan bisa diedit kapan saja dari Laporan Saya.
        </p>
      </div>
    </form>
  )
}
