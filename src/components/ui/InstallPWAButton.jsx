import { Download } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

export function InstallPWAButton() {
  const { canInstall, installPWA } = usePWAInstall();

  if (!canInstall) return null; // No se renderiza si ya está instalada o el navegador no lo soporta

  return (
    <button
      type="button"
      onClick={installPWA}
      className="flex items-center gap-2 px-3 py-2 text-xs font-bold bg-emerald-500 text-white rounded-xl shadow-md active:scale-95 transition-all"
    >
      <Download className="w-4 h-4" />
      <span>Instalar App</span>
    </button>
  );
}