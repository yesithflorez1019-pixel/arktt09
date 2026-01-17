import React, { useState, useEffect } from 'react';
import { Seccion, Titulo, TituloSeccion } from '../components/UI';
import usePageTitle from '../components/usePageTitle';
import { ZoomIn, X, ArrowLeft, Image as ImageIcon, Calendar } from 'lucide-react';

// FIREBASE
import { db } from '../firebase';
import { collection, query, orderBy, getDocs, where } from 'firebase/firestore';

export default function Galeria() {
  usePageTitle('Galería | Liceo Formador');
  
  const [modo, setModo] = useState('albumes'); // 'albumes' o 'fotos'
  const [albumActivo, setAlbumActivo] = useState(null);
  
  const [albumes, setAlbumes] = useState([]);
  const [fotos, setFotos] = useState([]);
  const [cargando, setCargando] = useState(true);
  
  // Lightbox
  const [fotoSeleccionada, setFotoSeleccionada] = useState(null);

  useEffect(() => {
    const cargarAlbumes = async () => {
      try {
        const q = query(collection(db, "albumes"), orderBy("creado", "desc"));
        const snapshot = await getDocs(q);
        setAlbumes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (e) { console.error(e); } finally { setCargando(false); }
    };
    cargarAlbumes();
  }, []);

  const abrirAlbum = async (album) => {
    setAlbumActivo(album);
    setModo('fotos');
    setCargando(true);
    setFotos([]);
    
    try {
      const q = query(collection(db, "fotos"), where("albumId", "==", album.id));
      const snapshot = await getDocs(q);
      setFotos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (e) { console.error(e); } finally { setCargando(false); }
  };

  // Función para formatear fecha bonita (Ej: "12 Oct 2025")
  const formatearFecha = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="animate-fade-in pt-20 bg-celeste-400 min-h-screen">
      
      {/* HEADER */}
      <Seccion>
        <div className="text-center max-w-4xl mx-auto">
          {modo === 'albumes' ? (
            <>
              <Titulo>Nuestros Recuerdos</Titulo>
              <p className="text-white/90 text-lg font-light mb-8">
                Cada sonrisa, cada juego y cada descubrimiento queda guardado aquí.
              </p>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 animate-fade-in">
               <button 
                 onClick={() => setModo('albumes')}
                 className="flex items-center gap-2 text-white bg-white/20 px-6 py-2 rounded-full hover:bg-white/30 transition backdrop-blur-md font-bold text-sm"
               >
                 <ArrowLeft size={18} /> VOLVER A ÁLBUMES
               </button>
               <h2 className="text-3xl md:text-5xl font-black text-white drop-shadow-md">{albumActivo?.titulo}</h2>
            </div>
          )}
        </div>
      </Seccion>

      {/* CONTENIDO PRINCIPAL (Álbumes o Fotos) */}
      <Seccion blanca={true} className="rounded-t-[3rem] min-h-[600px] shadow-2xl relative z-10">
        
        {cargando && (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-celeste-500 mb-4"></div>
                <p className="text-celeste-600 font-bold animate-pulse">Cargando momentos...</p>
            </div>
        )}

        {/* --- VISTA 1: ÁLBUMES (DISEÑO MEJORADO) --- */}
        {!cargando && modo === 'albumes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
            {albumes.length === 0 && (
              <div className="col-span-full text-center py-20 opacity-50">
                <ImageIcon size={64} className="mx-auto mb-4"/>
                <p className="text-xl">Aún no hay álbumes publicados.</p>
              </div>
            )}
            
            {albumes.map(album => (
              <div 
                key={album.id} 
                onClick={() => abrirAlbum(album)}
                className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Imagen de Fondo con Zoom al Hover */}
                <img 
                  src={album.portada} 
                  alt={album.titulo} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                
                {/* Gradiente Oscuro (Siempre visible abajo, crece al hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

                {/* Contenido (Texto) */}
                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-2 text-celeste-300 text-sm font-bold mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    <Calendar size={14} />
                    <span>{formatearFecha(album.creado)}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white leading-tight group-hover:text-celeste-200 transition-colors">
                    {album.titulo}
                  </h3>
                  <div className="h-1 w-12 bg-celeste-500 rounded-full mt-4 group-hover:w-24 transition-all duration-300"></div>
                </div>

                {/* Icono Flotante (Esquina Superior) */}
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <ImageIcon size={24} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- VISTA 2: FOTOS DENTRO DEL ÁLBUM (MASONRY STYLE) --- */}
        {!cargando && modo === 'fotos' && (
          <div className="animate-fade-in">
            {fotos.length === 0 && (
              <div className="text-center py-20 text-slate-400">
                <p>Este álbum está vacío por ahora.</p>
              </div>
            )}
            
            {/* Grilla estilo Mosaico */}
            <div className="columns-1 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {fotos.map(foto => (
                <div 
                  key={foto.id} 
                  className="break-inside-avoid relative group rounded-xl overflow-hidden cursor-zoom-in shadow-md hover:shadow-xl transition-all"
                  onClick={() => setFotoSeleccionada(foto)}
                >
                  <img 
                    src={foto.url} 
                    alt="Momento" 
                    className="w-full h-auto object-cover hover:opacity-90 transition-opacity"
                    loading="lazy" 
                  />
                  {/* Overlay simple */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="text-white drop-shadow-lg" size={32}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </Seccion>

      {/* LIGHTBOX (Visor de Fotos Pantalla Completa) */}
      {fotoSeleccionada && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setFotoSeleccionada(null)}
        >
            <button className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/10 p-3 rounded-full transition-all hover:bg-red-500/80 z-50">
                <X size={28} />
            </button>
            
            <img 
                src={fotoSeleccionada.url} 
                alt="Zoom" 
                className="max-w-full max-h-[90vh] rounded shadow-2xl object-contain animate-zoom-in"
                onClick={(e) => e.stopPropagation()} 
            />
        </div>
      )}

    </div>
  );
}