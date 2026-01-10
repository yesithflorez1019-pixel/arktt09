import React from 'react';

// 1. SECCIÓN PRINCIPAL (Contenedor con padding y fondo)
export const Seccion = ({ children, className = "", blanca = false }) => {
  return (
    <section className={`py-16 px-6 ${blanca ? 'bg-white text-celeste-900' : 'bg-celeste-400 text-white'} ${className}`}>
      <div className="container mx-auto">
        {children}
      </div>
    </section>
  );
};

// 2. TÍTULO DE SECCIÓN (El que usas en Inicio)
export const TituloSeccion = ({ titulo, subtitulo, className = "", blanco = true }) => {
  return (
    <div className={`mb-12 text-left ${className}`}>
      <h2 className={`text-3xl font-bold uppercase tracking-tight ${blanco ? 'text-white' : 'text-celeste-900'}`}>
        {titulo}
      </h2>
      <div className={`h-1.5 w-24 rounded-full mt-4 shadow-sm ${blanco ? 'bg-white' : 'bg-celeste-500'}`}></div>
      {subtitulo && (
        <p className={`mt-4 text-lg ${blanco ? 'text-celeste-100' : 'text-slate-600'}`}>
          {subtitulo}
        </p>
      )}
    </div>
  );
};

// 3. TÍTULO SIMPLE (Para páginas internas)
export const Titulo = ({ children, centro = true, blanco = true }) => {
  return (
    <div className={`mb-8 ${centro ? 'text-center' : 'text-left'}`}>
      <h1 className={`text-3xl md:text-4xl font-black uppercase tracking-tight ${blanco ? 'text-white' : 'text-celeste-900'}`}>
        {children}
      </h1>
      <div className={`h-1.5 w-20 rounded-full mt-2 shadow-sm ${centro ? 'mx-auto' : ''} ${blanco ? 'bg-white' : 'bg-celeste-500'}`}></div>
    </div>
  );
};

// 4. TARJETA CRISTAL (Transparente y moderna)
export const TarjetaCristal = ({ children, className = "" }) => {
  return (
    <div className={`bg-white/20 backdrop-blur-md border border-white/40 rounded-2xl p-6 text-white shadow-lg ${className}`}>
      {children}
    </div>
  );
};

// 5. TARJETA SOLIDA (Blanca normal)
export const Tarjeta = ({ children, className = "", hover = true }) => {
  return (
    <div className={`bg-white text-celeste-900 rounded-2xl p-6 shadow-lg border border-celeste-100 
      ${hover ? 'hover:-translate-y-1 hover:shadow-xl transition-all duration-300' : ''} ${className}`}>
      {children}
    </div>
  );
};

// 6. BOTÓN ESTÁNDAR
export const Boton = ({ children, onClick, variante = "blanco", full = false, className="" }) => {
  const base = "font-bold py-3 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 active:scale-95";
  
  const estilos = {
    blanco: "bg-white text-celeste-600 hover:bg-celeste-50",
    azul: "bg-celeste-700 text-white hover:bg-celeste-800",
    borde: "border-2 border-white text-white hover:bg-white/10"
  };

  return (
    <button onClick={onClick} className={`${base} ${estilos[variante]} ${full ? 'w-full' : ''} ${className}`}>
      {children}
    </button>
  );
};