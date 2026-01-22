import usePageMeta from "../../components/usePageTitle";
import React from 'react';
import { Seccion, Titulo, TarjetaCristal } from '../../components/UI';
import Mantenimiento from '../../components/Mantenimiento';

export default function Comunidad() {
  
  const EN_MANTENIMIENTO = true; 
  
    if (EN_MANTENIMIENTO) {
      return <Mantenimiento pagina="Comunidad" />;
    }



  
  
  usePageMeta("Familia Liceísta", "Conoce a las personas que forman parte del Liceo Formador de Exploradores: padres, docentes y estudiantes.");
  return (
    <div className="pt-20 bg-celeste-400 min-h-screen">
      <Seccion>
        <Titulo>Familia Liceísta</Titulo>
        <div className="grid md:grid-cols-2 gap-8">
            <TarjetaCristal>
                <h3 className="text-2xl font-bold mb-4">Escuela de Padres</h3>
                <p className="mb-4">Espacio de formación para acompañar a las familias en la crianza.</p>
                <ul className="list-disc list-inside opacity-90 space-y-2">
                    <li>Talleres de pautas de crianza.</li>
                    <li>Psicología familiar.</li>
                    <li>Actividades de integración.</li>
                </ul>
            </TarjetaCristal>
            <TarjetaCristal>
                <h3 className="text-2xl font-bold mb-4">Nuestros Docentes</h3>
                <p className="mb-4">Profesionales idóneos, llenos de amor y vocación.</p>
                <ul className="list-disc list-inside opacity-90 space-y-2">
                    <li>Licenciados en Pedagogía Infantil.</li>
                    <li>Capacitación constante.</li>
                    <li>Acompañamiento personalizado.</li>
                </ul>
            </TarjetaCristal>
        </div>
      </Seccion>
    </div>
  );
}