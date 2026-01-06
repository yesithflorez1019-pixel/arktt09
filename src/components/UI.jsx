import React from 'react';

// Título de sección con una línea decorativa azul
export const TituloSeccion = ({ titulo, subtitulo, centrado = true }) => {
  return (
    <div className={`mb-12 ${centrado ? 'text-center' : 'text-left'}`}>
      {subtitulo && (
        <span className="text-celeste-600 font-bold uppercase tracking-wider text-sm mb-2 block">
          {subtitulo}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 relative inline-block pb-4">
        {titulo}
        <span className={`absolute bottom-0 ${centrado ? 'left-1/2 -translate-x-1/2' : 'left-0'} w-16 h-1 bg-celeste-500 rounded-full`}></span>
      </h2>
    </div>
  );
};

// Tarjeta blanca limpia con sombra suave
export const TarjetaCristal = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow duration-300 ${className}`}>
      {children}
    </div>
  );
};

// Botón principal
export const BotonPrimario = ({ texto, onClick, className = "" }) => (
    <button 
        onClick={onClick}
        className={`bg-celeste-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-celeste-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 ${className}`}
    >
        {texto}
    </button>
);