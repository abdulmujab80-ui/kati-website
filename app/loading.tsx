"use client";

import Image from "next/image";

export default function Loading() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(248, 250, 252, 0.85)', /* Warna latar belakang lembut dengan efek transparan */
      backdropFilter: 'blur(8px)', /* Efek blur kaca premium */
      WebkitBackdropFilter: 'blur(8px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999, /* Memastikan loading berada di lapisan paling atas */
      pointerEvents: 'all' /* Mencegah user klik elemen lain saat loading */
    }}>
      
      {/* 🟢 STYLE ANIMASI BERPUTAR & DENYUT HALUS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes putarLogo {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes denyutTeks {
          0%, 100% { opacity: 0.6; transform: scale(0.98); }
          50% { opacity: 1; transform: scale(1); }
        }
        .logo-loading-animasi {
          animation: putarLogo 2.5s linear infinite;
        }
        .teks-loading-animasi {
          animation: denyutTeks 1.8s ease-in-out infinite;
        }
      `}} />

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '20px',
        padding: '30px',
        borderRadius: '24px',
        backgroundColor: '#ffffff',
        boxShadow: '0 10px 30px rgba(5, 62, 47, 0.08)',
        border: '1px solid rgba(16, 185, 129, 0.1)'
      }}>
        
        {/* Kontainer Logo dengan Spinner Lingkaran Hijau di Luarnya */}
        <div style={{ position: 'relative', width: '80px', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          
          {/* Efek Spinner Lingkaran Hijau */}
          <div className="logo-loading-animasi" style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '3px solid rgba(16, 185, 129, 0.1)',
            borderTop: '3px solid #10b981',
            borderRight: '3px solid #34d399'
          }} />
          
          {/* Logo KATI di Tengah Spinner */}
          <Image 
            src="/Logo Kati.png" 
            alt="Logo Kampus Alam" 
            width={50}  
            height={50} 
            priority
            style={{ objectFit: 'contain' }}
          />
        </div>

        {/* Teks Indikator Loading */}
        <div className="teks-loading-animasi" style={{ textAlign: 'center' }}>
          <h4 style={{ 
            margin: '0 0 4px 0', 
            color: '#053e2f', 
            fontFamily: 'sans-serif', 
            fontWeight: '800', 
            fontSize: '15px',
            letterSpacing: '0.5px'
          }}>
            Memuat Data...
          </h4>
          <p style={{ 
            margin: 0, 
            color: '#64748b', 
            fontFamily: 'sans-serif', 
            fontWeight: '500', 
            fontSize: '12px' 
          }}>
            Menyelaraskan Ekosistem KATI
          </p>
        </div>

      </div>
    </div>
  );
}