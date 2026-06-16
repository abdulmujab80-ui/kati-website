"use client"; // Mengunci render di sisi browser, aman dari eror hydration Next.js

import React, { useState } from "react";

// Tipe Data untuk Keamanan TypeScript komponen Kemitraan
interface KategoriMitra {
  id: string;
  kategori: string;
  judulMisi: string;
  deskripsi: string;
  logoUrl: string;
  warnaJudul: string;
  linkUrl: string; // Tambahan property untuk link halaman baru
}

export default function MitraPage() {
  // State untuk mengontrol sub-menu aktif ("prosedur" atau "lembaga")
  const [activeTab, setActiveTab] = useState<"prosedur" | "lembaga">("prosedur");

  // 1. Data Kategori Kemitraan (Sudah diperbarui dengan UIN Malang)
  const daftarMitra: KategoriMitra[] = [
    {
      id: "mitra-uin-malang",
      kategori: "Kemitraan Universitas",
      judulMisi: "UIN Maulana Malik Ibrahim Malang - Fakultas Tarbiyah dan Ilmu Keguruan",
      deskripsi: '"Kolaborasi pengembangan kurikulum pembelajaran berbasis alam (Eco-Education) serta program KKN Tematik guna mencetak calon pendidik yang berwawasan lingkungan lestari."',
      // Menggunakan direct link logo agar terbaca oleh tag img, atau bisa diganti ke local asset public folder
      logoUrl: "images.jpg",
      warnaJudul: "#facc15",
      linkUrl: "https://fitk.uin-malang.ac.id" // URL halaman baru saat kartu diklik
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

  // 3. Data Prosedur Kerja Sama
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
        /* Style Tombol Navigasi Sub Menu */
        .submenu-btn {
          padding: 14px 28px;
          font-size: 15px;
          font-weight: 700;
          border-radius: 50px;
          border: 2px solid #e2e8f0;
          background-color: white;
          color: #64748b;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .submenu-btn:hover {
          border-color: #10b981;
          color: #10b981;
        }
        .submenu-btn.active {
          background-color: #064e3b;
          border-color: #064e3b;
          color: white;
          box-shadow: 0 10px 20px rgba(6, 78, 59, 0.15);
        }

        /* Efek Kartu Mitra */
        .mitra-card {
          transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s ease, border-color 0.4s ease !important;
          text-decoration: none; /* Menghilangkan underline bawaan tag 'a' */
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
        }
        .cta-button:hover::after {
          left: 150%;
          transition: left 0.6s ease-in-out;
        }
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(16, 185, 129, 0.35) !important;
        }
      `}} />

      {/* 🟢 1. HEADER UTAMA HALAMAN */}
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 40px auto' }}>
        <span style={{ color: '#10b981', fontWeight: '700', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase' }}>
          Sinergi Untuk Bumi
        </span>
        <h1 style={{ color: '#064e3b', fontSize: '42px', fontWeight: '800', margin: '15px 0', letterSpacing: '-1px' }}>
          Kemitraan & Kolaborasi
        </h1>
        <div style={{ width: '60px', height: '5px', backgroundColor: '#10b981', margin: '0 auto 20px auto', borderRadius: '10px' }}></div>
        <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.7' }}>
          Wujudkan visi keberlanjutan bersama Kampus Alam Tegalsari Indonesia. Kami percaya dampak besar hanya bisa dicapai melalui jalinan gotong royong yang kokoh.
        </p>
      </div>

      {/* 🧭 2. NAVIGASI SUB-MENU (TAB SWITCHER) */}
      <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "50px", flexWrap: "wrap" }}>
        <button 
          className={`submenu-btn ${activeTab === "prosedur" ? "active" : ""}`}
          onClick={() => setActiveTab("prosedur")}
        >
          Prosedur Ber-mitra
        </button>
        <button 
          className={`submenu-btn ${activeTab === "lembaga" ? "active" : ""}`}
          onClick={() => setActiveTab("lembaga")}
        >
          Lembaga Mitra Kami
        </button>
      </div>

      {/* ─── KONTEN SUB-MENU 1: PROSEDUR BERMITRA ─── */}
      {activeTab === "prosedur" && (
        <div style={{ animation: "fadeIn 0.5s ease" }}>
          
          {/* Benefit Kemitraan */}
          <div style={{ maxWidth: '1000px', margin: '0 auto 50px auto', backgroundColor: '#064e3b', borderRadius: '24px', padding: '40px', color: 'white', boxShadow: '0 15px 30px rgba(6, 78, 59, 0.15)' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '25px', textAlign: 'center' }}>
              Nilai Tambah Kolaborasi Bersama KATI
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

          {/* Alur Kerja Sama */}
          <div style={{ maxWidth: '1000px', margin: '0 auto 50px auto' }}>
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
                  <div className="step-number" style={{ fontSize: '32px', fontWeight: '800', color: '#e2e8f0', marginBottom: '10px', lineHeight: 1, display: 'inline-block' }}>
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

            {/* Tombol Ajukan Kolaborasi */}
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <a href="https://forms.google.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <button className="cta-button" style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '16px 36px', borderRadius: '14px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 6px 20px rgba(16,185,129,0.25)' }}>
                  Mulai Ajukan Kerja Sama
                </button>
              </a>
            </div>
          </div>

          {/* FAQ Mitra */}
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

        </div>
      )}

      {/* ─── KONTEN SUB-MENU 2: LEMBAGA YANG SUDAH BERMITRA ─── */}
      {activeTab === "lembaga" && (
        <div style={{ animation: "fadeIn 0.5s ease" }}>
          
          {/* Jaringan Statistik */}
          <div style={{ maxWidth: '1000px', margin: '0 auto 50px auto', display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ flex: '1 1 200px', backgroundColor: 'white', padding: '30px', borderRadius: '20px', textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '36px', fontWeight: '800', color: '#10b981', marginBottom: '5px' }}>1</div>
              <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Instansi Bergabung</div>
            </div>
            <div style={{ flex: '1 1 200px', backgroundColor: 'white', padding: '30px', borderRadius: '20px', textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '36px', fontWeight: '800', color: '#10b981', marginBottom: '5px' }}>3</div>
              <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Riset Akademik</div>
            </div>
            <div style={{ flex: '1 1 200px', backgroundColor: 'white', padding: '30px', borderRadius: '20px', textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '36px', fontWeight: '800', color: '#10b981', marginBottom: '5px' }}>7</div>
              <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Program Pengabdian</div>
            </div>
          </div>

          {/* Grid Lembaga Terdaftar */}
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <h3 style={{ color: '#064e3b', fontSize: '26px', fontWeight: '800', margin: '0 0 10px 0', textAlign: 'center' }}>
              Sektor Fokus Kolaborasi Mitra
            </h3>
            <p style={{ color: '#64748b', fontSize: '15px', textAlign: 'center', marginBottom: '40px' }}>
              Daftar lembaga, universitas, dan korporasi penyalur aksi sosial berkelanjutan yang terafiliasi resmi dengan KATI.
            </p>
            
            {/* 🛠️ PERBAIKAN GRID: Menggunakan auto-fill dan max lebar 380px agar kartu tunggal tidak melar lebar */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 380px))", gap: "30px", justifyContent: "center" }}>
              {daftarMitra.map((mitra) => (
                /* 🛠️ PERBAIKAN NAVIGASI: Mengubah wrapper menjadi tag 'a' dengan target '_blank' untuk pindah ke halaman baru */
                <a 
                  href={mitra.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={mitra.id}
                  className="mitra-card"
                  style={{ borderRadius: "20px", overflow: "hidden", backgroundColor: "white", boxShadow: "0 10px 30px rgba(0, 0, 0, 0.06)", display: "flex", flexDirection: "column", border: "1px solid #e2e8f0", cursor: "pointer" }}
                >
                  {/* Atas */}
                  <div style={{ backgroundColor: "#0d1b2a", padding: "40px 25px 30px 25px", position: "relative", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "230px" }}>
                    <div style={{ position: "absolute", top: "16px", left: "16px", backgroundColor: "#ffffff", padding: "5px 12px", borderRadius: "50px", boxShadow: "0 4px 10px rgba(0,0,0,0.15)" }}>
                      <span style={{ color: "#0d1b2a", fontSize: "10px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        {mitra.kategori}
                      </span>
                    </div>

                    <div className="mitra-logo-wrapper" style={{ width: "85px", height: "85px", borderRadius: "50%", overflow: "hidden", border: "3px solid rgba(255, 255, 255, 0.2)", backgroundColor: "#1b263b", marginBottom: "15px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <img src={mitra.logoUrl} alt={mitra.judulMisi} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "5px", backgroundColor: "#fff" }} />
                    </div>

                    <h4 style={{ color: mitra.warnaJudul, fontSize: "16px", fontWeight: "800", margin: "5px 0 0 0", lineHeight: "1.4" }}>
                      {mitra.judulMisi}
                    </h4>
                  </div>

                  {/* Bawah */}
                  <div style={{ backgroundColor: "#ffffff", padding: "25px", flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <p style={{ color: "#64748b", fontSize: "14px", fontStyle: "italic", lineHeight: "1.6", margin: 0, textAlign: "center" }}>
                      {mitra.deskripsi}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>
      )}

    </main>
  );
}