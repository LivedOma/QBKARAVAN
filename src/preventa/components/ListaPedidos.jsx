import React, { useState } from 'react';
import { 
  FileText, Plus, Search, Filter, Calendar, DollarSign, 
  Package, CheckCircle, Clock, AlertCircle, ChevronRight, User, MapPin
} from 'lucide-react';
import { MobileFrame, MobileBottomNav, Card } from '../../shared/MobileComponents.jsx';
import { colors } from '../../shared/colors.js';

const Badge = ({ children, variant = 'success' }) => {
  const variants = {
    success: { bg: colors.success, color: colors.white },
    warning: { bg: colors.warning, color: colors.white },
    danger: { bg: colors.danger, color: colors.white },
    primary: { bg: colors.primary, color: colors.white },
  };
  const v = variants[variant];
  return (
    <span style={{
      backgroundColor: v.bg,
      color: v.color,
      padding: '4px 10px',
      borderRadius: 12,
      fontSize: 11,
      fontWeight: 600,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
    }}>
      {children}
    </span>
  );
};

const pedidosData = [
  {
    id: 'PED-2026-0158',
    cliente: 'Abarrotes Don José',
    fecha: '07/01/2026',
    hora: '09:45',
    productos: 12,
    total: 2450.00,
    estado: 'confirmado',
    items: ['Leche entera 1L (×24)', 'Yogurt natural (×12)', 'Queso panela (×8)']
  },
  {
    id: 'PED-2026-0159',
    cliente: 'Mini Super El Sol',
    fecha: '07/01/2026',
    hora: '10:30',
    productos: 8,
    total: 1890.50,
    estado: 'confirmado',
    items: ['Crema 1L (×15)', 'Yogurt fresa (×10)', 'Leche deslactosada (×12)']
  },
  {
    id: 'PED-2026-0160',
    cliente: 'Tienda La Esquina',
    fecha: '07/01/2026',
    hora: '11:15',
    productos: 15,
    total: 3200.00,
    estado: 'pendiente',
    items: ['Leche entera 1L (×30)', 'Queso Oaxaca (×10)', 'Crema ácida (×8)']
  },
  {
    id: 'PED-2026-0157',
    cliente: 'Comercial Pérez',
    fecha: '06/01/2026',
    hora: '16:20',
    productos: 20,
    total: 4100.00,
    estado: 'confirmado',
    items: ['Yogurt natural (×20)', 'Leche entera (×40)', 'Queso manchego (×12)']
  },
];

export const ListaPedidos = ({ onVerDetalle, onNavigate, currentScreen, notificationCount = 0 }) => {
  const [filtro, setFiltro] = useState('todos'); // todos, hoy, ayer
  const [busqueda, setBusqueda] = useState('');

  // Estadísticas del día
  const pedidosHoy = pedidosData.filter(p => p.fecha === '07/01/2026');
  const totalHoy = pedidosHoy.reduce((sum, p) => sum + p.total, 0);
  const productosHoy = pedidosHoy.reduce((sum, p) => sum + p.productos, 0);

  // Filtrar pedidos
  let pedidosFiltrados = pedidosData;
  if (filtro === 'hoy') {
    pedidosFiltrados = pedidosData.filter(p => p.fecha === '07/01/2026');
  } else if (filtro === 'ayer') {
    pedidosFiltrados = pedidosData.filter(p => p.fecha === '06/01/2026');
  }

  // Buscar
  if (busqueda) {
    const q = busqueda.toLowerCase();
    pedidosFiltrados = pedidosFiltrados.filter(p => 
      p.id.toLowerCase().includes(q) || 
      p.cliente.toLowerCase().includes(q)
    );
  }

  const getEstadoIcon = (estado) => {
    switch(estado) {
      case 'confirmado': return <CheckCircle size={16} color={colors.success} />;
      case 'pendiente': return <Clock size={16} color={colors.warning} />;
      case 'cancelado': return <AlertCircle size={16} color={colors.danger} />;
      default: return null;
    }
  };

  const getEstadoBadge = (estado) => {
    switch(estado) {
      case 'confirmado': return <Badge variant="success">{getEstadoIcon(estado)} Confirmado</Badge>;
      case 'pendiente': return <Badge variant="warning">{getEstadoIcon(estado)} Pendiente</Badge>;
      case 'cancelado': return <Badge variant="danger">{getEstadoIcon(estado)} Cancelado</Badge>;
      default: return null;
    }
  };

  return (
    <MobileFrame title="Mis Pedidos" statusBar={true}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
        paddingBottom: 64 
      }}>
        {/* Header con resumen */}
        <div style={{ 
          padding: 16, 
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
          color: 'white'
        }}>
          <div style={{ fontSize: 14, opacity: 0.9, marginBottom: 8 }}>
            Pedidos de Hoy
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700 }}>{pedidosHoy.length}</div>
              <div style={{ fontSize: 11, opacity: 0.8 }}>Pedidos</div>
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700 }}>{productosHoy}</div>
              <div style={{ fontSize: 11, opacity: 0.8 }}>Productos</div>
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>${totalHoy.toFixed(0)}</div>
              <div style={{ fontSize: 11, opacity: 0.8 }}>Total</div>
            </div>
          </div>
        </div>

        {/* Barra de búsqueda */}
        <div style={{ padding: '0 16px 12px' }}>
          <div style={{ position: 'relative' }}>
            <Search 
              size={16} 
              color={colors.gray400}
              style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="Buscar por folio o cliente..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 12px 12px 40px',
                border: `1px solid ${colors.gray300}`,
                borderRadius: 8,
                fontSize: 14,
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Filtros */}
        <div style={{ 
          padding: '0 16px 12px',
          display: 'flex',
          gap: 8,
          overflowX: 'auto'
        }}>
          {[
            { id: 'todos', label: 'Todos', count: pedidosData.length },
            { id: 'hoy', label: 'Hoy', count: pedidosHoy.length },
            { id: 'ayer', label: 'Ayer', count: pedidosData.filter(p => p.fecha === '06/01/2026').length },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFiltro(f.id)}
              style={{
                padding: '8px 16px',
                borderRadius: 20,
                border: 'none',
                backgroundColor: filtro === f.id ? colors.primary : colors.gray100,
                color: filtro === f.id ? 'white' : colors.text,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {f.label} ({f.count})
            </button>
          ))}
        </div>

        {/* Lista de pedidos */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto',
          padding: '0 16px 16px',
          backgroundColor: colors.gray50
        }}>
          {pedidosFiltrados.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: 60,
              color: colors.gray400
            }}>
              <FileText size={48} style={{ marginBottom: 16, opacity: 0.5 }} />
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                No hay pedidos
              </div>
              <div style={{ fontSize: 13 }}>
                {busqueda ? 'No se encontraron resultados' : 'Comienza creando un nuevo pedido'}
              </div>
            </div>
          ) : (
            pedidosFiltrados.map((pedido) => (
              <Card 
                key={pedido.id}
                onClick={() => onVerDetalle && onVerDetalle(pedido)}
                style={{ 
                  marginBottom: 12,
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  ':hover': { 
                    transform: 'scale(1.02)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }
                }}
              >
                {/* Header del pedido */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 12
                }}>
                  <div>
                    <div style={{ 
                      fontSize: 15, 
                      fontWeight: 700, 
                      color: colors.primary,
                      marginBottom: 4
                    }}>
                      {pedido.id}
                    </div>
                    <div style={{ fontSize: 13, color: colors.gray600 }}>
                      {pedido.fecha} • {pedido.hora}
                    </div>
                  </div>
                  {getEstadoBadge(pedido.estado)}
                </div>

                {/* Cliente */}
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 12,
                  paddingBottom: 12,
                  borderBottom: `1px solid ${colors.gray200}`
                }}>
                  <User size={16} color={colors.gray400} />
                  <span style={{ fontSize: 14, fontWeight: 600, color: colors.gray800 }}>
                    {pedido.cliente}
                  </span>
                </div>

                {/* Productos preview */}
                <div style={{ marginBottom: 12 }}>
                  <div style={{ 
                    fontSize: 12, 
                    color: colors.gray500,
                    marginBottom: 6,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}>
                    <Package size={14} />
                    {pedido.productos} productos
                  </div>
                  <div style={{ fontSize: 12, color: colors.gray600 }}>
                    {pedido.items.slice(0, 2).join(', ')}
                    {pedido.items.length > 2 && '...'}
                  </div>
                </div>

                {/* Total y acción */}
                <div style={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontSize: 11, color: colors.gray500 }}>Total</div>
                    <div style={{ 
                      fontSize: 20, 
                      fontWeight: 700, 
                      color: colors.primary
                    }}>
                      ${pedido.total.toFixed(2)}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onVerDetalle && onVerDetalle(pedido);
                    }}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 8,
                      border: `1px solid ${colors.primary}`,
                      backgroundColor: 'white',
                      color: colors.primary,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4
                    }}
                  >
                    Ver detalle
                    <ChevronRight size={16} />
                  </button>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Navegación inferior */}
        <MobileBottomNav 
          active={currentScreen}
          onNavigate={onNavigate}
          notificationCount={notificationCount}
          items={[
            { id: 'home', label: 'Inicio', icon: <MapPin size={20} /> },
            { id: 'clientes', label: 'Clientes', icon: <User size={20} /> },
            { id: 'pedidos', label: 'Pedidos', icon: <FileText size={20} /> },
            { id: 'inventario', label: 'Inventario', icon: <Package size={20} /> },
            { id: 'notificaciones', label: 'Alertas', icon: <AlertCircle size={20} /> },
          ]}
        />
      </div>
    </MobileFrame>
  );
};
