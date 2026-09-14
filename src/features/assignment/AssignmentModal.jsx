// import { MapPin, Car, Phone, AlertCircle, Check, X, Loader2 } from 'lucide-react';
// import { useState } from 'react';
// import { useServiceStore, ESTADOS_SERVICIO } from '../../store/useServiceStore';

// export function AssignmentModal() {
//   const estadoActual = useServiceStore((state) => state.estadoActual);
//   const servicioActivo = useServiceStore((state) => state.servicioActivo);
//   const aceptarServicioConOrigenGps = useServiceStore((state) => state.aceptarServicioConOrigenGps);
//   const cerrarServicio = useServiceStore((state) => state.cerrarServicio);

//   const [obteniendoGps, setObteniendoGps] = useState(false);

//   if (estadoActual !== ESTADOS_SERVICIO.PENDIENTE_ACEPTACION || !servicioActivo) {
//     return null;
//   }

//   const handleAceptar = () => {
//     setObteniendoGps(true);

//     if ('geolocation' in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const lat = pos.coords.latitude;
//           const lng = pos.coords.longitude;

//           // Si hay conexión y Google Maps cargado, convertimos coordenadas a dirección legible
//           if (window.google && window.google.maps && navigator.onLine) {
//             const geocoder = new window.google.maps.Geocoder();
//             geocoder.geocode({ location: { lat, lng } }, (results, status) => {
//               const direccionCalle = (status === 'OK' && results[0])
//                 ? results[0].formatted_address
//                 : `Ubicación Gruero (${lat.toFixed(4)}, ${lng.toFixed(4)})`;

//               aceptarServicioConOrigenGps({
//                 direccion: `Mi Ubicación: ${direccionCalle}`,
//                 lat: lat,
//                 lng: lng
//               });
//               setObteniendoGps(false);
//             });
//           } else {
//             // Modo Offline: Guarda coordenadas exactas obtenidas del chip GPS
//             aceptarServicioConOrigenGps({
//               direccion: `Ubicación GPS Gruero (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
//               lat: lat,
//               lng: lng
//             });
//             setObteniendoGps(false);
//           }
//         },
//         (error) => {
//           console.warn('No se obtuvo GPS exacto, manteniendo datos por defecto:', error);
//           // Si el usuario rechaza permisos de GPS, mantiene el origen asignado
//           aceptarServicioConOrigenGps(servicioActivo.origen);
//           setObteniendoGps(false);
//         },
//         { enableHighAccuracy: true, timeout: 8000 }
//       );
//     } else {
//       aceptarServicioConOrigenGps(servicioActivo.origen);
//       setObteniendoGps(false);
//     }
//   };

//   const handleRechazar = () => {
//     cerrarServicio();
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
//       <div className="bg-[var(--bg-card)] text-[var(--text-main)] w-full max-w-md rounded-2xl border border-[var(--bg-card-border)] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-200">

//         {/* Banner Alerta */}
//         <div className="bg-[var(--color-primary)] text-slate-950 p-4 flex items-center justify-between font-black">
//           <div className="flex items-center gap-2 text-base uppercase tracking-wider">
//             <AlertCircle className="w-6 h-6 shrink-0" />
//             <span>¡NUEVA ASIGNACIÓN!</span>
//           </div>
//           <span className="text-xs bg-slate-950 text-white px-2.5 py-1 rounded-md">
//             #{servicioActivo.id}
//           </span>
//         </div>

//         <div className="p-4 space-y-3 max-h-[70vh] overflow-y-auto">

//           {/* Destino y Vehículo */}
//           <div className="bg-[var(--bg-main)] rounded-xl p-3.5 space-y-3 border border-[var(--bg-card-border)]">
//             <div className="flex items-start gap-3">
//               <MapPin className="w-5 h-5 text-[var(--color-tertiary)] shrink-0 mt-0.5" />
//               <div>
//                 <p className="text-[10px] font-bold text-[var(--text-muted)] tracking-wider">PUNTO DE RECOGIDA / DESTINO</p>
//                 <p className="text-sm font-semibold">{servicioActivo.destino?.direccion}</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-[var(--bg-main)] rounded-xl p-3.5 border border-[var(--bg-card-border)] space-y-2">
//             <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-muted)] uppercase">
//               <Car className="w-4 h-4 text-[var(--color-primary)]" />
//               <span>Vehículo a Trasladar</span>
//             </div>
//             <div className="flex justify-between items-center text-sm">
//               <span className="font-bold">
//                 {servicioActivo.vehiculo?.marca} {servicioActivo.vehiculo?.modelo}
//               </span>
//               <span className="bg-[var(--color-primary)]/15 text-[var(--color-primary)] px-2 py-0.5 rounded font-mono font-bold text-xs border border-[var(--color-primary)]/30">
//                 {servicioActivo.vehiculo?.placa}
//               </span>
//             </div>
//             <p className="text-xs text-[var(--text-muted)] bg-[var(--bg-card)] p-2 rounded border border-[var(--bg-card-border)]">
//               <strong className="text-[var(--color-primary)]">Falla:</strong> {servicioActivo.vehiculo?.falla}
//             </p>
//           </div>

//           <div className="flex items-center justify-between bg-[var(--bg-main)] p-3 rounded-xl border border-[var(--bg-card-border)]">
//             <div>
//               <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase">Cliente</p>
//               <p className="text-sm font-bold">{servicioActivo.cliente?.nombre}</p>
//             </div>
//             <a
//               href={`tel:${servicioActivo.cliente?.telefono}`}
//               className="flex items-center gap-1.5 bg-[var(--bg-card)] text-[var(--text-main)] px-3 py-2 rounded-lg text-xs font-bold border border-[var(--bg-card-border)]"
//             >
//               <Phone className="w-3.5 h-3.5 text-[var(--color-tertiary)]" />
//               Llamar
//             </a>
//           </div>
//         </div>

//         {/* Acciones */}
//         <div className="p-4 bg-[var(--bg-main)] border-t border-[var(--bg-card-border)] grid grid-cols-2 gap-3">
//           <button
//             onClick={handleRechazar}
//             disabled={obteniendoGps}
//             className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm bg-[var(--bg-card)] text-rose-500 border border-[var(--bg-card-border)] active:scale-95 transition-all min-h-[48px]"
//           >
//             <X className="w-5 h-5" />
//             Rechazar
//           </button>

//           <button
//             onClick={handleAceptar}
//             disabled={obteniendoGps}
//             className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-sm bg-[var(--color-tertiary)] text-slate-950 shadow-lg active:scale-95 transition-all min-h-[48px]"
//           >
//             {obteniendoGps ? (
//               <>
//                 <Loader2 className="w-5 h-5 animate-spin" />
//                 <span>GPS...</span>
//               </>
//             ) : (
//               <>
//                 <Check className="w-5 h-5 stroke-[3]" />
//                 <span>ACEPTAR</span>
//               </>
//             )}
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }

// import { MapPin, Car, Phone, AlertCircle, Check, X, Loader2 } from 'lucide-react';
// import { useState } from 'react';
// import { useServiceStore, ESTADOS_SERVICIO } from '../../store/useServiceStore';
// import { enviarSmsSeguimiento } from '../../utils/smsHelper';

// export function AssignmentModal() {
//   const estadoActual = useServiceStore((state) => state.estadoActual);
//   const servicioActivo = useServiceStore((state) => state.servicioActivo);
//   const aceptarServicioConGps = useServiceStore((state) => state.aceptarServicioConGps);
//   const cerrarServicio = useServiceStore((state) => state.cerrarServicio);

//   const [obteniendoGps, setObteniendoGps] = useState(false);

//   if (estadoActual !== ESTADOS_SERVICIO.PENDIENTE_ACEPTACION || !servicioActivo) {
//     return null;
//   }

//   const handleAceptar = () => {
//     setObteniendoGps(true);
//     aceptarServicioConGps({
//       direccion: 'Ubicación GPS Gruero',
//       lat: lat,
//       lng: lng
//     });
//     enviarSmsSeguimiento(servicioActivo.cliente?.telefono, servicioActivo.id, 15);

//     if ('geolocation' in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const lat = pos.coords.latitude;
//           const lng = pos.coords.longitude;

//           // Guardamos el GPS del gruero en `ubicacionGruero` (Punto A) sin tocar `origen` (Punto B)
//           aceptarServicioConGps({
//             direccion: 'Ubicación GPS Gruero',
//             lat: lat,
//             lng: lng
//           });
//           setObteniendoGps(false);
//         },
//         (error) => {
//           console.warn('GPS no disponible o denegado:', error);
//           aceptarServicioConGps({
//             direccion: 'Ubicación Inicial Gruero',
//             lat: 10.4961,
//             lng: -66.8480
//           });
//           setObteniendoGps(false);
//         },
//         { enableHighAccuracy: true, timeout: 8000 }
//       );
//     } else {
//       aceptarServicioConGps({
//         direccion: 'Ubicación Inicial Gruero',
//         lat: 10.4961,
//         lng: -66.8480
//       });
//       setObteniendoGps(false);
//     }
//   };

//   const handleRechazar = () => {
//     cerrarServicio();
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
//       <div className="bg-[var(--bg-card)] text-[var(--text-main)] w-full max-w-md rounded-2xl border border-[var(--bg-card-border)] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-200">

//         {/* Banner Alerta */}
//         <div className="bg-[var(--color-primary)] text-slate-950 p-4 flex items-center justify-between font-black">
//           <div className="flex items-center gap-2 text-base uppercase tracking-wider">
//             <AlertCircle className="w-6 h-6 shrink-0" />
//             <span>¡NUEVA ASIGNACIÓN!</span>
//           </div>
//           <span className="text-xs bg-slate-950 text-white px-2.5 py-1 rounded-md">
//             #{servicioActivo.id}
//           </span>
//         </div>

//         <div className="p-4 space-y-3 max-h-[70vh] overflow-y-auto">

//           {/* Ruta Operativa: Punto B (Recogida) -> Punto C (Destino Final) */}
//           <div className="bg-[var(--bg-main)] rounded-xl p-3.5 space-y-3 border border-[var(--bg-card-border)] relative">
//             <div className="absolute left-[23px] top-[28px] bottom-[28px] w-0.5 bg-[var(--bg-card-border)] z-0" />

//             {/* Punto B: Recogida Cliente / Vehículo averiado */}
//             <div className="flex items-start gap-3 relative z-10">
//               <div className="bg-[var(--bg-main)] rounded-full p-0.5 shrink-0">
//                 <MapPin className="w-5 h-5 text-amber-500" />
//               </div>
//               <div>
//                 <p className="text-[10px] font-bold text-[var(--text-muted)] tracking-wider uppercase">
//                   PUNTO B (RECOGIDA / VEHÍCULO AVERIADO)
//                 </p>
//                 <p className="text-sm font-semibold">{servicioActivo.origen?.direccion}</p>
//               </div>
//             </div>

//             {/* Punto C: Destino Final del Traslado */}
//             <div className="flex items-start gap-3 relative z-10 pt-1">
//               <div className="bg-[var(--bg-main)] rounded-full p-0.5 shrink-0">
//                 <MapPin className="w-5 h-5 text-[var(--color-primary)]" />
//               </div>
//               <div>
//                 <p className="text-[10px] font-bold text-[var(--text-muted)] tracking-wider uppercase">
//                   PUNTO C (DESTINO DEL TRASLADO)
//                 </p>
//                 <p className="text-sm font-semibold">{servicioActivo.destino?.direccion}</p>
//               </div>
//             </div>
//           </div>

//           {/* Datos del Vehículo a Trasladar */}
//           <div className="bg-[var(--bg-main)] rounded-xl p-3.5 border border-[var(--bg-card-border)] space-y-2">
//             <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-muted)] uppercase">
//               <Car className="w-4 h-4 text-[var(--color-primary)]" />
//               <span>Vehículo a Trasladar</span>
//             </div>
//             <div className="flex justify-between items-center text-sm">
//               <span className="font-bold">
//                 {servicioActivo.vehiculo?.marca} {servicioActivo.vehiculo?.modelo}
//               </span>
//               <span className="bg-[var(--color-primary)]/15 text-[var(--color-primary)] px-2 py-0.5 rounded font-mono font-bold text-xs border border-[var(--color-primary)]/30">
//                 {servicioActivo.vehiculo?.placa}
//               </span>
//             </div>
//             <p className="text-xs text-[var(--text-muted)] bg-[var(--bg-card)] p-2 rounded border border-[var(--bg-card-border)]">
//               <strong className="text-[var(--color-primary)]">Falla:</strong> {servicioActivo.vehiculo?.falla}
//             </p>
//           </div>

//           {/* Datos del Cliente */}
//           <div className="flex items-center justify-between bg-[var(--bg-main)] p-3 rounded-xl border border-[var(--bg-card-border)]">
//             <div>
//               <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase">Cliente</p>
//               <p className="text-sm font-bold">{servicioActivo.cliente?.nombre}</p>
//             </div>
//             <a
//               href={`tel:${servicioActivo.cliente?.telefono}`}
//               className="flex items-center gap-1.5 bg-[var(--bg-card)] text-[var(--text-main)] px-3 py-2 rounded-lg text-xs font-bold border border-[var(--bg-card-border)]"
//             >
//               <Phone className="w-3.5 h-3.5 text-[var(--color-tertiary)]" />
//               Llamar
//             </a>
//           </div>
//         </div>

//         {/* Acciones */}
//         <div className="p-4 bg-[var(--bg-main)] border-t border-[var(--bg-card-border)] grid grid-cols-2 gap-3">
//           <button
//             onClick={handleRechazar}
//             disabled={obteniendoGps}
//             className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm bg-[var(--bg-card)] text-rose-500 border border-[var(--bg-card-border)] active:scale-95 transition-all min-h-[48px]"
//           >
//             <X className="w-5 h-5" />
//             Rechazar
//           </button>

//           <button
//             onClick={handleAceptar}
//             disabled={obteniendoGps}
//             className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-sm bg-[var(--color-tertiary)] text-slate-950 shadow-lg active:scale-95 transition-all min-h-[48px]"
//           >
//             {obteniendoGps ? (
//               <>
//                 <Loader2 className="w-5 h-5 animate-spin" />
//                 <span>GPS...</span>
//               </>
//             ) : (
//               <>
//                 <Check className="w-5 h-5 stroke-[3]" />
//                 <span>ACEPTAR</span>
//               </>
//             )}
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }  ULTIMA FUNCIONAL

// import { MapPin, Car, Phone, AlertCircle, Check, X, Loader2 } from 'lucide-react';
// import { useState } from 'react';
// import { useServiceStore, ESTADOS_SERVICIO } from '../../store/useServiceStore';
// import { enviarSmsSeguimiento } from '../../utils/smsHelper';

// export function AssignmentModal() {
//   const estadoActual = useServiceStore((state) => state.estadoActual);
//   const servicioActivo = useServiceStore((state) => state.servicioActivo);
//   const aceptarServicioConGps = useServiceStore((state) => state.aceptarServicioConGps);
//   const cerrarServicio = useServiceStore((state) => state.cerrarServicio);

//   const [obteniendoGps, setObteniendoGps] = useState(false);

//   if (estadoActual !== ESTADOS_SERVICIO.PENDIENTE_ACEPTACION || !servicioActivo) {
//     return null;
//   }

//   const handleAceptar = () => {
//     // 1. DISPARO SÍNCRONO INMEDIATO: Abre la app de SMS antes de perder el foco de clic
//     if (servicioActivo.cliente?.telefono) {
//       enviarSmsSeguimiento(servicioActivo.cliente.telefono, servicioActivo.id);
//     }

//     setObteniendoGps(true);

//     // 2. Temporizador de seguridad GPS
//     const timeoutSeguridad = setTimeout(() => {
//       aceptarServicioConGps({
//         direccion: 'Ubicación GPS Gruero',
//         lat: servicioActivo.origen?.lat || 10.4961,
//         lng: servicioActivo.origen?.lng || -66.8480
//       });
//       setObteniendoGps(false);
//     }, 2500);

//     if ('geolocation' in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           clearTimeout(timeoutSeguridad);
//           aceptarServicioConGps({
//             direccion: 'Ubicación GPS Gruero',
//             lat: pos.coords.latitude,
//             lng: pos.coords.longitude
//           });
//           setObteniendoGps(false);
//         },
//         (error) => {
//           clearTimeout(timeoutSeguridad);
//           aceptarServicioConGps({
//             direccion: 'Ubicación GPS Gruero',
//             lat: 10.4961,
//             lng: -66.8480
//           });
//           setObteniendoGps(false);
//         },
//         { enableHighAccuracy: false, timeout: 2000, maximumAge: 10000 }
//       );
//     } else {
//       clearTimeout(timeoutSeguridad);
//       aceptarServicioConGps({
//         direccion: 'Ubicación GPS Gruero',
//         lat: 10.4961,
//         lng: -66.8480
//       });
//       setObteniendoGps(false);
//     }
//   };

//   const handleRechazar = () => {
//     cerrarServicio();
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
//       <div className="bg-[var(--bg-card)] text-[var(--text-main)] w-full max-w-md rounded-2xl border border-[var(--bg-card-border)] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-200">

//         {/* Banner Alerta */}
//         <div className="bg-[var(--color-primary)] text-slate-950 p-4 flex items-center justify-between font-black">
//           <div className="flex items-center gap-2 text-base uppercase tracking-wider">
//             <AlertCircle className="w-6 h-6 shrink-0" />
//             <span>¡NUEVA ASIGNACIÓN!</span>
//           </div>
//           <span className="text-xs bg-slate-950 text-white px-2.5 py-1 rounded-md">
//             #{servicioActivo.id}
//           </span>
//         </div>

//         <div className="p-4 space-y-3 max-h-[70vh] overflow-y-auto">

//           {/* Ruta Operativa: Punto B -> Punto C */}
//           <div className="bg-[var(--bg-main)] rounded-xl p-3.5 space-y-3 border border-[var(--bg-card-border)] relative">
//             <div className="absolute left-[23px] top-[28px] bottom-[28px] w-0.5 bg-[var(--bg-card-border)] z-0" />

//             <div className="flex items-start gap-3 relative z-10">
//               <div className="bg-[var(--bg-main)] rounded-full p-0.5 shrink-0">
//                 <MapPin className="w-5 h-5 text-amber-500" />
//               </div>
//               <div>
//                 <p className="text-[10px] font-bold text-[var(--text-muted)] tracking-wider uppercase">
//                   PUNTO B (RECOGIDA / VEHÍCULO AVERIADO)
//                 </p>
//                 <p className="text-sm font-semibold">{servicioActivo.origen?.direccion}</p>
//               </div>
//             </div>

//             <div className="flex items-start gap-3 relative z-10 pt-1">
//               <div className="bg-[var(--bg-main)] rounded-full p-0.5 shrink-0">
//                 <MapPin className="w-5 h-5 text-[var(--color-primary)]" />
//               </div>
//               <div>
//                 <p className="text-[10px] font-bold text-[var(--text-muted)] tracking-wider uppercase">
//                   PUNTO C (DESTINO DEL TRASLADO)
//                 </p>
//                 <p className="text-sm font-semibold">{servicioActivo.destino?.direccion}</p>
//               </div>
//             </div>
//           </div>

//           {/* Vehículo */}
//           <div className="bg-[var(--bg-main)] rounded-xl p-3.5 border border-[var(--bg-card-border)] space-y-2">
//             <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-muted)] uppercase">
//               <Car className="w-4 h-4 text-[var(--color-primary)]" />
//               <span>Vehículo a Trasladar</span>
//             </div>
//             <div className="flex justify-between items-center text-sm">
//               <span className="font-bold">
//                 {servicioActivo.vehiculo?.marca} {servicioActivo.vehiculo?.modelo}
//               </span>
//               <span className="bg-[var(--color-primary)]/15 text-[var(--color-primary)] px-2 py-0.5 rounded font-mono font-bold text-xs border border-[var(--color-primary)]/30">
//                 {servicioActivo.vehiculo?.placa}
//               </span>
//             </div>
//             <p className="text-xs text-[var(--text-muted)] bg-[var(--bg-card)] p-2 rounded border border-[var(--bg-card-border)]">
//               <strong className="text-[var(--color-primary)]">Falla:</strong> {servicioActivo.vehiculo?.falla}
//             </p>
//           </div>

//           {/* Cliente */}
//           <div className="flex items-center justify-between bg-[var(--bg-main)] p-3 rounded-xl border border-[var(--bg-card-border)]">
//             <div>
//               <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase">Cliente</p>
//               <p className="text-sm font-bold">{servicioActivo.cliente?.nombre}</p>
//             </div>
//             <a
//               href={`tel:${servicioActivo.cliente?.telefono}`}
//               className="flex items-center gap-1.5 bg-[var(--bg-card)] text-[var(--text-main)] px-3 py-2 rounded-lg text-xs font-bold border border-[var(--bg-card-border)]"
//             >
//               <Phone className="w-3.5 h-3.5 text-[var(--color-tertiary)]" />
//               Llamar
//             </a>
//           </div>
//         </div>

//         {/* Botones de Acción */}
//         <div className="p-4 bg-[var(--bg-main)] border-t border-[var(--bg-card-border)] grid grid-cols-2 gap-3">
//           <button
//             type="button"
//             onClick={handleRechazar}
//             disabled={obteniendoGps}
//             className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm bg-[var(--bg-card)] text-rose-500 border border-[var(--bg-card-border)] active:scale-95 transition-all min-h-[48px]"
//           >
//             <X className="w-5 h-5" />
//             Rechazar
//           </button>

//           <button
//             type="button"
//             onClick={handleAceptar}
//             disabled={obteniendoGps}
//             className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-sm bg-[var(--color-tertiary)] text-slate-950 shadow-lg active:scale-95 transition-all min-h-[48px] cursor-pointer"
//           >
//             {obteniendoGps ? (
//               <>
//                 <Loader2 className="w-5 h-5 animate-spin" />
//                 <span>GPS...</span>
//               </>
//             ) : (
//               <>
//                 <Check className="w-5 h-5 stroke-[3]" />
//                 <span>ACEPTAR</span>
//               </>
//             )}
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }  CAMBIO POR PRUEBA

// import { MapPin, Car, Phone, AlertCircle, Check, X, Loader2 } from 'lucide-react';
// import { useState } from 'react';
// import { useServiceStore, ESTADOS_SERVICIO } from '../../store/useServiceStore';
// import { enviarSmsCliente } from '../../services/smsService';

// export function AssignmentModal() {
//   const estadoActual = useServiceStore((state) => state.estadoActual);
//   const servicioActivo = useServiceStore((state) => state.servicioActivo);
//   const aceptarServicioConGps = useServiceStore((state) => state.aceptarServicioConGps);
//   const cerrarServicio = useServiceStore((state) => state.cerrarServicio);

//   const [obteniendoGps, setObteniendoGps] = useState(false);

//   if (estadoActual !== ESTADOS_SERVICIO.PENDIENTE_ACEPTACION || !servicioActivo) {
//     return null;
//   }

//   const handleAceptar = () => {
//     setObteniendoGps(true);

//     // 1. DISPARO AUTOMÁTICO VÍA API DE FONDO (No frena la interfaz)
//     // if (servicioActivo.cliente?.telefono) {
//     //   enviarSmsCliente(servicioActivo.cliente.telefono, servicioActivo.id, 15);
//     // }

//     // 2. Temporizador de seguridad para capturar GPS e ingresar al mapa
//     const timeoutSeguridad = setTimeout(() => {
//       aceptarServicioConGps({
//         direccion: 'Ubicación GPS Gruero',
//         lat: servicioActivo.origen?.lat || 10.4961,
//         lng: servicioActivo.origen?.lng || -66.8480
//       });
//       setObteniendoGps(false);
//     }, 2000);

//     if ('geolocation' in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           clearTimeout(timeoutSeguridad);
//           aceptarServicioConGps({
//             direccion: 'Ubicación GPS Gruero',
//             lat: pos.coords.latitude,
//             lng: pos.coords.longitude
//           });
//           setObteniendoGps(false);
//         },
//         (error) => {
//           clearTimeout(timeoutSeguridad);
//           aceptarServicioConGps({
//             direccion: 'Ubicación GPS Gruero',
//             lat: 10.4961,
//             lng: -66.8480
//           });
//           setObteniendoGps(false);
//         },
//         { enableHighAccuracy: false, timeout: 2000, maximumAge: 10000 }
//       );
//     } else {
//       clearTimeout(timeoutSeguridad);
//       aceptarServicioConGps({
//         direccion: 'Ubicación GPS Gruero',
//         lat: 10.4961,
//         lng: -66.8480
//       });
//       setObteniendoGps(false);
//     }
//   };

//   const handleRechazar = () => {
//     cerrarServicio();
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
//       <div className="bg-[var(--bg-card)] text-[var(--text-main)] w-full max-w-md rounded-2xl border border-[var(--bg-card-border)] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-200">

//         {/* Banner Alerta */}
//         <div className="bg-[var(--color-primary)] text-slate-950 p-4 flex items-center justify-between font-black">
//           <div className="flex items-center gap-2 text-base uppercase tracking-wider">
//             <AlertCircle className="w-6 h-6 shrink-0" />
//             <span>¡NUEVA ASIGNACIÓN!</span>
//           </div>
//           <span className="text-xs bg-slate-950 text-white px-2.5 py-1 rounded-md">
//             #{servicioActivo.id}
//           </span>
//         </div>

//         <div className="p-4 space-y-3 max-h-[70vh] overflow-y-auto">
//           {/* Ruta Operativa */}
//           <div className="bg-[var(--bg-main)] rounded-xl p-3.5 space-y-3 border border-[var(--bg-card-border)] relative">
//             <div className="absolute left-[23px] top-[28px] bottom-[28px] w-0.5 bg-[var(--bg-card-border)] z-0" />

//             <div className="flex items-start gap-3 relative z-10">
//               <div className="bg-[var(--bg-main)] rounded-full p-0.5 shrink-0">
//                 <MapPin className="w-5 h-5 text-amber-500" />
//               </div>
//               <div>
//                 <p className="text-[10px] font-bold text-[var(--text-muted)] tracking-wider uppercase">
//                   PUNTO B (RECOGIDA / VEHÍCULO AVERIADO)
//                 </p>
//                 <p className="text-sm font-semibold">{servicioActivo.origen?.direccion}</p>
//               </div>
//             </div>

//             <div className="flex items-start gap-3 relative z-10 pt-1">
//               <div className="bg-[var(--bg-main)] rounded-full p-0.5 shrink-0">
//                 <MapPin className="w-5 h-5 text-[var(--color-primary)]" />
//               </div>
//               <div>
//                 <p className="text-[10px] font-bold text-[var(--text-muted)] tracking-wider uppercase">
//                   PUNTO C (DESTINO DEL TRASLADO)
//                 </p>
//                 <p className="text-sm font-semibold">{servicioActivo.destino?.direccion}</p>
//               </div>
//             </div>
//           </div>

//           {/* Vehículo */}
//           <div className="bg-[var(--bg-main)] rounded-xl p-3.5 border border-[var(--bg-card-border)] space-y-2">
//             <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-muted)] uppercase">
//               <Car className="w-4 h-4 text-[var(--color-primary)]" />
//               <span>Vehículo a Trasladar</span>
//             </div>
//             <div className="flex justify-between items-center text-sm">
//               <span className="font-bold">
//                 {servicioActivo.vehiculo?.marca} {servicioActivo.vehiculo?.modelo}
//               </span>
//               <span className="bg-[var(--color-primary)]/15 text-[var(--color-primary)] px-2 py-0.5 rounded font-mono font-bold text-xs border border-[var(--color-primary)]/30">
//                 {servicioActivo.vehiculo?.placa}
//               </span>
//             </div>
//             <p className="text-xs text-[var(--text-muted)] bg-[var(--bg-card)] p-2 rounded border border-[var(--bg-card-border)]">
//               <strong className="text-[var(--color-primary)]">Falla:</strong> {servicioActivo.vehiculo?.falla}
//             </p>
//           </div>

//           {/* Cliente */}
//           <div className="flex items-center justify-between bg-[var(--bg-main)] p-3 rounded-xl border border-[var(--bg-card-border)]">
//             <div>
//               <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase">Cliente</p>
//               <p className="text-sm font-bold">{servicioActivo.cliente?.nombre}</p>
//             </div>
//             <a
//               href={`tel:${servicioActivo.cliente?.telefono}`}
//               className="flex items-center gap-1.5 bg-[var(--bg-card)] text-[var(--text-main)] px-3 py-2 rounded-lg text-xs font-bold border border-[var(--bg-card-border)]"
//             >
//               <Phone className="w-3.5 h-3.5 text-[var(--color-tertiary)]" />
//               Llamar
//             </a>
//           </div>
//         </div>

//         {/* Acciones */}
//         <div className="p-4 bg-[var(--bg-main)] border-t border-[var(--bg-card-border)] grid grid-cols-2 gap-3">
//           <button
//             type="button"
//             onClick={handleRechazar}
//             disabled={obteniendoGps}
//             className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm bg-[var(--bg-card)] text-rose-500 border border-[var(--bg-card-border)] active:scale-95 transition-all min-h-[48px]"
//           >
//             <X className="w-5 h-5" />
//             Rechazar
//           </button>

//           <button
//             type="button"
//             onClick={handleAceptar}
//             disabled={obteniendoGps}
//             className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-sm bg-[var(--color-tertiary)] text-slate-950 shadow-lg active:scale-95 transition-all min-h-[48px] cursor-pointer"
//           >
//             {obteniendoGps ? (
//               <>
//                 <Loader2 className="w-5 h-5 animate-spin" />
//                 <span>GPS...</span>
//               </>
//             ) : (
//               <>
//                 <Check className="w-5 h-5 stroke-[3]" />
//                 <span>ACEPTAR</span>
//               </>
//             )}
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }  GEMINI

// import {
//   MapPin,
//   Car,
//   Phone,
//   AlertCircle,
//   Check,
//   X,
//   Loader2,
//   Navigation,
//   Wrench,
//   ChevronRight,
// } from 'lucide-react';

// import { useState } from 'react';

// import {
//   useServiceStore,
//   ESTADOS_SERVICIO,
// } from '../../store/useServiceStore';

// // Déjalo comentado mientras el envío de SMS no esté activo.
// // import { enviarSmsCliente } from '../../services/smsService';

// export function AssignmentModal() {
//   const estadoActual = useServiceStore(
//     (state) => state.estadoActual
//   );

//   const servicioActivo = useServiceStore(
//     (state) => state.servicioActivo
//   );

//   const aceptarServicioConGps = useServiceStore(
//     (state) => state.aceptarServicioConGps
//   );

//   const cerrarServicio = useServiceStore(
//     (state) => state.cerrarServicio
//   );

//   const [obteniendoGps, setObteniendoGps] = useState(false);

//   /*
//   |--------------------------------------------------------------------------
//   | Mostrar solamente cuando existe asignación pendiente
//   |--------------------------------------------------------------------------
//   */

//   if (
//     estadoActual !== ESTADOS_SERVICIO.PENDIENTE_ACEPTACION ||
//     !servicioActivo
//   ) {
//     return null;
//   }

//   /*
//   |--------------------------------------------------------------------------
//   | Aceptar servicio
//   |--------------------------------------------------------------------------
//   */

//   const handleAceptar = () => {
//     if (obteniendoGps) return;

//     setObteniendoGps(true);

//     /*
//     |--------------------------------------------------------------------------
//     | SMS
//     |--------------------------------------------------------------------------
//     |
//     | Lo mantendremos desactivado hasta revisar el flujo API.
//     |
//     */

//     // if (servicioActivo.cliente?.telefono) {
//     //   enviarSmsCliente(
//     //     servicioActivo.cliente.telefono,
//     //     servicioActivo.id,
//     //     15
//     //   );
//     // }

//     /*
//     |--------------------------------------------------------------------------
//     | Fallback GPS
//     |--------------------------------------------------------------------------
//     |
//     | Si el navegador tarda demasiado, permitimos continuar.
//     |
//     */

//     const timeoutSeguridad = setTimeout(() => {
//       aceptarServicioConGps({
//         direccion: 'Ubicación GPS Gruero',
//         lat: servicioActivo.origen?.lat || 10.4961,
//         lng: servicioActivo.origen?.lng || -66.848,
//       });

//       setObteniendoGps(false);
//     }, 2000);

//     /*
//     |--------------------------------------------------------------------------
//     | GPS real
//     |--------------------------------------------------------------------------
//     */

//     if ('geolocation' in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           clearTimeout(timeoutSeguridad);

//           aceptarServicioConGps({
//             direccion: 'Ubicación GPS Gruero',
//             lat: pos.coords.latitude,
//             lng: pos.coords.longitude,
//           });

//           setObteniendoGps(false);
//         },

//         () => {
//           clearTimeout(timeoutSeguridad);

//           aceptarServicioConGps({
//             direccion: 'Ubicación GPS Gruero',
//             lat: servicioActivo.origen?.lat || 10.4961,
//             lng: servicioActivo.origen?.lng || -66.848,
//           });

//           setObteniendoGps(false);
//         },

//         {
//           enableHighAccuracy: false,
//           timeout: 2000,
//           maximumAge: 10000,
//         }
//       );
//     } else {
//       clearTimeout(timeoutSeguridad);

//       aceptarServicioConGps({
//         direccion: 'Ubicación GPS Gruero',
//         lat: servicioActivo.origen?.lat || 10.4961,
//         lng: servicioActivo.origen?.lng || -66.848,
//       });

//       setObteniendoGps(false);
//     }
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | Rechazar servicio
//   |--------------------------------------------------------------------------
//   */

//   const handleRechazar = () => {
//     if (obteniendoGps) return;

//     cerrarServicio();
//   };

//   const telefonoCliente =
//     servicioActivo.cliente?.telefono || '';

//   const nombreVehiculo = [
//     servicioActivo.vehiculo?.marca,
//     servicioActivo.vehiculo?.modelo,
//   ]
//     .filter(Boolean)
//     .join(' ');

//   return (
//     <div
//       className="
//         fixed
//         inset-0
//         z-[100]
//         flex
//         items-end
//         justify-center
//         bg-slate-950/55
//         backdrop-blur-[3px]

//         sm:
//           items-center
//           p-4
//       "
//     >
//       {/* =====================================================
//           MODAL / BOTTOM SHEET
//       ===================================================== */}

//       <section
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby="assignment-title"
//         className="
//           flex
//           max-h-[calc(100dvh-16px)]
//           w-full
//           max-w-md
//           flex-col
//           overflow-hidden

//           rounded-t-[30px]
//           border
//           border-[var(--bg-card-border)]
//           bg-[var(--bg-card)]
//           text-[var(--text-main)]

//           shadow-[0_-20px_60px_rgba(0,0,0,0.22)]

//           sm:
//             max-h-[calc(100dvh-32px)]
//             rounded-[30px]
//         "
//       >
//         {/* =================================================
//             HANDLE MOBILE
//         ================================================= */}

//         <div className="flex h-7 shrink-0 items-center justify-center sm:hidden">
//           <div
//             className="
//               h-1
//               w-10
//               rounded-full
//               bg-[var(--bg-card-border)]
//             "
//           />
//         </div>

//         {/* =================================================
//             HEADER
//         ================================================= */}

//         <header
//           className="
//             shrink-0
//             border-b
//             border-[var(--bg-card-border)]
//             px-5
//             pb-5
//             pt-2
//           "
//         >
//           <div className="flex items-start justify-between gap-4">
//             {/* Título */}

//             <div className="min-w-0 flex-1">
//               <div
//                 className="
//                   mb-3
//                   inline-flex
//                   items-center
//                   gap-1.5
//                   rounded-full
//                   bg-[var(--color-danger-soft)]
//                   px-2.5
//                   py-1
//                   text-[10px]
//                   font-bold
//                   uppercase
//                   tracking-[0.08em]
//                   text-[var(--color-danger)]
//                 "
//               >
//                 <AlertCircle className="h-3.5 w-3.5" />

//                 Nueva solicitud
//               </div>

//               <h2
//                 id="assignment-title"
//                 className="
//                   text-[22px]
//                   font-bold
//                   leading-tight
//                   tracking-tight
//                   text-[var(--text-main)]
//                 "
//               >
//                 Nuevo servicio
//               </h2>

//               <p
//                 className="
//                   mt-1
//                   text-xs
//                   font-medium
//                   text-[var(--text-muted)]
//                 "
//               >
//                 Revisa los datos antes de aceptar
//               </p>
//             </div>

//             {/* Número de servicio */}

//             <div
//               className="
//                 shrink-0
//                 rounded-full
//                 bg-[var(--color-primary-soft)]
//                 px-3
//                 py-1.5
//                 text-xs
//                 font-bold
//                 text-[var(--color-primary)]
//               "
//             >
//               #{servicioActivo.id}
//             </div>
//           </div>
//         </header>

//         {/* =================================================
//             CONTENIDO SCROLLABLE
//         ================================================= */}

//         <div
//           className="
//             min-h-0
//             flex-1
//             overflow-y-auto
//             overscroll-contain
//             px-4
//             py-4
//           "
//         >
//           <div className="space-y-3">
//             {/* =================================================
//                 RUTA
//             ================================================= */}

//             <section className="gocast-card-flat overflow-hidden p-4">
//               <div
//                 className="
//                   mb-4
//                   flex
//                   items-center
//                   gap-2
//                 "
//               >
//                 <Navigation
//                   className="
//                     h-4
//                     w-4
//                     text-[var(--color-primary)]
//                   "
//                 />

//                 <h3
//                   className="
//                     text-xs
//                     font-bold
//                     uppercase
//                     tracking-[0.08em]
//                     text-[var(--text-secondary)]
//                   "
//                 >
//                   Ruta del servicio
//                 </h3>
//               </div>

//               <div className="relative">
//                 {/* Línea entre origen y destino */}

//                 <div
//                   className="
//                     absolute
//                     bottom-[30px]
//                     left-[15px]
//                     top-[30px]
//                     w-[2px]
//                     bg-[var(--bg-card-border)]
//                   "
//                 />

//                 {/* ORIGEN */}

//                 <div
//                   className="
//                     relative
//                     z-10
//                     flex
//                     items-start
//                     gap-3
//                     pb-5
//                   "
//                 >
//                   <div
//                     className="
//                       flex
//                       h-[30px]
//                       w-[30px]
//                       shrink-0
//                       items-center
//                       justify-center
//                       rounded-full
//                       bg-[var(--color-info-soft)]
//                       ring-4
//                       ring-[var(--bg-card)]
//                     "
//                   >
//                     <MapPin
//                       className="
//                         h-4
//                         w-4
//                         text-[var(--color-origin)]
//                       "
//                     />
//                   </div>

//                   <div className="min-w-0 flex-1">
//                     <p
//                       className="
//                         text-[10px]
//                         font-bold
//                         uppercase
//                         tracking-[0.1em]
//                         text-[var(--text-muted)]
//                       "
//                     >
//                       Origen · Recogida
//                     </p>

//                     <p
//                       className="
//                         mt-1
//                         text-[14px]
//                         font-semibold
//                         leading-5
//                         text-[var(--text-main)]
//                       "
//                     >
//                       {servicioActivo.origen?.direccion ||
//                         'Ubicación no disponible'}
//                     </p>
//                   </div>
//                 </div>

//                 {/* DESTINO */}

//                 <div
//                   className="
//                     relative
//                     z-10
//                     flex
//                     items-start
//                     gap-3
//                   "
//                 >
//                   <div
//                     className="
//                       flex
//                       h-[30px]
//                       w-[30px]
//                       shrink-0
//                       items-center
//                       justify-center
//                       rounded-full
//                       bg-[var(--color-success-soft)]
//                       ring-4
//                       ring-[var(--bg-card)]
//                     "
//                   >
//                     <MapPin
//                       className="
//                         h-4
//                         w-4
//                         text-[var(--color-destination)]
//                       "
//                     />
//                   </div>

//                   <div className="min-w-0 flex-1">
//                     <p
//                       className="
//                         text-[10px]
//                         font-bold
//                         uppercase
//                         tracking-[0.1em]
//                         text-[var(--text-muted)]
//                       "
//                     >
//                       Destino · Entrega
//                     </p>

//                     <p
//                       className="
//                         mt-1
//                         text-[14px]
//                         font-semibold
//                         leading-5
//                         text-[var(--text-main)]
//                       "
//                     >
//                       {servicioActivo.destino?.direccion ||
//                         'Ubicación no disponible'}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* =================================================
//                 VEHÍCULO
//             ================================================= */}

//             <section className="gocast-card-flat p-4">
//               <div
//                 className="
//                   flex
//                   items-center
//                   justify-between
//                   gap-3
//                 "
//               >
//                 <div className="flex min-w-0 items-center gap-3">
//                   <div
//                     className="
//                       flex
//                       h-10
//                       w-10
//                       shrink-0
//                       items-center
//                       justify-center
//                       rounded-xl
//                       bg-[var(--color-primary-soft)]
//                       text-[var(--color-primary)]
//                     "
//                   >
//                     <Car className="h-5 w-5" />
//                   </div>

//                   <div className="min-w-0">
//                     <p
//                       className="
//                         text-[10px]
//                         font-bold
//                         uppercase
//                         tracking-[0.08em]
//                         text-[var(--text-muted)]
//                       "
//                     >
//                       Vehículo
//                     </p>

//                     <p
//                       className="
//                         mt-0.5
//                         truncate
//                         text-[15px]
//                         font-bold
//                         text-[var(--text-main)]
//                       "
//                     >
//                       {nombreVehiculo ||
//                         'Vehículo no especificado'}
//                     </p>
//                   </div>
//                 </div>

//                 {servicioActivo.vehiculo?.placa && (
//                   <span
//                     className="
//                       shrink-0
//                       rounded-lg
//                       border
//                       border-[var(--bg-card-border)]
//                       bg-[var(--bg-card-secondary)]
//                       px-2.5
//                       py-1.5
//                       font-mono
//                       text-xs
//                       font-bold
//                       tracking-wider
//                       text-[var(--text-secondary)]
//                     "
//                   >
//                     {servicioActivo.vehiculo.placa}
//                   </span>
//                 )}
//               </div>

//               {/* Falla */}

//               {servicioActivo.vehiculo?.falla && (
//                 <div
//                   className="
//                     mt-4
//                     flex
//                     items-start
//                     gap-2.5
//                     rounded-xl
//                     bg-[var(--color-warning-soft)]
//                     p-3
//                   "
//                 >
//                   <Wrench
//                     className="
//                       mt-0.5
//                       h-4
//                       w-4
//                       shrink-0
//                       text-[var(--color-warning)]
//                     "
//                   />

//                   <div className="min-w-0">
//                     <p
//                       className="
//                         text-[10px]
//                         font-bold
//                         uppercase
//                         tracking-wider
//                         text-[var(--color-warning)]
//                       "
//                     >
//                       Falla reportada
//                     </p>

//                     <p
//                       className="
//                         mt-0.5
//                         text-[13px]
//                         font-semibold
//                         text-[var(--text-main)]
//                       "
//                     >
//                       {servicioActivo.vehiculo.falla}
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </section>

//             {/* =================================================
//                 CLIENTE
//             ================================================= */}

//             <section
//               className="
//                 gocast-card-flat
//                 flex
//                 items-center
//                 justify-between
//                 gap-3
//                 p-4
//               "
//             >
//               <div className="min-w-0">
//                 <p
//                   className="
//                     text-[10px]
//                     font-bold
//                     uppercase
//                     tracking-[0.08em]
//                     text-[var(--text-muted)]
//                   "
//                 >
//                   Cliente
//                 </p>

//                 <p
//                   className="
//                     mt-0.5
//                     truncate
//                     text-[15px]
//                     font-bold
//                     text-[var(--text-main)]
//                   "
//                 >
//                   {servicioActivo.cliente?.nombre ||
//                     'Cliente no identificado'}
//                 </p>

//                 {telefonoCliente && (
//                   <p
//                     className="
//                       mt-0.5
//                       text-xs
//                       font-medium
//                       text-[var(--text-muted)]
//                     "
//                   >
//                     {telefonoCliente}
//                   </p>
//                 )}
//               </div>

//               {telefonoCliente && (
//                 <a
//                   href={`tel:${telefonoCliente}`}
//                   aria-label="Llamar al cliente"
//                   className="
//                     flex
//                     h-11
//                     shrink-0
//                     items-center
//                     gap-2
//                     rounded-full
//                     border
//                     border-[var(--bg-card-border)]
//                     bg-[var(--bg-card)]
//                     px-4
//                     text-xs
//                     font-bold
//                     text-[var(--color-primary)]
//                     transition-all

//                     active:
//                       scale-95
//                       bg-[var(--color-primary-soft)]
//                   "
//                 >
//                   <Phone className="h-4 w-4" />

//                   <span>Llamar</span>
//                 </a>
//               )}
//             </section>
//           </div>
//         </div>

//         {/* =================================================
//             ACCIONES
//         ================================================= */}

//         <footer
//           className="
//             shrink-0
//             border-t
//             border-[var(--bg-card-border)]
//             bg-[var(--bg-card)]
//             px-4
//             pb-4
//             pt-3
//           "
//           style={{
//             paddingBottom:
//               'calc(16px + env(safe-area-inset-bottom))',
//           }}
//         >
//           <div className="grid grid-cols-[0.85fr_1.15fr] gap-3">
//             {/* Rechazar */}

//             <button
//               type="button"
//               onClick={handleRechazar}
//               disabled={obteniendoGps}
//               className="
//                 flex
//                 min-h-[54px]
//                 items-center
//                 justify-center
//                 gap-2
//                 rounded-[17px]
//                 border
//                 border-[var(--color-danger)]/25
//                 bg-[var(--color-danger-soft)]
//                 px-3
//                 text-sm
//                 font-bold
//                 text-[var(--color-danger)]
//                 transition-all

//                 active:scale-[0.98]

//                 disabled:
//                   cursor-not-allowed
//                   opacity-100
//               "
//             >
//               <X className="h-5 w-5" />

//               <span>
//                 Rechazar
//               </span>
//             </button>

//             {/* Aceptar */}

//             <button
//               type="button"
//               onClick={handleAceptar}
//               disabled={obteniendoGps}
//               className="
//                 flex
//                 min-h-[54px]
//                 items-center
//                 justify-center
//                 gap-2
//                 rounded-[17px]
//                 bg-[var(--color-info)]
//                 px-3
//                 text-sm
//                 font-bold
//                 text-[var(--color-primary-soft)]
//                 shadow-[0_10px_24px_rgba(59,71,110,0.24)]
//                 transition-all

//                 active:scale-[0.98]

//                 disabled:
//                   cursor-wait
//                   opacity-100
//               "
//             >
//               {obteniendoGps ? (
//                 <>
//                   <Loader2 className="h-5 w-5 animate-spin" />

//                   <span>
//                     Obteniendo GPS
//                   </span>
//                 </>
//               ) : (
//                 <>
//                   <Check className="h-5 w-5 stroke-[2.8]" />

//                   <span>
//                     Aceptar
//                   </span>

//                   <ChevronRight className="h-4 w-4" />
//                 </>
//               )}
//             </button>
//           </div>

//           {obteniendoGps && (
//             <p
//               className="
//                 mt-2
//                 text-center
//                 text-[10px]
//                 font-medium
//                 text-[var(--text-muted)]
//               "
//             >
//               Estamos registrando tu ubicación para iniciar el servicio
//             </p>
//           )}
//         </footer>
//       </section>
//     </div>
//   );
// }  GPT

import {
  MapPin,
  Car,
  Phone,
  AlertCircle,
  Check,
  X,
  Loader2,
  Navigation,
  Wrench,
  ChevronRight,
} from 'lucide-react';

import { useState } from 'react';

import {
  useServiceStore,
  ESTADOS_SERVICIO,
} from '../../store/useServiceStore';

export function AssignmentModal() {
  const estadoActual = useServiceStore((state) => state.estadoActual);
  const servicioActivo = useServiceStore((state) => state.servicioActivo);
  const aceptarServicioConGps = useServiceStore((state) => state.aceptarServicioConGps);
  const cerrarServicio = useServiceStore((state) => state.cerrarServicio);

  const [obteniendoGps, setObteniendoGps] = useState(false);

  if (
    estadoActual !== ESTADOS_SERVICIO.PENDIENTE_ACEPTACION ||
    !servicioActivo
  ) {
    return null;
  }

  /*
  |--------------------------------------------------------------------------
  | Generar ubicación de respaldo garantizando separación visual
  |--------------------------------------------------------------------------
  */
  const obtenerGpsFallback = () => {
    const latOrigen = parseFloat(servicioActivo.origen?.lat) || 10.4961;
    const lngOrigen = parseFloat(servicioActivo.origen?.lng) || -66.8480;

    return {
      direccion: 'Ubicación aproximada (Fallback)',
      // Si el GPS falla, restamos una pequeña fracción para ubicar la grúa a unos ~2km del origen
      lat: latOrigen - 0.015,
      lng: lngOrigen - 0.015,
    };
  };

  /*
  |--------------------------------------------------------------------------
  | Aceptar servicio sincronizando con MySQL
  |--------------------------------------------------------------------------
  */
  const handleAceptar = () => {
    if (obteniendoGps) return;

    setObteniendoGps(true);

    // Función interna para validar contra la base de datos antes de pasar de pantalla
    const ejecutarAceptacion = async (gpsData) => {
      try {
        const idServicio = servicioActivo.servicio_id || servicioActivo.id;

        const res = await fetch('https://apidev.gocastgroup.com/api/gruero_app/actualizar_estado.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            servicio_id: idServicio,
            estado: 'ACEPTADO',
            gps: gpsData
          })
        });

        const data = await res.json();

        if (res.ok && data.success) {
          // Servidor confirmó la reserva exitosa en MySQL
          aceptarServicioConGps(gpsData);
        } else {
          // Conflicto 409: Ya fue tomado por otro operador o ya no está pendiente
          alert(data.message || 'Este servicio ya fue aceptado por otro operador.');
          cerrarServicio();
        }
      } catch (error) {
        console.error('[Error Aceptar Servicio]:', error);
        alert('Error de conexión al intentar aceptar el servicio. Verifica tu señal.');
      } finally {
        setObteniendoGps(false);
      }
    };

    // Timeout de seguridad: 6 segundos para dar tiempo al GPS real del móvil
    const timeoutSeguridad = setTimeout(() => {
      console.warn('[GPS] Tiempo de espera agotado. Usando ubicación estimada.');
      ejecutarAceptacion(obtenerGpsFallback());
    }, 6000);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          clearTimeout(timeoutSeguridad);

          ejecutarAceptacion({
            direccion: 'Ubicación GPS Gruero',
            lat: parseFloat(pos.coords.latitude),
            lng: parseFloat(pos.coords.longitude),
          });
        },
        (error) => {
          console.warn('[GPS] Error obteniendo ubicación real:', error.message);
          clearTimeout(timeoutSeguridad);

          ejecutarAceptacion(obtenerGpsFallback());
        },
        {
          enableHighAccuracy: true,
          timeout: 5500,
          maximumAge: 0,
        }
      );
    } else {
      clearTimeout(timeoutSeguridad);
      ejecutarAceptacion(obtenerGpsFallback());
    }
  };

  const handleRechazar = () => {
    if (obteniendoGps) return;
    cerrarServicio();
  };

  const telefonoCliente = servicioActivo.cliente?.telefono || '';
  const nombreVehiculo = [
    servicioActivo.vehiculo?.marca,
    servicioActivo.vehiculo?.modelo,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/55 backdrop-blur-[3px] sm:items-center sm:p-4">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="assignment-title"
        className="flex max-h-[calc(100dvh-16px)] w-full max-w-md flex-col overflow-hidden rounded-t-[30px] border border-[var(--bg-card-border)] bg-[var(--bg-card)] text-[var(--text-main)] shadow-[0_-20px_60px_rgba(0,0,0,0.22)] sm:max-h-[calc(100dvh-32px)] sm:rounded-[30px]"
      >
        <div className="flex h-7 shrink-0 items-center justify-center sm:hidden">
          <div className="h-1 w-10 rounded-full bg-[var(--bg-card-border)]" />
        </div>

        <header className="shrink-0 border-b border-[var(--bg-card-border)] px-5 pb-5 pt-2">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-danger-soft)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--color-danger)]">
                <AlertCircle className="h-3.5 w-3.5" />
                Nueva solicitud
              </div>

              <h2 id="assignment-title" className="text-[22px] font-bold leading-tight tracking-tight text-[var(--text-main)]">
                Nuevo servicio
              </h2>

              <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">
                Revisa los datos antes de aceptar
              </p>
            </div>

            <div className="shrink-0 rounded-full bg-[var(--color-primary-soft)] px-3 py-1.5 text-xs font-bold text-[var(--color-primary)]">
              #{servicioActivo.id}
            </div>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">
          <div className="space-y-3">
            <section className="gocast-card-flat flex items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--text-muted)]">
                  Cliente
                </p>
                <p className="mt-0.5 truncate text-[15px] font-bold text-[var(--text-main)]">
                  {servicioActivo.cliente?.nombre || 'Cliente no identificado'}
                </p>

                {telefonoCliente && (
                  <p className="mt-0.5 text-xs font-medium text-[var(--text-muted)]">
                    {telefonoCliente}
                  </p>
                )}
              </div>

              {telefonoCliente && (
                <a
                  href={`tel:${telefonoCliente}`}
                  aria-label="Llamar al cliente"
                  className="flex h-11 shrink-0 items-center gap-2 rounded-full border border-[var(--bg-card-border)] bg-[var(--bg-card)] px-4 text-xs font-bold text-[var(--color-primary)] transition-all active:scale-95 active:bg-[var(--color-primary-soft)]"
                >
                  <Phone className="h-4 w-4" />
                  <span>Llamar</span>
                </a>
              )}
            </section>
            <section className="gocast-card-flat p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                    <Car className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--text-muted)]">
                      Vehículo
                    </p>
                    <p className="mt-0.5 truncate text-[15px] font-bold text-[var(--text-main)]">
                      {nombreVehiculo || 'Vehículo no especificado'}
                    </p>
                  </div>
                </div>
                {servicioActivo.vehiculo?.placa && (
                  <span className="shrink-0 rounded-lg border border-[var(--bg-card-border)] bg-[var(--bg-card-secondary)] px-2.5 py-1.5 font-mono text-xs font-bold tracking-wider text-[var(--text-secondary)]">
                    {servicioActivo.vehiculo.placa}
                  </span>
                )}
              </div>
              {servicioActivo.vehiculo?.falla && (
                <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-[var(--color-warning-soft)] p-3">
                  <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-warning)]" />
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-warning)]">
                      Falla reportada
                    </p>
                    <p className="mt-0.5 text-[13px] font-semibold text-[var(--text-main)]">
                      {servicioActivo.vehiculo.falla}
                    </p>
                  </div>
                </div>
              )}
            </section>
            <section className="gocast-card-flat overflow-hidden p-4">
              <div className="mb-4 flex items-center gap-2">
                <Navigation className="h-4 w-4 text-[var(--color-primary)]" />
                <h3 className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--text-secondary)]">
                  Ruta del servicio
                </h3>
              </div>
              <div className="relative">
                <div className="absolute bottom-[30px] left-[15px] top-[30px] w-[2px] bg-[var(--bg-card-border)]" />

                <div className="relative z-10 flex items-start gap-3 pb-5">
                  <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[var(--color-info-soft)] ring-4 ring-[var(--bg-card)]">
                    <MapPin className="h-4 w-4 text-[var(--color-origin)]" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                      Origen · Recogida
                    </p>
                    <p className="mt-1 text-[14px] font-semibold leading-5 text-[var(--text-main)]">
                      Punto de referencia: {servicioActivo.origen?.direccion || 'Ubicación no disponible'}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 flex items-start gap-3">
                  <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[var(--color-success-soft)] ring-4 ring-[var(--bg-card)]">
                    <MapPin className="h-4 w-4 text-[var(--color-destination)]" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                      Destino · Entrega
                    </p>
                    <p className="mt-1 text-[14px] font-semibold leading-5 text-[var(--text-main)]">
                      Punto de referencia de entrega: {servicioActivo.destino?.direccion || 'Ubicación no disponible'}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <footer
          className="shrink-0 border-t border-[var(--bg-card-border)] bg-[var(--bg-card)] px-4 pb-4 pt-3"
          style={{ paddingBottom: 'calc(16px + env(safe-area-inset-bottom))' }}
        >
          <div className="grid grid-cols-[0.85fr_1.15fr] gap-3">
            <button
              type="button"
              onClick={handleRechazar}
              disabled={obteniendoGps}
              className="flex min-h-[54px] items-center justify-center gap-2 rounded-[17px] border border-[var(--color-danger)]/25 bg-[var(--color-danger-soft)] px-3 text-sm font-bold text-[var(--color-danger)] transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-100"
            >
              <X className="h-5 w-5" />
              <span>Rechazar</span>
            </button>

            <button
              type="button"
              onClick={handleAceptar}
              disabled={obteniendoGps}
              className="flex min-h-[54px] items-center justify-center gap-2 rounded-[17px] bg-[var(--color-info)] px-3 text-sm font-bold text-[var(--color-primary-soft)] shadow-[0_10px_24px_rgba(59,71,110,0.24)] transition-all active:scale-[0.98] disabled:cursor-wait disabled:opacity-100"
            >
              {obteniendoGps ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Obteniendo GPS</span>
                </>
              ) : (
                <>
                  <Check className="h-5 w-5 stroke-[2.8]" />
                  <span>Aceptar</span>
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>

          {obteniendoGps && (
            <p className="mt-2 text-center text-[10px] font-medium text-[var(--text-muted)]">
              Estamos registrando tu ubicación para iniciar el servicio
            </p>
          )}
        </footer>
      </section>
    </div>
  );
}