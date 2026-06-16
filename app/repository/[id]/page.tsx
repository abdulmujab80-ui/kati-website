"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation"; // ⚡ INI KUNCI UTAMANYA
import { createClient } from "@supabase/supabase-js";

// Inisialisasi Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface JurnalDetail {
  id: string;
  judul: string;
  penulis: string;
  rumpun_ilmu: string;
  abstrak_id: string;
  abstrak_en: string;
  kata_kunci: string;
  google_drive_url: string;
  kati_id: string;
  created_at: string;
  tahun: number; // 🌟 Sudah aman terdaftar di interface
}

export default function DetailJurnalPage() {
  const params = useParams(); 
  const id = params?.id as string; // ⚡ Menangkap ID unik dari URL browser

  const [jurnal, setJurnal] = useState<JurnalDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Jangan jalankan query kalau ID-nya belum terbaca
    if (!id) return;

    async function fetchDetail() {
      try {
        const { data, error } = await supabase
          .from("repository") // ⚠️ Pastikan nama tabelmu benar (repository / repositori)
          .select("*") // ⚡ Mengambil semua kolom termasuk 'tahun' otomatis
          .eq("id", id)
          .single();

        if (error) throw error;
        if (data) setJurnal(data);
      } catch (error) {
        console.error("Gagal memuat detail jurnal:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center font-mono text-sm text-slate-500 animate-pulse">
        Mengambil data arsip dari brankas KATI...
      </div>
    );
  }

  if (!jurnal) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <h1 className="text-xl font-bold text-slate-800 mb-2">Dokumen Tidak Ditemukan</h1>
        <p className="text-xs text-slate-500 mb-4">Pastikan ID dokumen benar atau data belum dihapus.</p>
        <Link href="/repository" className="text-[#10b981] hover:underline text-sm font-bold">
          &larr; Kembali ke Daftar Repositori
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased font-sans">
      <div className="max-w-5xl mx-auto px-4 py-10">
        
        {/* Tombol Kembali */}
        <Link href="/repository" className="inline-flex items-center gap-2 mb-6 text-sm font-bold text-slate-500 hover:text-[#053e2f] transition group">
          <span className="transform group-hover:-translate-x-1 transition-transform">&larr;</span> Kembali ke Daftar Arsip
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ================= KOLOM KIRI: INFO UTAMA & ABSTRAK ================= */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border-t-4 border-t-[#053e2f] border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm">
              
              {/* Header Judul & Metadata */}
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {jurnal.rumpun_ilmu}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs font-mono text-slate-600 font-bold bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    ID: {jurnal.kati_id}
                  </span>
                  <span className="text-slate-300">•</span>
                  {/* 🌟 PENEMPATAN TAHUN 1: Metadata Atas */}
                  <span className="text-xs font-mono text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Tahun Publikasi: {jurnal.tahun}
                  </span>
                </div>

                <h1 className="text-2xl md:text-3xl font-serif font-black text-slate-900 leading-snug mb-4">
                  {jurnal.judul}
                </h1>
                
                <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="italic text-slate-400">Peneliti:</span> 
                  <span className="font-bold text-slate-800">{jurnal.penulis}</span>
                </div>
              </div>

              <hr className="border-slate-100 my-6" />

              {/* Abstrak ID */}
              <div className="mb-8">
                <h2 className="text-xs font-bold text-[#053e2f] uppercase tracking-widest mb-3 border-b border-slate-100 pb-1 flex items-center gap-1.5">
                  <span>Abstrak</span>
                  <span className="text-[10px] text-slate-400 font-normal normal-case">(Bahasa Indonesia)</span>
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed text-justify font-sans">
                  {jurnal.abstrak_id}
                </p>
              </div>

              {/* Abstrak EN */}
              <div className="mb-8">
                <h2 className="text-xs font-bold text-[#053e2f] uppercase tracking-widest mb-3 border-b border-slate-100 pb-1 flex items-center gap-1.5">
                  <span>Abstract</span>
                  <span className="text-[10px] text-slate-400 font-normal normal-case">(English)</span>
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed text-justify italic font-sans">
                  {jurnal.abstrak_en}
                </p>
              </div>

              {/* Keywords */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Kata Kunci / Keywords</h3>
                <p className="text-xs text-emerald-800 font-semibold bg-emerald-50/50 inline-block px-3 py-1.5 rounded-md border border-emerald-100/60">
                  {jurnal.kata_kunci}
                </p>
              </div>
              
            </div>
          </div>

          {/* ================= KOLOM KANAN: PANEL DOWNLOAD G-DRIVE ================= */}
          <div className="lg:col-span-4">
            
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm sticky top-6 overflow-hidden">
              <div className="bg-slate-50/80 px-4 py-3 border-b border-slate-200 font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                Akses Naskah Penuh
              </div>
              <div className="p-6 text-center">
                
                {/* Ikon PDF Modern */}
                <div className="w-14 h-16 bg-rose-600 text-white font-black text-xs flex items-center justify-center mx-auto rounded-r-lg rounded-bl-lg relative mb-4 shadow transform hover:scale-105 transition-transform duration-300">
                  PDF
                  <div className="absolute top-0 right-0 w-4 h-4 bg-rose-800 rounded-bl-md"></div>
                </div>
                
                <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                  Naskah lengkap tersedia dan disimpan secara aman di cloud KATI. Silakan unduh dokumen untuk membaca analisis penuh.
                </p>

                {/* Tombol Download ke Google Drive */}
                <a
                  href={jurnal.google_drive_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full bg-[#10b981] hover:bg-[#053e2f] text-white py-3 rounded-lg text-xs font-bold tracking-widest uppercase transition-colors shadow-sm"
                >
                  <span>Unduh Dokumen PDF</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                </a>
                
                {/* Panel Info Tanggal & Tahun */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col gap-1 text-[11px] font-mono text-slate-400 text-left bg-slate-50/50 p-3 rounded-lg">
                  <div>
                    <span className="font-bold text-slate-500">Periode Riset:</span> {jurnal.tahun}
                  </div>
                  <div>
                    <span className="font-bold text-slate-500">Tanggal Rilis:</span> {new Date(jurnal.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}