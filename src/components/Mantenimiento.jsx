import React from 'react';
import { Seccion, Titulo, Boton } from './UI';
import { HardHat, Hammer, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Mantenimiento({ pagina = "esta sección" }) {
  const navigate = useNavigate();

  return (
    <div className="pt-20 min-h-screen bg-celeste-400 flex flex-col items-center justify-center text-center animate-fade-in">
      <Seccion>
        <div className="bg-white/10 backdrop-blur-md p-10 md:p-16 rounded-3xl border border-white/20 shadow-2xl max-w-2xl mx-auto">
          
          <div className="relative inline-block mb-6">
            <div className="bg-celeste-100 p-6 rounded-full animate-bounce">
               <HardHat size={64} className="text-celeste-600" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white text-celeste-600 p-2 rounded-full shadow-md">
               <Hammer size={24} className="animate-pulse"/>
            </div>
          </div>

          <Titulo>¡Estamos trabajando!</Titulo>
          
          <p className="text-white text-lg md:text-xl mb-8 leading-relaxed font-light">
            Estamos remodelando <strong>{pagina}</strong> para ofrecerte una mejor experiencia. <br/>
            Pronto estará disponible con nuevo contenido.
          </p>

          <div className="flex justify-center">
             <button 
               onClick={() => navigate('/')}
               className="bg-white text-celeste-700 font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
             >
               <ArrowLeft size={20}/> Volver al Inicio
             </button>
          </div>

        </div>
      </Seccion>
    </div>
  );
}