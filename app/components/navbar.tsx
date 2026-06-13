"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const daftarMenu = [
    { nama: "Beranda", url: "/" },
    { nama: "Program", url: "/program" },
    { nama: "Berita", url: "/berita" },
    { nama: "Artikel", url: "/artikel" },
    { nama: "Volunteer", url: "/volunteer" },
    { nama: "Mitra", url: "/mitra" },
  ];

  return (
    <>
      {/* STYLE INJEKSI UNTUK HOVER MENU NAVIGASI */}
      <style dangerouslySetInnerHTML={{ __html: `
        .tautan-nav {
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          padding: 8px 12px;
          border-radius: 8px;
          position: relative;
          transition: all 0.25s ease;
        }
        .tautan-nav::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background-color: #34d399;
          transition: all 0.25s ease;
          transform: translateX(-50%);
        }
        .tautan-nav:hover {
          color: #34d399 !important;
        }
        .tautan-nav:hover::after {
          width: 70%;
        }
        
        .btn-donasi-nav {
          background-color: #10b981;
          color: white;
          border: none;
          padding: 10px 22px;
          font-size: 14px;
          font-weight: 700;
          border-radius: 10px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
          transition: all 0.2s ease;
        }
        .btn-donasi-nav:hover {
          background-color: #059669;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(16, 185, 129, 0.35);
        }
        .btn-donasi-nav:active {
          transform: translateY(1px);
        }
      `}} />

      {/* 🧭 NAVIGATION BAR PREMIUM */}
      <nav style={{ 
        backgroundColor: '#064e3b', 
        color: 'white', 
        padding: '14px 40px', 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between', 
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        borderBottom: '1px solid rgba(255,255,255,0.06)'
      }}>
        
        {/* KIRI: Logo */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1 0 240px', textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Image 
              src="/Logo Kati.png" 
              alt="Logo Kampus Alam" 
              width={40}  
              height={40} 
              style={{ objectFit: 'contain' }} 
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
            <span style={{ fontWeight: '800', fontSize: '14px', letterSpacing: '0.5px', color: '#ffffff' }}>
              KAMPUS ALAM
            </span>
            <span style={{ fontWeight: '600', fontSize: '10px', letterSpacing: '1.5px', color: '#34d399' }}>
              TEGALSARI INDONESIA
            </span>
          </div>
        </a>
        
        {/* TENGAH: Menu Utama */}
        <div style={{ 
          display: 'flex', 
          gap: '15px', 
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
                  color: apakahAktif ? '#34d399' : '#cbd5e1',
                  fontWeight: apakahAktif ? '700' : '500',
                  backgroundColor: apakahAktif ? 'rgba(52, 211, 153, 0.08)' : 'transparent',
                }}
              >
                {menu.nama}
                {apakahAktif && (
                  <span style={{
                    position: 'absolute',
                    bottom: '4px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '4px',
                    height: '4px',
                    backgroundColor: '#34d399',
                    borderRadius: '50%'
                  }} />
                )}
              </a>
            );
          })}
        </div>

        {/* KANAN: Tombol Donasi */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', flex: '1 0 120px' }}>
          <a href="/donasi" style={{ textDecoration: 'none' }}>
            <button className="btn-donasi-nav">
              Donasi 💚
            </button>
          </a>
        </div>
      </nav>
    </>
  );
}