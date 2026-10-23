# Project Brief: P1 — Buku Tamu Digital & Approval Host K3 (Visitor & Safety Management System)

> **Repository / Portfolio Case Study**  
> **Perusahaan:** PT Mekar Armada Jaya (New Armada) — Tambun Plant  
> **Role:** IT HR / Software Engineer (Solo Initiative)  
> **Kapasitas Alokasi:** 50% Waktu Kerja (± 5–6 Minggu)  
> **Status:** Planning & Ready for Execution  

---

## 1. Executive Summary & Problem Framing

### 1.1 Latar Belakang (Genba Lapangan)
Di pos satpam gerbang utama pabrik karoseri PT Mekar Armada Jaya Tambun, pencatatan tamu eksternal (vendor suplier, subkontraktor karoseri, supir pengiriman chassis, dan tamu kedinasan) masih dilakukan secara manual menggunakan buku tulis fisik:
* **Verifikasi Mengandalkan WhatsApp Informal:** Satpam memverifikasi kedatangan tamu dengan menelepon atau mengirim chat WA ke karyawan tujuan (Host). Tidak ada bukti formal apakah host benar-benar mengizinkan tamu tersebut masuk.
* **Tidak Ada Pencatatan Waktu Keluar:** Jam pulang tamu jarang dicatat, sehingga perusahaan tidak memiliki data siapa saja pihak luar yang masih berada di dalam area pabrik.
* **Risiko Fatal K3 (Safety Evacuation Blindspot):** Ketika terjadi keadaan darurat (alarm kebakaran atau evakuasi industri), petugas K3 **tidak memiliki daftar orang luar (occupancy headcount)** yang berada di lini produksi. Ini merupakan celah keselamatan dan kepatuhan audit SMK3 yang sangat berisiko.

### 1.2 Core Value Proposition
Aplikasi ini bukan sekadar *"buku tamu digital pengganti kertas"*, melainkan sistem **Akses & Keselamatan Terpadu**:
1. **Governance & Audit Trail:** Tamu hanya boleh check-in jika telah memperoleh approval digital resmi ber-timestamp dari Host internal.
2. **K3 Real-Time Occupancy Tracking:** Dashboard live headcount satu klik untuk tim safety K3 saat evakuasi darurat di assembly point.
3. **Kepatuhan Privasi (UU PDP):** Menghilangkan tumpukan fisik KTP di meja pos satpam; data NIK terenkripsi dan otomatis dianonymize setelah 6 bulan.

---

## 2. Kebutuhan Data & Skema Database

Dirancang seringkas mungkin agar waktu input satpam di tablet pos **di bawah 30 detik**.

### 2.1 Skema Data Kunjungan (`visits`)
| Field Name | Tipe Data | Deskripsi & Batasan |
| :--- | :--- | :--- |
| `id` | `UUID` | Primary Key unik tiap kunjungan |
| `guest_name` | `VARCHAR(150)` | Nama lengkap tamu (Wajib) |
| `guest_company` | `VARCHAR(150)` | Asal perusahaan / instansi vendor / ekspedisi |
| `phone_number` | `VARCHAR(20)` | Nomor WhatsApp tamu (Index pencarian autofill) |
| `id_number` | `VARCHAR(50)` | NIK KTP / SIM (Terenkripsi saat at-rest) |
| `photo_url` | `TEXT` | Snapshot webcam wajah tamu dari tablet pos satpam |
| `vehicle_plate` | `VARCHAR(20)` | Nopol kendaraan (Opsional: mobil suplier / truk chassis) |
| `host_id` | `UUID` | Foreign Key ke tabel `employees` |
| `purpose` | `ENUM` | `Meeting`, `Vendor/Subkon`, `Chassis Delivery`, `Audit/Kunjungan Resmi`, `Lainnya` |
| `status` | `ENUM` | `WAITING_APPROVAL`, `APPROVED`, `REJECTED`, `CHECKED_IN`, `CHECKED_OUT`, `CANCELLED` |
| `security_in_id` | `UUID` | Satpam shift yang memproses check-in |
| `security_out_id` | `UUID` | Satpam shift yang memproses check-out (Nullable) |
| `check_in_at` | `TIMESTAMP` | Waktu aktual tamu melewati gerbang pos |
| `check_out_at` | `TIMESTAMP` | Waktu aktual tamu keluar pabrik & serah ID badge |
| `rejection_reason`| `TEXT` | Alasan jika Host menolak kunjungan (Nullable) |

### 2.2 Skema Data Karyawan / Host (`employees`)
| Field Name | Tipe Data | Deskripsi |
| :--- | :--- | :--- |
| `id` | `UUID` | ID Karyawan |
| `nik` | `VARCHAR(20)` | Nomor Induk Karyawan |
| `full_name` | `VARCHAR(150)` | Nama lengkap karyawan |
| `department` | `VARCHAR(100)` | Dept: Produksi, QA, Eng, HR, Purchasing, Logistik |
| `phone_number` | `VARCHAR(20)` | No HP (untuk notifikasi link verifikasi) |
| `supervisor_id` | `UUID` | Foreign Key ke atasan (untuk eskalasi otomatis) |
| `is_active` | `BOOLEAN` | Status kerja aktif |

---

## 3. Workflow & System Flows

### 3.1 Alur Utama (Happy Path)
```
[Tamu Datang di Pos] 
       │
       ▼
[Satpam Input No HP] ──(Tamu Lama?)──► Auto-populate Nama & Instansi
       │                                     │
       ▼ (Ambil Foto Webcam Pos) ◄───────────┘
[Kirim Permintaan Approval ke Host]
       │
       ▼ (Realtime Push Notification / WA Fallback)
[Host Buka Layar Ponsel & Klik 'SETUJUI']
       │
       ▼ (Status Realtime di Tablet Pos berubah HIJAU)
[Satpam Serahkan Visitor Badge & Klik Check-In]
       │
       ▼ (Tamu Berada di Area Pabrik - Terhitung di Occupancy K3)
[Tamu Selesai Kunjungan & Kembali ke Pos Satpam]
       │
       ▼
[Satpam Terima Kembali Badge & Klik Check-Out]
       │
       ▼ (Data Berpindah ke Riwayat Kunjungan)
[Selesai]
```

### 3.2 Sub-Flow & Skenario Lapangan (Edge Cases)

#### A. Host Tidak Merespons (Timer Eskalasi 3 Menit)
* Satpam di pos tidak boleh membiarkan antrean tamu menumpuk.
* Jika dalam 3 menit Host tidak membuka tautan, layar tablet memunculkan tombol **"Eskalasi ke Atasan"**.
* Sistem secara otomatis mengarahkan permintaan approval ke Supervisor/Manager departemen Host terkait.

#### B. Skenario Penolakan Kunjungan (Rejection Path)
* Jika Host sedang di luar kantor atau tidak memiliki jadwal, Host menekan tombol **"Tolak"** dan wajib mengisi alasan singkat.
* Layar pos satpam otomatis berwarna **MERAH (REJECTED)**. Satpam mengarahkan tamu secara santun tanpa perdebatan.

#### C. Jaringan Pos Putus (Offline-First Resiliency)
* Aplikasi pos dibangun sebagai **Progressive Web App (PWA)** dengan penyimpanan lokal **IndexedDB**.
* Jika Wi-Fi pos satpam mati, satpam tetap dapat menginput tamu baru dan mengambil foto.
* Sistem menandai data dengan flag `PENDING_SYNC` dan menyediakan opsi tombol darurat *"Manual Radio Approval"* dengan catatan petugas.
* Ketika koneksi internet pos kembali normal, data secara otomatis disinkronkan ke server pusat.

#### D. Evakuasi Darurat K3 (Emergency Roll Call)
* Ketika sirene darurat berbunyi, Petugas K3 membuka panel khusus di ponsel/tablet tanpa login rumit: **"Live Plant Occupancy"**.
* Sistem menyajikan daftar seluruh tamu yang berstatus `CHECKED_IN` lengkap dengan nama instansi, departemen yang dikunjungi, dan nomor HP untuk dicocokkan di Assembly Point.

---

## 4. Arsitektur Teknis & Pertimbangan Solo Dev

Sesuai aturan **AGENTS.md** (mengutamakan arsitektur sederhana, minim biaya operasional, dan bebas over-engineering untuk kapasitas solo dev):

* **Frontend:** PWA (React / Next.js / Vite) dengan Tailwind CSS. Responsif untuk tablet Android landscape dan ponsel pintar staf.
* **Backend & Database:** Monolith / BaaS (PocketBase atau Supabase Self-Hosted). 
  * *Rasional:* Built-in Realtime WebSocket subscriptions (status layar pos satpam otomatis hijau tanpa manual reload).
* **Media & Kamera:** HTML5 WebRTC `navigator.mediaDevices.getUserMedia` (mengambil foto langsung via browser tanpa hardware scanner eksternal).
* **Penyimpanan Offline:** `Dexie.js` (IndexedDB Wrapper) untuk antrean sync pos satpam.

---

## 5. Rencana Kerja 5 Minggu (Milestones)

| Minggu | Sasaran Kerja | Deliverable Teruji |
| :---: | :--- | :--- |
| **M1** | Database Schema, Auth Satpam & Host, Wireframe UI Tablet | Skema aktif, prototipe alur disetujui Security & GA |
| **M2** | Modul Input Tamu Pos + WebRTC Camera Snapshot + Offline Cache | Form input diuji di tablet pos dengan durasi < 30 detik |
| **M3** | Realtime Approval Engine (Web Push & Direct Link Host Mobile) | Host bisa approve via HP, layar pos terupdate seketika |
| **M4** | Modul Check-out & Dashboard Headcount K3 (Emergency Roll Call) | Safety Officer dapat memonitor live headcount tamu aktif |
| **M5** | Pilot Run 100% di Pos Gerbang Utama + Pelatihan Satpam + Go-Live | Nol entri kertas di pos satpam selama 1 minggu berturut-turut |

---

## 6. Metrik Keberhasilan (Success Metrics)

1. **Adopsi 100% Digital:** 0 transaksi buku tulis fisik di pos satpam setelah masa transisi 1 minggu.
2. **Kecepatan Layanan Pos:** Rata-rata waktu pendaftaran tamu di pos satpam turun menjadi $\le 30$ detik per orang.
3. **Audit K3 Ready:** 100% tamu yang berada di dalam pabrik terdata real-time untuk kebutuhan evakuasi darurat.
4. **Respon Host Terukur:** SLA persetujuan kunjungan termonitor (rata-rata $< 2$ menit).
