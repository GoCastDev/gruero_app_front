import { useState, useEffect } from 'react';
import { MapPin, Bell, ShieldCheck, AlertCircle, Check } from 'lucide-react';

export function PermissionModal() {
  const [estadoUbicacion, setEstadoUbicacion] = useState('checking'); // granted | prompt | denied
  const [estadoNotificaciones, setEstadoNotificaciones] = useState('checking');
  const [solicitando, setSolicitando] = useState(false);

  // Verificar estado de permisos al abrir la app
  const verificarPermisos = async () => {
    // 1. Verificar GPS
    if ('permissions' in navigator) {
      try {
        const geoPermission = await navigator.permissions.query({ name: 'geolocation' });
        setEstadoUbicacion(geoPermission.state);

        geoPermission.onchange = () => {
          setEstadoUbicacion(geoPermission.state);
        };
      } catch (e) {
        setEstadoUbicacion('prompt');
      }
    } else {
      setEstadoUbicacion('prompt');
    }

    // 2. Verificar Notificaciones Push
    if ('Notification' in window) {
      setEstadoNotificaciones(Notification.permission); // granted | default (prompt) | denied
    } else {
      setEstadoNotificaciones('granted'); // No soportado, omitir
    }
  };

  useEffect(() => {
    verificarPermisos();
  }, []);

  // Si ambos permisos ya están concedidos, no mostramos la modal
  if (estadoUbicacion === 'granted' && (estadoNotificaciones === 'granted' || estadoNotificaciones === 'denied')) {
    return null;
  }

  // Desencadenar las alertas nativas de Android / Navegador
  const solicitarPermisosNativos = async () => {
    setSolicitando(true);

    // 1. Pedir permiso de Notificaciones Push (Android OS)
    if ('Notification' in window && Notification.permission !== 'granted') {
      try {
        const resNotif = await Notification.requestPermission();
        setEstadoNotificaciones(resNotif);
      } catch (err) {
        console.warn('Error al solicitar notificaciones:', err);
      }
    }

    // 2. Pedir permiso de Ubicación GPS (Android OS)
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setEstadoUbicacion('granted');
          setSolicitando(false);
        },
        (error) => {
          console.warn('Permiso GPS denegado por el usuario:', error);
          setEstadoUbicacion('denied');
          setSolicitando(false);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setSolicitando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[var(--bg-card)] text-[var(--text-main)] w-full max-w-md rounded-2xl border border-[var(--bg-card-border)] shadow-2xl p-6 space-y-5 text-center">
        
        {/* Icono de Seguridad */}
        <div className="w-16 h-16 bg-[var(--color-primary)]/15 text-[var(--color-primary)] rounded-full flex items-center justify-center mx-auto border border-[var(--color-primary)]/30">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <div>
          <h2 className="text-lg font-black text-[var(--text-main)] uppercase tracking-wide">
            Configuración de Permisos
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Para recibir asignaciones inmediatas y calcular la ruta GPS desde tu posición, la app requiere activar los siguientes permisos en tu teléfono Android:
          </p>
        </div>

        {/* Lista de Permisos Requeridos */}
        <div className="space-y-2 text-left text-xs">
          {/* Permiso 1: GPS */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-main)] border border-[var(--bg-card-border)]">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[var(--color-tertiary)] shrink-0" />
              <div>
                <p className="font-bold text-[var(--text-main)]">Ubicación GPS Precisa</p>
                <p className="text-[10px] text-[var(--text-muted)]">Rastrear partida desde el Punto A</p>
              </div>
            </div>
            {estadoUbicacion === 'granted' ? (
              <span className="text-xs font-bold text-[var(--color-tertiary)] flex items-center gap-1">
                <Check className="w-4 h-4" /> Listo
              </span>
            ) : (
              <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Requerido
              </span>
            )}
          </div>

          {/* Permiso 2: Notificaciones */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-main)] border border-[var(--bg-card-border)]">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-[var(--color-primary)] shrink-0" />
              <div>
                <p className="font-bold text-[var(--text-main)]">Notificaciones Push</p>
                <p className="text-[10px] text-[var(--text-muted)]">Alertas de nuevos servicios asignados</p>
              </div>
            </div>
            {estadoNotificaciones === 'granted' ? (
              <span className="text-xs font-bold text-[var(--color-tertiary)] flex items-center gap-1">
                <Check className="w-4 h-4" /> Listo
              </span>
            ) : (
              <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Requerido
              </span>
            )}
          </div>
        </div>

        {/* Mensaje de ayuda si el usuario bloqueó el GPS en Android previamente */}
        {estadoUbicacion === 'denied' && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-[11px] text-rose-400 font-bold flex items-center gap-2 text-left">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>
              Ubicación denegada. Ve a Ajustes del teléfono ➔ Sitios Web ➔ Permite el acceso a la ubicación para este sitio.
            </span>
          </div>
        )}

        {/* Botón Principal para Activar Permisos */}
        <button
          onClick={solicitarPermisosNativos}
          disabled={solicitando}
          className="w-full py-4 bg-[var(--color-primary)] hover:opacity-90 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 min-h-[48px]"
        >
          <span>{solicitando ? 'Activando...' : 'ACTIVAR PERMISOS EN MI TELÉFONO'}</span>
        </button>

      </div>
    </div>
  );
}