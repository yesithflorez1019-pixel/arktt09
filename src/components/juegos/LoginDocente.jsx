import React, { useState } from 'react';
import { Lock, Unlock, ArrowRight, Loader2 } from 'lucide-react';
import { auth } from '../../firebase'; 
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginDocente() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const hacerLogin = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      /* Nota: Al iniciar sesión el DocentePanel detecta el cambio automáticamente */
    } catch {
      setError('Correo o contraseña incorrectos. Intenta de nuevo.');
      setCargando(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 animate-fade-in-up">
      <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 max-w-sm w-full text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-celeste-50 rounded-bl-full z-0 opacity-50"></div>
        
        <div className="relative z-10">
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 transition-colors ${error ? 'bg-red-100 text-red-500' : 'bg-celeste-100 text-celeste-600'}`}>
               {error ? <Lock size={32} /> : <Unlock size={32} />}
            </div>
            
            <h2 className="text-2xl font-black text-slate-800 mb-2">Portal Docentes</h2>
            <p className="text-slate-500 text-sm mb-8 font-light">Inicia sesión para administrar tus juegos.</p>
            
            {error && (
               <p className="text-red-500 text-xs font-bold mb-4 uppercase tracking-wider animate-bounce">{error}</p>
            )}

            <form onSubmit={hacerLogin} className="space-y-4">
              <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="profe@liceo.edu.co"
                  required
                  className="w-full text-center font-bold p-4 rounded-2xl border-2 border-slate-200 focus:outline-none focus:ring-4 focus:ring-celeste-100 transition-all text-slate-700 bg-slate-50"
              />
              <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full text-center text-2xl tracking-widest font-black p-4 rounded-2xl border-2 border-slate-200 focus:outline-none focus:ring-4 focus:ring-celeste-100 transition-all mb-4 text-slate-700 bg-slate-50"
              />
              
              <button 
                 type="submit" 
                 disabled={cargando}
                 className={`w-full bg-celeste-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-celeste-700 shadow-md hover:shadow-lg transition-all ${cargando ? 'opacity-70 cursor-wait' : ''}`}
              >
                  {cargando ? <><Loader2 size={20} className="animate-spin"/> Verificando...</> : <>Entrar a mis Juegos <ArrowRight size={20}/></>}
              </button>
            </form>
        </div>
      </div>
    </div>
  );
}