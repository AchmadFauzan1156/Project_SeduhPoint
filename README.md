<p align="center"><img src="static/img/logo.svg" alt="SeduhPoint" width="96"></p>

<h1 align="center">SeduhPoint</h1>

<p align="center">Aplikasi web poin member dan promo untuk kedai kopi dengan beberapa cabang.</p>

<p align="center">
  <img src="https://img.shields.io/badge/Go-1.22-00ADD8?logo=go&logoColor=white" alt="Go 1.22">
  <img src="https://img.shields.io/badge/MySQL-MariaDB-4479A1?logo=mysql&logoColor=white" alt="MySQL / MariaDB">
  <img src="https://img.shields.io/badge/HTML-Template-E34F26?logo=html5&logoColor=white" alt="html/template">
</p>

## Isi Repositori

Repositori ini berisi kerangka awal proyek:

| Bagian | Keterangan |
| --- | --- |
| Kerangka proyek | Struktur folder dan file untuk seluruh aplikasi (`cmd`, `internal`, `templates`). Semua file masih kosong dan siap diisi. |
| Database | `db/seduhpoint.sql` berisi skema 15 tabel beserta data awal, siap diimpor lewat phpMyAdmin atau terminal. |
| Desain | `static/` berisi CSS, JavaScript, dan logo yang menjadi dasar tampilan aplikasi. |

## Teknologi

| Bagian | Pilihan |
| --- | --- |
| Bahasa | Go 1.22 (`net/http`, `html/template`, `database/sql`) |
| Database | MySQL 8 atau MariaDB 10.6+ |
| Driver | `github.com/go-sql-driver/mysql` |
| Konfigurasi | `github.com/joho/godotenv` |

## Struktur

```
cmd/web/
  main.go             menjalankan server, membuka koneksi database, dan mendaftarkan route
internal/config/
  config.go           membaca pengaturan dari file .env
internal/middleware/
  auth.go             sesi login dan pembatasan halaman per peran
  logging.go          mencatat setiap request ke log
internal/handler/     menerima request, memanggil service, lalu menampilkan template
  render.go           memuat dan menampilkan template
  halaman.go          halaman beranda
  auth.go             login dan logout
  cabang.go           cabang
  produk.go           kategori dan produk
  member.go           member
  promo.go            promo dan voucher
  transaksi.go        kasir, struk, riwayat, dan pembatalan transaksi
  laporan.go          laporan
internal/service/     aturan bisnis, tanpa SQL dan tanpa urusan HTTP
  errors.go           jenis error untuk input yang tidak valid
  auth.go             pengecekan login
  cabang.go           aturan data cabang
  produk.go           aturan data kategori dan produk
  member.go           aturan data member
  poin.go             masa berlaku poin dan tingkat member
  promo.go            aturan promo dan voucher
  ketentuan.go        teks ketentuan promo
  hitung.go           perhitungan potongan dan poin
  hitung_test.go      unit test perhitungan
  transaksi.go        proses transaksi dan pembatalan
  laporan.go          pengolahan data laporan
internal/repository/  satu-satunya tempat query SQL
  repository.go       fungsi bersama dan database transaction
  pengguna.go         tabel pengguna
  cabang.go           tabel cabang
  produk.go           tabel kategori dan produk
  member.go           tabel member dan riwayat tingkat
  poin.go             tabel lot dan mutasi poin
  promo.go            tabel promo beserta cabang, produk, dan kategorinya
  transaksi.go        tabel transaksi, item, dan promo transaksi
  laporan.go          query untuk laporan
internal/model/
  model.go            struct data yang dipakai bersama
templates/
  layout.html         kerangka HTML setiap halaman
  header.html         logo, ikon, dan ornamen
  sidebar.html        menu navigasi
  footer.html         skrip di akhir halaman
  dashboard.html      halaman beranda
  login.html          halaman login
  cabang/             halaman cabang
  kategori/           halaman kategori
  produk/             halaman produk
  member/             halaman member
  promo/              halaman promo dan voucher
  transaksi/          halaman kasir, struk, dan riwayat transaksi
  laporan/            halaman laporan
static/
  css/style.css       gaya tampilan
  js/app.js           skrip tampilan (jam dan tanggal)
  img/logo.svg        logo
  img/upload/         foto produk yang diunggah
db/
  seduhpoint.sql      skema 15 tabel dan data awal
```

## Cara Memakai Repo

1. Clone repo dan masuk ke foldernya:
   ```
   git clone https://github.com/AchmadFauzan1156/Project_SeduhPoint.git
   cd Project_SeduhPoint
   ```
2. Jalankan MySQL (Laragon, XAMPP, atau instalasi biasa), lalu impor database dengan salah satu cara:
   - **phpMyAdmin:** buka `http://localhost/phpmyadmin`, pilih menu **Import**, pilih file `db/seduhpoint.sql`, lalu klik **Import**. Database `seduhpoint` dibuat otomatis.
   - **Terminal:**
     ```
     mysql -u root < db/seduhpoint.sql
     ```
3. Salin `.env.example` menjadi `.env`, lalu sesuaikan `DB_DSN` bila user atau password database berbeda. File `.env` tidak ikut di-commit.
4. Setelah `cmd/web/main.go` diisi, aplikasi dijalankan dari folder proyek dengan `go run ./cmd/web`.

## Alur Kerja Tim

Branch `main` selalu berisi kode yang sudah bisa dijalankan. Jangan commit atau push langsung ke `main`; setiap perubahan dikerjakan di branch sendiri lalu digabung lewat Pull Request.

### 1. Ambil kode terbaru

```
git checkout main
git pull origin main
```

### 2. Buat branch baru

Format nama branch: `jenis/nama-singkat`.

| Jenis | Dipakai untuk | Contoh |
| --- | --- | --- |
| `feat/` | fitur atau halaman baru | `feat/login`, `feat/promo-voucher` |
| `fix/` | memperbaiki bug | `fix/validasi-harga` |
| `docs/` | dokumentasi | `docs/readme-setup` |
| `refactor/` | merapikan kode tanpa mengubah perilaku | `refactor/handler-produk` |

```
git checkout -b feat/login
```

### 3. Kerjakan dan commit

Commit kecil dan sering, dengan pesan mengikuti format Conventional Commits:

```
jenis(bagian): penjelasan singkat
```

Contoh:

```
feat(auth): halaman login dan logout
fix(produk): harga tidak boleh negatif
docs: tambah langkah impor database
```

Perintahnya:

```
git status
git add internal/handler/auth.go templates/login.html
git commit -m "feat(auth): halaman login dan logout"
```

Sebelum commit, pastikan:

- `go build ./...` berhasil dan aplikasi masih bisa dijalankan.
- Kode sudah dirapikan dengan `gofmt -w .`.
- File `.env`, password, dan file hasil build tidak ikut ter-commit.

### 4. Push branch

```
git push -u origin feat/login
```

### 5. Buat Pull Request

1. Buka repo di GitHub, lalu klik **Compare & pull request**.
2. Pastikan arah penggabungan `base: main` dan `compare: feat/login`.
3. Tulis judul dengan format yang sama seperti pesan commit, lalu jelaskan apa yang diubah dan cara mengujinya.
4. Minta minimal satu anggota lain untuk me-review.

### 6. Review dan merge

- Reviewer mencoba branch tersebut di laptopnya:
  ```
  git fetch origin
  git checkout feat/login
  go run ./cmd/web
  ```
- Bila ada yang perlu diperbaiki, beri komentar di Pull Request. Pemilik branch memperbaiki, commit, lalu push lagi ke branch yang sama.
- Setelah disetujui, klik **Merge pull request**, lalu hapus branch-nya di GitHub.

### 7. Setelah merge

Semua anggota memperbarui `main` di laptop masing-masing sebelum mulai pekerjaan berikutnya:

```
git checkout main
git pull origin main
git branch -d feat/login
```

### Bila terjadi conflict

Jika `main` sudah berubah saat kamu masih bekerja di branch:

```
git checkout feat/login
git pull origin main
```

Buka file yang ditandai conflict, pilih bagian yang benar, hapus tanda `<<<<<<<`, `=======`, dan `>>>>>>>`, lalu:

```
git add <file>
git commit
git push
```

### Aturan bersama

- Satu branch untuk satu fitur atau satu perbaikan.
- SQL hanya ditulis di `internal/repository`, aturan bisnis di `internal/service`, dan urusan request serta template di `internal/handler`.
- Menu sidebar untuk halaman baru ditambahkan di `templates/sidebar.html`, dan route-nya di `cmd/web/main.go`.
- Perubahan pada struktur database ditulis di `db/seduhpoint.sql` dan diberitahukan ke anggota lain, karena semua orang perlu mengimpor ulang database.
