🍏 FreshFruitAI — Deteksi Kesegaran Buah

Deskripsi
--------

Proyek ini adalah aplikasi web sederhana berbasis `Next.js`, `TailwindCSS`, dan `TypeScript` dibuat untuk Tugas Ujian Akhir Semester — Kecerdasan Buatan. Aplikasi memungkinkan pengguna mengunggah foto buah dan melakukan deteksi apakah buah tersebut "Segar" atau "Tidak Segar". Deteksi dikembangkan menggunakan model CNN yang nantinya akan diintegrasikan melalui format ONNX.

Fitur Utama
----------

- Unggah foto buah melalui antarmuka web.
- Menampilkan hasil prediksi (Segar / Tidak Segar) beserta probabilitas.
- Integrasi frontend untuk menghubungkan model ONNX (tahap pengembangan berikutnya).

Tech Stack
----------

- Frontend: `Next.js` (App Router)
- Styling: `Tailwind CSS`
- Bahasa: `TypeScript`
- Model: Convolutional Neural Network (CNN) — integrasi via `ONNX` (rencana)

Persyaratan Sistem
------------------

- Node.js v16+ disarankan
- npm / yarn / pnpm

Instalasi & Menjalankan (Development)
------------------------------------

1. Pasang dependensi:

```bash
npm install
# atau: yarn install
```

2. Jalankan server development:

```bash
npm run dev
# atau: yarn dev
```

Buka `http://localhost:3000` di browser.

Build & Produksi
----------------

```bash
npm run build
npm start
```

Struktur Proyek (ringkasan)
---------------------------

- `app/` — folder utama Next.js (halaman dan layout)
	- `page.tsx` — halaman utama
- `components/` — komponen UI: `Navbar.tsx`, `UploadSection.tsx`, `Hero.tsx`, dll.
- `public/` — aset statis
- `globals.css` — gaya global (Tailwind di-setup di file konfigurasi)

Cara Penggunaan (singkat)
------------------------

- Buka halaman utama.
- Gunakan komponen `Upload` untuk memilih atau menyeret foto buah.
- Setelah upload, aplikasi akan mengirim gambar ke endpoint prediksi (saat ini placeholder).
- Hasil prediksi akan ditampilkan pada layar.

Integrasi Model (ONNX) — Catatan Pengembang
-----------------------------------------

Saat ini antarmuka frontend telah disiapkan untuk menerima hasil prediksi. Langkah integrasi model yang disarankan:

1. Latih model CNN (mis. PyTorch / CNN) untuk klasifikasi segar/tidak segar.
2. Ekspor model ke format `ONNX`.
3. Sediakan endpoint (mis. server Node.js/Express atau API terpisah) yang memuat model ONNX dan menerima gambar untuk inferensi. Alternatif: jalankan inferensi langsung di browser menggunakan `onnxruntime-web`.
4. Hubungkan endpoint tersebut dengan fungsi upload frontend (`fetch`/`axios`).

Contoh ringkas untuk inferensi di frontend menggunakan `onnxruntime-web` (opsional):

```js
// contoh singkat: muat model ONNX dan jalankan inferensi
// import * as ort from 'onnxruntime-web'
// const session = await ort.InferenceSession.create('/model.onnx')
// const feeds = { input: new ort.Tensor('float32', data, dims) }
// const results = await session.run(feeds)
```

Catatan terakhir
---------------

README ini ditulis sebagai dokumentasi awal untuk mendukung pengembangan dan pembuatan model AI deteksi buah segar/tidak segar menggunakan metode CNN yang rencananya akan diterapkan menggunakan ONNX di langkah selanjutnya. Project ini dibuat untuk memenuhi tugas akhir semseter 3 mata kuliah kecerdasan buatan, teknologi informasi, vokasi, universitas brawijaya, malang, jawa timur.
