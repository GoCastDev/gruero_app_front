// import { create } from 'zustand';
// import { db } from '../db/schema';

// export const ESTADOS_SERVICIO = {
//   IDLE: 'IDLE',
//   PENDIENTE_ACEPTACION: 'PENDIENTE_ACEPTACION',
//   ACEPTADO: 'ACEPTADO',
//   EN_CAMINO_ORIGEN: 'EN_CAMINO_ORIGEN',
//   EN_SITIO_ORIGEN: 'EN_SITIO_ORIGEN',
//   EN_CAMINO_DESTINO: 'EN_CAMINO_DESTINO',
//   PENDIENTE_EVIDENCIA: 'PENDIENTE_EVIDENCIA',
//   EXITO_SERVICIO: 'EXITO_SERVICIO'
// };

// export const useServiceStore = create((set, get) => ({
//   isOnline: navigator.onLine,
//   servicioActivo: null,
//   estadoActual: ESTADOS_SERVICIO.IDLE,

//   setIsOnline: (online) => set({ isOnline: online }),

//   cargarServicioPersistido: async () => {
//     try {
//       const servicios = await db.servicios.toArray();
//       const activo = servicios.find((s) => s.estado_actual !== ESTADOS_SERVICIO.EXITO_SERVICIO);
//       if (activo) {
//         set({ servicioActivo: activo, estadoActual: activo.estado_actual });
//       }
//     } catch (err) {
//       console.error('Error al cargar servicio guardado:', err);
//     }
//   },

//   asignarNuevoServicio: async (datosServicio) => {
//     const nuevoServicio = {
//       ...datosServicio,
//       estado_actual: ESTADOS_SERVICIO.PENDIENTE_ACEPTACION,
//       sincronizado: false
//     };
//     set({ servicioActivo: nuevoServicio, estadoActual: ESTADOS_SERVICIO.PENDIENTE_ACEPTACION });
//     try {
//       await db.servicios.put(nuevoServicio);
//     } catch (err) {
//       console.error('Error al guardar servicio inicial:', err);
//     }
//   },

//   aceptarServicioConGps: async (gpsGruero) => {
//     const { servicioActivo } = get();
//     if (!servicioActivo) return;

//     const servicioActualizado = {
//       ...servicioActivo,
//       estado_actual: ESTADOS_SERVICIO.ACEPTADO,
//       ubicacionGruero: gpsGruero,
//       sincronizado: false
//     };

//     // Actualización inmediata en React UI
//     set({
//       servicioActivo: servicioActualizado,
//       estadoActual: ESTADOS_SERVICIO.ACEPTADO
//     });

//     try {
//       await db.servicios.put(servicioActualizado);
//     } catch (err) {
//       console.error('Error al actualizar aceptación en IndexedDB:', err);
//     }
//   },

//   avanzarEstado: async (nuevoEstado) => {
//     const { servicioActivo } = get();
//     if (!servicioActivo) return;

//     const servicioActualizado = {
//       ...servicioActivo,
//       estado_actual: nuevoEstado,
//       sincronizado: false
//     };

//     // 1. ACTUALIZACIÓN INMEDIATA DE REACT UI (Sin latencia ni parpadeos)
//     set({
//       servicioActivo: servicioActualizado,
//       estadoActual: nuevoEstado
//     });

//     // 2. GUARDADO ASÍNCRONO SEGURO EN BACKGROUND
//     try {
//       await db.servicios.put(servicioActualizado);
//     } catch (err) {
//       console.error('Error al persistir estado en IndexedDB:', err);
//     }
//   },

//   cerrarServicio: async () => {
//     const { servicioActivo } = get();
//     set({ servicioActivo: null, estadoActual: ESTADOS_SERVICIO.IDLE });
//     if (servicioActivo) {
//       try {
//         await db.servicios.delete(servicioActivo.id);
//       } catch (err) {
//         console.error('Error al borrar servicio:', err);
//       }
//     }
//   }
// }));

// import { create } from 'zustand';
// import { db } from '../db/schema';
// import { notificarEstadoGoCast } from '../services/gocastApi';

// export const ESTADOS_SERVICIO = {
//   IDLE: 'IDLE',
//   PENDIENTE_ACEPTACION: 'PENDIENTE_ACEPTACION',
//   ACEPTADO: 'ACEPTADO',
//   EN_CAMINO_ORIGEN: 'EN_CAMINO_ORIGEN',
//   EN_SITIO_ORIGEN: 'EN_SITIO_ORIGEN',
//   EN_CAMINO_DESTINO: 'EN_CAMINO_DESTINO',
//   PENDIENTE_EVIDENCIA: 'PENDIENTE_EVIDENCIA',
//   EXITO_SERVICIO: 'EXITO_SERVICIO'
// };

// // Función auxiliar para formatear la duración en horas y minutos
// export function formatearDuracion(minutosTotales) {
//   if (!minutosTotales || minutosTotales < 1) return 'Menos de 1 min';
//   const horas = Math.floor(minutosTotales / 60);
//   const mins = minutosTotales % 60;
//   if (horas === 0) return `${mins} min`;
//   return `${horas}h ${mins}m`;
// }

// export const useServiceStore = create((set, get) => ({
//   isOnline: navigator.onLine,
//   servicioActivo: null,
//   estadoActual: ESTADOS_SERVICIO.IDLE,
//   tabActiva: 'jobs', // 'jobs' | 'map' | 'earnings' | 'profile'
//   setTabActiva: (tab) => set({ tabActiva: tab }),

//   setIsOnline: (online) => set({ isOnline: online }),

//   cargarServicioPersistido: async () => {
//     try {
//       const servicios = await db.servicios.toArray();
//       const activo = servicios.find((s) => s.estado_actual !== ESTADOS_SERVICIO.EXITO_SERVICIO);
//       if (activo) {
//         set({ servicioActivo: activo, estadoActual: activo.estado_actual });
//       }
//     } catch (err) {
//       console.error('Error al cargar servicio guardado:', err);
//     }
//   },

//   asignarNuevoServicio: async (datosServicio) => {
//     const idNormalizado = datosServicio.id || datosServicio.servicio_id;
//     const nuevoServicio = {
//       ...datosServicio,
//       id: idNormalizado,
//       servicio_id: idNormalizado,
//       estado_actual: ESTADOS_SERVICIO.PENDIENTE_ACEPTACION,
//       sincronizado: false
//     };
//     set({ servicioActivo: nuevoServicio, estadoActual: ESTADOS_SERVICIO.PENDIENTE_ACEPTACION });
//     try {
//       await db.servicios.put(nuevoServicio);
//     } catch (err) {
//       console.error('Error al guardar servicio inicial:', err);
//     }
//   },

//   aceptarServicioConGps: async (gpsGruero) => {
//     const { servicioActivo } = get();
//     if (!servicioActivo) return;

//     const servicioActualizado = {
//       ...servicioActivo,
//       estado_actual: ESTADOS_SERVICIO.ACEPTADO,
//       ubicacionGruero: gpsGruero,
//       fecha_inicio: new Date().toISOString(),
//       sincronizado: false
//     };

//     set({
//       servicioActivo: servicioActualizado,
//       estadoActual: ESTADOS_SERVICIO.ACEPTADO
//     });

//     try {
//       await db.servicios.put(servicioActualizado);
//     } catch (err) {
//       console.error('Error al actualizar aceptación:', err);
//     }

//     // 🚀 1. NOTIFICAR A GOCAST (Envía 'en_camino')
//     const idServicio = servicioActivo.id || servicioActivo.servicio_id;
//     if (idServicio) {
//       notificarEstadoGoCast(idServicio, ESTADOS_SERVICIO.ACEPTADO, 'Servicio aceptado por el conductor');
//     }

//     // 🚀 2. NOTIFICAR AL SERVIDOR LOCAL QUE ARCHIVE EL JSON ACTIVO
//     try {
//       await fetch('https://apidev.gocastgroup.com/api/gruero_app/limpiar_servicio.php');
//       console.log('Servidor notificado: archivo JSON archivado como realizado.');
//     } catch (error) {
//       console.error('Error al notificar al servidor sobre la limpieza:', error);
//     }
//   },

//   avanzarEstado: async (nuevoEstado) => {
//     const { servicioActivo } = get();
//     if (!servicioActivo) return;

//     const servicioActualizado = {
//       ...servicioActivo,
//       estado_actual: nuevoEstado,
//       sincronizado: false // Nace como no sincronizado
//     };

//     // 1. Guardar localmente de inmediato (Offline First)
//     set({
//       servicioActivo: servicioActualizado,
//       estadoActual: nuevoEstado
//     });

//     try {
//       await db.servicios.put(servicioActualizado);
//     } catch (err) {
//       console.error('Error al guardar servicio en IndexedDB:', err);
//     }

//     // 2. Intentar notificar a GoCast si hay red
//     const idServicio = servicioActivo.id || servicioActivo.servicio_id;
//     if (idServicio && navigator.onLine) {
//       const respuesta = await notificarEstadoGoCast(idServicio, nuevoEstado);
//       if (respuesta) {
//         // Marcar como sincronizado en IndexedDB
//         await db.servicios.update(servicioActivo.id, { sincronizado: true });
//       }
//     }

//     // 3. Disparar barrido de pendientes
//     sincronizarTodoPendiente();
//   },

//   cerrarServicio: async () => {
//     const { servicioActivo } = get();
//     if (servicioActivo) {
//       const idServicio = servicioActivo.id || servicioActivo.servicio_id;

//       // 🚀 Notificación de resguardo: Asegura el envío de 'realizado' antes de limpiar el estado
//       if (idServicio) {
//         await notificarEstadoGoCast(idServicio, ESTADOS_SERVICIO.EXITO_SERVICIO, 'Servicio completado correctamente');
//       }

//       try {
//         await db.servicios.delete(servicioActivo.id);
//       } catch (err) {
//         console.error('Error al borrar servicio:', err);
//       }
//     }

//     set({ servicioActivo: null, estadoActual: ESTADOS_SERVICIO.IDLE });
//   }
// }));

import { create } from 'zustand';
import { db } from '../db/schema';
import { notificarEstadoGoCast } from '../services/gocastApi';
import { sincronizarTodoPendiente } from '../services/syncQueue';

export const ESTADOS_SERVICIO = {
  IDLE: 'IDLE',
  PENDIENTE_ACEPTACION: 'PENDIENTE_ACEPTACION',
  ACEPTADO: 'ACEPTADO',
  EN_CAMINO_ORIGEN: 'EN_CAMINO_ORIGEN',
  EN_SITIO_ORIGEN: 'EN_SITIO_ORIGEN',
  EN_CAMINO_DESTINO: 'EN_CAMINO_DESTINO',
  PENDIENTE_EVIDENCIA: 'PENDIENTE_EVIDENCIA',
  EXITO_SERVICIO: 'EXITO_SERVICIO'
};

export function formatearDuracion(minutosTotales) {
  if (!minutosTotales || minutosTotales < 1) return 'Menos de 1 min';
  const horas = Math.floor(minutosTotales / 60);
  const mins = minutosTotales % 60;
  if (horas === 0) return `${mins} min`;
  return `${horas}h ${mins}m`;
}

export const useServiceStore = create((set, get) => ({
  isOnline: navigator.onLine,
  servicioActivo: null,
  estadoActual: ESTADOS_SERVICIO.IDLE,
  tabActiva: 'jobs',
  setTabActiva: (tab) => set({ tabActiva: tab }),

  setIsOnline: (online) => set({ isOnline: online }),

  cargarServicioPersistido: async () => {
    try {
      const servicios = await db.servicios.toArray();
      const activo = servicios.find((s) => s.estado_actual !== ESTADOS_SERVICIO.EXITO_SERVICIO);
      if (activo) {
        set({ servicioActivo: activo, estadoActual: activo.estado_actual });
      }
    } catch (err) {
      console.error('Error al cargar servicio guardado:', err);
    }
  },

  asignarNuevoServicio: async (datosServicio) => {
    const idNormalizado = datosServicio.id || datosServicio.servicio_id;
    const nuevoServicio = {
      ...datosServicio,
      id: idNormalizado,
      servicio_id: idNormalizado,
      estado_actual: ESTADOS_SERVICIO.PENDIENTE_ACEPTACION,
      sincronizado: false
    };
    set({ servicioActivo: nuevoServicio, estadoActual: ESTADOS_SERVICIO.PENDIENTE_ACEPTACION });
    try {
      await db.servicios.put(nuevoServicio);
    } catch (err) {
      console.error('Error al guardar servicio inicial:', err);
    }
  },

  aceptarServicioConGps: async (gpsGruero) => {
    const { servicioActivo } = get();
    if (!servicioActivo) return;

    const servicioActualizado = {
      ...servicioActivo,
      estado_actual: ESTADOS_SERVICIO.ACEPTADO,
      ubicacionGruero: gpsGruero,
      fecha_inicio: new Date().toISOString(),
      sincronizado: false
    };

    set({
      servicioActivo: servicioActualizado,
      estadoActual: ESTADOS_SERVICIO.ACEPTADO
    });

    try {
      await db.servicios.put(servicioActualizado);
    } catch (err) {
      console.error('Error al actualizar aceptación:', err);
    }

    const idServicio = servicioActivo.id || servicioActivo.servicio_id;
    if (idServicio) {
      notificarEstadoGoCast(idServicio, ESTADOS_SERVICIO.ACEPTADO, 'Servicio aceptado por el conductor');
    }

    try {
      await fetch('https://apidev.gocastgroup.com/api/gruero_app/limpiar_servicio.php');
      console.log('Servidor notificado: archivo JSON archivado como realizado.');
    } catch (error) {
      console.error('Error al notificar al servidor sobre la limpieza:', error);
    }
  },

  avanzarEstado: async (nuevoEstado) => {
    const { servicioActivo } = get();
    if (!servicioActivo) return;

    const servicioActualizado = {
      ...servicioActivo,
      estado_actual: nuevoEstado,
      sincronizado: false
    };

    set({
      servicioActivo: servicioActualizado,
      estadoActual: nuevoEstado
    });

    try {
      await db.servicios.put(servicioActualizado);
    } catch (err) {
      console.error('Error al guardar servicio en IndexedDB:', err);
    }

    // Dispara la cola central de sincronización
    sincronizarTodoPendiente();
  },

  cerrarServicio: async () => {
    // Se elimina la llamada redundante a GoCast y el borrado destructivo.
    // Simplemente colocamos la app lista para el siguiente servicio (IDLE).
    set({ servicioActivo: null, estadoActual: ESTADOS_SERVICIO.IDLE });
    
    // Aseguramos que la cola continúe subiendo cualquier evidencia pendiente en segundo plano
    sincronizarTodoPendiente();
  }
}));