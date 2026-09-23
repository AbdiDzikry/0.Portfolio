# Smart Factory & Warehouse Management System (AIS Backend)

**Role:** [Misal: Backend Developer Intern / Backend Engineer]
**Timeline:** [Bulan Tahun] – [Bulan Tahun]

## 📌 Deskripsi Proyek
Automated Information System (AIS) adalah aplikasi berskala *enterprise* (ERP/WMS) yang dirancang untuk mendigitalisasi dan mengotomatisasi seluruh alur rantai pasok (Supply Chain) dan operasional gudang di fasilitas pabrik manufaktur (DCI). 

Sistem ini mengelola *end-to-end process*, mulai dari manajemen *Purchase Order* (PO) ke *Supplier*, penerimaan barang masuk (*Inbound/Good Receiving*), pelacakan inventaris gudang secara akurat dengan QR/Barcode (*Warehouse/Rack Management*), hingga pengiriman barang ke *Customer* (*Outbound/Travel Document*).

## 🛠️ Tech Stack & Teknologi yang Digunakan
- **Framework & Bahasa:** Laravel 6, PHP 7.x.
- **Database:** MongoDB (dengan `laravel-mongodb`).
- **Integrations & API:** Integrasi ke SAP ERP, Twilio SDK (WhatsApp Gateway), SMTP Email.
- **Tools / Paket Pendukung:** Modbus TCP Client (untuk IoT/Machine), DomPDF (Export Dokumen), QR Code/Barcode Generator & Scanner, Excel (Export/Import), Spatie (Role & Permissions).

## 🚀 Fitur Utama (*Key Features*)
1. **Procurement & Supplier Portal:** Mengelola siklus *Purchase Order* (PO), data vendor, sinkronisasi portal *supplier*, hingga analitik PO.
2. **Inbound & Goods Receiving:** Modul otomatisasi penerimaan barang masuk (*Good Receiving*, *Incoming Lotbook*, *Compare Delivery Note*) untuk memastikan stok tercatat secara valid.
3. **Advanced Warehouse & Rack Management:** Pelacakan lokasi *Storage* dan *Rack* menggunakan teknologi *Scan* QR/Barcode sehingga letak barang (*Material/Part*) 100% terlacak secara akurat (Sloc/Storage Location).
4. **Outbound & Schedule Delivery:** Mengatur penjadwalan pengiriman ke *Customer*, pembuatan *Travel Document* (Surat Jalan), dan proses pengeluaran barang dari gudang.
5. **Production & Manpower Management:** Modul untuk melacak performa/perencanaan produksi (*Planning Production*, *Machine*), serta pengaturan lembur tenaga kerja (*Manpower Overtime*).
6. **SAP ERP & Notification Integration:** Memiliki jembatan penghubung ke sistem SAP dan sistem notifikasi/pengingat (Reminder) otomatis via **WhatsApp** dan **Email** (*Twilio API*).
7. **Role-Based Access Control:** Manajemen otorisasi yang sangat kompleks dan granular menggunakan Spatie Permission untuk berbagai level departemen di pabrik.

## 💡 Pencapaian & Tanggung Jawab (*Key Responsibilities & Impact*)
- Mengembangkan dan memelihara modul-modul sistem *Back-End* menggunakan **Laravel** dan arsitektur database NoSQL **MongoDB**.
- Menerapkan fitur *Traceability* barang menggunakan integrasi QR Code dan Barcode untuk melacak perpindahan boks dan *part* di dalam gudang secara *real-time*.
- Membuat endpoint RESTful API terintegrasi yang andal untuk memproses operasi *Inbound* (Penerimaan Barang) dan *Outbound* (Pengiriman/Surat Jalan) dengan meminimalkan selisih *stock*.
- Mengimplementasikan sistem *Cron Job* / penjadwalan otomatis dan gateway pesan (WhatsApp via Twilio & Email) untuk pengiriman *reminder* atau notifikasi sistem secara otomatis.
- Berperan dalam mengamankan alur data menggunakan sistem otentikasi JWT dan otorisasi *Role-Based Access* sesuai hak akses masing-masing departemen.
- Terlibat dalam standarisasi logika bisnis untuk memastikan sinkronisasi data (*Supplier*, *Parts*, dll) berjalan mulus (termasuk *bridging* data dari/ke SAP).

---
*Sistem ini dikembangkan secara komprehensif untuk menjawab tantangan otomatisasi industri (Smart Factory) di fasilitas [Nama Perusahaan / Dharma Group] dan menangani ribuan transaksi inventaris setiap harinya.*
