import React, { useState } from 'react';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Noticias from './pages/Noticias';
import DetalleNoticia from './pages/DetalleNoticia';
import Admisiones from './pages/Admisiones';
import Galeria from './pages/Galeria'; 
import Nosotros from './pages/Nosotros';
import { noticiasData } from './data/noticias';
import Calendario from './pages/Calendario';
import Pagos from './pages/Pagos';

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
        {paginaActual === 'pagos' && <Pagos navegarA={navegarA} />}
        {paginaActual === 'inicio' && <Inicio navegarA={navegarA} verDetalle={verDetalleNoticia} />}
        {paginaActual === 'noticias' && <Noticias verDetalle={verDetalleNoticia} />}
        {paginaActual === 'admisiones' && <Admisiones navegarA={navegarA} />}
        {paginaActual === 'galeria' && <Galeria navegarA={navegarA} />}
        {paginaActual === 'nosotros' && <Nosotros />}
        {paginaActual === 'calendario' && <Calendario navegarA={navegarA} />}
        {paginaActual === 'detalle-noticia' && (
          <DetalleNoticia 
            noticia={noticiasData.find(n => n.id === noticiaSeleccionadaId)}
            volver={() => navegarA('noticias')}
          />
        )}
        
        {/* 3. QUITAMOS 'galeria' DE ESTA LISTA DE PENDIENTES */}
        {['academico', 'contacto'].includes(paginaActual) && (
          <div className="flex items-center justify-center h-[50vh]">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-300 mb-2">Página en Construcción</h2>
              <p className="text-slate-400">Sección: {paginaActual}</p>
              <button onClick={() => navegarA('inicio')} className="mt-6 text-cyan-600 underline">Volver al inicio</button>
            </div>
          </div>
        )}
      </main>

      <Footer navegarA={navegarA} />
    </div>
  );
}