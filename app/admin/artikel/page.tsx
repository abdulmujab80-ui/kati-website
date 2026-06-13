"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase"; 

const EMAIL_TIM_KATI = [
  "abdulmujab80@gmail.com",
  "penulis@kati.id",
  "editor@kampusalam.com"
];

export default function AdminArtikel() {
  // STATE GERBANG LOGIN
  const [isVerified, setIsVerified] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  // STATE FORM ARTIKEL
  const [namaPenulis, setNamaPenulis] = useState("");
  const [topik, setTopik] = useState("");
  const [kategori, setKategori] = useState("Alam & Ekologi");
  const [waktuBaca, setWaktuBaca] = useState("");
  const [judul, setJudul] = useState("");
  const [intisari, setIntisari] = useState("");
  const [kontenLengkap, setKontenLengkap] = useState("");
  const [fileGambar, setFileGambar] = useState<File | null>(null); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVerifikasi = (e: React.FormEvent) => {
    e.preventDefault();
    if (EMAIL_TIM_KATI.includes(emailInput.toLowerCase())) {
      setIsVerified(true);
    } else {
      alert("❌ Akses ditolak: Email tidak terdaftar sebagai Penulis KATI.");
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fileGambar) {
      alert("⚠️ Harap pilih foto sampul artikel terlebih dahulu!");
      return;
    }

    setIsSubmitting(true);

    try {
      const fileExt = fileGambar.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      // 1. Upload file fisik foto ke Storage Bucket
      const { error: uploadError } = await supabase.storage
        .from("gambar-artikel")
        .upload(fileName, fileGambar);

      if (uploadError) throw uploadError;

      // 2. Ambil URL Publik dari foto yang baru di-upload
      const { data: publicUrlData } = supabase.storage
        .from("gambar-artikel")
        .getPublicUrl(fileName);
        
      const imageUrl = publicUrlData.publicUrl;

      // 3. Simpan link URL tersebut ke tabel artikel database (views mulai dari 0)
      const { error: dbError } = await supabase
        .from("artikel")
        .insert([
          { 
            nama_penulis: namaPenulis,
            topik: topik,
            kategori: kategori,
            waktu_baca: waktuBaca,
            judul: judul, 
            intisari: intisari,
            konten_lengkap: kontenLengkap, 
            gambar: imageUrl,
            views: 0
          }
        ]);

      if (dbError) throw dbError;

      alert("✅ Berhasil! Artikel gagasan lingkungan hidup telah tayang.");
      
      // Reset Form
      setNamaPenulis("");
      setTopik("");
      setWaktuBaca("");
      setJudul("");
      setIntisari("");
      setKontenLengkap("");
      setFileGambar(null);

    } catch (error: any) {
      alert("❌ Terjadi kesalahan: " + error.message);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 1. GERBANG LOGIN VERIFIKASI EMAIL
  if (!isVerified) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f8fafc", padding: "20px" }}>
        <div style={{ backgroundColor: "white", padding: "40px", borderRadius: "16px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", maxWidth: "400px", width: "100%", textAlign: "center" }}>
          <h2 style={{ color: "#064e3b", marginBottom: "12px", fontSize: "24px", fontWeight: "700" }}>Gerbang Penulis KATI</h2>
          <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "30px" }}>Masukkan email resmi Anda untuk membuka akses menulis artikel.</p>
          <form onSubmit={handleVerifikasi}>
            <input 
              type="email" 
              placeholder="Masukkan email Anda..." 
              value={emailInput} 
              onChange={(e) => setEmailInput(e.target.value)} 
              required 
              style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #cbd5e1", marginBottom: "20px", fontSize: "14px", boxSizing: "border-box" }} 
            />
            <button type="submit" style={{ width: "100%", backgroundColor: "#064e3b", color: "white", padding: "12px", borderRadius: "8px", border: "none", fontWeight: "bold", fontSize: "15px", cursor: "pointer" }}>Verifikasi Email</button>
          </form>
        </div>
      </div>
    );
  }

  // 2. FORM UTAMA
  return (
    <div style={{ maxWidth: "650px", margin: "40px auto", padding: "40px", backgroundColor: "white", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", border: "1px solid #f1f5f9" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <h2 style={{ color: "#064e3b", margin: 0, fontSize: "24px", fontWeight: "800" }}>Ruang Penulis KATI</h2>
            <span style={{ backgroundColor: "#dcfce7", color: "#15803d", fontSize: "11px", fontWeight: "bold", padding: "3px 8px", borderRadius: "20px" }}>Sesi Aktif</span>
          </div>
          <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>Akun Anda terverifikasi. Silakan publikasikan wawasan lingkungan hidup terbaru.</p>
        </div>
        <button onClick={() => setIsVerified(false)} style={{ backgroundColor: "#ef4444", color: "white", border: "none", padding: "6px 14px", borderRadius: "6px", fontSize: "12px", fontWeight: "bold", cursor: "pointer" }}>Keluar</button>
      </div>
      
      <form onSubmit={handlePublish} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        
        {/* Nama Penulis & Topik */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "bold", color: "#1e293b" }}>Nama Penulis</label>
            <input placeholder="Contoh: Tim Riset KATI" value={namaPenulis} onChange={(e) => setNamaPenulis(e.target.value)} required style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "bold", color: "#1e293b" }}>Nama Topik (Tag)</label>
            <input placeholder="Contoh: EKOLOGI" value={topik} onChange={(e) => setTopik(e.target.value)} required style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
          </div>
        </div>

        {/* Kategori Utama & Estimasi Waktu Baca */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "bold", color: "#1e293b" }}>Kategori Utama</label>
            <select value={kategori} onChange={(e) => setKategori(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "white", boxSizing: "border-box" }}>
              <option value="Alam & Ekologi">Alam & Ekologi</option>
              <option value="Konservasi">Konservasi</option>
              <option value="Edukasi Lingkungan">Edukasi Lingkungan</option>
            </select>
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "bold", color: "#1e293b" }}>Estimasi Waktu Baca</label>
            <input placeholder="Contoh: 5 Menit Baca" value={waktuBaca} onChange={(e) => setWaktuBaca(e.target.value)} required style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
          </div>
        </div>

        {/* REVISI UTAMA: KOLOM UPLOAD FOTO DENGAN LIVE PREVIEW VISUAL */}
        <div>
          <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "bold", color: "#1e293b" }}>Foto Sampul Artikel</label>
          <div style={{ padding: "20px", borderRadius: "8px", border: "2px dashed #cbd5e1", backgroundColor: "#f8fafc", textAlign: "center" }}>
            {fileGambar ? (
              <div>
                {/* Menampilkan Gambar Asli yang Di-upload */}
                <img 
                  src={URL.createObjectURL(fileGambar)} 
                  alt="Pratinjau Sampul" 
                  style={{ maxWidth: "100%", maxHeight: "220px", borderRadius: "8px", marginBottom: "12px", objectFit: "cover", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }} 
                />
                <p style={{ fontSize: "13px", color: "#16a34a", fontWeight: "bold", margin: "0 0 10px 0" }}>✓ {fileGambar.name}</p>
                <button 
                  type="button" 
                  onClick={() => setFileGambar(null)}
                  style={{ backgroundColor: "#ef4444", color: "white", border: "none", padding: "6px 14px", borderRadius: "6px", fontSize: "12px", fontWeight: "bold", cursor: "pointer" }}
                >
                  Ganti Foto Sampul
                </button>
              </div>
            ) : (
              <div>
                <p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 12px 0" }}>Klik tombol di bawah untuk memilih file foto artikel Anda</p>
                <input 
                  id="input-gambar"
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setFileGambar(e.target.files?.[0] || null)}
                  required
                  style={{ cursor: "pointer", fontSize: "14px", color: "#475569" }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Judul Artikel */}
        <div>
          <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "bold", color: "#1e293b" }}>Judul Artikel</label>
          <input placeholder="Masukkan judul..." value={judul} onChange={(e) => setJudul(e.target.value)} required style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
        </div>

        {/* Intisari (Ringkasan Pendek) */}
        <div>
          <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "bold", color: "#1e293b" }}>Intisari (Ringkasan Pendek)</label>
          <textarea placeholder="Tulis ringkasan pendek..." value={intisari} onChange={(e) => setIntisari(e.target.value)} required style={{ width: "100%", padding: "10px", borderRadius: "6px", height: "70px", border: "1px solid #cbd5e1", fontFamily: "inherit", boxSizing: "border-box", resize: "vertical" }} />
        </div>

        {/* Isi Konten Lengkap */}
        <div>
          <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "bold", color: "#1e293b" }}>Isi Konten Lengkap</label>
          <textarea placeholder="Tulis isi artikel secara menyeluruh di sini..." value={kontenLengkap} onChange={(e) => setKontenLengkap(e.target.value)} required style={{ width: "100%", padding: "10px", borderRadius: "6px", height: "180px", border: "1px solid #cbd5e1", fontFamily: "inherit", boxSizing: "border-box", resize: "vertical" }} />
        </div>

        {/* Tombol Submit */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{ 
            backgroundColor: isSubmitting ? "#94a3b8" : "#064e3b", 
            color: "white", 
            padding: "14px", 
            borderRadius: "8px", 
            border: "none", 
            cursor: isSubmitting ? "not-allowed" : "pointer", 
            fontWeight: "bold",
            fontSize: "15px",
            marginTop: "10px"
          }}
        >
          {isSubmitting ? "Sedang Mempublish..." : "Publish Artikel Baru"}
        </button>
      </form>
    </div>
  );
}