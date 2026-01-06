import React, { useState, useEffect } from 'react';
import { TituloSeccion } from '../components/UI';
// import { noticiasData } from '../data/noticias'; // Ya no usamos datos falsos
import SEO from '../components/SEO';
import { useNavigate } from 'react-router-dom';

// IMPORTACIONES DE FIREBASE
import { db } from '../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { ArrowLeft } from "lucide-react";
export default function Noticias() {
  const navigate = useNavigate();
  
  // ESTADOS PARA LOS DATOS REALES
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);

  // EFECTO: TRAER DATOS DE GOOGLE AL CARGAR
  useEffect(() => {
    const obtenerNoticias = async () => {
      try {
        const q = query(collection(db, "noticias"), orderBy("fecha", "desc"));
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setNoticias(docs);
      } catch (error) {
        console.error("Error cargando noticias:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerNoticias();
  }, []);

  return (
    <div className="animate-fade-in pt-12 pb-20 bg-celeste-400 min-h-screen">
      <SEO 
        title="Noticias" 
        description="Mantente al día con las últimas actividades y eventos del Liceo Formador de Exploradores."
        keywords="noticias colegio, circulares padres de familia, eventos liceo barrancabermeja"
      />
      
      <div className="container mx-auto px-6">
          <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white font-bold mb-8 hover:-translate-x-1 transition-transform"
        >
          <ArrowLeft size={20} /> Volver al Inicio
        </button>
        <TituloSeccion titulo="Noticias y Eventos" subtitulo2="Mantente al día con todo lo que sucede en el Liceo." />
          
        {/* SPINNER DE CARGA (Solo sale mientras baja la info) */}
        {cargando && (
          <div className="flex justify-center py-20 bg-celeste-400">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
          </div>
        )}

        {/* MENSAJE SI NO HAY NOTICIAS */}
        {!cargando && noticias.length === 0 && (
          <div className="text-center py-20 text-white bg-celeste-400 rounded-xl shadow border border-slate-100">
            <p>No hay noticias publicadas todavía.</p>
          </div>
        )}

        {/* GRILLA DE NOTICIAS (TU DISEÑO EXACTO) */}
        
        {!cargando && (
          
          <div className="grid md:grid-cols-3 gap-8 border-80px">
             
     
            {noticias.map((item) => (
              <div className="
                  bg-slate-200
                  rounded-xl
                  shadow-md
                  px-6 py-8
                  md:px-3 md:py-3
                  max-w-12xl
                
                  border border-white/70
                  ring-1 ring-black/5
                      ">
              <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-x1 transition-all duration-300 group border-90px border-black/50 flex flex-col">

                {/* Imagen de la tarjeta */}
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={item.imagen} 
                    alt={item.titulo} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 left-4 bg-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {item.fecha}
                  </div>
                </div>

                {/* Contenido de la tarjeta */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-bold text-lg text-slate-800 mb-3 leading-tight group-hover:text-cyan-600 transition-colors">
                    {item.titulo}
                  </h3>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-3 flex-grow">
                    {item.resumen}
                  </p>
                  <button 
                    onClick={() => navigate(`/noticias/${item.id}`)}
                    className="text-cyan-600 font-bold text-sm hover:underline mt-auto self-start"
                  >
                    Leer noticia completa &rarr;
                  </button>
                </div>

              </div>
               </div>
            ))}
          </div>
         
        )}
        </div>
        </div>


   
  );
}