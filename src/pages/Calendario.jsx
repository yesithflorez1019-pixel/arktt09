import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Star, 
  BookOpen, 
  Coffee,
  Info
} from 'lucide-react';
import { TituloSeccion } from '../components/UI';
import SEO from '../components/SEO';

export default function Calendario({ navegarA }) {

  const [mesSeleccionado, setMesSeleccionado] = useState(0);

  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];


  const todosLosEventos = [
   // { id: 1, mesIndex: 0, dia: "20", titulo: "Inicio Labores Administrativas", hora: "7:00 AM", lugar: "Secretaría", tipo: "admin" },
    //{ id: 2, mesIndex: 1, dia: "03", titulo: "Inicio de Clases 2026", hora: "6:45 AM", lugar: "Sede Principal", tipo: "academico" },
   // { id: 3, mesIndex: 1, dia: "14", titulo: "Celebración San Valentín", hora: "10:00 AM", lugar: "Patio Central", tipo: "cultural" },
    //{ id: 4, mesIndex: 2, dia: "08", titulo: "Día de la Mujer", hora: "Izada de Bandera", lugar: "Auditorio", tipo: "cultural" },
   // { id: 5, mesIndex: 2, dia: "28", titulo: "Semana Santa", hora: "Todo el día", lugar: "Receso", tipo: "festivo" },
   // { id: 6, mesIndex: 3, dia: "23", titulo: "Día del Idioma", hora: "8:00 AM", lugar: "Biblioteca", tipo: "academico" },
   // { id: 7, mesIndex: 5, dia: "15", titulo: "Vacaciones Mitad de Año", hora: "-", lugar: "-", tipo: "vacaciones" },
   // { id: 8, mesIndex: 7, dia: "07", titulo: "Día de la Familia", hora: "9:00 AM", lugar: "Coliseo", tipo: "evento" },
   // { id: 9, mesIndex: 9, dia: "06", titulo: "Semana de Receso", hora: "-", lugar: "-", tipo: "vacaciones" },
   // { id: 10, mesIndex: 10, dia: "25", titulo: "Clausura Año Escolar", hora: "8:00 AM", lugar: "Auditorio", tipo: "academico" },
   // { id: 11, mesIndex: 11, dia: "05", titulo: "Grados Prescolar y Quinto", hora: "9:00 AM", lugar: "Auditorio", tipo: "evento" },
  ];

  // Filtramos los eventos según el mes que el usuario seleccionó
  const eventosDelMes = todosLosEventos.filter(e => e.mesIndex === mesSeleccionado);

  //  auxiliar para elegir el icono 
  const getIcono = (tipo) => {
    switch(tipo) {
      case 'academico': return <BookOpen size={20} className="text-blue-500" />;
      case 'festivo': return <Star size={20} className="text-yellow-500" />;
      case 'vacaciones': return <Coffee size={20} className="text-orange-500" />;
      case 'admin': return <Info size={20} className="text-slate-500" />;
      default: return <CalendarIcon size={20} className="text-cyan-500" />;
    }
  };

  return (
    <div className="animate-fade-in pt-12 pb-20 bg-slate-50 min-h-screen">
      <SEO 
        title="Calendario Académico 2026" 
        description="Consulta las fechas importantes: inicio de clases, entregas de informes, vacaciones y eventos institucionales."
        keywords="calendario escolar 2026, fechas importantes liceo, cronograma escolar"
      />
      <div className="container mx-auto px-6">
        
        <TituloSeccion 
          titulo="Agenda 2026" 
          subtitulo="Selecciona un mes para ver las actividades programadas." 
        />


        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          
          {/* barra superior movil */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2 grid grid-cols-3 lg:grid-cols-1 gap-1">
              {meses.map((mes, index) => (
                <button
                  key={index}
                  onClick={() => setMesSeleccionado(index)}
                  className={`px-4 py-3 rounded-xl text-left text-sm font-bold transition-all duration-200 flex justify-between items-center ${
                    mesSeleccionado === index
                      ? 'bg-cyan-600 text-white shadow-md transform scale-105'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-cyan-600'
                  }`}
                >
                  {mes}
                  {mesSeleccionado === index && <ChevronRight size={16} className="hidden lg:block" />}
                </button>
              ))}
            </div>
          </div>

          {/* tarjetas */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 min-h-[500px] relative overflow-hidden">
              
              {/* Encabezado del Mes */}
              <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                <h2 className="text-4xl font-extrabold text-slate-800">
                  {meses[mesSeleccionado]}
                </h2>
                <span className="text-6xl font-black text-slate-100 select-none">2026</span>
              </div>

              {/* Lista de Eventos */}
              <div className="space-y-4">
                {eventosDelMes.length > 0 ? (
                  eventosDelMes.map((evento) => (
                    <div 
                      key={evento.id} 
                      className="group flex flex-col sm:flex-row items-center gap-6 p-5 rounded-2xl border border-slate-100 hover:border-cyan-200 hover:shadow-md transition-all bg-slate-50/50 hover:bg-white"
                    >
                      {/* Fecha Grande */}
                      <div className="flex-shrink-0 w-20 h-20 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                        <span className="text-xs font-bold uppercase tracking-wider">DÍA</span>
                        <span className="text-3xl font-black">{evento.dia}</span>
                      </div>

                      {/* Info Evento */}
                      <div className="flex-grow text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                          {getIcono(evento.tipo)}
                          <h3 className="text-xl font-bold text-slate-700">{evento.titulo}</h3>
                        </div>
                        
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-slate-500 mt-2">
                          <span className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-slate-100">
                            <Clock size={14} className="text-cyan-500"/> {evento.hora}
                          </span>
                          <span className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-slate-100">
                            <MapPin size={14} className="text-cyan-500"/> {evento.lugar}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  // estado vacio //
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                      <CalendarIcon size={32} className="text-slate-300" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-400">Sin actividades programadas</h3>
                    <p className="text-slate-400 text-sm mt-2 max-w-xs">
                      No hay eventos especiales registrados para {meses[mesSeleccionado]} por el momento.
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

        <div className="text-center mt-12">
            <button onClick={() => navegarA('inicio')} className="text-cyan-600 font-bold hover:underline">
               Volver al Inicio
            </button>
        </div>

      </div>
    </div>
  );
}