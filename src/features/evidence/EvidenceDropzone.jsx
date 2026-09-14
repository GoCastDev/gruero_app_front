// import { useState, useEffect, useRef } from 'react';
// import imageCompression from 'browser-image-compression';
// import { Camera, Image as ImageIcon, Trash2, CheckCircle2, Loader2, Eraser, AlertTriangle } from 'lucide-react';
// import { db } from '../../db/schema';
// import { useServiceStore, ESTADOS_SERVICIO } from '../../store/useServiceStore';

// export function EvidenceDropzone() {
//   const estadoActual = useServiceStore((state) => state.estadoActual);
//   const servicioActivo = useServiceStore((state) => state.servicioActivo);
//   const avanzarEstado = useServiceStore((state) => state.avanzarEstado);

//   const [fotos, setFotos] = useState([]);
//   const [comprimiendo, setComprimiendo] = useState(false);
//   const [mensajeEstado, setMensajeEstado] = useState('');

//   // Referencias para disparar los inputs de Cámara y Galería independientemente
//   const cameraInputRef = useRef(null);
//   const galleryInputRef = useRef(null);

//   // Ref y Estados de la Firma
//   const canvasRef = useRef(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [hayFirma, setHayFirma] = useState(false);

//   const cargarFotosLocales = async () => {
//     if (!servicioActivo) return;
//     try {
//       const fotosGuardadas = await db.evidencias_fotos
//         .where('servicio_id')
//         .equals(servicioActivo.id)
//         .toArray();

//       const fotosConUrl = fotosGuardadas.map((foto) => ({
//         ...foto,
//         previewUrl: URL.createObjectURL(foto.blob_imagen)
//       }));

//       setFotos(fotosConUrl);
//     } catch (error) {
//       console.error('Error al cargar fotos de IndexedDB:', error);
//     }
//   };

//   useEffect(() => {
//     if (estadoActual === ESTADOS_SERVICIO.PENDIENTE_EVIDENCIA && servicioActivo) {
//       cargarFotosLocales();
//     }
//     return () => {
//       fotos.forEach((foto) => URL.revokeObjectURL(foto.previewUrl));
//     };
//   }, [servicioActivo?.id, estadoActual]);

//   if (estadoActual !== ESTADOS_SERVICIO.PENDIENTE_EVIDENCIA || !servicioActivo) {
//     return null;
//   }

//   // Lógica del Canvas de Firma (Touch / Mouse)
//   const startDrawing = (e) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     const rect = canvas.getBoundingClientRect();
//     const clientX = e.touches ? e.touches[0].clientX : e.clientX;
//     const clientY = e.touches ? e.touches[0].clientY : e.clientY;

//     ctx.beginPath();
//     ctx.moveTo(clientX - rect.left, clientY - rect.top);
//     setIsDrawing(true);
//     setHayFirma(true);
//   };

//   const draw = (e) => {
//     if (!isDrawing) return;
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     const rect = canvas.getBoundingClientRect();
//     const clientX = e.touches ? e.touches[0].clientX : e.clientX;
//     const clientY = e.touches ? e.touches[0].clientY : e.clientY;

//     ctx.lineWidth = 3;
//     ctx.lineCap = 'round';
//     ctx.strokeStyle = '#FF8C00';
//     ctx.lineTo(clientX - rect.left, clientY - rect.top);
//     ctx.stroke();
//   };

//   const stopDrawing = () => {
//     setIsDrawing(false);
//   };

//   const limpiarFirma = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     setHayFirma(false);
//   };

//   const handleSeleccionarArchivos = async (event) => {
//     const archivos = Array.from(event.target.files || []);
//     if (archivos.length === 0) return;

//     setComprimiendo(true);
//     setMensajeEstado('Comprimiendo...');

//     const opcionesCompresion = {
//       maxSizeMB: 0.6,
//       maxWidthOrHeight: 1280,
//       useWebWorker: true,
//       fileType: 'image/jpeg'
//     };

//     try {
//       for (const archivo of archivos) {
//         const archivoComprimido = await imageCompression(archivo, opcionesCompresion);
//         await db.evidencias_fotos.add({
//           servicio_id: servicioActivo.id,
//           tipo_foto: 'EVIDENCIA_OPERATIVA',
//           blob_imagen: archivoComprimido,
//           subido: 0,
//           timestamp: new Date().toISOString()
//         });
//       }
//       await cargarFotosLocales();
//     } catch (error) {
//       console.error('Error al guardar imágenes:', error);
//     } finally {
//       setComprimiendo(false);
//       event.target.value = '';
//     }
//   };

//   const handleEliminarFoto = async (id) => {
//     await db.evidencias_fotos.delete(id);
//     await cargarFotosLocales();
//   };

//   // Validación: Al menos 1 foto Y la firma realizada
//   const puedeFinalizar = fotos.length > 0 && hayFirma;

//   const handleProcesarCierre = () => {
//     if (!puedeFinalizar) return;
//     avanzarEstado('EXITO_SERVICIO');
//   };

//   return (
//     <div className="bg-[var(--bg-card)] border-t border-[var(--bg-card-border)] p-4 space-y-5 max-w-md mx-auto pb-24 transition-colors">

//       {/* Header Cierre */}
//       <div className="flex items-center justify-between">
//         <h3 className="text-base font-bold text-[var(--text-main)] uppercase tracking-wide">
//           Cierre de Servicio
//         </h3>
//         <span
//           className={`text-xs font-bold px-2.5 py-1 rounded-md border transition-all ${
//             puedeFinalizar
//               ? 'text-[var(--color-tertiary)] bg-[var(--color-tertiary)]/10 border-[var(--color-tertiary)]/30'
//               : 'text-[var(--color-primary)] bg-[var(--color-primary)]/10 border-[var(--color-primary)]/20'
//           }`}
//         >
//           {puedeFinalizar ? '✓ Requisitos Listos' : 'Evidencia Requerida'}
//         </span>
//       </div>

//       {/* 1. Evidencia Fotográfica */}
//       <div className="space-y-2">
//         <div className="flex justify-between items-center">
//           <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
//             1. Fotos del Trabajo (Mínimo 1)
//           </p>
//           <span className="text-[10px] font-bold text-[var(--text-muted)]">
//             {fotos.length} capturada(s)
//           </span>
//         </div>

//         {/* Inputs Ocultos */}
//         <input
//           ref={cameraInputRef}
//           type="file"
//           accept="image/*"
//           capture="environment"
//           onChange={handleSeleccionarArchivos}
//           disabled={comprimiendo}
//           className="hidden"
//         />
//         <input
//           ref={galleryInputRef}
//           type="file"
//           accept="image/*"
//           multiple
//           onChange={handleSeleccionarArchivos}
//           disabled={comprimiendo}
//           className="hidden"
//         />

//         {/* Dos Opciones Claras: CÁMARA o GALERÍA */}
//         {comprimiendo ? (
//           <div className="border-2 border-dashed border-[var(--bg-card-border)] bg-[var(--bg-main)] rounded-xl p-5 flex items-center justify-center gap-2 text-[var(--color-primary)] text-xs font-bold">
//             <Loader2 className="w-5 h-5 animate-spin" />
//             <span>{mensajeEstado}</span>
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 gap-3">
//             <button
//               type="button"
//               onClick={() => cameraInputRef.current?.click()}
//               className="border-2 border-dashed border-[var(--bg-card-border)] hover:border-[var(--color-primary)] bg-[var(--bg-main)] rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all text-center"
//             >
//               <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center">
//                 <Camera className="w-5 h-5" />
//               </div>
//               <div>
//                 <p className="font-bold text-xs text-[var(--text-main)]">Tomar Foto</p>
//                 <p className="text-[10px] text-[var(--text-muted)]">Abrir cámara directo</p>
//               </div>
//             </button>

//             <button
//               type="button"
//               onClick={() => galleryInputRef.current?.click()}
//               className="border-2 border-dashed border-[var(--bg-card-border)] hover:border-[var(--color-tertiary)] bg-[var(--bg-main)] rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all text-center"
//             >
//               <div className="w-10 h-10 rounded-full bg-[var(--color-tertiary)]/10 text-[var(--color-tertiary)] flex items-center justify-center">
//                 <ImageIcon className="w-5 h-5" />
//               </div>
//               <div>
//                 <p className="font-bold text-xs text-[var(--text-main)]">Galería</p>
//                 <p className="text-[10px] text-[var(--text-muted)]">Elegir de fotos</p>
//               </div>
//             </button>
//           </div>
//         )}

//         {fotos.length > 0 && (
//           <div className="grid grid-cols-3 gap-2 pt-2">
//             {fotos.map((foto) => (
//               <div
//                 key={foto.id}
//                 className="relative aspect-square rounded-lg overflow-hidden bg-[var(--bg-main)] border border-[var(--bg-card-border)]"
//               >
//                 <img src={foto.previewUrl} alt="Evidencia" className="w-full h-full object-cover" />
//                 <button
//                   onClick={() => handleEliminarFoto(foto.id)}
//                   className="absolute bottom-1 right-1 bg-rose-950/90 text-rose-200 p-1 rounded-md active:scale-90 transition-all"
//                 >
//                   <Trash2 className="w-3.5 h-3.5" />
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* 2. Firma del Cliente */}
//       <div className="space-y-2">
//         <div className="flex justify-between items-center">
//           <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
//             2. Firma Digital del Cliente
//           </p>
//           {hayFirma && (
//             <button
//               onClick={limpiarFirma}
//               className="flex items-center gap-1 text-[11px] font-bold text-[var(--text-muted)] hover:text-rose-400 transition-colors"
//             >
//               <Eraser className="w-3 h-3" /> Limpiar Trazo
//             </button>
//           )}
//         </div>

//         <div className="bg-[var(--bg-main)] border border-[var(--bg-card-border)] rounded-xl overflow-hidden touch-none relative">
//           {!hayFirma && (
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
//               Firme aquí con el dedo
//             </div>
//           )}
//           <canvas
//             ref={canvasRef}
//             width={340}
//             height={130}
//             onMouseDown={startDrawing}
//             onMouseMove={draw}
//             onMouseUp={stopDrawing}
//             onTouchStart={startDrawing}
//             onTouchMove={draw}
//             onTouchEnd={stopDrawing}
//             className="w-full h-32 cursor-crosshair relative z-10"
//           />
//         </div>
//       </div>

//       {/* Botón Principal (Condicionado / Desbloqueado) */}
//       <button
//         onClick={handleProcesarCierre}
//         disabled={!puedeFinalizar}
//         className={`w-full py-4 font-black text-sm uppercase rounded-xl transition-all flex items-center justify-center gap-2 min-h-[52px] ${
//           puedeFinalizar
//             ? 'bg-[var(--color-primary)] text-slate-950 shadow-xl shadow-[var(--color-primary)]/20 hover:opacity-90 active:scale-95 cursor-pointer'
//             : 'bg-[var(--bg-main)] text-[var(--text-muted)] border border-[var(--bg-card-border)] cursor-not-allowed opacity-60'
//         }`}
//       >
//         <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
//         <span>Guardar y Finalizar Servicio</span>
//       </button>

//       {/* Cartel Indicativo si está bloqueado */}
//       {!puedeFinalizar && (
//         <div className="flex items-center justify-center gap-2 text-[11px] font-bold text-amber-500 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 text-center animate-in fade-in duration-200">
//           <AlertTriangle className="w-4 h-4 shrink-0" />
//           <span>
//             {!fotos.length && !hayFirma
//               ? 'Obligatorio: Toma al menos 1 foto y registra la firma del cliente.'
//               : !fotos.length
//               ? 'Obligatorio: Toma al menos 1 foto como evidencia.'
//               : 'Obligatorio: Solicita la firma digital al cliente.'}
//           </span>
//         </div>
//       )}

//     </div>
//   );
// }

// import { useState, useEffect, useRef } from 'react';
// import imageCompression from 'browser-image-compression';
// import { Camera, Image as ImageIcon, Trash2, CheckCircle2, Loader2, Eraser, AlertTriangle, FileText, User, UserCheck } from 'lucide-react';
// import { db } from '../../db/schema';
// import { useServiceStore, ESTADOS_SERVICIO } from '../../store/useServiceStore';

// export function EvidenceDropzone() {
//   const estadoActual = useServiceStore((state) => state.estadoActual);
//   const servicioActivo = useServiceStore((state) => state.servicioActivo);
//   const avanzarEstado = useServiceStore((state) => state.avanzarEstado);

//   const [fotos, setFotos] = useState([]);
//   const [comprimiendo, setComprimiendo] = useState(false);
//   const [mensajeEstado, setMensajeEstado] = useState('');

//   // Referencias para disparar los inputs de Cámara y Galería
//   const cameraInputRef = useRef(null);
//   const galleryInputRef = useRef(null);

//   // Refs y Estados para Firma del Cliente
//   const canvasClienteRef = useRef(null);
//   const [isDrawingCliente, setIsDrawingCliente] = useState(false);
//   const [hayFirmaCliente, setHayFirmaCliente] = useState(false);

//   // Refs y Estados para Firma del Gruero
//   const canvasGrueroRef = useRef(null);
//   const [isDrawingGruero, setIsDrawingGruero] = useState(false);
//   const [hayFirmaGruero, setHayFirmaGruero] = useState(false);

//   const cargarFotosLocales = async () => {
//     if (!servicioActivo) return;
//     try {
//       const fotosGuardadas = await db.evidencias_fotos
//         .where('servicio_id')
//         .equals(servicioActivo.id)
//         .toArray();

//       const fotosConUrl = fotosGuardadas.map((foto) => ({
//         ...foto,
//         previewUrl: URL.createObjectURL(foto.blob_imagen)
//       }));

//       setFotos(fotosConUrl);
//     } catch (error) {
//       console.error('Error al cargar fotos de IndexedDB:', error);
//     }
//   };

//   useEffect(() => {
//     if (estadoActual === ESTADOS_SERVICIO.PENDIENTE_EVIDENCIA && servicioActivo) {
//       cargarFotosLocales();
//     }
//     return () => {
//       fotos.forEach((foto) => URL.revokeObjectURL(foto.previewUrl));
//     };
//   }, [servicioActivo?.id, estadoActual]);

//   if (estadoActual !== ESTADOS_SERVICIO.PENDIENTE_EVIDENCIA || !servicioActivo) {
//     return null;
//   }

//   // Lógica genérica de trazo para Canvas
//   const startDrawing = (e, canvasRef, setIsDrawing, setHayFirma) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     const rect = canvas.getBoundingClientRect();
//     const clientX = e.touches ? e.touches[0].clientX : e.clientX;
//     const clientY = e.touches ? e.touches[0].clientY : e.clientY;

//     ctx.beginPath();
//     ctx.moveTo(clientX - rect.left, clientY - rect.top);
//     setIsDrawing(true);
//     setHayFirma(true);
//   };

//   const draw = (e, canvasRef, isDrawing) => {
//     if (!isDrawing) return;
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     const rect = canvas.getBoundingClientRect();
//     const clientX = e.touches ? e.touches[0].clientX : e.clientX;
//     const clientY = e.touches ? e.touches[0].clientY : e.clientY;

//     ctx.lineWidth = 3;
//     ctx.lineCap = 'round';
//     ctx.strokeStyle = '#FF8C00';
//     ctx.lineTo(clientX - rect.left, clientY - rect.top);
//     ctx.stroke();
//   };

//   const limpiarCanvas = (canvasRef, setHayFirma) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     setHayFirma(false);
//   };

//   const handleSeleccionarArchivos = async (event) => {
//     const archivos = Array.from(event.target.files || []);
//     if (archivos.length === 0) return;

//     setComprimiendo(true);
//     setMensajeEstado('Comprimiendo...');

//     const opcionesCompresion = {
//       maxSizeMB: 0.6,
//       maxWidthOrHeight: 1280,
//       useWebWorker: true,
//       fileType: 'image/jpeg'
//     };

//     try {
//       for (const archivo of archivos) {
//         const archivoComprimido = await imageCompression(archivo, opcionesCompresion);
//         await db.evidencias_fotos.add({
//           servicio_id: servicioActivo.id,
//           tipo_foto: 'EVIDENCIA_OPERATIVA',
//           blob_imagen: archivoComprimido,
//           subido: 0,
//           timestamp: new Date().toISOString()
//         });
//       }
//       await cargarFotosLocales();
//     } catch (error) {
//       console.error('Error al guardar imágenes:', error);
//     } finally {
//       setComprimiendo(false);
//       event.target.value = '';
//     }
//   };

//   const handleEliminarFoto = async (id) => {
//     await db.evidencias_fotos.delete(id);
//     await cargarFotosLocales();
//   };

//   // Validación: Se requiere al menos 1 foto Y ambas firmas
//   const puedeFinalizar = fotos.length > 0 && hayFirmaCliente && hayFirmaGruero;

//   const handleProcesarCierre = () => {
//     if (!puedeFinalizar) return;
//     avanzarEstado(ESTADOS_SERVICIO.EXITO_SERVICIO);
//   };

//   return (
//     <div className="bg-[var(--bg-card)] border border-[var(--bg-card-border)] rounded-2xl p-4 space-y-5 max-w-md mx-auto my-auto w-full shadow-2xl transition-colors">

//       {/* Header Cierre */}
//       <div className="flex items-center justify-between border-b border-[var(--bg-card-border)] pb-3">
//         <h3 className="text-base font-black text-[var(--text-main)] uppercase tracking-wide">
//           Cierre de Servicio
//         </h3>
//         <span
//           className={`text-[10px] font-bold px-2.5 py-1 rounded-md border transition-all uppercase ${
//             puedeFinalizar
//               ? 'text-[var(--color-tertiary)] bg-[var(--color-tertiary)]/10 border-[var(--color-tertiary)]/30'
//               : 'text-[var(--color-primary)] bg-[var(--color-primary)]/10 border-[var(--color-primary)]/20'
//           }`}
//         >
//           {puedeFinalizar ? '✓ Requisitos Listos' : 'Evidencia Requerida'}
//         </span>
//       </div>

//       {/* 1. Evidencia Fotográfica */}
//       <div className="space-y-2 text-left">
//         <div className="flex justify-between items-center">
//           <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
//             1. Fotos del Trabajo (Mínimo 1)
//           </p>
//           <span className="text-[10px] font-bold text-[var(--text-muted)]">
//             {fotos.length} capturada(s)
//           </span>
//         </div>

//         <input
//           ref={cameraInputRef}
//           type="file"
//           accept="image/*"
//           capture="environment"
//           onChange={handleSeleccionarArchivos}
//           disabled={comprimiendo}
//           className="hidden"
//         />
//         <input
//           ref={galleryInputRef}
//           type="file"
//           accept="image/*"
//           multiple
//           onChange={handleSeleccionarArchivos}
//           disabled={comprimiendo}
//           className="hidden"
//         />

//         {comprimiendo ? (
//           <div className="border-2 border-dashed border-[var(--bg-card-border)] bg-[var(--bg-main)] rounded-xl p-5 flex items-center justify-center gap-2 text-[var(--color-primary)] text-xs font-bold">
//             <Loader2 className="w-5 h-5 animate-spin" />
//             <span>{mensajeEstado}</span>
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 gap-3">
//             <button
//               type="button"
//               onClick={() => cameraInputRef.current?.click()}
//               className="border-2 border-dashed border-[var(--bg-card-border)] hover:border-[var(--color-primary)] bg-[var(--bg-main)] rounded-xl p-3.5 flex flex-col items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all text-center"
//             >
//               <div className="w-9 h-9 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center">
//                 <Camera className="w-4 h-4" />
//               </div>
//               <div>
//                 <p className="font-bold text-xs text-[var(--text-main)]">Tomar Foto</p>
//                 <p className="text-[9px] text-[var(--text-muted)]">Cámara directo</p>
//               </div>
//             </button>

//             <button
//               type="button"
//               onClick={() => galleryInputRef.current?.click()}
//               className="border-2 border-dashed border-[var(--bg-card-border)] hover:border-[var(--color-tertiary)] bg-[var(--bg-main)] rounded-xl p-3.5 flex flex-col items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all text-center"
//             >
//               <div className="w-9 h-9 rounded-full bg-[var(--color-tertiary)]/10 text-[var(--color-tertiary)] flex items-center justify-center">
//                 <ImageIcon className="w-4 h-4" />
//               </div>
//               <div>
//                 <p className="font-bold text-xs text-[var(--text-main)]">Galería</p>
//                 <p className="text-[9px] text-[var(--text-muted)]">Subir de fotos</p>
//               </div>
//             </button>
//           </div>
//         )}

//         {fotos.length > 0 && (
//           <div className="grid grid-cols-3 gap-2 pt-1">
//             {fotos.map((foto) => (
//               <div
//                 key={foto.id}
//                 className="relative aspect-square rounded-lg overflow-hidden bg-[var(--bg-main)] border border-[var(--bg-card-border)]"
//               >
//                 <img src={foto.previewUrl} alt="Evidencia" className="w-full h-full object-cover" />
//                 <button
//                   type="button"
//                   onClick={() => handleEliminarFoto(foto.id)}
//                   className="absolute bottom-1 right-1 bg-rose-950/90 text-rose-200 p-1 rounded-md active:scale-90 transition-all"
//                 >
//                   <Trash2 className="w-3.5 h-3.5" />
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* 2. Texto de Acuerdo / Conformidad Legal */}
//       <div className="bg-[var(--bg-main)] p-3 rounded-xl border border-[var(--bg-card-border)] text-left space-y-1">
//         <div className="flex items-center gap-1.5 text-[var(--color-primary)] font-bold text-[10px] uppercase tracking-wider">
//           <FileText className="w-3.5 h-3.5" />
//           <span>Acuerdo de Conformidad y Entrega</span>
//         </div>
//         <p className="text-[11px] text-[var(--text-muted)] leading-snug">
//           Al firmar este documento, el cliente declara haber recibido el vehículo trasladado a entera satisfacción y sin daños adicionales. El operador de grúa certifica la finalización conforme a los protocolos del servicio.
//         </p>
//       </div>

//       {/* 3. Firma Digital del Cliente */}
//       <div className="space-y-2 text-left">
//         <div className="flex justify-between items-center">
//           <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5">
//             <User className="w-3.5 h-3.5 text-[var(--color-tertiary)]" />
//             3. Firma del Cliente ({servicioActivo.cliente?.nombre})
//           </p>
//           {hayFirmaCliente && (
//             <button
//               type="button"
//               onClick={() => limpiarCanvas(canvasClienteRef, setHayFirmaCliente)}
//               className="flex items-center gap-1 text-[10px] font-bold text-[var(--text-muted)] hover:text-rose-400 transition-colors"
//             >
//               <Eraser className="w-3 h-3" /> Limpiar
//             </button>
//           )}
//         </div>

//         <div className="bg-[var(--bg-main)] border border-[var(--bg-card-border)] rounded-xl overflow-hidden touch-none relative">
//           {!hayFirmaCliente && (
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
//               Firma del cliente aquí
//             </div>
//           )}
//           <canvas
//             ref={canvasClienteRef}
//             width={340}
//             height={110}
//             onMouseDown={(e) => startDrawing(e, canvasClienteRef, setIsDrawingCliente, setHayFirmaCliente)}
//             onMouseMove={(e) => draw(e, canvasClienteRef, isDrawingCliente)}
//             onMouseUp={() => setIsDrawingCliente(false)}
//             onTouchStart={(e) => startDrawing(e, canvasClienteRef, setIsDrawingCliente, setHayFirmaCliente)}
//             onTouchMove={(e) => draw(e, canvasClienteRef, isDrawingCliente)}
//             onTouchEnd={() => setIsDrawingCliente(false)}
//             className="w-full h-28 cursor-crosshair relative z-10"
//           />
//         </div>
//       </div>

//       {/* 4. Firma Digital del Gruero */}
//       <div className="space-y-2 text-left">
//         <div className="flex justify-between items-center">
//           <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5">
//             <UserCheck className="w-3.5 h-3.5 text-[var(--color-primary)]" />
//             4. Firma del Gruero / Operador
//           </p>
//           {hayFirmaGruero && (
//             <button
//               type="button"
//               onClick={() => limpiarCanvas(canvasGrueroRef, setHayFirmaGruero)}
//               className="flex items-center gap-1 text-[10px] font-bold text-[var(--text-muted)] hover:text-rose-400 transition-colors"
//             >
//               <Eraser className="w-3 h-3" /> Limpiar
//             </button>
//           )}
//         </div>

//         <div className="bg-[var(--bg-main)] border border-[var(--bg-card-border)] rounded-xl overflow-hidden touch-none relative">
//           {!hayFirmaGruero && (
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
//               Firma del operador aquí
//             </div>
//           )}
//           <canvas
//             ref={canvasGrueroRef}
//             width={340}
//             height={110}
//             onMouseDown={(e) => startDrawing(e, canvasGrueroRef, setIsDrawingGruero, setHayFirmaGruero)}
//             onMouseMove={(e) => draw(e, canvasGrueroRef, isDrawingGruero)}
//             onMouseUp={() => setIsDrawingGruero(false)}
//             onTouchStart={(e) => startDrawing(e, canvasGrueroRef, setIsDrawingGruero, setHayFirmaGruero)}
//             onTouchMove={(e) => draw(e, canvasGrueroRef, isDrawingGruero)}
//             onTouchEnd={() => setIsDrawingGruero(false)}
//             className="w-full h-28 cursor-crosshair relative z-10"
//           />
//         </div>
//       </div>

//       {/* Botón Principal (Condicionado) */}
//       <button
//         type="button"
//         onClick={handleProcesarCierre}
//         disabled={!puedeFinalizar}
//         className={`w-full py-4 font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 min-h-[50px] ${
//           puedeFinalizar
//             ? 'bg-[var(--color-primary)] text-slate-950 shadow-xl shadow-[var(--color-primary)]/20 hover:opacity-90 active:scale-95 cursor-pointer'
//             : 'bg-[var(--bg-main)] text-[var(--text-muted)] border border-[var(--bg-card-border)] cursor-not-allowed opacity-60'
//         }`}
//       >
//         <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
//         <span>Guardar y Finalizar Servicio</span>
//       </button>

//       {/* Cartel Indicativo de Requisitos */}
//       {!puedeFinalizar && (
//         <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-amber-500 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 text-center">
//           <AlertTriangle className="w-4 h-4 shrink-0" />
//           <span>
//             {!fotos.length
//               ? 'Se requiere al menos 1 foto de evidencia.'
//               : !hayFirmaCliente
//               ? 'Se requiere la firma del cliente.'
//               : 'Se requiere la firma del operador.'}
//           </span>
//         </div>
//       )}

//     </div>
//   );
// }

// import { useState, useEffect, useRef } from 'react';
// import imageCompression from 'browser-image-compression';
// import { Camera, Image as ImageIcon, Trash2, CheckCircle2, Loader2, Eraser, AlertTriangle, FileText, User, UserCheck } from 'lucide-react';
// import { db } from '../../db/schema';
// import { useServiceStore, ESTADOS_SERVICIO } from '../../store/useServiceStore';

// export function EvidenceDropzone() {
//   const estadoActual = useServiceStore((state) => state.estadoActual);
//   const servicioActivo = useServiceStore((state) => state.servicioActivo);
//   const avanzarEstado = useServiceStore((state) => state.avanzarEstado);

//   const [fotos, setFotos] = useState([]);
//   const [comprimiendo, setComprimiendo] = useState(false);
//   const [mensajeEstado, setMensajeEstado] = useState('');

//   // Referencias para disparar los inputs de Cámara y Galería
//   const cameraInputRef = useRef(null);
//   const galleryInputRef = useRef(null);

//   // Refs y Estados para Firma del Cliente
//   const canvasClienteRef = useRef(null);
//   const [isDrawingCliente, setIsDrawingCliente] = useState(false);
//   const [hayFirmaCliente, setHayFirmaCliente] = useState(false);

//   // Refs y Estados para Firma del Gruero
//   const canvasGrueroRef = useRef(null);
//   const [isDrawingGruero, setIsDrawingGruero] = useState(false);
//   const [hayFirmaGruero, setHayFirmaGruero] = useState(false);

//   const cargarFotosLocales = async () => {
//     if (!servicioActivo) return;
//     try {
//       const fotosGuardadas = await db.evidencias_fotos
//         .where('servicio_id')
//         .equals(servicioActivo.id)
//         .toArray();

//       const fotosConUrl = fotosGuardadas.map((foto) => ({
//         ...foto,
//         previewUrl: URL.createObjectURL(foto.blob_imagen)
//       }));

//       setFotos(fotosConUrl);
//     } catch (error) {
//       console.error('Error al cargar fotos de IndexedDB:', error);
//     }
//   };

//   useEffect(() => {
//     if (estadoActual === ESTADOS_SERVICIO.PENDIENTE_EVIDENCIA && servicioActivo) {
//       cargarFotosLocales();
//     }
//     return () => {
//       fotos.forEach((foto) => URL.revokeObjectURL(foto.previewUrl));
//     };
//   }, [servicioActivo?.id, estadoActual]);

//   if (estadoActual !== ESTADOS_SERVICIO.PENDIENTE_EVIDENCIA || !servicioActivo) {
//     return null;
//   }

//   // Lógica genérica de trazo para Canvas
//   const startDrawing = (e, canvasRef, setIsDrawing, setHayFirma) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     const rect = canvas.getBoundingClientRect();
//     const clientX = e.touches ? e.touches[0].clientX : e.clientX;
//     const clientY = e.touches ? e.touches[0].clientY : e.clientY;

//     ctx.beginPath();
//     ctx.moveTo(clientX - rect.left, clientY - rect.top);
//     setIsDrawing(true);
//     setHayFirma(true);
//   };

//   const draw = (e, canvasRef, isDrawing) => {
//     if (!isDrawing) return;
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     const rect = canvas.getBoundingClientRect();
//     const clientX = e.touches ? e.touches[0].clientX : e.clientX;
//     const clientY = e.touches ? e.touches[0].clientY : e.clientY;

//     ctx.lineWidth = 3;
//     ctx.lineCap = 'round';
//     ctx.strokeStyle = '#FF8C00';
//     ctx.lineTo(clientX - rect.left, clientY - rect.top);
//     ctx.stroke();
//   };

//   const limpiarCanvas = (canvasRef, setHayFirma) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     setHayFirma(false);
//   };

//   const handleSeleccionarArchivos = async (event) => {
//     const archivos = Array.from(event.target.files || []);
//     if (archivos.length === 0) return;

//     setComprimiendo(true);
//     setMensajeEstado('Comprimiendo...');

//     const opcionesCompresion = {
//       maxSizeMB: 0.6,
//       maxWidthOrHeight: 1280,
//       useWebWorker: true,
//       fileType: 'image/jpeg'
//     };

//     try {
//       for (const archivo of archivos) {
//         const archivoComprimido = await imageCompression(archivo, opcionesCompresion);
//         await db.evidencias_fotos.add({
//           servicio_id: servicioActivo.id,
//           tipo_foto: 'EVIDENCIA_OPERATIVA',
//           blob_imagen: archivoComprimido,
//           subido: 0,
//           timestamp: new Date().toISOString()
//         });
//       }
//       await cargarFotosLocales();
//     } catch (error) {
//       console.error('Error al guardar imágenes:', error);
//     } finally {
//       setComprimiendo(false);
//       event.target.value = '';
//     }
//   };

//   const handleEliminarFoto = async (id) => {
//     await db.evidencias_fotos.delete(id);
//     await cargarFotosLocales();
//   };

//   // Validación: Se requiere al menos 3 fotos Y ambas firmas
//   const puedeFinalizar = fotos.length > 2 && hayFirmaCliente && hayFirmaGruero;

//   const handleProcesarCierre = () => {
//     if (!puedeFinalizar) return;
//     avanzarEstado(ESTADOS_SERVICIO.EXITO_SERVICIO);
//   };

//   return (
//     <div className="bg-[var(--bg-card)] border border-[var(--bg-card-border)] rounded-2xl p-4 space-y-5 max-w-md mx-auto my-auto w-full shadow-2xl transition-colors">

//       {/* Header Cierre */}
//       <div className="flex items-center justify-between border-b border-[var(--bg-card-border)] pb-3">
//         <h3 className="text-base font-black text-[var(--text-main)] uppercase tracking-wide">
//           Cierre de Servicio
//         </h3>
//         <span
//           className={`text-[10px] font-bold px-2.5 py-1 rounded-md border transition-all uppercase ${
//             puedeFinalizar
//               ? 'text-[var(--color-tertiary)] bg-[var(--color-tertiary)]/10 border-[var(--color-tertiary)]/30'
//               : 'text-[var(--color-primary)] bg-[var(--color-primary)]/10 border-[var(--color-primary)]/20'
//           }`}
//         >
//           {puedeFinalizar ? '✓ Requisitos Listos' : 'Evidencia Requerida'}
//         </span>
//       </div>

//       {/* 1. Evidencia Fotográfica */}
//       <div className="space-y-2 text-left">
//         <div className="flex justify-between items-center">
//           <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
//             1. Fotos del Trabajo (Mínimo 3)
//           </p>
//           <span className="text-[10px] font-bold text-[var(--text-muted)]">
//             {fotos.length} capturada(s)
//           </span>
//         </div>

//         <input
//           ref={cameraInputRef}
//           type="file"
//           accept="image/*"
//           capture="environment"
//           onChange={handleSeleccionarArchivos}
//           disabled={comprimiendo}
//           className="hidden"
//         />
//         <input
//           ref={galleryInputRef}
//           type="file"
//           accept="image/*"
//           multiple
//           onChange={handleSeleccionarArchivos}
//           disabled={comprimiendo}
//           className="hidden"
//         />

//         {comprimiendo ? (
//           <div className="border-2 border-dashed border-[var(--bg-card-border)] bg-[var(--bg-main)] rounded-xl p-5 flex items-center justify-center gap-2 text-[var(--color-primary)] text-xs font-bold">
//             <Loader2 className="w-5 h-5 animate-spin" />
//             <span>{mensajeEstado}</span>
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 gap-3">
//             <button
//               type="button"
//               onClick={() => cameraInputRef.current?.click()}
//               className="border-2 border-dashed border-[var(--bg-card-border)] hover:border-[var(--color-primary)] bg-[var(--bg-main)] rounded-xl p-3.5 flex flex-col items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all text-center"
//             >
//               <div className="w-9 h-9 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center">
//                 <Camera className="w-4 h-4" />
//               </div>
//               <div>
//                 <p className="font-bold text-xs text-[var(--text-main)]">Tomar Foto</p>
//                 <p className="text-[9px] text-[var(--text-muted)]">Cámara directo</p>
//               </div>
//             </button>

//             <button
//               type="button"
//               onClick={() => galleryInputRef.current?.click()}
//               className="border-2 border-dashed border-[var(--bg-card-border)] hover:border-[var(--color-tertiary)] bg-[var(--bg-main)] rounded-xl p-3.5 flex flex-col items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all text-center"
//             >
//               <div className="w-9 h-9 rounded-full bg-[var(--color-tertiary)]/10 text-[var(--color-tertiary)] flex items-center justify-center">
//                 <ImageIcon className="w-4 h-4" />
//               </div>
//               <div>
//                 <p className="font-bold text-xs text-[var(--text-main)]">Galería</p>
//                 <p className="text-[9px] text-[var(--text-muted)]">Subir de fotos</p>
//               </div>
//             </button>
//           </div>
//         )}

//         {fotos.length > 0 && (
//           <div className="grid grid-cols-3 gap-2 pt-1">
//             {fotos.map((foto) => (
//               <div
//                 key={foto.id}
//                 className="relative aspect-square rounded-lg overflow-hidden bg-[var(--bg-main)] border border-[var(--bg-card-border)]"
//               >
//                 <img src={foto.previewUrl} alt="Evidencia" className="w-full h-full object-cover" />
//                 <button
//                   type="button"
//                   onClick={() => handleEliminarFoto(foto.id)}
//                   className="absolute bottom-1 right-1 bg-rose-950/90 text-rose-200 p-1 rounded-md active:scale-90 transition-all"
//                 >
//                   <Trash2 className="w-3.5 h-3.5" />
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* 2. Texto de Acuerdo / Conformidad Legal */}
//       <div className="bg-[var(--bg-main)] p-3 rounded-xl border border-[var(--bg-card-border)] text-left space-y-1">
//         <div className="flex items-center gap-1.5 text-[var(--color-primary)] font-bold text-[10px] uppercase tracking-wider">
//           <FileText className="w-3.5 h-3.5" />
//           <span>Acuerdo de Conformidad y Entrega</span>
//         </div>
//         <p className="text-[11px] text-[var(--text-muted)] leading-snug">
//           Al firmar este documento, el cliente declara haber recibido el vehículo trasladado a entera satisfacción y sin daños adicionales. El operador de grúa certifica la finalización conforme a los protocolos del servicio.
//         </p>
//       </div>

//       {/* 3. Firma Digital del Cliente */}
//       <div className="space-y-2 text-left">
//         <div className="flex justify-between items-center">
//           <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5">
//             <User className="w-3.5 h-3.5 text-[var(--color-tertiary)]" />
//             3. Firma del Cliente ({servicioActivo.cliente?.nombre})
//           </p>
//           {hayFirmaCliente && (
//             <button
//               type="button"
//               onClick={() => limpiarCanvas(canvasClienteRef, setHayFirmaCliente)}
//               className="flex items-center gap-1 text-[10px] font-bold text-[var(--text-muted)] hover:text-rose-400 transition-colors"
//             >
//               <Eraser className="w-3 h-3" /> Limpiar
//             </button>
//           )}
//         </div>

//         <div className="bg-[var(--bg-main)] border border-[var(--bg-card-border)] rounded-xl overflow-hidden touch-none relative">
//           {!hayFirmaCliente && (
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
//               Firma del cliente aquí
//             </div>
//           )}
//           <canvas
//             ref={canvasClienteRef}
//             width={340}
//             height={110}
//             onMouseDown={(e) => startDrawing(e, canvasClienteRef, setIsDrawingCliente, setHayFirmaCliente)}
//             onMouseMove={(e) => draw(e, canvasClienteRef, isDrawingCliente)}
//             onMouseUp={() => setIsDrawingCliente(false)}
//             onTouchStart={(e) => startDrawing(e, canvasClienteRef, setIsDrawingCliente, setHayFirmaCliente)}
//             onTouchMove={(e) => draw(e, canvasClienteRef, isDrawingCliente)}
//             onTouchEnd={() => setIsDrawingCliente(false)}
//             className="w-full h-28 cursor-crosshair relative z-10"
//           />
//         </div>
//       </div>

//       {/* 4. Firma Digital del Gruero */}
//       <div className="space-y-2 text-left">
//         <div className="flex justify-between items-center">
//           <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5">
//             <UserCheck className="w-3.5 h-3.5 text-[var(--color-primary)]" />
//             4. Firma del Gruero / Operador
//           </p>
//           {hayFirmaGruero && (
//             <button
//               type="button"
//               onClick={() => limpiarCanvas(canvasGrueroRef, setHayFirmaGruero)}
//               className="flex items-center gap-1 text-[10px] font-bold text-[var(--text-muted)] hover:text-rose-400 transition-colors"
//             >
//               <Eraser className="w-3 h-3" /> Limpiar
//             </button>
//           )}
//         </div>

//         <div className="bg-[var(--bg-main)] border border-[var(--bg-card-border)] rounded-xl overflow-hidden touch-none relative">
//           {!hayFirmaGruero && (
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
//               Firma del operador aquí
//             </div>
//           )}
//           <canvas
//             ref={canvasGrueroRef}
//             width={340}
//             height={110}
//             onMouseDown={(e) => startDrawing(e, canvasGrueroRef, setIsDrawingGruero, setHayFirmaGruero)}
//             onMouseMove={(e) => draw(e, canvasGrueroRef, isDrawingGruero)}
//             onMouseUp={() => setIsDrawingGruero(false)}
//             onTouchStart={(e) => startDrawing(e, canvasGrueroRef, setIsDrawingGruero, setHayFirmaGruero)}
//             onTouchMove={(e) => draw(e, canvasGrueroRef, isDrawingGruero)}
//             onTouchEnd={() => setIsDrawingGruero(false)}
//             className="w-full h-28 cursor-crosshair relative z-10"
//           />
//         </div>
//       </div>

//       {/* Botón Principal (Condicionado) */}
//       <button
//         type="button"
//         onClick={handleProcesarCierre}
//         disabled={!puedeFinalizar}
//         className={`w-full py-4 font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 min-h-[50px] ${
//           puedeFinalizar
//             ? 'bg-[var(--color-primary)] text-slate-950 shadow-xl shadow-[var(--color-primary)]/20 hover:opacity-90 active:scale-95 cursor-pointer'
//             : 'bg-[var(--bg-main)] text-[var(--text-muted)] border border-[var(--bg-card-border)] cursor-not-allowed opacity-60'
//         }`}
//       >
//         <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
//         <span>Guardar y Finalizar Servicio</span>
//       </button>

//       {/* Cartel Indicativo de Requisitos */}
//       {!puedeFinalizar && (
//         <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-amber-500 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 text-center">
//           <AlertTriangle className="w-4 h-4 shrink-0" />
//           <span>
//             {!fotos.length
//               ? 'Se requiere al menos 1 foto de evidencia.'
//               : !hayFirmaCliente
//               ? 'Se requiere la firma del cliente.'
//               : 'Se requiere la firma del operador.'}
//           </span>
//         </div>
//       )}

//     </div>
//   );
// }   //// ULTIMO FUNCIONAMIENTO

// import { useState, useEffect, useRef } from 'react';
// import { Camera, Image as ImageIcon, Trash2, CheckCircle2, Loader2, Eraser, AlertTriangle, FileText, User, UserCheck } from 'lucide-react';
// import { db } from '../../db/schema';
// import { useServiceStore, ESTADOS_SERVICIO } from '../../store/useServiceStore';
// // import { procesarSincronizacionEvidencias } from '../../services/syncEvidencias';

// export function EvidenceDropzone() {
//   const estadoActual = useServiceStore((state) => state.estadoActual);
//   const servicioActivo = useServiceStore((state) => state.servicioActivo);
//   const avanzarEstado = useServiceStore((state) => state.avanzarEstado);

//   const [fotos, setFotos] = useState([]);
//   const [guardando, setGuardando] = useState(false);

//   const cameraInputRef = useRef(null);
//   const galleryInputRef = useRef(null);

//   const canvasClienteRef = useRef(null);
//   const [isDrawingCliente, setIsDrawingCliente] = useState(false);
//   const [hayFirmaCliente, setHayFirmaCliente] = useState(false);

//   const canvasGrueroRef = useRef(null);
//   const [isDrawingGruero, setIsDrawingGruero] = useState(false);
//   const [hayFirmaGruero, setHayFirmaGruero] = useState(false);

//   const cargarFotosLocales = async () => {
//     if (!servicioActivo) return;
//     try {
//       const fotosGuardadas = await db.evidencias_fotos
//         .where('servicio_id')
//         .equals(servicioActivo.id)
//         .toArray();

//       const fotosConUrl = fotosGuardadas.map((foto) => ({
//         ...foto,
//         previewUrl: URL.createObjectURL(foto.blob_imagen)
//       }));

//       setFotos(fotosConUrl);
//     } catch (error) {
//       console.error('Error al cargar fotos de IndexedDB:', error);
//     }
//   };

//   useEffect(() => {
//     if (estadoActual === ESTADOS_SERVICIO.PENDIENTE_EVIDENCIA && servicioActivo) {
//       cargarFotosLocales();
//     }
//     return () => {
//       fotos.forEach((foto) => URL.revokeObjectURL(foto.previewUrl));
//     };
//   }, [servicioActivo?.id, estadoActual]);

//   if (estadoActual !== ESTADOS_SERVICIO.PENDIENTE_EVIDENCIA || !servicioActivo) {
//     return null;
//   }

//   const startDrawing = (e, canvasRef, setIsDrawing, setHayFirma) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     const rect = canvas.getBoundingClientRect();
//     const clientX = e.touches ? e.touches[0].clientX : e.clientX;
//     const clientY = e.touches ? e.touches[0].clientY : e.clientY;

//     ctx.beginPath();
//     ctx.moveTo(clientX - rect.left, clientY - rect.top);
//     setIsDrawing(true);
//     setHayFirma(true);
//   };

//   const draw = (e, canvasRef, isDrawing) => {
//     if (!isDrawing) return;
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     const rect = canvas.getBoundingClientRect();
//     const clientX = e.touches ? e.touches[0].clientX : e.clientX;
//     const clientY = e.touches ? e.touches[0].clientY : e.clientY;

//     ctx.lineWidth = 3;
//     ctx.lineCap = 'round';
//     ctx.strokeStyle = '#FF8C00';
//     ctx.lineTo(clientX - rect.left, clientY - rect.top);
//     ctx.stroke();
//   };

//   const limpiarCanvas = (canvasRef, setHayFirma) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     setHayFirma(false);
//   };

//   // Guardado INSTANTÁNEO de fotos en IndexedDB sin compresión
//   const handleSeleccionarArchivos = async (event) => {
//     const archivos = Array.from(event.target.files || []);
//     if (archivos.length === 0) return;

//     setGuardando(true);

//     try {
//       for (const archivo of archivos) {
//         await db.evidencias_fotos.add({
//           servicio_id: servicioActivo.id,
//           tipo_foto: 'EVIDENCIA_OPERATIVA',
//           blob_imagen: archivo, // Guardamos el File/Blob puro
//           subido: 0,
//           timestamp: new Date().toISOString() // Preserva la fecha/hora exacta
//         });
//       }
//       await cargarFotosLocales();
//     } catch (error) {
//       console.error('Error al almacenar evidencia local:', error);
//     } finally {
//       setGuardando(false);
//       event.target.value = '';
//     }
//   };

//   const canvasToBlob = (canvas) => {
//     return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), 'image/png'));
//   };

//   const handleEliminarFoto = async (id) => {
//     await db.evidencias_fotos.delete(id);
//     await cargarFotosLocales();
//   };

//   const puedeFinalizar = fotos.length > 0 && hayFirmaCliente && hayFirmaGruero;

//   // Guarda firmas y dispara la cola de sincronización
//   const handleProcesarCierre = async () => {
//     if (!puedeFinalizar || guardando) return;
//     setGuardando(true);

//     try {
//       const timestampActual = new Date().toISOString();

//       // 1. Guardar Firma del Cliente en IndexedDB
//       if (canvasClienteRef.current) {
//         const blobFirmaCliente = await canvasToBlob(canvasClienteRef.current);
//         await db.evidencias_fotos.add({
//           servicio_id: servicioActivo.id,
//           tipo_foto: 'FIRMA_CLIENTE',
//           blob_imagen: blobFirmaCliente,
//           subido: 0,
//           timestamp: timestampActual
//         });
//       }

//       // 2. Guardar Firma del Gruero en IndexedDB
//       if (canvasGrueroRef.current) {
//         const blobFirmaGruero = await canvasToBlob(canvasGrueroRef.current);
//         await db.evidencias_fotos.add({
//           servicio_id: servicioActivo.id,
//           tipo_foto: 'FIRMA_GRUERO',
//           blob_imagen: blobFirmaGruero,
//           subido: 0,
//           timestamp: timestampActual
//         });
//       }

//       // 3. Avanzar estado a EXITO_SERVICIO
//       await avanzarEstado(ESTADOS_SERVICIO.EXITO_SERVICIO);

//       // 4. Intentar sincronización automática en segundo plano
//       procesarSincronizacionEvidencias();
//     } catch (err) {
//       console.error('Error al cerrar el servicio:', err);
//     } finally {
//       setGuardando(false);
//     }
//   };

//   return (
//     <div className="bg-[var(--bg-card)] border border-[var(--bg-card-border)] rounded-2xl p-4 space-y-5 max-w-md mx-auto my-auto w-full shadow-2xl transition-colors">

//       <div className="flex items-center justify-between border-b border-[var(--bg-card-border)] pb-3">
//         <h3 className="text-base font-black text-[var(--text-main)] uppercase tracking-wide">
//           Cierre de Servicio
//         </h3>
//         <span
//           className={`text-[10px] font-bold px-2.5 py-1 rounded-md border transition-all uppercase ${
//             puedeFinalizar
//               ? 'text-[var(--color-tertiary)] bg-[var(--color-tertiary)]/10 border-[var(--color-tertiary)]/30'
//               : 'text-[var(--color-primary)] bg-[var(--color-primary)]/10 border-[var(--color-primary)]/20'
//           }`}
//         >
//           {puedeFinalizar ? '✓ Requisitos Listos' : 'Evidencia Requerida'}
//         </span>
//       </div>

//       <div className="space-y-2 text-left">
//         <div className="flex justify-between items-center">
//           <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
//             1. Fotos del Trabajo (Mínimo 1)
//           </p>
//           <span className="text-[10px] font-bold text-[var(--text-muted)]">
//             {fotos.length} capturada(s)
//           </span>
//         </div>

//         <input
//           ref={cameraInputRef}
//           type="file"
//           accept="image/*"
//           capture="environment"
//           onChange={handleSeleccionarArchivos}
//           disabled={guardando}
//           className="hidden"
//         />
//         <input
//           ref={galleryInputRef}
//           type="file"
//           accept="image/*"
//           multiple
//           onChange={handleSeleccionarArchivos}
//           disabled={guardando}
//           className="hidden"
//         />

//         {guardando ? (
//           <div className="border-2 border-dashed border-[var(--bg-card-border)] bg-[var(--bg-main)] rounded-xl p-5 flex items-center justify-center gap-2 text-[var(--color-primary)] text-xs font-bold">
//             <Loader2 className="w-5 h-5 animate-spin" />
//             <span>Almacenando evidencias locales...</span>
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 gap-3">
//             <button
//               type="button"
//               onClick={() => cameraInputRef.current?.click()}
//               className="border-2 border-dashed border-[var(--bg-card-border)] hover:border-[var(--color-primary)] bg-[var(--bg-main)] rounded-xl p-3.5 flex flex-col items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all text-center"
//             >
//               <div className="w-9 h-9 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center">
//                 <Camera className="w-4 h-4" />
//               </div>
//               <div>
//                 <p className="font-bold text-xs text-[var(--text-main)]">Tomar Foto</p>
//                 <p className="text-[9px] text-[var(--text-muted)]">Cámara directo</p>
//               </div>
//             </button>

//             <button
//               type="button"
//               onClick={() => galleryInputRef.current?.click()}
//               className="border-2 border-dashed border-[var(--bg-card-border)] hover:border-[var(--color-tertiary)] bg-[var(--bg-main)] rounded-xl p-3.5 flex flex-col items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all text-center"
//             >
//               <div className="w-9 h-9 rounded-full bg-[var(--color-tertiary)]/10 text-[var(--color-tertiary)] flex items-center justify-center">
//                 <ImageIcon className="w-4 h-4" />
//               </div>
//               <div>
//                 <p className="font-bold text-xs text-[var(--text-main)]">Galería</p>
//                 <p className="text-[9px] text-[var(--text-muted)]">Subir de fotos</p>
//               </div>
//             </button>
//           </div>
//         )}

//         {fotos.length > 0 && (
//           <div className="grid grid-cols-3 gap-2 pt-1">
//             {fotos.map((foto) => (
//               <div
//                 key={foto.id}
//                 className="relative aspect-square rounded-lg overflow-hidden bg-[var(--bg-main)] border border-[var(--bg-card-border)]"
//               >
//                 <img src={foto.previewUrl} alt="Evidencia" className="w-full h-full object-cover" />
//                 <button
//                   type="button"
//                   onClick={() => handleEliminarFoto(foto.id)}
//                   className="absolute bottom-1 right-1 bg-rose-950/90 text-rose-200 p-1 rounded-md active:scale-90 transition-all"
//                 >
//                   <Trash2 className="w-3.5 h-3.5" />
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="bg-[var(--bg-main)] p-3 rounded-xl border border-[var(--bg-card-border)] text-left space-y-1">
//         <div className="flex items-center gap-1.5 text-[var(--color-primary)] font-bold text-[10px] uppercase tracking-wider">
//           <FileText className="w-3.5 h-3.5" />
//           <span>Acuerdo de Conformidad y Entrega</span>
//         </div>
//         <p className="text-[11px] text-[var(--text-muted)] leading-snug">
//           Al firmar este documento, el cliente declara haber recibido el vehículo trasladado a entera satisfacción y sin daños adicionales. El operador de grúa certifica la finalización conforme a los protocolos del servicio.
//         </p>
//       </div>

//       <div className="space-y-2 text-left">
//         <div className="flex justify-between items-center">
//           <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5">
//             <User className="w-3.5 h-3.5 text-[var(--color-tertiary)]" />
//             3. Firma del Cliente ({servicioActivo.cliente?.nombre})
//           </p>
//           {hayFirmaCliente && (
//             <button
//               type="button"
//               onClick={() => limpiarCanvas(canvasClienteRef, setHayFirmaCliente)}
//               className="flex items-center gap-1 text-[10px] font-bold text-[var(--text-muted)] hover:text-rose-400 transition-colors"
//             >
//               <Eraser className="w-3 h-3" /> Limpiar
//             </button>
//           )}
//         </div>

//         <div className="bg-[var(--bg-main)] border border-[var(--bg-card-border)] rounded-xl overflow-hidden touch-none relative">
//           {!hayFirmaCliente && (
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
//               Firma del cliente aquí
//             </div>
//           )}
//           <canvas
//             ref={canvasClienteRef}
//             width={340}
//             height={110}
//             onMouseDown={(e) => startDrawing(e, canvasClienteRef, setIsDrawingCliente, setHayFirmaCliente)}
//             onMouseMove={(e) => draw(e, canvasClienteRef, isDrawingCliente)}
//             onMouseUp={() => setIsDrawingCliente(false)}
//             onTouchStart={(e) => startDrawing(e, canvasClienteRef, setIsDrawingCliente, setHayFirmaCliente)}
//             onTouchMove={(e) => draw(e, canvasClienteRef, isDrawingCliente)}
//             onTouchEnd={() => setIsDrawingCliente(false)}
//             className="w-full h-28 cursor-crosshair relative z-10"
//           />
//         </div>
//       </div>

//       <div className="space-y-2 text-left">
//         <div className="flex justify-between items-center">
//           <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5">
//             <UserCheck className="w-3.5 h-3.5 text-[var(--color-primary)]" />
//             4. Firma del Gruero / Operador
//           </p>
//           {hayFirmaGruero && (
//             <button
//               type="button"
//               onClick={() => limpiarCanvas(canvasGrueroRef, setHayFirmaGruero)}
//               className="flex items-center gap-1 text-[10px] font-bold text-[var(--text-muted)] hover:text-rose-400 transition-colors"
//             >
//               <Eraser className="w-3 h-3" /> Limpiar
//             </button>
//           )}
//         </div>

//         <div className="bg-[var(--bg-main)] border border-[var(--bg-card-border)] rounded-xl overflow-hidden touch-none relative">
//           {!hayFirmaGruero && (
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
//               Firma del operador aquí
//             </div>
//           )}
//           <canvas
//             ref={canvasGrueroRef}
//             width={340}
//             height={110}
//             onMouseDown={(e) => startDrawing(e, canvasGrueroRef, setIsDrawingGruero, setHayFirmaGruero)}
//             onMouseMove={(e) => draw(e, canvasGrueroRef, isDrawingGruero)}
//             onMouseUp={() => setIsDrawingGruero(false)}
//             onTouchStart={(e) => startDrawing(e, canvasGrueroRef, setIsDrawingGruero, setHayFirmaGruero)}
//             onTouchMove={(e) => draw(e, canvasGrueroRef, isDrawingGruero)}
//             onTouchEnd={() => setIsDrawingGruero(false)}
//             className="w-full h-28 cursor-crosshair relative z-10"
//           />
//         </div>
//       </div>

//       <button
//         type="button"
//         onClick={handleProcesarCierre}
//         disabled={!puedeFinalizar || guardando}
//         className={`w-full py-4 font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 min-h-[50px] ${
//           puedeFinalizar && !guardando
//             ? 'bg-[var(--color-primary)] text-slate-950 shadow-xl shadow-[var(--color-primary)]/20 hover:opacity-90 active:scale-95 cursor-pointer'
//             : 'bg-[var(--bg-main)] text-[var(--text-muted)] border border-[var(--bg-card-border)] cursor-not-allowed opacity-60'
//         }`}
//       >
//         <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
//         <span>{guardando ? 'Procesando...' : 'Guardar y Finalizar Servicio'}</span>
//       </button>

//       {!puedeFinalizar && (
//         <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-amber-500 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 text-center">
//           <AlertTriangle className="w-4 h-4 shrink-0" />
//           <span>
//             {!fotos.length
//               ? 'Se requiere al menos 1 foto de evidencia.'
//               : !hayFirmaCliente
//               ? 'Se requiere la firma del cliente.'
//               : 'Se requiere la firma del operador.'}
//           </span>
//         </div>
//       )}

//     </div>
//   );
// }   ULTIMO USADO PARA PRUEBAS DE SINCRONIZACIÓN AUTOMÁTICA DE EVIDENCIAS

// import { useState, useEffect, useRef } from 'react';
// import { Camera, Image as ImageIcon, Trash2, CheckCircle2, Loader2, Eraser, AlertTriangle, FileText, User, UserCheck } from 'lucide-react';
// import { db } from '../../db/schema';
// import { useServiceStore, ESTADOS_SERVICIO } from '../../store/useServiceStore';

// // 👇 1. IMPORTACIÓN CORREGIDA
// import { sincronizarTodoPendiente } from '../../services/syncQueue';

// export function EvidenceDropzone() {
//   const estadoActual = useServiceStore((state) => state.estadoActual);
//   const servicioActivo = useServiceStore((state) => state.servicioActivo);
//   const avanzarEstado = useServiceStore((state) => state.avanzarEstado);

//   const [fotos, setFotos] = useState([]);
//   const [guardando, setGuardando] = useState(false);

//   const cameraInputRef = useRef(null);
//   const galleryInputRef = useRef(null);

//   const canvasClienteRef = useRef(null);
//   const [isDrawingCliente, setIsDrawingCliente] = useState(false);
//   const [hayFirmaCliente, setHayFirmaCliente] = useState(false);

//   const canvasGrueroRef = useRef(null);
//   const [isDrawingGruero, setIsDrawingGruero] = useState(false);
//   const [hayFirmaGruero, setHayFirmaGruero] = useState(false);

//   const cargarFotosLocales = async () => {
//     if (!servicioActivo) return;
//     try {
//       const fotosGuardadas = await db.evidencias_fotos
//         .where('servicio_id')
//         .equals(servicioActivo.id)
//         .toArray();

//       const fotosConUrl = fotosGuardadas.map((foto) => ({
//         ...foto,
//         previewUrl: URL.createObjectURL(foto.blob_imagen)
//       }));

//       setFotos(fotosConUrl);
//     } catch (error) {
//       console.error('Error al cargar fotos de IndexedDB:', error);
//     }
//   };

//   useEffect(() => {
//     if (estadoActual === ESTADOS_SERVICIO.PENDIENTE_EVIDENCIA && servicioActivo) {
//       cargarFotosLocales();
//     }
//     return () => {
//       fotos.forEach((foto) => URL.revokeObjectURL(foto.previewUrl));
//     };
//   }, [servicioActivo?.id, estadoActual]);

//   if (estadoActual !== ESTADOS_SERVICIO.PENDIENTE_EVIDENCIA || !servicioActivo) {
//     return null;
//   }

//   const startDrawing = (e, canvasRef, setIsDrawing, setHayFirma) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     const rect = canvas.getBoundingClientRect();
//     const clientX = e.touches ? e.touches[0].clientX : e.clientX;
//     const clientY = e.touches ? e.touches[0].clientY : e.clientY;

//     ctx.beginPath();
//     ctx.moveTo(clientX - rect.left, clientY - rect.top);
//     setIsDrawing(true);
//     setHayFirma(true);
//   };

//   const draw = (e, canvasRef, isDrawing) => {
//     if (!isDrawing) return;
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     const rect = canvas.getBoundingClientRect();
//     const clientX = e.touches ? e.touches[0].clientX : e.clientX;
//     const clientY = e.touches ? e.touches[0].clientY : e.clientY;

//     ctx.lineWidth = 3;
//     ctx.lineCap = 'round';
//     ctx.strokeStyle = '#FF8C00';
//     ctx.lineTo(clientX - rect.left, clientY - rect.top);
//     ctx.stroke();
//   };

//   const limpiarCanvas = (canvasRef, setHayFirma) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     setHayFirma(false);
//   };

//   const handleSeleccionarArchivos = async (event) => {
//     const archivos = Array.from(event.target.files || []);
//     if (archivos.length === 0) return;

//     setGuardando(true);

//     try {
//       for (const archivo of archivos) {
//         await db.evidencias_fotos.add({
//           servicio_id: servicioActivo.id,
//           tipo_foto: 'EVIDENCIA_OPERATIVA',
//           blob_imagen: archivo,
//           subido: 0,
//           timestamp: new Date().toISOString()
//         });
//       }
//       await cargarFotosLocales();

//       // 👇 2. DISPARAR SINCRONIZACIÓN EN TIEMPO REAL
//       sincronizarTodoPendiente();

//     } catch (error) {
//       console.error('Error al almacenar evidencia local:', error);
//     } finally {
//       setGuardando(false);
//       event.target.value = '';
//     }
//   };

//   const canvasToBlob = (canvas) => {
//     return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), 'image/png'));
//   };

//   const handleEliminarFoto = async (id) => {
//     await db.evidencias_fotos.delete(id);
//     await cargarFotosLocales();
//   };

//   const puedeFinalizar = fotos.length > 0 && hayFirmaCliente && hayFirmaGruero;

//   const handleProcesarCierre = async () => {
//     if (!puedeFinalizar || guardando) return;
//     setGuardando(true);

//     try {
//       const timestampActual = new Date().toISOString();

//       if (canvasClienteRef.current) {
//         const blobFirmaCliente = await canvasToBlob(canvasClienteRef.current);
//         await db.evidencias_fotos.add({
//           servicio_id: servicioActivo.id,
//           tipo_foto: 'FIRMA_CLIENTE',
//           blob_imagen: blobFirmaCliente,
//           subido: 0,
//           timestamp: timestampActual
//         });
//       }

//       if (canvasGrueroRef.current) {
//         const blobFirmaGruero = await canvasToBlob(canvasGrueroRef.current);
//         await db.evidencias_fotos.add({
//           servicio_id: servicioActivo.id,
//           tipo_foto: 'FIRMA_GRUERO',
//           blob_imagen: blobFirmaGruero,
//           subido: 0,
//           timestamp: timestampActual
//         });
//       }

//       // 👇 3. INICIAR COLA ANTES DE CAMBIAR EL ESTADO (Evita desmontaje prematuro)
//       sincronizarTodoPendiente();

//       await avanzarEstado(ESTADOS_SERVICIO.EXITO_SERVICIO);

//     } catch (err) {
//       console.error('Error al cerrar el servicio:', err);
//     } finally {
//       setGuardando(false);
//     }
//   };

//   // ... (El resto del render / return de EvidenceDropzone se mantiene exactamente igual)
//   return (
//     <div className="bg-[var(--bg-card)] border border-[var(--bg-card-border)] rounded-2xl p-4 space-y-5 max-w-md mx-auto my-auto w-full shadow-2xl transition-colors">
//       {/* Tu código JSX intacto aquí... */}
//       <div className="flex items-center justify-between border-b border-[var(--bg-card-border)] pb-3">
//         <h3 className="text-base font-black text-[var(--text-main)] uppercase tracking-wide">
//           Cierre de Servicio
//         </h3>
//         <span
//           className={`text-[10px] font-bold px-2.5 py-1 rounded-md border transition-all uppercase ${puedeFinalizar
//               ? 'text-[var(--color-tertiary)] bg-[var(--color-tertiary)]/10 border-[var(--color-tertiary)]/30'
//               : 'text-[var(--color-primary)] bg-[var(--color-primary)]/10 border-[var(--color-primary)]/20'
//             }`}
//         >
//           {puedeFinalizar ? '✓ Requisitos Listos' : 'Evidencia Requerida'}
//         </span>
//       </div>

//       <div className="space-y-2 text-left">
//         <div className="flex justify-between items-center">
//           <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
//             1. Fotos del Trabajo (Mínimo 1)
//           </p>
//           <span className="text-[10px] font-bold text-[var(--text-muted)]">
//             {fotos.length} capturada(s)
//           </span>
//         </div>

//         <input
//           ref={cameraInputRef}
//           type="file"
//           accept="image/*"
//           capture="environment"
//           onChange={handleSeleccionarArchivos}
//           disabled={guardando}
//           className="hidden"
//         />
//         <input
//           ref={galleryInputRef}
//           type="file"
//           accept="image/*"
//           multiple
//           onChange={handleSeleccionarArchivos}
//           disabled={guardando}
//           className="hidden"
//         />

//         {guardando ? (
//           <div className="border-2 border-dashed border-[var(--bg-card-border)] bg-[var(--bg-main)] rounded-xl p-5 flex items-center justify-center gap-2 text-[var(--color-primary)] text-xs font-bold">
//             <Loader2 className="w-5 h-5 animate-spin" />
//             <span>Almacenando evidencias locales...</span>
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 gap-3">
//             <button
//               type="button"
//               onClick={() => cameraInputRef.current?.click()}
//               className="border-2 border-dashed border-[var(--bg-card-border)] hover:border-[var(--color-primary)] bg-[var(--bg-main)] rounded-xl p-3.5 flex flex-col items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all text-center"
//             >
//               <div className="w-9 h-9 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center">
//                 <Camera className="w-4 h-4" />
//               </div>
//               <div>
//                 <p className="font-bold text-xs text-[var(--text-main)]">Tomar Foto</p>
//                 <p className="text-[9px] text-[var(--text-muted)]">Cámara directo</p>
//               </div>
//             </button>

//             <button
//               type="button"
//               onClick={() => galleryInputRef.current?.click()}
//               className="border-2 border-dashed border-[var(--bg-card-border)] hover:border-[var(--color-tertiary)] bg-[var(--bg-main)] rounded-xl p-3.5 flex flex-col items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all text-center"
//             >
//               <div className="w-9 h-9 rounded-full bg-[var(--color-tertiary)]/10 text-[var(--color-tertiary)] flex items-center justify-center">
//                 <ImageIcon className="w-4 h-4" />
//               </div>
//               <div>
//                 <p className="font-bold text-xs text-[var(--text-main)]">Galería</p>
//                 <p className="text-[9px] text-[var(--text-muted)]">Subir de fotos</p>
//               </div>
//             </button>
//           </div>
//         )}

//         {fotos.length > 0 && (
//           <div className="grid grid-cols-3 gap-2 pt-1">
//             {fotos.map((foto) => (
//               <div
//                 key={foto.id}
//                 className="relative aspect-square rounded-lg overflow-hidden bg-[var(--bg-main)] border border-[var(--bg-card-border)]"
//               >
//                 <img src={foto.previewUrl} alt="Evidencia" className="w-full h-full object-cover" />
//                 <button
//                   type="button"
//                   onClick={() => handleEliminarFoto(foto.id)}
//                   className="absolute bottom-1 right-1 bg-rose-950/90 text-rose-200 p-1 rounded-md active:scale-90 transition-all"
//                 >
//                   <Trash2 className="w-3.5 h-3.5" />
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="bg-[var(--bg-main)] p-3 rounded-xl border border-[var(--bg-card-border)] text-left space-y-1">
//         <div className="flex items-center gap-1.5 text-[var(--color-primary)] font-bold text-[10px] uppercase tracking-wider">
//           <FileText className="w-3.5 h-3.5" />
//           <span>Acuerdo de Conformidad y Entrega</span>
//         </div>
//         <p className="text-[11px] text-[var(--text-muted)] leading-snug">
//           Al firmar este documento, el cliente declara haber recibido el vehículo trasladado a entera satisfacción y sin daños adicionales. El operador de grúa certifica la finalización conforme a los protocolos del servicio.
//         </p>
//       </div>

//       <div className="space-y-2 text-left">
//         <div className="flex justify-between items-center">
//           <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5">
//             <User className="w-3.5 h-3.5 text-[var(--color-tertiary)]" />
//             3. Firma del Cliente ({servicioActivo.cliente?.nombre})
//           </p>
//           {hayFirmaCliente && (
//             <button
//               type="button"
//               onClick={() => limpiarCanvas(canvasClienteRef, setHayFirmaCliente)}
//               className="flex items-center gap-1 text-[10px] font-bold text-[var(--text-muted)] hover:text-rose-400 transition-colors"
//             >
//               <Eraser className="w-3 h-3" /> Limpiar
//             </button>
//           )}
//         </div>

//         <div className="bg-[var(--bg-main)] border border-[var(--bg-card-border)] rounded-xl overflow-hidden touch-none relative">
//           {!hayFirmaCliente && (
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
//               Firma del cliente aquí
//             </div>
//           )}
//           <canvas
//             ref={canvasClienteRef}
//             width={340}
//             height={110}
//             onMouseDown={(e) => startDrawing(e, canvasClienteRef, setIsDrawingCliente, setHayFirmaCliente)}
//             onMouseMove={(e) => draw(e, canvasClienteRef, isDrawingCliente)}
//             onMouseUp={() => setIsDrawingCliente(false)}
//             onTouchStart={(e) => startDrawing(e, canvasClienteRef, setIsDrawingCliente, setHayFirmaCliente)}
//             onTouchMove={(e) => draw(e, canvasClienteRef, isDrawingCliente)}
//             onTouchEnd={() => setIsDrawingCliente(false)}
//             className="w-full h-28 cursor-crosshair relative z-10"
//           />
//         </div>
//       </div>

//       <div className="space-y-2 text-left">
//         <div className="flex justify-between items-center">
//           <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5">
//             <UserCheck className="w-3.5 h-3.5 text-[var(--color-primary)]" />
//             4. Firma del Gruero / Operador
//           </p>
//           {hayFirmaGruero && (
//             <button
//               type="button"
//               onClick={() => limpiarCanvas(canvasGrueroRef, setHayFirmaGruero)}
//               className="flex items-center gap-1 text-[10px] font-bold text-[var(--text-muted)] hover:text-rose-400 transition-colors"
//             >
//               <Eraser className="w-3 h-3" /> Limpiar
//             </button>
//           )}
//         </div>

//         <div className="bg-[var(--bg-main)] border border-[var(--bg-card-border)] rounded-xl overflow-hidden touch-none relative">
//           {!hayFirmaGruero && (
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
//               Firma del operador aquí
//             </div>
//           )}
//           <canvas
//             ref={canvasGrueroRef}
//             width={340}
//             height={110}
//             onMouseDown={(e) => startDrawing(e, canvasGrueroRef, setIsDrawingGruero, setHayFirmaGruero)}
//             onMouseMove={(e) => draw(e, canvasGrueroRef, isDrawingGruero)}
//             onMouseUp={() => setIsDrawingGruero(false)}
//             onTouchStart={(e) => startDrawing(e, canvasGrueroRef, setIsDrawingGruero, setHayFirmaGruero)}
//             onTouchMove={(e) => draw(e, canvasGrueroRef, isDrawingGruero)}
//             onTouchEnd={() => setIsDrawingGruero(false)}
//             className="w-full h-28 cursor-crosshair relative z-10"
//           />
//         </div>
//       </div>

//       <button
//         type="button"
//         onClick={handleProcesarCierre}
//         disabled={!puedeFinalizar || guardando}
//         className={`w-full py-4 font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 min-h-[50px] ${puedeFinalizar && !guardando
//             ? 'bg-[var(--color-primary)] text-slate-950 shadow-xl shadow-[var(--color-primary)]/20 hover:opacity-90 active:scale-95 cursor-pointer'
//             : 'bg-[var(--bg-main)] text-[var(--text-muted)] border border-[var(--bg-card-border)] cursor-not-allowed opacity-60'
//           }`}
//       >
//         <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
//         <span>{guardando ? 'Procesando...' : 'Guardar y Finalizar Servicio'}</span>
//       </button>

//       {!puedeFinalizar && (
//         <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-amber-500 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 text-center">
//           <AlertTriangle className="w-4 h-4 shrink-0" />
//           <span>
//             {!fotos.length
//               ? 'Se requiere al menos 1 foto de evidencia.'
//               : !hayFirmaCliente
//                 ? 'Se requiere la firma del cliente.'
//                 : 'Se requiere la firma del operador.'}
//           </span>
//         </div>
//       )}

//     </div>
//   );
// } 

// import { useState, useEffect, useRef } from 'react';
// import { Camera, Image as ImageIcon, Trash2, CheckCircle2, Loader2, Eraser, AlertTriangle, FileText, User, UserCheck } from 'lucide-react';
// import { db } from '../../db/schema';
// import { useServiceStore, ESTADOS_SERVICIO } from '../../store/useServiceStore';

// export function EvidenceDropzone() {
//   const estadoActual = useServiceStore((state) => state.estadoActual);
//   const servicioActivo = useServiceStore((state) => state.servicioActivo);
//   const avanzarEstado = useServiceStore((state) => state.avanzarEstado);

//   const [fotos, setFotos] = useState([]);
//   const [guardando, setGuardando] = useState(false);

//   const cameraInputRef = useRef(null);
//   const galleryInputRef = useRef(null);

//   const canvasClienteRef = useRef(null);
//   const [isDrawingCliente, setIsDrawingCliente] = useState(false);
//   const [hayFirmaCliente, setHayFirmaCliente] = useState(false);

//   const canvasGrueroRef = useRef(null);
//   const [isDrawingGruero, setIsDrawingGruero] = useState(false);
//   const [hayFirmaGruero, setHayFirmaGruero] = useState(false);

//   const cargarFotosLocales = async () => {
//     if (!servicioActivo) return;
//     try {
//       const fotosGuardadas = await db.evidencias_fotos
//         .where('servicio_id')
//         .equals(servicioActivo.id)
//         .toArray();

//       const fotosConUrl = fotosGuardadas.map((foto) => ({
//         ...foto,
//         previewUrl: URL.createObjectURL(foto.blob_imagen)
//       }));

//       setFotos(fotosConUrl);
//     } catch (error) {
//       console.error('Error al cargar fotos de IndexedDB:', error);
//     }
//   };

//   useEffect(() => {
//     if (estadoActual === ESTADOS_SERVICIO.PENDIENTE_EVIDENCIA && servicioActivo) {
//       cargarFotosLocales();
//     }
//     return () => {
//       fotos.forEach((foto) => URL.revokeObjectURL(foto.previewUrl));
//     };
//   }, [servicioActivo?.id, estadoActual]);

//   if (estadoActual !== ESTADOS_SERVICIO.PENDIENTE_EVIDENCIA || !servicioActivo) {
//     return null;
//   }

//   const startDrawing = (e, canvasRef, setIsDrawing, setHayFirma) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     const rect = canvas.getBoundingClientRect();
//     const clientX = e.touches ? e.touches[0].clientX : e.clientX;
//     const clientY = e.touches ? e.touches[0].clientY : e.clientY;

//     ctx.beginPath();
//     ctx.moveTo(clientX - rect.left, clientY - rect.top);
//     setIsDrawing(true);
//     setHayFirma(true);
//   };

//   const draw = (e, canvasRef, isDrawing) => {
//     if (!isDrawing) return;
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     const rect = canvas.getBoundingClientRect();
//     const clientX = e.touches ? e.touches[0].clientX : e.clientX;
//     const clientY = e.touches ? e.touches[0].clientY : e.clientY;

//     ctx.lineWidth = 3;
//     ctx.lineCap = 'round';
//     ctx.strokeStyle = '#FF8C00';
//     ctx.lineTo(clientX - rect.left, clientY - rect.top);
//     ctx.stroke();
//   };

//   const limpiarCanvas = (canvasRef, setHayFirma) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     setHayFirma(false);
//   };

//   const handleSeleccionarArchivos = async (event) => {
//     const archivos = Array.from(event.target.files || []);
//     if (archivos.length === 0) return;

//     setGuardando(true);

//     try {
//       for (const archivo of archivos) {
//         await db.evidencias_fotos.add({
//           servicio_id: servicioActivo.id,
//           tipo_foto: 'EVIDENCIA_OPERATIVA',
//           blob_imagen: archivo,
//           subido: 0,
//           timestamp: new Date().toISOString()
//         });
//       }
//       await cargarFotosLocales();
//     } catch (error) {
//       console.error('Error al almacenar evidencia local:', error);
//     } finally {
//       setGuardando(false);
//       event.target.value = '';
//     }
//   };

//   const canvasToBlob = (canvas) => {
//     return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), 'image/png'));
//   };

//   const handleEliminarFoto = async (id) => {
//     await db.evidencias_fotos.delete(id);
//     await cargarFotosLocales();
//   };

//   const puedeFinalizar = fotos.length >= 4 && hayFirmaCliente && hayFirmaGruero;

//   const handleProcesarCierre = async () => {
//     if (!puedeFinalizar || guardando) return;
//     setGuardando(true);

//     try {
//       const timestampActual = new Date().toISOString();

//       if (canvasClienteRef.current) {
//         const blobFirmaCliente = await canvasToBlob(canvasClienteRef.current);
//         await db.evidencias_fotos.add({
//           servicio_id: servicioActivo.id,
//           tipo_foto: 'FIRMA_CLIENTE',
//           blob_imagen: blobFirmaCliente,
//           subido: 0,
//           timestamp: timestampActual
//         });
//       }

//       if (canvasGrueroRef.current) {
//         const blobFirmaGruero = await canvasToBlob(canvasGrueroRef.current);
//         await db.evidencias_fotos.add({
//           servicio_id: servicioActivo.id,
//           tipo_foto: 'FIRMA_GRUERO',
//           blob_imagen: blobFirmaGruero,
//           subido: 0,
//           timestamp: timestampActual
//         });
//       }

//       // Avanza el estado de forma limpia; esto actualizará la vista a EXITO_SERVICIO 
//       // y disparará la sincronización en segundo plano de manera automática.
//       await avanzarEstado(ESTADOS_SERVICIO.EXITO_SERVICIO);

//     } catch (err) {
//       console.error('Error al cerrar el servicio:', err);
//     } finally {
//       setGuardando(false);
//     }
//   };

//   return (
//     <div className="bg-[var(--bg-card)] border border-[var(--bg-card-border)] rounded-2xl p-4 space-y-5 max-w-md mx-auto my-auto w-full shadow-2xl transition-colors">
//       <div className="flex items-center justify-between border-b border-[var(--bg-card-border)] pb-3">
//         <h3 className="text-base font-black text-[var(--text-main)] uppercase tracking-wide">
//           Cierre de Servicio
//         </h3>
//         <span
//           className={`text-[10px] font-bold px-2.5 py-1 rounded-md border transition-all uppercase ${
//             puedeFinalizar
//               ? 'text-[var(--color-tertiary)] bg-[var(--color-tertiary)]/10 border-[var(--color-tertiary)]/30'
//               : 'text-[var(--color-primary)] bg-[var(--color-primary)]/10 border-[var(--color-primary)]/20'
//           }`}
//         >
//           {puedeFinalizar ? '✓ Requisitos Listos' : 'Evidencia Requerida'}
//         </span>
//       </div>

//       <div className="space-y-2 text-left">
//         <div className="flex justify-between items-center">
//           <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
//             1. Fotos del Trabajo (Mínimo 4)
//           </p>
//           <span className="text-[10px] font-bold text-[var(--text-muted)]">
//             {fotos.length} capturada(s)
//           </span>
//         </div>

//         <input
//           ref={cameraInputRef}
//           type="file"
//           accept="image/*"
//           capture="environment"
//           onChange={handleSeleccionarArchivos}
//           disabled={guardando}
//           className="hidden"
//         />
//         <input
//           ref={galleryInputRef}
//           type="file"
//           accept="image/*"
//           multiple
//           onChange={handleSeleccionarArchivos}
//           disabled={guardando}
//           className="hidden"
//         />

//         {guardando ? (
//           <div className="border-2 border-dashed border-[var(--bg-card-border)] bg-[var(--bg-main)] rounded-xl p-5 flex items-center justify-center gap-2 text-[var(--color-primary)] text-xs font-bold">
//             <Loader2 className="w-5 h-5 animate-spin" />
//             <span>Almacenando evidencias locales...</span>
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 gap-3">
//             <button
//               type="button"
//               onClick={() => cameraInputRef.current?.click()}
//               className="border-2 border-dashed border-[var(--bg-card-border)] hover:border-[var(--color-primary)] bg-[var(--bg-main)] rounded-xl p-3.5 flex flex-col items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all text-center"
//             >
//               <div className="w-9 h-9 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center">
//                 <Camera className="w-4 h-4" />
//               </div>
//               <div>
//                 <p className="font-bold text-xs text-[var(--text-main)]">Tomar Foto</p>
//                 <p className="text-[9px] text-[var(--text-muted)]">Cámara directo</p>
//               </div>
//             </button>

//             <button
//               type="button"
//               onClick={() => galleryInputRef.current?.click()}
//               className="border-2 border-dashed border-[var(--bg-card-border)] hover:border-[var(--color-tertiary)] bg-[var(--bg-main)] rounded-xl p-3.5 flex flex-col items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all text-center"
//             >
//               <div className="w-9 h-9 rounded-full bg-[var(--color-tertiary)]/10 text-[var(--color-tertiary)] flex items-center justify-center">
//                 <ImageIcon className="w-4 h-4" />
//               </div>
//               <div>
//                 <p className="font-bold text-xs text-[var(--text-main)]">Galería</p>
//                 <p className="text-[9px] text-[var(--text-muted)]">Subir de fotos</p>
//               </div>
//             </button>
//           </div>
//         )}

//         {fotos.length > 0 && (
//           <div className="grid grid-cols-3 gap-2 pt-1">
//             {fotos.map((foto) => (
//               <div
//                 key={foto.id}
//                 className="relative aspect-square rounded-lg overflow-hidden bg-[var(--bg-main)] border border-[var(--bg-card-border)]"
//               >
//                 <img src={foto.previewUrl} alt="Evidencia" className="w-full h-full object-cover" />
//                 <button
//                   type="button"
//                   onClick={() => handleEliminarFoto(foto.id)}
//                   className="absolute bottom-1 right-1 bg-rose-950/90 text-rose-200 p-1 rounded-md active:scale-90 transition-all"
//                 >
//                   <Trash2 className="w-3.5 h-3.5" />
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="bg-[var(--bg-main)] p-3 rounded-xl border border-[var(--bg-card-border)] text-left space-y-1">
//         <div className="flex items-center gap-1.5 text-[var(--color-primary)] font-bold text-[10px] uppercase tracking-wider">
//           <FileText className="w-3.5 h-3.5" />
//           <span>Acuerdo de Conformidad y Entrega</span>
//         </div>
//         <p className="text-[11px] text-[var(--text-muted)] leading-snug">
//           Al firmar este documento, el cliente declara haber recibido el vehículo trasladado a entera satisfacción y sin daños adicionales. El operador de grúa certifica la finalización conforme a los protocolos del servicio.
//         </p>
//       </div>

//       <div className="space-y-2 text-left">
//         <div className="flex justify-between items-center">
//           <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5">
//             <User className="w-3.5 h-3.5 text-[var(--color-tertiary)]" />
//             3. Firma del Cliente ({servicioActivo.cliente?.nombre})
//           </p>
//           {hayFirmaCliente && (
//             <button
//               type="button"
//               onClick={() => limpiarCanvas(canvasClienteRef, setHayFirmaCliente)}
//               className="flex items-center gap-1 text-[10px] font-bold text-[var(--text-muted)] hover:text-rose-400 transition-colors"
//             >
//               <Eraser className="w-3 h-3" /> Limpiar
//             </button>
//           )}
//         </div>

//         <div className="bg-[var(--bg-main)] border border-[var(--bg-card-border)] rounded-xl overflow-hidden touch-none relative">
//           {!hayFirmaCliente && (
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
//               Firma del cliente aquí
//             </div>
//           )}
//           <canvas
//             ref={canvasClienteRef}
//             width={340}
//             height={110}
//             onMouseDown={(e) => startDrawing(e, canvasClienteRef, setIsDrawingCliente, setHayFirmaCliente)}
//             onMouseMove={(e) => draw(e, canvasClienteRef, isDrawingCliente)}
//             onMouseUp={() => setIsDrawingCliente(false)}
//             onTouchStart={(e) => startDrawing(e, canvasClienteRef, setIsDrawingCliente, setHayFirmaCliente)}
//             onTouchMove={(e) => draw(e, canvasClienteRef, isDrawingCliente)}
//             onTouchEnd={() => setIsDrawingCliente(false)}
//             className="w-full h-28 cursor-crosshair relative z-10"
//           />
//         </div>
//       </div>

//       <div className="space-y-2 text-left">
//         <div className="flex justify-between items-center">
//           <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5">
//             <UserCheck className="w-3.5 h-3.5 text-[var(--color-primary)]" />
//             4. Firma del Gruero / Operador
//           </p>
//           {hayFirmaGruero && (
//             <button
//               type="button"
//               onClick={() => limpiarCanvas(canvasGrueroRef, setHayFirmaGruero)}
//               className="flex items-center gap-1 text-[10px] font-bold text-[var(--text-muted)] hover:text-rose-400 transition-colors"
//             >
//               <Eraser className="w-3 h-3" /> Limpiar
//             </button>
//           )}
//         </div>

//         <div className="bg-[var(--bg-main)] border border-[var(--bg-card-border)] rounded-xl overflow-hidden touch-none relative">
//           {!hayFirmaGruero && (
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
//               Firma del operador aquí
//             </div>
//           )}
//           <canvas
//             ref={canvasGrueroRef}
//             width={340}
//             height={110}
//             onMouseDown={(e) => startDrawing(e, canvasGrueroRef, setIsDrawingGruero, setHayFirmaGruero)}
//             onMouseMove={(e) => draw(e, canvasGrueroRef, isDrawingGruero)}
//             onMouseUp={() => setIsDrawingGruero(false)}
//             onTouchStart={(e) => startDrawing(e, canvasGrueroRef, setIsDrawingGruero, setHayFirmaGruero)}
//             onTouchMove={(e) => draw(e, canvasGrueroRef, isDrawingGruero)}
//             onTouchEnd={() => setIsDrawingGruero(false)}
//             className="w-full h-28 cursor-crosshair relative z-10"
//           />
//         </div>
//       </div>

//       <button
//         type="button"
//         onClick={handleProcesarCierre}
//         disabled={!puedeFinalizar || guardando}
//         className={`w-full py-4 font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 min-h-[50px] ${
//           puedeFinalizar && !guardando
//             ? 'bg-[var(--color-primary)] text-slate-950 shadow-xl shadow-[var(--color-primary)]/20 hover:opacity-90 active:scale-95 cursor-pointer'
//             : 'bg-[var(--bg-main)] text-[var(--text-muted)] border border-[var(--bg-card-border)] cursor-not-allowed opacity-60'
//         }`}
//       >
//         <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
//         <span>{guardando ? 'Procesando...' : 'Guardar y Finalizar Servicio'}</span>
//       </button>

//       {!puedeFinalizar && (
//         <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-amber-500 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 text-center">
//           <AlertTriangle className="w-4 h-4 shrink-0" />
//           <span>
//             {!fotos.length
//               ? 'Se requieren al menos 4 fotos de evidencia.'
//               : !hayFirmaCliente
//               ? 'Se requiere la firma del cliente.'
//               : 'Se requiere la firma del operador.'}
//           </span>
//         </div>
//       )}
//     </div>
//   );
// }  1 FOTOGRAFIA

import { useState, useEffect, useRef } from 'react';
import { Camera, Image as ImageIcon, Trash2, CheckCircle2, Loader2, Eraser, AlertTriangle, FileText, User, UserCheck } from 'lucide-react';
import { db } from '../../db/schema';
import { useServiceStore, ESTADOS_SERVICIO } from '../../store/useServiceStore';

export function EvidenceDropzone() {
  const estadoActual = useServiceStore((state) => state.estadoActual);
  const servicioActivo = useServiceStore((state) => state.servicioActivo);
  const avanzarEstado = useServiceStore((state) => state.avanzarEstado);

  const [fotos, setFotos] = useState([]);
  const [guardando, setGuardando] = useState(false);

  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const canvasClienteRef = useRef(null);
  const [isDrawingCliente, setIsDrawingCliente] = useState(false);
  const [hayFirmaCliente, setHayFirmaCliente] = useState(false);

  const canvasGrueroRef = useRef(null);
  const [isDrawingGruero, setIsDrawingGruero] = useState(false);
  const [hayFirmaGruero, setHayFirmaGruero] = useState(false);

  const cargarFotosLocales = async () => {
    if (!servicioActivo) return;
    try {
      const fotosGuardadas = await db.evidencias_fotos
        .where('servicio_id')
        .equals(servicioActivo.id)
        .toArray();

      const fotosConUrl = fotosGuardadas.map((foto) => ({
        ...foto,
        previewUrl: URL.createObjectURL(foto.blob_imagen)
      }));

      setFotos(fotosConUrl);
    } catch (error) {
      console.error('Error al cargar fotos de IndexedDB:', error);
    }
  };

  useEffect(() => {
    if (estadoActual === ESTADOS_SERVICIO.PENDIENTE_EVIDENCIA && servicioActivo) {
      cargarFotosLocales();
    }
    return () => {
      fotos.forEach((foto) => URL.revokeObjectURL(foto.previewUrl));
    };
  }, [servicioActivo?.id, estadoActual]);

  if (estadoActual !== ESTADOS_SERVICIO.PENDIENTE_EVIDENCIA || !servicioActivo) {
    return null;
  }

  const startDrawing = (e, canvasRef, setIsDrawing, setHayFirma) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
    setHayFirma(true);
  };

  const draw = (e, canvasRef, isDrawing) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    // Adapta el trazo al color de texto principal según el tema activo (claro u oscuro)
    const colorTrazado = getComputedStyle(canvas).getPropertyValue('--text-main').trim() || '#FFFFFF';

    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = colorTrazado;
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const limpiarCanvas = (canvasRef, setHayFirma) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHayFirma(false);
  };

  const handleSeleccionarArchivos = async (event) => {
    const archivos = Array.from(event.target.files || []);
    if (archivos.length === 0) return;

    setGuardando(true);

    try {
      for (const archivo of archivos) {
        await db.evidencias_fotos.add({
          servicio_id: servicioActivo.id,
          tipo_foto: 'EVIDENCIA_OPERATIVA',
          blob_imagen: archivo,
          subido: 0,
          timestamp: new Date().toISOString()
        });
      }
      await cargarFotosLocales();
    } catch (error) {
      console.error('Error al almacenar evidencia local:', error);
    } finally {
      setGuardando(false);
      event.target.value = '';
    }
  };

  // Convierte la firma a Blob PNG procesándola a color NEGRO PURO (#000000) para el expediente
  const canvasToBlobBlack = (canvas) => {
    return new Promise((resolve) => {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempCtx = tempCanvas.getContext('2d');

      // 1. Copia la firma original
      tempCtx.drawImage(canvas, 0, 0);

      // 2. Reemplaza todos los píxeles visibles con color negro puro (#000000) manteniendo la transparencia
      tempCtx.globalCompositeOperation = 'source-in';
      tempCtx.fillStyle = '#000000';
      tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

      // 3. Exporta como PNG transparente
      tempCanvas.toBlob((blob) => resolve(blob), 'image/png');
    });
  };

  const handleEliminarFoto = async (id) => {
    await db.evidencias_fotos.delete(id);
    await cargarFotosLocales();
  };

  const puedeFinalizar = fotos.length >= 4 && hayFirmaCliente && hayFirmaGruero;

  const handleProcesarCierre = async () => {
    if (!puedeFinalizar || guardando) return;
    setGuardando(true);

    try {
      const timestampActual = new Date().toISOString();

      if (canvasClienteRef.current) {
        const blobFirmaCliente = await canvasToBlobBlack(canvasClienteRef.current);
        await db.evidencias_fotos.add({
          servicio_id: servicioActivo.id,
          tipo_foto: 'FIRMA_CLIENTE',
          blob_imagen: blobFirmaCliente,
          subido: 0,
          timestamp: timestampActual
        });
      }

      if (canvasGrueroRef.current) {
        const blobFirmaGruero = await canvasToBlobBlack(canvasGrueroRef.current);
        await db.evidencias_fotos.add({
          servicio_id: servicioActivo.id,
          tipo_foto: 'FIRMA_GRUERO',
          blob_imagen: blobFirmaGruero,
          subido: 0,
          timestamp: timestampActual
        });
      }

      await avanzarEstado(ESTADOS_SERVICIO.EXITO_SERVICIO);

    } catch (err) {
      console.error('Error al cerrar el servicio:', err);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--bg-card-border)] rounded-2xl p-4 space-y-5 max-w-md mx-auto my-auto w-full shadow-2xl transition-colors">
      <div className="flex items-center justify-between border-b border-[var(--bg-card-border)] pb-3">
        <h3 className="text-base font-black text-[var(--text-main)] uppercase tracking-wide">
          Cierre de Servicio
        </h3>
        <span
          className={`text-[10px] font-bold px-2.5 py-1 rounded-md border transition-all uppercase ${
            puedeFinalizar
              ? 'text-[var(--color-tertiary)] bg-[var(--color-tertiary)]/10 border-[var(--color-tertiary)]/30'
              : 'text-[var(--color-primary)] bg-[var(--color-primary)]/10 border-[var(--color-primary)]/20'
          }`}
        >
          {puedeFinalizar ? '✓ Requisitos Listos' : 'Evidencia Requerida'}
        </span>
      </div>

      <div className="space-y-2 text-left">
        <div className="flex justify-between items-center">
          <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
            1. Fotos del Trabajo (Mínimo 4)
          </p>
          <span className="text-[10px] font-bold text-[var(--text-muted)]">
            {fotos.length} capturada(s)
          </span>
        </div>

        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleSeleccionarArchivos}
          disabled={guardando}
          className="hidden"
        />
        <input
          ref={galleryInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleSeleccionarArchivos}
          disabled={guardando}
          className="hidden"
        />

        {guardando ? (
          <div className="border-2 border-dashed border-[var(--bg-card-border)] bg-[var(--bg-main)] rounded-xl p-5 flex items-center justify-center gap-2 text-[var(--color-primary)] text-xs font-bold">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Almacenando evidencias locales...</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="border-2 border-dashed border-[var(--bg-card-border)] hover:border-[var(--color-primary)] bg-[var(--bg-main)] rounded-xl p-3.5 flex flex-col items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all text-center"
            >
              <div className="w-9 h-9 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center">
                <Camera className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-xs text-[var(--text-main)]">Tomar Foto</p>
                <p className="text-[9px] text-[var(--text-muted)]">Cámara directo</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => galleryInputRef.current?.click()}
              className="border-2 border-dashed border-[var(--bg-card-border)] hover:border-[var(--color-tertiary)] bg-[var(--bg-main)] rounded-xl p-3.5 flex flex-col items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all text-center"
            >
              <div className="w-9 h-9 rounded-full bg-[var(--color-tertiary)]/10 text-[var(--color-tertiary)] flex items-center justify-center">
                <ImageIcon className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-xs text-[var(--text-main)]">Galería</p>
                <p className="text-[9px] text-[var(--text-muted)]">Subir de fotos</p>
              </div>
            </button>
          </div>
        )}

        {fotos.length > 0 && (
          <div className="grid grid-cols-3 gap-2 pt-1">
            {fotos.map((foto) => (
              <div
                key={foto.id}
                className="relative aspect-square rounded-lg overflow-hidden bg-[var(--bg-main)] border border-[var(--bg-card-border)]"
              >
                <img src={foto.previewUrl} alt="Evidencia" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleEliminarFoto(foto.id)}
                  className="absolute bottom-1 right-1 bg-rose-950/90 text-rose-200 p-1 rounded-md active:scale-90 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-[var(--bg-main)] p-3 rounded-xl border border-[var(--bg-card-border)] text-left space-y-1">
        <div className="flex items-center gap-1.5 text-[var(--color-primary)] font-bold text-[10px] uppercase tracking-wider">
          <FileText className="w-3.5 h-3.5" />
          <span>Acuerdo de Conformidad y Entrega</span>
        </div>
        <p className="text-[11px] text-[var(--text-muted)] leading-snug">
          Al firmar este documento, el cliente declara haber recibido el vehículo trasladado a entera satisfacción y sin daños adicionales. El operador de grúa certifica la finalización conforme a los protocolos del servicio.
        </p>
      </div>

      <div className="space-y-2 text-left">
        <div className="flex justify-between items-center">
          <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[var(--color-tertiary)]" />
            3. Firma del Cliente ({servicioActivo.cliente?.nombre})
          </p>
          {hayFirmaCliente && (
            <button
              type="button"
              onClick={() => limpiarCanvas(canvasClienteRef, setHayFirmaCliente)}
              className="flex items-center gap-1 text-[10px] font-bold text-[var(--text-muted)] hover:text-rose-400 transition-colors"
            >
              <Eraser className="w-3 h-3" /> Limpiar
            </button>
          )}
        </div>

        <div className="bg-[var(--bg-main)] border border-[var(--bg-card-border)] rounded-xl overflow-hidden touch-none relative">
          {!hayFirmaCliente && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
              Firma del cliente aquí
            </div>
          )}
          <canvas
            ref={canvasClienteRef}
            width={340}
            height={110}
            onMouseDown={(e) => startDrawing(e, canvasClienteRef, setIsDrawingCliente, setHayFirmaCliente)}
            onMouseMove={(e) => draw(e, canvasClienteRef, isDrawingCliente)}
            onMouseUp={() => setIsDrawingCliente(false)}
            onTouchStart={(e) => startDrawing(e, canvasClienteRef, setIsDrawingCliente, setHayFirmaCliente)}
            onTouchMove={(e) => draw(e, canvasClienteRef, isDrawingCliente)}
            onTouchEnd={() => setIsDrawingCliente(false)}
            className="w-full h-28 cursor-crosshair relative z-10"
          />
        </div>
      </div>

      <div className="space-y-2 text-left">
        <div className="flex justify-between items-center">
          <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            4. Firma del Gruero / Operador
          </p>
          {hayFirmaGruero && (
            <button
              type="button"
              onClick={() => limpiarCanvas(canvasGrueroRef, setHayFirmaGruero)}
              className="flex items-center gap-1 text-[10px] font-bold text-[var(--text-muted)] hover:text-rose-400 transition-colors"
            >
              <Eraser className="w-3 h-3" /> Limpiar
            </button>
          )}
        </div>

        <div className="bg-[var(--bg-main)] border border-[var(--bg-card-border)] rounded-xl overflow-hidden touch-none relative">
          {!hayFirmaGruero && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
              Firma del operador aquí
            </div>
          )}
          <canvas
            ref={canvasGrueroRef}
            width={340}
            height={110}
            onMouseDown={(e) => startDrawing(e, canvasGrueroRef, setIsDrawingGruero, setHayFirmaGruero)}
            onMouseMove={(e) => draw(e, canvasGrueroRef, isDrawingGruero)}
            onMouseUp={() => setIsDrawingGruero(false)}
            onTouchStart={(e) => startDrawing(e, canvasGrueroRef, setIsDrawingGruero, setHayFirmaGruero)}
            onTouchMove={(e) => draw(e, canvasGrueroRef, isDrawingGruero)}
            onTouchEnd={() => setIsDrawingGruero(false)}
            className="w-full h-28 cursor-crosshair relative z-10"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleProcesarCierre}
        disabled={!puedeFinalizar || guardando}
        className={`w-full py-4 font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 min-h-[50px] ${
          puedeFinalizar && !guardando
            ? 'bg-[var(--color-primary)] text-slate-950 shadow-xl shadow-[var(--color-primary)]/20 hover:opacity-90 active:scale-95 cursor-pointer'
            : 'bg-[var(--bg-main)] text-[var(--text-muted)] border border-[var(--bg-card-border)] cursor-not-allowed opacity-60'
        }`}
      >
        <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
        <span>{guardando ? 'Procesando...' : 'Guardar y Finalizar Servicio'}</span>
      </button>

      {!puedeFinalizar && (
        <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-amber-500 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 text-center">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>
            {fotos.length < 4
              ? `Se requieren al menos 4 fotos de evidencia (${fotos.length}/4).`
              : !hayFirmaCliente
              ? 'Se requiere la firma del cliente.'
              : 'Se requiere la firma del operador.'}
          </span>
        </div>
      )}
    </div>
  );
}