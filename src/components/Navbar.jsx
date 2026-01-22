import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from '../images/logo_nombre.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
    setSubmenuOpen(false);
    setMobileSubmenuOpen(false);
  }, [location]);

  const linkClass =
    "text-sm font-bold text-gris-texto hover:text-celeste-500 transition-colors px-3 py-2 uppercase tracking-wide flex items-center gap-1";

  const activeClass =
    "text-celeste-600 border-b-2 border-celeste-400";

  const menuNosotros = [
    { nombre: "Historia y Filosofía", ruta: "/nosotros/historia" },
    { nombre: "Símbolos Institucionales", ruta: "/nosotros/simbolos" },
    { nombre: "Perfil del Explorador", ruta: "/nosotros/perfil" },
    { nombre: "Familia Liceísta", ruta: "/nosotros/comunidad" },
  ];

  const mobileLinkClass = "w-full text-left p-3 text-gris-texto hover:bg-gray-50 rounded-lg font-medium flex justify-between items-center";

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-suave h-20 flex items-center">
      <div className="container mx-auto px-6 flex justify-between items-center">

        {/* LOGO */}
        <div onClick={() => navigate('/')} className="cursor-pointer">
          <img
            src={logo}
            alt="Logo"
            className="h-16 object-contain hover:scale-105 transition-transform"
          />
        </div>

        {/* MENÚ DESKTOP (Pantallas grandes) */}
        <nav className="hidden lg:flex items-center gap-2">

          <NavLink to="/" className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ''}`
          }>
            Inicio
          </NavLink>

          {/* NOSOTROS DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setSubmenuOpen(true)}
            onMouseLeave={() => setSubmenuOpen(false)}
          >
            <button className={linkClass}>
              Nosotros <ChevronDown size={14} />
            </button>

            
            <div className={`absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all
              ${submenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}
            `}>
              {menuNosotros.map((item, i) => (
                <NavLink
                  key={i}
                  to={item.ruta}
                  className="block px-6 py-3 text-sm text-gris-texto hover:bg-celeste-50 hover:text-celeste-600 font-medium"
                >
                  {item.nombre}
                </NavLink>
              ))}
            </div>
          </div>

          <NavLink to="/admisiones" className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ''}`
          }>
            Admisiones
          </NavLink>

          <NavLink to="/galeria" className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ''}`
          }>
            Galería
          </NavLink>

          <NavLink to="/noticias" className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ''}`
          }>
            Noticias
          </NavLink>

          <NavLink to="/contacto" className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ''}`
          }>
            Contacto
          </NavLink>
        </nav>

        {/* BOTÓN PLATAFORMA (Desktop) */}
        <div className="hidden lg:block">
          <a
            href="https://e.plataformaintegra.net/liceoexploradores/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-celeste-400 hover:bg-celeste-500 text-white font-bold py-2.5 px-6 rounded-full shadow-suave hover:shadow-fuerte transition-all transform hover:-translate-y-0.5"
          >
            Plataforma
          </a>
        </div>

        {/* HAMBURGUESA (Móvil) */}
        <button className="lg:hidden text-gris-titulo" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MENÚ MÓVIL (Lista corregida) */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border-t border-gray-100 shadow-xl lg:hidden p-4 flex flex-col gap-1 animate-fade-in max-h-[85vh] overflow-y-auto">
          
          <button onClick={() => navigate('/')} className={mobileLinkClass}>
            Inicio
          </button>

          {/* ACORDEÓN NOSOTROS */}
          <div>
            <button 
              onClick={() => setMobileSubmenuOpen(!mobileSubmenuOpen)} 
              className={`${mobileLinkClass} ${mobileSubmenuOpen ? 'text-celeste-600' : ''}`}
            >
              Nosotros 
              <ChevronDown size={18} className={`transition-transform ${mobileSubmenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Sub-menu items (Indentados) */}
            {mobileSubmenuOpen && (
              <div className="pl-4 bg-gray-50 rounded-lg mb-2">
                {menuNosotros.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(item.ruta)}
                    className="w-full text-left p-3 text-sm text-gris-texto hover:text-celeste-600 border-l-2 border-transparent hover:border-celeste-400"
                  >
                    {item.nombre}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => navigate('/admisiones')} className={mobileLinkClass}>
            Admisiones
          </button>

          <button onClick={() => navigate('/galeria')} className={mobileLinkClass}>
            Galería
          </button>

          <button onClick={() => navigate('/noticias')} className={mobileLinkClass}>
            Noticias
          </button>

          <button onClick={() => navigate('/contacto')} className={mobileLinkClass}>
            Contacto
          </button>

          <div className="mt-4 pt-4 border-t border-gray-100">
             <a
              href="https://e.plataformaintegra.net/liceoexploradores/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-celeste-400 hover:bg-celeste-500 text-white p-3 rounded-lg font-bold shadow-md"
            >
              Ir a Plataforma
            </a>
          </div>

        </div>
      )}
    </header>
  );
}