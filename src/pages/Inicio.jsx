// 1. IMPORTAMOS TU IMAGEN LOCAL
import liceo from "../images/liceo1.png"; 

import React from 'react';
import { Monitor, FileText, Users, Calendar, ArrowRight, CheckCircle } from 'lucide-react';
import { TituloSeccion, TarjetaCristal, TarjetaNoticia } from '../components/UI';

// 2. IMPORTAMOS LOS DATOS DE NOTICIAS
import { noticiasData } from '../data/noticias'; 

export default function Inicio({ navegarA, verDetalle }) {
  
  const noticiasSeguras = noticiasData || [];

  const obtenerValorFecha = (fechaStr) => {
    const meses = {
      'ENE': 0, 'FEB': 1, 'MAR': 2, 'ABR': 3, 'MAY': 4, 'JUN': 5,
      'JUL': 6, 'AGO': 7, 'SEP': 8, 'OCT': 9, 'NOV': 10, 'DIC': 11
    };
    try {
      const [dia, mes] = fechaStr.split(' ');
      return (meses[mes.toUpperCase()] || 0) * 100 + parseInt(dia);
    } catch (e) {
      return 0;
    }
  };

  const noticiasOrdenadas = [...noticiasSeguras].sort((a, b) => {
    return obtenerValorFecha(b.fecha) - obtenerValorFecha(a.fecha);
  });

  const noticiasDestacadas = noticiasOrdenadas.slice(0, 3);

  // === LISTA DE ACCESOS RÁPIDOS CON ACCIONES ===
  const accesosRapidos = [
    { 
      titulo: "Plataforma Notas", 
      descripcion: "Acceso Padres/Alumnos", 
      imagen: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80",
      icono: Monitor,
      // ACCIÓN: Abrir link externo en nueva pestaña
      accion: () => window.open('https://e.plataformaintegra.net/liceoexploradores/', '_blank')
    },
    { 
      titulo: "Admisiones", 
      descripcion: "Requisitos y fechas", 
      imagen: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&q=80",
      icono: FileText,
      // ACCIÓN: Ir a la página interna de Admisiones
      accion: () => navegarA('admisiones')
    },
    { 
      titulo: "Calendario", 
      descripcion: "Cronograma 2025", 
      imagen: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=400&q=80",
      icono: Calendar,
      accion: () => {} // Pendiente
    },
    { 
      titulo: "PQRS", 
      descripcion: "Atención al ciudadano", 
      imagen: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&q=80",
      icono: Users,
      accion: () => navegarA('contacto') // Podríamos enviarlo a contacto por ahora
    },
  ];

  return (
    <div className="animate-fade-in">
      
      {/* SECCIÓN 1: PORTADA */}
      <section className="relative h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
           <img src={liceo} alt="Fondo Colegio" className="w-full h-full object-cover object-top" />
        </div>
      </section>

      {/* SECCIÓN 2: ACCESOS RÁPIDOS */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            {accesosRapidos.map((e, i) => (
              <div 
                key={i} 
                onClick={e.accion} // AQUÍ SE EJECUTA LA ACCIÓN AL HACER CLICK
                className="group cursor-pointer relative h-64 rounded-xl overflow-hidden shadow-lg border border-slate-200 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="absolute inset-0">
                   <img src={e.imagen} alt={e.titulo} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                </div>
                <div className="relative z-10 h-full flex flex-col items-center justify-end pb-8 px-4">
                  <h3 className="text-white font-bold text-lg mb-1 drop-shadow-md group-hover:text-cyan-300 transition-colors">{e.titulo}</h3>
                  <p className="text-slate-200 text-xs font-medium opacity-90 group-hover:text-white transition-colors">{e.descripcion}</p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* SECCIÓN 3: NOTICIAS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
             <div className="text-left">
               <h2 className="text-3xl font-bold text-slate-800 uppercase tracking-tight">Actualidad Institucional</h2>
               <div className="h-1.5 w-24 bg-cyan-500 rounded-full mt-4 shadow-sm"></div>
             </div>
             <button 
               onClick={() => navegarA('noticias')} 
               className="hidden md:flex items-center gap-2 text-cyan-600 font-bold hover:translate-x-1 transition-transform"
             >
               Ver todas las noticias <ArrowRight size={20}/>
             </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {noticiasDestacadas.map((item) => (
               <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group border border-slate-100">
                 <div className="h-48 overflow-hidden relative">
                   <img src={item.imagen} alt={item.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   <div className="absolute top-4 left-4 bg-white/95 text-slate-800 text-xs font-extrabold px-3 py-1 rounded-full shadow-sm border border-slate-200">
                     {item.fecha}
                   </div>
                 </div>
                 <div className="p-6">
                   <h3 className="font-bold text-lg text-slate-800 mb-3 leading-tight group-hover:text-cyan-600 transition-colors">{item.titulo}</h3>
                   <p className="text-slate-500 text-sm mb-4 line-clamp-3">{item.resumen}</p>
                   <button 
                     onClick={() => verDetalle(item.id)} 
                     className="text-cyan-600 font-bold text-sm hover:underline"
                   >
                     Leer más &rarr;
                   </button>
                 </div>
               </div>
            ))}
          </div>

          <button onClick={() => navegarA('noticias')} className="md:hidden mt-8 w-full py-3 border border-cyan-500 text-cyan-600 font-bold rounded-xl hover:bg-cyan-50">
            Ver todas las noticias
          </button>
        </div>
      </section>

      {/* SECCIÓN 4: SEDES */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <TituloSeccion titulo="Nuestras Sedes" />
          <div className="grid md:grid-cols-2 gap-8">
             <TarjetaCristal className="flex flex-col md:flex-row overflow-hidden group">
                <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Sede Principal" />
                </div>
                <div className="p-8 md:w-1/2 flex flex-col justify-center">
                  <h3 className="font-bold text-xl text-slate-800 mb-2">Sede Principal</h3>
                  <p className="text-sm text-slate-500 mb-4">Barrio Las Granjas</p>
                  <ul className="text-sm space-y-2 text-slate-600 mb-4">
                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-cyan-500"/> Primaria y Bachillerato</li>
                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-cyan-500"/> Auditorio Principal</li>
                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-cyan-500"/> Laboratorios</li>
                  </ul>
                  <button className="text-cyan-600 font-bold text-sm uppercase tracking-wide hover:underline text-left">Ver Ubicación</button>
                </div>
             </TarjetaCristal>
             
             <TarjetaCristal className="flex flex-col md:flex-row overflow-hidden group">
                <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Sede Preescolar" />
                </div>
                <div className="p-8 md:w-1/2 flex flex-col justify-center">
                  <h3 className="font-bold text-xl text-slate-800 mb-2">Sede Preescolar</h3>
                  <p className="text-sm text-slate-500 mb-4">Barrio Las Granjas</p>
                  <ul className="text-sm space-y-2 text-slate-600 mb-4">
                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-cyan-500"/> Párvulos a Transición</li>
                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-cyan-500"/> Parque Infantil</li>
                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-cyan-500"/> Ludoteca</li>
                  </ul>
                  <button className="text-cyan-600 font-bold text-sm uppercase tracking-wide hover:underline text-left">Ver Ubicación</button>
                </div>
             </TarjetaCristal>
          </div>
        </div>
      </section>
    </div>
  );
}