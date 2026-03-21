import React, { useState, useEffect } from 'react';
import { Seccion, TituloSeccion } from '../../components/UI';
import usePageTitle from '../../components/usePageTitle';
import LoginPin from '../../components/juegos/LoginPin';
import { Gamepad2, Users, PlusCircle, Trash2, Copy, CheckCircle } from 'lucide-react';
import { db } from '../../firebase';
import { collection, addDoc, query, onSnapshot, deleteDoc, doc, serverTimestamp, orderBy, updateDoc } from 'firebase/firestore';

export default function DocentePanel() {
  usePageTitle('Panel de Juegos Docente | Liceo Formador');
  const [autenticado, setAutenticado] = useState(false);
  
  // Estados para crear nueva partida
  const [materia, setMateria] = useState('Matemáticas');
  const [grado, setGrado] = useState('Transición');
  
  // Estado para la lista de partidas activas
  const [partidasActivas, setPartidasActivas] = useState([]);
  const [copiado, setCopiado] = useState('');

  // Cargar partidas activas desde Firebase en tiempo real
  useEffect(() => {
    if (!autenticado) return;

    const q = query(collection(db, "partidas_juegos"), orderBy("creadoEn", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const salas = [];
      snapshot.forEach((doc) => {
        salas.push({ id: doc.id, ...doc.data() });
      });
      setPartidasActivas(salas);
    });

    return () => unsubscribe();
  }, [autenticado]);

  // Generar un PIN aleatorio de 5 dígitos para los alumnos
  const generarPinSala = () => Math.floor(10000 + Math.random() * 90000).toString();

  // Función para crear la sala en Firebase
  const crearPartida = async (e) => {
    e.preventDefault();
    const nuevoPin = generarPinSala();
    
    try {
      await addDoc(collection(db, "partidas_juegos"), {
        pin: nuevoPin,
        materia: materia,
        grado: grado,
        estado: 'esperando', // esperando, jugando, terminado
        jugadores: [],
        creadoEn: serverTimestamp()
      });
      alert(`¡Sala creada con éxito! El PIN para los alumnos es: ${nuevoPin}`);
    } catch (error) {
      console.error("Error al crear partida:", error);
      alert("Hubo un error al crear la sala.");
    }
  };

  // Función para eliminar sala
  const cerrarPartida = async (id) => {
    if(window.confirm("¿Seguro que deseas cerrar esta sala?")) {
      await deleteDoc(doc(db, "partidas_juegos", id));
    }
  };
  
  const iniciarPartida = async (id) => {
    try {
      await updateDoc(doc(db, "partidas_juegos", id), {
        estado: 'jugando'
      });
    } catch (error) {
      console.error("Error al iniciar:", error);
    }
  };

  const copiarPin = (pin) => {
    navigator.clipboard.writeText(pin);
    setCopiado(pin);
    setTimeout(() => setCopiado(''), 2000);
  };

  // --- SI NO ESTÁ AUTENTICADA, MOSTRAR EL LOGIN DE PIN ---
  if (!autenticado) {
    return (
      <div className="min-h-screen bg-slate-50 pt-20 animate-fade-in">
        <Seccion><LoginPin onLoginSuccess={() => setAutenticado(true)} /></Seccion>
      </div>
    );
  }

  // --- PANEL PRINCIPAL DOCENTE ---
  return (
    <div className="min-h-screen bg-slate-50 pt-20 animate-fade-in pb-32">
      
      <div className="bg-celeste-600 text-white py-12 px-6 shadow-md">
         <div className="container mx-auto max-w-6xl">
            <h1 className="text-3xl md:text-4xl font-black flex items-center gap-3">
               <Gamepad2 size={36}/> Panel de Juegos (Docente)
            </h1>
            <p className="text-celeste-100 font-light mt-2">Crea salas, reparte el PIN a tus alumnos y haz que aprender sea divertido.</p>
         </div>
      </div>

      <div className="container mx-auto max-w-6xl px-6 mt-10">
        <div className="grid md:grid-cols-12 gap-8">
            
            {/* COLUMNA IZQUIERDA: Crear Nueva Partida */}
            <div className="md:col-span-4">
               <div className="bg-white rounded-[2rem] p-8 shadow-lg border border-slate-100 sticky top-24">
                  <h3 className="font-bold text-xl text-slate-800 mb-6 flex items-center gap-2">
                     <PlusCircle className="text-celeste-500"/> Nueva Sala
                  </h3>
                  
                  <form onSubmit={crearPartida} className="space-y-6">
                     <div>
                        <label className="text-xs font-bold text-slate-400 uppercase block mb-2">Materia</label>
                        <select 
                           value={materia} 
                           onChange={(e) => setMateria(e.target.value)}
                           className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-celeste-300"
                        >
                           <option value="Matemáticas">Matemáticas (Sumas/Restas)</option>
                           <option value="Inglés">Inglés (Vocabulario)</option>
                           <option value="Lógica">Lógica Exploradora</option>
                        </select>
                     </div>

                     <div>
                        <label className="text-xs font-bold text-slate-400 uppercase block mb-2">Grado</label>
                        <select 
                           value={grado} 
                           onChange={(e) => setGrado(e.target.value)}
                           className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-celeste-300"
                        >
                           <option value="Prejardín">Prejardín</option>
                           <option value="Jardín">Jardín</option>
                           <option value="Transición">Transición</option>
                           <option value="Primero">Primero</option>
                           <option value="Segundo">Segundo</option>
                           <option value="Tercero">Tercero</option>
                           <option value="Cuarto">Cuarto</option>
                           <option value="Quinto">Quinto</option>
                        </select>
                     </div>

                     <button type="submit" className="w-full bg-celeste-600 text-white font-bold py-4 rounded-xl shadow-md hover:bg-celeste-700 hover:shadow-lg transition-all">
                        Generar Sala y PIN
                     </button>
                  </form>
               </div>
            </div>

            {/* COLUMNA DERECHA: Lista de Salas Activas */}
            <div className="md:col-span-8">
               <div className="bg-white rounded-[2rem] p-8 shadow-lg border border-slate-100 min-h-[400px]">
                  <h3 className="font-bold text-xl text-slate-800 mb-6 flex items-center gap-2">
                     <Users className="text-green-500"/> Salas Activas en Vivo
                  </h3>

                  {partidasActivas.length === 0 ? (
                     <div className="text-center py-20 text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        No hay salas activas en este momento. <br/> Crea una nueva sala para empezar.
                     </div>
                  ) : (
                     <div className="space-y-4">
                        {partidasActivas.map(sala => (
                           <div key={sala.id} className="border-2 border-slate-100 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-celeste-200 transition-colors bg-slate-50/50">
                              
                              <div>
                                 <div className="flex gap-2 mb-2">
                                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">{sala.materia}</span>
                                    <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full">{sala.grado}</span>
                                 </div>
                                 <p className="text-sm text-slate-500">Estado: <span className={`font-bold uppercase ${sala.estado === 'jugando' ? 'text-celeste-500' : 'text-green-500'}`}>{sala.estado}</span></p>
                                 <p className="text-sm text-slate-500 font-medium mt-1"><Users size={14} className="inline mr-1"/> Jugadores conectados: {sala.jugadores?.length || 0}</p>
                              </div>

                              <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                                 <div className="text-center">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">PIN Alumnos</p>
                                    <p className="text-3xl font-black text-slate-800 tracking-wider">{sala.pin}</p>
                                 </div>
                                 <button 
                                    onClick={() => copiarPin(sala.pin)}
                                    className="p-2 bg-slate-100 text-slate-500 rounded-lg hover:bg-celeste-100 hover:text-celeste-600 transition-colors"
                                    title="Copiar PIN"
                                 >
                                    {copiado === sala.pin ? <CheckCircle size={20} className="text-green-500"/> : <Copy size={20}/>}
                                 </button>
                              </div>

                              <div className="flex gap-2">
                                 {sala.estado === 'esperando' && (
                                    <button 
                                       onClick={() => iniciarPartida(sala.id)}
                                       className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-500 hover:text-white transition-colors flex items-center gap-2 justify-center font-bold"
                                    >
                                       Iniciar <span className="hidden md:inline">Juego</span>
                                    </button>
                                 )}
                                 <button 
                                    onClick={() => cerrarPartida(sala.id)}
                                    className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-colors flex items-center gap-2 justify-center"
                                 >
                                    <Trash2 size={18}/> 
                                 </button>
                              </div>
                           </div>
                        ))}
                     </div>
                  )}
               </div>
            </div>

        </div>
      </div>
    </div>
  );
}