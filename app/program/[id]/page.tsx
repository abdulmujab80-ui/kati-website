"use client";

import React from "react";
import { useParams } from "next/navigation";

// DATA PAKET UNTUK MASING-MASING 5 PROGRAM KATI
const dataPaketProgram: Record<string, {
  namaProgram: string;
  tagline: string;
  warnaTema: string;
  paket: {
    nama: string;
    harga: string;
    deskripsi: string;
    fitur: string[];
    linkAksi: string;
    terpopuler?: boolean;
  }[];
}> = {
  "pendidikan": {
    namaProgram: "Pendidikan & Sekolah Alam",
    tagline: "Menyemai generasi tangguh, peka ekologis, dan berbasis data lapangan.",
    warnaTema: "#10b981", // Emerald
    paket: [
      {
        nama: "Kelas Alam Terpadu",
        harga: "Berbasis Seleksi",
        deskripsi: "Program reguler akhir pekan untuk pengenalan dasar ekosistem dan karakter lingkungan.",
        fitur: ["4x Sesi Kelas Outdoor/Bulan", "Sertifikat Kehadiran", "Modul Dasar Ekologi KATI", "Pendampingan Mentor"],
        linkAksi: "https://wa.me/628123456789?text=Halo%20KATI,%20saya%20tertarik%20ambil%20Paket%20Kelas%20Alam%20Terpadu"
      },
      {
        nama: "Sekolah Riset",
        harga: "Beasiswa / Umum",
        deskripsi: "Program intensif bagi yang ingin mendalami metodologi penelitian lingkungan langsung di alam.",
        fitur: ["Bimbingan Penyusunan Jurnal", "Akses Lab Alam Tegalsari", "Uji Sampel Lapangan Terpandu", "Sertifikat Riset Resmi KATI"],
        linkAksi: "https://wa.me/628123456789?text=Halo%20KATI,%20saya%20tertarik%20ambil%20Paket%20Sekolah%20Riset",
        terpopuler: true
      },
      {
        nama: "Semester Alam",
        harga: "Konversi SKS",
        deskripsi: "Program imersif tinggal di lokasi binaan (boarding) untuk adaptasi total hulu-hilir.",
        fitur: ["Akomodasi Selama 3 Bulan", "Praktek Lapangan Terintegrasi", "Rekomendasi Kampus Merdeka", "Mentoring Eksklusif Ahli"],
        linkAksi: "https://wa.me/628123456789?text=Halo%20KATI,%20saya%20tertarik%20ambil%20Paket%20Semester%20Alam"
      }
    ]
  },
  "penelitian": {
    namaProgram: "Penelitian & Kolaborasi Riset",
    tagline: "Platform inkubasi data sains terapan demi mendukung kebijakan pelestarian bumi.",
    warnaTema: "#0f766e", // Teal
    paket: [
      {
        nama: "Kolaborasi Mahasiswa",
        harga: "Dana Hibah / Mandiri",
        deskripsi: "Fasilitas bimbingan data riset untuk kebutuhan skripsi, tesis, atau tugas akhir.",
        fitur: ["Akses Data Primer KATI", "Reviewer Ahli Internal", "Penyusunan Publikasi Ilmiah", "Co-Working Space Alam"],
        linkAksi: "https://wa.me/628123456789?text=Saya%20tertarik%20Paket%20Kolaborasi%20Mahasiswa"
      },
      {
        nama: "Kemitraan Dosen & Ahli",
        harga: "Sesuai Kontrak",
        deskripsi: "Kolaborasi riset makro multi-sektor hulu-hilir bersama jajaran akademisi senior.",
        fitur: ["Penyediaan Plot Lahan Uji", "Tim Surveyor Lapangan Lokal", "Laporan Legalitas & Amdal", "Output Jurnal Bereputasi"],
        linkAksi: "https://wa.me/628123456789?text=Saya%20tertarik%20Paket%20Kemitraan%20Dosen",
        terpopuler: true
      },
      {
        nama: "Riset Instansi / Umum",
        harga: "Ajukan Proposal",
        deskripsi: "Layanan pemetaan wilayah khusus untuk instansi swasta maupun pegawai negeri.",
        fitur: ["Pemetaan Geografis (GIS)", "Uji Dampak Sosial Ekonomi", "Rekomendasi Kebijakan Hijau", "Dokumentasi Komprehensif"],
        linkAksi: "https://wa.me/628123456789?text=Saya%20tertarik%20Paket%20Riset%20Instansi"
      }
    ]
  },
  "pengabdian": {
    namaProgram: "Pengabdian & Aksi Relawan",
    tagline: "Menjembatani aksi kepedulian publik lewat program taktis berdampak langsung.",
    warnaTema: "#047857", // Deep Green
    paket: [
      {
        nama: "Volunteer Individu",
        harga: "Gratis / Terbuka",
        deskripsi: "Gabung bersama ratusan pemuda lainnya untuk aksi sosial periodik di desa binaan.",
        fitur: ["E-Sertifikat Volunteer", "Makan & Atribut Selama Aksi", "Pelatihan Soft Skill Sosial", "Jaringan Relawan Nasional"],
        linkAksi: "https://wa.me/628123456789?text=Saya%20tertarik%20Paket%20Volunteer%20Individu"
      },
      {
        nama: "Pemberdayaan Desa",
        harga: "Dana Pengabdian",
        deskripsi: "Program kolaborasi kelompok/institusi untuk membina ketahanan pangan dan sosial.",
        fitur: ["Pembuatan Sistem Kompos", "Edukasi Sanitasi Warga", "Instalasi Air Bersih Sederhana", "Monitoring Dampak 6 Bulan"],
        linkAksi: "https://wa.me/628123456789?text=Saya%20tertarik%20Paket%20Pemberdayaan%20Desa",
        terpopuler: true
      }
    ]
  },
  "ekonomi-hijau": {
    namaProgram: "Pemberdayaan Ekonomi Hijau",
    tagline: "Hilirisasi potensi alam lokal menjadi motor penggerak ekonomi sirkular warga.",
    warnaTema: "#84cc16", // Lime
    paket: [
      {
        nama: "Trip Susur Sungai & Goa",
        harga: "Rp 75.000 / Pax",
        deskripsi: "Paket edukasi wisata petualangan menyusuri ekosistem sungai gua Tegalsari.",
        fitur: ["Safety Gear Lengkap & Guide", "Snack & Wedang Tradisional", "Edukasi Biota Air", "Dokumentasi Foto/Video"],
        linkAksi: "https://wa.me/628123456789?text=Saya%20mau%20booking%20Trip%20Susur%20Sungai"
      },
      {
        nama: "Jelajah Coban Ampe-Ampe",
        harga: "Rp 120.000 / Pax",
        deskripsi: "Ekowisata premium ke area air terjun tersembunyi dengan trekking terpadu.",
        fitur: ["Makan Siang Nasi Kotak Organik", "Trekking Jalur Kopi", "Penanaman 1 Bibit Pohon", "Akses Semua Area Wisata"],
        linkAksi: "https://wa.me/628123456789?text=Saya%20mau%20booking%20Jelajah%20Coban",
        terpopuler: true
      },
      {
        nama: "Pendampingan Branding UMKM",
        harga: "Kemitraan",
        deskripsi: "Program inkubasi kemasan dan pemasaran digital produk olahan khas warga.",
        fitur: ["Redesain Kemasan Produk", "Pendaftaran P-IRT / Halal", "Pelatihan Foto Produk Profesi", "Sistem Kasir Digital"],
        linkAksi: "https://wa.me/628123456789?text=Saya%20tertarik%20Paket%20Pendampingan%20UMKM"
      }
    ]
  },
  "sertifikasi-digitalisasi": {
    namaProgram: "Sertifikasi & Digitalisasi",
    tagline: "Standardisasi kompetensi lingkungan tervalidasi universitas dan birokrasi resmi.",
    warnaTema: "#059669", // Mint
    paket: [
      {
        nama: "Sertifikasi Universitas",
        harga: "Ujian Kompetensi",
        deskripsi: "Uji keahlian pengelolaan lingkungan bersertifikat akademik resmi universitas mitra.",
        fitur: ["Modul Teori Digital", "Ujian Praktik Lapangan", "Gelar Kompetensi Internal", "Verifikasi Keaslian QR-Code"],
        linkAksi: "https://wa.me/628123456789?text=Saya%20tertarik%20Sertifikasi%20Universitas"
      },
      {
        nama: "Sinergi Birokrasi Pemerintah",
        harga: "Kolektif Instansi",
        deskripsi: "Pelatihan standarisasi aparatur desa/daerah dalam mengelola kawasan konservasi hijau.",
        fitur: ["Modul Kebijakan Hijau", "Pemateri Dinas Terkait", "Sertifikat Legalitas Negara", "Pendampingan Pasca-Diklat"],
        linkAksi: "https://wa.me/628123456789?text=Saya%20tertarik%20Sertifikasi%20Birokrasi",
        terpopuler: true
      }
    ]
  }
};

export default function DetailProgramPage() {
  const params = useParams();
  const idProgram = (params?.id as string) || "pendidikan";

  // Ambil data berdasarkan URL id, jika tidak valid arahkan ke fallback 'pendidikan'
  const dataKonten = dataPaketProgram[idProgram] || dataPaketProgram["pendidikan"];

  return (
    <main style={{ 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
      backgroundColor: '#f8fafc', 
      minHeight: '100vh', 
      padding: '60px 20px',
      color: '#0f172a'
    }}>
      
      {/* CSS INTERNAL UNTUK INTERAKSI KARTU PAKET */}
      <style dangerouslySetInnerHTML={{ __html: `
        .tombol-kembali {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #475569;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 40px;
          transition: color 0.2s ease;
        }
        .tombol-kembali:hover { color: ${dataKonten.warnaTema}; }
        
        .grid-paket {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin-top: 50px;
        }
        
        .kartu-paket {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 32px;
          position: relative;
          display: flex;
          flex-direction: column;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .kartu-paket:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.06);
          border-color: ${dataKonten.warnaTema};
        }
        
        .badge-populer {
          position: absolute;
          top: -14px;
          right: 24px;
          background: ${dataKonten.warnaTema};
          color: #ffffff;
          padding: 4px 14px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .tombol-ambil-paket {
          width: 100%;
          border: none;
          padding: 14px;
          font-size: 15px;
          font-weight: 700;
          border-radius: 12px;
          cursor: pointer;
          margin-top: auto;
          transition: all 0.3s ease;
        }
      `}} />

      <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
        
        {/* Tombol Navigasi Kembali */}
        <a href="/program" className="tombol-kembali">
          <span>←</span> Kembali ke Menu Program
        </a>

        {/* HEADER HALAMAN */}
        <div style={{ maxWidth: '700px' }}>
          <span style={{ color: dataKonten.warnaTema, fontWeight: '700', fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            Detail Pilihan Program KATI
          </span>
          <h1 style={{ fontSize: '40px', fontWeight: '800', color: '#022c22', margin: '12px 0 16px 0', letterSpacing: '-1px' }}>
            {dataKonten.namaProgram}
          </h1>
          <p style={{ fontSize: '17px', color: '#475569', lineHeight: '1.6', margin: 0 }}>
            {dataKonten.tagline}
          </p>
        </div>

        {/* GRID KARTU PILIHAN PAKET */}
        <div className="grid-paket">
          {dataKonten.paket.map((pkt, idx) => (
            <div key={idx} className="kartu-paket" style={{ borderColor: pkt.terpopuler ? dataKonten.warnaTema : '#e2e8f0' }}>
              
              {/* Lencana Terpopuler (Jika ada) */}
              {pkt.terpopuler && <div className="badge-populer">Paling Banyak Diikuti</div>}

              {/* Detail Info Paket */}
              <h3 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 8px 0', color: '#0f172a' }}>
                {pkt.nama}
              </h3>
              
              <div style={{ fontSize: '24px', fontWeight: '800', color: dataKonten.warnaTema, marginBottom: '14px' }}>
                {pkt.harga}
              </div>
              
              <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: '1.5', margin: '0 0 24px 0', minHeight: '45px' }}>
                {pkt.deskripsi}
              </p>

              {/* Garis Pembatas */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '20px', marginBottom: '30px' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
                  Benefit Yang Didapat:
                </div>
                
                {/* Daftar Fitur / Keuntungan */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {pkt.fitur.map((ftr, fIdx) => (
                    <div key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#334155' }}>
                      <span style={{ color: dataKonten.warnaTema, fontWeight: 'bold' }}>✓</span>
                      <span>{ftr}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* BUTTON AKSI AMBIL PAKET */}
              <a href={pkt.linkAksi} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block', marginTop: 'auto' }}>
                <button 
                  className="tombol-ambil-paket"
                  style={{ 
                    backgroundColor: pkt.terpopuler ? dataKonten.warnaTema : '#0f172a', 
                    color: '#ffffff'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.opacity = "0.9"}
                  onMouseOut={(e) => e.currentTarget.style.opacity = "1"}
                >
                  Ambil Paket Ini
                </button>
              </a>

            </div>
          ))}
        </div>

      </div>
    </main>
  );
}