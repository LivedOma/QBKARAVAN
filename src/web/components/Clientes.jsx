import React, { useState } from 'react';
import { Plus, Search, Filter, MapPin, Edit, Trash2, Eye, Phone, Mail, CreditCard, User, X, Save, Building, FileText, Package, DollarSign, Clock, Users as UsersIcon, Map as MapIcon } from 'lucide-react';
import { colors } from '../../shared/colors.js';
import { Card, Badge, Button } from '../../shared/SharedComponents.jsx';
import WebHeader from './WebHeader.jsx';
import WebTable from './WebTable.jsx';

const Clientes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterZone, setFilterZone] = useState('todas');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' o 'edit'
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [showDetalles, setShowDetalles] = useState(false);
  const [tabDetalles, setTabDetalles] = useState('general');

  // Datos de clientes
  const [clientes, setClientes] = useState([
    { 
      code: 'CLI-001', 
      name: 'Abarrotes Don José',
      razonSocial: 'Abarrotes Don José S.A. de C.V.',
      rfc: 'ADJ950815HG3',
      address: 'Av. Juárez 234',
      colonia: 'Centro',
      ciudad: 'Monterrey',
      estado: 'Nuevo León',
      cp: '64000',
      telefono: '81-1234-5678',
      email: 'contacto@donjose.com',
      contacto: 'José Martínez',
      zone: 'Norte',
      ruta: 'Ruta Norte-01',
      canal: 'Minorista',
      tamano: 'B',
      categoria: 'Abarrotes',
      credit: 25000,
      available: 18450,
      balance: 6550,
      diasCredito: 30,
      formaPago: 'Crédito',
      coords: { lat: 25.6866, lng: -100.3161 },
      status: 'Activo'
    },
    { 
      code: 'CLI-002', 
      name: 'Mini Super El Sol',
      razonSocial: 'Supermercados El Sol S.A.',
      rfc: 'MSS880520KL8',
      address: 'Calle 5 de Mayo 89',
      colonia: 'Del Valle',
      ciudad: 'Monterrey',
      estado: 'Nuevo León',
      cp: '64100',
      telefono: '81-2345-6789',
      email: 'admin@elsol.com.mx',
      contacto: 'Laura Sánchez',
      zone: 'Centro',
      ruta: 'Ruta Centro-03',
      canal: 'Detallista',
      tamano: 'A',
      categoria: 'Supermercado',
      credit: 15000,
      available: 15000,
      balance: 0,
      diasCredito: 15,
      formaPago: 'Contado',
      coords: { lat: 25.6920, lng: -100.3200 },
      status: 'Activo'
    },
    { 
      code: 'CLI-003', 
      name: 'Tienda La Esquina',
      razonSocial: 'Comercializadora La Esquina',
      rfc: 'CLE920310MN5',
      address: 'Blvd. Centro 456',
      colonia: 'San Pedro',
      ciudad: 'San Pedro Garza García',
      estado: 'Nuevo León',
      cp: '66230',
      telefono: '81-3456-7890',
      email: 'ventas@laesquina.mx',
      contacto: 'Roberto García',
      zone: 'Sur',
      ruta: 'Ruta Sur-02',
      canal: 'Minorista',
      tamano: 'C',
      categoria: 'Abarrotes',
      credit: 20000,
      available: 8200,
      balance: 11800,
      diasCredito: 30,
      formaPago: 'Crédito',
      coords: { lat: 25.6750, lng: -100.3100 },
      status: 'Activo'
    },
    { 
      code: 'CLI-004', 
      name: 'Comercial Pérez',
      razonSocial: 'Comercializadora Pérez Hnos.',
      rfc: 'CPH870215TP9',
      address: 'Av. Industrial 78',
      colonia: 'Industrial',
      ciudad: 'Monterrey',
      estado: 'Nuevo León',
      cp: '64500',
      telefono: '81-4567-8901',
      email: 'compras@comperez.com',
      contacto: 'María Pérez',
      zone: 'Oriente',
      ruta: 'Ruta Oriente-01',
      canal: 'Mayorista',
      tamano: 'A',
      categoria: 'Distribuidor',
      credit: 30000,
      available: 22500,
      balance: 7500,
      diasCredito: 45,
      formaPago: 'Crédito',
      coords: { lat: 25.6800, lng: -100.2900 },
      status: 'Activo'
    },
    { 
      code: 'CLI-005', 
      name: 'Abarrotes María',
      razonSocial: 'Abarrotes María',
      rfc: 'ABM991120RS2',
      address: 'Calle Reforma 123',
      colonia: 'Obispado',
      ciudad: 'Monterrey',
      estado: 'Nuevo León',
      cp: '64060',
      telefono: '81-5678-9012',
      email: 'maria@abarrotes.mx',
      contacto: 'María González',
      zone: 'Norte',
      ruta: 'Ruta Norte-02',
      canal: 'Minorista',
      tamano: 'D',
      categoria: 'Abarrotes',
      credit: 10000,
      available: 10000,
      balance: 0,
      diasCredito: 15,
      formaPago: 'Contado',
      coords: { lat: 25.6950, lng: -100.3400 },
      status: 'Inactivo'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    razonSocial: '',
    rfc: '',
    address: '',
    colonia: '',
    ciudad: 'Monterrey',
    estado: 'Nuevo León',
    cp: '',
    telefono: '',
    email: '',
    contacto: '',
    zone: 'Norte',
    ruta: '',
    canal: 'Minorista',
    tamano: 'C',
    categoria: 'Abarrotes',
    credit: '',
    diasCredito: 30,
    formaPago: 'Crédito',
    coords: { lat: null, lng: null }
  });

  // Filtrar clientes
  const clientesFiltrados = clientes.filter(cliente => {
    const matchSearch = cliente.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       cliente.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       cliente.contacto.toLowerCase().includes(searchTerm.toLowerCase());
    const matchZone = filterZone === 'todas' || cliente.zone === filterZone;
    const matchStatus = filterStatus === 'todos' || cliente.status === filterStatus;
    return matchSearch && matchZone && matchStatus;
  });

  // Estadísticas
  const stats = {
    total: clientes.length,
    activos: clientes.filter(c => c.status === 'Activo').length,
    inactivos: clientes.filter(c => c.status === 'Inactivo').length,
    creditoTotal: clientes.reduce((sum, c) => sum + c.credit, 0),
    saldoPendiente: clientes.reduce((sum, c) => sum + c.balance, 0)
  };

  const handleCreate = () => {
    setModalMode('create');
    setFormData({
      name: '',
      razonSocial: '',
      rfc: '',
      address: '',
      colonia: '',
      ciudad: 'Monterrey',
      estado: 'Nuevo León',
      cp: '',
      telefono: '',
      email: '',
      contacto: '',
      zone: 'Norte',
      ruta: '',
      canal: 'Minorista',
      tamano: 'C',
      categoria: 'Abarrotes',
      credit: '',
      diasCredito: 30,
      formaPago: 'Crédito',
      coords: { lat: null, lng: null }
    });
    setShowModal(true);
  };

  const handleEdit = (cliente) => {
    setModalMode('edit');
    setSelectedCliente(cliente);
    setFormData({
      name: cliente.name,
      razonSocial: cliente.razonSocial,
      rfc: cliente.rfc,
      address: cliente.address,
      colonia: cliente.colonia,
      ciudad: cliente.ciudad,
      estado: cliente.estado,
      cp: cliente.cp,
      telefono: cliente.telefono,
      email: cliente.email,
      contacto: cliente.contacto,
      zone: cliente.zone,
      ruta: cliente.ruta,
      canal: cliente.canal,
      tamano: cliente.tamano,
      categoria: cliente.categoria,
      credit: cliente.credit,
      diasCredito: cliente.diasCredito,
      formaPago: cliente.formaPago,
      coords: cliente.coords
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (modalMode === 'create') {
      const newCliente = {
        code: `CLI-${String(clientes.length + 1).padStart(3, '0')}`,
        ...formData,
        credit: parseInt(formData.credit) || 0,
        available: parseInt(formData.credit) || 0,
        balance: 0,
        status: 'Activo'
      };
      setClientes([...clientes, newCliente]);
    } else {
      setClientes(clientes.map(c => 
        c.code === selectedCliente.code 
          ? { 
              ...c, 
              ...formData, 
              credit: parseInt(formData.credit) || 0,
              available: c.available,
              balance: c.balance
            } 
          : c
      ));
    }
    setShowModal(false);
  };

  const handleDelete = (cliente) => {
    if (confirm(`¿Estás seguro de eliminar el cliente ${cliente.name}?`)) {
      setClientes(clientes.filter(c => c.code !== cliente.code));
    }
  };

  const handleViewDetails = (cliente) => {
    setSelectedCliente(cliente);
    setShowDetalles(true);
    setTabDetalles('general');
  };

  // Columnas para la tabla
  const columns = [
    {
      header: 'Código',
      key: 'code',
      render: (cliente) => (
        <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>
          {cliente.code}
        </span>
      )
    },
    {
      header: 'Cliente',
      key: 'name',
      render: (cliente) => (
        <div>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{cliente.name}</div>
          <div style={{ fontSize: 12, color: colors.gray500 }}>{cliente.contacto}</div>
        </div>
      )
    },
    {
      header: 'Ubicación',
      key: 'address',
      render: (cliente) => (
        <div style={{ fontSize: 13 }}>
          <div>{cliente.address}</div>
          <div style={{ fontSize: 12, color: colors.gray500 }}>
            {cliente.colonia}, {cliente.ciudad}
          </div>
        </div>
      )
    },
    {
      header: 'Zona/Ruta',
      key: 'zone',
      render: (cliente) => (
        <div>
          <Badge color="primary" style={{ marginBottom: 4 }}>{cliente.zone}</Badge>
          <div style={{ fontSize: 11, color: colors.gray500 }}>{cliente.ruta}</div>
        </div>
      )
    },
    {
      header: 'Canal',
      key: 'canal',
      render: (cliente) => (
        <div>
          <div style={{ fontSize: 13, fontWeight: 500 }}>{cliente.canal}</div>
          <div style={{ fontSize: 11, color: colors.gray500 }}>Tamaño {cliente.tamano}</div>
        </div>
      )
    },
    {
      header: 'Crédito',
      key: 'credit',
      render: (cliente) => (
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: colors.primary }}>
            ${cliente.credit.toLocaleString()}
          </div>
          <div style={{ fontSize: 11, color: colors.gray500 }}>
            Disponible: ${cliente.available.toLocaleString()}
          </div>
          {cliente.balance > 0 && (
            <div style={{ fontSize: 11, color: colors.danger, fontWeight: 600 }}>
              Saldo: ${cliente.balance.toLocaleString()}
            </div>
          )}
        </div>
      )
    },
    {
      header: 'Estado',
      key: 'status',
      render: (cliente) => (
        <Badge color={cliente.status === 'Activo' ? 'success' : 'danger'}>
          {cliente.status}
        </Badge>
      )
    },
    {
      header: 'Acciones',
      key: 'actions',
      render: (cliente) => (
        <div style={{ display: 'flex', gap: 4 }}>
          <button
            onClick={() => handleViewDetails(cliente)}
            style={{
              padding: '6px 8px',
              borderRadius: 6,
              border: `1px solid ${colors.primary}`,
              backgroundColor: 'white',
              color: colors.primary,
              cursor: 'pointer',
              fontSize: 11,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}
            title="Ver detalles"
          >
            <Eye size={14} />
          </button>
          <button
            onClick={() => handleEdit(cliente)}
            style={{
              padding: '6px 8px',
              borderRadius: 6,
              border: `1px solid ${colors.warning}`,
              backgroundColor: 'white',
              color: colors.warning,
              cursor: 'pointer',
              fontSize: 11,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}
            title="Editar"
          >
            <Edit size={14} />
          </button>
          <button
            onClick={() => handleDelete(cliente)}
            style={{
              padding: '6px 8px',
              borderRadius: 6,
              border: `1px solid ${colors.danger}`,
              backgroundColor: 'white',
              color: colors.danger,
              cursor: 'pointer',
              fontSize: 11,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}
            title="Eliminar"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: colors.gray50
    }}>
      <WebHeader 
        title="Gestión de Clientes"
        subtitle="Administra tu cartera de clientes"
      />

      <div style={{ padding: 24 }}>
        {/* Estadísticas */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(5, 1fr)', 
          gap: 16, 
          marginBottom: 24 
        }}>
          <Card style={{ textAlign: 'center', padding: 20 }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: colors.primary }}>
              {stats.total}
            </div>
            <div style={{ fontSize: 12, color: colors.gray500, marginTop: 4 }}>
              Total Clientes
            </div>
          </Card>
          <Card style={{ textAlign: 'center', padding: 20 }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: colors.success }}>
              {stats.activos}
            </div>
            <div style={{ fontSize: 12, color: colors.gray500, marginTop: 4 }}>
              Activos
            </div>
          </Card>
          <Card style={{ textAlign: 'center', padding: 20 }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: colors.danger }}>
              {stats.inactivos}
            </div>
            <div style={{ fontSize: 12, color: colors.gray500, marginTop: 4 }}>
              Inactivos
            </div>
          </Card>
          <Card style={{ textAlign: 'center', padding: 20 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: colors.accent }}>
              ${(stats.creditoTotal / 1000).toFixed(0)}K
            </div>
            <div style={{ fontSize: 12, color: colors.gray500, marginTop: 4 }}>
              Crédito Total
            </div>
          </Card>
          <Card style={{ textAlign: 'center', padding: 20 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: colors.warning }}>
              ${(stats.saldoPendiente / 1000).toFixed(0)}K
            </div>
            <div style={{ fontSize: 12, color: colors.gray500, marginTop: 4 }}>
              Saldo Pendiente
            </div>
          </Card>
        </div>

        {/* Barra de búsqueda y filtros */}
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
                placeholder="Buscar por nombre, código o contacto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
              value={filterZone}
              onChange={(e) => setFilterZone(e.target.value)}
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
              <option value="Poniente">Poniente</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                padding: '10px 12px',
                border: `1px solid ${colors.gray300}`,
                borderRadius: 8,
                fontSize: 14,
                minWidth: 130
              }}
            >
              <option value="todos">Todos</option>
              <option value="Activo">Activos</option>
              <option value="Inactivo">Inactivos</option>
            </select>

            <Button variant="primary" icon={<Plus size={18} />} onClick={handleCreate}>
              Nuevo Cliente
            </Button>
          </div>
        </Card>

        {/* Tabla de clientes */}
        <Card>
          <WebTable columns={columns} data={clientesFiltrados} />
          
          {clientesFiltrados.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: 40, 
              color: colors.gray400 
            }}>
              <User size={48} style={{ marginBottom: 12 }} />
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                No se encontraron clientes
              </div>
              <div style={{ fontSize: 14 }}>
                {searchTerm || filterZone !== 'todas' || filterStatus !== 'todos'
                  ? 'Intenta con otros filtros de búsqueda'
                  : 'Comienza agregando tu primer cliente'
                }
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Modal Crear/Editar Cliente - Lo crearemos en el siguiente paso */}
      {showModal && (
        <ModalClienteForm
          mode={modalMode}
          formData={formData}
          setFormData={setFormData}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* Panel de Detalles - Lo crearemos después */}
      {showDetalles && selectedCliente && (
        <PanelDetallesCliente
          cliente={selectedCliente}
          tab={tabDetalles}
          setTab={setTabDetalles}
          onClose={() => setShowDetalles(false)}
        />
      )}
    </div>
  );
};

// Componente Modal - Paso 2
const ModalClienteForm = ({ mode, formData, setFormData, onSave, onClose }) => {
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
        maxWidth: 900,
        maxHeight: '90vh',
        overflow: 'auto',
        padding: 24
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: 24 
        }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>
            {mode === 'create' ? '➕ Nuevo Cliente' : '✏️ Editar Cliente'}
          </h2>
          <button
            onClick={onClose}
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

        {/* Formulario */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {/* Información General */}
          <div style={{ gridColumn: 'span 2' }}>
            <h3 style={{ 
              fontSize: 16, 
              fontWeight: 600, 
              marginBottom: 16,
              color: colors.gray700,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <Building size={18} />
              Información General
            </h3>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600 }}>
              Nombre Comercial *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Ej: Abarrotes Don José"
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

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600 }}>
              Razón Social *
            </label>
            <input
              type="text"
              value={formData.razonSocial}
              onChange={(e) => setFormData({...formData, razonSocial: e.target.value})}
              placeholder="Ej: Abarrotes Don José S.A. de C.V."
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

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600 }}>
              RFC *
            </label>
            <input
              type="text"
              value={formData.rfc}
              onChange={(e) => setFormData({...formData, rfc: e.target.value.toUpperCase()})}
              placeholder="Ej: ABC123456XYZ"
              maxLength={13}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `1px solid ${colors.gray300}`,
                borderRadius: 8,
                fontSize: 14,
                textTransform: 'uppercase'
              }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600 }}>
              Contacto Principal *
            </label>
            <input
              type="text"
              value={formData.contacto}
              onChange={(e) => setFormData({...formData, contacto: e.target.value})}
              placeholder="Ej: José Martínez"
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

          {/* Dirección */}
          <div style={{ gridColumn: 'span 2', marginTop: 16 }}>
            <h3 style={{ 
              fontSize: 16, 
              fontWeight: 600, 
              marginBottom: 16,
              color: colors.gray700,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <MapPin size={18} />
              Dirección
            </h3>
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600 }}>
              Calle y Número *
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              placeholder="Ej: Av. Juárez 234"
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

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600 }}>
              Colonia *
            </label>
            <input
              type="text"
              value={formData.colonia}
              onChange={(e) => setFormData({...formData, colonia: e.target.value})}
              placeholder="Ej: Centro"
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

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600 }}>
              Código Postal *
            </label>
            <input
              type="text"
              value={formData.cp}
              onChange={(e) => setFormData({...formData, cp: e.target.value})}
              placeholder="Ej: 64000"
              maxLength={5}
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

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600 }}>
              Ciudad *
            </label>
            <input
              type="text"
              value={formData.ciudad}
              onChange={(e) => setFormData({...formData, ciudad: e.target.value})}
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

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600 }}>
              Estado *
            </label>
            <select
              value={formData.estado}
              onChange={(e) => setFormData({...formData, estado: e.target.value})}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `1px solid ${colors.gray300}`,
                borderRadius: 8,
                fontSize: 14
              }}
              required
            >
              <option>Nuevo León</option>
              <option>Coahuila</option>
              <option>Tamaulipas</option>
              <option>San Luis Potosí</option>
            </select>
          </div>

          {/* Contacto */}
          <div style={{ gridColumn: 'span 2', marginTop: 16 }}>
            <h3 style={{ 
              fontSize: 16, 
              fontWeight: 600, 
              marginBottom: 16,
              color: colors.gray700,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <Phone size={18} />
              Información de Contacto
            </h3>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600 }}>
              Teléfono *
            </label>
            <input
              type="tel"
              value={formData.telefono}
              onChange={(e) => setFormData({...formData, telefono: e.target.value})}
              placeholder="Ej: 81-1234-5678"
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

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600 }}>
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Ej: contacto@cliente.com"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `1px solid ${colors.gray300}`,
                borderRadius: 8,
                fontSize: 14
              }}
            />
          </div>

          {/* Comercial */}
          <div style={{ gridColumn: 'span 2', marginTop: 16 }}>
            <h3 style={{ 
              fontSize: 16, 
              fontWeight: 600, 
              marginBottom: 16,
              color: colors.gray700,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <Package size={18} />
              Información Comercial
            </h3>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600 }}>
              Zona *
            </label>
            <select
              value={formData.zone}
              onChange={(e) => setFormData({...formData, zone: e.target.value})}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `1px solid ${colors.gray300}`,
                borderRadius: 8,
                fontSize: 14
              }}
              required
            >
              <option>Norte</option>
              <option>Sur</option>
              <option>Centro</option>
              <option>Oriente</option>
              <option>Poniente</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600 }}>
              Ruta
            </label>
            <input
              type="text"
              value={formData.ruta}
              onChange={(e) => setFormData({...formData, ruta: e.target.value})}
              placeholder="Ej: Ruta Norte-01"
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
              Canal *
            </label>
            <select
              value={formData.canal}
              onChange={(e) => setFormData({...formData, canal: e.target.value})}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `1px solid ${colors.gray300}`,
                borderRadius: 8,
                fontSize: 14
              }}
              required
            >
              <option>Minorista</option>
              <option>Detallista</option>
              <option>Mayorista</option>
              <option>Distribuidor</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600 }}>
              Tamaño *
            </label>
            <select
              value={formData.tamano}
              onChange={(e) => setFormData({...formData, tamano: e.target.value})}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `1px solid ${colors.gray300}`,
                borderRadius: 8,
                fontSize: 14
              }}
              required
            >
              <option value="A">A - Grande</option>
              <option value="B">B - Mediano</option>
              <option value="C">C - Pequeño</option>
              <option value="D">D - Muy Pequeño</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600 }}>
              Categoría *
            </label>
            <select
              value={formData.categoria}
              onChange={(e) => setFormData({...formData, categoria: e.target.value})}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `1px solid ${colors.gray300}`,
                borderRadius: 8,
                fontSize: 14
              }}
              required
            >
              <option>Abarrotes</option>
              <option>Supermercado</option>
              <option>Distribuidor</option>
              <option>Restaurante</option>
              <option>Hotel</option>
            </select>
          </div>

          {/* Crédito */}
          <div style={{ gridColumn: 'span 2', marginTop: 16 }}>
            <h3 style={{ 
              fontSize: 16, 
              fontWeight: 600, 
              marginBottom: 16,
              color: colors.gray700,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <CreditCard size={18} />
              Condiciones de Crédito
            </h3>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600 }}>
              Forma de Pago *
            </label>
            <select
              value={formData.formaPago}
              onChange={(e) => setFormData({...formData, formaPago: e.target.value})}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `1px solid ${colors.gray300}`,
                borderRadius: 8,
                fontSize: 14
              }}
              required
            >
              <option>Contado</option>
              <option>Crédito</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600 }}>
              Días de Crédito
            </label>
            <select
              value={formData.diasCredito}
              onChange={(e) => setFormData({...formData, diasCredito: parseInt(e.target.value)})}
              disabled={formData.formaPago === 'Contado'}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `1px solid ${colors.gray300}`,
                borderRadius: 8,
                fontSize: 14,
                backgroundColor: formData.formaPago === 'Contado' ? colors.gray100 : 'white'
              }}
            >
              <option value={0}>0 días</option>
              <option value={15}>15 días</option>
              <option value={30}>30 días</option>
              <option value={45}>45 días</option>
              <option value={60}>60 días</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600 }}>
              Límite de Crédito *
            </label>
            <input
              type="number"
              value={formData.credit}
              onChange={(e) => setFormData({...formData, credit: e.target.value})}
              placeholder="0"
              min="0"
              step="1000"
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
          <Button variant="primary" icon={<Save size={18} />} onClick={onSave}>
            {mode === 'create' ? 'Crear Cliente' : 'Guardar Cambios'}
          </Button>
        </div>
      </div>
    </div>
  );
};

// Componente Panel Detalles - Paso 3
const PanelDetallesCliente = ({ cliente, tab, setTab, onClose }) => {
  const tabs = [
    { id: 'general', label: 'General', icon: User },
    { id: 'contactos', label: 'Contactos', icon: UsersIcon },
    { id: 'pedidos', label: 'Pedidos', icon: FileText },
    { id: 'entregas', label: 'Entregas', icon: Package },
    { id: 'pagos', label: 'Pagos', icon: DollarSign },
    { id: 'cuenta', label: 'Estado Cuenta', icon: CreditCard },
    { id: 'productos', label: 'Productos Frecuentes', icon: Package },
    { id: 'precios', label: 'Precios', icon: DollarSign }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      width: '70%',
      backgroundColor: 'white',
      boxShadow: '-4px 0 12px rgba(0,0,0,0.15)',
      zIndex: 1001,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{ 
        padding: 24, 
        borderBottom: `1px solid ${colors.gray200}`,
        backgroundColor: colors.gray50
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>
                {cliente.name}
              </h2>
              <Badge color={cliente.status === 'Activo' ? 'success' : 'danger'}>
                {cliente.status}
              </Badge>
            </div>
            <div style={{ fontSize: 14, color: colors.gray500, marginBottom: 4 }}>
              {cliente.code} • {cliente.razonSocial}
            </div>
            <div style={{ display: 'flex', gap: 16, fontSize: 13, color: colors.gray600 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <MapPin size={14} />
                {cliente.zone} - {cliente.ruta}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Phone size={14} />
                {cliente.telefono}
              </span>
              {cliente.email && (
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Mail size={14} />
                  {cliente.email}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
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

        {/* Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: 4, 
          marginTop: 20,
          overflowX: 'auto'
        }}>
          {tabs.map(t => {
            const Icon = t.icon;
            const isActive = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  padding: '10px 16px',
                  border: 'none',
                  backgroundColor: isActive ? 'white' : 'transparent',
                  color: isActive ? colors.primary : colors.gray600,
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  borderRadius: '8px 8px 0 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'all 0.2s',
                  borderBottom: isActive ? `2px solid ${colors.primary}` : 'none'
                }}
              >
                <Icon size={16} />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div style={{ 
        flex: 1, 
        overflow: 'auto', 
        padding: 24,
        backgroundColor: colors.gray50
      }}>
        {tab === 'general' && <TabGeneral cliente={cliente} />}
        {tab === 'contactos' && <TabContactos cliente={cliente} />}
        {tab === 'pedidos' && <TabPedidos cliente={cliente} />}
        {tab === 'entregas' && <TabEntregas cliente={cliente} />}
        {tab === 'pagos' && <TabPagos cliente={cliente} />}
        {tab === 'cuenta' && <TabEstadoCuenta cliente={cliente} />}
        {tab === 'productos' && <TabProductosFrecuentes cliente={cliente} />}
        {tab === 'precios' && <TabPrecios cliente={cliente} />}
      </div>
    </div>
  );
};

// Tab General
const TabGeneral = ({ cliente }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
      {/* Información Básica */}
      <Card>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Building size={18} color={colors.primary} />
          Información Básica
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <InfoRow label="Razón Social" value={cliente.razonSocial} />
          <InfoRow label="RFC" value={cliente.rfc} />
          <InfoRow label="Contacto" value={cliente.contacto} />
          <InfoRow label="Categoría" value={cliente.categoria} />
          <InfoRow label="Canal" value={cliente.canal} />
          <InfoRow label="Tamaño" value={`Tamaño ${cliente.tamano}`} />
        </div>
      </Card>

      {/* Ubicación */}
      <Card>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <MapPin size={18} color={colors.primary} />
          Ubicación
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <InfoRow label="Dirección" value={cliente.address} />
          <InfoRow label="Colonia" value={cliente.colonia} />
          <InfoRow label="Ciudad" value={cliente.ciudad} />
          <InfoRow label="Estado" value={cliente.estado} />
          <InfoRow label="C.P." value={cliente.cp} />
          <InfoRow label="Zona" value={cliente.zone} />
          <InfoRow label="Ruta" value={cliente.ruta} />
        </div>
      </Card>

      {/* Información de Crédito */}
      <Card>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <CreditCard size={18} color={colors.primary} />
          Información de Crédito
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <InfoRow label="Forma de Pago" value={cliente.formaPago} />
          <InfoRow label="Días de Crédito" value={`${cliente.diasCredito} días`} />
          <InfoRow label="Límite de Crédito" value={`$${cliente.credit.toLocaleString()}`} />
          <InfoRow label="Crédito Disponible" value={`$${cliente.available.toLocaleString()}`} />
          <InfoRow 
            label="Saldo Pendiente" 
            value={`$${cliente.balance.toLocaleString()}`}
            valueColor={cliente.balance > 0 ? colors.danger : colors.success}
          />
          <InfoRow 
            label="% Utilización" 
            value={`${((cliente.balance / cliente.credit) * 100).toFixed(1)}%`}
            valueColor={cliente.balance / cliente.credit > 0.8 ? colors.danger : colors.success}
          />
        </div>
      </Card>

      {/* Estadísticas */}
      <Card>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <FileText size={18} color={colors.primary} />
          Estadísticas
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          <div style={{ textAlign: 'center', padding: 12, backgroundColor: colors.gray50, borderRadius: 8 }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: colors.primary }}>45</div>
            <div style={{ fontSize: 12, color: colors.gray500, marginTop: 4 }}>Pedidos Total</div>
          </div>
          <div style={{ textAlign: 'center', padding: 12, backgroundColor: colors.gray50, borderRadius: 8 }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: colors.success }}>42</div>
            <div style={{ fontSize: 12, color: colors.gray500, marginTop: 4 }}>Entregas</div>
          </div>
          <div style={{ textAlign: 'center', padding: 12, backgroundColor: colors.gray50, borderRadius: 8 }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: colors.accent }}>$128K</div>
            <div style={{ fontSize: 12, color: colors.gray500, marginTop: 4 }}>Total Ventas</div>
          </div>
          <div style={{ textAlign: 'center', padding: 12, backgroundColor: colors.gray50, borderRadius: 8 }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: colors.warning }}>$3.2K</div>
            <div style={{ fontSize: 12, color: colors.gray500, marginTop: 4 }}>Ticket Promedio</div>
          </div>
        </div>
      </Card>

      {/* Mapa */}
      <Card style={{ gridColumn: 'span 2' }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <MapIcon size={18} color={colors.primary} />
          Ubicación en Mapa
        </h3>
        <div style={{
          height: 300,
          backgroundColor: colors.gray100,
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 8
        }}>
          <MapPin size={48} color={colors.gray400} />
          <div style={{ fontSize: 14, color: colors.gray500 }}>
            Coordenadas: {cliente.coords.lat}, {cliente.coords.lng}
          </div>
          <Button variant="outline" size="sm">
            Ver en Google Maps
          </Button>
        </div>
      </Card>
    </div>
  );
};

// Tab Contactos
const TabContactos = ({ cliente }) => {
  const [contactos, setContactos] = useState([
    {
      id: 1,
      nombre: 'José Martínez',
      puesto: 'Gerente General',
      telefono: '81-1234-5678',
      email: 'jose@donjose.com',
      principal: true
    },
    {
      id: 2,
      nombre: 'Ana López',
      puesto: 'Compras',
      telefono: '81-1234-5679',
      email: 'compras@donjose.com',
      principal: false
    }
  ]);

  const [showModalContacto, setShowModalContacto] = useState(false);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600 }}>
          Contactos ({contactos.length})
        </h3>
        <Button variant="primary" icon={<Plus size={16} />} onClick={() => setShowModalContacto(true)}>
          Agregar Contacto
        </Button>
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {contactos.map(contacto => (
          <Card key={contacto.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: colors.primary,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    fontWeight: 600
                  }}>
                    {contacto.nombre.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>
                      {contacto.nombre}
                      {contacto.principal && (
                        <Badge color="primary" style={{ marginLeft: 8, fontSize: 10 }}>Principal</Badge>
                      )}
                    </div>
                    <div style={{ fontSize: 13, color: colors.gray500 }}>{contacto.puesto}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 20, marginLeft: 48, fontSize: 13, color: colors.gray600 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Phone size={14} />
                    {contacto.telefono}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Mail size={14} />
                    {contacto.email}
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  style={{
                    padding: '6px 8px',
                    borderRadius: 6,
                    border: `1px solid ${colors.warning}`,
                    backgroundColor: 'white',
                    color: colors.warning,
                    cursor: 'pointer',
                    fontSize: 11
                  }}
                >
                  <Edit size={14} />
                </button>
                <button
                  style={{
                    padding: '6px 8px',
                    borderRadius: 6,
                    border: `1px solid ${colors.danger}`,
                    backgroundColor: 'white',
                    color: colors.danger,
                    cursor: 'pointer',
                    fontSize: 11
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Tab Pedidos
const TabPedidos = ({ cliente }) => {
  const pedidos = [
    { id: 'PED-001', fecha: '2024-01-08', total: 5420, items: 12, status: 'Confirmado' },
    { id: 'PED-002', fecha: '2024-01-05', total: 3280, items: 8, status: 'Entregado' },
    { id: 'PED-003', fecha: '2024-01-02', total: 4150, items: 10, status: 'Entregado' },
    { id: 'PED-004', fecha: '2023-12-28', total: 2890, items: 7, status: 'Entregado' },
    { id: 'PED-005', fecha: '2023-12-25', total: 6120, items: 15, status: 'Entregado' }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600 }}>
          Historial de Pedidos ({pedidos.length})
        </h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <select style={{
            padding: '8px 12px',
            border: `1px solid ${colors.gray300}`,
            borderRadius: 8,
            fontSize: 13
          }}>
            <option>Todos los estados</option>
            <option>Confirmado</option>
            <option>Entregado</option>
            <option>Cancelado</option>
          </select>
          <Button variant="outline" size="sm">Exportar</Button>
        </div>
      </div>

      <Card>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${colors.gray200}` }}>
              <th style={{ padding: 12, textAlign: 'left', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Pedido</th>
              <th style={{ padding: 12, textAlign: 'left', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Fecha</th>
              <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Items</th>
              <th style={{ padding: 12, textAlign: 'right', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Total</th>
              <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Estado</th>
              <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map(pedido => (
              <tr key={pedido.id} style={{ borderBottom: `1px solid ${colors.gray100}` }}>
                <td style={{ padding: 12, fontFamily: 'monospace', fontWeight: 600 }}>{pedido.id}</td>
                <td style={{ padding: 12, fontSize: 14 }}>{pedido.fecha}</td>
                <td style={{ padding: 12, textAlign: 'center', fontSize: 14 }}>{pedido.items}</td>
                <td style={{ padding: 12, textAlign: 'right', fontSize: 14, fontWeight: 600, color: colors.primary }}>
                  ${pedido.total.toLocaleString()}
                </td>
                <td style={{ padding: 12, textAlign: 'center' }}>
                  <Badge color={pedido.status === 'Confirmado' ? 'primary' : 'success'}>
                    {pedido.status}
                  </Badge>
                </td>
                <td style={{ padding: 12, textAlign: 'center' }}>
                  <Button variant="outline" size="sm">
                    <Eye size={14} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

// Tab Entregas
const TabEntregas = ({ cliente }) => {
  const entregas = [
    { id: 'ENT-045', pedido: 'PED-002', fecha: '2024-01-06', repartidor: 'Carlos M.', evidencia: true, status: 'Entregado' },
    { id: 'ENT-042', pedido: 'PED-003', fecha: '2024-01-03', repartidor: 'Juan P.', evidencia: true, status: 'Entregado' },
    { id: 'ENT-038', pedido: 'PED-004', fecha: '2023-12-29', repartidor: 'Carlos M.', evidencia: true, status: 'Entregado' },
    { id: 'ENT-035', pedido: 'PED-005', fecha: '2023-12-26', repartidor: 'Juan P.', evidencia: true, status: 'Entregado' }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600 }}>
          Historial de Entregas ({entregas.length})
        </h3>
        <Button variant="outline" size="sm">Exportar</Button>
      </div>

      <Card>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${colors.gray200}` }}>
              <th style={{ padding: 12, textAlign: 'left', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Entrega</th>
              <th style={{ padding: 12, textAlign: 'left', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Pedido</th>
              <th style={{ padding: 12, textAlign: 'left', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Fecha</th>
              <th style={{ padding: 12, textAlign: 'left', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Repartidor</th>
              <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Evidencia</th>
              <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Estado</th>
              <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {entregas.map(entrega => (
              <tr key={entrega.id} style={{ borderBottom: `1px solid ${colors.gray100}` }}>
                <td style={{ padding: 12, fontFamily: 'monospace', fontWeight: 600 }}>{entrega.id}</td>
                <td style={{ padding: 12, fontSize: 14 }}>{entrega.pedido}</td>
                <td style={{ padding: 12, fontSize: 14 }}>{entrega.fecha}</td>
                <td style={{ padding: 12, fontSize: 14 }}>{entrega.repartidor}</td>
                <td style={{ padding: 12, textAlign: 'center' }}>
                  {entrega.evidencia ? (
                    <Badge color="success">✓ Foto</Badge>
                  ) : (
                    <Badge color="danger">Sin evidencia</Badge>
                  )}
                </td>
                <td style={{ padding: 12, textAlign: 'center' }}>
                  <Badge color="success">{entrega.status}</Badge>
                </td>
                <td style={{ padding: 12, textAlign: 'center' }}>
                  <Button variant="outline" size="sm">
                    <Eye size={14} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

// Tab Pagos
const TabPagos = ({ cliente }) => {
  const pagos = [
    { id: 'PAG-123', fecha: '2024-01-07', pedido: 'PED-002', monto: 3280, metodo: 'Transferencia', referencia: 'TRX-45678' },
    { id: 'PAG-118', fecha: '2024-01-04', pedido: 'PED-003', monto: 4150, metodo: 'Efectivo', referencia: '-' },
    { id: 'PAG-112', fecha: '2023-12-30', pedido: 'PED-004', monto: 2890, metodo: 'Transferencia', referencia: 'TRX-45123' }
  ];

  const saldoPendiente = cliente.balance;

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <Card style={{ flex: 1, textAlign: 'center', padding: 20 }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: colors.success }}>
            ${pagos.reduce((sum, p) => sum + p.monto, 0).toLocaleString()}
          </div>
          <div style={{ fontSize: 13, color: colors.gray500, marginTop: 4 }}>Total Pagado</div>
        </Card>
        <Card style={{ flex: 1, textAlign: 'center', padding: 20 }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: saldoPendiente > 0 ? colors.danger : colors.success }}>
            ${saldoPendiente.toLocaleString()}
          </div>
          <div style={{ fontSize: 13, color: colors.gray500, marginTop: 4 }}>Saldo Pendiente</div>
        </Card>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600 }}>
          Historial de Pagos ({pagos.length})
        </h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="primary" icon={<Plus size={16} />}>Registrar Pago</Button>
          <Button variant="outline" size="sm">Exportar</Button>
        </div>
      </div>

      <Card>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${colors.gray200}` }}>
              <th style={{ padding: 12, textAlign: 'left', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Pago</th>
              <th style={{ padding: 12, textAlign: 'left', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Fecha</th>
              <th style={{ padding: 12, textAlign: 'left', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Pedido</th>
              <th style={{ padding: 12, textAlign: 'right', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Monto</th>
              <th style={{ padding: 12, textAlign: 'left', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Método</th>
              <th style={{ padding: 12, textAlign: 'left', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Referencia</th>
              <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map(pago => (
              <tr key={pago.id} style={{ borderBottom: `1px solid ${colors.gray100}` }}>
                <td style={{ padding: 12, fontFamily: 'monospace', fontWeight: 600 }}>{pago.id}</td>
                <td style={{ padding: 12, fontSize: 14 }}>{pago.fecha}</td>
                <td style={{ padding: 12, fontSize: 14 }}>{pago.pedido}</td>
                <td style={{ padding: 12, textAlign: 'right', fontSize: 14, fontWeight: 600, color: colors.success }}>
                  ${pago.monto.toLocaleString()}
                </td>
                <td style={{ padding: 12, fontSize: 14 }}>{pago.metodo}</td>
                <td style={{ padding: 12, fontSize: 13, fontFamily: 'monospace', color: colors.gray500 }}>{pago.referencia}</td>
                <td style={{ padding: 12, textAlign: 'center' }}>
                  <Button variant="outline" size="sm">
                    <Eye size={14} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

// Tab Estado de Cuenta
const TabEstadoCuenta = ({ cliente }) => {
  const movimientos = [
    { fecha: '2024-01-08', concepto: 'Pedido PED-001', cargo: 5420, abono: 0, saldo: 6550 },
    { fecha: '2024-01-07', concepto: 'Pago PAG-123', cargo: 0, abono: 3280, saldo: 1130 },
    { fecha: '2024-01-05', concepto: 'Pedido PED-002', cargo: 3280, abono: 0, saldo: 4410 },
    { fecha: '2024-01-04', concepto: 'Pago PAG-118', cargo: 0, abono: 4150, saldo: 1130 }
  ];

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <Card style={{ textAlign: 'center', padding: 20 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: colors.primary }}>
            ${cliente.credit.toLocaleString()}
          </div>
          <div style={{ fontSize: 12, color: colors.gray500, marginTop: 4 }}>Límite Crédito</div>
        </Card>
        <Card style={{ textAlign: 'center', padding: 20 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: colors.danger }}>
            ${cliente.balance.toLocaleString()}
          </div>
          <div style={{ fontSize: 12, color: colors.gray500, marginTop: 4 }}>Saldo Actual</div>
        </Card>
        <Card style={{ textAlign: 'center', padding: 20 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: colors.success }}>
            ${cliente.available.toLocaleString()}
          </div>
          <div style={{ fontSize: 12, color: colors.gray500, marginTop: 4 }}>Disponible</div>
        </Card>
        <Card style={{ textAlign: 'center', padding: 20 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: colors.warning }}>
            {cliente.diasCredito}
          </div>
          <div style={{ fontSize: 12, color: colors.gray500, marginTop: 4 }}>Días Crédito</div>
        </Card>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600 }}>
          Estado de Cuenta
        </h3>
        <Button variant="outline" size="sm">Exportar</Button>
      </div>

      <Card>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${colors.gray200}`, backgroundColor: colors.gray50 }}>
              <th style={{ padding: 12, textAlign: 'left', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Fecha</th>
              <th style={{ padding: 12, textAlign: 'left', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Concepto</th>
              <th style={{ padding: 12, textAlign: 'right', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Cargo</th>
              <th style={{ padding: 12, textAlign: 'right', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Abono</th>
              <th style={{ padding: 12, textAlign: 'right', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {movimientos.map((mov, idx) => (
              <tr key={idx} style={{ borderBottom: `1px solid ${colors.gray100}` }}>
                <td style={{ padding: 12, fontSize: 14 }}>{mov.fecha}</td>
                <td style={{ padding: 12, fontSize: 14 }}>{mov.concepto}</td>
                <td style={{ padding: 12, textAlign: 'right', fontSize: 14, color: mov.cargo > 0 ? colors.danger : colors.gray400 }}>
                  {mov.cargo > 0 ? `$${mov.cargo.toLocaleString()}` : '-'}
                </td>
                <td style={{ padding: 12, textAlign: 'right', fontSize: 14, color: mov.abono > 0 ? colors.success : colors.gray400 }}>
                  {mov.abono > 0 ? `$${mov.abono.toLocaleString()}` : '-'}
                </td>
                <td style={{ padding: 12, textAlign: 'right', fontSize: 14, fontWeight: 600, color: colors.primary }}>
                  ${mov.saldo.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

// Tab Productos Frecuentes
const TabProductosFrecuentes = ({ cliente }) => {
  const productos = [
    { codigo: 'PRO-001', nombre: 'Refresco Cola 600ml', categoria: 'Bebidas', unidades: 245, total: 7350, frecuencia: 15 },
    { codigo: 'PRO-015', nombre: 'Galletas Choco 300g', categoria: 'Dulces', unidades: 180, total: 5400, frecuencia: 12 },
    { codigo: 'PRO-032', nombre: 'Agua Natural 1L', categoria: 'Bebidas', unidades: 320, total: 4800, frecuencia: 18 },
    { codigo: 'PRO-008', nombre: 'Pan Dulce Tradicional', categoria: 'Panadería', unidades: 150, total: 3750, frecuencia: 10 },
    { codigo: 'PRO-021', nombre: 'Jabón Líquido 500ml', categoria: 'Limpieza', unidades: 95, total: 3325, frecuencia: 8 }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600 }}>
          Productos Más Comprados
        </h3>
        <Button variant="outline" size="sm">Exportar</Button>
      </div>

      <Card>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${colors.gray200}` }}>
              <th style={{ padding: 12, textAlign: 'left', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Código</th>
              <th style={{ padding: 12, textAlign: 'left', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Producto</th>
              <th style={{ padding: 12, textAlign: 'left', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Categoría</th>
              <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Unidades</th>
              <th style={{ padding: 12, textAlign: 'right', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Total</th>
              <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Frecuencia</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(prod => (
              <tr key={prod.codigo} style={{ borderBottom: `1px solid ${colors.gray100}` }}>
                <td style={{ padding: 12, fontFamily: 'monospace', fontWeight: 600 }}>{prod.codigo}</td>
                <td style={{ padding: 12, fontSize: 14 }}>{prod.nombre}</td>
                <td style={{ padding: 12, fontSize: 13 }}>
                  <Badge color="accent">{prod.categoria}</Badge>
                </td>
                <td style={{ padding: 12, textAlign: 'center', fontSize: 14, fontWeight: 600 }}>{prod.unidades}</td>
                <td style={{ padding: 12, textAlign: 'right', fontSize: 14, fontWeight: 600, color: colors.primary }}>
                  ${prod.total.toLocaleString()}
                </td>
                <td style={{ padding: 12, textAlign: 'center', fontSize: 14 }}>
                  <Badge color="primary">{prod.frecuencia} veces</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

// Tab Precios
const TabPrecios = ({ cliente }) => {
  const listasPrecios = [
    { producto: 'Refresco Cola 600ml', precioBase: 30, descuento: 5, precioFinal: 28.50 },
    { producto: 'Galletas Choco 300g', precioBase: 30, descuento: 0, precioFinal: 30 },
    { producto: 'Agua Natural 1L', precioBase: 15, descuento: 0, precioFinal: 15 }
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Card style={{ padding: 20, backgroundColor: colors.accent + '20' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                Lista de Precios Asignada
              </h3>
              <p style={{ margin: 0, fontSize: 14, color: colors.gray600 }}>
                Lista: <strong>Minoristas Zona Norte</strong>
              </p>
              <p style={{ margin: 0, fontSize: 13, color: colors.gray500, marginTop: 4 }}>
                Descuento promedio: <strong>5%</strong>
              </p>
            </div>
            <Button variant="primary">Cambiar Lista</Button>
          </div>
        </Card>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600 }}>
          Precios y Descuentos
        </h3>
        <Button variant="outline" size="sm">Exportar</Button>
      </div>

      <Card>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${colors.gray200}` }}>
              <th style={{ padding: 12, textAlign: 'left', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Producto</th>
              <th style={{ padding: 12, textAlign: 'right', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Precio Base</th>
              <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Descuento</th>
              <th style={{ padding: 12, textAlign: 'right', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Precio Final</th>
            </tr>
          </thead>
          <tbody>
            {listasPrecios.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: `1px solid ${colors.gray100}` }}>
                <td style={{ padding: 12, fontSize: 14 }}>{item.producto}</td>
                <td style={{ padding: 12, textAlign: 'right', fontSize: 14, color: colors.gray500 }}>
                  ${item.precioBase.toFixed(2)}
                </td>
                <td style={{ padding: 12, textAlign: 'center' }}>
                  {item.descuento > 0 ? (
                    <Badge color="success">-{item.descuento}%</Badge>
                  ) : (
                    <span style={{ color: colors.gray400 }}>Sin descuento</span>
                  )}
                </td>
                <td style={{ padding: 12, textAlign: 'right', fontSize: 14, fontWeight: 600, color: colors.primary }}>
                  ${item.precioFinal.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

// Componente auxiliar InfoRow
const InfoRow = ({ label, value, valueColor = colors.gray700 }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
    <span style={{ color: colors.gray500 }}>{label}:</span>
    <span style={{ fontWeight: 600, color: valueColor }}>{value}</span>
  </div>
);

export default Clientes;
