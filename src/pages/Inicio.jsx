import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { 
  Monitor, BookOpen, Calendar, User, 
  ArrowRight, Shield, Heart, Smile, CheckCircle, MapPin, Facebook,Instagram,FileText,CreditCard
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
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
          imagen: "https://images.unsplash.com/vector-1739806650988-82dad033d67d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFjY2VzbyUyMHBhZHJlcyUyMHklMjBhbHVtbm9zfGVufDB8fDB8fHww",
          icono: Monitor,
          accion: () => window.open('https://e.plataformaintegra.net/liceoexploradores/', '_blank')
        },
        { 
          titulo: "Admisiones", 
          descripcion: "Requisitos y fechas", 
          imagen: "https://plus.unsplash.com/premium_vector-1731582098341-1f9a62c019f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGFzc3xlbnwwfHwwfHx8MA%3D%3D",
          icono: FileText,
          accion: () => navigate('/admisiones')
        },
        { 
          titulo: "Calendario", 
          descripcion: "Cronograma 2026",
          imagen: "https://images.unsplash.com/vector-1742138990517-eb682a268eb3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhbGVuZGFyaW98ZW58MHx8MHx8fDA%3D",
          icono: Calendar,
          accion: () => navigate('/calendario')
        },
        { 
          titulo: "Pagos en Línea", 
          descripcion: "PSE y Matrículas", 
          imagen: "data:image/png;base64,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", 
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

      <section className="relative h-[550px] md:h-[650px] lg:h-[720px] pb-16 bg-whrite group">
              <Swiper
                modules={[Navigation, Pagination, Autoplay, A11y]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={true}
                pagination={{ clickable: true, dynamicBullets: true }}
                loop={true}
                autoplay={{ delay: 28000, disableOnInteraction: false }}
                className="h-full w-full swiper-hero"
              >
                {/* Slide 1: Video */}
                <SwiperSlide className="relative overflow-hidden flex items-center justify-center ">
                   <div className="absolute inset-0 z-0">
                      <video src="/fotos-inicio/inicio.mp4" className="w-full h-full object-cover blur-2xl scale-110 opacity-60" autoPlay muted loop playsInline />
                      <div className="absolute inset-0 bg-whrite-100/60"></div>
                   </div>
                   <div className="relative z-90 h-full w-full flex items-center justify-center p-4 md:p-8">
                       <video src="/fotos-inicio/inicio.mp4" className="w-auto h-auto max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-white/20" autoPlay muted loop playsInline />
                   </div>
                   <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center text-center text-white p-4 pointer-events-none animate-fade-in-up">
                     <h2 className="text-2xl md:text-4xl font-black drop-shadow-lg uppercase bg-celeste-900/80 px-6 py-2 rounded-full inline-block backdrop-blur-sm border border-celeste-400/30">
                       ¡Matrículas Abiertas 2026!
                     </h2>
                   </div>
                </SwiperSlide>
      
              
              </Swiper>
      
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
                className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="absolute inset-0">
                  <img src={item.imagen} alt={item.titulo} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-celeste-900/50 group-hover:bg-celeste-800/50 transition-colors"></div>
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
      <section className="py-24 bg-celeste-400 text-white relative overflow-hidden">
        {/* Elemento decorativo de fondo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/90 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Imagen Institucional */}
            <div className="relative">
              <div className="absolute -inset-4 bg-celeste-500/60 rounded-3xl transform rotate-3"></div>
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
      <section className="py-20 bg-celeste-500">
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