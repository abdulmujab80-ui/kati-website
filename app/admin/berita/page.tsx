"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

// Inisialisasi Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const daftarKategori = ["Kabar Pendopo", "Edukasi", "Konservasi", "Riset", "Pengabdian", "Ekowisata"];

export default function AdminBeritaPage() {
  // ==========================================
  // STATE UNTUK PORTAL EMAIL (LOGIN)
  // ==========================================
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  // ==========================================
  // STATE UNTUK FORM BERITA & UPLOAD GAMBAR
  // ==========================================
  const [judul, setJudul] = useState("");
  const [penulis, setPenulis] = useState("");
  const [kategori, setKategori] = useState(daftarKategori[0]);
  const [kontenLengkap, setKontenLengkap] = useState("");
  const [fileGambar, setFileGambar] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // CEK SESSION SAAT HALAMAN DIBUKA
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  // FUNGSI UNTUK LOGIN (PORTAL EMAIL)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error: any) {
      setAuthError("Email atau Password salah. Pastikan akun sudah terdaftar di Supabase.");
    } finally {
      setAuthLoading(false);
    }
  };

  // FUNGSI UNTUK LOGOUT
  const handleLogout = async () => await supabase.auth.signOut();

  // FUNGSI UNTUK UPLOAD BERITA & GAMBAR
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      let finalImageUrl = "";

      // 1. PROSES UPLOAD GAMBAR KE BUCKET 'gambar-berita'
      if (fileGambar) {
        const fileExt = fileGambar.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `covers/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('gambar-berita')
          .upload(filePath, fileGambar);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('gambar-berita')
          .getPublicUrl(filePath);

        finalImageUrl = publicUrlData.publicUrl;
      }

      // 2. INSERT DATA KE TABEL BERITA
      const { error } = await supabase.from("berita").insert([
        { 
          judul, 
          penulis, 
          kategori, 
          konten_lengkap: kontenLengkap, 
          gambar: finalImageUrl 
        },
      ]);
      
      if (error) throw error;

      setMessage({ text: "🎉 Berita & Gambar berhasil diterbitkan!", type: "success" });
      
      // KOSONGKAN FORM SETELAH BERHASIL
      setJudul(""); setPenulis(""); setKategori(daftarKategori[0]); setKontenLengkap(""); 
      setFileGambar(null);
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = "";

    } catch (error: any) {
      setMessage({ text: `❌ Gagal: ${error.message}`, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // TAMPILAN 1: PORTAL LOGIN EMAIL (JIKA BELUM LOGIN)
  // ==========================================
  if (!session) {
    return (
      <div className="min-h-screen bg-[#f4fdf8] flex flex-col items-center justify-center px-4 font-sans relative overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl border border-emerald-50 relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
              <span className="text-3xl">🛡️</span>
            </div>
            <h1 className="text-2xl font-black text-[#053e2f] tracking-tight">Portal Verifikasi</h1>
            <p className="text-sm text-slate-500 mt-2 font-medium">Silakan masukkan email admin KATI Anda.</p>
          </div>

          {authError && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100 text-center">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase mb-2 tracking-wider">Alamat Email</label>
              <input 
                type="email" 
                required 
                placeholder="admin@kati.id"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full p-3.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 focus:bg-white transition-all" 
              />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase mb-2 tracking-wider">Kata Sandi</label>
              <input 
                type="password" 
                required 
                placeholder="••••••••"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full p-3.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 focus:bg-white transition-all" 
              />
            </div>
            <button 
              type="submit" 
              disabled={authLoading} 
              className={`w-full py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-all shadow-md mt-2 ${
                authLoading ? "bg-slate-300 text-slate-500" : "bg-[#053e2f] hover:bg-[#10b981] text-white hover:shadow-lg hover:-translate-y-0.5"
              }`}
            >
              {authLoading ? "Membuka Portal..." : "Masuk ke Sistem"}
            </button>
          </form>
          
          <div className="mt-8 text-center">
             <Link href="/" className="text-xs font-bold text-slate-400 hover:text-emerald-600 transition-colors">
               &larr; Kembali ke Beranda Utama
             </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // TAMPILAN 2: FORM UPLOAD BERITA (JIKA SUDAH LOGIN)
  // ==========================================
  return (
    <div className="min-h-screen bg-[#f8fafc] py-10 px-4 flex justify-center font-sans">
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        
        {/* Header Admin Terverifikasi */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-slate-200 gap-4">
          <div>
            <h1 className="text-2xl font-black text-[#053e2f] tracking-tight">Panel Admin: Portal Berita</h1>
            <p className="text-xs text-emerald-600 mt-1 font-bold flex items-center gap-1.5 bg-emerald-50 inline-block px-2 py-1 rounded-md">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
              Akses Email: {session.user.email}
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button onClick={handleLogout} className="flex-1 md:flex-none text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-lg transition-colors border border-slate-200">
              Keluar (Logout)
            </button>
            <Link href="/berita" className="flex-1 md:flex-none text-center text-xs font-bold text-white bg-red-500 hover:bg-red-600 px-4 py-2.5 rounded-lg transition-colors shadow-sm">
              Lihat Portal 📰
            </Link>
          </div>
        </div>

        {message.text && (
          <div className={`p-4 mb-6 rounded-lg text-sm font-bold border ${message.type === "success" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-red-50 text-red-700 border-red-200"}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase mb-2 tracking-wider">Judul Berita</label>
            <input type="text" required value={judul} onChange={(e) => setJudul(e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
          </div>
          
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase mb-2 tracking-wider">Penulis / Redaksi</label>
            <input type="text" required value={penulis} onChange={(e) => setPenulis(e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase mb-2 tracking-wider">Kategori Spesifik</label>
              <select value={kategori} onChange={(e) => setKategori(e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                {daftarKategori.map((kat) => <option key={kat} value={kat}>{kat}</option>)}
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase mb-2 tracking-wider">Upload Cover Gambar</label>
              <input 
                id="file-upload"
                type="file" 
                accept="image/*"
                required
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setFileGambar(e.target.files[0]);
                  }
                }}
                className="w-full p-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-[#053e2f] file:text-white hover:file:bg-[#10b981] transition cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-700 uppercase mb-2 tracking-wider">Konten Lengkap Berita</label>
            <textarea required rows={8} value={kontenLengkap} onChange={(e) => setKontenLengkap(e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none leading-relaxed"></textarea>
          </div>
          
          <button type="submit" disabled={loading} className={`w-full py-4 rounded-xl text-sm font-black tracking-widest uppercase transition-all shadow-md ${loading ? "bg-slate-400 text-white" : "bg-[#053e2f] hover:bg-[#10b981] text-white hover:-translate-y-0.5 hover:shadow-lg"}`}>
            {loading ? "Mengupload Data & Gambar..." : "🚀 Terbitkan Berita Sekarang"}
          </button>
        </form>
      </div>
    </div>
  );
}