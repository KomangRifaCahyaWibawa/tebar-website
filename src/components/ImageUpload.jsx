import { useRef, useState } from 'react'
import Icon from './Icon'
import { ACCEPTED_FILE_INPUT, UNREADABLE_MESSAGE, imageFileToDataUrl, validateImageFile } from '../lib/image'

export default function ImageUpload({ value, onChange }) {
  const inputRef = useRef(null)
  const [error, setError] = useState('')

  function handleFileChange(event) {
    const file = event.target.files[0]
    event.target.value = ''
    if (!file) return

    const validationMessage = validateImageFile(file)
    if (validationMessage) {
      setError(validationMessage)
      return
    }

    setError('')
    imageFileToDataUrl(file)
      .then((dataUrl) => onChange(dataUrl))
      .catch(() => setError(UNREADABLE_MESSAGE))
  }

  function handleRemove() {
    setError('')
    onChange(null)
  }

  return (
    <div className="image-upload">
      <span className="field-label">
        Foto barang <span className="field-optional">opsional</span>
      </span>

      {value ? (
        <div className="image-upload-preview">
          <img src={value} alt="Pratinjau foto barang" />
          <div className="image-upload-actions">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => inputRef.current?.click()}
            >
              Ganti foto
            </button>
            <button type="button" className="btn btn-danger btn-sm" onClick={handleRemove}>
              Hapus foto
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="image-upload-drop"
          onClick={() => inputRef.current?.click()}
        >
          <span className="image-upload-drop-icon" aria-hidden="true">
            <Icon name="image" size={20} />
          </span>
          <span className="image-upload-drop-title">Pilih foto barang</span>
          <span className="image-upload-drop-hint">
            JPG, JPEG, atau PNG · maksimal 5 MB
          </span>
        </button>
      )}

      <p className="field-help">Foto disimpan di perangkat ini bersama laporanmu.</p>
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_FILE_INPUT}
        onChange={handleFileChange}
        aria-label="Pilih foto barang"
        className="image-upload-input"
      />
    </div>
  )
}
