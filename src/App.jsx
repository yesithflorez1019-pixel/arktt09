import React, { useState, Suspense, lazy } from 'react';

import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { noticiasData } from './data/noticias';

// Páginas con lazy loading
const Inicio = lazy(() => import('./pages/Inicio'));
const Noticias = lazy(() => import('./pages/Noticias'));
const DetalleNoticia = lazy(() => import('./pages/DetalleNoticia'));
const Admisiones = lazy(() => import('./pages/Admisiones'));
const Galeria = lazy(() => import('./pages/Galeria'));
const Nosotros = lazy(() => import('./pages/Nosotros'));
const Calendario = lazy(() => import('./pages/Calendario'));
const Pagos = lazy(() => import('./pages/Pagos'));
const Contacto = lazy(() => import('./pages/Contacto'));
const GestionAcademica = lazy(() => import('./pages/GestionAcademica'));

// Loader global
const Cargando = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-500" />
  </div>
);

export default function App() {
  const [paginaActual, setPaginaActual] = useState('inicio');
  const [noticiaSeleccionadaId, setNoticiaSeleccionadaId] = useState(null);

  const navegarA = (destino) => {
    setPaginaActual(destino);
    window.scrollTo(0, 0);
  };

  const verDetalleNoticia = (id) => {
    setNoticiaSeleccionadaId(id);
    setPaginaActual('detalle-noticia');
    window.scrollTo(0, 0);
  };

  return (
    <div className="font-sans text-slate-600 min-h-screen flex flex-col bg-slate-50">
      <TopBar />
      <Navbar navegarA={navegarA} paginaActual={paginaActual} />

      <main className="flex-grow">
        <Suspense fallback={<Cargando />}>
          {paginaActual === 'inicio' && (
            <Inicio navegarA={navegarA} verDetalle={verDetalleNoticia} />
          )}

          {paginaActual === 'noticias' && (
            <Noticias verDetalle={verDetalleNoticia} />
          )}

          {paginaActual === 'detalle-noticia' && (
            <DetalleNoticia
              noticia={noticiasData.find(
                (n) => n.id === noticiaSeleccionadaId
              )}
              volver={() => navegarA('noticias')}
            />
          )}

          {paginaActual === 'admisiones' && (
            <Admisiones navegarA={navegarA} />
          )}

          {paginaActual === 'galeria' && (
            <Galeria navegarA={navegarA} />
          )}

          {paginaActual === 'nosotros' && <Nosotros />}

          {paginaActual === 'calendario' && (
            <Calendario navegarA={navegarA} />
          )}

          {paginaActual === 'pagos' && <Pagos navegarA={navegarA} />}

          {paginaActual === 'contacto' && <Contacto />}

          {paginaActual === 'academico' && <GestionAcademica />}
        </Suspense>
      </main>

      <Footer navegarA={navegarA} />
    </div>
  );
}
