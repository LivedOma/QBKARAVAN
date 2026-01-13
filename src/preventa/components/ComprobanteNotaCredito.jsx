import React, { useState } from 'react';
import { RotateCcw, Building, Phone, Mail, Package, AlertTriangle, CheckCircle, Smartphone, Printer, Download, FileText, MessageSquare } from 'lucide-react';
import { MobileFrame, Card, Button } from '../../shared/MobileComponents.jsx';
import { colors } from '../../shared/colors.js';

export const ComprobanteNotaCredito = ({ notaCredito, onBack }) => {
  const [sendMethod, setSendMethod] = useState('');
  const [sent, setSent] = useState(false);

  const ncData = notaCredito || {
    folio: 'NC-2026-00045',
    fecha: '7 Ene 2026, 15:45',
    cliente: {
      nombre: 'Abarrotes La Esquina',
      rfc: 'AES920315HG7',
      direccion: 'Av. Juárez 456, Col. Centro',
      telefono: '(555) 234-5678',
      email: 'abarrotes.esquina@email.com'
    },
    producto: {
      nombre: 'Coca-Cola 600ml',
      lote: 'LOT-2026-123',
      caducidad: '15 Jul 2026',
      cantidad: 12,
      precioUnitario: 15.00,
    },
    motivo: 'Producto caducado',
    fotoCapturada: true,
    subtotal: 180.00,
    iva: 28.80,
    total: 208.80,
    vendedor: 'Juan Pérez',
    estatus: 'Pendiente de Autorización'
  };

  const handleSend = (method) => {
    setSendMethod(method);
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setSendMethod('');
    }, 3000);
  };

  return (
    <MobileFrame title="Nota de Crédito" showBack onBack={onBack} statusBar={true}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          {/* Mensaje de confirmación */}
          {sent && (
            <Card style={{ marginBottom: 16, backgroundColor: `${colors.success}10`, border: `1px solid ${colors.success}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <CheckCircle size={24} color={colors.success} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray800 }}>
                    Enviado por {sendMethod}
                  </div>
                  <div style={{ fontSize: 12, color: colors.gray600 }}>
                    El comprobante se ha enviado correctamente
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Header de Nota de Crédito */}
          <Card style={{ 
            marginBottom: 16, 
            background: `linear-gradient(135deg, ${colors.warning} 0%, ${colors.orange} 100%)`, 
            color: 'white' 
          }}>
            <div style={{ textAlign: 'center', marginBottom: 12 }}>
              <RotateCcw size={40} style={{ marginBottom: 8 }} />
              <div style={{ fontSize: 18, fontWeight: 700 }}>{ncData.folio}</div>
              <div style={{ fontSize: 12, opacity: 0.9 }}>{ncData.fecha}</div>
            </div>
            <div style={{ padding: '12px 0', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Monto de Nota de Crédito</div>
              <div style={{ fontSize: 28, fontWeight: 700 }}>${ncData.total.toFixed(2)}</div>
            </div>
          </Card>

          {/* Alerta de Estado */}
          <Card style={{ 
            marginBottom: 16, 
            backgroundColor: `${colors.warning}10`, 
            border: `2px solid ${colors.warning}` 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <AlertTriangle size={24} color={colors.warning} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray800 }}>
                  {ncData.estatus}
                </div>
                <div style={{ fontSize: 12, color: colors.gray600 }}>
                  La nota de crédito requiere autorización del supervisor
                </div>
              </div>
            </div>
          </Card>

          {/* Información del Cliente */}
          <Card style={{ marginBottom: 16 }}>
            <div style={{ 
              fontSize: 14, 
              fontWeight: 600, 
              color: colors.gray800, 
              marginBottom: 12, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8 
            }}>
              <Building size={18} color={colors.warning} />
              Datos del Cliente
            </div>
            <div style={{ fontSize: 13, color: colors.gray700, lineHeight: 1.6 }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{ncData.cliente.nombre}</div>
              <div>RFC: {ncData.cliente.rfc}</div>
              <div>{ncData.cliente.direccion}</div>
              <div style={{ display: 'flex', gap: 16, marginTop: 8, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Phone size={14} color={colors.gray500} />
                  <span style={{ fontSize: 12 }}>{ncData.cliente.telefono}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Mail size={14} color={colors.gray500} />
                  <span style={{ fontSize: 12 }}>{ncData.cliente.email}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Información del Producto Devuelto */}
          <Card style={{ marginBottom: 16 }}>
            <div style={{ 
              fontSize: 14, 
              fontWeight: 600, 
              color: colors.gray800, 
              marginBottom: 12, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8 
            }}>
              <Package size={18} color={colors.warning} />
              Producto Devuelto
            </div>
            <div style={{ borderTop: `1px solid ${colors.gray200}`, paddingTop: 12 }}>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: colors.gray800, marginBottom: 4 }}>
                  {ncData.producto.nombre}
                </div>
                <div style={{ fontSize: 12, color: colors.gray600, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                  <div>Lote: {ncData.producto.lote}</div>
                  <div>Caducidad: {ncData.producto.caducidad}</div>
                  <div>Cantidad: {ncData.producto.cantidad} unidades</div>
                  <div>Precio: ${ncData.producto.precioUnitario.toFixed(2)}</div>
                </div>
              </div>
              {ncData.fotoCapturada && (
                <div style={{ 
                  padding: 8, 
                  backgroundColor: `${colors.success}10`, 
                  borderRadius: 6,
                  fontSize: 12,
                  color: colors.success,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}>
                  <CheckCircle size={14} />
                  Evidencia fotográfica capturada
                </div>
              )}
            </div>
          </Card>

          {/* Motivo de Devolución */}
          <Card style={{ marginBottom: 16 }}>
            <div style={{ 
              fontSize: 14, 
              fontWeight: 600, 
              color: colors.gray800, 
              marginBottom: 8, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8 
            }}>
              <FileText size={18} color={colors.warning} />
              Motivo de Devolución
            </div>
            <div style={{ 
              fontSize: 13, 
              color: colors.gray700,
              padding: 12,
              backgroundColor: colors.gray50,
              borderRadius: 6,
              borderLeft: `3px solid ${colors.warning}`
            }}>
              {ncData.motivo}
            </div>
          </Card>

          {/* Resumen de Montos */}
          <Card style={{ marginBottom: 16 }}>
            <div style={{ 
              fontSize: 14, 
              fontWeight: 600, 
              color: colors.gray800, 
              marginBottom: 12 
            }}>
              Desglose
            </div>
            <div style={{ fontSize: 13 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ color: colors.gray600 }}>Subtotal</span>
                <span style={{ fontWeight: 600, color: colors.gray800 }}>${ncData.subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ color: colors.gray600 }}>IVA (16%)</span>
                <span style={{ fontWeight: 600, color: colors.gray800 }}>${ncData.iva.toFixed(2)}</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                paddingTop: 12, 
                borderTop: `2px solid ${colors.gray200}`,
                fontSize: 16
              }}>
                <span style={{ fontWeight: 700, color: colors.gray800 }}>Total NC</span>
                <span style={{ fontWeight: 700, color: colors.warning }}>${ncData.total.toFixed(2)}</span>
              </div>
            </div>
          </Card>

          {/* Información Adicional */}
          <Card style={{ marginBottom: 16, backgroundColor: colors.gray50 }}>
            <div style={{ fontSize: 12, color: colors.gray600, lineHeight: 1.6 }}>
              <div style={{ marginBottom: 4 }}>
                <strong>Vendedor:</strong> {ncData.vendedor}
              </div>
              <div style={{ marginBottom: 4 }}>
                <strong>Fecha de Registro:</strong> {ncData.fecha}
              </div>
              <div>
                <strong>Estado:</strong> {ncData.estatus}
              </div>
            </div>
          </Card>

          {/* Opciones de Envío */}
          <Card style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray800, marginBottom: 12 }}>
              Compartir Comprobante
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              <button
                onClick={() => handleSend('WhatsApp')}
                disabled={sent}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: 6, 
                  padding: 12,
                  border: `2px solid ${colors.success}`,
                  borderRadius: 8,
                  backgroundColor: 'white',
                  color: colors.success,
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: sent ? 'not-allowed' : 'pointer',
                  opacity: sent ? 0.5 : 1
                }}
              >
                <MessageSquare size={18} />
                WhatsApp
              </button>
              <button
                onClick={() => handleSend('SMS')}
                disabled={sent}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: 6, 
                  padding: 12,
                  border: `2px solid ${colors.accent}`,
                  borderRadius: 8,
                  backgroundColor: 'white',
                  color: colors.accent,
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: sent ? 'not-allowed' : 'pointer',
                  opacity: sent ? 0.5 : 1
                }}
              >
                <Smartphone size={18} />
                SMS
              </button>
              <button
                onClick={() => handleSend('Impresora')}
                disabled={sent}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: 6, 
                  padding: 12,
                  border: `2px solid ${colors.gray600}`,
                  borderRadius: 8,
                  backgroundColor: 'white',
                  color: colors.gray600,
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: sent ? 'not-allowed' : 'pointer',
                  opacity: sent ? 0.5 : 1
                }}
              >
                <Printer size={18} />
                Imprimir
              </button>
            </div>
          </Card>

          {/* Botón Descargar PDF */}
          <Button 
            variant="secondary" 
            icon={<Download size={18} />}
            style={{ width: '100%', marginBottom: 12 }}
            onClick={() => alert('📄 Descargando PDF...')}
          >
            Descargar PDF
          </Button>

          {/* Botón Aceptar */}
          <Button 
            variant="primary" 
            icon={<CheckCircle size={18} />}
            style={{ width: '100%' }}
            onClick={onBack}
          >
            Aceptar
          </Button>
        </div>
      </div>
    </MobileFrame>
  );
};
