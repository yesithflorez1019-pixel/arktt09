import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase'; 
import { onAuthStateChanged } from 'firebase/auth';

// 🚨 AQUÍ VAN LOS CORREOS QUE SÍ PUEDEN ENTRAR AL PANEL DE NOTICIAS
// Escribe el tuyo real aquí. Todos los demás serán bloqueados.
const CORREOS_ADMIN = [
  "yesith@liceoformador.edu.co",
  "directora@liceoexploradores.edu.co" 
];

export default function RutaProtegida({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setCargando(false);
    });
    return () => unsubscribe();
  }, []);

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-celeste-600 font-bold animate-pulse">
           Verificando credenciales de seguridad...
        </div>
      </div>
    );
  }

  // REGLA 1: Si no hay nadie logueado, lo mandamos al login
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // REGLA 2: Si está logueado, pero su correo NO es de los jefes, lo rebotamos.
  if (!CORREOS_ADMIN.includes(usuario.email)) {
    // Como probablemente es un docente curioso, lo mandamos de vuelta a sus juegos
    alert("🛑 Acceso Denegado: Esta área es solo para la Administración del colegio.");
    return <Navigate to="/" replace />;
  }

  // REGLA 3: Si pasó la prueba VIP, le mostramos el panel de Admin
  return children;
}