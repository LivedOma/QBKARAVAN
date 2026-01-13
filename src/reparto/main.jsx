import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Home, Truck, DollarSign, Package, MapPin, FileText } from 'lucide-react';
import { MobileFrame, MobileBottomNav } from '../shared/MobileComponents.jsx';
import { colors } from '../shared/colors.js';
import CargaVehiculo from './components/CargaVehiculo.jsx';
import RutaDia from './components/RutaDia.jsx';
import ResumenCliente from './components/ResumenCliente.jsx';
import ProcesoEntrega from './components/ProcesoEntrega.jsx';
import DevolucionCliente from './components/DevolucionCliente.jsx';
import Cobranza from './components/Cobranza.jsx';
import RecepcionDevolucion from './components/RecepcionDevolucion.jsx';
import InventarioRuta from './components/InventarioRuta.jsx';
import LiquidacionRuta from './components/LiquidacionRuta.jsx';

// Aplicación Reparto
const RepartoApp = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [entregaSeleccionada, setEntregaSeleccionada] = useState(null);
  const [vehiculoCargado, setVehiculoCargado] = useState(false);

  const handleSelectEntrega = (entrega) => {
    setEntregaSeleccionada(entrega);
    setCurrentScreen('resumen-cliente');
  };

  const handleCompletarCarga = () => {
    setVehiculoCargado(true);
    setCurrentScreen('home');
  };

  const navItems = [
    { id: 'home', label: 'Inicio', icon: <Home size={20} /> },
    { id: 'entregas', label: 'Entregas', icon: <Truck size={20} /> },
    { id: 'cobranza', label: 'Cobranza', icon: <DollarSign size={20} /> },
    { id: 'inventario', label: 'Inventario', icon: <Package size={20} /> },
    { id: 'liquidacion', label: 'Liquidar', icon: <FileText size={20} /> },
  ];

  // Pantalla de Inicio
  const HomeScreen = () => (
    <MobileFrame title="Karavan - Reparto" statusBar={true}>
      <div style={{ padding: 16 }}>
        <div style={{
          background: `linear-gradient(135deg, #f093fb, #f5576c)`,
          borderRadius: 16,
          padding: 24,
          color: 'white',
          marginBottom: 20
        }}>
          <h2 style={{ fontSize: 24, marginBottom: 8 }}>¡Buen Día!</h2>
          <p style={{ fontSize: 14, opacity: 0.9 }}>Repartidor: Carlos Martínez</p>
          <p style={{ fontSize: 12, opacity: 0.8, marginTop: 8 }}>
            Ruta: Oriente-Norte-02
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          marginBottom: 20
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: 32, fontWeight: 'bold', color: colors.primary }}>
              24
            </div>
            <div style={{ fontSize: 12, color: colors.gray500, marginTop: 4 }}>
              Entregas Hoy
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: 32, fontWeight: 'bold', color: colors.success }}>
              16
            </div>
            <div style={{ fontSize: 12, color: colors.gray500, marginTop: 4 }}>
              Completadas
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: 28, fontWeight: 'bold', color: colors.accent }}>
              $8,300
            </div>
            <div style={{ fontSize: 12, color: colors.gray500, marginTop: 4 }}>
              Cobrado
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: 32, fontWeight: 'bold', color: colors.warning }}>
              67%
            </div>
            <div style={{ fontSize: 12, color: colors.gray500, marginTop: 4 }}>
              Avance Ruta
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: 16,
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: 16
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
            Próxima Entrega
          </h3>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: 12,
            backgroundColor: colors.gray50,
            borderRadius: 8
          }}>
            <MapPin size={24} color={colors.primary} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>
                Súper 24 Horas
              </div>
              <div style={{ fontSize: 12, color: colors.gray500 }}>
                Av. Insurgentes 456
              </div>
            </div>
            <div style={{
              fontSize: 12,
              fontWeight: 600,
              color: colors.accent,
              backgroundColor: colors.accent + '20',
              padding: '4px 8px',
              borderRadius: 4
            }}>
              1.2 km
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: 16,
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
            Acciones Rápidas
          </h3>
          
          {/* Letrero de Cargar Vehículo */}
          {!vehiculoCargado && (
            <div style={{
              padding: 12,
              backgroundColor: '#FEF3C7',
              border: '2px solid #F59E0B',
              borderRadius: 8,
              marginBottom: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <Truck size={20} color="#F59E0B" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#92400E' }}>
                  ⚠️ Cargar Vehículo Requerido
                </div>
                <div style={{ fontSize: 12, color: '#92400E', marginTop: 2 }}>
                  Carga tu vehículo antes de iniciar la ruta
                </div>
              </div>
            </div>
          )}

          <button 
            disabled={vehiculoCargado}
            style={{
              width: '100%',
              padding: 16,
              backgroundColor: vehiculoCargado ? colors.gray300 : '#f5576c',
              color: vehiculoCargado ? colors.gray500 : 'white',
              border: 'none',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              cursor: vehiculoCargado ? 'not-allowed' : 'pointer',
              marginBottom: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              opacity: vehiculoCargado ? 0.6 : 1
            }} 
            onClick={() => !vehiculoCargado && setCurrentScreen('carga-vehiculo')}
          >
            <Truck size={20} />
            {vehiculoCargado ? '✓ Vehículo Cargado' : 'Cargar Vehículo'}
          </button>

          <button 
            disabled={!vehiculoCargado}
            style={{
              width: '100%',
              padding: 16,
              backgroundColor: vehiculoCargado ? colors.success : colors.gray300,
              color: vehiculoCargado ? 'white' : colors.gray500,
              border: 'none',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              cursor: vehiculoCargado ? 'pointer' : 'not-allowed',
              marginBottom: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              opacity: vehiculoCargado ? 1 : 0.6
            }} 
            onClick={() => vehiculoCargado && setCurrentScreen('ruta-dia')}
          >
            <Truck size={20} />
            Iniciar Ruta del Día
          </button>

          <button style={{
            width: '100%',
            padding: 16,
            backgroundColor: 'white',
            color: '#f5576c',
            border: `2px solid #f5576c`,
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            marginBottom: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8
          }} onClick={() => setCurrentScreen('inventario')}>
            <Package size={20} />
            Inventario en Ruta
          </button>

          <button style={{
            width: '100%',
            padding: 16,
            backgroundColor: 'white',
            color: '#f5576c',
            border: `2px solid #f5576c`,
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8
          }} onClick={() => setCurrentScreen('devoluciones')}>
            <FileText size={20} />
            Recepción de Devoluciones
          </button>
        </div>

        <div style={{
          marginTop: 20,
          padding: 16,
          backgroundColor: '#f5576c10',
          borderRadius: 12,
          border: `1px solid #f5576c40`
        }}>
          <p style={{ fontSize: 12, color: '#f5576c', textAlign: 'center' }}>
            🚚 <strong>Aplicación Independiente de Reparto</strong>
          </p>
          <p style={{ fontSize: 11, color: colors.gray600, textAlign: 'center', marginTop: 4 }}>
            Ejecutándose en puerto 3002
          </p>
        </div>
      </div>
      <MobileBottomNav active={currentScreen} onNavigate={setCurrentScreen} items={navItems} />
    </MobileFrame>
  );

  const PlaceholderScreen = ({ title }) => (
    <MobileFrame title={title} showBack={true} onBack={() => setCurrentScreen('home')}>
      <div style={{
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 400
      }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🚧</div>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
          Módulo en Construcción
        </h3>
        <p style={{ fontSize: 14, color: colors.gray500, textAlign: 'center' }}>
          Este módulo se importará del sistema completo.<br />
          Por ahora mostramos una vista placeholder.
        </p>
      </div>
      <MobileBottomNav active={currentScreen} onNavigate={setCurrentScreen} items={navItems} />
    </MobileFrame>
  );

  // Renderizado condicional
  if (currentScreen === 'home') return <HomeScreen />;
  if (currentScreen === 'carga-vehiculo') return (
    <MobileFrame title="Carga de Vehículo" showBack onBack={() => setCurrentScreen('home')}>
      <CargaVehiculo 
        onNavigate={setCurrentScreen} 
        onCompletarCarga={handleCompletarCarga}
      />
      <MobileBottomNav active={currentScreen} onNavigate={setCurrentScreen} items={navItems} />
    </MobileFrame>
  );
  if (currentScreen === 'ruta-dia') return (
    <MobileFrame title="Ruta del Día" showBack onBack={() => setCurrentScreen('home')}>
      <RutaDia onNavigate={setCurrentScreen} onSelectEntrega={handleSelectEntrega} />
      <MobileBottomNav active={currentScreen} onNavigate={setCurrentScreen} items={navItems} />
    </MobileFrame>
  );
  if (currentScreen === 'resumen-cliente') return (
    <MobileFrame 
      title={entregaSeleccionada?.cliente || 'Cliente'} 
      showBack 
      onBack={() => setCurrentScreen('ruta-dia')}
    >
      <ResumenCliente 
        cliente={entregaSeleccionada} 
        onNavigate={(screen) => {
          if (screen === 'entrega') {
            setCurrentScreen('entrega');
          } else if (screen === 'devolucion-cliente') {
            setCurrentScreen('devolucion-cliente');
          }
        }}
      />
      <MobileBottomNav active="entregas" onNavigate={setCurrentScreen} items={navItems} />
    </MobileFrame>
  );
  if (currentScreen === 'devolucion-cliente') return (
    <MobileFrame 
      title="Gestionar Devolución" 
      showBack 
      onBack={() => setCurrentScreen('resumen-cliente')}
    >
      <DevolucionCliente 
        cliente={entregaSeleccionada} 
        onNavigate={(screen) => {
          if (screen === 'resumen-cliente') {
            setCurrentScreen('resumen-cliente');
          }
        }}
      />
      <MobileBottomNav active="entregas" onNavigate={setCurrentScreen} items={navItems} />
    </MobileFrame>
  );
  if (currentScreen === 'entrega') return (
    <MobileFrame title="Entrega #127" showBack onBack={() => setCurrentScreen('resumen-cliente')}>
      <ProcesoEntrega 
        entrega={entregaSeleccionada} 
        onNavigate={setCurrentScreen}
        onCompletarEntrega={() => setCurrentScreen('cobranza')}
      />
      <MobileBottomNav active={currentScreen} onNavigate={setCurrentScreen} items={navItems} />
    </MobileFrame>
  );
  if (currentScreen === 'cobranza') return (
    <MobileFrame title="Cobranza" showBack onBack={() => setCurrentScreen('resumen-cliente')}>
      <Cobranza 
        entrega={entregaSeleccionada}
        onNavigate={setCurrentScreen}
        onCompletarCobranza={() => setCurrentScreen('resumen-cliente')}
      />
      <MobileBottomNav active={currentScreen} onNavigate={setCurrentScreen} items={navItems} />
    </MobileFrame>
  );
  if (currentScreen === 'devoluciones') return (
    <MobileFrame title="Recepción de Devoluciones" showBack onBack={() => setCurrentScreen('home')}>
      <RecepcionDevolucion onNavigate={setCurrentScreen} />
      <MobileBottomNav active={currentScreen} onNavigate={setCurrentScreen} items={navItems} />
    </MobileFrame>
  );
  if (currentScreen === 'inventario') return (
    <MobileFrame title="Inventario en Ruta" showBack onBack={() => setCurrentScreen('home')}>
      <InventarioRuta onNavigate={setCurrentScreen} />
      <MobileBottomNav active={currentScreen} onNavigate={setCurrentScreen} items={navItems} />
    </MobileFrame>
  );
  if (currentScreen === 'entregas') return (
    <MobileFrame title="Ruta del Día" showBack onBack={() => setCurrentScreen('home')}>
      <RutaDia onNavigate={setCurrentScreen} onSelectEntrega={handleSelectEntrega} />
      <MobileBottomNav active={currentScreen} onNavigate={setCurrentScreen} items={navItems} />
    </MobileFrame>
  );
  if (currentScreen === 'liquidacion') return (
    <MobileFrame title="Liquidación de Ruta" showBack onBack={() => setCurrentScreen('home')}>
      <LiquidacionRuta onNavigate={setCurrentScreen} />
      <MobileBottomNav active={currentScreen} onNavigate={setCurrentScreen} items={navItems} />
    </MobileFrame>
  );

  return <HomeScreen />;
};

// Renderizar la aplicación
const root = document.getElementById('root');
createRoot(root).render(<RepartoApp />);
