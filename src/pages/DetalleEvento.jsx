import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ArrowLeft, Calendar, MapPin, Clock, Share2, FileText } from 'lucide-react';
import usePageTitle from '../components/usePageTitle';

export default function DetalleEvento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [evento, setEvento] = useState(null);
  const [cargando, setCargando] = useState(true);

  usePageTitle(evento ? `${evento.titulo} | Agenda` : 'Cargando evento...');

  useEffect(() => {
    const getEvento = async () => {
      try {
        const docRef = doc(db, "eventos", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setEvento({ id: docSnap.id, ...docSnap.data() });
        } else {
          navigate('/agenda');
        }
      } catch (e) { 
        console.error(e); 
      } finally { 
        setCargando(false); 
      }
    };
    getEvento();
  }, [id, navigate]);

  if (cargando) return (
    <div className="min-h-screen bg-celeste-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-celeste-200 border-t-celeste-600"></div>
    </div>
  );

  if (!evento) return null;

  const fechaObj = new Date(evento.fecha);
  const dia = fechaObj.getDate();
  const mes = fechaObj.toLocaleDateString('es-ES', { month: 'long' });
  const anio = fechaObj.getFullYear();
  const hora = fechaObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

  return (
    <div className="font-sans min-h-screen bg-slate-50 pb-20 animate-fade-in">
      
      {/* --- CABECERA (Ajustada para móvil) --- */}
      <div className="relative h-[40vh] md:h-[60vh] w-full overflow-hidden">
        <img src={evento.imagen} alt={evento.titulo} className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-celeste-900/90 via-celeste-900/40 to-transparent"></div>
        
        {/* Botón Volver */}
        <div className="absolute top-24 left-4 md:left-12 z-20">
            <button 
                onClick={() => navigate('/agenda')} 
                className="flex items-center gap-2 text-white/90 bg-black/30 hover:bg-black/50 backdrop-blur-md px-4 py-2 rounded-full transition-all border border-white/20 font-bold text-xs md:text-sm"
            >
                <ArrowLeft size={16}/> Volver
            </button>
        </div>

        {/* Título */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10">
            <div className="container mx-auto">
                <span className="inline-block bg-celeste-500 text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full mb-3 shadow-lg uppercase tracking-wider">
                    Evento Institucional
                </span>
                <h1 className="text-2xl md:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-lg max-w-4xl">
                    {evento.titulo}
                </h1>
            </div>
        </div>
      </div>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <div className="container mx-auto px-4 md:px-6 -mt-6 md:-mt-10 relative z-20">
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            
            {/* COLUMNA DERECHA: TARJETA RESUMEN (Ahora va PRIMERO en móvil) */}
            <div className="md:col-span-1 order-first md:order-last space-y-6">
                <div className="bg-white rounded-3xl p-6 shadow-lg border-t-8 border-celeste-500 md:sticky md:top-24">
                    <h3 className="font-bold text-lg text-slate-800 mb-4">Información Clave</h3>
                    
                    <ul className="space-y-4">
                        <li className="flex items-center gap-4">
                            <div className="bg-celeste-50 p-3 rounded-full text-celeste-600">
                                <Calendar size={20}/>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 uppercase font-bold">Fecha</p>
                                <p className="text-slate-700 font-bold capitalize">{dia} de {mes}, {anio}</p>
                            </div>
                        </li>
                        <li className="flex items-center gap-4">
                            <div className="bg-celeste-50 p-3 rounded-full text-celeste-600">
                                <Clock size={20}/>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 uppercase font-bold">Hora</p>
                                <p className="text-slate-700 font-bold">{hora}</p>
                            </div>
                        </li>
                        <li className="flex items-center gap-4">
                            <div className="bg-celeste-50 p-3 rounded-full text-celeste-600">
                                <MapPin size={20}/>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 uppercase font-bold">Lugar</p>
                                <p className="text-slate-700 font-bold">{evento.lugar || 'Sede Principal'}</p>
                            </div>
                        </li>
                    </ul>

                    <button 
                        onClick={() => {
                            if (navigator.share) {
                                navigator.share({ title: evento.titulo, text: `Evento: ${evento.titulo}`, url: window.location.href });
                            } else { alert('Link copiado'); }
                        }}
                        className="mt-6 w-full bg-celeste-600 text-white font-bold py-3 rounded-xl hover:bg-celeste-700 transition shadow-md flex items-center justify-center gap-2"
                    >
                        <Share2 size={18}/> Compartir
                    </button>
                </div>
            </div>

            {/* COLUMNA IZQUIERDA: DESCRIPCIÓN */}
            <div className="md:col-span-2">
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
                    <h2 className="text-xl md:text-2xl font-bold text-celeste-900 mb-6 flex items-center gap-2">
                        <FileText size={24} className="text-celeste-500"/>
                        Detalles
                    </h2>
                    <div className="prose prose-lg text-slate-600 whitespace-pre-line leading-relaxed text-sm md:text-base">
                        {evento.contenido || evento.resumen}
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}