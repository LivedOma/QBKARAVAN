import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { colors } from '../shared/colors.js';
import WebSidebar from './components/WebSidebar.jsx';
import Login from './components/Login.jsx';

// Importar todos los componentes
import Dashboard from './components/Dashboard.jsx';
import Planificacion from './components/Planificacion.jsx';
import Monitoreo from './components/Monitoreo.jsx';
import Clientes from './components/Clientes.jsx';
import Productos from './components/Productos.jsx';
import Inventario from './components/Inventario.jsx';
import Cobranza from './components/Cobranza.jsx';
import NotasCredito from './components/NotasCredito.jsx';
import Usuarios from './components/Usuarios.jsx';
import Devoluciones from './components/Devoluciones.jsx';
import Liquidacion from './components/Liquidacion.jsx';
import Reportes from './components/Reportes.jsx';
import Integracion from './components/Integracion.jsx';
import Configuracion from './components/Configuracion.jsx';

// Aplicación Panel Web
const WebApp = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar si hay sesión activa al cargar
  useEffect(() => {
    const token = localStorage.getItem('sivr_token');
    console.log('Verificando token al cargar:', token);
    if (token) {
      console.log('Token encontrado, autenticando...');
      setIsAuthenticated(true);
    } else {
      console.log('No hay token, mostrando login');
    }
  }, []);

  // Manejar login exitoso
  const handleLogin = () => {
    console.log('handleLogin llamado en WebApp');
    setIsAuthenticated(true);
    console.log('isAuthenticated actualizado a true');
  };

  // Manejar logout
  const handleLogout = () => {
    console.log('Cerrando sesión...');
    localStorage.removeItem('sivr_token');
    localStorage.removeItem('sivr_user');
    localStorage.removeItem('sivr_remember');
    setIsAuthenticated(false);
    setCurrentPage('dashboard');
  };

  // Si no está autenticado, mostrar pantalla de login
  if (!isAuthenticated) {
    console.log('Renderizando Login, isAuthenticated:', isAuthenticated);
    return <Login onLogin={handleLogin} />;
  }

  console.log('Usuario autenticado, renderizando Dashboard');

  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'planificacion': return <Planificacion />;
      case 'monitoreo': return <Monitoreo />;
      case 'clientes': return <Clientes />;
      case 'productos': return <Productos />;
      case 'inventario': return <Inventario />;
      case 'cobranza': return <Cobranza />;
      case 'reportes': return <Reportes />;
      case 'usuarios': return <Usuarios />;
      case 'devoluciones': return <Devoluciones />;
      case 'notas-credito': return <NotasCredito />;
      case 'liquidacion': return <Liquidacion />;
      case 'integracion': return <Integracion />;
      case 'configuracion': return <Configuracion />;
      default: return <Dashboard />;
    }
  };

  return (
    <div style={{ backgroundColor: colors.gray50, minHeight: '100vh', paddingLeft: 240 }}>
      <WebSidebar currentPage={currentPage} onNavigate={setCurrentPage} onLogout={handleLogout} />
      <div style={{ minHeight: '100vh' }}>
        {renderPage()}
      </div>
    </div>
  );
};

// Renderizar la aplicaci�n
const root = document.getElementById('root');
createRoot(root).render(<WebApp />);
