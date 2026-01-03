import React from 'react';
import { Facebook, Instagram, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import logo from '../images/logo_nombre.png'; // Asegúrate de que la ruta al logo sea correcta



const IconoTikTok = ({ size = 20, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);
export default function Footer({ navegarA }) {
  
  //  REDES SOCIALES 
  const redes = [
    { 
      nombre: "Facebook", 
      icono: Facebook, 
      link: "https://www.facebook.com/share/1BsV5q8LH2/" 
    },
    { 
      nombre: "Instagram", 
      icono: Instagram, 
      link: "https://www.instagram.com/liceoformadordexploradores?igsh=bGRwdnlsd2k2cjhl" 
    },
    { 
      nombre: "TikTok", 
      icono: IconoTikTok, 
      link: "https://www.tiktok.com/@liceo.formador.de?_r=1&_t=ZS-91Ky5fZOoVj" 
    },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 font-sans">
      
      {/* SECCIÓN PRINCIPAL */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* COLUMNA 1: LOGO Y DESCRIPCIÓN */}
          <div className="space-y-4">
            <div className=" p-2 rounded-lg w-fit">

               <img src={logo} alt="Liceo Exploradores" className="h-12 object-contain" />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Formando líderes del futuro con amor, disciplina y excelencia académica. Un espacio donde cada niño descubre su potencial.
            </p>
          </div>

          {/* COLUMNA 2: ENLACES RÁPIDOS */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Navegación</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navegarA('inicio')} className="hover:text-cyan-400 transition-colors">Inicio</button>
              </li>
              <li>
                <button onClick={() => navegarA('admisiones')} className="hover:text-cyan-400 transition-colors">Admisiones</button>
              </li>
              <li>
                <button onClick={() => navegarA('noticias')} className="hover:text-cyan-400 transition-colors">Noticias</button>
              </li>
              <li>
                <button onClick={() => navegarA('calendario')} className="hover:text-cyan-400 transition-colors">Calendario 2026</button>
              </li>
            </ul>
          </div>

          {/* COLUMNA 3: CONTACTO */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contáctanos</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-cyan-500 mt-1 flex-shrink-0" size={18} />
                <span>Dg. 62 # 45-30,<br/>Barrancabermeja, Santander</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-cyan-500 flex-shrink-0" size={18} />
                <span>(607) 626 3054</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-cyan-500 flex-shrink-0" size={18} />
                <span>lfexploradores@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* COLUMNA 4: REDES SOCIALES (AQUÍ ESTÁN LOS ICONOS) */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Síguenos</h3>
            <p className="text-sm text-slate-400 mb-4">
              Mantente al día con nuestras actividades en redes sociales.
            </p>
            <div className="flex gap-4">
              {redes.map((red, index) => (
                <a 
                  key={index}
                  href={red.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 p-3 rounded-full hover:bg-cyan-600 hover:text-white transition-all duration-300 group"
                  title={red.nombre} // Tooltip al pasar el mouse
                >
                  <red.icono size={20} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
            
            {/* Botón extra a Plataforma */}
            <a 
              href="https://e.plataformaintegra.net/liceoexploradores/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-xs font-bold bg-slate-800 px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors border border-slate-700"
            >
              <ExternalLink size={14}/> Ir a Plataforma de Notas
            </a>
          </div>

        </div>
      </div>

      {/* BARRA DE COPYRIGHT */}
      <div className="bg-slate-950 py-4 border-t border-slate-900">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© 2025 Liceo Formador de Exploradores. Todos los derechos reservados.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <span className="hover:text-slate-300 cursor-pointer">Política de Privacidad</span>
            <span className="hover:text-slate-300 cursor-pointer">Términos de Uso</span>
          </div>
        </div>
      </div>
    </footer>
  );
}