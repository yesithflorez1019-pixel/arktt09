import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Heart, ArrowRight } from 'lucide-react';
import logo from '../images/logo_nombre.png';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  
  return (
    // CAMBIO: Fondo oscuro (slate-900) para contrastar con la sección celeste anterior
    <footer className="bg-slate-900 text-white pt-16 pb-8 border-t-8 border-celeste-500">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 border-b border-slate-800 pb-12 mb-8">
          
          {/* Logo e Info */}
          <div className="space-y-6">
             <div className="bg-white p-3 rounded-xl inline-block shadow-lg">
                <img src={logo} alt="Liceo Logo" className="h-12 object-contain" />
             </div>
             <p className="text-slate-400 text-sm leading-relaxed">
               Formando líderes del futuro con amor, disciplina y excelencia académica. Un lugar donde los sueños despegan.
             </p>
             <div className="flex gap-3">
                <a href="#" className="bg-slate-800 hover:bg-celeste-500 p-2.5 rounded-full transition-colors text-white"><Facebook size={18}/></a>
                <a href="#" className="bg-slate-800 hover:bg-pink-600 p-2.5 rounded-full transition-colors text-white"><Instagram size={18}/></a>
             </div>
          </div>

          {/* Enlaces */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Explora</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><button onClick={()=>navigate('/')} className="hover:text-celeste-400 transition-colors flex items-center gap-2"><ArrowRight size={14}/> Inicio</button></li>
              <li><button onClick={()=>navigate('/nosotros')} className="hover:text-celeste-400 transition-colors flex items-center gap-2"><ArrowRight size={14}/> Nosotros</button></li>
              <li><button onClick={()=>navigate('/admisiones')} className="hover:text-celeste-400 transition-colors flex items-center gap-2"><ArrowRight size={14}/> Admisiones</button></li>
              <li><button onClick={()=>navigate('/galeria')} className="hover:text-celeste-400 transition-colors flex items-center gap-2"><ArrowRight size={14}/> Galería</button></li>
            </ul>
          </div>

          {/* Comunidad */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Comunidad</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="https://e.plataformaintegra.net/liceoexploradores/" target="_blank" className="hover:text-celeste-400 transition-colors flex items-center gap-2"><ArrowRight size={14}/> Plataforma Notas</a></li>
              <li><button onClick={()=>navigate('/pagos')} className="hover:text-celeste-400 transition-colors flex items-center gap-2"><ArrowRight size={14}/> Pagos en Línea</button></li>
              <li><button onClick={()=>navigate('/calendario')} className="hover:text-celeste-400 transition-colors flex items-center gap-2"><ArrowRight size={14}/> Calendario</button></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Ubícanos</h3>
            <ul className="space-y-4 text-sm text-slate-400">
               <li className="flex gap-3 items-start"><MapPin size={20} className="shrink-0 text-celeste-400"/> Dg. 62 #45-30<br/>Barrancabermeja, Santander</li>
               <li className="flex gap-3 items-center"><Phone size={20} className="shrink-0 text-celeste-400"/> (607) 626 3054</li>
               <li className="flex gap-3 items-center"><Mail size={20} className="shrink-0 text-celeste-400"/> lfexploradores@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
           <p>© {currentYear} Liceo Formador de Exploradores. Todos los derechos reservados.</p>
           <div className="flex items-center gap-1 mt-2 md:mt-0">
             <span>Hecho con</span>
             <Heart size={12} className="text-red-500 fill-red-500" />
             <span>en Colombia</span>
           </div>
        </div>
      </div>
    </footer>
  );
}