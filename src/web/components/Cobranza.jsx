import React, { useState } from 'react';
import { Plus, Search, DollarSign, AlertCircle, Clock, CheckCircle, Phone, Mail, FileText, Download, Calendar, CreditCard, TrendingUp, Users, Filter } from 'lucide-react';
import { colors } from '../../shared/colors.js';
import { Card, Badge, Button } from '../../shared/SharedComponents.jsx';
import WebHeader from './WebHeader.jsx';

const Cobranza = () => {
  const [tabActivo, setTabActivo] = useState('pendientes'); // pendientes, vencidas, cobradas, aging
  const [filterCliente, setFilterCliente] = useState('');
  const [filterZona, setFilterZona] = useState('todas');
  const [showModalPago, setShowModalPago] = useState(false);
  const [selectedCuenta, setSelectedCuenta] = useState(null);

  // Datos de cuentas por cobrar
  const [cuentas] = useState([
    {
      id: 'CC-001',
      cliente: 'Abarrotes Don José',
      clienteCode: 'CLI-001',
      zona: 'Norte',
      ruta: 'Ruta Norte-01',
      factura: 'FAC-1234',
      fechaEmision: '2024-01-05',
      fechaVencimiento: '2024-02-04',
      diasVencimiento: 25,
      monto: 5420,
      saldo: 5420,
      status: 'Pendiente',
      prioridad: 'Media',
      contacto: 'José Martínez',
      telefono: '81-1234-5678',
      ultimoContacto: '2024-01-08',
      observaciones: ''
    },
    {
      id: 'CC-002',
      cliente: 'Mini Super El Sol',
      clienteCode: 'CLI-002',
      zona: 'Centro',
      ruta: 'Ruta Centro-03',
      factura: 'FAC-1230',
      fechaEmision: '2024-01-02',
      fechaVencimiento: '2024-01-17',
      diasVencimiento: 7,
      monto: 3280,
      saldo: 3280,
      status: 'Pendiente',
      prioridad: 'Media',
      contacto: 'Laura Sánchez',
      telefono: '81-2345-6789',
      ultimoContacto: '2024-01-07',
      observaciones: 'Confirma pago para el 15 de enero'
    },
    {
      id: 'CC-003',
      cliente: 'Tienda La Esquina',
      clienteCode: 'CLI-003',
      zona: 'Sur',
      ruta: 'Ruta Sur-02',
      factura: 'FAC-1225',
      fechaEmision: '2023-12-20',
      fechaVencimiento: '2024-01-19',
      diasVencimiento: 9,
      monto: 4150,
      saldo: 4150,
      status: 'Pendiente',
      prioridad: 'Alta',
      contacto: 'Roberto García',
      telefono: '81-3456-7890',
      ultimoContacto: '2024-01-06',
      observaciones: 'Cliente solicita extensión de 5 días'
    },
    {
      id: 'CC-004',
      cliente: 'Comercial Pérez',
      clienteCode: 'CLI-004',
      zona: 'Oriente',
      ruta: 'Ruta Oriente-01',
      factura: 'FAC-1220',
      fechaEmision: '2023-12-15',
      fechaVencimiento: '2024-01-03',
      diasVencimiento: -7,
      monto: 7500,
      saldo: 7500,
      status: 'Vencida',
      prioridad: 'Crítica',
      contacto: 'María Pérez',
      telefono: '81-4567-8901',
      ultimoContacto: '2024-01-09',
      observaciones: 'Cliente tiene problemas de liquidez, promete pago parcial'
    },
    {
      id: 'CC-005',
      cliente: 'Abarrotes Don José',
      clienteCode: 'CLI-001',
      zona: 'Norte',
      ruta: 'Ruta Norte-01',
      factura: 'FAC-1210',
      fechaEmision: '2023-12-10',
      fechaVencimiento: '2023-12-25',
      diasVencimiento: -16,
      monto: 2890,
      saldo: 2890,
      status: 'Vencida',
      prioridad: 'Crítica',
      contacto: 'José Martínez',
      telefono: '81-1234-5678',
      ultimoContacto: '2024-01-08',
      observaciones: 'Promete pago la próxima semana'
    },
    {
      id: 'CC-006',
      cliente: 'Mini Super El Sol',
      clienteCode: 'CLI-002',
      zona: 'Centro',
      ruta: 'Ruta Centro-03',
      factura: 'FAC-1205',
      fechaEmision: '2023-12-28',
      fechaVencimiento: '2024-01-12',
      diasVencimiento: 2,
      monto: 4800,
      saldo: 0,
      status: 'Cobrada',
      prioridad: 'Baja',
      contacto: 'Laura Sánchez',
      telefono: '81-2345-6789',
      ultimoContacto: '2024-01-10',
      observaciones: 'Pagado por transferencia el 10/01/2024',
      fechaPago: '2024-01-10',
      metodoPago: 'Transferencia'
    }
  ]);

  // Estadísticas
  const stats = {
    totalPendiente: cuentas.filter(c => c.status !== 'Cobrada').reduce((sum, c) => sum + c.saldo, 0),
    totalVencido: cuentas.filter(c => c.status === 'Vencida').reduce((sum, c) => sum + c.saldo, 0),
    totalCobrado: cuentas.filter(c => c.status === 'Cobrada').reduce((sum, c) => sum + c.monto, 0),
    cuentasPendientes: cuentas.filter(c => c.status === 'Pendiente').length,
    cuentasVencidas: cuentas.filter(c => c.status === 'Vencida').length,
    clientesConSaldo: [...new Set(cuentas.filter(c => c.status !== 'Cobrada').map(c => c.clienteCode))].length
  };

  // Aging (antigüedad de saldos)
  const aging = {
    corriente: cuentas.filter(c => c.diasVencimiento > 0 && c.status !== 'Cobrada').reduce((sum, c) => sum + c.saldo, 0),
    dias1_30: cuentas.filter(c => c.diasVencimiento <= 0 && c.diasVencimiento > -30 && c.status !== 'Cobrada').reduce((sum, c) => sum + c.saldo, 0),
    dias31_60: cuentas.filter(c => c.diasVencimiento <= -30 && c.diasVencimiento > -60 && c.status !== 'Cobrada').reduce((sum, c) => sum + c.saldo, 0),
    dias61_90: cuentas.filter(c => c.diasVencimiento <= -60 && c.diasVencimiento > -90 && c.status !== 'Cobrada').reduce((sum, c) => sum + c.saldo, 0),
    mas90: cuentas.filter(c => c.diasVencimiento <= -90 && c.status !== 'Cobrada').reduce((sum, c) => sum + c.saldo, 0)
  };

  // Filtrar cuentas
  const cuentasFiltradas = cuentas.filter(cuenta => {
    const matchTab = 
      (tabActivo === 'pendientes' && cuenta.status === 'Pendiente') ||
      (tabActivo === 'vencidas' && cuenta.status === 'Vencida') ||
      (tabActivo === 'cobradas' && cuenta.status === 'Cobrada') ||
      tabActivo === 'aging';
    
    const matchCliente = !filterCliente || 
      cuenta.cliente.toLowerCase().includes(filterCliente.toLowerCase()) ||
      cuenta.clienteCode.toLowerCase().includes(filterCliente.toLowerCase());
    
    const matchZona = filterZona === 'todas' || cuenta.zona === filterZona;
    
    return matchTab && matchCliente && matchZona;
  });

  const handleRegistrarPago = (cuenta) => {
    setSelectedCuenta(cuenta);
    setShowModalPago(true);
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: colors.gray50
    }}>
      <WebHeader 
        title="Gestión de Cobranza"
        subtitle="Control de cuentas por cobrar y pagos"
      />

      <div style={{ padding: 24 }}>
        {/* Estadísticas principales */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: 16, 
          marginBottom: 24 
        }}>
          <Card style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: colors.gray500, marginBottom: 8 }}>
                  Total por Cobrar
                </div>
                <div style={{ fontSize: 36, fontWeight: 700, color: colors.warning }}>
                  ${(stats.totalPendiente / 1000).toFixed(1)}K
                </div>
                <div style={{ fontSize: 12, color: colors.gray500, marginTop: 8 }}>
                  {stats.cuentasPendientes} cuentas pendientes
                </div>
              </div>
              <div style={{ 
                width: 56, 
                height: 56, 
                borderRadius: 12, 
                backgroundColor: colors.warning + '20',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Clock size={28} color={colors.warning} />
              </div>
            </div>
          </Card>

          <Card style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: colors.gray500, marginBottom: 8 }}>
                  Saldos Vencidos
                </div>
                <div style={{ fontSize: 36, fontWeight: 700, color: colors.danger }}>
                  ${(stats.totalVencido / 1000).toFixed(1)}K
                </div>
                <div style={{ fontSize: 12, color: colors.gray500, marginTop: 8 }}>
                  {stats.cuentasVencidas} cuentas vencidas
                </div>
              </div>
              <div style={{ 
                width: 56, 
                height: 56, 
                borderRadius: 12, 
                backgroundColor: colors.danger + '20',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <AlertCircle size={28} color={colors.danger} />
              </div>
            </div>
          </Card>

          <Card style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: colors.gray500, marginBottom: 8 }}>
                  Total Cobrado (Hoy)
                </div>
                <div style={{ fontSize: 36, fontWeight: 700, color: colors.success }}>
                  ${(stats.totalCobrado / 1000).toFixed(1)}K
                </div>
                <div style={{ fontSize: 12, color: colors.gray500, marginTop: 8 }}>
                  Efectividad: 98%
                </div>
              </div>
              <div style={{ 
                width: 56, 
                height: 56, 
                borderRadius: 12, 
                backgroundColor: colors.success + '20',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CheckCircle size={28} color={colors.success} />
              </div>
            </div>
          </Card>
        </div>

        {/* Estadísticas secundarias */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: 16, 
          marginBottom: 24 
        }}>
          <Card style={{ padding: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: colors.primary }}>
              {stats.clientesConSaldo}
            </div>
            <div style={{ fontSize: 12, color: colors.gray500, marginTop: 4 }}>
              Clientes con Saldo
            </div>
          </Card>
          <Card style={{ padding: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: colors.warning }}>
              15 días
            </div>
            <div style={{ fontSize: 12, color: colors.gray500, marginTop: 4 }}>
              Días Promedio de Cobro
            </div>
          </Card>
          <Card style={{ padding: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: colors.success }}>
              95%
            </div>
            <div style={{ fontSize: 12, color: colors.gray500, marginTop: 4 }}>
              Tasa de Recuperación
            </div>
          </Card>
          <Card style={{ padding: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: colors.accent }}>
              $42K
            </div>
            <div style={{ fontSize: 12, color: colors.gray500, marginTop: 4 }}>
              Proyección Semanal
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Card style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', borderBottom: `1px solid ${colors.gray200}` }}>
            <button
              onClick={() => setTabActivo('pendientes')}
              style={{
                flex: 1,
                padding: '16px 24px',
                border: 'none',
                backgroundColor: tabActivo === 'pendientes' ? 'white' : colors.gray50,
                color: tabActivo === 'pendientes' ? colors.primary : colors.gray600,
                fontWeight: tabActivo === 'pendientes' ? 600 : 400,
                fontSize: 14,
                cursor: 'pointer',
                borderBottom: tabActivo === 'pendientes' ? `3px solid ${colors.primary}` : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8
              }}
            >
              <Clock size={18} />
              Pendientes
              <Badge color="warning" style={{ fontSize: 11 }}>{stats.cuentasPendientes}</Badge>
            </button>
            <button
              onClick={() => setTabActivo('vencidas')}
              style={{
                flex: 1,
                padding: '16px 24px',
                border: 'none',
                backgroundColor: tabActivo === 'vencidas' ? 'white' : colors.gray50,
                color: tabActivo === 'vencidas' ? colors.primary : colors.gray600,
                fontWeight: tabActivo === 'vencidas' ? 600 : 400,
                fontSize: 14,
                cursor: 'pointer',
                borderBottom: tabActivo === 'vencidas' ? `3px solid ${colors.primary}` : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8
              }}
            >
              <AlertCircle size={18} />
              Vencidas
              <Badge color="danger" style={{ fontSize: 11 }}>{stats.cuentasVencidas}</Badge>
            </button>
            <button
              onClick={() => setTabActivo('cobradas')}
              style={{
                flex: 1,
                padding: '16px 24px',
                border: 'none',
                backgroundColor: tabActivo === 'cobradas' ? 'white' : colors.gray50,
                color: tabActivo === 'cobradas' ? colors.primary : colors.gray600,
                fontWeight: tabActivo === 'cobradas' ? 600 : 400,
                fontSize: 14,
                cursor: 'pointer',
                borderBottom: tabActivo === 'cobradas' ? `3px solid ${colors.primary}` : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8
              }}
            >
              <CheckCircle size={18} />
              Cobradas
              <Badge color="success" style={{ fontSize: 11 }}>
                {cuentas.filter(c => c.status === 'Cobrada').length}
              </Badge>
            </button>
            <button
              onClick={() => setTabActivo('aging')}
              style={{
                flex: 1,
                padding: '16px 24px',
                border: 'none',
                backgroundColor: tabActivo === 'aging' ? 'white' : colors.gray50,
                color: tabActivo === 'aging' ? colors.primary : colors.gray600,
                fontWeight: tabActivo === 'aging' ? 600 : 400,
                fontSize: 14,
                cursor: 'pointer',
                borderBottom: tabActivo === 'aging' ? `3px solid ${colors.primary}` : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8
              }}
            >
              <TrendingUp size={18} />
              Aging (Antigüedad)
            </button>
          </div>
        </Card>

        {/* Contenido según tab */}
        {tabActivo !== 'aging' ? (
          <>
            {/* Filtros */}
            <Card style={{ marginBottom: 16 }}>
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
                    placeholder="Buscar por cliente o código..."
                    value={filterCliente}
                    onChange={(e) => setFilterCliente(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 40px',
                      border: `1px solid ${colors.gray300}`,
                      borderRadius: 8,
                      fontSize: 14,
                      outline: 'none'
                    }}
                  />
                </div>

                <select
                  value={filterZona}
                  onChange={(e) => setFilterZona(e.target.value)}
                  style={{
                    padding: '10px 12px',
                    border: `1px solid ${colors.gray300}`,
                    borderRadius: 8,
                    fontSize: 14,
                    minWidth: 150
                  }}
                >
                  <option value="todas">Todas las zonas</option>
                  <option value="Norte">Norte</option>
                  <option value="Sur">Sur</option>
                  <option value="Centro">Centro</option>
                  <option value="Oriente">Oriente</option>
                </select>

                <Button variant="outline" size="sm" icon={<Download size={16} />}>
                  Exportar
                </Button>
              </div>
            </Card>

            {/* Tabla de cuentas */}
            <Card>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: `2px solid ${colors.gray200}`, backgroundColor: colors.gray50 }}>
                      <th style={{ padding: 12, textAlign: 'left', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Cliente</th>
                      <th style={{ padding: 12, textAlign: 'left', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Factura</th>
                      <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Emisión</th>
                      <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Vencimiento</th>
                      <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Días</th>
                      <th style={{ padding: 12, textAlign: 'right', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Monto</th>
                      <th style={{ padding: 12, textAlign: 'right', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Saldo</th>
                      <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Prioridad</th>
                      <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cuentasFiltradas.map(cuenta => (
                      <tr key={cuenta.id} style={{ borderBottom: `1px solid ${colors.gray100}` }}>
                        <td style={{ padding: 12 }}>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 600 }}>{cuenta.cliente}</div>
                            <div style={{ fontSize: 11, color: colors.gray500 }}>
                              {cuenta.zona} • {cuenta.ruta}
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: 12, fontFamily: 'monospace', fontSize: 13, fontWeight: 600 }}>
                          {cuenta.factura}
                        </td>
                        <td style={{ padding: 12, textAlign: 'center', fontSize: 13 }}>
                          {cuenta.fechaEmision}
                        </td>
                        <td style={{ padding: 12, textAlign: 'center', fontSize: 13 }}>
                          {cuenta.fechaVencimiento}
                        </td>
                        <td style={{ padding: 12, textAlign: 'center' }}>
                          <span style={{ 
                            fontSize: 14, 
                            fontWeight: 700,
                            color: cuenta.diasVencimiento < 0 ? colors.danger : 
                                   cuenta.diasVencimiento < 7 ? colors.warning : colors.success
                          }}>
                            {cuenta.diasVencimiento < 0 ? cuenta.diasVencimiento : `+${cuenta.diasVencimiento}`}
                          </span>
                        </td>
                        <td style={{ padding: 12, textAlign: 'right', fontSize: 14, color: colors.gray600 }}>
                          ${cuenta.monto.toLocaleString()}
                        </td>
                        <td style={{ padding: 12, textAlign: 'right', fontSize: 15, fontWeight: 700, color: colors.primary }}>
                          ${cuenta.saldo.toLocaleString()}
                        </td>
                        <td style={{ padding: 12, textAlign: 'center' }}>
                          <Badge color={
                            cuenta.prioridad === 'Crítica' ? 'danger' :
                            cuenta.prioridad === 'Alta' ? 'warning' :
                            cuenta.prioridad === 'Media' ? 'accent' : 'success'
                          }>
                            {cuenta.prioridad}
                          </Badge>
                        </td>
                        <td style={{ padding: 12 }}>
                          <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                            {cuenta.status !== 'Cobrada' && (
                              <button
                                onClick={() => handleRegistrarPago(cuenta)}
                                style={{
                                  padding: '6px 12px',
                                  borderRadius: 6,
                                  border: `1px solid ${colors.success}`,
                                  backgroundColor: colors.success,
                                  color: 'white',
                                  cursor: 'pointer',
                                  fontSize: 11,
                                  fontWeight: 600
                                }}
                              >
                                <DollarSign size={14} style={{ display: 'inline', marginRight: 4 }} />
                                Registrar Pago
                              </button>
                            )}
                            <button
                              style={{
                                padding: '6px 8px',
                                borderRadius: 6,
                                border: `1px solid ${colors.primary}`,
                                backgroundColor: 'white',
                                color: colors.primary,
                                cursor: 'pointer',
                                fontSize: 11
                              }}
                              title="Llamar"
                            >
                              <Phone size={14} />
                            </button>
                            <button
                              style={{
                                padding: '6px 8px',
                                borderRadius: 6,
                                border: `1px solid ${colors.accent}`,
                                backgroundColor: 'white',
                                color: colors.accent,
                                cursor: 'pointer',
                                fontSize: 11
                              }}
                              title="Enviar correo"
                            >
                              <Mail size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {cuentasFiltradas.length === 0 && (
                <div style={{ textAlign: 'center', padding: 40, color: colors.gray400 }}>
                  <FileText size={48} style={{ marginBottom: 12 }} />
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                    No hay cuentas {tabActivo}
                  </div>
                </div>
              )}
            </Card>
          </>
        ) : (
          <TabAging aging={aging} cuentas={cuentas} />
        )}
      </div>

      {/* Modal Registrar Pago */}
      {showModalPago && selectedCuenta && (
        <ModalRegistrarPago
          cuenta={selectedCuenta}
          onClose={() => setShowModalPago(false)}
        />
      )}
    </div>
  );
};

// Tab Aging (Antigüedad de Saldos)
const TabAging = ({ aging, cuentas }) => {
  const total = aging.corriente + aging.dias1_30 + aging.dias31_60 + aging.dias61_90 + aging.mas90;

  const rangos = [
    { label: 'Corriente (Por vencer)', monto: aging.corriente, color: colors.success, porcentaje: (aging.corriente / total * 100).toFixed(1) },
    { label: '1-30 días vencidos', monto: aging.dias1_30, color: colors.warning, porcentaje: (aging.dias1_30 / total * 100).toFixed(1) },
    { label: '31-60 días vencidos', monto: aging.dias31_60, color: colors.danger, porcentaje: (aging.dias31_60 / total * 100).toFixed(1) },
    { label: '61-90 días vencidos', monto: aging.dias61_90, color: colors.danger, porcentaje: (aging.dias61_90 / total * 100).toFixed(1) },
    { label: 'Más de 90 días', monto: aging.mas90, color: colors.danger, porcentaje: (aging.mas90 / total * 100).toFixed(1) }
  ];

  return (
    <div>
      {/* Gráfica de barras */}
      <Card style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
          Antigüedad de Saldos
        </h3>
        
        <div style={{ marginBottom: 32 }}>
          {rangos.map((rango, idx) => (
            <div key={idx} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{rango.label}</span>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <span style={{ fontSize: 13, color: colors.gray500 }}>
                    {rango.porcentaje}%
                  </span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: rango.color, minWidth: 80, textAlign: 'right' }}>
                    ${rango.monto.toLocaleString()}
                  </span>
                </div>
              </div>
              <div style={{ 
                width: '100%', 
                height: 32, 
                backgroundColor: colors.gray100, 
                borderRadius: 8,
                overflow: 'hidden',
                position: 'relative'
              }}>
                <div style={{
                  width: `${rango.porcentaje}%`,
                  height: '100%',
                  backgroundColor: rango.color,
                  transition: 'width 0.5s',
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: 12,
                  color: 'white',
                  fontSize: 13,
                  fontWeight: 600
                }}>
                  {parseFloat(rango.porcentaje) > 10 && `${rango.porcentaje}%`}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div style={{ 
          padding: 20, 
          backgroundColor: colors.primary + '10', 
          borderRadius: 8,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: 16, fontWeight: 600 }}>Total Saldos</span>
          <span style={{ fontSize: 28, fontWeight: 700, color: colors.primary }}>
            ${total.toLocaleString()}
          </span>
        </div>
      </Card>

      {/* Detalle por cliente */}
      <Card>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>
          Detalle por Cliente
        </h3>
        
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${colors.gray200}`, backgroundColor: colors.gray50 }}>
              <th style={{ padding: 12, textAlign: 'left', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Cliente</th>
              <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Corriente</th>
              <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>1-30</th>
              <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>31-60</th>
              <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>61-90</th>
              <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>&gt;90</th>
              <th style={{ padding: 12, textAlign: 'right', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {[...new Set(cuentas.filter(c => c.status !== 'Cobrada').map(c => c.cliente))].map(cliente => {
              const cuentasCliente = cuentas.filter(c => c.cliente === cliente && c.status !== 'Cobrada');
              const corriente = cuentasCliente.filter(c => c.diasVencimiento > 0).reduce((sum, c) => sum + c.saldo, 0);
              const v1_30 = cuentasCliente.filter(c => c.diasVencimiento <= 0 && c.diasVencimiento > -30).reduce((sum, c) => sum + c.saldo, 0);
              const v31_60 = cuentasCliente.filter(c => c.diasVencimiento <= -30 && c.diasVencimiento > -60).reduce((sum, c) => sum + c.saldo, 0);
              const v61_90 = cuentasCliente.filter(c => c.diasVencimiento <= -60 && c.diasVencimiento > -90).reduce((sum, c) => sum + c.saldo, 0);
              const vmas90 = cuentasCliente.filter(c => c.diasVencimiento <= -90).reduce((sum, c) => sum + c.saldo, 0);
              const totalCliente = corriente + v1_30 + v31_60 + v61_90 + vmas90;

              return (
                <tr key={cliente} style={{ borderBottom: `1px solid ${colors.gray100}` }}>
                  <td style={{ padding: 12, fontSize: 14, fontWeight: 600 }}>{cliente}</td>
                  <td style={{ padding: 12, textAlign: 'center', fontSize: 13, color: corriente > 0 ? colors.success : colors.gray400 }}>
                    {corriente > 0 ? `$${corriente.toLocaleString()}` : '-'}
                  </td>
                  <td style={{ padding: 12, textAlign: 'center', fontSize: 13, color: v1_30 > 0 ? colors.warning : colors.gray400 }}>
                    {v1_30 > 0 ? `$${v1_30.toLocaleString()}` : '-'}
                  </td>
                  <td style={{ padding: 12, textAlign: 'center', fontSize: 13, color: v31_60 > 0 ? colors.danger : colors.gray400 }}>
                    {v31_60 > 0 ? `$${v31_60.toLocaleString()}` : '-'}
                  </td>
                  <td style={{ padding: 12, textAlign: 'center', fontSize: 13, color: v61_90 > 0 ? colors.danger : colors.gray400 }}>
                    {v61_90 > 0 ? `$${v61_90.toLocaleString()}` : '-'}
                  </td>
                  <td style={{ padding: 12, textAlign: 'center', fontSize: 13, color: vmas90 > 0 ? colors.danger : colors.gray400, fontWeight: 700 }}>
                    {vmas90 > 0 ? `$${vmas90.toLocaleString()}` : '-'}
                  </td>
                  <td style={{ padding: 12, textAlign: 'right', fontSize: 15, fontWeight: 700, color: colors.primary }}>
                    ${totalCliente.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

// Modal Registrar Pago
const ModalRegistrarPago = ({ cuenta, onClose }) => {
  const [formData, setFormData] = useState({
    monto: cuenta.saldo,
    metodoPago: 'Efectivo',
    referencia: '',
    fecha: new Date().toISOString().split('T')[0],
    observaciones: ''
  });

  const handleSave = () => {
    // Aquí iría la lógica para registrar el pago
    alert(`Pago registrado: $${formData.monto} - ${formData.metodoPago}`);
    onClose();
  };

  return (
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
        width: '90%',
        maxWidth: 600,
        padding: 24
      }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>
          💰 Registrar Pago
        </h2>

        {/* Info de la cuenta */}
        <Card style={{ marginBottom: 20, padding: 16, backgroundColor: colors.gray50 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, fontSize: 14 }}>
            <div>
              <span style={{ color: colors.gray500 }}>Cliente:</span>
              <div style={{ fontWeight: 600 }}>{cuenta.cliente}</div>
            </div>
            <div>
              <span style={{ color: colors.gray500 }}>Factura:</span>
              <div style={{ fontWeight: 600 }}>{cuenta.factura}</div>
            </div>
            <div>
              <span style={{ color: colors.gray500 }}>Saldo:</span>
              <div style={{ fontWeight: 700, fontSize: 16, color: colors.danger }}>
                ${cuenta.saldo.toLocaleString()}
              </div>
            </div>
            <div>
              <span style={{ color: colors.gray500 }}>Vencimiento:</span>
              <div style={{ fontWeight: 600 }}>{cuenta.fechaVencimiento}</div>
            </div>
          </div>
        </Card>

        {/* Formulario */}
        <div style={{ display: 'grid', gap: 16 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600 }}>
              Monto a Pagar *
            </label>
            <input
              type="number"
              value={formData.monto}
              onChange={(e) => setFormData({...formData, monto: parseFloat(e.target.value)})}
              max={cuenta.saldo}
              step="0.01"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `1px solid ${colors.gray300}`,
                borderRadius: 8,
                fontSize: 14
              }}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600 }}>
                Método de Pago *
              </label>
              <select
                value={formData.metodoPago}
                onChange={(e) => setFormData({...formData, metodoPago: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1px solid ${colors.gray300}`,
                  borderRadius: 8,
                  fontSize: 14
                }}
                required
              >
                <option>Efectivo</option>
                <option>Transferencia</option>
                <option>Cheque</option>
                <option>Tarjeta</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600 }}>
                Fecha de Pago *
              </label>
              <input
                type="date"
                value={formData.fecha}
                onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1px solid ${colors.gray300}`,
                  borderRadius: 8,
                  fontSize: 14
                }}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600 }}>
              Referencia / Folio
            </label>
            <input
              type="text"
              value={formData.referencia}
              onChange={(e) => setFormData({...formData, referencia: e.target.value})}
              placeholder="Número de transferencia, cheque, etc."
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `1px solid ${colors.gray300}`,
                borderRadius: 8,
                fontSize: 14
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600 }}>
              Observaciones
            </label>
            <textarea
              value={formData.observaciones}
              onChange={(e) => setFormData({...formData, observaciones: e.target.value})}
              placeholder="Notas adicionales..."
              rows={3}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `1px solid ${colors.gray300}`,
                borderRadius: 8,
                fontSize: 14,
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
          </div>
        </div>

        {/* Botones */}
        <div style={{ 
          display: 'flex', 
          gap: 12, 
          justifyContent: 'flex-end',
          marginTop: 24,
          paddingTop: 24,
          borderTop: `1px solid ${colors.gray200}`
        }}>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="success" icon={<CheckCircle size={18} />} onClick={handleSave}>
            Registrar Pago
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cobranza;
