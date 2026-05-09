# Undangan Pernikahan — Dimas & Sari

Website undangan pernikahan satu halaman dengan musik latar, foto mempelai, countdown, galeri, dan form ucapan/RSVP.

## Cara menjalankan
Buka `index.html` langsung di browser, atau pakai live server:
```
cd wedding-invitation
python -m http.server 8000
```
Lalu buka http://localhost:8000

## Personalisasi nama tamu via URL
Tambahkan parameter `?to=` di URL untuk menampilkan nama tamu:
```
index.html?to=Bapak%20Budi
index.html?to=Keluarga%20Hartono
```

## Yang perlu Anda ganti
1. **Nama mempelai** — di `index.html` cari `Dimas & Sari`, `Sari Ayu Lestari`, `Dimas Pratama`, dan nama orang tua.
2. **Tanggal** — di `index.html` (`Sabtu, 20 Juni 2026`) dan di `script.js` (`weddingDate = new Date('2026-06-20T08:00:00+07:00')`).
3. **Foto mempelai** — ganti URL `https://images.unsplash.com/...` di section `couple` dan `gallery`. Bisa pakai file lokal:
   ```html
   <img src="foto/sari.jpg" alt="Sari" />
   ```
   Letakkan foto di folder `foto/` di samping `index.html`.
4. **Musik** — ganti `<source src="...">` di tag `<audio>` dengan file MP3 Anda:
   ```html
   <source src="musik/wedding-song.mp3" type="audio/mpeg" />
   ```
5. **Lokasi acara** — edit text di section `event-card`.

## Fitur
- ✅ Halaman sampul (cover) dengan tombol "Buka Undangan"
- ✅ Musik latar otomatis (dengan tombol play/pause)
- ✅ Foto mempelai pria & wanita
- ✅ Countdown ke hari H
- ✅ Detail acara akad & resepsi
- ✅ Galeri foto
- ✅ Form RSVP + ucapan (disimpan di localStorage browser)
- ✅ Nama tamu lewat URL `?to=NamaTamu`
- ✅ Responsif untuk HP & desktop

## Catatan
Ucapan disimpan di **localStorage browser** masing-masing tamu. Untuk menyimpan ke server pusat (semua tamu lihat ucapan yang sama), perlu backend — bisa pakai Firebase, Supabase, atau Google Sheets sebagai database gratis.
