// Ejemplo para src/pages/institucional/Historia.jsx
import usePageMeta from "../../components/usePageTitle";

import React from 'react';
import { Seccion, Titulo, Tarjeta, TituloSeccion } from '../../components/UI';
import { Compass, Target, Heart } from 'lucide-react';
import Mantenimiento from '../../components/Mantenimiento';

export default function Historia() {

  const EN_MANTENIMIENTO = true; 

  if (EN_MANTENIMIENTO) {
    return <Mantenimiento pagina="nuestra Historia" />;
  }

  usePageMeta("Nuestra Historia", "El origen y rumbo del Liceo Formador");
  return (
    <div className="pt-20 bg-celeste-400 min-h-screen animate-fade-in">
      
      
      <Seccion>
        <Titulo>El Origen del Viaje</Titulo>
        <div className="max-w-4xl mx-auto bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/20">
          <p className="text-lg text-white leading-relaxed mb-6">
            El Liceo Formador de Exploradores nació del sueño de brindar una educación diferente en Barrancabermeja. 
            Imaginamos un lugar donde los niños no solo aprendieran a memorizar, sino a <strong>explorar, cuestionar y amar</strong> el conocimiento.
          </p>
          <p className="text-lg text-white leading-relaxed">
            Desde nuestra fundación, hemos crecido paso a paso, construyendo no solo aulas, sino una familia comprometida con la excelencia y los valores humanos.
          </p>
        </div>
      </Seccion>

      <Seccion blanca={true}>
        <TituloSeccion titulo="Nuestra Brújula" subtitulo="Lo que nos guía cada día" blanco={false} />
        <div className="grid md:grid-cols-3 gap-8">
            <Tarjeta className="text-center">
                <div className="w-16 h-16 bg-celeste-100 rounded-full flex items-center justify-center mx-auto mb-4 text-celeste-600"><Compass size={32}/></div>
                <h3 className="font-bold text-xl text-celeste-900 mb-2">Misión</h3>
                <p className="text-slate-600">Formar seres humanos integrales, autónomos y felices, capaces de transformar su entorno a través de la investigación y los valores.</p>
            </Tarjeta>
            <Tarjeta className="text-center">
                <div className="w-16 h-16 bg-celeste-100 rounded-full flex items-center justify-center mx-auto mb-4 text-celeste-600"><Target size={32}/></div>
                <h3 className="font-bold text-xl text-celeste-900 mb-2">Visión</h3>
                <p className="text-slate-600">Para el año 2030, seremos reconocidos como la institución líder en educación preescolar y básica primaria en la región.</p>
            </Tarjeta>
            <Tarjeta className="text-center">
                <div className="w-16 h-16 bg-celeste-100 rounded-full flex items-center justify-center mx-auto mb-4 text-celeste-600"><Heart size={32}/></div>
                <h3 className="font-bold text-xl text-celeste-900 mb-2">Valores</h3>
                <p className="text-slate-600">Amor, Respeto, Responsabilidad, Honestidad y Solidaridad son los pilares de nuestra convivencia.</p>
            </Tarjeta>
        </div>
      </Seccion>
    </div>
  );
}