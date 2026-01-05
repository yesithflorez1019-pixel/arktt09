import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Smartphone,
} from 'lucide-react';
import { TituloSeccion } from '../components/UI';
import { useNavigate } from 'react-router-dom';



export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    asunto: '',
    mensaje: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const enviarAWhatsApp = (e) => {
    e.preventDefault();
    const telefono = '3005537195';
    const texto = `Hola, mi nombre es ${formData.nombre}. Asunto: ${formData.asunto}. Mensaje: ${formData.mensaje}`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="animate-fade-in bg-slate-50 min-h-screen pt-10 pb-20">
      
      {/* Cabecera */}
      <div className="container mx-auto px-6 mb-12 text-center">
        <TituloSeccion
          titulo="Contáctanos"
          subtitulo="Estamos listos para atenderte y resolver tus inquietudes."
        />
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Información de contacto */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
              <div className="w-12 h-12 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center mb-4">
                <MapPin size={24} />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-2">
                Nuestra Sede
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Diagonal 62 # 43-30<br />
                Barrio Las Granjas<br />
                Barrancabermeja, Santander
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <Phone size={24} />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-2">
                Llámanos
              </h3>
              <div className="space-y-2">
                <a
                  href="tel:6076263054"
                  className="flex items-center gap-2 text-slate-600 text-sm hover:text-cyan-600"
                >
                  <Phone size={16} /> (607) 626 3054
                </a>
                <a
                  href="https://wa.me/573005537195"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-slate-600 text-sm hover:text-green-600"
                >
                  <Smartphone size={16} /> 300 553 7195
                </a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
                <Clock size={24} />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-2">
                Atención al Público
              </h3>
              <p className="text-slate-600 text-sm mb-4">
                Lunes a Viernes<br />
                <span className="font-semibold">7:00 AM - 1:00 PM</span>
              </p>
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-cyan-700 text-sm font-medium">
                <Mail size={16} /> lfexploradores@gmail.com
              </div>
            </div>
          </div>

          {/* Formulario y mapa */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl border-t-4 border-cyan-500">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <MessageCircle className="text-cyan-500" />
                Envíanos un Mensaje
              </h3>

              <form onSubmit={enviarAWhatsApp} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      required
                      placeholder="Tu nombre"
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Asunto
                    </label>
                    <select
                      name="asunto"
                      required
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none text-slate-600"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="Admisiones">Admisiones</option>
                      <option value="Pagos">Pagos</option>
                      <option value="Academico">Académico</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    name="mensaje"
                    required
                    rows="4"
                    placeholder="¿En qué podemos ayudarte?"
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-cyan-600 transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  Enviar Mensaje <Send size={18} />
                </button>

                <p className="text-center text-xs text-slate-400">
                  *Se abrirá WhatsApp para enviar el mensaje.
                </p>
              </form>
            </div>

            {/* Mapa */}
            <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 h-80">
              <iframe
                src="https://www.google.com/maps?q=7.071778,-73.831306&hl=es&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Mapa Liceo"
                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
