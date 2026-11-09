import { useEffect, useRef, useState } from 'react'

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Ya, lanjutkan',
  cancelLabel = 'Batal',
  tone = 'primary',
  onConfirm,
  onClose,
}) {
  const [closing, setClosing] = useState(false)
  const confirmButtonRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    const frame = requestAnimationFrame(() => confirmButtonRef.current?.focus())
    return () => cancelAnimationFrame(frame)
  }, [open])

  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKeyDown(event) {
      if (event.key === 'Escape' && !closing) {
        setClosing(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, closing])

  useEffect(() => {
    if (!open || !closing) return undefined
    const fallback = setTimeout(() => {
      setClosing(false)
      onClose()
    }, 500)
    return () => clearTimeout(fallback)
  }, [open, closing, onClose])

  if (!open) return null

  function requestClose() {
    if (closing) return
    setClosing(true)
  }

  function handleConfirm() {
    if (closing) return
    onConfirm()
    setClosing(true)
  }

  function handleAnimationEnd(event) {
    if (closing && event.animationName === 'confirm-overlay-out') {
      setClosing(false)
      onClose()
    }
  }

  return (
    <div
      className={`confirm-overlay${closing ? ' is-closing' : ''}`}
      role="presentation"
      onClick={requestClose}
      onAnimationEnd={handleAnimationEnd}
    >
      <div
        className="confirm-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-message"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="confirm-dialog-title" className="confirm-dialog-title">
          {title}
        </h2>
        <p id="confirm-dialog-message" className="confirm-dialog-message">
          {message}
        </p>
        <div className="confirm-dialog-actions">
          <button type="button" className="btn btn-secondary" onClick={requestClose}>
            {cancelLabel}
          </button>
          <button
            type="button"
            ref={confirmButtonRef}
            className={`btn ${tone === 'danger' ? 'btn-danger' : 'btn-primary'}`}
            onClick={handleConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
