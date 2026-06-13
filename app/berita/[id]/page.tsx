"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";

// Tipe data untuk satu berita
interface Berita {
  id: number;
  judul: string;
  kategori: string;
  konten_lengkap: string;
  gambar: string;
  created_at: string;
  views: number;
}

export default function DetailBerita() {
  const params = useParams(); // Mengambil ID dari URL
  const router = useRouter(); // Untuk tombol kembali
  
  const [berita, setBerita] = useState<Berita | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchDetailDanHitungView(params.id as string);
    }
  }, [params.id]);

  const fetchDetailDanHitungView = async (id: string) => {
    try {
      // 1. Ambil data spesifik berdasarkan ID
      const { data, error } = await supabase
        .from("berita")
        .select("*")
        .eq("id", id)
        .single(); // Ambil 1 data saja

      if (error) throw error;

      if (data) {
        setBerita(data);

        // 2. Tambah view count secara otomatis di background saat halaman dibuka
        const viewsBaru = (data.views || 0) + 1;
        await supabase
          .from("berita")
          .update({ views: viewsBaru })
          .eq("id", id);
      }
    } catch (error) {
      console.error("Gagal mengambil detail berita:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTanggal = (tanggal: string) => {
    return new Date(tanggal).toLocaleDateString("id-ID", {
      day: "numeric", month: "long", year: "numeric"
    });
  };

  if (loading) {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#ecfdf5", color: "#064e3b" }}><h2>Memuat cerita dari alam...</h2></div>;
  }

  if (!berita) {
    return <div style={{ textAlign: "center", padding: "50px" }}><h2>Berita tidak ditemukan!</h2><button onClick={() => router.push('/berita')}>Kembali</button></div>;
  }

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", paddingBottom: "80px" }}>
      
      {/* Gambar Cover Full Width */}
      <div style={{ width: "100%", height: "450px", position: "relative" }}>
        <img 
          src={berita.gambar} 
          alt={berita.judul} 
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7)" }} 
        />
        
        {/* Tombol Kembali (Melayang di atas gambar) */}
        <button 
          onClick={() => router.push('/berita')}
          style={{ 
            position: "absolute", top: "30px", left: "30px", 
            padding: "10px 20px", backgroundColor: "rgba(255,255,255,0.2)", 
            backdropFilter: "blur(5px)", color: "white", border: "1px solid white", 
            borderRadius: "30px", cursor: "pointer", fontWeight: "bold",
            display: "flex", alignItems: "center", gap: "8px"
          }}
        >
          ← Kembali ke Daftar
        </button>
      </div>

      {/* Konten Artikel Utama */}
      <div style={{ 
        maxWidth: "800px", margin: "-100px auto 0", 
        backgroundColor: "white", borderRadius: "20px", 
        padding: "50px", position: "relative", zIndex: 10,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" 
      }}>
        
        {/* Meta Info (Kategori, Tanggal, Views) */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", alignItems: "center", marginBottom: "20px", fontSize: "14px" }}>
          <span style={{ backgroundColor: "#16a34a", color: "white", padding: "6px 16px", borderRadius: "20px", fontWeight: "bold", letterSpacing: "1px" }}>
            {berita.kategori}
          </span>
          <span style={{ color: "#64748b", fontWeight: "500" }}>{formatTanggal(berita.created_at)}</span>
          <span style={{ color: "#94a3b8" }}>•</span>
          <span style={{ color: "#64748b", display: "flex", alignItems: "center", gap: "5px" }}>
            👁️ {(berita.views || 0) + 1} Orang membaca ini
          </span>
        </div>
        
        {/* Judul Artikel */}
        <h1 style={{ fontSize: "36px", color: "#0f172a", marginBottom: "35px", lineHeight: "1.3", fontWeight: "800" }}>
          {berita.judul}
        </h1>
        
        {/* Paragraf Artikel */}
        <div style={{ color: "#334155", fontSize: "18px", lineHeight: "1.9", textAlign: "justify" }}>
          {berita.konten_lengkap.split('\n').map((paragraf, index) => (
            <p key={index} style={{ marginBottom: "24px" }}>
              {paragraf}
            </p>
          ))}
        </div>

      </div>
    </div>
  );
}