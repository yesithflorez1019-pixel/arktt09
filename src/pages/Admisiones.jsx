import React from 'react';
import { CheckCircle, FileText, Download, ArrowLeft, Calendar, Info } from 'lucide-react';
import { TituloSeccion } from '../components/UI';
import { useNavigate } from 'react-router-dom';

export default function Admisiones() {
  const navigate = useNavigate();
  
  return (
    <div className="animate-fade-in py-12 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header Breadcrumb */}
        <div className="mb-8">
            <button onClick={() => navigate('/')} className="text-sm text-slate-500 hover:text-celeste-600 font-bold flex items-center gap-2 transition-colors">
                <ArrowLeft size={16} /> Volver al Inicio
            </button>
        </div>

        <div className="text-center mb-12">
            <span className="bg-celeste-100 text-celeste-700 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">Inscripciones Abiertas</span>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mt-4 mb-4">Proceso de Admisión 2026</h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
                Únete a la familia del Liceo Formador de Exploradores. Aquí comienza el futuro de tus hijos.
            </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          
          {/* Columna Izquierda: Requisitos */}
          <div className="space-y-8">
             {/* Tarjeta Requisitos */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-celeste-500"></div>
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <FileText className="text-celeste-600" />
                Documentación Requerida
              </h3>
              <ul className="space-y-4">
                {[
                  'Registro Civil de Nacimiento (Original o copia legible).',
                  'Fotocopia de la Tarjeta de Identidad (Mayores de 7 años).',
                  'Fotocopia de la Cédula de los padres (150%).',
                  'Certificado de afiliación a EPS vigente.',
                  'Fotocopia del Carnet de Vacunas (Preescolar).',
                  'Certificado médico reciente.',
                  'Paz y Salvo del colegio anterior.',
                  'Certificado de notas del año anterior.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 text-sm group">
                    <CheckCircle className="text-green-500 w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tarjeta Aviso */}
            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 flex gap-4">
                <Info className="text-orange-500 shrink-0" />
                <div>
                    <h4 className="font-bold text-orange-800 text-sm mb-1">Importante</h4>
                    <p className="text-xs text-orange-700/80">
                        Los cupos son limitados. Recomendamos iniciar el proceso con anticipación para asegurar su lugar en el grado deseado.
                    </p>
                </div>
            </div>
          </div>

          {/* Columna Derecha: Pasos */}
          <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Ruta de Ingreso</h3>
              
              <div className="space-y-4">
                {[
                  { num: '1', titulo: 'Adquirir Formulario', desc: 'Solicítalo en la secretaría del colegio.' },
                  { num: '2', titulo: 'Entrevista y Valoración', desc: 'Cita con psicología o coordinación académica.' },
                  { num: '3', titulo: 'Entrega de Documentos', desc: 'Radicar la carpeta completa en físico.' },
                  { num: '4', titulo: 'Pago de Matrícula', desc: 'Realizar el pago de costos educativos.' },
                  { num: '5', titulo: 'Firma de Matrícula', desc: 'Formalización oficial del ingreso.' },
                ].map((paso, i) => (
                  <div key={i} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex gap-4 items-center hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-full bg-celeste-50 text-celeste-700 font-bold flex items-center justify-center shrink-0 border border-celeste-100">
                      {paso.num}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{paso.titulo}</h4>
                      <p className="text-xs text-slate-500">{paso.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            <button className="w-full mt-6 bg-celeste-600 hover:bg-celeste-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1">
              <Download size={20} />
              Descargar Formulario de Inscripción
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}