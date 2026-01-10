import React, { use, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Smartphone, ArrowRight } from 'lucide-react';
import { TituloSeccion } from '../components/UI';
import usePageTitle from '../components/usePageTitle'

export default function Contacto() {
  usePageTitle('Contacto', 'Estamos aquí para ayudarte: información de contacto, ubicación y formulario de consulta');
  
  const [formData, setFormData] = useState({ nombre: '', asunto: '', mensaje: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const enviarAWhatsApp = (e) => {
    e.preventDefault();
    const telefono = '3005537195';
    const texto = `Hola, mi nombre es ${formData.nombre}. Asunto: ${formData.asunto}. Mensaje: ${formData.mensaje}`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="animate-fade-in bg-white min-h-screen py-12">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16">
            <TituloSeccion titulo="Contáctanos" subtitulo="Estamos aquí para ayudarte" />
            <p className="text-slate-500 max-w-xl mx-auto -mt-8">
                ¿Tienes dudas sobre admisiones, costos o nuestra propuesta académica? Escríbenos o visítanos.
            </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">

          {/* Columna Info */}
          <div className="space-y-6">
            
            {/* Tarjeta Sede */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="w-10 h-10 bg-celeste-100 text-celeste-600 rounded-lg flex items-center justify-center mb-4">
                <MapPin size={20} />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-1">Nuestra Sede</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Diagonal 62 # 43-30<br />Barrio Las Granjas<br />Barrancabermeja, Santander
              </p>
            </div>

            {/* Tarjeta Teléfonos */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                <Phone size={20} />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-3">Canales de Atención</h3>
              <div className="space-y-3">
                <a href="tel:6076263054" className="flex items-center gap-3 text-slate-600 text-sm hover:text-celeste-600 transition-colors bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
                  <Phone size={16} /> (607) 626 3054
                </a>
                <a href="https://wa.me/573005537195" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-600 text-sm hover:text-green-600 transition-colors bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
                  <Smartphone size={16} /> 300 553 7195
                </a>
                <div className="flex items-center gap-3 text-slate-600 text-sm bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
                   <Clock size={16} /> Lun - Vie: 7:00 AM - 1:00 PM
                </div>
              </div>
            </div>

          </div>

          {/* Columna Formulario */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-celeste-50 rounded-bl-full -mr-10 -mt-10 -z-0"></div>
              
              <h3 className="text-2xl font-bold text-slate-800 mb-6 relative z-10">Envíanos un mensaje</h3>

              <form onSubmit={enviarAWhatsApp} className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Nombre Completo</label>
                    <input type="text" name="nombre" required placeholder="Tu nombre" onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-celeste-500 focus:ring-2 focus:ring-celeste-200 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Asunto</label>
                    <select name="asunto" required onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-celeste-500 focus:ring-2 focus:ring-celeste-200 outline-none text-slate-600 transition-all">
                      <option value="">Selecciona una opción</option>
                      <option value="Admisiones">Admisiones</option>
                      <option value="Pagos">Pagos</option>
                      <option value="Academico">Académico</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Mensaje</label>
                  <textarea name="mensaje" required rows="4" placeholder="¿Cómo podemos ayudarte?" onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-celeste-500 focus:ring-2 focus:ring-celeste-200 outline-none resize-none transition-all" />
                </div>

                <div className="flex items-center justify-between pt-4">
                    <p className="text-xs text-slate-400 max-w-xs">*Al enviar, serás redirigido a WhatsApp para completar la consulta.</p>
                    <button type="submit" className="bg-slate-900 text-white font-bold py-3 px-8 rounded-xl hover:bg-celeste-600 transition-colors shadow-lg flex items-center gap-2">
                      Enviar <Send size={18} />
                    </button>
                </div>
              </form>
            </div>
          </div>

        </div>

        {/* Mapa Full Width */}
        <div className="mt-20 rounded-3xl overflow-hidden shadow-sm border border-slate-200 h-96 max-w-6xl mx-auto">
            <iframe src="https://www.google.com/maps?q=7.071778,-73.831306&hl=es&z=17&output=embed" width="100%" height="100%" style={{ border: 0 }} loading="lazy" title="Mapa Liceo" className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700" />
        </div>

      </div>
    </div>
  );
}