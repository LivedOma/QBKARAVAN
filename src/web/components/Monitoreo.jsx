import React, { useState } from 'react';
import { Map, Users, Truck, ClipboardCheck, Bell, RefreshCw, Clock, Navigation, Package, MessageCircle, Phone, AlertTriangle, CheckCircle, X, WifiOff } from 'lucide-react';
import { colors } from '../../shared/colors.js';
import { Card, Badge, Button, ProgressBar } from '../../shared/SharedComponents.jsx';
import WebHeader from './WebHeader.jsx';
import MapaMonitoreo from './MapaMonitoreo.jsx';

const Monitoreo = () => {
  const [filtroRol, setFiltroRol] = useState('todos'); // 'todos', 'preventistas', 'repartidores'
  const [showAlertas, setShowAlertas] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showChat, setShowChat] = useState(false);

  // Datos de equipo en campo con rol especificado
  const equipoEnCampo = [
    { 
      id: 1,
      name: 'Juan Pérez', 
      role: 'repartidor',
      route: 'Ruta Norte-01', 
      status: 'delivering', 
      progress: 75, 
      eta: '14:30',
      speed: 45,
      lastUpdate: '30 seg',
      entregas: { completadas: 6, pendientes: 2 },
      vehiculo: 'Camioneta VAN-001',
      ubicacion: { lat: 19.4426, lng: -99.1332 } // Zona norte CDMX
    },
    { 
      id: 2,
      name: 'María López', 
      role: 'preventista',
      route: 'Zona Centro-03', 
      status: 'visiting', 
      progress: 45, 
      eta: '15:00',
      speed: 0,
      lastUpdate: '1 min',
      visitas: { completadas: 8, pendientes: 10 },
      pedidosTomados: 5,
      ubicacion: { lat: 19.4326, lng: -99.1332 } // Centro CDMX
    },
    { 
      id: 3,
      name: 'Carlos Ruiz', 
      role: 'repartidor',
      route: 'Ruta Sur-02', 
      status: 'delayed', 
      progress: 60, 
      eta: '16:15',
      speed: 25,
      lastUpdate: '45 seg',
      entregas: { completadas: 4, pendientes: 3 },
      vehiculo: 'Camioneta VAN-002',
      alertas: ['Retraso de 25 min'],
      ubicacion: { lat: 19.3526, lng: -99.1432 } // Zona sur CDMX
    },
    { 
      id: 4,
      name: 'Ana García', 
      role: 'preventista',
      route: 'Zona Oriente-01', 
      status: 'delivering', 
      progress: 30, 
      eta: '15:45',
      speed: 35,
      lastUpdate: '20 seg',
      visitas: { completadas: 5, pendientes: 12 },
      pedidosTomados: 3,
      ubicacion: { lat: 19.4226, lng: -99.0932 } // Zona oriente CDMX
    },
    { 
      id: 5,
      name: 'Roberto Silva', 
      role: 'repartidor',
      route: 'Ruta Poniente-04', 
      status: 'route_deviation', 
      progress: 55, 
      eta: '14:50',
      speed: 40,
      lastUpdate: '15 seg',
      entregas: { completadas: 5, pendientes: 4 },
      vehiculo: 'Camioneta VAN-003',
      alertas: ['Desviación de ruta detectada', 'Fuera de zona programada'],
      ubicacion: { lat: 19.4126, lng: -99.1732 } // Zona poniente CDMX
    },
    { 
      id: 6,
      name: 'Laura Mendoza', 
      role: 'preventista',
      route: 'Zona Centro-02', 
      status: 'visiting', 
      progress: 68, 
      eta: '14:20',
      speed: 0,
      lastUpdate: '2 min',
      visitas: { completadas: 12, pendientes: 6 },
      pedidosTomados: 8,
      ubicacion: { lat: 19.4360, lng: -99.1414 } // Centro-Norte CDMX
    }
  ];

  // Filtrar equipo según rol seleccionado
  const equipoFiltrado = equipoEnCampo.filter(user => {
    if (filtroRol === 'todos') return true;
    if (filtroRol === 'preventistas') return user.role === 'preventista';
    if (filtroRol === 'repartidores') return user.role === 'repartidor';
    return true;
  });

  // Alertas activas
  const alertasActivas = [
    {
      id: 1,
      tipo: 'retraso',
      usuario: 'Carlos Ruiz',
      mensaje: 'Retraso de 25 minutos en Ruta Sur-02',
      tiempo: 'Hace 15 min',
      prioridad: 'alta'
    },
    {
      id: 2,
      tipo: 'desviacion',
      usuario: 'Roberto Silva',
      mensaje: 'Desviación detectada - Fuera de zona programada',
      tiempo: 'Hace 8 min',
      prioridad: 'alta'
    },
    {
      id: 3,
      tipo: 'inactividad',
      usuario: 'Laura Mendoza',
      mensaje: 'Sin actualización GPS por más de 2 minutos',
      tiempo: 'Hace 3 min',
      prioridad: 'media'
    }
  ];

  const conteoRoles = {
    preventistas: equipoEnCampo.filter(u => u.role === 'preventista').length,
    repartidores: equipoEnCampo.filter(u => u.role === 'repartidor').length,
    enRuta: equipoEnCampo.filter(u => u.status !== 'delayed').length,
    retrasados: equipoEnCampo.filter(u => u.status === 'delayed').length,
    conAlertas: equipoEnCampo.filter(u => u.alertas?.length > 0 || u.status === 'route_deviation').length
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: colors.gray50
    }}>
      <WebHeader 
        title="Monitoreo en Tiempo Real"
        subtitle="Seguimiento GPS del equipo en campo"
      />

      <div style={{ padding: 24 }}>
        {/* Barra de filtros y acciones */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24, alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 8, flex: 1 }}>
            <button
              onClick={() => setFiltroRol('todos')}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: `2px solid ${filtroRol === 'todos' ? colors.primary : colors.gray200}`,
                backgroundColor: filtroRol === 'todos' ? colors.primary : 'white',
                color: filtroRol === 'todos' ? 'white' : colors.gray700,
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <Users size={16} />
              Todos ({equipoEnCampo.length})
            </button>
            <button
              onClick={() => setFiltroRol('preventistas')}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: `2px solid ${filtroRol === 'preventistas' ? colors.accent : colors.gray200}`,
                backgroundColor: filtroRol === 'preventistas' ? colors.accent : 'white',
                color: filtroRol === 'preventistas' ? 'white' : colors.gray700,
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <ClipboardCheck size={16} />
              Preventistas ({conteoRoles.preventistas})
            </button>
            <button
              onClick={() => setFiltroRol('repartidores')}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: `2px solid ${filtroRol === 'repartidores' ? colors.success : colors.gray200}`,
                backgroundColor: filtroRol === 'repartidores' ? colors.success : 'white',
                color: filtroRol === 'repartidores' ? 'white' : colors.gray700,
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <Truck size={16} />
              Repartidores ({conteoRoles.repartidores})
            </button>
          </div>

          <Button
            variant={alertasActivas.length > 0 ? "danger" : "secondary"}
            icon={<Bell size={18} />}
            onClick={() => setShowAlertas(!showAlertas)}
          >
            Alertas ({alertasActivas.length})
          </Button>
          <Button variant="secondary" icon={<RefreshCw size={18} />}>
            Actualizar
          </Button>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: showAlertas ? '1fr 380px 380px' : '1fr 380px', 
          gap: 24 
        }}>
          {/* Mapa principal */}
          <Card style={{ height: 600 }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: 16 
            }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>
                Ubicación en Tiempo Real
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ 
                  width: 8, 
                  height: 8, 
                  borderRadius: 4, 
                  backgroundColor: colors.success 
                }} />
                <span style={{ fontSize: 12, color: colors.gray500 }}>
                  Actualizado hace 30s
                </span>
              </div>
            </div>
            
            {/* Mapa real con Leaflet */}
            <div style={{ height: 520 }}>
              <MapaMonitoreo 
                vendedores={equipoFiltrado.map(user => ({
                  id: user.id,
                  nombre: user.name,
                  ruta: user.route,
                  estado: user.status === 'delivering' ? 'En ruta' : 
                         user.status === 'visiting' ? 'Entrega' :
                         user.status === 'delayed' ? 'Detenido' :
                         user.status === 'route_deviation' ? 'Detenido' : 'En ruta',
                  ubicacion: user.ubicacion,
                  ventasHoy: user.entregas ? `${user.entregas.completadas}` : `${user.visitas?.completadas}`,
                  pedidos: user.entregas ? `${user.entregas.completadas + user.entregas.pendientes}` : `${user.visitas?.completadas + user.visitas?.pendientes}`,
                  ultimaActualizacion: `Hace ${user.lastUpdate}`,
                  bateria: user.role === 'repartidor' ? '85%' : '92%'
                }))}
                center={[19.4326, -99.1332]}
                zoom={12}
              />
            </div>
          </Card>

          {/* Panel de estado de equipos */}
          <div>
            <Card style={{ marginBottom: 16 }}>
              <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600 }}>
                Resumen en Vivo
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ 
                  textAlign: 'center', 
                  padding: 12, 
                  backgroundColor: `${colors.success}10`, 
                  borderRadius: 8 
                }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: colors.success }}>
                    {conteoRoles.enRuta}
                  </div>
                  <div style={{ fontSize: 11, color: colors.gray600 }}>En ruta</div>
                </div>
                <div style={{ 
                  textAlign: 'center', 
                  padding: 12, 
                  backgroundColor: `${colors.warning}10`, 
                  borderRadius: 8 
                }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: colors.warning }}>
                    {conteoRoles.retrasados}
                  </div>
                  <div style={{ fontSize: 11, color: colors.gray600 }}>Retrasados</div>
                </div>
                <div style={{ 
                  textAlign: 'center', 
                  padding: 12, 
                  backgroundColor: `${colors.accent}10`, 
                  borderRadius: 8 
                }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: colors.accent }}>
                    {conteoRoles.preventistas}
                  </div>
                  <div style={{ fontSize: 11, color: colors.gray600 }}>Preventistas</div>
                </div>
                <div style={{ 
                  textAlign: 'center', 
                  padding: 12, 
                  backgroundColor: `${colors.danger}10`, 
                  borderRadius: 8 
                }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: colors.danger }}>
                    {conteoRoles.conAlertas}
                  </div>
                  <div style={{ fontSize: 11, color: colors.gray600 }}>Con alertas</div>
                </div>
              </div>
            </Card>

            <Card style={{ maxHeight: 492, overflowY: 'auto' }}>
              <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600 }}>
                Estado de Equipos ({equipoFiltrado.length})
              </h3>
              {equipoFiltrado.map((user, i) => (
                <div
                  key={user.id}
                  style={{
                    padding: '10px 12px',
                    borderBottom: i < equipoFiltrado.length - 1 ? `1px solid ${colors.gray100}` : 'none',
                    cursor: 'pointer',
                    backgroundColor: selectedUser?.id === user.id ? colors.gray50 : 'transparent',
                    margin: '0 -12px',
                    borderRadius: 8
                  }}
                  onClick={() => setSelectedUser(user)}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginBottom: 4 
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        backgroundColor: user.status === 'delayed' ? colors.warning :
                                        user.status === 'route_deviation' ? colors.danger :
                                        user.role === 'preventista' ? colors.accent : colors.success,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: colors.white
                      }}>
                        {user.role === 'preventista' ? <ClipboardCheck size={16} /> : <Truck size={16} />}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{user.name}</div>
                        <div style={{ fontSize: 11, color: colors.gray500 }}>{user.route}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      {user.alertas?.length > 0 && (
                        <div style={{
                          width: 20,
                          height: 20,
                          borderRadius: 10,
                          backgroundColor: colors.danger,
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 10,
                          fontWeight: 700
                        }}>
                          {user.alertas.length}
                        </div>
                      )}
                      <Badge color={
                        user.status === 'delayed' ? 'warning' :
                        user.status === 'route_deviation' ? 'danger' :
                        user.status === 'delivering' ? 'success' : 'primary'
                      }>
                        {user.status === 'delivering' ? (user.role === 'preventista' ? 'Visitando' : 'Entregando') :
                         user.status === 'visiting' ? 'En visita' :
                         user.status === 'delayed' ? 'Retrasado' :
                         user.status === 'route_deviation' ? 'Desviado' : 'En proceso'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <div style={{ flex: 1 }}>
                      <ProgressBar 
                        progress={user.progress} 
                        color={
                          user.status === 'delayed' ? colors.warning :
                          user.status === 'route_deviation' ? colors.danger : colors.success
                        } 
                      />
                    </div>
                    <span style={{ fontSize: 11, color: colors.gray500, whiteSpace: 'nowrap' }}>
                      ETA {user.eta}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', gap: 8, fontSize: 11, color: colors.gray600 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={12} />
                      {user.lastUpdate}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Navigation size={12} />
                      {user.speed} km/h
                    </div>
                    {user.role === 'repartidor' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Package size={12} />
                        {user.entregas.completadas}/{user.entregas.completadas + user.entregas.pendientes}
                      </div>
                    )}
                    {user.role === 'preventista' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <ClipboardCheck size={12} />
                        {user.visitas.completadas}/{user.visitas.completadas + user.visitas.pendientes}
                      </div>
                    )}
                  </div>

                  {/* Botones de acción rápida */}
                  <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedUser(user);
                        setShowChat(true);
                      }}
                      style={{
                        flex: 1,
                        padding: '6px 12px',
                        borderRadius: 6,
                        border: `1px solid ${colors.gray300}`,
                        backgroundColor: 'white',
                        cursor: 'pointer',
                        fontSize: 11,
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 4,
                        color: colors.primary
                      }}
                    >
                      <MessageCircle size={14} />
                      Chat
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`Llamando a ${user.name}...`);
                      }}
                      style={{
                        flex: 1,
                        padding: '6px 12px',
                        borderRadius: 6,
                        border: `1px solid ${colors.gray300}`,
                        backgroundColor: 'white',
                        cursor: 'pointer',
                        fontSize: 11,
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 4,
                        color: colors.success
                      }}
                    >
                      <Phone size={14} />
                      Llamar
                    </button>
                  </div>
                </div>
              ))}
            </Card>
          </div>

          {/* Panel de Alertas */}
          {showAlertas && (
            <div>
              <Card style={{ height: 600, display: 'flex', flexDirection: 'column' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: 16 
                }}>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>
                    🚨 Alertas Activas
                  </h3>
                  <button
                    onClick={() => setShowAlertas(false)}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      cursor: 'pointer', 
                      padding: 4 
                    }}
                  >
                    <X size={20} color={colors.gray500} />
                  </button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto' }}>
                  {alertasActivas.length === 0 ? (
                    <div style={{ 
                      textAlign: 'center', 
                      padding: 40, 
                      color: colors.gray400 
                    }}>
                      <CheckCircle size={48} style={{ marginBottom: 12 }} />
                      <div style={{ fontSize: 14 }}>No hay alertas activas</div>
                    </div>
                  ) : (
                    alertasActivas.map((alerta) => (
                      <Card
                        key={alerta.id}
                        style={{
                          marginBottom: 12,
                          border: `2px solid ${
                            alerta.prioridad === 'alta' ? colors.danger :
                            alerta.prioridad === 'media' ? colors.warning : colors.gray300
                          }`,
                          backgroundColor: alerta.prioridad === 'alta' ? `${colors.danger}05` : 'white'
                        }}
                      >
                        <div style={{ display: 'flex', gap: 12 }}>
                          <div style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: alerta.tipo === 'retraso' ? colors.warning :
                                            alerta.tipo === 'desviacion' ? colors.danger : colors.gray400,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            {alerta.tipo === 'retraso' && <Clock size={20} color="white" />}
                            {alerta.tipo === 'desviacion' && <AlertTriangle size={20} color="white" />}
                            {alerta.tipo === 'inactividad' && <WifiOff size={20} color="white" />}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ 
                              fontSize: 12, 
                              fontWeight: 700, 
                              color: colors.gray800, 
                              marginBottom: 4 
                            }}>
                              {alerta.usuario}
                            </div>
                            <div style={{ 
                              fontSize: 13, 
                              color: colors.gray700, 
                              marginBottom: 6 
                            }}>
                              {alerta.mensaje}
                            </div>
                            <div style={{ fontSize: 11, color: colors.gray500 }}>
                              {alerta.tiempo}
                            </div>
                            <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                              <button
                                onClick={() => {
                                  const user = equipoEnCampo.find(u => u.name === alerta.usuario);
                                  if (user) setSelectedUser(user);
                                }}
                                style={{
                                  padding: '4px 10px',
                                  borderRadius: 4,
                                  border: `1px solid ${colors.primary}`,
                                  backgroundColor: 'white',
                                  color: colors.primary,
                                  cursor: 'pointer',
                                  fontSize: 11,
                                  fontWeight: 600
                                }}
                              >
                                Ver en mapa
                              </button>
                              <button
                                onClick={() => {
                                  const user = equipoEnCampo.find(u => u.name === alerta.usuario);
                                  if (user) {
                                    setSelectedUser(user);
                                    setShowChat(true);
                                  }
                                }}
                                style={{
                                  padding: '4px 10px',
                                  borderRadius: 4,
                                  border: `1px solid ${colors.success}`,
                                  backgroundColor: 'white',
                                  color: colors.success,
                                  cursor: 'pointer',
                                  fontSize: 11,
                                  fontWeight: 600
                                }}
                              >
                                Contactar
                              </button>
                              <button
                                onClick={() => alert('Alerta resuelta')}
                                style={{
                                  padding: '4px 10px',
                                  borderRadius: 4,
                                  border: `1px solid ${colors.gray300}`,
                                  backgroundColor: 'white',
                                  color: colors.gray600,
                                  cursor: 'pointer',
                                  fontSize: 11,
                                  fontWeight: 600
                                }}
                              >
                                Resolver
                              </button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>

                <div style={{ 
                  borderTop: `1px solid ${colors.gray200}`, 
                  paddingTop: 12, 
                  marginTop: 12 
                }}>
                  <Button variant="secondary" style={{ width: '100%' }}>
                    Ver Historial de Alertas
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Modal de Chat */}
        {showChat && selectedUser && (
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
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: 12,
              width: 500,
              maxHeight: '80vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              {/* Header del chat */}
              <div style={{
                padding: 20,
                borderBottom: `2px solid ${colors.gray200}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: colors.primary,
                color: 'white'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <MessageCircle size={24} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 16 }}>{selectedUser.name}</div>
                    <div style={{ fontSize: 12, opacity: 0.9 }}>{selectedUser.route}</div>
                  </div>
                </div>
                <button
                  onClick={() => setShowChat(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'white',
                    padding: 4
                  }}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Área de mensajes */}
              <div style={{
                flex: 1,
                padding: 20,
                overflowY: 'auto',
                backgroundColor: colors.gray50
              }}>
                <div style={{ textAlign: 'center', color: colors.gray400, fontSize: 12, marginBottom: 20 }}>
                  Hoy, 14:25
                </div>
                
                {/* Mensaje recibido */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{
                    maxWidth: '70%',
                    backgroundColor: 'white',
                    padding: 12,
                    borderRadius: '12px 12px 12px 4px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ fontSize: 14 }}>
                      ¡Hola! Voy llegando al siguiente cliente en 5 minutos
                    </div>
                    <div style={{ fontSize: 10, color: colors.gray400, marginTop: 4 }}>
                      14:23
                    </div>
                  </div>
                </div>

                {/* Mensaje enviado */}
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{
                    maxWidth: '70%',
                    backgroundColor: colors.primary,
                    color: 'white',
                    padding: 12,
                    borderRadius: '12px 12px 4px 12px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ fontSize: 14 }}>
                      Perfecto, mantén la comunicación. ¿Todo bien con el vehículo?
                    </div>
                    <div style={{ fontSize: 10, opacity: 0.8, marginTop: 4, textAlign: 'right' }}>
                      14:24
                    </div>
                  </div>
                </div>

                {/* Mensaje recibido */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{
                    maxWidth: '70%',
                    backgroundColor: 'white',
                    padding: 12,
                    borderRadius: '12px 12px 12px 4px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ fontSize: 14 }}>
                      Sí, todo en orden 👍
                    </div>
                    <div style={{ fontSize: 10, color: colors.gray400, marginTop: 4 }}>
                      14:25
                    </div>
                  </div>
                </div>
              </div>

              {/* Input de mensaje */}
              <div style={{
                padding: 16,
                borderTop: `1px solid ${colors.gray200}`,
                display: 'flex',
                gap: 8
              }}>
                <input
                  type="text"
                  placeholder="Escribe un mensaje..."
                  style={{
                    flex: 1,
                    padding: '10px 12px',
                    border: `1px solid ${colors.gray300}`,
                    borderRadius: 8,
                    fontSize: 14,
                    outline: 'none'
                  }}
                />
                <button
                  style={{
                    padding: '10px 20px',
                    backgroundColor: colors.primary,
                    color: 'white',
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: 14
                  }}
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Monitoreo;
