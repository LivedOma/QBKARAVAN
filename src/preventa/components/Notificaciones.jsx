import React, { useState, useEffect } from 'react';
import { 
  Bell, MapPin, ShoppingCart, Package, MessageCircle, 
  Search, X, CheckCircle, Clock, Settings, AlertTriangle,
  Home, FileText
} from 'lucide-react';
import { MobileFrame, MobileBottomNav } from '../../shared/MobileComponents.jsx';
import { colors } from '../../shared/colors.js';
import NotificationService from '../../shared/NotificationService.js';

// Hook personalizado para usar notificaciones en componentes
const useNotifications = () => {
  const [notifications, setNotifications] = useState(NotificationService.notifications);
  const [unreadCount, setUnreadCount] = useState(NotificationService.unreadCount);

  useEffect(() => {
    const unsubscribe = NotificationService.subscribe((notifs, count) => {
      setNotifications([...notifs]);
      setUnreadCount(count);
    });
    return unsubscribe;
  }, []);

  return {
    notifications,
    unreadCount,
    addNotification: (notif) => NotificationService.addNotification(notif),
    markAsRead: (id) => NotificationService.markAsRead(id),
    markAllAsRead: () => NotificationService.markAllAsRead(),
    removeNotification: (id) => NotificationService.removeNotification(id),
    getByType: (tipo) => NotificationService.getByType(tipo),
    stats: NotificationService.getStats()
  };
};

export const Notificaciones = ({ onBack, onNavigate, currentScreen }) => {
  const [filtroActivo, setFiltroActivo] = useState('todas');
  const [busqueda, setBusqueda] = useState('');
  const [mostrarBusqueda, setMostrarBusqueda] = useState(false);
  
  // Integración con NotificationService
  const { 
    notifications: notificacionesService, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    removeNotification 
  } = useNotifications();

  // Función para calcular tiempo relativo
  function getTimeAgo(timestamp) {
    const now = new Date();
    const then = new Date(timestamp);
    const diffMs = now - then;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Ahora';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
    if (diffDays === 1) return 'Ayer';
    return `Hace ${diffDays} días`;
  }

  // Convertir notificaciones del servicio a formato con iconos
  let notificaciones = notificacionesService.map(n => ({
    ...n,
    icono: n.tipo === 'ruta' ? <MapPin size={20} /> :
           n.tipo === 'pedido' ? <ShoppingCart size={20} /> :
           n.tipo === 'producto' ? <AlertTriangle size={20} /> :
           <MessageCircle size={20} />,
    timestampRelativo: getTimeAgo(n.timestamp),
    accion: { 
      label: n.tipo === 'ruta' ? 'Ver Ruta' : 
              n.tipo === 'pedido' ? 'Ver Pedido' : 
              n.tipo === 'producto' ? 'Ver Inventario' : 
              'Ver Mensaje',
      destino: n.tipo 
    }
  }));
  
  // Aplicar búsqueda si está activa
  if (busqueda.trim() !== '') {
    const q = busqueda.toLowerCase();
    notificaciones = notificaciones.filter(n => 
      n.titulo.toLowerCase().includes(q) || 
      n.mensaje.toLowerCase().includes(q)
    );
  }

  const marcarComoLeida = (id) => {
    markAsRead(id);
  };

  const marcarTodasLeidas = () => {
    markAllAsRead();
  };

  const eliminarNotificacion = (id) => {
    if (confirm('¿Eliminar esta notificación?')) {
      removeNotification(id);
    }
  };

  const notificacionesFiltradas = filtroActivo === 'todas' 
    ? notificaciones 
    : notificaciones.filter(n => n.tipo === filtroActivo.slice(0, -1)); // Quita 's' final

  const contadores = {
    total: notificaciones.length,
    noLeidas: notificaciones.filter(n => !n.leida).length,
    rutas: notificaciones.filter(n => n.tipo === 'ruta').length,
    pedidos: notificaciones.filter(n => n.tipo === 'pedido').length,
    productos: notificaciones.filter(n => n.tipo === 'producto').length,
    mensajes: notificaciones.filter(n => n.tipo === 'mensaje').length,
  };

  const getColorPrioridad = (prioridad) => {
    switch(prioridad) {
      case 'urgente': return colors.danger;
      case 'alta': return colors.warning;
      case 'media': return colors.accent;
      case 'baja': return colors.gray400;
      default: return colors.gray400;
    }
  };

  const getColorTipo = (tipo) => {
    switch(tipo) {
      case 'ruta': return colors.primary;
      case 'pedido': return colors.success;
      case 'producto': return colors.warning;
      case 'mensaje': return colors.accent;
      default: return colors.gray500;
    }
  };

  return (
    <MobileFrame title="Notificaciones" onBack={onBack}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header con contador y acciones */}
        <div style={{ 
          padding: 16, 
          backgroundColor: 'white',
          borderBottom: `1px solid ${colors.gray200}`,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: colors.text }}>
                {contadores.total} Notificaciones
              </div>
              {contadores.noLeidas > 0 && (
                <div style={{ fontSize: 13, color: colors.warning, marginTop: 2 }}>
                  {contadores.noLeidas} sin leer
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setMostrarBusqueda(!mostrarBusqueda)}
                style={{
                  padding: '8px',
                  borderRadius: 6,
                  border: `1px solid ${mostrarBusqueda ? colors.primary : colors.gray300}`,
                  backgroundColor: mostrarBusqueda ? colors.primary + '10' : 'white',
                  color: mostrarBusqueda ? colors.primary : colors.gray600,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Search size={16} />
              </button>
              {contadores.noLeidas > 0 && (
                <button
                  onClick={marcarTodasLeidas}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 6,
                    border: `1px solid ${colors.primary}`,
                    backgroundColor: 'white',
                    color: colors.primary,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}
                >
                  <CheckCircle size={14} />
                  Marcar leídas
                </button>
              )}
            </div>
          </div>

          {/* Barra de búsqueda (condicional) */}
          {mostrarBusqueda && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ 
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Search 
                  size={16} 
                  color={colors.gray400}
                  style={{ 
                    position: 'absolute', 
                    left: 12 
                  }} 
                />
                <input
                  type="text"
                  placeholder="Buscar notificaciones..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 36px',
                    border: `1px solid ${colors.gray300}`,
                    borderRadius: 8,
                    fontSize: 14,
                    outline: 'none',
                  }}
                />
                {busqueda && (
                  <button
                    onClick={() => setBusqueda('')}
                    style={{
                      position: 'absolute',
                      right: 8,
                      padding: 4,
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      color: colors.gray400
                    }}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              {busqueda && (
                <div style={{ 
                  fontSize: 11, 
                  color: colors.gray500, 
                  marginTop: 6,
                  paddingLeft: 4
                }}>
                  {notificaciones.length} resultado{notificaciones.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          )}

          {/* Filtros por tipo */}
          <div style={{ 
            display: 'flex', 
            gap: 8, 
            overflowX: 'auto',
            paddingBottom: 4,
            WebkitOverflowScrolling: 'touch'
          }}>
            {[
              { id: 'todas', label: 'Todas', icon: <Bell size={14} />, count: contadores.total },
              { id: 'rutas', label: 'Rutas', icon: <MapPin size={14} />, count: contadores.rutas },
              { id: 'pedidos', label: 'Pedidos', icon: <ShoppingCart size={14} />, count: contadores.pedidos },
              { id: 'productos', label: 'Productos', icon: <Package size={14} />, count: contadores.productos },
              { id: 'mensajes', label: 'Mensajes', icon: <MessageCircle size={14} />, count: contadores.mensajes },
            ].map(filtro => (
              <button
                key={filtro.id}
                onClick={() => setFiltroActivo(filtro.id)}
                style={{
                  padding: '8px 14px',
                  borderRadius: 20,
                  border: 'none',
                  backgroundColor: filtroActivo === filtro.id ? colors.primary : colors.gray100,
                  color: filtroActivo === filtro.id ? 'white' : colors.text,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s'
                }}
              >
                {filtro.icon}
                {filtro.label}
                {filtro.count > 0 && (
                  <span style={{
                    padding: '2px 6px',
                    borderRadius: 10,
                    backgroundColor: filtroActivo === filtro.id ? 'rgba(255,255,255,0.3)' : colors.gray300,
                    fontSize: 11,
                    fontWeight: 700
                  }}>
                    {filtro.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de notificaciones */}
        <div style={{ flex: 1, overflowY: 'auto', backgroundColor: colors.gray50 }}>
          {notificacionesFiltradas.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: 60,
              color: colors.gray400
            }}>
              <Bell size={48} style={{ marginBottom: 16, opacity: 0.5 }} />
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                No hay notificaciones
              </div>
              <div style={{ fontSize: 13 }}>
                {filtroActivo === 'todas' 
                  ? 'Estás al día con todas tus notificaciones'
                  : `No tienes notificaciones de ${filtroActivo}`
                }
              </div>
            </div>
          ) : (
            notificacionesFiltradas.map((notif) => (
              <div 
                key={notif.id}
                onClick={() => marcarComoLeida(notif.id)}
                style={{
                  padding: 16,
                  backgroundColor: notif.leida ? 'white' : colors.primary + '08',
                  borderBottom: `1px solid ${colors.gray200}`,
                  borderLeft: `4px solid ${notif.leida ? 'transparent' : getColorPrioridad(notif.prioridad)}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', gap: 12 }}>
                  {/* Icono */}
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: getColorTipo(notif.tipo) + '20',
                    color: getColorTipo(notif.tipo),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {notif.icono}
                  </div>

                  {/* Contenido */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: 4
                    }}>
                      <div style={{ 
                        fontSize: 14, 
                        fontWeight: notif.leida ? 500 : 700,
                        color: colors.text,
                        flex: 1
                      }}>
                        {notif.titulo}
                      </div>
                      {!notif.leida && (
                        <div style={{
                          width: 8,
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: colors.primary,
                          marginLeft: 8,
                          marginTop: 4,
                          flexShrink: 0
                        }} />
                      )}
                    </div>

                    <div style={{ 
                      fontSize: 13, 
                      color: colors.gray600,
                      marginBottom: 8,
                      lineHeight: 1.4
                    }}>
                      {notif.mensaje}
                    </div>

                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 8
                    }}>
                      <div style={{ 
                        fontSize: 11, 
                        color: colors.gray400,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4
                      }}>
                        <Clock size={11} />
                        {notif.timestampRelativo}
                      </div>

                      {notif.accion && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            marcarComoLeida(notif.id);
                            alert(`Redirigiendo a: ${notif.accion.label}`);
                          }}
                          style={{
                            padding: '4px 10px',
                            borderRadius: 4,
                            border: `1px solid ${getColorTipo(notif.tipo)}`,
                            backgroundColor: 'white',
                            color: getColorTipo(notif.tipo),
                            fontSize: 11,
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          {notif.accion.label}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Botón eliminar */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      eliminarNotificacion(notif.id);
                    }}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 14,
                      border: 'none',
                      backgroundColor: colors.gray100,
                      color: colors.gray500,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      alignSelf: 'flex-start'
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer con navegación */}
        <MobileBottomNav 
          active={currentScreen} 
          onNavigate={onNavigate}
          notificationCount={unreadCount}
          items={[
            { id: 'home', label: 'Inicio', icon: <Home size={20} /> },
            { id: 'clientes', label: 'Clientes', icon: <MapPin size={20} /> },
            { id: 'pedidos', label: 'Pedidos', icon: <FileText size={20} /> },
            { id: 'inventario', label: 'Inventario', icon: <Package size={20} /> },
            { id: 'notificaciones', label: 'Alertas', icon: <Bell size={20} /> },
          ]}
        />
      </div>
    </MobileFrame>
  );
};
