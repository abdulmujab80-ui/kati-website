"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";

// Database Anggota Lengkap dengan Foto, Sertifikat, dan Detail Profesional
const DATABASE_VOLUNTEER = {
  "jagat-anjasmara": {
    namaTim: "Tim Ekspedisi Jagat Anjasmara (2023)",
    deskripsi: "Berfokus pada pemetaan ekosistem dataran tinggi dan identifikasi debit mata air pegunungan di lereng selatan Jawa Timur.",
    warnaTema: "#064e3b",
    anggota: [
      { 
        nama: "Abdul Mujab", 
        peran: "Koordinator Utama", 
        asal: "Malang", 
        bergabung: "2023", 
        email: "abdul.mujab@kati.or.id", 
        status: "Alumni",
        foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
        linkSertifikat: "https://drive.google.com/file/d/1g_ilo0Unz1j4NTIvTzjpXdtOYl3H1Gsj/view?usp=sharing" 
      },
      { 
        nama: "Rahmat Hidayat", 
        peran: "Surveyor Botani", 
        asal: "Surabaya", 
        bergabung: "2023", 
        email: "rahmat.h@kati.or.id", 
        status: "Alumni",
        foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
        linkSertifikat: "#" 
      },
      { 
        nama: "Siti Rahma", 
        peran: "GIS & Mapping Specialist", 
        asal: "Batu", 
        bergabung: "2023", 
        email: "siti.rahma@kati.or.id", 
        status: "Alumni",
        foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
        linkSertifikat: "#" 
      }
    ]
  },
  "arunika-bumi": {
    namaTim: "Tim Ekspedisi Arunika Bumi (2025)",
    deskripsi: "Bergerak di ranah pemberdayaan masyarakat pinggiran hutan, melakukan edukasi pengelolaan limbah mandiri.",
    warnaTema: "#064e3b",
    anggota: [
      { 
        nama: "Ahmad Fauzi", 
        peran: "Fasilitator Komunitas", 
        asal: "Jombang", 
        bergabung: "2025", 
        email: "fauzi.ahmad@kati.or.id", 
        status: "Alumni",
        foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
        linkSertifikat: "#" 
      },
      { 
        nama: "Dewi Lestari", 
        peran: "Edukator Anak", 
        asal: "Kediri", 
        bergabung: "2025", 
        email: "dewi.les@kati.or.id", 
        status: "Alumni",
        foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=256&q=80",
        linkSertifikat: "#" 
      }
    ]
  },
  "tirta-amarta": {
    namaTim: "Tim Ekspedisi Tirta Amarta (2026)",
    deskripsi: "Menjalankan misi pembersihan sungai hulu, reboisasi bantaran parit, serta uji laboratorium kelayakan air konsumsi warga.",
    warnaTema: "#064e3b",
    anggota: [
      { 
        nama: "Tsabita Raghdah", 
        peran: "Pendidikan dan Inovasi", 
        asal: "Surabaya", 
        bergabung: "2026", 
        email: "tsabitaraghdah72@gmail.com", 
        status: "Aktif",
        foto: "/galeri/tsabita_ta.jpeg", // 👈 PERBAIKAN: Ditambahkan tanda garis miring '/' di depannya
        linkSertifikat: "#" 
      },
      { 
        nama: "Pinka Alissa El Indra", 
        peran: "Kreatif dan Komunikasi", 
        asal: "Banyuwangi", 
        bergabung: "2026", 
        email: "240502110196@student.uin-malang.ac.id", 
        status: "Aktif",
        foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=256&q=80",
        linkSertifikat: "#" 
      },
      { 
        nama: "M RAFLI AUDREMI", 
        peran: "Humas dan Kemitraan", 
        asal: "Malang", 
        bergabung: "2026", 
        email: "mrafliaudremi@gmail.com", 
        status: "Aktif",
        foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
        linkSertifikat: "#" 
      },
      { 
        nama: "Mochammad Farrel Gavra Utama", 
        peran: "Humas dan Kemitraan", 
        asal: "Malang", 
        bergabung: "2026", 
        email: "akunkobongnih@gmail.com", 
        status: "Aktif",
        foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
        linkSertifikat: "#" 
      },
      { 
        nama: "Alfina Nurshinta Dewi", 
        peran: "Pendidikan dan Inovasi", 
        asal: "Malang", 
        bergabung: "2026", 
        email: "pinaa.dewi@gmail.com", 
        status: "Aktif",
        foto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
        linkSertifikat: "#" 
      },
      { 
        nama: "Aisyah Itsnaini Nur Hasanah", 
        peran: "Kreatif dan Komunikasi", 
        asal: "Malang", 
        bergabung: "2026", 
        email: "aisyahitsnaini1949@gmail.com", 
        status: "Aktif",
        foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
        linkSertifikat: "#" 
      },
      { 
        nama: "Wardatul Fitriah", 
        peran: "Pendidikan dan Inovasi", 
        asal: "Malang", 
        bergabung: "2026", 
        email: "wardafitriah5@gmail.com", 
        status: "Aktif",
        foto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80",
        linkSertifikat: "#" 
      },
      { 
        nama: "Nila Rahma Afi Maulidya", 
        peran: "Pendidikan dan Inovasi", 
        asal: "Malang", 
        bergabung: "2026", 
        email: "rahmanila224@gmail.com", 
        status: "Aktif",
        foto: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=256&q=80",
        linkSertifikat: "#" 
      },
      { 
        nama: "Eka Nur Intania", 
        peran: "Kreatif dan Komunikasi", 
        asal: "Malang", 
        bergabung: "2026", 
        email: "ekaintaniaa660@gmail.com", 
        status: "Aktif",
        foto: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=256&q=80",
        linkSertifikat: "#" 
      },
      { 
        nama: "Putri Ratna Bunga Agustin", 
        peran: "Pendidikan dan Inovasi", 
        asal: "Malang", 
        bergabung: "2026", 
        email: "putriratnabungaa@gmail.com", 
        status: "Aktif",
        foto: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80",
        linkSertifikat: "#" 
      },
      { 
        nama: "Hasna Fathina Qurrota'Ayun", 
        peran: "Kreatif dan Komunikasi", 
        asal: "Malang", 
        bergabung: "2026", 
        email: "fathinahasna11@gmail.com", 
        status: "Aktif",
        foto: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=256&q=80",
        linkSertifikat: "#" 
      },
      { 
        nama: "Anggi Nur Fadilah", 
        peran: "Humas dan Kemitraan", 
        asal: "Jombang", 
        bergabung: "2026", 
        email: "anggifadlhh@gmail.com", 
        status: "Aktif",
        foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
        linkSertifikat: "#" 
      },
      { 
        nama: "QOYYUM FARIDATUN NAJIHAH", 
        peran: "Humas dan Kemitraan", 
        asal: "Kutai Timur", 
        bergabung: "2026", 
        email: "yumibuuy23@gmail.com", 
        status: "Aktif",
        foto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80",
        linkSertifikat: "#" 
      },
      { 
        nama: "Mahardika Anugrah", 
        peran: "pendidikan dan inovasi", 
        asal: "Palembang", 
        bergabung: "2026", 
        email: "mahardikaanugrahanugrah@gmail.com", 
        status: "Aktif",
        foto: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&q=80",
        linkSertifikat: "#" 
      },
      { 
        nama: "Muhammad Nizam Azzamroni", 
        peran: "Humas dan Kemitraan", 
        asal: "Lamongan", 
        bergabung: "2026", 
        email: "sulaimantulung73@gmail.com", 
        status: "Aktif",
        foto: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=256&q=80",
        linkSertifikat: "#" 
      },
      { 
        nama: "Daim Al Mubarok", 
        peran: "Humas dan Kemitraan", 
        asal: "Malang", 
        bergabung: "2026", 
        email: "250605110205@student.uin-malang.ac.id", 
        status: "Aktif",
        foto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80",
        linkSertifikat: "#" 
      },
      { 
        nama: "Dimas Yon Setyawan", 
        peran: "Kreatif dan Komunikasi", 
        asal: "Kediri", 
        bergabung: "2026", 
        email: "samid@gmail.com", 
        status: "Aktif",
        foto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80",
        linkSertifikat: "#" 
      },
      { 
        nama: "Dimas Yon Setyawan", 
        peran: "Kreatif dan Komunikasi", 
        asal: "Mojokerto", 
        bergabung: "2026", 
        email: "Fajar Maulana@gmail.com", 
        status: "Aktif",
        foto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80",
        linkSertifikat: "#" 
      }
    ]
  }
};

type KunciTim = keyof typeof DATABASE_VOLUNTEER;

export default function DetailVolunteerPage() {
  const params = useParams();
  const router = useRouter();
  const [keywordPencarian, setKeywordPencarian] = useState("");
  
  const idTim = params.id as KunciTim;
  const dataTimDipilih = DATABASE_VOLUNTEER[idTim] || DATABASE_VOLUNTEER["jagat-anjasmara"];

  // Fitur Filter Pencarian (Mencocokkan nama atau peran)
  const daftarAnggotaTerfilter = dataTimDipilih.anggota.filter((anggota) =>
    anggota.nama.toLowerCase().includes(keywordPencarian.toLowerCase()) ||
    anggota.peran.toLowerCase().includes(keywordPencarian.toLowerCase())
  );

  return (
    <main style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "40px 20px", fontFamily: "sans-serif" }}>
      
      {/* CSS internal Next.js untuk efek hover disentuh/diarahkan cursor */}
      <style>{`
        .feature-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }
        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.06) !important;
        }
        .volunteer-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .volunteer-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 25px rgba(0,0,0,0.08) !important;
        }
        .btn-download {
          transition: background-color 0.2s ease, transform 0.1s ease;
        }
        .btn-download:hover {
          background-color: #1e293b !important;
          transform: scale(1.02);
        }
      `}</style>

      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        
        {/* Tombol Kembali */}
        <button 
          onClick={() => router.push("/volunteer")} 
          style={{ 
            padding: "12px 24px", backgroundColor: "white", border: "1px solid #e2e8f0", 
            borderRadius: "14px", cursor: "pointer", fontWeight: "700", color: "#475569", 
            marginBottom: "25px", display: "inline-flex", alignItems: "center", gap: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.02)", transition: "all 0.2s"
          }}
        >
          ← Kembali ke Halaman Volunteer
        </button>

        {/* Banner Utama */}
        <div style={{ 
          backgroundColor: dataTimDipilih.warnaTema, padding: "45px", borderRadius: "24px", 
          color: "white", marginBottom: "30px", boxShadow: "0 10px 30px rgba(0,0,0,0.06)"
        }}>
          <span style={{ fontSize: "11px", fontWeight: "800", backgroundColor: "rgba(255,255,255,0.18)", padding: "6px 16px", borderRadius: "50px", letterSpacing: "1px" }}>
            DIREKTORI RESMI RELAWAN KATI
          </span>
          <h1 style={{ margin: "20px 0 12px 0", fontSize: "32px", fontWeight: "800", letterSpacing: "-0.5px" }}>
            {dataTimDipilih.namaTim}
          </h1>
          <p style={{ margin: 0, fontSize: "16px", color: "rgba(255,255,255,0.85)", lineHeight: "1.7", maxWidth: "750px" }}>
            {dataTimDipilih.deskripsi}
          </p>
        </div>

        {/* ================= 3 KOLOM INFO UTAMA VOLUNTEER ================= */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginBottom: "35px"
        }}>
          {/* Kolom 1: Pendaftaran Volunteer */}
          <div className="feature-card" style={{
            backgroundColor: "white", padding: "24px", borderRadius: "20px",
            border: "1px solid #e2e8f0", boxShadow: "0 4px 10px rgba(0,0,0,0.01)"
          }}>
            <div style={{ fontSize: "28px", marginBottom: "12px" }}></div>
            <h4 style={{ margin: "0 0 8px 0", color: "#0f172a", fontSize: "16px", fontWeight: "700" }}>
              Pendaftaran Volunteer
            </h4>
            <p style={{ margin: 0, color: "#64748b", fontSize: "13px", lineHeight: "1.5" }}>
              Bergabunglah menjadi agen perubahan bersama KATI. Akses formulir registrasi, seleksi berkas, dan jadwal orientasi berkala.
            </p>
          </div>

          {/* Kolom 2: Informasi Volunteer */}
          <div className="feature-card" style={{
            backgroundColor: "white", padding: "24px", borderRadius: "20px",
            border: "1px solid #e2e8f0", boxShadow: "0 4px 10px rgba(0,0,0,0.01)"
          }}>
            <div style={{ fontSize: "28px", marginBottom: "12px" }}></div>
            <h4 style={{ margin: "0 0 8px 0", color: "#0f172a", fontSize: "16px", fontWeight: "700" }}>
              Informasi Volunteer
            </h4>
            <p style={{ margin: 0, color: "#64748b", fontSize: "13px", lineHeight: "1.5" }}>
              Panduan hak & kewajiban, alur kerja pemetaan lapangan, logistik ekosistem, serta kode etik resmi penugasan relawan.
            </p>
          </div>

          {/* Kolom 3: Dampak & Achievement */}
          <div className="feature-card" style={{
            backgroundColor: "white", padding: "24px", borderRadius: "20px",
            border: "1px solid #e2e8f0", boxShadow: "0 4px 10px rgba(0,0,0,0.01)"
          }}>
            <div style={{ fontSize: "28px", marginBottom: "12px" }}></div>
            <h4 style={{ margin: "0 0 8px 0", color: "#0f172a", fontSize: "16px", fontWeight: "700" }}>
              Dampak & Achievement
            </h4>
            <p style={{ margin: 0, color: "#64748b", fontSize: "13px", lineHeight: "1.5" }}>
              Catatan kontribusi nyata: digitalisasi mata air, hektar area reboisasi, sertifikat kompetensi, dan capaian SDGs lingkungan.
            </p>
          </div>
        </div>
        {/* ===================================================================== */}

        {/* Bar Interaktif: Statistik & Kolom Pencarian */}
        <div style={{ 
          display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", 
          gap: "20px", marginBottom: "25px", backgroundColor: "white", padding: "20px", 
          borderRadius: "20px", border: "1px solid #e2e8f0" 
        }}>
          <div>
            <h3 style={{ margin: 0, color: "#0f172a", fontSize: "18px", fontWeight: "700" }}>
              Anggota Tim Terdaftar
            </h3>
            <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: "14px" }}>
              Menampilkan {daftarAnggotaTerfilter.length} dari {dataTimDipilih.anggota.length} profesional
            </p>
          </div>

          {/* Input Pencarian */}
          <div style={{ position: "relative", minWidth: "300px" }}>
            <input 
              type="text"
              placeholder="🔍 Cari nama atau peran spesialis..."
              value={keywordPencarian}
              onChange={(e) => setKeywordPencarian(e.target.value)}
              style={{
                width: "100%", padding: "12px 16px", borderRadius: "12px",
                border: "1px solid #cbd5e1", backgroundColor: "#f8fafc",
                fontSize: "14px", color: "#334155", outline: "none", boxSizing: "border-box"
              }}
            />
          </div>
        </div>

        {/* Layout Grid Card Anggota */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", 
          gap: "20px" 
        }}>
          {daftarAnggotaTerfilter.length > 0 ? (
            daftarAnggotaTerfilter.map((volunteer, index) => (
              <div 
                key={index} 
                className="volunteer-card"
                style={{ 
                  padding: "24px", borderRadius: "20px", border: "1px solid #e2e8f0", 
                  backgroundColor: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
                  display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center"
                }}
              >
                {/* Status Badge */}
                <div style={{ alignSelf: "flex-end", marginBottom: "-15px" }}>
                  <span style={{ backgroundColor: "#f0fdf4", color: "#16a34a", fontSize: "10px", fontWeight: "700", padding: "4px 10px", borderRadius: "50px" }}>
                    ● {volunteer.status}
                  </span>
                </div>

                {/* 1. Foto Profil Relawan */}
                <div style={{ flexShrink: 0, marginTop: "10px", marginBottom: "16px" }}>
                  <img 
                    src={volunteer.foto} 
                    alt={volunteer.nama}
                    style={{ 
                      width: "85px", height: "85px", borderRadius: "50%", 
                      objectFit: "cover", border: "3px solid #e2e8f0", boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
                    }} 
                  />
                </div>

                {/* 2. Informasi Utama & Jabatan */}
                <div style={{ flex: "1 1 auto", width: "100%", marginBottom: "20px" }}>
                  <h4 style={{ margin: "0 0 6px 0", color: "#0f172a", fontSize: "17px", fontWeight: "700", lineHeight: "1.3" }}>
                    {volunteer.nama}
                  </h4>
                  <p style={{ color: dataTimDipilih.warnaTema, fontWeight: "700", fontSize: "13px", margin: "0 0 14px 0", letterSpacing: "0.2px" }}>
                    💼 {volunteer.peran}
                  </p>
                  
                  {/* Garis Pembatas Halus */}
                  <div style={{ height: "1px", backgroundColor: "#f1f5f9", margin: "12px 0" }}></div>

                  {/* Meta Data Ringkas Vertikal */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px", color: "#64748b", alignItems: "center" }}>
                    <div>📍 Asal: <strong>{volunteer.asal}</strong></div>
                    <div>📅 Angkatan: <strong>{volunteer.bergabung}</strong></div>
                    <div style={{ maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontStyle: "italic" }}>
                      ✉️ {volunteer.email}
                    </div>
                  </div>
                </div>

                {/* 3. Aksi & Unduh Sertifikat */}
                <div style={{ width: "100%", marginTop: "auto" }}>
                  <a 
                    href={volunteer.linkSertifikat}
                    className="btn-download"
                    style={{ 
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                      padding: "10px 16px", backgroundColor: "#0f172a", color: "white", 
                      borderRadius: "12px", fontSize: "12px", fontWeight: "700", 
                      textDecoration: "none", boxShadow: "0 4px 12px rgba(15,23,42,0.1)",
                      width: "100%", boxSizing: "border-box"
                    }}
                    onClick={(e) => {
                      if(volunteer.linkSertifikat === "#") {
                        e.preventDefault();
                        alert(`Sertifikat Digital untuk ${volunteer.nama} sedang dalam proses verifikasi sistem KATI.`);
                      }
                    }}
                  >
                    📥 Unduh Sertifikat
                  </a>
                </div>

              </div>
            ))
          ) : (
            // State Jika Hasil Pencarian Kosong
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "50px 20px", backgroundColor: "white", borderRadius: "20px", border: "1px solid #e2e8f0" }}>
              <p style={{ color: "#64748b", margin: 0, fontSize: "15px" }}>
                Tidak ada anggota bernama atau berperan sebagai "<strong>{keywordPencarian}</strong>" di tim ini.
              </p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}