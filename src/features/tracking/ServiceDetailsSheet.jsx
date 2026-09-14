import {
  X,
  MapPin,
  Car,
  Phone,
  Wrench,
  User,
  Navigation,
} from 'lucide-react';

import { useServiceStore } from '../../store/useServiceStore';

export function ServiceDetailsSheet({
  open,
  onClose,
}) {
  const servicioActivo = useServiceStore(
    (state) => state.servicioActivo
  );

  if (!open || !servicioActivo) {
    return null;
  }

  const nombreVehiculo = [
    servicioActivo.vehiculo?.marca,
    servicioActivo.vehiculo?.modelo,
  ]
    .filter(Boolean)
    .join(' ');

  const telefonoCliente =
    servicioActivo.cliente?.telefono || '';

  return (
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
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Detalles del servicio"
        onClick={(event) => event.stopPropagation()}
        className="
          flex
          max-h-[78dvh]
          w-full
          max-w-md
          flex-col
          overflow-hidden
          rounded-t-[30px]
          border
          border-[var(--bg-card-border)]
          bg-[var(--bg-card)]
          text-[var(--text-main)]
          shadow-[0_-18px_50px_rgba(0,0,0,0.18)]
        "
      >
        {/* ===============================================
            HANDLE
        =============================================== */}

        <div
          className="
            flex
            shrink-0
            justify-center
            pb-1
            pt-2.5
          "
        >
          <div
            className="
              h-1
              w-10
              rounded-full
              bg-[var(--bg-card-border)]
            "
          />
        </div>

        {/* ===============================================
            HEADER
        =============================================== */}

        <header
          className="
            flex
            shrink-0
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
          <div className="min-w-0">
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.1em]
                text-[var(--color-primary)]
              "
            >
              Servicio #{servicioActivo.id}
            </p>

            <h2
              className="
                mt-1
                text-lg
                font-bold
                tracking-tight
                text-[var(--text-main)]
              "
            >
              Detalles del servicio
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar detalles"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[var(--bg-main)]
              text-[var(--text-secondary)]
              transition-all

              active:scale-90
            "
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {/* ===============================================
            CONTENIDO
        =============================================== */}

        <div
          className="
            min-h-0
            flex-1
            overflow-y-auto
            overscroll-contain
            px-4
            py-4
          "
          style={{
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <div className="space-y-3">

            {/* ===========================================
                CLIENTE
            =========================================== */}

            <section className="gocast-card-flat p-4">
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                "
              >
                <div
                  className="
                    flex
                    min-w-0
                    items-center
                    gap-3
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[var(--bg-card-secondary)]
                      text-[var(--color-primary)]
                    "
                  >
                    <User className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <p
                      className="
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-[var(--text-muted)]
                      "
                    >
                      Cliente
                    </p>

                    <p
                      className="
                        mt-0.5
                        truncate
                        text-[15px]
                        font-bold
                        text-[var(--text-main)]
                      "
                    >
                      {servicioActivo.cliente?.nombre ||
                        'Cliente no identificado'}
                    </p>

                    {telefonoCliente && (
                      <p
                        className="
                          mt-0.5
                          text-[11px]
                          text-[var(--text-muted)]
                        "
                      >
                        {telefonoCliente}
                      </p>
                    )}
                  </div>
                </div>

                {telefonoCliente && (
                  <a
                    href={`tel:${telefonoCliente}`}
                    aria-label="Llamar al cliente"
                    className="
                      flex
                      h-11
                      shrink-0
                      items-center
                      gap-2
                      rounded-full
                      bg-[var(--color-primary-soft)]
                      px-4
                      text-xs
                      font-bold
                      text-[var(--color-primary)]
                      transition-all

                      active:scale-95
                    "
                  >
                    <Phone className="h-4 w-4" />

                    Llamar
                  </a>
                )}
              </div>
            </section>

            {/* ===========================================
                VEHÍCULO
            =========================================== */}

            <section className="gocast-card-flat p-4">
              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[var(--color-primary-soft)]
                    text-[var(--color-primary)]
                  "
                >
                  <Car className="h-5 w-5" />
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
                    Vehículo
                  </p>

                  <p
                    className="
                      mt-0.5
                      truncate
                      text-[15px]
                      font-bold
                      text-[var(--text-main)]
                    "
                  >
                    {nombreVehiculo ||
                      'Vehículo no especificado'}
                  </p>
                </div>

                {servicioActivo.vehiculo?.placa && (
                  <span
                    className="
                      shrink-0
                      rounded-lg
                      bg-[var(--bg-card-secondary)]
                      px-2.5
                      py-1.5
                      font-mono
                      text-xs
                      font-bold
                      tracking-wider
                      text-[var(--text-secondary)]
                    "
                  >
                    {servicioActivo.vehiculo.placa}
                  </span>
                )}
              </div>

              {/* Falla */}

              {servicioActivo.vehiculo?.falla && (
                <div
                  className="
                    mt-4
                    flex
                    items-start
                    gap-2.5
                    rounded-xl
                    bg-[var(--color-warning-soft)]
                    p-3
                  "
                >
                  <Wrench
                    className="
                      mt-0.5
                      h-4
                      w-4
                      shrink-0
                      text-[var(--color-warning)]
                    "
                  />

                  <div>
                    <p
                      className="
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-[var(--color-warning)]
                      "
                    >
                      Falla reportada
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-sm
                        font-semibold
                        text-[var(--text-main)]
                      "
                    >
                      {servicioActivo.vehiculo.falla}
                    </p>
                  </div>
                </div>
              )}
            </section>
            {/* ===========================================
                RUTA
            =========================================== */}

            <section className="gocast-card-flat p-4">
              <div
                className="
                  mb-4
                  flex
                  items-center
                  gap-2
                "
              >
                <Navigation
                  className="
                    h-4
                    w-4
                    text-[var(--color-primary)]
                  "
                />

                <h3
                  className="
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.08em]
                    text-[var(--text-secondary)]
                  "
                >
                  Ruta
                </h3>
              </div>

              <div className="relative">
                {/* Línea */}

                <div
                  className="
                    absolute
                    bottom-[28px]
                    left-[15px]
                    top-[28px]
                    w-[2px]
                    bg-[var(--bg-card-border)]
                  "
                />

                {/* Recogida */}

                <div
                  className="
                    relative
                    z-10
                    flex
                    items-start
                    gap-3
                    pb-5
                  "
                >
                  <div
                    className="
                      flex
                      h-[30px]
                      w-[30px]
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[var(--color-info-soft)]
                      ring-4
                      ring-[var(--bg-card)]
                    "
                  >
                    <MapPin
                      className="
                        h-4
                        w-4
                        text-[var(--color-info)]
                      "
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className="
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.1em]
                        text-[var(--text-muted)]
                      "
                    >
                      Recogida
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
                      {servicioActivo.origen?.direccion ||
                        'Ubicación no disponible'}
                    </p>
                  </div>
                </div>

                {/* Destino */}

                <div
                  className="
                    relative
                    z-10
                    flex
                    items-start
                    gap-3
                  "
                >
                  <div
                    className="
                      flex
                      h-[30px]
                      w-[30px]
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[var(--color-success-soft)]
                      ring-4
                      ring-[var(--bg-card)]
                    "
                  >
                    <MapPin
                      className="
                        h-4
                        w-4
                        text-[var(--color-success)]
                      "
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className="
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.1em]
                        text-[var(--text-muted)]
                      "
                    >
                      Destino
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
                      {servicioActivo.destino?.direccion ||
                        'Ubicación no disponible'}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* ===============================================
            FOOTER
        =============================================== */}

        <footer
          className="
            shrink-0
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
            onClick={onClose}
            className="
              gocast-button-primary
              w-full
            "
          >
            Listo
          </button>
        </footer>
      </section>
    </div>
  );
}