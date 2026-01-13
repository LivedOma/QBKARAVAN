import React, { useState } from 'react';
import { Package, RotateCcw, AlertTriangle, CheckCircle, XCircle, Clock, Camera, FileText, User, MapPin, Calendar, Search, Filter, DollarSign, TrendingUp, Tag } from 'lucide-react';
import { colors } from '../../shared/colors.js';
import { Card, Badge, Button } from '../../shared/SharedComponents.jsx';
import WebHeader from './WebHeader.jsx';

const Devoluciones = () => {
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [filtroMotivo, setFiltroMotivo] = useState('todos');
  const [tabActiva, setTabActiva] = useState('pendientes');
  const [modalDevolucion, setModalDevolucion] = useState(false);
  const [panelDetalles, setPanelDetalles] = useState(false);
  const [devolucionSeleccionada, setDevolucionSeleccionada] = useState(null);

  const devoluciones = [
    {
      id: 'DEV-001',
      fecha: '2024-01-10',
      cliente: 'Abarrotes Don José',
      clienteId: 'CLI-001',
      pedido: 'PED-1245',
      repartidor: 'Ana Martínez',
      zona: 'Norte',
      productos: [
        { codigo: 'PRO-001', nombre: 'Refresco Cola 600ml', cantidad: 12, precioUnitario: 30, motivo: 'Producto dañado', lote: 'LOT-2024-001' },
        { codigo: 'PRO-003', nombre: 'Galletas Choco 300g', cantidad: 5, precioUnitario: 30, motivo: 'Producto próximo a vencer', lote: 'LOT-2024-012' }
      ],
      totalProductos: 17,
      montoTotal: 510,
      motivo: 'Producto dañado',
      estado: 'Pendiente',
      prioridad: 'Alta',
      observaciones: 'Cliente reporta cajas mojadas, posible daño en transporte',
      evidencias: 2,
      notaCreditoId: null
    },
    {
      id: 'DEV-002',
      fecha: '2024-01-10',
      cliente: 'Mini Super El Sol',
      clienteId: 'CLI-002',
      pedido: 'PED-1238',
      repartidor: 'Carlos Ruiz',
      zona: 'Sur',
      productos: [
        { codigo: 'PRO-005', nombre: 'Jabón Líquido 500ml', cantidad: 8, precioUnitario: 35, motivo: 'Producto equivocado', lote: 'LOT-2024-025' }
      ],
      totalProductos: 8,
      montoTotal: 280,
      motivo: 'Producto equivocado',
      estado: 'Pendiente',
      prioridad: 'Media',
      observaciones: 'Cliente solicitó jabón de 1L, se entregó de 500ml',
      evidencias: 1,
      notaCreditoId: null
    },
    {
      id: 'DEV-003',
      fecha: '2024-01-09',
      cliente: 'Tienda La Esquina',
      clienteId: 'CLI-003',
      pedido: 'PED-1189',
      repartidor: 'Juan López',
      zona: 'Centro',
      productos: [
        { codigo: 'PRO-002', nombre: 'Agua Natural 1L', cantidad: 24, precioUnitario: 15, motivo: 'Exceso de inventario', lote: 'LOT-2024-008' }
      ],
      totalProductos: 24,
      montoTotal: 360,
      motivo: 'Exceso de inventario',
      estado: 'Aprobada',
      prioridad: 'Baja',
      observaciones: 'Cliente recibió doble pedido por error',
      evidencias: 1,
      notaCreditoId: 'NC-045',
      fechaAprobacion: '2024-01-09 14:30',
      aprobadoPor: 'Carlos Ramírez'
    },
    {
      id: 'DEV-004',
      fecha: '2024-01-09',
      cliente: 'Comercial Pérez',
      clienteId: 'CLI-004',
      pedido: 'PED-1156',
      repartidor: 'Ana Martínez',
      zona: 'Norte',
      productos: [
        { codigo: 'PRO-004', nombre: 'Pan Dulce Tradicional', cantidad: 15, precioUnitario: 25, motivo: 'Producto próximo a vencer', lote: 'LOT-2024-003' }
      ],
      totalProductos: 15,
      montoTotal: 375,
      motivo: 'Producto próximo a vencer',
      estado: 'Rechazada',
      prioridad: 'Media',
      observaciones: 'Producto dentro de fecha de caducidad válida',
      evidencias: 0,
      notaCreditoId: null,
      fechaRechazo: '2024-01-09 10:15',
      rechazadoPor: 'María González',
      motivoRechazo: 'Fecha de caducidad válida por 15 días más'
    },
    {
      id: 'DEV-005',
      fecha: '2024-01-08',
      cliente: 'Abarrotes Don José',
      clienteId: 'CLI-001',
      pedido: 'PED-1098',
      repartidor: 'Carlos Ruiz',
      zona: 'Norte',
      productos: [
        { codigo: 'PRO-001', nombre: 'Refresco Cola 600ml', cantidad: 6, precioUnitario: 30, motivo: 'Producto dañado', lote: 'LOT-2024-001' }
      ],
      totalProductos: 6,
      montoTotal: 180,
      motivo: 'Producto dañado',
      estado: 'Procesada',
      prioridad: 'Alta',
      observaciones: 'Botellas rotas durante transporte',
      evidencias: 3,
      notaCreditoId: 'NC-042',
      fechaAprobacion: '2024-01-08 11:00',
      aprobadoPor: 'Carlos Ramírez',
      fechaProcesamiento: '2024-01-08 15:30',
      procesadoPor: 'María González'
    }
  ];

  const estadisticas = {
    totalDevoluciones: devoluciones.length,
    devolucionesPendientes: devoluciones.filter(d => d.estado === 'Pendiente').length,
    devolucionesAprobadas: devoluciones.filter(d => d.estado === 'Aprobada').length,
    devolucionesRechazadas: devoluciones.filter(d => d.estado === 'Rechazada').length,
    devolucionesProcesadas: devoluciones.filter(d => d.estado === 'Procesada').length,
    montoTotal: devoluciones.reduce((sum, d) => sum + d.montoTotal, 0),
    montoPendiente: devoluciones.filter(d => d.estado === 'Pendiente').reduce((sum, d) => sum + d.montoTotal, 0),
    productosDevueltos: devoluciones.reduce((sum, d) => sum + d.totalProductos, 0)
  };

  const devolucionesFiltradas = devoluciones.filter(dev => {
    const matchBusqueda = dev.id.toLowerCase().includes(busqueda.toLowerCase()) ||
                         dev.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
                         dev.pedido.toLowerCase().includes(busqueda.toLowerCase());
    const matchEstado = filtroEstado === 'todos' || dev.estado === filtroEstado;
    const matchMotivo = filtroMotivo === 'todos' || dev.motivo === filtroMotivo;
    
    let matchTab = true;
    if (tabActiva === 'pendientes') matchTab = dev.estado === 'Pendiente';
    if (tabActiva === 'aprobadas') matchTab = dev.estado === 'Aprobada';
    if (tabActiva === 'rechazadas') matchTab = dev.estado === 'Rechazada';
    if (tabActiva === 'procesadas') matchTab = dev.estado === 'Procesada';
    
    return matchBusqueda && matchEstado && matchMotivo && matchTab;
  });

  const abrirModalNueva = () => {
    setDevolucionSeleccionada(null);
    setModalDevolucion(true);
  };

  const abrirDetalles = (devolucion) => {
    setDevolucionSeleccionada(devolucion);
    setPanelDetalles(true);
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: colors.gray50
    }}>
      <WebHeader 
        title="Gestión de Devoluciones"
        subtitle="Administra devoluciones de productos y genera notas de crédito"
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
                backgroundColor: colors.warning + '20',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <RotateCcw size={24} color={colors.warning} />
              </div>
              <div>
                <div style={{ fontSize: 13, color: colors.gray500, marginBottom: 4 }}>
                  Total Devoluciones
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: colors.gray800 }}>
                  {estadisticas.totalDevoluciones}
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
                backgroundColor: colors.danger + '20',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Clock size={24} color={colors.danger} />
              </div>
              <div>
                <div style={{ fontSize: 13, color: colors.gray500, marginBottom: 4 }}>
                  Pendientes
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: colors.gray800 }}>
                  {estadisticas.devolucionesPendientes}
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
                backgroundColor: colors.primary + '20',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Package size={24} color={colors.primary} />
              </div>
              <div>
                <div style={{ fontSize: 13, color: colors.gray500, marginBottom: 4 }}>
                  Productos Devueltos
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: colors.gray800 }}>
                  {estadisticas.productosDevueltos}
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
                <DollarSign size={24} color={colors.accent} />
              </div>
              <div>
                <div style={{ fontSize: 13, color: colors.gray500, marginBottom: 4 }}>
                  Monto Total
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: colors.gray800 }}>
                  ${estadisticas.montoTotal.toLocaleString()}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 8, borderBottom: `2px solid ${colors.gray200}` }}>
            {[
              { id: 'pendientes', label: 'Pendientes', count: estadisticas.devolucionesPendientes, icon: Clock },
              { id: 'aprobadas', label: 'Aprobadas', count: estadisticas.devolucionesAprobadas, icon: CheckCircle },
              { id: 'rechazadas', label: 'Rechazadas', count: estadisticas.devolucionesRechazadas, icon: XCircle },
              { id: 'procesadas', label: 'Procesadas', count: estadisticas.devolucionesProcesadas, icon: Package }
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
                <Badge color={tabActiva === tab.id ? 'primary' : 'gray'}>
                  {tab.count}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: panelDetalles ? '1fr 500px' : '1fr', gap: 24 }}>
          {/* Lista de Devoluciones */}
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
                    placeholder="Buscar por ID, cliente o pedido..."
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
                  value={filtroMotivo}
                  onChange={(e) => setFiltroMotivo(e.target.value)}
                  style={{
                    padding: '10px 12px',
                    border: `1px solid ${colors.gray300}`,
                    borderRadius: 8,
                    fontSize: 14,
                    backgroundColor: 'white',
                    minWidth: 200
                  }}
                >
                  <option value="todos">Todos los motivos</option>
                  <option value="Producto dañado">Producto dañado</option>
                  <option value="Producto equivocado">Producto equivocado</option>
                  <option value="Producto próximo a vencer">Próximo a vencer</option>
                  <option value="Exceso de inventario">Exceso de inventario</option>
                </select>

                <Button variant="primary" icon={<RotateCcw size={18} />} onClick={abrirModalNueva}>
                  Nueva Devolución
                </Button>
              </div>
            </Card>

            <Card>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${colors.gray200}`, backgroundColor: colors.gray50 }}>
                    <th style={{ padding: 12, textAlign: 'left', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>
                      ID / Fecha
                    </th>
                    <th style={{ padding: 12, textAlign: 'left', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>
                      Cliente / Pedido
                    </th>
                    <th style={{ padding: 12, textAlign: 'left', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>
                      Motivo
                    </th>
                    <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>
                      Productos
                    </th>
                    <th style={{ padding: 12, textAlign: 'right', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>
                      Monto
                    </th>
                    <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>
                      Prioridad
                    </th>
                    <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>
                      Evidencias
                    </th>
                    <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {devolucionesFiltradas.map(dev => (
                    <tr 
                      key={dev.id} 
                      style={{ 
                        borderBottom: `1px solid ${colors.gray100}`,
                        cursor: 'pointer'
                      }}
                      onClick={() => abrirDetalles(dev)}
                    >
                      <td style={{ padding: 12 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray800, marginBottom: 2 }}>
                          {dev.id}
                        </div>
                        <div style={{ fontSize: 12, color: colors.gray500 }}>
                          {dev.fecha}
                        </div>
                      </td>
                      <td style={{ padding: 12 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray800, marginBottom: 2 }}>
                          {dev.cliente}
                        </div>
                        <div style={{ fontSize: 12, color: colors.gray500 }}>
                          Pedido: {dev.pedido} • {dev.zona}
                        </div>
                      </td>
                      <td style={{ padding: 12 }}>
                        <div style={{ fontSize: 13, color: colors.gray700 }}>
                          {dev.motivo}
                        </div>
                        <div style={{ fontSize: 12, color: colors.gray500 }}>
                          {dev.repartidor}
                        </div>
                      </td>
                      <td style={{ padding: 12, textAlign: 'center', fontSize: 16, fontWeight: 700, color: colors.primary }}>
                        {dev.totalProductos}
                      </td>
                      <td style={{ padding: 12, textAlign: 'right', fontSize: 15, fontWeight: 700, color: colors.danger }}>
                        ${dev.montoTotal.toLocaleString()}
                      </td>
                      <td style={{ padding: 12, textAlign: 'center' }}>
                        <Badge color={
                          dev.prioridad === 'Alta' ? 'danger' :
                          dev.prioridad === 'Media' ? 'warning' : 'success'
                        }>
                          {dev.prioridad}
                        </Badge>
                      </td>
                      <td style={{ padding: 12, textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                          <Camera size={16} color={dev.evidencias > 0 ? colors.success : colors.gray300} />
                          <span style={{ fontSize: 13, fontWeight: 600, color: dev.evidencias > 0 ? colors.success : colors.gray400 }}>
                            {dev.evidencias}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: 12, textAlign: 'center' }}>
                        {dev.estado === 'Pendiente' ? (
                          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log('Aprobar:', dev.id);
                              }}
                              style={{
                                padding: '6px 12px',
                                border: 'none',
                                backgroundColor: colors.success,
                                color: 'white',
                                borderRadius: 6,
                                cursor: 'pointer',
                                fontSize: 12,
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 4
                              }}
                            >
                              <CheckCircle size={14} />
                              Aprobar
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log('Rechazar:', dev.id);
                              }}
                              style={{
                                padding: '6px 12px',
                                border: 'none',
                                backgroundColor: colors.danger,
                                color: 'white',
                                borderRadius: 6,
                                cursor: 'pointer',
                                fontSize: 12,
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 4
                              }}
                            >
                              <XCircle size={14} />
                              Rechazar
                            </button>
                          </div>
                        ) : dev.estado === 'Aprobada' ? (
                          <Button 
                            variant="primary" 
                            style={{ fontSize: 12, padding: '6px 12px' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('Procesar:', dev.id);
                            }}
                          >
                            Procesar
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            style={{ fontSize: 12, padding: '6px 12px' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              abrirDetalles(dev);
                            }}
                          >
                            Ver
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {devolucionesFiltradas.length === 0 && (
                <div style={{ 
                  textAlign: 'center', 
                  padding: 40,
                  color: colors.gray400 
                }}>
                  <RotateCcw size={48} style={{ marginBottom: 12 }} />
                  <div style={{ fontSize: 16, fontWeight: 500 }}>
                    No se encontraron devoluciones
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Panel de Detalles */}
          {panelDetalles && devolucionSeleccionada && (
            <PanelDetallesDevolucion
              devolucion={devolucionSeleccionada}
              onClose={() => setPanelDetalles(false)}
            />
          )}
        </div>
      </div>

      {/* Modal Nueva Devolución */}
      {modalDevolucion && (
        <ModalDevolucion
          onClose={() => setModalDevolucion(false)}
          onSave={(datos) => {
            console.log('Guardar devolución:', datos);
            setModalDevolucion(false);
          }}
        />
      )}
    </div>
  );
};

// Modal para Nueva Devolución
const ModalDevolucion = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    pedido: '',
    cliente: '',
    productos: [],
    motivo: 'Producto dañado',
    observaciones: '',
    prioridad: 'Media'
  });

  const [productoActual, setProductoActual] = useState({
    codigo: '',
    nombre: '',
    cantidad: 1,
    motivo: 'Producto dañado'
  });

  const agregarProducto = () => {
    if (productoActual.codigo && productoActual.nombre) {
      setFormData({
        ...formData,
        productos: [...formData.productos, { ...productoActual, id: Date.now() }]
      });
      setProductoActual({
        codigo: '',
        nombre: '',
        cantidad: 1,
        motivo: 'Producto dañado'
      });
    }
  };

  const eliminarProducto = (id) => {
    setFormData({
      ...formData,
      productos: formData.productos.filter(p => p.id !== id)
    });
  };

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
      zIndex: 1000,
      padding: 20
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: 12,
        width: '100%',
        maxWidth: 800,
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        {/* Header */}
        <div style={{
          padding: 24,
          borderBottom: `1px solid ${colors.gray200}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>
            Nueva Devolución
          </h2>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 24 }}>
            ×
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: 24 }}>
          {/* Información del Pedido */}
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: colors.gray700 }}>
              Información del Pedido
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: colors.gray700 }}>
                  ID Pedido *
                </label>
                <input
                  type="text"
                  value={formData.pedido}
                  onChange={(e) => setFormData({ ...formData, pedido: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `1px solid ${colors.gray300}`,
                    borderRadius: 8,
                    fontSize: 14
                  }}
                  placeholder="PED-XXXX"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: colors.gray700 }}>
                  Cliente *
                </label>
                <input
                  type="text"
                  value={formData.cliente}
                  onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `1px solid ${colors.gray300}`,
                    borderRadius: 8,
                    fontSize: 14
                  }}
                  placeholder="Nombre del cliente"
                />
              </div>
            </div>
          </div>

          {/* Agregar Productos */}
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: colors.gray700 }}>
              Productos a Devolver
            </h3>
            
            <div style={{ 
              padding: 16, 
              backgroundColor: colors.gray50, 
              borderRadius: 8,
              marginBottom: 16
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr 1fr 2fr auto', gap: 12, alignItems: 'end' }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 500, marginBottom: 6, color: colors.gray700 }}>
                    Código
                  </label>
                  <input
                    type="text"
                    value={productoActual.codigo}
                    onChange={(e) => setProductoActual({ ...productoActual, codigo: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      border: `1px solid ${colors.gray300}`,
                      borderRadius: 6,
                      fontSize: 13
                    }}
                    placeholder="PRO-XXX"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 500, marginBottom: 6, color: colors.gray700 }}>
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={productoActual.nombre}
                    onChange={(e) => setProductoActual({ ...productoActual, nombre: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      border: `1px solid ${colors.gray300}`,
                      borderRadius: 6,
                      fontSize: 13
                    }}
                    placeholder="Nombre del producto"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 500, marginBottom: 6, color: colors.gray700 }}>
                    Cantidad
                  </label>
                  <input
                    type="number"
                    value={productoActual.cantidad}
                    onChange={(e) => setProductoActual({ ...productoActual, cantidad: parseInt(e.target.value) })}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      border: `1px solid ${colors.gray300}`,
                      borderRadius: 6,
                      fontSize: 13
                    }}
                    min="1"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 500, marginBottom: 6, color: colors.gray700 }}>
                    Motivo
                  </label>
                  <select
                    value={productoActual.motivo}
                    onChange={(e) => setProductoActual({ ...productoActual, motivo: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      border: `1px solid ${colors.gray300}`,
                      borderRadius: 6,
                      fontSize: 13,
                      backgroundColor: 'white'
                    }}
                  >
                    <option value="Producto dañado">Producto dañado</option>
                    <option value="Producto equivocado">Producto equivocado</option>
                    <option value="Producto próximo a vencer">Próximo a vencer</option>
                    <option value="Exceso de inventario">Exceso de inventario</option>
                  </select>
                </div>

                <Button 
                  variant="primary" 
                  onClick={agregarProducto}
                  style={{ padding: '8px 16px', fontSize: 13 }}
                >
                  Agregar
                </Button>
              </div>
            </div>

            {/* Lista de Productos */}
            {formData.productos.length > 0 && (
              <div style={{ border: `1px solid ${colors.gray200}`, borderRadius: 8, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: colors.gray50 }}>
                      <th style={{ padding: 10, textAlign: 'left', fontSize: 12, fontWeight: 600, color: colors.gray600 }}>Código</th>
                      <th style={{ padding: 10, textAlign: 'left', fontSize: 12, fontWeight: 600, color: colors.gray600 }}>Producto</th>
                      <th style={{ padding: 10, textAlign: 'center', fontSize: 12, fontWeight: 600, color: colors.gray600 }}>Cantidad</th>
                      <th style={{ padding: 10, textAlign: 'left', fontSize: 12, fontWeight: 600, color: colors.gray600 }}>Motivo</th>
                      <th style={{ padding: 10, textAlign: 'center', fontSize: 12, fontWeight: 600, color: colors.gray600 }}>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.productos.map(prod => (
                      <tr key={prod.id} style={{ borderTop: `1px solid ${colors.gray100}` }}>
                        <td style={{ padding: 10, fontSize: 13, fontFamily: 'monospace' }}>{prod.codigo}</td>
                        <td style={{ padding: 10, fontSize: 13 }}>{prod.nombre}</td>
                        <td style={{ padding: 10, textAlign: 'center', fontSize: 14, fontWeight: 600 }}>{prod.cantidad}</td>
                        <td style={{ padding: 10, fontSize: 12 }}>
                          <Badge color="warning">{prod.motivo}</Badge>
                        </td>
                        <td style={{ padding: 10, textAlign: 'center' }}>
                          <button
                            onClick={() => eliminarProducto(prod.id)}
                            style={{
                              padding: 4,
                              border: 'none',
                              backgroundColor: colors.danger + '20',
                              color: colors.danger,
                              borderRadius: 4,
                              cursor: 'pointer'
                            }}
                          >
                            <XCircle size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Detalles Adicionales */}
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: colors.gray700 }}>
              Detalles Adicionales
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: colors.gray700 }}>
                  Prioridad
                </label>
                <select
                  value={formData.prioridad}
                  onChange={(e) => setFormData({ ...formData, prioridad: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `1px solid ${colors.gray300}`,
                    borderRadius: 8,
                    fontSize: 14,
                    backgroundColor: 'white'
                  }}
                >
                  <option value="Alta">Alta</option>
                  <option value="Media">Media</option>
                  <option value="Baja">Baja</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: colors.gray700 }}>
                  Observaciones
                </label>
                <textarea
                  value={formData.observaciones}
                  onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `1px solid ${colors.gray300}`,
                    borderRadius: 8,
                    fontSize: 14,
                    resize: 'vertical',
                    minHeight: 80,
                    fontFamily: 'inherit'
                  }}
                  placeholder="Describe los detalles de la devolución..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: 24,
          borderTop: `1px solid ${colors.gray200}`,
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 12
        }}>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button 
            variant="primary" 
            onClick={() => onSave(formData)}
            icon={<RotateCcw size={18} />}
          >
            Registrar Devolución
          </Button>
        </div>
      </div>
    </div>
  );
};

// Panel de Detalles de Devolución
const PanelDetallesDevolucion = ({ devolucion, onClose }) => {
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
            {devolucion.id}
          </h3>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <Badge color={
              devolucion.estado === 'Pendiente' ? 'warning' :
              devolucion.estado === 'Aprobada' ? 'success' :
              devolucion.estado === 'Rechazada' ? 'danger' : 'primary'
            }>
              {devolucion.estado}
            </Badge>
            <Badge color={
              devolucion.prioridad === 'Alta' ? 'danger' :
              devolucion.prioridad === 'Media' ? 'warning' : 'success'
            }>
              {devolucion.prioridad}
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

      {/* Contenido */}
      <div style={{ padding: 20, maxHeight: 600, overflowY: 'auto' }}>
        {/* Información General */}
        <Card style={{ padding: 16, backgroundColor: colors.gray50, marginBottom: 16 }}>
          <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: colors.gray700 }}>
            Información General
          </h4>
          <InfoRow label="Fecha" value={devolucion.fecha} />
          <InfoRow label="Cliente" value={devolucion.cliente} />
          <InfoRow label="Pedido" value={devolucion.pedido} />
          <InfoRow label="Repartidor" value={devolucion.repartidor} />
          <InfoRow label="Zona" value={devolucion.zona} />
        </Card>

        {/* Productos */}
        <Card style={{ padding: 16, marginBottom: 16 }}>
          <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: colors.gray700 }}>
            Productos ({devolucion.productos.length})
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {devolucion.productos.map((prod, idx) => (
              <div 
                key={idx}
                style={{
                  padding: 12,
                  backgroundColor: colors.gray50,
                  borderRadius: 8,
                  borderLeft: `3px solid ${colors.primary}`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, fontFamily: 'monospace' }}>
                    {prod.codigo}
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: colors.primary }}>
                    {prod.cantidad} uds
                  </span>
                </div>
                <div style={{ fontSize: 13, color: colors.gray700, marginBottom: 4 }}>
                  {prod.nombre}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Badge color="warning" style={{ fontSize: 11 }}>
                    {prod.motivo}
                  </Badge>
                  <span style={{ fontSize: 13, fontWeight: 600, color: colors.danger }}>
                    ${(prod.cantidad * prod.precioUnitario).toLocaleString()}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: colors.gray500, marginTop: 4 }}>
                  Lote: {prod.lote}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Resumen Financiero */}
        <Card style={{ padding: 16, backgroundColor: colors.danger + '10', marginBottom: 16 }}>
          <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: colors.danger }}>
            Resumen Financiero
          </h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: colors.gray600 }}>Monto Total</span>
            <span style={{ fontSize: 24, fontWeight: 700, color: colors.danger }}>
              ${devolucion.montoTotal.toLocaleString()}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <span style={{ fontSize: 12, color: colors.gray600 }}>Total Productos</span>
            <span style={{ fontSize: 14, fontWeight: 600 }}>{devolucion.totalProductos} unidades</span>
          </div>
          {devolucion.notaCreditoId && (
            <div style={{ 
              marginTop: 12, 
              paddingTop: 12, 
              borderTop: `1px solid ${colors.danger}20`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: 12, color: colors.gray600 }}>Nota de Crédito</span>
              <Badge color="success">
                {devolucion.notaCreditoId}
              </Badge>
            </div>
          )}
        </Card>

        {/* Motivo y Observaciones */}
        <Card style={{ padding: 16, marginBottom: 16 }}>
          <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: colors.gray700 }}>
            Motivo Principal
          </h4>
          <Badge color="warning" style={{ marginBottom: 12 }}>
            {devolucion.motivo}
          </Badge>
          {devolucion.observaciones && (
            <>
              <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, marginTop: 16, color: colors.gray700 }}>
                Observaciones
              </h4>
              <p style={{ fontSize: 13, color: colors.gray600, lineHeight: 1.6, margin: 0 }}>
                {devolucion.observaciones}
              </p>
            </>
          )}
        </Card>

        {/* Evidencias */}
        <Card style={{ padding: 16, marginBottom: 16 }}>
          <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: colors.gray700, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Camera size={16} />
            Evidencias ({devolucion.evidencias})
          </h4>
          {devolucion.evidencias > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
              {[...Array(devolucion.evidencias)].map((_, idx) => (
                <div
                  key={idx}
                  style={{
                    height: 100,
                    backgroundColor: colors.gray200,
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: colors.gray500,
                    fontSize: 12
                  }}
                >
                  <Camera size={24} />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: 20, color: colors.gray400 }}>
              <Camera size={32} style={{ marginBottom: 8 }} />
              <div style={{ fontSize: 13 }}>Sin evidencias</div>
            </div>
          )}
        </Card>

        {/* Historial de Acciones */}
        {(devolucion.estado === 'Aprobada' || devolucion.estado === 'Rechazada' || devolucion.estado === 'Procesada') && (
          <Card style={{ padding: 16 }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: colors.gray700 }}>
              Historial
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {devolucion.fechaAprobacion && (
                <div style={{ fontSize: 12, color: colors.gray600 }}>
                  <div style={{ fontWeight: 600, color: colors.success, marginBottom: 2 }}>
                    ✓ Aprobada
                  </div>
                  <div>{devolucion.fechaAprobacion}</div>
                  <div>Por: {devolucion.aprobadoPor}</div>
                </div>
              )}
              {devolucion.fechaRechazo && (
                <div style={{ fontSize: 12, color: colors.gray600 }}>
                  <div style={{ fontWeight: 600, color: colors.danger, marginBottom: 2 }}>
                    ✗ Rechazada
                  </div>
                  <div>{devolucion.fechaRechazo}</div>
                  <div>Por: {devolucion.rechazadoPor}</div>
                  {devolucion.motivoRechazo && (
                    <div style={{ marginTop: 4, fontStyle: 'italic' }}>
                      Motivo: {devolucion.motivoRechazo}
                    </div>
                  )}
                </div>
              )}
              {devolucion.fechaProcesamiento && (
                <div style={{ fontSize: 12, color: colors.gray600 }}>
                  <div style={{ fontWeight: 600, color: colors.primary, marginBottom: 2 }}>
                    ⚙ Procesada
                  </div>
                  <div>{devolucion.fechaProcesamiento}</div>
                  <div>Por: {devolucion.procesadoPor}</div>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

// Componente auxiliar InfoRow
const InfoRow = ({ label, value }) => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'space-between',
    padding: '6px 0',
    borderBottom: `1px solid ${colors.gray200}`
  }}>
    <span style={{ fontSize: 12, color: colors.gray500 }}>{label}</span>
    <span style={{ fontSize: 13, fontWeight: 600, color: colors.gray800 }}>{value}</span>
  </div>
);

export default Devoluciones;
