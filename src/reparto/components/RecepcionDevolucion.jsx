import React, { useState } from 'react';
import { RotateCcw, Camera, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { colors } from '../../shared/colors.js';

const RecepcionDevolucion = ({ onNavigate }) => {
  const [solicitudes, setSolicitudes] = useState([
    {
      id: 'DEV-2024-001',
      cliente: 'Abarrotes Don José',
      producto: 'Leche Entera 1L',
      cantidadSolicitada: 12,
      cantidadRecibida: null,
      lote: 'L20241215',
      caducidad: '15 Ene 2025',
      motivo: 'Producto próximo a caducar',
      estado: 'pendiente',
      fotoCapturada: null,
      observaciones: ''
    },
    {
      id: 'DEV-2024-002',
      cliente: 'Tienda La Esquina',
      producto: 'Yogurt Natural 1kg',
      cantidadSolicitada: 8,
      cantidadRecibida: null,
      lote: 'L20241218',
      caducidad: '18 Ene 2025',
      motivo: 'Producto caducado',
      estado: 'pendiente',
      fotoCapturada: null,
      observaciones: ''
    },
    {
      id: 'DEV-2024-003',
      cliente: 'Mini Super García',
      producto: 'Queso Panela 400g',
      cantidadSolicitada: 6,
      cantidadRecibida: 6,
      lote: 'L20241210',
      caducidad: '10 Ene 2025',
      motivo: 'Producto en mal estado',
      estado: 'recibida',
      fotoCapturada: 'foto_dev_003.jpg',
      observaciones: 'Empaques dañados'
    }
  ]);

  const [solicitudActiva, setSolicitudActiva] = useState(null);
  const [showValidacionModal, setShowValidacionModal] = useState(false);
  const [showConfirmacionModal, setShowConfirmacionModal] = useState(false);
  const [showNotaCreditoModal, setShowNotaCreditoModal] = useState(false);

  const solicitudesPendientes = solicitudes.filter(s => s.estado === 'pendiente').length;
  const solicitudesRecibidas = solicitudes.filter(s => s.estado === 'recibida').length;
  const solicitudesRechazadas = solicitudes.filter(s => s.estado === 'rechazada').length;

  const handleIniciarRecepcion = (solicitud) => {
    setSolicitudActiva({ ...solicitud });
    setShowValidacionModal(true);
  };

  const handleTomarFoto = () => {
    const filename = `foto_dev_${Date.now()}.jpg`;
    setSolicitudActiva({ ...solicitudActiva, fotoCapturada: filename });
    alert('Foto capturada exitosamente');
  };

  const handleActualizarCantidad = (cantidad) => {
    setSolicitudActiva({ ...solicitudActiva, cantidadRecibida: cantidad });
  };

  const handleConfirmarRecepcion = () => {
    if (!solicitudActiva.cantidadRecibida || solicitudActiva.cantidadRecibida <= 0) {
      alert('Ingresa la cantidad recibida');
      return;
    }
    if (!solicitudActiva.fotoCapturada) {
      alert('Captura una foto del producto');
      return;
    }

    setSolicitudes(solicitudes.map(s =>
      s.id === solicitudActiva.id
        ? {
          ...s,
          estado: 'recibida',
          cantidadRecibida: solicitudActiva.cantidadRecibida,
          fotoCapturada: solicitudActiva.fotoCapturada,
          observaciones: solicitudActiva.observaciones
        }
        : s
    ));

    setShowValidacionModal(false);
    setShowConfirmacionModal(true);
  };

  const handleRechazarDevolucion = () => {
    if (!confirm('¿Estás seguro de rechazar esta devolución?')) return;

    setSolicitudes(solicitudes.map(s =>
      s.id === solicitudActiva.id ? { ...s, estado: 'rechazada' } : s
    ));
    setShowValidacionModal(false);
    setSolicitudActiva(null);
  };

  const handleGenerarNotaCredito = () => {
    setShowConfirmacionModal(false);
    setShowNotaCreditoModal(true);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.gray50,
      paddingBottom: 20,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ padding: 16 }}>
        {/* Estadísticas */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <div style={{
            flex: 1,
            backgroundColor: 'white',
            padding: '12px 8px',
            borderRadius: 10,
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: 11, color: colors.gray500, marginBottom: 4 }}>Pendientes</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: colors.warning }}>{solicitudesPendientes}</div>
          </div>
          <div style={{
            flex: 1,
            backgroundColor: 'white',
            padding: '12px 8px',
            borderRadius: 10,
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: 11, color: colors.gray500, marginBottom: 4 }}>Recibidas</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: colors.success }}>{solicitudesRecibidas}</div>
          </div>
          <div style={{
            flex: 1,
            backgroundColor: 'white',
            padding: '12px 8px',
            borderRadius: 10,
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: 11, color: colors.gray500, marginBottom: 4 }}>Rechazadas</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: colors.danger }}>{solicitudesRechazadas}</div>
          </div>
        </div>

        <div style={{ fontSize: 12, fontWeight: 600, color: colors.gray500, marginBottom: 12 }}>
          SOLICITUDES DE DEVOLUCIÓN
        </div>

        {/* Lista de Solicitudes */}
        {solicitudes.map((solicitud) => (
          <div
            key={solicitud.id}
            style={{
              backgroundColor: solicitud.estado === 'recibida'
                ? `${colors.success}08`
                : solicitud.estado === 'rechazada'
                  ? `${colors.danger}08`
                  : 'white',
              padding: 16,
              borderRadius: 12,
              marginBottom: 12,
              border: solicitud.estado === 'recibida'
                ? `1px solid ${colors.success}`
                : solicitud.estado === 'rechazada'
                  ? `1px solid ${colors.danger}`
                  : `1px solid ${colors.warning}`,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: colors.gray800 }}>{solicitud.id}</div>
                <div style={{ fontSize: 12, color: colors.gray600, marginTop: 2 }}>{solicitud.cliente}</div>
              </div>
              <div style={{
                padding: '4px 8px',
                borderRadius: 4,
                fontSize: 10,
                fontWeight: 600,
                backgroundColor: solicitud.estado === 'recibida'
                  ? `${colors.success}20`
                  : solicitud.estado === 'rechazada'
                    ? `${colors.danger}20`
                    : `${colors.warning}20`,
                color: solicitud.estado === 'recibida'
                  ? colors.success
                  : solicitud.estado === 'rechazada'
                    ? colors.danger
                    : colors.warning
              }}>
                {solicitud.estado === 'recibida' ? '✓ RECIBIDA' : solicitud.estado === 'rechazada' ? '✗ RECHAZADA' : '⏱ PENDIENTE'}
              </div>
            </div>

            <div style={{
              padding: 12,
              backgroundColor: colors.gray50,
              borderRadius: 8,
              marginBottom: 8
            }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{solicitud.producto}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 12 }}>
                <div>
                  <span style={{ color: colors.gray500 }}>Cantidad:</span>
                  <span style={{ fontWeight: 600, marginLeft: 4 }}>
                    {solicitud.cantidadRecibida !== null ? solicitud.cantidadRecibida : solicitud.cantidadSolicitada} uds
                  </span>
                </div>
                <div>
                  <span style={{ color: colors.gray500 }}>Lote:</span>
                  <span style={{ fontWeight: 600, marginLeft: 4 }}>{solicitud.lote}</span>
                </div>
                <div>
                  <span style={{ color: colors.gray500 }}>Caducidad:</span>
                  <span style={{ fontWeight: 600, marginLeft: 4 }}>{solicitud.caducidad}</span>
                </div>
                <div>
                  <span style={{ color: colors.gray500 }}>Motivo:</span>
                </div>
              </div>
              <div style={{ fontSize: 12, color: colors.gray600, marginTop: 4 }}>
                {solicitud.motivo}
              </div>
              {solicitud.fotoCapturada && (
                <div style={{ fontSize: 11, color: colors.success, marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Camera size={12} />
                  Foto evidencia capturada
                </div>
              )}
            </div>

            {solicitud.estado === 'pendiente' && (
              <button
                onClick={() => handleIniciarRecepcion(solicitud)}
                style={{
                  width: '100%',
                  padding: '8px 16px',
                  borderRadius: 8,
                  border: 'none',
                  backgroundColor: colors.primary,
                  color: 'white',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Iniciar Recepción
              </button>
            )}

            {solicitud.estado === 'recibida' && (
              <button
                onClick={() => {
                  setSolicitudActiva(solicitud);
                  setShowNotaCreditoModal(true);
                }}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: 6,
                  border: 'none',
                  backgroundColor: `${colors.success}10`,
                  color: colors.success,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6
                }}
              >
                <FileText size={14} />
                Ver Nota de Crédito
              </button>
            )}
          </div>
        ))}

        {/* Modal de Validación y Recepción */}
        {showValidacionModal && solicitudActiva && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: 16,
            overflow: 'hidden'
          }}>
            <div style={{
              backgroundColor: colors.white,
              borderRadius: 12,
              padding: 24,
              width: '100%',
              maxWidth: 400,
              maxHeight: '85vh',
              overflowY: 'auto',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <RotateCcw size={24} color={colors.primary} />
                <h3 style={{ margin: 0, fontSize: 18 }}>Validar y Recibir Devolución</h3>
              </div>

              {/* Información del Producto */}
              <div style={{
                backgroundColor: colors.gray50,
                padding: 12,
                borderRadius: 8,
                marginBottom: 16
              }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{solicitudActiva.id}</div>
                <div style={{ fontSize: 12, color: colors.gray600, marginBottom: 8 }}>{solicitudActiva.cliente}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray800 }}>{solicitudActiva.producto}</div>
              </div>

              {/* Validación vs. Solicitud */}
              <div style={{
                padding: 12,
                borderRadius: 8,
                border: `1px solid ${colors.primary}`,
                marginBottom: 16
              }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: colors.primary, marginBottom: 8 }}>
                  ✓ VALIDACIÓN DE PRODUCTO
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 12 }}>
                  <div>
                    <div style={{ color: colors.gray500 }}>Lote esperado:</div>
                    <div style={{ fontWeight: 600 }}>{solicitudActiva.lote}</div>
                  </div>
                  <div>
                    <div style={{ color: colors.gray500 }}>Caducidad:</div>
                    <div style={{ fontWeight: 600 }}>{solicitudActiva.caducidad}</div>
                  </div>
                  <div>
                    <div style={{ color: colors.gray500 }}>Cant. solicitada:</div>
                    <div style={{ fontWeight: 600 }}>{solicitudActiva.cantidadSolicitada} uds</div>
                  </div>
                  <div>
                    <div style={{ color: colors.gray500 }}>Motivo:</div>
                    <div style={{ fontSize: 11, marginTop: 2 }}>{solicitudActiva.motivo}</div>
                  </div>
                </div>
              </div>

              {/* Conteo Físico */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: colors.gray700, marginBottom: 6 }}>
                  Cantidad Física Recibida *
                </label>
                <input
                  type="number"
                  value={solicitudActiva.cantidadRecibida || ''}
                  onChange={(e) => handleActualizarCantidad(parseInt(e.target.value) || 0)}
                  placeholder="0"
                  min="0"
                  max={solicitudActiva.cantidadSolicitada}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: `1px solid ${colors.gray300}`,
                    fontSize: 16,
                    fontWeight: 600
                  }}
                />
                {solicitudActiva.cantidadRecibida && solicitudActiva.cantidadRecibida !== solicitudActiva.cantidadSolicitada && (
                  <div style={{
                    fontSize: 11,
                    color: colors.warning,
                    marginTop: 4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}>
                    <AlertCircle size={12} />
                    Discrepancia: {Math.abs(solicitudActiva.cantidadSolicitada - solicitudActiva.cantidadRecibida)} unidades
                  </div>
                )}
              </div>

              {/* Captura de Foto */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: colors.gray700, marginBottom: 6 }}>
                  Evidencia Fotográfica *
                </label>
                <button
                  onClick={handleTomarFoto}
                  style={{
                    width: '100%',
                    padding: solicitudActiva.fotoCapturada ? '16px' : '40px 20px',
                    borderRadius: 12,
                    border: solicitudActiva.fotoCapturada ? `2px solid ${colors.success}` : `2px dashed ${colors.gray300}`,
                    backgroundColor: solicitudActiva.fotoCapturada ? `${colors.success}08` : colors.gray50,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8
                  }}
                >
                  <Camera size={solicitudActiva.fotoCapturada ? 24 : 32} color={solicitudActiva.fotoCapturada ? colors.success : colors.gray400} />
                  <span style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: solicitudActiva.fotoCapturada ? colors.success : colors.gray600
                  }}>
                    {solicitudActiva.fotoCapturada ? '✓ Foto Capturada' : 'Tomar Foto del Producto'}
                  </span>
                </button>
              </div>

              {/* Observaciones */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: colors.gray700, marginBottom: 6 }}>
                  Observaciones (opcional)
                </label>
                <textarea
                  value={solicitudActiva.observaciones}
                  onChange={(e) => setSolicitudActiva({ ...solicitudActiva, observaciones: e.target.value })}
                  placeholder="Ej: Empaques en buen estado, producto en condiciones óptimas..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: `1px solid ${colors.gray300}`,
                    fontSize: 13,
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Botones de Acción */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button
                  onClick={handleConfirmarRecepcion}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 8,
                    border: 'none',
                    backgroundColor: colors.success,
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6
                  }}
                >
                  <CheckCircle size={18} />
                  Confirmar Recepción
                </button>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={handleRechazarDevolucion}
                    style={{
                      flex: 1,
                      padding: '10px 16px',
                      borderRadius: 8,
                      border: 'none',
                      backgroundColor: colors.danger,
                      color: 'white',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Rechazar
                  </button>
                  <button
                    onClick={() => {
                      setShowValidacionModal(false);
                      setSolicitudActiva(null);
                    }}
                    style={{
                      flex: 1,
                      padding: '10px 16px',
                      borderRadius: 8,
                      border: `1px solid ${colors.gray300}`,
                      backgroundColor: 'white',
                      color: colors.gray700,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Confirmación */}
        {showConfirmacionModal && solicitudActiva && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1001,
            padding: 16,
            overflow: 'hidden'
          }}>
            <div style={{
              backgroundColor: colors.white,
              borderRadius: 12,
              padding: 24,
              width: '100%',
              maxWidth: 400,
              textAlign: 'center',
              position: 'relative'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: `${colors.success}20`,
                marginBottom: 16
              }}>
                <CheckCircle size={32} color={colors.success} />
              </div>
              <h3 style={{ margin: 0, fontSize: 20, marginBottom: 8 }}>¡Devolución Recibida!</h3>
              <p style={{ fontSize: 14, color: colors.gray600, marginBottom: 20 }}>
                La devolución {solicitudActiva.id} ha sido confirmada exitosamente.
              </p>

              <div style={{
                backgroundColor: colors.gray50,
                padding: 16,
                borderRadius: 10,
                textAlign: 'left',
                marginBottom: 16
              }}>
                <div style={{ fontSize: 12, color: colors.gray600, marginBottom: 8 }}>Resumen de Recepción</div>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{solicitudActiva.producto}</div>
                <div style={{ fontSize: 13, marginBottom: 2 }}>
                  <span style={{ color: colors.gray600 }}>Cantidad recibida:</span>
                  <span style={{ fontWeight: 600, marginLeft: 4 }}>{solicitudActiva.cantidadRecibida} unidades</span>
                </div>
                <div style={{ fontSize: 13 }}>
                  <span style={{ color: colors.gray600 }}>Lote:</span>
                  <span style={{ fontWeight: 600, marginLeft: 4 }}>{solicitudActiva.lote}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={handleGenerarNotaCredito}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    borderRadius: 8,
                    border: 'none',
                    backgroundColor: colors.primary,
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6
                  }}
                >
                  <FileText size={18} />
                  Generar Nota de Crédito
                </button>
                <button
                  onClick={() => {
                    setShowConfirmacionModal(false);
                    setSolicitudActiva(null);
                  }}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    borderRadius: 8,
                    border: `1px solid ${colors.gray300}`,
                    backgroundColor: 'white',
                    color: colors.gray700,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Nota de Crédito */}
        {showNotaCreditoModal && solicitudActiva && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1002,
            padding: 16,
            overflow: 'hidden'
          }}>
            <div style={{
              backgroundColor: colors.white,
              borderRadius: 12,
              padding: 24,
              width: '100%',
              maxWidth: 400,
              maxHeight: '80vh',
              overflowY: 'auto',
              position: 'relative'
            }}>
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  backgroundColor: `${colors.primary}20`,
                  marginBottom: 12
                }}>
                  <FileText size={32} color={colors.primary} />
                </div>
                <h3 style={{ margin: 0, fontSize: 20, marginBottom: 8 }}>Nota de Crédito Generada</h3>
                <p style={{ fontSize: 14, color: colors.gray600, margin: 0 }}>
                  NC-{new Date().getFullYear()}-{String(Math.floor(Math.random() * 999) + 100).padStart(3, '0')}
                </p>
              </div>

              <div style={{
                backgroundColor: colors.gray50,
                padding: 16,
                borderRadius: 10,
                marginBottom: 16
              }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: colors.gray500, marginBottom: 8 }}>CLIENTE</div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{solicitudActiva.cliente}</div>
                <div style={{ fontSize: 12, color: colors.gray600, marginTop: 4 }}>
                  Fecha: {new Date().toLocaleDateString('es-MX')}
                </div>
              </div>

              <div style={{
                backgroundColor: 'white',
                padding: 16,
                borderRadius: 10,
                border: `1px solid ${colors.gray200}`,
                marginBottom: 16
              }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: colors.gray500, marginBottom: 12 }}>
                  DETALLE DE DEVOLUCIÓN
                </div>
                <div style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{solicitudActiva.producto}</div>
                  <div style={{ fontSize: 12, color: colors.gray600, marginTop: 2 }}>
                    Lote: {solicitudActiva.lote} • Cad: {solicitudActiva.caducidad}
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                  <span style={{ color: colors.gray600 }}>Cantidad devuelta:</span>
                  <span style={{ fontWeight: 600 }}>{solicitudActiva.cantidadRecibida || solicitudActiva.cantidadSolicitada} uds</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                  <span style={{ color: colors.gray600 }}>Precio unitario:</span>
                  <span style={{ fontWeight: 600 }}>$25.00</span>
                </div>
                <div style={{ borderTop: `1px solid ${colors.gray200}`, marginTop: 8, paddingTop: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: colors.gray600 }}>Motivo:</span>
                  </div>
                  <div style={{ fontSize: 12, color: colors.gray700, marginTop: 2 }}>
                    {solicitudActiva.motivo}
                  </div>
                </div>
              </div>

              <div style={{
                backgroundColor: `${colors.success}10`,
                border: `1px solid ${colors.success}`,
                padding: 16,
                borderRadius: 10,
                marginBottom: 20
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: colors.gray700 }}>Monto de Nota de Crédito:</span>
                  <span style={{ fontSize: 22, fontWeight: 700, color: colors.success }}>
                    ${((solicitudActiva.cantidadRecibida || solicitudActiva.cantidadSolicitada) * 25).toFixed(2)}
                  </span>
                </div>
              </div>

              <div style={{
                padding: 12,
                backgroundColor: `${colors.primary}08`,
                borderRadius: 8,
                fontSize: 12,
                color: colors.gray700,
                marginBottom: 16
              }}>
                <div style={{ fontWeight: 600, marginBottom: 4, color: colors.primary }}>✓ Nota de Crédito Actualizada</div>
                Esta nota de crédito se ha registrado automáticamente y estará disponible para aplicarse en futuras cobranzas del cliente.
              </div>

              <button
                onClick={() => {
                  setShowNotaCreditoModal(false);
                  setSolicitudActiva(null);
                }}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  borderRadius: 8,
                  border: `1px solid ${colors.gray300}`,
                  backgroundColor: 'white',
                  color: colors.gray700,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecepcionDevolucion;
