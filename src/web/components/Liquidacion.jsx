import React, { useState } from 'react';
import { DollarSign, Truck, CheckCircle, Clock, AlertTriangle, XCircle, Calculator, FileText, TrendingUp, CreditCard, Banknote, Wallet, Package, RotateCcw, Calendar, User, MapPin, Search } from 'lucide-react';
import { colors } from '../../shared/colors.js';
import { Card, Badge, Button } from '../../shared/SharedComponents.jsx';
import WebHeader from './WebHeader.jsx';

const Liquidacion = () => {
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [filtroRuta, setFiltroRuta] = useState('todas');
  const [tabActiva, setTabActiva] = useState('pendientes');
  const [modalLiquidacion, setModalLiquidacion] = useState(false);
  const [panelDetalles, setPanelDetalles] = useState(false);
  const [liquidacionSeleccionada, setLiquidacionSeleccionada] = useState(null);

  const liquidaciones = [
    {
      id: 'LIQ-089',
      fecha: '2024-01-10',
      ruta: 'Norte-01',
      repartidor: 'Ana Martínez',
      repartidorId: 'USR-004',
      turno: 'Matutino',
      horaInicio: '07:00',
      horaFin: '15:30',
      estado: 'Pendiente',
      // Ventas
      pedidosEntregados: 28,
      pedidosCancelados: 2,
      totalVentas: 15280,
      ventasEfectivo: 8450,
      ventasTransferencia: 5830,
      ventasCheque: 1000,
      // Cobros
      cobrosEfectivo: 3200,
      cobrosTransferencia: 1500,
      cobrosCheque: 800,
      totalCobros: 5500,
      // Gastos
      gastos: [
        { concepto: 'Gasolina', monto: 450, comprobante: 'GAS-001' },
        { concepto: 'Casetas', monto: 120, comprobante: 'CAS-002' }
      ],
      totalGastos: 570,
      // Devoluciones
      devoluciones: 1,
      montoDevoluciones: 510,
      // Efectivo esperado vs real
      efectivoEsperado: 11650, // ventasEfectivo + cobrosEfectivo - gastos
      efectivoEntregado: 11650,
      diferencia: 0,
      // Documentación
      vales: 2,
      cheques: 3,
      comprobantes: 2,
      observaciones: null
    },
    {
      id: 'LIQ-088',
      fecha: '2024-01-10',
      ruta: 'Sur-02',
      repartidor: 'Carlos Ruiz',
      repartidorId: 'USR-007',
      turno: 'Matutino',
      horaInicio: '07:30',
      horaFin: '16:00',
      estado: 'Pendiente',
      pedidosEntregados: 32,
      pedidosCancelados: 1,
      totalVentas: 18450,
      ventasEfectivo: 10250,
      ventasTransferencia: 6200,
      ventasCheque: 2000,
      cobrosEfectivo: 2800,
      cobrosTransferencia: 1200,
      cobrosCheque: 500,
      totalCobros: 4500,
      gastos: [
        { concepto: 'Gasolina', monto: 520, comprobante: 'GAS-003' },
        { concepto: 'Casetas', monto: 85, comprobante: 'CAS-004' },
        { concepto: 'Estacionamiento', monto: 50, comprobante: 'EST-001' }
      ],
      totalGastos: 655,
      devoluciones: 1,
      montoDevoluciones: 280,
      efectivoEsperado: 12395,
      efectivoEntregado: 12300,
      diferencia: -95, // faltante
      vales: 1,
      cheques: 4,
      comprobantes: 3,
      observaciones: 'Cliente ABC reportó billete falso de $100'
    },
    {
      id: 'LIQ-087',
      fecha: '2024-01-09',
      ruta: 'Centro-03',
      repartidor: 'Juan López',
      repartidorId: 'USR-008',
      turno: 'Matutino',
      horaInicio: '07:00',
      horaFin: '14:45',
      estado: 'Revisión',
      pedidosEntregados: 25,
      pedidosCancelados: 0,
      totalVentas: 12890,
      ventasEfectivo: 7250,
      ventasTransferencia: 4640,
      ventasCheque: 1000,
      cobrosEfectivo: 2100,
      cobrosTransferencia: 950,
      cobrosCheque: 0,
      totalCobros: 3050,
      gastos: [
        { concepto: 'Gasolina', monto: 480, comprobante: 'GAS-005' }
      ],
      totalGastos: 480,
      devoluciones: 0,
      montoDevoluciones: 0,
      efectivoEsperado: 8870,
      efectivoEntregado: 8920,
      diferencia: 50, // sobrante
      vales: 0,
      cheques: 2,
      comprobantes: 1,
      observaciones: 'Sobrante por redondeo de vueltos',
      revisadoPor: 'María González',
      fechaRevision: '2024-01-09 16:30'
    },
    {
      id: 'LIQ-086',
      fecha: '2024-01-09',
      ruta: 'Oriente-01',
      repartidor: 'Luis Torres',
      repartidorId: 'USR-009',
      turno: 'Matutino',
      horaInicio: '06:45',
      horaFin: '15:15',
      estado: 'Aprobada',
      pedidosEntregados: 22,
      pedidosCancelados: 1,
      totalVentas: 11230,
      ventasEfectivo: 6450,
      ventasTransferencia: 3780,
      ventasCheque: 1000,
      cobrosEfectivo: 1850,
      cobrosTransferencia: 720,
      cobrosCheque: 0,
      totalCobros: 2570,
      gastos: [
        { concepto: 'Gasolina', monto: 410, comprobante: 'GAS-006' },
        { concepto: 'Casetas', monto: 95, comprobante: 'CAS-007' }
      ],
      totalGastos: 505,
      devoluciones: 0,
      montoDevoluciones: 0,
      efectivoEsperado: 7795,
      efectivoEntregado: 7795,
      diferencia: 0,
      vales: 0,
      cheques: 2,
      comprobantes: 2,
      observaciones: null,
      revisadoPor: 'María González',
      fechaRevision: '2024-01-09 17:00',
      aprobadoPor: 'Carlos Ramírez',
      fechaAprobacion: '2024-01-09 17:30'
    },
    {
      id: 'LIQ-085',
      fecha: '2024-01-08',
      ruta: 'Norte-01',
      repartidor: 'Ana Martínez',
      repartidorId: 'USR-004',
      turno: 'Matutino',
      horaInicio: '07:00',
      horaFin: '15:45',
      estado: 'Cerrada',
      pedidosEntregados: 26,
      pedidosCancelados: 1,
      totalVentas: 14150,
      ventasEfectivo: 7850,
      ventasTransferencia: 5300,
      ventasCheque: 1000,
      cobrosEfectivo: 2950,
      cobrosTransferencia: 1100,
      cobrosCheque: 500,
      totalCobros: 4550,
      gastos: [
        { concepto: 'Gasolina', monto: 460, comprobante: 'GAS-008' },
        { concepto: 'Casetas', monto: 110, comprobante: 'CAS-009' }
      ],
      totalGastos: 570,
      devoluciones: 1,
      montoDevoluciones: 180,
      efectivoEsperado: 10230,
      efectivoEntregado: 10230,
      diferencia: 0,
      vales: 1,
      cheques: 3,
      comprobantes: 2,
      observaciones: null,
      revisadoPor: 'María González',
      fechaRevision: '2024-01-08 16:30',
      aprobadoPor: 'Carlos Ramírez',
      fechaAprobacion: '2024-01-08 17:00',
      cerradoPor: 'Laura Torres',
      fechaCierre: '2024-01-08 18:00'
    }
  ];

  const estadisticas = {
    totalLiquidaciones: liquidaciones.length,
    liquidacionesPendientes: liquidaciones.filter(l => l.estado === 'Pendiente').length,
    liquidacionesRevision: liquidaciones.filter(l => l.estado === 'Revisión').length,
    liquidacionesAprobadas: liquidaciones.filter(l => l.estado === 'Aprobada').length,
    liquidacionesCerradas: liquidaciones.filter(l => l.estado === 'Cerrada').length,
    totalVentas: liquidaciones.reduce((sum, l) => sum + l.totalVentas, 0),
    totalEfectivo: liquidaciones.reduce((sum, l) => sum + l.efectivoEntregado, 0),
    diferenciaTotal: liquidaciones.reduce((sum, l) => sum + l.diferencia, 0),
    totalGastos: liquidaciones.reduce((sum, l) => sum + l.totalGastos, 0)
  };

  const liquidacionesFiltradas = liquidaciones.filter(liq => {
    const matchBusqueda = liq.id.toLowerCase().includes(busqueda.toLowerCase()) ||
                         liq.repartidor.toLowerCase().includes(busqueda.toLowerCase()) ||
                         liq.ruta.toLowerCase().includes(busqueda.toLowerCase());
    const matchEstado = filtroEstado === 'todos' || liq.estado === filtroEstado;
    const matchRuta = filtroRuta === 'todas' || liq.ruta.includes(filtroRuta);
    
    let matchTab = true;
    if (tabActiva === 'pendientes') matchTab = liq.estado === 'Pendiente';
    if (tabActiva === 'revision') matchTab = liq.estado === 'Revisión';
    if (tabActiva === 'aprobadas') matchTab = liq.estado === 'Aprobada';
    if (tabActiva === 'cerradas') matchTab = liq.estado === 'Cerrada';
    
    return matchBusqueda && matchEstado && matchRuta && matchTab;
  });

  const abrirModalNueva = () => {
    setLiquidacionSeleccionada(null);
    setModalLiquidacion(true);
  };

  const abrirDetalles = (liquidacion) => {
    setLiquidacionSeleccionada(liquidacion);
    setPanelDetalles(true);
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: colors.gray50
    }}>
      <WebHeader 
        title="Liquidación de Rutas"
        subtitle="Gestiona el cierre y liquidación de rutas de reparto"
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
                <Calculator size={24} color={colors.primary} />
              </div>
              <div>
                <div style={{ fontSize: 13, color: colors.gray500, marginBottom: 4 }}>
                  Total Liquidaciones
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: colors.gray800 }}>
                  {estadisticas.totalLiquidaciones}
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
                <Clock size={24} color={colors.warning} />
              </div>
              <div>
                <div style={{ fontSize: 13, color: colors.gray500, marginBottom: 4 }}>
                  Pendientes
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: colors.gray800 }}>
                  {estadisticas.liquidacionesPendientes}
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
                <Banknote size={24} color={colors.success} />
              </div>
              <div>
                <div style={{ fontSize: 13, color: colors.gray500, marginBottom: 4 }}>
                  Total Efectivo
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: colors.gray800 }}>
                  ${(estadisticas.totalEfectivo / 1000).toFixed(1)}K
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
                backgroundColor: estadisticas.diferenciaTotal === 0 ? colors.success + '20' : colors.danger + '20',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {estadisticas.diferenciaTotal === 0 ? (
                  <CheckCircle size={24} color={colors.success} />
                ) : (
                  <AlertTriangle size={24} color={colors.danger} />
                )}
              </div>
              <div>
                <div style={{ fontSize: 13, color: colors.gray500, marginBottom: 4 }}>
                  Diferencias
                </div>
                <div style={{ 
                  fontSize: 28, 
                  fontWeight: 700, 
                  color: estadisticas.diferenciaTotal === 0 ? colors.success : colors.danger
                }}>
                  ${Math.abs(estadisticas.diferenciaTotal)}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 8, borderBottom: `2px solid ${colors.gray200}` }}>
            {[
              { id: 'pendientes', label: 'Pendientes', count: estadisticas.liquidacionesPendientes, icon: Clock },
              { id: 'revision', label: 'En Revisión', count: estadisticas.liquidacionesRevision, icon: AlertTriangle },
              { id: 'aprobadas', label: 'Aprobadas', count: estadisticas.liquidacionesAprobadas, icon: CheckCircle },
              { id: 'cerradas', label: 'Cerradas', count: estadisticas.liquidacionesCerradas, icon: FileText }
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

        <div style={{ display: 'grid', gridTemplateColumns: panelDetalles ? '1fr 650px' : '1fr', gap: 24 }}>
          {/* Lista de Liquidaciones */}
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
                    placeholder="Buscar por ID, repartidor o ruta..."
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
                  value={filtroRuta}
                  onChange={(e) => setFiltroRuta(e.target.value)}
                  style={{
                    padding: '10px 12px',
                    border: `1px solid ${colors.gray300}`,
                    borderRadius: 8,
                    fontSize: 14,
                    backgroundColor: 'white',
                    minWidth: 150
                  }}
                >
                  <option value="todas">Todas las rutas</option>
                  <option value="Norte">Norte</option>
                  <option value="Sur">Sur</option>
                  <option value="Centro">Centro</option>
                  <option value="Oriente">Oriente</option>
                </select>

                <Button variant="primary" icon={<Calculator size={18} />} onClick={abrirModalNueva}>
                  Nueva Liquidación
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
                      Ruta / Repartidor
                    </th>
                    <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>
                      Pedidos
                    </th>
                    <th style={{ padding: 12, textAlign: 'right', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>
                      Total Ventas
                    </th>
                    <th style={{ padding: 12, textAlign: 'right', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>
                      Efectivo
                    </th>
                    <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>
                      Diferencia
                    </th>
                    <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>
                      Estado
                    </th>
                    <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {liquidacionesFiltradas.map(liq => (
                    <tr 
                      key={liq.id} 
                      style={{ 
                        borderBottom: `1px solid ${colors.gray100}`,
                        cursor: 'pointer'
                      }}
                      onClick={() => abrirDetalles(liq)}
                    >
                      <td style={{ padding: 12 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray800, marginBottom: 2 }}>
                          {liq.id}
                        </div>
                        <div style={{ fontSize: 12, color: colors.gray500 }}>
                          {liq.fecha}
                        </div>
                        <div style={{ fontSize: 11, color: colors.gray400 }}>
                          {liq.horaInicio} - {liq.horaFin}
                        </div>
                      </td>
                      <td style={{ padding: 12 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray800, marginBottom: 2 }}>
                          {liq.ruta}
                        </div>
                        <div style={{ fontSize: 12, color: colors.gray500 }}>
                          {liq.repartidor}
                        </div>
                      </td>
                      <td style={{ padding: 12, textAlign: 'center' }}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: colors.success, marginBottom: 2 }}>
                          {liq.pedidosEntregados}
                        </div>
                        {liq.pedidosCancelados > 0 && (
                          <div style={{ fontSize: 11, color: colors.danger }}>
                            {liq.pedidosCancelados} cancelados
                          </div>
                        )}
                      </td>
                      <td style={{ padding: 12, textAlign: 'right', fontSize: 15, fontWeight: 700, color: colors.primary }}>
                        ${liq.totalVentas.toLocaleString()}
                      </td>
                      <td style={{ padding: 12, textAlign: 'right', fontSize: 15, fontWeight: 700, color: colors.success }}>
                        ${liq.efectivoEntregado.toLocaleString()}
                      </td>
                      <td style={{ padding: 12, textAlign: 'center' }}>
                        {liq.diferencia === 0 ? (
                          <Badge color="success">
                            Cuadrado
                          </Badge>
                        ) : (
                          <Badge color="danger">
                            {liq.diferencia > 0 ? '+' : ''}{liq.diferencia}
                          </Badge>
                        )}
                      </td>
                      <td style={{ padding: 12, textAlign: 'center' }}>
                        <Badge color={
                          liq.estado === 'Pendiente' ? 'warning' :
                          liq.estado === 'Revisión' ? 'accent' :
                          liq.estado === 'Aprobada' ? 'primary' : 'success'
                        }>
                          {liq.estado}
                        </Badge>
                      </td>
                      <td style={{ padding: 12, textAlign: 'center' }}>
                        {liq.estado === 'Pendiente' ? (
                          <Button 
                            variant="primary" 
                            style={{ fontSize: 12, padding: '6px 12px' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('Revisar:', liq.id);
                            }}
                          >
                            Revisar
                          </Button>
                        ) : liq.estado === 'Revisión' ? (
                          <Button 
                            variant="success" 
                            style={{ fontSize: 12, padding: '6px 12px' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('Aprobar:', liq.id);
                            }}
                          >
                            Aprobar
                          </Button>
                        ) : liq.estado === 'Aprobada' ? (
                          <Button 
                            variant="accent" 
                            style={{ fontSize: 12, padding: '6px 12px' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('Cerrar:', liq.id);
                            }}
                          >
                            Cerrar
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            style={{ fontSize: 12, padding: '6px 12px' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              abrirDetalles(liq);
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

              {liquidacionesFiltradas.length === 0 && (
                <div style={{ 
                  textAlign: 'center', 
                  padding: 40,
                  color: colors.gray400 
                }}>
                  <Calculator size={48} style={{ marginBottom: 12 }} />
                  <div style={{ fontSize: 16, fontWeight: 500 }}>
                    No se encontraron liquidaciones
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Panel de Detalles */}
          {panelDetalles && liquidacionSeleccionada && (
            <PanelDetallesliquidacion
              liquidacion={liquidacionSeleccionada}
              onClose={() => setPanelDetalles(false)}
            />
          )}
        </div>
      </div>

      {/* Modal Nueva Liquidación */}
      {modalLiquidacion && (
        <ModalLiquidacion
          onClose={() => setModalLiquidacion(false)}
          onSave={(datos) => {
            console.log('Guardar liquidación:', datos);
            setModalLiquidacion(false);
          }}
        />
      )}
    </div>
  );
};

// Modal para Nueva Liquidación (placeholder)
const ModalLiquidacion = ({ onClose, onSave }) => {
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
        <Calculator size={48} color={colors.primary} style={{ marginBottom: 16 }} />
        <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>
          Nueva Liquidación
        </h3>
        <p style={{ color: colors.gray600, marginBottom: 24 }}>
          Funcionalidad de nueva liquidación en desarrollo
        </p>
        <Button variant="primary" onClick={onClose}>
          Cerrar
        </Button>
      </div>
    </div>
  );
};

// Panel de Detalles de Liquidación
const PanelDetallesliquidacion = ({ liquidacion, onClose }) => {
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
            {liquidacion.id}
          </h3>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <Badge color={
              liquidacion.estado === 'Pendiente' ? 'warning' :
              liquidacion.estado === 'Revisión' ? 'accent' :
              liquidacion.estado === 'Aprobada' ? 'primary' : 'success'
            }>
              {liquidacion.estado}
            </Badge>
            {liquidacion.diferencia !== 0 && (
              <Badge color="danger">
                Diferencia: ${liquidacion.diferencia}
              </Badge>
            )}
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
          <InfoRow icon={<Calendar size={16} />} label="Fecha" value={liquidacion.fecha} />
          <InfoRow icon={<Truck size={16} />} label="Ruta" value={liquidacion.ruta} />
          <InfoRow icon={<User size={16} />} label="Repartidor" value={liquidacion.repartidor} />
          <InfoRow icon={<Clock size={16} />} label="Turno" value={`${liquidacion.turno} (${liquidacion.horaInicio} - ${liquidacion.horaFin})`} />
        </Card>

        {/* Resumen de Pedidos */}
        <Card style={{ padding: 16, marginBottom: 16 }}>
          <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: colors.gray700 }}>
            Resumen de Pedidos
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            <div style={{ textAlign: 'center', padding: 12, backgroundColor: colors.success + '10', borderRadius: 8 }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: colors.success }}>
                {liquidacion.pedidosEntregados}
              </div>
              <div style={{ fontSize: 12, color: colors.gray600 }}>Entregados</div>
            </div>
            <div style={{ textAlign: 'center', padding: 12, backgroundColor: colors.danger + '10', borderRadius: 8 }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: colors.danger }}>
                {liquidacion.pedidosCancelados}
              </div>
              <div style={{ fontSize: 12, color: colors.gray600 }}>Cancelados</div>
            </div>
          </div>
        </Card>

        {/* Ventas por Método de Pago */}
        <Card style={{ padding: 16, marginBottom: 16 }}>
          <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: colors.gray700 }}>
            Ventas por Método de Pago
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 10, backgroundColor: colors.gray50, borderRadius: 6 }}>
              <span style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Banknote size={16} color={colors.success} />
                Efectivo
              </span>
              <span style={{ fontSize: 15, fontWeight: 700, color: colors.success }}>
                ${liquidacion.ventasEfectivo.toLocaleString()}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 10, backgroundColor: colors.gray50, borderRadius: 6 }}>
              <span style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                <CreditCard size={16} color={colors.primary} />
                Transferencia
              </span>
              <span style={{ fontSize: 15, fontWeight: 700, color: colors.primary }}>
                ${liquidacion.ventasTransferencia.toLocaleString()}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 10, backgroundColor: colors.gray50, borderRadius: 6 }}>
              <span style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                <FileText size={16} color={colors.warning} />
                Cheque
              </span>
              <span style={{ fontSize: 15, fontWeight: 700, color: colors.warning }}>
                ${liquidacion.ventasCheque.toLocaleString()}
              </span>
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: 12, 
              backgroundColor: colors.primary + '10', 
              borderRadius: 6,
              borderTop: `2px solid ${colors.primary}`
            }}>
              <span style={{ fontSize: 14, fontWeight: 700 }}>Total Ventas</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: colors.primary }}>
                ${liquidacion.totalVentas.toLocaleString()}
              </span>
            </div>
          </div>
        </Card>

        {/* Cobros */}
        <Card style={{ padding: 16, marginBottom: 16 }}>
          <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: colors.gray700 }}>
            Cobros de Cuentas por Cobrar
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
              <span>Efectivo</span>
              <span style={{ fontWeight: 700 }}>${liquidacion.cobrosEfectivo.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
              <span>Transferencia</span>
              <span style={{ fontWeight: 700 }}>${liquidacion.cobrosTransferencia.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
              <span>Cheque</span>
              <span style={{ fontWeight: 700 }}>${liquidacion.cobrosCheque.toLocaleString()}</span>
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              paddingTop: 10,
              borderTop: `1px solid ${colors.gray200}`
            }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>Total Cobros</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: colors.accent }}>
                ${liquidacion.totalCobros.toLocaleString()}
              </span>
            </div>
          </div>
        </Card>

        {/* Gastos */}
        <Card style={{ padding: 16, marginBottom: 16 }}>
          <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: colors.gray700 }}>
            Gastos de Operación ({liquidacion.gastos.length})
          </h4>
          {liquidacion.gastos.map((gasto, idx) => (
            <div 
              key={idx}
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                padding: 10,
                backgroundColor: colors.gray50,
                borderRadius: 6,
                marginBottom: 8
              }}
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{gasto.concepto}</div>
                <div style={{ fontSize: 11, color: colors.gray500 }}>{gasto.comprobante}</div>
              </div>
              <span style={{ fontSize: 15, fontWeight: 700, color: colors.danger }}>
                ${gasto.monto.toLocaleString()}
              </span>
            </div>
          ))}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            paddingTop: 10,
            borderTop: `1px solid ${colors.gray200}`
          }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>Total Gastos</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: colors.danger }}>
              ${liquidacion.totalGastos.toLocaleString()}
            </span>
          </div>
        </Card>

        {/* Devoluciones */}
        {liquidacion.devoluciones > 0 && (
          <Card style={{ padding: 16, marginBottom: 16, backgroundColor: colors.warning + '10' }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: colors.warning }}>
              Devoluciones
            </h4>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13 }}>
                {liquidacion.devoluciones} {liquidacion.devoluciones === 1 ? 'devolución' : 'devoluciones'}
              </span>
              <span style={{ fontSize: 16, fontWeight: 700, color: colors.warning }}>
                ${liquidacion.montoDevoluciones.toLocaleString()}
              </span>
            </div>
          </Card>
        )}

        {/* Conciliación de Efectivo */}
        <Card style={{ padding: 16, backgroundColor: liquidacion.diferencia === 0 ? colors.success + '10' : colors.danger + '10', marginBottom: 16 }}>
          <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: liquidacion.diferencia === 0 ? colors.success : colors.danger }}>
            Conciliación de Efectivo
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
              <span>Efectivo Esperado</span>
              <span style={{ fontWeight: 700 }}>${liquidacion.efectivoEsperado.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
              <span>Efectivo Entregado</span>
              <span style={{ fontWeight: 700 }}>${liquidacion.efectivoEntregado.toLocaleString()}</span>
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              paddingTop: 10,
              borderTop: `2px solid ${liquidacion.diferencia === 0 ? colors.success : colors.danger}`
            }}>
              <span style={{ fontSize: 15, fontWeight: 700 }}>Diferencia</span>
              <span style={{ 
                fontSize: 20, 
                fontWeight: 700, 
                color: liquidacion.diferencia === 0 ? colors.success : colors.danger 
              }}>
                {liquidacion.diferencia === 0 ? 'CUADRADO' : `$${Math.abs(liquidacion.diferencia)} ${liquidacion.diferencia > 0 ? '(Sobrante)' : '(Faltante)'}`}
              </span>
            </div>
          </div>
        </Card>

        {/* Documentación */}
        <Card style={{ padding: 16, marginBottom: 16 }}>
          <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: colors.gray700 }}>
            Documentación Adjunta
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            <div style={{ textAlign: 'center', padding: 12, backgroundColor: colors.gray50, borderRadius: 8 }}>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{liquidacion.vales}</div>
              <div style={{ fontSize: 11, color: colors.gray600 }}>Vales</div>
            </div>
            <div style={{ textAlign: 'center', padding: 12, backgroundColor: colors.gray50, borderRadius: 8 }}>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{liquidacion.cheques}</div>
              <div style={{ fontSize: 11, color: colors.gray600 }}>Cheques</div>
            </div>
            <div style={{ textAlign: 'center', padding: 12, backgroundColor: colors.gray50, borderRadius: 8 }}>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{liquidacion.comprobantes}</div>
              <div style={{ fontSize: 11, color: colors.gray600 }}>Comprobantes</div>
            </div>
          </div>
        </Card>

        {/* Observaciones */}
        {liquidacion.observaciones && (
          <Card style={{ padding: 16, marginBottom: 16 }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: colors.gray700 }}>
              Observaciones
            </h4>
            <p style={{ fontSize: 13, color: colors.gray600, lineHeight: 1.6, margin: 0 }}>
              {liquidacion.observaciones}
            </p>
          </Card>
        )}

        {/* Historial */}
        {(liquidacion.estado !== 'Pendiente') && (
          <Card style={{ padding: 16 }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: colors.gray700 }}>
              Historial de Acciones
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {liquidacion.fechaRevision && (
                <div style={{ fontSize: 12, color: colors.gray600 }}>
                  <div style={{ fontWeight: 600, color: colors.accent, marginBottom: 2 }}>
                    👁️ Revisada
                  </div>
                  <div>{liquidacion.fechaRevision}</div>
                  <div>Por: {liquidacion.revisadoPor}</div>
                </div>
              )}
              {liquidacion.fechaAprobacion && (
                <div style={{ fontSize: 12, color: colors.gray600 }}>
                  <div style={{ fontWeight: 600, color: colors.primary, marginBottom: 2 }}>
                    ✓ Aprobada
                  </div>
                  <div>{liquidacion.fechaAprobacion}</div>
                  <div>Por: {liquidacion.aprobadoPor}</div>
                </div>
              )}
              {liquidacion.fechaCierre && (
                <div style={{ fontSize: 12, color: colors.gray600 }}>
                  <div style={{ fontWeight: 600, color: colors.success, marginBottom: 2 }}>
                    🔒 Cerrada
                  </div>
                  <div>{liquidacion.fechaCierre}</div>
                  <div>Por: {liquidacion.cerradoPor}</div>
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
      <div style={{ fontSize: 13, fontWeight: 500, color: colors.gray800 }}>
        {value}
      </div>
    </div>
  </div>
);

export default Liquidacion;
