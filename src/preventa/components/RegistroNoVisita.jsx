import React, { useState } from 'react';
import { AlertTriangle, Lock, MapPin, X, XCircle, Clock, AlertCircle, Camera, CheckCircle } from 'lucide-react';
import { MobileFrame, Card, Button } from '../../shared/MobileComponents.jsx';
import { colors } from '../../shared/colors.js';

export const RegistroNoVisita = ({ cliente, onConfirm, onCancel }) => {
  const [motivoSeleccionado, setMotivoSeleccionado] = useState('cerrado');
  const [observaciones, setObservaciones] = useState('');
  const [fotoTomada, setFotoTomada] = useState(false);

  const motivos = [
    { id: 'cerrado', label: 'Cliente cerrado', icon: <Lock size={18} /> },
    { id: 'no-encontrado', label: 'Cliente no encontrado', icon: <MapPin size={18} /> },
    { id: 'no-recibe', label: 'No recibe pedido hoy', icon: <X size={18} /> },
    { id: 'negativa', label: 'Negativa del cliente', icon: <XCircle size={18} /> },
    { id: 'falta-tiempo', label: 'Falta de tiempo', icon: <Clock size={18} /> },
    { id: 'otro', label: 'Otro motivo', icon: <AlertCircle size={18} /> },
  ];

  const handleTomarFoto = () => {
    setFotoTomada(true);
    alert('📸 Foto capturada como evidencia');
  };

  const handleConfirmar = () => {
    const motivo = motivos.find(m => m.id === motivoSeleccionado);
    const data = {
      motivo: motivo.label,
      observaciones,
      fotoTomada,
      hora: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
      fecha: new Date().toLocaleDateString('es-MX')
    };
    
    if (onConfirm) {
      onConfirm(data);
    }
  };

  const clienteData = cliente || {
    name: 'Abarrotes Don José',
    id: 'CLI-001',
    address: 'Av. Juárez 234'
  };

  return (
    <MobileFrame title="Registrar No Visita" showBack onBack={onCancel} statusBar={true}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          {/* Alerta */}
          <Card style={{ marginBottom: 16, backgroundColor: `${colors.danger}10`, border: `1px solid ${colors.danger}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <AlertTriangle size={24} color={colors.danger} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray800 }}>Visita No Realizada</div>
                <div style={{ fontSize: 12, color: colors.gray600 }}>Esta acción quedará registrada en el sistema</div>
              </div>
            </div>
          </Card>

          {/* Info del Cliente */}
          <Card style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: colors.gray500, marginBottom: 4 }}>Cliente</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: colors.gray800 }}>{clienteData.name}</div>
            <div style={{ fontSize: 12, color: colors.gray500, marginTop: 2 }}>
              {clienteData.id} • {clienteData.address}
            </div>
          </Card>

          {/* Motivos */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: colors.gray600, marginBottom: 8, display: 'block' }}>
              Motivo de No Visita *
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {motivos.map((motivo) => (
                <button 
                  key={motivo.id} 
                  onClick={() => setMotivoSeleccionado(motivo.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 16px',
                    borderRadius: 8,
                    border: motivoSeleccionado === motivo.id ? `2px solid ${colors.primary}` : `1px solid ${colors.gray300}`,
                    backgroundColor: motivoSeleccionado === motivo.id ? `${colors.primary}08` : colors.white,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ color: motivoSeleccionado === motivo.id ? colors.primary : colors.gray500 }}>
                    {motivo.icon}
                  </div>
                  <span style={{ 
                    fontSize: 14, 
                    fontWeight: motivoSeleccionado === motivo.id ? 600 : 400, 
                    color: motivoSeleccionado === motivo.id ? colors.primary : colors.gray700 
                  }}>
                    {motivo.label}
                  </span>
                  {motivoSeleccionado === motivo.id && (
                    <div style={{ marginLeft: 'auto' }}>
                      <CheckCircle size={20} color={colors.primary} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Evidencia Fotográfica */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: colors.gray600, marginBottom: 8, display: 'block' }}>
              Evidencia Fotográfica (Opcional)
            </label>
            <button
              onClick={handleTomarFoto}
              style={{
                width: '100%',
                border: fotoTomada ? `2px solid ${colors.success}` : `2px dashed ${colors.gray300}`,
                borderRadius: 12,
                padding: 32,
                textAlign: 'center',
                backgroundColor: fotoTomada ? `${colors.success}10` : colors.gray50,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {fotoTomada ? (
                <>
                  <CheckCircle size={28} color={colors.success} />
                  <div style={{ fontSize: 13, color: colors.success, marginTop: 8, fontWeight: 600 }}>
                    Foto capturada
                  </div>
                  <div style={{ fontSize: 11, color: colors.gray500 }}>Toca para tomar otra</div>
                </>
              ) : (
                <>
                  <Camera size={28} color={colors.gray400} />
                  <div style={{ fontSize: 13, color: colors.gray500, marginTop: 8 }}>
                    Tomar foto del establecimiento
                  </div>
                  <div style={{ fontSize: 11, color: colors.gray400 }}>Opcional</div>
                </>
              )}
            </button>
          </div>

          {/* Observaciones */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: colors.gray600, marginBottom: 8, display: 'block' }}>
              Observaciones Adicionales
            </label>
            <textarea
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              placeholder="Agrega notas o comentarios sobre esta visita..."
              style={{
                width: '100%',
                minHeight: 80,
                padding: 12,
                borderRadius: 8,
                border: `1px solid ${colors.gray300}`,
                fontSize: 13,
                fontFamily: 'inherit',
                resize: 'vertical',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Info de Registro */}
          <Card style={{ backgroundColor: `${colors.accent}10`, border: `1px solid ${colors.accent}` }}>
            <div style={{ fontSize: 12, color: colors.gray600, marginBottom: 8, fontWeight: 600 }}>
              Información de Registro
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 12, color: colors.gray600 }}>Hora:</span>
              <span style={{ fontSize: 12, fontWeight: 500 }}>
                {new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: colors.gray600 }}>Ubicación GPS:</span>
              <span style={{ fontSize: 12, fontWeight: 500, color: colors.success }}>25.6866° N, 100.3161° W</span>
            </div>
          </Card>
        </div>

        {/* Botones Fijos */}
        <div style={{ 
          padding: 16, 
          backgroundColor: colors.white, 
          borderTop: `1px solid ${colors.gray200}`,
          display: 'flex',
          gap: 8
        }}>
          <Button variant="secondary" onClick={onCancel} style={{ flex: 1 }}>
            Cancelar
          </Button>
          <Button variant="danger" icon={<XCircle size={18} />} onClick={handleConfirmar} style={{ flex: 1 }}>
            Confirmar No Visita
          </Button>
        </div>
      </div>
    </MobileFrame>
  );
};
