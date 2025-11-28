import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail, Lock, ArrowRight, Box } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Warna Brand Molca
  const MOLCA_LIME = '#D1F349';

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login berhasil! Selamat datang.', {
        style: { background: '#333', color: MOLCA_LIME },
        iconTheme: { primary: MOLCA_LIME, secondary: '#000' },
      });
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      toast.error('Email atau password salah.', {
        style: { background: '#333', color: '#fff' },
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex font-sans selection:bg-[#D1F349] selection:text-black">
      
      {/* --- BAGIAN KIRI: VISUAL & BRANDING --- */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#111] relative overflow-hidden items-center justify-center">
        {/* Background Abstract */}
        <div className="absolute top-0 left-0 w-full h-full bg-[#111]">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D1F349] rounded-full blur-[150px] opacity-20 animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-gray-700 rounded-full blur-[100px] opacity-30"></div>
        </div>

        <div className="relative z-10 p-16 text-white h-full flex flex-col justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#D1F349] rounded-lg flex items-center justify-center text-black font-bold text-xl shadow-[0_0_20px_rgba(209,243,73,0.4)]">
                    M
                </div>
                <span className="text-2xl font-bold tracking-tight">molca</span>
            </div>

            <div className="max-w-lg">
                <h1 className="text-5xl font-extrabold mb-6 leading-tight">
                    Digital Twin <br/>
                    <span className="text-[#D1F349]">LMS Platform.</span>
                </h1>
                <p className="text-gray-400 text-lg leading-relaxed border-l-4 border-[#D1F349] pl-6">
                    "Platform pelatihan industri masa depan yang mengintegrasikan data real-time dan pembelajaran imersif."
                </p>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-500">
                <Box className="text-[#D1F349]" size={18} />
                <span>Powered by Molca Teknologi Nusantara</span>
            </div>
        </div>
      </div>

      {/* --- BAGIAN KANAN: FORM LOGIN --- */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#0a0a0a] relative">
        <div className="w-full max-w-md space-y-8 bg-[#171717] p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl">
            
            {/* Header Mobile (Logo) */}
            <div className="lg:hidden text-center mb-8">
                 <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-[#D1F349] rounded flex items-center justify-center text-black font-bold">M</div>
                    <span className="text-xl font-bold text-white">molca</span>
                </div>
            </div>

            <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">Selamat Datang</h2>
                <p className="text-gray-400 text-sm">Masuk untuk melanjutkan akses materi.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6 mt-8">
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Email</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-[#D1F349] transition-colors" />
                            </div>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full pl-12 pr-4 py-3.5 bg-[#0a0a0a] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:border-[#D1F349] focus:ring-1 focus:ring-[#D1F349] outline-none transition-all text-sm font-medium"
                                placeholder="nama@perusahaan.com"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2 ml-1">
                            <label className="block text-xs font-bold text-gray-500 uppercase">Password</label>
                            <a href="#" className="text-xs text-[#D1F349] hover:underline font-medium">Lupa Password?</a>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-[#D1F349] transition-colors" />
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full pl-12 pr-4 py-3.5 bg-[#0a0a0a] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:border-[#D1F349] focus:ring-1 focus:ring-[#D1F349] outline-none transition-all text-sm font-medium"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center py-4 px-4 bg-[#D1F349] hover:bg-[#bce038] rounded-xl font-bold text-black text-sm uppercase tracking-wider transition-all transform active:scale-95 shadow-[0_4px_14px_0_rgba(209,243,73,0.39)]"
                >
                    {loading ? (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <>Masuk Sekarang <ArrowRight size={18} className="ml-2" /></>
                    )}
                </button>
            </form>

            <div className="text-center mt-8 pt-6 border-t border-white/5">
                <p className="text-gray-500 text-sm">
                    Belum punya akun?{' '}
                    <Link to="/register" className="font-bold text-[#D1F349] hover:underline transition ml-1">
                        Daftar di sini
                    </Link>
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;