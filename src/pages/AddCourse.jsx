import React, { useState } from 'react';
import { db } from '../services/firebase'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Plus, Trash2, Video, FileText, Clock, Save, UploadCloud, X, Layers, AlertCircle } from 'lucide-react';

const AddCourse = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // --- CONFIG CLOUDINARY ---
  const CLOUD_NAME = "dx9sijwfa"; 
  const UPLOAD_PRESET = "molca_upload"; 
  // -------------------------

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const [courseData, setCourseData] = useState({
    title: '',
    category: 'Marketing',
    description: '',
  });

  const [modules, setModules] = useState([
    { title: '', videoUrl: '', duration: '', content: '' }
  ]);

  // Warna Brand
  const MOLCA_LIME = '#D1F349';

  const handleCourseChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleModuleChange = (index, e) => {
    const newModules = [...modules];
    newModules[index][e.target.name] = e.target.value;
    setModules(newModules);
  };

  const addModule = () => {
    setModules([...modules, { title: '', videoUrl: '', duration: '', content: '' }]);
  };

  const removeModule = (index) => {
    const newModules = [...modules];
    newModules.splice(index, 1);
    setModules(newModules);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!imageFile && !previewUrl) return alert("Harap upload gambar cover!");
    if (modules.length === 0) return alert("Minimal harus ada 1 modul materi!");

    setLoading(true);

    try {
      let finalImageUrl = "";

      if (imageFile) {
          const formDataUpload = new FormData();
          formDataUpload.append("file", imageFile);
          formDataUpload.append("upload_preset", UPLOAD_PRESET);

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            { method: "POST", body: formDataUpload }
          );

          const data = await response.json();
          finalImageUrl = data.secure_url;
      }

      await addDoc(collection(db, 'courses'), {
        ...courseData,
        image: finalImageUrl,
        modules: modules,
        totalModules: modules.length,
        createdAt: serverTimestamp(),
      });

      alert("Kursus berhasil diterbitkan!");
      navigate('/dashboard'); 

    } catch (error) {
      console.error("Error:", error);
      alert("Gagal upload. Cek Cloud Name atau Koneksi.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans text-gray-200 selection:bg-[#D1F349] selection:text-black pb-20">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 pt-28">
        
        {/* HEADER HALAMAN */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="bg-[#D1F349]/10 text-[#D1F349] border border-[#D1F349]/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-2">
                        <Layers size={14} /> Admin Console
                    </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Buat Materi Baru</h1>
                <p className="text-gray-400 mt-2">Tambahkan modul pelatihan digital twin ke dalam sistem.</p>
            </div>
        </div>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- KOLOM KIRI: INFO UTAMA --- */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#171717] p-6 rounded-2xl border border-white/10 shadow-2xl sticky top-24">
                <h3 className="font-bold text-white mb-6 flex items-center gap-2 text-lg">
                    <AlertCircle size={20} className="text-[#D1F349]"/> Informasi Umum
                </h3>
                
                <div className="space-y-5">
                    {/* Judul */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Judul Kursus</label>
                        <input type="text" name="title" required onChange={handleCourseChange}
                            className="w-full bg-[#0a0a0a] border border-white/10 p-3 rounded-xl text-white placeholder-gray-600 focus:border-[#D1F349] focus:ring-1 focus:ring-[#D1F349] outline-none transition" 
                            placeholder="Contoh: Master React JS" />
                    </div>

                    {/* Kategori */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Kategori</label>
                        <select name="category" onChange={handleCourseChange} className="w-full bg-[#0a0a0a] border border-white/10 p-3 rounded-xl text-white focus:border-[#D1F349] focus:ring-1 focus:ring-[#D1F349] outline-none transition appearance-none cursor-pointer">
                            <option value="Marketing">Marketing</option>
                            <option value="Design">Design</option>
                            <option value="Development">Development</option>
                            <option value="Business">Business</option>
                            <option value="Finance">Finance</option>
                        </select>
                    </div>

                    {/* Deskripsi */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Deskripsi Singkat</label>
                        <textarea name="description" required onChange={handleCourseChange} className="w-full bg-[#0a0a0a] border border-white/10 p-3 rounded-xl text-white placeholder-gray-600 focus:border-[#D1F349] focus:ring-1 focus:ring-[#D1F349] outline-none transition h-32 text-sm"></textarea>
                    </div>

                    {/* Upload Gambar */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Cover Gambar</label>
                        
                        {!previewUrl ? (
                            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:bg-white/5 transition cursor-pointer relative group bg-[#0a0a0a]">
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleFileChange} 
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="flex flex-col items-center group-hover:scale-105 transition-transform">
                                    <UploadCloud className="text-[#D1F349] mb-3" size={32} />
                                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wide">Klik untuk upload</span>
                                </div>
                            </div>
                        ) : (
                            <div className="relative mt-2 group">
                                <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover rounded-xl border border-white/10 shadow-lg" />
                                <button 
                                    type="button"
                                    onClick={() => { setPreviewUrl(''); setImageFile(null); }}
                                    className="absolute top-2 right-2 bg-red-500/80 text-white p-1.5 rounded-full shadow-lg hover:bg-red-600 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Tombol Simpan (Desktop) */}
                <button type="submit" disabled={loading} className="hidden lg:flex w-full bg-[#D1F349] text-black py-4 rounded-xl font-bold hover:bg-[#bce038] transition items-center justify-center gap-2 shadow-lg shadow-[#d1f349]/10 mt-8 text-sm uppercase tracking-wider">
                    <Save size={18} /> {loading ? 'Menyimpan...' : 'Terbitkan Kursus'}
                </button>
            </div>
          </div>

          {/* --- KOLOM KANAN: MODUL DINAMIS --- */}
          <div className="lg:col-span-2">
            <div className="bg-[#171717] p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl">
                <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
                    <div>
                        <h3 className="font-bold text-white text-xl">Konten Pembelajaran</h3>
                        <p className="text-gray-500 text-sm mt-1">Susun urutan video dan materi.</p>
                    </div>
                    <button type="button" onClick={addModule} className="text-sm flex items-center gap-2 bg-white/5 text-[#D1F349] border border-[#D1F349]/30 px-4 py-2 rounded-lg hover:bg-[#D1F349]/10 transition font-bold">
                        <Plus size={18} /> Tambah Modul
                    </button>
                </div>

                <div className="space-y-6">
                    {modules.map((module, index) => (
                        <div key={index} className="bg-[#0a0a0a] p-6 rounded-xl border border-white/10 relative group transition hover:border-white/20">
                            
                            {/* Header Card Modul */}
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#D1F349]/10 text-[#D1F349] flex items-center justify-center font-bold text-sm border border-[#D1F349]/20">
                                        {index + 1}
                                    </div>
                                    <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Modul Video</span>
                                </div>
                                {modules.length > 1 && (
                                    <button type="button" onClick={() => removeModule(index)} 
                                        className="text-gray-600 hover:text-red-500 transition bg-[#171717] p-2 rounded-lg hover:bg-red-500/10">
                                        <Trash2 size={18} />
                                    </button>
                                )}
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Judul Materi</label>
                                    <input type="text" name="title" value={module.title} required
                                        onChange={(e) => handleModuleChange(index, e)}
                                        className="w-full bg-[#171717] border border-white/10 p-3 rounded-lg text-white focus:border-[#D1F349] focus:ring-1 focus:ring-[#D1F349] outline-none transition text-sm" placeholder="Judul Bab..." />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-1"><Clock size={12}/> Durasi (Menit)</label>
                                    <input type="number" name="duration" value={module.duration} required
                                        onChange={(e) => handleModuleChange(index, e)}
                                        className="w-full bg-[#171717] border border-white/10 p-3 rounded-lg text-white focus:border-[#D1F349] focus:ring-1 focus:ring-[#D1F349] outline-none transition text-sm" placeholder="Contoh: 15" />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-1"><Video size={12}/> Link YouTube</label>
                                <div className="relative">
                                    <input type="url" name="videoUrl" value={module.videoUrl} required
                                        onChange={(e) => handleModuleChange(index, e)}
                                        className="w-full bg-[#171717] border border-white/10 p-3 pl-10 rounded-lg text-white focus:border-[#D1F349] focus:ring-1 focus:ring-[#D1F349] outline-none transition text-sm font-mono text-blue-300" placeholder="https://youtube.com/..." />
                                    <Video size={16} className="absolute left-3 top-3.5 text-gray-500" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-1"><FileText size={12}/> Ringkasan Materi</label>
                                <textarea name="content" value={module.content} required
                                    onChange={(e) => handleModuleChange(index, e)}
                                    className="w-full bg-[#171717] border border-white/10 p-3 rounded-lg h-24 text-sm text-gray-300 focus:border-[#D1F349] focus:ring-1 focus:ring-[#D1F349] outline-none transition resize-none" 
                                    placeholder="Jelaskan poin-poin penting..."
                                ></textarea>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                    <button type="button" onClick={addModule} className="w-full py-4 border border-dashed border-white/20 rounded-xl text-gray-400 font-bold hover:border-[#D1F349] hover:text-[#D1F349] hover:bg-[#D1F349]/5 transition flex items-center justify-center gap-2 uppercase text-xs tracking-widest">
                        <Plus size={18} /> Tambah Modul Lain
                    </button>
                </div>
            </div>

            {/* Tombol Submit Mobile */}
            <button type="submit" disabled={loading} className="lg:hidden w-full bg-[#D1F349] text-black py-4 rounded-xl font-bold hover:bg-[#bce038] transition mt-6 shadow-lg text-sm uppercase tracking-wider">
                {loading ? 'Menyimpan...' : 'Terbitkan Kursus'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddCourse;