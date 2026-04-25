import React, { useState } from 'react';
import { auth } from '../firebase'; // Importamos la conexión
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const CORREOS_ADMIN = [
  "yesith@liceoformador.edu.co",
  "directora@liceoexploradores.edu.co"
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 1. Intentamos iniciar sesión con Firebase
      const credenciales = await signInWithEmailAndPassword(auth, email, password);
      
      // 2. Extraemos el correo del usuario que acaba de entrar
      const correoUsuario = credenciales.user.email;

      // 3. EL AGENTE DE TRÁNSITO 🚦
      if (CORREOS_ADMIN.includes(correoUsuario)) {
        // Es un administrador VIP -> Al panel principal
        navigate('/admin'); 
      } else {
        // No es un correo admin, no tiene permisos.
        await auth.signOut(); // Cerramos la sesión que se abrió
        setError('No tienes los permisos para acceder a este panel.');
      }

    } catch (error) { // Es buena práctica capturar el objeto de error
      // La mayoría de las veces será por credenciales inválidas
      setError('Correo o contraseña incorrectos.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="max-w-md w-full bg-slate-800 p-8 rounded-xl shadow-2xl border border-slate-700">
        
        {/* Cambié un poquito el título para que abarque a ambos */}
        <h2 className="text-3xl font-bold text-white text-center mb-2">Acceso Institucional</h2>
        <p className="text-slate-400 text-center text-sm mb-6">Administrativos y Docentes</p>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded mb-4 text-center text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-slate-400 text-sm mb-2">Correo Electrónico</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="usuario@liceo.edu.co"
            />
          </div>
          
          <div>
            <label className="block text-slate-400 text-sm mb-2">Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-3 rounded hover:from-cyan-500 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20"
          >
            INGRESAR
          </button>
        </form>
      </div>
    </div>
  );
}