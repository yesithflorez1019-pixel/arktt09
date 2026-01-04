import React, { useState } from 'react';
import { Menu, X, Backpack, ChevronDown } from 'lucide-react';
import logoLiceo from "../images/logo_nombre.png";

export default function Navbar({ navegarA, paginaActual }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const enlacesMenu = [
    { id: 'inicio', etiqueta: 'INICIO' },
    { id: 'nosotros', etiqueta: 'NOSOTROS' },
    { id: 'galeria', etiqueta: 'GALERÍA' },
    { id: 'contacto', etiqueta: 'CONTACTO' },
  ];

  const manejarClick = (id) => {
    navegarA(id);
    setMenuAbierto(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Fondo blanco sólido para que se vea serio y limpio */}
      <div className="bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100">
        <div className="container mx-auto px-1 py-3 flex justify-between items-center">
          
          {/* LOGOTIPO */}
            <div
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => manejarClick('inicio')}
              >
              
                {/* LOGO CON TEXTO EN IMAGEN */}
                <img
                  src={logoLiceo}
                  alt="Liceo - Formador de Exploradores"
                  className="h-20 md:h-50 object-contain"
                />
              </div>

          {/* MENÚ PC */}
          <nav className="hidden md:flex items-center gap-1">
            {enlacesMenu.map((link) => (
              <button 
                key={link.id} 
                onClick={() => manejarClick(link.id)}
                className={`px-5 py-3 rounded-md text-base md:text-lg font-bold transition-all duration-300 border-b-2 ${
                  paginaActual === link.id 
                    ? 'text-cyan-700 border-cyan-500 bg-cyan-50' 
                    : 'text-slate-600 border-transparent hover:text-cyan-600 hover:bg-slate-50'
                }`}
              >
                {link.etiqueta}
              </button>
            ))}
            
          </nav>

          {/* MENÚ MÓVIL */}
          <button className="md:hidden text-slate-800 p-2" onClick={() => setMenuAbierto(!menuAbierto)}>
            {menuAbierto ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* DESPLEGABLE MÓVIL */}
        {menuAbierto && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl flex flex-col">
            {enlacesMenu.map((link) => (
              <button 
                key={link.id}
                onClick={() => manejarClick(link.id)}
                className="py-4 px-6 text-left font-bold text-slate-700 border-b border-slate-50 hover:bg-slate-50 hover:text-cyan-600"
              >
                {link.etiqueta}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}