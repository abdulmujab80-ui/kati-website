"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

// Inisialisasi Supabase (Sesuaikan dengan instance proyekmu)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Jurnal {
  id: string;
  judul: string;
  penulis: string;
  rumpun_ilmu: string;
  kata_kunci: string;
  created_at: string;
  kati_id: string;
}

const daftarRumpun = [
  "Semua",
  "Ekologi",
  "Pertanian",
  "Edukasi",
  "Teknologi",
  "Kebijakan",
  "Agama",
  "Budaya",
];

export default function KativRepositoryPage() {
  const [jurnalList, setJurnalList] = useState<Jurnal[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRumpun, setSelectedRumpun] = useState("Semua");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJurnal() {
      try {
        const { data, error } = await supabase
          .from("repository")
          .select("id, judul, penulis, rumpun_ilmu, kata_kunci, created_at, kati_id")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data) setJurnalList(data);
      } catch (error) {
        console.error("Gagal memuat data repository:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchJurnal();
  }, []);

  // Filter pencarian dan rumpun ilmu
  const filteredJurnal = jurnalList.filter((jurnal) => {
    const matchSearch =
      jurnal.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      jurnal.penulis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      jurnal.kata_kunci.toLowerCase().includes(searchQuery.toLowerCase());

    const matchRumpun = selectedRumpun === "Semua" || jurnal.rumpun_ilmu === selectedRumpun;
    return matchSearch && matchRumpun;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-[#f8fafc] text-slate-800">
      
      {/* HEADER UTAMA PORTAL JURNAL */}
      <div className="border-b-4 border-[#053e2f] pb-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#053e2f] tracking-tight">
          KATI-REP (JURNAL RISET KAMPUS ALAM TEGALSARI INDONESIA)
        </h1>
        <p className="text-xs text-slate-500 font-mono mt-1">
          E-ISSN: 2477-XXXX | P-ISSN: 2477-YYYY | Terindeks Internal KATI Cloud
        </p>
      </div>

      {/* SUSUNAN STRUKTUR 3 KOLOM Khas OJS JURNAL (`image_a8d58f.jpg`) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ================= KOLOM KIRI (NAVIGASI PENCARIAN & KEYWORDS) ================= */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Box 1: Journal Content (Search) */}
          <div className="bg-white border border-slate-200 rounded shadow-sm">
            <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 font-bold text-xs uppercase tracking-wider text-slate-700">
              🔍 Journal Content
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="text-xs text-slate-500 block mb-1">Cari Artikel:</label>
                <input
                  type="text"
                  placeholder="Kata kunci / Peneliti..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#10b981]"
                />
              </div>
            </div>
          </div>

          {/* Box 2: Filter Rumpun Keilmuan (Browse) */}
          <div className="bg-white border border-slate-200 rounded shadow-sm">
            <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 font-bold text-xs uppercase tracking-wider text-slate-700">
              🌿 Rumpun Keilmuan
            </div>
            <div className="p-2 flex flex-col">
              {daftarRumpun.map((rumpun) => (
                <button
                  key={rumpun}
                  onClick={() => setSelectedRumpun(rumpun)}
                  className={`text-left text-xs px-3 py-2 rounded transition font-medium ${
                    selectedRumpun === rumpun
                      ? "bg-[#10b981] text-white font-bold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-[#053e2f]"
                  }`}
                >
                  {rumpun === "Semua" ? "📋 Semua Bidang Kajian" : `• ${rumpun}`}
                </button>
              ))}
            </div>
          </div>

          {/* Box 3: Kata Kunci Populer (Keywords Cloud) */}
          <div className="bg-white border border-slate-200 rounded shadow-sm">
            <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 font-bold text-xs uppercase tracking-wider text-slate-700">
              🏷️ Keywords
            </div>
            <div className="p-4 flex flex-wrap gap-1.5 text-xs">
              <span className="text-slate-400 cursor-pointer hover:underline text-[10px]">Agroforestri</span>
              <span className="text-slate-600 font-bold cursor-pointer hover:underline text-sm">Konservasi</span>
              <span className="text-slate-500 cursor-pointer hover:underline text-xs">Permakultur</span>
              <span className="text-slate-400 cursor-pointer hover:underline text-[11px]">Kearifan Lokal</span>
              <span className="text-slate-600 font-medium cursor-pointer hover:underline text-xs">Tanah Kritis</span>
              <span className="text-slate-500 font-bold cursor-pointer hover:underline text-sm">Edukasi Alam</span>
            </div>
          </div>

        </div>

        {/* ================= KOLOM TENGAH (INFORMASI UTAMA & DAFTAR ARTIKEL) ================= */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Profil Ringkas Jurnal (Bentuk Tabel sesuai image_a8d58f.jpg) */}
          <div className="bg-white border border-slate-200 rounded p-4 shadow-sm flex flex-col md:flex-row gap-4 items-start">
            <div className="flex-1 text-xs space-y-1.5">
              <table className="w-full table-fixed">
                <tbody>
                  <tr className="border-b border-slate-100"><td className="w-28 font-bold py-1">Journal title</td><td className="py-1">: KATI Repository (Jurnal Riset Alam)</td></tr>
                  <tr className="border-b border-slate-100"><td className="font-bold py-1">Initials</td><td className="py-1">: KATI-REP</td></tr>
                  <tr className="border-b border-slate-100"><td className="font-bold py-1">Frequency</td><td className="py-1">: Continuous Publication (Real-time)</td></tr>
                  <tr className="border-b border-slate-100"><td className="font-bold py-1">Publisher</td><td className="py-1 text-[#053e2f] font-semibold">: Kampus Alam Tegalsari Indonesia</td></tr>
                  <tr><td className="font-bold py-1">Focus Areas</td><td className="py-1 text-emerald-700 italic">: Sustainability, Ecology, Local Wisdom</td></tr>
                </tbody>
              </table>
            </div>
            {/* Mockup Cover Jurnal Kanan */}
            <div className="w-full md:w-28 h-36 bg-[#053e2f] rounded p-2 flex flex-col justify-between text-white text-center shadow border border-slate-300">
              <span className="text-[9px] font-mono tracking-widest border-b border-emerald-500 pb-1">VOL. 11 - 2026</span>
              <span className="text-xs font-serif font-black leading-tight my-auto">KATI REPOSITORY</span>
              <span className="text-[7px] text-emerald-300">Malang, Indonesia</span>
            </div>
          </div>

          {/* Deskripsi Pengantar */}
          <p className="text-xs text-slate-600 leading-relaxed text-justify bg-emerald-50/50 p-3 border-l-4 border-[#053e2f] rounded-r">
            <strong>KATI Repository</strong> adalah wadah publikasi ilmiah mandiri dan laporan riset aksi field-trip yang diselenggarakan oleh civitas akademika, relawan, dan mitra peneliti di lingkungan Kampus Alam Tegalsari Indonesia. Naskah yang diterbitkan berfokus pada solusi praktis pelestarian lingkungan hidup dan pemberdayaan masyarakat.
          </p>

          {/* DAFTAR ISI / TABLE OF CONTENTS */}
          <div className="space-y-3">
            <div className="border-b-2 border-slate-300 pb-1">
              <h2 className="text-sm font-bold uppercase text-slate-700 tracking-wide font-serif">
                {selectedRumpun === "Semua" ? "Daftar Arsip Ilmiah Terbaru" : `Arsip: ${selectedRumpun}`}
              </h2>
            </div>

            {loading ? (
              <div className="text-center py-10 text-xs text-slate-500 font-mono animate-pulse">
                Menghubungkan ke server arsip KATI...
              </div>
            ) : filteredJurnal.length === 0 ? (
              <div className="text-center py-10 text-xs text-slate-400 italic bg-white border border-dashed rounded">
                Tidak ditemukan dokumen ilmiah dalam kategori/pencarian ini.
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded divide-y divide-slate-100 shadow-sm">
                {filteredJurnal.map((jurnal) => (
                  <div key={jurnal.id} className="p-4 hover:bg-slate-50 transition space-y-1.5">
                    {/* Kode ID & Rumpun */}
                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="font-mono text-[#053e2f] font-bold">{jurnal.kati_id}</span>
                      <span className="text-slate-300">|</span>
                      <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 font-medium">
                        {jurnal.rumpun_ilmu}
                      </span>
                    </div>

                    {/* Judul Artikel */}
                    <Link href={`/repository/${jurnal.id}`} className="block group">
                      <h3 className="text-sm font-bold text-slate-800 group-hover:text-[#10b981] group-hover:underline leading-snug transition">
                        {jurnal.judul}
                      </h3>
                    </Link>

                    {/* Penulis */}
                    <p className="text-xs text-slate-600 font-medium italic">
                      Peneliti: <span className="text-slate-800 not-italic font-normal">{jurnal.penulis}</span>
                    </p>

                    {/* Aksi Cepat */}
                    <div className="pt-1 flex justify-between items-center">
                      <span className="text-[10px] text-slate-400">Kata kunci: {jurnal.kata_kunci}</span>
                      <Link
                        href={`/repository/${jurnal.id}`}
                        className="text-[11px] font-bold text-[#053e2f] hover:text-[#10b981] underline"
                      >
                        Lihat Abstrak & PDF 📄
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* ================= KOLOM KANAN (TEMPLATE JURNAL & SUBMIT ARTIKEL) ================= */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Menu Kebijakan Redaksi */}
          <div className="bg-white border border-slate-200 rounded shadow-sm text-xs font-medium">
            <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 font-bold text-xs uppercase tracking-wider text-slate-700">
              📌 Editorial Policies
            </div>
            <div className="divide-y divide-slate-100 flex flex-col">
              <span className="px-4 py-2.5 text-slate-600 hover:bg-slate-50 cursor-pointer">Focus and Scope</span>
              <span className="px-4 py-2.5 text-slate-600 hover:bg-slate-50 cursor-pointer">Publication Ethics</span>
              <span className="px-4 py-2.5 text-slate-600 hover:bg-slate-50 cursor-pointer">Peer Review Process</span>
              <span className="px-4 py-2.5 text-slate-600 hover:bg-slate-50 cursor-pointer">Screening for Plagiarism</span>
            </div>
          </div>

          {/* ⚡ KUNCI UTAMA: TEMPAT DOWNLOAD TEMPLATE JURNAL */}
          <div className="bg-white border border-slate-200 rounded shadow-sm">
            <div className="bg-[#053e2f] text-white px-4 py-2 font-bold text-xs uppercase tracking-wider text-center rounded-t">
              📄 Article Template
            </div>
            <div className="p-4 text-center space-y-3">
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Naskah riset wajib mengikuti format standar penulisan KATI. Silakan unduh dokumen panduan (*.docx) di bawah ini:
              </p>
              {/* Desain Tombol Berdasarkan Ikon Besar di Dokumen Contoh */}
              <a
                href="https://drive.google.com/drive/folders/1kGyNqw6Vo5v1bHWsu525dovAiCu6rzcv?usp=sharing" // Ganti dengan link berkas aslimu nanti
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 hover:border-[#10b981] bg-slate-50 hover:bg-emerald-50 rounded-xl transition shadow-inner"
              >
                {/* Visual Icon Word */}
                <div className="w-12 h-14 bg-emerald-700 text-white font-black text-xs flex items-center justify-center rounded-r-xl rounded-bl-xl relative group-hover:scale-105 transition shadow-md">
                  DOCX
                  <div className="absolute top-0 right-0 w-4 h-4 bg-emerald-900 rounded-bl-lg"></div>
                </div>
                <span className="text-xs font-bold text-slate-700 group-hover:text-[#053e2f] mt-3">
                  Unduh Template Jurnal
                </span>
                <span className="text-[10px] text-slate-400">Format Word (.docx)</span>
              </a>
            </div>
          </div>

          {/* ⚡ TOMBOL SUBMIT ARTIKEL BARU (Ke Form Admin) */}
          <div className="bg-white border border-slate-200 rounded shadow-sm">
            <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 font-bold text-xs uppercase tracking-wider text-slate-700">
              📥 Submit Your Article
            </div>
            <div className="p-4">
              <Link
                href="/admin/repository"
                className="w-full bg-[#10b981] hover:bg-[#053e2f] text-white text-center py-2.5 px-4 rounded text-xs font-bold tracking-wider uppercase transition block shadow-sm"
              >
                Kirim Naskah Riset 🚀
              </Link>
              <p className="text-[10px] text-slate-400 text-center mt-2">
                *Khusus untuk Reviewer & Admin internal KATI.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}