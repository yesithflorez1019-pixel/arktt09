import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function TopBar() {

  const googleMapsLink = "https://maps.app.goo.gl/34E1fQJKzC72Rewc7";
  const plataformaLink = "https://e.plataformaintegra.net/liceoexploradores/";

  return (
    <div className="bg-slate-900 text-slate-300 text-xs py-3 hidden md:block border-b border-slate-800">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex gap-6">
          <a href="tel:3005537195" className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
            <Phone size={14} className="text-cyan-400" /> (607) 626 3054 - 300 553 7195
          </a>
          <a href="mailto:lfexploradores@gmail.com" className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
            <Mail size={14} className="text-cyan-400" /> lfexploradores@gmail.com
          </a>
        </div>
        <div className="flex gap-4">
          <a 
            href={googleMapsLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors"
          >
            <MapPin size={14} className="text-cyan-400" /> Dg. 62 # 45-30, Barrancabermeja
          </a>
          <span className="text-slate-600">|</span>
          <a 
            href={plataformaLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-cyan-400 font-bold"
          >
            Plataforma Integra
          </a>
        </div>
      </div>
    </div>
  );
}