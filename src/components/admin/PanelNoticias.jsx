import React, { useState, useEffect } from 'react';
import { db, storage } from '../../firebase'; // Tu archivo de conexión
import { collection, addDoc, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Trash2, Upload, Plus, Loader } from 'lucide-react';

export default function PanelNoticias() {
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [subiendo, setSubiendo] = useState(false);

  // Formulario
  const [titulo, setTitulo] = useState('');
  const [fecha, setFecha] = useState('');
  const [resumen, setResumen] = useState('');
  const [imagen, setImagen] = useState(null);

  // 1. CARGAR NOTICIAS AL ENTRAR
  useEffect(() => {
    obtenerNoticias();
  }, []);

  const obtenerNoticias = async () => {
    setCargando(true);
    try {
      const q = query(collection(db, "noticias"), orderBy("fecha", "desc"));
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNoticias(docs);
    } catch (error) {
      console.error("Error cargando noticias:", error);
    }
    setCargando(false);
  };

  // 2. SUBIR NUEVA NOTICIA
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imagen || !titulo || !fecha) {
      alert("Por favor completa el título, la fecha y sube una imagen.");
      return;
    }

    setSubiendo(true);
    try {
      // A. Subir imagen a Firebase Storage
      const storageRef = ref(storage, `noticias/${Date.now()}_${imagen.name}`);
      await uploadBytes(storageRef, imagen);
      const urlImagen = await getDownloadURL(storageRef);

      // B. Guardar datos en Firestore Database
      await addDoc(collection(db, "noticias"), {
        titulo,
        fecha,
        resumen,
        imagen: urlImagen, // Guardamos el link de la foto
        creado: new Date()
      });

      // C. Limpiar formulario
      setTitulo('');
      setFecha('');
      setResumen('');
      setImagen(null);
      alert("¡Noticia publicada con éxito! 🎉");
      
      // D. Recargar lista
      obtenerNoticias();

    } catch (error) {
      console.error("Error subiendo noticia:", error);
      alert("Error al subir. Revisa la consola.");
    }
    setSubiendo(false);
  };

  // 3. ELIMINAR NOTICIA
  const eliminarNoticia = async (id) => {
    if(!window.confirm("¿Seguro que quieres borrar esta noticia?")) return;

    try {
      await deleteDoc(doc(db, "noticias", id));
      setNoticias(noticias.filter(n => n.id !== id));
    } catch (error) {
      console.error("Error borrando:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        📢 Gestión de Noticias
      </h2>

      {/* FORMULARIO DE CREACIÓN */}
      <form onSubmit={handleSubmit} className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-8">
        <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
          <Plus size={20} className="text-cyan-600"/> Nueva Noticia
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Título</label>
            <input 
              type="text" 
              value={titulo} 
              onChange={e => setTitulo(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-cyan-500 outline-none"
              placeholder="Ej: Día de la Familia"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Fecha</label>
            <input 
              type="date" 
              value={fecha} 
              onChange={e => setFecha(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-cyan-500 outline-none"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-600 mb-1">Resumen / Contenido</label>
          <textarea 
            rows="3"
            value={resumen} 
            onChange={e => setResumen(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-cyan-500 outline-none"
            placeholder="Escribe aquí de qué trata la noticia..."
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-1">Imagen Principal</label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer bg-white border border-slate-300 px-4 py-2 rounded shadow-sm hover:bg-slate-50 flex items-center gap-2 text-sm text-slate-700">
              <Upload size={18}/> Seleccionar Foto
              <input 
                type="file" 
                onChange={e => setImagen(e.target.files[0])} 
                className="hidden" 
                accept="image/*"
              />
            </label>
            {imagen && <span className="text-sm text-green-600 font-medium">{imagen.name}</span>}
          </div>
        </div>

        <button 
          type="submit" 
          disabled={subiendo}
          className="bg-cyan-600 text-white px-6 py-2 rounded hover:bg-cyan-700 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {subiendo ? <><Loader size={18} className="animate-spin"/> Subiendo...</> : 'Publicar Noticia'}
        </button>
      </form>

      {/* LISTA DE NOTICIAS EXISTENTES */}
      <h3 className="font-bold text-slate-700 mb-4 border-b pb-2">Noticias Publicadas</h3>
      
      {cargando ? (
        <p className="text-center text-slate-500 py-4">Cargando...</p>
      ) : (
        <div className="space-y-4">
          {noticias.length === 0 && <p className="text-slate-400 text-sm">No hay noticias aún.</p>}
          
          {noticias.map(noticia => (
            <div key={noticia.id} className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded shadow-sm hover:shadow-md transition-shadow">
              <img src={noticia.imagen} alt="Miniatura" className="w-16 h-16 object-cover rounded bg-slate-200" />
              <div className="flex-grow">
                <h4 className="font-bold text-slate-800">{noticia.titulo}</h4>
                <p className="text-xs text-slate-500">{noticia.fecha}</p>
              </div>
              <button 
                onClick={() => eliminarNoticia(noticia.id)}
                className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors"
                title="Eliminar noticia"
              >
                <Trash2 size={20}/>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}