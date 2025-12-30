//import React from 'react';
import { User, Award, BookOpen, Target } from 'lucide-react';
import { TarjetaCristal, TituloSeccion } from '../components/UI';

export default function Nosotros() {
  return (
    <div className="animate-fade-in pt-12 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Historia / Reseña */}
        <TarjetaCristal className="mb-16 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 relative min-h-[300px]">
               <img src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=800&q=80" alt="Historia" className="absolute inset-0 w-full h-full object-cover" />
               <div className="absolute inset-0 bg-cyan-900/20 mix-blend-overlay"></div>
            </div>
            <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-white/40 backdrop-blur-sm">
              <span className="text-cyan-600 font-bold tracking-widest text-xs uppercase mb-2">Resolución 1504 de 2023</span>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Nuestra Institución</h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                El <strong>Liceo Formador de Exploradores</strong> es una institución educativa legalmente constituida, comprometida con el desarrollo integral de la niñez en Barrancabermeja.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Bajo la dirección de <strong>Elizabeth Salgado Bautista</strong>, trabajamos día a día para ofrecer un ambiente seguro, innovador y lleno de valores.
              </p>
            </div>
          </div>
        </TarjetaCristal>

        {/* Misión y Visión (Del PEI) */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-cyan-500">
            <div className="bg-cyan-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Target className="text-cyan-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Misión Institucional</h3>
            <p className="text-slate-600">
              Formar niños y niñas con un alto sentido de pertenencia, valores éticos y morales, capaces de transformar su entorno a través del conocimiento y la exploración.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-blue-500">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Visión</h3>
            <p className="text-slate-600">
              Ser reconocidos como una institución líder en educación preescolar y básica primaria, destacándonos por nuestra excelencia académica y calidad humana.
            </p>
          </div>
        </div>

        {/* Equipo Directivo */}
        <TituloSeccion titulo="Gestión Directiva" subtitulo="Liderazgo con propósito y corazón." />
        
        <div className="flex justify-center">
          <TarjetaCristal className="text-center p-8 max-w-sm border-b-4 border-b-cyan-500">
            <div className="w-32 h-32 mx-auto rounded-full bg-slate-100 border-4 border-white shadow-inner flex items-center justify-center mb-6">
              <User className="w-12 h-12 text-slate-400" />
            </div>
            <h4 className="font-bold text-xl text-slate-800">Elizabeth Salgado Bautista</h4>
            <p className="text-sm text-cyan-600 font-bold uppercase tracking-wide mt-1">Directora General</p>
            <p className="text-xs text-slate-400 mt-4 italic">
              "Educar es sembrar en el corazón de los niños la semilla del futuro."
            </p>
          </TarjetaCristal>
        </div>
      </div>
    </div>
  );
}