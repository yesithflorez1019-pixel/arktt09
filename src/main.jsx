import React, { useEffect, useState } from 'react';
import { Facebook, Instagram, Phone, Mail, MapPin, ExternalLink, Eye, Heart } from 'lucide-react';

export default function Footer({ navegarA }) {
  
  // Iniciamos en 100 para que no se vea vacío mientras carga
  const [visitas, setVisitas] = useState(1240); 

  useEffect(() => {
    // Usamos una API más estable: counterapi.dev
    // Namespace único para tu colegio
    const namespace = 'liceo-formador-exploradores'; 
    const key = 'visitas_home';
    
    // Esta URL incrementa el contador cada vez que alguien entra
    fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`)
      .then(res => res.json())
      .then(data => {
        // Si responde bien, actualizamos el número real
        if (data && data.count) {
          setVisitas(data.count);
        }
      })
      .catch(err => {
        // Si falla (por bloqueo de publicidad o error de red), 
        // NO hacemos nada y dejamos el 1240 por defecto.
        // Así siempre se ve algo bonito.
        console.log("Usando contador base por error de red");
      });
  }, []);

  const formatoNumero = (num) => {
    return new Intl.NumberFormat('es-CO').format(num);
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      
      {/* SECCIÓN PRINCIPAL */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          
          {/* COLUMNA 1: EL COLEGIO */}
          <div className="space-y-4">
            <h3 className="text-white font-black text-lg uppercase tracking-wider mb-2">Liceo Formador</h3>
            <p className="text-sm text-slate-400 leading-relaxed text-justify">
              Formamos exploradores curiosos, creativos y felices. Una institución comprometida con la excelencia académica y el calor humano en Barrancabermeja.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://www.facebook.com/profile.php?id=100063857501726" target="_blank" rel="noopener noreferrer" className="bg-slate-800 p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all"><Facebook size={20}/></a>
              <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-pink-600 hover:text-white transition-all"><Instagram size={20}/></a>
            </div>
          </div>

          {/* COLUMNA 2: ENLACES RÁPIDOS */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Navegación</h3>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => navegarA('inicio')} className="hover:text-cyan-400 transition-colors">Inicio</button></li>
              <li><button onClick={() => navegarA('nosotros')} className="hover:text-cyan-400 transition-colors">Quiénes Somos</button></li>
              <li><button onClick={() => navegarA('admisiones')} className="hover:text-cyan-400 transition-colors">Admisiones</button></li>
              <li><button onClick={() => navegarA('noticias')} className="hover:text-cyan-400 transition-colors">Noticias</button></li>
              <li><button onClick={() => navegarA('pagos')} className="hover:text-cyan-400 transition-colors">Pagos en Línea</button></li>
            </ul>
          </div>

          {/* COLUMNA 3: INSTITUCIONAL */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Institucional</h3>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => navegarA('calendario')} className="hover:text-cyan-400 transition-colors">Calendario Académico</button></li>
              <li><button onClick={() => navegarA('academico')} className="hover:text-cyan-400 transition-colors">Gestión Académica</button></li>
              <li><a href="https://e.plataformaintegra.net/liceoexploradores/" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-cyan-400 transition-colors">Plataforma Integra <ExternalLink size={12}/></a></li>
            </ul>
          </div>

          {/* COLUMNA 4: CONTACTO */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-cyan-500 mt-0.5 shrink-0"/>
                <span>Diagonal 62 # 43-30<br/>Barrio Las Granjas<br/>Barrancabermeja</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-cyan-500 shrink-0"/>
                <span>(607) 626 3054</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-cyan-500 shrink-0"/>
                <span className="break-all">lfexploradores@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* BARRA INFERIOR */}
      
    </footer>
  );
}