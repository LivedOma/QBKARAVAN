import React, { useState } from 'react';
import { Map, MapPin, Clock, ChevronRight, Layers } from 'lucide-react';
import { MobileFrame, MobileBottomNav, Card, Button } from '../../shared/MobileComponents.jsx';
import { colors } from '../../shared/colors.js';
import { ReordenarRuta } from './ReordenarRuta.jsx';

// Componente Badge simple
const Badge = ({ children }) => (
  <span style={{
    backgroundColor: colors.accent,
    color: colors.white,
    padding: '2px 8px',
    borderRadius: 12,
    fontSize: 10,
    fontWeight: 600,
  }}>{children}</span>
);

// Barra de progreso
const ProgressBar = ({ value, max }) => (
  <div style={{
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    overflow: 'hidden'
  }}>
    <div style={{
      width: `${(value / max) * 100}%`,
      height: '100%',
      backgroundColor: 'rgba(255,255,255,0.9)',
      transition: 'width 0.3s ease'
    }} />
  </div>
);

const clientesData = [
  { id: 1, name: 'Abarrotes Don José', address: 'Av. Juárez 234', time: '9:30', status: 'next', amount: '$2,450', distance: '2.3 km' },
  { id: 2, name: 'Mini Super El Sol', address: 'Calle 5 de Mayo 89', time: '10:15', status: 'pending', amount: '$1,890', distance: '3.1 km' },
  { id: 3, name: 'Tienda La Esquina', address: 'Blvd. Centro 456', time: '11:00', status: 'pending', amount: '$3,200', distance: '4.5 km' },
  { id: 4, name: 'Comercial Pérez', address: 'Av. Industrial 78', time: '11:45', status: 'pending', amount: '$4,100', distance: '5.8 km' },
  { id: 5, name: 'Abarrotes La Popular', address: 'Col. Moderna 123', time: '12:30', status: 'pending', amount: '$2,100', distance: '7.2 km' },
  { id: 6, name: 'Super Economía', address: 'Av. Universidad 567', time: '13:15', status: 'pending', amount: '$3,450', distance: '8.9 km' },
  { id: 7, name: 'Tienda Mi Barrio', address: 'Calle Reforma 89', time: '14:00', status: 'pending', amount: '$1,750', distance: '10.1 km' },
];

export const ClientesRuta = ({ onSelectClient, onNavigate, currentScreen, notificationCount = 0, navItems }) => {
  const visitados = 5;
  const total = 12;
  const [mostrarReordenar, setMostrarReordenar] = useState(false);
  const [clientes, setClientes] = useState(clientesData);

  const handleSaveOrder = (newOrder) => {
    setClientes(newOrder);
    setMostrarReordenar(false);
    alert('✅ Nuevo orden de ruta guardado');
  };

  if (mostrarReordenar) {
    return <ReordenarRuta 
      clientesIniciales={clientes}
      onSave={handleSaveOrder}
      onCancel={() => setMostrarReordenar(false)}
    />;
  }

  return (
    <MobileFrame title="Mi Ruta de Hoy" statusBar={true}>
      <div style={{ padding: 16 }}>
        {/* Tarjeta de Resumen */}
        <Card style={{ 
          marginBottom: 16, 
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`, 
          color: colors.white 
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>Lunes, 7 Enero 2026</div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Ruta Norte-01</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 28, fontWeight: 700 }}>{total}</div>
              <div style={{ fontSize: 11, opacity: 0.8 }}>clientes</div>
            </div>
          </div>
          <ProgressBar value={visitados} max={total} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11 }}>
            <span>{visitados} visitados</span>
            <span>{total - visitados} pendientes</span>
          </div>
        </Card>

        {/* Botones de Acción */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <Button variant="secondary" icon={<Map size={16} />}>Ver Mapa</Button>
          <Button 
            variant="primary" 
            icon={<Layers size={16} />}
            onClick={() => setMostrarReordenar(true)}
          >
            Reordenar
          </Button>
        </div>

        {/* Título */}
        <div style={{ fontSize: 12, fontWeight: 600, color: colors.gray500, marginBottom: 8 }}>
          PRÓXIMAS VISITAS
        </div>

        {/* Lista de Clientes */}
        {clientes.map((client, i) => (
          <Card 
            key={client.id} 
            onClick={() => onSelectClient && onSelectClient(client)} 
            style={{ 
              marginBottom: 8, 
              border: client.status === 'next' ? `2px solid ${colors.accent}` : 'none',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: colors.gray800 }}>
                    {client.name}
                  </span>
                  {client.status === 'next' && <Badge>Siguiente</Badge>}
                </div>
                <div style={{ fontSize: 12, color: colors.gray500, marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <MapPin size={12} />{client.address} • {client.distance}
                </div>
                <div style={{ fontSize: 12, color: colors.gray500, marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Clock size={12} />{client.time} - Pedido sugerido: <strong>{client.amount}</strong>
                </div>
              </div>
              <ChevronRight size={20} color={colors.gray400} />
            </div>
          </Card>
        ))}
      </div>

      {/* Navegación inferior */}
      <MobileBottomNav 
        active={currentScreen}
        onNavigate={onNavigate}
        notificationCount={notificationCount}
        items={navItems || [
          { id: 'home', label: 'Inicio', icon: <Map size={20} /> },
          { id: 'clientes', label: 'Clientes', icon: <MapPin size={20} /> },
          { id: 'pedido', label: 'Pedido', icon: <Clock size={20} /> },
          { id: 'inventario', label: 'Inventario', icon: <Layers size={20} /> },
          { id: 'notificaciones', label: 'Alertas', icon: <Map size={20} /> },
        ]}
      />
    </MobileFrame>
  );
};
