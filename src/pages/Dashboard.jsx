// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PlusCircle, BookOpen, Filter, TrendingUp, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import CourseCard from '../components/CourseCard';

const Dashboard = () => {
  const { currentUser, userRole } = useAuth();
  const navigate = useNavigate();
  // 1. Gunakan searchParams
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('Learner');
  
  const [statusFilter, setStatusFilter] = useState('all'); 
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', 'Marketing', 'Design', 'Development', 'Business', 'Finance'];
  const MOLCA_LIME = '#D1F349'; // Warna Brand

  useEffect(() => {
    const initData = async () => {
        if (currentUser) {
            await Promise.all([fetchCourses(), fetchProgress(), fetchUserName()]);
            setLoading(false);
        }
    };
    initData();
  }, [currentUser]);

  const fetchUserName = async () => {
      try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
              setUserName(userDoc.data().name || 'Learner');
          }
      } catch (error) { console.error("Error fetch user:", error); }
  };

  const fetchCourses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'courses'));
      const coursesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCourses(coursesData);
    } catch (error) { console.error('Error fetching courses:', error); }
  };

  const fetchProgress = async () => {
    try {
      const q = query(collection(db, 'progress'), where('userId', '==', currentUser.uid));
      const querySnapshot = await getDocs(q);
      const progressData = {};
      querySnapshot.docs.forEach(doc => {
        const data = doc.data();
        progressData[data.courseId] = data.percentage || 0;
      });
      setProgress(progressData);
    } catch (error) { console.error('Error fetching progress:', error); }
  };

  const handleDelete = async (courseId) => {
    if (window.confirm("Hapus kursus ini secara permanen?")) {
        try {
            await deleteDoc(doc(db, 'courses', courseId));
            setCourses(prev => prev.filter(c => c.id !== courseId));
            alert("Kursus berhasil dihapus");
        } catch (error) { console.error("Gagal hapus:", error); }
    }
  };

  // 2. LOGIKA FILTER PENCARIAN
  const filteredCourses = courses.filter(course => {
    const userProgress = progress[course.id]; 
    let matchesStatus = true;
    
    if (statusFilter === 'in-progress') {
        matchesStatus = userProgress !== undefined && userProgress < 100;
    } else if (statusFilter === 'completed') {
        matchesStatus = userProgress === 100;
    }

    let matchesCategory = true;
    if (categoryFilter !== 'All') {
        matchesCategory = course.category === categoryFilter;
    }

    // Filter berdasarkan Judul (Case Insensitive)
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesCategory && matchesSearch;
  });

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#0a0a0a]"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#D1F349]"></div></div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 pb-20 font-sans selection:bg-[#D1F349] selection:text-black">
      <Navbar />

      {/* HERO SECTION DARK */}
      <div className="pt-28 pb-12 px-4 lg:px-8 bg-[#171717] border-b border-white/10">
        <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="bg-[#D1F349]/10 text-[#D1F349] border border-[#D1F349]/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-2">
                            <TrendingUp size={14} /> Dashboard
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">
                        Halo, {userName}! 👋
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl">
                        Akses modul pelatihan digital dan materi eksklusif Molca di sini.
                    </p>
                </div>

                {/* Tombol Admin */}
                {userRole === 'admin' && (
                    <button 
                        onClick={() => navigate('/admin/add-course')}
                        className="bg-[#D1F349] text-black font-bold py-3 px-6 rounded-xl hover:bg-[#bce038] hover:shadow-[0_0_20px_rgba(209,243,73,0.4)] transition flex items-center gap-2 shadow-lg"
                    >
                        <PlusCircle size={20} /> Buat Kursus Baru
                    </button>
                )}
            </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 -mt-8">
        
        {/* --- FILTER SECTION DARK --- */}
        <div className="bg-[#171717] p-2 rounded-2xl shadow-xl border border-white/10 mb-8 backdrop-blur-sm">
            <div className="flex flex-col gap-4 p-2">
                
                {/* 1. Tab Status */}
                <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
                    {[
                        { key: 'all', label: 'Semua Kursus' },
                        { key: 'in-progress', label: 'Sedang Berjalan' },
                        { key: 'completed', label: 'Selesai' }
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setStatusFilter(tab.key)}
                            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                                statusFilter === tab.key
                                    ? 'bg-[#D1F349] text-black shadow-[0_0_15px_rgba(209,243,73,0.3)]'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* 2. Tab Kategori */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-2 flex items-center gap-1">
                        <Filter size={14} /> Kategori:
                    </span>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategoryFilter(cat)}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all whitespace-nowrap ${
                                categoryFilter === cat
                                    ? 'bg-[#D1F349]/20 border-[#D1F349] text-[#D1F349]'
                                    : 'bg-transparent border-white/20 text-gray-400 hover:border-white/50 hover:text-white'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

            </div>
        </div>

        {/* --- GRID KURSUS --- */}
        {filteredCourses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 bg-[#171717] rounded-3xl border border-dashed border-white/20 text-center">
                <div className="bg-[#262626] p-6 rounded-full mb-4">
                    {searchQuery ? <Search size={48} className="text-gray-500" /> : <BookOpen size={48} className="text-gray-500" />}
                </div>
                <h3 className="text-2xl font-bold text-gray-300 mb-2">
                    {searchQuery ? `Tidak ada hasil untuk "${searchQuery}"` : "Belum ada data"}
                </h3>
                <p className="text-gray-500 max-w-md">
                    {searchQuery ? "Coba kata kunci lain." : "Tidak ada kursus yang sesuai filter ini."}
                </p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-10">
                {filteredCourses.map(course => (
                <CourseCard
                    key={course.id}
                    course={course}
                    progress={progress[course.id] || 0}
                    isAdmin={userRole === 'admin'}
                    onDelete={handleDelete}
                />
                ))}
            </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;