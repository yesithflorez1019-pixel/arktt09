import React, { useState } from 'react';
import { Lock, Unlock, ArrowRight } from 'lucide-react';

export default function LoginPin({ onLoginSuccess }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  // PIN SEGURO (Por ahora lo dejamos quemado en el código, luego lo puedes cambiar)
  const PIN_CORRECTO = "2026"; 

  const verificarPin = (e) => {
    e.preventDefault();
    if (pin === PIN_CORRECTO) {
      setError(false);
      onLoginSuccess();
    } else {
      setError(true);
      setPin('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 max-w-sm w-full text-center relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-celeste-50 rounded-bl-full z-0 opacity-50"></div>
        
        <div className="relative z-10">
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 transition-colors ${error ? 'bg-red-100 text-red-500' : 'bg-celeste-100 text-celeste-600'}`}>
            {error ? <Lock size={32} /> : <Unlock size={32} />}
            </div>
            
            <h2 className="text-2xl font-black text-slate-800 mb-2">Acceso Docentes</h2>
            <p className="text-slate-500 text-sm mb-8 font-light">Ingresa tu PIN de seguridad para crear salas de juego.</p>
            
            <form onSubmit={verificarPin}>
            <input 
                type="password" 
                maxLength="4"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))} // Solo números
                placeholder="****"
                className={`w-full text-center text-4xl tracking-widest font-black p-4 rounded-2xl border-2 focus:outline-none focus:ring-4 transition-all mb-6 shadow-sm ${error ? 'border-red-300 focus:ring-red-100' : 'border-celeste-200 focus:ring-celeste-100'}`}
            />
            {error && <p className="text-red-500 text-xs font-bold mb-4 uppercase tracking-wider animate-bounce">PIN Incorrecto</p>}
            
            <button type="submit" className="w-full bg-slate-800 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-700 transition-colors">
                Ingresar al Panel <ArrowRight size={20}/>
            </button>
            </form>
        </div>
      </div>
    </div>
  );
}