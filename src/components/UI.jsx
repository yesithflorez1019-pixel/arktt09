import React from 'react';

// Título con estilo institucional pero moderno
export const TituloSeccion = ({ titulo, subtitulo, alineacion = 'center' }) => (
  <div className={`mb-12 text-${alineacion} relative z-10`}>
    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 uppercase tracking-tight">{titulo}</h2>
    <div className={`h-1.5 w-24 bg-cyan-500 rounded-full ${alineacion === 'center' ? 'mx-auto' : ''} mb-4 shadow-sm`}></div>
    {subtitulo && <p className="text-slate-500 max-w-2xl mx-auto font-medium">{subtitulo}</p>}
  </div>
);

// Tarjeta base con efecto cristal
export const TarjetaCristal = ({ children, className = "" }) => (
  <div className={`bg-white/70 backdrop-blur-md border border-white/60 shadow-lg rounded-xl ${className}`}>
    {children}
  </div>
);

// Tarjeta de Noticias (Tipo Blog)
export const TarjetaNoticia = ({ imagen, fecha, titulo, resumen }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-slate-100 group">
    <div className="h-48 overflow-hidden relative">
      <img src={imagen} alt={titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute top-4 left-4 bg-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
        {fecha}
      </div>
    </div>
    <div className="p-6">
      <h3 className="font-bold text-lg text-slate-800 mb-3 leading-tight group-hover:text-cyan-600 transition-colors">{titulo}</h3>
      <p className="text-slate-500 text-sm mb-4 line-clamp-3">{resumen}</p>
      <button className="text-cyan-600 font-bold text-sm hover:underline">Leer más &rarr;</button>
    </div>
  </div>
);