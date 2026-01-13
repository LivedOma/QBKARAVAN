import React from 'react';
import { DollarSign, Package, Users, AlertTriangle, MapPin, Clock, TrendingUp, XCircle, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { colors } from '../../shared/colors.js';
import { Card, Badge, ProgressBar } from '../../shared/SharedComponents.jsx';
import WebHeader from './WebHeader.jsx';
import StatCard from './StatCard.jsx';

const Dashboard = () => {
  // Stats data
  const stats = [
    {
      icon: <DollarSign size={24} />,
      label: 'Ventas del Día',
      value: '$45,280',
      trend: 12,
      color: colors.success
    },
    {
      icon: <Package size={24} />,
      label: 'Entregas Completadas',
      value: '247',
      trend: 8,
      color: colors.primary
    },
    {
      icon: <Users size={24} />,
      label: 'Clientes Visitados',
      value: '189',
      trend: -3,
      color: colors.info
    },
    {
      icon: <AlertTriangle size={24} />,
      label: 'Devoluciones',
      value: '12',
      trend: -15,
      color: colors.warning
    }
  ];

  // Routes in progress
  const routesInProgress = [
    {
      id: 'R-001',
      driver: 'Carlos Mendoza',
      progress: 75,
      delivered: 45,
      total: 60,
      status: 'En Ruta',
      delay: 0,
      statusColor: colors.success
    },
    {
      id: 'R-002',
      driver: 'Ana García',
      progress: 60,
      delivered: 36,
      total: 60,
      status: 'En Ruta',
      delay: 0,
      statusColor: colors.success
    },
    {
      id: 'R-003',
      driver: 'Luis Ramírez',
      progress: 40,
      delivered: 20,
      total: 50,
      status: 'Atrasado',
      delay: 25,
      statusColor: colors.warning
    },
    {
      id: 'R-004',
      driver: 'María Torres',
      progress: 85,
      delivered: 51,
      total: 60,
      status: 'En Ruta',
      delay: 0,
      statusColor: colors.success
    }
  ];

  // System alerts
  const alerts = [
    {
      id: 1,
      type: 'danger',
      icon: <XCircle size={18} />,
      title: 'Ruta R-008 Cancelada',
      message: 'El vehículo V-104 presenta falla mecánica. Ruta reasignada a V-109.',
      time: 'Hace 5 min',
      action: 'Ver Detalles'
    },
    {
      id: 2,
      type: 'warning',
      icon: <AlertCircle size={18} />,
      title: 'Inventario Bajo',
      message: 'El producto P-245 (Coca-Cola 2L) tiene solo 45 unidades disponibles.',
      time: 'Hace 15 min',
      action: 'Reponer Stock'
    },
    {
      id: 3,
      type: 'info',
      icon: <Info size={18} />,
      title: 'Nuevo Cliente Registrado',
      message: 'Bodega "El Ahorro" ha sido agregado a la zona Norte.',
      time: 'Hace 32 min',
      action: 'Ver Cliente'
    },
    {
      id: 4,
      type: 'success',
      icon: <CheckCircle size={18} />,
      title: 'Liquidación Aprobada',
      message: 'Ruta R-005 liquidada correctamente. Monto: $12,450.',
      time: 'Hace 1 hora',
      action: 'Ver Reporte'
    },
    {
      id: 5,
      type: 'warning',
      icon: <Clock size={18} />,
      title: 'Cobranza Pendiente',
      message: '8 clientes tienen facturas vencidas por más de 15 días.',
      time: 'Hace 2 horas',
      action: 'Gestionar'
    },
    {
      id: 6,
      type: 'info',
      icon: <Package size={18} />,
      title: 'Devolución Procesada',
      message: 'Cliente C-189 devolvió 24 unidades de producto P-112.',
      time: 'Hace 3 horas',
      action: 'Ver Nota de Crédito'
    },
    {
      id: 7,
      type: 'success',
      icon: <TrendingUp size={18} />,
      title: 'Meta Mensual Alcanzada',
      message: 'Zona Centro superó la meta de ventas en un 12%.',
      time: 'Hace 4 horas',
      action: 'Ver Estadísticas'
    }
  ];

  const getAlertColor = (type) => {
    const colorMap = {
      danger: colors.danger,
      warning: colors.warning,
      info: colors.info,
      success: colors.success
    };
    return colorMap[type] || colors.gray500;
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: colors.gray50,
      padding: 24
    }}>
      <WebHeader 
        title="Dashboard"
        subtitle="Resumen general del sistema"
      />

      {/* Stats Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 20,
        marginBottom: 24
      }}>
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Routes in Progress */}
      <Card style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: colors.gray800, margin: 0 }}>
            Rutas en Progreso
          </h3>
          <p style={{ fontSize: 14, color: colors.gray500, margin: '4px 0 0 0' }}>
            Seguimiento en tiempo real de entregas
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {routesInProgress.map((route) => (
            <div key={route.id} style={{
              padding: 16,
              backgroundColor: colors.gray50,
              borderRadius: 8,
              border: `1px solid ${colors.gray200}`
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: 12
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    backgroundColor: colors.primary,
                    color: colors.white,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 14
                  }}>
                    {route.id.split('-')[1]}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray800 }}>
                      {route.driver}
                    </div>
                    <div style={{ fontSize: 12, color: colors.gray500, marginTop: 2 }}>
                      {route.delivered} de {route.total} entregas
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {route.delay > 0 && (
                    <Badge color="warning">
                      <Clock size={12} style={{ marginRight: 4 }} />
                      +{route.delay} min
                    </Badge>
                  )}
                  <Badge color={route.status === 'En Ruta' ? 'success' : 'warning'}>
                    <MapPin size={12} style={{ marginRight: 4 }} />
                    {route.status}
                  </Badge>
                </div>
              </div>
              <ProgressBar progress={route.progress} />
            </div>
          ))}
        </div>
      </Card>

      {/* System Alerts */}
      <Card>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: colors.gray800, margin: 0 }}>
            Alertas del Sistema
          </h3>
          <p style={{ fontSize: 14, color: colors.gray500, margin: '4px 0 0 0' }}>
            Notificaciones y eventos importantes
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {alerts.map((alert) => (
            <div key={alert.id} style={{
              padding: 16,
              backgroundColor: colors.gray50,
              borderRadius: 8,
              borderLeft: `4px solid ${getAlertColor(alert.type)}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}>
              <div style={{ display: 'flex', gap: 12, flex: 1 }}>
                <div style={{ color: getAlertColor(alert.type), paddingTop: 2 }}>
                  {alert.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray800, marginBottom: 4 }}>
                    {alert.title}
                  </div>
                  <div style={{ fontSize: 13, color: colors.gray600, marginBottom: 8 }}>
                    {alert.message}
                  </div>
                  <div style={{ fontSize: 12, color: colors.gray400 }}>
                    {alert.time}
                  </div>
                </div>
              </div>
              <button style={{
                padding: '6px 12px',
                backgroundColor: colors.white,
                border: `1px solid ${colors.gray300}`,
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 500,
                color: colors.gray700,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}>
                {alert.action}
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
