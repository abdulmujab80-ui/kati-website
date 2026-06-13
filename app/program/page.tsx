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
      if (arah === "kiri") return "translateX(-50px)";
      if (arah === "kanan") return "translateX(50px)";
      return "translateY(40px)";
    }
    return "translate(0)";
  };

  return (
    <div
      ref={domRef}
      style={{
        opacity: terlihat ? 1 : 0,
        transform: dapatkanTransform(),
        transition: "opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform, opacity",
        width: "100%"
      }}
    >
      {children}
    </div>
  );
}

export default function ProgramPage() {
  const fontStyle = { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' };

  const daftarProgram = [
    {
      id: "kelas-alam",
      emoji: "🌿",
      nama: "Kelas Alam Terpadu",
      tagline: "MENYEMAI GENERASI CINTA BUMI",
      deskripsi: "Sistem pendidikan terbuka yang mempertemukan teori akademis dengan praktik langsung di alam. Peserta diajak mengenali ekosistem lokal, memahami siklus hidup vegetasi, serta mengasah kepekaan ekologis lewat interaksi fisik bersama bumi.",
      warnaTema: "#10b981",
      warnaBg: "#f0fdf4",
      fitur: ["Kurikulum Berbasis Musim", "Praktik Lapangan Langsung", "Sertifikasi Kompetensi Hijau"]
    },
    {
      id: "konservasi",
      emoji: "🌳",
      nama: "Konservasi & Pemulihan Hutan",
      tagline: "AKSI NYATA RESTORASI EKOSISTEM",
      deskripsi: "Gerakan berbasis data dan aksi lapangan untuk melakukan pembibitan mandiri, penanaman pohon endemik yang terancam punah, serta pemulihan ekosistem hutan mikro guna mengembalikan stabilitas tata air dan keanekaragaman hayati.",
      warnaTema: "#047857",
      warnaBg: "#ecfdf5",
      fitur: ["Bank Benih Endemik", "Monitoring Pohon Berbasis IoT", "Adopsi Pohon Remaja"]
    },
    {
      id: "ekowisata",
      emoji: "🎒",
      nama: "Ekowisata Edukatif KATI",
      tagline: "PETUALANGAN BERBAUR KEARIFAN LOKAL",
      deskripsi: "Jelajah kawasan hijau terintegrasi yang dirancang khusus untuk mengedukasi wisatawan. Program ini memadukan keindahan panorama alam Tegalsari dengan petualangan kultural, pengenalan tanaman obat, hingga workshop pelestarian air.",
      warnaTema: "#0f766e",
      warnaBg: "#f0fdfa",
      fitur: ["Pemandu Lokal Tersertifikasi", "Jalur Edukasi Interaktif", "Konsep Wisata Minim Sampah"]
    },
    {
      id: "ekonomi-hijau",
      emoji: "💰",
      nama: "UMKM & Ekonomi Hijau",
      tagline: "KEMANDIRIAN WARGA BERKELANJUTAN",
      deskripsi: "Pemberdayaan ekonomi masyarakat lingkar kampus melalui hilirisasi produk kreatif ramah lingkungan. Kami memfasilitasi pelatihan pembuatan kerajinan serat alam, produksi pupuk organik makro, hingga pemasaran digital komoditas warga.",
      warnaTema: "#0e7490",
      warnaBg: "#ecfeff",
      fitur: ["Pelatihan Olah Limbah", "Akses Pasar Komunitas", "Sistem Sirkular Berbagi Hasil"]
    },
    {
      id: "riset-iklim",
      emoji: "🔬",
      nama: "Riset Iklim Terapan Digital",
      tagline: "SAINS DAN TEKNOLOGI UNTUK BUMI",
      deskripsi: "Platform kolaborasi mutakhir bagi akademisi, peneliti muda, dan praktisi lingkungan. Memanfaatkan teknologi sensor digital untuk memantau kualitas udara, struktur kelembapan tanah, dan menciptakan solusi mitigasi perubahan iklim berskala makro.",
      warnaTema: "#0369a1",
      warnaBg: "#f0f9ff",
      fitur: ["Stasiun Cuaca Mandiri", "Publikasi Jurnal Terbuka", "Kolaborasi Lintas Disiplin Ilmu"]
    }
  ];

  return (
    <main style={{ ...fontStyle, backgroundColor: '#ffffff', minHeight: '100vh', color: '#0f172a', overflowX: 'hidden' }}>
      
      {/* 🟢 STYLE INJEKSI UNTUK HOVER PREMIUM */}
      <style dangerouslySetInnerHTML={{ __html: `
        .tombol-jelajah {
          transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) !important;
        }
        .tombol-jelajah:hover {
          transform: translateX(6px);
          background-color: #0f172a !important;
          color: #ffffff !important;
        }
        .blok-fitur {
          transition: background-color 0.2s ease;
        }
        .blok-fitur:hover {
          background-color: rgba(0, 0, 0, 0.02) !important;
        }
      `}} />

      {/* 🟩 HERO SECTION BANNER */}
      <div style={{ 
        background: 'linear-gradient(135deg, #064e3b, #022c22)', 
        color: 'white', 
        padding: '120px 20px 100px 20px', 
        textAlign: 'center',
        position: 'relative'
      }}>
        {/* Pola Dekoratif Latar Belakang */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05, backgroundImage: 'radial-gradient(#white 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
        
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <span style={{ color: '#34d399', fontWeight: '700', fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase', backgroundColor: 'rgba(52, 211, 153, 0.1)', padding: '8px 18px', borderRadius: '20px' }}>
            Inisiatif Strategis KATI
          </span>
          <h1 style={{ fontSize: '48px', margin: '20px 0 15px 0', fontWeight: '800', letterSpacing: '-1.5px', lineHeight: '1.2' }}>
            Ranah Pergerakan Alam
          </h1>
          <p style={{ fontSize: '18px', color: '#cbd5e1', lineHeight: '1.7', maxWidth: '600px', margin: '0 auto' }}>
            Menjelajahi program-program berdampak tinggi yang kami rancang untuk memulihkan bumi sekaligus memberdayakan masyarakat.
          </p>
        </div>
      </div>

      {/* 🗺️ ALUR PROGRAM BERSELING (Z-PATTERN LAYOUT) */}
      <div style={{ padding: '80px 20px', maxWidth: '1140px', margin: '0 auto' }}>
        {daftarProgram.map((prog, indeks) => {
          const isGenap = indeks % 2 === 0;
          
          return (
            <div 
              key={prog.id}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                gap: '60px', 
                marginBottom: '100px',
                flexWrap: 'wrap-reverse',
                flexDirection: isGenap ? 'row' : 'row-reverse'
              }}
            >
              {/* KOLOM TEKS PENJELASAN */}
              <div style={{ flex: '1 1 500px' }}>
                <ElemenAnimasiProgram arah={isGenap ? "kiri" : "kanan"}>
                  <div>
                    <span style={{ color: prog.warnaTema, fontWeight: '800', fontSize: '12px', letterSpacing: '2px', display: 'block', marginBottom: '10px' }}>
                      {prog.tagline}
                    </span>
                    
                    <h2 style={{ color: '#064e3b', fontSize: '32px', fontWeight: '800', margin: '0 0 20px 0', letterSpacing: '-0.5px', lineHeight: '1.3' }}>
                      {prog.nama}
                    </h2>
                    
                    <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.8', marginBottom: '30px', fontWeight: '400' }}>
                      {prog.deskripsi}
                    </p>

                    {/* Mini List Fitur Program */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '35px' }}>
                      {prog.fitur.map((fitur, fIdx) => (
                        <div key={fIdx} className="blok-fitur" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '6px 0' }}>
                          <span style={{ color: prog.warnaTema, fontSize: '16px', display: 'flex', alignItems: 'center' }}>✓</span>
                          <span style={{ color: '#334155', fontSize: '14.5px', fontWeight: '500' }}>{fitur}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tombol Menuju Sub-Halaman */}
                    <a href={`/program/${prog.id}`} style={{ textDecoration: 'none' }}>
                      <button className="tombol-jelajah" style={{ 
                        backgroundColor: '#f1f5f9', 
                        color: '#0f172a', 
                        border: '1px solid #e2e8f0', 
                        padding: '14px 28px', 
                        fontSize: '14px', 
                        fontWeight: '700', 
                        borderRadius: '12px', 
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}>
                        Pelajari Silengkapnya
                      </button>
                    </a>
                  </div>
                </ElemenAnimasiProgram>
              </div>

              {/* KOLOM VISUAL GRAFIS (SISI SEBELAHNYA) */}
              <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
                <ElemenAnimasiProgram arah={isGenap ? "kanan" : "kiri"}>
                  <div style={{ 
                    width: '100%',
                    maxWidth: '420px',
                    height: '320px', 
                    backgroundColor: prog.warnaBg, 
                    borderRadius: '32px', 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center', 
                    justifyContent: 'center',
                    position: 'relative',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 20px 40px -15px rgba(0,0,0,0.02)'
                  }}>
                    {/* Efek Lingkaran Pemanis Belakang */}
                    <div style={{ position: 'absolute', width: '180px', height: '180px', borderRadius: '50%', backgroundColor: 'white', opacity: 0.6, zIndex: 0 }}></div>
                    
                    {/* Emoji Raksasa */}
                    <div style={{ fontSize: '96px', zIndex: 1, filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.05))' }}>
                      {prog.emoji}
                    </div>

                    {/* Kode Unik Badge */}
                    <div style={{ 
                      position: 'absolute', 
                      bottom: '25px', 
                      backgroundColor: 'white', 
                      padding: '8px 16px', 
                      borderRadius: '30px', 
                      fontSize: '12px', 
                      fontWeight: '700', 
                      color: '#475569',
                      border: '1px solid #e2e8f0',
                      letterSpacing: '1px'
                    }}>
                      KATI // {prog.id.toUpperCase()}
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