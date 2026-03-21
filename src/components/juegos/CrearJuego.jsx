import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { PlusCircle, Trash2, CheckSquare } from 'lucide-react';

export default function CrearJuego() {
  const [nombreJuego, setNombreJuego] = useState('');
  const [preguntas, setPreguntas] = useState([
    { pregunta: '', opciones: ['', '', '', ''], respuestaCorrecta: 0 }
  ]);

  const resetForm = () => {
    setNombreJuego('');
    setPreguntas([{ pregunta: '', opciones: ['', '', '', ''], respuestaCorrecta: 0 }]);
  }

  const agregarPregunta = () => {
    setPreguntas([...preguntas, { pregunta: '', opciones: ['', '', '', ''], respuestaCorrecta: 0 }]);
  };

  const eliminarPregunta = (index) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas.splice(index, 1);
    setPreguntas(nuevasPreguntas);
  };

  const handlePreguntaChange = (index, value) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[index].pregunta = value;
    setPreguntas(nuevasPreguntas);
  };

  const handleOpcionChange = (preguntaIndex, opcionIndex, value) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[preguntaIndex].opciones[opcionIndex] = value;
    setPreguntas(nuevasPreguntas);
  };

  const handleRespuestaCorrectaChange = (preguntaIndex, opcionIndex) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[preguntaIndex].respuestaCorrecta = opcionIndex;
    setPreguntas(nuevasPreguntas);
  };
  
  const guardarJuego = async () => {
    if (!nombreJuego.trim()) {
      alert("Por favor, dale un nombre al juego.");
      return;
    }
    if (preguntas.some(p => !p.pregunta.trim() || p.opciones.some(o => !o.trim()))) {
      alert("Asegúrate de que todas las preguntas y opciones estén completas.");
      return;
    }

    try {
      await addDoc(collection(db, "juegos"), {
        nombre: nombreJuego,
        preguntas: preguntas,
        creadoEn: serverTimestamp(),
        docenteId: "id_del_docente_autenticado" // TODO: Reemplazar con ID real
      });
      alert("¡Juego guardado con éxito!");
      resetForm();
    } catch (error) {
      console.error("Error al guardar el juego: ", error);
      alert("Hubo un error al guardar el juego. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
      <h3 className="font-bold text-2xl text-slate-800 mb-6 flex items-center gap-2">
        <PlusCircle className="text-purple-500" /> Crear Nuevo Juego
      </h3>
      <div className="space-y-6">
        <div>
          <label className="text-sm font-bold text-slate-500 uppercase block mb-2">Nombre del Juego</label>
          <input
            type="text"
            value={nombreJuego}
            onChange={(e) => setNombreJuego(e.target.value)}
            placeholder="Ej: Trivia de Multiplicaciones"
            className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>

        <hr className="border-slate-200 my-8"/>

        <h4 className="font-bold text-xl text-slate-700 mb-4">Preguntas</h4>
        
        {preguntas.map((item, index) => (
          <div key={index} className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200/80 relative">
            <h5 className="font-bold text-slate-600 mb-4">Pregunta {index + 1}</h5>
            <input
              type="text"
              value={item.pregunta}
              onChange={(e) => handlePreguntaChange(index, e.target.value)}
              placeholder="Escribe la pregunta"
              className="w-full p-3 rounded-lg border border-slate-300 mb-4"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {item.opciones.map((opcion, i) => (
                <div key={i} className="flex items-center gap-2">
                   <input
                    type="text"
                    value={opcion}
                    onChange={(e) => handleOpcionChange(index, i, e.target.value)}
                    placeholder={`Opción ${i + 1}`}
                    className="w-full p-3 rounded-lg border border-slate-300"
                  />
                  <button 
                    onClick={() => handleRespuestaCorrectaChange(index, i)}
                    className={`p-2 rounded-lg transition-colors ${item.respuestaCorrecta === i ? 'bg-green-500 text-white' : 'bg-slate-200 hover:bg-green-200'}`}
                    title="Marcar como correcta"
                  >
                    <CheckSquare size={20}/>
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => eliminarPregunta(index)}
              className="absolute top-4 right-4 text-slate-400 hover:text-red-500"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}

        <button
          onClick={agregarPregunta}
          className="w-full bg-slate-100 text-slate-600 font-bold py-3 rounded-lg hover:bg-slate-200 transition-all"
        >
          + Agregar Pregunta
        </button>

        <hr className="border-slate-200 my-8"/>

        <button
          onClick={guardarJuego}
          className="w-full bg-purple-600 text-white font-bold py-4 rounded-xl shadow-md hover:bg-purple-700 transition-all"
        >
          Guardar Juego
        </button>
      </div>
    </div>
  );
}
