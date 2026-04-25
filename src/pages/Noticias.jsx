import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import usePageTitle from '../components/usePageTitle';

// IMPORTACIONES DE FIREBASE
import { db } from '../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { ArrowLeft, ArrowRight, Search, Calendar } from "lucide-react";
export default function Noticias() {
  usePageTitle('Noticias', 'Mantente al día con las últimas actividades y eventos del Liceo Formador de Exploradores.');
  const navigate = useNavigate();
  
  // ESTADOS PARA LOS DATOS REALES
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtro, setFiltro] = useState(''); // <-- NUEVO ESTADO PARA EL BUSCADOR

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

  // LÓGICA DEL BUSCADOR Y NOTICIA DESTACADA
  const noticiasFiltradas = noticias.filter(item => 
    item.titulo.toLowerCase().includes(filtro.toLowerCase()) || 
    item.resumen.toLowerCase().includes(filtro.toLowerCase())
  );

  const noticiaDestacada = noticiasFiltradas.length > 0 ? noticiasFiltradas[0] : null;
  const noticiasRestantes = noticiasFiltradas.length > 1 ? noticiasFiltradas.slice(1) : [];

  return (
    <div className="animate-fade-in bg-slate-50 min-h-screen font-sans pb-20">
      
      {/* ENCABEZADO TIPO PORTAL (HERO) */}
      <div className="bg-celeste-600 pt-16 pb-32 px-6 relative overflow-hidden">
        {/* Decoraciones de fondo modernas */}
        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-celeste-500 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-50px] left-[-50px] w-80 h-80 bg-celeste-700 rounded-full blur-3xl opacity-50"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-celeste-100 font-bold mb-8 hover:text-white hover:-translate-x-1 transition-all"
          >
            <ArrowLeft size={20} /> Volver al Inicio
          </button>
          
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-md">
              Actualidad Escolar
            </h1>
            <p className="text-lg text-celeste-100 font-light leading-relaxed mb-10">
              Explora las últimas novedades, circulares y eventos que construyen la historia de nuestro Liceo Formador de Exploradores cada día.
            </p>
          </div>

          {/* BARRA DE BÚSQUEDA MODERNA */}
          <div className="max-w-xl bg-white p-2 rounded-2xl flex items-center shadow-2xl border border-white/20">
            <div className="bg-celeste-50 p-3 rounded-xl text-celeste-600">
              <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Buscar por palabra clave..." 
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="w-full px-4 outline-none text-slate-700 font-medium bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="container mx-auto max-w-6xl px-6 -mt-16 relative z-20">
        
        {/* SPINNER DE CARGA */}
        {cargando && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-xl">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-celeste-500 mb-4"></div>
            <p className="text-celeste-600 font-bold">Cargando actualidad...</p>
          </div>
        )}

        {/* MENSAJE SI NO ENCUENTRA NADA EN LA BÚSQUEDA */}
        {!cargando && noticiasFiltradas.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl shadow-xl border border-slate-100">
            <Search size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-2xl font-bold text-slate-700 mb-2">No encontramos resultados</h3>
            <p className="text-slate-500">Intenta buscar con otra palabra clave.</p>
          </div>
        )}

        {!cargando && noticiaDestacada && (
          <>
            {/* NOTICIA DESTACADA (La principal se lleva todo el ancho) */}
            <div 
              onClick={() => navigate(`/noticias/${noticiaDestacada.id}`)}
              className="bg-white rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col md:flex-row group mb-12 border border-slate-100"
            >
              <div className="md:w-1/2 h-72 md:h-auto relative overflow-hidden bg-slate-100 flex items-center justify-center">
                <img 
                  src={noticiaDestacada.imagen} 
                  alt={noticiaDestacada.titulo} 
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute top-6 left-6 bg-celeste-600 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-lg z-10 uppercase tracking-wider">
                  Destacado
                </div>
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-celeste-600 font-bold text-sm mb-4">
                  <Calendar size={18} /> {noticiaDestacada.fecha}
                </div>
                <h2 className="text-3xl lg:text-4xl font-black text-slate-800 mb-4 leading-tight group-hover:text-celeste-600 transition-colors">
                  {noticiaDestacada.titulo}
                </h2>
                <p className="text-slate-500 text-base lg:text-lg mb-8 line-clamp-3 leading-relaxed">
                  {noticiaDestacada.resumen}
                </p>
                <span className="inline-flex items-center gap-2 text-celeste-600 font-bold uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                  Leer artículo completo <ArrowRight size={20} />
                </span>
              </div>
            </div>

            {/* GRILLA DE NOTICIAS RESTANTES */}
            {noticiasRestantes.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {noticiasRestantes.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => navigate(`/noticias/${item.id}`)}
                    className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer flex flex-col overflow-hidden border border-slate-100 transform hover:-translate-y-2"
                  >
                    <div className="h-56 relative overflow-hidden shrink-0 bg-slate-100 flex items-center justify-center">
                      <img 
                        src={item.imagen} 
                        alt={item.titulo} 
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute top-4 left-4 bg-white text-celeste-700 text-xs font-bold px-3 py-1 rounded-md shadow-md z-10 flex items-center gap-1 border border-slate-100">
                        <Calendar size={12}/> {item.fecha}
                      </div>
                    </div>

                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="font-bold text-xl text-slate-800 mb-3 leading-tight group-hover:text-celeste-600 transition-colors">
                        {item.titulo}
                      </h3>
                      <p className="text-slate-500 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
                        {item.resumen}
                      </p>
                      <span className="text-celeste-600 font-bold text-sm uppercase tracking-wider group-hover:underline self-start mt-auto flex items-center gap-1">
                        Leer nota <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                ))}   
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}