# Portal Aduan: Quality Issue Tracking & Resolution System

*(Versi yang telah disesuaikan agar mudah dipahami oleh HRD dan recruiter untuk kebutuhan rekrutmen).*

## 1. Versi Pendek untuk CV (Curriculum Vitae)

**Quality Issue Tracking & Resolution System (Portal Aduan)** | *Full-stack Web Developer Intern*
*Tech Stack: Next.js, React, TypeScript, Tailwind CSS, Node.js, Express, MongoDB*
- Mengembangkan aplikasi web *end-to-end* untuk sistem manajemen kualitas (Quality Management System), yang berfungsi untuk melacak, mengelola, dan menyelesaikan kendala kecacatan produk.
- Mengimplementasikan sistem hak akses dinamis (Role-Based Access Control) untuk 8 divisi berbeda guna memastikan kelancaran dan keamanan kolaborasi antar-departemen.
- Membangun alur kerja digital yang sistematis: mulai dari pelaporan masalah, penjadwalan diskusi tim, analisis akar permasalahan (*root cause*), hingga penugasan perbaikan (*action plan*).
- Membuat *dashboard* analitik interaktif yang menampilkan KPI *real-time* untuk membantu pihak manajemen memantau performa operasional dan menekan angka keterlambatan penyelesaian masalah (*overdue*).

---

## 2. Versi Lengkap untuk Portofolio

### 📌 Deskripsi Singkat
**Portal Aduan** adalah sebuah sistem informasi berbasis web (*Issue Tracker*) yang dirancang untuk mendigitalisasi proses manajemen kualitas di dalam perusahaan. Aplikasi ini memfasilitasi berbagai departemen (Produksi, *Quality Control*, *Engineering*, dan Manajemen) untuk berkolaborasi secara langsung dalam melaporkan, menganalisis, dan memperbaiki masalah kualitas produk yang terjadi.

### 🚀 Latar Belakang Masalah
Sebelum adanya sistem ini, pelacakan masalah kualitas produk seringkali terhambat karena minimnya transparansi antardepartemen. Kendala utamanya meliputi: sulitnya memantau sejauh mana masalah sedang ditangani, hilangnya riwayat analisis penyebab masalah (*root cause*), serta banyaknya tugas perbaikan yang melewati batas waktu (*deadline*). 

### 💡 Solusi yang Dibangun
Saya mengembangkan sebuah platform terpusat di mana setiap laporan masalah (tiket) akan melewati alur penyelesaian yang terstruktur. Sistem ini memastikan setiap masalah diinvestigasi penyebabnya, ditugaskan kepada pihak yang tepat beserta tenggat waktunya, dan dievaluasi keberhasilannya sebelum kasus tersebut dianggap selesai (*Closed*).

### 🛠️ Tech Stack
- **Frontend:** Next.js (App Router), React.js, TypeScript, Tailwind CSS.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB.
- **Lainnya:** JSON Web Tokens (JWT) Authentication, Recharts (Data Visualization).

### ✨ Fitur Utama
1. **Interactive Executive Dashboard:** *Dashboard* yang menampilkan indikator performa utama (KPI) secara *real-time* seperti total kasus terbuka, kasus selesai, dan laporan keterlambatan penanganan (*overdue*).
2. **Role-Based Access Control (RBAC):** Sistem otorisasi aman untuk 8 peran pengguna (seperti Admin, *Quality Control*, hingga Manajemen). Setiap pengguna mendapatkan tampilan menu dan akses tombol yang disesuaikan dengan wewenangnya.
3. **Structured Problem Solving Flow:** 
   - Digitalisasi proses meeting dan notulensi tim terkait sebuah masalah.
   - Fitur investigasi mendalam untuk mencari akar penyebab (menggunakan metode *Why-Why Analysis*).
4. **Automated Action Plan Monitoring:** Rencana tindakan (solusi) akan otomatis masuk ke daftar tugas karyawan terkait, lengkap dengan pemantauan batas waktu pengerjaan.
5. **Final Verification System:** Sistem verifikasi bertingkat untuk memastikan perbaikan benar-benar berjalan efektif sebelum masalah bisa ditutup (diselesaikan).

### 👨‍💻 Peran & Kontribusi
- Menerjemahkan alur bisnis operasional ke dalam arsitektur sistem informasi dan desain antarmuka (UI/UX) yang intuitif.
- Mengembangkan aplikasi *frontend* secara penuh (dari nol) menggunakan Next.js dan Tailwind CSS, berfokus pada kecepatan dan kemudahan navigasi.
- Mengintegrasikan API untuk modul sinkronisasi data yang kompleks, seperti sinkronisasi otomatis antara dokumen analisis masalah dan daftar tugas perbaikan (*Action Plan*).
- Melakukan *Quality Assurance* (QA) dan mengaudit fungsionalitas sistem untuk memastikan tidak ada kecacatan logika (*loophole*) pada alur operasional aplikasi.
