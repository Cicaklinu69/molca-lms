// src/pages/CourseDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs, addDoc, serverTimestamp, orderBy, deleteDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { ArrowLeft, MessageSquare, ChevronDown, PlayCircle, Lock, Edit3, Save, Trash2, X, Send, Clock, CheckCircle, Plus, Info } from 'lucide-react';
import toast from 'react-hot-toast';

const CourseDetail = () => {
  const { courseId } = useParams();
  const { currentUser, userRole } = useAuth();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState('');

  const [activeModule, setActiveModule] = useState(null);
  const [expandedModule, setExpandedModule] = useState(null);

  const [isEditingContent, setIsEditingContent] = useState(false);
  const [editedModules, setEditedModules] = useState([]);

  // Warna Tema Molca (Lime Green)
  const MOLCA_LIME = '#D1F349';

  useEffect(() => {
    if (currentUser) {
        fetchCourseAndProgress();
        fetchComments();
    }
  }, [courseId, currentUser]);

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|live\/)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  const fetchCourseAndProgress = async () => {
    try {
      const courseDoc = await getDoc(doc(db, 'courses', courseId));
      if (courseDoc.exists()) {
        const data = courseDoc.data();
        const modules = data.modules || []; 
        
        setCourse({ id: courseDoc.id, ...data, modules });
        setEditedModules(modules);

        if (modules.length > 0 && !activeModule) {
            setActiveModule(modules[0]);
        }
      } else {
        navigate('/dashboard'); return;
      }

      const progressId = `${currentUser.uid}_${courseId}`;
      const progressDoc = await getDoc(doc(db, 'progress', progressId));
      
      if (progressDoc.exists()) {
        setProgress(progressDoc.data());
      } else {
        setProgress(null);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
        const q = query(
            collection(db, 'course_comments'), 
            where('courseId', '==', courseId),
            orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const commentsData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setComments(commentsData);
    } catch (error) {
        console.error("Error fetching comments:", error); 
    }
  };

  const handlePostComment = async (e) => {
      e.preventDefault();
      if (!newComment.trim()) return;

      try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          const userName = userDoc.exists() ? userDoc.data().name : 'User';

          await addDoc(collection(db, 'course_comments'), {
              courseId: courseId,
              userId: currentUser.uid,
              userName: userName,
              text: newComment,
              createdAt: serverTimestamp()
          });

          setNewComment('');
          fetchComments();
          toast.success("Komentar terkirim!", { style: { background: '#333', color: MOLCA_LIME } });
      } catch (error) {
          toast.error("Gagal mengirim komentar.");
      }
  };

  const handleDeleteComment = async (commentId) => {
      if (window.confirm("Hapus komentar ini?")) {
          try {
              await deleteDoc(doc(db, 'course_comments', commentId));
              fetchComments();
              toast.success("Komentar dihapus.");
          } catch (error) {
              toast.error("Gagal menghapus.");
          }
      }
  };

  const startEditingComment = (comment) => {
      setEditingCommentId(comment.id);
      setEditingCommentText(comment.text);
  };

  const saveEditedComment = async () => {
      try {
          await updateDoc(doc(db, 'course_comments', editingCommentId), {
              text: editingCommentText,
              isEdited: true
          });
          setEditingCommentId(null);
          fetchComments();
          toast.success("Komentar diperbarui.");
      } catch (error) {
          toast.error("Gagal update komentar.");
      }
  };

  const handleAddModule = () => {
      setEditedModules([...editedModules, { title: '', videoUrl: '', duration: '', description: '' }]);
  };

  const handleRemoveModule = (index) => {
      const newModules = [...editedModules];
      newModules.splice(index, 1);
      setEditedModules(newModules);
  };

  const handleModuleChange = (index, field, value) => {
      const newModules = [...editedModules];
      newModules[index][field] = value;
      setEditedModules(newModules);
  };

  const saveCourseContent = async () => {
      try {
          await updateDoc(doc(db, 'courses', courseId), {
              modules: editedModules,
              totalModules: editedModules.length
          });
          setCourse({ ...course, modules: editedModules });
          setIsEditingContent(false);
          toast.success("Materi kursus berhasil diperbarui!");
      } catch (error) {
          toast.error("Gagal memperbarui materi.");
      }
  };

  const handleEnroll = async () => {
      setLoading(true);
      const progressId = `${currentUser.uid}_${courseId}`;
      const newProgress = {
          userId: currentUser.uid,
          courseId: courseId,
          completedModules: [],
          percentage: 0,
          lastAccessed: new Date(),
      };

      try {
          await setDoc(doc(db, 'progress', progressId), newProgress);
          setProgress(newProgress);
          toast.success("Berhasil mulai belajar!", { style: { background: '#333', color: MOLCA_LIME } });
      } catch (error) {
          toast.error("Gagal enroll.");
      }
      setLoading(false);
  };

  const toggleModuleCheck = async (moduleIndex) => {
    if (!progress) {
        toast.error("Klik 'Mulai Belajar' dulu!");
        return;
    }

    const progressId = `${currentUser.uid}_${courseId}`;
    let updatedModules = [...(progress.completedModules || [])];
    
    if (updatedModules.includes(moduleIndex)) {
      updatedModules = updatedModules.filter(m => m !== moduleIndex);
    } else {
      updatedModules.push(moduleIndex);
    }

    const percentage = course.modules.length > 0 ? Math.round((updatedModules.length / course.modules.length) * 100) : 0;

    try {
      await updateDoc(doc(db, 'progress', progressId), {
        completedModules: updatedModules,
        percentage: percentage,
        lastAccessed: new Date()
      });
      setProgress({ ...progress, completedModules: updatedModules, percentage: percentage });
    } catch (error) { console.error('Error:', error); }
  };

  const toggleAccordion = (index) => {
      setExpandedModule(expandedModule === index ? null : index);
  };

  if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#D1F349]"></div></div>;
  if (!course) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 pb-20 font-sans selection:bg-[#D1F349] selection:text-black">
      <Navbar />

      {/* HEADER DARK THEME */}
      <div className="bg-[#171717] border-b border-white/10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button onClick={() => navigate('/dashboard')} className="mb-6 flex items-center text-gray-400 hover:text-[#D1F349] transition w-fit group">
                <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Kembali
            </button>
            
            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="flex-1">
                    <span className="bg-[#D1F349]/10 text-[#D1F349] border border-[#D1F349]/20 text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block uppercase tracking-wider">
                        {course.category || 'General'}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white leading-tight">{course.title}</h1>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-2xl line-clamp-2">{course.description}</p>
                </div>
                
                {/* STATUS BAR / BUTTON */}
                {progress ? (
                    <div className="bg-[#262626] border border-white/10 p-5 rounded-xl min-w-[300px]">
                        <div className="flex justify-between text-sm mb-3 font-medium text-gray-300">
                            <span>Progress Belajar</span>
                            <span className="text-[#D1F349]">{progress.percentage}%</span>
                        </div>
                        <div className="w-full bg-black rounded-full h-3 overflow-hidden border border-white/5">
                            <div 
                                className="h-full rounded-full transition-all duration-500 shadow-[0_0_15px_rgba(209,243,73,0.4)]" 
                                style={{ width: `${progress.percentage}%`, backgroundColor: MOLCA_LIME }} 
                            />
                        </div>
                    </div>
                ) : (
                    <button 
                        onClick={handleEnroll} 
                        className="bg-[#D1F349] text-black font-bold py-4 px-10 rounded-xl hover:bg-[#bce038] hover:shadow-[0_0_20px_rgba(209,243,73,0.3)] transition transform active:scale-95 flex items-center gap-2 text-lg"
                    >
                        <PlayCircle size={24} /> Mulai Belajar
                    </button>
                )}
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- KOLOM KIRI: VIDEO & DISKUSI --- */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* VIDEO PLAYER */}
            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video relative group border border-white/10">
                {activeModule && getYouTubeEmbedUrl(activeModule.videoUrl) ? (
                    <iframe className="w-full h-full" src={getYouTubeEmbedUrl(activeModule.videoUrl)} title={activeModule.title} allowFullScreen></iframe>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 bg-[#121212]">
                        <PlayCircle size={64} className="text-[#333] mb-4" />
                        <p>Pilih materi di sebelah kanan untuk mulai.</p>
                    </div>
                )}
            </div>

            {/* INFO MATERI */}
            {activeModule && (
                <div className="bg-[#171717] p-8 rounded-2xl border border-white/5">
                    <h2 className="text-2xl font-bold text-white mb-4">{activeModule.title}</h2>
                    <p className="text-gray-400 whitespace-pre-wrap leading-relaxed">{activeModule.description || activeModule.content}</p>
                </div>
            )}

            {/* --- FITUR DISKUSI (KOMENTAR) --- */}
            <div className="bg-[#171717] rounded-2xl border border-white/5 p-8">
                 <h3 className="font-bold text-white mb-6 flex items-center gap-2 text-xl">
                    <MessageSquare size={24} className="text-[#D1F349]"/> Diskusi & Pertanyaan
                 </h3>
                 
                 {/* Input Komentar */}
                 <form onSubmit={handlePostComment} className="mb-10">
                    <div className="relative">
                        <textarea 
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="w-full p-4 pl-5 border border-white/10 rounded-xl bg-[#262626] text-white focus:bg-black focus:border-[#D1F349] focus:ring-1 focus:ring-[#D1F349] outline-none transition resize-none text-sm placeholder-gray-500"
                            rows="3"
                            placeholder="Tulis pertanyaan atau diskusi di sini..."
                        />
                        <button type="submit" className="absolute bottom-3 right-3 bg-[#D1F349] text-black p-2.5 rounded-lg hover:bg-[#bce038] transition font-bold">
                            <Send size={18} />
                        </button>
                    </div>
                 </form>

                 {/* List Komentar */}
                 <div className="space-y-6">
                    {comments.length === 0 ? (
                        <div className="text-center py-8 text-gray-600 border border-dashed border-white/10 rounded-xl">
                            <p>Belum ada diskusi. Jadilah yang pertama!</p>
                        </div>
                    ) : (
                        comments.map((comment) => (
                            <div key={comment.id} className="flex gap-4 group">
                                <div className="w-10 h-10 bg-[#262626] border border-white/10 rounded-full flex items-center justify-center text-[#D1F349] font-bold text-sm flex-shrink-0">
                                    {comment.userName.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1">
                                    <div className="bg-[#262626] p-4 rounded-2xl rounded-tl-none border border-white/5 relative hover:border-white/20 transition">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-gray-200 text-sm">{comment.userName}</h4>
                                            {/* Edit/Hapus */}
                                            {currentUser.uid === comment.userId && (
                                                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition">
                                                    <button onClick={() => startEditingComment(comment)} className="text-gray-500 hover:text-[#D1F349]"><Edit3 size={14}/></button>
                                                    <button onClick={() => handleDeleteComment(comment.id)} className="text-gray-500 hover:text-red-500"><Trash2 size={14}/></button>
                                                </div>
                                            )}
                                        </div>
                                        
                                        {editingCommentId === comment.id ? (
                                            <div className="mt-2">
                                                <textarea 
                                                    value={editingCommentText}
                                                    onChange={(e) => setEditingCommentText(e.target.value)}
                                                    className="w-full p-3 bg-black border border-[#D1F349] rounded-lg text-white text-sm mb-2"
                                                />
                                                <div className="flex gap-2">
                                                    <button onClick={saveEditedComment} className="text-xs bg-green-600 text-white px-3 py-1.5 rounded font-bold">Simpan</button>
                                                    <button onClick={() => setEditingCommentId(null)} className="text-xs bg-gray-700 text-white px-3 py-1.5 rounded">Batal</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-gray-400 text-sm leading-relaxed">{comment.text}</p>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-600 mt-1.5 ml-2 font-mono">
                                        {comment.createdAt?.seconds ? new Date(comment.createdAt.seconds * 1000).toLocaleDateString() : 'Baru saja'}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                 </div>
            </div>
          </div>

          {/* --- KOLOM KANAN: LIST MODUL (Playlist) --- */}
          <div className="lg:col-span-1">
            <div className="bg-[#171717] rounded-xl border border-white/10 overflow-hidden sticky top-24">
              
              {/* Header List Materi */}
              <div className="p-5 border-b border-white/10 flex justify-between items-center bg-[#1c1c1c]">
                <div>
                    <h3 className="font-bold text-white text-lg">Daftar Materi</h3>
                    <p className="text-xs text-gray-500 mt-1">{course.modules.length} Modul Video • {progress?.percentage || 0}% Selesai</p>
                </div>
                {userRole === 'admin' && (
                    <button 
                        onClick={() => setIsEditingContent(!isEditingContent)}
                        className={`p-2 rounded-lg transition ${isEditingContent ? 'bg-red-500/20 text-red-500' : 'bg-[#262626] text-gray-400 hover:text-white'}`}
                        title="Edit Konten"
                    >
                        {isEditingContent ? <X size={20}/> : <Edit3 size={20}/>}
                    </button>
                )}
              </div>
              
              {/* --- MODE EDIT ADMIN --- */}
              {isEditingContent ? (
                  <div className="p-4 max-h-[600px] overflow-y-auto bg-black">
                      <div className="bg-orange-500/10 border border-orange-500/20 p-3 rounded-lg mb-4">
                        <p className="text-xs text-orange-500 font-bold flex items-center gap-2"><Info size={14}/> Mode Edit Admin</p>
                      </div>
                      <div className="space-y-4">
                          {editedModules.map((mod, idx) => (
                              <div key={idx} className="bg-[#171717] p-4 rounded-lg border border-white/10 relative">
                                  <button onClick={() => handleRemoveModule(idx)} className="absolute top-2 right-2 text-red-500 hover:bg-red-500/10 p-1 rounded"><X size={14}/></button>
                                  <label className="text-[10px] uppercase font-bold text-gray-500 mb-1 block">Judul Modul</label>
                                  <input type="text" value={mod.title} onChange={(e) => handleModuleChange(idx, 'title', e.target.value)} className="w-full bg-black border border-white/10 p-2 rounded text-sm text-white mb-3"/>
                                  
                                  <label className="text-[10px] uppercase font-bold text-gray-500 mb-1 block">YouTube URL</label>
                                  <input type="text" value={mod.videoUrl} onChange={(e) => handleModuleChange(idx, 'videoUrl', e.target.value)} className="w-full bg-black border border-white/10 p-2 rounded text-sm text-gray-300 mb-3 font-mono"/>
                                  
                                  <label className="text-[10px] uppercase font-bold text-gray-500 mb-1 block">Durasi (Menit)</label>
                                  <input type="text" value={mod.duration} onChange={(e) => handleModuleChange(idx, 'duration', e.target.value)} className="w-full bg-black border border-white/10 p-2 rounded text-sm text-gray-300 mb-3"/>

                                  <label className="text-[10px] uppercase font-bold text-gray-500 mb-1 block">Deskripsi</label>
                                  <textarea value={mod.description || mod.content} onChange={(e) => handleModuleChange(idx, 'description', e.target.value)} className="w-full bg-black border border-white/10 p-2 rounded text-sm text-gray-300 h-20"/>
                              </div>
                          ))}
                          <button onClick={handleAddModule} className="w-full py-3 border border-dashed border-[#D1F349]/30 text-[#D1F349] rounded-lg hover:bg-[#D1F349]/5 text-sm font-bold flex items-center justify-center gap-2">
                              <Plus size={16}/> Tambah Modul
                          </button>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/10 sticky bottom-0 bg-black">
                          <button onClick={saveCourseContent} className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 flex items-center justify-center gap-2"><Save size={18}/> Simpan Perubahan</button>
                      </div>
                  </div>
              ) : (
                  /* --- MODE VIEW NORMAL (PLAYLIST) --- */
                  <div className="max-h-[600px] overflow-y-auto">
                      {course.modules.length === 0 ? (
                          <div className="p-8 text-center text-gray-500 text-sm">Belum ada materi.</div>
                      ) : (
                          course.modules.map((module, index) => {
                            const isCompleted = progress?.completedModules?.includes(index);
                            const isActive = activeModule && activeModule.title === module.title;
                            const isOpen = expandedModule === index;

                            return (
                                <div key={index} className={`border-b border-white/5 transition-colors ${isActive ? 'bg-[#D1F349]/10 border-l-4 border-l-[#D1F349]' : 'hover:bg-white/5'}`}>
                                    <div className="p-4 flex items-center justify-between cursor-pointer select-none" onClick={() => toggleAccordion(index)}>
                                        <div className="flex items-center gap-3 flex-1 overflow-hidden">
                                            {/* Checkbox */}
                                            <div 
                                                onClick={(e) => { e.stopPropagation(); toggleModuleCheck(index); }}
                                                className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-all ${
                                                    !progress ? 'border-gray-700 bg-gray-800 text-gray-600 cursor-not-allowed' : 
                                                    isCompleted ? 'bg-[#D1F349] border-[#D1F349] text-black' : 
                                                    'border-gray-500 text-transparent hover:border-[#D1F349]'
                                                }`}
                                            >
                                                {!progress ? <Lock size={12} /> : <CheckCircle size={14} strokeWidth={3} />}
                                            </div>
                                            
                                            {/* Judul */}
                                            <div className="flex-1 min-w-0" onClick={(e) => {e.stopPropagation(); setActiveModule(module);}}>
                                                <h3 className={`text-sm font-semibold truncate ${isActive ? 'text-[#D1F349]' : 'text-gray-200'}`}>
                                                    {module.title}
                                                </h3>
                                                {!isOpen && (
                                                    <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                                                        <span className="flex items-center gap-1"><Clock size={10} /> {module.duration} Menit</span>
                                                        {isActive && <span className="text-[#D1F349] font-bold tracking-wider text-[10px] uppercase">• Now Playing</span>}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className={`text-gray-500 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}><ChevronDown size={16} /></div>
                                    </div>

                                    {/* Dropdown Detail */}
                                    {isOpen && (
                                        <div className="px-4 pb-4 pl-[3.25rem] text-xs text-gray-400">
                                            <p className="line-clamp-3 mb-3 leading-relaxed">{module.description || module.content || "Tidak ada deskripsi."}</p>
                                            <button onClick={() => setActiveModule(module)} className="text-[#D1F349] font-bold hover:underline flex items-center gap-1.5 bg-[#D1F349]/10 px-3 py-1.5 rounded w-fit transition">
                                                <PlayCircle size={14}/> Putar Video Ini
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                          })
                      )}
                  </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CourseDetail;