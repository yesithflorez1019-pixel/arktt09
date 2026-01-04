import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Smartphone, ArrowRight } from 'lucide-react';
import { TituloSeccion, TarjetaCristal } from '../components/UI';

export default function Contacto() {
  
  // Estado para el formulario
  const [formData, setFormData] = useState({
    nombre: '',
    asunto: '',
    mensaje: ''
  });

  // Función para enviar a WhatsApp (Truco para páginas estáticas)
  const enviarAWhatsApp = (e) => {
    e.preventDefault();
    const telefonoInstitucional = "3005537195"; // Número del colegio
    const texto = `Hola, mi nombre es ${formData.nombre}. Asunto: ${formData.asunto}. Mensaje: ${formData.mensaje}`;
    const url = `https://wa.me/${telefonoInstitucional}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <div className="animate-fade-in bg-slate-50 min-h-screen pb-20 pt-10">
      
      {/* 1. CABECERA */}
      <div className="container mx-auto px-6 mb-12 text-center">
        <TituloSeccion 
          titulo="Contáctanos" 
          subtitulo="Estamos listos para atenderte y resolver todas tus inquietudes." 
        />
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* 2. COLUMNA IZQUIERDA: INFORMACIÓN DE CONTACTO (Cards) */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Tarjeta Ubicación */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MapPin size={24} />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-2">Nuestra Sede</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Diagonal 62 # 43-30<br/>
                Barrio Las Granjas<br/>
                Barrancabermeja, Santander
              </p>
            </div>

            {/* Tarjeta Teléfonos */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Phone size={24} />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-2">Llámanos</h3>
              <div className="space-y-2">
                <a href="tel:6076263054" className="flex items-center gap-2 text-slate-600 text-sm hover:text-cyan-600 transition-colors">
                  <Phone size={16}/> (607) 626 3054 (Fijo)
                </a>
                <a href="https://wa.me/57300727447" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-slate-600 text-sm hover:text-green-600 transition-colors">
                  <Smartphone size={16}/> 300 553 7195 (Móvil/WhatsApp)
                </a>
              </div>
            </div>

            {/* Tarjeta Horarios y Correo */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Clock size={24} />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-2">Atención al Público</h3>
              <p className="text-slate-600 text-sm mb-4">
                Lunes a Viernes:<br/>
                <span className="font-semibold">7:00 AM - 1:00 PM</span><br/>
                
              </p>
              <div className="pt-4 border-t border-slate-100">
                 <div className="flex items-center gap-2 text-cyan-700 font-medium text-sm">
                    <Mail size={16}/> lfexploradores@gmail.com
                 </div>
              </div>
            </div>

          </div>

          {/* 3. COLUMNA CENTRAL/DERECHA: FORMULARIO Y MAPA */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Formulario de Contacto */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border-t-4 border-cyan-500">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <MessageCircle className="text-cyan-500"/> Envíanos un Mensaje
              </h3>
              
              <form onSubmit={enviarAWhatsApp} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Nombre Completo</label>
                    <input 
                      type="text" 
                      name="nombre"
                      required
                      placeholder="Tu nombre"
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Asunto</label>
                    <select 
                      name="asunto"
                      required
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all text-slate-600"
                    >
                      <option value="">Selecciona una opción...</option>
                      <option value="Admisiones">Información de Admisiones</option>
                      <option value="Pagos">Pagos</option>
                      <option value="Academico">Coordinación Académica</option>
                      <option value="Otro">Otro motivo</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Mensaje</label>
                  <textarea 
                    name="mensaje"
                    required
                    rows="4"
                    placeholder="¿En qué podemos ayudarte?"
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-cyan-600 transition-colors shadow-lg flex items-center justify-center gap-2 group"
                >
                  Enviar Mensaje <Send size={18} className="group-hover:translate-x-1 transition-transform"/>
                </button>
                <p className="text-center text-xs text-slate-400 mt-2">
                  *Serás redirigido a WhatsApp para enviar el mensaje.
                </p>
              </form>
            </div>

            {/* Mapa de Google */}
            <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 h-80 relative group">
               {/* Overlay informativo al pasar mouse */}
               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none z-10">
                  <span className="text-white font-bold bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm flex items-center gap-2">
                    <MapPin size={16}/> Ver en Google Maps
                  </span>
               </div>
               
               <iframe 
                 src="https://www.google.com/maps?q=7.071778,-73.831306&hl=es&z=17&output=embed" 
                 width="100%" 
                 height="100%" 
                 style={{border:0}} 
                 allowFullScreen="" 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 title="Mapa Ubicación Liceo"
                 className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
               ></iframe>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}