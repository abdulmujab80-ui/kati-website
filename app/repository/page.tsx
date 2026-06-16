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
  tahun: number; // 🌟 1. Ditambahkan di dalam interface data
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
          .select("id, judul, penulis, rumpun_ilmu, kata_kunci, created_at, kati_id, tahun") // 🌟 2. Memanggil kolom 'tahun' di select query
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
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* ================= HEADER PORTAL JURNAL ================= */}
        <div className="border-b-4 border-[#053e2f] pb-6 mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-emerald-700 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Official Repository
            </span>
            <h1 className="text-2xl md:text-4xl font-serif font-black text-[#053e2f] tracking-tight leading-tight mt-3">
              KATI KNOWLADGE GARDEN
            </h1>
            <p className="text-sm md:text-base font-medium text-slate-600 font-serif italic mt-1">
              Jurnal Riset Kampus Alam Tegalsari Indonesia
            </p>
          </div>
          <div className="text-left md:text-right font-mono text-xs text-slate-500 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
            <div><span className="font-bold text-slate-700">E-ISSN:</span> 2477-XXXX</div>
            <div><span className="font-bold text-slate-700">P-ISSN:</span> 2477-YYYY</div>
            <div className="text-[10px] text-emerald-600 font-bold mt-1">● Terindeks Internal KATI Cloud</div>
          </div>
        </div>

        {/* ================= STRUKTUR 3 KOLOM ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ----------------- KOLOM KIRI (NAVIGASI) ----------------- */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Box 1: Search */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="bg-slate-50/80 px-4 py-3 border-b border-slate-200 flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-700">
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                Journal Content
              </div>
              <div className="p-4">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1.5">Cari Artikel</label>
                <input
                  type="text"
                  placeholder="Judul, penulis, kata kunci..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:border-[#10b981] transition-all bg-slate-50 focus:bg-white"
                />
              </div>
            </div>

            {/* Box 2: Categories */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="bg-slate-50/80 px-4 py-3 border-b border-slate-200 flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-700">
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7"></path></svg>
                Rumpun Keilmuan
              </div>
              <div className="p-2 flex flex-col gap-1">
                {daftarRumpun.map((rumpun) => (
                  <button
                    key={rumpun}
                    onClick={() => setSelectedRumpun(rumpun)}
                    className={`text-left text-sm px-3 py-2 rounded-lg transition-all flex items-center justify-between font-medium ${
                      selectedRumpun === rumpun
                        ? "bg-[#053e2f] text-white shadow-sm font-semibold"
                        : "text-slate-600 hover:bg-slate-100 hover:text-[#053e2f]"
                    }`}
                  >
                    <span>{rumpun === "Semua" ? "📋 Semua Bidang" : `${rumpun}`}</span>
                    {selectedRumpun === rumpun && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Box 3: Keywords */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="bg-slate-50/80 px-4 py-3 border-b border-slate-200 flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-700">
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M6 20n2 2h4l10.59-10.59a2 2 0 000-2.82L16.41 3.41a2 2 0 00-2.82 0L3 14v4a2 2 0 002 2z"></path></svg>
                Keywords Populer
              </div>
              <div className="p-4 flex flex-wrap gap-2">
                {["pengembangan", "penelitian", "penerapan"].map((tag, i) => (
                  <span 
                    key={tag} 
                    onClick={() => setSearchQuery(tag)}
                    className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md cursor-pointer hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* ----------------- KOLOM TENGAH (KONTEN UTAMA) ----------------- */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Profil Ringkas Jurnal */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="flex-1 text-sm w-full overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-slate-100"><td className="w-28 font-semibold py-2 text-slate-500 text-xs uppercase">Journal Title</td><td className="py-2 text-slate-800 font-medium">KATI Repository (Jurnal Riset Alam)</td></tr>
                    <tr className="border-b border-slate-100"><td className="font-semibold py-2 text-slate-500 text-xs uppercase">Initials</td><td className="py-2 text-slate-700 font-mono">KATI-REP</td></tr>
                    <tr className="border-b border-slate-100"><td className="font-semibold py-2 text-slate-500 text-xs uppercase">Frequency</td><td className="py-2 text-slate-700">Continuous Publication</td></tr>
                    <tr className="border-b border-slate-100"><td className="font-semibold py-2 text-slate-500 text-xs uppercase">Publisher</td><td className="py-2 text-[#053e2f] font-bold">Kampus Alam Tegalsari Indonesia</td></tr>
                    <tr><td className="font-semibold py-2 text-slate-500 text-xs uppercase">Focus Areas</td><td className="py-2 text-emerald-800 italic font-medium">Sustainability, Ecology, Local Wisdom</td></tr>
                  </tbody>
                </table>
              </div>
              
              {/* Mockup Cover Jurnal */}
              <div className="w-28 h-36 bg-[#053e2f] rounded-lg p-3 flex flex-col justify-between text-white text-center shadow-md border border-emerald-900 flex-shrink-0 transform hover:scale-105 transition-transform duration-300">
                <span className="text-[8px] font-mono tracking-widest border-b border-emerald-700 pb-1 opacity-75">VOL. 11 - 2026</span>
                <span className="text-xs font-serif font-black tracking-wide leading-tight my-auto">KATI<br/>REPO</span>
                <span className="text-[8px] text-emerald-300 opacity-75 tracking-tight">Malang, ID</span>
              </div>
            </div>

            {/* Deskripsi Pengantar */}
            <div className="bg-emerald-50/40 p-4 border-l-4 border-[#053e2f] rounded-r-xl">
              <p className="text-xs md:text-sm text-slate-700 leading-relaxed text-justify">
                <strong>KATI Repository</strong> adalah wadah publikasi ilmiah mandiri dan laporan riset aksi lapangan (*field-trip*) civitas akademika, relawan, serta mitra peneliti di lingkungan Kampus Alam Tegalsari Indonesia. Naskah berfokus pada solusi praktis pelestarian lingkungan hidup dan pemberdayaan masyarakat.
              </p>
            </div>

            {/* DAFTAR ISI ARCHIVE */}
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase text-[#053e2f] tracking-wider font-serif">
                  {selectedRumpun === "Semua" ? "Daftar Arsip Ilmiah Terbaru" : `Arsip: ${selectedRumpun}`}
                </h2>
                <span className="text-xs font-mono text-slate-400">Total: {filteredJurnal.length} Artikel</span>
              </div>

              {loading ? (
                <div className="text-center py-12 text-xs font-mono text-slate-500 animate-pulse bg-white border border-slate-200 rounded-xl shadow-sm">
                  Menghubungkan ke server arsip KATI...
                </div>
              ) : filteredJurnal.length === 0 ? (
                <div className="text-center py-12 text-sm text-slate-400 italic bg-white border border-dashed border-slate-300 rounded-xl">
                  Tidak ditemukan dokumen ilmiah dalam kategori atau pencarian ini.
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredJurnal.map((jurnal) => (
                    <div key={jurnal.id} className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-all duration-200 flex flex-col space-y-3 relative group">
                      
                      {/* Kode ID, Rumpun & Tahun */}
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-mono text-[#053e2f] font-bold bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          {jurnal.kati_id}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-[10px] font-bold uppercase tracking-wide bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                          {jurnal.rumpun_ilmu}
                        </span>
                        <span className="text-slate-300">•</span>
                        {/* 🌟 3. Menampilkan tahun rilis riset di baris metadata kartu */}
                        <span className="text-[11px] font-mono text-slate-500 font-bold bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                          Tahun: {jurnal.tahun}
                        </span>
                      </div>

                      {/* Judul Artikel */}
                      <Link href={`/repository/${jurnal.id}`} className="block">
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 leading-snug transition-colors">
                          {jurnal.judul}
                        </h3>
                      </Link>

                      {/* Penulis */}
                      <div className="text-xs text-slate-600 flex items-center gap-1">
                        <span className="text-slate-400 italic">Peneliti:</span> 
                        <span className="font-semibold text-slate-700">{jurnal.penulis}</span>
                      </div>

                      {/* Batas Bawah & Aksi */}
                      <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100 text-xs">
                        <div className="font-mono text-slate-400 text-[11px] truncate max-w-xs">
                          <span className="font-bold text-slate-500">Keys:</span> {jurnal.kata_kunci}
                        </div>
                        <Link
                          href={`/repository/${jurnal.id}`}
                          className="inline-flex items-center justify-center gap-1 font-bold text-[#053e2f] bg-slate-50 hover:bg-[#053e2f] hover:text-white px-3 py-2 rounded-lg border border-slate-200 group-hover:border-[#053e2f] transition-all whitespace-nowrap"
                        >
                          <span>Lihat Abstrak & PDF</span>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </Link>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* ----------------- KOLOM KANAN (SIDEBAR REDAKSI) ----------------- */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Menu Kebijakan Redaksi */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="bg-slate-50/80 px-4 py-3 border-b border-slate-200 flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-700">
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                Editorial Policies
              </div>
              <div className="divide-y divide-slate-100 flex flex-col text-xs font-semibold">
                {["Focus and Scope", "Publication Ethics", "Peer Review Process", "Screening for Plagiarism"].map((policy) => (
                  <span key={policy} className="px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-[#053e2f] transition-all cursor-pointer flex items-center justify-between group">
                    <span>{policy}</span>
                    <span className="text-slate-300 group-hover:text-slate-500 transition-colors">→</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Template Download */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="bg-[#053e2f] text-white px-4 py-2.5 font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2">
                <svg className="w-4 h-4 text-emerald-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                Article Template
              </div>
              <div className="p-4 text-center space-y-3">
                <p className="text-xs text-slate-500 leading-relaxed">
                  Naskah wajib mengikuti format standar penulisan KATI sebelum dikirim.
                </p>
                <a
                  href="https://drive.google.com/drive/folders/1kGyNqw6Vo5v1bHWsu525dovAiCu6rzcv?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-200 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/50 rounded-xl transition-all"
                >
                  <div className="w-10 h-12 bg-emerald-700 text-white font-extrabold text-[10px] flex items-center justify-center rounded-r-lg rounded-bl-lg relative group-hover:scale-105 transition-transform shadow-sm">
                    DOCX
                    <div className="absolute top-0 right-0 w-3 h-3 bg-emerald-900 rounded-bl-md"></div>
                  </div>
                  <span className="text-xs font-bold text-slate-700 group-hover:text-[#053e2f] mt-3">
                    Unduh Dokumen Panduan
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono mt-0.5">Word Format (.docx)</span>
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
              <Link
                href="/admin/repository"
                className="w-full bg-[#10b981] hover:bg-[#053e2f] text-white text-center py-3 px-4 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Kirim Naskah Riset</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
              </Link>
              <p className="text-[10px] text-slate-400 text-center mt-2 italic">
                *Khusus Reviewer & Admin internal KATI.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}