import React from 'react';
import {
  Compass,
  Heart,
  Sun,
  Users,
  BookOpen,
  Microscope,
  Map,
  Award,
  Star,
  Smile,
  Leaf,
  Zap,
  BarChart3,
  TreePine,
} from 'lucide-react';
import { TituloSeccion } from '../components/UI';
import SEO from '../components/SEO';
import { useNavigate } from 'react-router-dom';

export default function Nosotros() {
  return (
    <div className="animate-fade-in bg-white min-h-screen font-sans text-slate-700">
      <SEO
        title="Quiénes Somos - Pioneros en Energía Solar"
        description="Conoce la historia del Liceo Formador de Exploradores. Somos pioneros en Barrancabermeja con nuestro sistema de energía solar y modelo pedagógico innovador."
        keywords="historia liceo, colegio paneles solares, colegio ecologico barrancabermeja, liceo formador"
      />

      {/* Header */}
      <div className="relative pt-24 pb-20 text-center px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
            "Observando e indagando <br />
            <span className="text-cyan-600">los exploradores</span> se van formando"
          </h1>
        </div>
      </div>

      {/* Historia */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-orange-100 rounded-tr-[4rem] rounded-bl-[4rem] -z-10" />
            <img
              src="/fotos-galeria/13.jpeg"
              alt="Historia"
              className="rounded-tr-[3rem] rounded-bl-[3rem] shadow-xl w-full object-cover h-96"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <BookOpen className="text-orange-500" size={32} />
              Nuestra Historia
            </h2>

            <div className="space-y-4 text-lg text-slate-600 leading-relaxed text-justify">
              <p>
                Todo comenzó en <strong>2016</strong> con un gran sueño y un corazón lleno de ilusión. En 2017 abrimos nuestras puertas con 65 estudiantes.
              </p>
              <p>
                Para el <strong>2020</strong>, gracias al apoyo de las familias, ampliamos nuestra oferta a la Básica Primaria. Hoy, bajo la Resolución 1504, somos un referente de calidad humana y académica en el barrio Las Granjas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Energía solar */}
      <section className="py-20 bg-green-50/50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block p-3 bg-green-100 text-green-700 rounded-xl mb-4">
                <Leaf size={24} />
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-6">
                Pioneros en <span className="text-green-600">Energía Solar</span>
              </h2>

              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Somos de las primeras instituciones educativas en implementar un sistema fotovoltaico propio. No solo ahorramos energía, enseñamos a nuestros estudiantes a amar y cuidar el planeta con el ejemplo.
              </p>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-green-100 text-center hover:-translate-y-1 transition-transform">
                  <Zap className="mx-auto text-yellow-500 mb-2" size={24} />
                  <div className="font-black text-xl text-slate-800">12.5</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">MWh Gen</div>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-sm border border-green-100 text-center hover:-translate-y-1 transition-transform">
                  <TreePine className="mx-auto text-green-600 mb-2" size={24} />
                  <div className="font-black text-xl text-slate-800">450</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Árboles</div>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-sm border border-green-100 text-center hover:-translate-y-1 transition-transform">
                  <BarChart3 className="mx-auto text-blue-500 mb-2" size={24} />
                  <div className="font-black text-xl text-slate-800">8.3</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Ton CO2</div>
                </div>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="absolute -inset-4 bg-green-200 rounded-tl-[4rem] rounded-br-[4rem] -z-10" />
              <img
                src="/fotos-galeria/47.png"
                alt="Paneles Solares"
                className="rounded-tl-[3rem] rounded-br-[3rem] shadow-xl w-full object-cover h-96"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-20 container mx-auto px-6">
        <TituloSeccion
          titulo="Nuestro Horizonte"
          subtitulo="La brújula que guía nuestro camino educativo."
        />

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all hover:border-cyan-200">
            <Award size={40} className="text-cyan-600 mb-4" />
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Misión</h3>
            <p className="text-slate-600 text-justify">
              Ofrecemos educación de calidad en jornada única. Enriquecemos saberes invitando a <strong>observar, indagar y descubrir</strong> para consolidar el conocimiento mediante la lúdica.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all hover:border-orange-200">
            <Star size={40} className="text-orange-500 mb-4" />
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Visión</h3>
            <p className="text-slate-600 text-justify">
              Ser líderes formando niños <strong>creativos e innovadores</strong>. Una institución que potencia el conocimiento desde la investigación, irradiando alegría y amor.
            </p>
          </div>
        </div>
      </section>

      {/* Principios */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Principios de Formación</h2>
            <p className="text-slate-500 mt-2">
              Nuestra metodología se basa en pilares que permiten al estudiante gozar de su aprendizaje.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-blue-500 text-center hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 mx-auto bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <Users size={24} />
              </div>
              <h4 className="font-bold text-slate-800 mb-2">Trabajo Cooperativo</h4>
              <p className="text-sm text-slate-500">
                Construimos ideas y proyectos juntos, donde el aporte de cada persona es valioso.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-purple-500 text-center hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 mx-auto bg-purple-50 rounded-full flex items-center justify-center text-purple-600 mb-4">
                <Microscope size={24} />
              </div>
              <h4 className="font-bold text-slate-800 mb-2">Ciencia y Observación</h4>
              <p className="text-sm text-slate-500">
                Fomentamos el cuestionamiento y la experimentación para descubrir el mundo.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-green-500 text-center hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 mx-auto bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-4">
                <Map size={24} />
              </div>
              <h4 className="font-bold text-slate-800 mb-2">Exploración</h4>
              <p className="text-sm text-slate-500">
                Permitimos que los niños investiguen, cuestionen e interactúen con su entorno.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-orange-500 text-center hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 mx-auto bg-orange-50 rounded-full flex items-center justify-center text-orange-600 mb-4">
                <Smile size={24} />
              </div>
              <h4 className="font-bold text-slate-800 mb-2">Lúdica</h4>
              <p className="text-sm text-slate-500">
                Aprendemos desde el juego y la experiencia directa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <TituloSeccion titulo="El Corazón Liceísta" />
          <p className="text-slate-600 mb-12">
            En el Liceo, cada acción rebosa de valores fundamentales que hacen sentir al estudiante en familia.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-yellow-50 border border-yellow-100 flex items-center gap-6 text-left hover:scale-105 transition-transform">
              <div className="p-4 bg-white rounded-full shadow-sm text-yellow-500">
                <Sun size={32} className="animate-spin-slow" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">Alegría</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Propiciamos un ambiente lleno de buenas energías, donde exteriorizamos la felicidad mediante gestos y acciones positivas.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-red-50 border border-red-100 flex items-center gap-6 text-left hover:scale-105 transition-transform">
              <div className="p-4 bg-white rounded-full shadow-sm text-red-500">
                <Heart size={32} className="animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">Amor</h3>
                <p className="text-sm text-slate-600 mt-1">
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
