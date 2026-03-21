import React from 'react';
import { Compass, Target, Heart, Star, Shield, Users, Lightbulb, Map, Rocket, ArrowDown, BookOpen } from 'lucide-react';
import Mantenimiento from '../../components/Mantenimiento';
import usePageTitle from "../../components/usePageTitle";
import { TituloSeccion } from '../../components/UI';
import { useNavigate } from 'react-router-dom';

export default function Historia() {
  usePageTitle("Nuestra Historia y Filosofía | Liceo Formador");
  const navigate = useNavigate();

  const EN_MANTENIMIENTO = false; 

  if (EN_MANTENIMIENTO) {
    return <Mantenimiento pagina="nuestra Historia" />;
  }

  return (
    <div className="pt-20 bg-white min-h-screen font-sans overflow-x-hidden selection:bg-celeste-200 selection:text-celeste-900">
      
     
      <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden shadow-2xl">
        <div className="absolute inset-0 group">
            <img 
            src="/fotos=galeria/48.jpg" 
            alt="Niños felices explorando" 
            className="w-full h-full object-cover transition-transform duration-[15s] ease-out scale-105 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-celeste-900/80 to-blue-900/60 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg border border-white/20 text-celeste-100 font-bold text-sm tracking-[0.2em] uppercase px-6 py-3 rounded-full mb-8 shadow-xl">
             <Compass size={16} className="animate-spin-slow"/> Desde nuestros inicios
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl leading-tight tracking-tight">
            Donde nacen los <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-celeste-200 via-white to-celeste-200">Grandes Exploradores</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-light drop-shadow-lg max-w-3xl mx-auto leading-relaxed">
            Conoce la historia, la vocación y el corazón que impulsa cada día al Liceo Formador.
          </p>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
            <ArrowDown size={32} />
          </div>
        </div>
      </section>


      <section className="py-24 bg-white">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* Texto (Izquierda) */}
            <div>
               <TituloSeccion titulo="El Despertar de un Sueño" subtitulo="Nuestras Raíces" blanco={false} />
               <div className="prose prose-lg text-slate-600 leading-relaxed space-y-6 mt-8 font-light">
                <p className="text-2xl text-celeste-700 font-medium leading-tight">
                  "No queríamos un colegio para llenar cabezas, sino para encender corazones."
                </p>
                <p>
                  El <strong>Liceo Formador de Exploradores</strong> nació en Barrancabermeja como respuesta a una necesidad urgente: devolverle a la educación su magia. Soñábamos con un lugar donde los niños no tuvieran miedo a equivocarse.
                </p>
                <p>
                  Empezamos con pocas mesas, pero con una convicción gigante. Queríamos que aprender fuera sinónimo de moverse, tocar, experimentar y reír. Hoy, esa pequeña semilla se ha convertido en un bosque vibrante de conocimiento.
                </p>
              </div>
            </div>
            
            
            <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl group">
                <img 
                    src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=800"
                    alt="Niña curiosa pintando" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-celeste-100 rounded-tl-[3rem] z-[-1]"></div>
            </div>
          </div>
        </div>
      </section>


     {/* seccion 2 */}
      <section className="py-24 bg-celeste-50/80 relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-64 h-64 bg-celeste-100 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
        
        <div className="container mx-auto max-w-6xl px-6 relative z-10">
          <div className="text-center mb-16">
             <TituloSeccion titulo="El Modelo Explorador" subtitulo="¿Cómo aprendemos aquí?" blanco={false} className="mx-auto"/>
             <p className="text-xl text-slate-500 mt-6 max-w-3xl mx-auto font-light">
                Nuestro método se basa en la experiencia directa. Aquí el protagonista no es el pizarrón, es el estudiante.
             </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             {/* Columna 1 */}
             <ModeloCard 
                icono={Map} 
                titulo="Aprender Haciendo" 
                desc="La teoría cobra vida en el laboratorio, el taller de arte y el patio de juegos. Tocamos para entender."
                color="text-blue-500" bg="bg-blue-100"
             />
             {/* Columna 2 */}
             <ModeloCard 
                icono={Heart} 
                titulo="Inteligencia Emocional" 
                desc="Validamos cada emoción. Enseñamos a gestionar la frustración, a ser empáticos y a construir amistades sanas."
                color="text-pink-500" bg="bg-pink-100"
             />
             {/* Columna 3 */}
             <ModeloCard 
                icono={Rocket} 
                titulo="Innovación Creativa" 
                desc="Fomentamos el pensamiento crítico y la curiosidad. No damos respuestas, enseñamos a hacer las preguntas correctas."
                color="text-purple-500" bg="bg-purple-100"
             />
          </div>
        </div>
      </section>


      {/* seccion 3 */}
      <section className="py-24 bg-white px-6">
        <div className="container mx-auto max-w-6xl">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">Nuestra Brújula Institucional</h2>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto font-light leading-relaxed">
              El norte que guía cada decisión, cada clase y cada abrazo en nuestro Liceo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
              
              {/* TARJETA MISIÓN (Clara) */}
              <div className="bg-slate-50 rounded-[3rem] p-10 lg:p-14 shadow-lg hover:shadow-xl transition-shadow border border-slate-100 flex flex-col h-full">
                  <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                    <Target size={40} className="text-celeste-600"/>
                  </div>
                  <h3 className="font-black text-3xl mb-6 text-slate-800 tracking-tight">Nuestra Misión</h3>
                  <p className="text-lg leading-relaxed text-slate-600 font-light flex-grow">
                    Formar seres humanos integrales, autónomos y felices. Transformamos el entorno a través de la investigación, la exploración constante y la práctica inquebrantable de valores humanos. Somos el faro que guía sus primeros pasos.
                  </p>
              </div>

              {/* TARJETA VISIÓN  */}
              <div className="bg-celeste-600 rounded-[3rem] p-10 lg:p-14 shadow-xl hover:shadow-2xl transition-shadow text-white flex flex-col h-full relative overflow-hidden">
                  {/* Decoración de fondo */}
                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-celeste-500 rounded-tl-full opacity-50"></div>
                  
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="w-20 h-20 bg-celeste-700 rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                        <Compass size={40} className="text-celeste-200"/>
                    </div>
                    <h3 className="font-black text-3xl mb-6 tracking-tight text-white">Nuestra Visión</h3>
                    <p className="text-lg leading-relaxed text-celeste-100 font-light flex-grow">
                        Para el año 2030, seremos el referente líder en educación preescolar y básica primaria en la región, reconocidos por un modelo pedagógico innovador, espacios seguros y excelencia formativa y humana.
                    </p>
                  </div>
              </div>
          </div>
        </div>
      </section>

      {/* seccion 4 */}
      <section className="py-24 bg-slate-50 px-6 border-t border-slate-100">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-6">El ADN del Explorador</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
              Estos valores no son solo palabras; son las herramientas que llevan nuestros estudiantes en su mochila de vida.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
             <ValorCard icono={Heart} titulo="Amor" desc="El motor de todo lo que hacemos." color="text-pink-500" bg="bg-pink-50"/>
             <ValorCard icono={Shield} titulo="Respeto" desc="A uno mismo, a los demás y al entorno." color="text-blue-500" bg="bg-blue-50"/>
             <ValorCard icono={Star} titulo="Responsabilidad" desc="Compromiso con nuestras acciones." color="text-yellow-600" bg="bg-yellow-50"/>
             <ValorCard icono={Lightbulb} titulo="Honestidad" desc="Transparencia y verdad siempre." color="text-purple-500" bg="bg-purple-50"/>
             <ValorCard icono={Users} titulo="Solidaridad" desc="Ayudar y trabajar en equipo." color="text-green-500" bg="bg-green-50"/>
             {/* Tarjeta extra para completar el grid de 3x2 */}
             <div className="bg-celeste-100 rounded-3xl p-6 flex items-center justify-center text-center border border-celeste-200">
                <p className="text-celeste-700 font-bold text-lg flex items-center gap-2">
                   <BookOpen size={20}/> ¡Y muchos más!
                </p>
             </div>
          </div>

        </div>
      </section>

    </div>
  );
}



const ModeloCard = ({ icono: Icono, titulo, desc, color, bg }) => (
   <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
      <div className={`w-16 h-16 ${bg} rounded-2xl flex items-center justify-center mb-6 ${color}`}>
         <Icono size={32}/>
      </div>
      <h4 className="text-2xl font-bold text-slate-800 mb-4">{titulo}</h4>
      <p className="text-slate-600 leading-relaxed font-light">{desc}</p>
   </div>
);

const ValorCard = ({ icono: Icono, titulo, desc, color, bg }) => (
   <div className="bg-white rounded-3xl p-6 flex items-start gap-4 shadow-sm border border-slate-100 hover:shadow-md transition-all hover:border-celeste-200 group">
      <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${color}`}>
         <Icono size={24}/>
      </div>
      <div>
         <h4 className="text-xl font-bold text-slate-800 mb-1">{titulo}</h4>
         <p className="text-sm text-slate-500 font-light leading-snug">{desc}</p>
      </div>
   </div>
);