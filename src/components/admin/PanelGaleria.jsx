import React, { useState, useEffect } from 'react';
import { db, storage } from '../../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FolderPlus, Trash2, ArrowLeft, Upload, Loader, Plus, FolderOpen, Calendar } from 'lucide-react';
import { Tarjeta, Boton } from '../UI';

export default function PanelGaleria() {

  const [vista, setVista] = useState('albumes'); 
  const [albumActivo, setAlbumActivo] = useState(null);
  
  const [albumes, setAlbumes] = useState([]);
  const [fotos, setFotos] = useState([]);
  
  const [cargando, setCargando] = useState(false);
  const [subiendo, setSubiendo] = useState(false);

  // Formulario Nuevo Álbum
  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [fechaEvento, setFechaEvento] = useState(''); // <--- NUEVO CAMPO FECHA
  const [portada, setPortada] = useState(null);

  // --- CARGA INICIAL ---
  useEffect(() => {
    cargarAlbumes();
  }, []);

  const cargarAlbumes = async () => {
    setCargando(true);
    // Ahora ordenamos por 'fechaEvento' para que salgan en orden cronológico real
    const q = query(collection(db, "albumes"), orderBy("fechaEvento", "desc"));
    try {
      const snap = await getDocs(q);
      setAlbumes(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error("Error cargando álbumes:", error);
      // Si falla (porque hay álbumes viejos sin fecha), intenta carga simple
      
      const qBackup = query(collection(db, "albumes"));
      const snapBackup = await getDocs(qBackup);
      setAlbumes(snapBackup.docs.map(d => ({ id: d.id, ...d.data() })));
    }
    setCargando(false);
  };

  const cargarFotos = async (albumId) => {
    setCargando(true);
    const q = query(collection(db, "fotos"), where("albumId", "==", albumId));
    const snap = await getDocs(q);
    setFotos(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    setCargando(false);
  };

  // --- CREAR ÁLBUM CON FECHA ---
  const crearAlbum = async (e) => {
    e.preventDefault();
    if (!nuevoTitulo || !portada || !fechaEvento) return alert("Completa título, fecha y portada");

    setSubiendo(true);
    try {
      // 1. Subir portada
      const refPortada = ref(storage, `portadas/${Date.now()}_${portada.name}`);
      await uploadBytes(refPortada, portada);
      const urlPortada = await getDownloadURL(refPortada);

      // 2. Crear documento de álbum con la FECHA SELECCIONADA
      // Agregamos T12:00:00 para evitar problemas de zona horaria (que salga un día antes)
        const fechaGuardar = new Date(fechaEvento + 'T12:00:00');

      await addDoc(collection(db, "albumes"), {
        titulo: nuevoTitulo,
        fechaEvento: fechaGuardar, // <--- AQUÍ GUARDAMOS LA FECHA MANUAL
        portada: urlPortada,
        creado: new Date() 
      });

      setNuevoTitulo('');
      setFechaEvento('');
      setPortada(null);
      cargarAlbumes();
      alert("¡Álbum creado exitosamente!");
    } catch (error) {
      console.error(error);
      alert("Error creando álbum");
    }
    setSubiendo(false);
  };

  // --- SUBIR MUCHAS FOTOS ---
  const subirMultiplesFotos = async (e) => {
    const archivos = Array.from(e.target.files);
    if (archivos.length === 0) return;

    setSubiendo(true);
    try {
      await Promise.all(archivos.map(async (archivo) => {
        const refFoto = ref(storage, `galeria/${albumActivo.id}/${Date.now()}_${archivo.name}`);
        await uploadBytes(refFoto, archivo);
        const url = await getDownloadURL(refFoto);

        await addDoc(collection(db, "fotos"), {
          albumId: albumActivo.id,
          url: url,
          creado: new Date()
        });
      }));

      cargarFotos(albumActivo.id);
      alert(`¡Se subieron ${archivos.length} fotos!`);
    } catch (error) {
      console.error(error);
      alert("Error subiendo fotos");
    }
    setSubiendo(false);
  };

  // --- BORRAR ---
  const borrarAlbum = async (id) => {
    if(!window.confirm("¿Borrar todo este álbum?")) return;
    await deleteDoc(doc(db, "albumes", id));
    cargarAlbumes();
  };

  const borrarFoto = async (id) => {
    if(!window.confirm("¿Borrar esta foto?")) return;
    await deleteDoc(doc(db, "fotos", id));
    setFotos(fotos.filter(f => f.id !== id));
  };

  // ================= VISTAS =================

  if (vista === 'albumes') {
    return (
      <div className="space-y-8 animate-fade-in">
        <h2 className="text-2xl font-bold text-celeste-900 flex items-center gap-2">
          <FolderPlus /> Gestión de Temas
        </h2>

        {/* CREAR ÁLBUM */}
        <Tarjeta className="border-l-4 border-celeste-500 bg-celeste-50">
          <h3 className="font-bold text-lg mb-4 text-celeste-800">Nuevo Tema</h3>
          <form onSubmit={crearAlbum} className="grid md:grid-cols-4 gap-4 items-end">
            
            {/* INPUT TÍTULO */}
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-celeste-700 uppercase block mb-1">Título del Evento</label>
              <input 
                type="text" 
                value={nuevoTitulo} 
                onChange={e => setNuevoTitulo(e.target.value)}
                className="w-full p-2 rounded border border-celeste-200 focus:outline-none focus:ring-2 focus:ring-celeste-400"
                placeholder="Ej: Día de la Familia"
              />
            </div>

            {/* INPUT FECHA (NUEVO) */}
            <div>
              <label className="text-xs font-bold text-celeste-700 uppercase block mb-1">Fecha del Evento</label>
              <input 
                type="date" 
                value={fechaEvento} 
                onChange={e => setFechaEvento(e.target.value)}
                className="w-full p-2 rounded border border-celeste-200 focus:outline-none focus:ring-2 focus:ring-celeste-400 text-slate-600"
              />
            </div>

            {/* INPUT PORTADA */}
            <div>
              <label className="text-xs font-bold text-celeste-700 uppercase block mb-1">Portada</label>
              <input 
                type="file" 
                onChange={e => setPortada(e.target.files[0])}
                className="w-full text-xs text-slate-500 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-white file:text-celeste-700 hover:file:bg-celeste-100 cursor-pointer"
                accept="image/*"
              />
            </div>

            <div className="md:col-span-4">
               <Boton variante="azul" disabled={subiendo} full={true} className="mt-2">
                 {subiendo ? <Loader className="animate-spin"/> : <><Plus /> Crear Álbum</>}
               </Boton>
            </div>
          </form>
        </Tarjeta>

        {/* LISTA DE ÁLBUMES */}
        {cargando ? <p className="text-center">Cargando...</p> : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {albumes.map(album => (
              <div key={album.id} className="bg-white rounded-xl shadow-md overflow-hidden group border border-slate-100 hover:shadow-xl transition-all">
                <div 
                  className="h-40 overflow-hidden relative cursor-pointer"
                  onClick={() => {
                    setAlbumActivo(album);
                    setVista('fotos');
                    cargarFotos(album.id);
                  }}
                >
                  <img src={album.portada} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="Portada" />
                  <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-bold text-celeste-700 shadow flex items-center gap-1">
                     <Calendar size={12}/> 
                     {/* Mostramos la fecha guardada */}
                     {album.fechaEvento ? new Date(album.fechaEvento.seconds * 1000).toLocaleDateString() : 'Sin fecha'}
                  </div>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <h4 className="font-bold text-slate-800 truncate pr-2">{album.titulo}</h4>
                  <button onClick={() => borrarAlbum(album.id)} className="text-red-400 hover:text-red-600 bg-red-50 p-2 rounded-full transition">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // VISTA 2: DENTRO DE UN ÁLBUM
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between bg-celeste-100 p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <button onClick={() => setVista('albumes')} className="bg-white p-2 rounded-full hover:bg-celeste-200 text-celeste-700 transition">
            <ArrowLeft />
          </button>
          <div>
             <h2 className="text-xl font-bold text-celeste-900">{albumActivo.titulo}</h2>
             <p className="text-xs text-celeste-600 font-medium">
               {albumActivo.fechaEvento ? new Date(albumActivo.fechaEvento.seconds * 1000).toLocaleDateString(undefined, {weekday:'long', year:'numeric', month:'long', day:'numeric'}) : ''}
             </p>
          </div>
        </div>
        <span className="text-sm font-bold bg-white px-3 py-1 rounded-full text-celeste-600 shadow-sm">
          {fotos.length} Fotos
        </span>
      </div>

      <div className="border-2 border-dashed border-celeste-300 rounded-xl p-8 text-center bg-celeste-50 hover:bg-white transition-colors relative group">
        {subiendo ? (
          <div className="flex flex-col items-center">
            <Loader className="animate-spin text-celeste-600 mb-2" size={32}/>
            <p className="text-celeste-700 font-bold">Subiendo fotos...</p>
          </div>
        ) : (
          <>
            <input 
              type="file" 
              multiple 
              onChange={subirMultiplesFotos}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              accept="image/*"
            />
            <div className="group-hover:scale-110 transition-transform duration-300">
               <Upload className="mx-auto text-celeste-400 mb-2" size={40}/>
            </div>
            <p className="font-bold text-celeste-800">Arrastra o selecciona fotos aquí</p>
            <p className="text-xs text-celeste-500 mt-1">Soporta múltiples archivos a la vez</p>
          </>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {fotos.map(foto => (
          <div key={foto.id} className="relative group aspect-square rounded-lg overflow-hidden bg-slate-100 shadow-sm">
            <img src={foto.url} className="w-full h-full object-cover" alt="Foto" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  onClick={() => borrarFoto(foto.id)}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 hover:scale-110 transition-all"
                >
                  <Trash2 size={18} />
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}