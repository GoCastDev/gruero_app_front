// import { db } from '../db/schema';
// import { comprimirBlob } from '../utils/imageCompressor';

// const SUBIR_EVIDENCIA_URL = 'https://apidev.gocastgroup.com/api/gruero_app/subir_evidencia.php';

// export const procesarSincronizacionEvidencias = async () => {
//   if (!navigator.onLine) return;

//   try {
//     const pendientes = await db.evidencias_fotos
//       .where('subido')
//       .equals(0)
//       .toArray();

//     if (pendientes.length === 0) return;

//     for (const item of pendientes) {
//       // 1. Compresión en vivo previa al envío
//       const blobComprimido = await comprimirBlob(item.blob_imagen, 1280, 0.75);

//       // 2. Construcción del payload
//       const formData = new FormData();
//       formData.append('servicio_id', item.servicio_id);
//       formData.append('tipo', item.tipo_foto);
//       formData.append('timestamp_captura', item.timestamp); // Preserva fecha y hora exacta de la captura
//       formData.append('file', blobComprimido, `${item.tipo_foto}_${item.servicio_id}.jpg`);

//       const response = await fetch(SUBIR_EVIDENCIA_URL, {
//         method: 'POST',
//         body: formData
//       });

//       if (response.ok) {
//         // 3. Marcar como subido exitosamente en IndexedDB
//         await db.evidencias_fotos.update(item.id, { subido: 1 });
//       }
//     }
//   } catch (error) {
//     console.error('[Sync Evidencias Error]:', error);
//   }
// };

// // Escuchador global de red
// window.addEventListener('online', () => {
//   procesarSincronizacionEvidencias();
// });