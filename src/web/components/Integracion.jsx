import React, { useState } from 'react';
import { Link, RefreshCw, CheckCircle, XCircle, AlertTriangle, Clock, Zap, Database, Cloud, Server, Activity, Settings, FileText, Play, Pause, Download, Upload, Code, Globe, Key, Shield, Calendar, User, Search } from 'lucide-react';
import { colors } from '../../shared/colors.js';
import { Card, Badge, Button } from '../../shared/SharedComponents.jsx';
import WebHeader from './WebHeader.jsx';

const Integracion = () => {
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [tabActiva, setTabActiva] = useState('conexiones');
  const [modalIntegracion, setModalIntegracion] = useState(false);
  const [panelDetalles, setPanelDetalles] = useState(false);
  const [integracionSeleccionada, setIntegracionSeleccionada] = useState(null);

  const integraciones = [
    {
      id: 'INT-001',
      nombre: 'SAP Business One',
      tipo: 'ERP',
      proveedor: 'SAP',
      estado: 'Activa',
      ultimaSync: '2024-01-10 09:15:23',
      proximaSync: '2024-01-10 10:00:00',
      frecuencia: 'Cada 15 minutos',
      sincronizaciones: {
        exitosas: 1450,
        fallidas: 12,
        ultimaSemana: 672
      },
      endpoints: [
        { nombre: 'Clientes', url: '/api/v1/BusinessPartners', metodo: 'GET/POST', estado: 'Activo' },
        { nombre: 'Productos', url: '/api/v1/Items', metodo: 'GET/POST', estado: 'Activo' },
        { nombre: 'Pedidos', url: '/api/v1/Orders', metodo: 'POST', estado: 'Activo' },
        { nombre: 'Inventario', url: '/api/v1/WarehouseStockInquiry', metodo: 'GET', estado: 'Activo' }
      ],
      configuracion: {
        serverUrl: 'https://sap.empresa.com:50000/b1s/v1',
        database: 'PROD_DB',
        timeout: 30,
        reintentos: 3
      },
      autenticacion: 'OAuth 2.0',
      ultimoError: null,
      tiempoRespuesta: 1.2,
      registros: {
        enviados: 8420,
        recibidos: 12350
      }
    },
    {
      id: 'INT-002',
      nombre: 'Aspel SAE',
      tipo: 'ERP',
      proveedor: 'Aspel',
      estado: 'Activa',
      ultimaSync: '2024-01-10 09:20:45',
      proximaSync: '2024-01-10 10:00:00',
      frecuencia: 'Cada 20 minutos',
      sincronizaciones: {
        exitosas: 980,
        fallidas: 5,
        ultimaSemana: 504
      },
      endpoints: [
        { nombre: 'Clientes', url: '/api/clientes', metodo: 'GET/POST', estado: 'Activo' },
        { nombre: 'Productos', url: '/api/productos', metodo: 'GET', estado: 'Activo' },
        { nombre: 'Facturas', url: '/api/facturas', metodo: 'POST', estado: 'Activo' }
      ],
      configuracion: {
        serverUrl: 'http://192.168.1.100:8080',
        database: 'EMPRESA2024',
        timeout: 20,
        reintentos: 2
      },
      autenticacion: 'API Key',
      ultimoError: null,
      tiempoRespuesta: 0.8,
      registros: {
        enviados: 5240,
        recibidos: 7850
      }
    },
    {
      id: 'INT-003',
      nombre: 'Facturación Electrónica',
      tipo: 'API',
      proveedor: 'Finkok',
      estado: 'Activa',
      ultimaSync: '2024-01-10 09:18:12',
      proximaSync: '2024-01-10 09:30:00',
      frecuencia: 'Cada 10 minutos',
      sincronizaciones: {
        exitosas: 2340,
        fallidas: 8,
        ultimaSemana: 1120
      },
      endpoints: [
        { nombre: 'Timbrar CFDI', url: '/api/stamp', metodo: 'POST', estado: 'Activo' },
        { nombre: 'Cancelar CFDI', url: '/api/cancel', metodo: 'POST', estado: 'Activo' },
        { nombre: 'Consultar Status', url: '/api/status', metodo: 'GET', estado: 'Activo' }
      ],
      configuracion: {
        serverUrl: 'https://demo-facturacion.finkok.com',
        username: 'empresa@test.com',
        timeout: 15,
        reintentos: 3
      },
      autenticacion: 'Usuario/Contraseña',
      ultimoError: null,
      tiempoRespuesta: 2.5,
      registros: {
        enviados: 3450,
        recibidos: 3450
      }
    },
    {
      id: 'INT-004',
      nombre: 'Google Maps API',
      tipo: 'API',
      proveedor: 'Google',
      estado: 'Activa',
      ultimaSync: '2024-01-10 09:22:30',
      proximaSync: 'Bajo demanda',
      frecuencia: 'Tiempo real',
      sincronizaciones: {
        exitosas: 5620,
        fallidas: 15,
        ultimaSemana: 2400
      },
      endpoints: [
        { nombre: 'Geocoding', url: '/maps/api/geocode/json', metodo: 'GET', estado: 'Activo' },
        { nombre: 'Directions', url: '/maps/api/directions/json', metodo: 'GET', estado: 'Activo' },
        { nombre: 'Distance Matrix', url: '/maps/api/distancematrix/json', metodo: 'GET', estado: 'Activo' }
      ],
      configuracion: {
        serverUrl: 'https://maps.googleapis.com',
        timeout: 10,
        reintentos: 2
      },
      autenticacion: 'API Key',
      ultimoError: null,
      tiempoRespuesta: 0.5,
      registros: {
        enviados: 5620,
        recibidos: 5620
      }
    },
    {
      id: 'INT-005',
      nombre: 'WhatsApp Business',
      tipo: 'Mensajería',
      proveedor: 'Meta',
      estado: 'Advertencia',
      ultimaSync: '2024-01-10 09:10:00',
      proximaSync: 'Bajo demanda',
      frecuencia: 'Tiempo real',
      sincronizaciones: {
        exitosas: 3200,
        fallidas: 45,
        ultimaSemana: 1800
      },
      endpoints: [
        { nombre: 'Enviar Mensaje', url: '/v1/messages', metodo: 'POST', estado: 'Activo' },
        { nombre: 'Webhook', url: '/webhook', metodo: 'POST', estado: 'Advertencia' }
      ],
      configuracion: {
        serverUrl: 'https://graph.facebook.com/v18.0',
        phoneNumberId: '1234567890',
        timeout: 15,
        reintentos: 2
      },
      autenticacion: 'Token Bearer',
      ultimoError: {
        fecha: '2024-01-10 08:45:12',
        mensaje: 'Rate limit exceeded',
        codigo: 429
      },
      tiempoRespuesta: 1.8,
      registros: {
        enviados: 3245,
        recibidos: 890
      }
    },
    {
      id: 'INT-006',
      nombre: 'Banco Santander',
      tipo: 'Banco',
      proveedor: 'Santander',
      estado: 'Inactiva',
      ultimaSync: '2024-01-09 18:30:00',
      proximaSync: null,
      frecuencia: 'Manual',
      sincronizaciones: {
        exitosas: 156,
        fallidas: 3,
        ultimaSemana: 0
      },
      endpoints: [
        { nombre: 'Consulta Saldo', url: '/api/v1/balance', metodo: 'GET', estado: 'Inactivo' },
        { nombre: 'Movimientos', url: '/api/v1/movements', metodo: 'GET', estado: 'Inactivo' }
      ],
      configuracion: {
        serverUrl: 'https://openapi.santander.com',
        accountNumber: '****1234',
        timeout: 30,
        reintentos: 1
      },
      autenticacion: 'OAuth 2.0',
      ultimoError: {
        fecha: '2024-01-09 18:30:15',
        mensaje: 'Connection timeout',
        codigo: 408
      },
      tiempoRespuesta: null,
      registros: {
        enviados: 159,
        recibidos: 159
      }
    }
  ];

  const estadisticas = {
    totalIntegraciones: integraciones.length,
    activas: integraciones.filter(i => i.estado === 'Activa').length,
    advertencias: integraciones.filter(i => i.estado === 'Advertencia').length,
    inactivas: integraciones.filter(i => i.estado === 'Inactiva').length,
    syncExitosas: integraciones.reduce((sum, i) => sum + i.sincronizaciones.exitosas, 0),
    syncFallidas: integraciones.reduce((sum, i) => sum + i.sincronizaciones.fallidas, 0),
    tiempoPromedioRespuesta: (integraciones.filter(i => i.tiempoRespuesta).reduce((sum, i) => sum + i.tiempoRespuesta, 0) / integraciones.filter(i => i.tiempoRespuesta).length).toFixed(2)
  };

  const integrationesFiltradas = integraciones.filter(int => {
    const matchBusqueda = int.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                         int.tipo.toLowerCase().includes(busqueda.toLowerCase()) ||
                         int.proveedor.toLowerCase().includes(busqueda.toLowerCase());
    const matchEstado = filtroEstado === 'todos' || int.estado === filtroEstado;
    const matchTipo = filtroTipo === 'todos' || int.tipo === filtroTipo;
    
    return matchBusqueda && matchEstado && matchTipo;
  });

  const abrirModalNueva = () => {
    setIntegracionSeleccionada(null);
    setModalIntegracion(true);
  };

  const abrirDetalles = (integracion) => {
    setIntegracionSeleccionada(integracion);
    setPanelDetalles(true);
  };

  const sincronizarManual = (id) => {
    console.log('Sincronizar:', id);
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: colors.gray50
    }}>
      <WebHeader 
        title="Integraciones"
        subtitle="Gestiona las conexiones con sistemas externos y APIs"
      />

      <div style={{ padding: 24 }}>
        {/* Estadísticas */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: 16, 
          marginBottom: 24 
        }}>
          <Card style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                backgroundColor: colors.primary + '20',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Link size={24} color={colors.primary} />
              </div>
              <div>
                <div style={{ fontSize: 13, color: colors.gray500, marginBottom: 4 }}>
                  Total Integraciones
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: colors.gray800 }}>
                  {estadisticas.totalIntegraciones}
                </div>
              </div>
            </div>
          </Card>

          <Card style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                backgroundColor: colors.success + '20',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CheckCircle size={24} color={colors.success} />
              </div>
              <div>
                <div style={{ fontSize: 13, color: colors.gray500, marginBottom: 4 }}>
                  Activas
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: colors.gray800 }}>
                  {estadisticas.activas}
                </div>
              </div>
            </div>
          </Card>

          <Card style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                backgroundColor: colors.accent + '20',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <RefreshCw size={24} color={colors.accent} />
              </div>
              <div>
                <div style={{ fontSize: 13, color: colors.gray500, marginBottom: 4 }}>
                  Sincronizaciones
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: colors.gray800 }}>
                  {(estadisticas.syncExitosas / 1000).toFixed(1)}K
                </div>
              </div>
            </div>
          </Card>

          <Card style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                backgroundColor: colors.warning + '20',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Activity size={24} color={colors.warning} />
              </div>
              <div>
                <div style={{ fontSize: 13, color: colors.gray500, marginBottom: 4 }}>
                  Tiempo Promedio
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: colors.gray800 }}>
                  {estadisticas.tiempoPromedioRespuesta}s
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 8, borderBottom: `2px solid ${colors.gray200}` }}>
            {[
              { id: 'conexiones', label: 'Conexiones', icon: Link },
              { id: 'logs', label: 'Logs de Sincronización', icon: FileText },
              { id: 'webhooks', label: 'Webhooks', icon: Zap },
              { id: 'salud', label: 'Estado de Salud', icon: Activity }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setTabActiva(tab.id)}
                style={{
                  padding: '12px 20px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  borderBottom: `3px solid ${tabActiva === tab.id ? colors.primary : 'transparent'}`,
                  color: tabActiva === tab.id ? colors.primary : colors.gray500,
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: panelDetalles ? '1fr 600px' : '1fr', gap: 24 }}>
          {/* Lista de Integraciones */}
          {tabActiva === 'conexiones' && (
            <div>
              <Card style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <Search 
                      size={18} 
                      style={{ 
                        position: 'absolute', 
                        left: 12, 
                        top: '50%', 
                        transform: 'translateY(-50%)',
                        color: colors.gray400 
                      }} 
                    />
                    <input
                      type="text"
                      placeholder="Buscar por nombre, tipo o proveedor..."
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px 10px 40px',
                        border: `1px solid ${colors.gray300}`,
                        borderRadius: 8,
                        fontSize: 14
                      }}
                    />
                  </div>

                  <select
                    value={filtroTipo}
                    onChange={(e) => setFiltroTipo(e.target.value)}
                    style={{
                      padding: '10px 12px',
                      border: `1px solid ${colors.gray300}`,
                      borderRadius: 8,
                      fontSize: 14,
                      backgroundColor: 'white',
                      minWidth: 150
                    }}
                  >
                    <option value="todos">Todos los tipos</option>
                    <option value="ERP">ERP</option>
                    <option value="API">API</option>
                    <option value="Mensajería">Mensajería</option>
                    <option value="Banco">Banco</option>
                  </select>

                  <select
                    value={filtroEstado}
                    onChange={(e) => setFiltroEstado(e.target.value)}
                    style={{
                      padding: '10px 12px',
                      border: `1px solid ${colors.gray300}`,
                      borderRadius: 8,
                      fontSize: 14,
                      backgroundColor: 'white',
                      minWidth: 150
                    }}
                  >
                    <option value="todos">Todos los estados</option>
                    <option value="Activa">Activa</option>
                    <option value="Advertencia">Advertencia</option>
                    <option value="Inactiva">Inactiva</option>
                  </select>

                  <Button variant="primary" icon={<Link size={18} />} onClick={abrirModalNueva}>
                    Nueva Integración
                  </Button>
                </div>
              </Card>

              <div style={{ display: 'grid', gap: 16 }}>
                {integrationesFiltradas.map(int => (
                  <Card 
                    key={int.id}
                    style={{ 
                      padding: 20,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      border: `2px solid ${
                        int.estado === 'Activa' ? colors.success + '30' :
                        int.estado === 'Advertencia' ? colors.warning + '30' :
                        colors.gray200
                      }`
                    }}
                    onClick={() => abrirDetalles(int)}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                      {/* Icono */}
                      <div style={{
                        width: 56,
                        height: 56,
                        borderRadius: 12,
                        backgroundColor: 
                          int.tipo === 'ERP' ? colors.primary + '20' :
                          int.tipo === 'API' ? colors.accent + '20' :
                          int.tipo === 'Mensajería' ? colors.success + '20' :
                          colors.warning + '20',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {int.tipo === 'ERP' && <Database size={28} color={colors.primary} />}
                        {int.tipo === 'API' && <Cloud size={28} color={colors.accent} />}
                        {int.tipo === 'Mensajería' && <Zap size={28} color={colors.success} />}
                        {int.tipo === 'Banco' && <Shield size={28} color={colors.warning} />}
                      </div>

                      {/* Contenido */}
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                          <div>
                            <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0, marginBottom: 4 }}>
                              {int.nombre}
                            </h3>
                            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                              <Badge color={
                                int.tipo === 'ERP' ? 'primary' :
                                int.tipo === 'API' ? 'accent' :
                                int.tipo === 'Mensajería' ? 'success' : 'warning'
                              }>
                                {int.tipo}
                              </Badge>
                              <span style={{ fontSize: 13, color: colors.gray500 }}>
                                {int.proveedor}
                              </span>
                            </div>
                          </div>

                          <div style={{ textAlign: 'right' }}>
                            <Badge color={
                              int.estado === 'Activa' ? 'success' :
                              int.estado === 'Advertencia' ? 'warning' : 'gray'
                            }>
                              {int.estado === 'Activa' && <CheckCircle size={14} style={{ marginRight: 4 }} />}
                              {int.estado === 'Advertencia' && <AlertTriangle size={14} style={{ marginRight: 4 }} />}
                              {int.estado === 'Inactiva' && <XCircle size={14} style={{ marginRight: 4 }} />}
                              {int.estado}
                            </Badge>
                          </div>
                        </div>

                        {/* Métricas */}
                        <div style={{ 
                          display: 'grid', 
                          gridTemplateColumns: 'repeat(4, 1fr)', 
                          gap: 12,
                          marginTop: 16,
                          paddingTop: 16,
                          borderTop: `1px solid ${colors.gray200}`
                        }}>
                          <div>
                            <div style={{ fontSize: 11, color: colors.gray500, marginBottom: 4 }}>
                              Última Sync
                            </div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: colors.gray700 }}>
                              {int.ultimaSync ? new Date(int.ultimaSync).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }) : '-'}
                            </div>
                          </div>

                          <div>
                            <div style={{ fontSize: 11, color: colors.gray500, marginBottom: 4 }}>
                              Exitosas
                            </div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: colors.success }}>
                              {int.sincronizaciones.exitosas}
                            </div>
                          </div>

                          <div>
                            <div style={{ fontSize: 11, color: colors.gray500, marginBottom: 4 }}>
                              Fallidas
                            </div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: colors.danger }}>
                              {int.sincronizaciones.fallidas}
                            </div>
                          </div>

                          <div>
                            <div style={{ fontSize: 11, color: colors.gray500, marginBottom: 4 }}>
                              Tiempo Resp.
                            </div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: colors.accent }}>
                              {int.tiempoRespuesta ? `${int.tiempoRespuesta}s` : '-'}
                            </div>
                          </div>
                        </div>

                        {/* Último error si existe */}
                        {int.ultimoError && (
                          <div style={{
                            marginTop: 12,
                            padding: 10,
                            backgroundColor: colors.danger + '10',
                            borderRadius: 6,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8
                          }}>
                            <AlertTriangle size={16} color={colors.danger} />
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 12, fontWeight: 600, color: colors.danger }}>
                                Error {int.ultimoError.codigo}
                              </div>
                              <div style={{ fontSize: 11, color: colors.gray600 }}>
                                {int.ultimoError.mensaje}
                              </div>
                            </div>
                            <div style={{ fontSize: 10, color: colors.gray500 }}>
                              {new Date(int.ultimoError.fecha).toLocaleString('es-MX')}
                            </div>
                          </div>
                        )}

                        {/* Acciones */}
                        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                          <Button 
                            variant="outline" 
                            icon={<RefreshCw size={16} />}
                            style={{ fontSize: 12, padding: '6px 12px' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              sincronizarManual(int.id);
                            }}
                          >
                            Sincronizar
                          </Button>
                          {int.estado !== 'Activa' && (
                            <Button 
                              variant="success" 
                              icon={<Play size={16} />}
                              style={{ fontSize: 12, padding: '6px 12px' }}
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log('Activar:', int.id);
                              }}
                            >
                              Activar
                            </Button>
                          )}
                          {int.estado === 'Activa' && (
                            <Button 
                              variant="outline" 
                              icon={<Pause size={16} />}
                              style={{ fontSize: 12, padding: '6px 12px' }}
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log('Pausar:', int.id);
                              }}
                            >
                              Pausar
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            icon={<Settings size={16} />}
                            style={{ fontSize: 12, padding: '6px 12px' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('Configurar:', int.id);
                            }}
                          >
                            Configurar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {integrationesFiltradas.length === 0 && (
                <Card>
                  <div style={{ 
                    textAlign: 'center', 
                    padding: 40,
                    color: colors.gray400 
                  }}>
                    <Link size={48} style={{ marginBottom: 12 }} />
                    <div style={{ fontSize: 16, fontWeight: 500 }}>
                      No se encontraron integraciones
                    </div>
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* Tab Logs */}
          {tabActiva === 'logs' && (
            <TabLogs />
          )}

          {/* Tab Webhooks */}
          {tabActiva === 'webhooks' && (
            <TabWebhooks />
          )}

          {/* Tab Salud */}
          {tabActiva === 'salud' && (
            <TabSalud integraciones={integraciones} />
          )}

          {/* Panel de Detalles */}
          {panelDetalles && integracionSeleccionada && (
            <PanelDetallesIntegracion
              integracion={integracionSeleccionada}
              onClose={() => setPanelDetalles(false)}
            />
          )}
        </div>
      </div>

      {/* Modal Nueva Integración */}
      {modalIntegracion && (
        <ModalIntegracion
          onClose={() => setModalIntegracion(false)}
          onSave={(datos) => {
            console.log('Guardar integración:', datos);
            setModalIntegracion(false);
          }}
        />
      )}
    </div>
  );
};

// Tab Logs de Sincronización
const TabLogs = () => {
  const logs = [
    { id: 1, fecha: '2024-01-10 09:15:23', integracion: 'SAP Business One', tipo: 'Productos', resultado: 'Exitosa', registros: 145, duracion: 1.2 },
    { id: 2, fecha: '2024-01-10 09:10:15', integracion: 'WhatsApp Business', tipo: 'Envío Mensaje', resultado: 'Fallida', error: 'Rate limit exceeded', duracion: 0.3 },
    { id: 3, fecha: '2024-01-10 09:05:45', integracion: 'Aspel SAE', tipo: 'Clientes', resultado: 'Exitosa', registros: 89, duracion: 0.8 },
    { id: 4, fecha: '2024-01-10 09:00:30', integracion: 'SAP Business One', tipo: 'Pedidos', resultado: 'Exitosa', registros: 28, duracion: 1.5 },
    { id: 5, fecha: '2024-01-10 08:55:12', integracion: 'Facturación Electrónica', tipo: 'Timbrar CFDI', resultado: 'Exitosa', registros: 12, duracion: 2.1 }
  ];

  return (
    <Card>
      <div style={{ padding: 20, borderBottom: `1px solid ${colors.gray200}` }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>
          Logs de Sincronización
        </h3>
      </div>
      <div style={{ maxHeight: 600, overflowY: 'auto' }}>
        {logs.map(log => (
          <div 
            key={log.id}
            style={{ 
              padding: 16,
              borderBottom: `1px solid ${colors.gray100}`,
              display: 'flex',
              alignItems: 'center',
              gap: 16
            }}
          >
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              backgroundColor: log.resultado === 'Exitosa' ? colors.success + '20' : colors.danger + '20',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              {log.resultado === 'Exitosa' ? (
                <CheckCircle size={20} color={colors.success} />
              ) : (
                <XCircle size={20} color={colors.danger} />
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>
                {log.integracion}
              </div>
              <div style={{ fontSize: 12, color: colors.gray600 }}>
                {log.tipo}
                {log.registros && ` • ${log.registros} registros`}
                {log.error && ` • ${log.error}`}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, color: colors.gray500, marginBottom: 2 }}>
                {log.fecha}
              </div>
              <div style={{ fontSize: 11, color: colors.gray400 }}>
                {log.duracion}s
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// Tab Webhooks
const TabWebhooks = () => {
  const webhooks = [
    { id: 1, nombre: 'Notificación Pedido Nuevo', url: 'https://api.empresa.com/webhooks/pedido-nuevo', eventos: ['pedido.creado'], estado: 'Activo', ultimoEnvio: '2024-01-10 09:15:00' },
    { id: 2, nombre: 'Actualización Stock', url: 'https://api.empresa.com/webhooks/stock', eventos: ['inventario.actualizado'], estado: 'Activo', ultimoEnvio: '2024-01-10 09:10:00' },
    { id: 3, nombre: 'Cliente Nuevo', url: 'https://api.empresa.com/webhooks/cliente', eventos: ['cliente.creado', 'cliente.actualizado'], estado: 'Inactivo', ultimoEnvio: null }
  ];

  return (
    <Card>
      <div style={{ padding: 20, borderBottom: `1px solid ${colors.gray200}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>
          Webhooks Configurados
        </h3>
        <Button variant="primary" icon={<Zap size={16} />} style={{ fontSize: 12, padding: '6px 12px' }}>
          Nuevo Webhook
        </Button>
      </div>
      <div style={{ padding: 16 }}>
        {webhooks.map(webhook => (
          <div 
            key={webhook.id}
            style={{ 
              padding: 16,
              backgroundColor: colors.gray50,
              borderRadius: 8,
              marginBottom: 12,
              border: `1px solid ${colors.gray200}`
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>
                {webhook.nombre}
              </div>
              <Badge color={webhook.estado === 'Activo' ? 'success' : 'gray'}>
                {webhook.estado}
              </Badge>
            </div>
            <div style={{ fontSize: 12, color: colors.gray600, fontFamily: 'monospace', marginBottom: 8 }}>
              {webhook.url}
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {webhook.eventos.map(evento => (
                <Badge key={evento} color="accent" style={{ fontSize: 10 }}>
                  {evento}
                </Badge>
              ))}
            </div>
            {webhook.ultimoEnvio && (
              <div style={{ fontSize: 11, color: colors.gray500, marginTop: 8 }}>
                Último envío: {webhook.ultimoEnvio}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

// Tab Estado de Salud
const TabSalud = ({ integraciones }) => {
  const calcularSalud = () => {
    const activas = integraciones.filter(i => i.estado === 'Activa').length;
    const total = integraciones.length;
    return ((activas / total) * 100).toFixed(0);
  };

  const saludGeneral = calcularSalud();

  return (
    <div>
      <Card style={{ marginBottom: 16, padding: 24, textAlign: 'center' }}>
        <div style={{ fontSize: 14, color: colors.gray600, marginBottom: 8 }}>
          Salud General del Sistema
        </div>
        <div style={{ 
          fontSize: 48, 
          fontWeight: 700, 
          color: saludGeneral >= 80 ? colors.success : saludGeneral >= 50 ? colors.warning : colors.danger,
          marginBottom: 8
        }}>
          {saludGeneral}%
        </div>
        <div style={{ fontSize: 13, color: colors.gray500 }}>
          {estadisticas.activas} de {estadisticas.totalIntegraciones} integraciones activas
        </div>
      </Card>

      <Card>
        <div style={{ padding: 20, borderBottom: `1px solid ${colors.gray200}` }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>
            Estado por Integración
          </h3>
        </div>
        <div style={{ padding: 16 }}>
          {integraciones.map(int => (
            <div 
              key={int.id}
              style={{ 
                padding: 12,
                borderBottom: `1px solid ${colors.gray100}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: 
                    int.estado === 'Activa' ? colors.success :
                    int.estado === 'Advertencia' ? colors.warning :
                    colors.gray400
                }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>
                    {int.nombre}
                  </div>
                  <div style={{ fontSize: 11, color: colors.gray500 }}>
                    Tiempo de respuesta: {int.tiempoRespuesta ? `${int.tiempoRespuesta}s` : 'N/A'}
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: colors.success }}>
                  {((int.sincronizaciones.exitosas / (int.sincronizaciones.exitosas + int.sincronizaciones.fallidas)) * 100).toFixed(1)}%
                </div>
                <div style={{ fontSize: 10, color: colors.gray500 }}>
                  Tasa de éxito
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// Panel de Detalles de Integración
const PanelDetallesIntegracion = ({ integracion, onClose }) => {
  const [tabPanel, setTabPanel] = useState('general');

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: 12,
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      height: 'fit-content',
      position: 'sticky',
      top: 24
    }}>
      {/* Header */}
      <div style={{
        padding: 20,
        borderBottom: `1px solid ${colors.gray200}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}>
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0, marginBottom: 8 }}>
            {integracion.nombre}
          </h3>
          <div style={{ display: 'flex', gap: 8 }}>
            <Badge color={
              integracion.estado === 'Activa' ? 'success' :
              integracion.estado === 'Advertencia' ? 'warning' : 'gray'
            }>
              {integracion.estado}
            </Badge>
            <Badge color={
              integracion.tipo === 'ERP' ? 'primary' :
              integracion.tipo === 'API' ? 'accent' :
              integracion.tipo === 'Mensajería' ? 'success' : 'warning'
            }>
              {integracion.tipo}
            </Badge>
          </div>
        </div>
        <button 
          onClick={onClose}
          style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 24, color: colors.gray400 }}
        >
          ×
        </button>
      </div>

      {/* Tabs Panel */}
      <div style={{ borderBottom: `1px solid ${colors.gray200}`, padding: '0 20px' }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {[
            { id: 'general', label: 'General', icon: Server },
            { id: 'endpoints', label: 'Endpoints', icon: Globe },
            { id: 'config', label: 'Configuración', icon: Settings },
            { id: 'metricas', label: 'Métricas', icon: Activity }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setTabPanel(tab.id)}
              style={{
                padding: '10px 16px',
                border: 'none',
                backgroundColor: 'transparent',
                borderBottom: `2px solid ${tabPanel === tab.id ? colors.primary : 'transparent'}`,
                color: tabPanel === tab.id ? colors.primary : colors.gray500,
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contenido */}
      <div style={{ padding: 20, maxHeight: 500, overflowY: 'auto' }}>
        {tabPanel === 'general' && (
          <div>
            <Card style={{ padding: 16, backgroundColor: colors.gray50, marginBottom: 16 }}>
              <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
                Información General
              </h4>
              <InfoRow icon={<Database size={16} />} label="Proveedor" value={integracion.proveedor} />
              <InfoRow icon={<Key size={16} />} label="Autenticación" value={integracion.autenticacion} />
              <InfoRow icon={<Clock size={16} />} label="Frecuencia" value={integracion.frecuencia} />
              <InfoRow icon={<Calendar size={16} />} label="Última Sync" value={integracion.ultimaSync} />
            </Card>

            <Card style={{ padding: 16, marginBottom: 16 }}>
              <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
                Estadísticas
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                <div style={{ textAlign: 'center', padding: 12, backgroundColor: colors.success + '10', borderRadius: 8 }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: colors.success }}>
                    {integracion.sincronizaciones.exitosas}
                  </div>
                  <div style={{ fontSize: 11, color: colors.gray600 }}>Exitosas</div>
                </div>
                <div style={{ textAlign: 'center', padding: 12, backgroundColor: colors.danger + '10', borderRadius: 8 }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: colors.danger }}>
                    {integracion.sincronizaciones.fallidas}
                  </div>
                  <div style={{ fontSize: 11, color: colors.gray600 }}>Fallidas</div>
                </div>
              </div>
            </Card>

            <Card style={{ padding: 16 }}>
              <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
                Tráfico de Datos
              </h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Upload size={16} color={colors.primary} />
                  Enviados
                </span>
                <span style={{ fontSize: 15, fontWeight: 700 }}>
                  {integracion.registros.enviados.toLocaleString()}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Download size={16} color={colors.success} />
                  Recibidos
                </span>
                <span style={{ fontSize: 15, fontWeight: 700 }}>
                  {integracion.registros.recibidos.toLocaleString()}
                </span>
              </div>
            </Card>
          </div>
        )}

        {tabPanel === 'endpoints' && (
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
              Endpoints Configurados ({integracion.endpoints.length})
            </h4>
            {integracion.endpoints.map((endpoint, idx) => (
              <Card 
                key={idx}
                style={{ 
                  padding: 12,
                  marginBottom: 10,
                  backgroundColor: colors.gray50,
                  border: `1px solid ${colors.gray200}`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>
                    {endpoint.nombre}
                  </div>
                  <Badge color={endpoint.estado === 'Activo' ? 'success' : 'gray'}>
                    {endpoint.estado}
                  </Badge>
                </div>
                <div style={{ fontSize: 11, fontFamily: 'monospace', color: colors.gray600, marginBottom: 4 }}>
                  {endpoint.url}
                </div>
                <Badge color="accent" style={{ fontSize: 10 }}>
                  {endpoint.metodo}
                </Badge>
              </Card>
            ))}
          </div>
        )}

        {tabPanel === 'config' && (
          <div>
            <Card style={{ padding: 16, backgroundColor: colors.gray50 }}>
              <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
                Configuración de Conexión
              </h4>
              <InfoRow icon={<Globe size={16} />} label="Server URL" value={integracion.configuracion.serverUrl} />
              {integracion.configuracion.database && (
                <InfoRow icon={<Database size={16} />} label="Database" value={integracion.configuracion.database} />
              )}
              <InfoRow icon={<Clock size={16} />} label="Timeout" value={`${integracion.configuracion.timeout}s`} />
              <InfoRow icon={<RefreshCw size={16} />} label="Reintentos" value={integracion.configuracion.reintentos} />
            </Card>
          </div>
        )}

        {tabPanel === 'metricas' && (
          <div>
            <Card style={{ padding: 16, marginBottom: 12 }}>
              <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
                Tiempo de Respuesta
              </h4>
              <div style={{ fontSize: 32, fontWeight: 700, color: colors.accent }}>
                {integracion.tiempoRespuesta}s
              </div>
            </Card>

            <Card style={{ padding: 16 }}>
              <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
                Tasa de Éxito
              </h4>
              <div style={{ marginBottom: 8 }}>
                <div style={{ 
                  height: 8, 
                  backgroundColor: colors.gray200, 
                  borderRadius: 4,
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${(integracion.sincronizaciones.exitosas / (integracion.sincronizaciones.exitosas + integracion.sincronizaciones.fallidas)) * 100}%`,
                    backgroundColor: colors.success
                  }} />
                </div>
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: colors.success }}>
                {((integracion.sincronizaciones.exitosas / (integracion.sincronizaciones.exitosas + integracion.sincronizaciones.fallidas)) * 100).toFixed(2)}%
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

// Modal Nueva Integración
const ModalIntegracion = ({ onClose, onSave }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 32,
        maxWidth: 500,
        textAlign: 'center'
      }}>
        <Link size={48} color={colors.primary} style={{ marginBottom: 16 }} />
        <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>
          Nueva Integración
        </h3>
        <p style={{ color: colors.gray600, marginBottom: 24 }}>
          Funcionalidad de nueva integración en desarrollo
        </p>
        <Button variant="primary" onClick={onClose}>
          Cerrar
        </Button>
      </div>
    </div>
  );
};

// Componente auxiliar InfoRow
const InfoRow = ({ icon, label, value }) => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center',
    padding: '8px 0',
    borderBottom: `1px solid ${colors.gray200}`
  }}>
    <div style={{ color: colors.gray400, marginRight: 12 }}>
      {icon}
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 11, color: colors.gray500, marginBottom: 2 }}>
        {label}
      </div>
      <div style={{ fontSize: 13, fontWeight: 500, color: colors.gray800, wordBreak: 'break-all' }}>
        {value}
      </div>
    </div>
  </div>
);

export default Integracion;
