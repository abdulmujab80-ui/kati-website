"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation"; // Tambahkan ini untuk navigasi

interface Berita {
  id: number;
  judul: string;
  kategori: string;
  gambar: string;
  created_at: string;
  views: number;
}

export default function BeritaPublic() {
  const [daftarBerita, setDaftarBerita] = useState<Berita[]>([]);
  const [filter, setFilter] = useState("SEMUA");
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Panggil fungsi router

  useEffect(() => {
    fetchBerita();
  }, []);

  const fetchBerita = async () => {
    try {
      const { data, error } = await supabase
        .from("berita")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) setDaftarBerita(data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setLoading(false);
    }
  };

  const beritaTampil = filter === "SEMUA" 
    ? daftarBerita 
    : daftarBerita.filter(b => b.kategori === filter);

  const formatTanggal = (tanggal: string) => {
    return new Date(tanggal).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  return (
    <div style={{ backgroundColor: "#ecfdf5", minHeight: "100vh", paddingBottom: "50px" }}>
      {/* HEADER */}
      <div style={{ backgroundColor: "#064e3b", padding: "60px 20px", textAlign: "center", color: "white" }}>
        <h1 style={{ fontSize: "36px", margin: "0 0 10px 0" }}>Berita & Aksi</h1>
        <p style={{ margin: 0, opacity: 0.9 }}>Jendela informasi aksi, edukasi, dan pelestarian lingkungan kita</p>
      </div>

      {/* FILTER */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", margin: "30px 0" }}>
        {["SEMUA", "KEGIATAN", "EDUKASI", "KONSERVASI"].map((kat) => (
          <button
            key={kat}
            onClick={() => setFilter(kat)}
            style={{
              padding: "8px 20px", borderRadius: "20px", border: "none",
              fontWeight: "bold", cursor: "pointer",
              backgroundColor: filter === kat ? "#16a34a" : "white",
              color: filter === kat ? "white" : "#064e3b",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
            }}
          >
            {kat}
          </button>
        ))}
      </div>

      {/* GRID KARTU */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "25px" }}>
        {loading ? (
          <p style={{ textAlign: "center", gridColumn: "1 / -1", color: "#064e3b" }}>Memuat berita alam terbaru...</p>
        ) : beritaTampil.length === 0 ? (
          <p style={{ textAlign: "center", gridColumn: "1 / -1", color: "#064e3b" }}>Belum ada berita di kategori ini.</p>
        ) : (
          beritaTampil.map((berita) => (
            <div 
              key={berita.id} 
              // PERUBAHAN DISINI: Saat diklik, arahkan ke URL /berita/ID_BERITA
              onClick={() => router.push(`/berita/${berita.id}`)}
              style={{ backgroundColor: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", cursor: "pointer", transition: "transform 0.2s", display: "flex", flexDirection: "column" }}
              onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <img src={berita.gambar} alt={berita.judul} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
              <div style={{ padding: "20px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", fontSize: "12px" }}>
                  <span style={{ backgroundColor: "#dcfce7", color: "#16a34a", padding: "4px 8px", borderRadius: "4px", fontWeight: "bold" }}>{berita.kategori}</span>
                  <span style={{ color: "#94a3b8" }}>{formatTanggal(berita.created_at)}</span>
                </div>
                <h3 style={{ margin: "0 0 10px 0", color: "#1e293b", fontSize: "18px", lineHeight: "1.4" }}>{berita.judul}</h3>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "15px", borderTop: "1px solid #f1f5f9" }}>
                  <span style={{ fontSize: "13px", color: "#64748b", display: "flex", alignItems: "center", gap: "5px" }}>
                    👁️ {berita.views || 0} kali dibaca
                  </span>
                  <span style={{ color: "#16a34a", fontWeight: "bold", fontSize: "14px" }}>Baca Detail →</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}