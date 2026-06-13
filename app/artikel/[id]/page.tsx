"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";

interface Artikel {
  id: number;
  created_at: string;
  nama_penulis: string;
  topik: string;
  kategori: string;
  waktu_baca: string;
  judul: string;
  intisari: string;
  konten_lengkap: string;
  gambar: string;
  views: number;
}

// INI WAJIB ADA BIAR TIDAK ERROR
export default function DetailArtikel() {
  const params = useParams();
  const router = useRouter();
  
  const [artikel, setArtikel] = useState<Artikel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchDetailDanHitungView(params.id as string);
    }
  }, [params.id]);

  const fetchDetailDanHitungView = async (id: string) => {
    try {
      // Ambil data artikel
      const { data, error } = await supabase
        .from("artikel")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      if (data) {
        setArtikel(data);

        // Langsung hitung nambah view +1 di background
        const viewsBaru = (data.views || 0) + 1;
        await supabase
          .from("artikel")
          .update({ views: viewsBaru })
          .eq("id", id);
      }
    } catch (error) {
      console.error("Gagal mengambil detail artikel:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric", month: "long", year: "numeric"
    });
  };

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
        <div style={{ width: "50px", height: "50px", border: "4px solid #e2e8f0", borderTopColor: "#10b981", borderRadius: "50%", animation: "spin 1s linear infinite", marginBottom: "20px" }}></div>
        <h2 style={{ color: "#0f172a", fontSize: "18px" }}>Menyiapkan lembar bacaan...</h2>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!artikel) {
    return (
      <div style={{ textAlign: "center", padding: "100px 20px", backgroundColor: "#f8fafc", minHeight: "100vh" }}>
        <h1 style={{ fontSize: "60px", margin: "0 0 20px 0" }}>🥀</h1>
        <h2 style={{ color: "#0f172a", marginBottom: "16px" }}>Artikel tidak ditemukan!</h2>
        <button onClick={() => router.push('/artikel')} style={{ padding: "10px 24px", backgroundColor: "#064e3b", color: "white", borderRadius: "30px", border: "none", cursor: "pointer", fontWeight: "bold" }}>Kembali ke Pustaka</button>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      
      {/* 1. BAGIAN FOTO SAMPUL BESAR */}
      <div style={{ width: "100%", height: "50vh", minHeight: "400px", position: "relative", backgroundColor: "#0f172a" }}>
        <img 
          src={artikel.gambar} 
          alt={artikel.judul} 
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} 
        />
        
        {/* Tombol Back */}
        <button 
          onClick={() => router.push('/artikel')}
          style={{ position: "absolute", top: "30px", left: "30px", padding: "10px 24px", backgroundColor: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", color: "white", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "30px", cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px" }}
        >
          ← Kembali
        </button>
      </div>

      {/* 2. KOTAK KONTEN ARTIKEL (Elegan menumpuk di atas gambar) */}
      <div style={{ maxWidth: "800px", margin: "-120px auto 0", backgroundColor: "white", borderRadius: "24px 24px 0 0", padding: "50px", position: "relative", zIndex: 10, boxShadow: "0 -10px 40px rgba(0,0,0,0.08)" }}>
        
        {/* Kategori, Views, Waktu Baca */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center", marginBottom: "24px", fontSize: "14px", fontWeight: "600" }}>
          <span style={{ backgroundColor: "#10b981", color: "white", padding: "6px 16px", borderRadius: "20px", letterSpacing: "1px", textTransform: "uppercase", fontSize: "12px" }}>
            {artikel.kategori}
          </span>
          <span style={{ color: "#64748b" }}>⏱️ {artikel.waktu_baca}</span>
          <span style={{ color: "#cbd5e1" }}>|</span>
          <span style={{ color: "#64748b" }}>👁️ {(artikel.views || 0) + 1} Pembaca</span>
        </div>
        
        {/* Judul Artikel */}
        <h1 style={{ fontSize: "40px", color: "#0f172a", marginBottom: "30px", lineHeight: "1.3", fontWeight: "900", letterSpacing: "-0.5px" }}>
          {artikel.judul}
        </h1>

        {/* Info Penulis */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "40px", paddingBottom: "30px", borderBottom: "1px solid #f1f5f9" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "#064e3b", display: "flex", justifyContent: "center", alignItems: "center", color: "white", fontWeight: "bold", fontSize: "20px" }}>
            {artikel.nama_penulis ? artikel.nama_penulis.charAt(0).toUpperCase() : "K"}
          </div>
          <div>
            <p style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: "700", color: "#334155" }}>Oleh {artikel.nama_penulis}</p>
            <p style={{ margin: 0, fontSize: "14px", color: "#94a3b8" }}>Diterbitkan pada {formatDate(artikel.created_at)}</p>
          </div>
        </div>
        
        {/* Intisari (Jika ingin ditampilkan juga di dalam artikel) */}
        <div style={{ marginBottom: "30px", padding: "20px", borderLeft: "4px solid #10b981", backgroundColor: "#f0fdf4", color: "#064e3b", fontSize: "18px", fontStyle: "italic", lineHeight: "1.6" }}>
          {artikel.intisari}
        </div>

        {/* Teks Isi Artikel */}
        <div style={{ color: "#334155", fontSize: "19px", lineHeight: "1.9", textAlign: "justify" }}>
          {artikel.konten_lengkap.split('\n').map((paragraf, index) => (
            <p key={index} style={{ marginBottom: "28px" }}>
              {paragraf}
            </p>
          ))}
        </div>

      </div>
    </div>
  );
}