// import { Check, Clock, MapPin, Car, FileText, CheckCircle2 } from 'lucide-react';
// import { useServiceStore } from '../../store/useServiceStore';

// export function ServiceSuccess() {
//   const estadoActual = useServiceStore((state) => state.estadoActual);
//   const servicioActivo = useServiceStore((state) => state.servicioActivo);
//   const cerrarServicio = useServiceStore((state) => state.cerrarServicio);

//   if (estadoActual !== 'EXITO_SERVICIO' || !servicioActivo) {
//     return null;
//   }

//   // Generar número de expediente con formato EXP-AÑO-ID
//   const numeroExpediente = `EXP-2026-${servicioActivo.id}`;

//   const handleLiberarUnidad = async () => {
//     await cerrarServicio(); // Borra el servicio activo y coloca estadoActual = IDLE
//   };

//   return (
//     <div className="w-full max-w-md mx-auto p-4 space-y-4 animate-in zoom-in-95 duration-200 my-auto pb-20">
      
//       {/* Icono de Confirmación */}
//       <div className="text-center space-y-2">
//         <div className="w-20 h-20 rounded-full border-4 border-[var(--color-primary)] flex items-center justify-center text-[var(--color-primary)] bg-[var(--color-primary)]/10 shadow-xl mx-auto">
//           <Check className="w-12 h-12 stroke-[3]" />
//         </div>
//         <h2 className="text-xl font-black text-[var(--color-primary)] tracking-tight">
//           ¡SERVICIO COMPLETADO!
//         </h2>
        
//         {/* Número de Expediente Generado */}
//         <div className="inline-flex items-center gap-1.5 bg-[var(--color-primary)]/15 border border-[var(--color-primary)]/30 px-3 py-1 rounded-full text-xs font-mono font-bold text-[var(--color-primary)]">
//           <FileText className="w-3.5 h-3.5" />
//           <span>Expediente: {numeroExpediente}</span>
//         </div>
//       </div>

//       {/* Card Informe de Cierre */}
//       <div className="bg-[var(--bg-card)] border border-[var(--bg-card-border)] rounded-2xl p-5 space-y-4 text-left shadow-2xl transition-colors">
//         <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest border-b border-[var(--bg-card-border)] pb-2 flex justify-between items-center">
//           <span>INFORME OPERATIVO DE CIERRE</span>
//           <span className="text-[var(--color-tertiary)]">VERIFICADO</span>
//         </p>

//         {/* Datos de Ruta */}
//         <div className="space-y-2 text-xs">
//           <div className="flex items-start gap-2">
//             <MapPin className="w-4 h-4 text-[var(--color-tertiary)] shrink-0 mt-0.5" />
//             <div>
//               <p className="text-[10px] text-[var(--text-muted)] font-bold">ORIGEN</p>
//               <p className="font-medium text-[var(--text-main)]">{servicioActivo.origen?.direccion}</p>
//             </div>
//           </div>
//           <div className="flex items-start gap-2">
//             <MapPin className="w-4 h-4 text-[var(--color-primary)] shrink-0 mt-0.5" />
//             <div>
//               <p className="text-[10px] text-[var(--text-muted)] font-bold">DESTINO</p>
//               <p className="font-medium text-[var(--text-main)]">{servicioActivo.destino?.direccion}</p>
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-[var(--bg-card-border)] pt-2 grid grid-cols-2 gap-2 text-xs">
//           <div>
//             <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase">Vehículo</p>
//             <p className="font-bold flex items-center gap-1">
//               <Car className="w-3.5 h-3.5 text-[var(--color-primary)]" />
//               {servicioActivo.vehiculo?.placa}
//             </p>
//           </div>
//           <div>
//             <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase">Cliente</p>
//             <p className="font-bold">{servicioActivo.cliente?.nombre}</p>
//           </div>
//         </div>

//         {/* Tiempos de Atención */}
//         <div className="bg-[var(--bg-main)] p-3 rounded-xl border border-[var(--bg-card-border)] grid grid-cols-3 gap-1 text-center text-[11px]">
//           <div>
//             <span className="block text-[9px] text-[var(--text-muted)] font-bold">LLEGADA</span>
//             <span className="font-bold font-mono">14:30</span>
//           </div>
//           <div className="border-x border-[var(--bg-card-border)]">
//             <span className="block text-[9px] text-[var(--text-muted)] font-bold">CIERRE</span>
//             <span className="font-bold font-mono">15:15</span>
//           </div>
//           <div>
//             <span className="block text-[9px] text-[var(--text-muted)] font-bold">DURACIÓN</span>
//             <span className="font-bold text-[var(--color-primary)] font-mono">45 min</span>
//           </div>
//         </div>

//         {/* Evidencias */}
//         <div className="flex items-center justify-between text-xs pt-1">
//           <span className="text-[var(--text-muted)] font-bold">Registro de Evidencias:</span>
//           <span className="font-bold text-[var(--color-tertiary)] flex items-center gap-1">
//             <CheckCircle2 className="w-4 h-4" /> Fotos + Firma
//           </span>
//         </div>
//       </div>

//       {/* Botón Principal para Liberar y Volver a Disponibilidad */}
//       <button
//         onClick={handleLiberarUnidad}
//         className="w-full py-4 bg-[var(--color-primary)] hover:opacity-90 text-slate-950 font-black text-sm uppercase tracking-wider rounded-xl shadow-lg active:scale-95 transition-all min-h-[52px]"
//       >
//         LIBERAR UNIDAD Y QUEDAR DISPONIBLE
//       </button>
//     </div>
//   );
// }

import { Check, MapPin, Car, FileText, CheckCircle2 } from 'lucide-react';
import { useServiceStore } from '../../store/useServiceStore';

export function ServiceSuccess() {
  const estadoActual = useServiceStore((state) => state.estadoActual);
  const servicioActivo = useServiceStore((state) => state.servicioActivo);
  const cerrarServicio = useServiceStore((state) => state.cerrarServicio);

  if (estadoActual !== 'EXITO_SERVICIO' || !servicioActivo) {
    return null;
  }

  // Generar número de expediente con formato EXP-AÑO-ID
  const numeroExpediente = `EXP-2026-${servicioActivo.id}`;

  // Formatear hora de inicio/llegada (HH:mm)
  const horaInicioFormatted = servicioActivo.fecha_inicio
    ? new Date(servicioActivo.fecha_inicio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
    : '--:--';

  // Formatear hora de cierre (HH:mm)
  const horaFinFormatted = servicioActivo.fecha_fin
    ? new Date(servicioActivo.fecha_fin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
    : '--:--';

  // Formatear duración en formato legible (ej. "45 min" o "1h 15m")
  const calcularDuracionTexto = (minutos) => {
    if (!minutos || minutos < 1) return '< 1 min';
    const hrs = Math.floor(minutos / 60);
    const mins = minutos % 60;
    if (hrs === 0) return `${mins} min`;
    return `${hrs}h ${mins}m`;
  };

  const duracionTexto = calcularDuracionTexto(servicioActivo.duracion_minutos);

  const handleLiberarUnidad = async () => {
    await cerrarServicio(); // Borra el servicio activo y coloca estadoActual = IDLE
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-4 animate-in zoom-in-95 duration-200 my-auto pb-20">
      
      {/* Icono de Confirmación */}
      <div className="text-center space-y-2">
        <div className="w-20 h-20 rounded-full border-4 border-[var(--color-primary)] flex items-center justify-center text-[var(--color-primary)] bg-[var(--color-primary)]/10 shadow-xl mx-auto">
          <Check className="w-12 h-12 stroke-[3]" />
        </div>
        <h2 className="text-xl font-black text-[var(--color-primary)] tracking-tight">
          ¡SERVICIO COMPLETADO!
        </h2>
        
        {/* Número de Expediente Generado */}
        <div className="inline-flex items-center gap-1.5 bg-[var(--color-primary)]/15 border border-[var(--color-primary)]/30 px-3 py-1 rounded-full text-xs font-mono font-bold text-[var(--color-primary)]">
          <FileText className="w-3.5 h-3.5" />
          <span>Expediente: {numeroExpediente}</span>
        </div>
      </div>

      {/* Card Informe de Cierre */}
      <div className="bg-[var(--bg-card)] border border-[var(--bg-card-border)] rounded-2xl p-5 space-y-4 text-left shadow-2xl transition-colors">
        <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest border-b border-[var(--bg-card-border)] pb-2 flex justify-between items-center">
          <span>INFORME OPERATIVO DE CIERRE</span>
          <span className="text-[var(--color-tertiary)]">VERIFICADO</span>
        </p>

        {/* Datos de Ruta */}
        <div className="space-y-2 text-xs">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-[var(--color-tertiary)] shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] text-[var(--text-muted)] font-bold">ORIGEN</p>
              <p className="font-medium text-[var(--text-main)]">{servicioActivo.origen?.direccion}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-[var(--color-primary)] shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] text-[var(--text-muted)] font-bold">DESTINO</p>
              <p className="font-medium text-[var(--text-main)]">{servicioActivo.destino?.direccion}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--bg-card-border)] pt-2 grid grid-cols-2 gap-2 text-xs">
          <div>
            <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase">Vehículo</p>
            <p className="font-bold flex items-center gap-1">
              <Car className="w-3.5 h-3.5 text-[var(--color-primary)]" />
              {servicioActivo.vehiculo?.placa}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase">Cliente</p>
            <p className="font-bold">{servicioActivo.cliente?.nombre}</p>
          </div>
        </div>

        {/* Tiempos de Atención Dinámicos */}
        <div className="bg-[var(--bg-main)] p-3 rounded-xl border border-[var(--bg-card-border)] grid grid-cols-3 gap-1 text-center text-[11px]">
          <div>
            <span className="block text-[9px] text-[var(--text-muted)] font-bold">INICIO / LLEGADA</span>
            <span className="font-bold font-mono">{horaInicioFormatted}</span>
          </div>
          <div className="border-x border-[var(--bg-card-border)]">
            <span className="block text-[9px] text-[var(--text-muted)] font-bold">CIERRE</span>
            <span className="font-bold font-mono">{horaFinFormatted}</span>
          </div>
          <div>
            <span className="block text-[9px] text-[var(--text-muted)] font-bold">DURACIÓN</span>
            <span className="font-bold text-[var(--color-primary)] font-mono">{duracionTexto}</span>
          </div>
        </div>

        {/* Evidencias */}
        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-[var(--text-muted)] font-bold">Registro de Evidencias:</span>
          <span className="font-bold text-[var(--color-tertiary)] flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Fotos + Firma
          </span>
        </div>
      </div>

      {/* Botón Principal para Liberar y Volver a Disponibilidad */}
      <button
        onClick={handleLiberarUnidad}
        className="w-full py-4 bg-[var(--color-primary)] hover:opacity-90 text-slate-950 font-black text-sm uppercase tracking-wider rounded-xl shadow-lg active:scale-95 transition-all min-h-[52px]"
      >
        LIBERAR UNIDAD Y QUEDAR DISPONIBLE
      </button>
    </div>
  );
}