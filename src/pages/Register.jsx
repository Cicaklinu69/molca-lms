import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail, Lock, User, ArrowRight, CheckCircle } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return toast.error('Password tidak cocok.');
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name: formData.name,
        email: formData.email,
        role: 'user',
        createdAt: serverTimestamp(),
      });
      toast.success('Akun berhasil dibuat!');
      navigate('/login');
    } catch (error) {
      toast.error('Gagal membuat akun.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-row-reverse">
      
      {/* KANAN: Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#111] relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1a1a1a] to-[#0a0a0a]"></div>
        <div className="relative z-10 p-12">
            <h2 className="text-4xl font-bold text-white mb-8">Bergabung dengan Molca</h2>
            <ul className="space-y-6">
                {['Akses Digital Twin LMS', 'Monitoring Real-time', 'Sertifikasi Industri', 'Dukungan Teknis 24/7'].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-gray-300">
                        <div className="p-1 bg-[#D1F349]/20 rounded-full"><CheckCircle size={20} className="text-[#D1F349]" /></div>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
      </div>

      {/* KIRI: Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#0a0a0a]">
        <div className="w-full max-w-md space-y-8 bg-[#171717] p-8 rounded-2xl border border-white/10 shadow-2xl">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white">Buat Akun Baru</h2>
                <p className="mt-2 text-gray-400">Daftar untuk memulai akses.</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Nama Lengkap</label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-500" size={20} />
                        <input type="text" name="name" required onChange={handleChange} className="block w-full pl-10 pr-3 py-3 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:border-[#D1F349] focus:ring-1 focus:ring-[#D1F349] outline-none transition" placeholder="Nama Anda" />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-500" size={20} />
                        <input type="email" name="email" required onChange={handleChange} className="block w-full pl-10 pr-3 py-3 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:border-[#D1F349] focus:ring-1 focus:ring-[#D1F349] outline-none transition" placeholder="email@perusahaan.com" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Password</label>
                        <input type="password" name="password" required onChange={handleChange} className="block w-full px-3 py-3 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:border-[#D1F349] outline-none transition" placeholder="******" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Konfirmasi</label>
                        <input type="password" name="confirmPassword" required onChange={handleChange} className="block w-full px-3 py-3 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:border-[#D1F349] outline-none transition" placeholder="******" />
                    </div>
                </div>

                <button type="submit" disabled={loading} className="w-full py-3 px-4 bg-[#D1F349] hover:bg-[#bce038] rounded-lg font-bold text-black transition shadow-lg shadow-[#d1f349]/10">
                    {loading ? 'Memproses...' : 'Daftar Sekarang'}
                </button>
            </form>

            <div className="text-center">
                <p className="text-gray-500 text-sm">
                    Sudah punya akun? <Link to="/login" className="text-[#D1F349] hover:underline font-bold">Login di sini</Link>
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Register;