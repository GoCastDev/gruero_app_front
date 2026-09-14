// import { db } from '../db/schema';
// import { notificarEstadoGoCast } from './gocastApi';
// import { comprimirBlob } from '../utils/imageCompressor';

// const SUBIR_EVIDENCIA_URL = 'https://apidev.gocastgroup.com/api/gruero_app/subir_evidencia.php';

// export const sincronizarTodoPendiente = async () => {
//     if (!navigator.onLine) return;

//     console.log('[SyncQueue]: Conexión detectada. Procesando pendientes...');

//     // -------------------------------------------------------------
//     // 1. SINCRONIZAR ESTADOS DE SERVICIO PENDIENTES (GoCast)
//     // -------------------------------------------------------------
//     try {
//         const serviciosPendientes = await db.servicios
//             .filter((s) => s.sincronizado === false || s.sincronizado === 0)
//             .toArray();

//         for (const servicio of serviciosPendientes) {
//             try {
//                 const idServicio = servicio.id || servicio.servicio_id;
//                 if (idServicio && servicio.estado_actual) {
//                     const res = await notificarEstadoGoCast(idServicio, servicio.estado_actual);
//                     if (res) {
//                         await db.servicios.update(servicio.id, { sincronizado: true });
//                         console.log(`[SyncQueue]: Estado ${servicio.estado_actual} sincronizado para servicio #${idServicio}`);
//                     }
//                 }
//             } catch (errEstado) {
//                 console.error(`[SyncQueue Error - Estado servicio #${servicio.id}]:`, errEstado);
//             }
//         }
//     } catch (err) {
//         console.error('[SyncQueue Error - Estados]:', err);
//     }

//     // -------------------------------------------------------------
//     // 2. SINCRONIZAR FOTOS Y FIRMAS PENDIENTES (S3)
//     // -------------------------------------------------------------
//     try {
//         const fotosPendientes = await db.evidencias_fotos
//             .where('subido')
//             .equals(0)
//             .toArray();

//         for (const item of fotosPendientes) {
//             try {
//                 const servicioAsociado = await db.servicios.get(item.servicio_id);
//                 const expedienteFinal = item.expediente 
//                     || servicioAsociado?.expediente 
//                     || servicioAsociado?.numero_servicio 
//                     || item.servicio_id;

//                 // 👇 4. EXCLUIR FIRMAS DE LA COMPRESIÓN (Prevención de falla del blob)
//                 const esFirma = item.tipo_foto && item.tipo_foto.includes('FIRMA');
                
//                 let blobAEnviar;
//                 if (item.blob_imagen && !esFirma) {
//                     blobAEnviar = await comprimirBlob(item.blob_imagen, 1280, 0.75);
//                 } else {
//                     // Si es una firma o no necesita compresión, se envía puro
//                     blobAEnviar = item.blob_imagen || item.blob;
//                 }

//                 const formData = new FormData();
//                 formData.append('servicio_id', item.servicio_id);
//                 formData.append('expediente', expedienteFinal);
//                 formData.append('tipo', item.tipo_foto || 'EVIDENCIA');
//                 formData.append('timestamp_captura', item.timestamp || new Date().toISOString());
//                 formData.append('file', blobAEnviar, `${item.tipo_foto || 'evidencia'}_${item.servicio_id}.${esFirma ? 'png' : 'jpg'}`);

//                 const response = await fetch(SUBIR_EVIDENCIA_URL, {
//                     method: 'POST',
//                     body: formData
//                 });

//                 if (response.ok) {
//                     const data = await response.json();
//                     if (data.success) {
//                         await db.evidencias_fotos.update(item.id, { subido: 1 });
//                         console.log(`[SyncQueue]: Evidencia ${item.tipo_foto} subida a S3 con éxito`);
//                     } else {
//                         console.warn(`[SyncQueue Warning - PHP S3]: ${data.message}`);
//                     }
//                 }
//             } catch (errItem) {
//                 console.error(`[SyncQueue Error - Evidencia #${item.id}]:`, errItem);
//             }
//         }
//     } catch (err) {
//         console.error('[SyncQueue Error - Evidencias]:', err);
//     }
// };

// // Escuchadores de red automáticos
// window.addEventListener('online', () => {
//     sincronizarTodoPendiente();
// });

// import { db } from '../db/schema';
// import { notificarEstadoGoCast } from './gocastApi';
// import { comprimirBlob } from '../utils/imageCompressor';

// const SUBIR_EVIDENCIA_URL = 'https://apidev.gocastgroup.com/api/gruero_app/subir_evidencia.php';

// // 👇 CANDADO PARA EVITAR DOBLE EJECUCIÓN EN PARALELO
// let isSyncing = false; 

// export const sincronizarTodoPendiente = async () => {
//     if (!navigator.onLine || isSyncing) return;

//     isSyncing = true;
//     console.log('[SyncQueue]: Conexión detectada. Procesando pendientes...');

//     // -------------------------------------------------------------
//     // 1. SINCRONIZAR ESTADOS DE SERVICIO PENDIENTES (GoCast)
//     // -------------------------------------------------------------
//     try {
//         // Uso de .filter() evita crasheos si la columna no es un índice
//         const serviciosPendientes = await db.servicios
//             .filter((s) => s.sincronizado === false || s.sincronizado === 0)
//             .toArray();

//         for (const servicio of serviciosPendientes) {
//             try {
//                 const idServicio = servicio.id || servicio.servicio_id;
//                 if (idServicio && servicio.estado_actual) {
//                     const res = await notificarEstadoGoCast(idServicio, servicio.estado_actual);
//                     if (res) {
//                         await db.servicios.update(servicio.id, { sincronizado: true });
//                         console.log(`[SyncQueue]: Estado ${servicio.estado_actual} sincronizado.`);
//                     }
//                 }
//             } catch (errEstado) {
//                 console.error(`[SyncQueue Error - Estado servicio #${servicio.id}]:`, errEstado);
//             }
//         }
//     } catch (err) {
//         console.error('[SyncQueue Error - Estados]:', err);
//     }

//     // -------------------------------------------------------------
//     // 2. SINCRONIZAR FOTOS Y FIRMAS PENDIENTES (S3)
//     // -------------------------------------------------------------
//     try {
//         // Uso de .filter() evita el error de "KeyPath is not indexed"
//         const fotosPendientes = await db.evidencias_fotos
//             .filter((item) => item.subido === 0 || item.subido === false)
//             .toArray();

//         for (const item of fotosPendientes) {
//             try {
//                 const servicioAsociado = await db.servicios.get(item.servicio_id);
//                 const expedienteFinal = item.expediente 
//                     || servicioAsociado?.expediente 
//                     || servicioAsociado?.numero_servicio 
//                     || item.servicio_id;

//                 const esFirma = item.tipo_foto && item.tipo_foto.includes('FIRMA');
//                 let blobAEnviar = item.blob_imagen || item.blob;

//                 // Intentar compresión solo en fotos
//                 if (blobAEnviar && !esFirma) {
//                     try {
//                         blobAEnviar = await comprimirBlob(blobAEnviar, 1280, 0.75);
//                     } catch (errComp) {
//                         console.warn('[SyncQueue Warning]: Falló la compresión, enviando original.', errComp);
//                     }
//                 }

//                 if (!blobAEnviar) continue;

//                 const formData = new FormData();
//                 formData.append('servicio_id', item.servicio_id);
//                 formData.append('expediente', expedienteFinal);
//                 formData.append('tipo', item.tipo_foto || 'EVIDENCIA');
//                 formData.append('timestamp_captura', item.timestamp || new Date().toISOString());
//                 formData.append('file', blobAEnviar, `${item.tipo_foto || 'evidencia'}_${item.servicio_id}.${esFirma ? 'png' : 'jpg'}`);

//                 const response = await fetch(SUBIR_EVIDENCIA_URL, {
//                     method: 'POST',
//                     body: formData
//                 });

//                 if (response.ok) {
//                     // 👇 LECTURA SEGURA: Previene crasheos si PHP devuelve espacios en blanco
//                     const rawText = await response.text(); 
//                     try {
//                         const data = JSON.parse(rawText);
//                         if (data.success) {
//                             await db.evidencias_fotos.update(item.id, { subido: 1 });
//                             console.log(`[SyncQueue]: Evidencia ${item.tipo_foto} subida a S3 con éxito`);
//                         } else {
//                             console.warn(`[SyncQueue PHP S3]: ${data.message}`);
//                         }
//                     } catch (parseError) {
//                         console.error('[SyncQueue Parse Error]: PHP no devolvió JSON válido:', rawText);
//                     }
//                 } else {
//                     console.error(`[SyncQueue]: HTTP Error al subir evidencia: ${response.status}`);
//                 }
//             } catch (errItem) {
//                 console.error(`[SyncQueue Error - Evidencia #${item.id}]:`, errItem);
//             }
//         }
//     } catch (err) {
//         console.error('[SyncQueue Error - Evidencias]:', err);
//     } finally {
//         // Liberar el candado al terminar
//         isSyncing = false; 
//     }
// };

// window.addEventListener('online', () => {
//     sincronizarTodoPendiente();
// });

import { db } from '../db/schema';
import { notificarEstadoGoCast } from './gocastApi';
import { comprimirBlob } from '../utils/imageCompressor';

const SUBIR_EVIDENCIA_URL = 'https://apidev.gocastgroup.com/api/gruero_app/subir_evidencia.php';

// Candado y memoria para evitar concurrencia y encolar peticiones
let isSyncing = false; 
let syncRequested = false;

export const sincronizarTodoPendiente = async () => {
    if (!navigator.onLine) return;

    if (isSyncing) {
        syncRequested = true;
        return;
    }

    isSyncing = true;
    syncRequested = false;
    console.log('[SyncQueue]: Conexión detectada. Procesando pendientes...');

    // -------------------------------------------------------------
    // 1. SINCRONIZAR ESTADOS DE SERVICIO PENDIENTES (GoCast)
    // -------------------------------------------------------------
    try {
        const serviciosPendientes = await db.servicios
            .filter((s) => s.sincronizado === false || s.sincronizado === 0)
            .toArray();

        for (const servicio of serviciosPendientes) {
            try {
                const idServicio = servicio.id || servicio.servicio_id;
                if (idServicio && servicio.estado_actual) {
                    const res = await notificarEstadoGoCast(idServicio, servicio.estado_actual);
                    
                    // Si GoCast acepta el estado O rechaza porque ya fue procesado/realizado, 
                    // damos por superado el estado para liberar el flujo y permitir la subida de fotos.
                    if (
                        res === true || 
                        (res && res.success === true) || 
                        (res && res.message && (res.message.includes('Transición') || res.message.includes('permitida') || res.message.includes('realizado')))
                    ) {
                        await db.servicios.update(servicio.id, { sincronizado: true });
                        console.log(`[SyncQueue]: Estado ${servicio.estado_actual} sincronizado o superado.`);
                    } else {
                        // Si hay otro rechazo, marcamos de igual forma como sincronizado 
                        // para evitar que GoCast paralice la subida de evidencias del operador.
                        await db.servicios.update(servicio.id, { sincronizado: true });
                        console.warn(`[SyncQueue Warning]: GoCast devolvió conflicto, liberando servicio para permitir fotos.`);
                    }
                }
            } catch (errEstado) {
                console.error(`[SyncQueue Error - Estado servicio #${servicio.id}]:`, errEstado);
                // Garantiza que un error en GoCast jamás frene la subida de evidencias
                try {
                    await db.servicios.update(servicio.id, { sincronizado: true });
                } catch (e) {}
            }
        }
    } catch (err) {
        console.error('[SyncQueue Error - Estados]:', err);
    }

    // -------------------------------------------------------------
    // 2. SINCRONIZAR FOTOS Y FIRMAS PENDIENTES (S3)
    // -------------------------------------------------------------
    try {
        const fotosPendientes = await db.evidencias_fotos
            .filter((item) => item.subido === 0 || item.subido === false)
            .toArray();

        for (const item of fotosPendientes) {
            try {
                const servicioAsociado = await db.servicios.get(item.servicio_id);
                const expedienteFinal = item.expediente 
                    || servicioAsociado?.expediente 
                    || servicioAsociado?.numero_servicio 
                    || item.servicio_id;

                const esFirma = item.tipo_foto && item.tipo_foto.includes('FIRMA');
                let blobAEnviar = item.blob_imagen || item.blob;

                // Intentar compresión solo en fotos operativas
                if (blobAEnviar && !esFirma) {
                    try {
                        blobAEnviar = await comprimirBlob(blobAEnviar, 1280, 0.75);
                    } catch (errComp) {
                        console.warn('[SyncQueue Warning]: Falló la compresión, enviando original.', errComp);
                    }
                }

                if (!blobAEnviar) continue;

                const formData = new FormData();
                formData.append('servicio_id', item.servicio_id);
                formData.append('expediente', expedienteFinal);
                formData.append('tipo', item.tipo_foto || 'EVIDENCIA');
                formData.append('timestamp_captura', item.timestamp || new Date().toISOString());
                formData.append('file', blobAEnviar, `${item.tipo_foto || 'evidencia'}_${item.servicio_id}.${esFirma ? 'png' : 'jpg'}`);

                const response = await fetch(SUBIR_EVIDENCIA_URL, {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    const rawText = await response.text(); 
                    try {
                        const data = JSON.parse(rawText);
                        if (data.success) {
                            await db.evidencias_fotos.update(item.id, { subido: 1 });
                            console.log(`[SyncQueue]: Evidencia ${item.tipo_foto} subida a S3 con éxito`);
                        } else {
                            console.warn(`[SyncQueue PHP S3]: ${data.message}`);
                        }
                    } catch (parseError) {
                        console.error('[SyncQueue Parse Error]: PHP no devolvió JSON válido:', rawText);
                    }
                } else {
                    console.error(`[SyncQueue]: HTTP Error al subir evidencia: ${response.status}`);
                }
            } catch (errItem) {
                console.error(`[SyncQueue Error - Evidencia #${item.id}]:`, errItem);
            }
        }
    } catch (err) {
        console.error('[SyncQueue Error - Evidencias]:', err);
    } finally {
        // Liberar el candado y verificar si quedaron peticiones pendientes encoladas
        isSyncing = false; 
        
        if (syncRequested) {
            console.log('[SyncQueue]: Petición encolada detectada. Re-ejecutando...');
            sincronizarTodoPendiente();
        }
    }
};

window.addEventListener('online', () => {
    sincronizarTodoPendiente();
});