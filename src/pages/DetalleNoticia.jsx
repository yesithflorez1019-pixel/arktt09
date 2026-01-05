import React from 'react';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { noticiasData } from '../data/noticias';
import SEO from '../components/SEO';

export default function DetalleNoticia() {
  const { id } = useParams();
  const navigate = useNavigate();

  const noticia = noticiasData.find(
    (n) => n.id === Number(id)
  );

  if (!noticia) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-slate-700">
          Noticia no encontrada
        </h2>
        <button
          onClick={() => navigate('/noticias')}
          className="mt-4 text-cyan-600 font-bold"
        >
          Volver a Noticias
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in py-12 bg-slate-50 min-h-screen">
      <SEO 
        title={noticia.titulo}
        description={noticia.resumen}
      />

      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Volver */}
        <button 
          onClick={() => navigate('/noticias')}
          className="flex items-center gap-2 text-cyan-600 font-bold mb-8 hover:-translate-x-1 transition-transform"
        >
          <ArrowLeft size={20} /> Volver a Noticias
        </button>

        {/* Contenido */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          
          {/* Imagen */}
          <div className="h-64 md:h-96 w-full relative">
            <img 
              src={noticia.imagen} 
              alt={noticia.titulo}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>

          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-6">
              {noticia.titulo}
            </h1>

            <div className="flex gap-6 text-sm text-slate-500 mb-8 border-b border-slate-100 pb-8">
              <span className="flex items-center gap-2">
                <Calendar size={16} className="text-cyan-500"/> {noticia.fecha}
              </span>
              <span className="flex items-center gap-2">
                <User size={16} className="text-cyan-500"/> Administración
              </span>
            </div>

            <div className="prose prose-lg text-slate-600 whitespace-pre-line">
              {noticia.contenido}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
