// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App


// import { useEffect } from 'react';
// import { Header } from './components/layout/Header';
// import { NetworkListener } from './components/layout/NetworkListener';
// import { AssignmentModal } from './features/assignment/AssignmentModal';
// import { ProgressStepper } from './features/tracking/ProgressStepper';
// import { EvidenceDropzone } from './features/evidence/EvidenceDropzone';
// import { ServiceSuccess } from './features/evidence/ServiceSuccess';
// import { BottomNav } from './components/layout/BottomNav';
// import { MapComponent } from './components/ui/MapComponent';
// import { PermissionModal } from './components/permissions/PermissionModal';
// import { useServiceStore, ESTADOS_SERVICIO } from './store/useServiceStore';
// import { MapView, EarningsView, ProfileView } from './features/views/SecondaryViews';
// import { Truck } from 'lucide-react';

// export default function App() {
//   const cargarServicioPersistido = useServiceStore((state) => state.cargarServicioPersistido);
//   const asignarNuevoServicio = useServiceStore((state) => state.asignarNuevoServicio);
//   const estadoActual = useServiceStore((state) => state.estadoActual);
//   const servicioActivo = useServiceStore((state) => state.servicioActivo);
//   const tabActiva = useServiceStore((state) => state.tabActiva);

//   useEffect(() => {
//     cargarServicioPersistido();
//   }, [cargarServicioPersistido]);

//   const simularLlegadaServicio = () => {
//     asignarNuevoServicio({
//       id: '10928',
//       operador: 'Control Central',
//       cliente: { nombre: 'Carlos Mendoza', telefono: '04141234567' },
//       vehiculo: { marca: 'Toyota', modelo: 'Hilux', placa: 'ABC123D', falla: 'Sin tracción' },
//       origen: {
//         direccion: 'Av. Francisco de Miranda, Los Palos Grandes',
//         lat: 10.4961,
//         lng: -66.8480
//       },
//       destino: {
//         direccion: 'Taller Autofix, Zona Industrial La Urbina',
//         lat: 10.4820,
//         lng: -66.8150
//       }
//     });
//   };

//   return (
//     <div className="min-h-dvh bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col justify-between font-sans antialiased pb-16 transition-colors">
//       <NetworkListener />
//       <Header />
//       <PermissionModal />

//       <main className="flex-1 flex flex-col justify-center items-center p-4 text-center max-w-md mx-auto w-full space-y-4">
//         {/* ESTADO IDLE */}
//         {estadoActual === ESTADOS_SERVICIO.IDLE && (
//           <div className="space-y-4 max-w-xs my-auto">
//             <div className="w-16 h-16 bg-[var(--bg-card)] border border-[var(--bg-card-border)] rounded-full flex items-center justify-center mx-auto text-[var(--color-primary)] shadow-inner">
//               <Truck className="w-8 h-8" />
//             </div>
//             <div>
//               <h2 className="font-bold text-lg">Esperando Asignación...</h2>
//               <p className="text-xs text-[var(--text-muted)] mt-1">
//                 Unidad disponible en zona. Se te notificará al recibir un servicio.
//               </p>
//             </div>
//             <button
//               onClick={simularLlegadaServicio}
//               className="w-full py-3 bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/20 text-[var(--color-primary)] font-bold text-xs rounded-xl border border-[var(--color-primary)]/30 transition-all active:scale-95"
//             >
//               [Simular Asignación de Servicio]
//             </button>
//           </div>
//         )}

//         {/* MAPA OPERATIVO EN VIVO */}
//         {servicioActivo && estadoActual !== ESTADOS_SERVICIO.IDLE && estadoActual !== 'EXITO_SERVICIO' && (
//           <MapComponent />
//         )}

//         {/* INFORME DE ÉXITO FINAL */}
//         <ServiceSuccess />
//       </main>

//       <AssignmentModal />
//       <ProgressStepper />
//       <EvidenceDropzone />
//       <BottomNav />
//     </div>
//   );
// }

// import { useEffect } from 'react';
// import { Header } from './components/layout/Header';
// import { NetworkListener } from './components/layout/NetworkListener';
// import { AssignmentModal } from './features/assignment/AssignmentModal';
// import { ProgressStepper } from './features/tracking/ProgressStepper';
// import { EvidenceDropzone } from './features/evidence/EvidenceDropzone';
// import { ServiceSuccess } from './features/evidence/ServiceSuccess';
// import { BottomNav } from './components/layout/BottomNav';
// import { MapComponent } from './components/ui/MapComponent';
// import { PermissionModal } from './components/permissions/PermissionModal';
// import { useServiceStore, ESTADOS_SERVICIO } from './store/useServiceStore';
// import { MapView, EarningsView, ProfileView } from './features/views/SecondaryViews';
// import { Truck } from 'lucide-react';

// export default function App() {
//   const cargarServicioPersistido = useServiceStore((state) => state.cargarServicioPersistido);
//   const asignarNuevoServicio = useServiceStore((state) => state.asignarNuevoServicio);
//   const estadoActual = useServiceStore((state) => state.estadoActual);
//   const servicioActivo = useServiceStore((state) => state.servicioActivo);
//   const tabActiva = useServiceStore((state) => state.tabActiva);

//   useEffect(() => {
//     cargarServicioPersistido();
//   }, [cargarServicioPersistido]);

//   const simularLlegadaServicio = () => {
//     asignarNuevoServicio({
//       id: '10928',
//       operador: 'Control Central',
//       cliente: { nombre: 'Carlos Mendoza', telefono: '04141234567' },
//       vehiculo: { marca: 'Toyota', modelo: 'Hilux', placa: 'ABC123D', falla: 'Sin tracción' },
//       origen: {
//         direccion: 'Av. Francisco de Miranda, Los Palos Grandes',
//         lat: 10.4961,
//         lng: -66.8480
//       },
//       destino: {
//         direccion: 'Taller Autofix, Zona Industrial La Urbina',
//         lat: 10.4820,
//         lng: -66.8150
//       }
//     });
//   };

//   return (
//     <div className="min-h-dvh bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col justify-between font-sans antialiased pb-16 transition-colors">
//       <NetworkListener />
//       <Header />
//       <PermissionModal />

//       <main className="flex-1 flex flex-col justify-center items-center p-4 text-center max-w-md mx-auto w-full space-y-4">

//         {/* PESTAÑA PRINCIPAL: SERVICIOS */}
//         {tabActiva === 'jobs' && (
//           <>
//             {/* ESTADO IDLE (ESPERA) */}
//             {estadoActual === ESTADOS_SERVICIO.IDLE && (
//               <div className="space-y-4 max-w-xs my-auto">
//                 <div className="w-16 h-16 bg-[var(--bg-card)] border border-[var(--bg-card-border)] rounded-full flex items-center justify-center mx-auto text-[var(--color-primary)] shadow-inner">
//                   <Truck className="w-8 h-8" />
//                 </div>
//                 <div>
//                   <h2 className="font-bold text-lg">Esperando Asignación...</h2>
//                   <p className="text-xs text-[var(--text-muted)] mt-1">
//                     Unidad disponible en zona. Se te notificará al recibir un servicio.
//                   </p>
//                 </div>
//                 <button
//                   onClick={simularLlegadaServicio}
//                   className="w-full py-3 bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/20 text-[var(--color-primary)] font-bold text-xs rounded-xl border border-[var(--color-primary)]/30 transition-all active:scale-95 cursor-pointer"
//                 >
//                   [Simular Asignación de Servicio]
//                 </button>
//               </div>
//             )}

//             {/* MAPA OPERATIVO EN VIVO (Se oculta en estado PENDIENTE_EVIDENCIA) */}
//             {servicioActivo &&
//               estadoActual !== ESTADOS_SERVICIO.IDLE &&
//               estadoActual !== ESTADOS_SERVICIO.EXITO_SERVICIO &&
//               estadoActual !== ESTADOS_SERVICIO.PENDIENTE_EVIDENCIA && (
//                 <MapComponent />
//               )}

//             {/* CAPTURA DE EVIDENCIA Y DUAL FIRMAS */}
//             <EvidenceDropzone />

//             {/* INFORME DE ÉXITO FINAL */}
//             <ServiceSuccess />
//           </>
//         )}

//         {/* PESTAÑAS SECUNDARIAS */}
//         {tabActiva === 'map' && <MapView />}
//         {tabActiva === 'earnings' && <EarningsView />}
//         {tabActiva === 'profile' && <ProfileView />}

//       </main>

//       {/* COMPONENTES DE CONTROL Y NAVEGACIÓN */}
//       <AssignmentModal />
//       {tabActiva === 'jobs' && <ProgressStepper />}
//       <BottomNav />
//     </div>
//   );
// }

// import { useEffect } from 'react';
// import { Header } from './components/layout/Header';
// import { NetworkListener } from './components/layout/NetworkListener';
// import { AssignmentModal } from './features/assignment/AssignmentModal';
// import { ProgressStepper } from './features/tracking/ProgressStepper';
// import { EvidenceDropzone } from './features/evidence/EvidenceDropzone';
// import { ServiceSuccess } from './features/evidence/ServiceSuccess';
// import { BottomNav } from './components/layout/BottomNav';
// import { MapComponent } from './components/ui/MapComponent';
// import { PermissionModal } from './components/permissions/PermissionModal';
// import { useServiceStore, ESTADOS_SERVICIO } from './store/useServiceStore';
// import { MapView, EarningsView, ProfileView } from './features/views/SecondaryViews';
// import { Truck } from 'lucide-react';

// export default function App() {
//   const cargarServicioPersistido = useServiceStore((state) => state.cargarServicioPersistido);
//   const asignarNuevoServicio = useServiceStore((state) => state.asignarNuevoServicio);
//   const estadoActual = useServiceStore((state) => state.estadoActual);
//   const servicioActivo = useServiceStore((state) => state.servicioActivo);
//   const tabActiva = useServiceStore((state) => state.tabActiva);

//   useEffect(() => {
//     cargarServicioPersistido();
//   }, [cargarServicioPersistido]);

//   const simularLlegadaServicio = () => {
//     asignarNuevoServicio({
//       id: '10928',
//       operador: 'Control Central',
//       cliente: { nombre: 'Luis Bermudez', telefono: '04129728222' },
//       vehiculo: { marca: 'Toyota', modelo: 'Hilux', placa: 'ABC123D', falla: 'Sin tracción' },
//       origen: {
//         direccion: 'Av. Francisco de Miranda, Los Palos Grandes',
//         lat: 10.4961,
//         lng: -66.8480
//       },
//       destino: {
//         direccion: 'Taller Autofix, Zona Industrial La Urbina',
//         lat: 10.4820,
//         lng: -66.8150
//       }
//     });
//   };

//   return (
//     <div className="min-h-dvh bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col justify-between font-sans antialiased pb-16 transition-colors">
//       <NetworkListener />
//       <Header />
//       <PermissionModal />

//       <main className="flex-1 flex flex-col justify-center items-center p-4 text-center max-w-md mx-auto w-full space-y-4">

//         {/* PESTAÑA PRINCIPAL: SERVICIOS */}
//         {tabActiva === 'jobs' && (
//           <>
//             {/* ESTADO IDLE (ESPERA) */}
//             {estadoActual === ESTADOS_SERVICIO.IDLE && (
//               <div className="space-y-4 max-w-xs my-auto">
//                 <div className="w-16 h-16 bg-[var(--bg-card)] border border-[var(--bg-card-border)] rounded-full flex items-center justify-center mx-auto text-[var(--color-primary)] shadow-inner">
//                   <Truck className="w-8 h-8" />
//                 </div>
//                 <div>
//                   <h2 className="font-bold text-lg">Esperando Asignación...</h2>
//                   <p className="text-xs text-[var(--text-muted)] mt-1">
//                     Unidad disponible en zona. Se te notificará al recibir un servicio.
//                   </p>
//                 </div>
//                 <button
//                   onClick={simularLlegadaServicio}
//                   className="w-full py-3 bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/20 text-[var(--color-primary)] font-bold text-xs rounded-xl border border-[var(--color-primary)]/30 transition-all active:scale-95 cursor-pointer"
//                 >
//                   [Simular Asignación de Servicio]
//                 </button>
//               </div>
//             )}

//             {/* MAPA OPERATIVO EN VIVO (Se oculta en estado PENDIENTE_EVIDENCIA) */}
//             {servicioActivo &&
//               estadoActual !== ESTADOS_SERVICIO.IDLE &&
//               estadoActual !== ESTADOS_SERVICIO.EXITO_SERVICIO &&
//               estadoActual !== ESTADOS_SERVICIO.PENDIENTE_EVIDENCIA && (
//                 <MapComponent />
//               )}

//             {/* CAPTURA DE EVIDENCIA Y DUAL FIRMAS */}
//             <EvidenceDropzone />

//             {/* INFORME DE ÉXITO FINAL */}
//             <ServiceSuccess />
//           </>
//         )}

//         {/* PESTAÑAS SECUNDARIAS */}
//         {tabActiva === 'map' && <MapView />}
//         {tabActiva === 'earnings' && <EarningsView />}
//         {tabActiva === 'profile' && <ProfileView />}

//       </main>

//       {/* COMPONENTES DE CONTROL Y NAVEGACIÓN */}
//       <AssignmentModal />
//       {tabActiva === 'jobs' && <ProgressStepper />}
//       <BottomNav />
//     </div>
//   );
// }  GEMINI

// import { useEffect, useState } from 'react';
// import { Truck } from 'lucide-react';

// import { Header } from './components/layout/Header';
// import { NetworkListener } from './components/layout/NetworkListener';
// import { BottomNav } from './components/layout/BottomNav';

// import { PermissionModal } from './components/permissions/PermissionModal';
// import { MapComponent } from './components/ui/MapComponent';

// import { AssignmentModal } from './features/assignment/AssignmentModal';
// import { ProgressStepper } from './features/tracking/ProgressStepper';

// import { EvidenceDropzone } from './features/evidence/EvidenceDropzone';
// import { ServiceSuccess } from './features/evidence/ServiceSuccess';

// import {
//   MapView,
//   EarningsView,
//   ProfileView,
// } from './features/views/SecondaryViews';

// import {
//   useServiceStore,
//   ESTADOS_SERVICIO,
// } from './store/useServiceStore';


// export default function App() {

//   const [disponibleParaServicios, setDisponibleParaServicios] = useState(true);


//   const cargarServicioPersistido = useServiceStore(
//     (state) => state.cargarServicioPersistido
//   );

//   const asignarNuevoServicio = useServiceStore(
//     (state) => state.asignarNuevoServicio
//   );

//   const estadoActual = useServiceStore(
//     (state) => state.estadoActual
//   );

//   const servicioActivo = useServiceStore(
//     (state) => state.servicioActivo
//   );

//   const tabActiva = useServiceStore(
//     (state) => state.tabActiva
//   );

//   /*
//   |--------------------------------------------------------------------------
//   | Recuperar servicio persistido
//   |--------------------------------------------------------------------------
//   */

//   useEffect(() => {
//     cargarServicioPersistido();
//   }, [cargarServicioPersistido]);

//   /*
//   |--------------------------------------------------------------------------
//   | Simulación temporal de asignación
//   |--------------------------------------------------------------------------
//   |
//   | Se mantiene solamente para desarrollo.
//   |
//   */

//   const resumenHoy = {
//     ganado: '$126.800',
//     variacion: '12% vs. ayer',
//     servicios: 4,
//     completados: 3,
//   };

//   const simularLlegadaServicio = () => {
//     asignarNuevoServicio({
//       id: '10928',

//       operador: 'Control Central',

//       cliente: {
//         nombre: 'Luis Bermudez',
//         telefono: '04129728222',
//       },

//       vehiculo: {
//         marca: 'Toyota',
//         modelo: 'Hilux',
//         placa: 'ABC123D',
//         falla: 'Sin tracción',
//       },

//       origen: {
//         direccion:
//           'Av. Francisco de Miranda, Los Palos Grandes',
//         lat: 10.4961,
//         lng: -66.848,
//       },

//       destino: {
//         direccion:
//           'Taller Autofix, Zona Industrial La Urbina',
//         lat: 10.482,
//         lng: -66.815,
//       },
//     });
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | Estados visuales de la aplicación
//   |--------------------------------------------------------------------------
//   */

//   const esIdle =
//     estadoActual === ESTADOS_SERVICIO.IDLE;

//   const esEvidencia =
//     estadoActual === ESTADOS_SERVICIO.PENDIENTE_EVIDENCIA;

//   const esServicioCompletado =
//     estadoActual === ESTADOS_SERVICIO.EXITO_SERVICIO;

//   /*
//   |--------------------------------------------------------------------------
//   | Servicio operativo
//   |--------------------------------------------------------------------------
//   |
//   | Define cuándo mostramos el mapa operativo.
//   |
//   */

//   const mostrarMapaOperativo =
//     tabActiva === 'jobs' &&
//     servicioActivo &&
//     !esIdle &&
//     !esEvidencia &&
//     !esServicioCompletado;

//   /*
//   |--------------------------------------------------------------------------
//   | Progress Stepper
//   |--------------------------------------------------------------------------
//   |
//   | Lo usamos también para calcular cuánto espacio inferior
//   | necesita el contenido.
//   |
//   */

//   const mostrarProgressStepper =
//     tabActiva === 'jobs' &&
//     servicioActivo &&
//     !esIdle &&
//     !esEvidencia &&
//     !esServicioCompletado;

//   /*
//   |--------------------------------------------------------------------------
//   | Padding inferior dinámico
//   |--------------------------------------------------------------------------
//   |
//   | BottomNav:
//   | 72px
//   |
//   | ProgressStepper:
//   | aproximadamente 130px
//   |
//   | Esto impide que el contenido quede escondido detrás
//   | de elementos fixed.
//   |
//   */

//   return (
//     <div
//       className="
//       gocast-app
//       flex
//       h-dvh
//       max-h-dvh
//       flex-col
//       overflow-hidden
//     "
//     >
//       {/* Servicios globales */}
//       <NetworkListener />
//       <PermissionModal />

//       {/* =====================================================
//         HEADER - FUERA DEL SCROLL
//     ===================================================== */}

//       <div className="shrink-0">
//         <Header />
//       </div>

//       {/* =====================================================
//         ÚNICO CONTENEDOR SCROLLABLE
//     ===================================================== */}

//       <main
//         className="
//         gocast-container
//         min-h-0
//         w-full
//         flex-1
//         overflow-y-auto
//         overflow-x-hidden
//         overscroll-contain
//         px-4
//         py-4
//         touch-pan-y
//       "
//         style={{
//           WebkitOverflowScrolling: 'touch',
//         }}
//       >
//         {/* ===================================================
//           TAB SERVICIOS
//       =================================================== */}

//         {tabActiva === 'jobs' && (
//           <div className="w-full">
//             {/* ESTADO IDLE */}

//             {estadoActual === ESTADOS_SERVICIO.IDLE && (
//               <section className="w-full space-y-4 py-2">
//                 {/* ===================================================
//         DISPONIBILIDAD
//     =================================================== */}

//                 <div className="gocast-card p-5">
//                   <div className="flex items-center justify-between gap-4">
//                     <div className="min-w-0 flex-1">
//                       <div className="flex items-center gap-2">
//                         <span
//                           className={`h-3 w-3 rounded-full ${disponibleParaServicios
//                               ? 'bg-[var(--color-success)]'
//                               : 'bg-[var(--text-muted)]'
//                             }`}
//                         />

//                         <h2 className="text-[18px] font-bold tracking-tight text-[var(--text-main)]">
//                           {disponibleParaServicios
//                             ? 'Disponible para servicios'
//                             : 'No disponible'}
//                         </h2>
//                       </div>

//                       <p className="mt-2 text-sm text-[var(--text-muted)]">
//                         {disponibleParaServicios
//                           ? 'GPS y solicitudes habilitados'
//                           : 'No recibirás nuevas solicitudes temporalmente'}
//                       </p>
//                     </div>

//                     {/* Toggle */}
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setDisponibleParaServicios((prev) => !prev)
//                       }
//                       aria-label="Cambiar disponibilidad"
//                       className={`
//                         relative
//                         h-11
//                         w-[68px]
//                         shrink-0
//                         rounded-full
//                         transition-all
//                         duration-200

//                         ${disponibleParaServicios
//                                       ? 'bg-[var(--color-success)]'
//                                       : 'bg-[var(--bg-card-border)]'
//                                     }
//                       `}
//                     >
//                       <span
//                         className={`
//               absolute
//               top-1
//               h-9
//               w-9
//               rounded-full
//               bg-white
//               shadow-md
//               transition-all
//               duration-200

//               ${disponibleParaServicios
//                             ? 'left-[30px]'
//                             : 'left-[4px]'
//                           }
//             `}
//                       />
//                     </button>
//                   </div>
//                 </div>

//                 {/* ===================================================
//         RESUMEN DEL DÍA
//     =================================================== */}

//                 <div className="grid grid-cols-2 gap-3">
//                   {/* Ganado hoy */}
//                   <div className="gocast-card p-5">
//                     <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--text-muted)]">
//                       Ganado hoy
//                     </p>

//                     <p className="mt-4 text-[20px] font-bold tracking-tight text-[var(--text-main)]">
//                       {resumenHoy.ganado}
//                     </p>

//                     <p className="mt-2 text-sm font-semibold text-[var(--color-success)]">
//                       ↑ {resumenHoy.variacion}
//                     </p>
//                   </div>

//                   {/* Servicios */}
//                   <div className="gocast-card p-5">
//                     <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--text-muted)]">
//                       Servicios
//                     </p>

//                     <p className="mt-4 text-[20px] font-bold tracking-tight text-[var(--text-main)]">
//                       {resumenHoy.servicios}
//                     </p>

//                     <p className="mt-2 text-sm font-semibold text-[var(--color-success)]">
//                       {resumenHoy.completados} completados
//                     </p>
//                   </div>
//                 </div>

//                 {/* ===================================================
//         ESTADO VACÍO / ACCIÓN
//     =================================================== */}

//                 <div className="gocast-card p-6 text-center">
//                   <div
//                     className="
//           relative
//           mx-auto
//           flex
//           h-20
//           w-20
//           items-center
//           justify-center
//           rounded-[24px]
//           bg-[var(--color-primary-soft)]
//           text-[var(--color-primary)]
//         "
//                   >
//                     <Truck className="h-9 w-9 stroke-[1.8]" />

//                     <span
//                       className={`
//             absolute
//             bottom-1
//             right-1
//             h-4
//             w-4
//             rounded-full
//             border-[3px]
//             border-[var(--bg-card)]

//             ${disponibleParaServicios
//                           ? 'bg-[var(--color-success)]'
//                           : 'bg-[var(--text-muted)]'
//                         }
//           `}
//                     />
//                   </div>

//                   <h3 className="mt-5 text-[22px] font-bold tracking-tight text-[var(--text-main)]">
//                     {disponibleParaServicios
//                       ? 'Sin servicios pendientes'
//                       : 'Modo pausa activado'}
//                   </h3>

//                   <p className="mx-auto mt-2 max-w-[290px] text-sm leading-6 text-[var(--text-muted)]">
//                     {disponibleParaServicios
//                       ? 'Tu unidad está lista para recibir una nueva asignación.'
//                       : 'Activa nuevamente tu disponibilidad para recibir solicitudes.'}
//                   </p>

//                   <button
//                     type="button"
//                     onClick={simularLlegadaServicio}
//                     disabled={!disponibleParaServicios}
//                     className={`
//           mt-6
//           w-full
//           min-h-[52px]
//           rounded-[18px]
//           px-4
//           text-sm
//           font-bold
//           transition-all

//           ${disponibleParaServicios
//                         ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-[0_10px_24px_rgba(59,71,110,0.20)] active:scale-[0.98]'
//                         : 'bg-[var(--bg-card-border)] text-[var(--text-muted)] cursor-not-allowed opacity-70'
//                       }
//         `}
//                   >
//                     Simular servicio
//                   </button>

//                   <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
//                     Función temporal de desarrollo
//                   </p>
//                 </div>
//               </section>
//             )}

//             {/* MAPA OPERATIVO */}

//             {servicioActivo &&
//               estadoActual !== ESTADOS_SERVICIO.IDLE &&
//               estadoActual !== ESTADOS_SERVICIO.EXITO_SERVICIO &&
//               estadoActual !== ESTADOS_SERVICIO.PENDIENTE_EVIDENCIA && (
//                 <MapComponent />
//               )}

//             {/* EVIDENCIAS */}

//             <EvidenceDropzone />

//             {/* SERVICIO COMPLETADO */}

//             <ServiceSuccess />
//           </div>
//         )}

//         {/* ===================================================
//           TABS SECUNDARIOS
//       =================================================== */}

//         {tabActiva === 'map' && (
//           <section className="w-full">
//             <MapView />
//           </section>
//         )}

//         {tabActiva === 'earnings' && (
//           <section className="w-full">
//             <EarningsView />
//           </section>
//         )}

//         {tabActiva === 'profile' && (
//           <section className="w-full">
//             <ProfileView />
//           </section>
//         )}
//       </main>

//       {/* =====================================================
//         CONTROLES INFERIORES - FUERA DEL SCROLL
//     ===================================================== */}

//       <div className="shrink-0">
//         {tabActiva === 'jobs' && (
//           <ProgressStepper />
//         )}

//         <BottomNav />
//       </div>

//       {/* Modal siempre por encima */}
//       <AssignmentModal />
//     </div>
//   );
// }    APP.JSX con SIMULACIÓN DE SERVICIO.

// import { useEffect, useState } from 'react';
// import { Truck, Radar, Link as LinkIcon } from 'lucide-react';
// import { sincronizarTodoPendiente } from './services/syncQueue';

// import { Header } from './components/layout/Header';
// import { NetworkListener } from './components/layout/NetworkListener';
// import { BottomNav } from './components/layout/BottomNav';

// import { PermissionModal } from './components/permissions/PermissionModal';
// import { MapComponent } from './components/ui/MapComponent';

// import { AssignmentModal } from './features/assignment/AssignmentModal';
// import { ProgressStepper } from './features/tracking/ProgressStepper';

// import { EvidenceDropzone } from './features/evidence/EvidenceDropzone';
// import { ServiceSuccess } from './features/evidence/ServiceSuccess';

// import {
//   MapView,
//   EarningsView,
//   ProfileView,
// } from './features/views/SecondaryViews';

// import {
//   useServiceStore,
//   ESTADOS_SERVICIO,
// } from './store/useServiceStore';

// export default function App() {
//   const [disponibleParaServicios, setDisponibleParaServicios] = useState(true);
//   const [errorRadar, setErrorRadar] = useState(null);

//   const cargarServicioPersistido = useServiceStore((state) => state.cargarServicioPersistido);
//   const asignarNuevoServicio = useServiceStore((state) => state.asignarNuevoServicio);
//   const estadoActual = useServiceStore((state) => state.estadoActual);
//   const servicioActivo = useServiceStore((state) => state.servicioActivo);
//   const tabActiva = useServiceStore((state) => state.tabActiva);

//   useEffect(() => {
//     // Al abrir o recargar la app, intenta sincronizar si hay red
//     sincronizarTodoPendiente();
//   }, []);

//   /*
//   |--------------------------------------------------------------------------
//   | Recuperar servicio persistido al iniciar
//   |--------------------------------------------------------------------------
//   */
//   useEffect(() => {
//     cargarServicioPersistido();
//   }, [cargarServicioPersistido]);

//   /*
//   |--------------------------------------------------------------------------
//   | LÓGICA 1: Hidratación por URL (Modo Offline vía SMS)
//   |--------------------------------------------------------------------------
//   */
//   // useEffect(() => {
//   //   const params = new URLSearchParams(window.location.search);
//   //   const serviceId = params.get('id');

//   //   if (serviceId && estadoActual === ESTADOS_SERVICIO.IDLE) {
//   //     const servicioPorSms = {
//   //       id: serviceId,
//   //       expediente: `EXP-${serviceId}`,
//   //       operador: 'Asignación vía SMS',
//   //       cliente: {
//   //         nombre: params.get('cn') || 'Cliente',
//   //         telefono: params.get('tel') || '04121234567'
//   //       },
//   //       vehiculo: {
//   //         marca: 'Vehículo',
//   //         modelo: 'Averiado',
//   //         placa: params.get('vp') || 'N/A',
//   //         falla: 'Reporte vía SMS'
//   //       },
//   //       origen: {
//   //         direccion: 'Ubicación de Recogida (Ver Mapa)',
//   //         lat: parseFloat(params.get('olat')) || 10.4961,
//   //         lng: parseFloat(params.get('olng')) || -66.8480
//   //       },
//   //       destino: {
//   //         direccion: 'Taller / Destino Final',
//   //         lat: parseFloat(params.get('dlat')) || 10.4820,
//   //         lng: parseFloat(params.get('dlng')) || -66.8150
//   //       }
//   //     };

//   //     asignarNuevoServicio(servicioPorSms);
//   //     // Limpiamos la URL para evitar recargas fantasma
//   //     window.history.replaceState({}, document.title, window.location.pathname);
//   //   }
//   // }, [estadoActual, asignarNuevoServicio]);  actual

//   /*
//   |--------------------------------------------------------------------------
//   | LÓGICA 1: Hidratación por URL (Modo Offline / SMS con Enlace Corto)
//   |--------------------------------------------------------------------------
//   */
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const serviceId = params.get('id');

//     if (serviceId && estadoActual === ESTADOS_SERVICIO.IDLE) {
//       // Como el SMS ahora solo trae el ID, consultamos el JSON completo al servidor
//       const cargarServicioPorId = async () => {
//         try {
//           const timestamp = new Date().getTime();
//           const response = await fetch(`https://apidev.gocastgroup.com/api/gruero_app/servicio_activo.json?t=${timestamp}`);

//           if (!response.ok) throw new Error('No se pudo cargar el detalle');

//           const data = await response.json();

//           const servicioPorSms = {
//             id: serviceId,
//             expediente: data.numero_expediente || `EXP-${serviceId}`,
//             operador: data.proveedor?.nombre || 'Asignación vía SMS',
//             cliente: {
//               nombre: data.cliente?.nombre || 'Cliente Auxilio Vial',
//               telefono: data.cliente?.telefono || '04121234567'
//             },
//             vehiculo: {
//               marca: data.vehiculo?.marca || 'Vehículo',
//               modelo: data.vehiculo?.modelo || 'Averiado',
//               placa: data.vehiculo?.placa || 'S/P',
//               falla: data.servicio?.falla || 'Reporte vía SMS'
//             },
//             origen: {
//               direccion: data.origen?.referencia || 'Ubicación de Recogida',
//               lat: parseFloat(data.origen?.lat) || 10.4961,
//               lng: parseFloat(data.origen?.lng) || -66.8480
//             },
//             destino: {
//               direccion: data.destino?.referencia || 'Taller / Destino Final',
//               lat: parseFloat(data.destino?.lat) || 10.4820,
//               lng: parseFloat(data.destino?.lng) || -66.8150
//             }
//           };

//           asignarNuevoServicio(servicioPorSms);
//         } catch (error) {
//           console.error('Error al hidratar el servicio desde el servidor:', error);
//         }
//       };

//       cargarServicioPorId();

//       // Limpiamos la URL para evitar recargas fantasma
//       window.history.replaceState({}, document.title, window.location.pathname);
//     }
//   }, [estadoActual, asignarNuevoServicio]);

//   /*
//   |--------------------------------------------------------------------------
//   | LÓGICA 2: Radar de Búsqueda Online (Polling a tu servidor PHP)
//   |--------------------------------------------------------------------------
//   */
//   useEffect(() => {
//     let intervalo;

//     const verificarNuevosServicios = async () => {
//       // Solo busca si está IDLE, si tiene internet y si activó el switch de disponibilidad
//       if (estadoActual !== ESTADOS_SERVICIO.IDLE || !navigator.onLine || !disponibleParaServicios) return;

//       try {
//         const timestamp = new Date().getTime();
//         const response = await fetch(`https://apidev.gocastgroup.com/api/gruero_app/servicio_activo.json?t=${timestamp}`);
//         if (!response.ok) throw new Error('Error en conexión');

//         const data = await response.json();

//         if (data && data.servicio_id) {
//           const nuevoServicio = {
//             id: data.servicio_id.toString(),
//             expediente: data.numero_expediente,
//             operador: data.proveedor?.nombre || 'Control Central',
//             cliente: {
//               nombre: data.cliente?.nombre || 'Cliente Auxilio Vial',
//               telefono: data.cliente?.telefono || '04121234567'
//             },
//             vehiculo: {
//               marca: data.vehiculo?.marca || 'N/A',
//               modelo: data.vehiculo?.modelo || 'N/A',
//               placa: data.vehiculo?.placa || 'N/A',
//               falla: data.servicio?.falla || 'Sin tracción'
//             },
//             origen: {
//               direccion: data.origen?.referencia || 'Dirección de origen',
//               lat: data.origen?.lat || 10.4961,
//               lng: data.origen?.lng || -66.8480
//             },
//             destino: {
//               direccion: data.destino?.referencia || 'Dirección de destino',
//               lat: data.destino?.lat || 10.4820,
//               lng: data.destino?.lng || -66.8150
//             }
//           };

//           asignarNuevoServicio(nuevoServicio);
//           setErrorRadar(null);
//         }
//       } catch (error) {
//         setErrorRadar('Pérdida de conexión con la central...');
//       }
//     };

//     if (estadoActual === ESTADOS_SERVICIO.IDLE && disponibleParaServicios) {
//       intervalo = setInterval(verificarNuevosServicios, 7000);
//       if (navigator.onLine) verificarNuevosServicios(); // Primer chequeo inmediato
//     }

//     return () => {
//       if (intervalo) clearInterval(intervalo);
//     };
//   }, [estadoActual, asignarNuevoServicio, disponibleParaServicios]);


//   /*
//   |--------------------------------------------------------------------------
//   | Simulación temporal (botón manual de emergencia/desarrollo)
//   |--------------------------------------------------------------------------
//   */
//   const resumenHoy = {
//     ganado: '$126.800',
//     variacion: '12% vs. ayer',
//     servicios: 4,
//     completados: 3,
//   };

//   const simularLlegadaServicio = () => {
//     asignarNuevoServicio({
//       id: '10928',
//       operador: 'Control Central',
//       cliente: { nombre: 'Luis Bermudez', telefono: '04129728222' },
//       vehiculo: { marca: 'Toyota', modelo: 'Hilux', placa: 'ABC123D', falla: 'Sin tracción' },
//       origen: { direccion: 'Av. Francisco de Miranda, Los Palos Grandes', lat: 10.4961, lng: -66.848 },
//       destino: { direccion: 'Taller Autofix, Zona Industrial La Urbina', lat: 10.482, lng: -66.815 },
//     });
//   };

//   return (
//     <div className="gocast-app flex h-dvh max-h-dvh flex-col overflow-hidden bg-[var(--bg-main)] text-[var(--text-main)] transition-colors">

//       {/* Servicios globales */}
//       <NetworkListener />
//       <PermissionModal />

//       {/* =====================================================
//         HEADER - FUERA DEL SCROLL
//       ===================================================== */}
//       <div className="shrink-0">
//         <Header />
//       </div>

//       {/* =====================================================
//         ÚNICO CONTENEDOR SCROLLABLE
//       ===================================================== */}
//       <main
//         className="gocast-container min-h-0 w-full flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-4 py-4 touch-pan-y"
//         style={{ WebkitOverflowScrolling: 'touch' }}
//       >
//         {/* ===================================================
//           TAB PRINCIPAL: SERVICIOS
//         =================================================== */}
//         {tabActiva === 'jobs' && (
//           <div className="w-full space-y-4 max-w-md mx-auto">

//             {/* ESTADO IDLE */}
//             {estadoActual === ESTADOS_SERVICIO.IDLE && (
//               <section className="w-full space-y-4 py-2">

//                 {/* 1. DISPONIBILIDAD */}
//                 <div className="gocast-card p-5 bg-[var(--bg-card)] border border-[var(--bg-card-border)] rounded-2xl shadow-sm">
//                   <div className="flex items-center justify-between gap-4">
//                     <div className="min-w-0 flex-1">
//                       <div className="flex items-center gap-2">
//                         <span
//                           className={`h-3 w-3 rounded-full ${disponibleParaServicios ? 'bg-emerald-500' : 'bg-[var(--text-muted)]'
//                             }`}
//                         />
//                         <h2 className="text-[18px] font-bold tracking-tight text-[var(--text-main)]">
//                           {disponibleParaServicios ? 'Disponible para servicios' : 'No disponible'}
//                         </h2>
//                       </div>
//                       <p className="mt-2 text-sm text-[var(--text-muted)]">
//                         {disponibleParaServicios
//                           ? 'GPS y solicitudes habilitados'
//                           : 'No recibirás nuevas solicitudes temporalmente'}
//                       </p>
//                     </div>

//                     {/* Toggle */}
//                     <button
//                       type="button"
//                       onClick={() => setDisponibleParaServicios((prev) => !prev)}
//                       aria-label="Cambiar disponibilidad"
//                       className={`relative h-11 w-[68px] shrink-0 rounded-full transition-all duration-200 cursor-pointer ${disponibleParaServicios ? 'bg-emerald-500' : 'bg-[var(--bg-card-border)]'
//                         }`}
//                     >
//                       <span
//                         className={`absolute top-1 h-9 w-9 rounded-full bg-white shadow-md transition-all duration-200 ${disponibleParaServicios ? 'left-[30px]' : 'left-[4px]'
//                           }`}
//                       />
//                     </button>
//                   </div>
//                 </div>

//                 {/* 2. RESUMEN DEL DÍA */}
//                 <div className="grid grid-cols-2 gap-3">
//                   <div className="gocast-card p-5 bg-[var(--bg-card)] border border-[var(--bg-card-border)] rounded-2xl shadow-sm">
//                     <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--text-muted)]">Ganado hoy</p>
//                     <p className="mt-4 text-[20px] font-bold tracking-tight text-[var(--text-main)]">{resumenHoy.ganado}</p>
//                     <p className="mt-2 text-sm font-semibold text-emerald-500">↑ {resumenHoy.variacion}</p>
//                   </div>

//                   <div className="gocast-card p-5 bg-[var(--bg-card)] border border-[var(--bg-card-border)] rounded-2xl shadow-sm">
//                     <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--text-muted)]">Servicios</p>
//                     <p className="mt-4 text-[20px] font-bold tracking-tight text-[var(--text-main)]">{resumenHoy.servicios}</p>
//                     <p className="mt-2 text-sm font-semibold text-emerald-500">{resumenHoy.completados} completados</p>
//                   </div>
//                 </div>

//                 {/* 3. ESTADO DEL RADAR / ACCIÓN */}
//                 <div className="gocast-card p-6 text-center bg-[var(--bg-card)] border border-[var(--bg-card-border)] rounded-2xl shadow-sm mt-4">

//                   {/* Animación Inteligente según contexto */}
//                   {disponibleParaServicios ? (
//                     <div className="relative w-24 h-24 mx-auto flex items-center justify-center mt-2">
//                       <div className="absolute inset-0 bg-[var(--color-primary)]/20 rounded-full animate-ping duration-1000" />
//                       <div className="relative w-16 h-16 bg-[var(--bg-card)] border-2 border-[var(--color-primary)] rounded-full flex items-center justify-center shadow-[0_0_20px_var(--color-primary)] text-[var(--color-primary)] z-10">
//                         {navigator.onLine ? (
//                           <Radar className="w-8 h-8 animate-[spin_3s_linear_infinite]" />
//                         ) : (
//                           <LinkIcon className="w-7 h-7" />
//                         )}
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] bg-[var(--bg-card-border)] text-[var(--text-muted)] mt-2 transition-colors">
//                       <Truck className="h-9 w-9 stroke-[1.8]" />
//                     </div>
//                   )}

//                   <h3 className="mt-5 text-[22px] font-bold tracking-tight text-[var(--text-main)]">
//                     {!disponibleParaServicios
//                       ? 'Modo pausa activado'
//                       : navigator.onLine
//                         ? 'Radar Activo'
//                         : 'Modo SMS Activo'}
//                   </h3>

//                   <p className="mx-auto mt-2 max-w-[290px] text-sm leading-6 text-[var(--text-muted)]">
//                     {!disponibleParaServicios
//                       ? 'Activa nuevamente tu disponibilidad para recibir solicitudes.'
//                       : navigator.onLine
//                         ? 'Buscando servicios cercanos a tu ubicación. Mantén la aplicación abierta.'
//                         : 'Estás sin internet. Esperando que llegue un servicio a través del link por SMS.'}
//                   </p>

//                   {errorRadar && disponibleParaServicios && (
//                     <div className="mt-4 bg-rose-500/10 border border-rose-500/30 text-rose-500 text-[10px] font-bold px-3 py-2 rounded-lg inline-block">
//                       {errorRadar}
//                     </div>
//                   )}

//                   <button
//                     type="button"
//                     onClick={simularLlegadaServicio}
//                     disabled={!disponibleParaServicios}
//                     className={`mt-6 w-full min-h-[52px] rounded-[18px] px-4 text-sm font-bold transition-all uppercase tracking-wider ${disponibleParaServicios
//                       ? 'bg-[var(--color-primary)] text-slate-950 shadow-lg shadow-[var(--color-primary)]/20 active:scale-[0.98]'
//                       : 'bg-[var(--bg-main)] text-[var(--text-muted)] border border-[var(--bg-card-border)] cursor-not-allowed opacity-70'
//                       }`}
//                   >
//                     Simular servicio
//                   </button>
//                   <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
//                     Botón temporal de desarrollo
//                   </p>
//                 </div>
//               </section>
//             )}

//             {/* MAPA OPERATIVO */}
//             {servicioActivo &&
//               estadoActual !== ESTADOS_SERVICIO.IDLE &&
//               estadoActual !== ESTADOS_SERVICIO.EXITO_SERVICIO &&
//               estadoActual !== ESTADOS_SERVICIO.PENDIENTE_EVIDENCIA && (
//                 <MapComponent />
//               )}

//             {/* EVIDENCIAS */}
//             <EvidenceDropzone />

//             {/* SERVICIO COMPLETADO */}
//             <ServiceSuccess />
//           </div>
//         )}

//         {/* ===================================================
//           TABS SECUNDARIOS
//         =================================================== */}
//         <div className="w-full max-w-md mx-auto">
//           {tabActiva === 'map' && <MapView />}
//           {tabActiva === 'earnings' && <EarningsView />}
//           {tabActiva === 'profile' && <ProfileView />}
//         </div>
//       </main>

//       {/* =====================================================
//         CONTROLES INFERIORES - FUERA DEL SCROLL
//       ===================================================== */}
//       <div className="shrink-0 relative">
//         {tabActiva === 'jobs' && <ProgressStepper />}
//         <BottomNav />
//       </div>

//       {/* Modal de asignación de servicios (siempre por encima) */}
//       <AssignmentModal />
//     </div>
//   );
// }   ULTIMO USADO

import { useEffect, useState } from 'react';
import { Truck, Radar, Link as LinkIcon, Wifi } from 'lucide-react';
import { sincronizarTodoPendiente } from './services/syncQueue';

import { Header } from './components/layout/Header';
import { NetworkListener } from './components/layout/NetworkListener';
import { BottomNav } from './components/layout/BottomNav';

import { PermissionModal } from './components/permissions/PermissionModal';
import { MapComponent } from './components/ui/MapComponent';

import { AssignmentModal } from './features/assignment/AssignmentModal';
import { ProgressStepper } from './features/tracking/ProgressStepper';

import { EvidenceDropzone } from './features/evidence/EvidenceDropzone';
import { ServiceSuccess } from './features/evidence/ServiceSuccess';

import {
  MapView,
  EarningsView,
  ProfileView,
} from './features/views/SecondaryViews';

import {
  useServiceStore,
  ESTADOS_SERVICIO,
} from './store/useServiceStore';

// 🚩 BANDERAS DE CONTROL (Activas/Desactivas funciones sin borrar código)
const ENABLE_RADAR = false;
const ENABLE_SIMULATOR = false;

export default function App() {
  const [disponibleParaServicios, setDisponibleParaServicios] = useState(true);
  const [errorRadar, setErrorRadar] = useState(null);

  const cargarServicioPersistido = useServiceStore((state) => state.cargarServicioPersistido);
  const asignarNuevoServicio = useServiceStore((state) => state.asignarNuevoServicio);
  const estadoActual = useServiceStore((state) => state.estadoActual);
  const servicioActivo = useServiceStore((state) => state.servicioActivo);
  const tabActiva = useServiceStore((state) => state.tabActiva);

  useEffect(() => {
    // Al abrir o recargar la app, intenta sincronizar si hay red
    sincronizarTodoPendiente();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Recuperar servicio persistido al iniciar
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    cargarServicioPersistido();
  }, [cargarServicioPersistido]);

  /*
  |--------------------------------------------------------------------------
  | LÓGICA 1: Hidratación por URL (Sincronizada con estado en MySQL)
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceId = params.get('id');

    if (serviceId && estadoActual === ESTADOS_SERVICIO.IDLE) {
      const cargarServicioPorId = async () => {
        try {
          const timestamp = new Date().getTime();
          const response = await fetch(`https://apidev.gocastgroup.com/api/gruero_app/obtener_servicio.php?id=${serviceId}&t=${timestamp}`);

          if (!response.ok) throw new Error('No se pudo cargar el detalle');

          const data = await response.json();

          if (data.error) {
            console.warn('Servicio no encontrado en BD:', data.error);
            return;
          }

          const servicioPorSms = {
            id: serviceId,
            expediente: data.numero_expediente || `EXP-${serviceId}`,
            operador: data.proveedor?.nombre || 'Asignación vía SMS',
            cliente: {
              nombre: data.cliente?.nombre || 'Cliente Auxilio Vial',
              telefono: data.cliente?.telefono || '04121234567'
            },
            vehiculo: {
              marca: data.vehiculo?.marca || 'Vehículo',
              modelo: data.vehiculo?.modelo || 'Averiado',
              placa: data.vehiculo?.placa || 'S/P',
              falla: data.servicio?.falla || 'Reporte vía SMS'
            },
            origen: {
              direccion: data.origen?.referencia || 'Ubicación de Recogida',
              lat: parseFloat(data.origen?.lat) || 10.4961,
              lng: parseFloat(data.origen?.lng) || -66.8480
            },
            destino: {
              direccion: data.destino?.referencia || 'Taller / Destino Final',
              lat: parseFloat(data.destino?.lat) || 10.4820,
              lng: parseFloat(data.destino?.lng) || -66.8150
            }
          };

          const estadoEnBd = data.estado_db || 'PENDIENTE_ACEPTACION';

          if (estadoEnBd === 'ACEPTADO') {
            // Si en MySQL ya está ACEPTADO, se restaura directo en el mapa/seguimiento
            useServiceStore.setState({
              servicioActivo: servicioPorSms,
              estadoActual: ESTADOS_SERVICIO.ACEPTADO || 'ACEPTADO'
            });
          } else {
            // Si sigue PENDIENTE_ACEPTACION, muestra el modal de confirmación
            asignarNuevoServicio(servicioPorSms);
          }

        } catch (error) {
          console.error('Error al hidratar el servicio desde el servidor:', error);
        }
      };

      cargarServicioPorId();

      // Limpiamos la URL para evitar recargas fantasma
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [estadoActual, asignarNuevoServicio]);

  /*
  |--------------------------------------------------------------------------
  | LÓGICA 2: Radar de Búsqueda Online (Polling suspendido temporalmente)
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    // Si el radar está deshabilitado por flag, no inicia peticiones
    if (!ENABLE_RADAR) return;

    let intervalo;

    const verificarNuevosServicios = async () => {
      if (estadoActual !== ESTADOS_SERVICIO.IDLE || !navigator.onLine || !disponibleParaServicios) return;

      try {
        const timestamp = new Date().getTime();
        const response = await fetch(`https://apidev.gocastgroup.com/api/gruero_app/servicio_activo.json?t=${timestamp}`);
        if (!response.ok) throw new Error('Error en conexión');

        const data = await response.json();

        if (data && data.servicio_id) {
          const nuevoServicio = {
            id: data.servicio_id.toString(),
            expediente: data.numero_expediente,
            operador: data.proveedor?.nombre || 'Control Central',
            cliente: {
              nombre: data.cliente?.nombre || 'Cliente Auxilio Vial',
              telefono: data.cliente?.telefono || '04121234567'
            },
            vehiculo: {
              marca: data.vehiculo?.marca || 'N/A',
              modelo: data.vehiculo?.modelo || 'N/A',
              placa: data.vehiculo?.placa || 'N/A',
              falla: data.servicio?.falla || 'Sin tracción'
            },
            origen: {
              direccion: data.origen?.referencia || 'Dirección de origen',
              lat: data.origen?.lat || 10.4961,
              lng: data.origen?.lng || -66.8480
            },
            destino: {
              direccion: data.destino?.referencia || 'Dirección de destino',
              lat: data.destino?.lat || 10.4820,
              lng: data.destino?.lng || -66.8150
            }
          };

          asignarNuevoServicio(nuevoServicio);
          setErrorRadar(null);
        }
      } catch (error) {
        setErrorRadar('Pérdida de conexión con la central...');
      }
    };

    if (estadoActual === ESTADOS_SERVICIO.IDLE && disponibleParaServicios) {
      intervalo = setInterval(verificarNuevosServicios, 7000);
      if (navigator.onLine) verificarNuevosServicios();
    }

    return () => {
      if (intervalo) clearInterval(intervalo);
    };
  }, [estadoActual, asignarNuevoServicio, disponibleParaServicios]);

  const resumenHoy = {
    ganado: '$126.800',
    variacion: '12% vs. ayer',
    servicios: 4,
    completados: 3,
  };

  const simularLlegadaServicio = () => {
    if (!ENABLE_SIMULATOR) return;
    asignarNuevoServicio({
      id: '10928',
      operador: 'Control Central',
      cliente: { nombre: 'Luis Bermudez', telefono: '04129728222' },
      vehiculo: { marca: 'Toyota', modelo: 'Hilux', placa: 'ABC123D', falla: 'Sin tracción' },
      origen: { direccion: 'Av. Francisco de Miranda, Los Palos Grandes', lat: 10.4961, lng: -66.848 },
      destino: { direccion: 'Taller Autofix, Zona Industrial La Urbina', lat: 10.482, lng: -66.815 },
    });
  };

  return (
    <div className="gocast-app flex h-dvh max-h-dvh flex-col overflow-hidden bg-[var(--bg-main)] text-[var(--text-main)] transition-colors">

      {/* Servicios globales */}
      <NetworkListener />
      <PermissionModal />

      {/* HEADER */}
      <div className="shrink-0">
        <Header />
      </div>

      {/* CONTENEDOR PRINCIPAL */}
      <main
        className="gocast-container min-h-0 w-full flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-4 py-4 touch-pan-y"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* TAB PRINCIPAL: SERVICIOS */}
        {tabActiva === 'jobs' && (
          <div className="w-full space-y-4 max-w-md mx-auto">

            {/* ESTADO IDLE */}
            {estadoActual === ESTADOS_SERVICIO.IDLE && (
              <section className="w-full space-y-4 py-2">

                {/* 1. DISPONIBILIDAD */}
                {/* <div className="gocast-card p-5 bg-[var(--bg-card)] border border-[var(--bg-card-border)] rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                     <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-3 w-3 rounded-full ${disponibleParaServicios ? 'bg-emerald-500' : 'bg-[var(--text-muted)]'
                            }`}
                        />
                        <h2 className="text-[18px] font-bold tracking-tight text-[var(--text-main)]">
                          {disponibleParaServicios ? 'Disponible para servicios' : 'No disponible'}
                        </h2>
                      </div>
                      <p className="mt-2 text-sm text-[var(--text-muted)]">
                        {disponibleParaServicios
                          ? 'GPS y solicitudes habilitados'
                          : 'No recibirás nuevas solicitudes temporalmente'}
                      </p>
                    </div> 

                    <button
                      type="button"
                      onClick={() => setDisponibleParaServicios((prev) => !prev)}
                      aria-label="Cambiar disponibilidad"
                      className={`relative h-11 w-[68px] shrink-0 rounded-full transition-all duration-200 cursor-pointer ${disponibleParaServicios ? 'bg-emerald-500' : 'bg-[var(--bg-card-border)]'
                        }`}
                    >
                      <span
                        className={`absolute top-1 h-9 w-9 rounded-full bg-white shadow-md transition-all duration-200 ${disponibleParaServicios ? 'left-[30px]' : 'left-[4px]'
                          }`}
                      />
                    </button>
                  </div>
                </div>*/}

                {/* 2. RESUMEN DEL DÍA */}
                {/* <div className="grid grid-cols-2 gap-3">
                  <div className="gocast-card p-5 bg-[var(--bg-card)] border border-[var(--bg-card-border)] rounded-2xl shadow-sm">
                    <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--text-muted)]">Ganado hoy</p>
                    <p className="mt-4 text-[20px] font-bold tracking-tight text-[var(--text-main)]">{resumenHoy.ganado}</p>
                    <p className="mt-2 text-sm font-semibold text-emerald-500">↑ {resumenHoy.variacion}</p>
                  </div>

                  <div className="gocast-card p-5 bg-[var(--bg-card)] border border-[var(--bg-card-border)] rounded-2xl shadow-sm">
                    <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--text-muted)]">Servicios</p>
                    <p className="mt-4 text-[20px] font-bold tracking-tight text-[var(--text-main)]">{resumenHoy.servicios}</p>
                    <p className="mt-2 text-sm font-semibold text-emerald-500">{resumenHoy.completados} completados</p>
                  </div>
                </div> */}

                {/* 3. VISTA EN ESPERA / RADAR */}
                <div className="gocast-card p-6 text-center bg-[var(--bg-card)] border border-[var(--bg-card-border)] rounded-2xl shadow-sm mt-4">
                  {ENABLE_RADAR ? (
                    <>
                      {disponibleParaServicios ? (
                        <div className="relative w-24 h-24 mx-auto flex items-center justify-center mt-2">
                          <div className="absolute inset-0 bg-[var(--color-primary)]/20 rounded-full animate-ping duration-1000" />
                          <div className="relative w-16 h-16 bg-[var(--bg-card)] border-2 border-[var(--color-primary)] rounded-full flex items-center justify-center shadow-[0_0_20px_var(--color-primary)] text-[var(--color-primary)] z-10">
                            {navigator.onLine ? (
                              <Radar className="w-8 h-8 animate-[spin_3s_linear_infinite]" />
                            ) : (
                              <LinkIcon className="w-7 h-7" />
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] bg-[var(--bg-card-border)] text-[var(--text-muted)] mt-2 transition-colors">
                          <Truck className="h-9 w-9 stroke-[1.8]" />
                        </div>
                      )}

                      <h3 className="mt-5 text-[22px] font-bold tracking-tight text-[var(--text-main)]">
                        {!disponibleParaServicios
                          ? 'Modo pausa activado'
                          : navigator.onLine
                            ? 'Radar Activo'
                            : 'Modo SMS Activo'}
                      </h3>

                      <p className="mx-auto mt-2 max-w-[290px] text-sm leading-6 text-[var(--text-muted)]">
                        {!disponibleParaServicios
                          ? 'Activa nuevamente tu disponibilidad para recibir solicitudes.'
                          : navigator.onLine
                            ? 'Buscando servicios cercanos a tu ubicación. Mantén la aplicación abierta.'
                            : 'Estás sin internet. Esperando que llegue un servicio a través del link por SMS.'}
                      </p>

                      {errorRadar && disponibleParaServicios && (
                        <div className="mt-4 bg-rose-500/10 border border-rose-500/30 text-rose-500 text-[10px] font-bold px-3 py-2 rounded-lg inline-block">
                          {errorRadar}
                        </div>
                      )}
                    </>
                  ) : (
                    /* Tarjeta limpia en espera de asignación central */
                    <>
                      <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 mt-2">
                        <Wifi className="h-8 w-8 stroke-[2]" />
                      </div>

                      <h3 className="mt-4 text-[20px] font-bold tracking-tight text-[var(--text-main)]">
                        En espera de asignación
                      </h3>

                      <p className="mx-auto mt-2 max-w-[290px] text-sm leading-6 text-[var(--text-muted)]">
                        Haz clic en el enlace recibido por SMS para ver la información del servicio asignado.
                      </p>
                    </>
                  )}

                  {/* BOTÓN TEMPORAL DE SIMULACIÓN */}
                  {ENABLE_SIMULATOR && (
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={simularLlegadaServicio}
                        disabled={!disponibleParaServicios}
                        className={`w-full min-h-[52px] rounded-[18px] px-4 text-sm font-bold transition-all uppercase tracking-wider ${disponibleParaServicios
                          ? 'bg-[var(--color-primary)] text-slate-950 shadow-lg shadow-[var(--color-primary)]/20 active:scale-[0.98]'
                          : 'bg-[var(--bg-main)] text-[var(--text-muted)] border border-[var(--bg-card-border)] cursor-not-allowed opacity-70'
                          }`}
                      >
                        Simular servicio
                      </button>
                      <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                        Botón temporal de desarrollo
                      </p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* MAPA OPERATIVO */}
            {servicioActivo &&
              estadoActual !== ESTADOS_SERVICIO.IDLE &&
              estadoActual !== ESTADOS_SERVICIO.EXITO_SERVICIO &&
              estadoActual !== ESTADOS_SERVICIO.PENDIENTE_EVIDENCIA && (
                <MapComponent />
              )}

            {/* EVIDENCIAS */}
            <EvidenceDropzone />

            {/* SERVICIO COMPLETADO */}
            <ServiceSuccess />
          </div>
        )}

        {/* TABS SECUNDARIOS */}
        <div className="w-full max-w-md mx-auto">
          {tabActiva === 'map' && <MapView />}
          {tabActiva === 'earnings' && <EarningsView />}
          {tabActiva === 'profile' && <ProfileView />}
        </div>
      </main>

      {/* CONTROLES INFERIORES */}
      <div className="shrink-0 relative">
        {tabActiva === 'jobs' && <ProgressStepper />}
        <BottomNav />
      </div>

      {/* Modal de asignación de servicios */}
      <AssignmentModal />
    </div>
  );
}