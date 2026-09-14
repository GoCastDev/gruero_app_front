// import { Wifi, WifiOff, Sun, Moon } from 'lucide-react';
// import { useServiceStore } from '../../store/useServiceStore';

// export function Header() {
//   const isOnline = useServiceStore((state) => state.isOnline);
//   const servicioActivo = useServiceStore((state) => state.servicioActivo);
//   const isDarkMode = useServiceStore((state) => state.isDarkMode);
//   const toggleDarkMode = useServiceStore((state) => state.toggleDarkMode);

//   return (
//     <header className="bg-[var(--bg-card)] text-[var(--text-main)] p-4 shadow-md sticky top-0 z-40 border-b border-[var(--bg-card-border)] transition-colors">
//       <div className="flex items-center justify-between max-w-md mx-auto">
//         {/* Marca / Grúa */}
//         <div className="flex items-center gap-2.5">
//           <div className="bg-[var(--color-primary)] text-slate-950 font-black px-2.5 py-1 rounded-lg text-sm tracking-wider">
//             GOCAST
//           </div>
//           <div>
//             <h1 className="font-bold text-sm leading-tight">Auxilio Vial</h1>
//             <p className="text-xs text-[var(--text-muted)]">
//               {servicioActivo ? `Servicio #${servicioActivo.id}` : 'Juan Pérez • En Línea'}
//             </p>
//           </div>
//         </div>

//         <div className="flex items-center gap-2">
//           {/* Botón Switch Modo Claro / Oscuro */}
//           <button
//             onClick={toggleDarkMode}
//             className="p-2 rounded-lg bg-[var(--bg-main)] border border-[var(--bg-card-border)] text-[var(--text-main)] active:scale-90 transition-all"
//             title="Cambiar Tema"
//           >
//             {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
//           </button>

//           {/* Estado de Señal */}
//           <div
//             className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
//               isOnline
//                 ? 'bg-emerald-500/10 text-[var(--color-tertiary)] border border-emerald-500/30'
//                 : 'bg-amber-500/10 text-[var(--color-primary)] border border-amber-500/30 animate-pulse'
//             }`}
//           >
//             {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// import { Moon, Sun, Wifi, WifiOff } from 'lucide-react';
// import { useState, useEffect } from 'react';
// import { useServiceStore } from '../../store/useServiceStore';

// export function Header() {
//   const isOnline = useServiceStore((state) => state.isOnline);
//   const servicioActivo = useServiceStore((state) => state.servicioActivo);
//   const [isDark, setIsDark] = useState(true);

//   // Efecto para alternar la clase 'dark' en la etiqueta HTML del proyecto
//   useEffect(() => {
//     if (isDark) {
//       document.documentElement.classList.add('dark');
//       document.documentElement.classList.remove('light');
//     } else {
//       document.documentElement.classList.remove('dark');
//       document.documentElement.classList.add('light');
//     }
//   }, [isDark]);

//   const toggleTheme = () => {
//     setIsDark(!isDark);
//   };

//   return (
//     <header className="w-full bg-[var(--bg-card)] border-b border-[var(--bg-card-border)] p-3 shadow-md transition-colors">
//       <div className="max-w-md mx-auto flex items-center justify-between">
//         {/* Identificador y Nombre de la App */}
//         <div className="flex items-center gap-3">
//           <div className="bg-[var(--color-primary)] text-slate-950 font-black px-3 py-1 rounded-lg text-sm tracking-wider uppercase shadow-md">
//             GOCAST
//           </div>
//           <div className="text-left">
//             <h1 className="font-bold text-sm leading-none text-[var(--text-main)]">Auxilio Vial</h1>
//             <p className="text-[10px] text-[var(--text-muted)] mt-0.5 font-semibold">
//               {servicioActivo ? `Servicio #${servicioActivo.id}` : 'Unidad en Línea'}
//             </p>
//           </div>
//         </div>

//         {/* Botones de Control Superior */}
//         <div className="flex items-center gap-2">
//           {/* 1. Cambio de Tema (Luna / Sol) */}
//           <button
//             type="button"
//             onClick={toggleTheme}
//             className="p-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--bg-card-border)] text-[var(--text-main)] active:scale-90 transition-all cursor-pointer"
//             title={isDark ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
//           >
//             {isDark ? (
//               <Moon className="w-4 h-4 text-amber-400 fill-amber-400/20" />
//             ) : (
//               <Sun className="w-4 h-4 text-amber-500 fill-amber-500/20" />
//             )}
//           </button>

//           {/* 2. Indicador Estado de Red WiFi (Verde = Online / Rojo = Offline) */}
//           <div
//             className={`p-2.5 rounded-xl border flex items-center justify-center transition-all ${
//               isOnline
//                 ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
//                 : 'bg-rose-500/10 text-rose-500 border-rose-500/30 animate-pulse'
//             }`}
//             title={isOnline ? 'Conexión a Internet Estable' : 'Sin Conexión (Modo Offline)'}
//           >
//             {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }   GEMINI

// import {
//   Moon,
//   Sun,
//   Wifi,
//   WifiOff,
// } from 'lucide-react';
// import logoImage from '../../assets/gocast-logo.png';

// import {
//   useEffect,
//   useState,
// } from 'react';

// import { useServiceStore } from '../../store/useServiceStore';
// import { SyncBadge } from '../ui/SyncBadge';

// export function Header() {
//   const isOnline = useServiceStore((state) => state.isOnline);
//   const servicioActivo = useServiceStore((state) => state.servicioActivo);

//   const [isDark, setIsDark] = useState(() => {
//     const temaGuardado = localStorage.getItem('gocast-theme');
//     return temaGuardado ? temaGuardado === 'dark' : false;
//   });

//   useEffect(() => {
//     if (isDark) {
//       document.documentElement.classList.add('dark');
//       document.documentElement.classList.remove('light');
//       localStorage.setItem('gocast-theme', 'dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//       document.documentElement.classList.add('light');
//       localStorage.setItem('gocast-theme', 'light');
//     }
//   }, [isDark]);

//   const toggleTheme = () => {
//     setIsDark((prev) => !prev);
//   };

//   const obtenerIdServicio = () => {
//     if (!servicioActivo) return null;
//     return (
//       servicioActivo.expediente ||
//       servicioActivo.numero_servicio ||
//       servicioActivo.id ||
//       null
//     );
//   };

//   const idServicio = obtenerIdServicio();

//   return (
//     <header
//       className="
//         sticky
//         top-0
//         z-50
//         w-full
//         border-b
//         border-[var(--bg-card-border)]
//         bg-[var(--bg-card)]/95
//         backdrop-blur-xl
//         transition-colors
//       "
//       style={{
//         paddingTop: 'env(safe-area-inset-top)',
//       }}
//     >
//       <div
//         className="
//           mx-auto
//           flex
//           h-[68px]
//           max-w-md
//           items-center
//           justify-between
//           gap-3
//           px-4
//         "
//       >
//         {/* MARCA / IDENTIDAD */}
//         <div className="flex min-w-0 items-center gap-3">
//           <div
//             className="
//               flex
//               h-10
//               w-10
//               shrink-0
//               items-center
//               justify-center
//               overflow-hidden
//               rounded-xl
//               bg-white
//               p-1.5
//               shadow-sm
//               ring-1
//               ring-slate-200/70
//             "
//           >
//             <img
//               src={logoImage}
//               alt="GoCast"
//               className="h-full w-full object-contain"
//             />
//           </div>

//           <div className="min-w-0">
//             <div className="flex items-center gap-2">
//               <h1
//                 className="
//                   truncate
//                   text-[15px]
//                   font-bold
//                   leading-tight
//                   tracking-tight
//                   text-[var(--text-main)]
//                 "
//               >
//                 GoCast
//               </h1>

//               {/* Indicador pequeño de conexión */}
//               <span
//                 className={`
//                   inline-block
//                   h-2
//                   w-2
//                   shrink-0
//                   rounded-full
//                   ${
//                     isOnline
//                       ? 'bg-emerald-500'
//                       : 'bg-rose-500 animate-pulse'
//                   }
//                 `}
//               />
//             </div>

//             <div
//               className="
//                 mt-0.5
//                 flex
//                 items-center
//                 gap-1.5
//                 truncate
//                 text-[10px]
//                 font-medium
//                 text-[var(--text-muted)]
//               "
//             >
//               {servicioActivo && idServicio ? (
//                 <>
//                   <span>Servicio</span>
//                   <span className="font-bold text-[var(--color-primary)]">
//                     #{idServicio}
//                   </span>
//                 </>
//               ) : (
//                 <span>
//                   {isOnline
//                     ? 'Auxilio vial · Unidad en línea'
//                     : 'Auxilio vial · Modo offline'}
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* CONTROLES (Badge de Sincronización + Tema + Red) */}
//         <div className="flex shrink-0 items-center gap-2">
          
//           {/* ✅ UBICACIÓN CORRECTA DEL BADGE */}
//           <SyncBadge />

//           {/* Estado de conexión (Desktop / Tablet) */}
//           <div
//             className={`
//               hidden
//               h-9
//               items-center
//               gap-1.5
//               rounded-full
//               border
//               px-3
//               text-[10px]
//               font-bold
//               sm:flex
//               ${
//                 isOnline
//                   ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600'
//                   : 'border-rose-500/20 bg-rose-500/10 text-rose-600'
//               }
//             `}
//           >
//             {isOnline ? (
//               <Wifi className="h-3.5 w-3.5" />
//             ) : (
//               <WifiOff className="h-3.5 w-3.5" />
//             )}
//             <span>{isOnline ? 'Online' : 'Offline'}</span>
//           </div>

//           {/* Botón Tema */}
//           <button
//             type="button"
//             onClick={toggleTheme}
//             aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
//             title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
//             className="
//               flex
//               h-10
//               w-10
//               items-center
//               justify-center
//               rounded-full
//               border
//               border-[var(--bg-card-border)]
//               bg-[var(--bg-main)]
//               text-[var(--text-main)]
//               transition-all
//               duration-200
//               hover:bg-[var(--color-primary)]/5
//               hover:text-[var(--color-primary)]
//               active:scale-90
//             "
//           >
//             {isDark ? (
//               <Sun className="h-[18px] w-[18px]" />
//             ) : (
//               <Moon className="h-[18px] w-[18px]" />
//             )}
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }

import {
  Moon,
  Sun,
  Wifi,
  WifiOff,
} from 'lucide-react';
// import logoImage from '../../assets/gocast-logo.png';
import logoImage from '../../assets/gocast-logo.jpg';

import {
  useEffect,
  useState,
} from 'react';

import { useServiceStore } from '../../store/useServiceStore';
import { SyncBadge } from '../ui/SyncBadge';
import { InstallPWAButton } from '../ui/InstallPWAButton';

export function Header() {
  const isOnline = useServiceStore((state) => state.isOnline);
  const servicioActivo = useServiceStore((state) => state.servicioActivo);

  const [isDark, setIsDark] = useState(() => {
    const temaGuardado = localStorage.getItem('gocast-theme');
    return temaGuardado ? temaGuardado === 'dark' : false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('gocast-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('gocast-theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const obtenerIdServicio = () => {
    if (!servicioActivo) return null;
    return (
      servicioActivo.expediente ||
      servicioActivo.numero_servicio ||
      servicioActivo.id ||
      null
    );
  };

  const idServicio = obtenerIdServicio();

  return (
    <header
      className="
        sticky
        top-0
        z-50
        w-full
        border-b
        border-[var(--bg-card-border)]
        bg-[var(--bg-card)]/95
        backdrop-blur-xl
        transition-colors
      "
      style={{
        paddingTop: 'env(safe-area-inset-top)',
      }}
    >
      <div
        className="
          mx-auto
          flex
          h-[68px]
          max-w-md
          items-center
          justify-between
          gap-3
          px-4
        "
      >
        {/* MARCA / IDENTIDAD */}
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-xl
              bg-white
              p-1.5
              shadow-sm
              ring-1
              ring-slate-200/70
            "
          >
            <img
              src={logoImage}
              alt="GoCast"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1
                className="
                  truncate
                  text-[15px]
                  font-bold
                  leading-tight
                  tracking-tight
                  text-[var(--text-main)]
                "
              >
                GoCast
              </h1>

              {/* Indicador pequeño de conexión */}
              <span
                className={`
                  inline-block
                  h-2
                  w-2
                  shrink-0
                  rounded-full
                  ${
                    isOnline
                      ? 'bg-emerald-500'
                      : 'bg-rose-500 animate-pulse'
                  }
                `}
              />
            </div>

            <div
              className="
                mt-0.5
                flex
                items-center
                gap-1.5
                truncate
                text-[10px]
                font-medium
                text-[var(--text-muted)]
              "
            >
              {servicioActivo && idServicio ? (
                <>
                  <span>Servicio</span>
                  <span className="font-bold text-[var(--color-primary)]">
                    #{idServicio}
                  </span>
                </>
              ) : (
                <span>
                  {isOnline
                    ? 'Auxilio vial · Unidad en línea'
                    : 'Auxilio vial · Modo offline'}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* CONTROLES (Badge + PWA + Tema + Red) */}
        <div className="flex shrink-0 items-center gap-2">
          
          {/* Badge de Sincronización */}
          <SyncBadge />

          {/* 👇 2. Botón de Instalación PWA */}
          <InstallPWAButton />

          {/* Estado de conexión (Desktop / Tablet) */}
          <div
            className={`
              hidden
              h-9
              items-center
              gap-1.5
              rounded-full
              border
              px-3
              text-[10px]
              font-bold
              sm:flex
              ${
                isOnline
                  ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600'
                  : 'border-rose-500/20 bg-rose-500/10 text-rose-600'
              }
            `}
          >
            {isOnline ? (
              <Wifi className="h-3.5 w-3.5" />
            ) : (
              <WifiOff className="h-3.5 w-3.5" />
            )}
            <span>{isOnline ? 'Online' : 'Offline'}</span>
          </div>

          {/* Botón Tema */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-[var(--bg-card-border)]
              bg-[var(--bg-main)]
              text-[var(--text-main)]
              transition-all
              duration-200
              hover:bg-[var(--color-primary)]/5
              hover:text-[var(--color-primary)]
              active:scale-90
            "
          >
            {isDark ? (
              <Sun className="h-[18px] w-[18px]" />
            ) : (
              <Moon className="h-[18px] w-[18px]" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}