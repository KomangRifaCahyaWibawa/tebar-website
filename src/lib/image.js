
export const MAX_IMAGE_SIZE_MB = 5
export const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png']
export const ACCEPTED_FILE_INPUT = 'image/jpeg,image/png'

export const INVALID_TYPE_MESSAGE = 'Format gambar tidak didukung. Gunakan JPG atau PNG.'
export const TOO_LARGE_MESSAGE = 'Ukuran gambar terlalu besar. Maksimal 5 MB.'
export const UNREADABLE_MESSAGE = 'Gambar tidak dapat dibaca. Coba file lain.'

export function validateImageFile(file) {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) return INVALID_TYPE_MESSAGE
  if (file.size > MAX_IMAGE_SIZE_BYTES) return TOO_LARGE_MESSAGE
  return null
}

export function imageFileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file)
    const img = new Image()

    img.onload = () => {
      URL.revokeObjectURL(objectUrl)
      const maxDimension = 1280
      const scale = Math.min(1, maxDimension / Math.max(img.width, img.height))
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(img.width * scale)
      canvas.height = Math.round(img.height * scale)

      const context = canvas.getContext('2d')
      context.fillStyle = '#ffffff'
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.drawImage(img, 0, 0, canvas.width, canvas.height)

      resolve(canvas.toDataURL('image/jpeg', 0.82))
    }

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('Gambar tidak dapat dibaca'))
    }

    img.src = objectUrl
  })
}
