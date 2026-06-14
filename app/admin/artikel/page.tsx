"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; 
import { useRouter } from "next/navigation";

export default function AdminArtikel() {
  const router = useRouter();

  // ================= STATE KEAMANAN SESI (AUTH) =================
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true); // Loading awal cek sesi
  const [loginLoading, setLoginLoading] = useState(false); // Loading saat klik tombol masuk
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // ================= STATE FORM ARTIKEL =================
  const [namaPenulis, setNamaPenulis] = useState("");
  const [topik, setTopik] = useState("");
  const [kategori, setKategori] = useState("Sudut Teduh");
  const [waktuBaca, setWaktuBaca] = useState("");
  const [judul, setJudul] = useState("");
  const [intisari, setIntisari] = useState("");
  const [kontenLengkap, setKontenLengkap] = useState("");
  const [fileGambar, setFileGambar] = useState<File | null>(null); 
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setLoginLoading(true);
    setAuthError("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    } catch (error: any) {
      setAuthError(error.message || "Email atau kata sandi admin salah!");
    } finally {
      setLoginLoading(false);
    }
  };

  // 🚪 Fungsi Logout Admin
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/artikel"); // Arahkan kembali ke halaman baca setelah keluar
  };

  // 🚀 Handler Submit Artikel
  const handlePublish = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!fileGambar) {
    alert("⚠️ Harap pilih foto sampul artikel terlebih dahulu!");
    return;
  }

  // 👇 TAMBAHKAN BATASAN UKURAN FILE DI SINI (Misal: Maksimal 2MB)
  const UKURAN_MAKSIMAL = 2 * 1024 * 1024; // 2 MegaByte
  if (fileGambar.size > UKURAN_MAKSIMAL) {
    alert("⚠️ File terlalu besar! Maksimal ukuran gambar adalah 2MB. Silakan kompres foto Anda terlebih dahulu.");
    return; // Batalkan proses jika over
  }

  setIsSubmitting(true);
  // ... sisa kode upload ke storage dan insert database di bawahnya ...

    setIsSubmitting(true);

    try {
      const fileExt = fileGambar.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      // 1. Upload file fisik foto ke Storage Bucket
      const { error: uploadError } = await supabase.storage
        .from("gambar-artikel")
        .upload(fileName, fileGambar);

      if (uploadError) throw uploadError;

      // 2. Ambil URL Publik dari foto yang baru di-upload
      const { data: publicUrlData } = supabase.storage
        .from("gambar-artikel")
        .getPublicUrl(fileName);
        
      const imageUrl = publicUrlData.publicUrl;

      // 3. Simpan link URL tersebut ke tabel artikel database (views mulai dari 0)
      const { error: dbError } = await supabase
        .from("artikel")
        .insert([
          { 
            nama_penulis: namaPenulis,
            topik: topik,
            kategori: kategori,
            waktu_baca: waktuBaca,
            judul: judul, 
            intisari: intisari,
            konten_lengkap: kontenLengkap, 
            gambar: imageUrl,
            views: 0
          }
        ]);

      if (dbError) throw dbError;

      alert("✅ Berhasil! Artikel gagasan lingkungan hidup telah tayang.");
      
      // Reset Form
      setNamaPenulis("");
      setTopik("");
      setWaktuBaca("");
      setJudul("");
      setIntisari("");
      setKontenLengkap("");
      setFileGambar(null);

    } catch (error: any) {
      alert("❌ Terjadi kesalahan: " + error.message);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const globalStyle = { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' };

  // ⏳ TAMPILAN SAAT MEMUAT SESI AWAL
  if (authLoading) {
    return (
      <div style={{ ...globalStyle, minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f4fbf7" }}>
        <p style={{ color: "#064e3b", fontWeight: "bold" }}>Memeriksa keamanan sesi...</p>
      </div>
    );
  }

  // 1. PORTAL VERIFIKASI PREMIUM (JIKA BELUM LOGIN)
  if (!session) {
    return (
      <div style={{ 
        ...globalStyle,
        minHeight: "100vh", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "#f4fbf7", 
        padding: "20px",
        boxSizing: "border-box"
      }}>
        
        <style dangerouslySetInnerHTML={{ __html: `
          .input-portal-kati {
            width: 100%;
            padding: 16px;
            font-size: 15px;
            border: 1.5px solid #e2e8f0;
            border-radius: 12px;
            background-color: #f8fafc;
            color: #0f172a;
            outline: none;
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            box-sizing: border-box;
          }
          .input-portal-kati:focus {
            border-color: #10b981 !important;
            background-color: #ffffff !important;
            box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.12);
          }
          .tombol-portal-kati {
            width: 100%;
            background-color: #064e3b;
            color: white;
            border: none;
            padding: 16px;
            font-size: 14px;
            font-weight: 700;
            letter-spacing: 0.5px;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .tombol-portal-kati:hover:not(:disabled) {
            background-color: #022c22;
            transform: translateY(-1px);
            box-shadow: 0 10px 20px -5px rgba(6, 78, 59, 0.25);
          }
          .tombol-portal-kati:disabled {
            background-color: #94a3b8;
            cursor: not-allowed;
          }
        `}} />

        <div style={{ 
          backgroundColor: "#ffffff", 
          padding: "50px 40px", 
          borderRadius: "24px", 
          boxShadow: "0 20px 40px -15px rgba(0,0,0,0.05)", 
          maxWidth: "440px", 
          width: "100%", 
          textAlign: "center",
          border: "1px solid #eef6f1"
        }}>
          
          <div style={{ 
            width: "64px", 
            height: "64px", 
            backgroundColor: "#d1fae5", 
            borderRadius: "50%", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            margin: "0 auto 24px auto" 
          }}>
            <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0L2 4V13C2 19.2 6.3 24.9 12 26.5C17.7 24.9 22 19.2 22 13V4L12 0Z" fill="#047857"/>
            </svg>
          </div>

          <h2 style={{ color: "#022c22", margin: "0 0 8px 0", fontSize: "26px", fontWeight: "800", letterSpacing: "-0.5px" }}>
            Portal Verifikasi
          </h2>
          <p style={{ color: "#64748b", fontSize: "14.5px", marginBottom: "32px", lineHeight: "1.5", fontWeight: "500" }}>
            Silakan masukkan email dan kata sandi admin KATI Anda untuk mengakses sistem.
          </p>

          {authError && (
            <div style={{ 
              backgroundColor: "#fef2f2", 
              color: "#991b1b", 
              padding: "14px 16px", 
              borderRadius: "10px", 
              fontSize: "13.5px", 
              marginBottom: "24px", 
              textAlign: "left", 
              fontWeight: "500", 
              border: "1px solid #fee2e2",
              lineHeight: "1.4"
            }}>
              ⚠️ {authError}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ textAlign: "left" }}>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "11px", fontWeight: "800", color: "#334155", letterSpacing: "1px", marginBottom: "8px" }}>
                ALAMAT EMAIL RESMI
              </label>
              <input 
                type="email" 
                className="input-portal-kati"
                placeholder="nama@kati.id" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                disabled={loginLoading}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "11px", fontWeight: "800", color: "#334155", letterSpacing: "1px", marginBottom: "8px" }}>
                KATA SANDI
              </label>
              <input 
                type="password" 
                className="input-portal-kati"
                placeholder="••••••••" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                disabled={loginLoading}
              />
            </div>
            
            <button type="submit" className="tombol-portal-kati" disabled={loginLoading}>
              {loginLoading ? "MEMVERIFIKASI..." : "MASUK KE SISTEM"}
            </button>
          </form>

          <div style={{ marginTop: "32px", borderTop: "1px solid #f1f5f9", paddingTop: "20px" }}>
            <a href="/artikel" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "13px", fontWeight: "600", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = '#064e3b'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
              ← Kembali ke Ruang Baca Utama
            </a>
          </div>

        </div>
      </div>
    );
  }

  // 2. FORM UTAMA ARTIKEL (TAMPIL JIKA LOGIN BERHASIL / ADA SESI)
  return (
    <div style={{ ...globalStyle, maxWidth: "650px", margin: "40px auto", padding: "40px", backgroundColor: "white", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", border: "1px solid #f1f5f9" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <h2 style={{ color: "#064e3b", margin: 0, fontSize: "24px", fontWeight: "800" }}>Ruang Penulis KATI</h2>
            <span style={{ backgroundColor: "#dcfce7", color: "#15803d", fontSize: "11px", fontWeight: "bold", padding: "3px 8px", borderRadius: "20px" }}>Sesi Aktif</span>
          </div>
          <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>Akun Anda terverifikasi. Silakan publikasikan wawasan lingkungan hidup terbaru.</p>
        </div>
        
        {/* Tombol Logout */}
        <button onClick={handleLogout} style={{ backgroundColor: "#ef4444", color: "white", border: "none", padding: "6px 14px", borderRadius: "6px", fontSize: "12px", fontWeight: "bold", cursor: "pointer" }}>
          Keluar Sesi
        </button>
      </div>
      
      <form onSubmit={handlePublish} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        
        {/* Nama Penulis & Topik */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "bold", color: "#1e293b" }}>Nama Penulis</label>
            <input placeholder="Contoh: Tim Riset KATI" value={namaPenulis} onChange={(e) => setNamaPenulis(e.target.value)} required style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "bold", color: "#1e293b" }}>Nama Topik (Tag)</label>
            <input placeholder="Contoh: EKOLOGI" value={topik} onChange={(e) => setTopik(e.target.value)} required style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
          </div>
        </div>

        {/* Kategori Utama & Estimasi Waktu Baca */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "bold", color: "#1e293b" }}>Kategori Utama</label>
            <select value={kategori} onChange={(e) => setKategori(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "white", boxSizing: "border-box" }}>
              <option value="Sudut Teduh">Sudut Teduh</option>
              <option value="Gema Semesta">Gema Semesta</option>
              <option value="Paradigma Jaga">Paradigma Jaga</option>
              <option value="Benih Pikir">Benih Pikir</option>
            </select>
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "bold", color: "#1e293b" }}>Estimasi Waktu Baca</label>
            <input placeholder="Contoh: 5 Menit Baca" value={waktuBaca} onChange={(e) => setWaktuBaca(e.target.value)} required style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
          </div>
        </div>

        {/* KOLOM UPLOAD FOTO DENGAN LIVE PREVIEW VISUAL */}
        <div>
          <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "bold", color: "#1e293b" }}>Foto Sampul Artikel</label>
          <div style={{ padding: "20px", borderRadius: "8px", border: "2px dashed #cbd5e1", backgroundColor: "#f8fafc", textAlign: "center" }}>
            {fileGambar ? (
              <div>
                <img 
                  src={URL.createObjectURL(fileGambar)} 
                  alt="Pratinjau Sampul" 
                  style={{ maxWidth: "100%", maxHeight: "220px", borderRadius: "8px", marginBottom: "12px", objectFit: "cover", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }} 
                />
                <p style={{ fontSize: "13px", color: "#16a34a", fontWeight: "bold", margin: "0 0 10px 0" }}>✓ {fileGambar.name}</p>
                <button 
                  type="button" 
                  onClick={() => setFileGambar(null)}
                  style={{ backgroundColor: "#ef4444", color: "white", border: "none", padding: "6px 14px", borderRadius: "6px", fontSize: "12px", fontWeight: "bold", cursor: "pointer" }}
                >
                  Ganti Foto Sampul
                </button>
              </div>
            ) : (
              <div>
                <p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 12px 0" }}>Klik tombol di bawah untuk memilih file foto artikel Anda</p>
                <input 
                  id="input-gambar"
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setFileGambar(e.target.files?.[0] || null)}
                  required
                  style={{ cursor: "pointer", fontSize: "14px", color: "#475569" }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Judul Artikel */}
        <div>
          <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "bold", color: "#1e293b" }}>Judul Artikel</label>
          <input placeholder="Masukkan judul..." value={judul} onChange={(e) => setJudul(e.target.value)} required style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
        </div>

        {/* Intisari (Ringkasan Pendek) */}
        <div>
          <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "bold", color: "#1e293b" }}>Intisari (Ringkasan Pendek)</label>
          <textarea placeholder="Tulis ringkasan pendek..." value={intisari} onChange={(e) => setIntisari(e.target.value)} required style={{ width: "100%", padding: "10px", borderRadius: "6px", height: "70px", border: "1px solid #cbd5e1", fontFamily: "inherit", boxSizing: "border-box", resize: "vertical" }} />
        </div>

        {/* Isi Konten Lengkap */}
        <div>
          <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "bold", color: "#1e293b" }}>Isi Konten Lengkap</label>
          <textarea placeholder="Tulis isi artikel secara menyeluruh di sini..." value={kontenLengkap} onChange={(e) => setKontenLengkap(e.target.value)} required style={{ width: "100%", padding: "10px", borderRadius: "6px", height: "180px", border: "1px solid #cbd5e1", fontFamily: "inherit", boxSizing: "border-box", resize: "vertical" }} />
        </div>

        {/* Tombol Submit */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{ 
            backgroundColor: isSubmitting ? "#94a3b8" : "#064e3b", 
            color: "white", 
            padding: "14px", 
            borderRadius: "8px", 
            border: "none", 
            cursor: isSubmitting ? "not-allowed" : "pointer", 
            fontWeight: "bold",
            fontSize: "15px",
            marginTop: "10px"
          }}
        >
          {isSubmitting ? "Sedang Mempublish..." : "Publish Artikel Baru"}
        </button>
      </form>
    </div>
  );
}