// import { Briefcase, Map, Wallet, User } from 'lucide-react';

// export function BottomNav() {
//   return (
//     <nav className="fixed bottom-0 left-0 right-0 bg-[var(--bg-card)] border-t border-[var(--bg-card-border)] py-2 px-4 z-30 transition-colors">
//       <div className="max-w-md mx-auto grid grid-cols-4 gap-1">

//         {/* Tab Activa */}
//         <button className="flex flex-col items-center justify-center py-1.5 px-2 bg-[var(--color-primary)] text-slate-950 rounded-xl font-black transition-all">
//           <Briefcase className="w-4 h-4" />
//           <span className="text-[10px] mt-0.5 tracking-wider">Jobs</span>
//         </button>

//         <button className="flex flex-col items-center justify-center py-1.5 px-2 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-all">
//           <Map className="w-4 h-4" />
//           <span className="text-[10px] mt-0.5">Map</span>
//         </button>

//         <button className="flex flex-col items-center justify-center py-1.5 px-2 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-all">
//           <Wallet className="w-4 h-4" />
//           <span className="text-[10px] mt-0.5">Earnings</span>
//         </button>

//         <button className="flex flex-col items-center justify-center py-1.5 px-2 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-all">
//           <User className="w-4 h-4" />
//           <span className="text-[10px] mt-0.5">Profile</span>
//         </button>

//       </div>
//     </nav>
//   );
// }

// import { Truck, Map, Wallet, User } from 'lucide-react';
// import { useServiceStore } from '../../store/useServiceStore';

// export function BottomNav() {
//   const tabActiva = useServiceStore((state) => state.tabActiva);
//   const setTabActiva = useServiceStore((state) => state.setTabActiva);

//   const botones = [
//     { id: 'jobs', label: 'Servicios', icon: Truck },
//     { id: 'map', label: 'Mapa', icon: Map },
//     { id: 'earnings', label: 'Ganancias', icon: Wallet },
//     { id: 'profile', label: 'Perfil', icon: User },
//   ];

//   return (
//     <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-card)] border-t border-[var(--bg-card-border)] py-2 px-4 max-w-md mx-auto shadow-2xl transition-colors">
//       <div className="flex justify-around items-center">
//         {botones.map((item) => {
//           const Icon = item.icon;
//           const esActivo = tabActiva === item.id;

//           return (
//             <button
//               key={item.id}
//               onClick={() => setTabActiva(item.id)}
//               className={`flex flex-col items-center justify-center w-16 py-1 rounded-xl transition-all active:scale-95 ${
//                 esActivo
//                   ? 'text-slate-950 bg-[var(--color-primary)] font-black shadow-lg shadow-[var(--color-primary)]/20'
//                   : 'text-[var(--text-muted)] hover:text-[var(--text-main)] font-medium'
//               }`}
//             >
//               <Icon className={`w-5 h-5 ${esActivo ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
//               <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
//             </button>
//           );
//         })}
//       </div>
//     </nav>
//   );
// }  GEMINI

// import {
//   Truck,
//   Map,
//   Wallet,
//   User,
// } from 'lucide-react';

// import { useServiceStore } from '../../store/useServiceStore';

// export function BottomNav() {
//   const tabActiva = useServiceStore((state) => state.tabActiva);
//   const setTabActiva = useServiceStore((state) => state.setTabActiva);

//   const botones = [
//     {
//       id: 'jobs',
//       label: 'Servicios',
//       icon: Truck,
//     },
//     {
//       id: 'map',
//       label: 'Mapa',
//       icon: Map,
//       active: false,
//       disabled: true, // Deshabilitado por ahora
//     },
//     {
//       id: 'earnings',
//       label: 'Ganancias',
//       icon: Wallet,
//     },
//     {
//       id: 'profile',
//       label: 'Perfil',
//       icon: User,
//     },
//   ];

//   return (
//     <nav
//       className="
//       relative
//       z-40
//       mx-auto
//       w-full
//       max-w-md
//       border-t
//       border-[var(--bg-card-border)]
//       bg-[var(--bg-card)]/95
//       backdrop-blur-xl
//       shadow-[0_-6px_24px_rgba(15,23,42,0.06)]
//     "
//       style={{
//         paddingBottom: 'env(safe-area-inset-bottom)',
//       }}
//     >
//       <div className="grid h-[72px] grid-cols-4 items-center px-2">
//         {botones.map((item) => {
//           const Icon = item.icon;
//           const esActivo = tabActiva === item.id;

//           return (
//             <button
//               key={item.id}
//               type="button"
//               onClick={() => setTabActiva(item.id)}
//               aria-label={item.label}
//               aria-current={esActivo ? 'page' : undefined}
//               className="
//                 group
//                 flex
//                 h-full
//                 min-w-0
//                 flex-col
//                 items-center
//                 justify-center
//                 gap-1
//                 rounded-2xl
//                 outline-none
//                 transition-all
//                 duration-200
//                 active:scale-95
//               "
//             >
//               {/* Indicador / icono */}
//               <div
//                 className={`
//                   flex
//                   h-8
//                   min-w-[54px]
//                   items-center
//                   justify-center
//                   rounded-full
//                   px-4
//                   transition-all
//                   duration-200

//                   ${esActivo
//                     ? `
//                         bg-[var(--color-primary)]/10
//                         text-[var(--color-primary)]
//                       `
//                     : `
//                         bg-transparent
//                         text-slate-400
//                         group-hover:bg-slate-100
//                         group-hover:text-slate-600
//                       `
//                   }
//                 `}
//               >
//                 <Icon
//                   className={`
//                     h-5
//                     w-5
//                     transition-all
//                     duration-200

//                     ${esActivo
//                       ? 'stroke-[2.6]'
//                       : 'stroke-[1.9]'
//                     }
//                   `}
//                 />
//               </div>

//               {/* Label */}
//               <span
//                 className={`
//                   truncate
//                   text-[10px]
//                   leading-none
//                   transition-colors
//                   duration-200

//                   ${esActivo
//                     ? 'font-bold text-[var(--color-primary)]'
//                     : 'font-medium text-slate-400'
//                   }
//                 `}
//               >
//                 {item.label}
//               </span>
//             </button>
//           );
//         })}
//       </div>
//     </nav>
//   );
// }   TODO ACTIVO

import {
  Truck,
  Map,
  Wallet,
  User,
} from 'lucide-react';

import { useServiceStore } from '../../store/useServiceStore';

export function BottomNav() {
  const tabActiva = useServiceStore((state) => state.tabActiva);
  const setTabActiva = useServiceStore((state) => state.setTabActiva);

  const botones = [
    {
      id: 'jobs',
      label: 'Servicios',
      icon: Truck,
      disabled: false,
    },
    {
      id: 'map',
      label: 'Mapa',
      icon: Map,
      disabled: true,
    },
    {
      id: 'earnings',
      label: 'Ganancias',
      icon: Wallet,
      disabled: true,
    },
    {
      id: 'profile',
      label: 'Perfil',
      icon: User,
      disabled: true,
    },
  ];

  return (
    <nav
      className="
        relative
        z-40
        mx-auto
        w-full
        max-w-md
        border-t
        border-[var(--bg-card-border)]
        bg-[var(--bg-card)]/95
        backdrop-blur-xl
        shadow-[0_-6px_24px_rgba(15,23,42,0.06)]
      "
      style={{
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="grid h-[72px] grid-cols-4 items-center px-2">
        {botones.map((item) => {
          const Icon = item.icon;
          const esActivo = tabActiva === item.id;
          const estaDeshabilitado = item.disabled;

          return (
            <button
              key={item.id}
              type="button"
              disabled={estaDeshabilitado}
              onClick={() => !estaDeshabilitado && setTabActiva(item.id)}
              aria-label={item.label}
              aria-current={esActivo ? 'page' : undefined}
              className={`
                group
                flex
                h-full
                min-w-0
                flex-col
                items-center
                justify-center
                gap-1
                rounded-2xl
                outline-none
                transition-all
                duration-200
                ${estaDeshabilitado 
                  ? 'opacity-40 cursor-not-allowed pointer-events-none' 
                  : 'active:scale-95'
                }
              `}
            >
              {/* Indicador / icono */}
              <div
                className={`
                  flex
                  h-8
                  min-w-[54px]
                  items-center
                  justify-center
                  rounded-full
                  px-4
                  transition-all
                  duration-200

                  ${esActivo
                    ? `
                        bg-[var(--color-primary)]/10
                        text-[var(--color-primary)]
                      `
                    : estaDeshabilitado
                    ? `
                        bg-transparent
                        text-slate-300
                      `
                    : `
                        bg-transparent
                        text-slate-400
                        group-hover:bg-slate-100
                        group-hover:text-slate-600
                      `
                  }
                `}
              >
                <Icon
                  className={`
                    h-5
                    w-5
                    transition-all
                    duration-200

                    ${esActivo
                      ? 'stroke-[2.6]'
                      : 'stroke-[1.9]'
                    }
                  `}
                />
              </div>

              {/* Label */}
              <span
                className={`
                  truncate
                  text-[10px]
                  leading-none
                  transition-colors
                  duration-200

                  ${esActivo
                    ? 'font-bold text-[var(--color-primary)]'
                    : estaDeshabilitado
                    ? 'font-medium text-slate-300'
                    : 'font-medium text-slate-400'
                  }
                `}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}