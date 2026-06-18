"use client";

import React, { useState, useEffect, useRef } from "react";

interface AnimasiProps {
  children: React.ReactNode;
}

// Komponen Animasi Masuk Halus saat Scroll
function ElemenAnimasiProgram({ children }: AnimasiProps) {
  const [terlihat, setTerlihat] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setTerlihat(true);
      });
    }, { threshold: 0.05 });

    if (domRef.current) observer.observe(domRef.current);
    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      style={{
        opacity: terlihat ? 1 : 0,
        transform: terlihat ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}

export default function ProgramPage() {
  const fontStyle = { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' };

  // DATA PROGRAM UTAMA (Emoji dihapus, diganti dengan property 'gambar' untuk path foto sampul)
  const daftarProgram = [
    {
      id: "pendidikan",
      nama: "Pendidikan",
      gambar: "/sungai.jpg", // Ganti dengan nama file foto asli Anda
      tagline: "Fokus Pengembangan Karakter & Kepekaan Ekologis",
      deskripsi: "Sistem pendidikan terbuka terpadu yang mempertemukan langsung teori akademis dengan praktik nyata langsung di alam terbuka.",
      fitur: ["Sekolah Riset Berkelanjutan", "Kelas Alam Terpadu", "Semester Alam Akseleratif"],
      warnaTema: "#10b981", // Emerald KATI
    },
    {
      id: "penelitian",
      nama: "Penelitian",
      gambar: "/images/sampul-penelitian.jpg", // Ganti dengan nama file foto asli Anda
      tagline: "Sains Terapan & Pengumpulan Data Lapangan",
      deskripsi: "Platform kolaborasi ilmiah inklusif guna memfasilitasi riset lingkungan untuk melahirkan data akurat demi aksi pemulihan bumi.",
      fitur: ["Kolaborasi Mahasiswa & Dosen", "Riset Pegawai Negeri / Instansi", "Akses Data Terbuka untuk Umum"],
      warnaTema: "#0f766e", // Teal KATI
    },
    {
      id: "pengabdian",
      nama: "Pengabdian",
      gambar: "/images/sampul-pengabdian.jpg", // Ganti dengan nama file foto asli Anda
      tagline: "Aksi Nyata Taktis & Gerakan Kepedulian Warga",
      deskripsi: "Wadah pergerakan yang menjembatani kepedulian masyarakat dan relawan untuk turun langsung membantu problematika di lapangan.",
      fitur: ["Volunteer Program Terbuka", "Project Pemberdayaan Wilayah", "Aksi Sosial Tanggap Ekosistem"],
      warnaTema: "#047857", // Deep Green KATI
    },
    {
      id: "ekonomi-hijau",
      nama: "Ekonomi Hijau",
      gambar: "/images/sampul-ekonomi.jpg", // Ganti dengan nama file foto asli Anda
      tagline: "Kemandirian Warga & Hilirisasi Produk Kreatif",
      deskripsi: "Optimalisasi potensi alam lokal melalui manajemen branding komoditas warga lingkar daerah binaan agar berdampak ekonomi sirkular.",
      fitur: ["Ekowisata Susur Sungai & Goa", "Pengembangan Coban Ampe-Ampe", "Strategi Komoditas Produk Lokal"],
      warnaTema: "#84cc16", // Lime Green KATI
    },
    {
      id: "sertifikasi-digitalisasi",
      nama: "Sertifikasi dan Digitalisasi",
      gambar: "/images/sampul-sertifikasi.jpg", // Ganti dengan nama file foto asli Anda
      tagline: "Validasi Standarisasi & Ekspansi Dampak Modern",
      deskripsi: "Inisiasi program kerja kolaboratif dengan legalitas tinggi demi menciptakan ekosistem pergerakan lingkungan yang tervalidasi.",
      fitur: ["Menggandeng Universitas Ternama", "Sinergi Birokrasi Pemerintah", "Dampak Program Bersertifikasi"],
      warnaTema: "#059669", // Mint KATI
    }
  ];

  return (
    <main style={{ ...fontStyle, backgroundColor: '#f8fafc', minHeight: '100vh', color: '#0f172a', paddingBottom: '120px' }}>
      
      {/* STYLE INJEKSI UNTUK KARTU & FOTO (MENIRU REFEERENSI IMAGE_FEE3BA.JPG) */}
      <style dangerouslySetInnerHTML={{ __html: `
        .kartu-program {
          background-color: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          border: 1px solid #e2e8f0;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .kartu-program:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.03);
        }
        /* Efek Zoom-In Halus Pada Foto Sampul Saat Hover */
        .kartu-program:hover .foto-sampul {
          transform: scale(1.06);
        }
        .grid-program {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 32px;
          maxWidth: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        @media (max-width: 768px) {
          .hero-title { font-size: 36px !important; }
          .grid-program { grid-template-columns: 1fr !important; }
        }
      `}} />

      {/* 🟩 HERO HEADER */}
      <div style={{ background: 'linear-gradient(145deg, #022c22, #064e3b)', color: 'white', padding: '100px 20px 140px 20px', textAlign: 'center', position: 'relative', marginBottom: '60px' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05, backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}></div>
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <span style={{ color: '#34d399', fontWeight: '700', fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', backgroundColor: 'rgba(52, 211, 153, 0.1)', padding: '8px 16px', borderRadius: '100px', border: '1px solid rgba(52, 211, 153, 0.15)' }}>
            Aksi Pemulihan Bumi
          </span>
          <h1 className="hero-title" style={{ fontSize: '48px', margin: '20px 0 16px 0', fontWeight: '800', letterSpacing: '-1px' }}>
            Program KATI
          </h1>
          <p style={{ fontSize: '18px', color: '#94a3b8', maxWidth: '600px', margin: '0 auto', fontWeight: '400', lineHeight: '1.6' }}>
            Ambil bagian sebagai mitra kolaborasi untuk memperluas dampak, atau bergabung sebagai penerima manfaat program edukasi dan pemberdayaan yang dirancang khusus untuk kebutuhan Anda.
          </p>
        </div>
      </div>

      {/* 🗺️ GRID KARTU DENGAN FOTO SAMPUL PENUH */}
      <div className="grid-program">
        {daftarProgram.map((prog) => (
          <ElemenAnimasiProgram key={prog.id}>
            <a href={`/program/${prog.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
              <div className="kartu-program">
                
                {/* 📸 1. BAGIAN ATAS: Full Image Cover Slot (Sama seperti struktur image_fee3ba.jpg) */}
                <div style={{ 
                  height: '220px', 
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundColor: '#f1f5f9' // Latar belakang abu-abu tipis saat foto loading
                }}>
                  <img 
                    src={prog.gambar} 
                    alt={`Sampul Program ${prog.nama}`}
                    className="foto-sampul"
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover'
                    }}
                    // Jika file foto belum Anda masukkan ke folder public, 
                    // fungsi di bawah ini akan otomatis mengamankan tampilan agar tidak pecah/blank (Fallback Image)
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = `https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600`;
                    }}
                  />
                </div>

                {/* 📄 2. BAGIAN BAWAH: Konten Area Informasi */}
                <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  
                  {/* Judul Program dengan warna Hijau KATI (Tegas) */}
                  <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#022c22', margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
                    {prog.nama}
                  </h2>
                  
                  {/* Tagline / Subtitle Deskripsi */}
                  <div style={{ color: '#64748b', fontSize: '13px', fontWeight: '500', marginBottom: '18px', lineHeight: '1.4' }}>
                    {prog.tagline}
                  </div>
                  
                  {/* Deskripsi Paragraf Pendek */}
                  <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6', margin: '0 0 28px 0', fontWeight: '400' }}>
                    {prog.deskripsi}
                  </p>
                  
                  {/* Garis batas halus pemisah menuju baris checkmark */}
                  <div style={{ borderTop: '1px solid #f1f5f9', marginTop: 'auto', paddingTop: '20px' }}>
                    
                    {/* Baris Checkmark List Fitur Program */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {prog.fitur.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          {/* Centang warna disesuaikan otomatis mengikuti warna khas sub-tema KATI */}
                          <span style={{ color: prog.warnaTema, fontWeight: 'bold', fontSize: '14px', marginTop: '1px' }}>
                            ✓
                          </span>
                          <span style={{ color: '#334155', fontSize: '13px', fontWeight: '500' }}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                  </div>

                </div>

              </div>
            </a>
          </ElemenAnimasiProgram>
        ))}
      </div>

    </main>
  );
}