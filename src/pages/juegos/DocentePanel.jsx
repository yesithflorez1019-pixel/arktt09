import React, { useState, useEffect, useRef } from 'react';
import { Seccion } from '../../components/UI';
import usePageTitle from '../../components/usePageTitle';
import LoginDocente from '../../components/juegos/LoginDocente';
import CrearJuego from '../../components/juegos/CrearJuego';
import { Gamepad2, Users, PlusCircle, Trash2, Copy, CheckCircle, Trophy, Crown, Award, PlayCircle, StopCircle, LogOut, Loader2, ArrowLeft, BookPlus, Eye, Edit, X, CheckCircle2, XCircle } from 'lucide-react';

import { db, auth } from '../../firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth'; 
import { collection, addDoc, query, where, onSnapshot, deleteDoc, doc, serverTimestamp, updateDoc, orderBy } from 'firebase/firestore';

const ActividadUnir = ({ actividad, alCompletar }) => {
  const [{ izq, der }] = useState(() => {
    const parejas = actividad.datos?.parejas || [];
    const mezclar = (arr) => {
      const nuevo = [...arr];
      for (let i = nuevo.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nuevo[i], nuevo[j]] = [nuevo[j], nuevo[i]];
      }
      return nuevo;
    };
    const arrIzq = mezclar(parejas.map((p, idx) => ({ id: `izq-${idx}`, texto: p.izq, matchId: idx })));
    const arrDer = mezclar(parejas.map((p, idx) => ({ id: `der-${idx}`, texto: p.der, matchId: idx })));
    if (arrIzq.length > 1 && arrIzq.every((item, idx) => item.matchId === arrDer[idx].matchId)) {
      [arrDer[0], arrDer[1]] = [arrDer[1], arrDer[0]];
    }
    return { izq: arrIzq, der: arrDer };
  });

  const [seleccionIzq, setSeleccionIzq] = useState(null);
  const [conexiones, setConexiones] = useState([]);

  const pathRef = useRef(null);
  const currentPathCoords = useRef([]);
  const containerRef = useRef(null);

  const getRelCoords = (cx, cy) => {
    if (!containerRef.current) return { x: cx, y: cy };
    const rect = containerRef.current.getBoundingClientRect();
    return { x: cx - rect.left, y: cy - rect.top };
  };

  useEffect(() => {
    const handleMove = (e) => {
      if (e.cancelable && e.type === 'touchmove') e.preventDefault();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      
      if (seleccionIzq) {
        const coords = getRelCoords(clientX, clientY);
        currentPathCoords.current.push(coords);
        if (pathRef.current) {
          pathRef.current.setAttribute('points', currentPathCoords.current.map(p => `${p.x},${p.y}`).join(' '));
        }
      }
    };

    const handleUp = (e) => {
      const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
      const clientY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
      const elem = document.elementFromPoint(clientX, clientY);
      let rightButton = elem?.closest('.btn-derecho');

      if (!rightButton) {
        const botonesDerechos = document.querySelectorAll('.btn-derecho');
        let minDist = Infinity;
        let btnCercano = null;
        botonesDerechos.forEach(btn => {
          const rect = btn.getBoundingClientRect();
          const btnX = rect.left + rect.width / 2;
          const btnY = rect.top + rect.height / 2;
          const dist = Math.hypot(btnX - clientX, btnY - clientY);
          if (dist < minDist) { minDist = dist; btnCercano = btn; }
        });
        if (minDist < 120) { rightButton = btnCercano; }
      }

      if (rightButton) {
        const itemDer = der.find(d => d.id === rightButton.id);
        if (itemDer) {
          if (conexiones.find(c => c.der === itemDer.id)) {
            setSeleccionIzq(null); currentPathCoords.current = [];
            if (pathRef.current) pathRef.current.setAttribute('points', '');
            return;
          }
          const esCorrecta = seleccionIzq.matchId === itemDer.matchId;
          const rect = rightButton.getBoundingClientRect();
          const endX = rect.left + rect.width / 2;
          const endY = rect.top + rect.height / 2;
          currentPathCoords.current.push(getRelCoords(endX, endY));

          const nuevas = [...conexiones, { izq: seleccionIzq.id, der: itemDer.id, path: [...currentPathCoords.current], correcta: esCorrecta }];
          setConexiones(nuevas);
          setSeleccionIzq(null); currentPathCoords.current = [];
          if (pathRef.current) pathRef.current.setAttribute('points', '');

          if (nuevas.length === izq.length) alCompletar(nuevas);
          return;
        }
      }
      setSeleccionIzq(null); currentPathCoords.current = [];
      if (pathRef.current) pathRef.current.setAttribute('points', '');
    };

    if (seleccionIzq) {
      window.addEventListener('mousemove', handleMove); window.addEventListener('mouseup', handleUp);
      window.addEventListener('touchmove', handleMove, { passive: false }); window.addEventListener('touchend', handleUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMove); window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove); window.removeEventListener('touchend', handleUp);
    };
  }, [seleccionIzq, der, conexiones, izq.length, alCompletar]);

  const iniciarTrazo = (item, e) => {
    if (conexiones.find(c => c.izq === item.id)) return; 
    setSeleccionIzq(item);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const coords = getRelCoords(clientX, clientY);
    currentPathCoords.current = [coords];
    if (pathRef.current) pathRef.current.setAttribute('points', `${coords.x},${coords.y}`);
  };

  return (
    <div className="w-full mt-8 relative px-4" ref={containerRef}>
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 50, overflow: 'visible' }}>
        {conexiones.map((c, i) => (
          <polyline key={i} points={c.path?.map(p => `${p.x},${p.y}`).join(' ')} fill="none" stroke={c.correcta ? "#22c55e" : "#ef4444"} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={c.correcta ? "none" : "10 10"} />
        ))}
        <polyline ref={pathRef} points="" fill="none" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="10 15" />
      </svg>
      <div className="flex justify-between items-center gap-8 md:gap-32">
        <div className="flex flex-col gap-6 w-[45%]">
          {izq.map(item => {
            const conn = conexiones.find(c => c.izq === item.id);
            return <button key={item.id} id={item.id} onMouseDown={(e) => iniciarTrazo(item, e)} onTouchStart={(e) => iniciarTrazo(item, e)} style={{ touchAction: 'none' }} className={`p-6 rounded-2xl border-4 text-xl font-bold transition-all transform shadow-sm flex items-center justify-center min-h-[100px] select-none ${conn ? (conn.correcta ? 'bg-green-100 border-green-500 text-green-700 opacity-60 cursor-default' : 'bg-red-100 border-red-500 text-red-700 opacity-60 cursor-default') : seleccionIzq?.id === item.id ? 'bg-celeste-100 border-celeste-500 scale-105 cursor-grabbing' : 'bg-white border-slate-200 hover:border-celeste-300 cursor-grab'}`}>{item.texto.startsWith('http') ? <img src={item.texto} alt="img" className="max-h-24 mx-auto rounded object-contain" /> : item.texto}</button>;
          })}
        </div>
        <div className="flex flex-col gap-6 w-[45%]">
          {der.map(item => {
            const conn = conexiones.find(c => c.der === item.id);
            return <button key={item.id} id={item.id} className={`btn-derecho p-6 rounded-2xl border-4 text-xl font-bold transition-all transform shadow-sm flex items-center justify-center min-h-[100px] select-none ${conn ? (conn.correcta ? 'bg-green-100 border-green-500 text-green-700 opacity-60 cursor-default' : 'bg-red-100 border-red-500 text-red-700 opacity-60 cursor-default') : 'bg-white border-slate-200 cursor-pointer'}`}>{item.texto.startsWith('http') ? <img src={item.texto} alt="img" className="max-h-24 mx-auto rounded object-contain" /> : item.texto}</button>;
          })}
        </div>
      </div>
    </div>
  );
};

export default function DocentePanel() {
  usePageTitle('Panel de Juegos Docente | Liceo Formador');
  
  const [autenticado, setAutenticado] = useState(false);
  const [cargandoAuth, setCargandoAuth] = useState(true); 
  const [usuario, setUsuario] = useState(null);
  
  const [vista, setVista] = useState('misJuegos');
  const [partidasActivas, setPartidasActivas] = useState([]);
  
  const [misJuegos, setMisJuegos] = useState([]);
  const [copiado, setCopiado] = useState('');

  const [modalPrevisualizar, setModalPrevisualizar] = useState(null);
  const [juegoSeleccionadoParaSala, setJuegoSeleccionadoParaSala] = useState(null);
  const [gradoNuevaSala, setGradoNuevaSala] = useState('Transición');
  const [juegoEnEdicion, setJuegoEnEdicion] = useState(null); 

  const [indiceDemo, setIndiceDemo] = useState(0);
  const [respuestaDemo, setRespuestaDemo] = useState(null);
  const [feedbackDemo, setFeedbackDemo] = useState(null);

  const juegosPorDefecto = [
    {
      id: 'Matemáticas Básicas',
      nombre: 'Matemáticas Básicas',
      esDefecto: true,
      preguntas: [
        { pregunta: "¿Cuánto es 5 + 3?", opciones: ["6", "7", "8", "9"], correcta: "8" },
        { pregunta: "¿Cuánto es 10 - 4?", opciones: ["4", "5", "6", "7"], correcta: "6" }
      ]
    },
    {
      id: 'Inglés Básico',
      nombre: 'Inglés Básico',
      esDefecto: true,
      preguntas: [
        { pregunta: "¿Cómo se dice 'Perro'?", opciones: ["Cat", "Dog", "Bird", "Fish"], correcta: "Dog" },
        { pregunta: "Color Rojo en inglés:", opciones: ["Blue", "Red", "Yellow", "Green"], correcta: "Red" }
      ]
    }
  ];

  const todosLosJuegos = [...juegosPorDefecto, ...misJuegos];

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

  useEffect(() => {
    if (!usuario) {
      setPartidasActivas([]);
      return;
    }
    /* Query simplificada, el ordenamiento se realiza en memoria JS para evitar crear índices en Firebase */
    const q = query(collection(db, "partidas_juegos"), where("creadorId", "==", usuario.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const salas = [];
      snapshot.forEach((doc) => {
        salas.push({ id: doc.id, ...doc.data() });
      });
      salas.sort((a, b) => (b.creadoEn?.seconds || 0) - (a.creadoEn?.seconds || 0));
      setPartidasActivas(salas);
    });
    return () => unsubscribe();
  }, [usuario]);

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

  const confirmarCrearSala = async () => {
    if (!usuario || !juegoSeleccionadoParaSala) return;

    let preguntasParaLaSala = juegoSeleccionadoParaSala.actividades || juegoSeleccionadoParaSala.preguntas || [];
    if(preguntasParaLaSala.length === 0) return alert("Este juego no tiene preguntas.");

    const nuevoPin = generarPinSala();
    try {
      await addDoc(collection(db, "partidas_juegos"), {
        pin: nuevoPin,
        materia: juegoSeleccionadoParaSala.nombre,
        grado: gradoNuevaSala,
        estado: 'esperando', 
        jugadores: [],
        preguntas: preguntasParaLaSala,
        creadoEn: serverTimestamp(),
        creadorId: usuario.uid,
        creadorNombre: usuario.displayName || "Docente"
      });
      alert(`¡Sala creada! El PIN es: ${nuevoPin}`);
      setJuegoSeleccionadoParaSala(null);
      setVista('salas');
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

  const eliminarJuego = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este juego permanentemente?")) {
      try {
        await deleteDoc(doc(db, "juegos", id));
      } catch (error) { console.error(error); }
    }
  };

  const copiarPin = (pin) => {
    navigator.clipboard.writeText(pin);
    setCopiado(pin);
    setTimeout(() => setCopiado(''), 2000);
  };

  const renderMedia = (texto) => {
    if (typeof texto === 'string' && texto.startsWith('http')) {
      return <img src={texto} alt="media" className="max-h-24 object-contain mx-auto rounded-lg shadow-sm" />;
    }
    return texto;
  };

  const abrirDemo = (juego) => {
    setModalPrevisualizar(juego);
    setIndiceDemo(0);
    setRespuestaDemo(null);
    setFeedbackDemo(null);
  };

  const procesarRespuestaDemo = (opcionElegida, correcta, esUnirCorrecto = null) => {
    if (respuestaDemo) return;
    setRespuestaDemo(opcionElegida);
    const fueCorrecta = esUnirCorrecto !== null ? esUnirCorrecto : (opcionElegida === correcta);
    setFeedbackDemo(fueCorrecta);
    setTimeout(() => {
      setRespuestaDemo(null);
      setFeedbackDemo(null);
      setIndiceDemo(prev => prev + 1);
    }, 2000);
  };

  if (cargandoAuth) return <div className="min-h-screen bg-slate-50 flex items-center justify-center"><Loader2 className="animate-spin text-celeste-500" size={40}/></div>;
  if (!autenticado) return <div className="min-h-screen bg-slate-50 pt-20"><Seccion><LoginDocente /></Seccion></div>;

  return (
    <div className="min-h-screen bg-slate-50 pt-20 animate-fade-in pb-32">
      <div className="bg-celeste-600 text-white py-8 px-6 shadow-md relative z-10">
         <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
               <h1 className="text-3xl font-black flex items-center gap-3">
                  <Gamepad2 size={32}/> {vista === 'salas' ? 'Monitor de Salas' : vista === 'misJuegos' ? 'Biblioteca de Juegos' : 'Crear Nuevo Juego'}
               </h1>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 md:gap-4">
              <button onClick={() => { setVista('salas'); setJuegoEnEdicion(null); }} className={`px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-bold border transition-colors ${vista === 'salas' ? 'bg-white/20 border-white/40 text-white' : 'bg-transparent border-transparent text-white/80 hover:bg-white/10'}`}>
                <Users size={18}/> Salas Activas
              </button>
              <button onClick={() => { setVista('misJuegos'); setJuegoEnEdicion(null); }} className={`px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-bold border transition-colors ${vista === 'misJuegos' ? 'bg-white/20 border-white/40 text-white' : 'bg-transparent border-transparent text-white/80 hover:bg-white/10'}`}>
                <Gamepad2 size={18}/> Mis Juegos
              </button>
              <button onClick={() => { setVista('crearJuego'); setJuegoEnEdicion(null); }} className={`px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-bold border transition-colors ${vista === 'crearJuego' ? 'bg-purple-500 border-purple-400 text-white' : 'bg-purple-500/80 border-purple-400/50 text-white hover:bg-purple-500'}`}>
                <BookPlus size={18}/> Crear Juego
              </button>
              <button onClick={() => signOut(auth)} className="bg-red-500/20 hover:bg-red-500 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-bold border border-red-500/50">
                 <LogOut size={18}/> Salir
              </button>
            </div>
         </div>
      </div>

      <div className="container mx-auto max-w-7xl px-6 mt-10">
        {vista === 'misJuegos' && (
          <div className="bg-white rounded-[2rem] p-8 shadow-lg border border-slate-100 min-h-[400px]">
            <h3 className="font-bold text-2xl text-slate-800 mb-6 flex items-center gap-2">
              <Gamepad2 className="text-celeste-500" /> Selecciona un Juego para Jugar
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {todosLosJuegos.map(juego => (
                <div key={juego.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div>
                     <div className="flex justify-between items-start mb-4">
                       <h4 className="font-bold text-lg text-slate-800">{juego.nombre}</h4>
                       {juego.esDefecto && <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-bold">Por Defecto</span>}
                     </div>
                     <p className="text-sm text-slate-500 mb-6">
                       {juego.actividades ? `${juego.actividades.length} actividades` : juego.preguntas ? `${juego.preguntas.length} preguntas` : 'Sin preguntas'}
                     </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                     <button onClick={() => setJuegoSeleccionadoParaSala(juego)} className="flex-1 bg-green-500 text-white text-sm font-bold py-2 px-3 rounded-lg hover:bg-green-600 flex items-center justify-center gap-1 transition-colors">
                       <PlayCircle size={16}/> Iniciar Sala
                     </button>
                     <button onClick={() => abrirDemo(juego)} className="bg-purple-100 text-purple-700 text-sm font-bold py-2 px-3 rounded-lg hover:bg-purple-200 flex items-center gap-1 transition-colors" title="Previsualizar Demo">
                       <Eye size={16}/> Ver
                     </button>
                     {!juego.esDefecto && (
                       <>
                         <button onClick={() => { setJuegoEnEdicion(juego); setVista('crearJuego'); }} className="bg-slate-200 text-slate-700 p-2 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-colors" title="Editar">
                           <Edit size={16}/>
                         </button>
                         <button onClick={() => eliminarJuego(juego.id)} className="bg-slate-200 text-slate-700 p-2 rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors" title="Eliminar">
                           <Trash2 size={16}/>
                         </button>
                       </>
                     )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {vista === 'salas' && (
           <div className="bg-white rounded-[2rem] p-8 shadow-lg border border-slate-100 min-h-[400px] max-w-5xl mx-auto">
              <h3 className="font-bold text-2xl text-slate-800 mb-6 flex items-center gap-2">
                 <Users className="text-green-500"/> Monitor de Salas en Vivo
              </h3>
              {partidasActivas.length === 0 ? (
                 <div className="text-center py-20 text-slate-400 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                    No hay salas activas. Crea una desde "Mis Juegos" para empezar.
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
        )}

        {vista === 'crearJuego' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <CrearJuego usuario={usuario} juegoAEditar={juegoEnEdicion} onGuardado={() => { setVista('misJuegos'); setJuegoEnEdicion(null); }} />
          </div>
        )}
      </div>

      {juegoSeleccionadoParaSala && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-fade-in-up">
            <h3 className="text-2xl font-black text-slate-800 mb-2">Crear Nueva Sala</h3>
            <p className="text-slate-500 mb-6">Vas a iniciar una partida de <span className="font-bold text-celeste-600">{juegoSeleccionadoParaSala.nombre}</span>.</p>
            
            <div className="mb-6">
              <label className="text-xs font-bold text-slate-400 uppercase block mb-2">Selecciona el Grado</label>
              <select value={gradoNuevaSala} onChange={(e) => setGradoNuevaSala(e.target.value)} className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-medium focus:ring-2 focus:ring-celeste-300 outline-none">
                 <option value="Transición">Transición</option>
                 <option value="Primero">Primero</option>
                 <option value="Segundo">Segundo a Quinto</option>
              </select>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setJuegoSeleccionadoParaSala(null)} className="flex-1 bg-slate-100 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors">Cancelar</button>
              <button onClick={confirmarCrearSala} className="flex-1 bg-celeste-600 text-white font-bold py-3 rounded-xl hover:bg-celeste-700 transition-colors shadow-md">Generar PIN</button>
            </div>
          </div>
        </div>
      )}

      {modalPrevisualizar && (() => {
        const preguntasDemo = modalPrevisualizar.actividades || modalPrevisualizar.preguntas || [];
        const terminoDemo = indiceDemo >= preguntasDemo.length;
        const preg = !terminoDemo ? preguntasDemo[indiceDemo] : null;
        const esUnir = preg && preg.tipo === 'unir';
        const esOpcionMultiple = preg && (!preg.tipo || preg.tipo === 'opcion_multiple');
        let tituloPregunta = preg?.instruccion || preg?.pregunta;
        if (!tituloPregunta && esUnir) tituloPregunta = "¡Conecta las parejas correctas!";

        return (
          <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-50 rounded-[3rem] p-8 md:p-12 max-w-5xl w-full max-h-[95vh] overflow-y-auto shadow-2xl relative flex flex-col border-4 border-slate-200">
              <button onClick={() => setModalPrevisualizar(null)} className="absolute top-6 right-6 text-slate-400 hover:text-red-500 bg-white hover:bg-red-50 p-3 rounded-full transition-colors z-50 shadow-sm border border-slate-200"><X size={24}/></button>
              
              <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-6">
                <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3"><Gamepad2 className="text-purple-500" size={32}/> Modo Demo: {modalPrevisualizar.nombre}</h3>
                <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold border border-purple-200">Vista Previa Interactiva</span>
              </div>

              {terminoDemo ? (
                <div className="flex-1 flex flex-col items-center justify-center py-20 animate-fade-in-up">
                   <Trophy size={100} className="text-yellow-400 mx-auto mb-6 drop-shadow-xl animate-bounce" />
                   <h2 className="text-4xl font-black text-slate-800 mb-4">¡Demo Finalizada!</h2>
                   <p className="text-xl text-slate-500 mb-10">Has comprobado satisfactoriamente todas las actividades del juego.</p>
                   <button onClick={() => setModalPrevisualizar(null)} className="bg-celeste-600 text-white font-black py-4 px-10 rounded-2xl hover:bg-celeste-700 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1">
                      Cerrar Vista Previa
                   </button>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center w-full animate-fade-in bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                  <div className="w-full flex justify-between items-center mb-6">
                     <span className="font-bold text-slate-400 uppercase tracking-widest text-sm">Actividad {indiceDemo + 1} de {preguntasDemo.length}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-800 text-center mb-12">{tituloPregunta}</h2>

                  {esOpcionMultiple && (
                    <div className="w-full grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                      {(preg.tipo === 'opcion_multiple' ? preg.datos.opciones : preg.opciones).map((opcion, idx) => {
                         if(!opcion.trim()) return null;
                         const correcta = preg.tipo === 'opcion_multiple' ? preg.datos.opciones[preg.datos.correcta] : preg.correcta;

                         let bgColor = "bg-slate-50 hover:bg-celeste-50 hover:border-celeste-300 border-slate-200";
                         let textColor = "text-slate-700";

                         if (respuestaDemo) {
                            if (opcion === correcta) {
                               bgColor = "bg-green-500 border-green-600 shadow-lg"; textColor = "text-white";
                            } else if (opcion === respuestaDemo) {
                               bgColor = "bg-red-500 border-red-600 shadow-lg"; textColor = "text-white";
                            } else {
                               bgColor = "bg-slate-100 border-slate-200 opacity-50";
                            }
                         }

                         return (
                            <button key={idx} onClick={() => procesarRespuestaDemo(opcion, correcta)} disabled={respuestaDemo !== null} className={`p-8 rounded-3xl border-4 text-2xl font-black transition-all transform ${!respuestaDemo && 'hover:-translate-y-1 active:scale-95 shadow-sm'} ${bgColor} ${textColor}`}>
                               {renderMedia(opcion)}
                            </button>
                         );
                      })}
                    </div>
                  )}

                  {esUnir && (
                    <div className="w-full max-w-4xl mx-auto bg-slate-50 p-8 rounded-3xl border border-slate-200">
                       <ActividadUnir
                         key={indiceDemo} actividad={preg}
                         alCompletar={(conexiones) => {
                            const correctas = conexiones.filter(c => c.correcta).length;
                            const total = conexiones.length;
                            procesarRespuestaDemo('unir', correctas === total ? 'unir' : 'fallo', correctas === total);
                         }}
                       />
                    </div>
                  )}

                  {respuestaDemo && (
                    <div className={`mt-10 px-8 py-4 rounded-full font-black text-2xl animate-bounce flex items-center gap-3 text-white shadow-xl ${feedbackDemo ? 'bg-green-500' : 'bg-red-500'}`}>
                       {feedbackDemo ? <><CheckCircle2 size={32}/> ¡CORRECTO!</> : <><XCircle size={32}/> ¡CASI!</>}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })()}

    </div>
  );
}