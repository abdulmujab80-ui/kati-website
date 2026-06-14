"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminLoginPortal() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [pesanError, setPesanError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(false);
    setPesanError(null);

    if (!email || !password) {
      setPesanError("Semua kolom wajib diisi.");
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data?.user) {
        // Jika login berhasil, arahkan ke dashboard manajemen artikel admin
        router.push("/admin/dashboard");
      }
    } catch (error: any) {
      setPesanError(error.message || "Gagal masuk. Periksa kembali akun Anda.");
    } finally {
      setLoading(false);
    }
  };

  const fontStyle = { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' };

  return (
    <div style={{ 
      ...fontStyle,
      backgroundColor: "#f4fbf7", 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      padding: "20px"
    }}>
      
      {/* 🟢 STYLE INJEKSI UNTUK BEHAVIOR INPUT & TOMBOL PERSIS GAMBAR */}
      <style dangerouslySetInnerHTML={{ __html: `
        .input-portal {
          width: 100%;
          padding: 16px;
          font-size: 15px;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          background-color: #f8fafc;
          color: #0f172a;
          outline: none;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }
        .input-portal:focus {
          border-color: #10b981 !important;
          background-color: #ffffff !important;
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
        }
        .tombol-masuk {
          width: 100%;
          background-color: #063e2b;
          color: white;
          border: none;
          padding: 16px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 1px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
        }
        .tombol-masuk:hover {
          background-color: #022c22;
          transform: translateY(-1px);
          box-shadow: 0 10px 20px -5px rgba(6, 62, 43, 0.3);
        }
        .tombol-masuk:disabled {
          background-color: #94a3b8;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        .link-kembali {
          color: #8da2bb;
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          transition: color 0.2s;
        }
        .link-kembali:hover {
          color: #064e3b;
        }
      `}} />

      {/* 🛡️ KARTU PORTAL VERIFIKASI */}
      <div style={{ 
        backgroundColor: "#ffffff", 
        width: "100%", 
        maxWidth: "460px", 
        borderRadius: "24px", 
        padding: "50px 40px", 
        boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.05)",
        textAlign: "center"
      }}>
        
        {/* Lingkaran Perisai / Badge Proteksi */}
        <div style={{ 
          width: "72px", 
          height: "72px", 
          backgroundColor: "#d1fae5", 
          borderRadius: "50%", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          margin: "0 auto 24px auto"
        }}>
          {/* Menggunakan SVG Shield Premium yang Sesuai dengan Gambar image_554f5f.png */}
          <svg width="32" height="36" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0L2 4V13C2 19.2 6.3 24.9 12 26.5C17.7 24.9 22 19.2 22 13V4L12 0Z" fill="#3b82f6"/>
          </svg>
        </div>

        {/* Judul Teks */}
        <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#063e2b", margin: "0 0 8px 0", letterSpacing: "-0.5px" }}>
          Portal Verifikasi
        </h1>
        <p style={{ fontSize: "14.5px", color: "#70859f", margin: "0 0 35px 0", fontWeight: "500" }}>
          Silakan masukkan email admin KATI Anda.
        </p>

        {/* Feedback Error jika ada */}
        {pesanError && (
          <div style={{ backgroundColor: "#fef2f2", color: "#991b1b", padding: "12px", borderRadius: "8px", fontSize: "13px", marginBottom: "20px", textAlign: "left", fontWeight: "500", border: "1px solid #fee2e2" }}>
            ⚠️ {pesanError}
          </div>
        )}

        {/* Form Login */}
        <form onSubmit={handleLogin} style={{ textAlign: "left", display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Field Email */}
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "800", color: "#2d3a4a", letterSpacing: "0.5px", marginBottom: "8px" }}>
              ALAMAT EMAIL
            </label>
            <input 
              type="email" 
              className="input-portal"
              placeholder="admin@kati.id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Field Password */}
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "800", color: "#2d3a4a", letterSpacing: "0.5px", marginBottom: "8px" }}>
              KATA SANDI
            </label>
            <input 
              type="password" 
              className="input-portal"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Tombol Aksi */}
          <button type="submit" className="tombol-masuk" disabled={loading}>
            {loading ? "MEMPROSES..." : "MASUK KE SISTEM"}
          </button>
        </form>

        {/* Opsi Kembali */}
        <div style={{ marginTop: "35px" }}>
          <a href="/artikel" className="link-kembali">
            ← Kembali ke Beranda Utama
          </a>
        </div>

      </div>
    </div>
  );
}