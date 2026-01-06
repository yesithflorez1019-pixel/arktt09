import React, { useState } from 'react';
import { Image, Grid, ArrowLeft, Calendar, ArrowRight, ZoomIn } from 'lucide-react';
import { TituloSeccion } from '../components/UI';
import SEO from '../components/SEO';
import { useNavigate } from 'react-router-dom';

const galeriaEventos = [
  {
    id: 1,
    titulo: 'Navidad 2025',
    fecha: '25 Diciembre 2025',
    descripcion: 'Un día hermoso donde celebramos la Navidad con la visita de Papá Noel.',
    portada: '/fotos-galeria/1.jpeg',
    fotos: [
      '/fotos-galeria/3.jpeg', '/fotos-galeria/4.jpeg', '/fotos-galeria/2.jpeg',
      '/fotos-galeria/5.jpeg', '/fotos-galeria/17.jpeg', '/fotos-galeria/18.jpeg',
      '/fotos-galeria/26.jpeg', '/fotos-galeria/30.jpeg', '/fotos-galeria/28.jpeg',
      '/fotos-galeria/27.jpeg', '/fotos-galeria/29.jpeg',
    ],
  },
];

export default function Galeria() {
  const [eventoActivo, setEventoActivo] = useState(null);
  const navigate = useNavigate();

  const abrirEvento = (evento) => { setEventoActivo(evento); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const volver = () => { setEventoActivo(null); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <div className="animate-fade-in py-12 bg-white min-h-screen">
      <SEO title="Galería" description="Explora nuestros eventos y momentos liceístas." />

      <div className="container mx-auto px-6">
        
        {!eventoActivo ? (
          <>
            <div className="text-center mb-12">
               <TituloSeccion titulo="Galería de Recuerdos" subtitulo="Momentos que perduran" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {galeriaEventos.map((evento) => (
                <div
                  key={evento.id}
                  onClick={() => abrirEvento(evento)}
                  className="group cursor-pointer bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img src={evento.portada} alt={evento.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white">
                        <div className="flex items-center gap-1 text-xs font-bold bg-black/40 px-2 py-1 rounded backdrop-blur-sm">
                            <Image size={12} /> {evento.fotos.length}
                        </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 text-celeste-600 text-xs font-bold uppercase mb-2">
                        <Calendar size={12} /> {evento.fecha}
                    </div>
                    <h3 className="font-bold text-slate-800 text-lg mb-2 leading-tight group-hover:text-celeste-700 transition-colors">
                      {evento.titulo}
                    </h3>
                    <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                      {evento.descripcion}
                    </p>
                    <div className="mt-4 pt-4 border-t border-slate-50 flex items-center text-xs font-bold text-slate-400 group-hover:text-celeste-600 transition-colors">
                        Ver álbum completo <ArrowRight size={14} className="ml-auto" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* VISTA DETALLE */}
            <button onClick={volver} className="mb-6 flex items-center gap-2 text-slate-500 hover:text-celeste-600 font-bold transition-colors">
              <ArrowLeft size={20} /> Volver a álbumes
            </button>

            <div className="mb-10 text-center">
                <span className="text-celeste-600 text-sm font-bold uppercase tracking-wider">{eventoActivo.fecha}</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">{eventoActivo.titulo}</h2>
                <p className="text-slate-500 max-w-2xl mx-auto">{eventoActivo.descripcion}</p>
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {eventoActivo.fotos.map((foto, index) => (
                <div key={index} className="break-inside-avoid rounded-2xl overflow-hidden relative group cursor-zoom-in">
                  <img src={foto} loading="lazy" alt={`Foto ${index}`} className="w-full h-auto transform transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-celeste-900/0 group-hover:bg-celeste-900/20 transition-colors duration-300"></div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}