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

Selain `static/` dan `db/seduhpoint.sql`, semua file di bawah ini masih kosong.

```
cmd/web/main.go                 titik masuk server dan routing
internal/config/config.go       konfigurasi dari .env
internal/middleware/
  auth.go                       sesi login dan pembatasan peran
  logging.go                    log setiap request
internal/handler/
  render.go                     pemuat template
  halaman.go                    halaman Ringkasan admin
  auth.go                       halaman login dan logout
  cabang.go                     halaman cabang
  produk.go                     halaman kategori dan produk
  member.go                     halaman member
  promo.go                      halaman promo dan voucher
  transaksi.go                  kasir, struk, riwayat, pembatalan
  laporan.go                    laporan biaya promo, poin, member
internal/service/
  errors.go                     error validasi input
  auth.go                       login dan pengecekan password
  cabang.go                     aturan data cabang
  produk.go                     aturan kategori dan produk
  member.go                     aturan member
  poin.go                       kedaluwarsa poin dan tingkat member
  promo.go                      aturan promo dan voucher
  ketentuan.go                  ketentuan promo untuk kasir
  hitung.go                     perhitungan promo dan poin
  hitung_test.go                unit test perhitungan
  transaksi.go                  checkout dan pembatalan
  laporan.go                    perhitungan ringkasan dan laporan
internal/repository/
  repository.go                 Querier dan database transaction
  pengguna.go                   data akun login
  cabang.go                     data cabang
  produk.go                     data kategori dan produk
  member.go                     data member
  poin.go                       lot dan mutasi poin
  promo.go                      data promo dan voucher
  transaksi.go                  penyimpanan dan pembatalan transaksi
  laporan.go                    query ringkasan dan laporan
internal/model/model.go         struct data bersama
templates/
  layout.html, header.html, sidebar.html, footer.html
  dashboard.html                halaman Ringkasan admin
  login.html
  cabang/list.html
  kategori/list.html
  produk/list.html
  member/list.html
  promo/list.html
  transaksi/kasir.html, struk.html, list.html
  laporan/promo.html, poin.html, member.html
static/
  css/style.css                 gaya tampilan
  js/app.js                     jam dan tanggal di bilah atas
  img/logo.svg                  logo
  img/upload/                   foto produk unggahan admin
db/seduhpoint.sql               skema 15 tabel dan data awal
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
