"use client";

import React, { useState, useEffect, useRef } from "react";

interface AnimasiProps {
  children: React.ReactNode;
  arah?: "kiri" | "kanan" | "bawah";
}

// Komponen Pembungkus Animasi Masuk saat Digulirkan
function ElemenAnimasiProgram({ children, arah = "bawah" }: AnimasiProps) {
  const [terlihat, setTerlihat] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setTerlihat(true);
      });
    }, { threshold: 0.1 });

    if (domRef.current) observer.observe(domRef.current);
    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  const dapatkanTransform = () => {
    if (!terlihat) {
      if (arah === "kiri") return "translateX(-40px)";
      if (arah === "kanan") return "translateX(40px)";
      return "translateY(30px)";
    }
    return "translate(0)";
  };

  return (
    <div
      ref={domRef}
      style={{
        opacity: terlihat ? 1 : 0,
        transform: dapatkanTransform(),
        transition: "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform, opacity",
        width: "100%"
      }}
    >
      {children}
    </div>
  );
}

export default function ProgramPage() {
  const fontStyle = { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' };

  const daftarProgram = [
    {
      id: "kelas-alam",
      emoji: "🌿",
      nama: "Kelas Alam Terpadu",
      tagline: "MENYEMAI GENERASI CINTA BUMI",
      deskripsi: "Sistem pendidikan terbuka yang mempertemukan teori akademis dengan praktik langsung di alam. Peserta diajak mengenali ekosistem lokal, memahami siklus hidup vegetasi, serta mengasah kepekaan ekologis lewat interaksi fisik bersama bumi.",
      warnaTema: "#10b981",
      warnaBg: "#f0fdf4",
      fitur: ["Kurikulum Berbasis Musim", "Praktik Lapangan Langsung", "Sertifikasi Kompetensi Hijau"],
      metrik: { nilai: "4,200+", label: "Siswa Tersertifikasi" }
    },
    {
      id: "konservasi",
      emoji: "🌳",
      nama: "Konservasi & Pemulihan Hutan",
      tagline: "AKSI NYATA RESTORASI EKOSISTEM",
      deskripsi: "Gerakan berbasis data dan aksi lapangan untuk melakukan pembibitan mandiri, penanaman pohon endemik yang terancam punah, serta pemulihan ekosistem hutan mikro guna mengembalikan stabilitas tata air dan keanekaragaman hayati.",
      warnaTema: "#047857",
      warnaBg: "#ecfdf5",
      fitur: ["Bank Benih Endemik", "Monitoring Pohon Berbasis IoT", "Adopsi Pohon Remaja"],
      metrik: { nilai: "18.5k", label: "Pohon Telah Ditanam" }
    },
    {
      id: "ekowisata",
      emoji: "🎒",
      nama: "Ekowisata Edukatif KATI",
      tagline: "PETUALANGAN BERBAUR KEARIFAN LOKAL",
      deskripsi: "Jelajah kawasan hijau terintegrasi yang dirancang khusus untuk mengedukasi wisatawan. Program ini memadukan keindahan panorama alam Tegalsari dengan petualangan kultural, pengenalan tanaman obat, hingga workshop pelestarian air.",
      warnaTema: "#0f766e",
      warnaBg: "#f0fdfa",
      fitur: ["Pemandu Lokal Tersertifikasi", "Jalur Edukasi Interaktif", "Konsep Wisata Minim Sampah"],
      metrik: { nilai: "12+", label: "Zona Edukasi Aktif" }
    },
    {
      id: "ekonomi-hijau",
      emoji: "💰",
      nama: "UMKM & Ekonomi Hijau",
      tagline: "KEMANDIRIAN WARGA BERKELANJUTAN",
      deskripsi: "Pemberdayaan ekonomi masyarakat lingkar kampus melalui hilirisasi produk kreatif ramah lingkungan. Kami memfasilitasi pelatihan pembuatan kerajinan serat alam, produksi pupuk organik makro, hingga pemasaran digital komoditas warga.",
      warnaTema: "#0e7490",
      warnaBg: "#ecfeff",
      fitur: ["Pelatihan Olah Limbah", "Akses Pasar Komunitas", "Sistem Sirkular Berbagi Hasil"],
      metrik: { nilai: "85", label: "UMKM Mitra Binaan" }
    },
    {
      id: "riset-iklim",
      emoji: "🔬",
      nama: "Riset Iklim Terapan Digital",
      tagline: "SAINS DAN TEKNOLOGI UNTUK BUMI",
      deskripsi: "Platform kolaborasi mutakhir bagi akademisi, peneliti muda, dan praktisi lingkungan. Memanfaatkan teknologi sensor digital untuk memantau kualitas udara, struktur kelembapan tanah, dan menciptakan solusi mitigasi perubahan iklim berskala makro.",
      warnaTema: "#0369a1",
      warnaBg: "#f0f9ff",
      fitur: ["Stasiun Cuaca Mandiri", "Publikasi Jurnal Terbuka", "Kolaborasi Lintas Disiplin Ilmu"],
      metrik: { nilai: "24", label: "Riset Terpublikasi" }
    }
  ];

  return (
    <main style={{ ...fontStyle, backgroundColor: '#fafafa', minHeight: '100vh', color: '#0f172a', overflowX: 'hidden' }}>
      
      {/* 🟢 STYLE INJEKSI UNTUK HOVER PREMIUM & ELEMEN INTERAKTIF */}
      <style dangerouslySetInnerHTML={{ __html: `
        .tombol-jelajah {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .tombol-jelajah:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 20px -8px rgba(15, 23, 42, 0.3) !important;
          background-color: #022c22 !important;
          border-color: #022c22 !important;
        }
        .blok-fitur {
          transition: all 0.2s ease;
        }
        .blok-fitur:hover {
          transform: translateX(4px);
        }
        .kartu-visual-container {
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .kartu-visual-container:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 30px 60px -15px rgba(0,0,0,0.08) !important;
        }
        @media (max-width: 768px) {
          .hero-title { font-size: 36px !important; }
          .stats-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
      `}} />

      {/* 🟩 HERO SECTION BANNER */}
      <div style={{ 
        background: 'linear-gradient(145deg, #022c22, #064e3b)', 
        color: 'white', 
        padding: '140px 20px 140px 20px', 
        textAlign: 'center',
        position: 'relative'
      }}>
        {/* Pola Dekoratif Latar Belakang */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.08, backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}></div>
        
        <div style={{ maxWidth: '850px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <span style={{ 
            color: '#34d399', 
            fontWeight: '700', 
            fontSize: '12px', 
            letterSpacing: '2.5px', 
            textTransform: 'uppercase', 
            backgroundColor: 'rgba(52, 211, 153, 0.12)', 
            padding: '10px 20px', 
            borderRadius: '100px',
            border: '1px solid rgba(52, 211, 153, 0.2)'
          }}>
            Inisiatif Strategis KATI
          </span>
          <h1 className="hero-title" style={{ fontSize: '56px', margin: '24px 0 20px 0', fontWeight: '800', letterSpacing: '-1.5px', lineHeight: '1.15' }}>
            Ranah Pergerakan & Dampak Alam
          </h1>
          <p style={{ fontSize: '19px', color: '#94a3b8', lineHeight: '1.7', maxWidth: '650px', margin: '0 auto', fontWeight: '400' }}>
            Menjelajahi program berkesinambungan berstandar global yang dirancang untuk memulihkan kestabilan ekosistem sekaligus memandirikan masyarakat lokal.
          </p>
        </div>
      </div>

      {/* 📊 BILAH STATISTIK DAMPAK GLOBAL (KHAS WEBSITE NGO BESAR) */}
      <div style={{ marginTop: '-50px', position: 'relative', zIndex: 10, padding: '0 20px' }}>
        <div className="stats-grid" style={{ 
          maxWidth: '1140px', 
          margin: '0 auto', 
          backgroundColor: '#ffffff', 
          borderRadius: '20px', 
          padding: '30px', 
          boxShadow: '0 20px 40px -10px rgba(0,0,0,0.05)', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '40px', 
          border: '1px solid #f1f5f9'
        }}>
          {[
            { angka: "5+", wilayah: "Rumpun Program Kerja", sub: "Fokus restorasi multi-sektor" },
            { angka: "85%", wilayah: "Konservasi Area Target", sub: "Restorasi hutan mikro lokal" },
            { angka: "20k+", wilayah: "Penerima Manfaat", sub: "Masyarakat sipil & akademisi" }
          ].map((stat, sIdx) => (
            <div key={sIdx} style={{ textAlign: 'center', borderRight: sIdx !== 2 ? '1px solid #f1f5f9' : 'none' }}>
              <div style={{ fontSize: '36px', fontWeight: '800', color: '#047857', letterSpacing: '-1px' }}>{stat.angka}</div>
              <div style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b', marginTop: '4px' }}>{stat.wilayah}</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 🗺️ ALUR PROGRAM BERSELING (Z-PATTERN LAYOUT) */}
      <div style={{ padding: '120px 20px', maxWidth: '1140px', margin: '0 auto' }}>
        {daftarProgram.map((prog, indeks) => {
          const isGenap = indeks % 2 === 0;
          
          return (
            <div 
              key={prog.id}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                gap: '80px', 
                marginBottom: '140px',
                flexWrap: 'wrap-reverse',
                flexDirection: isGenap ? 'row' : 'row-reverse'
              }}
            >
              {/* KOLOM TEKS PENJELASAN */}
              <div style={{ flex: '1 1 500px' }}>
                <ElemenAnimasiProgram arah={isGenap ? "kiri" : "kanan"}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                      <span style={{ width: '16px', height: '2px', backgroundColor: prog.warnaTema, display: 'inline-block' }}></span>
                      <span style={{ color: prog.warnaTema, fontWeight: '700', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' }}>
                        {prog.tagline}
                      </span>
                    </div>
                    
                    <h2 style={{ color: '#0f172a', fontSize: '36px', fontWeight: '800', margin: '0 0 24px 0', letterSpacing: '-1px', lineHeight: '1.25' }}>
                      {prog.nama}
                    </h2>
                    
                    <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.8', marginBottom: '32px', fontWeight: '400' }}>
                      {prog.deskripsi}
                    </p>

                    {/* Mini List Fitur Program */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px', marginBottom: '40px' }}>
                      {prog.fitur.map((fitur, fIdx) => (
                        <div key={fIdx} className="blok-fitur" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ 
                            backgroundColor: prog.warnaBg, 
                            color: prog.warnaTema, 
                            fontSize: '12px', 
                            fontWeight: 'bold',
                            width: '24px', 
                            height: '24px', 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            border: `1px solid rgba(0,0,0,0.03)`
                          }}>✓</span>
                          <span style={{ color: '#334155', fontSize: '15px', fontWeight: '500' }}>{fitur}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tombol Menuju Sub-Halaman */}
                    <a href={`/program/${prog.id}`} style={{ textDecoration: 'none', display: 'inline-block' }}>
                      <button className="tombol-jelajah" style={{ 
                        backgroundColor: '#0f172a', 
                        color: '#ffffff', 
                        border: '1px solid #0f172a', 
                        padding: '16px 32px', 
                        fontSize: '14px', 
                        fontWeight: '600', 
                        borderRadius: '12px', 
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}>
                        Pelajari Selengkapnya
                        <span style={{ fontSize: '16px', transition: 'transform 0.2s' }}>→</span>
                      </button>
                    </a>
                  </div>
                </ElemenAnimasiProgram>
              </div>

              {/* KOLOM VISUAL GRAFIS PREMIUM (SISI SEBELAHNYA) */}
              <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
                <ElemenAnimasiProgram arah={isGenap ? "kanan" : "kiri"}>
                  <div className="kartu-visual-container" style={{ 
                    width: '100%',
                    maxWidth: '440px',
                    height: '360px', 
                    backgroundColor: '#ffffff', 
                    borderRadius: '24px', 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center', 
                    justifyContent: 'center',
                    position: 'relative',
                    border: '1px solid #f1f5f9',
                    boxShadow: '0 20px 50px -20px rgba(0,0,0,0.05)'
                  }}>
                    {/* Aksen Latar Belakang Kartu Medali */}
                    <div style={{ 
                      position: 'absolute', 
                      width: '80%', 
                      height: '80%', 
                      borderRadius: '32px', 
                      backgroundColor: prog.warnaBg, 
                      opacity: 0.7, 
                      zIndex: 0,
                      transform: 'rotate(-3deg)'
                    }}></div>
                    
                    {/* Lingkaran Pusat Ikon */}
                    <div style={{ 
                      position: 'relative', 
                      width: '140px', 
                      height: '140px', 
                      borderRadius: '50%', 
                      backgroundColor: '#ffffff', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      zIndex: 1,
                      boxShadow: '0 15px 30px -10px rgba(0,0,0,0.06)'
                    }}>
                      <div style={{ fontSize: '64px', filter: 'drop-shadow(0 8px 12px rgba(0,0,0,0.08))' }}>
                        {prog.emoji}
                      </div>
                    </div>

                    {/* Floating Impact Badge (Khas NGO Profesional) */}
                    <div style={{
                      position: 'absolute',
                      top: '30px',
                      right: '-10px',
                      backgroundColor: '#ffffff',
                      padding: '12px 20px',
                      borderRadius: '16px',
                      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.08)',
                      zIndex: 2,
                      border: '1px solid #f1f5f9',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '18px', fontWeight: '800', color: prog.warnaTema, lineHeight: '1' }}>{prog.metrik.nilai}</div>
                      <div style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', marginTop: '4px' }}>{prog.metrik.label}</div>
                    </div>

                    {/* Kode Dokumen/Sertifikasi Transparan */}
                    <div style={{ 
                      position: 'absolute', 
                      bottom: '24px', 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                      backdropFilter: 'blur(8px)',
                      padding: '8px 20px', 
                      borderRadius: '100px', 
                      fontSize: '11px', 
                      fontWeight: '700', 
                      color: '#475569',
                      border: '1px solid #e2e8f0',
                      letterSpacing: '1.5px',
                      zIndex: 1
                    }}>
                      PROJECT // {prog.id.toUpperCase()}
                    </div>
                  </div>
                </ElemenAnimasiProgram>
              </div>

            </div>
          );
        })}
      </div>

    </main>
  );
}