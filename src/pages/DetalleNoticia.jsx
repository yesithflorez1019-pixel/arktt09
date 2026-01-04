import React from 'react';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { TarjetaCristal } from '../components/UI';

export default function DetalleNoticia({ noticia, volver }) {
  if (!noticia) return null;

  return (
    <div className="animate-fade-in py-12 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Volver */}
        <button 
          onClick={volver}
          className="flex items-center gap-2 text-cyan-600 font-bold mb-8 hover:-translate-x-1 transition-transform"
        >
          <ArrowLeft size={20} /> Volver a Noticias
        </button>

        {/* Contenido de la Noticia */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          
          {/* Imagen Grande */}
          <div className="h-64 md:h-96 w-full relative">
            <img 
              src={noticia.imagen} 
              alt={noticia.titulo} 
              title="imagen de notica"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white">
               
            </div>
          </div>

          <div className="p-8 md:p-12">
            {/* Titulo y Datos */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-6 leading-tight">
              {noticia.titulo}
            </h1>
            
            <div className="flex gap-6 text-sm text-slate-500 mb-8 border-b border-slate-100 pb-8">
              <span className="flex items-center gap-2"><Calendar size={16} className="text-cyan-500"/> {noticia.fecha}</span>
              <span className="flex items-center gap-2"><User size={16} className="text-cyan-500"/> Administración</span>
            </div>

            {/* Texto Completo  */}
            <div className="prose prose-lg text-slate-600 leading-relaxed whitespace-pre-line">
              {noticia.contenido}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}