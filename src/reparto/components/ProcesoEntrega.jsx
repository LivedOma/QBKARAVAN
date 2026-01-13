import React, { useState } from 'react';
import { MapPin, Phone, Navigation, LogIn, LogOut, Package, DollarSign, Clock, Check, X, CheckCircle, XCircle, AlertCircle, Camera, Send, MessageCircle, MessageSquare, Mail } from 'lucide-react';
import { colors } from '../../shared/colors.js';

const ProcesoEntrega = ({ entrega, onNavigate, onCompletarEntrega }) => {
  const [productos, setProductos] = useState([
    { id: 1, name: 'Leche Entera 1L', qty: 24, delivered: null, motivo: '' },
    { id: 2, name: 'Yogurt Natural 1kg', qty: 12, delivered: null, motivo: '' },
    { id: 3, name: 'Queso Panela 400g', qty: 8, delivered: null, motivo: '' },
    { id: 4, name: 'Crema Ácida 500ml', qty: 6, delivered: null, motivo: '' },
  ]);
  const [showMotivoModal, setShowMotivoModal] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [showComprobanteModal, setShowComprobanteModal] = useState(false);
  const [showEnvioModal, setShowEnvioModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [fotoEntrega, setFotoEntrega] = useState(null);
  const [showFirmaModal, setShowFirmaModal] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [firmaGuardada, setFirmaGuardada] = useState(false);
  const [signaturePoints, setSignaturePoints] = useState([]);

  const motivos = [
    'Cliente ausente',
    'No tiene dinero',
    'Rechaza producto',
    'Producto en mal estado',
    'No pidió este producto',
    'Otro motivo'
  ];

  const handleConfirmProduct = (id, confirmed) => {
    if (!confirmed) {
      setSelectedProducto(id);
      setShowMotivoModal(true);
    } else {
      setProductos(productos.map(p => p.id === id ? { ...p, delivered: true, motivo: '' } : p));
    }
  };

  const handleSaveMotivoRechazo = (motivo) => {
    setProductos(productos.map(p => p.id === selectedProducto ? { ...p, delivered: false, motivo } : p));
    setShowMotivoModal(false);
    setSelectedProducto(null);
  };

  const handleConfirmarEntrega = () => {
    setShowComprobanteModal(true);
  };

  const handleEnviarComprobante = () => {
    setShowComprobanteModal(false);
    setShowEnvioModal(true);
  };

  const handleTomarFoto = () => {
    setPhotoTaken(true);
    setTimeout(() => {
      setFotoEntrega(Date.now()); // Simula que se tomó una foto
      alert('✓ Foto capturada exitosamente');
      setShowCameraModal(false);
      setPhotoTaken(false);
    }, 1500);
  };

  const handleLimpiarFirma = () => {
    setSignaturePoints([]);
  };

  const handleGuardarFirma = () => {
    if (signaturePoints.length > 0) {
      setFirmaGuardada(true);
      setShowFirmaModal(false);
      alert('✓ Firma guardada exitosamente');
    } else {
      alert('⚠️ Por favor, agregue su firma antes de guardar');
    }
  };

  const productosEntregados = productos.filter(p => p.delivered === true);
  const productosNoEntregados = productos.filter(p => p.delivered === false);
  const todosProductosRevisados = productos.every(p => p.delivered !== null);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.gray50,
      paddingBottom: 20,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ padding: 16, paddingBottom: 240 }}>
        {/* Card Cliente */}
        <div style={{
          backgroundColor: 'white',
          padding: 16,
          borderRadius: 12,
          marginBottom: 16,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: colors.accent,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.white,
              fontWeight: 700
            }}>
              1
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 600 }}>{entrega?.cliente || 'Cliente'}</div>
              <div style={{
                fontSize: 12,
                color: colors.gray500,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                marginTop: 4
              }}>
                <MapPin size={12} />
                {entrega?.direccion || 'Dirección'}
              </div>
              <div style={{
                fontSize: 12,
                color: colors.gray500,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                marginTop: 2
              }}>
                <Phone size={12} />
                81 1234 5678
              </div>
            </div>
            <button style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: 'none',
              backgroundColor: colors.primary,
              color: 'white',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}>
              <Navigation size={14} />
              Ir
            </button>
          </div>
        </div>

        {/* Métricas */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <div style={{
            flex: 1,
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 10,
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <Package size={20} color={colors.primary} style={{ margin: '0 auto' }} />
            <div style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>8</div>
            <div style={{ fontSize: 10, color: colors.gray500 }}>Productos</div>
          </div>
          <div style={{
            flex: 1,
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 10,
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <DollarSign size={20} color={colors.success} style={{ margin: '0 auto' }} />
            <div style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>$2,535</div>
            <div style={{ fontSize: 10, color: colors.gray500 }}>Por cobrar</div>
          </div>
          <div style={{
            flex: 1,
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 10,
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <Clock size={20} color={colors.warning} style={{ margin: '0 auto' }} />
            <div style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>9:30</div>
            <div style={{ fontSize: 10, color: colors.gray500 }}>Hora est.</div>
          </div>
        </div>

        <div style={{ fontSize: 12, fontWeight: 600, color: colors.gray500, marginBottom: 8 }}>
          PRODUCTOS A ENTREGAR
        </div>

        {/* Lista de Productos */}
        {productos.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: item.delivered === true ? `${colors.success}08` :
                             item.delivered === false ? `${colors.danger}08` : 'white',
              padding: 16,
              borderRadius: 10,
              marginBottom: 8,
              border: item.delivered !== null ?
                `1px solid ${item.delivered ? colors.success : colors.danger}` :
                `1px solid ${colors.gray200}`,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{item.name}</div>
                <div style={{ fontSize: 12, color: colors.gray500 }}>{item.qty} unidades</div>
                {item.delivered === false && item.motivo && (
                  <div style={{
                    fontSize: 11,
                    color: colors.danger,
                    marginTop: 4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}>
                    <AlertCircle size={12} />
                    {item.motivo}
                  </div>
                )}
              </div>
              {item.delivered === null && (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => handleConfirmProduct(item.id, false)}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      border: `1px solid ${colors.danger}`,
                      backgroundColor: colors.white,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <X size={18} color={colors.danger} />
                  </button>
                  <button
                    onClick={() => handleConfirmProduct(item.id, true)}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      border: 'none',
                      backgroundColor: colors.success,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Check size={18} color={colors.white} />
                  </button>
                </div>
              )}
              {item.delivered === true && <CheckCircle size={24} color={colors.success} />}
              {item.delivered === false && <XCircle size={24} color={colors.danger} />}
            </div>
          </div>
        ))}

        {/* Modal Motivo de Rechazo */}
        {showMotivoModal && (
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
              position: 'relative'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <AlertCircle size={24} color={colors.warning} />
                <h3 style={{ margin: 0, fontSize: 18 }}>Motivo de No Entrega</h3>
              </div>
              <p style={{ fontSize: 14, color: colors.gray600, marginBottom: 16 }}>
                Selecciona el motivo por el cual no se entregó este producto:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                {motivos.map((motivo, index) => (
                  <button
                    key={index}
                    onClick={() => handleSaveMotivoRechazo(motivo)}
                    style={{
                      padding: '12px 16px',
                      borderRadius: 8,
                      border: `1px solid ${colors.gray300}`,
                      backgroundColor: colors.white,
                      fontSize: 14,
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.gray50;
                      e.currentTarget.style.borderColor = colors.primary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = colors.white;
                      e.currentTarget.style.borderColor = colors.gray300;
                    }}
                  >
                    {motivo}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  setShowMotivoModal(false);
                  setSelectedProducto(null);
                }}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  borderRadius: 8,
                  border: `1px solid ${colors.gray300}`,
                  backgroundColor: 'white',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Modal Comprobante */}
        {showComprobanteModal && (
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
              padding: 20,
              width: '100%',
              maxWidth: 400,
              maxHeight: '85vh',
              overflowY: 'auto',
              position: 'relative'
            }}>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: `${colors.success}20`,
                  marginBottom: 10
                }}>
                  <CheckCircle size={28} color={colors.success} />
                </div>
                <h3 style={{ margin: 0, fontSize: 18, marginBottom: 6 }}>¡Entrega Confirmada!</h3>
                <p style={{ fontSize: 13, color: colors.gray600, margin: 0 }}>
                  Comprobante de Entrega #ENT-2024-0127
                </p>
              </div>

              <div style={{
                backgroundColor: colors.gray50,
                padding: 12,
                borderRadius: 8,
                marginBottom: 12
              }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: colors.gray500, marginBottom: 6 }}>
                  CLIENTE
                </div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{entrega?.cliente}</div>
                <div style={{ fontSize: 12, color: colors.gray600 }}>{entrega?.direccion}</div>
              </div>

              <div style={{
                backgroundColor: 'white',
                padding: 12,
                borderRadius: 8,
                border: `1px solid ${colors.gray200}`,
                marginBottom: 12
              }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: colors.gray500, marginBottom: 6 }}>
                  PRODUCTOS ENTREGADOS
                </div>
                {productosEntregados.map((p, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontSize: 13 }}>{p.name}</span>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{p.qty} uds</span>
                  </div>
                ))}
                {productosNoEntregados.length > 0 && (
                  <>
                    <div style={{ borderTop: `1px solid ${colors.gray200}`, marginTop: 6, paddingTop: 6 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: colors.danger, marginBottom: 3 }}>
                        NO ENTREGADOS
                      </div>
                      {productosNoEntregados.map((p, i) => (
                        <div key={i} style={{ fontSize: 11, color: colors.gray600, marginBottom: 2 }}>
                          • {p.name} - {p.motivo}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div style={{
                backgroundColor: `${colors.success}10`,
                border: `1px solid ${colors.success}`,
                padding: 12,
                borderRadius: 8,
                marginBottom: 12
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Total Entregado:</span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: colors.success }}>$2,535.00</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={handleEnviarComprobante}
                  style={{
                    flex: 1,
                    padding: '10px 14px',
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
                  <Send size={16} />
                  Enviar
                </button>
                <button
                  onClick={() => {
                    setShowComprobanteModal(false);
                    onNavigate('cobranza');
                  }}
                  style={{
                    flex: 1,
                    padding: '10px 14px',
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

        {/* Modal Envío */}
        {showEnvioModal && (
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
              position: 'relative'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <Send size={24} color={colors.primary} />
                <h3 style={{ margin: 0, fontSize: 18 }}>Enviar Comprobante</h3>
              </div>
              <p style={{ fontSize: 14, color: colors.gray600, marginBottom: 20 }}>
                Selecciona el método de envío para el comprobante de entrega:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                <button
                  onClick={() => {
                    alert('Comprobante enviado por WhatsApp');
                    setShowEnvioModal(false);
                    onNavigate('cobranza');
                  }}
                  style={{
                    padding: '16px',
                    borderRadius: 8,
                    border: `1px solid ${colors.success}`,
                    backgroundColor: `${colors.success}10`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    cursor: 'pointer'
                  }}
                >
                  <MessageCircle size={24} color={colors.success} />
                  <div style={{ textAlign: 'left', flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: colors.success }}>WhatsApp</div>
                    <div style={{ fontSize: 12, color: colors.gray600 }}>+52 555 123 4567</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    alert('Comprobante enviado por SMS');
                    setShowEnvioModal(false);
                    onNavigate('cobranza');
                  }}
                  style={{
                    padding: '16px',
                    borderRadius: 8,
                    border: `1px solid ${colors.primary}`,
                    backgroundColor: `${colors.primary}10`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    cursor: 'pointer'
                  }}
                >
                  <MessageSquare size={24} color={colors.primary} />
                  <div style={{ textAlign: 'left', flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: colors.primary }}>SMS</div>
                    <div style={{ fontSize: 12, color: colors.gray600 }}>+52 555 123 4567</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    alert('Comprobante enviado por Email');
                    setShowEnvioModal(false);
                    onNavigate('cobranza');
                  }}
                  style={{
                    padding: '16px',
                    borderRadius: 8,
                    border: `1px solid ${colors.accent}`,
                    backgroundColor: `${colors.accent}10`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    cursor: 'pointer'
                  }}
                >
                  <Mail size={24} color={colors.accent} />
                  <div style={{ textAlign: 'left', flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: colors.accent }}>Email</div>
                    <div style={{ fontSize: 12, color: colors.gray600 }}>contacto@abarrotes.com</div>
                  </div>
                </button>
              </div>

              <button
                onClick={() => setShowEnvioModal(false)}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  borderRadius: 8,
                  border: `1px solid ${colors.gray300}`,
                  backgroundColor: 'white',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer con botones de acción */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: 'white',
        borderTop: `1px solid ${colors.gray200}`,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <button 
            onClick={() => setShowCameraModal(true)}
            style={{
            flex: 1,
            padding: '10px 16px',
            borderRadius: 8,
            border: fotoEntrega ? `2px solid ${colors.success}` : `1px solid ${colors.gray300}`,
            backgroundColor: fotoEntrega ? `${colors.success}10` : 'white',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            color: fotoEntrega ? colors.success : colors.gray700
          }}>
            {fotoEntrega ? <CheckCircle size={18} /> : <Camera size={18} />}
            {fotoEntrega ? 'Foto Tomada' : 'Foto Entrega'}
          </button>
          <button 
            onClick={() => setShowFirmaModal(true)}
            style={{
            flex: 1,
            padding: '10px 16px',
            borderRadius: 8,
            border: firmaGuardada ? `2px solid ${colors.success}` : `1px solid ${colors.gray300}`,
            backgroundColor: firmaGuardada ? `${colors.success}10` : 'white',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            color: firmaGuardada ? colors.success : colors.gray700
          }}>
            {firmaGuardada ? <CheckCircle size={18} /> : <Send size={18} />}
            {firmaGuardada ? 'Firmado' : 'Firma'}
          </button>
        </div>
        <button
          onClick={handleConfirmarEntrega}
          disabled={!todosProductosRevisados}
          style={{
            width: '100%',
            padding: '14px 20px',
            borderRadius: 12,
            border: 'none',
            backgroundColor: todosProductosRevisados ? colors.success : colors.gray300,
            color: 'white',
            fontSize: 16,
            fontWeight: 600,
            cursor: todosProductosRevisados ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            opacity: todosProductosRevisados ? 1 : 0.6
          }}
        >
          <CheckCircle size={20} />
          Confirmar Entrega y Cobrar
        </button>
      </div>

      {/* Modal de Cámara - Estilo Android */}
      {showCameraModal && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: colors.gray900,
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header oscuro con controles */}
          <div style={{
            padding: '12px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)'
          }}>
            <button
              onClick={() => setShowCameraModal(false)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={28} color="white" strokeWidth={2} />
            </button>
            <div style={{
              color: 'white',
              fontSize: 16,
              fontWeight: 500
            }}>
              Foto de entrega
            </div>
            <div style={{ width: 44 }} /> {/* Spacer para centrar título */}
          </div>

          {/* Área de vista de cámara */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Guías de composición (regla de tercios) */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: 'none',
              zIndex: 1
            }}>
              {/* Líneas horizontales */}
              <div style={{ position: 'absolute', top: '33.33%', left: 0, right: 0, height: 1, backgroundColor: 'rgba(255,255,255,0.3)' }} />
              <div style={{ position: 'absolute', top: '66.66%', left: 0, right: 0, height: 1, backgroundColor: 'rgba(255,255,255,0.3)' }} />
              {/* Líneas verticales */}
              <div style={{ position: 'absolute', left: '33.33%', top: 0, bottom: 0, width: 1, backgroundColor: 'rgba(255,255,255,0.3)' }} />
              <div style={{ position: 'absolute', left: '66.66%', top: 0, bottom: 0, width: 1, backgroundColor: 'rgba(255,255,255,0.3)' }} />
            </div>

            {/* Icono de cámara central */}
            {!photoTaken && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: 0.3,
                pointerEvents: 'none'
              }}>
                <Camera size={80} color="white" />
              </div>
            )}

            {/* Indicador de captura */}
            {photoTaken && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'white',
                animation: 'flash 0.3s ease-out',
                zIndex: 10
              }} />
            )}

            {/* Instrucciones */}
            <div style={{
              position: 'absolute',
              bottom: 140,
              left: 0,
              right: 0,
              textAlign: 'center',
              color: 'white',
              padding: '0 24px',
              zIndex: 3
            }}>
              {photoTaken ? (
                <div style={{ 
                  fontSize: 18, 
                  fontWeight: 600,
                  textShadow: '0 2px 8px rgba(0,0,0,0.5)'
                }}>
                  Capturando foto...
                </div>
              ) : (
                <>
                  <div style={{ 
                    fontSize: 16, 
                    fontWeight: 500,
                    marginBottom: 8,
                    textShadow: '0 2px 8px rgba(0,0,0,0.5)'
                  }}>
                    Encuadre la entrega
                  </div>
                  <div style={{ 
                    fontSize: 13, 
                    opacity: 0.9,
                    textShadow: '0 2px 8px rgba(0,0,0,0.5)'
                  }}>
                    Asegúrese de que se vea claramente
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Footer con botón de captura */}
          <div style={{
            padding: 32,
            paddingBottom: 40,
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 40
          }}>
            {/* Botón de captura grande circular */}
            <button
              onClick={handleTomarFoto}
              disabled={photoTaken}
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                border: '4px solid white',
                backgroundColor: photoTaken ? colors.gray600 : 'white',
                cursor: photoTaken ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                transition: 'transform 0.1s',
                position: 'relative'
              }}
              onMouseDown={(e) => !photoTaken && (e.target.style.transform = 'scale(0.9)')}
              onMouseUp={(e) => !photoTaken && (e.target.style.transform = 'scale(1)')}
              onMouseLeave={(e) => !photoTaken && (e.target.style.transform = 'scale(1)')}
            >
              <div style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                backgroundColor: photoTaken ? colors.gray400 : colors.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {photoTaken ? (
                  <div style={{
                    width: 24,
                    height: 24,
                    border: '3px solid white',
                    borderTop: '3px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }} />
                ) : (
                  <Camera size={28} color="white" />
                )}
              </div>
            </button>
          </div>

          {/* Estilos para animaciones */}
          <style>{`
            @keyframes flash {
              0% { opacity: 0.8; }
              100% { opacity: 0; }
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      {/* Modal de Firma Digital */}
      {showFirmaModal && (
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
          padding: 16
        }}>
          <div style={{
            backgroundColor: colors.white,
            borderRadius: 16,
            padding: 20,
            width: '100%',
            maxWidth: 500,
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '90vh'
          }}>
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16
            }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
                Firma del Cliente
              </h3>
              <button
                onClick={() => setShowFirmaModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 4
                }}
              >
                <X size={24} color={colors.gray600} />
              </button>
            </div>

            {/* Instrucciones */}
            <div style={{
              backgroundColor: colors.gray50,
              padding: 12,
              borderRadius: 8,
              marginBottom: 16,
              fontSize: 13,
              color: colors.gray700
            }}>
              📝 Solicite al cliente que firme con su dedo en el área blanca
            </div>

            {/* Área de firma */}
            <div style={{
              position: 'relative',
              marginBottom: 16
            }}>
              <canvas
                ref={(canvas) => {
                  if (!canvas) return;
                  
                  const ctx = canvas.getContext('2d');
                  canvas.width = canvas.offsetWidth;
                  canvas.height = 300;
                  
                  // Limpiar canvas
                  ctx.fillStyle = 'white';
                  ctx.fillRect(0, 0, canvas.width, canvas.height);
                  
                  // Dibujar puntos guardados
                  if (signaturePoints.length > 0) {
                    ctx.strokeStyle = colors.gray900;
                    ctx.lineWidth = 3;
                    ctx.lineCap = 'round';
                    ctx.lineJoin = 'round';
                    
                    ctx.beginPath();
                    signaturePoints.forEach((point, index) => {
                      if (index === 0 || point.newStroke) {
                        ctx.moveTo(point.x, point.y);
                      } else {
                        ctx.lineTo(point.x, point.y);
                      }
                    });
                    ctx.stroke();
                  }
                  
                  // Event handlers
                  const startDrawing = (e) => {
                    setIsDrawing(true);
                    const rect = canvas.getBoundingClientRect();
                    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
                    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
                    setSignaturePoints(prev => [...prev, { x, y, newStroke: true }]);
                  };
                  
                  const draw = (e) => {
                    if (!isDrawing) return;
                    e.preventDefault();
                    const rect = canvas.getBoundingClientRect();
                    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
                    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
                    setSignaturePoints(prev => [...prev, { x, y, newStroke: false }]);
                  };
                  
                  const stopDrawing = () => {
                    setIsDrawing(false);
                  };
                  
                  canvas.addEventListener('mousedown', startDrawing);
                  canvas.addEventListener('mousemove', draw);
                  canvas.addEventListener('mouseup', stopDrawing);
                  canvas.addEventListener('mouseleave', stopDrawing);
                  canvas.addEventListener('touchstart', startDrawing);
                  canvas.addEventListener('touchmove', draw);
                  canvas.addEventListener('touchend', stopDrawing);
                }}
                style={{
                  width: '100%',
                  height: 300,
                  border: `2px dashed ${colors.gray300}`,
                  borderRadius: 12,
                  cursor: 'crosshair',
                  touchAction: 'none',
                  backgroundColor: 'white'
                }}
              />
              
              {/* Línea de firma */}
              <div style={{
                position: 'absolute',
                bottom: 40,
                left: '10%',
                right: '10%',
                height: 1,
                backgroundColor: colors.gray400,
                pointerEvents: 'none'
              }} />
              
              {/* Texto "Firmar aquí" */}
              {signaturePoints.length === 0 && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: 16,
                  color: colors.gray400,
                  fontWeight: 500,
                  pointerEvents: 'none',
                  textAlign: 'center'
                }}>
                  ✍️ Firme aquí
                </div>
              )}
            </div>

            {/* Botones */}
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={handleLimpiarFirma}
                disabled={signaturePoints.length === 0}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  borderRadius: 8,
                  border: `1px solid ${colors.gray300}`,
                  backgroundColor: 'white',
                  color: signaturePoints.length === 0 ? colors.gray400 : colors.gray700,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: signaturePoints.length === 0 ? 'not-allowed' : 'pointer'
                }}
              >
                Limpiar
              </button>
              <button
                onClick={handleGuardarFirma}
                style={{
                  flex: 2,
                  padding: '12px 20px',
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
                  gap: 8
                }}
              >
                <CheckCircle size={18} />
                Guardar Firma
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcesoEntrega;
