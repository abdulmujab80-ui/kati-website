"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

// Inisialisasi Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ⚡ Update Rumpun Keilmuan Sesuai Permintaan
const daftarRumpun = [
  "Ekologi",
  "Pertanian",
  "Edukasi",
  "Teknologi",
  "Kebijakan",
  "Agama",
  "Budaya",
];

export default function AdminRepositoryPage() {
  const router = useRouter();
  
  // ================= STATE KEAMANAN SESI (AUTH) =================
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // ================= STATE FORM INPUT JURNAL =================
  const [loading, setLoading] = useState(false);
  const [pesan, setPesan] = useState({ sukses: false, teks: "" });
  const [formData, setFormData] = useState({
    judul: "",
    penulis: "",
    rumpun_ilmu: "Ekologi", 
    abstrak_id: "",
    abstrak_en: "",
    kata_kunci: "",
    google_drive_url: "",
    kati_id: "",
    tahun: new Date().getFullYear(), // 🌟 Nilai default tahun saat ini
  });

  // 🔒 Cek Sesi Login Admin Secara Real-time
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 🔑 Fungsi Login Admin
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    } catch (error: any) {
      setAuthError(error.message || "Email atau password admin salah!");
    } finally {
      setAuthLoading(false);
    }
  };

  // 🚪 Fungsi Logout Admin
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/repository");
  };

  // 📝 Handler Input Form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🚀 Handler Submit Jurnal
  const handleSubmitJurnal = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPesan({ sukses: false, teks: "" });

    try {
      // 🌟 Amankan tipe data tahun menjadi Number agar sinkron dengan integer di Supabase
      const dataToSubmit = {
        ...formData,
        tahun: Number(formData.tahun) || new Date().getFullYear()
      };

      const { error } = await supabase.from("repository").insert([dataToSubmit]);
      if (error) throw error;

      setPesan({ sukses: true, teks: "🎉 Dokumen ilmiah berhasil diterbitkan ke KATI Repository!" });
      
      // 🌟 Reset form setelah sukses (termasuk mengembalikan tahun ke tahun saat ini)
      setFormData({
        judul: "",
        penulis: "",
        rumpun_ilmu: "Ekologi",
        abstrak_id: "",
        abstrak_en: "",
        kata_kunci: "",
        google_drive_url: "",
        kati_id: "",
        tahun: new Date().getFullYear(),
      });

    } catch (error: any) {
      console.error(error);
      setPesan({ sukses: false, teks: `❌ Gagal: ${error.message || "Terjadi kesalahan sistem."}` });
    } finally {
      setLoading(false);
    }
  };

  // ================= 1. LAYAR LOADING PROTEKSI =================
  if (authLoading) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center font-mono text-xs text-slate-500 animate-pulse bg-white border rounded-xl shadow-sm">
        Memverifikasi enkripsi otoritas berkas KATI...
      </div>
    );
  }

  // ================= 2. PORTAL VERIFIKASI EMAIL (LOGIN) =================
  if (!session) {
    return (
      <div className="max-w-md mx-auto my-16 px-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-md">
          
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-rose-50 border border-rose-200 rounded-full flex items-center justify-center mx-auto mb-3 text-rose-600 text-lg">
              🔒
            </div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">KATI Repositori Portal</h1>
            <p className="text-xs text-slate-400 mt-1">Gunakan email editor resmi yang telah terdaftar di sistem.</p>
          </div>

          {authError && (
            <div className="p-3 bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold rounded-lg mb-4 text-center">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Email Resmi</label>
              <input
                type="email"
                required
                placeholder="nama@kampusalam.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#10b981] focus:outline-none text-slate-800"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Kata Sandi</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#10b981] focus:outline-none text-slate-800"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#053e2f] hover:bg-[#10b981] text-white rounded-lg text-xs font-bold tracking-wider uppercase transition shadow-sm"
            >
              Verifikasi Akses Masuk 🔑
            </button>
          </form>

        </div>
      </div>
    );
  }

  // ================= 3. TAMPILAN UTAMA INPUT DATA JURNAL =================
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 min-h-screen">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
        
        {/* Header Form & Info Akun */}
        <div className="mb-6 border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800">Panel Admin: KATI Repository</h1>
            <p className="text-xs text-emerald-600 font-medium mt-1">
              🟢 Terverifikasi sebagai: <span className="underline font-bold font-mono">{session.user.email}</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs px-3 py-1.5 border border-rose-200 hover:bg-rose-50 text-rose-600 rounded-lg font-bold transition self-start sm:self-center"
          >
            Keluar Panel 🚪
          </button>
        </div>

        {/* Notifikasi */}
        {pesan.teks && (
          <div className={`p-4 rounded-xl text-sm font-semibold mb-6 ${pesan.sukses ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-rose-50 text-rose-800 border border-rose-200"}`}>
            {pesan.teks}
          </div>
        )}

        {/* Form Input Data */}
        <form onSubmit={handleSubmitJurnal} className="space-y-5">
          
          {/* 🌟 Mengubah grid dari 2 kolom menjadi 3 kolom di tampilan desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase">Nomor Registrasi KATI ID</label>
              <input
                type="text"
                name="kati_id"
                required
                placeholder="Contoh: KATI-REP/2026/001"
                value={formData.kati_id}
                onChange={handleChange}
                className="w-full p-3 border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase">Rumpun Keilmuan</label>
              <select
                name="rumpun_ilmu"
                value={formData.rumpun_ilmu}
                onChange={handleChange}
                className="w-full p-3 border border-slate-300 rounded-lg text-sm bg-white text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                {daftarRumpun.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* 🌟 KOLOM BARU: Input Tahun Publikasi */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase">Tahun Publikasi</label>
              <input
                type="number"
                name="tahun"
                required
                min="1900"
                max="2100"
                placeholder="Contoh: 2026"
                value={formData.tahun}
                onChange={handleChange}
                className="w-full p-3 border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase">Judul Karya Ilmiah</label>
            <input
              type="text"
              name="judul"
              required
              placeholder="Masukkan judul lengkap naskah riset..."
              value={formData.judul}
              onChange={handleChange}
              className="w-full p-3 border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase">Nama Penulis & Afiliasi Kampus</label>
            <input
              type="text"
              name="penulis"
              required
              placeholder="Contoh: Faradis (KATI), Ahmad (UM), dkk."
              value={formData.penulis}
              onChange={handleChange}
              className="w-full p-3 border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase">Abstrak (Bahasa Indonesia)</label>
            <textarea
              name="abstrak_id"
              required
              rows={4}
              placeholder="Tulis ringkasan naskah dalam Bahasa Indonesia..."
              value={formData.abstrak_id}
              onChange={handleChange}
              className="w-full p-3 border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase">Abstract (English Version)</label>
            <textarea
              name="abstrak_en"
              required
              rows={4}
              placeholder="Tulis ringkasan naskah dalam Bahasa Inggris..."
              value={formData.abstrak_en}
              onChange={handleChange}
              className="w-full p-3 border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase">Kata Kunci (Keywords)</label>
            <input
              type="text"
              name="kata_kunci"
              required
              placeholder="Pisahkan dengan koma. Contoh: Agroforestri, Lahan Kritis, Tegalsari"
              value={formData.kata_kunci}
              onChange={handleChange}
              className="w-full p-3 border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase">URL Dokumen Penuh (Google Drive Cloud)</label>
            <input
              type="url"
              name="google_drive_url"
              required
              placeholder="https://drive.google.com/file/d/..."
              value={formData.google_drive_url}
              onChange={handleChange}
              className="w-full p-3 border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 text-white text-sm font-bold rounded-lg shadow transition ${loading ? "bg-slate-400 cursor-not-allowed" : "bg-[#053e2f] hover:bg-[#10b981]"}`}
            >
              {loading ? "Sedang Mengunggah Data..." : "Terbitkan Jurnal Ilmiah 🚀"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}