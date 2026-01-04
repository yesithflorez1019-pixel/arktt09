import React from 'react';
import {
  BookOpen,
  Brain,
  Clock,
  Award,
  Shapes,
  Microscope,
  Globe,
  Calculator,
  Palette,
} from 'lucide-react';
import { TituloSeccion } from '../components/UI';

export default function GestionAcademica() {
  const areas = [
    { nombre: 'Matemáticas', icono: Calculator, color: 'text-blue-500', bg: 'bg-blue-50' },
    { nombre: 'Humanidades (Español / Inglés)', icono: BookOpen, color: 'text-red-500', bg: 'bg-red-50' },
    { nombre: 'Ciencias Naturales', icono: Microscope, color: 'text-green-500', bg: 'bg-green-50' },
    { nombre: 'Ciencias Sociales', icono: Globe, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { nombre: 'Educación Artística', icono: Palette, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  return (
    <div className="animate-fade-in bg-slate-50 min-h-screen pt-10 pb-20">
      <div className="container mx-auto px-6">

        <TituloSeccion
          titulo="Gestión Académica"
          subtitulo="Un modelo pedagógico centrado en la exploración y el desarrollo humano."
        />

        {/* Metodología */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl mb-12 border-l-8 border-cyan-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Brain size={150} className="text-cyan-900" />
          </div>

          <div className="relative max-w-3xl">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Aprendizaje Significativo
            </h3>
            <p className="text-slate-600 mb-6 text-lg leading-relaxed">
              En el Liceo formamos estudiantes críticos y curiosos. Promovemos la
              observación, la investigación y la creación como base del aprendizaje.
            </p>

            <div className="flex flex-wrap gap-4">
              <span className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full font-bold text-sm">
                🔬 Investigación
              </span>
              <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full font-bold text-sm">
                🎨 Juego y creatividad
              </span>
              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-bold text-sm">
                🌱 Proyectos transversales
              </span>
            </div>
          </div>
        </div>

        {/* Niveles */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-100 hover:border-pink-200 transition-colors">
            <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 mb-6">
              <Shapes size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">
              Preescolar
            </h3>
            <p className="text-slate-500 text-sm mb-4">
              Prejardín · Jardín · Transición
            </p>
            <p className="text-slate-600 leading-relaxed">
              El juego como eje del aprendizaje. Fortalecemos habilidades motrices,
              socioemocionales y los primeros procesos lectoescritores.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-100 hover:border-blue-200 transition-colors">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
              <BookOpen size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">
              Básica Primaria
            </h3>
            <p className="text-slate-500 text-sm mb-4">
              Grados 1° a 5°
            </p>
            <p className="text-slate-600 leading-relaxed">
              Consolidamos competencias básicas, pensamiento lógico y hábitos de
              lectura, fomentando la autonomía y la curiosidad científica.
            </p>
          </div>
        </div>

        {/* Horarios y evaluación */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="text-cyan-400" size={28} />
                <h3 className="text-xl font-bold">Jornada Única</h3>
              </div>

              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-xl">
                  <p className="text-cyan-300 text-xs font-bold uppercase mb-1">
                    Entrada
                  </p>
                  <p className="text-2xl font-bold">6:30 AM</p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl">
                  <p className="text-cyan-300 text-xs font-bold uppercase mb-1">
                    Salida
                  </p>
                  <p className="text-2xl font-bold">2:00 PM</p>
                </div>
              </div>

              <p className="text-slate-400 text-xs mt-6 italic">
                Incluye descansos y almuerzo supervisado.
              </p>
            </div>

            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-500 rounded-full blur-3xl opacity-20" />
          </div>

          <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-md border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Award className="text-orange-500" />
              Sistema de Evaluación
            </h3>

            <p className="text-slate-600 mb-6">
              La evaluación es continua y formativa, enfocada en el proceso de cada
              estudiante.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-8">
              <div className="p-3 bg-green-50 rounded-xl border border-green-100">
                <span className="block text-green-700 font-black text-lg">
                  4.6 - 5.0
                </span>
                <span className="text-xs text-green-600 font-bold">
                  SUPERIOR
                </span>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                <span className="block text-blue-700 font-black text-lg">
                  4.0 - 4.5
                </span>
                <span className="text-xs text-blue-600 font-bold">
                  ALTO
                </span>
              </div>
              <div className="p-3 bg-yellow-50 rounded-xl border border-yellow-100">
                <span className="block text-yellow-700 font-black text-lg">
                  3.0 - 3.9
                </span>
                <span className="text-xs text-yellow-600 font-bold">
                  BÁSICO
                </span>
              </div>
              <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                <span className="block text-red-700 font-black text-lg">
                  1.0 - 2.9
                </span>
                <span className="text-xs text-red-600 font-bold">
                  BAJO
                </span>
              </div>
            </div>

            <h4 className="font-bold text-slate-700 mb-4 text-sm uppercase">
              Áreas Fundamentales
            </h4>

            <div className="flex flex-wrap gap-3">
              {areas.map((area, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg ${area.bg}`}
                >
                  <area.icono size={16} className={area.color} />
                  <span className="text-xs font-bold text-slate-700">
                    {area.nombre}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
