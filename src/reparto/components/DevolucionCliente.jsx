import React, { useState } from 'react';
import { RotateCcw, Camera, CheckCircle, AlertCircle, FileText, Check, X } from 'lucide-react';
import { colors } from '../../shared/colors.js';

const DevolucionCliente = ({ cliente, onNavigate }) => {
  const [devoluciones, setDevoluciones] = useState([
    {
      id: 'DEV-001',
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
      id: 'DEV-002',
      producto: 'Yogurt Natural 1kg',
      cantidadSolicitada: 8,
      cantidadRecibida: null,
      lote: 'L20241218',
      caducidad: '18 Ene 2025',
      motivo: 'Producto caducado',
      estado: 'pendiente',
      fotoCapturada: null,
      observaciones: ''
    }
  ]);

  const [devolucionActiva, setDevolucionActiva] = useState(null);
  const [showValidacionScreen, setShowValidacionScreen] = useState(false);
  const [showNotaCreditoScreen, setShowNotaCreditoScreen] = useState(false);

  const devolucionesPendientes = devoluciones.filter(d => d.estado === 'pendiente').length;
  const devolucionesCompletadas = devoluciones.filter(d => d.estado === 'recibida').length;

  const handleIniciarValidacion = (devolucion) => {
    setDevolucionActiva({ ...devolucion });
    setShowValidacionScreen(true);
  };

  const handleTomarFoto = () => {
    const filename = `foto_dev_${Date.now()}.jpg`;
    setDevolucionActiva({ ...devolucionActiva, fotoCapturada: filename });
    alert('📸 Foto capturada exitosamente');
  };

  const handleActualizarCantidad = (cantidad) => {
    setDevolucionActiva({ ...devolucionActiva, cantidadRecibida: cantidad });
  };

  const handleConfirmarRecepcion = () => {
    if (!devolucionActiva.cantidadRecibida || devolucionActiva.cantidadRecibida <= 0) {
      alert('⚠️ Ingresa la cantidad recibida');
      return;
    }
    if (!devolucionActiva.fotoCapturada) {
      alert('⚠️ Captura una foto del producto');
      return;
    }

    setDevoluciones(devoluciones.map(d =>
      d.id === devolucionActiva.id
        ? {
          ...d,
          estado: 'recibida',
          cantidadRecibida: devolucionActiva.cantidadRecibida,
          fotoCapturada: devolucionActiva.fotoCapturada,
          observaciones: devolucionActiva.observaciones
        }
        : d
    ));

    setShowValidacionScreen(false);
    setShowNotaCreditoScreen(true);
  };

  const handleRechazarDevolucion = () => {
    if (!confirm('¿Estás seguro de rechazar esta devolución?')) return;

    setDevoluciones(devoluciones.map(d =>
      d.id === devolucionActiva.id ? { ...d, estado: 'rechazada' } : d
    ));
    setShowValidacionScreen(false);
    setDevolucionActiva(null);
  };

  const handleGenerarNotaCredito = () => {
    const montoNC = (devolucionActiva.cantidadRecibida * 42.50).toFixed(2);
    alert(`✅ Nota de Crédito Generada\n\nFolio: NC-2026-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}\nProducto: ${devolucionActiva.producto}\nCantidad: ${devolucionActiva.cantidadRecibida} uds\nMonto: $${montoNC}\n\nSe ha registrado correctamente.`);
    setShowNotaCreditoScreen(false);
    setDevolucionActiva(null);
  };

  const handleRegresarResumen = () => {
    onNavigate('resumen-cliente', cliente);
  };

  // Pantalla de Validación de Devolución
  if (showValidacionScreen && devolucionActiva) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: colors.gray50,
        paddingBottom: 80
      }}>
        <div style={{
          background: `linear-gradient(135deg, ${colors.warning} 0%, ${colors.accent} 100%)`,
          padding: 20,
          color: 'white',
          marginBottom: 16
        }}>
          <div style={{ fontSize: 12, opacity: 0.9, marginBottom: 4 }}>Validación de Devolución</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{devolucionActiva.producto}</div>
          <div style={{ fontSize: 13, opacity: 0.9, marginTop: 4 }}>{cliente.cliente}</div>
        </div>

        <div style={{ padding: 16 }}>
          {/* Información del Producto */}
          <div style={{
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 12,
            boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
            marginBottom: 16
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: colors.primary, marginBottom: 12 }}>
              ✓ INFORMACIÓN DE DEVOLUCIÓN
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 13 }}>
              <div>
                <div style={{ fontSize: 11, color: colors.gray500, marginBottom: 4 }}>Lote esperado:</div>
                <div style={{ fontWeight: 600 }}>{devolucionActiva.lote}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: colors.gray500, marginBottom: 4 }}>Caducidad:</div>
                <div style={{ fontWeight: 600 }}>{devolucionActiva.caducidad}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: colors.gray500, marginBottom: 4 }}>Cant. solicitada:</div>
                <div style={{ fontWeight: 600 }}>{devolucionActiva.cantidadSolicitada} uds</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: colors.gray500, marginBottom: 4 }}>Folio:</div>
                <div style={{ fontWeight: 600 }}>{devolucionActiva.id}</div>
              </div>
            </div>
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${colors.gray200}` }}>
              <div style={{ fontSize: 11, color: colors.gray500, marginBottom: 4 }}>Motivo:</div>
              <div style={{ fontSize: 12, color: colors.gray700 }}>{devolucionActiva.motivo}</div>
            </div>
          </div>

          {/* Conteo Físico */}
          <div style={{
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 12,
            boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
            marginBottom: 16
          }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: colors.gray800, marginBottom: 8 }}>
              Cantidad Física Recibida *
            </label>
            <input
              type="number"
              value={devolucionActiva.cantidadRecibida || ''}
              onChange={(e) => handleActualizarCantidad(parseInt(e.target.value) || 0)}
              placeholder="0"
              min="0"
              max={devolucionActiva.cantidadSolicitada}
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: 10,
                border: `2px solid ${colors.gray300}`,
                fontSize: 18,
                fontWeight: 600,
                boxSizing: 'border-box'
              }}
            />
            {devolucionActiva.cantidadRecibida && devolucionActiva.cantidadRecibida !== devolucionActiva.cantidadSolicitada && (
              <div style={{
                fontSize: 11,
                color: colors.warning,
                marginTop: 6,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: 8,
                backgroundColor: colors.warning + '15',
                borderRadius: 6
              }}>
                <AlertCircle size={14} />
                Discrepancia: {Math.abs(devolucionActiva.cantidadSolicitada - devolucionActiva.cantidadRecibida)} unidades de diferencia
              </div>
            )}
          </div>

          {/* Captura de Foto */}
          <div style={{
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 12,
            boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
            marginBottom: 16
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: colors.gray800, marginBottom: 8 }}>
              Evidencia Fotográfica *
            </div>
            <button
              onClick={handleTomarFoto}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 10,
                border: devolucionActiva.fotoCapturada ? `2px solid ${colors.success}` : `2px dashed ${colors.gray300}`,
                backgroundColor: devolucionActiva.fotoCapturada ? colors.success + '10' : colors.gray50,
                color: devolucionActiva.fotoCapturada ? colors.success : colors.gray700,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8
              }}
            >
              {devolucionActiva.fotoCapturada ? (
                <>
                  <CheckCircle size={18} />
                  Foto Capturada
                </>
              ) : (
                <>
                  <Camera size={18} />
                  Tomar Foto del Producto
                </>
              )}
            </button>
          </div>

          {/* Observaciones */}
          <div style={{
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 12,
            boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
            marginBottom: 16
          }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: colors.gray800, marginBottom: 8 }}>
              Observaciones (Opcional)
            </label>
            <textarea
              value={devolucionActiva.observaciones}
              onChange={(e) => setDevolucionActiva({ ...devolucionActiva, observaciones: e.target.value })}
              placeholder="Agrega notas adicionales sobre el estado del producto..."
              rows={3}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 8,
                border: `1px solid ${colors.gray300}`,
                fontSize: 13,
                resize: 'vertical',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
            />
          </div>
        </div>

        {/* Footer con botones */}
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 16,
          backgroundColor: 'white',
          borderTop: `1px solid ${colors.gray200}`,
          display: 'flex',
          gap: 10
        }}>
          <button
            onClick={handleRechazarDevolucion}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: 10,
              border: `2px solid ${colors.danger}`,
              backgroundColor: 'white',
              color: colors.danger,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6
            }}
          >
            <X size={18} />
            Rechazar
          </button>
          <button
            onClick={handleConfirmarRecepcion}
            style={{
              flex: 2,
              padding: '12px 16px',
              borderRadius: 10,
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
            <Check size={18} />
            Confirmar Recepción
          </button>
        </div>
      </div>
    );
  }

  // Pantalla de Nota de Crédito
  if (showNotaCreditoScreen && devolucionActiva) {
    const montoNC = (devolucionActiva.cantidadRecibida * 42.50).toFixed(2);
    
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: colors.gray50,
        padding: 16
      }}>
        <div style={{
          textAlign: 'center',
          paddingTop: 40
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: colors.success + '20',
            marginBottom: 20
          }}>
            <CheckCircle size={48} color={colors.success} />
          </div>

          <h2 style={{ fontSize: 22, fontWeight: 700, color: colors.gray800, marginBottom: 8 }}>
            ¡Devolución Recibida!
          </h2>
          <p style={{ fontSize: 14, color: colors.gray600, marginBottom: 30 }}>
            Se ha registrado correctamente la devolución
          </p>

          <div style={{
            backgroundColor: 'white',
            padding: 24,
            borderRadius: 12,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            marginBottom: 24,
            textAlign: 'left'
          }}>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <FileText size={32} color={colors.primary} style={{ margin: '0 auto' }} />
              <div style={{ fontSize: 16, fontWeight: 700, color: colors.gray800, marginTop: 8 }}>
                Nota de Crédito
              </div>
            </div>

            <div style={{ fontSize: 13, marginBottom: 8 }}>
              <span style={{ color: colors.gray500 }}>Folio:</span>
              <span style={{ fontWeight: 600, marginLeft: 8 }}>NC-2026-{String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}</span>
            </div>
            <div style={{ fontSize: 13, marginBottom: 8 }}>
              <span style={{ color: colors.gray500 }}>Producto:</span>
              <span style={{ fontWeight: 600, marginLeft: 8 }}>{devolucionActiva.producto}</span>
            </div>
            <div style={{ fontSize: 13, marginBottom: 8 }}>
              <span style={{ color: colors.gray500 }}>Cantidad:</span>
              <span style={{ fontWeight: 600, marginLeft: 8 }}>{devolucionActiva.cantidadRecibida} unidades</span>
            </div>
            <div style={{ 
              fontSize: 13,
              paddingTop: 12,
              marginTop: 12,
              borderTop: `1px solid ${colors.gray200}`
            }}>
              <span style={{ color: colors.gray500 }}>Monto:</span>
              <span style={{ fontSize: 20, fontWeight: 700, color: colors.success, marginLeft: 8 }}>
                ${montoNC}
              </span>
            </div>
          </div>

          <button
            onClick={handleGenerarNotaCredito}
            style={{
              width: '100%',
              padding: '14px 20px',
              borderRadius: 12,
              border: 'none',
              backgroundColor: colors.primary,
              color: 'white',
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
              marginBottom: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8
            }}
          >
            <FileText size={20} />
            Generar Nota de Crédito
          </button>

          <button
            onClick={() => setShowNotaCreditoScreen(false)}
            style={{
              width: '100%',
              padding: '12px 20px',
              borderRadius: 12,
              border: `1px solid ${colors.gray300}`,
              backgroundColor: 'white',
              color: colors.gray700,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Después
          </button>
        </div>
      </div>
    );
  }

  // Pantalla Principal - Lista de Devoluciones
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.gray50,
      paddingBottom: 80
    }}>
      <div style={{
        background: `linear-gradient(135deg, ${colors.warning} 0%, ${colors.accent} 100%)`,
        padding: 20,
        color: 'white',
        marginBottom: 16
      }}>
        <div style={{ fontSize: 12, opacity: 0.9, marginBottom: 4 }}>Devoluciones de</div>
        <div style={{ fontSize: 20, fontWeight: 700 }}>{cliente.cliente}</div>
        <div style={{ fontSize: 13, opacity: 0.9, marginTop: 4 }}>{cliente.direccion}</div>
      </div>

      <div style={{ padding: 16 }}>
        {/* Estadísticas */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          <div style={{
            flex: 1,
            backgroundColor: 'white',
            padding: 14,
            borderRadius: 10,
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
          }}>
            <div style={{ fontSize: 11, color: colors.gray500, marginBottom: 4 }}>Pendientes</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: colors.warning }}>{devolucionesPendientes}</div>
          </div>
          <div style={{
            flex: 1,
            backgroundColor: 'white',
            padding: 14,
            borderRadius: 10,
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
          }}>
            <div style={{ fontSize: 11, color: colors.gray500, marginBottom: 4 }}>Completadas</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: colors.success }}>{devolucionesCompletadas}</div>
          </div>
        </div>

        <div style={{ fontSize: 12, fontWeight: 600, color: colors.gray500, marginBottom: 12 }}>
          PRODUCTOS A DEVOLVER
        </div>

        {/* Lista de Devoluciones */}
        {devoluciones.map((devolucion) => (
          <div
            key={devolucion.id}
            style={{
              backgroundColor: devolucion.estado === 'recibida' ? colors.success + '08' : 'white',
              padding: 16,
              borderRadius: 12,
              marginBottom: 12,
              border: devolucion.estado === 'recibida' ? `2px solid ${colors.success}` : `1px solid ${colors.gray200}`,
              boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray800, marginBottom: 4 }}>
                  {devolucion.producto}
                </div>
                <div style={{ fontSize: 12, color: colors.gray600 }}>
                  Folio: {devolucion.id}
                </div>
              </div>
              <div style={{
                padding: '4px 10px',
                borderRadius: 6,
                fontSize: 10,
                fontWeight: 600,
                backgroundColor: devolucion.estado === 'recibida' ? colors.success + '20' : colors.warning + '20',
                color: devolucion.estado === 'recibida' ? colors.success : colors.warning
              }}>
                {devolucion.estado === 'recibida' ? '✓ Recibida' : 'Pendiente'}
              </div>
            </div>

            <div style={{ fontSize: 12, color: colors.gray600, marginBottom: 8 }}>
              <strong>Cantidad:</strong> {devolucion.cantidadSolicitada} uds • 
              <strong> Lote:</strong> {devolucion.lote}
            </div>

            <div style={{
              fontSize: 11,
              color: colors.gray500,
              padding: 8,
              backgroundColor: colors.gray50,
              borderRadius: 6,
              marginBottom: 10
            }}>
              {devolucion.motivo}
            </div>

            {devolucion.estado === 'pendiente' && (
              <button
                onClick={() => handleIniciarValidacion(devolucion)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 8,
                  border: 'none',
                  backgroundColor: colors.warning,
                  color: 'white',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6
                }}
              >
                <RotateCcw size={16} />
                Iniciar Validación
              </button>
            )}

            {devolucion.estado === 'recibida' && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: colors.success,
                fontSize: 12,
                fontWeight: 600
              }}>
                <CheckCircle size={16} />
                Recibida: {devolucion.cantidadRecibida} unidades
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer con botón regresar */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: 'white',
        borderTop: `1px solid ${colors.gray200}`
      }}>
        <button
          onClick={handleRegresarResumen}
          style={{
            width: '100%',
            padding: '14px 20px',
            borderRadius: 12,
            border: `1px solid ${colors.gray300}`,
            backgroundColor: 'white',
            color: colors.gray700,
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          ← Regresar a Resumen del Cliente
        </button>
      </div>
    </div>
  );
};

export default DevolucionCliente;
