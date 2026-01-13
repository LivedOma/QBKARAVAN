import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Eye, Plus, Minus, Check, Receipt, PenTool } from 'lucide-react';
import { colors } from '../../shared/colors.js';

const LiquidacionRuta = ({ onNavigate }) => {
  const [showEntregasNoRealizadas, setShowEntregasNoRealizadas] = useState(false);
  const [showGastosRuta, setShowGastosRuta] = useState(false);
  const [showAddGasto, setShowAddGasto] = useState(false);
  const [showFirmaModal, setShowFirmaModal] = useState(false);
  const [showConfirmacion, setShowConfirmacion] = useState(false);
  const [firmaCaptured, setFirmaCaptured] = useState(false);
  const [diferenciasEfectivo, setDiferenciasEfectivo] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signaturePoints, setSignaturePoints] = useState([]);
  
  // Estados para agregar gasto
  const [nuevoGastoConcepto, setNuevoGastoConcepto] = useState('');
  const [nuevoGastoMonto, setNuevoGastoMonto] = useState('');
  const [nuevoGastoComprobante, setNuevoGastoComprobante] = useState(false);

  const entregasNoRealizadas = [
    { id: 1, cliente: 'Tienda El Ahorro', direccion: 'Calle 5 #123', monto: 1250.00, motivo: 'Cliente cerrado' },
    { id: 2, cliente: 'Super Rápido', direccion: 'Av. Principal #456', monto: 890.00, motivo: 'No había quien recibiera' }
  ];

  const [gastosRuta, setGastosRuta] = useState([
    { id: 1, concepto: 'Combustible', monto: 450.00, comprobante: true },
    { id: 2, concepto: 'Peaje carretera', monto: 85.00, comprobante: true },
    { id: 3, concepto: 'Estacionamiento', monto: 30.00, comprobante: false }
  ]);

  const totalGastos = gastosRuta.reduce((sum, g) => sum + g.monto, 0);
  const totalCobrado = 45320.00;
  const netoEntregar = totalCobrado - totalGastos;

  const handleAgregarGasto = () => {
    if (!nuevoGastoConcepto.trim() || !nuevoGastoMonto || parseFloat(nuevoGastoMonto) <= 0) {
      alert('Por favor completa el concepto y un monto válido');
      return;
    }

    const nuevoGasto = {
      id: gastosRuta.length + 1,
      concepto: nuevoGastoConcepto,
      monto: parseFloat(nuevoGastoMonto),
      comprobante: nuevoGastoComprobante
    };

    setGastosRuta([...gastosRuta, nuevoGasto]);
    setNuevoGastoConcepto('');
    setNuevoGastoMonto('');
    setNuevoGastoComprobante(false);
    setShowAddGasto(false);
    alert('✅ Gasto agregado exitosamente');
  };

  const handleLimpiarFirma = () => {
    setSignaturePoints([]);
    const canvas = document.getElementById('signature-canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleGuardarFirma = () => {
    if (signaturePoints.length === 0) {
      alert('Por favor firma antes de continuar');
      return;
    }
    setFirmaCaptured(true);
    setShowFirmaModal(false);
    setShowConfirmacion(true);
  };

  const handleCerrarLiquidacion = () => {
    alert('✅ Liquidación cerrada exitosamente\nNúm. Liquidación: LIQ-2026-001\n\nLa información ha sido enviada para validación.');
    setShowConfirmacion(false);
    onNavigate('home');
  };

  // Canvas drawing functions
  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = document.getElementById('signature-canvas');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX ? e.clientX - rect.left : e.touches[0].clientX - rect.left;
    const y = e.clientY ? e.clientY - rect.top : e.touches[0].clientY - rect.top;
    setSignaturePoints([[x, y]]);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = document.getElementById('signature-canvas');
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX ? e.clientX - rect.left : e.touches[0].clientX - rect.left;
    const y = e.clientY ? e.clientY - rect.top : e.touches[0].clientY - rect.top;

    ctx.strokeStyle = colors.gray800;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const lastPoint = signaturePoints[signaturePoints.length - 1];
    if (lastPoint && lastPoint.length > 0) {
      ctx.beginPath();
      ctx.moveTo(lastPoint[lastPoint.length - 1][0], lastPoint[lastPoint.length - 1][1]);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    const currentStroke = signaturePoints[signaturePoints.length - 1] || [];
    setSignaturePoints([...signaturePoints.slice(0, -1), [...currentStroke, [x, y]]]);
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      setSignaturePoints([...signaturePoints, []]);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.gray50,
      paddingBottom: 80,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        height: '100%',
        overflowY: 'auto',
        paddingBottom: 80
      }}>
        {/* Header Info */}
        <div style={{
          backgroundColor: 'white',
          padding: 16,
          borderBottom: `1px solid ${colors.gray200}`,
          marginBottom: 16
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, color: colors.gray500 }}>Ruta Oriente-Norte-02</div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>Lunes, 8 Enero 2026</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, color: colors.gray500 }}>Repartidor</div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>Carlos Martínez</div>
            </div>
          </div>
        </div>

        <div style={{ padding: 16 }}>
          {/* Resumen de Entregas */}
          <div style={{
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 12,
            boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
            marginBottom: 16
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Resumen de Entregas</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 12 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: colors.gray500 }}>Programadas</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: colors.primary }}>24</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <CheckCircle size={20} color={colors.success} style={{ margin: '0 auto' }} />
                <div style={{ fontSize: 20, fontWeight: 700, color: colors.success, marginTop: 2 }}>22</div>
                <div style={{ fontSize: 11, color: colors.gray500 }}>Completadas</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <XCircle size={20} color={colors.danger} style={{ margin: '0 auto' }} />
                <div style={{ fontSize: 20, fontWeight: 700, color: colors.danger, marginTop: 2 }}>2</div>
                <div style={{ fontSize: 11, color: colors.gray500 }}>No realizadas</div>
              </div>
            </div>
            <div style={{ 
              backgroundColor: colors.success + '15', 
              padding: 10, 
              borderRadius: 8, 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: colors.success }}>Efectividad</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: colors.success }}>91.7%</span>
            </div>
            {entregasNoRealizadas.length > 0 && (
              <button 
                onClick={() => setShowEntregasNoRealizadas(true)}
                style={{
                  width: '100%',
                  marginTop: 12,
                  padding: '8px 12px',
                  borderRadius: 8,
                  border: `1px solid ${colors.danger}`,
                  backgroundColor: 'white',
                  color: colors.danger,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6
                }}
              >
                <AlertCircle size={14} />
                Ver {entregasNoRealizadas.length} entregas no realizadas
              </button>
            )}
          </div>

          {/* Cuadre de Inventario */}
          <div style={{
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 12,
            boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
            marginBottom: 16
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Cuadre de Inventario</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: colors.gray600, fontSize: 13 }}>Carga inicial:</span>
              <span style={{ fontWeight: 500 }}>246 uds</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: colors.gray600, fontSize: 13 }}>Entregados:</span>
              <span style={{ fontWeight: 500 }}>235 uds</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: colors.gray600, fontSize: 13 }}>Devoluciones:</span>
              <span style={{ fontWeight: 500 }}>5 uds</span>
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              borderTop: `1px solid ${colors.gray200}`, 
              paddingTop: 8,
              marginTop: 8
            }}>
              <span style={{ fontWeight: 700 }}>Inventario Final:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 700 }}>6 uds</span>
                <span style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '2px 8px',
                  borderRadius: 4,
                  backgroundColor: colors.success + '20',
                  color: colors.success
                }}>✓ Cuadra</span>
              </div>
            </div>
          </div>

          {/* Cuadre de Cobranza */}
          <div style={{
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 12,
            boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
            marginBottom: 16
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Cuadre de Cobranza</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: colors.gray600, fontSize: 13 }}>Efectivo:</span>
              <span style={{ fontWeight: 600 }}>$32,450.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: colors.gray600, fontSize: 13 }}>Transferencias:</span>
              <span style={{ fontWeight: 600 }}>$8,200.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: colors.gray600, fontSize: 13 }}>Crédito:</span>
              <span style={{ fontWeight: 600 }}>$4,670.00</span>
            </div>
            <div style={{ 
              borderTop: `1px solid ${colors.gray200}`, 
              paddingTop: 8, 
              marginTop: 8,
              display: 'flex', 
              justifyContent: 'space-between' 
            }}>
              <span style={{ fontWeight: 700 }}>Total Cobrado:</span>
              <span style={{ fontWeight: 700, color: colors.success }}>${totalCobrado.toFixed(2)}</span>
            </div>
          </div>

          {/* Gastos de Ruta */}
          <div style={{
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 12,
            boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
            marginBottom: 16
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Gastos de Ruta</div>
              <button 
                onClick={() => setShowAddGasto(true)}
                style={{
                  padding: '6px 10px',
                  borderRadius: 6,
                  border: `1px solid ${colors.primary}`,
                  backgroundColor: 'white',
                  color: colors.primary,
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}
              >
                <Plus size={12} />
                Agregar
              </button>
            </div>
            <div style={{ marginBottom: 10 }}>
              {gastosRuta.map(gasto => (
                <div key={gasto.id} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: `1px solid ${colors.gray200}`
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 500 }}>{gasto.concepto}</div>
                    {gasto.comprobante && (
                      <div style={{ fontSize: 10, color: colors.gray500, display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                        <Receipt size={10} />
                        Con comprobante
                      </div>
                    )}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: colors.danger }}>-${gasto.monto.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div style={{ 
              borderTop: `2px solid ${colors.gray300}`, 
              paddingTop: 8, 
              display: 'flex', 
              justifyContent: 'space-between' 
            }}>
              <span style={{ fontWeight: 700 }}>Total Gastos:</span>
              <span style={{ fontWeight: 700, color: colors.danger }}>-${totalGastos.toFixed(2)}</span>
            </div>
            <button 
              onClick={() => setShowGastosRuta(true)}
              style={{
                width: '100%',
                marginTop: 10,
                padding: '8px 12px',
                borderRadius: 8,
                border: `1px solid ${colors.gray300}`,
                backgroundColor: 'white',
                color: colors.gray700,
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6
              }}
            >
              <Eye size={14} />
              Ver detalle completo
            </button>
          </div>

          {/* Entrega de Efectivo */}
          <div style={{
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 12,
            boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
            marginBottom: 16
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Entrega de Efectivo</div>
            <div style={{ 
              backgroundColor: colors.gray50, 
              padding: 12, 
              borderRadius: 8, 
              marginBottom: 12,
              textAlign: 'center'
            }}>
              <div style={{ fontSize: 11, color: colors.gray500, marginBottom: 4 }}>Efectivo recaudado</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: colors.primary }}>$32,450.00</div>
            </div>
            <div style={{ fontSize: 11, color: colors.gray500, marginBottom: 8 }}>
              📍 Entrega a: Caja Principal - María García
            </div>
            
            <div style={{ 
              border: `1px solid ${colors.gray300}`, 
              borderRadius: 8, 
              padding: 10,
              marginBottom: 10
            }}>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 8,
                cursor: 'pointer',
                fontSize: 12
              }}>
                <input 
                  type="checkbox" 
                  checked={diferenciasEfectivo}
                  onChange={(e) => setDiferenciasEfectivo(e.target.checked)}
                />
                <span>Registrar diferencias (faltante/sobrante)</span>
              </label>
              
              {diferenciasEfectivo && (
                <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${colors.gray200}` }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
                    <button style={{
                      padding: '6px 10px',
                      borderRadius: 6,
                      border: `1px solid ${colors.danger}`,
                      backgroundColor: 'white',
                      color: colors.danger,
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 4
                    }}>
                      <Minus size={12} />
                      Faltante
                    </button>
                    <button style={{
                      padding: '6px 10px',
                      borderRadius: 6,
                      border: `1px solid ${colors.success}`,
                      backgroundColor: 'white',
                      color: colors.success,
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 4
                    }}>
                      <Plus size={12} />
                      Sobrante
                    </button>
                  </div>
                  <input 
                    type="number" 
                    placeholder="Monto de diferencia"
                    style={{
                      width: '100%',
                      padding: 8,
                      border: `1px solid ${colors.gray300}`,
                      borderRadius: 6,
                      fontSize: 12,
                      marginBottom: 8,
                      boxSizing: 'border-box'
                    }}
                  />
                  <textarea 
                    placeholder="Observaciones sobre la diferencia..."
                    rows={2}
                    style={{
                      width: '100%',
                      padding: 8,
                      border: `1px solid ${colors.gray300}`,
                      borderRadius: 6,
                      fontSize: 11,
                      resize: 'vertical',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              )}
            </div>
            
            <button style={{
              width: '100%',
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
            }}>
              <Check size={16} />
              Confirmar Entrega de Efectivo
            </button>
          </div>

          {/* Resumen Final */}
          <div style={{
            backgroundColor: colors.gray50,
            padding: 16,
            borderRadius: 12,
            border: `2px solid ${colors.primary}20`,
            marginBottom: 16
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, textAlign: 'center' }}>
              Resumen de Liquidación
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
              <span style={{ color: colors.gray600 }}>Total cobrado:</span>
              <span style={{ fontWeight: 600, color: colors.success }}>+${totalCobrado.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
              <span style={{ color: colors.gray600 }}>Total gastos:</span>
              <span style={{ fontWeight: 600, color: colors.danger }}>-${totalGastos.toFixed(2)}</span>
            </div>
            <div style={{ 
              borderTop: `2px solid ${colors.gray300}`, 
              paddingTop: 8, 
              marginTop: 8,
              display: 'flex', 
              justifyContent: 'space-between',
              fontSize: 14
            }}>
              <span style={{ fontWeight: 700 }}>Neto a entregar:</span>
              <span style={{ fontWeight: 700, color: colors.primary }}>
                ${netoEntregar.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer con botón de firma */}
      <div style={{ 
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16, 
        backgroundColor: colors.white, 
        borderTop: `1px solid ${colors.gray200}` 
      }}>
        <button 
          onClick={() => setShowFirmaModal(true)}
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8
          }}
        >
          <PenTool size={20} />
          {firmaCaptured ? 'Ver Firma y Cerrar Liquidación' : 'Firmar y Cerrar Liquidación'}
        </button>
      </div>

      {/* Modal de Entregas No Realizadas */}
      {showEntregasNoRealizadas && (
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
            maxHeight: '80vh',
            overflowY: 'auto',
            position: 'relative'
          }}>
            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, margin: 0 }}>Entregas No Realizadas</h3>
              <p style={{ fontSize: 12, color: colors.gray500, margin: '4px 0 0 0' }}>
                {entregasNoRealizadas.length} pedidos no pudieron ser entregados
              </p>
            </div>

            {entregasNoRealizadas.map((entrega) => (
              <div key={entrega.id} style={{
                marginBottom: 12,
                padding: 12,
                borderRadius: 8,
                backgroundColor: 'white',
                border: `1px solid ${colors.gray200}`,
                borderLeft: `3px solid ${colors.danger}`
              }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{entrega.cliente}</div>
                <div style={{ fontSize: 11, color: colors.gray500, marginBottom: 6 }}>{entrega.direccion}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: colors.gray600 }}>Monto: ${entrega.monto.toFixed(2)}</span>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: 4,
                    backgroundColor: colors.danger + '15',
                    color: colors.danger
                  }}>{entrega.motivo}</span>
                </div>
              </div>
            ))}

            <button
              onClick={() => setShowEntregasNoRealizadas(false)}
              style={{
                width: '100%',
                padding: '10px 16px',
                borderRadius: 8,
                border: `1px solid ${colors.gray300}`,
                backgroundColor: 'white',
                color: colors.gray700,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                marginTop: 8
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal de Firma */}
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
          padding: 16,
          overflow: 'hidden'
        }}>
          <div style={{
            backgroundColor: colors.white,
            borderRadius: 12,
            padding: 20,
            width: '100%',
            maxWidth: 400,
            position: 'relative'
          }}>
            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, margin: 0 }}>Firma del Repartidor</h3>
              <p style={{ fontSize: 12, color: colors.gray500, margin: '4px 0 0 0' }}>
                Firma en el área a continuación para confirmar la liquidación
              </p>
            </div>

            {/* Canvas de firma */}
            <div style={{
              border: `2px dashed ${colors.gray300}`,
              borderRadius: 8,
              marginBottom: 16,
              backgroundColor: colors.gray50,
              overflow: 'hidden'
            }}>
              <canvas
                id="signature-canvas"
                width={360}
                height={200}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                style={{
                  display: 'block',
                  touchAction: 'none',
                  cursor: 'crosshair'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={handleLimpiarFirma}
                style={{
                  flex: 1,
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
                Limpiar
              </button>
              <button
                onClick={handleGuardarFirma}
                style={{
                  flex: 2,
                  padding: '10px 16px',
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
                <Check size={16} />
                Guardar Firma
              </button>
            </div>

            <button
              onClick={() => setShowFirmaModal(false)}
              style={{
                width: '100%',
                padding: '10px 16px',
                borderRadius: 8,
                border: `1px solid ${colors.gray300}`,
                backgroundColor: 'white',
                color: colors.gray700,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                marginTop: 8
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal de Confirmación */}
      {showConfirmacion && (
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
            position: 'relative',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              borderRadius: '50%',
              backgroundColor: colors.warning + '20',
              marginBottom: 16
            }}>
              <AlertCircle size={32} color={colors.warning} />
            </div>

            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, margin: '0 0 8px 0' }}>
              ¿Cerrar Liquidación?
            </h3>
            <p style={{ fontSize: 13, color: colors.gray600, marginBottom: 20, margin: '0 0 20px 0' }}>
              Una vez cerrada, la liquidación será enviada para validación y no podrá modificarse.
            </p>

            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setShowConfirmacion(false)}
                style={{
                  flex: 1,
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
                Cancelar
              </button>
              <button
                onClick={handleCerrarLiquidacion}
                style={{
                  flex: 2,
                  padding: '10px 16px',
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
                <Check size={16} />
                Sí, Cerrar Liquidación
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Agregar Gasto */}
      {showAddGasto && (
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
            position: 'relative'
          }}>
            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, margin: 0 }}>Agregar Gasto</h3>
              <p style={{ fontSize: 12, color: colors.gray500, margin: '4px 0 0 0' }}>
                Registra un nuevo gasto de la ruta
              </p>
            </div>

            {/* Concepto */}
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: colors.gray700, display: 'block', marginBottom: 6 }}>
                Concepto del Gasto
              </label>
              <input
                type="text"
                placeholder="Ej: Combustible, Peaje, Estacionamiento..."
                value={nuevoGastoConcepto}
                onChange={(e) => setNuevoGastoConcepto(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1px solid ${colors.gray300}`,
                  borderRadius: 8,
                  fontSize: 13,
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Monto */}
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: colors.gray700, display: 'block', marginBottom: 6 }}>
                Monto
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: 14,
                  fontWeight: 600,
                  color: colors.gray600
                }}>$</span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={nuevoGastoMonto}
                  onChange={(e) => setNuevoGastoMonto(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 28px',
                    border: `1px solid ${colors.gray300}`,
                    borderRadius: 8,
                    fontSize: 13,
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Comprobante */}
            <div style={{ 
              marginBottom: 16,
              padding: 12,
              backgroundColor: colors.gray50,
              borderRadius: 8,
              border: `1px solid ${colors.gray200}`
            }}>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 8,
                cursor: 'pointer',
                fontSize: 13
              }}>
                <input 
                  type="checkbox" 
                  checked={nuevoGastoComprobante}
                  onChange={(e) => setNuevoGastoComprobante(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <Receipt size={16} color={colors.gray600} />
                <span style={{ fontWeight: 500 }}>Tengo comprobante de este gasto</span>
              </label>
            </div>

            {/* Botones */}
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => {
                  setShowAddGasto(false);
                  setNuevoGastoConcepto('');
                  setNuevoGastoMonto('');
                  setNuevoGastoComprobante(false);
                }}
                style={{
                  flex: 1,
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
                Cancelar
              </button>
              <button
                onClick={handleAgregarGasto}
                style={{
                  flex: 2,
                  padding: '10px 16px',
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
                <Plus size={16} />
                Agregar Gasto
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Detalle Completo de Gastos */}
      {showGastosRuta && (
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
            maxHeight: '80vh',
            overflowY: 'auto',
            position: 'relative'
          }}>
            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, margin: 0 }}>Detalle de Gastos</h3>
              <p style={{ fontSize: 12, color: colors.gray500, margin: '4px 0 0 0' }}>
                {gastosRuta.length} gastos registrados en la ruta
              </p>
            </div>

            {/* Lista completa de gastos */}
            {gastosRuta.map((gasto, index) => (
              <div key={gasto.id} style={{
                marginBottom: 12,
                padding: 14,
                borderRadius: 10,
                backgroundColor: colors.gray50,
                border: `1px solid ${colors.gray200}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      fontSize: 11, 
                      color: colors.gray500, 
                      marginBottom: 4,
                      fontWeight: 600 
                    }}>
                      Gasto #{index + 1}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray800 }}>
                      {gasto.concepto}
                    </div>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: colors.danger }}>
                    ${gasto.monto.toFixed(2)}
                  </div>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 6,
                  marginTop: 8,
                  paddingTop: 8,
                  borderTop: `1px solid ${colors.gray200}`
                }}>
                  {gasto.comprobante ? (
                    <>
                      <Receipt size={14} color={colors.success} />
                      <span style={{ fontSize: 11, color: colors.success, fontWeight: 600 }}>
                        ✓ Con comprobante
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle size={14} color={colors.warning} />
                      <span style={{ fontSize: 11, color: colors.warning, fontWeight: 600 }}>
                        Sin comprobante
                      </span>
                    </>
                  )}
                </div>
              </div>
            ))}

            {/* Resumen total */}
            <div style={{
              marginTop: 16,
              padding: 14,
              borderRadius: 10,
              backgroundColor: colors.danger + '10',
              border: `2px solid ${colors.danger}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 11, color: colors.danger, fontWeight: 600, marginBottom: 2 }}>
                    Total de Gastos
                  </div>
                  <div style={{ fontSize: 12, color: colors.gray600 }}>
                    {gastosRuta.length} registro{gastosRuta.length !== 1 ? 's' : ''}
                  </div>
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color: colors.danger }}>
                  -${totalGastos.toFixed(2)}
                </div>
              </div>
              
              <div style={{ 
                marginTop: 10,
                paddingTop: 10,
                borderTop: `1px solid ${colors.danger}40`,
                fontSize: 11,
                color: colors.gray600
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span>Con comprobante:</span>
                  <span style={{ fontWeight: 600 }}>{gastosRuta.filter(g => g.comprobante).length}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Sin comprobante:</span>
                  <span style={{ fontWeight: 600 }}>{gastosRuta.filter(g => !g.comprobante).length}</span>
                </div>
              </div>
            </div>

            {/* Botón cerrar */}
            <button
              onClick={() => setShowGastosRuta(false)}
              style={{
                width: '100%',
                padding: '10px 16px',
                borderRadius: 8,
                border: `1px solid ${colors.gray300}`,
                backgroundColor: 'white',
                color: colors.gray700,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                marginTop: 16
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiquidacionRuta;
