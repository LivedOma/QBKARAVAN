import React, { useState } from 'react';
import { AlertTriangle, Search, Camera, CheckCircle, RotateCcw, Calendar, AlertCircle, XCircle, Package } from 'lucide-react';
import { MobileFrame, Card, Button } from '../../shared/MobileComponents.jsx';
import { colors } from '../../shared/colors.js';

export const RegistrarDevolucion = ({ onBack, onConfirm }) => {
  const [quantity, setQuantity] = useState(0);
  const [loteNumber, setLoteNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [returnReason, setReturnReason] = useState('caducidad');
  const [photo, setPhoto] = useState(null);
  const [observations, setObservations] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const unitPrice = 45.00;
  const estimatedAmount = quantity * unitPrice;

  const returnReasons = [
    { value: 'caducidad', label: 'Producto Caducado', icon: <Calendar size={18} />, color: colors.danger },
    { value: 'daniado', label: 'Producto Dañado', icon: <AlertCircle size={18} />, color: colors.warning },
    { value: 'defecto', label: 'Defecto de Fábrica', icon: <XCircle size={18} />, color: colors.gray600 },
    { value: 'equivocado', label: 'Pedido Equivocado', icon: <Package size={18} />, color: colors.accent },
  ];

  const handleTakePhoto = () => {
    const emojis = ['📦', '📸', '🔍', '⚠️'];
    setPhoto(emojis[Math.floor(Math.random() * emojis.length)]);
  };

  const handleRetakePhoto = () => {
    setPhoto(null);
  };

  const handleRegisterReturn = () => {
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      if (onConfirm) {
        onConfirm({
          quantity,
          lote: loteNumber,
          caducidad: expiryDate,
          motivo: returnReasons.find(r => r.value === returnReason)?.label,
          monto: estimatedAmount,
          observaciones: observations
        });
      }
    }, 2000);
  };

  return (
    <MobileFrame title="Registrar Devolución" showBack onBack={onBack} statusBar={true}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          {/* Alerta */}
          <Card style={{ marginBottom: 16, backgroundColor: `${colors.warning}10`, border: `1px solid ${colors.warning}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <AlertTriangle size={24} color={colors.warning} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray800 }}>
                  Devolución por {returnReasons.find(r => r.value === returnReason)?.label}
                </div>
                <div style={{ fontSize: 12, color: colors.gray600 }}>Se generará una nota de crédito</div>
              </div>
            </div>
          </Card>

          {/* Buscar Producto */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: colors.gray600, marginBottom: 8, display: 'block' }}>
              Producto
            </label>
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: colors.gray400 }} />
              <input
                placeholder="Buscar o escanear..."
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 40px',
                  border: `1px solid ${colors.gray300}`,
                  borderRadius: 8,
                  fontSize: 14,
                  fontFamily: 'inherit',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* Producto Seleccionado */}
          <Card style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: colors.gray800 }}>
              Producto Seleccionado
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ 
                width: 60, 
                height: 60, 
                backgroundColor: colors.gray100, 
                borderRadius: 8, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: 28 
              }}>
                🥛
              </div>
              <div>
                <div style={{ fontWeight: 500, color: colors.gray800 }}>Yogurt Natural 1kg</div>
                <div style={{ fontSize: 12, color: colors.gray500 }}>YOG-015 • ${unitPrice.toFixed(2)}</div>
              </div>
            </div>
          </Card>

          {/* Cantidad y Lote */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: colors.gray600, marginBottom: 8, display: 'block' }}>
                Cantidad *
              </label>
              <input
                type="number"
                placeholder="0"
                value={quantity || ''}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                style={{
                  width: '100%',
                  padding: 12,
                  border: `1px solid ${colors.gray300}`,
                  borderRadius: 8,
                  fontSize: 14,
                  fontFamily: 'inherit',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: colors.gray600, marginBottom: 8, display: 'block' }}>
                Número de Lote
              </label>
              <input
                type="text"
                placeholder="LOT-XXXX"
                value={loteNumber}
                onChange={(e) => setLoteNumber(e.target.value)}
                style={{
                  width: '100%',
                  padding: 12,
                  border: `1px solid ${colors.gray300}`,
                  borderRadius: 8,
                  fontSize: 14,
                  fontFamily: 'inherit',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* Fecha de Caducidad */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: colors.gray600, marginBottom: 8, display: 'block' }}>
              Fecha de Caducidad
            </label>
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              style={{
                width: '100%',
                padding: 12,
                border: `1px solid ${colors.gray300}`,
                borderRadius: 8,
                fontSize: 14,
                fontFamily: 'inherit',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Motivo de Devolución */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: colors.gray600, marginBottom: 8, display: 'block' }}>
              Motivo de Devolución *
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {returnReasons.map((reason) => (
                <button
                  key={reason.value}
                  onClick={() => setReturnReason(reason.value)}
                  style={{
                    padding: 12,
                    border: `2px solid ${returnReason === reason.value ? reason.color : colors.gray200}`,
                    borderRadius: 8,
                    backgroundColor: returnReason === reason.value ? `${reason.color}10` : colors.white,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ color: reason.color }}>
                    {reason.icon}
                  </div>
                  <div style={{ flex: 1, fontSize: 14, fontWeight: returnReason === reason.value ? 600 : 400, textAlign: 'left' }}>
                    {reason.label}
                  </div>
                  {returnReason === reason.value && (
                    <CheckCircle size={18} color={reason.color} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Evidencia Fotográfica */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: colors.gray600, marginBottom: 8, display: 'block' }}>
              Evidencia Fotográfica *
            </label>
            {!photo ? (
              <button
                onClick={handleTakePhoto}
                style={{
                  width: '100%',
                  border: `2px dashed ${colors.gray300}`,
                  borderRadius: 12,
                  padding: 32,
                  textAlign: 'center',
                  backgroundColor: colors.gray50,
                  cursor: 'pointer',
                }}
              >
                <Camera size={32} color={colors.gray400} />
                <div style={{ fontSize: 14, color: colors.gray500, marginTop: 8 }}>Tomar foto del producto</div>
                <div style={{ fontSize: 11, color: colors.gray400 }}>Requerido para generar NC</div>
              </button>
            ) : (
              <div>
                <div style={{
                  border: `2px solid ${colors.success}`,
                  borderRadius: 12,
                  padding: 20,
                  textAlign: 'center',
                  backgroundColor: `${colors.success}10`,
                }}>
                  <div style={{ fontSize: 48, marginBottom: 8 }}>{photo}</div>
                  <div style={{ fontSize: 13, color: colors.success, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    <CheckCircle size={16} />
                    Foto capturada correctamente
                  </div>
                  <div style={{ fontSize: 11, color: colors.gray500, marginTop: 4 }}>
                    {new Date().toLocaleString('es-MX', { 
                      day: 'numeric', 
                      month: 'short', 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
                <button
                  onClick={handleRetakePhoto}
                  style={{
                    width: '100%',
                    marginTop: 8,
                    padding: '8px 16px',
                    border: `1px solid ${colors.gray300}`,
                    borderRadius: 8,
                    backgroundColor: 'white',
                    color: colors.gray700,
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6
                  }}
                >
                  <Camera size={16} />
                  Retomar Foto
                </button>
              </div>
            )}
          </div>

          {/* Observaciones */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: colors.gray600, marginBottom: 8, display: 'block' }}>
              Observaciones
            </label>
            <textarea
              placeholder="Notas adicionales..."
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              style={{
                width: '100%',
                minHeight: 60,
                padding: 12,
                border: `1px solid ${colors.gray300}`,
                borderRadius: 8,
                fontSize: 13,
                fontFamily: 'inherit',
                resize: 'vertical',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        {/* Footer Fijo */}
        <div style={{ 
          padding: 16, 
          backgroundColor: colors.white, 
          borderTop: `1px solid ${colors.gray200}` 
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ color: colors.gray600, fontSize: 14 }}>Monto Estimado NC:</span>
            <span style={{ fontSize: 18, fontWeight: 700, color: colors.warning }}>
              ${estimatedAmount.toFixed(2)}
            </span>
          </div>
          <Button 
            variant={!photo || quantity === 0 ? "secondary" : "warning"}
            icon={<RotateCcw size={20} />}
            onClick={handleRegisterReturn}
            disabled={!photo || quantity === 0}
            style={{ 
              width: '100%',
              opacity: !photo || quantity === 0 ? 0.5 : 1,
              cursor: !photo || quantity === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            Registrar Devolución
          </Button>
        </div>

        {/* Modal de Confirmación */}
        {showConfirmation && (
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
            padding: 20,
            borderRadius: 40
          }}>
            <div style={{
              backgroundColor: colors.white,
              borderRadius: 16,
              padding: 24,
              textAlign: 'center',
              maxWidth: 280
            }}>
              <CheckCircle size={48} color={colors.success} style={{ marginBottom: 16 }} />
              <div style={{ fontSize: 18, fontWeight: 700, color: colors.gray800, marginBottom: 8 }}>
                Devolución Registrada
              </div>
              <div style={{ fontSize: 13, color: colors.gray600 }}>
                Se ha generado la nota de crédito por ${estimatedAmount.toFixed(2)}
              </div>
            </div>
          </div>
        )}
      </div>
    </MobileFrame>
  );
};
