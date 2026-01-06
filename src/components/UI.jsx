import React from 'react';
import { useNavigate } from 'react-router-dom';
// Título 
export const TituloSeccion = ({ titulo, subtitulo, subtitulo2, subtitulo3 , alineacion = 'center' }) => (
  <div className={`mb-12 text-${alineacion} relative z-10`}>
    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 uppercase tracking-tight">{titulo}</h2>
    <div className={`h-1.5 w-24 bg-cyan-500 rounded-full ${alineacion === 'center' ? 'mx-auto' : ''} mb-4 shadow-sm`}></div>
    {subtitulo && <p className="text-slate-500 max-w-2xl mx-auto font-medium">{subtitulo}</p>}
    {subtitulo2 && <p className="text-white max-w-2xl mx-auto font-medium">{subtitulo2}</p>}
    {subtitulo3 && <p className="text-slate-50 max-w-2xl mx-auto font-medium">{subtitulo3}</p>}
  </div>
);



// Tarjeta base 
export const TarjetaCristal = ({ children, className = "" }) => (
  <div className={`bg-white/80 backdrop-blur-md border border-white/60 shadow-lg rounded-xl ${className}`}>
    {children}
  </div>
);

// Tarjeta de Noticias
export const TarjetaNoticia = ({ imagen, fecha, titulo, resumen }) => {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        border border-slate-300
        shadow-md
        hover:shadow-xl
        hover:-translate-y-1
        transition-all duration-300
        flex flex-col
        group
      "
    >
      {/* Imagen */}
      <div className="h-18 overflow-hidden relative rounded-t-2xl">
        <img
          src={imagen}
          alt={titulo}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          {fecha}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-bold text-lg text-slate-800 mb-3 leading-tight group-hover:text-cyan-600 transition-colors">
          {titulo}
        </h3>

        <p className="text-slate-500 text-sm mb-4 line-clamp-3 flex-grow">
          {resumen}
        </p>

        <button className="text-cyan-600 font-bold text-sm hover:underline self-start mt-auto">
          Leer más &rarr;
        </button>
      </div>
    </div>
  );
};


export const SeccionBase = ({ children, className = "" }) => (
  <section className="py-20">
    <div className="container mx-auto px-6">
      <div
        className={`
          bg-white/90
          backdrop-blur-sm
          rounded-3xl
          p-10
          shadow-lg
          border border-white/60
          ${className}
        `}
      >
        {children}
      </div>
    </div>
  </section>
);

export const LayoutContenido = ({ children }) => (
  <div className="max-w-6xl mx-auto">{children}</div>
);

export const SeparadorSuave = () => (
  <div className="flex justify-center my-16">
    <div className="h-1 w-32 bg-cyan-400/40 rounded-full"></div>
  </div>
);
