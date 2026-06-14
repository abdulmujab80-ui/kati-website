"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

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

export default function HalamanArtikel() {
  const [listArtikel, setListArtikel] = useState<Artikel[]>([]);
  const [kategoriAktif, setKategoriAktif] = useState("Semua Tulisan");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Ambil data dari Supabase
  useEffect(() => {
    async function fetchArtikel() {
      try {
        const { data, error } = await supabase
          .from("artikel")
          .select("*")
          .order("id", { ascending: false });

        if (error) throw error;
        if (data) setListArtikel(data);
      } catch (err: any) {
        console.error("Gagal mengambil data artikel:", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchArtikel();
  }, []);

  // Filter gabungan: Kategori + Kolom Pencarian
  const artikelDifilter = listArtikel.filter((item) => {
    const matchKategori = kategoriAktif === "Semua Tulisan" || item.kategori.toLowerCase() === kategoriAktif.toLowerCase();
    const matchSearch = item.judul.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        item.intisari.toLowerCase().includes(searchQuery.toLowerCase());
    return matchKategori && matchSearch;
  });

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif", paddingBottom: "80px" }}>
      
      {/* HEADER SECTION */}
      <div style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", padding: "80px 20px 60px 20px", textAlign: "center", marginBottom: "40px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <span style={{ display: "inline-block", backgroundColor: "#dcfce7", color: "#16a34a", padding: "6px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: "bold", letterSpacing: "1px", marginBottom: "16px" }}>
            PUSAT LITERASI HIJAU
          </span>
          <h1 style={{ color: "#0f172a", fontSize: "42px", fontWeight: "900", margin: "0 0 20px 0", letterSpacing: "-0.5px" }}>
            Jelajahi Wawasan Ekologi & Alam
          </h1>
          <p style={{ color: "#64748b", fontSize: "18px", lineHeight: "1.6", margin: "0 0 30px 0" }}>
            Temukan artikel mendalam, opini ilmiah, dan panduan praktis bertema lingkungan.
          </p>
          
          {/* SEARCH BAR */}
          <div style={{ position: "relative", maxWidth: "500px", margin: "0 auto" }}>
            <input 
              type="text" 
              placeholder="Cari judul atau topik artikel..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "100%", padding: "16px 24px", borderRadius: "50px", border: "1px solid #cbd5e1", fontSize: "15px", outline: "none", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", boxSizing: "border-box" }}
            />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}>
        
        {/* NAVIGASI FILTER KATEGORI */}
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", marginBottom: "40px" }}>
          {["Semua Tulisan", "Sudut Teduh","Gema Semesta", "Paradigma Jaga", "Benih Pikir"].map((kat) => (
            <button
              key={kat}
              onClick={() => setKategoriAktif(kat)}
              style={{
                padding: "10px 24px",
                borderRadius: "30px",
                border: kategoriAktif === kat ? "none" : "1px solid #cbd5e1",
                backgroundColor: kategoriAktif === kat ? "#064e3b" : "transparent",
                color: kategoriAktif === kat ? "white" : "#475569",
                fontWeight: "600",
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out"
              }}
            >
              {kat}
            </button>
          ))}
        </div>

        {/* CONTAINER GRID ARTIKEL */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ width: "40px", height: "40px", border: "4px solid #e2e8f0", borderTopColor: "#10b981", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px auto" }}></div>
            <p style={{ color: "#64748b", fontSize: "15px" }}>Sedang memuat data artikel terbaru...</p>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        ) : artikelDifilter.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", backgroundColor: "white", borderRadius: "16px", border: "1px dashed #cbd5e1" }}>
            <p style={{ fontSize: "40px", margin: "0 0 16px 0" }}>🍃</p>
            <h3 style={{ color: "#0f172a", fontSize: "18px", margin: "0 0 8px 0" }}>Tidak ada artikel ditemukan</h3>
            <p style={{ color: "#64748b", margin: 0 }}>Coba gunakan kata kunci pencarian atau kategori lain.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "30px" }}>
            {artikelDifilter.map((artikel) => (
              <div 
                key={artikel.id}
                onClick={() => router.push(`/artikel/${artikel.id}`)}
                style={{ 
                  backgroundColor: "white", borderRadius: "16px", overflow: "hidden", 
                  border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
                  transition: "transform 0.2s, boxShadow 0.2s", display: "flex", flexDirection: "column", cursor: "pointer"
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0,0,0,0.1)"; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0,0,0,0.05)"; }}
              >
                {/* 1. GAMBAR SAMPUL ARTIKEL */}
                <div style={{ width: "100%", height: "200px", backgroundColor: "#f1f5f9", position: "relative" }}>
                  <img src={artikel.gambar} alt={artikel.judul} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: "12px", right: "12px", backgroundColor: "rgba(0,0,0,0.6)", color: "white", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "bold", backdropFilter: "blur(4px)" }}>
                    {artikel.waktu_baca}
                  </div>
                </div>

                {/* 2. KONTEN ARTIKEL */}
                <div style={{ padding: "24px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <div style={{ marginBottom: "12px" }}>
                    <span style={{ color: "#10b981", fontSize: "12px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      {artikel.topik || artikel.kategori}
                    </span>
                  </div>

                  <div style={{ flexGrow: 1 }}>
                    <h2 style={{ color: "#0f172a", fontSize: "20px", fontWeight: "700", margin: "0 0 12px 0", lineHeight: "1.4", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {artikel.judul}
                    </h2>
                    <p style={{ color: "#64748b", fontSize: "14px", lineHeight: "1.6", margin: "0 0 20px 0", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {artikel.intisari}
                    </p>
                  </div>

                  <hr style={{ border: "none", borderTop: "1px solid #f1f5f9", margin: "0 0 16px 0" }} />

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#064e3b", display: "flex", justifyContent: "center", alignItems: "center", color: "white", fontWeight: "bold", fontSize: "12px" }}>
                        {artikel.nama_penulis ? artikel.nama_penulis.charAt(0).toUpperCase() : "K"}
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: "13px", fontWeight: "700", color: "#334155" }}>{artikel.nama_penulis}</p>
                        <p style={{ margin: 0, fontSize: "11px", color: "#94a3b8" }}>{formatDate(artikel.created_at)}</p>
                      </div>
                    </div>
                    <div style={{ fontSize: "12px", color: "#94a3b8", display: "flex", alignItems: "center", gap: "4px" }}>
                      👁️ {artikel.views || 0}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}