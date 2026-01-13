import React, { useState } from 'react';
import { Building, Plus, Minus, Trash2, Check, Tag, X, AlertCircle } from 'lucide-react';
import { MobileFrame, Card, Button } from '../../shared/MobileComponents.jsx';
import { colors } from '../../shared/colors.js';

export const CapturaPedido = ({ onOpenCatalog, onBack, productosIniciales = [], onConfirmarPedido }) => {
  const [orderItems, setOrderItems] = useState(productosIniciales.length > 0 ? productosIniciales : [
    { id: 1, name: 'Leche Entera 1L', code: 'LAC-001', price: 28.50, qty: 24, suggested: 24 },
    { id: 4, name: 'Yogurt Natural 1kg', code: 'YOG-015', price: 45.00, qty: 12, suggested: 18 },
    { id: 7, name: 'Queso Panela 400g', code: 'QUE-008', price: 65.00, qty: 8, suggested: 10 },
  ]);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [discountType, setDiscountType] = useState('percentage');
  const [discountValue, setDiscountValue] = useState('');
  const [discountReason, setDiscountReason] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(null);

  const updateQuantity = (id, delta) => {
    setOrderItems(items => items.map(item => 
      item.id === id 
        ? { ...item, qty: Math.max(0, item.qty + delta) }
        : item
    ).filter(item => item.qty > 0));
  };

  const removeItem = (id) => {
    setOrderItems(items => items.filter(item => item.id !== id));
  };

  const addProduct = (product) => {
    const exists = orderItems.find(item => item.id === product.id);
    if (exists) {
      updateQuantity(product.id, 1);
    } else {
      setOrderItems([...orderItems, { ...product, qty: 1, suggested: 1 }]);
    }
  };

  const applyDiscount = () => {
    if (!discountValue || discountValue <= 0) return;
    
    setAppliedDiscount({
      type: discountType,
      value: parseFloat(discountValue),
      reason: discountReason || 'Sin motivo especificado',
    });
    setShowDiscountModal(false);
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
    setDiscountValue('');
    setDiscountReason('');
  };

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  
  let discountAmount = 0;
  if (appliedDiscount) {
    if (appliedDiscount.type === 'percentage') {
      discountAmount = subtotal * (appliedDiscount.value / 100);
    } else {
      discountAmount = appliedDiscount.value;
    }
  }
  
  const subtotalAfterDiscount = subtotal - discountAmount;
  const iva = subtotalAfterDiscount * 0.16;
  const total = subtotalAfterDiscount + iva;

  const handleFinalizarPedido = () => {
    // Preparar datos del pedido para el comprobante
    const pedidoData = {
      productos: orderItems,
      subtotal,
      descuento: appliedDiscount,
      total,
      fecha: new Date().toISOString(),
    };
    
    if (onConfirmarPedido) {
      onConfirmarPedido(pedidoData);
    } else {
      alert(`✅ Pedido confirmado por $${total.toFixed(2)}\n${orderItems.length} productos\n\nEl pedido ha sido registrado exitosamente.`);
      if (onBack) onBack();
    }
  };

  return (
    <>
      <MobileFrame title="Nuevo Pedido" showBack onBack={onBack} statusBar={true}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, overflowY: 'auto', padding: 16, paddingBottom: 0 }}>
            <Card style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: colors.primary + '20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Building size={24} color={colors.primary} />
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: colors.gray800 }}>Abarrotes Don José</div>
                  <div style={{ fontSize: 12, color: colors.gray500 }}>Crédito disponible: $15,000</div>
                </div>
              </div>
            </Card>

            <div style={{ fontSize: 12, fontWeight: 600, color: colors.gray500, marginBottom: 8 }}>
              PRODUCTOS EN PEDIDO ({orderItems.length})
            </div>
            
            {orderItems.map((prod) => (
              <Card key={prod.id} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: colors.gray800 }}>{prod.name}</div>
                    <div style={{ fontSize: 11, color: colors.gray500 }}>{prod.code} • ${prod.price.toFixed(2)}</div>
                    {prod.suggested && prod.qty !== prod.suggested && (
                      <div style={{ fontSize: 10, color: colors.accent, marginTop: 2 }}>Sugerido: {prod.suggested}</div>
                    )}
                  </div>
                  <button 
                    onClick={() => removeItem(prod.id)}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      border: 'none',
                      backgroundColor: `${colors.danger}15`,
                      color: colors.danger,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button 
                      onClick={() => updateQuantity(prod.id, -1)}
                      disabled={prod.qty === 1}
                      style={{ 
                        width: 32, 
                        height: 32, 
                        borderRadius: 8, 
                        border: `1px solid ${colors.gray300}`, 
                        backgroundColor: colors.white, 
                        cursor: prod.qty === 1 ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: prod.qty === 1 ? 0.5 : 1,
                      }}
                    >
                      <Minus size={16} color={colors.gray600} />
                    </button>
                    <span style={{ width: 40, textAlign: 'center', fontWeight: 600 }}>{prod.qty}</span>
                    <button 
                      onClick={() => updateQuantity(prod.id, 1)}
                      style={{ 
                        width: 32, 
                        height: 32, 
                        borderRadius: 8, 
                        border: 'none', 
                        backgroundColor: colors.primary, 
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Plus size={16} color={colors.white} />
                    </button>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: colors.gray800 }}>
                    ${(prod.price * prod.qty).toFixed(2)}
                  </div>
                </div>
              </Card>
            ))}

            <Button 
              variant="secondary" 
              icon={<Plus size={18} />} 
              style={{ width: '100%', marginBottom: 16 }}
              onClick={onOpenCatalog}
            >
              Agregar Producto
            </Button>
          </div>
          
          {/* Footer con totales */}
          <div style={{ 
            padding: 16, 
            backgroundColor: colors.white, 
            borderTop: `1px solid ${colors.gray200}`,
            boxShadow: '0 -4px 6px rgba(0,0,0,0.05)',
          }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ color: colors.gray600 }}>Subtotal:</span>
            <span style={{ fontWeight: 500 }}>${subtotal.toFixed(2)}</span>
          </div>
          
          {appliedDiscount && (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: 8,
              padding: '8px',
              backgroundColor: `${colors.success}10`,
              borderRadius: 6,
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: colors.success }}>
                  Descuento {appliedDiscount.type === 'percentage' ? `(${appliedDiscount.value}%)` : ''}
                </div>
                <div style={{ fontSize: 10, color: colors.gray500 }}>{appliedDiscount.reason}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 600, color: colors.success }}>-${discountAmount.toFixed(2)}</span>
                <button 
                  onClick={removeDiscount}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 4,
                    border: 'none',
                    backgroundColor: colors.danger,
                    color: colors.white,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <X size={12} />
                </button>
              </div>
            </div>
          )}
          
          {!appliedDiscount && (
            <button 
              onClick={() => setShowDiscountModal(true)}
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: 8,
                borderRadius: 6,
                border: `1px dashed ${colors.success}`,
                backgroundColor: `${colors.success}05`,
                color: colors.success,
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              <Tag size={16} /> Aplicar Descuento
            </button>
          )}
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ color: colors.gray600 }}>IVA (16%):</span>
            <span style={{ fontWeight: 500 }}>${iva.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontSize: 18, fontWeight: 700 }}>Total:</span>
            <span style={{ fontSize: 18, fontWeight: 700, color: colors.primary }}>${total.toFixed(2)}</span>
          </div>
          <Button 
            variant="primary" 
            icon={<Check size={20} />}
            onClick={handleFinalizarPedido}
            style={{ width: '100%', padding: '14px' }}
          >
            Confirmar Pedido
          </Button>
          </div>
        </div>
      </MobileFrame>

      {/* Modal de Descuento */}
      {showDiscountModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: 20,
        }}>
          <div style={{
            backgroundColor: colors.white,
            borderRadius: 16,
            padding: 24,
            maxWidth: 400,
            width: '100%',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Aplicar Descuento</h3>
              <button 
                onClick={() => setShowDiscountModal(false)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  border: 'none',
                  backgroundColor: colors.gray100,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: colors.gray600, marginBottom: 8, display: 'block' }}>
                Tipo de Descuento
              </label>
              <div style={{ display: 'flex', gap: 8 }}>
                <button 
                  onClick={() => setDiscountType('percentage')}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: 8,
                    border: discountType === 'percentage' ? `2px solid ${colors.primary}` : `1px solid ${colors.gray300}`,
                    backgroundColor: discountType === 'percentage' ? `${colors.primary}10` : colors.white,
                    color: discountType === 'percentage' ? colors.primary : colors.gray600,
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  Porcentaje (%)
                </button>
                <button 
                  onClick={() => setDiscountType('amount')}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: 8,
                    border: discountType === 'amount' ? `2px solid ${colors.primary}` : `1px solid ${colors.gray300}`,
                    backgroundColor: discountType === 'amount' ? `${colors.primary}10` : colors.white,
                    color: discountType === 'amount' ? colors.primary : colors.gray600,
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  Monto ($)
                </button>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: colors.gray600, marginBottom: 8, display: 'block' }}>
                Valor del Descuento
              </label>
              <input 
                type="number"
                placeholder={discountType === 'percentage' ? 'Ej: 10' : 'Ej: 100.00'}
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: 8,
                  border: `1px solid ${colors.gray300}`,
                  fontSize: 14,
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: colors.gray600, marginBottom: 8, display: 'block' }}>
                Motivo del Descuento
              </label>
              <select 
                value={discountReason}
                onChange={(e) => setDiscountReason(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: 8,
                  border: `1px solid ${colors.gray300}`,
                  fontSize: 14,
                  outline: 'none',
                  backgroundColor: colors.white,
                }}
              >
                <option value="">Seleccionar motivo...</option>
                <option value="Promoción especial">Promoción especial</option>
                <option value="Cliente frecuente">Cliente frecuente</option>
                <option value="Volumen de compra">Volumen de compra</option>
                <option value="Autorización gerencia">Autorización gerencia</option>
                <option value="Compensación">Compensación</option>
              </select>
            </div>

            <Card style={{ backgroundColor: `${colors.warning}10`, border: `1px solid ${colors.warning}`, marginBottom: 16, padding: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <AlertCircle size={18} color={colors.warning} />
                <div style={{ fontSize: 11, color: colors.gray700 }}>
                  Este descuento quedará registrado
                </div>
              </div>
            </Card>

            <div style={{ display: 'flex', gap: 8 }}>
              <Button 
                variant="secondary" 
                onClick={() => setShowDiscountModal(false)}
                style={{ flex: 1 }}
              >
                Cancelar
              </Button>
              <Button 
                variant="success" 
                icon={<Check size={18} />}
                onClick={applyDiscount}
                disabled={!discountValue || !discountReason}
                style={{ flex: 1 }}
              >
                Aplicar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
