import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, BarChart2, Users, ArrowRight, PlayCircle, Menu, X, Box, Zap, Layers, MapPin, Phone, Mail } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
              <a href="#solutions" className="text-gray-400 hover:text-[#D1F349] font-medium transition text-sm uppercase tracking-wider">Solusi</a>
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
                <span className="text-[#D1F349] text-xs font-bold uppercase tracking-widest">Platform Pelatihan Digital Twin</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight text-white">
                Revolusi <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D1F349] to-[#a3c918]">
                  LMS Industri
                </span> <br/>
                Masa Depan.
              </h1>
              <p className="text-lg text-gray-400 leading-relaxed max-w-lg border-l-2 border-[#D1F349] pl-6">
                Tingkatkan kinerja industri dengan pelatihan berbasis web yang terintegrasi. Permudah pengelolaan aset SDM dan operasional.
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
              <div className="absolute -inset-1 bg-gradient-to-r from-[#D1F349] to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative rounded-2xl bg-[#171717] border border-white/10 p-2 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000" 
                  alt="Dashboard Preview" 
                  className="rounded-xl w-full h-auto opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. CLIENTS --- */}
      <section className="py-12 border-y border-white/5 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-8">Dipercaya oleh Pemimpin Industri</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {['PERTAMINA', 'PLN INDONESIA', 'TOYOTA', 'ASTRA', 'UNILEVER'].map((logo) => (
                <span key={logo} className="text-2xl font-bold text-white hover:text-[#D1F349] cursor-default transition-colors">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. FEATURES --- */}
      <section id="features" className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Digital Twin <span className="text-[#D1F349]">LMS Pipeline</span></h2>
                <p className="text-gray-400 max-w-2xl mx-auto">Integrasikan data pelatihan dengan operasional nyata menggunakan teknologi Molca.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { icon: Layers, title: "Integrasi IoT", desc: "Hubungkan data mesin langsung ke materi pelatihan." },
                    { icon: BarChart2, title: "Real-time Analytics", desc: "Pantau progres karyawan dengan data visualisasi 3D." },
                    { icon: Box, title: "Aset Manajemen", desc: "Kelola aset digital dan fisik dalam satu platform terpadu." }
                ].map((feature, i) => (
                    <div key={i} className="bg-[#171717] p-8 rounded-2xl border border-white/5 hover:border-[#D1F349]/50 transition group">
                        <div className="w-14 h-14 bg-[#262626] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#D1F349] transition duration-300">
                            <feature.icon size={28} className="text-[#D1F349] group-hover:text-black transition" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- 5. CTA BOTTOM --- */}
      <section className="py-24 bg-[#D1F349]">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">Siap Transformasi Digital?</h2>
            <p className="text-xl text-black/70 mb-10 max-w-2xl mx-auto font-medium">
                Bergabunglah dengan revolusi industri 4.0 bersama Molca.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                    onClick={() => navigate('/register')}
                    className="px-10 py-4 bg-black text-white rounded-lg font-bold text-lg hover:bg-gray-800 transition shadow-xl"
                >
                    Mulai Sekarang
                </button>
                <button className="px-10 py-4 bg-transparent text-black border-2 border-black rounded-lg font-bold text-lg hover:bg-black/10 transition">
                    Hubungi Sales
                </button>
            </div>
        </div>
      </section>

      {/* --- 6. FOOTER BARU (Sesuai Request) --- */}
      <footer className="bg-[#111] pt-16 pb-12 border-t border-white/10 text-gray-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
                
                {/* KIRI: Logo & Kontak */}
                <div className="lg:col-span-5 space-y-8">
                    {/* Logo Outline Style */}
                    <div className="flex items-center gap-2">
                        <span 
                          className="text-5xl font-bold text-transparent" 
                          style={{ WebkitTextStroke: '1px white', fontFamily: 'sans-serif' }}
                        >
                          molca
                        </span>
                    </div>

                    <div>
                        <h3 className="text-[#D1F349] font-bold text-lg mb-6">Office and Workshop</h3>
                        
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <MapPin className="text-[#D1F349] mt-1 flex-shrink-0" size={20} />
                                <p className="leading-relaxed">JAPFA Tower II Lt. 12, Surabaya,<br/>East Java, Indonesia, 60271</p>
                            </div>
                            
                            <div className="flex items-start gap-4">
                                <MapPin className="text-[#D1F349] mt-1 flex-shrink-0" size={20} />
                                <p className="leading-relaxed">Dharmahusada Indah Barat V AA<br/>No.30A, Mojo, Kec. Gubeng,<br/>Surabaya, Jawa Timur 60285</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <Phone className="text-[#D1F349] flex-shrink-0" size={20} />
                                <p>+62 811 324 066</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <Mail className="text-[#D1F349] flex-shrink-0" size={20} />
                                <p>hello@molca.id</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* KANAN: Legal Info & ISO */}
                <div className="lg:col-span-7 flex flex-col lg:items-end space-y-8 text-left lg:text-right">
                    
                    <div className="space-y-4">
                        <div>
                            <p className="text-white font-semibold mb-1">Legal Name:</p>
                            <p>PT Molca Teknologi Nusantara</p>
                        </div>
                        
                        <div>
                            <p className="text-white font-semibold mb-1">Nomer Induk Berusaha (NIB):</p>
                            <p>1101230026145 - Januari 2023</p>
                        </div>

                        <div>
                            <p className="text-white font-semibold mb-1">No. Pengukuhan PKP (Enterprise Tax):</p>
                            <p>S-25/PKP/KPP.110903/2023</p>
                        </div>
                    </div>

            
                    

                    {/* Contact Button */}
                    <button 
                        onClick={() => window.location.href = 'mailto:hello@molca.id'}
                        className="bg-[#D1F349] text-black font-bold py-4 px-10 rounded-lg hover:bg-[#bce038] transition shadow-[0_0_20px_rgba(209,243,73,0.4)] w-fit text-lg"
                    >
                        Contact Now
                    </button>

                </div>
            </div>

            <div className="border-t border-white/10 pt-8 text-center lg:text-left flex flex-col lg:flex-row justify-between items-center gap-4">
                <p>&copy; {new Date().getFullYear()} PT Molca Teknologi Nusantara, All Rights Reserved</p>
                <div className="flex gap-6">
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