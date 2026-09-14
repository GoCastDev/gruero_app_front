// import { useEffect } from 'react';
// import { useServiceStore } from '../../store/useServiceStore';

// export function NetworkListener() {
//   const setOnlineStatus = useServiceStore((state) => state.setOnlineStatus);

//   useEffect(() => {
//     const handleOnline = () => setOnlineStatus(true);
//     const handleOffline = () => setOnlineStatus(false);

//     window.addEventListener('online', handleOnline);
//     window.addEventListener('offline', handleOffline);

//     return () => {
//       window.removeEventListener('online', handleOnline);
//       window.removeEventListener('offline', handleOffline);
//     };
//   }, [setOnlineStatus]);

//   return null; // Componente sin interfaz, solo lógica
// }

import { useEffect, useRef } from 'react';
import { useServiceStore } from '../../store/useServiceStore';

export function NetworkListener() {
  const setIsOnline = useServiceStore(
    (state) => state.setIsOnline
  );

  const offlineTimerRef = useRef(null);

  useEffect(() => {
    const cancelarTimer = () => {
      if (offlineTimerRef.current) {
        clearTimeout(offlineTimerRef.current);
        offlineTimerRef.current = null;
      }
    };

    /*
    |--------------------------------------------------------------------------
    | ONLINE
    |--------------------------------------------------------------------------
    */

    const handleOnline = () => {
      cancelarTimer();

      setIsOnline(true);
    };

    /*
    |--------------------------------------------------------------------------
    | OFFLINE
    |--------------------------------------------------------------------------
    |
    | Esperamos unos segundos antes de marcar la aplicación
    | como offline para ignorar microcortes de Android.
    |
    */

    const handleOffline = () => {
      cancelarTimer();

      offlineTimerRef.current = setTimeout(() => {
        if (!navigator.onLine) {
          setIsOnline(false);
        }

        offlineTimerRef.current = null;
      }, 3000);
    };

    /*
    |--------------------------------------------------------------------------
    | REVISAR ESTADO ACTUAL
    |--------------------------------------------------------------------------
    */

    const verificarConexion = () => {
      if (navigator.onLine) {
        handleOnline();
      } else {
        handleOffline();
      }
    };

    /*
    |--------------------------------------------------------------------------
    | EVENTOS
    |--------------------------------------------------------------------------
    */

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    /*
    |--------------------------------------------------------------------------
    | REVISAR AL INICIAR
    |--------------------------------------------------------------------------
    */

    verificarConexion();

    /*
    |--------------------------------------------------------------------------
    | REVISAR AL VOLVER A LA APP
    |--------------------------------------------------------------------------
    */

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        verificarConexion();
      }
    };

    document.addEventListener(
      'visibilitychange',
      handleVisibilityChange
    );

    /*
    |--------------------------------------------------------------------------
    | CLEANUP
    |--------------------------------------------------------------------------
    */

    return () => {
      cancelarTimer();

      window.removeEventListener(
        'online',
        handleOnline
      );

      window.removeEventListener(
        'offline',
        handleOffline
      );

      document.removeEventListener(
        'visibilitychange',
        handleVisibilityChange
      );
    };
  }, [setIsOnline]);

  return null;
}