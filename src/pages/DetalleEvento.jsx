import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Seccion } from '../components/UI';
// CORRECCIÓN: Agregamos FileText a los imports
import { ArrowLeft, Calendar, MapPin, Clock, Share2, FileText } from 'lucide-react';
import usePageTitle from '../components/usePageTitle';

export default function DetalleEvento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [evento, setEvento] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Hook para el título
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
  
  // Formatear fecha bonita
  const dia = fechaObj.getDate();
  const mes = fechaObj.toLocaleDateString('es-ES', { month: 'long' });
  const anio = fechaObj.getFullYear();
  const hora = fechaObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

  return (
    <div className="font-sans min-h-screen bg-slate-50 pb-20 animate-fade-in">
      
      {/* --- CABECERA INMERSIVA --- */}
      <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
        {/* Imagen de Fondo */}
        <img 
            src={evento.imagen} 
            alt={evento.titulo} 
            className="w-full h-full object-cover"
        />
        {/* Degradado para leer el texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-celeste-900/90 via-celeste-900/40 to-transparent"></div>
        
        {/* Botón Volver Flotante */}
        <div className="absolute top-24 left-6 md:left-12 z-20">
            <button 
                onClick={() => navigate('/agenda')} 
                className="flex items-center gap-2 text-white/90 bg-black/20 hover:bg-black/40 backdrop-blur-md px-4 py-2 rounded-full transition-all border border-white/20 font-bold text-sm"
            >
                <ArrowLeft size={18}/> Volver a la Agenda
            </button>
        </div>

        {/* Título sobre la imagen */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10">
            <div className="container mx-auto">
                <span className="inline-block bg-celeste-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 shadow-lg uppercase tracking-wider">
                    Evento Institucional
                </span>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-lg max-w-4xl">
                    {evento.titulo}
                </h1>
                <div className="flex flex-wrap gap-4 mt-4 text-celeste-100 font-medium">
                    <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm">
                        <Calendar size={18}/> {dia} de {mes}, {anio}
                    </span>
                    <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm">
                        <MapPin size={18}/> {evento.lugar || 'Liceo Formador'}
                    </span>
                </div>
            </div>
        </div>
      </div>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <div className="container mx-auto px-6 -mt-10 relative z-20">
        <div className="grid md:grid-cols-3 gap-8">
            
            {/* COLUMNA IZQUIERDA: INFORMACIÓN (2/3 del ancho) */}
            <div className="md:col-span-2">
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                    <h2 className="text-2xl font-bold text-celeste-900 mb-6 flex items-center gap-2">
                        <FileText size={24} className="text-celeste-500"/>
                        Detalles del Evento
                    </h2>
                    
                    {/* Contenido con formato (saltos de línea) */}
                    <div className="prose prose-lg text-slate-600 whitespace-pre-line leading-relaxed">
                        {evento.contenido || evento.resumen}
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-100">
                        <p className="text-sm text-slate-400 italic">
                            * Recuerda llegar 15 minutos antes de la hora programada.
                        </p>
                    </div>
                </div>
            </div>

            {/* COLUMNA DERECHA: TARJETA RESUMEN (1/3 del ancho) */}
            <div className="md:col-span-1 space-y-6">
                
                {/* Tarjeta de Fecha/Hora */}
                <div className="bg-white rounded-3xl p-6 shadow-lg border-t-8 border-celeste-500 sticky top-24">
                    <h3 className="font-bold text-lg text-slate-800 mb-4">Ficha Técnica</h3>
                    
                    <ul className="space-y-4">
                        <li className="flex items-center gap-4">
                            <div className="bg-celeste-50 p-3 rounded-full text-celeste-600">
                                <Calendar size={20}/>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 uppercase font-bold">Fecha</p>
                                <p className="text-slate-700 font-bold">{dia} de {mes}</p>
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
                                navigator.share({
                                    title: evento.titulo,
                                    text: `Te invito a este evento: ${evento.titulo}`,
                                    url: window.location.href
                                });
                            } else {
                                alert('Link copiado al portapapeles');
                            }
                        }}
                        className="mt-6 w-full bg-celeste-600 text-white font-bold py-3 rounded-xl hover:bg-celeste-700 transition shadow-md flex items-center justify-center gap-2"
                    >
                        <Share2 size={18}/> Compartir Evento
                    </button>
                </div>

            </div>
        </div>
      </div>

    </div>
  );
}