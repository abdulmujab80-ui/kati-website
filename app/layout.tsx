"use client";

import "./globals.css";
import Image from "next/image"; 
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const fontGlobal = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

  // Daftar Menu Navigasi Utama
  const daftarMenu = [
    { nama: "Beranda", url: "/" },
    { nama: "Program", url: "/program" },
    { nama: "Berita", url: "/berita" },
    { nama: "Artikel", url: "/artikel" },
    { nama: "Volunteer", url: "/volunteer" },
    { nama: "Mitra", url: "/mitra" },
  ];

  return (
    <html lang="id" style={{ scrollBehavior: 'smooth' }}>
      <body style={{ 
        margin: 0, 
        padding: 0, 
        fontFamily: fontGlobal, 
        backgroundColor: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        overflowX: 'hidden',
        WebkitFontSmoothing: 'antialiased'
      }}>
        
        {/* 🟢 STYLE INJEKSI PREMIUM (Hover Navigasi, Footer, & Animasi Transisi Halaman) */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* Efek Animasi Transisi Fade-In Saat Pindah Halaman */
          .konten-halaman {
            animation: efekMulai 0.4s ease-out forwards;
          }
          @keyframes efekMulai {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
          }

          /* Style Navigasi Menu Atas */
          .tautan-nav {
            font-size: 15px;
            font-weight: 500;
            text-decoration: none;
            padding: 8px 16px;
            border-radius: 20px;
            position: relative;
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .tautan-nav:hover {
            color: #34d399 !important;
            background-color: rgba(52, 211, 153, 0.05);
          }
          
          /* Efek Tombol Donasi Premium */
          .btn-donasi-nav {
            background-color: #10b981;
            color: white;
            border: none;
            padding: 10px 24px;
            font-size: 14px;
            font-weight: 700;
            border-radius: 20px;
            cursor: pointer;
            box-shadow: 0 4px 14px rgba(16, 185, 129, 0.25);
            transition: all 0.2s ease;
          }
          .btn-donasi-nav:hover {
            background-color: #059669;
            transform: translateY(-1.5px);
            box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
          }
          .btn-donasi-nav:active {
            transform: translateY(1px);
          }

          /* Tautan Link Footer Modern */
          .tautan-footer {
            color: #94a3b8;
            text-decoration: none;
            transition: all 0.25s ease;
            font-size: 14px;
            display: inline-block;
            margin-bottom: 12px;
          }
          .tautan-footer:hover {
            color: #34d399;
            transform: translateX(4px);
          }

          /* Layout Grid Footer Responsif */
          .grid-footer {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 40px;
            margin-bottom: 50px;
            text-align: left;
          }
        `}} />
        
        {/* 🧭 NAVIGATION BAR PREMIUM (Sticky & Semi-Transparan Luxury) */}
        <nav style={{ 
          backgroundColor: '#053e2f', 
          color: 'white', 
          padding: '12px 40px', 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between', 
          boxShadow: '0 4px 25px rgba(0,0,0,0.08)',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)'
        }}>
          
          {/* 1. KIRI: Sektor Identitas Logo */}
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1 0 240px', textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', filter: 'drop-shadow(0 2px 6px rgba(16,185,129,0.2))' }}>
              <Image 
                src="/Logo Kati.png" 
                alt="Logo Kampus Alam" 
                width={38}  
                height={38} 
                style={{ objectFit: 'contain' }} 
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
              <span style={{ fontWeight: '800', fontSize: '13.5px', letterSpacing: '0.8px', color: '#ffffff' }}>
                KAMPUS ALAM
              </span>
              <span style={{ fontWeight: '600', fontSize: '10px', letterSpacing: '1.6px', color: '#34d399' }}>
                TEGALSARI INDONESIA
              </span>
            </div>
          </a>
          
          {/* 2. TENGAH: Menu Navigasi dengan Indikator Kapsul Menyala */}
          <div style={{ 
            display: 'flex', 
            gap: '8px', 
            justifyContent: 'center', 
            alignItems: 'center',
            flex: '2 0 auto'
          }}>
            {daftarMenu.map((menu) => {
              const apakahAktif = pathname === menu.url;
              return (
                <a 
                  key={menu.url} 
                  href={menu.url} 
                  className="tautan-nav"
                  style={{
                    color: apakahAktif ? '#ffffff' : '#cbd5e1',
                    fontWeight: apakahAktif ? '700' : '500',
                    backgroundColor: apakahAktif ? '#10b981' : 'transparent',
                    boxShadow: apakahAktif ? '0 4px 12px rgba(16, 185, 129, 0.25)' : 'none',
                  }}
                >
                  {menu.nama}
                </a>
              );
            })}
          </div>

          {/* 3. KANAN: Akses Aksi Donasi */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', flex: '1 0 120px' }}>
            <a href="/donasi" style={{ textDecoration: 'none' }}>
              <button className="btn-donasi-nav">
                Donasi 💚
              </button>
            </a>
          </div>

        </nav>

        {/* 📋 ISI HALAMAN UTAMA (Dengan Tambahan Animasi Masuk Halus) */}
        <div className="konten-halaman" style={{ flex: '1 0 auto' }}>
          {children}
        </div>

        {/* 🧱 FOOTER GLOBAL (Tampilan Super Mewah, Gelap, & Profesional) */}
        <footer style={{ 
          backgroundColor: '#090d16', 
          color: '#94a3b8', 
          padding: '80px 40px 35px 40px', 
          borderTop: '5px solid #10b981',
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Efek Gradasi Latar Belakang Tipis */}
          <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(16,185,129,0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
            
            <div className="grid-footer">
              
              {/* Kolom 1: Profil Singkat Ringkas */}
              <div style={{ paddingRight: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <Image 
                    src="/Logo Kati.png" 
                    alt="Logo Kampus Alam" 
                    width={34}  
                    height={34} 
                  />
                  <span style={{ color: 'white', fontWeight: '800', fontSize: '17px', letterSpacing: '0.5px' }}>
                    KATI INDONESIA
                  </span>
                </div>
                <p style={{ fontSize: '14px', lineHeight: '1.8', color: '#64748b', margin: 0 }}>
                  Kampus Alam Tegalsari Indonesia membangun pusat edukasi terpadu, gerakan restorasi nyata, serta kolaborasi hijau multi-sektor demi masa depan bumi yang berkelanjutan.
                </p>
              </div>

              {/* Kolom 2: Tautan Pintas Terstruktur */}
              <div>
                <h4 style={{ color: '#ffffff', fontSize: '14px', fontWeight: '700', margin: '0 0 20px 0', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                  Akses Navigasi
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <a href="/program" className="tautan-footer">🌱 Program Utama</a>
                  <a href="/berita" className="tautan-footer">📰 Kabar Warta</a>
                  <a href="/volunteer" className="tautan-footer">🤝 Gabung Relawan</a>
                  <a href="/donasi" className="tautan-footer">💸 Salurkan Donasi</a>
                </div>
              </div>

              {/* Kolom 3: Pusat Informasi Kontak Resmi */}
              <div>
                <h4 style={{ color: '#ffffff', fontSize: '14px', fontWeight: '700', margin: '0 0 20px 0', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                  Sekretariat Pusat
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', lineHeight: '1.6' }}>
                  <p style={{ margin: 0, color: '#cbd5e1' }}>
                    📍 Kawasan Pusat Konservasi Hijau Tegalsari, Malang, Jawa Timur
                  </p>
                  <p style={{ margin: 0, color: '#cbd5e1' }}>
                    📞 Hubungi: +62 858-5072-9957
                  </p>
                  <p style={{ margin: 0 }}>
                    ✉️ <a href="mailto:info@kampusalamtegalsari.id" style={{ color: '#34d399', textDecoration: 'none', fontWeight: '500' }}>info@kampusalamtegalsari.id</a>
                  </p>
                </div>
              </div>

            </div>

            {/* Hak Cipta & Garis Pembatas Bawah */}
            <div style={{ 
              borderTop: '1px solid #1e293b', 
              paddingTop: '28px', 
              textAlign: 'center', 
              fontSize: '13px', 
              color: '#475569',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '15px'
            }}>
              <div>
                © {new Date().getFullYear()} <span style={{ color: '#cbd5e1' }}>Kampus Alam Tegalsari Indonesia</span>. Hak Cipta Dilindungi.
              </div>
              <div style={{ fontSize: '12px', color: '#334155', letterSpacing: '0.5px' }}>
                Dirancang dengan kepedulian tinggi terhadap kelestarian ekosistem.
              </div>
            </div>

          </div>
        </footer>

      </body>
    </html>
  );
}