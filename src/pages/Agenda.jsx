import React, { useState, useEffect } from 'react';
import { Seccion, Titulo, TituloSeccion, Boton } from '../components/UI';
import usePageTitle from '../components/usePageTitle';
import { Calendar, MapPin, Clock, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

export default function Agenda() {
  usePageTitle('Agenda de Eventos | Liceo Formador');
  const navigate = useNavigate();
  const [eventos, setEventos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const q = query(collection(db, "eventos"), orderBy("fecha", "asc"));
        const snap = await getDocs(q);
        setEventos(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (e) { console.error(e); } finally { setCargando(false); }
    };
    cargar();
  }, []);

  const getEstadoEvento = (fechaISO) => {
    const fechaEvento = new Date(fechaISO).setHours(0,0,0,0);
    const hoy = new Date().setHours(0,0,0,0);
    if (fechaEvento === hoy) return { texto: '¡EN CURSO!', clase: 'bg-green-500 text-white animate-pulse', icono: AlertCircle };
    if (fechaEvento < hoy) return { texto: 'FINALIZADO', clase: 'bg-slate-400 text-white', icono: CheckCircle };
    return { texto: 'PRÓXIMAMENTE', clase: 'bg-celeste-500 text-white', icono: Calendar };
  };

  return (
    <div className="pt-20 bg-celeste-400 min-h-screen animate-fade-in">
      <Seccion>
        <Titulo>Agenda de Actividades</Titulo>
        <p className="text-center text-white/90 text-lg mb-8">No te pierdas nada de lo que pasa en nuestro Liceo.</p>
      </Seccion>

      <Seccion blanca={true} className="rounded-t-[3rem] min-h-[600px]">
        {cargando && <p className="text-center py-10">Cargando agenda...</p>}
        {!cargando && eventos.length === 0 && <div className="text-center py-20 text-slate-400">No hay eventos programados.</div>}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventos.map(ev => {
                const estado = getEstadoEvento(ev.fecha);
                const fechaObj = new Date(ev.fecha);
                return (
                    <div key={ev.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full group">
                        <div className="h-48 relative overflow-hidden">
                            <img src={ev.imagen} alt={ev.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 ${estado.clase}`}>
                                <estado.icono size={14}/> {estado.texto}
                            </div>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="flex items-center gap-2 text-celeste-600 font-bold text-sm mb-2">
                                <Calendar size={16}/> {fechaObj.toLocaleDateString()}
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight group-hover:text-celeste-600 transition-colors">{ev.titulo}</h3>
                            <p className="text-slate-500 text-sm mb-4 line-clamp-3 flex-grow">{ev.resumen}</p>
                            <div className="border-t border-slate-100 pt-4 mt-auto">
                                <button onClick={() => navigate(`/agenda/evento/${ev.id}`)} className="w-full flex items-center justify-center gap-2 text-celeste-600 font-bold hover:bg-celeste-50 py-2 rounded-lg transition-colors">
                                    Ver Detalles <ArrowRight size={18}/>
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
      </Seccion>
    </div>
  );
}