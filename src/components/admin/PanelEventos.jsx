import React, { useState, useEffect } from 'react';
import { db, storage } from '../../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Calendar, Trash2, Plus, Loader, Clock, MapPin } from 'lucide-react';
import { Tarjeta, Boton } from '../UI';


export default function PanelEventos() {
    

  
    
  const [eventos, setEventos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [subiendo, setSubiendo] = useState(false);

  // Formulario
  const [titulo, setTitulo] = useState('');
  const [fecha, setFecha] = useState(''); // Guardará fecha y hora
  const [lugar, setLugar] = useState('');
  const [resumen, setResumen] = useState(''); // Texto corto para la tarjeta
  const [contenido, setContenido] = useState(''); // Texto largo para el detalle
  const [imagen, setImagen] = useState(null);

    useEffect(() => {
    cargarEventos();
  }, []);

  const cargarEventos = async () => {
    setCargando(true);
    try {
      // Ordenamos por fecha del evento para ver los próximos primero
      const q = query(collection(db, "eventos"), orderBy("fecha", "asc"));
      const snapshot = await getDocs(q);
      setEventos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) { console.error(error); }
    setCargando(false);
  };
  
 

  const crearEvento = async (e) => {
    e.preventDefault();
    if (!titulo || !fecha || !imagen) return alert("Faltan datos obligatorios (Título, Fecha o Imagen)");

    setSubiendo(true);
    try {
      // 1. Subir Imagen
      const refImg = ref(storage, `eventos/${Date.now()}_${imagen.name}`);
      await uploadBytes(refImg, imagen);
      const urlImg = await getDownloadURL(refImg);

      // 2. Guardar en Firestore
      await addDoc(collection(db, "eventos"), {
        titulo,
        fecha, // Se guarda como string ISO del input datetime-local
        lugar,
        resumen,
        contenido,
        imagen: urlImg,
        creado: new Date()
      });

      // 3. Limpiar formulario
      setTitulo(''); setFecha(''); setLugar(''); setResumen(''); setContenido(''); setImagen(null);
      alert("¡Evento publicado con éxito! 🎉");
      cargarEventos();
    } catch (error) {
      console.error(error);
      alert("Error al guardar el evento");
    }
    setSubiendo(false);
  };

  const borrarEvento = async (id) => {
    if(!window.confirm("¿Estás seguro de eliminar este evento?")) return;
    try {
      await deleteDoc(doc(db, "eventos", id));
      cargarEventos();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-celeste-900 flex items-center gap-2">
        <Calendar /> Gestión de Eventos y Agenda
      </h2>

      {/* FORMULARIO DE CREACIÓN */}
      <Tarjeta className="bg-celeste-50 border-l-4 border-celeste-500 shadow-md">
        <h3 className="font-bold text-lg mb-4 text-celeste-800 flex items-center gap-2">
          <Plus size={20}/> Programar Nuevo Evento
        </h3>
        
        <form onSubmit={crearEvento} className="grid md:grid-cols-2 gap-4">
          
          <div className="md:col-span-2">
            <label className="text-xs font-bold text-celeste-700 uppercase block mb-1">Título del Evento</label>
            <input 
              type="text" 
              value={titulo} 
              onChange={e=>setTitulo(e.target.value)} 
              className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-celeste-400 outline-none" 
              placeholder="Ej: Día de la Ciencia 2026" 
            />
          </div>

          <div>
            <label className="text-xs font-bold text-celeste-700 uppercase block mb-1">Fecha y Hora</label>
            <input 
              type="datetime-local" 
              value={fecha} 
              onChange={e=>setFecha(e.target.value)} 
              className="w-full p-2 border border-slate-300 rounded text-slate-600 focus:ring-2 focus:ring-celeste-400 outline-none" 
            />
          </div>

          <div>
            <label className="text-xs font-bold text-celeste-700 uppercase block mb-1">Lugar (Opcional)</label>
            <input 
              type="text" 
              value={lugar} 
              onChange={e=>setLugar(e.target.value)} 
              className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-celeste-400 outline-none" 
              placeholder="Ej: Auditorio Principal" 
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-bold text-celeste-700 uppercase block mb-1">Resumen Corto (Para la tarjeta de inicio)</label>
            <input 
              type="text" 
              value={resumen} 
              onChange={e=>setResumen(e.target.value)} 
              className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-celeste-400 outline-none" 
              placeholder="Ej: Acompáñanos a descubrir los proyectos de nuestros estudiantes..." 
              maxLength={120}
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-bold text-celeste-700 uppercase block mb-1">Contenido Detallado (Página completa)</label>
            <textarea 
              rows="5" 
              value={contenido} 
              onChange={e=>setContenido(e.target.value)} 
              className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-celeste-400 outline-none resize-none" 
              placeholder="Aquí puedes escribir toda la información: requisitos, vestuario, cronograma, invitados, etc."
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-bold text-celeste-700 uppercase block mb-1">Imagen de Portada</label>
            <input 
              type="file" 
              onChange={e=>setImagen(e.target.files[0])} 
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-celeste-700 hover:file:bg-celeste-100 cursor-pointer border border-slate-300 rounded" 
              accept="image/*" 
            />
          </div>

          <div className="md:col-span-2 mt-2">
             <Boton variante="azul" full={true} disabled={subiendo}>
               {subiendo ? <Loader className="animate-spin" /> : "Publicar Evento"}
             </Boton>
          </div>
        </form>
      </Tarjeta>

      {/* LISTADO DE EVENTOS */}
      <div className="bg-white rounded-xl shadow p-6 border border-slate-100">
        <h3 className="font-bold text-xl text-celeste-900 border-b border-slate-100 pb-4 mb-4">
            Eventos Programados ({eventos.length})
        </h3>
        
        {cargando ? (
            <div className="text-center py-10 text-slate-400">Cargando lista...</div>
        ) : (
            <div className="grid gap-4">
                {eventos.map(ev => (
                    <div key={ev.id} className="flex flex-col md:flex-row gap-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-200 hover:shadow-md transition-all">
                        {/* Miniatura */}
                        <img src={ev.imagen} className="w-full md:w-24 h-24 object-cover rounded-lg" alt="Miniatura"/>
                        
                        {/* Info */}
                        <div className="flex-grow text-center md:text-left">
                            <h4 className="font-bold text-slate-800 text-lg">{ev.titulo}</h4>
                            <div className="text-sm text-celeste-600 font-medium flex items-center justify-center md:justify-start gap-2 mt-1">
                                <Clock size={16}/> 
                                {new Date(ev.fecha).toLocaleString('es-ES', { dateStyle: 'full', timeStyle: 'short' })}
                            </div>
                            {ev.lugar && (
                                <div className="text-xs text-slate-500 flex items-center justify-center md:justify-start gap-1 mt-1">
                                    <MapPin size={14}/> {ev.lugar}
                                </div>
                            )}
                        </div>

                        {/* Botón Borrar */}
                        <button 
                            onClick={() => borrarEvento(ev.id)} 
                            className="text-red-500 hover:text-white hover:bg-red-500 bg-white border border-red-200 p-2 rounded-full transition-all"
                            title="Eliminar Evento"
                        >
                            <Trash2 size={20}/>
                        </button>
                    </div>
                ))}
                
                {eventos.length === 0 && (
                    <p className="text-center text-slate-400 italic">No hay eventos activos.</p>
                )}
            </div>
        )}
      </div>
    </div>
  );
}