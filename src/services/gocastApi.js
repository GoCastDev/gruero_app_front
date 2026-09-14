// Apunta a tu proxy PHP local en apidev
const GOCAST_API_URL = 'https://apidev.gocastgroup.com/api/gruero_app/notificar_gocast.php';

/**
 * Mapea el estado interno de la app al estado esperado por GoCast
 */
// const mapearEstadoGoCast = (estadoLocal) => {
//   switch (estadoLocal) {
//     case 'ACEPTADO':
//     case 'EN_CAMINO_ORIGEN':
//       return 'en_camino'; //
//     case 'EN_SITIO_ORIGEN':
//       return 'en_sitio'; //[cite: 1]
//     case 'EN_CAMINO_DESTINO':
//     case 'PENDIENTE_EVIDENCIA':
//     case 'EXITO_SERVICIO':
//     case 'FINALIZADO':
//     case 'ENTREGADO':
//       return 'realizado'; //[cite: 1]
//     default:
//       return null;
//   }
// };  FUNCIONA HASTA QUE SE CAMBIA EL ESTADO A "EXITO_SERVICIO" O "FINALIZADO" YA QUE NO HAY UN ESTADO EQUIVALENTE EN GOCAST, POR LO QUE SE DEBE MAPEAR A "realizado"

const mapearEstadoGoCast = (estadoLocal) => {
  switch (estadoLocal) {
    case 'ACEPTADO':
    case 'EN_CAMINO_ORIGEN':
      return 'en_camino'; //

    case 'EN_SITIO_ORIGEN':
      return 'en_sitio'; //

    // 🛑 Durante traslado al destino y captura de firmas/evidencias, NO enviamos nada a GoCast
    // para que el expediente permanezca abierto en 'en_sitio'.
    case 'EN_CAMINO_DESTINO':
    case 'PENDIENTE_EVIDENCIA':
      return null; 

    // 🚀 Único punto que ejecuta el cierre definitivo en GoCast
    case 'EXITO_SERVICIO':
    case 'FINALIZADO':
    case 'ENTREGADO':
      return 'realizado'; //

    default:
      return null;
  }
};


/**
 * Notifica el cambio de estado a la API central de GoCast
 */
export const notificarEstadoGoCast = async (servicioId, estadoLocal, comentario = '') => {
  const estadoGoCast = mapearEstadoGoCast(estadoLocal);

  if (!estadoGoCast || !servicioId) return null;

  try {
    const response = await fetch(GOCAST_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        servicio_id: Number(servicioId),
        estado: estadoGoCast,
        ...(comentario && { comentario }),
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('[GoCast API Error]:', error);
    return null;
  }
};