import React from 'react';
import { 
  Compass, Heart, Sun, Users, BookOpen, 
  Microscope, Map, Award, Star, Smile 
} from 'lucide-react';
import { TituloSeccion } from '../components/UI';

export default function Nosotros() {

  // Principios extraídos del Manual de Convivencia (Pág. 110-111)
  const principios = [
    {
      titulo: "Trabajo Cooperativo",
      desc: "Construimos ideas y proyectos juntos, donde el aporte de cada persona es valioso.",
      icono: Users,
      color: "bg-blue-100 text-blue-600"
    },
    {
      titulo: "Ciencia y Observación",
      desc: "Fomentamos el cuestionamiento y la experimentación para establecer hipótesis y descubrir el mundo.",
      icono: Microscope,
      color: "bg-purple-100 text-purple-600"
    },
    {
      titulo: "Exploración",
      desc: "Permitimos que los niños cuestionen, interactúen y ganen independencia investigando su entorno.",
      icono: Map,
      color: "bg-green-100 text-green-600"
    },
    {
      titulo: "Lúdica",
      desc: "Aprendemos desde el juego y la manipulación de objetos para edificar conocimiento haciendo.",
      icono: Smile,
      color: "bg-orange-100 text-orange-600"
    }
  ];

  return (
    <div className="animate-fade-in bg-slate-50 min-h-screen font-sans text-slate-700">
      
      {/* 1. HEADER: LEMA INSTITUCIONAL */}
      <div className="bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-8 left-0 w-64 h-64 bg-orange-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        
        <div className="container mx-auto px-6 py-20 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 text-cyan-700 text-sm font-bold mb-6 tracking-wide uppercase">
            <Compass size={16} /> Proyecto Educativo Institucional
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-800 mb-6 leading-tight">
            "Observando e indagando <br/>
            <span className="text-cyan-600">los exploradores</span> se van formando"
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">
            Más que un colegio, somos un espacio donde la curiosidad se convierte en conocimiento.
          </p>
        </div>
      </div>

      {/* 2. NUESTRA HISTORIA (Línea de tiempo narrativa) */}
      <section className="py-20 container mx-auto px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100">
          <div className="grid md:grid-cols-2">
            
            {/* Imagen Historia */}
            <div className="relative h-64 md:h-auto">
              <img 
                src="/fotos-galeria/13.jpeg" 
                alt="Fundación del Liceo" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div className="text-white">
                  <p className="font-bold text-lg">Fundado en 2017</p>
                  <p className="text-sm opacity-80">Barrio Las Granjas, Barrancabermeja</p>
                </div>
              </div>
            </div>

            {/* Texto Historia */}
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <BookOpen className="text-orange-500"/> Nuestra Historia
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  El sueño comenzó con la Licenciada <strong>Elizabeth Salgado Bautista</strong>. Su iniciativa de brindar educación de calidad nació en 2016 y se materializó abriendo puertas el <strong>30 de enero de 2017</strong> con nuestros primeros 65 exploradores.
                </p>
                <p>
                  Lo que inició como un preescolar familiar, creció gracias a la confianza de los padres. En <strong>2020 ampliamos nuestra cobertura</strong> a la Básica Primaria, estrenando nueva sede.
                </p>
                <p>
                  Hoy, bajo la <strong>Resolución 1504</strong>, seguimos transformando el entorno del Barrio Las Granjas, formando seres humanos íntegros, alegres y competentes.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. NUESTRO HORIZONTE (Misión y Visión) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <TituloSeccion 
            titulo="Nuestro Horizonte" 
            subtitulo="La brújula que guía nuestro camino educativo." 
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-12">
            
            {/* Tarjeta Misión */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-cyan-200 transition-colors group">
              <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center text-cyan-600 mb-6 group-hover:scale-110 transition-transform">
                <Award size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Misión</h3>
              <p className="text-slate-600 leading-relaxed text-justify">
                Ofrecemos educación de calidad en jornada única, permitiendo que niños y niñas vivan su aprendizaje desde el desarrollo integral. Enriquecemos sus saberes invitándolos a <strong>observar, indagar, descubrir y explorar</strong> hasta consolidar el conocimiento mediante estrategias lúdicas.
              </p>
            </div>

            {/* Tarjeta Visión */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-orange-200 transition-colors group">
              <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
                <Star size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Visión</h3>
              <p className="text-slate-600 leading-relaxed text-justify">
                Nos proyectamos como una institución que potencia el conocimiento desde la investigación, donde se irradie alegría y amor. Seremos líderes formando niños <strong>creativos, innovadores y competentes</strong>, capaces de analizar y proponer soluciones para el futuro.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PRINCIPIOS PEDAGÓGICOS (Grid 4 columnas) */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Principios de Formación</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Nuestra metodología se basa en pilares que permiten al estudiante gozar de su aprendizaje.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {principios.map((prin, i) => (
              <div key={i} className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 hover:bg-slate-800 transition-all">
                <div className={`w-12 h-12 ${prin.color} rounded-xl flex items-center justify-center mb-4`}>
                  <prin.icono size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2">{prin.titulo}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {prin.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. VALORES: EL CORAZÓN DEL LICEO */}
      <section className="py-20 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <TituloSeccion titulo="El Corazón Liceísta" />
          <p className="text-slate-600 mb-12">
            En el Liceo, cada acción rebosa de dos sentimientos fundamentales que hacen sentir al estudiante en familia:
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* ALEGRÍA */}
            <div className="p-8 rounded-3xl bg-yellow-50 border border-yellow-100 flex flex-col items-center">
              <Sun size={48} className="text-yellow-500 mb-4 animate-spin-slow" />
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Alegría</h3>
              <p className="text-slate-600 text-sm">
                Propiciamos un ambiente lleno de buenas energías, donde exteriorizamos la felicidad mediante gestos y acciones positivas.
              </p>
            </div>

            {/* AMOR */}
            <div className="p-8 rounded-3xl bg-red-50 border border-red-100 flex flex-col items-center">
              <Heart size={48} className="text-red-500 mb-4 animate-pulse" />
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Amor</h3>
              <p className="text-slate-600 text-sm">
                El sentimiento universal que agrupa lo más positivo del ser humano. Es la base de nuestro trato familiar y cercano.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

