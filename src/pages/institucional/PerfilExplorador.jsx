import React from 'react';
import { Seccion, Titulo, TituloSeccion, Tarjeta, TarjetaCristal } from '../../components/UI';
import usePageTitle from '../../components/usePageTitle'; // Importamos tu hook nuevo
import { Compass, BookOpen, Heart, Smile, Lightbulb, Users } from 'lucide-react';
import Mantenimiento from '../../components/Mantenimiento';
export default function PerfilExplorador() {

  const EN_MANTENIMIENTO = true; 
    
      if (EN_MANTENIMIENTO) {
        return <Mantenimiento pagina="Pefil del Explorador" />;
      }

  // Usamos tu hook para el título de la pestaña
  usePageTitle('Perfil del Explorador', 'Características y valores del estudiante en el Liceo Formador');

  return (
    <div className="pt-20 bg-celeste-400 min-h-screen animate-fade-in">
      
      {/* SECCIÓN 1: INTRODUCCIÓN */}
      <Seccion>
        <div className="max-w-4xl mx-auto text-center">
          <Titulo>Nuestros Protagonistas</Titulo>
          <p className="text-xl text-white/90 leading-relaxed font-light mb-8">
            En el Liceo Formador, no solo educamos alumnos; formamos <strong className="font-bold text-white">exploradores de la vida</strong>. 
            Niños y niñas capaces de trazar su propio camino con inteligencia y corazón.
          </p>
        </div>
      </Seccion>

      {/* SECCIÓN 2: PERFIL DEL ESTUDIANTE (Tarjetas Blancas) */}
      <Seccion blanca={true} className="rounded-t-[3rem]">
        <TituloSeccion 
          titulo="El Perfil del Estudiante" 
          subtitulo="Rasgos que identifican a un verdadero Explorador" 
          blanco={false} 
        />
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Rasgo 1 */}
          <Tarjeta className="text-center group">
            <div className="w-20 h-20 bg-celeste-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-celeste-500 transition-colors duration-300">
              <Compass size={40} className="text-celeste-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-bold text-xl text-celeste-900 mb-3">Líder Autónomo</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Toma decisiones con responsabilidad. No espera a que le digan qué hacer; propone, actúa y asume retos con valentía.
            </p>
          </Tarjeta>

          {/* Rasgo 2 */}
          <Tarjeta className="text-center group">
            <div className="w-20 h-20 bg-celeste-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-celeste-500 transition-colors duration-300">
              <Lightbulb size={40} className="text-celeste-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-bold text-xl text-celeste-900 mb-3">Pensador Crítico</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              No traga entero. Investiga, cuestiona y construye su propio conocimiento a través de la curiosidad y la ciencia.
            </p>
          </Tarjeta>

          {/* Rasgo 3 */}
          <Tarjeta className="text-center group">
            <div className="w-20 h-20 bg-celeste-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-celeste-500 transition-colors duration-300">
              <Heart size={40} className="text-celeste-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-bold text-xl text-celeste-900 mb-3">Ser Humano Feliz</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Entiende que el éxito no sirve sin felicidad. Es empático, solidario y respeta la naturaleza y a sus compañeros.
            </p>
          </Tarjeta>
        </div>
      </Seccion>

      {/* SECCIÓN 3: PERFIL DEL DOCENTE (Fondo Azul con Iconos) */}
      <Seccion>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <TituloSeccion titulo="El Docente Guía" blanco={true} />
            <p className="text-white/90 text-lg mb-6 leading-relaxed">
              Nuestros profesores no son simples transmisores de información. Son <strong>co-pilotos</strong> en la aventura del aprendizaje.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-3 rounded-lg"><BookOpen className="text-white" size={24}/></div>
                <div>
                  <h4 className="font-bold text-white text-lg">Pedagogía del Amor</h4>
                  <p className="text-celeste-100 text-sm">Enseñan desde el afecto, creando vínculos seguros.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-3 rounded-lg"><Users className="text-white" size={24}/></div>
                <div>
                  <h4 className="font-bold text-white text-lg">Innovador Constante</h4>
                  <p className="text-celeste-100 text-sm">Se capacitan continuamente en nuevas metodologías.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-3 rounded-lg"><Smile className="text-white" size={24}/></div>
                <div>
                  <h4 className="font-bold text-white text-lg">Modelo a Seguir</h4>
                  <p className="text-celeste-100 text-sm">Educan con el ejemplo, siendo coherentes y éticos.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta decorativa */}
          <TarjetaCristal className="text-center p-10 transform md:rotate-2 hover:rotate-0 transition-transform duration-500 shadow-2xl">
            <h3 className="text-2xl font-black mb-4 italic">"Educar es dejar huella en el corazón de un niño"</h3>
            <p className="opacity-80">— Lema Docente Liceísta</p>
          </TarjetaCristal>
        </div>
      </Seccion>
    </div>
  );
}