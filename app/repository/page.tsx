"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

// Inisialisasi Supabase
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

  const filteredJurnal = jurnalList.filter((jurnal) => {
    const matchSearch =
      jurnal.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      jurnal.penulis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      jurnal.kata_kunci.toLowerCase().includes(searchQuery.toLowerCase());

    const matchRumpun = selectedRumpun === "Semua" || jurnal.rumpun_ilmu === selectedRumpun;
    return matchSearch && matchRumpun;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-[#f8fafc] text-slate-800 min-h-screen">
      
      {/* HEADER UTAMA PORTAL JURNAL */}
      <div className="border-b-4 border-[#053e2f] pb-6 mb-10">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#053e2f] tracking-tight leading-snug">
          KATI-REP (JURNAL RISET KAMPUS ALAM TEGALSARI INDONESIA)
        </h1>
        <p className="text-sm text-slate-500 font-mono mt-3">
          E-ISSN: 2477-XXXX <span className="mx-2 text-slate-300">|</span> P-ISSN: 2477-YYYY <span className="mx-2 text-slate-300">|</span> Terindeks Internal KATI Cloud
        </p>
      </div>

      {/* SUSUNAN STRUKTUR 3 KOLOM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ================= KOLOM KIRI (NAVIGASI) ================= */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Box 1: Journal Content (Search) */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 font-bold text-xs uppercase tracking-widest text-slate-700">
              🔍 Journal Content
            </div>
            <div className="p-5">
              <label className="text-sm font-medium text-slate-600 block mb-2">Cari Artikel:</label>
              <input
                type="text"
                placeholder="Kata kunci / Peneliti..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#10b981] transition-all bg-slate-50 focus:bg-white"
              />
            </div>
          </div>

          {/* Box 2: Filter Rumpun Keilmuan (Browse) */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 font-bold text-xs uppercase tracking-widest text-slate-700">
              🌿 Rumpun Keilmuan
            </div>
            <div className="p-3 flex flex-col space-y-1">
              {daftarRumpun.map((rumpun) => (
                <button
                  key={rumpun}
                  onClick={() => setSelectedRumpun(rumpun)}
                  className={`text-left text-sm px-4 py-2.5 rounded-md transition-all font-medium ${
                    selectedRumpun === rumpun
                      ? "bg-[#10b981] text-white shadow-md font-bold"
                      : "text-slate-600 hover:bg-slate-100 hover:text-[#053e2f]"
                  }`}
                >
                  {rumpun === "Semua" ? "📋 Semua Bidang Kajian" : `• ${rumpun}`}
                </button>
              ))}
            </div>
          </div>

          {/* Box 3: Kata Kunci Populer (Keywords) */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 font-bold text-xs uppercase tracking-widest text-slate-700">
              🏷️ Keywords
            </div>
            <div className="p-5 flex flex-wrap gap-2.5 text-sm leading-loose">
              <span className="text-slate-400 cursor-pointer hover:underline text-xs">Agroforestri</span>
              <span className="text-slate-600 font-bold cursor-pointer hover:underline text-base">Konservasi</span>
              <span className="text-slate-500 cursor-pointer hover:underline text-sm">Permakultur</span>
              <span className="text-slate-400 cursor-pointer hover:underline text-xs">Kearifan Lokal</span>
              <span className="text-slate-600 font-medium cursor-pointer hover:underline text-sm">Tanah Kritis</span>
              <span className="text-slate-500 font-bold cursor-pointer hover:underline text-base">Edukasi Alam</span>
            </div>
          </div>

        </div>

        {/* ================= KOLOM TENGAH (KONTEN UTAMA) ================= */}
        <div className="lg:col-span-6 space-y-8">
          
          {/* Profil Ringkas Jurnal */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="flex-1 text-sm space-y-2 w-full">
              <table className="w-full table-fixed">
                <tbody>
                  <tr className="border-b border-slate-100"><td className="w-32 font-bold py-2 text-slate-700">Journal title</td><td className="py-2 text-slate-600">: KATI Repository (Jurnal Riset Alam)</td></tr>
                  <tr className="border-b border-slate-100"><td className="font-bold py-2 text-slate-700">Initials</td><td className="py-2 text-slate-600">: KATI-REP</td></tr>
                  <tr className="border-b border-slate-100"><td className="font-bold py-2 text-slate-700">Frequency</td><td className="py-2 text-slate-600">: Continuous Publication</td></tr>
                  <tr className="border-b border-slate-100"><td className="font-bold py-2 text-slate-700">Publisher</td><td className="py-2 text-[#053e2f] font-bold">: Kampus Alam Tegalsari Indonesia</td></tr>
                  <tr><td className="font-bold py-2 text-slate-700">Focus Areas</td><td className="py-2 text-emerald-700 italic">: Sustainability, Ecology, Local Wisdom</td></tr>
                </tbody>
              </table>
            </div>
            
            {/* Mockup Cover Jurnal */}
            <div className="w-full md:w-32 h-44 bg-[#053e2f] rounded-md p-3 flex flex-col justify-between text-white text-center shadow-lg border border-emerald-800 flex-shrink-0">
              <span className="text-[10px] font-mono tracking-widest border-b border-emerald-600 pb-1.5 opacity-80">VOL. 11 - 2026</span>
              <span className="text-sm font-serif font-black leading-snug my-auto">KATI<br/>REPOSITORY</span>
              <span className="text-[9px] text-emerald-300 opacity-80 tracking-wide">Malang, Indonesia</span>
            </div>
          </div>

          {/* Deskripsi Pengantar */}
          <div className="bg-emerald-50/50 p-5 border-l-4 border-[#053e2f] rounded-r-lg">
            <p className="text-sm text-slate-700 leading-loose text-justify">
              <strong>KATI Repository</strong> adalah wadah publikasi ilmiah mandiri dan laporan riset aksi field-trip yang diselenggarakan oleh civitas akademika, relawan, dan mitra peneliti di lingkungan Kampus Alam Tegalsari Indonesia. Naskah yang diterbitkan berfokus pada solusi praktis pelestarian lingkungan hidup dan pemberdayaan masyarakat.
            </p>
          </div>

          {/* DAFTAR ISI / TABLE OF CONTENTS */}
          <div className="space-y-5">
            <div className="border-b-2 border-slate-200 pb-3">
              <h2 className="text-base md:text-lg font-bold uppercase text-[#053e2f] tracking-wide font-serif">
                {selectedRumpun === "Semua" ? "Daftar Arsip Ilmiah Terbaru" : `Arsip Keilmuan: ${selectedRumpun}`}
              </h2>
            </div>

            {loading ? (
              <div className="text-center py-16 text-sm text-slate-500 font-mono animate-pulse bg-white border border-slate-100 rounded-lg">
                Menghubungkan ke server arsip KATI...
              </div>
            ) : filteredJurnal.length === 0 ? (
              <div className="text-center py-16 text-sm text-slate-500 italic bg-white border border-dashed border-slate-300 rounded-lg">
                Tidak ditemukan dokumen ilmiah dalam kategori atau pencarian ini.
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-lg divide-y divide-slate-100 shadow-sm overflow-hidden">
                {filteredJurnal.map((jurnal) => (
                  <div key={jurnal.id} className="p-6 hover:bg-slate-50 transition duration-200 flex flex-col space-y-3">
                    
                    {/* Kode ID & Rumpun */}
                    <div className="flex items-center gap-3 text-xs">
                      <span className="font-mono text-[#053e2f] font-bold bg-slate-100 px-2 py-1 rounded">{jurnal.kati_id}</span>
                      <span className="text-slate-300">|</span>
                      <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-100 font-semibold tracking-wide uppercase text-[10px]">
                        {jurnal.rumpun_ilmu}
                      </span>
                    </div>

                    {/* Judul Artikel */}
                    <Link href={`/repository/${jurnal.id}`} className="block group">
                      <h3 className="text-base md:text-lg font-bold text-slate-800 group-hover:text-[#10b981] leading-relaxed transition-colors">
                        {jurnal.judul}
                      </h3>
                    </Link>

                    {/* Penulis */}
                    <p className="text-sm text-slate-600">
                      <span className="italic text-slate-400">Peneliti:</span> <span className="font-semibold text-slate-700">{jurnal.penulis}</span>
                    </p>

                    {/* Aksi Cepat */}
                    <div className="pt-3 mt-1 flex flex-wrap justify-between items-center gap-4 border-t border-slate-50">
                      <span className="text-xs text-slate-400 font-mono">Keys: <span className="text-slate-500">{jurnal.kata_kunci}</span></span>
                      <Link
                        href={`/repository/${jurnal.id}`}
                        className="text-xs font-bold text-[#053e2f] bg-[#053e2f]/5 hover:bg-[#10b981] hover:text-white px-4 py-2 rounded-md transition-all"
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

        {/* ================= KOLOM KANAN (SIDEBAR REDAKSI) ================= */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Menu Kebijakan Redaksi */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 font-bold text-xs uppercase tracking-widest text-slate-700">
              📌 Editorial Policies
            </div>
            <div className="divide-y divide-slate-100 flex flex-col text-sm font-medium">
              <span className="px-5 py-3.5 text-slate-600 hover:bg-slate-50 hover:text-[#053e2f] hover:pl-6 transition-all cursor-pointer">Focus and Scope</span>
              <span className="px-5 py-3.5 text-slate-600 hover:bg-slate-50 hover:text-[#053e2f] hover:pl-6 transition-all cursor-pointer">Publication Ethics</span>
              <span className="px-5 py-3.5 text-slate-600 hover:bg-slate-50 hover:text-[#053e2f] hover:pl-6 transition-all cursor-pointer">Peer Review Process</span>
              <span className="px-5 py-3.5 text-slate-600 hover:bg-slate-50 hover:text-[#053e2f] hover:pl-6 transition-all cursor-pointer">Screening for Plagiarism</span>
            </div>
          </div>

          {/* TEMPAT DOWNLOAD TEMPLATE JURNAL */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-[#053e2f] text-white px-5 py-3 font-bold text-xs uppercase tracking-widest text-center">
              📄 Article Template
            </div>
            <div className="p-6 text-center space-y-4">
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Naskah riset wajib mengikuti format standar penulisan KATI. Silakan unduh dokumen panduan (*.docx) di bawah ini:
              </p>
              <a
                href="https://drive.google.com/drive/folders/1kGyNqw6Vo5v1bHWsu525dovAiCu6rzcv?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center p-5 border-2 border-dashed border-slate-300 hover:border-[#10b981] bg-slate-50 hover:bg-emerald-50 rounded-xl transition-all shadow-inner"
              >
                <div className="w-14 h-16 bg-emerald-700 text-white font-black text-sm flex items-center justify-center rounded-r-xl rounded-bl-xl relative group-hover:scale-105 transition-transform shadow-md">
                  DOCX
                  <div className="absolute top-0 right-0 w-4 h-4 bg-emerald-900 rounded-bl-lg"></div>
                </div>
                <span className="text-sm font-bold text-slate-700 group-hover:text-[#053e2f] mt-4">
                  Unduh Template
                </span>
                <span className="text-xs text-slate-500 mt-1">Format Word (.docx)</span>
              </a>
            </div>
          </div>

          {/* TOMBOL SUBMIT ARTIKEL BARU */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 font-bold text-xs uppercase tracking-widest text-slate-700">
              📥 Submit Your Article
            </div>
            <div className="p-5">
              <Link
                href="/admin/repository"
                className="w-full bg-[#10b981] hover:bg-[#053e2f] text-white text-center py-3.5 px-4 rounded-md text-sm font-bold tracking-widest uppercase transition-colors block shadow-md"
              >
                Kirim Naskah Riset 🚀
              </Link>
              <p className="text-xs text-slate-500 text-center mt-3 italic">
                *Khusus untuk Reviewer & Admin internal KATI.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}