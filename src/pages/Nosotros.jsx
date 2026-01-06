import React from 'react';
import {
  BookOpen,
  Leaf,
  Zap,
  BarChart3,
  TreePine,
  Users,
  Microscope,
  Map,
  Smile,
  Sun,
  Heart,
  Award,
  Star
} from 'lucide-react';
import { TituloSeccion } from '../components/UI';
import SEO from '../components/SEO';

export default function Nosotros() {
  return (
    <div className="animate-fade-in bg-white min-h-screen font-sans text-slate-600">
      <SEO
        title="Quiénes Somos - Pioneros en Energía Solar"
        description="Conoce la historia del Liceo Formador de Exploradores. Somos pioneros en Barrancabermeja con nuestro sistema de energía solar y modelo pedagógico innovador."
      />

      {/* Header con Imagen de Fondo Parallax o Color Sólido */}
      <section className="bg-celeste-900 py-20 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative max-w-4xl mx-auto z-10">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              "Observando e indagando <br />
              <span className="text-celeste-300">los exploradores</span> se van formando"
            </h1>
            <div className="h-1 w-24 bg-white/30 mx-auto rounded-full"></div>
          </div>
      </section>

      {/* Historia */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute top-4 left-4 w-full h-full border-2 border-celeste-100 rounded-3xl -z-10 transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
            <img
              src="/fotos-galeria/13.jpeg"
              alt="Historia del Liceo"
              className="rounded-3xl shadow-xl w-full object-cover h-[400px]"
            />
          </div>

          <div>
            <TituloSeccion titulo="Nuestra Historia" centrado={false} />
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed text-justify">
              <p>
                Todo comenzó en <span className="text-celeste-700 font-bold">2016</span> con un gran sueño y un corazón lleno de ilusión. En 2017 abrimos nuestras puertas con 65 estudiantes, sembrando la primera semilla de lo que hoy es una gran familia.
              </p>
              <p>
                Para el <span className="text-celeste-700 font-bold">2020</span>, gracias al apoyo incondicional de las familias, ampliamos nuestra oferta a la Básica Primaria. Hoy, bajo la Resolución 1504, somos un referente de calidad humana y académica en el barrio Las Granjas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Energía solar (Diferenciador) */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Texto */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full mb-6 font-bold text-sm">
                <Leaf size={16} /> Colegio Ecológico
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Pioneros en <span className="text-green-600">Energía Solar</span>
              </h2>

              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Somos de las primeras instituciones educativas en implementar un sistema fotovoltaico propio. No solo ahorramos energía, enseñamos a nuestros estudiantes a amar y cuidar el planeta con el ejemplo diario.
              </p>

              <div className="grid grid-cols-3 gap-4">
                {[
                    { icon: Zap, val: '12.5', label: 'MWh Gen', color: 'text-yellow-500' },
                    { icon: TreePine, val: '450', label: 'Árboles', color: 'text-green-600' },
                    { icon: BarChart3, val: '8.3', label: 'Ton CO2', color: 'text-blue-500' }
                ].map((item, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-center hover:-translate-y-1 transition-transform">
                        <item.icon className={`mx-auto ${item.color} mb-2`} size={24} />
                        <div className="font-black text-xl text-slate-800">{item.val}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase">{item.label}</div>
                    </div>
                ))}
              </div>
            </div>

            {/* Imagen */}
            <div className="relative order-1 lg:order-2">
              <div className="absolute -inset-4 bg-green-500/10 rounded-full blur-2xl -z-10" />
              <img
                src="/fotos-galeria/47.png"
                alt="Paneles Solares"
                className="rounded-3xl shadow-lg w-full object-cover h-[400px] border-4 border-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-20 container mx-auto px-6">
        <TituloSeccion
          titulo="Nuestro Horizonte"
          subtitulo="La brújula que guía nuestro camino educativo"
        />

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-10">
          <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-lg hover:shadow-xl transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-celeste-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <Award size={40} className="text-celeste-600 mb-6 relative z-10" />
            <h3 className="text-2xl font-bold text-slate-800 mb-4 relative z-10">Misión</h3>
            <p className="text-slate-600 text-justify relative z-10 leading-relaxed">
              Ofrecemos educación de calidad en jornada única. Enriquecemos saberes invitando a <strong>observar, indagar y descubrir</strong> para consolidar el conocimiento mediante la lúdica y la experiencia significativa.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-lg hover:shadow-xl transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <Star size={40} className="text-orange-500 mb-6 relative z-10" />
            <h3 className="text-2xl font-bold text-slate-800 mb-4 relative z-10">Visión</h3>
            <p className="text-slate-600 text-justify relative z-10 leading-relaxed">
              Ser líderes formando niños <strong>creativos e innovadores</strong>. Una institución que potencia el conocimiento desde la investigación, irradiando alegría y amor en cada rincón de nuestra comunidad.
            </p>
          </div>
        </div>
      </section>

      {/* Principios */}
      <section className="py-20 bg-celeste-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Principios de Formación</h2>
            <p className="text-celeste-100 max-w-2xl mx-auto">
              Nuestra metodología se basa en pilares fundamentales que permiten al estudiante gozar de su aprendizaje.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
                { t: 'Cooperación', d: 'Construimos ideas y proyectos juntos.', i: Users, c: 'bg-blue-500' },
                { t: 'Ciencia', d: 'Fomentamos el cuestionamiento.', i: Microscope, c: 'bg-purple-500' },
                { t: 'Exploración', d: 'Investigamos e interactuamos con el entorno.', i: Map, c: 'bg-green-500' },
                { t: 'Lúdica', d: 'Aprendemos desde el juego.', i: Smile, c: 'bg-orange-500' },
            ].map((item, idx) => (
                <div key={idx} className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors text-center">
                    <div className={`w-12 h-12 mx-auto ${item.c} rounded-full flex items-center justify-center text-white mb-4 shadow-lg`}>
                        <item.i size={24} />
                    </div>
                    <h4 className="font-bold text-lg mb-2">{item.t}</h4>
                    <p className="text-sm text-celeste-100">{item.d}</p>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <TituloSeccion titulo="El Corazón Liceísta" />
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="p-8 rounded-2xl bg-yellow-50/50 border border-yellow-100 flex gap-6 hover:shadow-md transition-shadow">
              <div className="mt-1">
                <Sun size={32} className="text-yellow-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Alegría</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Propiciamos un ambiente lleno de buenas energías, donde exteriorizamos la felicidad mediante gestos y acciones positivas.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-red-50/50 border border-red-100 flex gap-6 hover:shadow-md transition-shadow">
              <div className="mt-1">
                <Heart size={32} className="text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Amor</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  El sentimiento universal que agrupa lo más positivo del ser humano. Es la base de nuestro trato familiar y cercano.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}