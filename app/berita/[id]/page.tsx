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
  penulis?: string; // Menambahkan opsi kolom penulis
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

  const fontStyle = { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' };

  if (loading) {
    return (
      <div style={{ ...fontStyle, display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f4fbf7", color: "#063e2b" }}>
        <h2>Memuat cerita dari alam...</h2>
      </div>
    );
  }

  if (!berita) {
    return (
      <div style={{ ...fontStyle, textAlign: "center", padding: "50px" }}>
        <h2>Berita tidak ditemukan!</h2>
        <button onClick={() => router.push('/berita')}>Kembali</button>
      </div>
    );
  }

  // Nama penulis fallback jika kolom di database kosong
  const penulisBerita = berita.penulis || "Wardatul Fitriah";

  return (
    <div style={{ ...fontStyle, backgroundColor: "#f4fbf7", minHeight: "100vh", padding: "40px 20px 80px 20px" }}>
      <div style={{ maxWidth: "840px", margin: "0 auto" }}>
        
        {/* Tombol Kembali yang Minimalis */}
        <button 
          onClick={() => router.push('/berita')}
          style={{ 
            background: "none", border: "none", color: "#063e2b", 
            fontSize: "14px", fontWeight: "600", cursor: "pointer", 
            display: "flex", alignItems: "center", gap: "8px", marginBottom: "30px", padding: 0 
          }}
        >
          ← Kembali ke Daftar Berita
        </button>

        {/* Kontainer Putih Artikel Utama */}
        <article style={{ backgroundColor: "#ffffff", borderRadius: "24px", padding: "50px 40px", boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.02)" }}>
          
          {/* 🏷️ Tag Kategori & Informasi Tanggal / Views */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", marginBottom: "20px" }}>
            <span style={{ backgroundColor: "#d1fae5", color: "#063e2b", fontSize: "12px", fontWeight: "700", padding: "6px 14px", borderRadius: "100px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {berita.kategori}
            </span>
            <span style={{ color: "#94a3b8", fontSize: "13px", fontWeight: "500" }}>
              {formatTanggal(berita.created_at)}
            </span>
            <span style={{ color: "#cbd5e1" }}>•</span>
            <span style={{ color: "#64748b", fontSize: "13px", display: "flex", alignItems: "center", gap: "5px", fontWeight: "500" }}>
              👁️ {berita.views || 0} Kali Dibaca
            </span>
          </div>

          {/* 📰 Judul Berita (Besar, Tebal, dan Berwarna Hijau Gelap KATI) */}
          <h1 style={{ fontSize: "38px", fontWeight: "800", color: "#063e2b", lineHeight: "1.3", margin: "0 0 15px 0", letterSpacing: "-0.5px" }}>
            {berita.judul}
          </h1>

          {/* ✍️ Info Penulis (Persis seperti layout di image_fc2c50.jpg) */}
          <p style={{ fontSize: "14px", color: "#64748b", fontWeight: "500", margin: "0 0 35px 0", borderBottom: "1px solid #f1f5f9", paddingBottom: "20px" }}>
            Ditulis oleh: <span style={{ color: "#063e2b", fontWeight: "600" }}>{penulisBerita}</span>
          </p>

          {/* 📸 Gambar Utama Berita dengan Sudut Melengkung Halus */}
          {berita.gambar && (
            <div style={{ width: "100%", overflow: "hidden", borderRadius: "20px", marginBottom: "40px" }}>
              <img 
                src={berita.gambar} 
                alt={berita.judul} 
                style={{ 
                  width: "100%", 
                  height: "auto", 
                  maxHeight: "480px", 
                  objectFit: "cover",
                  display: "block"
                }} 
              />
            </div>
          )}

          {/* 📝 Isi Teks Paragraf Rata Kanan-Kiri */}
          <div style={{ color: "#334155", fontSize: "17.5px", lineHeight: "1.85", textAlign: "justify", letterSpacing: "0.1px" }}>
            {berita.konten_lengkap.split('\n').map((paragraf, index) => {
              if (!paragraf.trim()) return null;
              return (
                <p key={index} style={{ marginBottom: "24px" }}>
                  {paragraf}
                </p>
              );
            })}
          </div>

        </article>

        {/* Footer Hak Cipta */}
        <div style={{ textAlign: "center", marginTop: "40px", color: "#94a3b8", fontSize: "13px", fontWeight: "500" }}>
          © 2026 Kampus Alam Tegalsari Indonesia. Seluruh hak cipta dilindungi.
        </div>

      </div>
    </div>
  );
}