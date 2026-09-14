import { useState, useEffect } from 'react';
import { db } from '../../db/schema';
import { CloudOff, RefreshCw, CheckCircle2 } from 'lucide-react';
import { sincronizarTodoPendiente } from '../../services/syncQueue';

export function SyncBadge() {
  const [totalPendientes, setTotalPendientes] = useState(0);

  const consultarPendientes = async () => {
    try {
      const fotos = await db.evidencias_fotos.where('subido').equals(0).count();
      const servicios = await db.servicios
        .filter((s) => s.sincronizado === false || s.sincronizado === 0)
        .count();

      setTotalPendientes(fotos + servicios);
    } catch (err) {
      console.error('Error al consultar pendientes de sincronización:', err);
    }
  };

  useEffect(() => {
    consultarPendientes();

    // Revisa cada 3 segundos y al detectar conexión
    const interval = setInterval(consultarPendientes, 3000);
    window.addEventListener('online', consultarPendientes);

    return () => {
      clearInterval(interval);
      window.removeEventListener('online', consultarPendientes);
    };
  }, []);

  if (totalPendientes === 0) {
    return (
      <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold px-2.5 py-1 rounded-full">
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Sincronizado</span>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={async () => {
        await sincronizarTodoPendiente();
        consultarPendientes();
      }}
      className="flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 text-amber-500 text-[10px] font-bold px-2.5 py-1 rounded-full animate-pulse active:scale-95 transition-all cursor-pointer"
      title="Haz clic para intentar sincronizar"
    >
      <CloudOff className="w-3.5 h-3.5 shrink-0" />
      <span>{totalPendientes} pendiente{totalPendientes > 1 ? 's' : ''}</span>
      <RefreshCw className="w-3 h-3 ml-0.5" />
    </button>
  );
}