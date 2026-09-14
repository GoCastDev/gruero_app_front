export function enviarSmsSeguimiento(clienteTelefono, idServicio) {
  if (!clienteTelefono) return;

  const linkRastreo = `https://gocast.app/rastreo/${idServicio}`;
  const mensajeText = `Hola, tu servicio de auxilio vial #${idServicio} ha sido aceptado. Tiempo estimado de llegada: 15 min. Sigue a tu grúa en tiempo real aquí: ${linkRastreo}`;

  // Formato nativo seguro para Android / iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent || '');
  const separator = isIOS ? '&' : '?';
  const smsUrl = `sms:${clienteTelefono}${separator}body=${encodeURIComponent(mensajeText)}`;

  // Disparo de apertura nativa
  window.location.href = smsUrl;
}