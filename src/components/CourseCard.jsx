import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, PlayCircle, BookOpen } from 'lucide-react'; 

const CourseCard = ({ course, progress, isAdmin, onDelete }) => {
  // Warna Brand
  const MOLCA_LIME = '#D1F349';

  return (
    <div className="relative h-full group"> 
      
      {/* TOMBOL HAPUS (Hanya Admin) */}
      {isAdmin && (
        <button
          onClick={(e) => {
            e.preventDefault(); 
            onDelete(course.id);
          }}
          className="absolute top-3 right-3 z-20 bg-black/50 text-red-500 p-2 rounded-full hover:bg-red-600 hover:text-white transition-all backdrop-blur-md border border-white/10 hover:border-red-500/50"
          title="Hapus Kursus"
        >
          <Trash2 size={16} />
        </button>
      )}

      <Link to={`/course/${course.id}`} className="block h-full">
        <div className="bg-[#171717] rounded-2xl border border-white/5 overflow-hidden hover:border-[#D1F349]/50 hover:shadow-[0_0_25px_rgba(209,243,73,0.15)] transition-all duration-300 h-full flex flex-col group relative">
          
          {/* Thumbnail Area */}
            <div className="relative h-48 bg-[#262626] overflow-hidden">
            {course.image ? (
                <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600 bg-[#1a1a1a]">
                    <div className="text-4xl font-bold opacity-20 select-none">
                        {course.title?.charAt(0).toUpperCase()}
                    </div>
                </div>
            )}
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-transparent opacity-80"></div>

            {/* Play Icon Overlay (Muncul saat Hover) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px]">
                <div className="bg-[#D1F349] p-3 rounded-full text-black transform scale-50 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_20px_#D1F349]">
                    <PlayCircle size={32} fill="currentColor" />
                </div>
            </div>

            {/* Badge Kategori */}
            <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full text-[#D1F349] shadow-sm">
                {course.category}
            </span>
            </div>

            {/* Content Area */}
            <div className="p-5 flex flex-col flex-1 relative">
                {/* Efek Garis Neon di atas */}
                <div className="absolute top-0 left-5 right-5 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-[#D1F349]/50 transition-colors duration-500"></div>

                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-[#D1F349] transition-colors leading-tight">
                    {course.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-1 leading-relaxed font-light">
                    {course.description}
                </p>

                {/* Info Tambahan */}
                <div className="flex items-center justify-between text-xs font-medium text-gray-500 mb-4 pt-4 border-t border-white/5 group-hover:border-white/10 transition-colors">
                    <span className="flex items-center gap-1.5 text-gray-400">
                        <BookOpen size={14} className="text-[#D1F349]/70" />
                        {course.totalModules || 5} Modul
                    </span>
                    {progress === 100 ? (
                        <span className="text-[#D1F349] flex items-center gap-1 font-bold">
                            Selesai
                        </span>
                    ) : (
                        <span className="text-gray-500">
                           {progress ? 'Sedang Berjalan' : 'Belum Dimulai'}
                        </span>
                    )}
                </div>

                {/* Progress Bar */}
                {progress !== undefined && (
                    <div className="mt-auto">
                        <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-1.5 uppercase tracking-wider">
                            <span>Progress</span>
                            <span className={progress === 100 ? "text-[#D1F349]" : "text-white"}>{progress}%</span>
                        </div>
                        <div className="w-full bg-[#262626] rounded-full h-1.5 overflow-hidden border border-white/5">
                            <div
                            className="h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(209,243,73,0.6)]"
                            style={{ width: `${progress}%`, backgroundColor: MOLCA_LIME }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;