import React, { useState, useEffect } from 'react';
import { Layers, Zap, RefreshCw, Navigation, Check, MapPin, Clock, ChevronLeft } from 'lucide-react';
import { MobileFrame, Card, Button } from '../../shared/MobileComponents.jsx';
import { colors } from '../../shared/colors.js';

const Badge = ({ children, color = 'success', size = 'md' }) => {
  const colors_map = {
    success: { bg: colors.success, text: colors.white },
    primary: { bg: colors.primary, text: colors.white },
  };
  const c = colors_map[color] || colors_map.success;
  const padding = size === 'sm' ? '2px 8px' : '4px 10px';
  const fontSize = size === 'sm' ? 10 : 11;
  
  return (
    <span style={{
      backgroundColor: c.bg,
      color: c.text,
      padding,
      borderRadius: 12,
      fontSize,
      fontWeight: 600,
    }}>
      {children}
    </span>
  );
};

export const ReordenarRuta = ({ clientesIniciales, onSave, onCancel }) => {
  const [clients, setClients] = useState(clientesIniciales || []);
  const [originalClients, setOriginalClients] = useState(clientesIniciales || []);
  const [optimizing, setOptimizing] = useState(false);

  const moveUp = (index) => {
    if (index === 0) return;
    const newClients = [...clients];
    [newClients[index - 1], newClients[index]] = [newClients[index], newClients[index - 1]];
    setClients(newClients);
  };

  const moveDown = (index) => {
    if (index === clients.length - 1) return;
    const newClients = [...clients];
    [newClients[index], newClients[index + 1]] = [newClients[index + 1], newClients[index]];
    setClients(newClients);
  };

  const optimizeRoute = () => {
    setOptimizing(true);
    setTimeout(() => {
      // Simular optimización por distancia
      const optimized = [...clients].sort((a, b) => {
        const distA = parseFloat(a.distance);
        const distB = parseFloat(b.distance);
        return distA - distB;
      });
      setClients(optimized);
      setOptimizing(false);
    }, 2000);
  };

  const resetOrder = () => {
    setClients([...originalClients]);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(clients);
    }
  };

  return (
    <MobileFrame 
      title="Reordenar Ruta" 
      showBack 
      onBack={onCancel}
      rightAction={
        <button 
          onClick={resetOrder} 
          style={{ 
            background: 'none', 
            border: 'none', 
            color: colors.white, 
            cursor: 'pointer', 
            fontSize: 12, 
            fontWeight: 600 
          }}
        >
          Restaurar
        </button>
      }
      statusBar={true}
    >
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          <Card style={{ marginBottom: 16, backgroundColor: `${colors.accent}10`, border: `1px solid ${colors.accent}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Layers size={24} color={colors.accent} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray800 }}>Reorganizar Secuencia</div>
                <div style={{ fontSize: 12, color: colors.gray600 }}>Usa los botones para reordenar</div>
              </div>
            </div>
          </Card>

          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <Button 
              variant={optimizing ? "secondary" : "primary"} 
              icon={optimizing ? <RefreshCw size={16} style={{ animation: optimizing ? 'spin 1s linear infinite' : 'none' }} /> : <Zap size={16} />}
              onClick={optimizeRoute}
              disabled={optimizing}
              style={{ flex: 1 }}
            >
              {optimizing ? 'Optimizando...' : 'Optimizar Automático'}
            </Button>
            <Button variant="secondary" icon={<Navigation size={16} />}>
              Ver Mapa
            </Button>
          </div>

          {optimizing && (
            <Card style={{ marginBottom: 16, backgroundColor: `${colors.primary}10`, border: `1px solid ${colors.primary}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ animation: 'spin 1s linear infinite' }}>
                  <RefreshCw size={20} color={colors.primary} />
                </div>
                <div style={{ fontSize: 13, color: colors.primary }}>
                  Calculando ruta óptima por distancia y tiempo...
                </div>
              </div>
            </Card>
          )}

          <div style={{ fontSize: 12, fontWeight: 600, color: colors.gray500, marginBottom: 8 }}>
            SECUENCIA DE VISITAS ({clients.length})
          </div>

          {clients.map((client, index) => (
            <Card key={client.id || index} style={{ marginBottom: 8, opacity: optimizing ? 0.6 : 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: index === 0 ? colors.success : colors.gray100,
                  color: index === 0 ? colors.white : colors.gray600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  fontWeight: 700,
                  flexShrink: 0,
                }}>
                  {index + 1}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: colors.gray800, display: 'flex', alignItems: 'center', gap: 6 }}>
                    {client.name}
                    {index === 0 && <Badge color="success" size="sm">Siguiente</Badge>}
                  </div>
                  <div style={{ fontSize: 11, color: colors.gray500, marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <MapPin size={10} />{client.address || 'Sin dirección'}
                  </div>
                  <div style={{ fontSize: 11, color: colors.gray500, marginTop: 2, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Clock size={10} />{client.time}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Navigation size={10} />{client.distance}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <button
                    onClick={() => moveUp(index)}
                    disabled={index === 0 || optimizing}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 6,
                      border: `1px solid ${colors.gray300}`,
                      backgroundColor: index === 0 ? colors.gray100 : colors.white,
                      cursor: index === 0 || optimizing ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: index === 0 ? 0.4 : 1,
                    }}
                  >
                    <ChevronLeft size={16} color={colors.gray600} style={{ transform: 'rotate(90deg)' }} />
                  </button>
                  <button
                    onClick={() => moveDown(index)}
                    disabled={index === clients.length - 1 || optimizing}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 6,
                      border: `1px solid ${colors.gray300}`,
                      backgroundColor: index === clients.length - 1 ? colors.gray100 : colors.white,
                      cursor: index === clients.length - 1 || optimizing ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: index === clients.length - 1 ? 0.4 : 1,
                    }}
                  >
                    <ChevronLeft size={16} color={colors.gray600} style={{ transform: 'rotate(-90deg)' }} />
                  </button>
                </div>
              </div>
            </Card>
          ))}

          <Card style={{ marginTop: 16, backgroundColor: colors.gray50 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: colors.gray600, marginBottom: 8 }}>
              Resumen de Ruta
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: colors.gray600 }}>Total de clientes:</span>
              <span style={{ fontSize: 12, fontWeight: 600 }}>{clients.length}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: colors.gray600 }}>Distancia estimada:</span>
              <span style={{ fontSize: 12, fontWeight: 600 }}>18.5 km</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: colors.gray600 }}>Tiempo estimado:</span>
              <span style={{ fontSize: 12, fontWeight: 600 }}>5h 30min</span>
            </div>
          </Card>
        </div>

        <div style={{ padding: 16, backgroundColor: colors.white, borderTop: `1px solid ${colors.gray200}` }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="secondary" onClick={onCancel} style={{ flex: 1 }}>
              Cancelar
            </Button>
            <Button variant="success" icon={<Check size={18} />} onClick={handleSave} style={{ flex: 1 }}>
              Guardar Orden
            </Button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </MobileFrame>
  );
};
