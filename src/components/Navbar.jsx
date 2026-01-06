import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoLiceo from '../images/logo_nombre.png';

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate();

  // Links: Texto gris oscuro, Hover celeste
  const linkClass = "text-sm font-bold text-gris-texto hover:text-celeste-500 transition-colors px-3 py-2 uppercase tracking-wide";
  const activeClass = "text-celeste-600 border-b-2 border-celeste-400";

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-suave h-20 flex items-center">
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <div onClick={() => navigate('/')} className="cursor-pointer">
          <img src={logoLiceo} alt="Logo" className="h-16 object-contain hover:scale-105 transition-transform" />
        </div>

        {/* Menú Desktop */}
        <nav className="hidden lg:flex items-center gap-4">
          {[
            { to: '/', label: 'Inicio' },
            { to: '/nosotros', label: 'El Colegio' },
            { to: '/admisiones', label: 'Admisiones' },
            { to: '/galeria', label: 'Galería' },
            { to: '/noticias', label: 'Noticias' },
            { to: '/contacto', label: 'Contacto' },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Botón de Acción */}
        <div className="hidden lg:block">
          <button 
            onClick={() => navigate('/contacto')}
            className="bg-celeste-400 hover:bg-celeste-500 text-white font-bold py-2.5 px-6 rounded-full shadow-suave hover:shadow-fuerte transition-all transform hover:-translate-y-0.5"
          >
            Solicitar Información
          </button>
        </div>

        {/* Móvil Toggle */}
        <button className="lg:hidden text-gris-titulo" onClick={() => setMenuAbierto(!menuAbierto)}>
          {menuAbierto ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menú Móvil */}
      {menuAbierto && (
        <div className="absolute top-20 left-0 w-full bg-white border-t border-gray-100 shadow-xl lg:hidden p-4 flex flex-col gap-2 animate-fade-in">
           <button onClick={() => navigate('/')} className="w-full text-left p-3 font-bold text-celeste-600 bg-celeste-50 rounded-lg">Inicio</button>
           <button onClick={() => navigate('/nosotros')} className="w-full text-left p-3 text-gris-texto hover:bg-gray-50 rounded-lg">El Colegio</button>
           <button onClick={() => navigate('/admisiones')} className="w-full text-left p-3 text-gris-texto hover:bg-gray-50 rounded-lg">Admisiones</button>
           <button onClick={() => navigate('/contacto')} className="w-full bg-celeste-400 text-white p-3 rounded-lg font-bold mt-2">Contáctanos</button>
        </div>
      )}
    </header>
  )
}