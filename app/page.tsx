"use client";

import { useState, useEffect, useRef } from "react";
// 🟢 IMPORT SUPABASE CLIENT
import { createClient } from "@supabase/supabase-js";

// INISIALISASI SUPABASE KLIEN (Menggunakan env yang sudah kamu pasang)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface AnimasiProps {
  children: React.ReactNode;
  delay?: string;
  style?: React.CSSProperties; 
}

// Komponen Pembungkus Efek Gulir Kebawah (Scroll Animation) dengan dukungan Staggered Delay
function ElemenAnimasiScroll({ children, delay = "0ms", style }: AnimasiProps) {
  const [terlihat, setTerlihat] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTerlihat(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      style={{
        opacity: terlihat ? 1 : 0,
        transform: terlihat ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}, transform 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}`,
        willChange: "transform, opacity",
        width: style?.width || "100%",
        display: style?.display || "flex",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [slideAktif, setSlideAktif] = useState(0);

  // 🟢 MENGUBAH DATA MENJADI STATE DENGAN FALLBACK DATA LAMA (Agar tidak kosongan saat loading)
  const [daftarBerita, setDaftarBerita] = useState([
    {
      id: 1,
      tag: "Aksi Hijau",
      tanggal: "12 Juni 2026",
      judul: "Restorasi Lereng Tegalsari: KATI Sukses Tanam 1.000 Bibit Endemik",
      deskripsi: "Sinergi kolaboratif bersama masyarakat lokal guna mengembalikan stabilitas resapan air tanah hulu.",
      gambar: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      tag: "Edukasi",
      tanggal: "05 Juni 2026",
      judul: "Kelas Alam Digital Gelombang Ke-IV Resmi Dibuka Bulan Ini",
      deskripsi: "Kurikulum terintegrasi yang mengajarkan pemanfaatan teknologi IoT untuk pelestarian hutan mikro.",
      gambar: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&auto=format&fit=crop&q=80",
    },
  ]);

  const [daftarArtikel, setDaftarArtikel] = useState([
    {
      id: 1,
      kategori: "Riset",
      judul: "Mengukur Dampak Emisi Karbon Skala Rumah Tangga Warga",
      waktu: "5 Menit Baca",
      penulis: "Dr. Ahmad Fauzi",
    },
    {
      id: 2,
      kategori: "Konservasi",
      judul: "Strategi Pengelolaan Kompos Makro Alami Tanpa Bau",
      waktu: "4 Menit Baca",
      penulis: "Siti Rahma S.Hut",
    },
    {
      id: 3,
      kategori: "Ekowisata",
      judul: "Membangun Desa Wisata Berkelanjutan Berbasis Adat",
      waktu: "8 Menit Baca",
      penulis: "Tim Kreatif KATI",
    },
  ]);

  const [jumlahMitra, setJumlahMitra] = useState(18); // Default state mitra lama

  // Fungsi Pembantu format tanggal Indonesia
  const formatTanggalIndo = (isoString: string) => {
    if (!isoString) return "";
    const d = new Date(isoString);
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // 🟢 EFFECT UNTUK FETCH DATA REAL DARI SUPABASE
  useEffect(() => {
    async function ambilDataReal() {
      // 1. Ambil 3 Berita Terbaru
      try {
        const { data, error } = await supabase
          .from("berita")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(3);

        if (!error && data && data.length > 0) {
          setDaftarBerita(
            data.map((b) => ({
              id: b.id,
              tag: b.kategori || "Berita",
              tanggal: formatTanggalIndo(b.created_at),
              judul: b.judul,
              // Potong konten untuk deskripsi pendek di card beranda
              deskripsi: b.konten_lengkap ? (b.konten_lengkap.length > 120 ? b.konten_lengkap.substring(0, 120) + "..." : b.konten_lengkap) : "",
              gambar: b.gambar || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80",
            }))
          );
        }
      } catch (err) {
        console.error("Gagal sinkronisasi data berita:", err);
      }

      // 2. Ambil 3 Artikel Repository Terbaru
      try {
        // Mencari ke tabel 'repository' atau tabel 'artikel' (Sistem otomatis mendeteksi)
        const { data, error } = await supabase
          .from("repository") 
          .select("*")
          .order("created_at", { ascending: false })
          .limit(3);

        if (!error && data && data.length > 0) {
          setDaftarArtikel(
            data.map((r) => ({
              id: r.id,
              kategori: r.kategori || "Umum",
              judul: r.judul,
              waktu: r.waktu_baca || r.waktu || "5 Menit Baca",
              penulis: r.penulis || "Tim KATI",
            }))
          );
        }
      } catch (err) {
        // Fallback jika nama tabelmu adalah 'artikel' bukan 'repository'
        try {
          const { data } = await supabase.from("artikel").select("*").order("created_at", { ascending: false }).limit(3);
          if (data && data.length > 0) {
            setDaftarArtikel(data.map(a => ({ id: a.id, kategori: a.kategori || "Umum", judul: a.judul, waktu: a.waktu_baca || "5 Menit Baca", penulis: a.penulis || "Tim KATI" })));
          }
        } catch(e) {
          console.error("Gagal sinkronisasi data artikel/repository:", e);
        }
      }

      // 3. Ambil Total Angka Kemitraan (Mengikuti jumlah baris di tabel 'mitra')
      try {
        const { count, error } = await supabase
          .from("mitra")
          .select("*", { count: "exact", head: true });

        if (!error && count !== null) {
          setJumlahMitra(count);
        }
      } catch (err) {
        console.error("Gagal mengambil data mitra:", err);
      }
    }

    ambilDataReal();
  }, []);

  const daftarSpanduk = [
    {
      judul: "Selamat Datang di Kampus Alam Tegalsari Indonesia",
      subJudul: "Alam adalah Kelas, Masyarakat adalah Nafas.",
      teks: "Rumah kembali bagi jiwa yang rindu belajar pada alam, bertumbuh bersama masyarakat, dan bergerak nyata untuk memulihkan masa depan bumi.",
      warnaAwal: "#064e3b",
      warnaAkhir: "#022c22",
    },
    {
      judul: "Mendengar Kidung Semesta, Merawat Labirin Kehidupan",
      subJudul: "Kembali ke Akar, Bergerak untuk Bumi.",
      teks: "Menemukan kembali koordinat manusia di dalam jaring penciptaan: berguru pada sunyi, bergerak dalam aksi, memulihkan bumi.",
      warnaAwal: "#047857",
      warnaAkhir: "#064e3b",
    },
    {
      judul: "Edukasi Alam Berbasis Digitalisasi",
      subJudul: "Modern, Transparan, & Berdampak",
      teks: "Jelajahi program Kelas Alam dan Ekowisata terintegrasi yang dirancang untuk melahirkan generasi peduli lingkungan.",
      warnaAwal: "#0f766e",
      warnaAkhir: "#115e59",
    },
  ];

  useEffect(() => {
    const waktu = setInterval(() => {
      setSlideAktif((angka) => (angka === 2 ? 0 : angka + 1));
    }, 5000);
    return () => clearInterval(waktu);
  }, []);

  const fontStyle = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  };

  return (
    <main style={{ ...fontStyle, backgroundColor: "#ffffff", minHeight: "100vh", color: "#0f172a", overflowX: "hidden" }}>
      
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .btn-jelajahi { transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) !important; }
            .btn-jelajahi:hover { transform: translateY(-3px); background-color: #059669 !important; box-shadow: 0 15px 30px rgba(16, 185, 129, 0.4) !important; }
            .btn-jelajahi:active { transform: translateY(1px); }

            .btn-mitra-landing { transition: all 0.3s ease !important; }
            .btn-mitra-landing:hover { background-color: white !important; color: #064e3b !important; transform: translateY(-3px); }

            .slider-dot { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important; }
            .slider-dot:hover { background-color: #34d399 !important; transform: scale(1.2); }

            .blok-mengenal { background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 36px; padding: 70px 50px; box-shadow: 0 20px 50px rgba(6, 78, 59, 0.03); position: relative; overflow: hidden; }
            .blok-mengenal::before { content: ""; position: absolute; top: 0; left: 0; width: 6px; height: 100%; background-color: #10b981; }
            
            .card-visi-misi { background-color: #ffffff; padding: 45px 40px; border-radius: 28px; border: 1px solid #e2e8f0; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.02); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important; }
            .card-visi-misi:hover { transform: translateY(-8px); border-color: #10b981; box-shadow: 0 30px 60px -15px rgba(6, 78, 59, 0.08) !important; }

            .hover-card-efek { background-color: #ffffff; padding: 40px 35px; border-radius: 24px; border: 1px solid #e2e8f0; text-align: center; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important; width: 100%; }
            .hover-card-efek:hover { transform: translateY(-8px); border-color: #10b981 !important; box-shadow: 0 25px 50px -12px rgba(16, 185, 129, 0.08) !important; }

            .kartu-berita { background: white; border-radius: 24px; border: 1px solid #e2e8f0; overflow: hidden; display: flex; flex-direction: column; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); text-decoration: none; color: inherit; }
            .kartu-berita:hover { transform: translateY(-6px); box-shadow: 0 30px 50px rgba(0,0,0,0.05); border-color: #10b981; }

            .kartu-artikel { background: white; border-radius: 20px; border: 1px solid #e2e8f0; padding: 28px; display: flex; flex-direction: column; justify-content: space-between; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); text-decoration: none; color: inherit; }
            .kartu-artikel:hover { border-color: #10b981; transform: translateX(6px); background-color: #f8fafc; }
          `,
        }}
      />

      {/* BAGIAN 1: Spanduk Slider Premium & Sinematik */}
      <div
        style={{
          background: `linear-gradient(135deg, ${daftarSpanduk[slideAktif].warnaAwal}, ${daftarSpanduk[slideAktif].warnaAkhir})`,
          color: "white",
          padding: "170px 20px 150px 20px",
          textAlign: "center",
          transition: "all 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.04, backgroundImage: "radial-gradient(circle, #fff 2px, transparent 2px)", backgroundSize: "32px 32px" }}></div>
        <div style={{ position: "absolute", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)", top: "-200px", left: "-200px", borderRadius: "50%" }}></div>

        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <span
            style={{
              color: "#34d399",
              fontWeight: "700",
              letterSpacing: "3px",
              fontSize: "12px",
              textTransform: "uppercase",
              backgroundColor: "rgba(52, 211, 153, 0.08)",
              padding: "10px 22px",
              borderRadius: "30px",
              border: "1px solid rgba(52, 211, 153, 0.2)",
              display: "inline-block",
            }}
          >
            {daftarSpanduk[slideAktif].subJudul}
          </span>

          <h1 style={{ fontSize: "56px", margin: "30px 0 20px 0", fontWeight: "800", lineHeight: "1.15", letterSpacing: "-1.5px" }}>
            {daftarSpanduk[slideAktif].judul}
          </h1>

          <p style={{ fontSize: "19px", margin: "0 auto 45px auto", lineHeight: "1.8", color: "#cbd5e1", maxWidth: "700px", fontWeight: "400" }}>
            {daftarSpanduk[slideAktif].teks}
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap" }}>
            <a href="/program" style={{ textDecoration: "none" }}>
              <button className="btn-jelajahi" style={{ backgroundColor: "#10b981", color: "white", border: "none", padding: "18px 40px", fontSize: "15px", fontWeight: "700", borderRadius: "14px", cursor: "pointer", boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)" }}>
                Jelajahi Program KATI
              </button>
            </a>
            <a href="/mitra" style={{ textDecoration: "none" }}>
              <button className="btn-mitra-landing" style={{ backgroundColor: "transparent", color: "white", border: "2px solid rgba(255,255,255,0.3)", padding: "16px 40px", fontSize: "15px", fontWeight: "700", borderRadius: "14px", cursor: "pointer" }}>
                Hubungi Kemitraan
              </button>
            </a>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "60px", position: "relative", zIndex: 2 }}>
          {daftarSpanduk.map((_, urutan) => (
            <div
              key={urutan}
              onClick={() => setSlideAktif(urutan)}
              className="slider-dot"
              style={{
                width: slideAktif === urutan ? "40px" : "12px",
                height: "8px",
                borderRadius: "10px",
                cursor: "pointer",
                backgroundColor: slideAktif === urutan ? "#10b981" : "rgba(255,255,255,0.25)",
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          ))}
        </div>
      </div>

      {/* BAGIAN 2: Tentang Kami - Mengenal KATI */}
      <div style={{ padding: "100px 20px 40px 20px", maxWidth: "1080px", margin: "0 auto" }}>
        <ElemenAnimasiScroll>
          <div className="blok-mengenal">
            <span style={{ color: "#10b981", fontWeight: "700", letterSpacing: "2.5px", fontSize: "11px", textTransform: "uppercase", display: "block", textAlign: "center", marginBottom: "12px" }}>
              MANIFES KAMPUS ALAM TEGALSARI INDONESIA
            </span>
            <h2 style={{ color: "#064e3b", fontSize: "38px", fontWeight: "800", marginBottom: "25px", letterSpacing: "-1px", marginTop: 0, textAlign: "center" }}>
              Mengenal Gerakan KATI
            </h2>
            <div style={{ width: "60px", height: "5px", backgroundColor: "#10b981", margin: "0 auto 35px auto", borderRadius: "10px" }}></div>
            <p style={{ color: "#475569", fontSize: "18.5px", lineHeight: "1.95", fontWeight: "400", textAlign: "center", maxWidth: "900px", margin: "0 auto" }}>
              <strong style={{ color: "#064e3b", fontWeight: "700" }}>Kampus Alam Tegalsari Indonesia (KATI)</strong> adalah lembaga pendidikan non-formal berbasis konservasi alam di bawah Yayasan Pendidikan Sosial Tegalsari Sejahtera, Desa Sidodadi, Malang. KATI hadir sebagai “kampus tanpa dinding” yang menjadikan alam sebagai ruang belajar, masyarakat sebagai dosen, dan tantangan lokal sebagai laboratorium. KATI berfokus pada tridarma: pendidikan, penelitian, dan pengabdian, dengan visi menjadi pusat rujukan nasional pendidikan konservasi berbasis alam, budaya, dan teknologi.
            </p>
          </div>
        </ElemenAnimasiScroll>
      </div>

      {/* BAGIAN 3: Tentang Kami - Visi & Misi */}
      <div style={{ padding: "40px 20px 100px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "35px", flexWrap: "wrap", justifyContent: "center", alignItems: "stretch" }}>
          
          <div style={{ flex: "1 1 450px", display: "flex" }}>
            <ElemenAnimasiScroll>
              <div className="card-visi-misi" style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ color: "#064e3b", fontSize: "26px", fontWeight: "800", marginBottom: "18px", marginTop: 0, letterSpacing: "-0.5px" }}>Visi Utama</h3>
                  <p style={{ color: "#334155", fontSize: "17px", lineHeight: "1.85", fontWeight: "500", fontStyle: "italic", margin: 0 }}>
                    "Menjadi pusat pendidikan konservasi berbasis alam, budaya, dan teknologi yang melahirkan generasi berkesadaran ekologis, berakar pada kearifan budaya, dan berdaya cipta dalam membangun peradaban berkelanjutan."
                  </p>
                </div>
                <div style={{ height: "5px", width: "50px", backgroundColor: "#10b981", marginTop: "40px", borderRadius: "10px" }}></div>
              </div>
            </ElemenAnimasiScroll>
          </div>

          <div style={{ flex: "1.2 1 500px", display: "flex" }}>
            <ElemenAnimasiScroll delay="150ms">
              <div className="card-visi-misi" style={{ height: "100%" }}>
                <h3 style={{ color: "#064e3b", fontSize: "26px", fontWeight: "800", marginBottom: "22px", marginTop: 0, letterSpacing: "-0.5px" }}>Misi Gerakan</h3>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {[
                    "Menyelenggarakan pendidikan konservasi alam berbasis pengalaman langsung (experiential learning).",
                    "Mengembangkan riset lapangan yang aplikatif dan berkontribusi pada pembangunan berkelanjutan.",
                    "Menggerakkan pengabdian masyarakat melalui aksi konservasi yang terukur dan regeneratif.",
                    "Mencetak kader pemimpin muda desa yang berkarakter, peduli lingkungan, dan berdaya saing global.",
                    "Membangun jejaring kemitraan dengan kampus, pemerintah, komunitas, dan dunia usaha untuk mendukung konservasi.",
                  ].map((misi, index) => (
                    <div key={index} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                      <span
                        style={{
                          backgroundColor: "#f1f5f9",
                          color: "#064e3b",
                          fontWeight: "800",
                          fontSize: "12px",
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexShrink: 0,
                          marginTop: "2px",
                          border: "1px solid #e2e8f0",
                        }}
                      >
                        {index + 1}
                      </span>
                      <p style={{ color: "#475569", fontSize: "15.5px", lineHeight: "1.65", margin: 0, fontWeight: "500" }}>
                        {misi}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ElemenAnimasiScroll>
          </div>

        </div>
      </div>

      {/* BAGIAN 4: Tentang Kami - Nilai Inti */}
      <div style={{ backgroundColor: '#f8fafc', padding: '100px 20px', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <ElemenAnimasiScroll>
            <div style={{ textAlign: 'center', marginBottom: '60px', width: '100%' }}>
              <span style={{ color: '#10b981', fontWeight: '700', fontSize: '12px', letterSpacing: '2.5px', textTransform: 'uppercase' }}>PRINSIP UTAMA</span>
              <h2 style={{ color: '#064e3b', fontSize: '36px', fontWeight: '800', margin: '12px 0 0 0', letterSpacing: '-1px' }}>Nilai Inti Esensial</h2>
              <div style={{ width: '45px', height: '5px', backgroundColor: '#10b981', margin: '16px auto 0 auto', borderRadius: '10px' }}></div>
            </div>
          </ElemenAnimasiScroll>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px', width: '100%' }}>
            
            {/* Kartu 1 */}
            <ElemenAnimasiScroll style={{ flex: '1 1 300px', maxWidth: '360px' }}>
              <div className="hover-card-efek">
                <h4 style={{ color: '#064e3b', fontSize: '19px', fontWeight: '700', margin: '0 0 14px 0' }}>Pendidikan</h4>
                <p style={{ color: '#64748b', fontSize: '14.5px', lineHeight: '1.7', margin: 0 }}>Mengembangkan cetak biru kurikulum alam praktis yang responsif, adaptif, dan berorientasi pada masa depan lingkungan.</p>
              </div>
            </ElemenAnimasiScroll>

            {/* Kartu 2 */}
            <ElemenAnimasiScroll delay="100ms" style={{ flex: '1 1 300px', maxWidth: '360px' }}>
              <div className="hover-card-efek">
                <h4 style={{ color: '#064e3b', fontSize: '19px', fontWeight: '700', margin: '0 0 14px 0' }}>Penelitian</h4>
                <p style={{ color: '#64748b', fontSize: '14.5px', lineHeight: '1.7', margin: 0 }}>Meneliti dan menggali potensi hayati lokal guna melahirkan inovasi sains berbasis pelestarian ekologi yang persisten.</p>
              </div>
            </ElemenAnimasiScroll>

            {/* Kartu 3 */}
            <ElemenAnimasiScroll delay="200ms" style={{ flex: '1 1 300px', maxWidth: '360px' }}>
              <div className="hover-card-efek">
                <h4 style={{ color: '#064e3b', fontSize: '19px', fontWeight: '700', margin: '0 0 14px 0' }}>Pengabdian</h4>
                <p style={{ color: '#64748b', fontSize: '14.5px', lineHeight: '1.7', margin: 0 }}>Menggandeng multi-pihak serta masyarakat lingkar kampus untuk menerapkan ilmu pengetahuan secara nyata dan tumbuh bersama.</p>
              </div>
            </ElemenAnimasiScroll>

          </div>
        </div>
      </div>

      {/* BAGIAN 5: Dampak Nyata Berbasis Akuntabilitas */}
      <div style={{ backgroundColor: '#ffffff', padding: '100px 20px' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <ElemenAnimasiScroll>
            <div style={{ textAlign: 'center', marginBottom: '65px', width: '100%' }}>
              <span style={{ color: '#10b981', fontWeight: '700', fontSize: '12px', letterSpacing: '2.5px', textTransform: 'uppercase' }}>AKSI </span>
              <h2 style={{ color: '#064e3b', fontSize: '36px', fontWeight: '800', margin: '12px 0 0 0', letterSpacing: '-1px' }}>Dampak Nyata Gerakan</h2>
              <p style={{ color: '#64748b', fontSize: '16.5px', marginTop: '12px', maxWidth: '600px', margin: '12px auto 0 auto', lineHeight: '1.6' }}>Metrik capaian kontribusi kumulatif dari integrasi program restorasi KATI</p>
            </div>
          </ElemenAnimasiScroll>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px', width: '100%' }}>
            {[
              { angka: "500+", label: "Pohon Mangrove Ditanam", sub: "Menjaga area tepian sungai bajulmati agar tidak terdampak erosi" },
              { angka: "1.350 Kg", label: "Oksigen Diproduksi", sub: "Pasokan udara bersih yang diproduksi secara alami per tahunnya" },
              // 🟢 JUMLAH MITRA SEKARANG SINKRON DENGAN DATA REAL SUPABASE
              { angka: jumlahMitra, label: "Program Volunteering", sub: "Sinergi aksi pengabdian masyarakat serta dana riset ilmiah" },
              { angka: "44", label: "Siswa Ter-edukasi", sub: "Lulusan bersertifikasi resmi kelas alam" }
            ].map((item, idx) => (
              <ElemenAnimasiScroll key={idx} delay={`${idx * 120}ms`} style={{ flex: '1 1 240px', maxWidth: '260px' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '40px 28px', width: '100%', textAlign: 'center', position: 'relative' }}>
                  <div style={{ fontSize: '46px', fontWeight: '900', color: idx % 2 === 0 ? '#064e3b' : '#10b981', marginBottom: '6px', letterSpacing: '-1.5px' }}>{item.angka}</div>
                  <div style={{ color: '#0f172a', fontWeight: '700', fontSize: '15.5px', marginBottom: '10px' }}>{item.label}</div>
                  <div style={{ color: '#64748b', fontSize: '13.5px', lineHeight: '1.5' }}>{item.sub}</div>
                </div>
              </ElemenAnimasiScroll>
            ))}
          </div>
        </div>
      </div>

      {/* BAGIAN 6: Berita Utama & Artikel Komunitas */}
      <div style={{ padding: "100px 20px 120px 20px", backgroundColor: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          
          <ElemenAnimasiScroll>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "55px", flexWrap: "wrap", gap: "20px", width: '100%' }}>
              <div>
                <span style={{ color: "#10b981", fontWeight: "700", fontSize: "12px", letterSpacing: "2.5px", textTransform: "uppercase" }}>KABAR TERKINI</span>
                <h2 style={{ color: "#064e3b", fontSize: "36px", fontWeight: "800", margin: "6px 0 0 0", letterSpacing: "-1px" }}>Berita & Artikel Populer</h2>
              </div>
              <a
                href="/publikasi"
                style={{ color: "#10b981", textDecoration: "none", fontWeight: "700", fontSize: "15px", borderBottom: "2px solid transparent", transition: "all 0.3s ease", paddingBottom: "2px" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderBottom = "2px solid #10b981")}
                onMouseLeave={(e) => (e.currentTarget.style.borderBottom = "2px solid transparent")}
              >
                Lihat Semua Liputan →
              </a>
            </div>
          </ElemenAnimasiScroll>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "35px" }}>
            
            {/* SISI KIRI: GRID 3 BERITA SUPABASE */}
            <div style={{ display: "flex", flexDirection: "column", gap: "25px", flex: "1" }}>
              {daftarBerita.map((item, index) => (
                <ElemenAnimasiScroll key={index} delay={`${index * 150}ms`}>
                  {/* Mengarahkan link href dinamis ke halaman detail berita */}
                  <a href={`/berita/${item.id}`} className="kartu-berita" style={{ flexDirection: "row", flexWrap: "wrap", width: "100%" }}>
                    <div style={{ flex: "1 1 180px", background: `url(${item.gambar}) center/cover no-repeat`, minHeight: "220px" }} />
                    <div style={{ flex: "1.4 1 260px", padding: "30px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ display: "flex", gap: "10px", fontSize: "12px", marginBottom: "12px", color: "#64748b", fontWeight: "600" }}>
                          <span style={{ color: "#10b981", textTransform: "uppercase", letterSpacing: "1px" }}>{item.tag}</span>
                          <span>•</span>
                          <span>{item.tanggal}</span>
                        </div>
                        <h3 style={{ fontSize: "19px", color: "#0f172a", fontWeight: "700", margin: "0 0 10px 0", lineHeight: "1.45" }}>{item.judul}</h3>
                        <p style={{ color: "#64748b", fontSize: "14px", lineHeight: "1.65", margin: 0 }}>{item.deskripsi}</p>
                      </div>
                      <span style={{ color: "#064e3b", fontWeight: "700", fontSize: "13.5px", marginTop: "20px", display: "inline-block", width: "fit-content" }}>Baca Selengkapnya</span>
                    </div>
                  </a>
                </ElemenAnimasiScroll>
              ))}
            </div>

            {/* SISI KANAN: REPOSITORY / ARTIKEL SUPABASE */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", flex: "1" }}>
              {daftarArtikel.map((art, index) => (
                <ElemenAnimasiScroll key={index} delay={`${index * 120}ms`}>
                  {/* Mengarahkan link href dinamis ke halaman detail repository */}
                  <a href={`/repository/${art.id}`} className="kartu-artikel" style={{ width: "100%" }}>
                    <div>
                      <span style={{ backgroundColor: "#e2e8f0", color: "#475569", fontSize: "11px", fontWeight: "700", padding: "5px 10px", borderRadius: "6px", textTransform: "uppercase", display: "inline-block", marginBottom: "14px", letterSpacing: "0.5px" }}>
                        {art.kategori}
                      </span>
                      <h4 style={{ color: "#0f172a", fontSize: "17px", fontWeight: "700", margin: "0 0 10px 0", lineHeight: "1.5" }}>{art.judul}</h4>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12.5px", color: "#94a3b8", borderTop: "1px solid #f1f5f9", paddingTop: "14px", marginTop: "14px" }}>
                      <span>Oleh: <strong style={{ color: "#475569" }}>{art.penulis}</strong></span>
                      <span style={{ color: "#10b981", fontWeight: "700" }}>{art.waktu}</span>
                    </div>
                  </a>
                </ElemenAnimasiScroll>
              ))}
            </div>

          </div>
        </div>
      </div>

    </main>
  );
}