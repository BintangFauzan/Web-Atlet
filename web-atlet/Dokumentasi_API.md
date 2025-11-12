# 📚 Dokumentasi API Web Atlet

Dokumen ini menjelaskan semua endpoint (rute) yang tersedia untuk aplikasi manajemen tim olahraga.

---

## Base URL

Semua request harus diawali dengan URL dasar Anda:

`[BASE_URL]/api/` (Contoh: `http://127.0.0.1:8000/api/`)

## 🔑 Autentikasi

Semua rute, kecuali `/login` dan `/register`, dilindungi oleh **Sanctum Middleware**.

Gunakan **Bearer Token** yang didapatkan setelah login dan letakkan di **Header** setiap request:

`Authorization: Bearer [TOKEN_DIDAPATKAN_DARI_LOGIN]`

---

## I. Public Endpoints (AuthController)

| Tujuan | Metode | Endpoint | Body (Input) | Response (Sukses) |
| :--- | :--- | :--- | :--- | :--- |
| **Login** | `POST` | `/login` | `{"email": "...", "password": "..."}` | Status 200, mengembalikan `user` dan `token`. |
| **Register** | `POST` | `/register` | `{"name": "...", "email": "...", "password": "...", "role": "manager/coach/athlete"}` | Status 201, mengembalikan `user` dan `token`. |
| **Logout** | `POST` | `/logout` | *Empty* | Status 200, `{"message": "Logged out"}` |

---

## II. 🧑‍💻 Manager Endpoints (Prefix: `/manager`)

Diasumsikan hak akses Manager diatur di sisi Frontend.

### A. Dashboard & Data

| Tujuan | Metode | Endpoint | Keterangan |
| :--- | :--- | :--- | :--- |
| **Dashboard** | `GET` | `/manager/dashboard` | Menampilkan ringkasan tim, jadwal latihan, dan pertandingan yang dikelola. |

### B. Tim (Teams)

| Tujuan | Metode | Endpoint | Body (Input) | Keterangan |
| :--- | :--- | :--- | :--- | :--- |
| **Buat Tim** | `POST` | `/manager/teams` | `{"name": "Nama Tim Baru"}` | Manager saat ini otomatis menjadi `manager_id`. |

### C. Jadwal Latihan (Practices)

| Tujuan | Metode | Endpoint | Body (Input) | Keterangan |
| :--- | :--- | :--- | :--- | :--- |
| **Buat Jadwal** | `POST` | `/manager/practices` | `{"team_id": 1, "date": "YYYY-MM-DD", "start_time": "HH:MM", "end_time": "HH:MM", "location": "Tempat Latihan"}` | Jadwal harus untuk tim yang dikelola. |

### D. Jadwal Pertandingan (Matches)

| Tujuan | Metode | Endpoint | Body (Input) | Keterangan |
| :--- | :--- | :--- | :--- | :--- |
| **Buat Jadwal** | `POST` | `/manager/matches` | `{"team_id": 1, "opponent_name": "Nama Lawan", "date": "YYYY-MM-DD", "time": "HH:MM", "location": "Lokasi"}` | Jadwal harus untuk tim yang dikelola. |

---

## III. 🧑‍🏫 Coach Endpoints (Prefix: `/coach`)

Diasumsikan hak akses Coach diatur di sisi Frontend.

| Tujuan | Metode | Endpoint | Body (Input) | Keterangan |
| :--- | :--- | :--- | :--- | :--- |
| **Dashboard** | `GET` | `/coach/dashboard` | Menampilkan daftar atlet timnya dan jadwal terdekat. |
| **Lihat Absensi** | `GET` | `/coach/attendance/{practice_id}` | Menampilkan status kehadiran semua atlet untuk Latihan ID tertentu. |
| **Update Absensi** | `POST` | `/coach/attendance/update` | `{"practice_id": 1, "athlete_id": 4, "status": "present"}` | Mengubah status absensi atlet. Status: `present`, `absent`, `late`. |

---

## IV. 🏃 Athlete Endpoints (Prefix: `/athlete`)

Diasumsikan hak akses Athlete diatur di sisi Frontend.

| Tujuan | Metode | Endpoint | Body (Input) | Keterangan |
| :--- | :--- | :--- | :--- | :--- |
| **Dashboard** | `GET` | `/athlete/dashboard` | Menampilkan jadwal latihan dan pertandingan timnya. |
| **Check-In** | `POST` | `/athlete/checkin/{practice_id}` | *Empty* | Mencatat kehadiran mandiri. Hanya dapat dilakukan pada periode waktu latihan. |
| **Absensi Saya** | `GET` | `/athlete/attendance/{practice_id}` | *Empty* | Melihat status absensi dirinya sendiri untuk latihan tertentu. |