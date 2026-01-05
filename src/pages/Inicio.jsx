import liceo from "../images/liceo1.png"; 
import React from 'react';
import SEO from '../components/SEO';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Monitor, FileText, Users, Calendar, ArrowRight, CheckCircle, Facebook, Instagram, CreditCard } from 'lucide-react';
import { TituloSeccion, TarjetaCristal } from '../components/UI';
import { noticiasData } from '../data/noticias'; 
import { useNavigate } from 'react-router-dom';


const IconoTikTok = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export default function Inicio() {
  const navigate = useNavigate();
  
  //logica de noticias// 
  const noticiasSeguras = noticiasData || [];
  const obtenerValorFecha = (fechaStr) => {
    const meses = {
      'ENE': 0, 'FEB': 1, 'MAR': 2, 'ABR': 3, 'MAY': 4, 'JUN': 5,
      'JUL': 6, 'AGO': 7, 'SEP': 8, 'OCT': 9, 'NOV': 10, 'DIC': 11
    };
    try {
      const [dia, mes] = fechaStr.split(' ');
      return (meses[mes.toUpperCase()] || 0) * 100 + parseInt(dia);
    } catch (e) {
      return 0;
    }
  };
  const noticiasOrdenadas = [...noticiasSeguras].sort((a, b) => {
    return obtenerValorFecha(b.fecha) - obtenerValorFecha(a.fecha);
  });
  const noticiasDestacadas = noticiasOrdenadas.slice(0, 3);

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

  return (
    <div className="animate-fade-in relative">
      <SEO 
        title="Inicio" 
        description="Liceo Formador de Exploradores: El mejor colegio preescolar y primaria en Barrancabermeja. Educación integral, innovadora y valores. ¡Matrículas Abiertas!"
        keywords="Liceo Formador de Exploradores, colegio barrancabermeja, colegio .edu, mejor preescolar santander, matriculas 2026, educacion primaria"
      />

      {/* widget de redes */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end animate-fade-in">
        <div className="bg-cyan-600 text-white text-[10px] font-bold py-3 px-1 rounded-l-md shadow-lg mb-1 cursor-default" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
           SÍGUENOS
        </div>

        <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-l-xl border-y border-l border-slate-200 p-2 flex flex-col gap-3">
            <a href="https://www.facebook.com/share/1BsV5q8LH2/" target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-sm" title="Síguenos en Facebook"><Facebook size={20} /></a>
            <a href="https://www.instagram.com/liceoformadordexploradores?igsh=bGRwdnlsd2k2cjhl" target="_blank" rel="noopener noreferrer" className="p-2 bg-pink-50 text-pink-600 rounded-full hover:bg-pink-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-sm" title="Síguenos en Instagram"><Instagram size={20} /></a>
            <a href="https://www.tiktok.com/@liceo.formador.de?_r=1&_t=ZS-91Ky5fZOoVj" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 text-slate-800 rounded-full hover:bg-black hover:text-white transition-all duration-300 hover:scale-110 shadow-sm" title="Síguenos en TikTok"><IconoTikTok size={20} /></a>
        </div>
      </div>


      <section className="relative h-[500px] md:h-[600px] lg:h-[750px] bg-slate-900 group">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, A11y]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true, dynamicBullets: true }}
          loop={true}
          autoplay={{
            delay: 28000, 
            disableOnInteraction: false,
          }}
          className="h-full w-full swiper-hero"
        >

          <SwiperSlide className="relative overflow-hidden flex items-center justify-center bg-slate-900">
            

            <div className="absolute inset-0 z-0">
               <video 
                 src="/fotos-inicio/inicio.mp4"

                 className="w-full h-full object-cover blur-2xl scale-110 opacity-60" 
                 autoPlay muted loop playsInline
               />

               <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* video principal */}
            <div className="relative z-10 h-full w-full flex items-center justify-center p-4 md:p-8">
                <video 
                  src="/fotos-inicio/inicio.mp4"
                  
                  className="w-auto h-auto max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-white/10"
                  autoPlay muted loop playsInline
                />
            </div>
            
          
            <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center text-center text-white p-4 pointer-events-none animate-fade-in-up">
              <h2 className="text-2xl md:text-4xl font-black drop-shadow-lg uppercase bg-cyan-900/80 px-6 py-2 rounded-full inline-block backdrop-blur-sm border border-cyan-500/30">
                ¡Matrículas Abiertas 2026!
              </h2>
            </div>
          </SwiperSlide>

          {/* diapositiva 2 */}
          <SwiperSlide className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-transparent z-10"></div>
            <img src={liceo} alt="Fachada Colegio" className="w-full h-full object-cover object-top" />
            <div className="absolute bottom-0 left-0 z-20 p-8 md:p-16 text-white max-w-3xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg leading-tight">Formando líderes del futuro</h2>
              <p className="text-lg md:text-xl opacity-90 drop-shadow-md mb-6">Una educación integral basada en valores, ciencia y exploración.</p>
            </div>
          </SwiperSlide>

          

        </Swiper>

        <style jsx global>{`
          .swiper-hero .swiper-button-next,
          .swiper-hero .swiper-button-prev {
            color: white;
            background-color: rgba(0,0,0,0.3);
            padding: 30px 20px;
            border-radius: 10px;
            transition: all 0.3s ease;
            opacity: 0;
          }
          .group:hover .swiper-button-next,
          .group:hover .swiper-button-prev {
            opacity: 1;
          }
          .swiper-hero .swiper-button-next:hover,
          .swiper-hero .swiper-button-prev::hover {
            background-color: rgba(6, 182, 212, 0.8);
          }
          .swiper-hero .swiper-button-next::after,
          .swiper-hero .swiper-button-prev::after {
            font-size: 24px;
            font-weight: bold;
          }
          .swiper-hero .swiper-pagination-bullet {
            background: white;
            opacity: 0.5;
            width: 10px;
            height: 10px;
          }
          .swiper-hero .swiper-pagination-bullet-active {
            opacity: 1;
            background: #06b6d4;
            width: 20px;
            border-radius: 5px;
          }
        `}</style>
      </section>
      


       {/* accesos rapidos */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {accesosRapidos.map((e, i) => (
              <div key={i} onClick={e.accion} className="group cursor-pointer relative h-64 rounded-xl overflow-hidden shadow-lg border border-slate-200 hover:-translate-y-2 transition-all duration-300">
                <div className="absolute inset-0">
                   <img src={e.imagen} alt={e.titulo} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                </div>
                <div className="relative z-10 h-full flex flex-col items-center justify-end pb-8 px-4">
                  <h3 className="text-white font-bold text-lg mb-1 drop-shadow-md group-hover:text-cyan-300 transition-colors">{e.titulo}</h3>
                  <p className="text-slate-200 text-xs font-medium opacity-90 group-hover:text-white transition-colors">{e.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOTICIAS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
             <div className="text-left">
               <h2 className="text-3xl font-bold text-slate-800 uppercase tracking-tight">Actualidad Institucional</h2>
               <div className="h-1.5 w-24 bg-cyan-500 rounded-full mt-4 shadow-sm"></div>
             </div>
             <button onClick={() => navigate('/noticias')} className="hidden md:flex items-center gap-2 text-cyan-600 font-bold hover:translate-x-1 transition-transform">
               Ver todas las noticias <ArrowRight size={20}/>
             </button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {noticiasDestacadas.map((item) => (
               <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group border border-slate-100">
                 <div className="h-48 overflow-hidden relative">
                   <img src={item.imagen} alt={item.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   <div className="absolute top-4 left-4 bg-white/95 text-slate-800 text-xs font-extrabold px-3 py-1 rounded-full shadow-sm border border-slate-200">
                     {item.fecha}
                   </div>
                 </div>
                 <div className="p-6">
                   <h3 className="font-bold text-lg text-slate-800 mb-3 leading-tight group-hover:text-cyan-600 transition-colors">{item.titulo}</h3>
                   <p className="text-slate-500 text-sm mb-4 line-clamp-3">{item.resumen}</p>
                   <button onClick={() => verDetalle(item.id)} className="text-cyan-600 font-bold text-sm hover:underline">Leer más →</button>
                 </div>
               </div>
            ))}
          </div>
          <button onClick={() => navegarA('noticias')} className="md:hidden mt-8 w-full py-3 border border-cyan-500 text-cyan-600 font-bold rounded-xl hover:bg-cyan-50">
            Ver todas las noticias
          </button>
        </div>
      </section>

      {/* Sede */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <TituloSeccion titulo="Nuestra Sede" />
          
          <div className="max-w-5xl mx-auto"> 
             {/* tarjeta grande*/}
             <TarjetaCristal className="flex flex-col md:flex-row overflow-hidden group shadow-xl">
                
                {/* Imagen Sede */}
                <div className="md:w-1/2 h-64 md:h-auto overflow-hidden relative">
                  <img src="/fotos-inicio/7.jpeg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Sede Única" />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
                  </div>
                </div>

                {/* informacion */}
                <div className="p-8 md:w-1/2 flex flex-col justify-center">
                  <h3 className="font-bold text-2xl text-slate-800 mb-2">Sede Única Integral</h3>
                  <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                    Contamos con un espacio unificado donde acompañamos el proceso educativo completo de tus hijos en un ambiente seguro y familiar.
                  </p>
                  
                  {/* Lista de Niveles */}
                  <div className="space-y-6 bg-white/50 p-4 rounded-xl border border-slate-100">
                    <div>
                        <h4 className="font-bold text-cyan-700 mb-2 flex items-center gap-2 text-lg">
                          <CheckCircle className="text-cyan-500" size={20}/> Preescolar
                        </h4>
                        <ul className="text-sm text-slate-600 pl-9 list-disc space-y-1">
                          <li>Prejardín</li>
                          <li>Jardín</li>
                          <li>Transición</li>
                        </ul>
                    </div>
                    <div className="border-t border-slate-200 pt-4">
                        <h4 className="font-bold text-cyan-700 mb-2 flex items-center gap-2 text-lg">
                          <CheckCircle className="text-cyan-500" size={20}/> Básica Primaria
                        </h4>
                        <p className="text-sm text-slate-600 pl-9 font-medium">
                          Grados 1° a 5°
                        </p>
                    </div>
                  </div>

                  {/* ubi google maps */}
                  <button 
                    onClick={() => window.open('https://maps.app.goo.gl/34E1fQJKzC72Rewc7', '_blank')}
                    className="mt-8 text-cyan-600 font-bold text-sm uppercase tracking-wide hover:underline text-left flex items-center gap-2"
                  >
                    Ver Ubicación en Mapa <ArrowRight size={16}/>
                  </button>
                </div>

             </TarjetaCristal>
          </div>
        </div>
      </section>

    </div>
  );
}