import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/Login'
import AdminPanel from './pages/AdminPanel'
import RutaProtegida from './components/RutaProtegida'
import TopBar from './components/TopBar'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import DefaultSEO from './components/DefaultSEO'


// Lazy loading de páginas
const Inicio = lazy(() => import('./pages/Inicio'))
const Noticias = lazy(() => import('./pages/Noticias'))
const DetalleNoticia = lazy(() => import('./pages/DetalleNoticia'))
const Admisiones = lazy(() => import('./pages/Admisiones'))
const Galeria = lazy(() => import('./pages/Galeria'))
const Calendario = lazy(() => import('./pages/Calendario'))
const Pagos = lazy(() => import('./pages/Pagos'))
const Contacto = lazy(() => import('./pages/Contacto'))
const Agenda = lazy(() => import('./pages/Agenda'))

// Páginas institucionales
const Historia = lazy(() => import('./pages/institucional/Historia'))
const Simbolos = lazy(() => import('./pages/institucional/Simbolos'))
const PerfilExplorador = lazy(() => import('./pages/institucional/PerfilExplorador'))
const Comunidad = lazy(() => import('./pages/institucional/Comunidad'))
const DetalleEvento = lazy(() => import('./pages/DetalleEvento'))
// Loader elegante
const Cargando = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-celeste-200 border-t-celeste-600 rounded-full animate-spin"></div>
      <p className="text-celeste-600 font-bold text-sm animate-pulse">
        Cargando...
      </p>
    </div>
  </div>
)

export default function App() {
  return (
    <div className="font-sans text-slate-600 min-h-screen flex flex-col bg-slate-50">
      
      {/* SEO por defecto (Home) */}
      <DefaultSEO />

      {/* Encabezado */}
      <TopBar />
      <Navbar />

      {/* Contenido */}
      <main className="flex-grow">
        <Suspense fallback={<Cargando />}>
          <Routes>
            <Route path="/" element={<Inicio />} />

            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <RutaProtegida>
                  <AdminPanel />
                </RutaProtegida>
              }
            />

            {/* Institucional */}
            <Route path="/nosotros/historia" element={<Historia />} />
            <Route path="/nosotros/simbolos" element={<Simbolos />} />
            <Route path="/nosotros/perfil" element={<PerfilExplorador />} />
            <Route path="/nosotros/comunidad" element={<Comunidad />} />

            {/* Otras páginas */}
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/agenda/evento/:id" element={<DetalleEvento />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/noticias/:id" element={<DetalleNoticia />} />
            <Route path="/admisiones" element={<Admisiones />} />
            <Route path="/galeria" element={<Galeria />} />
            <Route path="/calendario" element={<Calendario />} />
            <Route path="/pagos" element={<Pagos />} />
            <Route path="/contacto" element={<Contacto />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
