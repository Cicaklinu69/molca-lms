// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";         // <--- TAMBAHAN PENTING
import { getFirestore } from "firebase/firestore"; // <--- TAMBAHAN PENTING

// Konfigurasi Asli Kamu (JANGAN UBAH INI)
const firebaseConfig = {
  apiKey: "AIzaSyBv7LaURC6lj5VlaVKIT4YCTuCLTHcgDbs",
  authDomain: "molca-89126.firebaseapp.com",
  projectId: "molca-89126",
  storageBucket: "molca-89126.firebasestorage.app",
  messagingSenderId: "1070926497244",
  appId: "1:1070926497244:web:a6f25d91d0a1e53f3efb19",
  measurementId: "G-X2XL2T1P8N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// --- BAGIAN INI YANG KITA BUTUHKAN UNTUK LOGIN & DASHBOARD ---
export const auth = getAuth(app);      // Export fitur Login
export const db = getFirestore(app);   // Export fitur Database