"use client"; // Mengunci render di sisi browser, aman dari eror hydration Next.js

import React from "react";

// Tipe Data untuk Keamanan TypeScript komponen Kemitraan
interface KategoriMitra {
  id: string;
  kategori: string;
  judulMisi: string;
  deskripsi: string;
  logoUrl: string;
  warnaJudul: string;
}

export default function MitraPage() {
  // 1. Data Kategori Kemitraan (Sudah ditambahkan UGM)
  const daftarMitra: KategoriMitra[] = [
    {
      id: "mitra-ugm",
      kategori: "Kemitraan Universitas",
      judulMisi: "Universitas Gadjah Mada - Fakultas Kehutanan",
      deskripsi: '"Kolaborasi riset pemetaan keanekaragaman hayati flora endemik Jawa Timur untuk optimalisasi konservasi hutan mikro KATI."',
      logoUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=150&auto=format&fit=crop&q=60", // Tema hutan akademik estetik
      warnaJudul: "#facc15"
    },
    {
      id: "mitra-akademik",
      kategori: "Kemitraan Pendidikan",
      judulMisi: "Sinergi Riset & Kampus Merdeka",
      deskripsi: '"Membuka ruang kolaborasi bagi universitas dan sekolah untuk penelitian ekologi, praktik lapangan, dan pengembangan kurikulum berbasis alam."',
      logoUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=150&auto=format&fit=crop&q=60", 
      warnaJudul: "#ffffff" 
    },
    {
      id: "mitra-korporasi",
      kategori: "Kemitraan CSR",
      judulMisi: "Corporate Social Responsibility",
      deskripsi: '"Menyediakan wadah bagi perusahaan untuk menyalurkan dana CSR secara transparan dan berdampak langsung pada penanaman pohon serta pemberdayaan desa."',
      logoUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150&auto=format&fit=crop&q=60", 
      warnaJudul: "#ffffff" 
    },
    {
      id: "mitra-komunitas",
      kategori: "Kemitraan Lokal",
      judulMisi: "Kolaborasi Komunitas & UMKM",
      deskripsi: '"Menggandeng kelompok tani, pengrajin lokal, dan komunitas lingkungan untuk memperluas jaringan pasar ekonomi hijau yang berkelanjutan."',
      logoUrl: "https://images.unsplash.com/photo-1544484555-1480b184225d?w=150&auto=format&fit=crop&q=60", 
      warnaJudul: "#facc15"
    }
  ];

  // 2. Data Benefit Bagi Mitra
  const benefitMitra = [
    {
      judul: "Laporan Dampak Transparan",
      isi: "Setiap program kolaborasi akan mendapatkan laporan perkembangan berkala (logbook, foto, koordinat GPS pohon) secara berkala."
    },
    {
      judul: "Publikasi & Branding",
      isi: "Logo dan profil instansi mitra akan dicantumkan secara exclusif pada seluruh media rilis publikasi, web, dan plakat fisik KATI."
    },
    {
      judul: "Akses Fasilitas Kampus Alam",
      isi: "Hak istimewa penggunaan area konservasi, aula terbuka, dan guest house KATI untuk acara internal atau gathering instansi Anda."
    }
  ];

  // 3. Data Prosedur Kerjasama
  const alurKerjasama = [
    { step: "01", judul: "Pengajuan Proposal", deskripsi: "Unduh draf kerja sama atau kirimkan proposal ide kolaborasi Anda melalui formulir kemitraan." },
    { step: "02", judul: "Diskusi & Kesepahaman", deskripsi: "Tim KATI akan menjadwalkan pertemuan daring/luring untuk menyelaraskan linimasa dan teknis program." },
    { step: "03", judul: "Penandatanganan MOU", deskripsi: "Pengesahan dokumen kerja sama resmi sebagai payung hukum kolaborasi yang sehat dan berkelanjutan." },
    { step: "04", judul: "Eksekusi & Pelaporan", deskripsi: "Pelaksanaan aksi nyata di lapangan bersama relawan yang diakhiri dengan penyerahan laporan dampak." }
  ];

  // 4. Data FAQ (Tanya Jawab Mitra)
  const faqMitra = [
    {
      tanya: "Apakah kemitraan ini terbatas untuk instansi di Jawa Timur saja?",
      jawab: "Tidak. Kami membuka kolaborasi dari instansi, universitas, maupun korporasi dari seluruh Indonesia, baik untuk program lapangan maupun kampanye digital."
    },
    {
      tanya: "Bagaimana cara memastikan transparansi dana CSR yang disalurkan?",
      jawab: "Kami memiliki sistem audit berkala dan menyajikan dasbor laporan keuangan serta visual perkembangan proyek yang bisa diakses langsung oleh pihak mitra."
    }
  ];

  return (
    <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '60px 20px', fontFamily: 'sans-serif' }}>
      
      {/* 🟢 STYLE INJEKSI UNTUK EFEK INTERAKTIF PREMIUM */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Efek Kartu Mitra */
        .mitra-card {
          transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s ease, border-color 0.4s ease !important;
        }
        .mitra-logo-wrapper {
          transition: border-color 0.3s ease, transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) !important;
        }
        .mitra-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 35px -5px rgba(13, 27, 42, 0.08) !important;
          border-color: #cbd5e1 !important;
        }
        .mitra-card:hover .mitra-logo-wrapper {
          border-color: #10b981 !important;
          transform: scale(1.05);
        }
        .mitra-card:active {
          transform: translateY(-3px) scale(0.99);
        }

        /* Efek Kartu Langkah Prosedur */
        .step-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease !important;
        }
        .step-number {
          transition: color 0.3s ease, transform 0.3s ease !important;
        }
        .step-card:hover {
          transform: translateY(-4px);
          border-color: #10b981 !important;
          box-shadow: 0 10px 20px rgba(16, 185, 129, 0.03) !important;
        }
        .step-card:hover .step-number {
          color: #10b981 !important;
          transform: translateX(4px);
        }

        /* Efek Tombol CTA Mengkilap */
        .cta-button {
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease !important;
        }
        .cta-button::after {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
          transform: skewX(-25deg);
          transition: none;
        }
        .cta-button:hover::after {
          left: 150%;
          transition: left 0.6s ease-in-out;
        }
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(16, 185, 129, 0.35) !important;
        }
        .cta-button:active {
          transform: scale(0.97);
        }
      `}} />

      {/* 🟢 1. HEADER HALAMAN */}
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 50px auto' }}>
        <span style={{ color: '#10b981', fontWeight: '700', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase' }}>
          Sinergi Untuk Bumi
        </span>
        <h1 style={{ color: '#064e3b', fontSize: '42px', fontWeight: '800', margin: '15px 0', letterSpacing: '-1px' }}>
          Kolaborasi Kemitraan Mitra
        </h1>
        <div style={{ width: '60px', height: '5px', backgroundColor: '#10b981', margin: '0 auto 20px auto', borderRadius: '10px' }}></div>
        <p style={{ color: '#475569', fontSize: '17px', lineHeight: '1.7' }}>
          Wujudkan visi keberlanjutan instansi Anda bersama Kampus Alam Tegalsari Indonesia. Kami percaya dampak besar hanya bisa dicapai melalui jalinan gotong royong yang kokoh.
        </p>
      </div>

      {/* 🚀 2. STATISTIK JARINGAN MITRA */}
      <div style={{ maxWidth: '1000px', margin: '0 auto 60px auto', display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ flex: '1 1 200px', backgroundColor: 'white', padding: '30px', borderRadius: '20px', textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '36px', fontWeight: '800', color: '#10b981', marginBottom: '5px' }}>45+</div>
          <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Instansi Bergabung</div>
        </div>
        <div style={{ flex: '1 1 200px', backgroundColor: 'white', padding: '30px', borderRadius: '20px', textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '36px', fontWeight: '800', color: '#10b981', marginBottom: '5px' }}>15+</div>
          <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Riset Akademik</div>
        </div>
        <div style={{ flex: '1 1 200px', backgroundColor: 'white', padding: '30px', borderRadius: '20px', textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '36px', fontWeight: '800', color: '#10b981', marginBottom: '5px' }}>Rp 500M+</div>
          <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Dana Lestari Dikelola</div>
        </div>
      </div>

      {/* 🎁 3. BENEFIT KEMITRAAN */}
      <div style={{ maxWidth: '1000px', margin: '0 auto 60px auto', backgroundColor: '#064e3b', borderRadius: '24px', padding: '40px', color: 'white', boxShadow: '0 15px 30px rgba(6, 78, 59, 0.15)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '25px', textAlign: 'center' }}>
          Nilai Tambah Kolaborasi Bersama KATI 🤝
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px' }}>
          {benefitMitra.map((b, i) => (
            <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '20px', borderRadius: '16px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#34d399', fontSize: '16px' }}>{b.judul}</h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#e2e8f0', lineHeight: '1.5' }}>{b.isi}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 💼 4. DAFTAR TIPE KEMITRAAN */}
      <div style={{ maxWidth: "1000px", margin: "0 auto 80px auto" }}>
        <h3 style={{ color: '#064e3b', fontSize: '26px', fontWeight: '800', margin: '0 0 10px 0', textAlign: 'center' }}>
          Sektor Fokus Kolaborasi Mitra
        </h3>
        <p style={{ color: '#64748b', fontSize: '15px', textAlign: 'center', marginBottom: '30px' }}>Pilih sektor kerja sama yang paling sesuai dengan pilar pergerakan lembaga Anda.</p>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "30px"
        }}>
          {daftarMitra.map((mitra) => (
            <div 
              key={mitra.id}
              className="mitra-card"
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
              {/* Bagian Atas (Latar Gelap Navy) */}
              <div style={{
                backgroundColor: "#0d1b2a", 
                padding: "40px 25px 30px 25px",
                position: "relative",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "230px"
              }}>
                {/* Badge Kapsul Putih */}
                <div style={{
                  position: "absolute",
                  top: "16px",
                  left: "16px",
                  backgroundColor: "#ffffff",
                  padding: "5px 12px",
                  borderRadius: "50px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
                }}>
                  <span style={{ color: "#0d1b2a", fontSize: "10px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    🏢 {mitra.kategori}
                  </span>
                </div>

                {/* Logo Bulat Tengah */}
                <div 
                  className="mitra-logo-wrapper"
                  style={{
                    width: "85px",
                    height: "85px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "3px solid rgba(255, 255, 255, 0.2)",
                    backgroundColor: "#1b263b",
                    marginBottom: "15px"
                  }}
                >
                  <img src={mitra.logoUrl} alt={mitra.judulMisi} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>

                {/* Judul Fokus Mitra */}
                <h4 style={{ color: mitra.warnaJudul, fontSize: "18px", fontWeight: "800", margin: "5px 0 0 0", lineHeight: "1.3" }}>
                  {mitra.judulMisi}
                </h4>
              </div>

              {/* Bagian Bawah (Latar Terang Putih) */}
              <div style={{ backgroundColor: "#ffffff", padding: "25px", flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <p style={{ color: "#64748b", fontSize: "14px", fontStyle: "italic", lineHeight: "1.6", margin: 0, textAlign: "center" }}>
                  {mitra.deskripsi}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol CTA Utama Mitra */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a href="https://forms.google.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button 
              className="cta-button"
              style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '16px 36px', borderRadius: '14px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 6px 20px rgba(16,185,129,0.25)' }}
            >
              Mulai Ajukan Kerja Sama 📝
            </button>
          </a>
        </div>
      </div>

      {/* 🧭 5. ALUR DAN PROSEDUR KERJASAMA */}
      <div style={{ maxWidth: '1000px', margin: '0 auto 80px auto' }}>
        <h3 style={{ color: '#064e3b', fontSize: '26px', fontWeight: '800', margin: '0 0 10px 0', textAlign: 'center' }}>
          Alur Prosedur Kerja Sama
        </h3>
        <p style={{ color: '#64748b', fontSize: '15px', textAlign: 'center', marginBottom: '40px' }}>Tahapan mudah membangun kolaborasi resmi bersama kami.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {alurKerjasama.map((alur, index) => (
            <div 
              key={index} 
              className="step-card"
              style={{ backgroundColor: 'white', padding: '25px', borderRadius: '20px', border: '1px solid #e2e8f0', position: 'relative' }}
            >
              <div 
                className="step-number"
                style={{ fontSize: '32px', fontWeight: '800', color: '#e2e8f0', marginBottom: '10px', lineHeight: 1, display: 'inline-block' }}
              >
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
      </div>

      {/* ❓ 6. FAQ TANYA JAWAB MITRA */}
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h3 style={{ color: '#064e3b', fontSize: '24px', fontWeight: '800', margin: '0 0 30px 0', textAlign: 'center' }}>
          Pertanyaan Seputar Kemitraan
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {faqMitra.map((faq, index) => (
            <div key={index} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ color: '#0f172a', fontSize: '16px', fontWeight: '700', margin: '0 0 10px 0' }}>Q: {faq.tanya}</h4>
              <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>A: {faq.jawab}</p>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}