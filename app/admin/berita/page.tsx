"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase"; 

// DAFTAR EMAIL YANG DIIZINKAN MASUK
const EMAIL_TIM_KATI = [
  "abdulmujab80@gmail.com",
  "penulis@kati.id",
  "editor@kampusalam.com"
];

export default function AdminBerita() {
  // STATE UNTUK GERBANG LOGIN
  const [isVerified, setIsVerified] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  // STATE UNTUK FORM BERITA
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("KEGIATAN");
  const [konten_lengkap, setKontenLengkap] = useState("");
  const [fileGambar, setFileGambar] = useState<File | null>(null); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FUNGSI CEK EMAIL
  const handleVerifikasi = (e: React.FormEvent) => {
    e.preventDefault();
    if (EMAIL_TIM_KATI.includes(emailInput.toLowerCase())) {
      setIsVerified(true);
    } else {
      alert("❌ Akses ditolak: Email tidak terdaftar sebagai Penulis KATI.");
    }
  };

  // FUNGSI PUBLISH BERITA
  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fileGambar) {
      alert("⚠️ Harap pilih gambar terlebih dahulu!");
      return;
    }

    setIsSubmitting(true);

    try {
      const fileExt = fileGambar.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("gambar-berita")
        .upload(fileName, fileGambar);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("gambar-berita")
        .getPublicUrl(fileName);
        
      const imageUrl = publicUrlData.publicUrl;

      // Menyimpan ke database tanpa kolom deskripsi
      const { error: dbError } = await supabase
        .from("berita")
        .insert([
          { 
            judul: judul, 
            kategori: kategori, 
            konten_lengkap: konten_lengkap, 
            gambar: imageUrl 
          }
        ]);

      if (dbError) throw dbError;

      alert("✅ Berhasil! Berita beserta gambar sudah tayang.");
      
      setJudul("");
      setKontenLengkap("");
      setFileGambar(null);
      const fileInput = document.getElementById("input-gambar") as HTMLInputElement;
      if (fileInput) fileInput.value = "";

    } catch (error: any) {
      alert("❌ Terjadi kesalahan: " + error.message);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 1. TAMPILAN JIKA BELUM VERIFIKASI (GERBANG PENULIS)
  if (!isVerified) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f8fafc", padding: "20px" }}>
        <div style={{ backgroundColor: "white", padding: "40px", borderRadius: "16px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", maxWidth: "400px", width: "100%", textAlign: "center" }}>
          <h2 style={{ color: "#064e3b", marginBottom: "12px", fontSize: "24px", fontWeight: "700" }}>Gerbang Jurnalis KATI</h2>
          <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "30px", lineHeight: "1.5" }}>
            Halaman ini dilindungi. Masukkan email resmi Anda untuk membuka akses menulis.
          </p>

          <form onSubmit={handleVerifikasi}>
            <input 
              type="email"
              placeholder="Masukkan email Anda..." 
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              required
              style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #cbd5e1", marginBottom: "20px", boxSizing: "border-box", fontSize: "14px" }}
            />
            <button 
              type="submit"
              style={{ width: "100%", backgroundColor: "#064e3b", color: "white", padding: "12px", borderRadius: "8px", border: "none", fontWeight: "bold", fontSize: "15px", cursor: "pointer" }}
            >
              Verifikasi Email
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. TAMPILAN JIKA SUDAH VERIFIKASI (DAPUR PENULIS)
  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "30px", backgroundColor: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ color: "#064e3b", margin: 0 }}>Dapur Penulis: Tambah Berita</h2>
        <button 
          onClick={() => setIsVerified(false)} 
          style={{ backgroundColor: "#ef4444", color: "white", border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", cursor: "pointer" }}
        >
          Keluar
        </button>
      </div>
      
      <form onSubmit={handlePublish} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input 
          placeholder="Judul Berita" 
          value={judul} 
          onChange={(e) => setJudul(e.target.value)}
          required
          style={{ padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
        />
        
        <select value={kategori} onChange={(e) => setKategori(e.target.value)} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}>
          <option value="KEGIATAN">KEGIATAN</option>
          <option value="EDUKASI">EDUKASI</option>
          <option value="KONSERVASI">KONSERVASI</option>
        </select>

        <div style={{ padding: "10px", borderRadius: "6px", border: "1px dashed #64748b", backgroundColor: "white" }}>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#475569", fontWeight: "bold" }}>
            Upload Foto Berita:
          </label>
          <input 
            id="input-gambar"
            type="file" 
            accept="image/*"
            onChange={(e) => setFileGambar(e.target.files?.[0] || null)}
            required
            style={{ width: "100%", cursor: "pointer" }}
          />
        </div>

        {/* Kolom ringkasan deskripsi singkat berhasil dihapus dari sini */}

        <textarea 
          placeholder="Isi Konten Lengkap" 
          value={konten_lengkap} 
          onChange={(e) => setKontenLengkap(e.target.value)}
          required
          style={{ padding: "10px", borderRadius: "6px", height: "150px", border: "1px solid #cbd5e1" }}
        />

        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{ 
            backgroundColor: isSubmitting ? "#94a3b8" : "#16a34a", 
            color: "white", 
            padding: "12px", 
            borderRadius: "6px", 
            border: "none", 
            cursor: isSubmitting ? "not-allowed" : "pointer", 
            fontWeight: "bold" 
          }}
        >
          {isSubmitting ? "Mengunggah & Mempublish..." : "Publish ke Publik"}
        </button>
      </form>
    </div>
  );
}