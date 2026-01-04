import React from 'react';
import { TituloSeccion } from '../components/UI';
import { noticiasData } from '../data/noticias'; // Importamos los datos
import SEO from '../components/SEO';

export default function Noticias({ verDetalle }) {
  return (
    <div className="animate-fade-in pt-12 pb-20 bg-slate-50 min-h-screen">
      <SEO 
        title="Noticias" 
        description="Mantente al día con las últimas actividades y eventos del Liceo Formador de Exploradores."
        keywords="noticias colegio, circulares padres de familia, eventos liceo barrancabermeja"
      />
      <div className="container mx-auto px-6">
        <TituloSeccion titulo="Noticias y Eventos" subtitulo="Mantente al día con todo lo que sucede en el Liceo." />

        <div className="grid md:grid-cols-3 gap-8">
          {noticiasData.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group border border-slate-100 flex flex-col">
              
              {/* Imagen de la tarjeta */}
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={item.imagen} 
                  alt={item.titulo} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-4 left-4 bg-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {item.fecha}
                </div>
              </div>

              {/* Contenido de la tarjeta */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-lg text-slate-800 mb-3 leading-tight group-hover:text-cyan-600 transition-colors">
                  {item.titulo}
                </h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-3 flex-grow">
                  {item.resumen}
                </p>
                <button 
                  onClick={() => verDetalle(item.id)} // Aquí llamamos a la función para ver detalle
                  className="text-cyan-600 font-bold text-sm hover:underline mt-auto self-start"
                >
                  Leer noticia completa &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}