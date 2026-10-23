# UI/UX Design System & Mockup Specification (Prompt Ready for Google Stitch)
## Project: P1 — Buku Tamu Digital & Approval Host K3 (Visitor & Safety Management System)
**Organization:** PT Mekar Armada Jaya (New Armada) — Tambun Plant  
**Target Platform:** Tablet Touchscreen Landscape (Pos Satpam & HSE K3) + Mobile Smartphone PWA (Karyawan/Host)  
**Design Theme:** Industrial Modern, High-Contrast Clean, Fast Data-Entry (< 30s)

---

## 1. Design Tokens & Styling Principles

- **Primary Colors:** 
  - Emerald Green `#10B981` (Approved, Safe, Active Check-In, Verified)
  - Coral / Safety Orange `#FF5E5B` (Primary Action, Brand, Visitor Badges)
  - Amber / Warning `#F59E0B` (Waiting Approval, 3-Min Escalation Timer)
  - Crimson Red `#EF4444` (Emergency Alarm, Evacuation, Rejected, Overdue)
  - Deep Slate `#0F172A` / `#1E293B` (Industrial Dark Surface, Clean Headings)
- **Backgrounds:** Clean Neutral `#F8FAFC` (Light Mode Pos Tablet) / Slate Dark `#090D16` (Emergency K3 Mode)
- **Typography:**
  - Headers: Inter / Sans-Serif Bold & Clean
  - Data / Badges / Numbers: JetBrains Mono / Monospace (Timestamp & NPK)
- **UX Requirement:** 
  - Touch-target minimal 48px x 48px untuk jari satpam.
  - Number pad touchscreen besar untuk input nomor HP cepat.
  - Snapshot kamera langsung ter-crop 1:1 portrait di browser.

---

## 2. Screen 1: Pos Satpam — Quick Registration & Live Queue (Tablet Landscape 10.1")

### Header Bar
- **Left:** Logo PT Mekar Armada Jaya + Label `POS SATPAM GERBANG UTAMA` + Realtime Clock (`08:42:15 WIB`).
- **Center:** Connection status pill `● ONLINE (Sync Cloud)` + Shift Satpam: `Shift 1 - Danang (NPK: 4821)`.
- **Right:** Button `[ 🚨 K3 Emergency Evacuation ]` (Red outline, quick switch to K3 mode).

### Left Panel (Registration Form — 45% Width)
- **Card Title:** `Form Pendaftaran Tamu Cepat (< 30 Detik)`
- **Input 1: Nomor WhatsApp Tamu (Key Autofill)**
  - Field: `+62 8...` dengan tombol numpad popup besar.
  - State: Saat nomor dimasukkan & ditemukan di DB, muncul toast hijau: *"✓ Tamu Terdaftar: PT Chassis Utama Mandiri"*.
- **Input 2: Nama Lengkap Tamu** (Auto-populated / Text field).
- **Input 3: Instansi / Perusahaan Vendor** (Auto-populated).
- **Input 4: Karyawan Tujuan (Host) & Departemen**
  - Dropdown searchable instant: Type `QA` atau nama `Agus Prasetyo (Eng Production)`.
- **Input 5: Keperluan Kunjungan**
  - Segmented radio buttons: `[ Meeting ]` `[ Suplier / Vendor ]` `[ Pengiriman Chassis ]` `[ Audit / Kedinasan ]`.
- **Input 6: Foto Wajah & Nomor Plat Kendaraan**
  - Mini webcam box: Preview kamera pos + Tombol `[ 📷 Ambil Foto Wajah ]`.
  - Input Nopol opsional: `B 9182 KDA`.
- **Action Button:**
  - Primary button lebar: `[ 🚀 Kirim Permintaan Izin Masuk ke Host ]` (Warna Safety Coral).

### Right Panel (Live Approval & Check-In Queue — 55% Width)
- **Tab Header:** `Semua Antrean (4)` | `Menunggu Persetujuan (2)` | `Tamu Aktif di Pabrik (18)`
- **Card 1: Waiting Approval (Paling Atas)**
  - Name: **Budi Santoso** (PT Chassis Karoseri) ➔ Host: **Agus Prasetyo** (Dept QA)
  - Time elapsed: `Menunggu: 01:45` (Lingkaran progress amber berputar).
  - Badge: `Menunggu Respon Host`.
  - Secondary Action: `[ ⏱️ Eskalasi ke Supervisor (Tersedia dalam 01:15) ]`.
- **Card 2: APPROVED by Host (Siap Check-In - High Priority Alert)**
  - Background: Emerald Green Soft `#ECFDF5` dengan border `#10B981`.
  - Name: **Ir. Hendra Kusuma** (Vendor Paint Coating) ➔ Host: **Bambang (HRD)**
  - Approved stamp: `✓ DISETUJUI HOST pukul 08:40 WIB`.
  - Input field wajib: `Nomor Kalung / Visitor Badge Fisik: [ #042 ]`.
  - Action button: `[ ✅ CHECK-IN TAMU MASUK ]` (Besar & mencolok).
- **Card 3: Active Guest Ready to Leave (Check-Out Mode)**
  - Name: **Siti Aminah** (Vendor Katering) | Masuk: `07:15 WIB` (Sudah 1j 25m).
  - Badge no: `#015`.
  - Action button: `[ 🚪 Check-Out & Terima Badge ]` (Tombol abu-abu/outline).

---

## 3. Screen 2: Host Internal — Smartphone Push Notification & One-Click Approval (Mobile PWA 390x844)

### View Header
- Banner: `PT MEKAR ARMADA JAYA — NOTIFIKASI TAMU MASUK`
- Subtitle: `Konfirmasi Akses Gerbang Pos Satpam`

### Content Card (Card Tengah Minimalis & Jelas)
- **Visitor Photo:** Foto 1:1 wajah tamu dari webcam pos satpam (tajam & jelas).
- **Nama Tamu:** `Budi Santoso` (PT Chassis Karoseri).
- **Waktu Tiba di Pos:** `Hari ini, 08:42 WIB`.
- **Tujuan Kunjungan:** `Meeting Evaluasi Bracket Pintu Karoseri (QA)`.
- **Didampingi Petugas Pos:** `Pos Utama — Satpam Danang`.

### Urgency Timer Alert
- Box Kuning Soft: `⏱️ Mohon konfirmasi dalam 03:00 menit sebelum dialihkan otomatis ke Supervisor Anda.`

### Dual Action Floating Buttons
- **Tombol Hijau (70% Width):**
  - `[ ✅ SETUJUI KUNJUNGAN ]`
  - Klik langsung menampilkan modal: *"Beri instruksi khusus? (Opsional: Misal bawa APD / helm safety)"* + Submit.
- **Tombol Merah (30% Width):**
  - `[ ✕ TOLAK ]`
  - Klik memunculkan radio button alasan: `[ Sedang Meeting ]` `[ Dinas Luar Pabrik ]` `[ Jadwal Tidak Sesuai ]`.

---

## 4. Screen 3: Tim K3 Safety — Emergency Roll Call & Live Headcount (Tablet / Desktop K3)

### Emergency State Header (High Visibility)
- **Top Bar:** Warna Merah Marun `#7F1D1D` dengan teks putih tebal:
  `🚨 DASHBOARD KESELAMATAN K3 (HSE) — STATUS: LIVE OCCUPANCY MONITORING`
- **Metric Badges Kiri-Kanan:**
  - `Total Tamu Eksternal di Pabrik: 18 Orang`
  - `Sudah Diverifikasi Selamat: 12 Orang`
  - `Belum Terverifikasi (Di Lini Produksi): 6 Orang`

### Emergency Action Toolbar
- Tombol Besar Merah: `[ 🔥 AKTIFKAN MODE EVAKUASI / ALARM DARURAT ]`
- Tombol Hijau: `[ 📄 Unduh / Cetak Daftar Nama Tamu untuk Assembly Point ]`

### Grid Headcount Tamu Aktif (Tabel Interaktif Kartu Roll Call)
Tiap tamu yang berstatus `CHECKED_IN` ditampilkan dalam kartu:
- **Card Unverified (Merah Berkedip):**
  - No Badge: `#042` | Nama: **Budi Santoso** (Vendor Chassis).
  - Host Karyawan: Agus Prasetyo (Dept QA - Line 2 Karoseri).
  - Waktu Masuk: `08:45 WIB`.
  - Tombol Aksi K3 di Titik Kumpul (Assembly Point): `[ 🟢 KONFIRMASI SELAMAT (TITIK KUMPUL A) ]`.
- **Card Verified (Hijau Solid):**
  - No Badge: `#015` | Nama: Siti Aminah (Katering).
  - Status: `✓ SELAMAT DI TITIK KUMPUL B (Diverifikasi pukul 09:02 oleh Safety Officer Eko)`.

---

## 5. Screen 4: Riwayat & Kepatuhan Privasi Data UU PDP (Admin Dashboard)

### Metrics Bar
- `Total Kunjungan Bulan Ini: 428` | `Rata-rata Waktu Persetujuan Host: 1 Menit 42 Detik` | `Tingkat Check-Out Tertib: 99.4%`

### Data Table with Privacy Masking
- Kolom: `Tanggal & Jam Masuk` | `Foto Tamu` | `Nama Tamu` | `Instansi` | `No HP (Masked: +62 812-****-882)` | `Host Penerima` | `Jam Keluar` | `Durasi` | `Status Retensi UU PDP`.
- Badge UU PDP: `Terenkripsi AES-256` • `Otomatis Di-Anonymize dalam 142 Hari`.

---

## 6. Prompt Siap Salin untuk Google Stitch / AI UI Designer

Gunakan teks prompt di bawah ini langsung ke Google Stitch atau tools mockup generator:

```text
Design an industrial modern visitor management and factory safety check-in system for PT Mekar Armada Jaya coachbuilding plant.

Theme: Clean industrial UI, high-contrast typography, Emerald Green (#10B981) and Safety Coral (#FF5E5B) accents, Slate dark header (#0F172A).

Screen 1 (Tablet Landscape 10.1" for Security Gate):
- Split layout: Left 45% quick registration form with large touch targets, number pad for phone autofill, webcam portrait snapshot preview, and host employee searchable selector. Right 55% live card queue showing 'Waiting Host Approval (with 3-minute countdown ring)', 'APPROVED by Host (bright green banner with badge number assignment input)', and 'Active Guest Check-Out button'.

Screen 2 (Mobile PWA 390x844 for Employee Host):
- Instant visitor approval card: Displays webcam face photo from gate, visitor name, company, arrival timestamp, and visit purpose. Prominent primary green 'Approve' button and red 'Reject with Reason' button with a 3-minute escalation countdown bar.

Screen 3 (Tablet/Desktop for Industrial Safety K3 Officer):
- Emergency evacuation roll call dashboard: Real-time headcount badge showing total external visitors inside production plant. Fast filter by Assembly Point A/B, with one-tap toggle to mark guests as 'Verified Safe' during fire drills. High-contrast emergency red header.
```
