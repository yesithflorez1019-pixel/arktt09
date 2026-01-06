import React, { useState } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { LogOut, Image, FileText, LayoutDashboard, ArrowLeft } from 'lucide-react';

// Importamos el módulo nuevo
import PanelNoticias from '../components/admin/PanelNoticias';

export default function AdminPanel() {
  const navigate = useNavigate();
  // Estado para saber qué "pestaña" estamos viendo
  const [vistaActual, setVistaActual] = useState('dashboard'); // 'dashboard', 'noticias', 'galeria'

  const cerrarSesion = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      {/* Barra Superior */}
      <nav className="bg-slate-900 text-white p-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            {vistaActual !== 'dashboard' && (
              <button onClick={() => setVistaActual('dashboard')} className="mr-2 hover:bg-slate-800 p-1 rounded">
                <ArrowLeft size={20}/>
              </button>
            )}
            <h1 className="text-xl font-bold text-cyan-400">Panel Administrativo</h1>
          </div>
          <button 
            onClick={cerrarSesion}
            className="flex items-center gap-2 text-sm bg-red-600/20 hover:bg-red-600 px-4 py-2 rounded transition-all border border-red-600/50"
          >
            <LogOut size={16} /> <span className="hidden md:inline">Salir</span>
          </button>
        </div>
      </nav>

      {/* Contenido Dinámico */}
      <div className="container mx-auto p-6">
        
        {/* VISTA 1: DASHBOARD (MENÚ PRINCIPAL) */}
        {vistaActual === 'dashboard' && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Hola, Director 👋</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Botón Noticias */}
              <button 
                onClick={() => setVistaActual('noticias')}
                className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition-all flex flex-col items-center gap-4 border border-slate-200 group"
              >
                <div className="bg-blue-100 p-4 rounded-full text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <FileText size={40} />
                </div>
                <span className="font-bold text-slate-700 text-lg">Gestionar Noticias</span>
                <p className="text-sm text-slate-400 text-center">Subir, editar y eliminar comunicados.</p>
              </button>

              {/* Botón Galería (Próximamente) */}
              <button 
                disabled
                className="bg-white p-8 rounded-xl shadow border border-slate-200 flex flex-col items-center gap-4 opacity-60 cursor-not-allowed"
              >
                <div className="bg-purple-100 p-4 rounded-full text-purple-600">
                  <Image size={40} />
                </div>
                <span className="font-bold text-slate-700 text-lg">Gestionar Galería</span>
                <p className="text-xs bg-slate-200 px-2 py-1 rounded text-slate-600">Próximamente</p>
              </button>

            </div>
          </div>
        )}

        {/* VISTA 2: GESTIÓN DE NOTICIAS */}
        {vistaActual === 'noticias' && (
          <div className="animate-fade-in">
            <PanelNoticias />
          </div>
        )}

      </div>
    </div>
  );
}