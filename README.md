Petunjuk Setup Aplikasi Persewaan Mobil

Persiapan Proyek

1. **Ekstrak folder proyek** dan navigasikan ke direktori utama.

2. **Instal Dependensi**:
   - Buka terminal di direktori utama proyek.
   - Instal dependensi server dengan menjalankan:
     bash
     cd server
     npm install
     
   - Instal dependensi frontend dengan menjalankan:
     bash
     cd ../client
     npm install
     

3. **Konfigurasi Database**:
   - Pastikan Anda telah menginstal dan menjalankan MySQL di sistem Anda.
   - Buat database MySQL baru (misalnya, `car_rental_db`).
   - Di file `server/config/db.js`, perbarui field berikut dengan detail database Anda:
     javascript
     host: 'localhost',       // Sesuaikan jika berbeda
     user: 'your_username',   // Username MySQL Anda
     password: 'your_password', // Password MySQL Anda
     database: 'car_rental_db' // Nama database yang dibuat
     

4. **Jalankan Database Migrations** (jika tersedia; jika tidak, buat tabel secara manual seperti yang ditentukan dalam kode):
   - Kode seharusnya otomatis membuat tabel saat startup. Jika tidak, Anda bisa membuat tabel secara manual menggunakan MySQL Workbench atau alat sejenis. Struktur dasar tabel dapat ditemukan dari model aplikasi (users, cars, rentals, returns).

5. **Jalankan Aplikasi**:
   - Jalankan server backend:
     bash
     cd ../server
     npm start
     
   - Jalankan aplikasi React frontend di jendela terminal baru:
     bash
     cd ../client
     npm start
     
   - Backend akan berjalan di `http://localhost:3001` dan frontend di `http://localhost:3000`.

6. **Menggunakan Aplikasi**:
   - Akses frontend di browser di `http://localhost:3000`.
   - Lakukan registrasi pengguna, kelola mobil, serta pinjam/kembalikan mobil sesuai fitur aplikasi.

#### Pemecahan Masalah

- **Masalah CORS**: Pastikan server diatur dengan izin CORS yang sesuai jika diakses dari port yang berbeda.
- **Masalah Koneksi Database**: Periksa ulang kredensial database di `db.js` dan pastikan MySQL sedang berjalan.
