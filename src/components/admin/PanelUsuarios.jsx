import React, { useState } from 'react';
import { UserPlus, Loader } from 'lucide-react';

export default function PanelUsuarios() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('docente');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const generatedEmail = username ? `${username.trim().toLowerCase()}@liceo.edu.co` : '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("El nombre de usuario y la contraseña son obligatorios.");
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    const userData = {
      username: username.trim().toLowerCase(),
      password,
      role,
      email: generatedEmail,
    };

    console.log("Intentando crear usuario con:", userData);
    
    /* Conexión a Cloud Function para la gestión de usuarios (pendiente) */
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setError("Funcionalidad no conectada. Revisa la consola para ver los datos que se enviarían.");

    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
        <UserPlus /> Gestión de Usuarios
      </h2>

      <form onSubmit={handleSubmit} className="bg-slate-50 p-6 rounded-lg border border-slate-200 max-w-lg mx-auto">
        <h3 className="font-bold text-slate-700 mb-4">Crear Nuevo Usuario</h3>
        
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">{error}</p>}
        {success && <p className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-sm">{success}</p>}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Nombre de Usuario</label>
            <input 
              type="text" 
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-cyan-500 outline-none"
              placeholder="pepita.perez"
              autoCapitalize="none"
            />
            {generatedEmail && (
              <p className="text-xs text-slate-500 mt-2">
                Se creará el email de acceso: <span className="font-medium text-slate-600">{generatedEmail}</span>
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Contraseña Temporal</label>
            <input 
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-cyan-500 outline-none"
              placeholder="Mínimo 6 caracteres"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Asignar Rol</label>
            <select 
              value={role}
              onChange={e => setRole(e.target.value)}
              className="w-full p-2 border rounded bg-white focus:ring-2 focus:ring-cyan-500 outline-none"
            >
              <option value="docente">Docente (Juegos)</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading || !username}
          className="mt-6 w-full bg-cyan-600 text-white px-6 py-2 rounded hover:bg-cyan-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? <><Loader size={18} className="animate-spin"/> Creando...</> : 'Crear Usuario'}
        </button>
      </form>

    </div>
  );
}
