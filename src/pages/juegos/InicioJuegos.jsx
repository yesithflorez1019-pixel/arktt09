import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Seccion, TituloSeccion } from '../../components/UI';
import usePageTitle from '../../components/usePageTitle';
import { Sparkles, Gamepad2 } from 'lucide-react';

// FIREBASE (Nuevos imports)
import { db } from '../../firebase';
import { collection, query, where, getDocs, updateDoc, doc, arrayUnion } from 'firebase/firestore';

export default function InicioJuegos() {
  usePageTitle('Zona de Juegos | Liceo Formador');
  const navigate = useNavigate();
  const [nombreAlumno, setNombreAlumno] = useState('');
  const [pinSala, setPinSala] = useState('');
  const [cargando, setCargando] = useState(false);

  const empezarAventura = async (e) => {
    e.preventDefault();
    if (!nombreAlumno.trim()) return alert("¡Escribe tu nombre primero, explorador!");
    if (!pinSala.trim() || pinSala.length !== 5) return alert("El PIN debe tener 5 números exactos.");

    setCargando(true);

    try {
      // 1. Buscar la sala con ese PIN en Firebase
      const q = query(collection(db, "partidas_juegos"), where("pin", "==", pinSala));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("PIN incorrecto. Revisa la pantalla de la profe.");
        setCargando(false);
        return;
      }

      // 2. Extraer los datos de la sala
      const salaDoc = querySnapshot.docs[0];
      const salaData = salaDoc.data();

      // 3. Validar si ya empezó
      if (salaData.estado !== 'esperando') {
        alert("¡Ups! Esta partida ya comenzó o ya terminó.");
        setCargando(false);
        return;
      }

      // 4. Agregar al alumno a la lista de jugadores de esa sala
      await updateDoc(doc(db, "partidas_juegos", salaDoc.id), {
        jugadores: arrayUnion({ nombre: nombreAlumno, puntaje: 0 })
      });

      // 5. ¡Enviarlo a la sala de espera! Le pasamos el nombre por la ruta
      navigate(`/juegos/sala/${salaDoc.id}`, { state: { nombreJugador: nombreAlumno } });

    } catch (error) {
      console.error("Error al entrar:", error);
      alert("Hubo un error de conexión.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-celeste-400 pt-20 animate-fade-in flex flex-col">
      <Seccion>
        <div className="max-w-4xl mx-auto text-center mt-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold text-sm tracking-widest uppercase px-6 py-2 rounded-full mb-6 shadow-lg">
             <Gamepad2 size={16} className="animate-pulse"/> Misiones de Aprendizaje
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight drop-shadow-lg max-w-2xl mx-auto">
             ¡Bienvenidos a la <span className="text-celeste-950">Zona de Juegos</span>!
          </h1>
          <p className="text-xl text-white/90 font-light drop-shadow-md max-w-2xl mx-auto mt-4">
             Pequeños exploradores, prepárense para aprender mientras se divierten.
          </p>
        </div>
      </Seccion>

      <Seccion blanca={true} className="rounded-t-[3rem] shadow-2xl relative z-10 flex-grow pb-32">
        <div className="max-w-xl mx-auto text-center py-10">
           <TituloSeccion titulo="¡Únete a tu clase!" subtitulo="Ingresa tus datos para jugar" blanco={false}/>
           
           <div className="bg-celeste-50 p-8 md:p-10 rounded-[2.5rem] mt-10 shadow-inner border border-celeste-100 relative group">
              <div className="absolute -inset-2 bg-celeste-300 rounded-[3rem] rotate-2 group-hover:rotate-0 transition-transform duration-500 opacity-50 z-[-1]"></div>
              
              <form onSubmit={empezarAventura} className="space-y-6">
                  {/* CAMPO: NOMBRE */}
                  <div>
                    <label className="text-sm font-bold text-celeste-800 uppercase block mb-2 text-left ml-2">Tu Nombre:</label>
                    <input 
                      type="text" 
                      value={nombreAlumno} 
                      onChange={e => setNombreAlumno(e.target.value)}
                      className="w-full text-center p-4 rounded-2xl border-2 border-celeste-200 focus:outline-none focus:ring-4 focus:ring-celeste-300 text-xl font-bold text-slate-800 shadow-sm"
                      placeholder="Ej: Mateo"
                      maxLength={15}
                      required
                    />
                  </div>

                  {/* CAMPO: PIN */}
                  <div>
                    <label className="text-sm font-bold text-celeste-800 uppercase block mb-2 text-left ml-2">PIN de la Sala:</label>
                    <input 
                      type="text" 
                      value={pinSala} 
                      onChange={e => setPinSala(e.target.value.replace(/\D/g, ''))} // Solo deja escribir números
                      className="w-full text-center p-4 rounded-2xl border-2 border-celeste-200 focus:outline-none focus:ring-4 focus:ring-celeste-300 text-3xl tracking-[0.5em] font-black text-slate-800 shadow-sm"
                      placeholder="12345"
                      maxLength={5}
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={cargando}
                    className={`mt-8 w-full flex items-center justify-center gap-3 bg-gradient-to-r from-celeste-500 to-blue-600 text-white font-black py-5 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-xl uppercase tracking-wider border-4 border-white ${cargando ? 'opacity-70 cursor-wait' : ''}`}
                  >
                     {cargando ? 'Conectando...' : <>¡Entrar al Juego! <Sparkles size={24} className="animate-bounce" /></>}
                  </button>
              </form>
           </div>
        </div>
      </Seccion>
    </div>
  );
}