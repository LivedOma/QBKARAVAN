import React, { useState } from 'react';
import { Plus, RefreshCw, Download, Calendar, MapPin, Clock, Package, Zap, X, CheckCircle, AlertTriangle } from 'lucide-react';
import { colors } from '../../shared/colors.js';
import { Card, Badge, Button } from '../../shared/SharedComponents.jsx';
import WebHeader from './WebHeader.jsx';

const Planificacion = () => {
  const [activeTab, setActiveTab] = useState('reparto'); // 'preventa', 'reparto', 'zonas'

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: colors.gray50
    }}>
      <WebHeader 
        title="Planificación de Rutas"
        subtitle="Organiza y optimiza las rutas de entrega"
      />

      <div style={{ padding: 24 }}>
        {/* Tabs de navegación */}
        <div style={{ 
          display: 'flex', 
          gap: 8, 
          marginBottom: 24, 
          borderBottom: `2px solid ${colors.gray200}`,
          backgroundColor: colors.white,
          padding: '0 16px',
          borderRadius: '12px 12px 0 0'
        }}>
          <button
            onClick={() => setActiveTab('preventa')}
            style={{
              padding: '12px 20px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              color: activeTab === 'preventa' ? colors.primary : colors.gray500,
              borderBottom: activeTab === 'preventa' ? `3px solid ${colors.primary}` : '3px solid transparent',
              marginBottom: -2
            }}
          >
            Rutas de Preventa
          </button>
          <button
            onClick={() => setActiveTab('reparto')}
            style={{
              padding: '12px 20px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              color: activeTab === 'reparto' ? colors.success : colors.gray500,
              borderBottom: activeTab === 'reparto' ? `3px solid ${colors.success}` : '3px solid transparent',
              marginBottom: -2
            }}
          >
            Rutas de Reparto
          </button>
          <button
            onClick={() => setActiveTab('zonas')}
            style={{
              padding: '12px 20px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              color: activeTab === 'zonas' ? colors.warning : colors.gray500,
              borderBottom: activeTab === 'zonas' ? `3px solid ${colors.warning}` : '3px solid transparent',
              marginBottom: -2
            }}
          >
            Zonas y Territorios
          </button>
        </div>

        {/* Contenido por tab */}
        {activeTab === 'preventa' && <PlanificacionPreventa />}
        {activeTab === 'reparto' && <PlanificacionReparto />}
        {activeTab === 'zonas' && (
          <Card style={{ padding: 40, textAlign: 'center' }}>
            <MapPin size={48} style={{ marginBottom: 16, color: colors.gray400 }} />
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: colors.gray600 }}>
              Gestión de Zonas y Territorios
            </div>
            <div style={{ fontSize: 14, color: colors.gray500 }}>
              Módulo en desarrollo - Próximamente
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

const PlanificacionPreventa = () => (
  <div>
    <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
      <Button variant="primary" icon={<Plus size={18} />}>Nueva Ruta</Button>
      <Button variant="secondary" icon={<RefreshCw size={18} />}>Optimizar Rutas</Button>
      <Button variant="secondary" icon={<Download size={18} />}>Exportar</Button>
    </div>

    <Card style={{ padding: 40, textAlign: 'center' }}>
      <Calendar size={48} style={{ marginBottom: 16, color: colors.gray400 }} />
      <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: colors.gray600 }}>
        Planificación de Rutas de Preventa
      </div>
      <div style={{ fontSize: 14, color: colors.gray500 }}>
        Módulo en desarrollo - Próximamente
      </div>
    </Card>
  </div>
);

const PlanificacionReparto = () => {
  const [selectedDate, setSelectedDate] = useState('2026-01-07');
  const [selectedRepartidor, setSelectedRepartidor] = useState('');
  const [selectedVehiculo, setSelectedVehiculo] = useState('');
  const [showGenerarModal, setShowGenerarModal] = useState(false);
  const [rutaGenerada, setRutaGenerada] = useState(null);

  // Datos de pedidos confirmados
  const pedidosConfirmados = [
    {
      id: 'PED-001',
      cliente: { 
        nombre: 'Abarrotes Don José', 
        direccion: 'Av. Industrial 1234'
      },
      productos: [
        { codigo: 'PROD-001', nombre: 'Refresco Cola 600ml', cantidad: 48, peso: 14.4 },
        { codigo: 'PROD-002', nombre: 'Papas Fritas 45g', cantidad: 24, peso: 1.2 }
      ],
      montoTotal: 1850.00,
      ventanaHoraria: { inicio: '08:00', fin: '12:00' },
      prioridad: 'alta',
      estado: 'confirmado'
    },
    {
      id: 'PED-002',
      cliente: { 
        nombre: 'Super Martínez', 
        direccion: 'Calle Fábrica 567'
      },
      productos: [
        { codigo: 'PROD-001', nombre: 'Refresco Cola 600ml', cantidad: 72, peso: 21.6 },
        { codigo: 'PROD-003', nombre: 'Galletas Chocolate 200g', cantidad: 36, peso: 7.2 }
      ],
      montoTotal: 2640.00,
      ventanaHoraria: { inicio: '09:00', fin: '13:00' },
      prioridad: 'alta',
      estado: 'confirmado'
    },
    {
      id: 'PED-003',
      cliente: { 
        nombre: 'Minisuper El Ahorro', 
        direccion: 'Av. Trabajo 890'
      },
      productos: [
        { codigo: 'PROD-002', nombre: 'Papas Fritas 45g', cantidad: 48, peso: 2.4 },
        { codigo: 'PROD-004', nombre: 'Agua Mineral 1.5L', cantidad: 24, peso: 36.0 }
      ],
      montoTotal: 1420.00,
      ventanaHoraria: { inicio: '10:00', fin: '14:00' },
      prioridad: 'media',
      estado: 'confirmado'
    },
    {
      id: 'PED-004',
      cliente: { 
        nombre: 'Tienda La Esquina', 
        direccion: 'Av. Hidalgo 123'
      },
      productos: [
        { codigo: 'PROD-001', nombre: 'Refresco Cola 600ml', cantidad: 36, peso: 10.8 }
      ],
      montoTotal: 980.00,
      ventanaHoraria: { inicio: '08:00', fin: '11:00' },
      prioridad: 'alta',
      estado: 'confirmado'
    },
    {
      id: 'PED-005',
      cliente: { 
        nombre: 'Super del Centro', 
        direccion: 'Calle Zaragoza 456'
      },
      productos: [
        { codigo: 'PROD-001', nombre: 'Refresco Cola 600ml', cantidad: 96, peso: 28.8 },
        { codigo: 'PROD-003', nombre: 'Galletas Chocolate 200g', cantidad: 48, peso: 9.6 }
      ],
      montoTotal: 3520.00,
      ventanaHoraria: { inicio: '07:00', fin: '10:00' },
      prioridad: 'alta',
      estado: 'confirmado'
    }
  ];

  // Datos de repartidores
  const repartidores = [
    {
      id: 'REP-001',
      nombre: 'Juan Pérez',
      foto: '👨',
      estado: 'disponible',
      licencia: 'Tipo C',
      experiencia: '5 años',
      calificacion: 4.8,
      telefono: '81 1234 5678'
    },
    {
      id: 'REP-002',
      nombre: 'Carlos Ruiz',
      foto: '👨',
      estado: 'disponible',
      licencia: 'Tipo C',
      experiencia: '3 años',
      calificacion: 4.6,
      telefono: '81 2345 6789'
    }
  ];

  // Datos de vehículos
  const vehiculos = [
    {
      id: 'VEH-001',
      nombre: 'Unidad 07',
      placas: 'NLR-4521',
      tipo: 'Camión 3.5 ton',
      capacidadKg: 3500,
      capacidadM3: 15,
      estado: 'disponible',
      combustible: 85,
      mantenimiento: 'Al corriente'
    },
    {
      id: 'VEH-002',
      nombre: 'Unidad 12',
      placas: 'NLX-8934',
      tipo: 'Camión 3.5 ton',
      capacidadKg: 3500,
      capacidadM3: 15,
      estado: 'disponible',
      combustible: 72,
      mantenimiento: 'Al corriente'
    }
  ];

  const rutaOptimizada = [
    { orden: 1, pedido: pedidosConfirmados[4], hora: '07:15', distancia: '0 km' },
    { orden: 2, pedido: pedidosConfirmados[3], hora: '08:10', distancia: '8.2 km' },
    { orden: 3, pedido: pedidosConfirmados[1], hora: '09:20', distancia: '5.8 km' },
    { orden: 4, pedido: pedidosConfirmados[0], hora: '10:35', distancia: '6.5 km' },
    { orden: 5, pedido: pedidosConfirmados[2], hora: '11:50', distancia: '12.0 km' }
  ];

  return (
    <div>
      {/* Barra de acciones superior */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, alignItems: 'center' }}>
        <div style={{ flex: 1, display: 'flex', gap: 12, alignItems: 'center' }}>
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: 12, 
              fontWeight: 600, 
              marginBottom: 4, 
              color: colors.gray600 
            }}>
              Fecha de ruta
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{
                padding: '8px 12px',
                border: `1px solid ${colors.gray300}`,
                borderRadius: 8,
                fontSize: 14
              }}
            />
          </div>
          
          <Badge color="primary" style={{ fontSize: 14, padding: '8px 16px', marginTop: 20 }}>
            {pedidosConfirmados.length} pedidos confirmados
          </Badge>
        </div>

        <Button
          variant="primary"
          icon={<Zap size={18} />}
          onClick={() => setShowGenerarModal(true)}
          style={{ marginTop: 20 }}
        >
          Generar Ruta Automática
        </Button>
      </div>

      {/* Grid principal */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        
        {/* Panel izquierdo: Pedidos confirmados */}
        <Card>
          <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>
            📦 Pedidos Confirmados para Entrega
          </h3>
          
          <div style={{ maxHeight: 500, overflow: 'auto' }}>
            {pedidosConfirmados.map((pedido, i) => {
              const pesoTotal = pedido.productos.reduce((sum, p) => sum + p.peso, 0);
              const unidadesTotal = pedido.productos.reduce((sum, p) => sum + p.cantidad, 0);
              
              return (
                <Card key={i} style={{ 
                  marginBottom: 12, 
                  border: `2px solid ${colors.gray200}`,
                  padding: 12
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start', 
                    marginBottom: 8 
                  }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{pedido.cliente.nombre}</div>
                      <div style={{ fontSize: 12, color: colors.gray500, marginTop: 2 }}>
                        <MapPin size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
                        {pedido.cliente.direccion}
                      </div>
                    </div>
                    <Badge color={pedido.prioridad === 'alta' ? 'danger' : 'warning'}>
                      {pedido.prioridad}
                    </Badge>
                  </div>

                  <div style={{ fontSize: 12, color: colors.gray600, marginTop: 8, display: 'flex', gap: 16 }}>
                    <div>
                      <Clock size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
                      {pedido.ventanaHoraria.inicio} - {pedido.ventanaHoraria.fin}
                    </div>
                    <div>
                      <Package size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
                      {unidadesTotal} unidades
                    </div>
                    <div>⚖️ {pesoTotal.toFixed(1)} kg</div>
                  </div>

                  <div style={{ fontSize: 11, color: colors.gray400, marginTop: 8 }}>
                    {pedido.productos.length} productos • ${pedido.montoTotal.toFixed(2)}
                  </div>
                </Card>
              );
            })}
          </div>
        </Card>

        {/* Panel derecho: Repartidores y vehículos */}
        <div>
          <Card style={{ marginBottom: 16 }}>
            <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>
              👷 Repartidores Disponibles
            </h3>
            
            {repartidores.map((rep, i) => (
              <div
                key={i}
                style={{
                  padding: 12,
                  border: `2px solid ${selectedRepartidor === rep.id ? colors.success : colors.gray200}`,
                  borderRadius: 8,
                  marginBottom: 8,
                  cursor: 'pointer',
                  backgroundColor: selectedRepartidor === rep.id ? `${colors.success}15` : 'white'
                }}
                onClick={() => setSelectedRepartidor(rep.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ fontSize: 32 }}>{rep.foto}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{rep.nombre}</div>
                    <div style={{ fontSize: 12, color: colors.gray500 }}>
                      Licencia {rep.licencia} • {rep.experiencia}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: colors.warning }}>
                      ⭐ {rep.calificacion}
                    </div>
                    <Badge color="success" style={{ fontSize: 10, marginTop: 4 }}>Disponible</Badge>
                  </div>
                </div>
              </div>
            ))}
          </Card>

          <Card>
            <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600 }}>
              🚚 Vehículos Disponibles
            </h3>
            
            {vehiculos.map((veh, i) => (
              <div
                key={i}
                style={{
                  padding: 12,
                  border: `2px solid ${selectedVehiculo === veh.id ? colors.primary : colors.gray200}`,
                  borderRadius: 8,
                  marginBottom: 8,
                  cursor: 'pointer',
                  backgroundColor: selectedVehiculo === veh.id ? `${colors.primary}15` : 'white'
                }}
                onClick={() => setSelectedVehiculo(veh.id)}
              >
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: 8 
                }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{veh.nombre}</div>
                    <div style={{ fontSize: 12, color: colors.gray500 }}>
                      {veh.placas} • {veh.tipo}
                    </div>
                  </div>
                  <Badge color="success">Disponible</Badge>
                </div>

                <div style={{ display: 'flex', gap: 16, fontSize: 12, color: colors.gray600 }}>
                  <div>📦 {veh.capacidadKg} kg</div>
                  <div>📏 {veh.capacidadM3} m³</div>
                  <div>⛽ {veh.combustible}%</div>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>

      {/* Modal: Generar Ruta Automática */}
      {showGenerarModal && (
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
            padding: 24,
            width: '90%',
            maxWidth: 900,
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: 24 
            }}>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>
                ⚡ Generar Ruta Automática de Reparto
              </h2>
              <button
                onClick={() => setShowGenerarModal(false)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  padding: 4 
                }}
              >
                <X size={24} color={colors.gray400} />
              </button>
            </div>

            {/* Paso 1: Selección */}
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>
                1️⃣ Selecciona Repartidor y Vehículo
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: 12, 
                    fontWeight: 600, 
                    marginBottom: 8 
                  }}>
                    Repartidor *
                  </label>
                  <select
                    value={selectedRepartidor}
                    onChange={(e) => setSelectedRepartidor(e.target.value)}
                    style={{
                      width: '100%',
                      padding: 10,
                      border: `1px solid ${colors.gray300}`,
                      borderRadius: 8,
                      fontSize: 14
                    }}
                  >
                    <option value="">Seleccionar repartidor...</option>
                    {repartidores.map(r => (
                      <option key={r.id} value={r.id}>
                        {r.nombre} - {r.licencia} ({r.experiencia})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: 12, 
                    fontWeight: 600, 
                    marginBottom: 8 
                  }}>
                    Vehículo *
                  </label>
                  <select
                    value={selectedVehiculo}
                    onChange={(e) => setSelectedVehiculo(e.target.value)}
                    style={{
                      width: '100%',
                      padding: 10,
                      border: `1px solid ${colors.gray300}`,
                      borderRadius: 8,
                      fontSize: 14
                    }}
                  >
                    <option value="">Seleccionar vehículo...</option>
                    {vehiculos.map(v => (
                      <option key={v.id} value={v.id}>
                        {v.nombre} - {v.tipo} (Cap: {v.capacidadKg}kg)
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Paso 2: Parámetros */}
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>
                2️⃣ Parámetros de Optimización
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: 12, 
                    fontWeight: 600, 
                    marginBottom: 8 
                  }}>
                    Hora de inicio de ruta
                  </label>
                  <input
                    type="time"
                    defaultValue="07:00"
                    style={{
                      width: '100%',
                      padding: 10,
                      border: `1px solid ${colors.gray300}`,
                      borderRadius: 8,
                      fontSize: 14
                    }}
                  />
                </div>

                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: 12, 
                    fontWeight: 600, 
                    marginBottom: 8 
                  }}>
                    Tiempo estimado por entrega
                  </label>
                  <input
                    type="number"
                    defaultValue="20"
                    min="10"
                    max="60"
                    style={{
                      width: '100%',
                      padding: 10,
                      border: `1px solid ${colors.gray300}`,
                      borderRadius: 8,
                      fontSize: 14
                    }}
                  />
                  <div style={{ fontSize: 11, color: colors.gray500, marginTop: 4 }}>
                    minutos por cliente
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 16 }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: 12, 
                  fontWeight: 600, 
                  marginBottom: 8 
                }}>
                  Criterios de optimización
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ display: 'flex', alignItems: 'center', fontSize: 14 }}>
                    <input type="checkbox" defaultChecked style={{ marginRight: 8 }} />
                    Minimizar distancia total
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', fontSize: 14 }}>
                    <input type="checkbox" defaultChecked style={{ marginRight: 8 }} />
                    Respetar ventanas horarias de clientes
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', fontSize: 14 }}>
                    <input type="checkbox" defaultChecked style={{ marginRight: 8 }} />
                    Validar capacidad del vehículo
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', fontSize: 14 }}>
                    <input type="checkbox" style={{ marginRight: 8 }} />
                    Considerar tráfico histórico (zona norte: +15% tiempo)
                  </label>
                </div>
              </div>
            </div>

            {/* Paso 3: Vista previa */}
            {selectedRepartidor && selectedVehiculo && (
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>
                  3️⃣ Vista Previa de Ruta Generada
                </h3>
                
                <Card style={{ backgroundColor: colors.gray50, padding: 16 }}>
                  <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, color: colors.gray600, marginBottom: 4 }}>
                        Repartidor
                      </div>
                      <div style={{ fontWeight: 600 }}>
                        {repartidores.find(r => r.id === selectedRepartidor)?.nombre}
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, color: colors.gray600, marginBottom: 4 }}>
                        Vehículo
                      </div>
                      <div style={{ fontWeight: 600 }}>
                        {vehiculos.find(v => v.id === selectedVehiculo)?.nombre}
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, color: colors.gray600, marginBottom: 4 }}>
                        Fecha
                      </div>
                      <div style={{ fontWeight: 600 }}>{selectedDate}</div>
                    </div>
                  </div>

                  {/* Métricas */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(4, 1fr)', 
                    gap: 12, 
                    marginBottom: 16 
                  }}>
                    <div style={{ 
                      textAlign: 'center', 
                      padding: 12, 
                      backgroundColor: 'white', 
                      borderRadius: 8 
                    }}>
                      <div style={{ fontSize: 24, fontWeight: 700, color: colors.primary }}>
                        {pedidosConfirmados.length}
                      </div>
                      <div style={{ fontSize: 11, color: colors.gray500 }}>Entregas</div>
                    </div>
                    <div style={{ 
                      textAlign: 'center', 
                      padding: 12, 
                      backgroundColor: 'white', 
                      borderRadius: 8 
                    }}>
                      <div style={{ fontSize: 24, fontWeight: 700, color: colors.success }}>
                        32.5 km
                      </div>
                      <div style={{ fontSize: 11, color: colors.gray500 }}>Distancia</div>
                    </div>
                    <div style={{ 
                      textAlign: 'center', 
                      padding: 12, 
                      backgroundColor: 'white', 
                      borderRadius: 8 
                    }}>
                      <div style={{ fontSize: 24, fontWeight: 700, color: colors.warning }}>
                        5h 45min
                      </div>
                      <div style={{ fontSize: 11, color: colors.gray500 }}>Tiempo Total</div>
                    </div>
                    <div style={{ 
                      textAlign: 'center', 
                      padding: 12, 
                      backgroundColor: 'white', 
                      borderRadius: 8 
                    }}>
                      <div style={{ fontSize: 24, fontWeight: 700, color: colors.accent }}>
                        92.4 kg
                      </div>
                      <div style={{ fontSize: 11, color: colors.gray500 }}>Peso Total</div>
                    </div>
                  </div>

                  {/* Secuencia optimizada */}
                  <div style={{ marginTop: 16 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
                      📍 Secuencia de Entregas (Optimizada)
                    </div>
                    
                    {rutaOptimizada.map((item, i) => {
                      const pesoTotal = item.pedido.productos.reduce((sum, p) => sum + p.peso, 0);
                      
                      return (
                        <div
                          key={i}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            padding: 12,
                            backgroundColor: 'white',
                            borderRadius: 8,
                            marginBottom: 8,
                            border: `2px solid ${colors.gray200}`
                          }}
                        >
                          <div
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 16,
                              backgroundColor: colors.primary,
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              flexShrink: 0
                            }}
                          >
                            {item.orden}
                          </div>
                          
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, fontSize: 14 }}>
                              {item.pedido.cliente.nombre}
                            </div>
                            <div style={{ fontSize: 12, color: colors.gray500 }}>
                              {item.pedido.productos.length} productos • {pesoTotal.toFixed(1)} kg
                            </div>
                          </div>

                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: colors.success }}>
                              {item.hora}
                            </div>
                            <div style={{ fontSize: 11, color: colors.gray500 }}>
                              {item.distancia}
                            </div>
                          </div>

                          <Badge color={item.pedido.prioridad === 'alta' ? 'danger' : 'warning'}>
                            {item.pedido.prioridad}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>

                  {/* Validaciones */}
                  <div style={{ 
                    marginTop: 16, 
                    padding: 12, 
                    backgroundColor: `${colors.success}15`, 
                    borderRadius: 8,
                    border: `1px solid ${colors.success}`
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 8, 
                      marginBottom: 8 
                    }}>
                      <CheckCircle size={18} color={colors.success} />
                      <span style={{ fontSize: 13, fontWeight: 600 }}>
                        Validaciones Correctas
                      </span>
                    </div>
                    <ul style={{ 
                      margin: 0, 
                      paddingLeft: 24, 
                      fontSize: 12, 
                      color: colors.gray700 
                    }}>
                      <li>Capacidad del vehículo: 92.4 kg / 3500 kg (2.6%)</li>
                      <li>Todas las entregas dentro de ventanas horarias</li>
                      <li>Ruta optimizada por distancia mínima (-23% vs original)</li>
                      <li>Tiempo estimado dentro de jornada laboral</li>
                    </ul>
                  </div>
                </Card>
              </div>
            )}

            {/* Botones de acción */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <Button
                variant="secondary"
                onClick={() => setShowGenerarModal(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                icon={<CheckCircle size={18} />}
                onClick={() => {
                  setRutaGenerada({
                    id: 'RUT-2026-007',
                    fecha: selectedDate,
                    repartidor: repartidores.find(r => r.id === selectedRepartidor),
                    vehiculo: vehiculos.find(v => v.id === selectedVehiculo),
                    entregas: 5,
                    distancia: 32.5,
                    tiempo: 345
                  });
                  setShowGenerarModal(false);
                }}
                disabled={!selectedRepartidor || !selectedVehiculo}
              >
                Confirmar y Generar Ruta
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Toast de confirmación */}
      {rutaGenerada && (
        <div style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          backgroundColor: colors.success,
          color: 'white',
          padding: 16,
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          minWidth: 400,
          zIndex: 1001,
          animation: 'slideIn 0.3s ease-out'
        }}>
          <CheckCircle size={24} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>
              ✅ Ruta Generada Exitosamente
            </div>
            <div style={{ fontSize: 13, opacity: 0.9 }}>
              {rutaGenerada.entregas} entregas • {rutaGenerada.distancia} km • {Math.floor(rutaGenerada.tiempo / 60)}h {rutaGenerada.tiempo % 60}min
            </div>
          </div>
          <button
            onClick={() => setRutaGenerada(null)}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              color: 'white', 
              padding: 4 
            }}
          >
            <X size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Planificacion;
