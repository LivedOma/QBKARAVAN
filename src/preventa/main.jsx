import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Home, Package, Users, FileText, Bell, Settings } from 'lucide-react';
import { MobileFrame, MobileBottomNav } from '../shared/MobileComponents.jsx';
import { colors } from '../shared/colors.js';
import Login from './components/Login.jsx';
import { ClientesRuta } from './components/ClientesRuta.jsx';
import { DetalleCliente } from './components/DetalleCliente.jsx';
import { CatalogoProductos } from './components/CatalogoProductos.jsx';
import { CapturaPedido } from './components/CapturaPedido.jsx';
import { ListaPedidos } from './components/ListaPedidos.jsx';
import { Inventario } from './components/Inventario.jsx';
import { Notificaciones } from './components/Notificaciones.jsx';
import { RegistroNoVisita } from './components/RegistroNoVisita.jsx';
import { Sincronizacion } from './components/Sincronizacion.jsx';
import { RegistrarDevolucion } from './components/RegistrarDevolucion.jsx';
import { HistorialCompleto } from './components/HistorialCompleto.jsx';
import { ComprobantePedido } from './components/ComprobantePedido.jsx';
import { ComprobanteNotaCredito } from './components/ComprobanteNotaCredito.jsx';
import NotificationService from '../shared/NotificationService.js';

// Aplicación Preventa
const PreventaApp = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [showCatalogo, setShowCatalogo] = useState(false);
  const [pedidoProductos, setPedidoProductos] = useState([]);
  const [notificationCount, setNotificationCount] = useState(NotificationService.unreadCount);
  const [clienteParaPedido, setClienteParaPedido] = useState(null); // Cliente desde el cual se crea el pedido
  const [mostrarNoVisita, setMostrarNoVisita] = useState(false);
  const [mostrarDevolucion, setMostrarDevolucion] = useState(false);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false); // Estado de check-in
  const [pedidoConfirmado, setPedidoConfirmado] = useState(null); // Datos del pedido confirmado para comprobante
  const [notaCreditoConfirmada, setNotaCreditoConfirmada] = useState(null); // Datos de la NC confirmada

  // Verificar si hay sesión activa al cargar
  useEffect(() => {
    const token = localStorage.getItem('karavan_preventa_token');
    console.log('Preventa - Verificando token al cargar:', token);
    if (token) {
      console.log('Preventa - Token encontrado, autenticando...');
      setIsAuthenticated(true);
    } else {
      console.log('Preventa - No hay token, mostrando login');
    }
  }, []);

  // Suscribirse a cambios en notificaciones
  useEffect(() => {
    const unsubscribe = NotificationService.subscribe((notifs, count) => {
      setNotificationCount(count);
    });
    return unsubscribe;
  }, []);

  // Manejar login exitoso
  const handleLogin = () => {
    console.log('Preventa - handleLogin llamado');
    setIsAuthenticated(true);
    console.log('Preventa - isAuthenticated actualizado a true');
  };

  // Manejar logout
  const handleLogout = () => {
    console.log('Preventa - Cerrando sesión...');
    localStorage.removeItem('karavan_preventa_token');
    localStorage.removeItem('karavan_preventa_user');
    localStorage.removeItem('karavan_preventa_remember');
    setIsAuthenticated(false);
    setCurrentScreen('home');
    setIsCheckedIn(false);
  };

  // Si no está autenticado, mostrar pantalla de login
  if (!isAuthenticated) {
    console.log('Preventa - Renderizando Login, isAuthenticated:', isAuthenticated);
    return <Login onLogin={handleLogin} />;
  }

  console.log('Preventa - Usuario autenticado, renderizando app');

  const navItems = [
    { id: 'home', label: 'Inicio', icon: <Home size={20} /> },
    { id: 'clientes', label: 'Clientes', icon: <Users size={20} /> },
    { id: 'pedido', label: 'Pedido', icon: <FileText size={20} />, disabled: !isCheckedIn },
    { id: 'inventario', label: 'Inventario', icon: <Package size={20} />, disabled: !isCheckedIn },
    { id: 'notificaciones', label: 'Alertas', icon: <Bell size={20} /> },
  ];

  // Manejador personalizado de navegación
  const handleNavigate = (screenId, data) => {
    console.log('handleNavigate:', screenId, 'isCheckedIn:', isCheckedIn, 'selectedCliente:', selectedCliente, 'data:', data);
    
    // Manejar navegaciones especiales desde DetalleCliente
    if (screenId === 'pedidos' && data?.cliente) {
      // Guardar el cliente y cambiar a pantalla de pedidos
      setClienteParaPedido(data.cliente);
      setCurrentScreen('pedidos');
      return;
    } else if (screenId === 'no-visitar') {
      // Mostrar pantalla de No Visita
      setMostrarNoVisita(true);
      return;
    } else if (screenId === 'devolucion') {
      // Mostrar pantalla de Devolución
      setMostrarDevolucion(true);
      return;
    } else if (screenId === 'historial') {
      // Mostrar pantalla de Historial Completo
      setMostrarHistorial(true);
      return;
    }
    
    // Si se clickea "Pedido" y está checked in, abrir CapturaPedido con el cliente actual
    if (screenId === 'pedido') {
      if (isCheckedIn && selectedCliente) {
        // Cliente seleccionado: abrir flujo de nuevo pedido
        console.log('Abriendo nuevo pedido para cliente:', selectedCliente.name);
        setClienteParaPedido(selectedCliente);
        setCurrentScreen('pedidos');
      } else {
        // Sin cliente: mostrar lista de pedidos
        console.log('Mostrando lista de pedidos');
        setCurrentScreen('pedidos');
      }
    } else {
      setCurrentScreen(screenId);
    }
  };

  // Pantalla de Inicio
  const HomeScreen = () => {
    // Obtener información del usuario del localStorage
    const getUserInfo = () => {
      const userStr = localStorage.getItem('karavan_preventa_user');
      if (userStr) {
        try {
          return JSON.parse(userStr);
        } catch (e) {
          return { nombre: 'Usuario', rol: 'Vendedor' };
        }
      }
      return { nombre: 'Usuario', rol: 'Vendedor' };
    };

    const user = getUserInfo();

    return (
    <MobileFrame title="Karavan - Preventa" statusBar={true}>
      <div style={{ padding: 16 }}>
        <div style={{
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
          borderRadius: 16,
          padding: 24,
          color: 'white',
          marginBottom: 20
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <div>
              <h2 style={{ fontSize: 24, margin: 0 }}>¡Bienvenido!</h2>
            </div>
            <button
              onClick={handleLogout}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: 'white',
                padding: '8px 12px',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Cerrar Sesión
            </button>
          </div>
          <p style={{ fontSize: 14, opacity: 0.9, margin: '8px 0 0 0' }}>{user.rol}: {user.nombre}</p>
          <p style={{ fontSize: 12, opacity: 0.8, marginTop: 8 }}>
            Ruta: Centro-Norte-05
          </p>
        </div>

        {/* Alerta de Check-In activo */}
        {isCheckedIn && selectedCliente && (
          <div style={{
            backgroundColor: `${colors.success}15`,
            border: `2px solid ${colors.success}`,
            borderRadius: 12,
            padding: 16,
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: colors.success,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 20
            }}>
              ✓
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: colors.gray800, marginBottom: 4 }}>
                Check-In Activo
              </div>
              <div style={{ fontSize: 13, color: colors.gray600 }}>
                {selectedCliente.name || 'Cliente'}
              </div>
              <div style={{ fontSize: 11, color: colors.gray500, marginTop: 2 }}>
                {selectedCliente.address || 'Sin dirección'}
              </div>
            </div>
          </div>
        )}

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
              15
            </div>
            <div style={{ fontSize: 12, color: colors.gray500, marginTop: 4 }}>
              Clientes Hoy
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: 32, fontWeight: 'bold', color: colors.success }}>
              8
            </div>
            <div style={{ fontSize: 12, color: colors.gray500, marginTop: 4 }}>
              Pedidos Tomados
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: 28, fontWeight: 'bold', color: colors.accent }}>
              $12,450
            </div>
            <div style={{ fontSize: 12, color: colors.gray500, marginTop: 4 }}>
              Venta del Día
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: 32, fontWeight: 'bold', color: colors.warning }}>
              53%
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
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
            Acciones Rápidas
          </h3>
          
          <button style={{
            width: '100%',
            padding: 16,
            backgroundColor: 'white',
            color: colors.primary,
            border: `2px solid ${colors.primary}`,
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginBottom: 8
          }} onClick={() => setCurrentScreen('clientes')}>
            <Users size={20} />
            Ver Clientes
          </button>

          <button style={{
            width: '100%',
            padding: 16,
            backgroundColor: isCheckedIn ? colors.primary : colors.gray300,
            color: 'white',
            border: 'none',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            cursor: isCheckedIn ? 'pointer' : 'not-allowed',
            marginBottom: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            opacity: isCheckedIn ? 1 : 0.6
          }} 
          onClick={() => {
            if (isCheckedIn && selectedCliente) {
              setClienteParaPedido(selectedCliente);
              setCurrentScreen('pedidos');
            }
          }}
          disabled={!isCheckedIn}
          >
            <FileText size={20} />
            Nuevo Pedido
          </button>

          <button style={{
            width: '100%',
            padding: 16,
            backgroundColor: 'white',
            color: colors.accent,
            border: `2px solid ${colors.accent}`,
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8
          }} onClick={() => setCurrentScreen('sincronizacion')}>
            <Settings size={20} />
            Sincronización
          </button>
        </div>

        <div style={{
          marginTop: 20,
          padding: 16,
          backgroundColor: colors.accent + '10',
          borderRadius: 12,
          border: `1px solid ${colors.accent}40`
        }}>
          <p style={{ fontSize: 12, color: colors.accent, textAlign: 'center' }}>
            📱 <strong>Aplicación Independiente de Preventa</strong>
          </p>
          <p style={{ fontSize: 11, color: colors.gray600, textAlign: 'center', marginTop: 4 }}>
            Ejecutándose en puerto 3001
          </p>
        </div>
      </div>
      <MobileBottomNav 
        active={currentScreen} 
        onNavigate={handleNavigate} 
        items={navItems}
        notificationCount={notificationCount}
      />
    </MobileFrame>
    );
  };

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
      <MobileBottomNav 
        active={currentScreen} 
        onNavigate={handleNavigate} 
        items={navItems}
        notificationCount={notificationCount}
      />
    </MobileFrame>
  );

  // Renderizado condicional
  if (currentScreen === 'home') return <HomeScreen />;
  
  // Mostrar Comprobante de Pedido
  if (pedidoConfirmado) {
    return <ComprobantePedido
      pedido={pedidoConfirmado}
      onBack={() => {
        // Limpiar estados y volver a clientes
        const clienteARestaurar = pedidoConfirmado.clienteOriginal;
        setPedidoConfirmado(null);
        setClienteParaPedido(null);
        setPedidoProductos([]);
        setShowCatalogo(false);
        setCurrentScreen('clientes');
        setSelectedCliente(clienteARestaurar);
      }}
    />;
  }
  
  // Mostrar Comprobante de Nota de Crédito
  if (notaCreditoConfirmada) {
    return <ComprobanteNotaCredito
      notaCredito={notaCreditoConfirmada}
      onBack={() => {
        // Limpiar estados y volver según el contexto
        setNotaCreditoConfirmada(null);
        if (selectedCliente) {
          setCurrentScreen('clientes');
        } else {
          setCurrentScreen('inventario');
        }
      }}
    />;
  }
  
  // Mostrar Registro No Visita
  if (mostrarNoVisita && selectedCliente) {
    return <RegistroNoVisita
      cliente={selectedCliente}
      onConfirm={(data) => {
        alert(`✅ Visita marcada como no realizada\n\nMotivo: ${data.motivo}\nHora: ${data.hora}`);
        setMostrarNoVisita(false);
        setSelectedCliente(null);
        setCurrentScreen('clientes');
      }}
      onCancel={() => setMostrarNoVisita(false)}
    />;
  }

  // Mostrar Registrar Devolución
  if (mostrarDevolucion) {
    return <RegistrarDevolucion
      onConfirm={(data) => {
        // Crear comprobante de nota de crédito
        const now = new Date();
        setNotaCreditoConfirmada({
          folio: `NC-${Date.now().toString().slice(-6)}`,
          fecha: now.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' }) + ', ' + 
                 now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
          cliente: selectedCliente ? {
            nombre: selectedCliente.name || 'Cliente General',
            rfc: 'N/A',
            direccion: selectedCliente.address || 'N/A',
            telefono: selectedCliente.phone || 'N/A',
            email: selectedCliente.email || 'N/A',
          } : {
            nombre: 'Cliente General',
            rfc: 'N/A',
            direccion: 'N/A',
            telefono: 'N/A',
            email: 'N/A',
          },
          producto: {
            nombre: 'Producto devuelto', // En producción vendría del formulario
            lote: data.lote,
            caducidad: data.caducidad,
            cantidad: data.quantity,
            precioUnitario: data.monto / data.quantity,
          },
          motivo: data.motivo,
          observaciones: data.observaciones,
          fotoCapturada: true,
          subtotal: data.monto / 1.16, // Sin IVA
          iva: data.monto - (data.monto / 1.16),
          total: data.monto,
          vendedor: 'Juan Pérez',
          estatus: 'Pendiente de Autorización',
        });
        setMostrarDevolucion(false);
      }}
      onBack={() => {
        setMostrarDevolucion(false);
        if (!selectedCliente) {
          setCurrentScreen('inventario');
        }
      }}
    />;
  }

  // Mostrar Historial Completo
  if (mostrarHistorial && selectedCliente) {
    return <HistorialCompleto
      cliente={selectedCliente}
      onBack={() => setMostrarHistorial(false)}
    />;
  }

  // Sincronización
  if (currentScreen === 'sincronizacion') {
    return <Sincronizacion
      onBack={() => setCurrentScreen('home')}
      onNavigate={setCurrentScreen}
      currentScreen={currentScreen}
      notificationCount={notificationCount}
    />;
  }
  
  if (currentScreen === 'clientes') {
    if (selectedCliente) {
      return <DetalleCliente 
        cliente={selectedCliente} 
        onBack={() => {
          setSelectedCliente(null);
          setIsCheckedIn(false); // Limpiar check-in al salir del cliente
        }} 
        onNavigate={handleNavigate}
        currentScreen={currentScreen}
        notificationCount={notificationCount}
        onCheckIn={setIsCheckedIn}
        navItems={navItems}
      />;
    }
    return <ClientesRuta 
      onSelectClient={(client) => setSelectedCliente(client)} 
      onNavigate={handleNavigate}
      currentScreen={currentScreen}
      notificationCount={notificationCount}
      navItems={navItems}
    />;
  }
  
  if (currentScreen === 'pedidos') {
    // Si hay un cliente seleccionado para crear pedido, mostrar el flujo de captura
    if (clienteParaPedido) {
      if (showCatalogo) {
        return <CatalogoProductos 
          onAddProduct={(prod) => {
            setPedidoProductos(prev => {
              const exists = prev.find(p => p.id === prod.id);
              if (exists) {
                return prev.map(p => p.id === prod.id ? {...p, qty: p.qty + 1} : p);
              }
              return [...prev, { ...prod, qty: 1, suggested: 1 }];
            });
            setShowCatalogo(false);
          }}
          onBack={() => setShowCatalogo(false)}
        />;
      }
      return <CapturaPedido 
        onOpenCatalog={() => setShowCatalogo(true)}
        onBack={() => {
          // Al finalizar pedido, regresar al detalle del cliente
          setCurrentScreen('clientes');
          setSelectedCliente(clienteParaPedido);
          setClienteParaPedido(null);
          setPedidoProductos([]);
          setShowCatalogo(false);
        }}
        productosIniciales={pedidoProductos}
        onConfirmarPedido={(pedidoData) => {
          // Guardar datos del pedido y mostrar comprobante
          const now = new Date();
          setPedidoConfirmado({
            folio: `PED-${Date.now().toString().slice(-6)}`,
            fecha: now.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' }) + ', ' + 
                   now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
            cliente: {
              nombre: clienteParaPedido?.name || 'Cliente',
              rfc: 'N/A',
              direccion: clienteParaPedido?.address || 'N/A',
              telefono: clienteParaPedido?.phone || 'N/A',
              email: clienteParaPedido?.email || 'N/A',
            },
            clienteOriginal: clienteParaPedido, // Guardar referencia al objeto cliente original
            productos: pedidoData.productos.map(p => ({
              nombre: p.name,
              cantidad: p.qty,
              precio: p.price,
              subtotal: p.price * p.qty,
            })),
            subtotal: pedidoData.subtotal,
            descuento: pedidoData.descuento || null,
            subtotalConDescuento: pedidoData.descuento ? pedidoData.subtotal - pedidoData.descuento.monto : pedidoData.subtotal,
            iva: (pedidoData.descuento ? pedidoData.subtotal - pedidoData.descuento.monto : pedidoData.subtotal) * 0.16,
            total: pedidoData.total,
            vendedor: 'Juan Pérez',
            condiciones: 'Pago: Crédito | Entrega: Programada',
          });
        }}
      />;
    }
    
    // Si no hay cliente seleccionado, mostrar lista de pedidos (sin opción de crear nuevo)
    return <ListaPedidos 
      onVerDetalle={(pedido) => {
        alert(`Ver detalle del pedido: ${pedido.id}`);
      }}
      onNavigate={setCurrentScreen}
      currentScreen={currentScreen}
      notificationCount={notificationCount}
    />;
  }
  
  if (currentScreen === 'inventario') {
    return <Inventario 
      onBack={() => setCurrentScreen('home')}
      onNavigate={handleNavigate}
      currentScreen={currentScreen}
      notificationCount={notificationCount}
      navItems={navItems}
    />;
  }
  
  if (currentScreen === 'notificaciones') {
    return <Notificaciones 
      onBack={() => setCurrentScreen('home')}
      onNavigate={setCurrentScreen}
      currentScreen={currentScreen}
    />;
  }

  return <HomeScreen />;
};

// Renderizar la aplicación
const root = document.getElementById('root');
createRoot(root).render(<PreventaApp />);
