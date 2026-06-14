"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

// Inisialisasi Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Berita {
  id: number;
  judul: string;
  kategori: string;
  konten_lengkap: string;
  gambar: string;
  penulis: string;
  created_at: string;
  views: number;
}

const daftarKategori = [
  "Semua",
  "Kabar Pendopo",
  "Edukasi",
  "Konservasi",
  "Riset",
  "Pengabdian",
  "Ekowisata",
];

export default function PortalBeritaPage() {
  const [beritaList, setBeritaList] = useState<Berita[]>([]);
  const [selectedKategori, setSelectedKategori] = useState("Semua");
  const [loading, setLoading] = useState(true);

  // Mengambil data dari Supabase
  useEffect(() => {
    async function fetchBerita() {
      try {
        const { data, error } = await supabase
          .from("berita")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data) setBeritaList(data);
      } catch (error) {
        console.error("Gagal memuat berita:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBerita();
  }, []);

  // Filter berita berdasarkan kategori yang dipilih
  const filteredBerita = beritaList.filter((berita) => {
    if (selectedKategori === "Semua") return true;
    return berita.kategori === selectedKategori;
  });

  // Fungsi untuk memotong teks (membuat ringkasan otomatis)
  const buatRingkasan = (teks: string, panjang: number) => {
    if (!teks) return "";
    return teks.length > panjang ? teks.substring(0, panjang) + "..." : teks;
  };

  // Format Tanggal
  const formatTanggal = (tanggalIso: string) => {
    const date = new Date(tanggalIso);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#f4fdf8] pb-20">
      
      {/* HEADER HERO SECTION */}
      <div className="bg-[#053e2f] text-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Berita & Aksi</h1>
        <p className="text-emerald-100 text-lg max-w-2xl mx-auto font-medium">
          Jendela informasi aksi, edukasi, dan pelestarian lingkungan di sekitar Kampus Alam Tegalsari Indonesia.
        </p>
      </div>

      {/* FILTER KATEGORI */}
      <div className="max-w-7xl mx-auto px-4 mt-8 mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {daftarKategori.map((kategori) => (
            <button
              key={kategori}
              onClick={() => setSelectedKategori(kategori)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm uppercase transition-all shadow-sm ${
                selectedKategori === kategori
                  ? "bg-[#10b981] text-white ring-2 ring-offset-2 ring-[#10b981]/50"
                  : "bg-white text-[#053e2f] hover:bg-emerald-50 hover:text-emerald-700"
              }`}
            >
              {kategori}
            </button>
          ))}
        </div>
      </div>

      {/* KONTEN GRID BERITA */}
      <div className="max-w-7xl mx-auto px-4">
        {loading ? (
          // Loading State
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#10b981]"></div>
          </div>
        ) : filteredBerita.length === 0 ? (
          // Empty State
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
            <span className="text-4xl block mb-4">🍃</span>
            <h3 className="text-xl font-bold text-slate-700">Belum ada kabar di kategori ini</h3>
            <p className="text-slate-500 mt-2">Nantikan *update* terbaru dari kami ya!</p>
          </div>
        ) : (
          // Grid Data
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBerita.map((berita) => (
              <div key={berita.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col">
                
                {/* Gambar Thumbnail */}
                <div className="h-56 overflow-hidden relative bg-slate-200">
                  <img
                    src={berita.gambar || "https://via.placeholder.com/600x400?text=KATI+Image"}
                    alt={berita.judul}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Badge Kategori */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#053e2f] text-xs font-black uppercase px-3 py-1.5 rounded-md shadow-sm">
                    {berita.kategori}
                  </div>
                </div>

                {/* Body Konten */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Info Meta */}
                  <div className="flex items-center text-xs text-slate-500 mb-3 gap-3 font-medium">
                    <span className="flex items-center gap-1">
                      📅 {formatTanggal(berita.created_at)}
                    </span>
                    <span className="flex items-center gap-1">
                      ✍️ {berita.penulis || "Admin KATI"}
                    </span>
                  </div>

                  {/* Judul */}
                  <h2 className="text-xl font-bold text-slate-800 mb-3 leading-snug group-hover:text-[#10b981] transition-colors line-clamp-2">
                    {berita.judul}
                  </h2>

                  {/* Ringkasan Konten (diambil dari konten lengkap) */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3 text-justify">
                    {buatRingkasan(berita.konten_lengkap, 120)}
                  </p>

                  {/* Tombol Baca Selengkapnya */}
                  <Link
                    href={`/berita/${berita.id}`}
                    className="mt-auto block w-full text-center bg-slate-50 hover:bg-[#10b981] text-[#053e2f] hover:text-white font-bold py-3 rounded-xl transition-colors text-sm border border-slate-100 hover:border-transparent"
                  >
                    Baca Selengkapnya &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}