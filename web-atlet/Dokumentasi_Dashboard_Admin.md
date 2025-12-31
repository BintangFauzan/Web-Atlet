# Dokumentasi Logika API Admin Dashboard

Dokumen ini menjelaskan alur logika dari metode `dashboard()` yang ada di dalam file `app/Http/Controllers/Api/AdminController.php`.

Endpoint ini bertujuan untuk menyediakan data ringkas bagi admin cabor yang sedang login, mencakup informasi cabor yang diurus dan daftar tim di dalamnya.

## Kode Sumber

Berikut adalah kode lengkap dari metode `dashboard()`:

```php
// File: web-atlet/app/Http/Controllers/Api/AdminController.php

public function dashboard()
{
    // Baris 1: Mengambil data lengkap admin yang sedang login
    $admin = Auth::user();

    // ... (kode validasi dilewati untuk penjelasan ini)

    // Baris 2: Mengambil detail Cabor dari admin
    $admin->load('cabor');

    // Baris 3: Mengambil semua Tim yang ada di Cabor tersebut
    $teams = Team::where('cabor_id', $admin->cabor_id)
                 ->with('manager:id,name')
                 ->get();

    // Baris 4: Mengirimkan data dalam format JSON
    return response()->json([
        'admin' => [
            'id' => $admin->id,
            'name' => $admin->name,
        ],
        'cabor' => $admin->cabor, // <-- Data Cabor dari Baris 2
        'teams' => $teams,         // <-- Daftar Tim dari Baris 3
    ]);
}
```

## Penjelasan Logika Intinya

Logika utama terbagi menjadi dua bagian:

### 1. Menampilkan Cabor yang Diurus (Contoh: "Sepak Bola")

Logika ini diatur oleh **Baris 2**:

```php
$admin->load('cabor');
```

*   **Fungsi:** Baris ini memerintahkan Laravel untuk memuat relasi `cabor` dari model `User` (admin). Secara internal, Laravel akan:
    1.  Melihat nilai `cabor_id` pada objek `$admin`.
    2.  Menjalankan query ke tabel `cabors` untuk mencari data cabor yang memiliki `id` yang cocok.
    3.  Menyimpan hasil query (seluruh data cabor) ke dalam properti `cabor` pada objek `$admin`.
*   **Hasil:** Setelah eksekusi, `$admin->cabor` akan berisi objek penuh dari data cabor yang terkait.

### 2. Menampilkan Tim di Dalam Cabor Tersebut

Logika ini diatur oleh **Baris 3**:

```php
$teams = Team::where('cabor_id', $admin->cabor_id)
             ->with('manager:id,name')
             ->get();
```

*   **Fungsi:** Baris ini melakukan query ke database untuk mencari tim.
    *   `Team::where('cabor_id', $admin->cabor_id)`: Ini adalah filter utama. Perintah ini mencari semua entri di tabel `teams` yang kolom `cabor_id`-nya cocok dengan `cabor_id` milik admin.
    *   `->with('manager:id,name')`: Ini adalah *eager loading* untuk optimasi. Sambil mengambil data tim, Laravel juga akan mengambil data `id` dan `name` dari manajer yang terkait dengan setiap tim, untuk menghindari query tambahan (N+1 problem).
    *   `->get()`: Mengeksekusi query dan mengembalikan hasilnya sebagai sebuah koleksi objek tim.
*   **Hasil:** Variabel `$teams` akan berisi daftar tim yang berada di bawah naungan cabor admin. Jika tidak ada tim yang cocok, variabel ini akan berisi koleksi kosong (`[]`).

## Struktur Respons JSON

Kedua hasil dari logika di atas kemudian disusun dalam **Baris 4** untuk menghasilkan output JSON yang terstruktur.

## Contoh dan Penjelasan Struktur JSON

Ketika API ini berhasil dieksekusi, ia akan mengembalikan respons JSON dengan struktur sebagai berikut. Penting untuk membedakan antara objek `admin` dan objek `manager`.

```json
{
  "admin": {
    "id": 1,
    "name": "Admin Utama"
  },
  "cabor": {
    "id": 5,
    "name": "Sepak Bola"
  },
  "teams": [
    {
      "id": 101,
      "name": "Tim Elang Perkasa",
      "manager": {
        "id": 12,
        "name": "Budi Santoso"
      }
    },
    {
      "id": 102,
      "name": "Tim Harimau Jaya",
      "manager": {
        "id": 15,
        "name": "Citra Lestari"
      }
    }
  ]
}
```

### Alur Data pada JSON:

1.  **`admin`**: Objek ini berisi data dari **admin yang sedang login** (diambil dari `Auth::user()`).
2.  **`cabor`**: Objek ini berisi data dari **cabor milik si admin** (diambil melalui relasi `$admin->load('cabor')`).
3.  **`teams`**: Ini adalah sebuah *array* atau daftar yang berisi objek-objek tim.
4.  **`manager`**: Objek ini berada **di dalam setiap objek tim**. Isinya adalah data `id` dan `name` dari **manajer yang bertanggung jawab atas tim tersebut** (diambil melalui `->with('manager:id,name')`).

Dengan demikian, alur pengambilan data secara keseluruhan adalah: mengambil data **Admin** -> dari Admin, temukan **Cabor**-nya -> dari Cabor, temukan semua **Tim**-nya -> untuk setiap Tim, temukan **Manajer**-nya.