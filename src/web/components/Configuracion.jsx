import React, { useState } from 'react';
import { Settings, Building2, Globe, Palette, Bell, Shield, Database, Package, MapPin, DollarSign, FileText, Mail, Smartphone, Users, Clock, Save, RotateCcw, Download, Upload, Trash2, Plus, Edit2, X, Check, AlertTriangle } from 'lucide-react';
import { colors } from '../../shared/colors.js';
import { Card, Badge, Button } from '../../shared/SharedComponents.jsx';
import WebHeader from './WebHeader.jsx';

const Configuracion = () => {
  const [seccionActiva, setSeccionActiva] = useState('empresa');
  const [guardando, setGuardando] = useState(false);

  // Estados para cada sección
  const [configEmpresa, setConfigEmpresa] = useState({
    razonSocial: 'Distribuidora La Moderna S.A. de C.V.',
    nombreComercial: 'La Moderna',
    rfc: 'DLM950825AB3',
    regimen: '601 - General de Ley Personas Morales',
    direccion: 'Av. Revolución #1234',
    colonia: 'Centro',
    ciudad: 'Guadalajara',
    estado: 'Jalisco',
    cp: '44100',
    telefono: '(33) 1234-5678',
    email: 'contacto@lamoderna.com',
    sitioWeb: 'www.lamoderna.com',
    logo: null
  });

  const [configGeneral, setConfigGeneral] = useState({
    moneda: 'MXN',
    timezone: 'America/Mexico_City',
    idioma: 'es-MX',
    formatoFecha: 'DD/MM/YYYY',
    formatoHora: '24h',
    decimales: 2,
    separadorMiles: ',',
    separadorDecimal: '.'
  });

  const [configRutas, setConfigRutas] = useState({
    zonas: [
      { id: 1, nombre: 'Norte', color: '#3B82F6', activa: true },
      { id: 2, nombre: 'Sur', color: '#10B981', activa: true },
      { id: 3, nombre: 'Centro', color: '#F59E0B', activa: true },
      { id: 4, nombre: 'Oriente', color: '#8B5CF6', activa: true }
    ],
    tiempoEntregaDefault: 15,
    distanciaMaximaRuta: 150,
    pedidosMaximosPorRuta: 35,
    horaInicioJornada: '07:00',
    horaFinJornada: '18:00'
  });

  const [categorias, setCategorias] = useState([
    { id: 1, nombre: 'Bebidas', icono: '🥤', activa: true, productos: 85 },
    { id: 2, nombre: 'Snacks', icono: '🍿', activa: true, productos: 62 },
    { id: 3, nombre: 'Lácteos', icono: '🥛', activa: true, productos: 34 },
    { id: 4, nombre: 'Panadería', icono: '🥖', activa: true, productos: 28 },
    { id: 5, nombre: 'Limpieza', icono: '🧹', activa: true, productos: 45 },
    { id: 6, nombre: 'Cuidado Personal', icono: '🧴', activa: true, productos: 38 }
  ]);

  const [configNotificaciones, setConfigNotificaciones] = useState({
    email: {
      pedidosNuevos: true,
      pedidosCancelados: true,
      devolucionesNuevas: true,
      alertasInventario: true,
      reportesDiarios: true,
      reportesSemanales: false
    },
    push: {
      pedidosNuevos: true,
      entregas: true,
      cobros: false,
      alertas: true
    },
    sms: {
      alertasCriticas: true,
      confirmacionPedidos: false
    }
  });

  const [plantillasEmail, setPlantillasEmail] = useState([
    { id: 1, nombre: 'Confirmación de Pedido', asunto: 'Pedido #{pedido} confirmado', activa: true },
    { id: 2, nombre: 'Pedido en Camino', asunto: 'Tu pedido está en camino', activa: true },
    { id: 3, nombre: 'Pedido Entregado', asunto: 'Pedido entregado exitosamente', activa: true },
    { id: 4, nombre: 'Recordatorio de Pago', asunto: 'Recordatorio de pago pendiente', activa: false }
  ]);

  const [configSeguridad, setConfigSeguridad] = useState({
    sesionExpira: 30,
    intentosMaximos: 3,
    longitudMinPassword: 8,
    requiereNumeros: true,
    requiereMayusculas: true,
    requiereEspeciales: false,
    cambioPasswordDias: 90,
    sesionesSimultaneas: 3
  });

  const [backups, setBackups] = useState([
    { id: 1, fecha: '2024-01-10 02:00:00', tipo: 'Automático', tamaño: '245 MB', estado: 'Completado' },
    { id: 2, fecha: '2024-01-09 02:00:00', tipo: 'Automático', tamaño: '243 MB', estado: 'Completado' },
    { id: 3, fecha: '2024-01-08 14:30:00', tipo: 'Manual', tamaño: '244 MB', estado: 'Completado' }
  ]);

  const guardarConfiguracion = () => {
    setGuardando(true);
    setTimeout(() => {
      setGuardando(false);
      alert('Configuración guardada exitosamente');
    }, 1500);
  };

  const secciones = [
    { id: 'empresa', label: 'Empresa', icon: Building2 },
    { id: 'general', label: 'General', icon: Settings },
    { id: 'rutas', label: 'Rutas y Zonas', icon: MapPin },
    { id: 'categorias', label: 'Categorías', icon: Package },
    { id: 'notificaciones', label: 'Notificaciones', icon: Bell },
    { id: 'plantillas', label: 'Plantillas Email', icon: Mail },
    { id: 'seguridad', label: 'Seguridad', icon: Shield },
    { id: 'respaldo', label: 'Respaldo', icon: Database }
  ];

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: colors.gray50
    }}>
      <WebHeader 
        title="Configuración del Sistema"
        subtitle="Personaliza y ajusta los parámetros de tu aplicación"
      />

      <div style={{ padding: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24 }}>
          {/* Menú Lateral */}
          <Card style={{ height: 'fit-content', position: 'sticky', top: 24 }}>
            <div style={{ padding: 16 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: colors.gray600, marginBottom: 12, textTransform: 'uppercase' }}>
                Secciones
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {secciones.map(seccion => (
                  <button
                    key={seccion.id}
                    onClick={() => setSeccionActiva(seccion.id)}
                    style={{
                      padding: '12px 16px',
                      border: 'none',
                      backgroundColor: seccionActiva === seccion.id ? colors.primary + '10' : 'transparent',
                      borderLeft: `3px solid ${seccionActiva === seccion.id ? colors.primary : 'transparent'}`,
                      color: seccionActiva === seccion.id ? colors.primary : colors.gray700,
                      cursor: 'pointer',
                      fontSize: 14,
                      fontWeight: seccionActiva === seccion.id ? 600 : 400,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      textAlign: 'left',
                      transition: 'all 0.2s',
                      borderRadius: 6
                    }}
                  >
                    <seccion.icon size={18} />
                    {seccion.label}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Contenido */}
          <div>
            {/* Empresa */}
            {seccionActiva === 'empresa' && (
              <SeccionEmpresa 
                config={configEmpresa}
                onChange={setConfigEmpresa}
                onGuardar={guardarConfiguracion}
                guardando={guardando}
              />
            )}

            {/* General */}
            {seccionActiva === 'general' && (
              <SeccionGeneral 
                config={configGeneral}
                onChange={setConfigGeneral}
                onGuardar={guardarConfiguracion}
                guardando={guardando}
              />
            )}

            {/* Rutas y Zonas */}
            {seccionActiva === 'rutas' && (
              <SeccionRutas 
                config={configRutas}
                onChange={setConfigRutas}
                onGuardar={guardarConfiguracion}
                guardando={guardando}
              />
            )}

            {/* Categorías */}
            {seccionActiva === 'categorias' && (
              <SeccionCategorias 
                categorias={categorias}
                onChange={setCategorias}
                onGuardar={guardarConfiguracion}
                guardando={guardando}
              />
            )}

            {/* Notificaciones */}
            {seccionActiva === 'notificaciones' && (
              <SeccionNotificaciones 
                config={configNotificaciones}
                onChange={setConfigNotificaciones}
                onGuardar={guardarConfiguracion}
                guardando={guardando}
              />
            )}

            {/* Plantillas Email */}
            {seccionActiva === 'plantillas' && (
              <SeccionPlantillas 
                plantillas={plantillasEmail}
                onChange={setPlantillasEmail}
                onGuardar={guardarConfiguracion}
                guardando={guardando}
              />
            )}

            {/* Seguridad */}
            {seccionActiva === 'seguridad' && (
              <SeccionSeguridad 
                config={configSeguridad}
                onChange={setConfigSeguridad}
                onGuardar={guardarConfiguracion}
                guardando={guardando}
              />
            )}

            {/* Respaldo */}
            {seccionActiva === 'respaldo' && (
              <SeccionRespaldo 
                backups={backups}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Sección Empresa
const SeccionEmpresa = ({ config, onChange, onGuardar, guardando }) => {
  return (
    <div>
      <Card style={{ padding: 24, marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 600, margin: 0, marginBottom: 4 }}>
              Información de la Empresa
            </h2>
            <p style={{ fontSize: 14, color: colors.gray600, margin: 0 }}>
              Datos fiscales y de contacto de tu empresa
            </p>
          </div>
          <Button 
            variant="primary" 
            icon={<Save size={18} />}
            onClick={onGuardar}
            disabled={guardando}
          >
            {guardando ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>

        {/* Logo */}
        <div style={{ marginBottom: 24, padding: 20, backgroundColor: colors.gray50, borderRadius: 8, textAlign: 'center' }}>
          <div style={{ 
            width: 120, 
            height: 120, 
            margin: '0 auto 16px',
            backgroundColor: colors.gray200,
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `2px dashed ${colors.gray300}`
          }}>
            <Building2 size={48} color={colors.gray400} />
          </div>
          <Button variant="outline" icon={<Upload size={16} />} style={{ fontSize: 13 }}>
            Subir Logo
          </Button>
          <div style={{ fontSize: 11, color: colors.gray500, marginTop: 8 }}>
            PNG o JPG, máximo 2MB
          </div>
        </div>

        {/* Datos Fiscales */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Datos Fiscales</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 24 }}>
          <InputField 
            label="Razón Social" 
            value={config.razonSocial}
            onChange={(e) => onChange({...config, razonSocial: e.target.value})}
          />
          <InputField 
            label="Nombre Comercial" 
            value={config.nombreComercial}
            onChange={(e) => onChange({...config, nombreComercial: e.target.value})}
          />
          <InputField 
            label="RFC" 
            value={config.rfc}
            onChange={(e) => onChange({...config, rfc: e.target.value})}
          />
          <InputField 
            label="Régimen Fiscal" 
            value={config.regimen}
            onChange={(e) => onChange({...config, regimen: e.target.value})}
          />
        </div>

        {/* Dirección */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Dirección</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 24 }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <InputField 
              label="Calle y Número" 
              value={config.direccion}
              onChange={(e) => onChange({...config, direccion: e.target.value})}
            />
          </div>
          <InputField 
            label="Colonia" 
            value={config.colonia}
            onChange={(e) => onChange({...config, colonia: e.target.value})}
          />
          <InputField 
            label="Código Postal" 
            value={config.cp}
            onChange={(e) => onChange({...config, cp: e.target.value})}
          />
          <InputField 
            label="Ciudad" 
            value={config.ciudad}
            onChange={(e) => onChange({...config, ciudad: e.target.value})}
          />
          <InputField 
            label="Estado" 
            value={config.estado}
            onChange={(e) => onChange({...config, estado: e.target.value})}
          />
        </div>

        {/* Contacto */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Contacto</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          <InputField 
            label="Teléfono" 
            value={config.telefono}
            onChange={(e) => onChange({...config, telefono: e.target.value})}
            icon={<Smartphone size={16} />}
          />
          <InputField 
            label="Email" 
            value={config.email}
            onChange={(e) => onChange({...config, email: e.target.value})}
            icon={<Mail size={16} />}
          />
          <div style={{ gridColumn: '1 / -1' }}>
            <InputField 
              label="Sitio Web" 
              value={config.sitioWeb}
              onChange={(e) => onChange({...config, sitioWeb: e.target.value})}
              icon={<Globe size={16} />}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

// Sección General
const SeccionGeneral = ({ config, onChange, onGuardar, guardando }) => {
  return (
    <Card style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 600, margin: 0, marginBottom: 4 }}>
            Configuración General
          </h2>
          <p style={{ fontSize: 14, color: colors.gray600, margin: 0 }}>
            Preferencias regionales y formato
          </p>
        </div>
        <Button 
          variant="primary" 
          icon={<Save size={18} />}
          onClick={onGuardar}
          disabled={guardando}
        >
          {guardando ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        <SelectField 
          label="Moneda"
          value={config.moneda}
          onChange={(e) => onChange({...config, moneda: e.target.value})}
          icon={<DollarSign size={16} />}
        >
          <option value="MXN">MXN - Peso Mexicano</option>
          <option value="USD">USD - Dólar Americano</option>
          <option value="EUR">EUR - Euro</option>
        </SelectField>

        <SelectField 
          label="Zona Horaria"
          value={config.timezone}
          onChange={(e) => onChange({...config, timezone: e.target.value})}
          icon={<Globe size={16} />}
        >
          <option value="America/Mexico_City">Ciudad de México (GMT-6)</option>
          <option value="America/Tijuana">Tijuana (GMT-8)</option>
          <option value="America/Cancun">Cancún (GMT-5)</option>
        </SelectField>

        <SelectField 
          label="Idioma"
          value={config.idioma}
          onChange={(e) => onChange({...config, idioma: e.target.value})}
        >
          <option value="es-MX">Español (México)</option>
          <option value="en-US">English (US)</option>
        </SelectField>

        <SelectField 
          label="Formato de Fecha"
          value={config.formatoFecha}
          onChange={(e) => onChange({...config, formatoFecha: e.target.value})}
        >
          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
        </SelectField>

        <SelectField 
          label="Formato de Hora"
          value={config.formatoHora}
          onChange={(e) => onChange({...config, formatoHora: e.target.value})}
          icon={<Clock size={16} />}
        >
          <option value="24h">24 horas</option>
          <option value="12h">12 horas (AM/PM)</option>
        </SelectField>

        <SelectField 
          label="Decimales"
          value={config.decimales}
          onChange={(e) => onChange({...config, decimales: parseInt(e.target.value)})}
        >
          <option value="0">0 decimales</option>
          <option value="2">2 decimales</option>
          <option value="4">4 decimales</option>
        </SelectField>

        <InputField 
          label="Separador de Miles"
          value={config.separadorMiles}
          onChange={(e) => onChange({...config, separadorMiles: e.target.value})}
        />

        <InputField 
          label="Separador Decimal"
          value={config.separadorDecimal}
          onChange={(e) => onChange({...config, separadorDecimal: e.target.value})}
        />
      </div>
    </Card>
  );
};

// Sección Rutas y Zonas
const SeccionRutas = ({ config, onChange, onGuardar, guardando }) => {
  const agregarZona = () => {
    const nuevaZona = {
      id: Date.now(),
      nombre: 'Nueva Zona',
      color: '#' + Math.floor(Math.random()*16777215).toString(16),
      activa: true
    };
    onChange({...config, zonas: [...config.zonas, nuevaZona]});
  };

  return (
    <div>
      <Card style={{ padding: 24, marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 600, margin: 0, marginBottom: 4 }}>
              Rutas y Zonas
            </h2>
            <p style={{ fontSize: 14, color: colors.gray600, margin: 0 }}>
              Configura las zonas de reparto y parámetros de rutas
            </p>
          </div>
          <Button 
            variant="primary" 
            icon={<Save size={18} />}
            onClick={onGuardar}
            disabled={guardando}
          >
            {guardando ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>

        {/* Zonas */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Zonas de Reparto</h3>
            <Button variant="outline" icon={<Plus size={16} />} onClick={agregarZona}>
              Agregar Zona
            </Button>
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            {config.zonas.map(zona => (
              <div 
                key={zona.id}
                style={{ 
                  padding: 16,
                  backgroundColor: colors.gray50,
                  borderRadius: 8,
                  border: `2px solid ${colors.gray200}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16
                }}
              >
                <input 
                  type="color" 
                  value={zona.color}
                  onChange={(e) => {
                    const nuevasZonas = config.zonas.map(z => 
                      z.id === zona.id ? {...z, color: e.target.value} : z
                    );
                    onChange({...config, zonas: nuevasZonas});
                  }}
                  style={{ width: 50, height: 50, border: 'none', cursor: 'pointer', borderRadius: 8 }}
                />
                <input 
                  type="text"
                  value={zona.nombre}
                  onChange={(e) => {
                    const nuevasZonas = config.zonas.map(z => 
                      z.id === zona.id ? {...z, nombre: e.target.value} : z
                    );
                    onChange({...config, zonas: nuevasZonas});
                  }}
                  style={{
                    flex: 1,
                    padding: 10,
                    border: `1px solid ${colors.gray300}`,
                    borderRadius: 6,
                    fontSize: 14,
                    fontWeight: 600
                  }}
                />
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input 
                    type="checkbox"
                    checked={zona.activa}
                    onChange={(e) => {
                      const nuevasZonas = config.zonas.map(z => 
                        z.id === zona.id ? {...z, activa: e.target.checked} : z
                      );
                      onChange({...config, zonas: nuevasZonas});
                    }}
                  />
                  <span style={{ fontSize: 13, color: colors.gray600 }}>Activa</span>
                </label>
                <button
                  onClick={() => {
                    const nuevasZonas = config.zonas.filter(z => z.id !== zona.id);
                    onChange({...config, zonas: nuevasZonas});
                  }}
                  style={{
                    padding: 8,
                    border: 'none',
                    backgroundColor: colors.danger + '10',
                    color: colors.danger,
                    borderRadius: 6,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Parámetros de Ruta */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Parámetros de Ruta</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          <InputField 
            label="Tiempo Promedio de Entrega (minutos)"
            type="number"
            value={config.tiempoEntregaDefault}
            onChange={(e) => onChange({...config, tiempoEntregaDefault: parseInt(e.target.value)})}
          />
          <InputField 
            label="Distancia Máxima por Ruta (km)"
            type="number"
            value={config.distanciaMaximaRuta}
            onChange={(e) => onChange({...config, distanciaMaximaRuta: parseInt(e.target.value)})}
          />
          <InputField 
            label="Pedidos Máximos por Ruta"
            type="number"
            value={config.pedidosMaximosPorRuta}
            onChange={(e) => onChange({...config, pedidosMaximosPorRuta: parseInt(e.target.value)})}
          />
          <div />
          <InputField 
            label="Hora Inicio de Jornada"
            type="time"
            value={config.horaInicioJornada}
            onChange={(e) => onChange({...config, horaInicioJornada: e.target.value})}
          />
          <InputField 
            label="Hora Fin de Jornada"
            type="time"
            value={config.horaFinJornada}
            onChange={(e) => onChange({...config, horaFinJornada: e.target.value})}
          />
        </div>
      </Card>
    </div>
  );
};

// Sección Categorías
const SeccionCategorias = ({ categorias, onChange, onGuardar, guardando }) => {
  const agregarCategoria = () => {
    const nuevaCategoria = {
      id: Date.now(),
      nombre: 'Nueva Categoría',
      icono: '📦',
      activa: true,
      productos: 0
    };
    onChange([...categorias, nuevaCategoria]);
  };

  return (
    <Card style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 600, margin: 0, marginBottom: 4 }}>
            Categorías de Productos
          </h2>
          <p style={{ fontSize: 14, color: colors.gray600, margin: 0 }}>
            Administra las categorías para organizar tus productos
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Button variant="outline" icon={<Plus size={18} />} onClick={agregarCategoria}>
            Agregar Categoría
          </Button>
          <Button 
            variant="primary" 
            icon={<Save size={18} />}
            onClick={onGuardar}
            disabled={guardando}
          >
            {guardando ? 'Guardando...' : 'Guardar'}
          </Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {categorias.map(cat => (
          <div 
            key={cat.id}
            style={{ 
              padding: 20,
              backgroundColor: colors.gray50,
              borderRadius: 8,
              border: `2px solid ${colors.gray200}`,
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ fontSize: 32 }}>{cat.icono}</div>
              <input 
                type="text"
                value={cat.nombre}
                onChange={(e) => {
                  const nuevasCategorias = categorias.map(c => 
                    c.id === cat.id ? {...c, nombre: e.target.value} : c
                  );
                  onChange(nuevasCategorias);
                }}
                style={{
                  flex: 1,
                  padding: 8,
                  border: `1px solid ${colors.gray300}`,
                  borderRadius: 6,
                  fontSize: 14,
                  fontWeight: 600
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 13, color: colors.gray600 }}>
                {cat.productos} productos
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                  <input 
                    type="checkbox"
                    checked={cat.activa}
                    onChange={(e) => {
                      const nuevasCategorias = categorias.map(c => 
                        c.id === cat.id ? {...c, activa: e.target.checked} : c
                      );
                      onChange(nuevasCategorias);
                    }}
                  />
                  <span style={{ fontSize: 12, color: colors.gray600 }}>Activa</span>
                </label>
                <button
                  onClick={() => {
                    if (confirm(`¿Eliminar categoría "${cat.nombre}"?`)) {
                      onChange(categorias.filter(c => c.id !== cat.id));
                    }
                  }}
                  style={{
                    padding: 6,
                    border: 'none',
                    backgroundColor: colors.danger + '10',
                    color: colors.danger,
                    borderRadius: 6,
                    cursor: 'pointer'
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// Sección Notificaciones
const SeccionNotificaciones = ({ config, onChange, onGuardar, guardando }) => {
  return (
    <Card style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 600, margin: 0, marginBottom: 4 }}>
            Notificaciones
          </h2>
          <p style={{ fontSize: 14, color: colors.gray600, margin: 0 }}>
            Configura qué notificaciones deseas recibir
          </p>
        </div>
        <Button 
          variant="primary" 
          icon={<Save size={18} />}
          onClick={onGuardar}
          disabled={guardando}
        >
          {guardando ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
      </div>

      {/* Email */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <Mail size={20} color={colors.primary} />
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Notificaciones por Email</h3>
        </div>
        <div style={{ display: 'grid', gap: 12 }}>
          {Object.entries(config.email).map(([key, value]) => (
            <SwitchField
              key={key}
              label={formatLabel(key)}
              checked={value}
              onChange={(checked) => onChange({
                ...config,
                email: { ...config.email, [key]: checked }
              })}
            />
          ))}
        </div>
      </div>

      {/* Push */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <Bell size={20} color={colors.accent} />
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Notificaciones Push</h3>
        </div>
        <div style={{ display: 'grid', gap: 12 }}>
          {Object.entries(config.push).map(([key, value]) => (
            <SwitchField
              key={key}
              label={formatLabel(key)}
              checked={value}
              onChange={(checked) => onChange({
                ...config,
                push: { ...config.push, [key]: checked }
              })}
            />
          ))}
        </div>
      </div>

      {/* SMS */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <Smartphone size={20} color={colors.success} />
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Notificaciones SMS</h3>
        </div>
        <div style={{ display: 'grid', gap: 12 }}>
          {Object.entries(config.sms).map(([key, value]) => (
            <SwitchField
              key={key}
              label={formatLabel(key)}
              checked={value}
              onChange={(checked) => onChange({
                ...config,
                sms: { ...config.sms, [key]: checked }
              })}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

// Sección Plantillas Email
const SeccionPlantillas = ({ plantillas, onChange, onGuardar, guardando }) => {
  return (
    <Card style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 600, margin: 0, marginBottom: 4 }}>
            Plantillas de Email
          </h2>
          <p style={{ fontSize: 14, color: colors.gray600, margin: 0 }}>
            Personaliza las plantillas de correo automáticas
          </p>
        </div>
        <Button 
          variant="primary" 
          icon={<Save size={18} />}
          onClick={onGuardar}
          disabled={guardando}
        >
          {guardando ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
      </div>

      <div style={{ display: 'grid', gap: 16 }}>
        {plantillas.map(plantilla => (
          <div 
            key={plantilla.id}
            style={{ 
              padding: 20,
              backgroundColor: colors.gray50,
              borderRadius: 8,
              border: `2px solid ${colors.gray200}`
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ flex: 1 }}>
                <input 
                  type="text"
                  value={plantilla.nombre}
                  onChange={(e) => {
                    const nuevasPlantillas = plantillas.map(p => 
                      p.id === plantilla.id ? {...p, nombre: e.target.value} : p
                    );
                    onChange(nuevasPlantillas);
                  }}
                  style={{
                    width: '100%',
                    padding: 8,
                    border: `1px solid ${colors.gray300}`,
                    borderRadius: 6,
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 8
                  }}
                />
                <input 
                  type="text"
                  value={plantilla.asunto}
                  onChange={(e) => {
                    const nuevasPlantillas = plantillas.map(p => 
                      p.id === plantilla.id ? {...p, asunto: e.target.value} : p
                    );
                    onChange(nuevasPlantillas);
                  }}
                  placeholder="Asunto del email"
                  style={{
                    width: '100%',
                    padding: 8,
                    border: `1px solid ${colors.gray300}`,
                    borderRadius: 6,
                    fontSize: 13
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: 8, marginLeft: 12 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                  <input 
                    type="checkbox"
                    checked={plantilla.activa}
                    onChange={(e) => {
                      const nuevasPlantillas = plantillas.map(p => 
                        p.id === plantilla.id ? {...p, activa: e.target.checked} : p
                      );
                      onChange(nuevasPlantillas);
                    }}
                  />
                  <span style={{ fontSize: 12, color: colors.gray600 }}>Activa</span>
                </label>
                <Button variant="outline" icon={<Edit2 size={16} />} style={{ fontSize: 12, padding: '6px 12px' }}>
                  Editar
                </Button>
              </div>
            </div>
            <div style={{ fontSize: 11, color: colors.gray500 }}>
              Variables disponibles: {'{pedido}'}, {'{cliente}'}, {'{fecha}'}, {'{monto}'}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// Sección Seguridad
const SeccionSeguridad = ({ config, onChange, onGuardar, guardando }) => {
  return (
    <Card style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 600, margin: 0, marginBottom: 4 }}>
            Seguridad
          </h2>
          <p style={{ fontSize: 14, color: colors.gray600, margin: 0 }}>
            Configura las políticas de seguridad del sistema
          </p>
        </div>
        <Button 
          variant="primary" 
          icon={<Save size={18} />}
          onClick={onGuardar}
          disabled={guardando}
        >
          {guardando ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 24 }}>
        <InputField 
          label="Expiración de Sesión (minutos)"
          type="number"
          value={config.sesionExpira}
          onChange={(e) => onChange({...config, sesionExpira: parseInt(e.target.value)})}
        />
        <InputField 
          label="Intentos Máximos de Login"
          type="number"
          value={config.intentosMaximos}
          onChange={(e) => onChange({...config, intentosMaximos: parseInt(e.target.value)})}
        />
        <InputField 
          label="Longitud Mínima de Contraseña"
          type="number"
          value={config.longitudMinPassword}
          onChange={(e) => onChange({...config, longitudMinPassword: parseInt(e.target.value)})}
        />
        <InputField 
          label="Cambio de Contraseña (días)"
          type="number"
          value={config.cambioPasswordDias}
          onChange={(e) => onChange({...config, cambioPasswordDias: parseInt(e.target.value)})}
        />
        <InputField 
          label="Sesiones Simultáneas Permitidas"
          type="number"
          value={config.sesionesSimultaneas}
          onChange={(e) => onChange({...config, sesionesSimultaneas: parseInt(e.target.value)})}
        />
      </div>

      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Requisitos de Contraseña</h3>
      <div style={{ display: 'grid', gap: 12 }}>
        <SwitchField
          label="Requiere números"
          checked={config.requiereNumeros}
          onChange={(checked) => onChange({...config, requiereNumeros: checked})}
        />
        <SwitchField
          label="Requiere mayúsculas"
          checked={config.requiereMayusculas}
          onChange={(checked) => onChange({...config, requiereMayusculas: checked})}
        />
        <SwitchField
          label="Requiere caracteres especiales"
          checked={config.requiereEspeciales}
          onChange={(checked) => onChange({...config, requiereEspeciales: checked})}
        />
      </div>
    </Card>
  );
};

// Sección Respaldo
const SeccionRespaldo = ({ backups = [] }) => {
  return (
    <div>
      <Card style={{ padding: 24, marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 600, margin: 0, marginBottom: 4 }}>
              Respaldo y Recuperación
            </h2>
            <p style={{ fontSize: 14, color: colors.gray600, margin: 0 }}>
              Administra los respaldos de tu base de datos
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Button variant="outline" icon={<Download size={18} />}>
              Descargar Último
            </Button>
            <Button variant="primary" icon={<Database size={18} />}>
              Crear Respaldo
            </Button>
          </div>
        </div>

        {/* Configuración automática */}
        <div style={{ padding: 16, backgroundColor: colors.primary + '10', borderRadius: 8, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>
                Respaldo Automático
              </div>
              <div style={{ fontSize: 12, color: colors.gray600 }}>
                Se realiza diariamente a las 02:00 hrs
              </div>
            </div>
            <Badge color="success">Activo</Badge>
          </div>
        </div>

        {/* Historial */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Historial de Respaldos</h3>
        <div style={{ display: 'grid', gap: 12 }}>
          {backups && backups.length > 0 ? (
            backups.map(backup => (
            <div 
              key={backup.id}
              style={{ 
                padding: 16,
                backgroundColor: colors.gray50,
                borderRadius: 8,
                border: `1px solid ${colors.gray200}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  backgroundColor: colors.success + '20',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Database size={20} color={colors.success} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>
                    {backup.fecha}
                  </div>
                  <div style={{ fontSize: 12, color: colors.gray600 }}>
                    {backup.tipo} • {backup.tamaño}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Badge color="success">{backup.estado}</Badge>
                <Button variant="outline" icon={<Download size={16} />} style={{ fontSize: 12, padding: '6px 12px' }}>
                  Descargar
                </Button>
                <Button variant="outline" icon={<RotateCcw size={16} />} style={{ fontSize: 12, padding: '6px 12px' }}>
                  Restaurar
                </Button>
              </div>
            </div>
          ))) : (
            <div style={{ 
              padding: 24, 
              textAlign: 'center', 
              color: colors.gray500,
              backgroundColor: colors.gray50,
              borderRadius: 8
            }}>
              No hay respaldos disponibles
            </div>
          )}
        </div>
      </Card>

      {/* Advertencia */}
      <Card style={{ padding: 16, backgroundColor: colors.warning + '10', border: `1px solid ${colors.warning}` }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <AlertTriangle size={20} color={colors.warning} style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: colors.warning, marginBottom: 4 }}>
              Importante
            </div>
            <div style={{ fontSize: 13, color: colors.gray700, lineHeight: 1.6 }}>
              Los respaldos se almacenan de forma segura. Antes de restaurar un respaldo, asegúrate de crear uno nuevo del estado actual. La restauración sobrescribirá todos los datos actuales.
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Componentes auxiliares
const InputField = ({ label, icon, ...props }) => (
  <div>
    <label style={{ fontSize: 13, fontWeight: 500, color: colors.gray700, marginBottom: 6, display: 'block' }}>
      {label}
    </label>
    <div style={{ position: 'relative' }}>
      {icon && (
        <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: colors.gray400 }}>
          {icon}
        </div>
      )}
      <input
        {...props}
        style={{
          width: '100%',
          padding: icon ? '10px 12px 10px 40px' : '10px 12px',
          border: `1px solid ${colors.gray300}`,
          borderRadius: 8,
          fontSize: 14,
          ...props.style
        }}
      />
    </div>
  </div>
);

const SelectField = ({ label, icon, children, ...props }) => (
  <div>
    <label style={{ fontSize: 13, fontWeight: 500, color: colors.gray700, marginBottom: 6, display: 'block' }}>
      {label}
    </label>
    <div style={{ position: 'relative' }}>
      {icon && (
        <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: colors.gray400, pointerEvents: 'none' }}>
          {icon}
        </div>
      )}
      <select
        {...props}
        style={{
          width: '100%',
          padding: icon ? '10px 12px 10px 40px' : '10px 12px',
          border: `1px solid ${colors.gray300}`,
          borderRadius: 8,
          fontSize: 14,
          backgroundColor: 'white',
          cursor: 'pointer'
        }}
      >
        {children}
      </select>
    </div>
  </div>
);

const SwitchField = ({ label, checked, onChange }) => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.gray50,
    borderRadius: 6
  }}>
    <span style={{ fontSize: 14, color: colors.gray700 }}>{label}</span>
    <label style={{ position: 'relative', display: 'inline-block', width: 44, height: 24, cursor: 'pointer' }}>
      <input 
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ opacity: 0, width: 0, height: 0 }}
      />
      <span style={{
        position: 'absolute',
        cursor: 'pointer',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: checked ? colors.success : colors.gray300,
        transition: '0.3s',
        borderRadius: 24
      }}>
        <span style={{
          position: 'absolute',
          content: '',
          height: 18,
          width: 18,
          left: checked ? 23 : 3,
          bottom: 3,
          backgroundColor: 'white',
          transition: '0.3s',
          borderRadius: '50%'
        }} />
      </span>
    </label>
  </div>
);

const formatLabel = (key) => {
  const labels = {
    pedidosNuevos: 'Pedidos nuevos',
    pedidosCancelados: 'Pedidos cancelados',
    devolucionesNuevas: 'Devoluciones nuevas',
    alertasInventario: 'Alertas de inventario',
    reportesDiarios: 'Reportes diarios',
    reportesSemanales: 'Reportes semanales',
    entregas: 'Entregas',
    cobros: 'Cobros',
    alertas: 'Alertas generales',
    alertasCriticas: 'Alertas críticas',
    confirmacionPedidos: 'Confirmación de pedidos'
  };
  return labels[key] || key;
};

export default Configuracion;
