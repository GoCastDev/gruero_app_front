// import { CheckCircle2, Navigation, MapPin, Truck, Flag } from 'lucide-react';
// import { useServiceStore, ESTADOS_SERVICIO } from '../../store/useServiceStore';

// const PASOS = [
//   { key: ESTADOS_SERVICIO.ACEPTADO, label: 'Aceptado', icon: CheckCircle2 },
//   { key: ESTADOS_SERVICIO.EN_RUTA_ORIGEN, label: 'Ruta A', icon: Navigation },
//   { key: ESTADOS_SERVICIO.EN_PUNTO_ORIGEN, label: 'Punto A', icon: MapPin },
//   { key: ESTADOS_SERVICIO.EN_RUTA_DESTINO, label: 'Ruta B', icon: Truck },
//   { key: ESTADOS_SERVICIO.ENTREGADO, label: 'Entregado', icon: Flag }
// ];

// export function ProgressStepper() {
//   const estadoActual = useServiceStore((state) => state.estadoActual);
//   const avanzarEstado = useServiceStore((state) => state.avanzarEstado);
//   const servicioActivo = useServiceStore((state) => state.servicioActivo);

//   if (!servicioActivo || estadoActual === ESTADOS_SERVICIO.IDLE || estadoActual === ESTADOS_SERVICIO.PENDIENTE_ACEPTACION || estadoActual === 'EXITO_SERVICIO') {
//     return null;
//   }

//   const indiceActual = PASOS.findIndex((s) => s.key === estadoActual);

//   const getBotonConfig = () => {
//     switch (estadoActual) {
//       case ESTADOS_SERVICIO.ACEPTADO:
//         return {
//           texto: 'INICIAR RUTA A ORIGEN (PUNTO A)',
//           siguienteEstado: ESTADOS_SERVICIO.EN_RUTA_ORIGEN,
//           color: 'bg-[var(--color-primary)] text-slate-950'
//         };
//       case ESTADOS_SERVICIO.EN_RUTA_ORIGEN:
//         return {
//           texto: 'MARCAR LLEGADA A ORIGEN',
//           siguienteEstado: ESTADOS_SERVICIO.EN_PUNTO_ORIGEN,
//           color: 'bg-[var(--color-tertiary)] text-slate-950'
//         };
//       case ESTADOS_SERVICIO.EN_PUNTO_ORIGEN:
//         return {
//           texto: 'ENGANCHE LISTO ➔ INICIAR TRASLADO',
//           siguienteEstado: ESTADOS_SERVICIO.EN_RUTA_DESTINO,
//           color: 'bg-[var(--color-primary)] text-slate-950'
//         };
//       case ESTADOS_SERVICIO.EN_RUTA_DESTINO:
//         return {
//           texto: 'MARCAR ENTREGADO EN DESTINO (PUNTO B)',
//           siguienteEstado: ESTADOS_SERVICIO.ENTREGADO,
//           color: 'bg-[var(--color-tertiary)] text-slate-950'
//         };
//       default:
//         return null;
//     }
//   };

//   const configBoton = getBotonConfig();

//   const handleSiguientePaso = () => {
//     if (!configBoton) return;
//     if ('geolocation' in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           avanzarEstado(configBoton.siguienteEstado, {
//             lat: pos.coords.latitude,
//             lng: pos.coords.longitude
//           });
//         },
//         () => avanzarEstado(configBoton.siguienteEstado)
//       );
//     } else {
//       avanzarEstado(configBoton.siguienteEstado);
//     }
//   };

//   return (
//     <div className="bg-[var(--bg-card)] border-t border-[var(--bg-card-border)] p-4 space-y-4 transition-colors">
//       <div className="flex items-center justify-between relative max-w-md mx-auto px-2">
//         <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1 bg-[var(--bg-card-border)] -z-0" />
//         <div
//           className="absolute top-1/2 left-6 h-1 bg-[var(--color-primary)] -z-0 transition-all duration-300"
//           style={{
//             width: `${Math.max(0, (indiceActual / (PASOS.length - 1)) * 100)}%`
//           }}
//         />

//         {PASOS.map((paso, idx) => {
//           const completado = idx < indiceActual;
//           const esActual = idx === indiceActual;
//           const Icono = paso.icon;

//           return (
//             <div key={paso.key} className="flex flex-col items-center gap-1 z-10">
//               <div
//                 className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
//                   completado
//                     ? 'bg-[var(--color-primary)] text-slate-950 ring-4 ring-[var(--bg-card)]'
//                     : esActual
//                     ? 'bg-[var(--color-tertiary)] text-slate-950 ring-4 ring-[var(--bg-card)] animate-pulse'
//                     : 'bg-[var(--bg-main)] text-[var(--text-muted)] border border-[var(--bg-card-border)]'
//                 }`}
//               >
//                 <Icono className="w-4 h-4 stroke-[2.5]" />
//               </div>
//               <span
//                 className={`text-[10px] font-bold ${
//                   esActual ? 'text-[var(--color-tertiary)]' : completado ? 'text-[var(--color-primary)]' : 'text-[var(--text-muted)]'
//                 }`}
//               >
//                 {paso.label}
//               </span>
//             </div>
//           );
//         })}
//       </div>

//       {configBoton && (
//         <div className="max-w-md mx-auto pt-1">
//           <button
//             onClick={handleSiguientePaso}
//             className={`w-full py-4 px-4 rounded-xl font-black text-sm uppercase tracking-wide shadow-xl active:scale-95 transition-all min-h-[52px] flex items-center justify-center gap-2 ${configBoton.color}`}
//           >
//             <span>{configBoton.texto}</span>
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// import { Check, Navigation, MapPin, Flag, ArrowRight } from 'lucide-react';
// import { useServiceStore, ESTADOS_SERVICIO } from '../../store/useServiceStore';

// export function ProgressStepper() {
//   const estadoActual = useServiceStore((state) => state.estadoActual);
//   const servicioActivo = useServiceStore((state) => state.servicioActivo);
//   const avanzarEstado = useServiceStore((state) => state.avanzarEstado);

//   if (
//     !servicioActivo ||
//     estadoActual === ESTADOS_SERVICIO.IDLE ||
//     estadoActual === ESTADOS_SERVICIO.EXITO_SERVICIO ||
//     estadoActual === ESTADOS_SERVICIO.PENDIENTE_EVIDENCIA
//   ) {
//     return null;
//   }

//   // Pasos de la operación (A, B y C)
//   const pasillos = [
//     { id: ESTADOS_SERVICIO.ACEPTADO, label: 'Aceptado', icon: Check },
//     { id: ESTADOS_SERVICIO.EN_CAMINO_ORIGEN, label: 'Ruta B', icon: Navigation },
//     { id: ESTADOS_SERVICIO.EN_SITIO_ORIGEN, label: 'Punto B', icon: MapPin },
//     { id: ESTADOS_SERVICIO.EN_CAMINO_DESTINO, label: 'Ruta C', icon: Navigation },
//     { id: ESTADOS_SERVICIO.PENDIENTE_EVIDENCIA, label: 'Punto C', icon: Flag },
//   ];

//   const obtenerIndiceEstado = (estado) => {
//     switch (estado) {
//       case ESTADOS_SERVICIO.ACEPTADO: return 0;
//       case ESTADOS_SERVICIO.EN_CAMINO_ORIGEN: return 1;
//       case ESTADOS_SERVICIO.EN_SITIO_ORIGEN: return 2;
//       case ESTADOS_SERVICIO.EN_CAMINO_DESTINO: return 3;
//       case ESTADOS_SERVICIO.PENDIENTE_EVIDENCIA: return 4;
//       default: return 0;
//     }
//   };

//   const indiceActual = obtenerIndiceEstado(estadoActual);

//   // Configuración dinámica del botón
//   const obtenerBotonConfig = () => {
//     switch (estadoActual) {
//       case ESTADOS_SERVICIO.ACEPTADO:
//         return {
//           texto: 'INICIAR RUTA A RECOGIDA (PUNTO B)',
//           siguienteEstado: ESTADOS_SERVICIO.EN_CAMINO_ORIGEN,
//           color: 'bg-[var(--color-primary)] text-slate-950 shadow-[var(--color-primary)]/20'
//         };
//       case ESTADOS_SERVICIO.EN_CAMINO_ORIGEN:
//         return {
//           texto: 'LLEGUÉ A PUNTO B (VEHÍCULO ENCONTRADO)',
//           siguienteEstado: ESTADOS_SERVICIO.EN_SITIO_ORIGEN,
//           color: 'bg-amber-500 text-slate-950 shadow-amber-500/20'
//         };
//       case ESTADOS_SERVICIO.EN_SITIO_ORIGEN:
//         return {
//           texto: 'INICIAR TRASLADO A DESTINO (PUNTO C)',
//           siguienteEstado: ESTADOS_SERVICIO.EN_CAMINO_DESTINO,
//           color: 'bg-[var(--color-primary)] text-slate-950 shadow-[var(--color-primary)]/20'
//         };
//       case ESTADOS_SERVICIO.EN_CAMINO_DESTINO:
//         return {
//           texto: 'LLEGUÉ A DESTINO FINAL (PUNTO C)',
//           siguienteEstado: ESTADOS_SERVICIO.PENDIENTE_EVIDENCIA,
//           color: 'bg-emerald-500 text-slate-950 shadow-emerald-500/20'
//         };
//       default:
//         return null;
//     }
//   };

//   const botonConfig = obtenerBotonConfig();

//   const handleSiguiente = () => {
//     if (botonConfig) {
//       avanzarEstado(botonConfig.siguienteEstado);
//     }
//   };

//   return (
//     <div className="fixed bottom-16 left-0 right-0 z-30 bg-[var(--bg-card)]/95 backdrop-blur-md border-t border-[var(--bg-card-border)] p-3 space-y-3 max-w-md mx-auto shadow-2xl">

//       {/* Indicadores de Pasos */}
//       <div className="flex items-center justify-between px-2">
//         {pasillos.map((paso, idx) => {
//           const Icon = paso.icon;
//           const estaCompletado = idx < indiceActual;
//           const esActual = idx === indiceActual;

//           return (
//             <div key={paso.id} className="flex flex-col items-center flex-1 relative">
//               {idx > 0 && (
//                 <div
//                   className={`absolute top-3.5 -left-1/2 w-full h-0.5 transition-colors -z-10 ${
//                     idx <= indiceActual ? 'bg-[var(--color-primary)]' : 'bg-[var(--bg-card-border)]'
//                   }`}
//                 />
//               )}

//               <div
//                 className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-md ${
//                   estaCompletado
//                     ? 'bg-[var(--color-primary)] text-slate-950'
//                     : esActual
//                     ? 'bg-[var(--color-primary)] text-slate-950 ring-4 ring-[var(--color-primary)]/20 scale-110'
//                     : 'bg-[var(--bg-main)] text-[var(--text-muted)] border border-[var(--bg-card-border)]'
//                 }`}
//               >
//                 <Icon className="w-3.5 h-3.5 stroke-[2.5]" />
//               </div>

//               <span
//                 className={`text-[9px] mt-1 font-bold truncate max-w-[55px] ${
//                   esActual ? 'text-[var(--color-primary)]' : 'text-[var(--text-muted)]'
//                 }`}
//               >
//                 {paso.label}
//               </span>
//             </div>
//           );
//         })}
//       </div>

//       {/* Botón de Acción Principal */}
//       {botonConfig && (
//         <button
//           onClick={handleSiguiente}
//           className={`w-full py-3.5 font-black text-xs uppercase tracking-wider rounded-xl shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 min-h-[48px] ${botonConfig.color}`}
//         >
//           <span>{botonConfig.texto}</span>
//           <ArrowRight className="w-4 h-4 stroke-[3]" />
//         </button>
//       )}

//     </div>
//   );
// }   GEMINI

// import {
//   Check,
//   Navigation,
//   MapPin,
//   Truck,
//   Flag,
//   ChevronRight,
// } from 'lucide-react';

// import {
//   useServiceStore,
//   ESTADOS_SERVICIO,
// } from '../../store/useServiceStore';

// export function ProgressStepper() {
//   const estadoActual = useServiceStore((state) => state.estadoActual);
//   const servicioActivo = useServiceStore((state) => state.servicioActivo);
//   const avanzarEstado = useServiceStore((state) => state.avanzarEstado);

//   /**
//    * El progress stepper solamente debe aparecer
//    * mientras existe un servicio operativo activo.
//    */
//   if (
//     !servicioActivo ||
//     estadoActual === ESTADOS_SERVICIO.IDLE ||
//     estadoActual === ESTADOS_SERVICIO.EXITO_SERVICIO ||
//     estadoActual === ESTADOS_SERVICIO.PENDIENTE_EVIDENCIA
//   ) {
//     return null;
//   }

//   /**
//    * Estados visibles para el gruero.
//    *
//    * Evitamos "Ruta B", "Punto B", etc. en la interfaz.
//    * Internamente tus estados continúan siendo exactamente los mismos.
//    */
//   const pasos = [
//     {
//       id: ESTADOS_SERVICIO.ACEPTADO,
//       label: 'Aceptado',
//       icon: Check,
//     },
//     {
//       id: ESTADOS_SERVICIO.EN_CAMINO_ORIGEN,
//       label: 'En camino',
//       icon: Navigation,
//     },
//     {
//       id: ESTADOS_SERVICIO.EN_SITIO_ORIGEN,
//       label: 'En sitio',
//       icon: MapPin,
//     },
//     {
//       id: ESTADOS_SERVICIO.EN_CAMINO_DESTINO,
//       label: 'Traslado',
//       icon: Truck,
//     },
//     {
//       id: ESTADOS_SERVICIO.PENDIENTE_EVIDENCIA,
//       label: 'Entregado',
//       icon: Flag,
//     },
//   ];

//   /**
//    * Convierte el estado del store
//    * en la posición visual del stepper.
//    */
//   const obtenerIndiceEstado = (estado) => {
//     switch (estado) {
//       case ESTADOS_SERVICIO.ACEPTADO:
//         return 0;

//       case ESTADOS_SERVICIO.EN_CAMINO_ORIGEN:
//         return 1;

//       case ESTADOS_SERVICIO.EN_SITIO_ORIGEN:
//         return 2;

//       case ESTADOS_SERVICIO.EN_CAMINO_DESTINO:
//         return 3;

//       case ESTADOS_SERVICIO.PENDIENTE_EVIDENCIA:
//         return 4;

//       default:
//         return 0;
//     }
//   };

//   const indiceActual = obtenerIndiceEstado(estadoActual);

//   /**
//    * Acción contextual según el estado.
//    *
//    * Dejamos los colores de estados únicamente como pequeños
//    * acentos visuales. La acción principal conserva la identidad GoCast.
//    */
//   const obtenerBotonConfig = () => {
//     switch (estadoActual) {
//       case ESTADOS_SERVICIO.ACEPTADO:
//         return {
//           titulo: 'Iniciar ruta',
//           descripcion: 'Dirígete al punto de recogida',
//           siguienteEstado: ESTADOS_SERVICIO.EN_CAMINO_ORIGEN,
//           icon: Navigation,
//         };

//       case ESTADOS_SERVICIO.EN_CAMINO_ORIGEN:
//         return {
//           titulo: 'Confirmar llegada',
//           descripcion: 'Ya estoy en el punto de recogida',
//           siguienteEstado: ESTADOS_SERVICIO.EN_SITIO_ORIGEN,
//           icon: MapPin,
//         };

//       case ESTADOS_SERVICIO.EN_SITIO_ORIGEN:
//         return {
//           titulo: 'Iniciar traslado',
//           descripcion: 'Vehículo cargado y listo',
//           siguienteEstado: ESTADOS_SERVICIO.EN_CAMINO_DESTINO,
//           icon: Truck,
//         };

//       case ESTADOS_SERVICIO.EN_CAMINO_DESTINO:
//         return {
//           titulo: 'Confirmar entrega',
//           descripcion: 'Llegué al destino final',
//           siguienteEstado: ESTADOS_SERVICIO.PENDIENTE_EVIDENCIA,
//           icon: Flag,
//         };

//       default:
//         return null;
//     }
//   };

//   const botonConfig = obtenerBotonConfig();

//   const handleSiguiente = () => {
//     if (!botonConfig) return;

//     avanzarEstado(botonConfig.siguienteEstado);
//   };

//   const ActionIcon = botonConfig?.icon;

//   return (
//     <section
//       className="
//       relative
//       z-30
//       mx-auto
//       w-full
//       max-w-md
//       bg-[var(--bg-main)]
//       px-2
//       pt-1
//     ">
//       <div
//         className="
//           overflow-hidden
//           rounded-[24px]
//           border
//           border-[var(--bg-card-border)]
//           bg-[var(--bg-card)]/95
//           shadow-[var(--shadow-floating)]
//           backdrop-blur-xl
//         "
//       >
//         {/* =====================================================
//             PROGRESO
//         ===================================================== */}

//         <div className="px-3 pb-2 pt-3">
//           <div className="relative flex items-start justify-between">

//             {/* Línea base */}
//             <div
//               className="
//                 absolute
//                 left-[9%]
//                 right-[9%]
//                 top-[15px]
//                 h-[2px]
//                 rounded-full
//                 bg-slate-200
//               "
//             />

//             {/* Línea completada */}
//             <div
//               className="
//                 absolute
//                 left-[9%]
//                 top-[15px]
//                 h-[2px]
//                 rounded-full
//                 bg-[var(--color-primary)]
//                 transition-all
//                 duration-500
//               "
//               style={{
//                 width: `${(indiceActual / (pasos.length - 1)) * 82}%`,
//               }}
//             />

//             {pasos.map((paso, idx) => {
//               const Icon = paso.icon;

//               const completado = idx < indiceActual;
//               const actual = idx === indiceActual;

//               return (
//                 <div
//                   key={paso.id}
//                   className="
//                     relative
//                     z-10
//                     flex
//                     w-1/5
//                     flex-col
//                     items-center
//                     text-center
//                   "
//                 >
//                   <div
//                     className={`
//                       flex
//                       h-[30px]
//                       w-[30px]
//                       items-center
//                       justify-center
//                       rounded-full
//                       transition-all
//                       duration-300

//                       ${completado
//                         ? `
//                             bg-[var(--color-primary)]
//                             text-white
//                           `
//                         : actual
//                           ? `
//                             bg-[var(--color-primary)]
//                             text-white
//                             ring-4
//                             ring-[var(--color-primary)]/15
//                           `
//                           : `
//                             border
//                             border-slate-200
//                             bg-slate-100
//                             text-slate-400
//                           `
//                       }
//                     `}
//                   >
//                     {completado ? (
//                       <Check className="h-3.5 w-3.5 stroke-[3]" />
//                     ) : (
//                       <Icon className="h-3.5 w-3.5 stroke-[2.3]" />
//                     )}
//                   </div>

//                   <span
//                     className={`
//                       mt-2
//                       max-w-[64px]
//                       text-[9px]
//                       font-semibold
//                       leading-tight

//                       ${actual
//                         ? 'text-[var(--color-primary)]'
//                         : completado
//                           ? 'text-slate-600'
//                           : 'text-slate-400'
//                       }
//                     `}
//                   >
//                     {paso.label}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* =====================================================
//             ACCIÓN PRINCIPAL
//         ===================================================== */}

//         {botonConfig && (
//           <div className="border-t border-slate-100 p-3">
//             <button
//               type="button"
//               onClick={handleSiguiente}
//               className="
//                 group
//                 flex
//                 min-h-[58px]
//                 w-full
//                 items-center
//                 gap-3
//                 rounded-[18px]
//                 bg-[var(--color-primary)]
//                 px-4
//                 text-left
//                 text-white
//                 shadow-[0_10px_24px_rgba(59,71,110,0.24)]
//                 transition-all
//                 duration-200

//                 active:
//                   scale-[0.985]
//                   shadow-md
//               "
//             >
//               {/* Icono */}
//               <div
//                 className="
//                   flex
//                   h-10
//                   w-10
//                   shrink-0
//                   items-center
//                   justify-center
//                   rounded-full
//                   bg-white/15
//                 "
//               >
//                 {ActionIcon && (
//                   <ActionIcon className="h-5 w-5 stroke-[2.3]" />
//                 )}
//               </div>

//               {/* Texto */}
//               <div className="min-w-0 flex-1">
//                 <div className="text-sm font-bold leading-tight">
//                   {botonConfig.titulo}
//                 </div>

//                 <div className="mt-0.5 text-[11px] font-medium text-white/70">
//                   {botonConfig.descripcion}
//                 </div>
//               </div>

//               {/* Chevron */}
//               <div
//                 className="
//                   flex
//                   h-9
//                   w-9
//                   shrink-0
//                   items-center
//                   justify-center
//                   rounded-full
//                   bg-white/10
//                   transition-transform
//                   group-active:translate-x-1
//                 "
//               >
//                 <ChevronRight className="h-5 w-5" />
//               </div>
//             </button>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }  // ACTUAL EN PRODUCCION //

import { useState, useRef, useEffect } from 'react';
import {
  Check,
  Navigation,
  MapPin,
  Truck,
  Flag,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';

import {
  useServiceStore,
  ESTADOS_SERVICIO,
} from '../../store/useServiceStore';

export function ProgressStepper() {
  const [confirmando, setConfirmando] = useState(false);
  const timerRef = useRef(null);

  const estadoActual = useServiceStore((state) => state.estadoActual);
  const servicioActivo = useServiceStore((state) => state.servicioActivo);
  const avanzarEstado = useServiceStore((state) => state.avanzarEstado);

  // Reiniciar el estado de confirmación si el estado del servicio cambia
  useEffect(() => {
    setConfirmando(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, [estadoActual]);

  // Limpieza del temporizador al desmontar
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (
    !servicioActivo ||
    estadoActual === ESTADOS_SERVICIO.IDLE ||
    estadoActual === ESTADOS_SERVICIO.EXITO_SERVICIO ||
    estadoActual === ESTADOS_SERVICIO.PENDIENTE_EVIDENCIA
  ) {
    return null;
  }

  const pasos = [
    { id: ESTADOS_SERVICIO.ACEPTADO, label: 'Aceptado', icon: Check },
    { id: ESTADOS_SERVICIO.EN_CAMINO_ORIGEN, label: 'En camino', icon: Navigation },
    { id: ESTADOS_SERVICIO.EN_SITIO_ORIGEN, label: 'En sitio', icon: MapPin },
    { id: ESTADOS_SERVICIO.EN_CAMINO_DESTINO, label: 'Traslado', icon: Truck },
    { id: ESTADOS_SERVICIO.PENDIENTE_EVIDENCIA, label: 'Entregado', icon: Flag },
  ];

  const obtenerIndiceEstado = (estado) => {
    switch (estado) {
      case ESTADOS_SERVICIO.ACEPTADO: return 0;
      case ESTADOS_SERVICIO.EN_CAMINO_ORIGEN: return 1;
      case ESTADOS_SERVICIO.EN_SITIO_ORIGEN: return 2;
      case ESTADOS_SERVICIO.EN_CAMINO_DESTINO: return 3;
      case ESTADOS_SERVICIO.PENDIENTE_EVIDENCIA: return 4;
      default: return 0;
    }
  };

  const indiceActual = obtenerIndiceEstado(estadoActual);

  const obtenerBotonConfig = () => {
    switch (estadoActual) {
      case ESTADOS_SERVICIO.ACEPTADO:
        return {
          titulo: 'Iniciar ruta',
          descripcion: 'Dirígete al punto de recogida',
          siguienteEstado: ESTADOS_SERVICIO.EN_CAMINO_ORIGEN,
          icon: Navigation,
        };
      case ESTADOS_SERVICIO.EN_CAMINO_ORIGEN:
        return {
          titulo: 'Confirmar llegada',
          descripcion: 'Ya estoy en el punto de recogida',
          siguienteEstado: ESTADOS_SERVICIO.EN_SITIO_ORIGEN,
          icon: MapPin,
        };
      case ESTADOS_SERVICIO.EN_SITIO_ORIGEN:
        return {
          titulo: 'Iniciar traslado',
          descripcion: 'Vehículo cargado y listo',
          siguienteEstado: ESTADOS_SERVICIO.EN_CAMINO_DESTINO,
          icon: Truck,
        };
      case ESTADOS_SERVICIO.EN_CAMINO_DESTINO:
        return {
          titulo: 'Confirmar entrega',
          descripcion: 'Llegué al destino final',
          siguienteEstado: ESTADOS_SERVICIO.PENDIENTE_EVIDENCIA,
          icon: Flag,
        };
      default:
        return null;
    }
  };

  const botonConfig = obtenerBotonConfig();

  const handleBotonClick = () => {
    if (!botonConfig) return;

    if (!confirmando) {
      // Primer toque: Entrar en modo confirmación
      setConfirmando(true);
      
      // Auto-cancelar si no confirma en 4 segundos
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setConfirmando(false);
      }, 4000);
    } else {
      // Segundo toque: Ejecutar acción
      if (timerRef.current) clearTimeout(timerRef.current);
      setConfirmando(false);
      avanzarEstado(botonConfig.siguienteEstado);
    }
  };

  const ActionIcon = confirmando ? AlertTriangle : botonConfig?.icon;

  return (
    <section className="relative z-30 mx-auto w-full max-w-md bg-[var(--bg-main)] px-2 pt-1">
      <div className="overflow-hidden rounded-[24px] border border-[var(--bg-card-border)] bg-[var(--bg-card)]/95 shadow-[var(--shadow-floating)] backdrop-blur-xl">
        
        {/* PROGRESO */}
        <div className="px-3 pb-2 pt-3">
          <div className="relative flex items-start justify-between">
            <div className="absolute left-[9%] right-[9%] top-[15px] h-[2px] rounded-full bg-slate-200" />
            <div
              className="absolute left-[9%] top-[15px] h-[2px] rounded-full bg-[var(--color-primary)] transition-all duration-500"
              style={{ width: `${(indiceActual / (pasos.length - 1)) * 82}%` }}
            />

            {pasos.map((paso, idx) => {
              const Icon = paso.icon;
              const completado = idx < indiceActual;
              const actual = idx === indiceActual;

              return (
                <div key={paso.id} className="relative z-10 flex w-1/5 flex-col items-center text-center">
                  <div
                    className={`flex h-[30px] w-[30px] items-center justify-center rounded-full transition-all duration-300 ${
                      completado
                        ? 'bg-[var(--color-primary)] text-white'
                        : actual
                        ? 'bg-[var(--color-primary)] text-white ring-4 ring-[var(--color-primary)]/15'
                        : 'border border-slate-200 bg-slate-100 text-slate-400'
                    }`}
                  >
                    {completado ? (
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    ) : (
                      <Icon className="h-3.5 w-3.5 stroke-[2.3]" />
                    )}
                  </div>
                  <span
                    className={`mt-2 max-w-[64px] text-[9px] font-semibold leading-tight ${
                      actual
                        ? 'text-[var(--color-primary)]'
                        : completado
                        ? 'text-slate-600'
                        : 'text-slate-400'
                    }`}
                  >
                    {paso.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ACCIÓN PRINCIPAL (Doble Toque) */}
        {botonConfig && (
          <div className="border-t border-slate-100 p-3">
            <button
              type="button"
              onClick={handleBotonClick}
              className={`
                group flex min-h-[58px] w-full items-center gap-3 rounded-[18px] px-4 text-left text-white 
                shadow-[0_10px_24px_rgba(59,71,110,0.24)] transition-all duration-300 active:scale-[0.985] active:shadow-md
                ${confirmando ? 'bg-orange-500 ring-4 ring-orange-500/20' : 'bg-[var(--color-primary)]'}
              `}
            >
              {/* Icono */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15">
                {ActionIcon && (
                  <ActionIcon className={`h-5 w-5 stroke-[2.3] ${confirmando ? 'animate-pulse' : ''}`} />
                )}
              </div>

              {/* Texto */}
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold leading-tight">
                  {confirmando ? 'Toca para confirmar' : botonConfig.titulo}
                </div>
                <div className="mt-0.5 text-[11px] font-medium text-white/80">
                  {confirmando ? 'Cancelar en 4s...' : botonConfig.descripcion}
                </div>
              </div>

              {/* Chevron */}
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 transition-transform group-active:translate-x-1">
                <ChevronRight className="h-5 w-5" />
              </div>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}