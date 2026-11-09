# TeBar — Temu Barang

TeBar (Temu Barang) adalah website sederhana untuk membantu pengguna
melaporkan barang yang hilang maupun barang yang ditemukan.

Melalui TeBar, pengguna dapat membuat laporan barang hilang atau ditemukan,
melihat laporan yang tersedia, mencari laporan berdasarkan informasi tertentu,
serta menghubungi pelapor melalui platform kontak yang tersedia.

## ✨ Fitur

- 📦 Membuat laporan barang hilang
- 🔎 Membuat laporan barang ditemukan
- 🔍 Mencari laporan barang
- 🏷️ Filter berdasarkan kategori dan status
- 📄 Melihat detail laporan
- 🖼️ Upload gambar barang
- 📱 Menambahkan kontak yang dapat dihubungi
- ✏️ Mengubah data laporan
- 🗑️ Menghapus laporan
- 🔄 Mengubah status laporan
- 💾 Menyimpan data secara lokal di browser
- 📱 Responsive untuk desktop dan mobile

## 🛠️ Teknologi

Project ini dibuat menggunakan:

- React
- Vite
- JavaScript
- CSS
- React Router
- localStorage
- IndexedDB
- pnpm

## 💾 Penyimpanan Data

TeBar saat ini belum menggunakan backend atau database online.

Data laporan disimpan secara lokal pada browser menggunakan:

- **localStorage** untuk menyimpan data dan informasi laporan.
- **IndexedDB** untuk menyimpan file gambar.

Dengan pendekatan ini, data tetap tersedia ketika halaman di-refresh
atau browser dibuka kembali pada browser dan perangkat yang sama.

Karena belum menggunakan server atau database online, data pada versi
prototype ini tidak dibagikan kepada pengguna lain atau perangkat lain.

## 📋 Jenis Laporan

TeBar memiliki dua jenis laporan:

### Barang Hilang

Digunakan ketika pengguna kehilangan suatu barang.

Status:

- `Belum ditemukan`
- `Sudah ditemukan`

### Barang Ditemukan

Digunakan ketika pengguna menemukan barang milik orang lain.

Status:

- `Belum diklaim`
- `Sudah diklaim`

## 📂 Kategori Barang

Beberapa kategori yang tersedia antara lain:

- Elektronik
- Dokumen
- Dompet
- Tas
- Kunci
- Pakaian
- Aksesori
- Kendaraan
- Buku
- Lainnya

## 📞 Kontak

Pelapor dapat memilih platform yang ingin digunakan untuk dihubungi.

Platform yang didukung antara lain:

- WhatsApp
- Nomor Telepon
- Email

Hanya platform kontak yang dipilih oleh pelapor yang akan ditampilkan
pada laporan.

## 🖼️ Upload Gambar

Pengguna dapat menambahkan gambar barang pada laporan.

Format gambar yang didukung:

- JPG
- JPEG
- PNG

Gambar bersifat opsional dan dapat dilihat pada kartu maupun halaman
detail laporan.

## 🚀 Menjalankan Project

### 1. Clone repository

```bash
# clone repositori
git clone https://github.com/<username>/<nama-repo>.git
cd <nama-repo>

# pasang dependensi
pnpm install

# jalankan mode pengembangan
pnpm dev
```
