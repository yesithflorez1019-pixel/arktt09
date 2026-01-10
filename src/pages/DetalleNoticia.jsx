import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase'; // Importamos la conexión
import { doc, getDoc } from 'firebase/firestore'; // Herramientas para leer 1 solo documento
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import SEO from '../components/SEO';
import usePageTitle from '../components/usePageTitle';

export default function DetalleNoticia() {

  usePageTitle('Detalle de Noticia', 'Lee la noticia completa y mantente informado sobre las últimas novedades del Liceo Formador.');
  
  const { id } = useParams(); // Obtenemos el ID de la URL
  const navigate = useNavigate();
  
  const [noticia, setNoticia] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerNoticia = async () => {
      try {
        // Buscamos en la colección 'noticias' el documento con este ID
        const docRef = doc(db, "noticias", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setNoticia({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No existe el documento");
          setNoticia(null);
        }
      } catch (error) {
        console.error("Error obteniendo documento:", error);
      } finally {
        setCargando(false);
      }
    };

    if (id) {
      obtenerNoticia();
    }
  }, [id]);

  // VISTA DE CARGA
  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-celeste-400">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  // VISTA SI NO ENCUENTRA LA NOTICIA
  if (!noticia) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Noticia no encontrada</h2>
        <p className="text-slate-500 mb-6">Parece que esta noticia fue eliminada o no existe.</p>
        <button 
          onClick={() => navigate('/noticias')}
          className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition-colors"
        >
          Volver a Noticias
        </button>
      </div>
    );
  }

  // VISTA DE LA NOTICIA COMPLETA
  return (
    <div className="min-h-screen bg-celeste-400 animate-fade-in pb-20">
      <SEO title={noticia.titulo} description={noticia.resumen} />
      
      {/* HEADER DE IMAGEN */}
      <div className="relative h-[400px] w-full">
        <img 
          src={noticia.imagen} 
          alt={noticia.titulo} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
        
        {/* Botón Volver Flotante */}
        <button 
          onClick={() => navigate('/noticias')}
          className="absolute top-6 left-6 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full transition-all border border-white/30"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 container mx-auto">
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 drop-shadow-lg">
            {noticia.titulo}
          </h1>
          <div className="flex items-center gap-6 text-slate-300 text-sm font-medium">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-cyan-400"/>
              {noticia.fecha}
            </div>
            {/* Si quisieras mostrar la hora o autor, iría aquí */}
          </div>
        </div>
      </div>

      {/* CONTENIDO DEL TEXTO */}
      <div className="container mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto border border-slate-100">
          
          {/* El contenido de la noticia */}
          <div className="prose prose-lg text-slate-600 max-w-none leading-relaxed whitespace-pre-line">
            {noticia.resumen}
          </div>

          <hr className="my-8 border-slate-200" />

          <div className="flex justify-between items-center">
            <button 
              onClick={() => navigate('/noticias')}
              className="text-slate-500 font-bold hover:text-cyan-600 transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={18} /> Volver a la lista
            </button>
            
            <button className="text-cyan-600 bg-cyan-50 px-4 py-2 rounded-lg font-bold hover:bg-cyan-100 transition-colors flex items-center gap-2">
              <Share2 size={18} /> Compartir
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}