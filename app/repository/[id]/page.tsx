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
          .select("*")
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
    <div className="max-w-5xl mx-auto px-4 py-8 bg-[#f8fafc] text-slate-800 min-h-screen">
      
      {/* Tombol Kembali */}
      <Link href="/repository" className="inline-block mb-6 text-sm font-bold text-slate-500 hover:text-[#053e2f] transition">
        &larr; Kembali ke Daftar Arsip
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* KOLOM KIRI: INFO UTAMA & ABSTRAK */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border-t-4 border-t-[#053e2f] border border-slate-200 rounded p-6 shadow-sm">
            
            {/* Header Judul */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest">
                  {jurnal.rumpun_ilmu}
                </span>
                <span className="text-xs font-mono text-slate-400 font-bold">
                  {jurnal.kati_id}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-serif font-black text-slate-800 leading-snug mb-3">
                {jurnal.judul}
              </h1>
              <p className="text-sm font-medium text-slate-600 italic">
                Peneliti: <span className="not-italic font-bold text-slate-800">{jurnal.penulis}</span>
              </p>
            </div>

            <hr className="border-slate-100 my-6" />

            {/* Abstrak ID */}
            <div className="mb-6">
              <h2 className="text-sm font-bold text-[#053e2f] uppercase tracking-wider mb-2">Abstrak</h2>
              <p className="text-sm text-slate-700 leading-relaxed text-justify">
                {jurnal.abstrak_id}
              </p>
            </div>

            {/* Abstrak EN */}
            <div className="mb-6">
              <h2 className="text-sm font-bold text-[#053e2f] uppercase tracking-wider mb-2">Abstract</h2>
              <p className="text-sm text-slate-700 leading-relaxed text-justify italic">
                {jurnal.abstrak_en}
              </p>
            </div>

            {/* Keywords */}
            <div>
              <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Kata Kunci / Keywords:</h3>
              <p className="text-xs text-slate-700 font-medium">{jurnal.kata_kunci}</p>
            </div>
            
          </div>
        </div>

        {/* KOLOM KANAN: PANEL DOWNLOAD G-DRIVE */}
        <div className="lg:col-span-4 space-y-4">
          
          <div className="bg-white border border-slate-200 rounded shadow-sm sticky top-6">
            <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 font-bold text-xs uppercase tracking-wider text-slate-700">
              📥 Akses Naskah Penuh
            </div>
            <div className="p-5 text-center">
              
              {/* Ikon PDF Besar */}
              <div className="w-16 h-20 bg-rose-600 text-white font-black text-sm flex items-center justify-center mx-auto rounded-r-xl rounded-bl-xl relative mb-4 shadow-md">
                PDF
                <div className="absolute top-0 right-0 w-5 h-5 bg-rose-800 rounded-bl-lg"></div>
              </div>
              
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Naskah lengkap tersedia dan disimpan secara aman di cloud KATI. Silakan unduh dokumen untuk membaca selengkapnya.
              </p>

              {/* Tombol Download ke Google Drive */}
              <a
                href={jurnal.google_drive_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#10b981] hover:bg-[#053e2f] text-white py-3 rounded-lg text-sm font-bold tracking-widest uppercase transition shadow"
              >
                Unduh PDF
              </a>
              
              <p className="text-[10px] text-slate-400 mt-3 font-mono">
                Diunggah pada: {new Date(jurnal.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}