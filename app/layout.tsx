"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [menuTerbuka, setMenuTerbuka] = useState(false);
  const fontGlobal = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

  const daftarMenu = [
    { nama: "Beranda", url: "/" },
    { nama: "Program", url: "/program" },
    { nama: "Berita", url: "/berita" },
    { nama: "Artikel", url: "/artikel" },
    { nama: "Repository", url: "/repository" },
    { nama: "Volunteer", url: "/volunteer" },
    { nama: "Mitra", url: "/mitra" },
  ];

  return (
    <html lang="id" style={{ scrollBehavior: 'smooth' }}>
      <head>
        {/* ⚡ KUNCI UTAMA: Biar seluruh tampilan website otomatis mengecil & pas di HP */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        
        {/* 🔍 STRUKTUR DATA GOOGLE: Mengubah nama kampusalam.com menjadi Nama Resmi di Google Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Kampus Alam Tegalsari Indonesia (KATI)",
              "url": "https://kampusalam.com"
            })
          }}
        />
      </head>
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

        {/* 🟢 STYLE INJEKSI PREMIUM (Responsive & Hamburger Menu Effect) */}
        <style dangerouslySetInnerHTML={{
          __html: `
          .konten-halaman {
            animation: efekMulai 0.4s ease-out forwards;
          }
          @keyframes efekMulai {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .tautan-nav {
            font-size: 15px;
            font-weight: 500;
            text-decoration: none;
            padding: 8px 16px;
            border-radius: 20px;
            transition: all 0.25s ease;
            white-space: nowrap;
          }
          .tautan-nav:hover {
            color: #34d399 !important;
            background-color: rgba(52, 211, 153, 0.05);
          }
          
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

          /* RESPONSIVE BREAKPOINT (Pengaturan Khusus HP) */
          @media (max-width: 900px) {
            .box-menu-tengah {
              display: ${menuTerbuka ? "flex" : "none"} !important;
              flex-direction: column;
              position: absolute;
              top: 100%;
              left: 0;
              width: 100%;
              background-color: #053e2f;
              padding: 20px 0;
              box-shadow: 0 10px 20px rgba(0,0,0,0.15);
              border-bottom: 2px solid #10b981;
              gap: 15px !important;
            }
            .tautan-nav {
              width: 80%;
              text-align: center;
              padding: 12px 0;
            }
            .box-donasi-kanan {
              display: ${menuTerbuka ? "flex" : "none"} !important;
              position: absolute;
              top: calc(100% + ${daftarMenu.length * 52 + 20}px);
              left: 0;
              width: 100%;
              background-color: #053e2f;
              justify-content: center !important;
              padding-bottom: 20px;
            }
            .tombol-hamburger {
              display: flex !important;
            }
          }

          .grid-footer {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 40px;
            margin-bottom: 50px;
          }
        `}} />

        {/* 🧭 NAVIGATION BAR RESPONSIF */}
        <nav style={{
          backgroundColor: '#053e2f',
          color: 'white',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)'
        }}>

          {/* KIRI: Sektor Logo */}
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', zIndex: 1001 }}>
            <img
              src="/logo-kati.png"
              alt="Logo Kampus Alam"
              style={{ height: '38px', width: 'auto', objectFit: 'contain' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
              <span style={{ fontWeight: '800', fontSize: '13px', letterSpacing: '0.8px', color: '#ffffff' }}>
                KAMPUS ALAM
              </span>
              <span style={{ fontWeight: '600', fontSize: '9px', letterSpacing: '1.6px', color: '#34d399' }}>
                TEGALSARI INDONESIA
              </span>
            </div>
          </a>

          {/* TOMBOL HAMBURGER */}
          <button 
            className="tombol-hamburger"
            onClick={() => setMenuTerbuka(!menuTerbuka)}
            style={{
              display: 'none',
              flexDirection: 'column',
              justifyContent: 'space-around',
              width: '26px',
              height: '20px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              zIndex: 1001
            }}
          >
            <div style={{ width: '26px', height: '3px', backgroundColor: 'white', borderRadius: '3px', transition: '0.3s' }} />
            <div style={{ width: '26px', height: '3px', backgroundColor: 'white', borderRadius: '3px', transition: '0.3s' }} />
            <div style={{ width: '26px', height: '3px', backgroundColor: 'white', borderRadius: '3px', transition: '0.3s' }} />
          </button>

          {/* TENGAH: Menu Navigasi */}
          <div className="box-menu-tengah" style={{ display: 'flex', gap: '4px', justifyContent: 'center', alignItems: 'center' }}>
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
                  }}
                >
                  {menu.nama}
                </a>
              );
            })}
          </div>

          {/* KANAN: Tombol Donasi */}
          <div className="box-donasi-kanan" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <a href="/donasi" style={{ textDecoration: 'none' }}>
              <button className="btn-donasi-nav">Donasi 💚</button>
            </a>
          </div>

        </nav>

        {/* 📋 ISI HALAMAN UTAMA */}
        <div className="konten-halaman" style={{ flex: '1 0 auto', width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
          {children}
        </div>

        {/* 🧱 FOOTER */}
        <footer style={{
          backgroundColor: '#090d16',
          color: '#94a3b8',
          padding: '60px 24px 35px 24px',
          borderTop: '5px solid #10b981',
          overflow: 'hidden'
        }}>
          <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
            <div className="grid-footer">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <img src="/logo-kati.png" alt="Logo KATI" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                  <span style={{ color: 'white', fontWeight: '800', fontSize: '16px' }}>KATI</span>
                </div>
                <p style={{ fontSize: '13.5px', lineHeight: '1.7', color: '#64748b' }}>
                  Menjadi pusat pendidikan konservasi berbasis alam, budaya, dan teknologi yang melahirkan generasi berkesadaran ekologis, berakar pada kearifan budaya, and berdaya cipta dalam membangun peradaban berkelanjutan.
                </p>
              </div>

              <div>
                <h4 style={{ color: '#ffffff', fontSize: '13px', fontWeight: '700', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>Akses Navigasi</h4>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <a href="/program" className="tautan-footer">🌱 Program Utama</a>
                  <a href="/berita" className="tautan-footer">📰 Kabar Warta</a>
                  <a href="/volunteer" className="tautan-footer">🤝 Gabung Relawan</a>
                  <a href="/donasi" className="tautan-footer">💸 Salurkan Donasi</a>
                </div>
              </div>

              <div>
                <h4 style={{ color: '#ffffff', fontSize: '13px', fontWeight: '700', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>Sekretariat Pusat</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
                  <p style={{ margin: 0, color: '#cbd5e1' }}>📍 Dusun Umbulrejo RT 14 RW 05, Desa Sidodadi, kecamatan Gedangan, Kabupaten Malang, Jawa Timur</p>
                  <p style={{ margin: 0, color: '#cbd5e1' }}>📞 +62 813-3686-7676 (Faradis)</p>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #1e293b', paddingTop: '20px', textAlign: 'center', fontSize: '12px', color: '#475569' }}>
              © {new Date().getFullYear()} Kampus Alam Tegalsari Indonesia. Hak Cipta Dilindungi.
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}