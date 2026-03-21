import React, { useState, useEffect } from 'react';
import usePageTitle from '../../components/usePageTitle';
import CrearJuego from '../../components/juegos/CrearJuego';
import { BookCopy, Trash2, Edit } from 'lucide-react';
import { db } from '../../firebase';
import { collection, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

export default function MisJuegos() {
  usePageTitle('Mis Juegos | Liceo Formador');
  
  const [juegos, setJuegos] = useState([]);
  const docenteId = "id_del_docente_autenticado"; // TODO: Reemplazar con ID real

  useEffect(() => {
    const q = query(collection(db, "juegos"), where("docenteId", "==", docenteId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const juegosDocente = [];
      snapshot.forEach(doc => {
        juegosDocente.push({ id: doc.id, ...doc.data() });
      });
      setJuegos(juegosDocente);
    });

    return () => unsubscribe();
  }, [docenteId]);

  const eliminarJuego = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este juego? Esta acción no se puede deshacer.")) {
      try {
        await deleteDoc(doc(db, "juegos", id));
        alert("Juego eliminado correctamente.");
      } catch (error) {
        console.error("Error al eliminar el juego: ", error);
        alert("Hubo un error al eliminar el juego.");
      }
    }
  };

  return (
    <div className="container mx-auto max-w-7xl px-6 mt-10">
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* COLUMNA IZQ: Lista de Juegos Creados */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-[2rem] p-8 shadow-lg border border-slate-100 sticky top-24">
            <h3 className="font-bold text-xl text-slate-800 mb-6 flex items-center gap-2">
              <BookCopy className="text-purple-500" /> Mis Juegos Creados
            </h3>
            {juegos.length === 0 ? (
              <div className="text-center py-10 text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <p className="mb-4">Aún no has creado juegos.</p>
                <p className="text-xs">¡Usa el formulario para empezar!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {juegos.map(juego => (
                  <div key={juego.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex justify-between items-center">
                    <span className="font-bold text-slate-700">{juego.nombre}</span>
                    <div className="flex gap-2">
                      <button className="text-slate-400 hover:text-blue-500 p-2">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => eliminarJuego(juego.id)} className="text-slate-400 hover:text-red-500 p-2">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* COLUMNA DER: Formulario para Crear/Editar Juego */}
        <div className="lg:col-span-8">
          <CrearJuego />
        </div>

      </div>
    </div>
  );
}
