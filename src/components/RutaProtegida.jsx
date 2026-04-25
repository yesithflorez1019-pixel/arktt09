import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase'; 
import { onAuthStateChanged } from 'firebase/auth';

/* Configuración de seguridad: Correos autorizados para el acceso administrativo */
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

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (!CORREOS_ADMIN.includes(usuario.email)) {
    alert("🛑 Acceso Denegado: Esta área es solo para la Administración del colegio.");
    return <Navigate to="/" replace />;
  }

  return children;
}