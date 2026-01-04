import React from 'react';
import { BookOpen, Brain, Clock, Award, Shapes, Microscope, Globe, Calculator, Palette } from 'lucide-react';
import { TituloSeccion } from '../components/UI';

export default function GestionAcademica() {

  const areas = [
    { nombre: "Matemáticas", icono: Calculator, color: "text-blue-500", bg: "bg-blue-50" },
    { nombre: "Humanidades (Español/Inglés)", icono: BookOpen, color: "text-red-500", bg: "bg-red-50" },
    { nombre: "Ciencias Naturales", icono: Microscope, color: "text-green-500", bg: "bg-green-50" },
    { nombre: "Ciencias Sociales", icono: Globe, color: "text-yellow-500", bg: "bg-yellow-50" },
    { nombre: "Educación Artística", icono: Palette, color: "text-purple-500", bg: "bg-purple-50" },
  ];

  return (
    <div className="animate-fade-in bg-slate-50 min-h-screen pb-20 pt-10">
      <div className="container mx-auto px-6">
        
        <TituloSeccion 
          titulo="Gestión Académica" 
          subtitulo="Un modelo pedagógico centrado en la exploración, la investigación y el desarrollo humano." 
        />

        {/* 1. METODOLOGÍA (Card Principal) */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl mb-12 border-l-8 border-cyan-500 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-5">
              <Brain size={150} className="text-cyan-900"/>
           </div>
           <div className="relative z-10 max-w-3xl">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Nuestro Enfoque: Aprendizaje Significativo</h3>
              <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                En el Liceo, no solo transmitimos información; enseñamos a pensar. Nuestro modelo pedagógico invita al estudiante a ser protagonista: <strong>observar, indagar, descubrir y crear</strong>.
              </p>
              <div className="flex flex-wrap gap-4">
                 <span className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full font-bold text-sm">🔬 Investigación en el aula</span>
                 <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full font-bold text-sm">🎨 Lúdica y Juego</span>
                 <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-bold text-sm">🌱 Proyectos Transversales</span>
              </div>
           </div>
        </div>

        {/* 2. NIVELES EDUCATIVOS (Dos columnas) */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
           {/* PREESCOLAR */}
           <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-100 group hover:border-pink-200 transition-colors">
              <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 mb-6 group-hover:scale-110 transition-transform">
                 <Shapes size={32}/>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Preescolar</h3>
              <p className="text-slate-500 text-sm mb-4">
                Prejardín • Jardín • Transición
              </p>
              <p className="text-slate-600 leading-relaxed">
                Una etapa mágica donde el juego es la herramienta principal. Fortalecemos la motricidad, la dimensión socio-afectiva y los primeros pasos en la lectoescritura.
              </p>
           </div>

           {/* PRIMARIA */}
           <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-100 group hover:border-blue-200 transition-colors">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                 <BookOpen size={32}/>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Básica Primaria</h3>
              <p className="text-slate-500 text-sm mb-4">
                Grados: 1° a 5°
              </p>
              <p className="text-slate-600 leading-relaxed">
                Consolidamos las competencias básicas. Fomentamos el pensamiento crítico, la resolución de problemas matemáticos y el amor por la lectura y la ciencia.
              </p>
           </div>
        </div>

        {/* 3. HORARIOS Y EVALUACIÓN (Grid mixto) */}
        <div className="grid lg:grid-cols-3 gap-8">
           
           {/* Horarios */}
           <div className="lg:col-span-1 bg-slate-900 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-6">
                    <Clock className="text-cyan-400" size={28}/>
                    <h3 className="text-xl font-bold">Jornada Única</h3>
                 </div>
                 <div className="space-y-4">
                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                       <p className="text-cyan-300 text-xs font-bold uppercase mb-1">Entrada</p>
                       <p className="text-2xl font-bold">6:30 AM</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                       <p className="text-cyan-300 text-xs font-bold uppercase mb-1">Salida</p>
                       <p className="text-2xl font-bold">2:00 PM</p>
                    </div>
                 </div>
                 <p className="text-slate-400 text-xs mt-6 italic">
                    *Incluye descansos y tiempo de almuerzo supervisado.
                 </p>
              </div>
              {/* Decoración */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-500 rounded-full blur-3xl opacity-20"></div>
           </div>

           {/* Áreas y Evaluación */}
           <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-md border border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                 <Award className="text-orange-500"/> Sistema de Evaluación
              </h3>
              <p className="text-slate-600 mb-6">
                 Nuestro sistema de evaluación es integral, continuo y formativo. Valoramos el proceso, no solo el resultado final.
              </p>
              
              {/* Escala de Valoración */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-8">
                 <div className="p-3 bg-green-50 rounded-xl border border-green-100">
                    <span className="block text-green-700 font-black text-lg">4.6 - 5.0</span>
                    <span className="text-xs text-green-600 font-bold">SUPERIOR</span>
                 </div>
                 <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                    <span className="block text-blue-700 font-black text-lg">4.0 - 4.5</span>
                    <span className="text-xs text-blue-600 font-bold">ALTO</span>
                 </div>
                 <div className="p-3 bg-yellow-50 rounded-xl border border-yellow-100">
                    <span className="block text-yellow-700 font-black text-lg">3.0 - 3.9</span>
                    <span className="text-xs text-yellow-600 font-bold">BÁSICO</span>
                 </div>
                 <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                    <span className="block text-red-700 font-black text-lg">1.0 - 2.9</span>
                    <span className="text-xs text-red-600 font-bold">BAJO</span>
                 </div>
              </div>

              <h4 className="font-bold text-slate-700 mb-4 text-sm uppercase tracking-wide">Áreas Fundamentales</h4>
              <div className="flex flex-wrap gap-3">
                 {areas.map((area, i) => (
                    <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-lg ${area.bg}`}>
                       <area.icono size={16} className={area.color}/>
                       <span className={`text-xs font-bold ${area.color.replace('text', 'text-slate')}`}>{area.nombre}</span>
                    </div>
                 ))}
              </div>
           </div>

        </div>

      </div>
    </div>
  );
}