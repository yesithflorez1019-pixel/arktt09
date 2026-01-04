import React from 'react';
import { CheckCircle, FileText, Download, ArrowLeft } from 'lucide-react';
import { TituloSeccion, TarjetaCristal } from '../components/UI';

export default function Admisiones({ navegarA }) {
  return (
    <div className="animate-fade-in pt-12 pb-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Volver */}
        <button
          onClick={() => navegarA('inicio')}
          className="flex items-center gap-2 text-cyan-600 font-bold mb-8 hover:-translate-x-1 transition-transform"
        >
          <ArrowLeft size={20} /> Volver al Inicio
        </button>

        <TituloSeccion
          titulo="Proceso de Admisión 2026"
          subtitulo="Únete al Liceo Formador de Exploradores."
        />

        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Documentación */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-cyan-500">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <FileText className="text-cyan-500" />
                Documentación Requerida
              </h3>

              <ul className="space-y-4">
                {[
                  'Registro Civil de Nacimiento (Original o copia legible).',
                  'Fotocopia de la Tarjeta de Identidad (Mayores de 7 años).',
                  'Fotocopia de la Cédula de los padres o acudientes (150%).',
                  'Certificado de afiliación a EPS vigente.',
                  'Fotocopia del Carnet de Vacunas (Preescolar).',
                  'Certificado médico reciente.',
                  'Paz y Salvo del colegio anterior (si aplica).',
                  'Certificado de notas del año anterior aprobadas.',
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-slate-600 text-sm"
                  >
                    <CheckCircle className="text-green-500 w-5 h-5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Proceso */}
          <div className="space-y-8">
            <TarjetaCristal className="p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6">
                Pasos para la Matrícula
              </h3>

              <div className="space-y-6">
                {[
                  { num: '01', titulo: 'Adquirir Formulario', desc: 'Solicítalo en la secretaría del colegio.' },
                  { num: '02', titulo: 'Entrevista / Examen', desc: 'Se agenda cita con psicología o coordinación.' },
                  { num: '03', titulo: 'Entrega de Documentos', desc: 'Radicar la carpeta completa.' },
                  { num: '04', titulo: 'Pago de Matrícula', desc: 'Realizar el pago de costos educativos.' },
                  { num: '05', titulo: 'Firma de Matrícula', desc: 'Formalización del ingreso.' },
                ].map((paso, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="text-3xl font-extrabold text-slate-200">
                      {paso.num}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-700">
                        {paso.titulo}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {paso.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TarjetaCristal>

            <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
              <Download size={20} />
              Descargar Formulario de Inscripción
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
