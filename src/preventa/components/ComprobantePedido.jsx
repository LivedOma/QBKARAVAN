import React, { useState } from 'react';
import { Receipt, Building, Phone, Mail, Package, Calculator, User, Send, MessageSquare, Smartphone, Printer, Download, CheckCircle } from 'lucide-react';
import { MobileFrame, Card, Button } from '../../shared/MobileComponents.jsx';
import { colors } from '../../shared/colors.js';

export const ComprobantePedido = ({ pedido, onBack }) => {
  const [sendMethod, setSendMethod] = useState('');
  const [sent, setSent] = useState(false);

  const orderData = pedido || {
    folio: 'PED-2026-00127',
    fecha: '7 Ene 2026, 14:30',
    cliente: {
      nombre: 'Abarrotes La Esquina',
      rfc: 'AES920315HG7',
      direccion: 'Av. Juárez 456, Col. Centro',
      telefono: '(555) 234-5678',
      email: 'abarrotes.esquina@email.com'
    },
    productos: [
      { nombre: 'Coca-Cola 600ml', cantidad: 24, precio: 15.00, subtotal: 360.00 },
      { nombre: 'Sabritas Original 45g', cantidad: 30, precio: 12.50, subtotal: 375.00 },
      { nombre: 'Gansito Marinela', cantidad: 20, precio: 8.00, subtotal: 160.00 }
    ],
    subtotal: 895.00,
    descuento: { tipo: 'Porcentaje', valor: 10, monto: 89.50, motivo: 'Cliente frecuente' },
    subtotalConDescuento: 805.50,
    iva: 128.88,
    total: 934.38,
    vendedor: 'Juan Pérez',
    condiciones: 'Pago: Contado | Entrega: Inmediata'
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
    <MobileFrame title="Comprobante de Pedido" showBack onBack={onBack} statusBar={true}>
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

          {/* Header del Pedido */}
          <Card style={{ 
            marginBottom: 16, 
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`, 
            color: 'white' 
          }}>
            <div style={{ textAlign: 'center', marginBottom: 12 }}>
              <Receipt size={40} style={{ marginBottom: 8 }} />
              <div style={{ fontSize: 18, fontWeight: 700 }}>{orderData.folio}</div>
              <div style={{ fontSize: 12, opacity: 0.9 }}>{orderData.fecha}</div>
            </div>
            <div style={{ padding: '12px 0', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Total del Pedido</div>
              <div style={{ fontSize: 28, fontWeight: 700 }}>${orderData.total.toFixed(2)}</div>
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
              <Building size={18} color={colors.primary} />
              Datos del Cliente
            </div>
            <div style={{ fontSize: 13, color: colors.gray700, lineHeight: 1.6 }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{orderData.cliente.nombre}</div>
              <div>RFC: {orderData.cliente.rfc}</div>
              <div>{orderData.cliente.direccion}</div>
              <div style={{ display: 'flex', gap: 16, marginTop: 8, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Phone size={14} color={colors.gray500} />
                  <span style={{ fontSize: 12 }}>{orderData.cliente.telefono}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Mail size={14} color={colors.gray500} />
                  <span style={{ fontSize: 12 }}>{orderData.cliente.email}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Lista de Productos */}
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
              <Package size={18} color={colors.primary} />
              Productos
            </div>
            <div style={{ borderTop: `1px solid ${colors.gray200}` }}>
              {orderData.productos.map((prod, idx) => (
                <div key={idx} style={{ 
                  padding: '12px 0', 
                  borderBottom: idx < orderData.productos.length - 1 ? `1px solid ${colors.gray200}` : 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: colors.gray800 }}>
                      {prod.nombre}
                    </div>
                    <div style={{ fontSize: 12, color: colors.gray600, marginTop: 2 }}>
                      {prod.cantidad} × ${prod.precio.toFixed(2)}
                    </div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray800 }}>
                    ${prod.subtotal.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Resumen de Totales */}
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
              <Calculator size={18} color={colors.primary} />
              Resumen
            </div>
            <div style={{ fontSize: 13 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, color: colors.gray700 }}>
                <span>Subtotal</span>
                <span>${orderData.subtotal.toFixed(2)}</span>
              </div>
              {orderData.descuento && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, color: colors.success }}>
                  <span>
                    Descuento ({orderData.descuento.tipo} {orderData.descuento.valor}
                    {orderData.descuento.tipo === 'Porcentaje' ? '%' : ''})
                  </span>
                  <span>-${orderData.descuento.monto.toFixed(2)}</span>
                </div>
              )}
              {orderData.descuento && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, color: colors.gray700 }}>
                  <span>Subtotal con descuento</span>
                  <span>${orderData.subtotalConDescuento.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, color: colors.gray700 }}>
                <span>IVA (16%)</span>
                <span>${orderData.iva.toFixed(2)}</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                paddingTop: 12, 
                borderTop: `2px solid ${colors.gray300}`, 
                fontWeight: 700, 
                fontSize: 16, 
                color: colors.gray900 
              }}>
                <span>Total</span>
                <span style={{ color: colors.primary }}>${orderData.total.toFixed(2)}</span>
              </div>
            </div>
            {orderData.descuento && (
              <div style={{ 
                marginTop: 12, 
                fontSize: 12, 
                color: colors.gray600, 
                backgroundColor: colors.gray100, 
                padding: 8, 
                borderRadius: 4 
              }}>
                <div><strong>Motivo descuento:</strong> {orderData.descuento.motivo}</div>
                <div style={{ marginTop: 4 }}><strong>Condiciones:</strong> {orderData.condiciones}</div>
              </div>
            )}
          </Card>

          {/* Información del Vendedor */}
          <Card style={{ marginBottom: 16 }}>
            <div style={{ 
              fontSize: 13, 
              color: colors.gray700, 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}>
              <div>
                <div style={{ fontSize: 12, color: colors.gray500, marginBottom: 2 }}>Vendedor</div>
                <div style={{ fontWeight: 600 }}>{orderData.vendedor}</div>
              </div>
              <User size={20} color={colors.gray400} />
            </div>
          </Card>

          {/* Opciones de Envío */}
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
              <Send size={18} color={colors.primary} />
              Enviar Comprobante
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <button
                onClick={() => handleSend('Email')}
                disabled={sent}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: 8, 
                  padding: 12,
                  border: `2px solid ${colors.primary}`,
                  borderRadius: 8,
                  backgroundColor: 'white',
                  color: colors.primary,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: sent ? 'not-allowed' : 'pointer',
                  opacity: sent ? 0.5 : 1
                }}
              >
                <Mail size={18} />
                Email
              </button>
              <button
                onClick={() => handleSend('WhatsApp')}
                disabled={sent}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: 8, 
                  padding: 12,
                  border: `2px solid ${colors.success}`,
                  borderRadius: 8,
                  backgroundColor: 'white',
                  color: colors.success,
                  fontSize: 13,
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
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: 8, 
                  padding: 12,
                  border: `2px solid ${colors.accent}`,
                  borderRadius: 8,
                  backgroundColor: 'white',
                  color: colors.accent,
                  fontSize: 13,
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
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: 8, 
                  padding: 12,
                  border: `2px solid ${colors.gray600}`,
                  borderRadius: 8,
                  backgroundColor: 'white',
                  color: colors.gray600,
                  fontSize: 13,
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
