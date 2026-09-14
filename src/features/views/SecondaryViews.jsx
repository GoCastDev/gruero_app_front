import {
  MapPin,
  DollarSign,
  Award,
  Truck,
  ShieldCheck,
  Moon,
  RefreshCw,
  Check,
  Car,
  Clock3,
  ChevronRight,
  X,
  User,
  Wrench,
} from 'lucide-react';

import { useState } from 'react';
import { useServiceStore } from '../../store/useServiceStore';

// Vista de Mapa General / Cobertura
export function MapView() {
  return (
    <div className="w-full space-y-4 my-auto">
      <div className="bg-[var(--bg-card)] p-4 rounded-2xl border border-[var(--bg-card-border)] text-left space-y-2">
        <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-xs uppercase">
          <MapPin className="w-4 h-4" />
          <span>Zona de Cobertura Activa</span>
        </div>
        <h3 className="font-bold text-base text-[var(--text-main)]">Caracas / Gran Caracas</h3>
        <p className="text-xs text-[var(--text-muted)]">
          Unidad rastreada vía GPS en tiempo real. Alta demanda proyectada en las próximas 2 horas.
        </p>
      </div>
    </div>
  );
}

// Vista de Ganancias y Resumen
export function EarningsView() {
  const [filtro, setFiltro] = useState('hoy');
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);

  /*
  |--------------------------------------------------------------------------
  | Datos temporales
  |--------------------------------------------------------------------------
  |
  | Luego estos datos pueden venir de Zustand, API o Dexie.
  |
  */

  const servicios = [
    {
      id: 'GC-8290',
      estado: 'Completado',
      fecha: 'Hoy',
      hora: '11:42',
      monto: 48.5,

      cliente: {
        nombre: 'Luis Bermudez',
      },

      vehiculo: {
        marca: 'Toyota',
        modelo: 'Hilux',
        placa: 'ABC123D',
        falla: 'Sin tracción',
      },

      origen: {
        direccion: 'Av. Francisco de Miranda, Los Palos Grandes',
      },

      destino: {
        direccion: 'Taller Autofix, La Urbina',
      },
    },

    {
      id: 'GC-8288',
      estado: 'Completado',
      fecha: 'Hoy',
      hora: '09:16',
      monto: 32.2,

      cliente: {
        nombre: 'María González',
      },

      vehiculo: {
        marca: 'Chevrolet',
        modelo: 'Aveo',
        placa: 'AA123BB',
        falla: 'Batería descargada',
      },

      origen: {
        direccion: 'Chacao, Caracas',
      },

      destino: {
        direccion: 'Bello Monte, Caracas',
      },
    },

    {
      id: 'GC-8281',
      estado: 'Completado',
      fecha: 'Ayer',
      hora: '18:07',
      monto: 46.1,

      cliente: {
        nombre: 'Carlos Martínez',
      },

      vehiculo: {
        marca: 'Ford',
        modelo: 'Fiesta',
        placa: 'AB456CD',
        falla: 'Falla mecánica',
      },

      origen: {
        direccion: 'Altamira, Caracas',
      },

      destino: {
        direccion: 'Los Ruices, Caracas',
      },
    },
  ];

  const serviciosFiltrados =
    filtro === 'hoy'
      ? servicios.filter((servicio) => servicio.fecha === 'Hoy')
      : servicios;

  const totalGanado = serviciosFiltrados.reduce(
    (total, servicio) => total + servicio.monto,
    0
  );

  const promedio =
    serviciosFiltrados.length > 0
      ? totalGanado / serviciosFiltrados.length
      : 0;

  const formatearMonto = (valor) => {
    return `$${valor.toFixed(2)}`;
  };

  return (
    <>
      <div className="w-full space-y-4">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <section>
          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.1em]
              text-[var(--text-muted)]
            "
          >
            Resumen financiero
          </p>

          <h2
            className="
              mt-1
              text-[24px]
              font-bold
              tracking-tight
              text-[var(--text-main)]
            "
          >
            Ganancias
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-[var(--text-muted)]
            "
          >
            Consulta tus servicios completados y montos.
          </p>
        </section>

        {/* =====================================================
            TARJETAS RESUMEN
        ===================================================== */}

        <section className="grid grid-cols-2 gap-3">
          {/* Ganado */}

          <div className="gocast-card p-4">
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-[var(--color-success-soft)]
                text-[var(--color-success)]
              "
            >
              <DollarSign className="h-4 w-4" />
            </div>

            <p
              className="
                mt-4
                text-[10px]
                font-bold
                uppercase
                tracking-wider
                text-[var(--text-muted)]
              "
            >
              Ganado
            </p>

            <p
              className="
                mt-1
                text-[22px]
                font-bold
                tracking-tight
                text-[var(--text-main)]
              "
            >
              {formatearMonto(totalGanado)}
            </p>

            <p
              className="
                mt-1
                text-[11px]
                font-semibold
                text-[var(--color-success)]
              "
            >
              {serviciosFiltrados.length} servicios
            </p>
          </div>

          {/* Promedio */}

          <div className="gocast-card p-4">
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-[var(--color-primary-soft)]
                text-[var(--color-primary)]
              "
            >
              <Award className="h-4 w-4" />
            </div>

            <p
              className="
                mt-4
                text-[10px]
                font-bold
                uppercase
                tracking-wider
                text-[var(--text-muted)]
              "
            >
              Promedio
            </p>

            <p
              className="
                mt-1
                text-[22px]
                font-bold
                tracking-tight
                text-[var(--text-main)]
              "
            >
              {formatearMonto(promedio)}
            </p>

            <p
              className="
                mt-1
                text-[11px]
                font-semibold
                text-[var(--text-muted)]
              "
            >
              Por servicio
            </p>
          </div>
        </section>

        {/* =====================================================
            FILTROS
        ===================================================== */}

        <section
          className="
            flex
            rounded-2xl
            border
            border-[var(--bg-card-border)]
            bg-[var(--bg-card)]
            p-1
          "
        >
          {[
            { id: 'hoy', label: 'Hoy' },
            { id: 'semana', label: 'Semana' },
            { id: 'mes', label: 'Mes' },
          ].map((item) => {
            const activo = filtro === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setFiltro(item.id)}
                className={`
                  flex-1
                  rounded-xl
                  px-3
                  py-2.5
                  text-xs
                  font-bold
                  transition-all

                  ${
                    activo
                      ? `
                        bg-[var(--color-primary)]
                        text-[var(--color-on-primary)]
                      `
                      : `
                        text-[var(--text-muted)]
                      `
                  }
                `}
              >
                {item.label}
              </button>
            );
          })}
        </section>

        {/* =====================================================
            LISTADO
        ===================================================== */}

        <section>
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.1em]
                  text-[var(--text-muted)]
                "
              >
                Últimos servicios
              </p>

              <h3
                className="
                  mt-1
                  text-lg
                  font-bold
                  text-[var(--text-main)]
                "
              >
                Servicios
              </h3>
            </div>

            <span
              className="
                text-[11px]
                font-semibold
                text-[var(--text-muted)]
              "
            >
              {serviciosFiltrados.length} registros
            </span>
          </div>

          <div className="space-y-3">
            {serviciosFiltrados.map((servicio) => (
              <button
                key={servicio.id}
                type="button"
                onClick={() =>
                  setServicioSeleccionado(servicio)
                }
                className="
                  gocast-card
                  w-full
                  p-4
                  text-left
                  transition-all

                  active:scale-[0.99]
                "
              >
                <div className="flex items-center gap-3">
                  {/* Estado */}

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-[var(--color-success-soft)]
                      text-[var(--color-success)]
                    "
                  >
                    <Check className="h-5 w-5 stroke-[2.5]" />
                  </div>

                  {/* Info */}

                  <div className="min-w-0 flex-1">
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        gap-2
                      "
                    >
                      <p
                        className="
                          font-bold
                          text-[var(--text-main)]
                        "
                      >
                        #{servicio.id}
                      </p>

                      <p
                        className="
                          shrink-0
                          text-sm
                          font-bold
                          text-[var(--text-main)]
                        "
                      >
                        {formatearMonto(servicio.monto)}
                      </p>
                    </div>

                    <div
                      className="
                        mt-1
                        flex
                        items-center
                        gap-1.5
                        text-[11px]
                        text-[var(--text-muted)]
                      "
                    >
                      <span className="font-semibold text-[var(--color-success)]">
                        {servicio.estado}
                      </span>

                      <span>·</span>

                      <span>
                        {servicio.fecha} {servicio.hora}
                      </span>
                    </div>

                    <div
                      className="
                        mt-2
                        flex
                        items-center
                        justify-between
                        gap-2
                      "
                    >
                      <p
                        className="
                          truncate
                          text-[11px]
                          text-[var(--text-secondary)]
                        "
                      >
                        {servicio.vehiculo.marca}{' '}
                        {servicio.vehiculo.modelo}
                      </p>

                      <ChevronRight
                        className="
                          h-4
                          w-4
                          shrink-0
                          text-[var(--text-muted)]
                        "
                      />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* =====================================================
          DETALLE
      ===================================================== */}

      {servicioSeleccionado && (
        <div
          className="
            fixed
            inset-0
            z-[120]
            flex
            items-end
            justify-center
            bg-slate-950/45
            backdrop-blur-[2px]
          "
          onClick={() => setServicioSeleccionado(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-label="Detalle del servicio"
            onClick={(event) => event.stopPropagation()}
            className="
              flex
              max-h-[82dvh]
              w-full
              max-w-md
              flex-col
              overflow-hidden
              rounded-t-[30px]
              border
              border-[var(--bg-card-border)]
              bg-[var(--bg-card)]
              shadow-[0_-18px_50px_rgba(0,0,0,0.2)]
            "
          >
            {/* Handle */}

            <div className="flex justify-center pb-1 pt-2.5">
              <div
                className="
                  h-1
                  w-10
                  rounded-full
                  bg-[var(--bg-card-border)]
                "
              />
            </div>

            {/* Header */}

            <header
              className="
                flex
                items-center
                justify-between
                gap-3
                border-b
                border-[var(--bg-card-border)]
                px-5
                pb-4
                pt-2
              "
            >
              <div>
                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-[var(--color-success)]
                  "
                >
                  {servicioSeleccionado.estado}
                </p>

                <h3
                  className="
                    mt-1
                    text-lg
                    font-bold
                    text-[var(--text-main)]
                  "
                >
                  #{servicioSeleccionado.id}
                </h3>
              </div>

              <button
                type="button"
                onClick={() =>
                  setServicioSeleccionado(null)
                }
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--bg-main)]
                  text-[var(--text-secondary)]
                "
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            {/* Contenido */}

            <div
              className="
                min-h-0
                flex-1
                overflow-y-auto
                px-4
                py-4
              "
            >
              <div className="space-y-3">
                {/* Monto */}

                <div
                  className="
                    rounded-2xl
                    bg-[var(--color-success-soft)]
                    p-4
                  "
                >
                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-[var(--color-success)]
                    "
                  >
                    Monto del servicio
                  </p>

                  <p
                    className="
                      mt-1
                      text-[28px]
                      font-bold
                      tracking-tight
                      text-[var(--text-main)]
                    "
                  >
                    {formatearMonto(
                      servicioSeleccionado.monto
                    )}
                  </p>
                </div>

                {/* Fecha */}

                <DetailRow
                  icon={Clock3}
                  label="Fecha"
                  value={`${servicioSeleccionado.fecha} · ${servicioSeleccionado.hora}`}
                />

                {/* Cliente */}

                <DetailRow
                  icon={User}
                  label="Cliente"
                  value={
                    servicioSeleccionado.cliente.nombre
                  }
                />

                {/* Vehículo */}

                <DetailRow
                  icon={Car}
                  label="Vehículo"
                  value={`${servicioSeleccionado.vehiculo.marca} ${servicioSeleccionado.vehiculo.modelo} · ${servicioSeleccionado.vehiculo.placa}`}
                />

                {/* Falla */}

                <DetailRow
                  icon={Wrench}
                  label="Falla reportada"
                  value={
                    servicioSeleccionado.vehiculo.falla
                  }
                />

                {/* Recogida */}

                <DetailRow
                  icon={MapPin}
                  label="Recogida"
                  value={
                    servicioSeleccionado.origen.direccion
                  }
                />

                {/* Destino */}

                <DetailRow
                  icon={MapPin}
                  label="Destino"
                  value={
                    servicioSeleccionado.destino.direccion
                  }
                />
              </div>
            </div>

            {/* Footer */}

            <footer
              className="
                border-t
                border-[var(--bg-card-border)]
                bg-[var(--bg-card)]
                px-4
                pt-3
              "
              style={{
                paddingBottom:
                  'calc(12px + env(safe-area-inset-bottom))',
              }}
            >
              <button
                type="button"
                onClick={() =>
                  setServicioSeleccionado(null)
                }
                className="gocast-button-primary w-full"
              >
                Listo
              </button>
            </footer>
          </section>
        </div>
      )}
    </>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="gocast-card-flat p-4">
      <div className="flex items-start gap-3">
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[var(--color-primary-soft)]
            text-[var(--color-primary)]
          "
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-wider
              text-[var(--text-muted)]
            "
          >
            {label}
          </p>

          <p
            className="
              mt-1
              text-sm
              font-semibold
              leading-5
              text-[var(--text-main)]
            "
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

// Vista de Perfil y Grúa
export function ProfileView() {
  return (
    <div className="w-full space-y-3 text-left my-auto">
      <div className="bg-[var(--bg-card)] p-4 rounded-2xl border border-[var(--bg-card-border)] space-y-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[var(--color-primary)]/15 text-[var(--color-primary)] rounded-full flex items-center justify-center font-black text-lg border border-[var(--color-primary)]/30">
            JP
          </div>
          <div>
            <h3 className="font-bold text-sm text-[var(--text-main)]">Juan Pérez</h3>
            <p className="text-xs text-[var(--text-muted)]">Chofer Operador Grúa #04</p>
          </div>
        </div>

        <div className="bg-[var(--bg-main)] p-3 rounded-xl border border-[var(--bg-card-border)] text-xs space-y-1.5">
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)] font-bold">Unidad / Placa:</span>
            <span className="font-mono font-bold text-[var(--color-primary)]">A82BK9M</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)] font-bold">Tipo de Grúa:</span>
            <span>Plataforma Hidráulica</span>
          </div>
        </div>
      </div>
    </div>
  );
}