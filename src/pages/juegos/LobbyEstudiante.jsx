import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, onSnapshot, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { Users, Loader2, Gamepad2, CheckCircle2, XCircle, Trophy } from 'lucide-react';
import usePageTitle from '../../components/usePageTitle';

/* Componente Interno: Actividad de Unir Parejas */
const ActividadUnir = ({ actividad, alCompletar }) => {
  /* Inicialización síncrona para evitar re-renderizados infinitos */
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
  const containerRef = useRef(null); // NUEVO: Para coordenadas perfectas

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

      /* Hitbox magnética para facilitar la selección a los niños */
      if (!rightButton) {
        const botonesDerechos = document.querySelectorAll('.btn-derecho');
        let minDist = Infinity;
        let btnCercano = null;
        botonesDerechos.forEach(btn => {
          const rect = btn.getBoundingClientRect();
          const btnX = rect.left + rect.width / 2;
          const btnY = rect.top + rect.height / 2;
          const dist = Math.hypot(btnX - clientX, btnY - clientY);
          if (dist < minDist) {
            minDist = dist;
            btnCercano = btn;
          }
        });
        if (minDist < 120) {
          rightButton = btnCercano;
        }
      }

      if (rightButton) {
        const itemDer = der.find(d => d.id === rightButton.id);
        if (itemDer) {
          if (conexiones.find(c => c.der === itemDer.id)) {
            setSeleccionIzq(null);
            currentPathCoords.current = [];
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
          setSeleccionIzq(null);
          currentPathCoords.current = [];
          if (pathRef.current) pathRef.current.setAttribute('points', '');

          if (nuevas.length === izq.length) {
            alCompletar(nuevas);
          }
          return;
        }
      }
      setSeleccionIzq(null);
      currentPathCoords.current = [];
      if (pathRef.current) pathRef.current.setAttribute('points', '');
    };

    if (seleccionIzq) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleUp);
      window.addEventListener('touchmove', handleMove, { passive: false });
      window.addEventListener('touchend', handleUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [seleccionIzq, der, conexiones, izq.length, alCompletar]);

  const iniciarTrazo = (item, e) => {
    if (conexiones.find(c => c.izq === item.id)) return; 
    setSeleccionIzq(item);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const coords = getRelCoords(clientX, clientY);
    currentPathCoords.current = [coords];
    if (pathRef.current) {
      pathRef.current.setAttribute('points', `${coords.x},${coords.y}`);
    }
  };

  return (
    <div className="w-full mt-8 relative px-4" ref={containerRef}>
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 50, overflow: 'visible' }}>
        {conexiones.map((c, i) => (
          <polyline 
            key={i} 
            points={c.path?.map(p => `${p.x},${p.y}`).join(' ')} 
            fill="none" 
            stroke={c.correcta ? "#22c55e" : "#ef4444"} 
            strokeWidth="6" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeDasharray={c.correcta ? "none" : "10 10"}
          />
        ))}
        <polyline 
          ref={pathRef}
          points="" 
          fill="none" 
          stroke="#94a3b8" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeDasharray="10 15"
        />
      </svg>

      <div className="flex justify-between items-center gap-24 md:gap-32">
        <div className="flex flex-col gap-6 w-[45%]">
          {izq.map(item => {
            const conn = conexiones.find(c => c.izq === item.id);
            return (
              <button
                key={item.id} id={item.id}
                onMouseDown={(e) => iniciarTrazo(item, e)}
                onTouchStart={(e) => iniciarTrazo(item, e)}
                style={{ touchAction: 'none' }}
                className={`p-6 rounded-2xl border-4 text-xl font-bold transition-all transform shadow-sm flex items-center justify-center min-h-[100px] select-none ${conn ? (conn.correcta ? 'bg-green-100 border-green-500 text-green-700 opacity-60 cursor-default' : 'bg-red-100 border-red-500 text-red-700 opacity-60 cursor-default') : seleccionIzq?.id === item.id ? 'bg-celeste-100 border-celeste-500 scale-105 cursor-grabbing' : 'bg-white border-slate-200 hover:border-celeste-300 cursor-grab'}`}
              >
                {item.texto.startsWith('http') || item.texto.startsWith('data:image') ? <img src={item.texto} alt="img" className="max-h-24 mx-auto rounded object-contain" /> : item.texto}
              </button>
            );
          })}
        </div>
        <div className="flex flex-col gap-6 w-[45%]">
          {der.map(item => {
            const conn = conexiones.find(c => c.der === item.id);
            return (
              <button
                key={item.id} id={item.id}
                className={`btn-derecho p-6 rounded-2xl border-4 text-xl font-bold transition-all transform shadow-sm flex items-center justify-center min-h-[100px] select-none ${conn ? (conn.correcta ? 'bg-green-100 border-green-500 text-green-700 opacity-60 cursor-default' : 'bg-red-100 border-red-500 text-red-700 opacity-60 cursor-default') : 'bg-white border-slate-200 cursor-pointer'}`}
              >
                {item.texto.startsWith('http') || item.texto.startsWith('data:image') ? <img src={item.texto} alt="img" className="max-h-24 mx-auto rounded object-contain" /> : item.texto}
              </button>
            );
          })}
        </div>
      </div>
      {seleccionIzq && (
        <div className="text-center mt-8 text-celeste-600 font-bold animate-pulse">
          Selecciona la pareja correcta a la derecha...
        </div>
      )}
    </div>
  );
};

export default function LobbyEstudiante() {
  usePageTitle('Jugando | Liceo Formador');
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const nombreJugador = location.state?.nombreJugador || "Explorador";

  const [sala, setSala] = useState(null);
  
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [esCorrecta, setEsCorrecta] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "partidas_juegos", id), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSala(data);
        if (data.estado === 'terminado') {
            alert("La profesora ha finalizado la partida.");
            navigate('/juegos');
        }
      } else {
        alert("La sala fue cerrada.");
        navigate('/juegos');
      }
    });
    return () => unsubscribe();
  }, [id, navigate]);

  const procesarPuntajeYContinuar = async (puntosGanados, fueCorrecta) => {
    setEsCorrecta(fueCorrecta);
    const nuevosPuntos = puntaje + puntosGanados;
    setPuntaje(nuevosPuntos);

    try {
      const docRef = doc(db, "partidas_juegos", id);
      await updateDoc(docRef, {
        jugadores: arrayRemove({ nombre: nombreJugador, puntaje: puntaje })
      });
      await updateDoc(docRef, {
        jugadores: arrayUnion({ nombre: nombreJugador, puntaje: nuevosPuntos })
      });
    } catch(e) { console.log(e); }

    setTimeout(() => {
      setRespuestaSeleccionada(null);
      setEsCorrecta(null);
      
      if (preguntaActual < (sala?.preguntas?.length || 0) - 1) {
        setPreguntaActual(prev => prev + 1);
      } else {
        setJuegoTerminado(true);
      }
    }, 2000);
  };

  const responderOpcionMultiple = (opcionElegida, correcta) => {
    if (respuestaSeleccionada) return;
    setRespuestaSeleccionada(opcionElegida);
    
    if (opcionElegida === correcta) {
      procesarPuntajeYContinuar(100, true);
    } else {
      procesarPuntajeYContinuar(0, false);
    }
  };

  if (!sala) return <div className="min-h-screen bg-celeste-50 flex items-center justify-center"><Loader2 size={48} className="animate-spin text-celeste-500" /></div>;

  if (sala.estado === 'esperando') {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-white text-center">
        <div className="w-full max-w-2xl bg-slate-800 p-10 md:p-16 rounded-[3rem] shadow-2xl border border-slate-700 animate-fade-in-up">
           <Loader2 size={48} className="text-celeste-400 animate-spin mx-auto mb-6" />
           <h1 className="text-4xl md:text-5xl font-black mb-4">¡Preparado, <span className="text-celeste-400">{nombreJugador}</span>!</h1>
           <p className="text-xl text-slate-400 mb-10">Mira a la profe. El juego empezará pronto.</p>
           
           <div className="bg-slate-900 rounded-3xl p-6 border border-slate-700">
              <h3 className="font-bold text-slate-300 mb-4 flex items-center justify-center gap-2">
                 <Users className="text-celeste-400"/> Exploradores Conectados ({sala.jugadores?.length || 0})
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                 {sala.jugadores?.map((jugador, index) => (
                    <span key={index} className={`px-4 py-2 rounded-full text-sm font-bold ${jugador.nombre === nombreJugador ? 'bg-celeste-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                       {jugador.nombre} {jugador.nombre === nombreJugador && "(Tú)"}
                    </span>
                 ))}
              </div>
           </div>
        </div>
      </div>
    );
  }

  if (sala.estado === 'jugando' && !juegoTerminado) {
    const cuestionario = sala.preguntas || [];
    
    if(cuestionario.length === 0) {
       return <div className="min-h-screen bg-red-500 flex items-center justify-center text-white text-2xl font-bold">La profe no agregó preguntas a este juego.</div>
    }

    const preguntaObj = cuestionario[preguntaActual];
    const esUnir = preguntaObj.tipo === 'unir';
    const esOpcionMultiple = !preguntaObj.tipo || preguntaObj.tipo === 'opcion_multiple';

    let tituloPregunta = preguntaObj.instruccion || preguntaObj.pregunta;
    if (!tituloPregunta && esUnir) tituloPregunta = "¡Conecta las parejas correctas!";

    return (
       <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 animate-fade-in">
           
           <div className="w-full max-w-4xl flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
               <span className="font-bold text-slate-500 uppercase tracking-wider text-sm">Pregunta {preguntaActual + 1} de {cuestionario.length}</span>
               <div className="flex items-center gap-2 bg-yellow-100 text-yellow-600 px-4 py-2 rounded-xl font-black text-lg">
                  <Trophy size={20}/> {puntaje} pts
               </div>
           </div>

           <div className="w-full max-w-4xl bg-white rounded-[3rem] shadow-xl border border-slate-100 p-10 text-center mb-8 relative overflow-hidden">
               <h2 className="text-3xl md:text-4xl font-black text-slate-800 leading-tight">
                 {tituloPregunta}
               </h2>
                 
                 {esOpcionMultiple && (
                   <div className="w-full mt-8 grid md:grid-cols-2 gap-4">
                      { (preguntaObj.tipo === 'opcion_multiple' ? preguntaObj.datos.opciones : preguntaObj.opciones).map((opcion, index) => {
                         if(!opcion.trim()) return null; 
                         const correcta = preguntaObj.tipo === 'opcion_multiple' ? preguntaObj.datos.opciones[preguntaObj.datos.correcta] : preguntaObj.correcta;

                         let bgColor = "bg-white hover:bg-celeste-50 hover:border-celeste-300 border-slate-200";
                         let textColor = "text-slate-700";
                         
                         if (respuestaSeleccionada) {
                            if (opcion === correcta) {
                               bgColor = "bg-green-500 border-green-600";
                               textColor = "text-white";
                            } else if (opcion === respuestaSeleccionada) {
                               bgColor = "bg-red-500 border-red-600";
                               textColor = "text-white";
                            } else {
                               bgColor = "bg-slate-100 border-slate-200 opacity-50";
                            }
                         }

                         return (
                            <button 
                               key={index}
                               onClick={() => responderOpcionMultiple(opcion, correcta)}
                               disabled={respuestaSeleccionada !== null}
                               className={`p-8 rounded-3xl border-4 text-2xl font-black transition-all transform ${!respuestaSeleccionada && 'hover:-translate-y-1 active:scale-95 shadow-md'} ${bgColor} ${textColor}`}
                            >
                               {opcion}
                            </button>
                         );
                      })}
                   </div>
                 )}

                 {esUnir && (
                   <ActividadUnir 
                     key={preguntaActual}
                     actividad={preguntaObj} 
                     alCompletar={(conexionesFinales) => {
                        const correctas = conexionesFinales.filter(c => c.correcta).length;
                        const total = conexionesFinales.length;
                        const puntosCalc = Math.round((correctas / total) * 100);
                        procesarPuntajeYContinuar(puntosCalc, correctas === total);
                     }} 
                   />
                 )}
             </div>

             {respuestaSeleccionada && esOpcionMultiple && (
              <div className={`mt-8 px-8 py-4 rounded-full font-black text-2xl animate-bounce flex items-center gap-3 text-white shadow-lg ${esCorrecta ? 'bg-green-500' : 'bg-red-500'}`}>
                 {esCorrecta ? <><CheckCircle2 size={32}/> ¡CORRECTO!</> : <><XCircle size={32}/> ¡CASI!</>}
              </div>
           )}
       </div>
    );
  }

  if (juegoTerminado) {
     return (
        <div className="min-h-screen bg-celeste-600 flex flex-col items-center justify-center p-6 text-white text-center animate-fade-in-up">
           <Trophy size={100} className="text-yellow-400 mb-6 drop-shadow-xl animate-bounce"/>
           <h1 className="text-5xl font-black mb-4">¡Aventura Completada!</h1>
           <p className="text-2xl text-celeste-100 font-light mb-10">Conseguiste un total de:</p>
           
           <div className="bg-white text-celeste-700 text-6xl font-black py-8 px-16 rounded-[3rem] shadow-2xl mb-12">
              {puntaje} <span className="text-3xl">Puntos</span>
           </div>

           <p className="text-xl opacity-80">Mira la pantalla de la profe para ver el podio final.</p>
        </div>
     );
  }

  return null;
}