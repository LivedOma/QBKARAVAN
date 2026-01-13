import React, { useState } from 'react';
import { Package, Box, TrendingUp, RefreshCw, AlertTriangle, Edit, Send, AlertCircle, Plus, RotateCcw } from 'lucide-react';
import { MobileFrame, MobileBottomNav, Card, Button } from '../../shared/MobileComponents.jsx';
import { colors } from '../../shared/colors.js';

const Badge = ({ children, color = 'success' }) => {
  const colorMap = {
    success: { bg: colors.success, text: colors.white },
    warning: { bg: colors.warning, text: colors.white },
    danger: { bg: colors.danger, text: colors.white },
  };
  const c = colorMap[color];
  return (
    <span style={{
      backgroundColor: c.bg,
      color: c.text,
      padding: '3px 10px',
      borderRadius: 12,
      fontSize: 11,
      fontWeight: 600,
    }}>{children}</span>
  );
};

const inventarioData = [
  { id: 1, codigo: 'LAC-001', nombre: 'Leche Entera 1L', stock: 48, lote: 'L2026-01', caducidad: '2026-08-15', stockInicial: 60, ubicacion: 'Estante A1' },
  { id: 2, codigo: 'YOG-015', nombre: 'Yogurt Natural 1kg', stock: 36, lote: 'L2026-02', caducidad: '2026-07-20', stockInicial: 48, ubicacion: 'Estante A2' },
  { id: 3, codigo: 'QUE-008', nombre: 'Queso Panela 400g', stock: 8, lote: 'L2026-03', caducidad: '2026-06-10', stockInicial: 36, ubicacion: 'Estante A3' },
  { id: 4, codigo: 'LAC-003', nombre: 'Leche Light 1L', stock: 30, lote: 'L2026-04', caducidad: '2026-09-05', stockInicial: 36, ubicacion: 'Estante B1' },
  { id: 5, codigo: 'CRE-003', nombre: 'Crema Ácida 500ml', stock: 120, lote: 'L2026-05', caducidad: '2027-01-30', stockInicial: 144, ubicacion: 'Estante B2' },
];

export const Inventario = ({ onBack, onNavigate, currentScreen, notificationCount = 0, navItems }) => {
  const [activeTab, setActiveTab] = useState('inventario');
  const [showMermaModal, setShowMermaModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cantidadMerma, setCantidadMerma] = useState('');
  const [motivoMerma, setMotivoMerma] = useState('');

  const totalActual = inventarioData.reduce((sum, p) => sum + p.stock, 0);
  const totalInicial = inventarioData.reduce((sum, p) => sum + p.stockInicial, 0);
  const porcentajeRestante = ((totalActual / totalInicial) * 100).toFixed(1);

  const productosProximosVencer = inventarioData
    .filter(p => {
      const dias = Math.floor((new Date(p.caducidad) - new Date()) / (1000 * 60 * 60 * 24));
      return dias < 200;
    })
    .map(p => ({
      ...p,
      diasRestantes: Math.floor((new Date(p.caducidad) - new Date()) / (1000 * 60 * 60 * 24))
    }));

  const handleRegistrarMerma = () => {
    if (cantidadMerma && motivoMerma && selectedProduct) {
      alert(`✅ Merma registrada:\n\nProducto: ${selectedProduct.nombre}\nCantidad: ${cantidadMerma} unidades\nMotivo: ${motivoMerma}\n\nEl inventario se ha actualizado.`);
      setShowMermaModal(false);
      setCantidadMerma('');
      setMotivoMerma('');
      setSelectedProduct(null);
    }
  };

  const renderInventarioTab = () => (
    <div style={{ padding: 16, paddingBottom: 80 }}>
      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, textAlign: 'center' }}>
          <div>
            <Package size={24} color={colors.primary} style={{ margin: '0 auto' }} />
            <div style={{ fontSize: 20, fontWeight: 700, marginTop: 4 }}>{totalActual}</div>
            <div style={{ fontSize: 11, color: colors.gray500 }}>Actuales</div>
          </div>
          <div>
            <Box size={24} color={colors.success} style={{ margin: '0 auto' }} />
            <div style={{ fontSize: 20, fontWeight: 700, marginTop: 4 }}>{totalInicial}</div>
            <div style={{ fontSize: 11, color: colors.gray500 }}>Iniciales</div>
          </div>
          <div>
            <TrendingUp size={24} color={colors.accent} style={{ margin: '0 auto' }} />
            <div style={{ fontSize: 20, fontWeight: 700, marginTop: 4 }}>{porcentajeRestante}%</div>
            <div style={{ fontSize: 11, color: colors.gray500 }}>Restante</div>
          </div>
        </div>
      </Card>

      {/* Botón de Registrar Devolución */}
      <Button 
        variant="warning" 
        icon={<RotateCcw size={18} />}
        onClick={() => onNavigate && onNavigate('devolucion')}
        style={{ width: '100%', marginBottom: 16 }}
      >
        Registrar Devolución
      </Button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: colors.gray500 }}>
          PRODUCTOS EN INVENTARIO ({inventarioData.length})
        </div>
        <button style={{ 
          padding: '4px 8px',
          fontSize: 11,
          borderRadius: 6,
          border: `1px solid ${colors.gray300}`,
          backgroundColor: colors.white,
          color: colors.gray600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}>
          <RefreshCw size={14} />
          Actualizar
        </button>
      </div>

      {inventarioData.map(producto => {
        const vendido = producto.stockInicial - producto.stock;
        const stockColor = producto.stock < 10 ? 'danger' : producto.stock < 20 ? 'warning' : 'success';
        
        return (
          <Card key={producto.id} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{producto.nombre}</div>
                <div style={{ fontSize: 11, color: colors.gray500 }}>{producto.codigo} • Lote {producto.lote}</div>
                <div style={{ fontSize: 11, color: colors.gray500, marginTop: 2 }}>📍 {producto.ubicacion}</div>
              </div>
              <Badge color={stockColor}>
                {producto.stock} uds
              </Badge>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              fontSize: 11, 
              color: colors.gray600, 
              marginBottom: 8, 
              paddingTop: 8, 
              borderTop: `1px solid ${colors.gray200}` 
            }}>
              <span>Inicial: {producto.stockInicial}</span>
              <span>Vendido: {vendido}</span>
              <span>Vence: {new Date(producto.caducidad).toLocaleDateString('es-MX', { day: '2-digit', month: 'short' })}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
              <button 
                onClick={() => {
                  setSelectedProduct(producto);
                  setShowMermaModal(true);
                }}
                style={{ 
                  fontSize: 10, 
                  padding: '6px 4px',
                  borderRadius: 6,
                  border: `1px solid ${colors.gray300}`,
                  backgroundColor: colors.white,
                  color: colors.gray700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 3,
                }}
              >
                <AlertTriangle size={12} />
                Merma
              </button>
              <button 
                onClick={() => alert('Función de Ajuste próximamente')}
                style={{ 
                  fontSize: 10, 
                  padding: '6px 4px',
                  borderRadius: 6,
                  border: `1px solid ${colors.gray300}`,
                  backgroundColor: colors.white,
                  color: colors.gray700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 3,
                }}
              >
                <Edit size={12} />
                Ajustar
              </button>
              <button 
                onClick={() => alert('Función de Transferencia próximamente')}
                style={{ 
                  fontSize: 10, 
                  padding: '6px 4px',
                  borderRadius: 6,
                  border: `1px solid ${colors.gray300}`,
                  backgroundColor: colors.white,
                  color: colors.gray700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 3,
                }}
              >
                <Send size={12} />
                Mover
              </button>
            </div>
          </Card>
        );
      })}
    </div>
  );

  const renderAlertasTab = () => (
    <div style={{ padding: 16, paddingBottom: 80 }}>
      <Card style={{ marginBottom: 16, backgroundColor: colors.warning + '15', borderLeft: `4px solid ${colors.warning}` }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <AlertCircle size={20} color={colors.warning} style={{ marginRight: 8 }} />
          <div style={{ fontSize: 14, fontWeight: 600, color: colors.warning }}>Productos Próximos a Vencer</div>
        </div>
        <div style={{ fontSize: 12, color: colors.gray600 }}>
          {productosProximosVencer.length} productos requieren atención
        </div>
      </Card>

      {productosProximosVencer.map(producto => (
        <Card key={producto.id} style={{ 
          marginBottom: 12, 
          borderLeft: `4px solid ${producto.diasRestantes < 180 ? colors.danger : colors.warning}` 
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{producto.nombre}</div>
              <div style={{ fontSize: 11, color: colors.gray500 }}>{producto.codigo}</div>
            </div>
            <Badge color={producto.diasRestantes < 180 ? 'danger' : 'warning'}>
              {producto.diasRestantes} días
            </Badge>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: colors.gray600, marginBottom: 8 }}>
            <span>Stock: {producto.stock} uds</span>
            <span>Vence: {new Date(producto.caducidad).toLocaleDateString('es-MX')}</span>
          </div>

          <div style={{ 
            backgroundColor: producto.diasRestantes < 180 ? colors.danger + '15' : colors.warning + '15', 
            padding: 8, 
            borderRadius: 6,
            fontSize: 11,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}>
            <AlertTriangle size={14} />
            {producto.diasRestantes < 180 ? 'Prioridad ALTA - Vender urgente' : 'Prioridad MEDIA - Planificar venta'}
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <>
      <MobileFrame title="Inventario en Ruta" showBack onBack={onBack} statusBar={true}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Tabs */}
          <div style={{ 
            display: 'flex', 
            borderBottom: `1px solid ${colors.gray200}`,
            backgroundColor: colors.white,
          }}>
            <button
              onClick={() => setActiveTab('inventario')}
              style={{
                flex: 1,
                padding: '12px',
                border: 'none',
                backgroundColor: 'transparent',
                color: activeTab === 'inventario' ? colors.primary : colors.gray500,
                fontWeight: activeTab === 'inventario' ? 600 : 400,
                fontSize: 13,
                cursor: 'pointer',
                borderBottom: activeTab === 'inventario' ? `2px solid ${colors.primary}` : 'none',
              }}
            >
              📦 Inventario
            </button>
            <button
              onClick={() => setActiveTab('alertas')}
              style={{
                flex: 1,
                padding: '12px',
                border: 'none',
                backgroundColor: 'transparent',
                color: activeTab === 'alertas' ? colors.primary : colors.gray500,
                fontWeight: activeTab === 'alertas' ? 600 : 400,
                fontSize: 13,
                cursor: 'pointer',
                borderBottom: activeTab === 'alertas' ? `2px solid ${colors.primary}` : 'none',
                position: 'relative',
              }}
            >
              ⚠️ Alertas
              {productosProximosVencer.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: colors.danger,
                  color: colors.white,
                  borderRadius: 10,
                  padding: '2px 6px',
                  fontSize: 9,
                  fontWeight: 700,
                }}>
                  {productosProximosVencer.length}
                </span>
              )}
            </button>
          </div>

          {/* Content */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {activeTab === 'inventario' && renderInventarioTab()}
            {activeTab === 'alertas' && renderAlertasTab()}
          </div>
        </div>

        {/* Navegación inferior */}
        <MobileBottomNav 
          active={currentScreen}
          onNavigate={onNavigate}
          notificationCount={notificationCount}
          items={navItems || [
            { id: 'home', label: 'Inicio', icon: <Package size={20} /> },
            { id: 'clientes', label: 'Clientes', icon: <Box size={20} /> },
            { id: 'pedido', label: 'Pedido', icon: <TrendingUp size={20} /> },
            { id: 'inventario', label: 'Inventario', icon: <Package size={20} /> },
            { id: 'notificaciones', label: 'Alertas', icon: <AlertCircle size={20} /> },
          ]}
        />
      </MobileFrame>

      {/* Modal de Merma */}
      {showMermaModal && selectedProduct && (
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
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Registrar Merma</h3>
              <button 
                onClick={() => {
                  setShowMermaModal(false);
                  setSelectedProduct(null);
                  setCantidadMerma('');
                  setMotivoMerma('');
                }}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  border: 'none',
                  backgroundColor: colors.gray100,
                  cursor: 'pointer',
                  fontSize: 18,
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{selectedProduct.nombre}</div>
              <div style={{ fontSize: 11, color: colors.gray500 }}>
                {selectedProduct.codigo} • Stock actual: {selectedProduct.stock} uds
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: colors.gray600, marginBottom: 8, display: 'block' }}>
                Cantidad de Merma
              </label>
              <input 
                type="number"
                placeholder="Ej: 5"
                value={cantidadMerma}
                onChange={(e) => setCantidadMerma(e.target.value)}
                max={selectedProduct.stock}
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
                Motivo de la Merma
              </label>
              <select 
                value={motivoMerma}
                onChange={(e) => setMotivoMerma(e.target.value)}
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
                <option value="Producto dañado/roto">Producto dañado/roto</option>
                <option value="Caducidad vencida">Caducidad vencida</option>
                <option value="Producto en mal estado">Producto en mal estado</option>
                <option value="Derrame o fuga">Derrame o fuga</option>
                <option value="Robo o extravío">Robo o extravío</option>
                <option value="Error de carga">Error de carga</option>
                <option value="Otro motivo">Otro motivo</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <Button 
                variant="secondary" 
                onClick={() => {
                  setShowMermaModal(false);
                  setSelectedProduct(null);
                  setCantidadMerma('');
                  setMotivoMerma('');
                }}
                style={{ flex: 1 }}
              >
                Cancelar
              </Button>
              <Button 
                variant="danger" 
                icon={<AlertTriangle size={18} />}
                onClick={handleRegistrarMerma}
                disabled={!cantidadMerma || !motivoMerma}
                style={{ flex: 1 }}
              >
                Registrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
