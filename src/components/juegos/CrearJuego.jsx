import React, { useState, useEffect } from 'react';
import { db, storage } from '../../firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { BookPlus, Save, Trash2, Image as ImageIcon, Link, Type, ImagePlus, Loader2 } from 'lucide-react';

export default function CrearJuego({ usuario, juegoAEditar, onGuardado }) {
  const [nombreJuego, setNombreJuego] = useState('');
  const [actividades, setActividades] = useState([]);
  const [subiendoImagen, setSubiendoImagen] = useState(false);

  /* Carga los datos al recibir un juego existente */
  useEffect(() => {
    if (juegoAEditar) {
      setNombreJuego(juegoAEditar.nombre || '');
      setActividades(juegoAEditar.actividades || juegoAEditar.preguntas || []);
    } else {
      setNombreJuego('');
      setActividades([]);
    }
  }, [juegoAEditar]);

  const agregarActividad = (tipo) => {
    const nuevaActividad = {
      id: Date.now().toString(),
      tipo: tipo, 
      instruccion: '',
      datos: tipo === 'opcion_multiple' 
        ? { opciones: ['', '', '', ''], correcta: 0 } 
        : tipo === 'unir' 
        ? { parejas: [{ izq: '', der: '' }] }
        : tipo === 'arrastrar'
        ? { imagenFondo: '', zonas: [] }
        : { palabras: [] } 
    };
    setActividades([...actividades, nuevaActividad]);
  };

  const eliminarActividad = (index) => {
    const nuevas = [...actividades];
    nuevas.splice(index, 1);
    setActividades(nuevas);
  };

  const handleTextChange = (e, index, pIndex, lado) => {
    const val = e.target.value;
    if (val.startsWith('data:image') || val.length > 500) {
      alert("⚠️ Por favor, no pegues códigos largos de imágenes. Usa el botón de la cámara para subirla desde tu dispositivo.");
      return;
    }
    const nuevas = [...actividades];
    nuevas[index].datos.parejas[pIndex][lado] = val;
    setActividades(nuevas);
  };

  const manejarSubidaImagen = async (e, index, pIndex, lado) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) return alert("La imagen es muy grande. Máximo 2MB.");

    setSubiendoImagen(true);
    try {
      const imgRef = ref(storage, `juegos_assets/${Date.now()}_${file.name}`);
      await uploadBytes(imgRef, file);
      const url = await getDownloadURL(imgRef);
      
      const nuevas = [...actividades];
      nuevas[index].datos.parejas[pIndex][lado] = url;
      setActividades(nuevas);
    } catch (error) {
      console.error(error);
      alert("Error al subir la imagen. Intenta de nuevo.");
    } finally {
      setSubiendoImagen(false);
      e.target.value = '';
    }
  };

  const guardarJuego = async () => {
    if (!usuario) return alert("Debes iniciar sesión para guardar.");
    if (!nombreJuego.trim()) return alert("Por favor, dale un nombre a tu juego.");
    if (actividades.length === 0) return alert("Agrega al menos una actividad.");

    try {
      if (juegoAEditar) {
        await updateDoc(doc(db, "juegos", juegoAEditar.id), {
          nombre: nombreJuego,
          actividades: actividades,
          editadoEn: serverTimestamp()
        });
        alert("¡Juego actualizado exitosamente!");
      } else {
        await addDoc(collection(db, "juegos"), {
          nombre: nombreJuego,
          actividades: actividades, 
          docenteId: usuario.uid,
          creadorNombre: usuario.displayName || usuario.email || "Docente",
          creadoEn: serverTimestamp()
        });
        alert("¡Juego guardado exitosamente!");
      }
      setNombreJuego('');
      setActividades([]);
      if (onGuardado) onGuardado(); 
    } catch (error) {
      console.error(error);
      alert("Hubo un error al guardar el juego.");
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-lg border border-slate-100 min-h-[400px]">
      <h3 className="font-bold text-2xl text-slate-800 mb-6 flex items-center gap-2">
        <BookPlus className="text-purple-500" /> {juegoAEditar ? "Editar Juego" : "Creador Avanzado de Juegos"}
      </h3>

      <div className="space-y-6">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase block mb-2">Nombre del Juego</label>
          <input 
            type="text" 
            value={nombreJuego} 
            onChange={(e) => setNombreJuego(e.target.value)}
            placeholder="Ej: Aventura Espacial - Matemáticas"
            className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-bold focus:ring-2 focus:ring-purple-300 outline-none"
          />
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h4 className="font-bold text-slate-700 mb-4">Agregar Actividad al Juego</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button onClick={() => agregarActividad('opcion_multiple')} className="p-3 bg-white border border-slate-200 rounded-xl hover:border-purple-300 hover:shadow-md transition-all flex flex-col items-center gap-2 text-sm font-bold text-slate-600">
              <Type className="text-blue-500"/> Quiz (Opciones)
            </button>
            <button onClick={() => agregarActividad('arrastrar')} className="p-3 bg-white border border-slate-200 rounded-xl hover:border-purple-300 hover:shadow-md transition-all flex flex-col items-center gap-2 text-sm font-bold text-slate-600">
              <ImageIcon className="text-pink-500"/> Arrastrar
            </button>
            <button onClick={() => agregarActividad('unir')} className="p-3 bg-white border border-slate-200 rounded-xl hover:border-purple-300 hover:shadow-md transition-all flex flex-col items-center gap-2 text-sm font-bold text-slate-600">
              <Link className="text-green-500"/> Unir Líneas
            </button>
            <button onClick={() => agregarActividad('sopa_letras')} className="p-3 bg-white border border-slate-200 rounded-xl hover:border-purple-300 hover:shadow-md transition-all flex flex-col items-center gap-2 text-sm font-bold text-slate-600">
              <BookPlus className="text-orange-500"/> Sopa Letras
            </button>
          </div>
        </div>

        {actividades.map((act, index) => (
          <div key={act.id} className="relative bg-white border-2 border-slate-100 rounded-2xl p-6 shadow-sm">
            <button onClick={() => eliminarActividad(index)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors">
              <Trash2 size={20} />
            </button>
            <h5 className="font-black text-purple-600 mb-4 uppercase tracking-wider text-sm">
              Nivel {index + 1}: {act.tipo.replace('_', ' ')}
            </h5>
            
            <input 
              type="text" 
              placeholder="Instrucción (Ej: Arrastra la imagen al lugar correcto)"
              className="w-full p-3 rounded-lg border border-slate-200 mb-4 bg-slate-50"
              value={act.instruccion}
              onChange={(e) => {
                const nuevas = [...actividades];
                nuevas[index].instruccion = e.target.value;
                setActividades(nuevas);
              }}
            />
            
            {act.tipo === 'unir' ? (
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <label className="text-xs font-bold text-slate-500 uppercase mb-4 block">Parejas a Conectar</label>
                <div className="space-y-3">
                  {act.datos.parejas.map((pareja, pIndex) => (
                    <div key={pIndex} className="flex items-center gap-3">
                      <div className="relative w-1/2">
                        <input 
                          type="text" 
                          value={pareja.izq}
                          onChange={(e) => handleTextChange(e, index, pIndex, 'izq')}
                          placeholder="Lado Izq (Texto o URL)"
                          className="w-full p-3 pr-10 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-green-300"
                        />
                        <label className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer p-1 text-slate-400 hover:text-celeste-500 transition-colors" title="Subir imagen">
                          {subiendoImagen ? <Loader2 size={18} className="animate-spin"/> : <ImagePlus size={18}/>}
                          <input type="file" accept="image/*" className="hidden" disabled={subiendoImagen} onChange={(e) => manejarSubidaImagen(e, index, pIndex, 'izq')} />
                        </label>
                      </div>
                      <span className="text-slate-400 font-bold flex-shrink-0">🔗</span>
                      <div className="relative w-1/2">
                        <input 
                          type="text" 
                          value={pareja.der}
                          onChange={(e) => handleTextChange(e, index, pIndex, 'der')}
                          placeholder="Lado Der (Texto o URL)"
                          className="w-full p-3 pr-10 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-green-300"
                        />
                        <label className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer p-1 text-slate-400 hover:text-celeste-500 transition-colors" title="Subir imagen">
                          {subiendoImagen ? <Loader2 size={18} className="animate-spin"/> : <ImagePlus size={18}/>}
                          <input type="file" accept="image/*" className="hidden" disabled={subiendoImagen} onChange={(e) => manejarSubidaImagen(e, index, pIndex, 'der')} />
                        </label>
                      </div>
                      <button onClick={() => {
                        const nuevas = [...actividades];
                        nuevas[index].datos.parejas.splice(pIndex, 1);
                        setActividades(nuevas);
                      }} className="p-3 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors flex-shrink-0">
                        <Trash2 size={18}/>
                      </button>
                    </div>
                  ))}
                </div>
                <button onClick={() => {
                  const nuevas = [...actividades];
                  nuevas[index].datos.parejas.push({izq: '', der: ''});
                  setActividades(nuevas);
                }} className="mt-5 text-sm font-bold text-green-700 bg-green-100 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-2">
                  + Añadir nueva pareja
                </button>
              </div>
            ) : (
              <div className="p-4 bg-purple-50 text-purple-700 rounded-xl border border-purple-100 text-sm font-medium">
                La interfaz de configuración para <b>{act.tipo.replace('_', ' ')}</b> se habilitará en la siguiente fase.
              </div>
            )}
          </div>
        ))}

        {actividades.length > 0 && (
          <button onClick={guardarJuego} className="w-full bg-purple-600 text-white font-black py-4 rounded-xl shadow-lg hover:bg-purple-700 transition-all flex items-center justify-center gap-2">
            <Save size={20} /> {juegoAEditar ? "Actualizar Juego" : "Guardar Juego Avanzado"}
          </button>
        )}
      </div>
    </div>
  );
}