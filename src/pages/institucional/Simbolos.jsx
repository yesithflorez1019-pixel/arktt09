import usePageMeta from "../../components/usePageTitle";
import React from 'react';
import { Seccion, Titulo, TarjetaCristal } from '../../components/UI';

import { Music, Shield, Flag } from 'lucide-react';

export default function Simbolos() {
  usePageMeta("Símbolos Institucionales", "Descubre los símbolos que representan nuestra identidad y valores en el Liceo Formador de Exploradores.");
  return (
    <div className="pt-20 bg-celeste-400 min-h-screen animate-fade-in">
      
      <Seccion>
        <Titulo>Nuestra Identidad</Titulo>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* ESCUDO */}
            <TarjetaCristal className="text-center">
                <Shield size={48} className="mx-auto mb-4 opacity-80"/>
                <h3 className="text-2xl font-bold mb-4">El Escudo</h3>
                <p className="mb-4">Representa la protección y la fortaleza del conocimiento.</p>
                <div className="bg-white/20 h-48 rounded-xl flex items-center justify-center border border-white/30">
                    <span className="text-sm opacity-70">(Aquí iría la imagen del escudo)</span>
                </div>
            </TarjetaCristal>
            
            {/* BANDERA */}
            <TarjetaCristal className="text-center">
                <Flag size={48} className="mx-auto mb-4 opacity-80"/>
                <h3 className="text-2xl font-bold mb-4">La Bandera</h3>
                <p className="mb-4">Sus colores simbolizan la pureza, la esperanza y la energía de nuestros estudiantes.</p>
                <div className="bg-white/20 h-48 rounded-xl flex items-center justify-center border border-white/30">
                     <span className="text-sm opacity-70">(Aquí iría la imagen de la bandera)</span>
                </div>
            </TarjetaCristal>
        </div>
      </Seccion>
      
      <Seccion blanca={true}>
          <div className="max-w-3xl mx-auto text-center">
             <Music size={40} className="mx-auto text-celeste-500 mb-4"/>
             <h2 className="text-3xl font-bold text-celeste-900 mb-6">Himno Institucional</h2>
             <div className="bg-celeste-50 p-8 rounded-2xl shadow-inner border border-celeste-100">
                <p className="italic text-slate-600 leading-loose">
                    "¡Oh Liceo Formador de Exploradores!<br/>
                     Templo de ciencia, amor y virtud,<br/>
                     donde forjamos con grandes valores<br/>
                     el futuro de nuestra juventud..."
                </p>
                <p className="text-sm text-slate-400 mt-4">(Estribillo - Ejemplo)</p>
             </div>
          </div>
      </Seccion>
    </div>
  );
}