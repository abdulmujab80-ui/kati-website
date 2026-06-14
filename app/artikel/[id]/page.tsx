"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

// Interface fleksibel untuk mendukung kolom dari database Anda
interface Artikel {
  id: string | number;
  title?: string;
  judul?: string;       
  content?: string;
  konten?: string;      
  isi?: string;         
  intisari?: string;    
  konten_lengkap?: string; 
  category?: string;
  kategori?: string;    
  author?: string;
  penulis?: string;     
  nama_penulis?: string;
  created_at?: string;
  image_url?: string;
  gambar_url?: string;  
  gambar?: string; // 👈 Tambahan untuk mendukung kolom gambar di Supabase Anda
  views?: number;  // 👈 Tambahan untuk mendukung kolom views/dibaca
}

export default function DetailArtikelPublik() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id; // Mengambil ID dari URL (misal: /artikel/4)

  const [artikel, setArtikel] = useState<Artikel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const ambilDetailArtikel = async () => {
      try {
        setLoading(true);
        setError(null);

        // Menarik data dari tabel 'artikel'
        const { data, error: supabaseError } = await supabase
          .from("artikel") 
          .select("*")
          .eq("id", id)
          .single();

        if (supabaseError) throw supabaseError;

        if (data) {
          setArtikel(data);

          // 📈 KODE BARU: Otomatis tambah views (+1) saat artikel berhasil dibuka
          const jumlahViewSekarang = data.views || 0;
          supabase
            .from("artikel")
            .update({ views: jumlahViewSekarang + 1 })
            .eq("id", id)
            .then(({ error }) => {
              if (error) console.error("Gagal update views:", error);
            });

        } else {
          setError("Artikel tidak ditemukan.");
        }
      } catch (err: any) {
        console.error("Error fetching article:", err);
        setError(err.message || "Gagal memuat artikel.");
      } finally {
        setLoading(false);
      }
    };

    ambilDetailArtikel();
  }, [id]);

  const fontStyle = { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' };

  // ⏳ TAMPILAN LOADING SEMENTARA DATA DIAMBIL
  if (loading) {
    return (
      <div style={{ ...fontStyle, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f8fafc" }}>
        <div style={{ textAlign: "center", color: "#063e2b" }}>
          <div style={{ width: "40px", height: "40px", border: "4px solid #e2e8f0", borderTopColor: "#063e2b", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 15px auto" }}></div>
          <p style={{ fontWeight: "600", fontSize: "15px" }}>Memuat lembar tulisan...</p>
          <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { to { transform: rotate(360deg); } }` }} />
        </div>
      </div>
    );
  }

  // ❌ TAMPILAN JIKA ARTIKEL TIDAK KETEMU / ERROR
  if (error || !artikel) {
    return (
      <div style={{ ...fontStyle, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f8fafc", padding: "20px" }}>
        <div style={{ backgroundColor: "#ffffff", padding: "40px", borderRadius: "20px", maxWidth: "400px", width: "100%", textAlign: "center", boxShadow: "0 10px 25px rgba(0,0,0,0.02)" }}>
          <span style={{ fontSize: "40px" }}>🍂</span>
          <h2 style={{ color: "#063e2b", fontSize: "20px", fontWeight: "700", marginTop: "15px" }}>Buku Catatan Kosong</h2>
          <p style={{ color: "#64748b", fontSize: "14px", marginTop: "8px", marginBottom: "25px" }}>{error || "Artikel tidak berhasil ditemukan di sistem."}</p>
          <button onClick={() => router.push("/artikel")} style={{ backgroundColor: "#063e2b", color: "white", border: "none", padding: "12px 24px", borderRadius: "10px", fontWeight: "600", cursor: "pointer", width: "100%" }}>
            Kembali ke List Artikel
          </button>
        </div>
      </div>
    );
  }

  // Ambil data gambar, judul, konten secara dinamis dengan prioritas kolom Supabase Anda
  const judulArtikel = artikel.judul || artikel.title || "Judul Tidak Tersedia";
  const kontenArtikel = artikel.konten_lengkap || artikel.konten || artikel.isi || artikel.content || artikel.intisari || "Konten artikel belum diisi.";
  const kategoriArtikel = artikel.kategori || artikel.category || "Sudut Teduh";
  const penulisArtikel = artikel.nama_penulis || artikel.penulis || artikel.author || "Tim Kampus Alam";
  
  // 📸 KODE BARU: Mengutamakan kolom 'gambar' dari tabel Supabase Anda
  const urlGambar = artikel.gambar || artikel.image_url || artikel.gambar_url;

  // 📖 TAMPILAN MEMBACA ARTIKEL (PREMIUM & CLEAN STYLE)
  return (
    <div style={{ ...fontStyle, backgroundColor: "#f4fbf7", minHeight: "100vh", padding: "40px 20px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        
        {/* Tombol Kembali yang Estetik */}
        <button 
          onClick={() => router.push("/artikel")} 
          style={{ background: "none", border: "none", color: "#063e2b", fontSize: "14px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", marginBottom: "30px", padding: 0 }}
        >
          ← Kembali ke Jurnal Utama
        </button>

        {/* Kontainer Utama Artikel */}
        <article style={{ backgroundColor: "#ffffff", borderRadius: "24px", padding: "50px 40px", boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.02)" }}>
          
          {/* Tag Kategori & Tanggal */}
          <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "20px" }}>
            <span style={{ backgroundColor: "#d1fae5", color: "#063e2b", fontSize: "12px", fontWeight: "700", padding: "6px 14px", borderRadius: "100px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {kategoriArtikel}
            </span>
            <span style={{ color: "#94a3b8", fontSize: "13px", fontWeight: "500" }}>
              {artikel.created_at ? new Date(artikel.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "Baru Saja"}
            </span>
          </div>

          {/* Judul Utama Artikel */}
          <h1 style={{ fontSize: "36px", fontWeight: "800", color: "#063e2b", lineHeight: "1.3", margin: "0 0 15px 0", letterSpacing: "-0.5px" }}>
            {judulArtikel}
          </h1>

          {/* Nama Penulis */}
          <p style={{ fontSize: "14px", color: "#64748b", fontWeight: "500", margin: "0 0 40px 0", borderBottom: "1px solid #f1f5f9", paddingBottom: "20px" }}>
            Ditulis oleh: <span style={{ color: "#063e2b", fontWeight: "600" }}>{penulisArtikel}</span>
          </p>

          {/* Ilustrasi Gambar (Jika Ada) */}
          {urlGambar && (
            <img 
              src={urlGambar} 
              alt={judulArtikel} 
              style={{ width: "100%", height: "auto", maxHeight: "400px", objectFit: "cover", borderRadius: "16px", marginBottom: "40px" }}
            />
          )}

          {/* Isi Konten Artikel (Mendukung Spasi Paragraf) */}
          <div style={{ 
            fontSize: "17px", 
            color: "#334155", 
            lineHeight: "1.8", 
            whiteSpace: "pre-wrap", // Menjaga enter/paragraf agar tidak menyatu
            letterSpacing: "0.2px"
          }}>
            {kontenArtikel}
          </div>

        </article>

        {/* Footer Kecil Halaman Pembaca */}
        <div style={{ textTransform: "none", textAlign: "center", marginTop: "40px", color: "#94a3b8", fontSize: "13px", fontWeight: "500" }}>
          © 2026 Kampus Alam Tegalsari Indonesia. Seluruh hak cipta dilindungi.
        </div>

      </div>
    </div>
  );
}