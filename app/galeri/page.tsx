"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Inisialisasi Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function GaleriPage() {
  const [daftarGaleri, setDaftarGaleri] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback sementara agar tidak kosong sebelum data asli masuk
  const fallbackGaleri = [
    // Pastikan file ini benar-benar ada di dalam folder: public/galeri/
    { id: 'f1', judul: "Pendopo KATI", gambar: "/galeri/pendopo.jpg" }, 
    { id: 'f2', judul: "Susur Sungai 1", gambar: "/galeri/rifa.JPG" },
    { id: 'f3', judul: "Susur Sungai 2", gambar: "/galeri/sungai.JPG" },
    { id: 'f4', judul: "Tim Ekpedisi 2023", gambar: "/galeri/eja.JPG" },
    // Fallback Unsplash (Cadangan)
    { id: 'f5', judul: "Aksi Hijau", gambar: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80" },
    { id: 'f6', judul: "Edukasi Alam", gambar: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&q=80" },
  ];

  useEffect(() => {
    async function fetchGaleri() {
      try {
        // Mengambil seluruh foto dari tabel 'galeri' di Supabase
        const { data, error } = await supabase
          .from("galeri")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          setDaftarGaleri(data);
        } else {
          setDaftarGaleri(fallbackGaleri); // Pakai fallback jika Supabase kosong
        }
      } catch (err) {
        console.error("Gagal memuat galeri:", err);
        setDaftarGaleri(fallbackGaleri);
      } finally {
        setLoading(false);
      }
    }
    fetchGaleri();
  }, []);

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "60px 20px 100px 20px", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      
      <style dangerouslySetInnerHTML={{__html: `
        .galeri-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }
        .kartu-foto {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          height: 300px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          border: 1px solid #e2e8f0;
          background-color: #fff;
          cursor: pointer;
        }
        .kartu-foto:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(16, 185, 129, 0.2);
          border-color: #10b981;
        }
        .gambar-foto {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .kartu-foto:hover .gambar-foto {
          transform: scale(1.05);
        }
        .overlay-foto {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(2, 44, 34, 0.9) 0%, rgba(2, 44, 34, 0.4) 60%, transparent 100%);
          padding: 30px 20px 20px 20px;
          color: white;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .kartu-foto:hover .overlay-foto {
          opacity: 1;
        }
      `}} />

      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
        {/* Header Galeri */}
        <div style={{ textAlign: "center", marginBottom: "60px", animation: "fadeIn 0.8s ease" }}>
          <span style={{ color: "#10b981", fontWeight: "700", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase" }}>
            Dokumentasi Visual
          </span>
          <h1 style={{ color: "#064e3b", fontSize: "40px", fontWeight: "800", marginTop: "10px", marginBottom: "15px", letterSpacing: "-1px" }}>
            Galeri Kampus Alam
          </h1>
          <p style={{ color: "#64748b", maxWidth: "600px", margin: "0 auto", fontSize: "16px", lineHeight: "1.6" }}>
            Kumpulan memori, aksi nyata, dan jejak langkah pengabdian kami bersama alam dan masyarakat Tegalsari.
          </p>
          <div style={{ width: "60px", height: "4px", backgroundColor: "#10b981", margin: "25px auto 0 auto", borderRadius: "10px" }}></div>
        </div>

        {/* Grid Menampilkan Foto */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "50px", color: "#94a3b8", fontWeight: "600", fontSize: "18px", animation: "pulse 1.5s infinite" }}>
            Memuat Koleksi Foto...
          </div>
        ) : (
          <div className="galeri-grid">
            {daftarGaleri.map((item, idx) => (
              <div key={item.id || idx} className="kartu-foto" style={{ animation: `fadeIn 0.6s ease ${idx * 0.1}s backwards` }}>
                <img 
                  src={item.gambar || item.url} 
                  alt={item.judul || "Galeri KATI"} 
                  className="gambar-foto"
                  onError={(e) => {
                    // Jika file gagal dimuat, ganti dengan gambar alam acak (Placeholder)
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80";
                  }}
                />
                <div className="overlay-foto">
                  <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "700" }}>
                    {item.judul || item.caption || "Dokumentasi Kegiatan"}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}} />
    </div>
  );
}