import React, { useState } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { LogOut, Image, FileText, ArrowLeft, Calendar, Users } from 'lucide-react'; // Import Users icon

// Importamos los módulos
import PanelNoticias from '../components/admin/PanelNoticias';
import PanelGaleria from '../components/admin/PanelGaleria';
import PanelEventos from '../components/admin/PanelEventos';
import PanelUsuarios from '../components/admin/PanelUsuarios'; // <-- NUEVO IMPORT

export default function AdminPanel() {
  const navigate = useNavigate();
  // Estado para saber qué "pestaña" estamos viendo
  const [vistaActual, setVistaActual] = useState('dashboard'); // 'dashboard', 'noticias', 'galeria', 'eventos', 'usuarios'

  const cerrarSesion = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Barra Superior */}
      <nav className="bg-celeste-900 text-white p-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            {vistaActual !== 'dashboard' && (
              <button onClick={() => setVistaActual('dashboard')} className="hover:bg-white/10 p-2 rounded-full transition-colors" title="Volver al inicio">
                <ArrowLeft size={24}/>
              </button>
            )}
            <h1 className="text-xl font-bold text-celeste-100">Panel Administrativo</h1>
          </div>
          <button 
            onClick={cerrarSesion}
            className="flex items-center gap-2 text-sm bg-red-600/20 hover:bg-red-600 px-4 py-2 rounded-lg transition-all border border-red-500/30"
          >
            <LogOut size={16} /> <span className="hidden md:inline">Salir</span>
          </button>
        </div>
      </nav>

      {/* Contenido Dinámico */}
      <div className="container mx-auto p-6 max-w-6xl">
        
        {/* VISTA 1: DASHBOARD (MENÚ PRINCIPAL) */}
        {vistaActual === 'dashboard' && (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-celeste-900 mb-2">Hola, Director 👋</h2>
            <p className="text-slate-500 mb-8">Selecciona qué deseas gestionar hoy.</p>

            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Botón Noticias */}
              <button 
                onClick={() => setVistaActual('noticias')}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all flex flex-col items-center gap-4 border border-slate-100 group"
              >
                <div className="bg-blue-50 p-6 rounded-full text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <FileText size={48} />
                </div>
                <div className="text-center">
                    <span className="font-bold text-slate-800 text-xl block mb-1">Noticias</span>
                    <p className="text-sm text-slate-400">Circulares y Blog</p>
                </div>
              </button>

              {/* Botón Galería */}
              <button 
                onClick={() => setVistaActual('galeria')}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all flex flex-col items-center gap-4 border border-slate-100 group"
              >
                <div className="bg-purple-50 p-6 rounded-full text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Image size={48} />
                </div>
                <div className="text-center">
                    <span className="font-bold text-slate-800 text-xl block mb-1">Galería</span>
                    <p className="text-sm text-slate-400">Fotos y Álbumes</p>
                </div>
              </button>

              {/* Botón Eventos */}
              <button 
                onClick={() => setVistaActual('eventos')}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all flex flex-col items-center gap-4 border border-slate-100 group"
              >
                <div className="bg-green-50 p-6 rounded-full text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <Calendar size={48} />
                </div>
                <div className="text-center">
                    <span className="font-bold text-slate-800 text-xl block mb-1">Eventos</span>
                    <p className="text-sm text-slate-400">Agenda y Fechas</p>
                </div>
              </button>

              {/* Botón Usuarios (NUEVO) */}
              <button 
                onClick={() => setVistaActual('usuarios')}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all flex flex-col items-center gap-4 border border-slate-100 group"
              >
                <div className="bg-red-50 p-6 rounded-full text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <Users size={48} />
                </div>
                <div className="text-center">
                    <span className="font-bold text-slate-800 text-xl block mb-1">Usuarios</span>
                    <p className="text-sm text-slate-400">Gestionar Roles</p>
                </div>
              </button>

            </div>
          </div>
        )}

        {/* VISTAS ESPECÍFICAS */}
        {vistaActual === 'noticias' && <div className="animate-fade-in"><PanelNoticias /></div>}
        {vistaActual === 'galeria' && <div className="animate-fade-in"><PanelGaleria /></div>}
        {vistaActual === 'eventos' && <div className="animate-fade-in"><PanelEventos /></div>}
        {vistaActual === 'usuarios' && <div className="animate-fade-in"><PanelUsuarios /></div>} {/* <-- NUEVA VISTA */}

      </div>
    </div>
  );
}