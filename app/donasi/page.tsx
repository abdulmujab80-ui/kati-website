"use client"; // Kunci anti-eror Next.js untuk merender di sisi browser dengan aman

import React from "react";

// Tipe Data untuk Keamanan TypeScript Paket Donasi
interface PaketDonasi {
  id: string;
  namaPaket: string;
  nominal: string;
  deskripsi: string;
  alokasi: string;
  ikon: string;
}

export default function DonasiPage() {
  // 1. Data Pilihan Paket Donasi (Visual Grid 3 Kolom)
  const daftarPaket: PaketDonasi[] = [
    {
      id: "paket-bibit",
      namaPaket: "Paket Semai Oksigen",
      nominal: "Rp 50.000",
      deskripsi: "Donasi setara dengan penyediaan 2 bibit pohon endemik lereng gunung beserta pupuk organik makro.",
      alokasi: "Divisi Konservasi Hutan Mikro",
      ikon: "🌱"
    },
    {
      id: "paket-edukasi",
      namaPaket: "Paket Lestari Pintar",
      nominal: "Rp 150.000",
      deskripsi: "Menyediakan 1 paket buku panduan ekologi alam dan alat peraga eksperimen sains untuk anak-anak desa binaan.",
      alokasi: "Divisi Edukasi Anak & Masyarakat",
      ikon: "📚"
    },
    {
      id: "paket-tirta",
      namaPaket: "Paket Penjaga Mata Air",
      nominal: "Rp 300.000",
      deskripsi: "Mendukung biaya operasional pipa air bersih dan perawatan berkala tanggul penahan longsor di sekitar hulu air.",
      alokasi: "Divisi Penyelamatan Sumber Air",
      ikon: "💧"
    }
  ];

  // 2. Data Metode Pembayaran / Nomor Rekening
  const rekeningDonasi = [
    { bank: "Bank Mandiri", nomor: "142-000-xxxx-xxxx", atasNama: "Yayasan Kampus Alam Tegalsari" },
    { bank: "Bank BRI", nomor: "0023-01-xxxxxx-xx-x", atasNama: "Yayasan Kampus Alam Tegalsari" },
    { bank: "QRIS / E-Wallet", nomor: "Scan Kode QR KATI", atasNama: "Kampus Alam Tegalsari Indonesia" }
  ];

  // 3. Data Alur Transparansi Donasi
  const alurDonasi = [
    { step: "01", judul: "Pilih & Transfer", deskripsi: "Pilih paket dampakmu lalu transfer ke rekening resmi Yayasan Kampus Alam Tegalsari." },
    { step: "02", judul: "Konfirmasi WA", deskripsi: "Kirim bukti transfer ke WhatsApp admin beserta nama/anonim untuk pencatatan logbook." },
    { step: "03", judul: "Penyaluran Aksi", deskripsi: "Dana dialokasikan 100% untuk belanja bibit, logistik lapangan relawan, atau alat edukasi." },
    { step: "04", judul: "Laporan Terbuka", deskripsi: "Setiap akhir bulan, laporan keuangan dan dokumentasi foto lapangan diunggah ke publik." }
  ];

  return (
    <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '60px 20px', fontFamily: 'sans-serif' }}>
      
      {/* 🟢 1. HEADER HALAMAN */}
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 50px auto' }}>
        <span style={{ color: '#10b981', fontWeight: '700', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase' }}>
          Salurkan Kebaikanmu
        </span>
        <h1 style={{ color: '#064e3b', fontSize: '42px', fontWeight: '800', margin: '15px 0', letterSpacing: '-1px' }}>
          Patungan Rawat Bumi
        </h1>
        <div style={{ width: '60px', height: '5px', backgroundColor: '#10b981', margin: '0 auto 20px auto', borderRadius: '10px' }}></div>
        <p style={{ color: '#475569', fontSize: '17px', lineHeight: '1.7' }}>
          Setiap rupiah yang kamu titipkan adalah baris pohon baru, buku baru untuk anak-anak pelosok, dan aliran air bersih yang terjaga. Mari berinvestasi untuk masa depan bumi.
        </p>
      </div>

      {/* 🚀 2. STATISTIK TRANSPARANSI DANA */}
      <div style={{ maxWidth: '1000px', margin: '0 auto 60px auto', display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ flex: '1 1 200px', backgroundColor: 'white', padding: '30px', borderRadius: '20px', textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#10b981', marginBottom: '5px' }}>100%</div>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Tersalurkan ke Lapangan</div>
        </div>
        <div style={{ flex: '1 1 200px', backgroundColor: 'white', padding: '30px', borderRadius: '20px', textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#10b981', marginBottom: '5px' }}>1.420+</div>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Donatur Setia</div>
        </div>
        <div style={{ flex: '1 1 200px', backgroundColor: 'white', padding: '30px', borderRadius: '20px', textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '32px', fontWeight: '800', color: '#10b981', marginBottom: '5px' }}>Tiap Bulan</div>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Audit Laporan Terbuka</div>
        </div>
      </div>

      {/* 💼 3. PILIHAN PAKET DONASI */}
      <div style={{ maxWidth: "1000px", margin: "0 auto 80px auto" }}>
        <h3 style={{ color: '#064e3b', fontSize: '26px', fontWeight: '800', margin: '0 0 10px 0', textAlign: 'center' }}>
          Pilih Paket Dampak Positifmu
        </h3>
        <p style={{ color: '#64748b', fontSize: '15px', textAlign: 'center', marginBottom: '30px' }}>Donasi Anda dikelompokkan berdasarkan fokus pilar aksi riil di Kampus Alam.</p>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "30px"
        }}>
          {daftarPaket.map((paket) => (
            <div 
              key={paket.id}
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                backgroundColor: "white",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.06)",
                display: "flex",
                flexDirection: "column",
                border: "1px solid #e2e8f0"
              }}
            >
              {/* Bagian Atas Latar Gelap */}
              <div style={{
                backgroundColor: "#0d1b2a", 
                padding: "35px 25px",
                position: "relative",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}>
                <span style={{ fontSize: "40px", marginBottom: "10px" }}>{paket.ikon}</span>
                <h4 style={{ color: "#ffffff", fontSize: "20px", fontWeight: "800", margin: "5px 0" }}>
                  {paket.namaPaket}
                </h4>
                <div style={{ color: "#facc15", fontSize: "26px", fontWeight: "800", marginTop: "5px" }}>
                  {paket.nominal}
                </div>
              </div>

              {/* Bagian Bawah Latar Terang */}
              <div style={{ backgroundColor: "#ffffff", padding: "25px", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <p style={{ color: "#64748b", fontSize: "14.5px", lineHeight: "1.6", margin: "0 0 20px 0", textAlign: "center" }}>
                  {paket.deskripsi}
                </p>
                <div style={{ borderTop: "1px dashed #e2e8f0", paddingTop: "15px", textAlign: "center" }}>
                  <span style={{ fontSize: "11px", color: "#10b981", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", backgroundColor: "#f0fdf4", padding: "4px 10px", borderRadius: "50px" }}>
                    📍 Alokasi: {paket.alokasi}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 💳 4. METODE PEMBAYARAN / REKENING */}
      <div style={{ maxWidth: '1000px', margin: '0 auto 60px auto', backgroundColor: '#064e3b', borderRadius: '24px', padding: '40px', color: 'white', boxShadow: '0 15px 30px rgba(6, 78, 59, 0.15)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '10px', textAlign: 'center' }}>
          Informasi Rekening Resmi Yayasan 💳
        </h2>
        <p style={{ fontSize: '14px', color: '#a7f3d0', textAlign: 'center', marginBottom: '30px' }}>Mohon pastikan nama penerima transfer sudah sesuai demi menghindari penipuan.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '25px' }}>
          {rekeningDonasi.map((rek, i) => (
            <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '25px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ color: '#34d399', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase' }}>{rek.bank}</span>
              <h3 style={{ margin: '8px 0', color: '#ffffff', fontSize: '20px', letterSpacing: '1px' }}>{rek.nomor}</h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#cbd5e1' }}>a.n. {rek.atasNama}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 🧭 5. ALUR DAN TRANSPARANSI */}
      <div style={{ maxWidth: '1000px', margin: '0 auto 80px auto' }}>
        <h3 style={{ color: '#064e3b', fontSize: '26px', fontWeight: '800', margin: '0 0 10px 0', textAlign: 'center' }}>
          Prosedur & Transparansi Donasi
        </h3>
        <p style={{ color: '#64748b', fontSize: '15px', textAlign: 'center', marginBottom: '40px' }}>Bagaimana dana amanah dari Anda dikelola dan dilaporkan secara jujur.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {alurDonasi.map((alur, index) => (
            <div key={index} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '32px', fontWeight: '800', color: '#cbd5e1', marginBottom: '10px', lineHeight: 1 }}>
                {alur.step}
              </div>
              <h4 style={{ color: '#064e3b', fontSize: '16px', fontWeight: '700', margin: '0 0 8px 0' }}>
                {alur.judul}
              </h4>
              <p style={{ color: '#64748b', fontSize: '13.5px', lineHeight: '1.5', margin: 0 }}>
                {alur.deskripsi}
              </p>
            </div>
          ))}
        </div>

        {/* Tombol Konfirmasi WhatsApp */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a href="https://wa.me/628123456789" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '16px 36px', borderRadius: '14px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 6px 20px rgba(16,185,129,0.25)' }}>
              Konfirmasi Transfer via WhatsApp 📱
            </button>
          </a>
        </div>
      </div>

      {/* ❓ 6. SUB-FOOTER AJAKAN */}
      <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', padding: '30px', backgroundColor: '#f1f5f9', borderRadius: '20px' }}>
        <h4 style={{ color: '#0f172a', margin: '0 0 10px 0', fontSize: '16px', fontWeight: '700' }}>Ingin Berdonasi dalam Bentuk Bibit / Buku Fisik?</h4>
        <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>
          Kami menerima kiriman logistik fisik langsung ke alamat sekretariat Kampus Alam Tegalsari Indonesia. Silakan hubungi kontak admin untuk koordinasi pengiriman paket kargo Anda.
        </p>
      </div>

    </main>
  );
}