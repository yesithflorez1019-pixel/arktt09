// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// --- AQUÍ PEGAS TUS LLAVES ---
// (Búscalas en: Project Settings -> General -> Tus apps -> SDK setup y configuración)
const firebaseConfig = {
  apiKey: "AIzaSyCR0o6JLGDwuuLsKOUiMh1j-XTORrpamhU",
  authDomain: "web-liceo-admin.firebaseapp.com",
  projectId: "web-liceo-admin",
  storageBucket: "web-liceo-admin.firebasestorage.app",
  messagingSenderId: "165326342904",
  appId: "1:165326342904:web:0438af8408226a700d890d"
};
// -----------------------------

// Inicializamos la conexión
const app = initializeApp(firebaseConfig);

// Exportamos las herramientas para usarlas en toda la app
export const auth = getAuth(app);       // Para el Login
export const db = getFirestore(app);    // Para la Base de Datos (Noticias)
export const storage = getStorage(app); // Para las Fotos (Storage)