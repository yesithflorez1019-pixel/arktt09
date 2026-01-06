import React from 'react';
import { Mail, Phone, Facebook, Instagram } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="bg-celeste-400 text-white text-xs font-semibold py-2 hidden md:block border-b border-celeste-500">
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* Contacto Izquierda */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Phone size={14} />
            <span>(607) 626 3054</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={14} />
            <span>lfexploradores@gmail.com</span>
          </div>
        </div>

        {/* Redes Derecha */}
        <div className="flex items-center gap-4">
             <a href="#" className="hover:text-celeste-100 transition-colors"><Facebook size={16}/></a>
             <a href="#" className="hover:text-celeste-100 transition-colors"><Instagram size={16}/></a>
             <span className="opacity-50">|</span>
             <a href="https://e.plataformaintegra.net/liceoexploradores/" target="_blank" rel="noreferrer" className="hover:underline">
               Plataforma Integra
             </a>
        </div>
      </div>
    </div>
  )
}