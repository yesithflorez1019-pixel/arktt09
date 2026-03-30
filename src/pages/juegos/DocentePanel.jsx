import React, { useState, useEffect } from 'react';
import { Seccion } from '../../components/UI';
import usePageTitle from '../../components/usePageTitle';
import LoginDocente from '../../components/juegos/LoginDocente';
import CrearJuego from '../../components/juegos/CrearJuego';
import { Gamepad2, Users, PlusCircle, Trash2, Copy, CheckCircle, Trophy, Crown, Award, PlayCircle, StopCircle, LogOut, Loader2, ArrowLeft, BookPlus } from 'lucide-react';

// FIREBASE
import { db, auth } from '../../firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth'; 
import { collection, addDoc, query, where, onSnapshot, deleteDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';

export default function DocentePanel() {
  usePageTitle('Panel de Juegos Docente | Liceo Formador');
  
  const [autenticado, setAutenticado] = useState(false);
  const [cargandoAuth, setCargandoAuth] = useState(true); 
  const [usuario, setUsuario] = useState(null);
  
  const [vista, setVista] = useState('salas'); // 'salas' o 'crearJuego'

  const [juegoSeleccionado, setJuegoSeleccionado] = useState('Matemáticas Básicas');
  const [grado, setGrado] = useState('Transición');
  const [partidasActivas, setPartidasActivas] = useState([]);
  
  // NUEVO: Estado para guardar los juegos personalizados del profe
  const [misJuegos, setMisJuegos] = useState([]);
  const [copiado, setCopiado] = useState('');

  // 1. ESCUCHAR SI LA PROFE ESTÁ LOGUEADA EN FIREBASE
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario(user);
        setAutenticado(true);
      } else {
        setUsuario(null);
        setAutenticado(false);
      }
      setCargandoAuth(false);
    });
    return () => unsubscribeAuth();
  }, []);

  // 2. CARGAR LAS SALAS ACTIVAS DEL DOCENTE
  useEffect(() => {
    if (!usuario) {
      setPartidasActivas([]);
      return;
    }
    // Quitamos el orderBy de Firebase para evitar el error de Índices. Lo ordenaremos en JS.
    const q = query(collection(db, "partidas_juegos"), where("creadorId", "==", usuario.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const salas = [];
      snapshot.forEach((doc) => {
        salas.push({ id: doc.id, ...doc.data() });
      });
      // Ordenamos las salas de la más nueva a la más vieja con JavaScript
      salas.sort((a, b) => (b.creadoEn?.seconds || 0) - (a.creadoEn?.seconds || 0));
      setPartidasActivas(salas);
    });
    return () => unsubscribe();
  }, [usuario]);

  // 3. NUEVO: CARGAR LOS JUEGOS CREADOS POR EL DOCENTE
  useEffect(() => {
    if (!usuario) return;
    const q = query(collection(db, "juegos"), where("docenteId", "==", usuario.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const juegos = [];
      snapshot.forEach((doc) => {
        juegos.push({ id: doc.id, ...doc.data() });
      });
      setMisJuegos(juegos);
    });
    return () => unsubscribe();
  }, [usuario]);

  const generarPinSala = () => Math.floor(10000 + Math.random() * 90000).toString();

  const crearPartida = async (e) => {
    e.preventDefault();
    if (!usuario) return alert("Error: Debes estar logueado.");

    let preguntasParaLaSala = [];
    let nombreMateria = juegoSeleccionado;

    // Si elige los juegos por defecto que querías
    if (juegoSeleccionado === 'Matemáticas Básicas') {
      preguntasParaLaSala = [
        { pregunta: "¿Cuánto es 5 + 3?", opciones: ["6", "7", "8", "9"], correcta: "8" },
        { pregunta: "¿Cuánto es 10 - 4?", opciones: ["4", "5", "6", "7"], correcta: "6" }
      ];
    } else if (juegoSeleccionado === 'Inglés Básico') {
      preguntasParaLaSala = [
        { pregunta: "¿Cómo se dice 'Perro'?", opciones: ["Cat", "Dog", "Bird", "Fish"], correcta: "Dog" },
        { pregunta: "Color Rojo en inglés:", opciones: ["Blue", "Red", "Yellow", "Green"], correcta: "Red" }
      ];
    } else {
      // SI ELIGE UN JUEGO PERSONALIZADO CREADO POR EL PROFE
      const juegoCustom = misJuegos.find(j => j.id === juegoSeleccionado);
      if (juegoCustom) {
        nombreMateria = juegoCustom.nombre;
        // Transformamos el formato guardado en CrearJuego al formato que lee el Lobby
        preguntasParaLaSala = juegoCustom.preguntas.map(p => ({
          pregunta: p.pregunta,
          opciones: p.opciones,
          correcta: p.opciones[p.respuestaCorrecta] // La respuesta que marcó como correcta
        }));
      }
    }

    if(preguntasParaLaSala.length === 0) return alert("Este juego no tiene preguntas.");

    const nuevoPin = generarPinSala();
    try {
      await addDoc(collection(db, "partidas_juegos"), {
        pin: nuevoPin,
        materia: nombreMateria,
        grado: grado,
        estado: 'esperando', 
        jugadores: [],
        preguntas: preguntasParaLaSala, // <-- ¡GUARDAMOS LAS PREGUNTAS EN LA SALA!
        creadoEn: serverTimestamp(),
        creadorId: usuario.uid,
        creadorNombre: usuario.displayName || "Docente"
      });
      alert(`¡Sala creada! El PIN es: ${nuevoPin}`);
    } catch (error) { console.error("Error al crear:", error); }
  };

  const iniciarPartida = async (id) => {
    try { await updateDoc(doc(db, "partidas_juegos", id), { estado: 'jugando' }); } 
    catch (error) { console.error(error); }
  };

  const terminarPartida = async (id) => {
    if(window.confirm("¿Mostrar podio final y terminar partida?")) {
      try { await updateDoc(doc(db, "partidas_juegos", id), { estado: 'terminado' }); } 
      catch (error) { console.error(error); }
    }
  };

  const cerrarPartida = async (id) => {
    if(window.confirm("¿Seguro que deseas ELIMINAR esta sala?")) {
      await deleteDoc(doc(db, "partidas_juegos", id));
    }
  };

  const copiarPin = (pin) => {
    navigator.clipboard.writeText(pin);
    setCopiado(pin);
    setTimeout(() => setCopiado(''), 2000);
  };

  if (cargandoAuth) return <div className="min-h-screen bg-slate-50 flex items-center justify-center"><Loader2 className="animate-spin text-celeste-500" size={40}/></div>;
  if (!autenticado) return <div className="min-h-screen bg-slate-50 pt-20"><Seccion><LoginDocente /></Seccion></div>;

  return (
    <div className="min-h-screen bg-slate-50 pt-20 animate-fade-in pb-32">
      <div className="bg-celeste-600 text-white py-8 px-6 shadow-md relative z-10">
         <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
               <h1 className="text-3xl font-black flex items-center gap-3">
                  <Gamepad2 size={32}/> {vista === 'salas' ? 'Panel de Juegos Docente' : 'Crear Nuevo Juego'}
               </h1>
            </div>
            
            <div className="flex items-center gap-4">
              {vista === 'crearJuego' ? (
                <button onClick={() => setVista('salas')} className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-bold border border-white/20">
                  <ArrowLeft size={18}/> Volver a Salas
                </button>
              ) : (
                <button onClick={() => setVista('crearJuego')} className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-bold border border-purple-400/50">
                  <BookPlus size={18}/> Crear Juego
                </button>
              )}
              <button onClick={() => signOut(auth)} className="bg-red-500/20 hover:bg-red-500 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-bold border border-red-500/50">
                 <LogOut size={18}/> Salir
              </button>
            </div>
         </div>
      </div>

      <div className="container mx-auto max-w-7xl px-6 mt-10">
        {vista === 'salas' ? (
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
               <div className="bg-white rounded-[2rem] p-8 shadow-lg border border-slate-100 sticky top-24">
                  <h3 className="font-bold text-xl text-slate-800 mb-6 flex items-center gap-2">
                     <PlusCircle className="text-celeste-500"/> Nueva Sala
                  </h3>
                  <form onSubmit={crearPartida} className="space-y-6">
                     <div>
                        <label className="text-xs font-bold text-slate-400 uppercase block mb-2">Selecciona un Juego</label>
                        <select value={juegoSeleccionado} onChange={(e) => setJuegoSeleccionado(e.target.value)} className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-medium focus:ring-2 focus:ring-celeste-300">
                           <optgroup label="Juegos por Defecto">
                             <option value="Matemáticas Básicas">Matemáticas Básicas</option>
                             <option value="Inglés Básico">Inglés Básico</option>
                           </optgroup>
                           
                           {/* AQUI MOSTRAMOS LOS JUEGOS CREADOS POR EL PROFE */}
                           {misJuegos.length > 0 && (
                             <optgroup label="Mis Juegos Personalizados">
                               {misJuegos.map(juego => (
                                 <option key={juego.id} value={juego.id}>⭐ {juego.nombre}</option>
                               ))}
                             </optgroup>
                           )}
                        </select>
                     </div>
                     <div>
                        <label className="text-xs font-bold text-slate-400 uppercase block mb-2">Grado</label>
                        <select value={grado} onChange={(e) => setGrado(e.target.value)} className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-medium focus:ring-2 focus:ring-celeste-300">
                           <option value="Transición">Transición</option>
                           <option value="Primero">Primero</option>
                           <option value="Segundo">Segundo a Quinto</option>
                        </select>
                     </div>
                     <button type="submit" className="w-full bg-celeste-600 text-white font-bold py-4 rounded-xl shadow-md hover:bg-celeste-700 transition-all">
                        Generar Sala y PIN
                     </button>
                  </form>
               </div>
            </div>

            <div className="lg:col-span-8">
               <div className="bg-white rounded-[2rem] p-8 shadow-lg border border-slate-100 min-h-[400px]">
                  <h3 className="font-bold text-xl text-slate-800 mb-6 flex items-center gap-2">
                     <Users className="text-green-500"/> Monitor de Salas en Vivo
                  </h3>
                  {partidasActivas.length === 0 ? (
                     <div className="text-center py-20 text-slate-400 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                        No hay salas activas. Crea una para empezar.
                     </div>
                  ) : (
                     <div className="space-y-8">
                        {partidasActivas.map(sala => {
                           const ranking = [...(sala.jugadores || [])].sort((a, b) => b.puntaje - a.puntaje);
                           return (
                           <div key={sala.id} className="border-2 border-slate-100 rounded-3xl p-6 hover:border-celeste-200 transition-colors bg-slate-50/50 shadow-sm overflow-hidden">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-6 mb-6">
                                 <div>
                                    <div className="flex gap-2 mb-2">
                                       <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">{sala.materia}</span>
                                       <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full">{sala.grado}</span>
                                    </div>
                                    <p className="text-sm text-slate-500">Estado: <span className={`font-black uppercase ${sala.estado === 'jugando' ? 'text-celeste-500 animate-pulse' : sala.estado === 'terminado' ? 'text-red-500' : 'text-green-500'}`}>{sala.estado}</span></p>
                                 </div>
                                 <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
                                    <div className="text-center px-4">
                                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">PIN Alumnos</p>
                                       <p className="text-4xl font-black text-slate-800 tracking-[0.2em]">{sala.pin}</p>
                                    </div>
                                    <button onClick={() => copiarPin(sala.pin)} className="p-2 bg-slate-100 text-slate-500 rounded-lg hover:bg-celeste-100 hover:text-celeste-600 transition-colors">
                                      {copiado === sala.pin ? <CheckCircle size={20} className="text-green-500"/> : <Copy size={20}/>}
                                    </button>
                                 </div>
                                 <div className="flex flex-col gap-2">
                                    {sala.estado === 'esperando' && (
                                       <button onClick={() => iniciarPartida(sala.id)} className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 flex items-center gap-2 justify-center font-bold shadow-md"><PlayCircle size={20}/> Iniciar Juego</button>
                                    )}
                                    {sala.estado === 'jugando' && (
                                       <button onClick={() => terminarPartida(sala.id)} className="px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 flex items-center gap-2 justify-center font-bold shadow-md"><StopCircle size={20}/> Terminar Juego</button>
                                    )}
                                    <button onClick={() => cerrarPartida(sala.id)} className="px-6 py-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white flex items-center gap-2 justify-center font-bold text-sm"><Trash2 size={16}/> Eliminar Sala</button>
                                 </div>
                              </div>
                              <div className="bg-white rounded-2xl p-6 border border-slate-100">
                                 <h4 className="font-black text-slate-700 mb-4 flex items-center gap-2"><Trophy className="text-yellow-500" size={24}/> Ranking en Vivo ({ranking.length} Jugadores)</h4>
                                 {ranking.length === 0 ? (
                                    <p className="text-slate-400 text-center py-4 italic">Esperando a que se conecten los exploradores...</p>
                                 ) : (
                                    <div className="space-y-3">
                                       {ranking.map((jugador, index) => {
                                          let icono = <span className="w-8 text-center font-bold text-slate-400">{index + 1}°</span>;
                                          let bgCard = "bg-slate-50";
                                          if (index === 0) { icono = <Crown size={24} className="text-yellow-500 w-8"/>; bgCard = "bg-yellow-50 border border-yellow-200 shadow-sm"; } 
                                          else if (index === 1) { icono = <Award size={24} className="text-slate-400 w-8"/>; bgCard = "bg-slate-100"; } 
                                          else if (index === 2) { icono = <Award size={24} className="text-orange-400 w-8"/>; bgCard = "bg-orange-50"; }
                                          return (
                                             <div key={index} className={`flex items-center justify-between p-3 rounded-xl transition-all ${bgCard}`}>
                                                <div className="flex items-center gap-4">{icono} <span className="font-bold text-slate-800 text-lg uppercase">{jugador.nombre}</span></div>
                                                <div className="font-black text-xl text-celeste-600">{jugador.puntaje} <span className="text-xs text-slate-400 font-bold uppercase">pts</span></div>
                                             </div>
                                          );
                                       })}
                                    </div>
                                 )}
                              </div>
                           </div>
                        )})}
                     </div>
                  )}
               </div>
            </div>
        </div>
        ) : (
          <div className="max-w-4xl mx-auto animate-fade-in"><CrearJuego usuario={usuario} /></div>
        )}
      </div>
    </div>
  );
}