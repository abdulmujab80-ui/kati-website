"use client"; // Kunci anti-eror untuk merender di sisi browser dengan aman

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Modul Next.js untuk navigasi pindah halaman

// Tipe Data untuk Keamanan TypeScript komponen Tim Ekspedisi
interface TimEkspedisi {
  id: string;
  kategori: string;
  namaTim: string;
  semboyan: string;
  logoUrl: string;
  warnaJudul: string;
}

export default function VolunteerPage() {
  const router = useRouter(); // Inisialisasi fungsi navigasi router
  
  // State untuk mengatur tab/kolom menu yang sedang aktif (Default: Kolom 1)
  const [tabAktif, setTabAktif] = useState<"pendaftaran" | "informasi" | "dampak">("pendaftaran");

  // 1. Data Posisi Relawan Umum (Ditempatkan di Kolom 1)
  const posisiVolunteer = [
    {
      id: "fasilitator-edukasi",
      peran: "Fasilitator Kelas Alam",
      kuota: "3 Orang",
      tugas: "Mendampingi anak-anak sekolah saat berkunjung ke KATI, memandu eksperimen lingkungan sederhana, serta membawakan materi edukasi.",
      syarat: "Menyukai dunia anak-anak, komunikatif, dan memiliki ketertarikan pada isu lingkungan dasar."
    },
    {
      id: "crew-konservasi",
      peran: "Crew Lapangan Konservasi",
      kuota: "5 Orang",
      tugas: "Membantu manajemen pembibitan pohon endemik, pemeliharaan area hutan mikro, serta monitoring kelembaban tanah.",
      syarat: "Fisik sehat, tidak takut kotor, dan siap bekerja langsung di area terbuka."
    },
    {
      id: "digital-creator",
      peran: "Content Creator & Media",
      kuota: "2 Orang",
      tugas: "Mendokumentasikan aktivitas lapangan, membuat desain edukasi lingkungan, serta mengelola publikasi media sosial.",
      syarat: "Kreatif, memiliki HP/kamera mumpuni, dan paham tren media sosial."
    }
  ];

  // 2. Data Tim Ekspedisi Khusus (Ditempatkan di Kolom 2)
  const daftarTim: TimEkspedisi[] = [
    {
      id: "jagat-anjasmara",
      kategori: "2023",
      namaTim: "Tim Ekspedisi Jagat Anjasmara",
      semboyan: '"Menembus kabut vegetasi, menjaga benteng hijau terakhir lereng Anjasmara demi keberlanjutan pasokan air masa depan."',
      logoUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=150&auto=format&fit=crop&q=60", 
      warnaJudul: "#facc15"
    },
    {
      id: "arunika-bumi",
      kategori: "2025",
      namaTim: "Tim Ekspedisi Arunika Bumi",
      semboyan: '"Membawa fajar pengetahuan ekologi ke pelosok desa, menyemai kepedulian lingkungan sejak dini."',
      logoUrl: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=150&auto=format&fit=crop&q=60", 
      warnaJudul: "#ffffff"
    },
    {
      id: "tirta-amarta",
      kategori: "2026",
      namaTim: "Tim Ekspedisi Tirta Amarta",
      semboyan: '"Menyusuri hulu, merawat mata air purba, memastikan setiap tetes kehidupan mengalir tanpa batas."',
      logoUrl: "https://images.unsplash.com/photo-1504370805625-d32c54b16100?w=150&auto=format&fit=crop&q=60", 
      warnaJudul: "#facc15"
    }
  ];

  return (
    <main style={{ backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* 🟢 STYLE INJEKSI UNTUK HOVER, AKTIF TAB, & EFEK BUTTON */}
      <style dangerouslySetInnerHTML={{ __html: `
        .menu-nav-column {
          border: 2px solid #e2e8f0;
          border-radius: 20px;
          padding: 30px 24px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background-color: #ffffff;
        }
        .menu-nav-column:hover {
          transform: translateY(-4px);
          border-color: #10b981;
          box-shadow: 0 12px 25px rgba(16, 185, 129, 0.06);
        }
        .menu-nav-column.active {
          border-color: #064e3b;
          background-color: #f0fdf4;
          box-shadow: 0 8px 22px rgba(6, 78, 59, 0.05);
        }

        .touch-benefit-card {
          transition: all 0.25s ease;
        }
        .touch-benefit-card:hover {
          background-color: rgba(255,255,255,0.14) !important;
          transform: scale(1.02);
        }

        .bubble-card {
          position: relative;
          overflow: hidden;
          z-index: 1;
          transition: all 0.3s ease !important;
        }
        .bubble-card::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0px;
          height: 0px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(255,255,255,0) 70%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.6s ease, height 0.6s ease !important;
          z-index: -1;
        }
        .bubble-card:hover::before {
          width: 600px;
          height: 600px;
        }
        .bubble-card:hover {
          border-color: #10b981 !important;
          box-shadow: 0 10px 25px rgba(16, 185, 129, 0.05) !important;
          transform: translateY(-2px);
        }

        .clickable-team-page-card {
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .clickable-team-page-card:hover {
          transform: translateY(-6px);
          border-color: #10b981 !important;
          box-shadow: 0 15px 30px rgba(6, 78, 59, 0.08) !important;
        }

        .btn-bubble {
          transition: all 0.2s ease !important;
        }
        .btn-bubble:hover {
          box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4) !important;
          transform: translateY(-2px);
        }
        .btn-bubble:active {
          transform: scale(0.96);
        }
      `}} />

      {/* Pembungkus Konten Utama (Tanpa Navbar Duplikat) */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 20px' }}>
        
        {/* 🟢 1. HEADER HALAMAN MAIN HEADER */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 50px auto' }}>
          <span style={{ color: '#10b981', fontWeight: '800', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Ambil Peran Nyata
          </span>
          <h1 style={{ color: '#064e3b', fontSize: '42px', fontWeight: '800', margin: '12px 0 20px 0', letterSpacing: '-1px' }}>
            Bergabung Sebagai Relawan
          </h1>
          <div style={{ width: '60px', height: '4px', backgroundColor: '#10b981', margin: '0 auto 25px auto', borderRadius: '2px' }}></div>
          <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.7' }}>
            Punya waktu luang dan ingin berkontribusi langsung pada kelestarian bumi? Mari salurkan energi positifmu bersama keluarga besar Kampus Alam Tegalsari Indonesia.
          </p>
        </div>

        {/* 🚀 2. TIGA KOLOM NAVIGATION (Bersih & Responsif) */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "25px", 
          marginBottom: "50px" 
        }}>
          
          {/* Kolom 1: Pendaftaran Volunteer */}
          <div 
            className={`menu-nav-column ${tabAktif === "pendaftaran" ? "active" : ""}`}
            onClick={() => setTabAktif("pendaftaran")}
          >
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>📝</div>
            <h3 style={{ margin: "0 0 8px 0", color: "#064e3b", fontSize: "19px", fontWeight: "700" }}>
              1. Pendaftaran Volunteer
            </h3>
            <p style={{ margin: 0, color: "#64748b", fontSize: "14px", lineHeight: "1.5" }}>
              Lihat benefit eksklusif relawan, kualifikasi, kuota, serta formulir pendaftaran posisi yang tersedia.
            </p>
          </div>

          {/* Kolom 2: Informasi Data Volunteer */}
          <div 
            className={`menu-nav-column ${tabAktif === "informasi" ? "active" : ""}`}
            onClick={() => setTabAktif("informasi")}
          >
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>🗂️</div>
            <h3 style={{ margin: "0 0 8px 0", color: "#064e3b", fontSize: "19px", fontWeight: "700" }}>
              2. Informasi Data Volunteer
            </h3>
            <p style={{ margin: 0, color: "#64748b", fontSize: "14px", lineHeight: "1.5" }}>
              Akses direktori khusus divisi penjelajah, rekam jejak, semboyan, serta profil tim ekspedisi KATI.
            </p>
          </div>

          {/* Kolom 3: Dampak atau Achievement Volunteer */}
          <div 
            className={`menu-nav-column ${tabAktif === "dampak" ? "active" : ""}`}
            onClick={() => setTabAktif("dampak")}
          >
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>🏆</div>
            <h3 style={{ margin: "0 0 8px 0", color: "#064e3b", fontSize: "19px", fontWeight: "700" }}>
              3. Dampak & Achievement
            </h3>
            <p style={{ margin: 0, color: "#64748b", fontSize: "14px", lineHeight: "1.5" }}>
              Pantau total infografis pencapaian ekologi dan statistik riil aksi relawan kami di lapangan.
            </p>
          </div>

        </div>

        {/* 🟢 CONTAINER KONTEN DINAMIS */}
        <div style={{ 
          backgroundColor: "#f8fafc", padding: "45px 35px", borderRadius: "24px", 
          border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.01)" 
        }}>
          
          {/* ================= BLOK TAB 1: PENDAFTARAN VOLUNTEER ================= */}
          {tabAktif === "pendaftaran" && (
            <div>
              {/* Benefit Relawan */}
              <div style={{ backgroundColor: '#064e3b', borderRadius: '20px', padding: '35px', color: 'white', marginBottom: '45px', boxShadow: '0 12px 25px rgba(6, 78, 59, 0.1)' }}>
                <h4 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', textAlign: 'center' }}>
                  Apa Yang Akan Kamu Dapatkan? 💚
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                  <div className="touch-benefit-card" style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '20px', borderRadius: '14px' }}>
                    <h5 style={{ margin: '0 0 6px 0', color: '#34d399', fontSize: '15px', fontWeight: '700' }}>Sertifikat Resmi</h5>
                    <p style={{ margin: 0, fontSize: '13.5px', color: '#e2e8f0', lineHeight: '1.5' }}>Apresiasi formal atas kontribusi lingkunganmu yang berharga untuk portofolio masa depan.</p>
                  </div>
                  <div className="touch-benefit-card" style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '20px', borderRadius: '14px' }}>
                    <h5 style={{ margin: '0 0 6px 0', color: '#34d399', fontSize: '15px', fontWeight: '700' }}>Jaringan & Komunitas</h5>
                    <p style={{ margin: 0, fontSize: '13.5px', color: '#e2e8f0', lineHeight: '1.5' }}>Bertemu langsung dengan praktisi lingkungan, dosen, dan teman-teman satu visi.</p>
                  </div>
                  <div className="touch-benefit-card" style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '20px', borderRadius: '14px' }}>
                    <h5 style={{ margin: '0 0 6px 0', color: '#34d399', fontSize: '15px', fontWeight: '700' }}>Pelatihan Intensif</h5>
                    <p style={{ margin: 0, fontSize: '13.5px', color: '#e2e8f0', lineHeight: '1.5' }}>Pembekalan wawasan gratis mengenai ekologi dasar, kepemimpinan, dan kecakapan digital.</p>
                  </div>
                </div>
              </div>

              {/* Lowongan Relawan */}
              <h3 style={{ color: '#064e3b', fontSize: '24px', fontWeight: '800', margin: '0 0 25px 0', textAlign: 'center' }}>
                Posisi Relawan yang Tersedia saat Ini
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {posisiVolunteer.map((item) => (
                  <div 
                    key={item.id} 
                    className="bubble-card"
                    style={{ 
                      backgroundColor: 'white', borderRadius: '16px', padding: '30px', 
                      border: '1px solid #e2e8f0', display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                      gap: '20px', alignItems: 'center' 
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap' }}>
                        <h4 style={{ color: '#064e3b', fontSize: '20px', fontWeight: '700', margin: 0 }}>{item.peran}</h4>
                        <span style={{ backgroundColor: '#f1f5f9', color: '#475569', fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '50px' }}>
                          Kuota: {item.kuota}
                        </span>
                      </div>
                      <p style={{ color: '#475569', fontSize: '14.5px', lineHeight: '1.6', margin: '0 0 10px 0' }}><strong>Tugas:</strong> {item.tugas}</p>
                      <p style={{ color: '#64748b', fontSize: '13.5px', lineHeight: '1.6', margin: 0 }}><strong>Kualifikasi:</strong> <em>{item.syarat}</em></p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <a href="https://forms.google.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <button 
                          className="btn-bubble"
                          style={{ 
                            backgroundColor: '#10b981', color: 'white', border: 'none', 
                            padding: '13px 24px', borderRadius: '10px', fontSize: '14px', 
                            fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap'
                          }}
                        >
                          Daftar Lewat Form 🙋‍♂️
                        </button>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= BLOK TAB 2: INFORMASI DATA VOLUNTEER ================= */}
          {tabAktif === "informasi" && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '35px' }}>
                <h3 style={{ color: '#064e3b', fontSize: '24px', fontWeight: '800', margin: '0 0 6px 0' }}>
                  Direktori Khusus Tim Ekspedisi KATI
                </h3>
                <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                  Klik pada salah satu kartu tim operasional di bawah untuk <strong>membuka profil & database penjelajah</strong> relawan.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "25px" }}>
                {daftarTim.map((tim) => (
                  <div 
                    key={tim.id}
                    onClick={() => router.push(`/volunteer/${tim.id}`)}
                    className="clickable-team-page-card"
                    style={{
                      borderRadius: "16px", overflow: "hidden", backgroundColor: "white",
                      display: "flex", flexDirection: "column", border: "1px solid #e2e8f0"
                    }}
                  >
                    {/* Atas Card */}
                    <div style={{
                      backgroundColor: "#0d1b2a", padding: "35px 20px 25px 20px", position: "relative",
                      display: "flex", flexDirection: "column", alignItems: "center", minHeight: "210px", justifyContent: "center"
                    }}>
                      <div style={{ position: "absolute", top: "14px", left: "14px", backgroundColor: "#ffffff", padding: "4px 10px", borderRadius: "50px" }}>
                        <span style={{ color: "#0d1b2a", fontSize: "10px", fontWeight: "800" }}>🍃 {tim.kategori}</span>
                      </div>

                      <div style={{ width: "75px", height: "75px", borderRadius: "50%", overflow: "hidden", border: "3px solid rgba(255, 255, 255, 0.2)", marginBottom: "12px" }}>
                        <img src={tim.logoUrl} alt={tim.namaTim} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>

                      <h4 style={{ color: tim.warnaJudul, fontSize: "18px", fontWeight: "800", margin: "4px 0 0 0", textAlign: "center" }}>
                        {tim.namaTim}
                      </h4>
                      <span style={{ color: '#10b981', fontSize: '11px', marginTop: '8px', fontWeight: '700', textTransform: 'uppercase' }}>
                        Buka Profil Anggota →
                      </span>
                    </div>

                    {/* Bawah Card */}
                    <div style={{ backgroundColor: "#ffffff", padding: "20px", flexGrow: 1, display: "flex", alignItems: "center" }}>
                      <p style={{ color: "#64748b", fontSize: "13.5px", fontStyle: "italic", lineHeight: "1.6", margin: 0, textAlign: "center", width: "100%" }}>
                        {tim.semboyan}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= BLOK TAB 3: DAMPAK ATAU ACHIEVEMENT ================= */}
          {tabAktif === "dampak" && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '35px' }}>
                <h3 style={{ color: '#064e3b', fontSize: '24px', fontWeight: '800', margin: '0 0 6px 0' }}>
                  Statistik & Pencapaian Nyata Ekologi Relawan
                </h3>
                <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                  Berikut adalah rekapitulasi dampak nyata dan kontribusi hijau yang berhasil diwujudkan oleh seluruh angkatan relawan KATI di lapangan.
                </p>
              </div>

              {/* Tampilan Box Statistik Utama (Bersih & Rapi Tanpa Q&A Lagi) */}
              <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <div style={{ flex: '1 1 250px', backgroundColor: 'white', padding: '40px 20px', borderRadius: '20px', textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                  <div style={{ fontSize: '46px', fontWeight: '900', color: '#10b981', marginBottom: '6px' }}>120+</div>
                  <div style={{ fontSize: '13px', color: '#475569', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Relawan Aktif</div>
                </div>
                <div style={{ flex: '1 1 250px', backgroundColor: 'white', padding: '40px 20px', borderRadius: '20px', textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                  <div style={{ fontSize: '46px', fontWeight: '900', color: '#10b981', marginBottom: '6px' }}>5.000+</div>
                  <div style={{ fontSize: '13px', color: '#475569', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Pohon Ditanam</div>
                </div>
                <div style={{ flex: '1 1 250px', backgroundColor: 'white', padding: '40px 20px', borderRadius: '20px', textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                  <div style={{ fontSize: '46px', fontWeight: '900', color: '#10b981', marginBottom: '6px' }}>35</div>
                  <div style={{ fontSize: '13px', color: '#475569', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Desa Binaan</div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </main>
  );
}