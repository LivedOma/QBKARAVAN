import React from 'react';
import { 
  Home, Map, Activity, Users, Package, Box, Wallet, 
  RotateCcw, FileText, DollarSign, BarChart3, Lock, 
  Database, Settings, Truck, User, LogOut 
} from 'lucide-react';
import { colors } from '../../shared/colors.js';

const WebSidebar = ({ currentPage, onNavigate, onLogout }) => {
  const modules = [
    { id: 'dashboard', icon: <Home size={20} />, label: 'Dashboard' },
    { id: 'planificacion', icon: <Map size={20} />, label: 'Planificación' },
    { id: 'monitoreo', icon: <Activity size={20} />, label: 'Monitoreo' },
    { id: 'clientes', icon: <Users size={20} />, label: 'Clientes' },
    { id: 'productos', icon: <Package size={20} />, label: 'Productos' },
    { id: 'inventario', icon: <Box size={20} />, label: 'Inventario' },
    { id: 'cobranza', icon: <Wallet size={20} />, label: 'Cobranza' },
    { id: 'devoluciones', icon: <RotateCcw size={20} />, label: 'Devoluciones' },
    { id: 'notas-credito', icon: <FileText size={20} />, label: 'Notas de Crédito' },
    { id: 'liquidacion', icon: <DollarSign size={20} />, label: 'Liquidación' },
    { id: 'reportes', icon: <BarChart3 size={20} />, label: 'Reportes' },
    { id: 'usuarios', icon: <Lock size={20} />, label: 'Usuarios' },
    { id: 'integracion', icon: <Database size={20} />, label: 'Integración' },
    { id: 'configuracion', icon: <Settings size={20} />, label: 'Configuración' },
  ];

  // Obtener información del usuario del localStorage
  const getUserInfo = () => {
    const userStr = localStorage.getItem('karavan_user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        return { nombre: 'Usuario', rol: 'usuario' };
      }
    }
    return { nombre: 'Usuario', rol: 'usuario' };
  };

  const user = getUserInfo();

  return (
    <div style={{
      width: 240,
      backgroundColor: colors.primaryDark,
      color: colors.white,
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
    }}>
      {/* Logo/Brand */}
      <div style={{ padding: 20, borderBottom: `1px solid ${colors.primary}` }}>
        <div style={{ fontSize: 20, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Truck size={24} />
          Karavan
        </div>
        <div style={{ fontSize: 11, opacity: 0.7, marginTop: 4 }}>Sistema de Venta en Ruta</div>
      </div>

      {/* Navigation */}
      <div style={{ flex: 1, overflow: 'auto', padding: '12px 0' }}>
        {modules.map(mod => (
          <button
            key={mod.id}
            onClick={() => onNavigate(mod.id)}
            style={{
              width: '100%',
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              border: 'none',
              background: currentPage === mod.id ? colors.primary : 'transparent',
              color: colors.white,
              cursor: 'pointer',
              fontSize: 14,
              textAlign: 'left',
              opacity: currentPage === mod.id ? 1 : 0.7,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (currentPage !== mod.id) {
                e.target.style.backgroundColor = 'rgba(255,255,255,0.05)';
                e.target.style.opacity = '0.9';
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== mod.id) {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.opacity = '0.7';
              }
            }}
          >
            {mod.icon}
            {mod.label}
          </button>
        ))}
      </div>

      {/* User Info */}
      <div style={{ padding: 16, borderTop: `1px solid ${colors.primary}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ 
            width: 36, 
            height: 36, 
            borderRadius: 18, 
            backgroundColor: colors.primary, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <User size={18} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 500 }}>{user.nombre}</div>
            <div style={{ fontSize: 11, opacity: 0.7, textTransform: 'capitalize' }}>{user.rol}</div>
          </div>
          <button
            onClick={onLogout}
            style={{
              background: 'none',
              border: 'none',
              color: colors.white,
              cursor: 'pointer',
              padding: 8,
              display: 'flex',
              alignItems: 'center',
              opacity: 0.7,
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => e.target.style.opacity = '1'}
            onMouseLeave={(e) => e.target.style.opacity = '0.7'}
            title="Cerrar sesión"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebSidebar;
