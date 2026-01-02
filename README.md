📰 Portal Indonesia - News Aggregator
Proyek ini adalah platform portal berita responsif yang menyajikan informasi terkini secara real-time menggunakan integrasi API eksternal. Dikembangkan sebagai bagian dari tugas UAS Pemrograman Web 2026.

🚀 Fitur Utama
Integrasi GNews API: Mengambil berita utama dan melakukan pencarian berita secara dinamis melalui GNews API.

Mode Gelap (Dark Mode): Fitur peralihan tema yang elegan dengan penyimpanan preferensi pengguna menggunakan LocalStorage browser.

Desain Responsif (Mobile-First): Tata letak yang dioptimalkan khusus untuk perangkat seluler, termasuk fitur sticky navbar dan pengaturan ulang urutan konten (reordering).

Navigasi Kategori: Memungkinkan pengguna untuk memfilter berita berdasarkan kategori seperti Bisnis, Olahraga, Teknologi, Sains, dan Kesehatan.

Sistem Pencarian: Fitur pencarian berita berdasarkan kata kunci yang langsung terhubung ke API.

Mekanisme Fallback (Dummy Data): Menjamin website tetap menampilkan konten berita cadangan jika kuota harian API habis atau terjadi kegagalan koneksi.

🛠️ Teknologi yang Digunakan
HTML5 & CSS3: Digunakan untuk struktur halaman dan desain visual kustom.

Bootstrap 5: Framework CSS untuk sistem grid responsif, komponen Offcanvas (burger menu), dan kartu berita.

Vanilla JavaScript (ES6+): Mengelola logika pengambilan data (fetching), manipulasi DOM, dan fungsionalitas Dark Mode.

GNews API: Sumber data berita publik untuk konten yang selalu terbarui.

📱 Optimasi Tampilan Seluler
Pada layar dengan lebar maksimal 991.98px, website ini menerapkan penyesuaian otomatis:

Prioritas Konten: Berita utama (Headline) dipaksa muncul di posisi paling atas menggunakan properti CSS order: -1.

Efisiensi Ruang: Menyembunyikan tombol "Masuk" dan "Daftar" di layar kecil untuk memberikan ruang lebih pada identitas logo.

Sticky Navigation: Menjaga agar logo, kotak pencarian, dan kategori berita tetap berada di bagian atas layar saat pengguna menggulung halaman (scrolling).

👨‍💻 Penulis
Nama: [Isi Nama Anda]

Proyek: Tugas Akhir UAS Pemrograman Web

Tahun: 2026
