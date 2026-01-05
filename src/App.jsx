import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import TopBar from './components/TopBar'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { noticiasData } from './data/noticias'

// Lazy loading de páginas
const Inicio = lazy(() => import('./pages/Inicio'))
const Noticias = lazy(() => import('./pages/Noticias'))
const DetalleNoticia = lazy(() => import('./pages/DetalleNoticia'))
const Admisiones = lazy(() => import('./pages/Admisiones'))
const Galeria = lazy(() => import('./pages/Galeria'))
const Nosotros = lazy(() => import('./pages/Nosotros'))
const Calendario = lazy(() => import('./pages/Calendario'))
const Pagos = lazy(() => import('./pages/Pagos'))
const Contacto = lazy(() => import('./pages/Contacto'))
import { useNavigate } from 'react-router-dom';
// Loader global
const Cargando = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-500" />
  </div>
)

export default function App() {
  return (
    <div className="font-sans text-slate-600 min-h-screen flex flex-col bg-slate-50">
      <TopBar />
      <Navbar />

      <main className="flex-grow">
        <Suspense fallback={<Cargando />}>
          <Routes>
            <Route path="/" element={<Inicio />} />

            <Route path="/noticias" element={<Noticias />} />
            <Route
              path="/noticias/:id"
              element={<DetalleNoticia noticias={noticiasData} />}
            />

            <Route path="/admisiones" element={<Admisiones />} />
            <Route path="/galeria" element={<Galeria />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/calendario" element={<Calendario />} />
            <Route path="/pagos" element={<Pagos />} />
            <Route path="/contacto" element={<Contacto />} />


            {/* 404 REAL */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
