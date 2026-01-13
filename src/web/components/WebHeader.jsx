import React, { useState } from 'react';
import { Bell, X, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { colors } from '../../shared/colors.js';

const WebHeader = ({ title, subtitle, actions }) => {
  const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);

  console.log('WebHeader renderizado, mostrarNotificaciones:', mostrarNotificaciones);

  const notificaciones = [
    {
      id: 1,
      tipo: 'success',
      icono: CheckCircle,
      titulo: 'Ruta Completada',
      mensaje: 'Carlos Mendoza completó la ruta R-001',
      tiempo: 'Hace 5 min',
      leido: false
    },
    {
      id: 2,
      tipo: 'warning',
      icono: AlertTriangle,
      titulo: 'Inventario Bajo',
      mensaje: 'Producto PRO-045 por debajo del stock mínimo',
      tiempo: 'Hace 15 min',
      leido: false
    },
    {
      id: 3,
      tipo: 'info',
      icono: Info,
      titulo: 'Nuevo Cliente',
      mensaje: 'Cliente "Abarrotes El Sol" registrado',
      tiempo: 'Hace 1 hora',
      leido: false
    }
  ];

  const notificacionesNoLeidas = notificaciones.filter(n => !n.leido).length;

  const getColorTipo = (tipo) => {
    switch(tipo) {
      case 'success': return colors.success;
      case 'warning': return colors.warning;
      case 'danger': return colors.danger;
      case 'info': return colors.info;
      default: return colors.gray500;
    }
  };

  return (
    <>
      <div style={{
        padding: '16px 24px',
        backgroundColor: colors.white,
        borderBottom: `1px solid ${colors.gray200}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: colors.gray800, margin: 0 }}>{title}</h1>
          {subtitle && <p style={{ fontSize: 14, color: colors.gray500, margin: '4px 0 0' }}>{subtitle}</p>}
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {actions}
          <button 
            onClick={() => {
              console.log('Botón clickeado, estado actual:', mostrarNotificaciones);
              setMostrarNotificaciones(!mostrarNotificaciones);
            }}
            style={{ 
              position: 'relative', 
              cursor: 'pointer',
              border: 'none',
              backgroundColor: 'transparent',
              padding: 8,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.gray100}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Bell size={20} color={colors.gray600} />
            {notificacionesNoLeidas > 0 && (
              <div style={{ 
                position: 'absolute', 
                top: 4, 
                right: 4, 
                width: 16, 
                height: 16, 
                borderRadius: 8, 
                backgroundColor: colors.danger, 
                color: colors.white, 
                fontSize: 10, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontWeight: 600
              }}>
                {notificacionesNoLeidas}
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Panel de Notificaciones */}
      {mostrarNotificaciones && (
        <>
          {/* Overlay */}
          <div 
            onClick={() => setMostrarNotificaciones(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              zIndex: 999
            }}
          />

          {/* Panel */}
          <div style={{
            position: 'fixed',
            top: 70,
            right: 24,
            width: 400,
            maxHeight: 500,
            backgroundColor: colors.white,
            borderRadius: 12,
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
            zIndex: 1000,
            overflow: 'hidden'
          }}>
            {/* Header del Panel */}
            <div style={{
              padding: 16,
              borderBottom: `1px solid ${colors.gray200}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>
                Notificaciones
              </h3>
              <button
                onClick={() => setMostrarNotificaciones(false)}
                style={{
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  padding: 4,
                  display: 'flex',
                  alignItems: 'center',
                  color: colors.gray400
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Lista de Notificaciones */}
            <div style={{ 
              maxHeight: 400, 
              overflowY: 'auto' 
            }}>
              {notificaciones.map(notif => {
                const IconoNotif = notif.icono;
                return (
                  <div 
                    key={notif.id}
                    style={{
                      padding: 16,
                      borderBottom: `1px solid ${colors.gray100}`,
                      cursor: 'pointer',
                      backgroundColor: notif.leido ? colors.white : colors.gray50,
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.gray100}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = notif.leido ? colors.white : colors.gray50}
                  >
                    <div style={{ display: 'flex', gap: 12 }}>
                      <div style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        backgroundColor: getColorTipo(notif.tipo) + '20',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <IconoNotif size={18} color={getColorTipo(notif.tipo)} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ 
                          fontSize: 14, 
                          fontWeight: 600, 
                          color: colors.gray800,
                          marginBottom: 4
                        }}>
                          {notif.titulo}
                        </div>
                        <div style={{ 
                          fontSize: 13, 
                          color: colors.gray600,
                          marginBottom: 4
                        }}>
                          {notif.mensaje}
                        </div>
                        <div style={{ 
                          fontSize: 11, 
                          color: colors.gray400
                        }}>
                          {notif.tiempo}
                        </div>
                      </div>
                      {!notif.leido && (
                        <div style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: colors.primary,
                          flexShrink: 0,
                          marginTop: 4
                        }} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer del Panel */}
            <div style={{
              padding: 12,
              borderTop: `1px solid ${colors.gray200}`,
              textAlign: 'center'
            }}>
              <button style={{
                border: 'none',
                backgroundColor: 'transparent',
                color: colors.primary,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                padding: '4px 8px'
              }}>
                Ver todas las notificaciones
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default WebHeader;
