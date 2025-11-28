import React, { useState } from 'react';
import { Search, Bell, Menu, User, LogOut, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Warna Brand
  const MOLCA_LIME = '#D1F349';

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    if (query) {
        setSearchParams({ q: query });
        if (window.location.pathname !== '/dashboard') {
            navigate(`/dashboard?q=${query}`);
        }
    } else {
        setSearchParams({});
    }
  };

  return (
    <>
      {/* NAVBAR DARK MODE */}
      <nav className="fixed top-0 left-0 w-full h-20 bg-[#171717] border-b border-white/10 z-50 flex items-center shadow-lg font-sans">
        <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            
            {/* 1. KIRI: Logo & Navigasi */}
            <div className="flex items-center gap-8">
                <Link to="/dashboard" className="flex items-center gap-2 cursor-pointer group">
                    {/* Logo Icon */}
                    <div className="w-9 h-9 bg-[#D1F349] rounded-lg flex items-center justify-center text-black font-bold text-xl shadow-[0_0_15px_rgba(209,243,73,0.3)] group-hover:scale-105 transition-transform">
                        M
                    </div>
                    {/* Teks Logo */}
                    <span className="text-2xl font-extrabold text-white tracking-tight group-hover:text-[#D1F349] transition-colors">
                        molca
                    </span>
                </Link>

                <div className="hidden md:flex items-center space-x-6">
                    {/* Tombol Dashboard DIHAPUS sesuai permintaan */}
                    
                    {/* SEARCH BAR DARK */}
                    <div className="relative group ml-2">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#D1F349] transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Cari materi..." 
                            value={searchParams.get('q') || ''}
                            onChange={handleSearch}
                            className="pl-9 pr-4 py-2 rounded-full border border-white/10 bg-[#262626] text-sm text-white focus:bg-black focus:border-[#D1F349] focus:ring-1 focus:ring-[#D1F349] outline-none w-64 transition-all font-medium placeholder-gray-500"
                        />
                    </div>
                </div>
            </div>

            {/* 2. KANAN: User Profile */}
            <div className="flex items-center gap-3 lg:gap-4">
                <button className="text-gray-400 hover:text-[#D1F349] transition relative p-2.5 rounded-full hover:bg-white/5">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#171717]"></span>
                </button>

                <div className="relative">
                    <button 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full border border-white/10 hover:border-[#D1F349]/50 hover:bg-white/5 transition group"
                    >
                        <div className="w-8 h-8 bg-gradient-to-br from-[#D1F349] to-[#a3c918] rounded-full flex items-center justify-center text-black font-bold text-xs shadow-sm">
                            {currentUser?.email?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <span className="text-sm font-bold text-gray-300 hidden sm:block max-w-[100px] truncate group-hover:text-white">
                            {currentUser?.email?.split('@')[0]}
                        </span>
                        <ChevronDown size={14} className={`text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isDropdownOpen && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)}></div>
                            <div className="absolute right-0 top-full mt-3 w-60 bg-[#262626] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                <div className="p-4 border-b border-white/10 bg-[#1f1f1f]">
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Akun Aktif</p>
                                    <p className="text-sm font-bold text-white truncate">{currentUser?.email}</p>
                                </div>
                                <div className="p-2 space-y-1">
                                    <button className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-400 hover:bg-[#D1F349]/10 hover:text-[#D1F349] rounded-lg transition font-medium">
                                        <User size={18} /> Edit Profil
                                    </button>
                                    <div className="border-t border-white/10 my-1"></div>
                                    <button 
                                        onClick={handleLogout}
                                        className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition font-medium"
                                    >
                                        <LogOut size={18} /> Keluar Aplikasi
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;