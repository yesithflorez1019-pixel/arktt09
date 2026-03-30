import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, onSnapshot, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { Users, Loader2, Gamepad2, CheckCircle2, XCircle, Trophy } from 'lucide-react';
import usePageTitle from '../../components/usePageTitle';

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

  const responder = async (opcionElegida) => {
    if (respuestaSeleccionada) return; 
    
    // AQUÍ ESTÁ LA MAGIA: Leemos las preguntas directo de la base de datos de la sala
    const cuestionario = sala.preguntas || [];
    if(cuestionario.length === 0) return;

    const preguntaVerdadera = cuestionario[preguntaActual];
    
    setRespuestaSeleccionada(opcionElegida);
    
    let nuevosPuntos = puntaje;
    if (opcionElegida === preguntaVerdadera.correcta) {
      setEsCorrecta(true);
      nuevosPuntos += 100; 
      setPuntaje(nuevosPuntos);
    } else {
      setEsCorrecta(false);
    }

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
      
      if (preguntaActual < cuestionario.length - 1) {
        setPreguntaActual(preguntaActual + 1);
      } else {
        setJuegoTerminado(true);
      }
    }, 2000);
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
    
    // Si la sala por algún error no tiene preguntas, mostramos un error elegante
    if(cuestionario.length === 0) {
       return <div className="min-h-screen bg-red-500 flex items-center justify-center text-white text-2xl font-bold">La profe no agregó preguntas a este juego.</div>
    }

    const preguntaObj = cuestionario[preguntaActual];

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
                 {preguntaObj.pregunta}
               </h2>
           </div>

           <div className="w-full max-w-4xl grid md:grid-cols-2 gap-4">
              {preguntaObj.opciones.map((opcion, index) => {
                 // Si la opción está vacía, no la renderizamos
                 if(!opcion.trim()) return null; 

                 let bgColor = "bg-white hover:bg-celeste-50 hover:border-celeste-300 border-slate-200";
                 let textColor = "text-slate-700";
                 
                 if (respuestaSeleccionada) {
                    if (opcion === preguntaObj.correcta) {
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
                       onClick={() => responder(opcion)}
                       disabled={respuestaSeleccionada !== null}
                       className={`p-8 rounded-3xl border-4 text-2xl font-black transition-all transform ${!respuestaSeleccionada && 'hover:-translate-y-1 active:scale-95 shadow-md'} ${bgColor} ${textColor}`}
                    >
                       {opcion}
                    </button>
                 );
              })}
           </div>

           {respuestaSeleccionada && (
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