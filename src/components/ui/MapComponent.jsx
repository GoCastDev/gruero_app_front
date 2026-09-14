// import { useState } from 'react';
// import { MapPin, Navigation, WifiOff, Maximize2, Minimize2 } from 'lucide-react';
// import { useServiceStore, ESTADOS_SERVICIO } from '../../store/useServiceStore';

// export function MapComponent() {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const isOnline = useServiceStore((state) => state.isOnline);
//   const servicioActivo = useServiceStore((state) => state.servicioActivo);
//   const estadoActual = useServiceStore((state) => state.estadoActual);

//   if (!servicioActivo) return null;

//   const grueroObj = servicioActivo.ubicacionGruero; // Punto A
//   const origenObj = servicioActivo.origen;           // Punto B
//   const destinoObj = servicioActivo.destino;         // Punto C

//   // Formatear parámetros con Coordenadas Lat/Lng (o dirección de texto como fallback)
//   const puntoAParam = (grueroObj?.lat && grueroObj?.lng)
//     ? `${grueroObj.lat},${grueroObj.lng}`
//     : encodeURIComponent(grueroObj?.direccion || 'Mi Ubicacion');

//   const puntoBParam = (origenObj?.lat && origenObj?.lng)
//     ? `${origenObj.lat},${origenObj.lng}`
//     : encodeURIComponent(origenObj?.direccion || 'Punto de Recogida');

//   const puntoCParam = (destinoObj?.lat && destinoObj?.lng)
//     ? `${destinoObj.lat},${destinoObj.lng}`
//     : encodeURIComponent(destinoObj?.direccion || 'Destino Final');

//   // LÓGICA DINÁMICA DE RUTA (Google Embed exige máximo 2 puntos por tramo)
//   // Tramo 1: Gruero en camino a buscar el carro (A -> B)
//   // Tramo 2: Carro enganchado en camino al taller (B -> C)
//   const esTramoRecogida = 
//     estadoActual === ESTADOS_SERVICIO.ACEPTADO || 
//     estadoActual === ESTADOS_SERVICIO.EN_CAMINO_ORIGEN || 
//     estadoActual === ESTADOS_SERVICIO.EN_SITIO_ORIGEN;

//   const origenIframe = esTramoRecogida ? puntoAParam : puntoBParam;
//   const destinoIframe = esTramoRecogida ? puntoBParam : puntoCParam;

//   // Sintaxis saddr/daddr para forzar el dibujo de la línea azul en el iframe
//   const mapEmbedUrl = `https://maps.google.com/maps?saddr=${origenIframe}&daddr=${destinoIframe}&output=embed`;

//   // Navegación Externa en Google Maps App (Mantiene los 3 puntos A -> B -> C)
//   const gpsNavigationUrl = `https://www.google.com/maps/dir/?api=1&origin=${puntoAParam}&destination=${puntoCParam}&waypoints=${puntoBParam}&travelmode=driving`;

//   const toggleExpand = () => setIsExpanded(!isExpanded);

//   if (!isOnline) {
//     return (
//       <div className="w-full h-72 bg-[var(--bg-card)] border border-[var(--bg-card-border)] rounded-2xl flex flex-col items-center justify-center p-6 text-center space-y-3 transition-colors">
//         <div className="w-12 h-12 bg-amber-500/10 text-[var(--color-primary)] rounded-full flex items-center justify-center">
//           <WifiOff className="w-6 h-6" />
//         </div>
//         <div>
//           <h4 className="font-bold text-sm text-[var(--text-main)]">Mapa no disponible offline</h4>
//           <p className="text-xs text-[var(--text-muted)] mt-0.5">
//             Mostrando detalles de ruta guardados en el teléfono.
//           </p>
//         </div>
//         <div className="w-full bg-[var(--bg-main)] p-3 rounded-xl border border-[var(--bg-card-border)] text-left text-xs space-y-2">
//           <div className="flex items-center gap-2">
//             <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
//             <span className="truncate"><strong>Punto A (Gruero):</strong> {grueroObj?.direccion || 'Ubicación GPS'}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
//             <span className="truncate"><strong>Punto B (Recogida):</strong> {origenObj?.direccion || 'Vehículo Cliente'}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <MapPin className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
//             <span className="truncate"><strong>Punto C (Destino):</strong> {destinoObj?.direccion || 'Taller / Entrega'}</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="w-full space-y-3">
//         <div
//           className={`relative rounded-2xl overflow-hidden border border-[var(--bg-card-border)] shadow-2xl bg-[var(--bg-card)] transition-all duration-300 ${
//             isExpanded
//               ? 'fixed inset-3 z-50 flex flex-col h-[calc(100dvh-24px)] max-w-lg mx-auto'
//               : 'w-full h-80 sm:h-[420px]'
//           }`}
//         >
//           {/* Header Superior Flotante */}
//           <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between gap-2 pointer-events-none">
//             <div className="bg-[var(--bg-card)]/90 backdrop-blur-md p-2.5 rounded-xl border border-[var(--bg-card-border)] text-left text-[11px] space-y-1 shadow-lg flex-1 min-w-0">
//               <div className="flex items-center gap-2 truncate">
//                 <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
//                 <span className="truncate font-semibold text-[var(--text-main)]">
//                   <strong>Punto A (Gruero):</strong> {grueroObj?.direccion || 'GPS Actual'}
//                 </span>
//               </div>
//               <div className="flex items-center gap-2 truncate">
//                 <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
//                 <span className="truncate font-semibold text-[var(--text-main)]">
//                   <strong>Punto B (Recogida):</strong> {origenObj?.direccion || 'Vehículo Cliente'}
//                 </span>
//               </div>
//               <div className="flex items-center gap-2 truncate">
//                 <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] shrink-0" />
//                 <span className="truncate font-semibold text-[var(--text-main)]">
//                   <strong>Punto C (Destino):</strong> {destinoObj?.direccion || 'Taller / Entrega'}
//                 </span>
//               </div>
//             </div>

//             <button
//               type="button"
//               onClick={toggleExpand}
//               className="pointer-events-auto bg-[var(--bg-card)] hover:bg-[var(--bg-main)] text-[var(--text-main)] p-3 rounded-xl border border-[var(--bg-card-border)] shadow-lg active:scale-90 transition-all shrink-0 flex items-center justify-center"
//               title={isExpanded ? 'Reducir Mapa' : 'Ampliar Mapa'}
//             >
//               {isExpanded ? (
//                 <Minimize2 className="w-5 h-5 text-[var(--color-primary)]" />
//               ) : (
//                 <Maximize2 className="w-5 h-5 text-[var(--color-primary)]" />
//               )}
//             </button>
//           </div>

//           <iframe
//             title="Mapa de Ruta de Servicio"
//             width="100%"
//             height="100%"
//             className="w-full h-full border-0 grayscale-[15%] contrast-[105%]"
//             loading="lazy"
//             allowFullScreen
//             src={mapEmbedUrl}
//           />

//           {isExpanded && (
//             <div className="absolute bottom-4 left-4 right-4 z-20">
//               <button
//                 type="button"
//                 onClick={toggleExpand}
//                 className="w-full py-3.5 bg-[var(--bg-card)] border border-[var(--bg-card-border)] text-[var(--text-main)] font-bold text-xs uppercase rounded-xl shadow-xl active:scale-95 transition-all"
//               >
//                 Volver a la Vista Operativa
//               </button>
//             </div>
//           )}
//         </div>

//         {!isExpanded && (
//           <a
//             href={gpsNavigationUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="w-full py-3.5 bg-[var(--color-primary)] hover:opacity-90 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
//           >
//             <Navigation className="w-4 h-4 fill-current" />
//             <span>RUTA GPS (A ➔ B ➔ C)</span>
//           </a>
//         )}
//       </div>

//       {isExpanded && (
//         <div
//           onClick={toggleExpand}
//           className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 animate-in fade-in duration-200"
//         />
//       )}
//     </>
//   );
// }

// import { useState } from 'react';
// import { MapPin, Navigation, WifiOff, Maximize2, Minimize2 } from 'lucide-react';
// import { useServiceStore, ESTADOS_SERVICIO } from '../../store/useServiceStore';

// export function MapComponent() {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const isOnline = useServiceStore((state) => state.isOnline);
//   const servicioActivo = useServiceStore((state) => state.servicioActivo);
//   const estadoActual = useServiceStore((state) => state.estadoActual);

//   if (!servicioActivo) return null;

//   const grueroObj = servicioActivo.ubicacionGruero; // Punto A
//   const origenObj = servicioActivo.origen;           // Punto B
//   const destinoObj = servicioActivo.destino;         // Punto C

//   // Formatear coordenadas o texto seguro para la URL
//   const puntoAParam = (grueroObj?.lat && grueroObj?.lng)
//     ? `${grueroObj.lat},${grueroObj.lng}`
//     : encodeURIComponent(grueroObj?.direccion || 'Caracas, Venezuela');

//   const puntoBParam = (origenObj?.lat && origenObj?.lng)
//     ? `${origenObj.lat},${origenObj.lng}`
//     : encodeURIComponent(origenObj?.direccion || 'Los Palos Grandes, Caracas');

//   const puntoCParam = (destinoObj?.lat && destinoObj?.lng)
//     ? `${destinoObj.lat},${destinoObj.lng}`
//     : encodeURIComponent(destinoObj?.direccion || 'La Urbina, Caracas');

//   // Determinar tramo dinámico según la etapa operativa
//   const esTramoRecogida = 
//     estadoActual === ESTADOS_SERVICIO.ACEPTADO || 
//     estadoActual === ESTADOS_SERVICIO.EN_CAMINO_ORIGEN || 
//     estadoActual === ESTADOS_SERVICIO.EN_SITIO_ORIGEN;

//   const origenIframe = esTramoRecogida ? puntoAParam : puntoBParam;
//   const destinoIframe = esTramoRecogida ? puntoBParam : puntoCParam;

//   // URL 100% compatible con iFrames móviles de Google Maps
//   const mapEmbedUrl = `https://maps.google.com/maps?q=${origenIframe}%20to%20${destinoIframe}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

//   // URL para la App externa de Google Maps (3 Puntos A -> B -> C)
//   const gpsNavigationUrl = `https://www.google.com/maps/dir/?api=1&origin=${puntoAParam}&destination=${puntoCParam}&waypoints=${puntoBParam}&travelmode=driving`;

//   const toggleExpand = () => setIsExpanded(!isExpanded);

//   if (!isOnline) {
//     return (
//       <div className="w-full h-72 bg-[var(--bg-card)] border border-[var(--bg-card-border)] rounded-2xl flex flex-col items-center justify-center p-6 text-center space-y-3 transition-colors">
//         <div className="w-12 h-12 bg-amber-500/10 text-[var(--color-primary)] rounded-full flex items-center justify-center">
//           <WifiOff className="w-6 h-6" />
//         </div>
//         <div>
//           <h4 className="font-bold text-sm text-[var(--text-main)]">Mapa no disponible offline</h4>
//           <p className="text-xs text-[var(--text-muted)] mt-0.5">
//             Mostrando detalles de ruta guardados en el teléfono.
//           </p>
//         </div>
//         <div className="w-full bg-[var(--bg-main)] p-3 rounded-xl border border-[var(--bg-card-border)] text-left text-xs space-y-2">
//           <div className="flex items-center gap-2">
//             <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
//             <span className="truncate"><strong>Punto A (Gruero):</strong> {grueroObj?.direccion || 'GPS Actual'}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
//             <span className="truncate"><strong>Punto B (Recogida):</strong> {origenObj?.direccion || 'Vehículo Cliente'}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <MapPin className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
//             <span className="truncate"><strong>Punto C (Destino):</strong> {destinoObj?.direccion || 'Taller / Entrega'}</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* Contenedor principal con margen inferior para evitar solapamientos */}
//       <div className="w-full space-y-3 pb-28">
//         <div
//           className={`relative rounded-2xl overflow-hidden border border-[var(--bg-card-border)] shadow-2xl bg-[var(--bg-card)] transition-all duration-300 ${
//             isExpanded
//               ? 'fixed inset-3 z-50 flex flex-col h-[calc(100dvh-24px)] max-w-lg mx-auto'
//               : 'w-full h-80 sm:h-[420px]'
//           }`}
//         >
//           {/* Header Superior Flotante */}
//           <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between gap-2 pointer-events-none">
//             <div className="bg-[var(--bg-card)]/90 backdrop-blur-md p-2.5 rounded-xl border border-[var(--bg-card-border)] text-left text-[11px] space-y-1 shadow-lg flex-1 min-w-0">
//               <div className="flex items-center gap-2 truncate">
//                 <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
//                 <span className="truncate font-semibold text-[var(--text-main)]">
//                   <strong>Punto A (Gruero):</strong> {grueroObj?.direccion || 'GPS Actual'}
//                 </span>
//               </div>
//               <div className="flex items-center gap-2 truncate">
//                 <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
//                 <span className="truncate font-semibold text-[var(--text-main)]">
//                   <strong>Punto B (Recogida):</strong> {origenObj?.direccion || 'Vehículo Cliente'}
//                 </span>
//               </div>
//               <div className="flex items-center gap-2 truncate">
//                 <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] shrink-0" />
//                 <span className="truncate font-semibold text-[var(--text-main)]">
//                   <strong>Punto C (Destino):</strong> {destinoObj?.direccion || 'Taller / Entrega'}
//                 </span>
//               </div>
//             </div>

//             <button
//               type="button"
//               onClick={toggleExpand}
//               className="pointer-events-auto bg-[var(--bg-card)] hover:bg-[var(--bg-main)] text-[var(--text-main)] p-3 rounded-xl border border-[var(--bg-card-border)] shadow-lg active:scale-90 transition-all shrink-0 flex items-center justify-center"
//               title={isExpanded ? 'Reducir Mapa' : 'Ampliar Mapa'}
//             >
//               {isExpanded ? (
//                 <Minimize2 className="w-5 h-5 text-[var(--color-primary)]" />
//               ) : (
//                 <Maximize2 className="w-5 h-5 text-[var(--color-primary)]" />
//               )}
//             </button>
//           </div>

//           <iframe
//             title="Mapa de Ruta de Servicio"
//             width="100%"
//             height="100%"
//             className="w-full h-full border-0 grayscale-[15%] contrast-[105%]"
//             loading="lazy"
//             allowFullScreen
//             src={mapEmbedUrl}
//           />

//           {isExpanded && (
//             <div className="absolute bottom-4 left-4 right-4 z-20">
//               <button
//                 type="button"
//                 onClick={toggleExpand}
//                 className="w-full py-3.5 bg-[var(--bg-card)] border border-[var(--bg-card-border)] text-[var(--text-main)] font-bold text-xs uppercase rounded-xl shadow-xl active:scale-95 transition-all"
//               >
//                 Volver a la Vista Operativa
//               </button>
//             </div>
//           )}
//         </div>

//         {!isExpanded && (
//           <a
//             href={gpsNavigationUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="w-full py-3.5 bg-[var(--color-primary)] hover:opacity-90 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
//           >
//             <Navigation className="w-4 h-4 fill-current" />
//             <span>RUTA GPS (A ➔ B ➔ C)</span>
//           </a>
//         )}
//       </div>

//       {isExpanded && (
//         <div
//           onClick={toggleExpand}
//           className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 animate-in fade-in duration-200"
//         />
//       )}
//     </>
//   );
// }  GEMINI

// import { useState } from 'react';

// import {
//   MapPin,
//   Navigation,
//   WifiOff,
//   Maximize2,
//   Minimize2,
//   Route,
//   Plus,
// } from 'lucide-react';

// import { ServiceDetailsSheet } from '../../features/tracking/ServiceDetailsSheet';

// import {
//   useServiceStore,
//   ESTADOS_SERVICIO,
// } from '../../store/useServiceStore';

// export function MapComponent() {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [showDetails, setShowDetails] = useState(false);

//   const isOnline = useServiceStore(
//     (state) => state.isOnline
//   );

//   const servicioActivo = useServiceStore(
//     (state) => state.servicioActivo
//   );

//   const estadoActual = useServiceStore(
//     (state) => state.estadoActual
//   );

//   if (!servicioActivo) return null;

//   /*
//   |--------------------------------------------------------------------------
//   | Puntos operativos
//   |--------------------------------------------------------------------------
//   |
//   | A = ubicación actual del gruero
//   | B = recogida
//   | C = destino
//   |
//   */

//   const grueroObj = servicioActivo.ubicacionGruero;
//   const origenObj = servicioActivo.origen;
//   const destinoObj = servicioActivo.destino;

//   /*
//   |--------------------------------------------------------------------------
//   | Helpers
//   |--------------------------------------------------------------------------
//   */

//   const tieneCoordenadas = (obj) => {
//     if (!obj) return false;

//     return (
//       obj.lat !== undefined &&
//       obj.lat !== null &&
//       obj.lng !== undefined &&
//       obj.lng !== null &&
//       !Number.isNaN(Number(obj.lat)) &&
//       !Number.isNaN(Number(obj.lng))
//     );
//   };

//   const obtenerPuntoMapa = (obj, fallback) => {
//     if (tieneCoordenadas(obj)) {
//       return `${obj.lat},${obj.lng}`;
//     }

//     return obj?.direccion || fallback;
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | Puntos para Google Maps
//   |--------------------------------------------------------------------------
//   */

//   const puntoA = obtenerPuntoMapa(
//     grueroObj,
//     'Caracas, Venezuela'
//   );

//   const puntoB = obtenerPuntoMapa(
//     origenObj,
//     'Los Palos Grandes, Caracas'
//   );

//   const puntoC = obtenerPuntoMapa(
//     destinoObj,
//     'La Urbina, Caracas'
//   );

//   /*
//   |--------------------------------------------------------------------------
//   | Tramo operativo actual
//   |--------------------------------------------------------------------------
//   */

//   const esTramoRecogida =
//     estadoActual === ESTADOS_SERVICIO.ACEPTADO ||
//     estadoActual === ESTADOS_SERVICIO.EN_CAMINO_ORIGEN ||
//     estadoActual === ESTADOS_SERVICIO.EN_SITIO_ORIGEN;

//   const origenRuta = esTramoRecogida
//     ? puntoA
//     : puntoB;

//   const destinoRuta = esTramoRecogida
//     ? puntoB
//     : puntoC;

//   /*
//   |--------------------------------------------------------------------------
//   | Google Maps embed
//   |--------------------------------------------------------------------------
//   */

//   const consultaMapa = encodeURIComponent(
//     `${origenRuta} to ${destinoRuta}`
//   );

//   const mapEmbedUrl =
//     `https://maps.google.com/maps?` +
//     `q=${consultaMapa}` +
//     `&t=` +
//     `&z=13` +
//     `&ie=UTF8` +
//     `&iwloc=` +
//     `&output=embed`;

//   /*
//   |--------------------------------------------------------------------------
//   | Google Maps navegación externa
//   |--------------------------------------------------------------------------
//   */

//   const gpsNavigationUrl =
//     `https://www.google.com/maps/dir/?api=1` +
//     `&origin=${encodeURIComponent(origenRuta)}` +
//     `&destination=${encodeURIComponent(destinoRuta)}` +
//     `&travelmode=driving`;

//   /*
//   |--------------------------------------------------------------------------
//   | Estado visual
//   |--------------------------------------------------------------------------
//   */

//   const obtenerEstadoServicio = () => {
//     switch (estadoActual) {
//       case ESTADOS_SERVICIO.ACEPTADO:
//         return {
//           titulo: 'Servicio aceptado',
//           descripcion: 'Listo para iniciar ruta',
//         };

//       case ESTADOS_SERVICIO.EN_CAMINO_ORIGEN:
//         return {
//           titulo: 'En camino',
//           descripcion: 'Dirigiéndote a la recogida',
//         };

//       case ESTADOS_SERVICIO.EN_SITIO_ORIGEN:
//         return {
//           titulo: 'En sitio',
//           descripcion: 'Vehículo localizado',
//         };

//       case ESTADOS_SERVICIO.EN_CAMINO_DESTINO:
//         return {
//           titulo: 'En traslado',
//           descripcion: 'Dirigiéndote al destino',
//         };

//       default:
//         return {
//           titulo: 'Servicio activo',
//           descripcion: 'Operación en curso',
//         };
//     }
//   };

//   const estadoVisual = obtenerEstadoServicio();

//   /*
//   |--------------------------------------------------------------------------
//   | Destino contextual
//   |--------------------------------------------------------------------------
//   */

//   const direccionActual = esTramoRecogida
//     ? origenObj?.direccion
//     : destinoObj?.direccion;

//   const tituloDestinoActual = esTramoRecogida
//     ? 'Punto de recogida'
//     : 'Destino del servicio';

//   /*
//   |--------------------------------------------------------------------------
//   | Controles
//   |--------------------------------------------------------------------------
//   */

//   const toggleExpand = () => {
//     setIsExpanded((prev) => !prev);
//   };

//   const abrirDetalles = () => {
//     setShowDetails(true);
//   };

//   const cerrarDetalles = () => {
//     setShowDetails(false);
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | OFFLINE
//   |--------------------------------------------------------------------------
//   */

//   if (!isOnline) {
//     return (
//       <>
//         <div className="w-full space-y-3">
//           {/* Encabezado */}

//           <ServiceHeader
//             estadoVisual={estadoVisual}
//             servicioId={servicioActivo.id}
//             onOpenDetails={abrirDetalles}
//           />

//           {/* Offline */}

//           <section className="gocast-card overflow-hidden">
//             <div
//               className="
//                 flex
//                 flex-col
//                 items-center
//                 justify-center
//                 px-5
//                 py-7
//                 text-center
//               "
//             >
//               <div
//                 className="
//                   flex
//                   h-14
//                   w-14
//                   items-center
//                   justify-center
//                   rounded-2xl
//                   bg-[var(--color-warning-soft)]
//                   text-[var(--color-warning)]
//                 "
//               >
//                 <WifiOff className="h-6 w-6" />
//               </div>

//               <h3
//                 className="
//                   mt-4
//                   text-base
//                   font-bold
//                   text-[var(--text-main)]
//                 "
//               >
//                 Mapa no disponible
//               </h3>

//               <p
//                 className="
//                   mt-1
//                   max-w-[280px]
//                   text-xs
//                   leading-5
//                   text-[var(--text-muted)]
//                 "
//               >
//                 No tienes conexión a Internet. Los datos del servicio
//                 permanecen disponibles en el teléfono.
//               </p>
//             </div>

//             <div
//               className="
//                 border-t
//                 border-[var(--bg-card-border)]
//                 bg-[var(--bg-card-secondary)]
//                 p-4
//               "
//             >
//               <div className="space-y-4">
//                 <LocationRow
//                   label="Tu ubicación"
//                   value={
//                     grueroObj?.direccion ||
//                     'Última ubicación GPS registrada'
//                   }
//                   type="current"
//                 />

//                 <LocationRow
//                   label="Recogida"
//                   value={
//                     origenObj?.direccion ||
//                     'Ubicación de recogida'
//                   }
//                   type="origin"
//                 />

//                 <LocationRow
//                   label="Destino"
//                   value={
//                     destinoObj?.direccion ||
//                     'Destino del servicio'
//                   }
//                   type="destination"
//                 />
//               </div>
//             </div>
//           </section>
//         </div>

//         <ServiceDetailsSheet
//           open={showDetails}
//           onClose={cerrarDetalles}
//         />
//       </>
//     );
//   }

//   /*
//   |--------------------------------------------------------------------------
//   | ONLINE
//   |--------------------------------------------------------------------------
//   */

//   return (
//     <>
//       <div className="w-full space-y-3">
//         {/* =====================================================
//             CABECERA
//         ===================================================== */}

//         {!isExpanded && (
//           <ServiceHeader
//             estadoVisual={estadoVisual}
//             servicioId={servicioActivo.id}
//             onOpenDetails={abrirDetalles}
//           />
//         )}

//         {/* =====================================================
//             MAPA
//         ===================================================== */}

//         <section
//           className={`
//             overflow-hidden
//             border
//             border-[var(--bg-card-border)]
//             bg-[var(--bg-card)]
//             shadow-[var(--shadow-card)]
//             transition-all
//             duration-300

//             ${isExpanded
//               ? `
//                   fixed
//                   inset-0
//                   z-[90]
//                   flex
//                   h-dvh
//                   w-full
//                   flex-col
//                 `
//               : `
//                   relative
//                   h-[350px]
//                   w-full
//                   rounded-[24px]
//                 `
//             }
//           `}
//         >
//           {/* =================================================
//               DESTINO ACTUAL / EXPANDIR
//           ================================================= */}

//           <div
//             className={`
//               absolute
//               left-3
//               right-3
//               top-3
//               z-20
//               flex
//               items-start
//               gap-2

//               ${isExpanded
//                 ? 'pt-[env(safe-area-inset-top)]'
//                 : ''
//               }
//             `}
//           >
//             {/* Destino */}

//             <div
//               className="
//                 min-w-0
//                 flex-1
//                 rounded-2xl
//                 border
//                 border-[var(--bg-card-border)]
//                 bg-[var(--bg-card)]/95
//                 p-3
//                 shadow-lg
//                 backdrop-blur-xl
//               "
//             >
//               <div className="flex items-center gap-2">
//                 <div
//                   className="
//                     flex
//                     h-8
//                     w-8
//                     shrink-0
//                     items-center
//                     justify-center
//                     rounded-full
//                     bg-[var(--color-primary-soft)]
//                     text-[var(--color-primary)]
//                   "
//                 >
//                   <Navigation className="h-4 w-4" />
//                 </div>

//                 <div className="min-w-0">
//                   <p
//                     className="
//                       text-[9px]
//                       font-bold
//                       uppercase
//                       tracking-[0.1em]
//                       text-[var(--text-muted)]
//                     "
//                   >
//                     {tituloDestinoActual}
//                   </p>

//                   <p
//                     className="
//                       mt-0.5
//                       truncate
//                       text-xs
//                       font-bold
//                       text-[var(--text-main)]
//                     "
//                   >
//                     {direccionActual ||
//                       'Ubicación del servicio'}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Expandir */}

//             <button
//               type="button"
//               onClick={toggleExpand}
//               aria-label={
//                 isExpanded
//                   ? 'Reducir mapa'
//                   : 'Ampliar mapa'
//               }
//               className="
//                 flex
//                 h-[54px]
//                 w-[54px]
//                 shrink-0
//                 items-center
//                 justify-center
//                 rounded-2xl
//                 border
//                 border-[var(--bg-card-border)]
//                 bg-[var(--bg-card)]/95
//                 text-[var(--color-primary)]
//                 shadow-lg
//                 backdrop-blur-xl
//                 transition-all

//                 active:scale-90
//               "
//             >
//               {isExpanded ? (
//                 <Minimize2 className="h-5 w-5" />
//               ) : (
//                 <Maximize2 className="h-5 w-5" />
//               )}
//             </button>
//           </div>

//           {/* =================================================
//               GOOGLE MAP
//           ================================================= */}

//           <iframe
//             title="Ruta activa del servicio"
//             width="100%"
//             height="100%"
//             className={`
//               h-full
//               w-full
//               border-0

//               ${isExpanded
//                 ? 'pointer-events-auto'
//                 : 'pointer-events-none'
//               }
//             `}
//             loading="lazy"
//             allowFullScreen
//             src={mapEmbedUrl}
//           />

//           {/* =================================================
//               INDICACIÓN
//           ================================================= */}

//           {!isExpanded && (
//             <div
//               className="
//                 pointer-events-none
//                 absolute
//                 bottom-[78px]
//                 left-1/2
//                 z-10
//                 -translate-x-1/2

//                 whitespace-nowrap
//                 rounded-full

//                 bg-[var(--bg-card)]/90
//                 px-3
//                 py-1.5

//                 text-[9px]
//                 font-semibold
//                 text-[var(--text-muted)]

//                 shadow-sm
//                 backdrop-blur-md
//               "
//             >
//               Amplía el mapa para explorarlo
//             </div>
//           )}

//           {/* =================================================
//               RUTA ACTIVA / GPS
//           ================================================= */}

//           <div
//             className={`
//               absolute
//               bottom-3
//               left-3
//               right-3
//               z-20

//               ${isExpanded
//                 ? 'pb-[env(safe-area-inset-bottom)]'
//                 : ''
//               }
//             `}
//           >
//             <div
//               className="
//                 flex
//                 items-center
//                 justify-between
//                 gap-3

//                 rounded-2xl
//                 border
//                 border-[var(--bg-card-border)]

//                 bg-[var(--bg-card)]/95
//                 p-2

//                 shadow-lg
//                 backdrop-blur-xl
//               "
//             >
//               <div
//                 className="
//                   flex
//                   min-w-0
//                   flex-1
//                   items-center
//                   gap-2
//                   px-2
//                 "
//               >
//                 <Route
//                   className="
//                     h-4
//                     w-4
//                     shrink-0
//                     text-[var(--color-primary)]
//                   "
//                 />

//                 <div className="min-w-0">
//                   <p
//                     className="
//                       text-[9px]
//                       font-bold
//                       uppercase
//                       tracking-wider
//                       text-[var(--text-muted)]
//                     "
//                   >
//                     Ruta activa
//                   </p>

//                   <p
//                     className="
//                       truncate
//                       text-[11px]
//                       font-semibold
//                       text-[var(--text-main)]
//                     "
//                   >
//                     {esTramoRecogida
//                       ? 'Tu ubicación → Recogida'
//                       : 'Recogida → Destino'}
//                   </p>
//                 </div>
//               </div>

//               <a
//                 href={gpsNavigationUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="
//                   flex
//                   h-10
//                   shrink-0
//                   items-center
//                   gap-2

//                   rounded-xl
//                   bg-[var(--color-primary)]
//                   px-3

//                   text-[11px]
//                   font-bold
//                   text-[var(--color-on-primary)]

//                   transition-all

//                   active:scale-95
//                 "
//               >
//                 <Navigation className="h-4 w-4" />

//                 Abrir GPS
//               </a>
//             </div>
//           </div>
//         </section>
//       </div>

//       {/* =====================================================
//           DETALLES DEL SERVICIO
//       ===================================================== */}

//       <ServiceDetailsSheet
//         open={showDetails}
//         onClose={cerrarDetalles}
//       />
//     </>
//   );
// }

// /*
// |--------------------------------------------------------------------------
// | CABECERA SERVICIO
// |--------------------------------------------------------------------------
// */

// function ServiceHeader({
//   estadoVisual,
//   servicioId,
//   onOpenDetails,
// }) {
//   return (
//     <section
//       className="
//         rounded-[20px]
//         border
//         border-[var(--bg-card-border)]
//         bg-[var(--bg-card)]
//         px-4
//         py-3.5
//         shadow-[var(--shadow-sm)]
//       "
//     >
//       {/* FILA SUPERIOR */}

//       <div className="flex items-center justify-between gap-3">
//         <div
//           className="
//             flex
//             items-center
//             gap-2
//             text-[10px]
//             font-bold
//             uppercase
//             tracking-[0.1em]
//             text-[var(--text-muted)]
//           "
//         >
//           <span
//             className="
//               h-2
//               w-2
//               rounded-full
//               bg-[var(--color-success)]
//             "
//           />

//           Servicio en curso
//         </div>

//         <span
//           className="
//             shrink-0
//             rounded-full
//             bg-[var(--color-primary-soft)]
//             px-3
//             py-1.5
//             text-[10px]
//             font-bold
//             text-[var(--color-primary)]
//           "
//         >
//           #{servicioId}
//         </span>
//       </div>

//       {/* INFORMACIÓN + DETALLES */}

//       <div
//         className="
//           mt-3
//           flex
//           items-end
//           justify-between
//           gap-3
//         "
//       >
//         <div className="min-w-0 flex-1">
//           <h2
//             className="
//               text-[18px]
//               font-bold
//               leading-tight
//               tracking-tight
//               text-[var(--text-main)]
//             "
//           >
//             {estadoVisual.titulo}
//           </h2>

//           <p
//             className="
//               mt-1
//               truncate
//               text-[11px]
//               font-medium
//               text-[var(--text-muted)]
//             "
//           >
//             {estadoVisual.descripcion}
//           </p>
//         </div>

//         {/* DETALLES */}

//         <button
//           type="button"
//           onClick={onOpenDetails}
//           aria-label="Ver detalles del servicio"
//           className="
//             flex
//             h-10
//             shrink-0
//             items-center
//             justify-center
//             gap-1.5

//             rounded-full

//             bg-[var(--color-primary-soft)]
//             px-3.5

//             text-[var(--color-primary)]

//             transition-all
//             duration-200

//             active:
//               scale-95
//               bg-[var(--color-primary)]
//               text-[var(--color-on-primary)]
//           "
//         >
//           <Plus className="h-4 w-4 stroke-[3]" />

//           <span className="text-[11px] font-bold">
//             Detalles
//           </span>
//         </button>
//       </div>
//     </section>
//   );
// }

// /*
// |--------------------------------------------------------------------------
// | LOCATION ROW - MODO OFFLINE
// |--------------------------------------------------------------------------
// */

// function LocationRow({
//   label,
//   value,
//   type,
// }) {
//   const colorClass = {
//     current: 'text-[var(--color-primary)]',
//     origin: 'text-[var(--color-info)]',
//     destination: 'text-[var(--color-success)]',
//   }[type];

//   return (
//     <div className="flex items-start gap-3">
//       <MapPin
//         className={`
//           mt-0.5
//           h-4
//           w-4
//           shrink-0
//           ${colorClass}
//         `}
//       />

//       <div className="min-w-0">
//         <p
//           className="
//             text-[9px]
//             font-bold
//             uppercase
//             tracking-wider
//             text-[var(--text-muted)]
//           "
//         >
//           {label}
//         </p>

//         <p
//           className="
//             mt-0.5
//             text-xs
//             font-semibold
//             leading-4
//             text-[var(--text-main)]
//           "
//         >
//           {value}
//         </p>
//       </div>
//     </div>
//   );
// }    // ULTIMO USADO MAPAS MEDIANTE IFRAME

// import { useState, useEffect, useRef } from 'react';
// import {
//   MapPin,
//   Navigation,
//   WifiOff,
//   Maximize2,
//   Minimize2,
//   Route,
//   Plus,
//   Loader2,
// } from 'lucide-react';

// import { ServiceDetailsSheet } from '../../features/tracking/ServiceDetailsSheet';
// import { useServiceStore, ESTADOS_SERVICIO } from '../../store/useServiceStore';

// export function MapComponent() {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [showDetails, setShowDetails] = useState(false);
//   const [mapCargado, setMapCargado] = useState(false);

//   const mapRef = useRef(null);
//   const mapInstanceRef = useRef(null);
//   const directionsRendererRef = useRef(null);

//   const isOnline = useServiceStore((state) => state.isOnline);
//   const servicioActivo = useServiceStore((state) => state.servicioActivo);
//   const estadoActual = useServiceStore((state) => state.estadoActual);

//   if (!servicioActivo) return null;

//   /*
//   |--------------------------------------------------------------------------
//   | Puntos operativos
//   |--------------------------------------------------------------------------
//   */
//   const grueroObj = servicioActivo.ubicacionGruero;
//   const origenObj = servicioActivo.origen;
//   const destinoObj = servicioActivo.destino;

//   const tieneCoordenadasValidas = (obj) => {
//     if (!obj) return false;
//     const lat = parseFloat(obj.lat);
//     const lng = parseFloat(obj.lng);
//     return !isNaN(lat) && !isNaN(lng);
//   };

//   const esTramoRecogida =
//     estadoActual === ESTADOS_SERVICIO.ACEPTADO ||
//     estadoActual === ESTADOS_SERVICIO.EN_CAMINO_ORIGEN ||
//     estadoActual === ESTADOS_SERVICIO.EN_SITIO_ORIGEN;

//   /*
//   |--------------------------------------------------------------------------
//   | Coordenadas de origen y destino para la API
//   |--------------------------------------------------------------------------
//   */
//   const puntoGruero = tieneCoordenadasValidas(grueroObj)
//     ? { lat: parseFloat(grueroObj.lat), lng: parseFloat(grueroObj.lng) }
//     : { lat: 10.4961, lng: -66.8480 };

//   const puntoOrigen = tieneCoordenadasValidas(origenObj)
//     ? { lat: parseFloat(origenObj.lat), lng: parseFloat(origenObj.lng) }
//     : { lat: 10.4931, lng: -66.8804 };

//   const puntoDestino = tieneCoordenadasValidas(destinoObj)
//     ? { lat: parseFloat(destinoObj.lat), lng: parseFloat(destinoObj.lng) }
//     : { lat: 10.5096, lng: -66.8979 };

//   const puntoInicio = esTramoRecogida ? puntoGruero : puntoOrigen;
//   const puntoFin = esTramoRecogida ? puntoOrigen : puntoDestino;

//   /*
//   |--------------------------------------------------------------------------
//   | Carga e inicialización de Google Maps JS API
//   |--------------------------------------------------------------------------
//   */
//   useEffect(() => {
//     if (!isOnline) return;

//     const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

//     // Cargar el script de Google Maps si aún no está en el DOM
//     const cargarScriptGoogleMaps = () => {
//       if (window.google && window.google.maps) {
//         inicializarMapa();
//         return;
//       }

//       const idScript = 'google-maps-js-sdk';
//       if (!document.getElementById(idScript)) {
//         const script = document.createElement('script');
//         script.id = idScript;
//         script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`;
//         script.async = true;
//         script.defer = true;
//         script.onload = () => inicializarMapa();
//         document.head.appendChild(script);
//       } else {
//         document.getElementById(idScript).addEventListener('load', inicializarMapa);
//       }
//     };

//     const inicializarMapa = () => {
//       if (!mapRef.current || !window.google) return;

//       if (!mapInstanceRef.current) {
//         // Crear instancia del mapa interactivo
//         mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
//           center: puntoInicio,
//           zoom: 14,
//           disableDefaultUI: true,
//           zoomControl: true,
//         });

//         directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
//           map: mapInstanceRef.current,
//           suppressMarkers: false,
//           polylineOptions: {
//             strokeColor: '#3b82f6',
//             strokeWeight: 5,
//           },
//         });
//       }

//       trazarRuta();
//       setMapCargado(true);
//     };

//     const trazarRuta = () => {
//       if (!directionsRendererRef.current || !window.google) return;

//       const directionsService = new window.google.maps.DirectionsService();

//       directionsService.route(
//         {
//           origin: puntoInicio,
//           destination: puntoFin,
//           travelMode: window.google.maps.TravelMode.DRIVING,
//         },
//         (result, status) => {
//           if (status === window.google.maps.DirectionsStatus.OK) {
//             directionsRendererRef.current.setDirections(result);
//           } else {
//             console.error('[Google Maps] Error al trazar ruta:', status);
//           }
//         }
//       );
//     };

//     cargarScriptGoogleMaps();
//   }, [isOnline, estadoActual, servicioActivo]);

//   /*
//   |--------------------------------------------------------------------------
//   | Enlace de Navegación Externa (App nativa)
//   |--------------------------------------------------------------------------
//   */
//   const gpsNavigationUrl = `https://www.google.com/maps/dir/?api=1&origin=${puntoInicio.lat},${puntoInicio.lng}&destination=${puntoFin.lat},${puntoFin.lng}&travelmode=driving`;

//   const obtenerEstadoServicio = () => {
//     switch (estadoActual) {
//       case ESTADOS_SERVICIO.ACEPTADO:
//         return { titulo: 'Servicio aceptado', descripcion: 'Listo para iniciar ruta' };
//       case ESTADOS_SERVICIO.EN_CAMINO_ORIGEN:
//         return { titulo: 'En camino', descripcion: 'Dirigiéndote a la recogida' };
//       case ESTADOS_SERVICIO.EN_SITIO_ORIGEN:
//         return { titulo: 'En sitio', descripcion: 'Vehículo localizado' };
//       case ESTADOS_SERVICIO.EN_CAMINO_DESTINO:
//         return { titulo: 'En traslado', descripcion: 'Dirigiéndote al destino' };
//       default:
//         return { titulo: 'Servicio activo', descripcion: 'Operación en curso' };
//     }
//   };

//   const estadoVisual = obtenerEstadoServicio();
//   const direccionActual = esTramoRecogida ? origenObj?.direccion : destinoObj?.direccion;
//   const tituloDestinoActual = esTramoRecogida ? 'Punto de recogida' : 'Destino del servicio';

//   const toggleExpand = () => setIsExpanded((prev) => !prev);
//   const abrirDetalles = () => setShowDetails(true);
//   const cerrarDetalles = () => setShowDetails(false);

//   if (!isOnline) {
//     return (
//       <>
//         <div className="w-full space-y-3">
//           <ServiceHeader estadoVisual={estadoVisual} servicioId={servicioActivo.id} onOpenDetails={abrirDetalles} />
//           <section className="gocast-card overflow-hidden">
//             <div className="flex flex-col items-center justify-center px-5 py-7 text-center">
//               <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-warning-soft)] text-[var(--color-warning)]">
//                 <WifiOff className="h-6 w-6" />
//               </div>
//               <h3 className="mt-4 text-base font-bold text-[var(--text-main)]">Mapa no disponible</h3>
//               <p className="mt-1 max-w-[280px] text-xs leading-5 text-[var(--text-muted)]">
//                 No tienes conexión a Internet. Los datos del servicio permanecen disponibles en el teléfono.
//               </p>
//             </div>
//           </section>
//         </div>
//         <ServiceDetailsSheet open={showDetails} onClose={cerrarDetalles} />
//       </>
//     );
//   }

//   return (
//     <>
//       <div className="w-full space-y-3">
//         {!isExpanded && (
//           <ServiceHeader estadoVisual={estadoVisual} servicioId={servicioActivo.id} onOpenDetails={abrirDetalles} />
//         )}

//         <section
//           className={`overflow-hidden border border-[var(--bg-card-border)] bg-[var(--bg-card)] shadow-[var(--shadow-card)] transition-all duration-300 ${
//             isExpanded
//               ? 'fixed inset-0 z-[90] flex h-dvh w-full flex-col'
//               : 'relative h-[350px] w-full rounded-[24px]'
//           }`}
//         >
//           {/* Header flotante del mapa */}
//           <div className={`absolute left-3 right-3 top-3 z-20 flex items-start gap-2 ${isExpanded ? 'pt-[env(safe-area-inset-top)]' : ''}`}>
//             <div className="min-w-0 flex-1 rounded-2xl border border-[var(--bg-card-border)] bg-[var(--bg-card)]/95 p-3 shadow-lg backdrop-blur-xl">
//               <div className="flex items-center gap-2">
//                 <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
//                   <Navigation className="h-4 w-4" />
//                 </div>
//                 <div className="min-w-0">
//                   <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--text-muted)]">{tituloDestinoActual}</p>
//                   <p className="mt-0.5 truncate text-xs font-bold text-[var(--text-main)]">{direccionActual || 'Ubicación del servicio'}</p>
//                 </div>
//               </div>
//             </div>

//             <button
//               type="button"
//               onClick={toggleExpand}
//               className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-2xl border border-[var(--bg-card-border)] bg-[var(--bg-card)]/95 text-[var(--color-primary)] shadow-lg backdrop-blur-xl transition-all active:scale-90"
//             >
//               {isExpanded ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
//             </button>
//           </div>

//           {/* Loader de carga de API */}
//           {!mapCargado && (
//             <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[var(--bg-card)]">
//               <Loader2 className="h-8 w-8 animate-spin text-[var(--color-primary)]" />
//               <p className="mt-2 text-xs font-semibold text-[var(--text-muted)]">Cargando Google Maps...</p>
//             </div>
//           )}

//           {/* Lienzo del Mapa Interactivo */}
//           <div ref={mapRef} className="h-full w-full" />

//           {/* Barra inferior de acciones sobre el mapa */}
//           <div className={`absolute bottom-3 left-3 right-3 z-20 ${isExpanded ? 'pb-[env(safe-area-inset-bottom)]' : ''}`}>
//             <div className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--bg-card-border)] bg-[var(--bg-card)]/95 p-2 shadow-lg backdrop-blur-xl">
//               <div className="flex min-w-0 flex-1 items-center gap-2 px-2">
//                 <Route className="h-4 w-4 shrink-0 text-[var(--color-primary)]" />
//                 <div className="min-w-0">
//                   <p className="text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Ruta activa</p>
//                   <p className="truncate text-[11px] font-semibold text-[var(--text-main)]">
//                     {esTramoRecogida ? 'Tu ubicación → Recogida' : 'Recogida → Destino'}
//                   </p>
//                 </div>
//               </div>

//               <a
//                 href={gpsNavigationUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex h-10 shrink-0 items-center gap-2 rounded-xl bg-[var(--color-primary)] px-3 text-[11px] font-bold text-[var(--color-on-primary)] transition-all active:scale-95"
//               >
//                 <Navigation className="h-4 w-4" />
//                 Abrir GPS
//               </a>
//             </div>
//           </div>
//         </section>
//       </div>

//       <ServiceDetailsSheet open={showDetails} onClose={cerrarDetalles} />
//     </>
//   );
// }

// function ServiceHeader({ estadoVisual, servicioId, onOpenDetails }) {
//   return (
//     <section className="rounded-[20px] border border-[var(--bg-card-border)] bg-[var(--bg-card)] px-4 py-3.5 shadow-[var(--shadow-sm)]">
//       <div className="flex items-center justify-between gap-3">
//         <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--text-muted)]">
//           <span className="h-2 w-2 rounded-full bg-[var(--color-success)]" />
//           Servicio en curso
//         </div>
//         <span className="shrink-0 rounded-full bg-[var(--color-primary-soft)] px-3 py-1.5 text-[10px] font-bold text-[var(--color-primary)]">
//           #{servicioId}
//         </span>
//       </div>

//       <div className="mt-3 flex items-end justify-between gap-3">
//         <div className="min-w-0 flex-1">
//           <h2 className="text-[18px] font-bold leading-tight tracking-tight text-[var(--text-main)]">{estadoVisual.titulo}</h2>
//           <p className="mt-1 truncate text-[11px] font-medium text-[var(--text-muted)]">{estadoVisual.descripcion}</p>
//         </div>

//         <button
//           type="button"
//           onClick={onOpenDetails}
//           className="flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full bg-[var(--color-primary-soft)] px-3.5 text-[var(--color-primary)] transition-all duration-200 active:scale-95 active:bg-[var(--color-primary)] active:text-[var(--color-on-primary)]"
//         >
//           <Plus className="h-4 w-4 stroke-[3]" />
//           <span className="text-[11px] font-bold">Detalles</span>
//         </button>
//       </div>
//     </section>
//   );
// }

import { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Navigation,
  WifiOff,
  Maximize2,
  Minimize2,
  Route,
  Plus,
  Loader2,
  Clock,
} from 'lucide-react';

import { ServiceDetailsSheet } from '../../features/tracking/ServiceDetailsSheet';
import { useServiceStore, ESTADOS_SERVICIO } from '../../store/useServiceStore';

export function MapComponent() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [mapCargado, setMapCargado] = useState(false);
  
  // NUEVO: Estado para guardar la distancia y el tiempo del recorrido
  const [infoRuta, setInfoRuta] = useState({ distancia: '', tiempo: '' });

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const markerInicioRef = useRef(null);
  const markerFinRef = useRef(null);

  const isOnline = useServiceStore((state) => state.isOnline);
  const servicioActivo = useServiceStore((state) => state.servicioActivo);
  const estadoActual = useServiceStore((state) => state.estadoActual);

  if (!servicioActivo) return null;

  /*
  |--------------------------------------------------------------------------
  | Puntos operativos
  |--------------------------------------------------------------------------
  */
  const grueroObj = servicioActivo.ubicacionGruero;
  const origenObj = servicioActivo.origen;
  const destinoObj = servicioActivo.destino;

  const tieneCoordenadasValidas = (obj) => {
    if (!obj) return false;
    const lat = parseFloat(obj.lat);
    const lng = parseFloat(obj.lng);
    return !isNaN(lat) && !isNaN(lng);
  };

  const esTramoRecogida =
    estadoActual === ESTADOS_SERVICIO.ACEPTADO ||
    estadoActual === ESTADOS_SERVICIO.EN_CAMINO_ORIGEN ||
    estadoActual === ESTADOS_SERVICIO.EN_SITIO_ORIGEN;

  const puntoGruero = tieneCoordenadasValidas(grueroObj)
    ? { lat: parseFloat(grueroObj.lat), lng: parseFloat(grueroObj.lng) }
    : { lat: 10.4961, lng: -66.8480 };

  const puntoOrigen = tieneCoordenadasValidas(origenObj)
    ? { lat: parseFloat(origenObj.lat), lng: parseFloat(origenObj.lng) }
    : { lat: 10.4931, lng: -66.8804 };

  const puntoDestino = tieneCoordenadasValidas(destinoObj)
    ? { lat: parseFloat(destinoObj.lat), lng: parseFloat(destinoObj.lng) }
    : { lat: 10.5096, lng: -66.8979 };

  const puntoInicio = esTramoRecogida ? puntoGruero : puntoOrigen;
  const puntoFin = esTramoRecogida ? puntoOrigen : puntoDestino;

  /*
  |--------------------------------------------------------------------------
  | Carga e inicialización de Google Maps JS API
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    if (!isOnline) return;

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    const cargarScriptGoogleMaps = () => {
      if (window.google && window.google.maps) {
        inicializarMapa();
        return;
      }

      const idScript = 'google-maps-js-sdk';
      if (!document.getElementById(idScript)) {
        const script = document.createElement('script');
        script.id = idScript;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`;
        script.async = true;
        script.defer = true;
        script.onload = () => inicializarMapa();
        document.head.appendChild(script);
      } else {
        document.getElementById(idScript).addEventListener('load', inicializarMapa);
      }
    };

    const inicializarMapa = () => {
      if (!mapRef.current || !window.google) return;

      if (!mapInstanceRef.current) {
        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
          center: puntoInicio,
          zoom: 13,
          disableDefaultUI: true,
          zoomControl: true,
        });

        directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
          map: mapInstanceRef.current,
          suppressMarkers: true,
          polylineOptions: {
            strokeColor: '#2563eb',
            strokeWeight: 5,
            strokeOpacity: 0.8,
          },
        });
      }

      actualizarPinesYRuta();
      setMapCargado(true);
    };

    const actualizarPinesYRuta = () => {
      if (!mapInstanceRef.current || !window.google) return;

      if (markerInicioRef.current) markerInicioRef.current.setMap(null);
      if (markerFinRef.current) markerFinRef.current.setMap(null);

      markerInicioRef.current = new window.google.maps.Marker({
        position: puntoInicio,
        map: mapInstanceRef.current,
        title: esTramoRecogida ? 'Ubicación Grúa' : 'Origen Recogida',
        icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      });

      markerFinRef.current = new window.google.maps.Marker({
        position: puntoFin,
        map: mapInstanceRef.current,
        title: esTramoRecogida ? 'Origen Recogida' : 'Destino Final',
        icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
      });

      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(puntoInicio);
      bounds.extend(puntoFin);
      mapInstanceRef.current.fitBounds(bounds);

      // Limpiar info previa
      setInfoRuta({ distancia: '', tiempo: '' });

      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: puntoInicio,
          destination: puntoFin,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            directionsRendererRef.current.setDirections(result);
            
            // NUEVO: Extraer los datos del primer tramo (leg) de la ruta
            const leg = result.routes[0].legs[0];
            setInfoRuta({
              distancia: leg.distance.text,
              tiempo: leg.duration.text
            });

          } else {
            console.warn('[Google Maps] Error trazando ruta (Revisa si Directions API está habilitada):', status);
          }
        }
      );
    };

    cargarScriptGoogleMaps();
  }, [isOnline, estadoActual, servicioActivo]);

  const gpsNavigationUrl = `https://www.google.com/maps/dir/?api=1&origin=${puntoInicio.lat},${puntoInicio.lng}&destination=${puntoFin.lat},${puntoFin.lng}&travelmode=driving`;

  const obtenerEstadoServicio = () => {
    switch (estadoActual) {
      case ESTADOS_SERVICIO.ACEPTADO: return { titulo: 'Servicio aceptado', descripcion: 'Listo para iniciar ruta' };
      case ESTADOS_SERVICIO.EN_CAMINO_ORIGEN: return { titulo: 'En camino', descripcion: 'Dirigiéndote a la recogida' };
      case ESTADOS_SERVICIO.EN_SITIO_ORIGEN: return { titulo: 'En sitio', descripcion: 'Vehículo localizado' };
      case ESTADOS_SERVICIO.EN_CAMINO_DESTINO: return { titulo: 'En traslado', descripcion: 'Dirigiéndote al destino' };
      default: return { titulo: 'Servicio activo', descripcion: 'Operación en curso' };
    }
  };

  const estadoVisual = obtenerEstadoServicio();
  const direccionActual = esTramoRecogida ? origenObj?.direccion : destinoObj?.direccion;
  const tituloDestinoActual = esTramoRecogida ? 'Punto de recogida' : 'Destino del servicio';

  const toggleExpand = () => setIsExpanded((prev) => !prev);
  const abrirDetalles = () => setShowDetails(true);
  const cerrarDetalles = () => setShowDetails(false);

  if (!isOnline) {
    // ... (El bloque Offline se mantiene exactamente igual)
    return (
      <>
        <div className="w-full space-y-3">
          <ServiceHeader estadoVisual={estadoVisual} servicioId={servicioActivo.id} onOpenDetails={abrirDetalles} />
          <section className="gocast-card overflow-hidden">
            <div className="flex flex-col items-center justify-center px-5 py-7 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-warning-soft)] text-[var(--color-warning)]">
                <WifiOff className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-bold text-[var(--text-main)]">Mapa no disponible</h3>
              <p className="mt-1 max-w-[280px] text-xs leading-5 text-[var(--text-muted)]">
                No tienes conexión a Internet. Los datos del servicio permanecen disponibles en el teléfono.
              </p>
            </div>
            <div className="border-t border-[var(--bg-card-border)] bg-[var(--bg-card-secondary)] p-4">
              <div className="space-y-4">
                <LocationRow label="Tu ubicación" value={grueroObj?.direccion || 'Última ubicación GPS registrada'} type="current" />
                <LocationRow label="Recogida" value={origenObj?.direccion || 'Ubicación de recogida'} type="origin" />
                <LocationRow label="Destino" value={destinoObj?.direccion || 'Destino del servicio'} type="destination" />
              </div>
            </div>
          </section>
        </div>
        <ServiceDetailsSheet open={showDetails} onClose={cerrarDetalles} />
      </>
    );
  }

  return (
    <>
      <div className="w-full space-y-3">
        {!isExpanded && (
          <ServiceHeader estadoVisual={estadoVisual} servicioId={servicioActivo.id} onOpenDetails={abrirDetalles} />
        )}

        <section
          className={`overflow-hidden border border-[var(--bg-card-border)] bg-[var(--bg-card)] shadow-[var(--shadow-card)] transition-all duration-300 ${
            isExpanded
              ? 'fixed inset-0 z-[90] flex h-dvh w-full flex-col'
              : 'relative h-[350px] w-full rounded-[24px]'
          }`}
        >
          {/* Header flotante del mapa */}
          <div className={`absolute left-3 right-3 top-3 z-20 flex items-start gap-2 ${isExpanded ? 'pt-[env(safe-area-inset-top)]' : ''}`}>
            <div className="min-w-0 flex-1 rounded-2xl border border-[var(--bg-card-border)] bg-[var(--bg-card)]/95 p-3 shadow-lg backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                  <Navigation className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--text-muted)]">{tituloDestinoActual}</p>
                  <p className="mt-0.5 truncate text-xs font-bold text-[var(--text-main)]">{direccionActual || 'Ubicación del servicio'}</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={toggleExpand}
              aria-label={isExpanded ? 'Reducir mapa' : 'Ampliar mapa'}
              className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-2xl border border-[var(--bg-card-border)] bg-[var(--bg-card)]/95 text-[var(--color-primary)] shadow-lg backdrop-blur-xl transition-all active:scale-90"
            >
              {isExpanded ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </button>
          </div>

          {!mapCargado && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[var(--bg-card)]">
              <Loader2 className="h-8 w-8 animate-spin text-[var(--color-primary)]" />
              <p className="mt-2 text-xs font-semibold text-[var(--text-muted)]">Cargando Google Maps...</p>
            </div>
          )}

          {/* Lienzo del Mapa Interactivo */}
          <div ref={mapRef} className="h-full w-full" />

          {!isExpanded && (
            <div className="pointer-events-none absolute bottom-[78px] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--bg-card)]/90 px-3 py-1.5 text-[9px] font-semibold text-[var(--text-muted)] shadow-sm backdrop-blur-md">
              Amplía el mapa para explorarlo
            </div>
          )}

          {/* Barra inferior actualizada con Distancia y Tiempo */}
          <div className={`absolute bottom-3 left-3 right-3 z-20 ${isExpanded ? 'pb-[env(safe-area-inset-bottom)]' : ''}`}>
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--bg-card-border)] bg-[var(--bg-card)]/95 p-2 shadow-lg backdrop-blur-xl">
              <div className="flex min-w-0 flex-1 items-center gap-2 px-2">
                <Route className="h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                <div className="min-w-0">
                  {/* NUEVO: Mostrar tiempo y distancia si están disponibles */}
                  <div className="flex items-center gap-1.5">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      {infoRuta.tiempo ? `Ruta: ${infoRuta.distancia}` : 'Ruta activa'}
                    </p>
                    {infoRuta.tiempo && (
                      <span className="flex items-center gap-0.5 rounded bg-[var(--color-primary-soft)] px-1.5 py-0.5 text-[8px] font-bold text-[var(--color-primary)]">
                        <Clock className="h-2.5 w-2.5" /> {infoRuta.tiempo}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-[11px] font-semibold text-[var(--text-main)]">
                    {esTramoRecogida ? 'Tu ubicación → Recogida' : 'Recogida → Destino'}
                  </p>
                </div>
              </div>

              <a
                href={gpsNavigationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 shrink-0 items-center gap-2 rounded-xl bg-[var(--color-primary)] px-3 text-[11px] font-bold text-[var(--color-on-primary)] transition-all active:scale-95"
              >
                <Navigation className="h-4 w-4" />
                Abrir GPS
              </a>
            </div>
          </div>
        </section>
      </div>

      <ServiceDetailsSheet open={showDetails} onClose={cerrarDetalles} />
    </>
  );
}

// ... (ServiceHeader y LocationRow se mantienen exactamente igual)
function ServiceHeader({ estadoVisual, servicioId, onOpenDetails }) {
  return (
    <section className="rounded-[20px] border border-[var(--bg-card-border)] bg-[var(--bg-card)] px-4 py-3.5 shadow-[var(--shadow-sm)]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--text-muted)]">
          <span className="h-2 w-2 rounded-full bg-[var(--color-success)]" />
          Servicio en curso
        </div>
        <span className="shrink-0 rounded-full bg-[var(--color-primary-soft)] px-3 py-1.5 text-[10px] font-bold text-[var(--color-primary)]">
          #{servicioId}
        </span>
      </div>

      <div className="mt-3 flex items-end justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="text-[18px] font-bold leading-tight tracking-tight text-[var(--text-main)]">{estadoVisual.titulo}</h2>
          <p className="mt-1 truncate text-[11px] font-medium text-[var(--text-muted)]">{estadoVisual.descripcion}</p>
        </div>

        <button
          type="button"
          onClick={onOpenDetails}
          className="flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full bg-[var(--color-primary-soft)] px-3.5 text-[var(--color-primary)] transition-all duration-200 active:scale-95 active:bg-[var(--color-primary)] active:text-[var(--color-on-primary)]"
        >
          <Plus className="h-4 w-4 stroke-[3]" />
          <span className="text-[11px] font-bold">Detalles</span>
        </button>
      </div>
    </section>
  );
}

function LocationRow({ label, value, type }) {
  const colorClass = {
    current: 'text-[var(--color-primary)]',
    origin: 'text-[var(--color-info)]',
    destination: 'text-[var(--color-success)]',
  }[type];

  return (
    <div className="flex items-start gap-3">
      <MapPin className={`mt-0.5 h-4 w-4 shrink-0 ${colorClass}`} />
      <div className="min-w-0">
        <p className="text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">{label}</p>
        <p className="mt-0.5 text-xs font-semibold leading-4 text-[var(--text-main)]">{value}</p>
      </div>
    </div>
  );
}