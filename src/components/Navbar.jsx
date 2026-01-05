import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import logoLiceo from '../images/logo_nombre.png'

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false)

  const enlacesMenu = [
    { to: '/', etiqueta: 'INICIO' },
    { to: '/nosotros', etiqueta: 'NOSOTROS' },
    { to: '/galeria', etiqueta: 'GALERÍA' },
    { to: '/contacto', etiqueta: 'CONTACTO' },
  ]

  const cerrarMenu = () => setMenuAbierto(false)

  const clasesLink = ({ isActive }) =>
    `px-5 py-3 rounded-md font-bold transition-all border-b-2 ${
      isActive
        ? 'text-cyan-700 border-cyan-500 bg-cyan-50'
        : 'text-slate-600 border-transparent hover:text-cyan-600 hover:bg-slate-50'
    }`

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100">
        <div className="container mx-auto px-1 py-3 flex justify-between items-center">
          
          {/* Logo */}
          <NavLink
            to="/"
            onClick={cerrarMenu}
            className="flex items-center gap-3"
          >
            <img
              src={logoLiceo}
              alt="Liceo - Formador de Exploradores"
              className="h-20 object-contain"
            />
          </NavLink>

          {/* Menú escritorio */}
          <nav className="hidden md:flex items-center gap-1">
            {enlacesMenu.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={clasesLink}
                onClick={cerrarMenu}
              >
                {link.etiqueta}
              </NavLink>
            ))}
          </nav>

          {/* Botón menú móvil */}
          <button
            className="md:hidden text-slate-800 p-2"
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            {menuAbierto ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Menú móvil */}
        {menuAbierto && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl flex flex-col">
            {enlacesMenu.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={cerrarMenu}
                className={({ isActive }) =>
                  `py-4 px-6 text-left font-bold border-b border-slate-50 ${
                    isActive
                      ? 'text-cyan-700 bg-cyan-50'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-cyan-600'
                  }`
                }
              >
                {link.etiqueta}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
