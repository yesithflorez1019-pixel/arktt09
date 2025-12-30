import React, { useState } from 'react';
import { Image, Grid, ArrowLeft, Calendar, ArrowRight, ZoomIn } from 'lucide-react';
import { TituloSeccion } from '../components/UI';

//zona para agregar 


const galeriaEventos = [
  {
    id: 1,
    titulo: "Navidad 2025",
    fecha: "25 Diciembre 2025",
    descripcion: "Un dia hermoso que en nuestra navidad nos visito Papa noel.",
    portada: "/fotos-galeria/1.jpeg",
    fotos: [
     "/fotos-galeria/3.jpeg",
     "/fotos-galeria/4.jpeg",
     "/fotos-galeria/2.jpeg",
     "/fotos-galeria/5.jpeg",
     "/fotos-galeria/17.jpeg",
     "/fotos-galeria/18.jpeg",
     "/fotos-galeria/26.jpeg",
     "/fotos-galeria/30.jpeg",
     "/fotos-galeria/28.jpeg",
     "/fotos-galeria/27.jpeg",
     "/fotos-galeria/29.jpeg",

    ]
  },
  
];

export default function Galeria({ navegarA }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Función para abrir un evento y subir el scroll
  const handleOpenEvent = (evento) => {
    setSelectedEvent(evento);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Función para volver a la lista principal
  const handleBack = () => {
    setSelectedEvent(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="animate-fade-in pt-12 pb-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* ==============================================
            VISTA 1: LISTADO DE ÁLBUMES (GRID)
           ============================================== */}
        {!selectedEvent ? (
          <>
            <TituloSeccion 
              titulo="Galería de recuerdos." 
              subtitulo="Revive los mejores momentos." 
            />

            {/* Barra de estado pequeña */}
            <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-4">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Grid className="w-5 h-5 text-cyan-500" />
                Álbumes Disponibles
              </h2>
              <span className="text-sm text-slate-400 font-medium bg-slate-100 px-3 py-1 rounded-full">
                {galeriaEventos.length} Eventos
              </span>
            </div>

            {/* Grid de Tarjetas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {galeriaEventos.map((evento) => (
                <div 
                  key={evento.id}
                  onClick={() => handleOpenEvent(evento)}
                  className="group cursor-pointer bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* Imagen Portada */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={evento.portada} 
                      alt={evento.titulo} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-cyan-900/0 group-hover:bg-cyan-900/20 transition-all duration-300"></div>
                    
                    {/* Badge contador de fotos */}
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1 backdrop-blur-sm shadow-sm">
                      <Image className="w-3 h-3" /> {evento.fotos.length}
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div className="p-5 flex-grow">
                    <div className="text-xs text-cyan-600 font-bold mb-2 uppercase flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {evento.fecha}
                    </div>
                    <h3 className="font-bold text-slate-800 text-lg leading-tight group-hover:text-cyan-600 transition-colors mb-2">
                      {evento.titulo}
                    </h3>
                    <p className="text-slate-500 text-sm line-clamp-2">
                      {evento.descripcion}
                    </p>
                  </div>
                  
                  {/* Footer Tarjeta */}
                  <div className="px-5 pb-5 pt-0 mt-auto">
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1 group-hover:text-cyan-500 transition-colors">
                      Ver fotos <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* ==============================================
             VISTA 2: DETALLE DEL EVENTO (FOTOS)
             ============================================== */
          <div className="animate-fade-in">
            {/* Botón Volver */}
            <button 
              onClick={handleBack} 
              className="mb-8 flex items-center gap-2 text-cyan-600 font-bold hover:-translate-x-1 transition-transform bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100 w-fit"
            >
              <ArrowLeft size={20} /> Volver a los álbumes
            </button>

            {/* Cabecera del Evento */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden mb-10 relative group">
              <div className="relative h-64 md:h-80 bg-slate-900">
                <img 
                  src={selectedEvent.portada} 
                  alt="Cover" 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white z-10">
                  <span className="bg-cyan-600 text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block shadow-sm tracking-wide">
                    {selectedEvent.fecha}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-extrabold mb-3 tracking-tight drop-shadow-lg">
                    {selectedEvent.titulo}
                  </h2>
                  <p className="text-slate-100 text-lg max-w-2xl font-light drop-shadow-md">
                    {selectedEvent.descripcion}
                  </p>
                </div>
              </div>
            </div>

            {/* Grid de Fotos (Estilo Masonry/Columnas) */}
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 gap-6 space-y-6">
              {selectedEvent.fotos.map((foto, index) => (
                <div key={index} className="break-inside-avoid rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group bg-white border border-slate-100 relative">
                  <img 
                    src={foto} 
                    loading="lazy" 
                    alt={`Foto ${index + 1}`} 
                    className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Overlay al pasar el mouse */}
                  <div className="absolute inset-0 bg-cyan-900/0 group-hover:bg-cyan-900/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                     <ZoomIn className="text-white drop-shadow-md w-8 h-8" />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pie de página de la sección */}
            <div className="mt-16 text-center border-t border-slate-200 pt-8">
               <p className="text-slate-400 text-sm mb-4">¿Te gustaron las fotos?</p>
               <button 
                 onClick={handleBack}
                 className="px-8 py-3 bg-slate-100 text-slate-600 font-bold rounded-full hover:bg-cyan-50 hover:text-cyan-600 hover:shadow-md transition-all"
               >
                 Ver otros eventos
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}