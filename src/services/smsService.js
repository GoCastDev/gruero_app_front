/**
 * Normaliza un número de teléfono al formato requerido por la API:
 * Exactamente 11 dígitos iniciando con 0 (ej. "04121234567")
 */
export function normalizarTelefonoVenezuela(telefonoRaw) {
  if (!telefonoRaw) return null;

  // Extraer solo dígitos numéricos
  let digitos = telefonoRaw.replace(/\D/g, '');

  // Si viene en formato internacional (+584121234567 -> 584121234567), remueve el 58
  if (digitos.startsWith('58') && digitos.length === 12) {
    digitos = '0' + digitos.substring(2);
  }

  // Si tiene 10 dígitos y falta el 0 inicial (ej. 4121234567 -> 04121234567)
  if (digitos.length === 10 && !digitos.startsWith('0')) {
    digitos = '0' + digitos;
  }

  // Validar regla final de la API: 11 dígitos iniciando en 0
  if (digitos.length === 11 && digitos.startsWith('0')) {
    return digitos;
  }

  return null;
}

/**
 * Consume el Endpoint POST https://apidev.gocastgroup.com/api/send.php
 */
export async function enviarSmsCliente(clienteTelefono, idServicio, etaMinutos = 15) {
  const numeroValido = normalizarTelefonoVenezuela(clienteTelefono);

  if (!numeroValido) {
    console.warn(`[SMS API] Teléfono inválido para el envío (${clienteTelefono}). Debe tener 11 dígitos (04xx...).`);
    return { ok: false, error: 'Número de teléfono inválido' };
  }

  const linkRastreo = `https://gocast.app/r/${idServicio}`;
  const mensajeText = `Auxilio Vial #${idServicio}: Tu grúa va en camino (ETA: ${etaMinutos} min). Sigue tu unidad en vivo aquí: ${linkRastreo}`;

  try {
    const response = await fetch('https://apidev.gocastgroup.com/api/send.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        numeros: [numeroValido],
        texto: mensajeText
      })
    });

    const data = await response.json();

    if (response.ok && data.status === 'ok') {
      console.log('[SMS API] Mensaje entregado con éxito:', data);
      return { ok: true, data };
    } else {
      console.error('[SMS API] Error devuelto por la API:', data);
      return { ok: false, error: data.error || 'Error en respuesta de API' };
    }
  } catch (error) {
    console.error('[SMS API] Error de conexión con el servidor de SMS:', error);
    return { ok: false, error: 'Error de red o conexión' };
  }
}