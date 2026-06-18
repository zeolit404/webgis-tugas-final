# 🌍 WebGIS Dashboard - Analisis Data Spasial

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=Leaflet&logoColor=white)

Sebuah aplikasi Sistem Informasi Geografis Berbasis Web (WebGIS) modern yang dibangun menggunakan ekosistem React.js untuk visualisasi dan analisis data spasial interaktif. Proyek ini ditujukan sebagai pemenuhan **Tugas Final**.

## ✨ Fitur Utama

- **🗺️ Interactive Web Mapping:** Menggunakan `Leaflet.js` dan `react-leaflet` untuk rendering peta yang super cepat dan responsif.
- **📊 Real-time Dashboard:** Menampilkan statistik titik aktif dan sektor terpetakan secara dinamis berdasarkan data GeoJSON.
- **🌗 Dark/Light Mode:** Antarmuka *Glassmorphism* premium yang secara mulus dapat beralih antara tema gelap (*Dark Matter*) dan terang (*Light Positron*).
- **🎯 High Precision Mode:** Fitur pelacakan koordinat kursor secara *real-time* dengan tingkat akurasi lintang dan bujur tingkat tinggi.
- **📱 Mobile Responsive:** Desain *Bottom Sheet* modern yang dioptimalkan penuh untuk pengguna *smartphone*.
- **📂 GeoJSON Data Layers:** Menggunakan standar format data spasial `.geojson` asli untuk merepresentasikan poligon batas wilayah, garis infrastruktur, dan titik survei.

## 📂 Struktur Direktori

```text
📦 Web Final
 ┣ 📂 public/
 ┃ ┗ 📂 data/             # File sumber spasial (.geojson)
 ┃   ┣ 📜 infrastructure.geojson
 ┃   ┣ 📜 regions.geojson
 ┃   ┗ 📜 surveys.geojson
 ┣ 📂 src/
 ┃ ┣ 📂 components/       # Komponen UI Modular
 ┃ ┃ ┣ 📜 Dashboard.jsx
 ┃ ┃ ┣ 📜 Legend.jsx
 ┃ ┃ ┗ 📜 MapComponent.jsx
 ┃ ┣ 📜 App.jsx           # State Manager Utama
 ┃ ┣ 📜 index.css         # Styling Premium (Glassmorphism)
 ┃ ┗ 📜 main.jsx          # React Entry Point
 ┣ 📜 index.html          # Template HTML
 ┗ 📜 package.json        # Dependencies Info
```

## 🚀 Cara Menjalankan Secara Lokal

1. Pastikan Anda telah menginstal [Node.js](https://nodejs.org/).
2. Buka terminal di folder proyek ini dan jalankan:

```bash
npm install
npm run dev
```
3. Buka URL `http://localhost:5173/` di browser Anda.

## 🌐 Cara Deploy ke Netlify
Jika Anda tidak menghubungkan GitHub, Anda dapat melakukan *deploy* manual:
1. Buka terminal dan jalankan `npm run build`.
2. Tunggu hingga proses selesai. Akan muncul folder baru bernama `dist`.
3. Buka halaman *Deploy* di Netlify, lalu tarik (*drag-and-drop*) folder **`dist`** tersebut ke kotak yang disediakan.

---
*Dibuat dengan ❤️ untuk Tugas Final WebGIS*
