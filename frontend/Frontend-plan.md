# 📋 Rencana Pengerjaan Frontend Web Atlet

Dokumen ini merangkum struktur aplikasi frontend yang dibangun menggunakan **React** dan **Tailwind CSS**, dengan fokus pada arsitektur berbasis peran (Role-Based Access Control / RBAC).

---

## 🏗️ I. Struktur Arsitektur & Teknologi

* **Teknologi Utama:** React, Tailwind CSS, Axios, React Router.
* **Peran Pengguna:** Manager, Coach (Pelatih), Athlete (Atlet).
* **Akses Kontrol:** Menggunakan komponen **`PrivateRoute.jsx`** untuk memverifikasi token dan otorisasi peran sebelum me-render konten.
* **Global Layout:** Menggunakan **`Layout.jsx`** yang memuat **`Sidebar.jsx`** dinamis yang menyesuaikan menu berdasarkan peran pengguna.

---

## 🗺️ II. Peta Halaman (Total 11 Halaman Unik)

Aplikasi ini akan memiliki 11 halaman unik, dibagi menjadi Publik dan Privat.

### A. Halaman Publik (Titik Masuk)

| No. | Halaman | Route (Contoh) | Fungsi Utama |
| :--- | :--- | :--- | :--- |
| **1** | **Login** | `/login` atau `/` | Meminta email & password, mendapatkan token otentikasi dari API. |
| **2** | **Register** | `/register` | Pendaftaran pengguna baru (Manager, Coach, atau Athlete). |

### B. Halaman Privat (Membutuhkan Login)

#### 1. Halaman Dashboard (3 Halaman)

Digunakan sebagai halaman ringkasan dan *landing page* setelah login.

| Peran | Halaman | Route (Contoh) | Fungsi Kunci |
| :--- | :--- | :--- | :--- |
| **Manager** | Manager Dashboard | `/manager-dashboard` | Ringkasan Tim, Atlet, Jadwal. **Aksi Cepat:** Buat Jadwal/Tim. |
| **Coach** | Coach Dashboard | `/coach-dashboard` | Daftar Atlet tim, Jadwal Latihan/Pertandingan tim, Tombol **Ambil Absensi**. |
| **Athlete** | Athlete Dashboard | `/athlete-dashboard` | Jadwal pribadi, Tombol **Check-In** dinamis (hanya muncul saat jadwal aktif). |

#### 2. Halaman Administrasi & CRUD (5 Halaman)

| Peran | Halaman | Route (Contoh) | Fungsi Kunci |
| :--- | :--- | :--- | :--- |
| **Manager** | Kelola Tim | `/manager/teams` | Menampilkan semua tim, Tambah/Edit/Hapus tim. |
| **Manager** | Kelola Latihan | `/manager/practices` | Menampilkan jadwal latihan, Tambah/Edit/Hapus jadwal latihan. |
| **Manager** | Kelola Pertandingan | `/manager/matches` | Menampilkan jadwal pertandingan, Tambah/Edit/Hapus jadwal pertandingan. |
| **Coach** | Ambil Absensi | `/coach/attendance/:id` | Mengubah status kehadiran atlet (`present`, `absent`, `late`). |
| **Athlete** | Riwayat Absensi | `/athlete/history` | Menampilkan riwayat absensi atlet yang sedang login. |

#### 3. Halaman Umum (1 Halaman)

| No. | Halaman | Route (Contoh) | Fungsi Kunci |
| :--- | :--- | :--- | :--- |
| **11** | **Pengaturan** | `/settings` | Manajemen profil atau ganti *password*. |

---

## ⚙️ III. Status Pengerjaan dan Langkah Selanjutnya

| Bagian | Status | Keterangan |
| :--- | :--- | :--- |
| **Backend API** | Selesai & Teruji | Semua *endpoint* (`/api/login`, `/api/manager/...`, dll.) berhasil diuji di Postman. |
| **Layout & Sidebar** | Selesai | Struktur `Layout.jsx` dan `Sidebar.jsx` (dinamis berdasarkan peran) sudah diimplementasikan. |
| **Dashboard Views** | Selesai (Kerangka) | Kerangka tampilan `ManagerDashboard.jsx`, `CoachDashboard.jsx`, dan `AthleteDashboard.jsx` sudah dibuat. |
| **Private Routing** | Perlu Integrasi | Komponen `PrivateRoute.jsx` sudah diperbaiki dan siap diintegrasikan. |

### ⏭️ Langkah Selanjutnya (Fokus Utama)

Langkah selanjutnya adalah mengimplementasikan **Halaman Login dan Register** untuk menyelesaikan gerbang masuk aplikasi.

1.  Buat **`Login.jsx`**.
2.  Buat **`Register.jsx`**.