import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { 
  Monitor, BookOpen, Calendar, User, 
  ArrowRight, Shield, Heart, Smile, CheckCircle, MapPin, Facebook,Instagram,FileText,CreditCard
} from 'lucide-react';

// FIREBASE
import { db } from '../firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

// IMÁGENES (Mantengo las que ya tenías importadas y uso rutas relativas para las nuevas secciones)
import liceoImg from "../images/liceo1.png"; 

const IconoTikTok = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);
export default function Inicio() {
  const navigate = useNavigate();
  const [noticiasDestacadas, setNoticiasDestacadas] = useState([]);

  // --- 1. LÓGICA DE DATOS ---
  
  // Cargar Noticias (Firebase)
  useEffect(() => {
    const obtenerNoticias = async () => {
      try {
        const q = query(collection(db, "noticias"), orderBy("fecha", "desc"), limit(3));
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setNoticiasDestacadas(docs);
      } catch (error) {
        console.error("Error cargando noticias:", error);
      }
    };
    obtenerNoticias();
  }, []);

  // Datos de Accesos Rápidos (Estructura Solicitada: 4 tarjetas)
  const accesosRapidos = [
    { 
          titulo: "Plataforma Notas", 
          descripcion: "Acceso Padres/Alumnos", 
          imagen: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80",
          icono: Monitor,
          accion: () => window.open('https://e.plataformaintegra.net/liceoexploradores/', '_blank')
        },
        { 
          titulo: "Admisiones", 
          descripcion: "Requisitos y fechas", 
          imagen: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&q=80",
          icono: FileText,
          accion: () => navigate('/admisiones')
        },
        { 
          titulo: "Calendario", 
          descripcion: "Cronograma 2026",
          imagen: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=400&q=80",
          icono: Calendar,
          accion: () => navigate('/calendario')
        },
        { 
          titulo: "Pagos en Línea", 
          descripcion: "PSE y Matrículas", 
          imagen: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80", 
          icono: CreditCard,
          accion: () => navigate('/pagos')
        }
  ];

  // Datos simulados para Eventos (Ya que no hay backend de eventos aún)
  const eventosProximos = [
    { id: 1, titulo: "Día de la Familia", fecha: "15 OCT", categoria: "Institucional", img: "/fotos-galeria/35.jpeg" },
    { id: 2, titulo: "Feria de la Ciencia", fecha: "22 OCT", categoria: "Académico", img: "/fotos-galeria/20.jpeg" },
    { id: 3, titulo: "Clausura 2026", fecha: "15 NOV", categoria: "Celebración", img: "/fotos-galeria/40.jpeg" },
  ];

  return (
    <div className="font-sans text-slate-800 bg-slate-50 overflow-x-hidden">
      <SEO 
        title="Inicio" 
        description="Liceo Formador de Exploradores: Formación integral en Barrancabermeja."
        keywords="colegio, preescolar, primaria, barrancabermeja"
      />

        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end animate-fade-in">
                <div className="bg-celeste-600 text-white text-[10px] font-bold py-3 px-1 rounded-l-md shadow-lg mb-1 cursor-default" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                   SÍGUENOS
                </div>
        
                <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-l-xl border-y border-l border-celeste-200 p-2 flex flex-col gap-3">
                    <a href="https://www.facebook.com/share/1BsV5q8LH2/" target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"><Facebook size={20} /></a>
                    <a href="https://www.instagram.com/liceoformadordexploradores?igsh=bGRwdnlsd2k2cjhl" target="_blank" rel="noopener noreferrer" className="p-2 bg-pink-50 text-pink-600 rounded-full hover:bg-pink-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"><Instagram size={20} /></a>
                    <a href="https://www.tiktok.com/@liceo.formador.de?_r=1&_t=ZS-91Ky5fZOoVj" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 text-slate-800 rounded-full hover:bg-black hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"><IconoTikTok size={20} /></a>
                </div>
              </div>


      {/* ==============================================
          3. HERO PRINCIPAL (Bienvenida)
          Estilo: Imagen fondo + Texto Izquierda
      =============================================== */}

      <section className="relative w-full h-[600px] lg:h-[750px] flex items-center">
        {/* Fondo con imagen y overlay azulado */}
        <div className="absolute inset-0 z-0">
          <img 
            src={liceoImg} 
            alt="Liceo Formador" 
            className="w-full h-full object-cover object-center"
          />
          {/* Gradiente azul celeste institucional */}
          <div className="absolute inset-0 bg-gradient-to-r from-celeste-900/90 via-celeste-800/70 to-transparent"></div>
        </div>

        {/* Contenido Hero */}
        <div className="container mx-auto px-6 relative z-10 pt-20">
          <div className="max-w-2xl text-white animate-fade-in-up">
            <span className="inline-block py-1 px-3 rounded-full bg-celeste-400 text-white text-sm font-bold tracking-wider mb-4 border border-white/30 backdrop-blur-sm">
              INSCRIPCIONES ABIERTAS 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight drop-shadow-lg">
              Bienvenidos al <br/>
              <span className="text-celeste-200">Liceo Formador de Exploradores</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-95 leading-relaxed font-medium">
              Formación integral desde preescolar hasta básica primaria, en un ambiente seguro, familiar y lleno de valores para tus hijos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/admisiones')}
                className="bg-celeste-500 hover:bg-celeste-400 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-celeste-500/50 transition-all transform hover:-translate-y-1"
              >
                Oferta Académica
              </button>
              <button 
                onClick={() => navigate('/contacto')}
                className="bg-white/10 backdrop-blur-md border-2 border-white/50 hover:bg-white hover:text-celeste-900 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all transform hover:-translate-y-1"
              >
                Únete a nuestra familia
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================
          4. ACCESOS RÁPIDOS (Cards Grid)
          Ubicación: Inmediatamente bajo el Hero
      =============================================== */}
      <section className="py-16 bg-slate-50 relative -mt-10 md:-mt-20 z-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {accesosRapidos.map((item, index) => (
              <div 
                key={index}
                onClick={item.accion}
                className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="absolute inset-0">
                  <img src={item.imagen} alt={item.titulo} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-celeste-900/60 group-hover:bg-celeste-800/50 transition-colors"></div>
                </div>
                
                <div className="relative h-full flex flex-col justify-end p-6 text-white">
                  <item.icono size={32} className="mb-3 text-celeste-300 group-hover:text-white transition-colors" />
                  <h3 className="text-xl font-bold leading-tight mb-1">{item.titulo}</h3>
                  <p className="text-sm text-celeste-100 font-medium opacity-90">{item.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================================
          5. PRÓXIMOS EVENTOS
          Diseño: Grid de 3 tarjetas
      =============================================== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-celeste-600 font-bold tracking-widest text-sm uppercase">Agenda 2026</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-800 mt-2">Próximos Eventos</h2>
            </div>
            <button onClick={() => navigate('/calendario')} className="text-celeste-600 font-bold hover:text-celeste-800 flex items-center gap-2 mt-4 md:mt-0 group">
              Ver calendario completo <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {eventosProximos.map((evento) => (
              <div key={evento.id} className="bg-slate-50 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 group">
                <div className="h-48 relative overflow-hidden">
                  <img src={evento.img} alt={evento.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white text-slate-900 font-bold text-xs px-3 py-1 rounded-full shadow-md">
                    {evento.fecha}
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-celeste-600 text-xs font-bold uppercase tracking-wider">{evento.categoria}</span>
                  <h3 className="text-xl font-bold text-slate-800 mt-2 mb-2 group-hover:text-celeste-600 transition-colors">{evento.titulo}</h3>
                  <button className="text-slate-400 text-sm font-semibold hover:text-celeste-600 flex items-center gap-1 mt-4">
                    Más detalles <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================================
          6. BLOQUE INSTITUCIONAL / VALORES
          Fondo Azul Sólido
      =============================================== */}
      <section className="py-24 bg-celeste-600 text-white relative overflow-hidden">
        {/* Elemento decorativo de fondo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Imagen Institucional */}
            <div className="relative">
              <div className="absolute -inset-4 bg-celeste-400/30 rounded-3xl transform rotate-3"></div>
              <img 
                src="/fotos-inicio/7.jpeg" 
                alt="Valores Institucionales" 
                className="relative rounded-2xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-all duration-500 w-full object-cover h-[400px]"
              />
            </div>

            {/* Texto y Valores */}
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-6">Formación integral basada en valores</h2>
              <p className="text-celeste-100 text-lg mb-8 leading-relaxed">
                En el Liceo Formador de Exploradores, no solo educamos la mente, sino también el corazón. Nuestro modelo pedagógico se centra en el ser humano.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <Shield className="text-celeste-100" size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Instalaciones Seguras</h4>
                    <p className="text-celeste-100 text-sm">Espacios monitoreados y diseñados para la tranquilidad de los padres.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <Smile className="text-celeste-100" size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Educación Feliz</h4>
                    <p className="text-celeste-100 text-sm">El juego y la exploración como base del aprendizaje significativo.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <Heart className="text-celeste-100" size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Acompañamiento Constante</h4>
                    <p className="text-celeste-100 text-sm">Docentes comprometidos con el desarrollo emocional de cada niño.</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => navigate('/galeria')}
                className="mt-10 bg-white text-celeste-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-celeste-50 transition-colors"
              >
                Nuestros mejores momentos
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================
          7. NOTICIAS RECIENTES
          Fondo Celeste Claro
      =============================================== */}
      <section className="py-20 bg-celeste-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-black text-slate-800">Actualidad Escolar</h2>
              <div className="h-1.5 w-20 bg-celeste-500 rounded-full mt-3"></div>
            </div>
            <button onClick={() => navigate('/noticias')} className="hidden md:flex bg-white px-6 py-2 rounded-full shadow-sm text-celeste-700 font-bold hover:shadow-md transition-all">
              Ver todas las noticias
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {noticiasDestacadas.map((item) => (
               <div key={item.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden border border-slate-100 h-full">
                 <div className="h-56 relative overflow-hidden shrink-0">
                   <img src={item.imagen} alt={item.titulo} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                   <div className="absolute top-4 left-4 bg-celeste-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-lg">
                     {item.fecha}
                   </div>
                 </div>
                 <div className="p-8 flex flex-col grow">
                   <h3 className="font-bold text-xl text-slate-800 mb-3 leading-tight hover:text-celeste-600 transition-colors">{item.titulo}</h3>
                   <p className="text-slate-500 text-sm mb-6 line-clamp-3 grow">{item.resumen}</p>
                   <button onClick={() => navigate('/noticias/' + item.id)} className="text-celeste-600 font-bold text-sm uppercase tracking-wider hover:underline self-start">
                     Leer Nota Completa
                   </button>
                 </div>
               </div>
            ))}
          </div>
          
          <button onClick={() => navigate('/noticias')} className="md:hidden mt-8 w-full py-4 bg-white text-celeste-700 font-bold rounded-xl shadow-sm">
            Ver todas las noticias
          </button>
        </div>
      </section>

      {/* ==============================================
          8. SECCIÓN "NUESTRA SEDE"
          Estilo: Fondo Azul Institucional + Tarjeta Flotante Slate/White
      =============================================== */}
      <section className="py-24 bg-celeste-500">
        <div className="container mx-auto px-6">
          
          {/* Tarjeta Flotante */}
          <div className="bg-slate-100 rounded-[2.5rem] shadow-2xl overflow-hidden max-w-5xl mx-auto border-4 border-white/20">
            <div className="flex flex-col md:flex-row h-full">
              
              {/* Columna Imagen */}
              <div className="md:w-1/2 h-80 md:h-auto relative">
                <img 
                  src="/fotos-inicio/7.jpeg" 
                  alt="Sede del Liceo" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <p className="text-sm font-medium opacity-90 uppercase tracking-widest mb-1">Ubicación</p>
                    <p className="text-2xl font-bold">Barrancabermeja</p>
                  </div>
                </div>
              </div>

              {/* Columna Info */}
              <div className="md:w-1/2 p-10 md:p-14 flex flex-col justify-center bg-white">
                <h2 className="text-3xl font-black text-slate-800 mb-4">Sede Única Integral</h2>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Contamos con un espacio unificado donde acompañamos el proceso educativo completo de tus hijos. Instalaciones modernas y seguras.
                </p>

                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8">
                  <h4 className="font-bold text-celeste-700 flex items-center gap-2 mb-3">
                    <CheckCircle size={18} /> Niveles Educativos
                  </h4>
                  <ul className="grid grid-cols-2 gap-y-2 text-sm text-slate-600 font-medium ml-6">
                    <li>• Prejardín</li>
                    <li>• Grado 1°</li>
                    <li>• Jardín</li>
                    <li>• Grado 2°</li>
                    <li>• Transición</li>
                    <li>• Grado 3° a 5°</li>
                  </ul>
                </div>

                <button
                  onClick={() => window.open('https://maps.google.com/?q=Liceo+Formador+de+Exploradores', '_blank')}
                  className="flex items-center gap-2 text-slate-900 font-bold hover:text-celeste-600 transition-colors group"
                >
                  <div className="p-2 bg-celeste-100 text-celeste-600 rounded-full group-hover:bg-celeste-600 group-hover:text-white transition-all">
                    <MapPin size={20} />
                  </div>
                  Ver ubicación en Google Maps
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}