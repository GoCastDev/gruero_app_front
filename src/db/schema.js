import Dexie from 'dexie';

// Inicializamos la base de datos de la Web App
export const db = new Dexie('GrueroAppDB');

// Definición de tablas e índices
db.version(1).stores({
  // Tabla de servicios guardados localmente
  servicios: 'id, estado_actual, sincronizado, fecha_asignacion',
  
  // Cola de sincronización para cambios de estado (Offline Sync Queue)
  cola_eventos: '++id, servicio_id, tipo_evento, estado_sincronizacion, timestamp',
  
  // Almacenamiento local de fotografías/evidencias
  evidencias_fotos: '++id, servicio_id, tipo_foto, subido, timestamp'
});

// Helper para guardar un cambio de estado en la cola de sincronización
export async function registrarEventoLocal(servicioId, tipoEvento, payload) {
  return await db.cola_eventos.add({
    servicio_id: servicioId,
    tipo_evento: tipoEvento,
    payload: payload,
    estado_sincronizacion: 'PENDIENTE', // PENDIENTE | ENVIANDO | EXITOSO
    intentos: 0,
    timestamp: new Date().toISOString()
  });
}