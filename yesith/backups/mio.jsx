import React, { useState } from 'react';
import { Copy, CheckCircle, CreditCard, ShieldCheck, AlertCircle, ExternalLink, ArrowLeft, Smartphone, User, Hash, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { TituloSeccion } from '../components/UI';

export default function Pagos({ navegarA }) {
  
  const [copiado, setCopiado] = useState(false);
  const [copiadoAlias, setCopiadoAlias] = useState(false);
  // Estado para el acordeón de políticas (para que no ocupe tanto espacio visualmente de entrada)
  const [mostrarPoliticas, setMostrarPoliticas] = useState(false);
  
  // DATOS ACTUALIZADOS
  const datosPago = {
    nombre: "Elizabeth Salgado Bautista",
    alias: "@ES1096193147",
    zona: "Zona Bre-b",
    numeroMovil: "300727447",
    linkPSE: "https://www.avalpaycenter.com/wps/portal/portal-de-pagos/web/pagos-aval/resultado-busqueda/realizar-pago-facturadores?idConv=00000934&origen=buscar"
  };

  const manejarPagoPSE = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(datosPago.numeroMovil);
    setCopiado(true);
    setTimeout(() => {
      setCopiado(false);
      window.open(datosPago.linkPSE, '_blank');
    }, 1500); 
  };

  const copiarAlias = () => {
    navigator.clipboard.writeText(datosPago.alias);
    setCopiadoAlias(true);
    setTimeout(() => setCopiadoAlias(false), 2000);
  };

  return (
    <div className="animate-fade-in bg-slate-50 min-h-screen pb-20 pt-10">
      <div className="container mx-auto px-6">
        
        {/* BOTÓN VOLVER */}
        <button 
           onClick={() => navegarA('inicio')} 
           className="mb-6 flex items-center gap-2 text-slate-500 hover:text-cyan-600 font-bold transition-colors"
        >
           <ArrowLeft size={20}/> Volver al Inicio
        </button>

        <TituloSeccion 
          titulo="Portal de Pagos" 
          subtitulo="Gestiona tus pagos de forma segura, rápida y desde cualquier banco." 
        />

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-start mt-8">
          
          {/* COLUMNA IZQUIERDA: TARJETA DE INFORMACIÓN (ZONA BRE-B) */}
          <div className="space-y-6">
             
             {/* IMAGEN DECORATIVA */}
             <div className="rounded-2xl overflow-hidden shadow-lg h-48 relative group">
                <img 
                  src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80" 
                  alt="Pagos Seguros" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-6">
                   <p className="text-white font-bold text-lg flex items-center gap-2">
                     <ShieldCheck className="text-green-400"/> Pagos Verificados
                   </p>
                </div>
             </div>

             {/* TARJETA "ZONA BRE-B" */}
             <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Smartphone className="text-cyan-600"/> {datosPago.zona}
                </h3>

                <div className="space-y-4">
                   {/* TITULAR */}
                   <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                      <div className="bg-white p-2 rounded-full shadow-sm text-cyan-600">
                         <User size={20}/>
                      </div>
                      <div>
                         <p className="text-xs text-slate-400 font-bold uppercase">Titular</p>
                         <p className="font-bold text-slate-800 text-lg">{datosPago.nombre}</p>
                      </div>
                   </div>

                   {/* ALIAS (Copiable) */}
                   <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-start gap-4">
                        <div className="bg-white p-2 rounded-full shadow-sm text-purple-600">
                           <Hash size={20}/>
                        </div>
                        <div>
                           <p className="text-xs text-slate-400 font-bold uppercase">Alias / Código</p>
                           <p className="font-mono font-bold text-slate-800 text-lg tracking-wider">{datosPago.alias}</p>
                        </div>
                      </div>
                      <button 
                        onClick={copiarAlias}
                        className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-cyan-600"
                        title="Copiar Alias"
                      >
                        {copiadoAlias ? <CheckCircle size={20} className="text-green-500"/> : <Copy size={20}/>}
                      </button>
                   </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 text-blue-700 text-xs rounded-lg flex gap-2 items-center">
                   <AlertCircle size={16}/>
                   <span>Compatible para transferencias desde <strong>cualquier banco</strong>.</span>
                </div>
             </div>
          </div>

          {/* COLUMNA DERECHA: BOTÓN PSE Y POLÍTICAS */}
          <div className="space-y-6">
             
             {/* TARJETA PSE INTELIGENTE */}
             <div className="bg-white p-8 rounded-3xl shadow-xl border-t-4 border-[#18397F] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                   <CreditCard size={150} className="text-[#18397F]"/>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Pago en Línea (AvalPay)</h3>
                <p className="text-slate-500 mb-6 leading-relaxed text-sm">
                  Al hacer clic, <strong>copiaremos el número ({datosPago.numeroMovil})</strong> y te llevaremos al portal seguro para que realices tu pago.
                </p>

                {/* BOTÓN PSE PRINCIPAL */}
                <button 
                  onClick={manejarPagoPSE}
                  className="w-full bg-[#18397F] hover:bg-[#122c63] text-white py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group/btn relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                     <span className="text-[10px] font-black text-[#18397F] tracking-tighter">PSE</span>
                  </div>
                  <div className="text-left">
                    <span className="block text-xs text-blue-200 font-medium">
                        {copiado ? "¡Número Copiado!" : "Copiar número e"}
                    </span>
                    <span className="block font-bold text-lg leading-none">
                        {copiado ? "Abriendo Banco..." : "Ir a Pagar"}
                    </span>
                  </div>
                  <div className="ml-auto">
                    {copiado ? <CheckCircle className="text-green-400 animate-bounce"/> : <ExternalLink size={20} className="opacity-70"/>}
                  </div>
                </button>

                <p className="text-[10px] text-center text-slate-400 mt-4">
                  <ShieldCheck size={10} className="inline mr-1"/>
                  Sitio seguro verificado por Grupo Aval.
                </p>
             </div>

             {/* === SECCIÓN DE POLÍTICAS (NUEVA) === */}
             <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <button 
                  onClick={() => setMostrarPoliticas(!mostrarPoliticas)}
                  className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                   <div className="flex items-center gap-2 font-bold text-slate-700 text-sm">
                      <FileText size={18} className="text-orange-500"/>
                      Políticas y Condiciones de Pago
                   </div>
                   {mostrarPoliticas ? <ChevronUp size={18} className="text-slate-400"/> : <ChevronDown size={18} className="text-slate-400"/>}
                </button>
                
                {/* Contenido desplegable con la info del PDF */}
                {mostrarPoliticas && (
                  <div className="p-6 bg-white text-sm text-slate-600 space-y-4 animate-fade-in">
                     
                     <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                        <h5 className="font-bold text-red-700 mb-1 flex items-center gap-2">
                           <AlertCircle size={14}/> Mora y Evaluaciones
                        </h5>
                        <p className="text-xs leading-relaxed text-red-600/80">
                           Los estudiantes que deban <strong>2 meses consecutivos</strong> de pensión no podrán presentar evaluaciones acumulativas hasta establecer un acuerdo de pago.
                        </p>
                     </div>

                     <div className="space-y-2">
                        <p><strong className="text-slate-800">• Informes Académicos:</strong> No se entregarán documentos ni informes hasta encontrarse a paz y salvo con las mensualidades.</p>
                        <p><strong className="text-slate-800">• Cobro Jurídico:</strong> El pagaré firmado constituye un título valor. En caso de incumplimiento, se hará exigible ante instancias judiciales, asumiendo el padre de familia los costos de ley.</p>
                        <p><strong className="text-slate-800">• Retiros:</strong> Si un estudiante se retira durante el año escolar, <strong>no habrá devolución de dinero</strong> por matrícula o pensiones ya efectuadas.</p>
                     </div>

                     <p className="text-[10px] text-slate-400 italic mt-2 border-t pt-2">
                        Fuente: Manual de Convivencia 2026 (Capítulo 14 - Costos Educativos)
                     </p>
                  </div>
                )}
             </div>

             {/* RECOMENDACIONES RÁPIDAS */}
             <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
               <ul className="space-y-2 text-xs text-slate-500">
                 <li className="flex gap-2 items-center">
                   <CheckCircle size={12} className="text-cyan-500"/>
                   Envía el comprobante al WhatsApp de Tesorería.
                 </li>
                 <li className="flex gap-2 items-center">
                   <CheckCircle size={12} className="text-cyan-500"/>
                   Guarda tu número de aprobación.
                 </li>
               </ul>
             </div>

          </div>
        </div>

      </div>
    </div>
  );
}