import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, BarChart2, Users, ArrowRight, PlayCircle, Menu, X, BookOpen, Video, Award, Shield, Clock, MessageSquare } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Warna Brand Molca (Lime Green)
  const MOLCA_LIME = '#D1F349';

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans text-gray-200 selection:bg-[#D1F349] selection:text-black">
      
      {/* --- 1. NAVBAR --- */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              <div className="w-8 h-8 bg-[#D1F349] rounded flex items-center justify-center text-black font-bold text-xl">M</div>
              <span className="text-2xl font-bold text-white tracking-tight">molca</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-400 hover:text-[#D1F349] font-medium transition text-sm uppercase tracking-wider">Fitur</a>
              <a href="#benefits" className="text-gray-400 hover:text-[#D1F349] font-medium transition text-sm uppercase tracking-wider">Manfaat</a>
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={() => navigate('/login')}
                className="text-white font-bold hover:text-[#D1F349] transition"
              >
                Log in
              </button>
              <button 
                onClick={() => navigate('/register')}
                className="bg-[#D1F349] text-black px-6 py-2.5 rounded-lg font-bold hover:bg-[#bce038] transition shadow-[0_0_15px_rgba(209,243,73,0.4)]"
              >
                Mulai Gratis
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#171717] border-t border-white/10 p-4 space-y-4 absolute w-full">
            <a href="#features" className="block text-gray-300 font-medium">Fitur</a>
            <button onClick={() => navigate('/login')} className="block w-full text-left text-gray-300 font-medium">Log in</button>
            <button onClick={() => navigate('/register')} className="block w-full bg-[#D1F349] text-black px-4 py-3 rounded-lg font-bold">Mulai Gratis</button>
          </div>
        )}
      </nav>

      {/* --- 2. HERO SECTION --- */}
      <section className="relative overflow-hidden pt-20 pb-24 lg:pt-32 lg:pb-40">
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] bg-[#D1F349] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[500px] h-[500px] bg-blue-900 rounded-full blur-[150px] opacity-20 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D1F349]/30 bg-[#D1F349]/10">
                <span className="w-2 h-2 rounded-full bg-[#D1F349] animate-pulse"></span>
                <span className="text-[#D1F349] text-xs font-bold uppercase tracking-widest">Learning Management System B2B</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight text-white">
                Tingkatkan <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D1F349] to-[#a3c918]">
                  Skill Tim Anda
                </span> <br/>
                Sekarang.
              </h1>
              <p className="text-lg text-gray-400 leading-relaxed max-w-lg border-l-2 border-[#D1F349] pl-6">
                Platform pelatihan korporat yang lengkap. Kelola materi, pantau progres karyawan, dan tingkatkan produktivitas perusahaan.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                    onClick={() => navigate('/register')}
                    className="px-8 py-4 bg-[#D1F349] text-black rounded-lg font-bold text-lg hover:bg-[#bce038] transition shadow-[0_0_20px_rgba(209,243,73,0.3)] flex items-center justify-center gap-2"
                >
                  Coba Demo Gratis <ArrowRight size={20} />
                </button>
                <button className="px-8 py-4 bg-transparent text-white border border-white/20 rounded-lg font-bold text-lg hover:border-[#D1F349] hover:text-[#D1F349] transition flex items-center justify-center gap-2">
                  <PlayCircle size={20} /> Lihat Video
                </button>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#D1F349] to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative rounded-3xl bg-[#171717] border border-white/10 p-3 overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1000&auto=format&fit=crop" 
                  alt="LMS Dashboard Preview" 
                  className="rounded-2xl w-full h-auto opacity-90 group-hover:scale-105 transition duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. CLIENTS --- */}
      <section className="py-12 border-y border-white/5 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-8">Dipercaya oleh Perusahaan Terkemuka</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {['PERTAMINA', 'PLN INDONESIA', 'TOYOTA', 'ASTRA', 'UNILEVER'].map((logo) => (
                <span key={logo} className="text-2xl font-bold text-white hover:text-[#D1F349] cursor-default transition-colors font-mono">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. FEATURES (DISESUAIKAN DENGAN LMS) --- */}
      <section id="features" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D1F349] rounded-full blur-[200px] opacity-5 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                    Fitur Utama <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D1F349] to-green-400">LMS Molca</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                    Semua yang Anda butuhkan untuk mengelola pelatihan karyawan dalam satu platform terintegrasi.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
                {[
                    { 
                      icon: BookOpen, 
                      title: "Manajemen Materi", 
                      desc: "Upload dan kelola modul pelatihan berbasis video dengan mudah. Dukungan multi-modul dan materi tertulis." 
                    },
                    { 
                      icon: BarChart2, 
                      title: "Monitoring Progres", 
                      desc: "Pantau perkembangan belajar setiap karyawan secara real-time. Lihat siapa yang aktif dan siapa yang tertinggal." 
                    },
                    { 
                      icon: MessageSquare, 
                      title: "Diskusi Interaktif", 
                      desc: "Fasilitasi tanya jawab antar karyawan dan instruktur langsung di halaman materi untuk pemahaman lebih dalam." 
                    },
                    { 
                      icon: Shield, 
                      title: "Akses Aman (RBAC)", 
                      desc: "Sistem login aman dengan pembagian hak akses khusus antara Admin (HRD) dan User (Karyawan)." 
                    },
                    { 
                      icon: Clock, 
                      title: "Belajar Fleksibel", 
                      desc: "Akses materi kapan saja dan di mana saja. Sistem akan menyimpan progres terakhir secara otomatis." 
                    },
                    { 
                      icon: Award, 
                      title: "Sertifikasi Digital", 
                      desc: "Berikan tanda penyelesaian otomatis setelah karyawan menyelesaikan seluruh modul pelatihan." 
                    }
                ].map((feature, i) => (
                    <div key={i} className="bg-[#171717] p-10 rounded-[2rem] border border-white/10 hover:border-[#D1F349]/50 transition-all duration-500 group hover:-translate-y-2 shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-[#262626] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#D1F349] transition-colors duration-500 shadow-lg group-hover:shadow-[0_0_20px_rgba(209,243,73,0.4)]">
                                <feature.icon size={32} className="text-[#D1F349] group-hover:text-black transition-colors duration-500" />
                            </div>
                            <h3 className="text-xl font-extrabold text-white mb-4 tracking-tight">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-base font-light">{feature.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- 5. CTA BOTTOM --- */}
      <section className="py-24 bg-[#D1F349] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold text-black mb-8 leading-tight tracking-tight">Mulai Transformasi SDM Anda</h2>
            <p className="text-xl md:text-2xl text-black/80 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
                Bergabunglah dengan perusahaan modern lainnya yang menggunakan Molca LMS.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button 
                    onClick={() => navigate('/register')}
                    className="px-12 py-5 bg-black text-white rounded-xl font-bold text-xl hover:bg-gray-900 transition shadow-2xl hover:shadow-xl hover:-translate-y-1"
                >
                    Daftar Sekarang
                </button>
                <button className="px-12 py-5 bg-transparent text-black border-4 border-black rounded-xl font-bold text-xl hover:bg-black/10 transition hover:-translate-y-1">
                    Hubungi Sales
                </button>
            </div>
        </div>
      </section>

      {/* --- 6. FOOTER --- */}
      <footer className="bg-[#111] pt-20 pb-12 border-t border-white/10 text-gray-400 text-sm font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-20 mb-16">
                
                {/* KIRI: Logo & Kontak */}
                <div className="lg:col-span-5 space-y-10">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#D1F349] rounded-xl flex items-center justify-center text-black font-bold text-3xl shadow-[0_0_15px_rgba(209,243,73,0.3)]">M</div>
                        <span 
                          className="text-5xl font-extrabold text-transparent tracking-tighter" 
                          style={{ WebkitTextStroke: '1.5px white', fontFamily: 'sans-serif' }}
                        >
                          molca
                        </span>
                    </div>

                    <div>
                        <h3 className="text-[#D1F349] font-bold text-xl mb-8 uppercase tracking-wider">Office and Workshop</h3>
                        
                        <div className="space-y-8 text-base">
                            <div className="flex items-start gap-5 group">
                                <MapPin className="text-[#D1F349] mt-1 flex-shrink-0 group-hover:scale-110 transition" size={24} />
                                <p className="leading-relaxed group-hover:text-white transition">JAPFA Tower II Lt. 12, Surabaya,<br/>East Java, Indonesia, 60271</p>
                            </div>
                            
                            <div className="flex items-start gap-5 group">
                                <MapPin className="text-[#D1F349] mt-1 flex-shrink-0 group-hover:scale-110 transition" size={24} />
                                <p className="leading-relaxed group-hover:text-white transition">Dharmahusada Indah Barat V AA<br/>No.30A, Mojo, Kec. Gubeng,<br/>Surabaya, Jawa Timur 60285</p>
                            </div>

                            <div className="flex items-center gap-5 group">
                                <Phone className="text-[#D1F349] flex-shrink-0 group-hover:scale-110 transition" size={24} />
                                <p className="group-hover:text-white transition">+62 811 324 066</p>
                            </div>

                            <div className="flex items-center gap-5 group">
                                <Mail className="text-[#D1F349] flex-shrink-0 group-hover:scale-110 transition" size={24} />
                                <p className="group-hover:text-white transition">hello@molca.id</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* KANAN: Legal Info & ISO */}
                <div className="lg:col-span-7 flex flex-col lg:items-end space-y-12 text-left lg:text-right">
                    <div className="space-y-6 text-base">
                        <div>
                            <p className="text-white font-bold mb-2 uppercase tracking-wider">Legal Name:</p>
                            <p className="text-lg">PT Molca Teknologi Nusantara</p>
                        </div>
                        <div>
                            <p className="text-white font-bold mb-2 uppercase tracking-wider">Nomer Induk Berusaha (NIB):</p>
                            <p className="text-lg font-mono">1101230026145 - Januari 2023</p>
                        </div>
                        <div>
                            <p className="text-white font-bold mb-2 uppercase tracking-wider">No. Pengukuhan PKP (Enterprise Tax):</p>
                            <p className="text-lg font-mono">S-25/PKP/KPP.110903/2023</p>
                        </div>
                    </div>

                    <div className="flex gap-6 justify-start lg:justify-end">
                        <div className="group w-32 h-32 rounded-full border-8 border-white/10 bg-[#171717] hover:bg-white hover:border-[#D1F349] text-white hover:text-black flex flex-col items-center justify-center text-center font-bold leading-tight p-4 shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(209,243,73,0.5)]">
                            <span className="text-xs block mb-1 tracking-widest opacity-70 group-hover:opacity-100">CERTIFIED</span>
                            <span className="text-3xl block font-extrabold">ISO</span>
                            <span className="text-sm">45001:2018</span>
                        </div>
                        <div className="group w-32 h-32 rounded-full border-8 border-white/10 bg-[#171717] hover:bg-white hover:border-[#D1F349] text-white hover:text-black flex flex-col items-center justify-center text-center font-bold leading-tight p-4 shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(209,243,73,0.5)]">
                            <span className="text-xs block mb-1 tracking-widest opacity-70 group-hover:opacity-100">CERTIFIED</span>
                            <span className="text-3xl block font-extrabold">ISO</span>
                            <span className="text-sm">9001:2015</span>
                        </div>
                    </div>

                    <button 
                        onClick={() => window.location.href = 'mailto:hello@molca.id'}
                        className="bg-[#D1F349] text-black font-bold py-5 px-12 rounded-xl hover:bg-[#bce038] transition shadow-[0_0_25px_rgba(209,243,73,0.4)] w-fit text-xl hover:-translate-y-1"
                    >
                        Contact Now
                    </button>
                </div>
            </div>

            <div className="border-t border-white/10 pt-10 text-center lg:text-left flex flex-col lg:flex-row justify-between items-center gap-6 text-base font-medium">
                <p>&copy; {new Date().getFullYear()} PT Molca Teknologi Nusantara. All Rights Reserved.</p>
                <div className="flex gap-8">
                    <a href="#" className="hover:text-[#D1F349] transition">Privacy Policy</a>
                    <a href="#" className="hover:text-[#D1F349] transition">Terms of Service</a>
                </div>
            </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;