import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePageTitle from '../../components/usePageTitle';
import { Gamepad2, GraduationCap, ArrowRight } from 'lucide-react';

import { db } from '../../firebase';
import { collection, query, where, getDocs, updateDoc, doc, arrayUnion } from 'firebase/firestore';

export default function InicioJuegos() {
  usePageTitle('Zona de Juegos | Liceo Formador');
  const navigate = useNavigate();
  const [nombreAlumno, setNombreAlumno] = useState('');
  const [pinSala, setPinSala] = useState('');
  const [cargando, setCargando] = useState(false);
  const [errorAnimacion, setErrorAnimacion] = useState(false);

  const empezarAventura = async (e) => {
    e.preventDefault();
    if (!nombreAlumno.trim()) return alert("¡Escribe tu nombre primero, explorador!");
    if (!pinSala.trim() || pinSala.length !== 5) return alert("El PIN debe tener 5 números exactos.");

    setCargando(true);

    try {
      const q = query(collection(db, "partidas_juegos"), where("pin", "==", pinSala));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("PIN incorrecto. Revisa la pantalla de la profe.");
        setErrorAnimacion(true);
        setTimeout(() => setErrorAnimacion(false), 500);
        setCargando(false);
        return;
      }
      const salaDoc = querySnapshot.docs[0];
      const salaData = salaDoc.data();

      if (salaData.estado !== 'esperando') {
        alert("¡Ups! Esta partida ya comenzó o ya terminó.");
        setErrorAnimacion(true);
        setTimeout(() => setErrorAnimacion(false), 500);
        setCargando(false);
        return;
      }

      await updateDoc(doc(db, "partidas_juegos", salaDoc.id), {
        jugadores: arrayUnion({ nombre: nombreAlumno, puntaje: 0 })
      });
      navigate(`/juegos/sala/${salaDoc.id}`, { state: { nombreJugador: nombreAlumno } });

    } catch (error) {
      console.error("Error al entrar:", error);
      alert("Hubo un error de conexión.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 pt-20 pb-10 animate-fade-in">
      <div className="w-full max-w-md mt-8 md:mt-0">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-slate-800">Unirse al Juego</h1>
          <p className="text-slate-500 font-medium mt-2">Ingresa tus datos para participar</p>
        </div>
        
        <div className={`bg-white p-8 rounded-[2rem] shadow-lg border border-slate-100 transition-transform ${errorAnimacion ? 'animate-shake' : ''}`}>
           <form onSubmit={empezarAventura} className="space-y-6">
               <div>
                 <label className="text-xs font-bold text-slate-500 uppercase block mb-2 text-left">Tu Nombre</label>
                 <input 
                   type="text" 
                   value={nombreAlumno} 
                   onChange={e => setNombreAlumno(e.target.value)}
                   className="w-full text-center p-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-celeste-400 focus:ring-4 focus:ring-celeste-100 text-lg font-bold text-slate-800 transition-all"
                   placeholder="Ej: Mateo"
                   maxLength={15}
                   required
                 />
               </div>

               <div>
                 <label className="text-xs font-bold text-slate-500 uppercase block mb-2 text-left">PIN de la Sala</label>
                 <input 
                   type="text" 
                   value={pinSala}
                   onChange={e => setPinSala(e.target.value.replace(/\D/g, ''))} 
                   className="w-full text-center p-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-celeste-400 focus:ring-4 focus:ring-celeste-100 text-3xl tracking-[0.3em] font-black text-slate-800 transition-all"
                   placeholder="12345"
                   maxLength={5}
                   required
                 />
               </div>
               
               <button 
                 type="submit" 
                 disabled={cargando}
                 className={`mt-4 w-full flex items-center justify-center gap-2 bg-celeste-600 text-white font-bold py-4 rounded-xl shadow-md hover:bg-celeste-700 hover:shadow-lg transition-all text-lg ${cargando ? 'opacity-70 cursor-wait' : ''}`}
               >
                  {cargando ? 'Conectando...' : <>Entrar al Juego <ArrowRight size={20} /></>}
               </button>
           </form>
        </div>

        <div className="mt-8 text-center">
          <button onClick={() => navigate('/docente')} className="text-sm text-slate-500 font-bold hover:text-celeste-600 transition-colors flex items-center justify-center gap-2 mx-auto">
             <GraduationCap size={18}/> ¿Eres docente? Ingresa aquí
          </button>
        </div>
      </div>
    </div>
  );
}