import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import RutaProtegida from './components/RutaProtegida';
import TopBar from './components/TopBar'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Lazy loading
const Inicio = lazy(() => import('./pages/Inicio'))
const Noticias = lazy(() => import('./pages/Noticias'))
const DetalleNoticia = lazy(() => import('./pages/DetalleNoticia'))
const Admisiones = lazy(() => import('./pages/Admisiones'))
const Galeria = lazy(() => import('./pages/Galeria'))
const Nosotros = lazy(() => import('./pages/Nosotros'))
const Calendario = lazy(() => import('./pages/Calendario'))
const Pagos = lazy(() => import('./pages/Pagos'))
const Contacto = lazy(() => import('./pages/Contacto'))

// Loader elegante
const Cargando = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-celeste-200 border-t-celeste-600 rounded-full animate-spin"></div>
        <p className="text-celeste-600 font-bold text-sm animate-pulse">Cargando...</p>
    </div>
  </div>
)

export default function App() {
  return (
    <div className="font-sans text-slate-600 min-h-screen flex flex-col bg-slate-50">
      
      {/* Encabezado Completo */}
      <TopBar />
      <Navbar />

      {/* Contenido Principal */}
      <main className="flex-grow">
        <Suspense fallback={<Cargando />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/admin" 
              element={
                <RutaProtegida>
                  <AdminPanel />
                </RutaProtegida>
              } 
            />
            <Route path="/" element={<Inicio />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/noticias/:id" element={<DetalleNoticia />} />
            <Route path="/admisiones" element={<Admisiones />} />
            <Route path="/galeria" element={<Galeria />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/calendario" element={<Calendario />} />
            <Route path="/pagos" element={<Pagos />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      {/* Pie de Página */}
      <Footer />
    </div>
  )
}