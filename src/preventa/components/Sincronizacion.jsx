import React, { useState } from 'react';
import { Wifi, WifiOff, RefreshCw, ShoppingCart, MapPin, DollarSign, FileText, Camera, MessageSquare, Package, Users, Tag, CheckCircle, XCircle, AlertTriangle, Download, Clock } from 'lucide-react';
import { MobileFrame, MobileBottomNav, Card, Button } from '../../shared/MobileComponents.jsx';
import { colors } from '../../shared/colors.js';

export const Sincronizacion = ({ onBack, onNavigate, currentScreen, notificationCount = 0 }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('Hace 5 minutos');
  const [pendingCount, setPendingCount] = useState(7);
  const [syncProgress, setSyncProgress] = useState(0);
  const [selectedTab, setSelectedTab] = useState('pendientes');

  const pendingOperations = [
    { id: 1, type: 'Pedido', client: 'Abarrotes El Sol', amount: '$1,250.00', time: 'Hace 10 min', icon: ShoppingCart, color: colors.primary },
    { id: 2, type: 'Check-in', client: 'Tienda La Esquina', time: 'Hace 15 min', icon: MapPin, color: colors.success },
    { id: 3, type: 'Pago', client: 'Minisuper López', amount: '$3,400.00', time: 'Hace 20 min', icon: DollarSign, color: colors.warning },
    { id: 4, type: 'Nota de Crédito', client: 'Abarrotes El Sol', amount: '$150.00', time: 'Hace 25 min', icon: FileText, color: colors.gray600 },
    { id: 5, type: 'Foto', client: 'Tienda La Esquina', time: 'Hace 30 min', icon: Camera, color: colors.accent },
    { id: 6, type: 'Check-out', client: 'Minisuper López', time: 'Hace 35 min', icon: MapPin, color: colors.danger },
    { id: 7, type: 'Observación', client: 'Abarrotes El Sol', time: 'Hace 40 min', icon: MessageSquare, color: colors.purple500 }
  ];

  const catalogs = [
    { id: 1, name: 'Productos', version: 'v2.3.1', size: '12.5 MB', lastUpdate: '15 Ene 2026', icon: Package },
    { id: 2, name: 'Clientes', version: 'v1.8.0', size: '3.2 MB', lastUpdate: '14 Ene 2026', icon: Users },
    { id: 3, name: 'Precios', version: 'v2.1.0', size: '1.8 MB', lastUpdate: '13 Ene 2026', icon: Tag },
    { id: 4, name: 'Rutas', version: 'v1.5.2', size: '850 KB', lastUpdate: '12 Ene 2026', icon: MapPin }
  ];

  const syncHistory = [
    { id: 1, date: '7 Ene 2026 14:30', items: 15, status: 'success', duration: '45s' },
    { id: 2, date: '7 Ene 2026 09:15', items: 8, status: 'success', duration: '32s' },
    { id: 3, date: '6 Ene 2026 18:45', items: 12, status: 'error', duration: '1m 20s', error: 'Timeout de conexión' },
    { id: 4, date: '6 Ene 2026 11:20', items: 20, status: 'success', duration: '1m 5s' },
    { id: 5, date: '5 Ene 2026 16:30', items: 10, status: 'success', duration: '38s' }
  ];

  const handleManualSync = () => {
    setIsSyncing(true);
    setSyncProgress(0);
    
    const interval = setInterval(() => {
      setSyncProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSyncing(false);
          setLastSyncTime('Ahora mismo');
          setPendingCount(0);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <MobileFrame title="Sincronización" showBack onBack={onBack} statusBar={true}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header de Estado */}
        <div style={{
          background: isOnline 
            ? `linear-gradient(135deg, ${colors.success} 0%, #059669 100%)` 
            : `linear-gradient(135deg, ${colors.danger} 0%, #dc2626 100%)`,
          padding: 16,
          color: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            {isOnline ? <Wifi size={20} /> : <WifiOff size={20} />}
            <span style={{ fontSize: 16, fontWeight: 600 }}>
              {isOnline ? 'En Línea' : 'Sin Conexión'}
            </span>
          </div>
          <div style={{ fontSize: 13, opacity: 0.9 }}>
            Última sincronización: {lastSyncTime}
          </div>
          {pendingCount > 0 && (
            <div style={{
              marginTop: 8,
              padding: '6px 12px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: 12,
              fontSize: 13,
              display: 'inline-block'
            }}>
              {pendingCount} operaciones pendientes
            </div>
          )}
        </div>

        {/* Botón de Sincronización */}
        <div style={{ padding: 16, backgroundColor: colors.gray50 }}>
          <button
            onClick={handleManualSync}
            disabled={isSyncing || !isOnline}
            style={{
              width: '100%',
              background: isSyncing ? colors.gray300 : colors.accent,
              color: 'white',
              border: 'none',
              borderRadius: 8,
              padding: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              fontSize: 15,
              fontWeight: 600,
              cursor: isSyncing || !isOnline ? 'not-allowed' : 'pointer',
              opacity: isSyncing || !isOnline ? 0.6 : 1
            }}
          >
            <RefreshCw 
              size={20} 
              style={{ 
                animation: isSyncing ? 'spin 1s linear infinite' : 'none',
                transformOrigin: 'center'
              }} 
            />
            {isSyncing ? 'Sincronizando...' : 'Sincronizar Ahora'}
          </button>
          
          {isSyncing && (
            <div style={{
              marginTop: 12,
              background: colors.gray200,
              borderRadius: 4,
              height: 6,
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${syncProgress}%`,
                background: colors.success,
                height: '100%',
                transition: 'width 0.3s ease'
              }} />
            </div>
          )}
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: `1px solid ${colors.gray200}`,
          background: colors.white
        }}>
          {['pendientes', 'catalogos', 'historial'].map(tab => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              style={{
                flex: 1,
                padding: 12,
                border: 'none',
                background: 'transparent',
                borderBottom: selectedTab === tab ? `3px solid ${colors.primary}` : 'none',
                color: selectedTab === tab ? colors.primary : colors.gray600,
                fontWeight: selectedTab === tab ? 600 : 400,
                fontSize: 13,
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Contenido */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 16, paddingBottom: 80 }}>
          {selectedTab === 'pendientes' && (
            <>
              {pendingOperations.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <CheckCircle size={48} color={colors.success} style={{ marginBottom: 16 }} />
                  <div style={{ fontSize: 16, fontWeight: 600, color: colors.gray800, marginBottom: 8 }}>
                    Todo Sincronizado
                  </div>
                  <div style={{ fontSize: 13, color: colors.gray500 }}>
                    No hay operaciones pendientes
                  </div>
                </div>
              ) : (
                pendingOperations.map(op => (
                  <Card key={op.id} style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: 8,
                        backgroundColor: `${op.color}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <op.icon size={20} color={op.color} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray800, marginBottom: 2 }}>
                          {op.type}
                        </div>
                        <div style={{ fontSize: 13, color: colors.gray600, marginBottom: 4 }}>
                          {op.client}
                        </div>
                        {op.amount && (
                          <div style={{ fontSize: 14, fontWeight: 600, color: colors.primary }}>
                            {op.amount}
                          </div>
                        )}
                      </div>
                      <div style={{ fontSize: 11, color: colors.gray500, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Clock size={12} />
                        {op.time}
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </>
          )}

          {selectedTab === 'catalogos' && (
            <>
              {catalogs.map(catalog => (
                <Card key={catalog.id} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: 8,
                      backgroundColor: `${colors.primary}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <catalog.icon size={24} color={colors.primary} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: colors.gray800, marginBottom: 2 }}>
                        {catalog.name}
                      </div>
                      <div style={{ fontSize: 12, color: colors.gray500 }}>
                        {catalog.version} • {catalog.size}
                      </div>
                      <div style={{ fontSize: 11, color: colors.gray400, marginTop: 2 }}>
                        Actualizado: {catalog.lastUpdate}
                      </div>
                    </div>
                    <button style={{
                      padding: '6px 12px',
                      borderRadius: 6,
                      border: `1px solid ${colors.primary}`,
                      backgroundColor: 'transparent',
                      color: colors.primary,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4
                    }}>
                      <Download size={14} />
                      Actualizar
                    </button>
                  </div>
                </Card>
              ))}
            </>
          )}

          {selectedTab === 'historial' && (
            <>
              {syncHistory.map(sync => (
                <Card key={sync.id} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: sync.status === 'success' ? `${colors.success}20` : `${colors.danger}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {sync.status === 'success' ? (
                        <CheckCircle size={20} color={colors.success} />
                      ) : (
                        <XCircle size={20} color={colors.danger} />
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: colors.gray800, marginBottom: 2 }}>
                        {sync.date}
                      </div>
                      <div style={{ fontSize: 12, color: colors.gray600 }}>
                        {sync.items} elementos • {sync.duration}
                      </div>
                      {sync.error && (
                        <div style={{ fontSize: 11, color: colors.danger, marginTop: 4 }}>
                          Error: {sync.error}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </>
          )}
        </div>

        {/* Navegación inferior */}
        <MobileBottomNav 
          active={currentScreen}
          onNavigate={onNavigate}
          notificationCount={notificationCount}
          items={[
            { id: 'home', label: 'Inicio', icon: <MapPin size={20} /> },
            { id: 'clientes', label: 'Clientes', icon: <MapPin size={20} /> },
            { id: 'pedidos', label: 'Pedidos', icon: <ShoppingCart size={20} /> },
            { id: 'inventario', label: 'Inventario', icon: <Package size={20} /> },
            { id: 'notificaciones', label: 'Alertas', icon: <MapPin size={20} /> },
          ]}
        />

        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </MobileFrame>
  );
};
