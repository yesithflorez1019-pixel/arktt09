import React, { useState, useEffect } from 'react';
import {
  Facebook,
  Instagram,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Heart,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo_nombre.png';

// Icono TikTok
const IconoTikTok = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export default function Footer({ navegarA }) {
  const [visitas, setVisitas] = useState(1240);

  useEffect(() => {
    const namespace = 'liceo-formador-exploradores';
    const key = 'visitas_home';

    fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`)
      .then(res => res.json())
      .then(data => {
        if (data?.count) setVisitas(data.count);
      })
      .catch(() => {});
  }, []);

  const formatoNumero = (num) =>
    new Intl.NumberFormat('es-CO').format(num);

  const redes = [
    {
      nombre: 'Facebook',
      icono: Facebook,
      link: 'https://www.facebook.com/share/1BsV5q8LH2/'
    },
    {
      nombre: 'Instagram',
      icono: Instagram,
      link: 'https://www.instagram.com/liceoformadordexploradores?igsh=bGRwdnlsd2k2cjhl'
    },
    {
      nombre: 'TikTok',
      icono: IconoTikTok,
      link: 'https://www.tiktok.com/@liceo.formador.de?_r=1&_t=ZS-91Ky5fZOoVj'
    }
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 font-sans">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <img src={logo} alt="Liceo Exploradores" className="h-12 object-contain" />
            <p className="text-sm text-slate-400 leading-relaxed">
              Formando líderes del futuro con amor, disciplina y excelencia académica.
              Un espacio donde cada niño descubre su potencial.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Navegación</h3>
            <ul className="space-y-2 text-sm">
              {['inicio', 'admisiones', 'noticias', 'calendario'].map(item => (
                <li key={item}>
                  <button
                    onClick={() => navegarA(item)}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    {item === 'calendario'
                      ? 'Calendario 2026'
                      : item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contáctanos</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin size={18} className="text-cyan-500 mt-1" />
                <span>Dg. 62 #45-30<br />Barrancabermeja, Santander</span>
              </li>
              <li className="flex gap-3">
                <Phone size={18} className="text-cyan-500" />
                <span>(607) 626 3054</span>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="text-cyan-500" />
                <span>lfexploradores@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Síguenos</h3>
            <div className="flex gap-4 mb-4">
              {redes.map((red, i) => (
                <a
                  key={i}
                  href={red.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 p-3 rounded-full hover:bg-cyan-600 transition"
                  title={red.nombre}
                >
                  <red.icono size={20} />
                </a>
              ))}
            </div>

            <a
              href="https://e.plataformaintegra.net/liceoexploradores/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold bg-slate-800 px-4 py-2 rounded-lg hover:bg-slate-700 border border-slate-700"
            >
              <ExternalLink size={14} /> Plataforma de Notas
            </a>
          </div>
        </div>
      </div>

      <div className="bg-slate-950 py-6 border-t border-slate-900">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <span>© 2026 Liceo Formador de Exploradores.</span>
            <span className="hidden md:inline">•</span>
            <span>Todos los derechos reservados.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
              <span>Hecho con</span>
              <Heart size={10} className="text-red-500 fill-red-500" />
              <span>en Barrancabermeja</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 bg-slate-800/80 rounded-full border border-slate-700">
              <Eye size={12} className="text-cyan-500 animate-pulse" />
              <span className="font-mono font-bold text-cyan-400">
                {formatoNumero(visitas)}
              </span>
              <span className="text-slate-500 hidden sm:inline">visitas</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
