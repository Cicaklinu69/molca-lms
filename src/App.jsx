// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Import Context & Components
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; // Pastikan file ini ada

// Import Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddCourse from './pages/AddCourse';
import CourseDetail from './pages/CourseDetail';

function App() {
  return (
    <Router>
      <AuthProvider>
        {/* Wadah Notifikasi Global */}
        <Toaster position="top-center" reverseOrder={false} />
        
        <Routes>
          {/* --- PUBLIC ROUTES (Bisa diakses tanpa login) --- */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* --- PROTECTED ROUTES (Harus Login dulu) --- */}
          
          {/* 1. Dashboard: Tempat Cari Kursus Baru */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

        

          {/* 3. Course Detail: Halaman Belajar/Nonton Video */}
          <Route 
            path="/course/:courseId" 
            element={
              <ProtectedRoute>
                <CourseDetail />
              </ProtectedRoute>
            } 
          />

          {/* 4. Admin: Halaman Tambah Kursus */}
          <Route 
            path="/admin/add-course" 
            element={
              <ProtectedRoute>
                <AddCourse />
              </ProtectedRoute>
            } 
          />

          {/* --- FALLBACK ROUTE --- */}
          {/* Jika user akses link ngawur, lempar ke Dashboard (atau Landing Page) */}
          <Route path="*" element={<Navigate to="/" />} />
          
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;