import React, { useState } from 'react';
import { MapPin, Clock, Navigation, CheckCircle, X, Camera, Plus, ChevronLeft, Edit, Phone, Mail, FileText, AlertCircle } from 'lucide-react';
import { MobileFrame, MobileBottomNav, Card, Button } from '../../shared/MobileComponents.jsx';
import { colors } from '../../shared/colors.js';

const Badge = ({ children, variant = 'success' }) => {
  const variants = {
    success: { bg: colors.success, color: colors.white },
    primary: { bg: colors.primary, color: colors.white },
  };
  const v = variants[variant];
  return (
    <span style={{
      backgroundColor: v.bg,
      color: v.color,
      padding: '2px 8px',
      borderRadius: 12,
      fontSize: 10,
      fontWeight: 600,
    }}>{children}</span>
  );
};

export const DetalleCliente = ({ cliente, onBack, onNavigate, currentScreen, notificationCount = 0, onCheckIn, navItems }) => {
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [noVisitar, setNoVisitar] = useState(false); // Estado para marcar como "No Visitar"
  const [mostrarCamara, setMostrarCamara] = useState(false);
  const [editandoContacto, setEditandoContacto] = useState(false);
  const [datosContacto, setDatosContacto] = useState({
    contacto: 'José Martínez',
    phone: '81 1234 5678',
    email: 'jose.martinez@abarrotes.com'
  });
  const [notas, setNotas] = useState([
    { id: 1, texto: 'Cliente solicitó productos premium para próxima visita', fecha: '3 Ene 2026', hora: '10:30 AM' },
    { id: 2, texto: 'Pagó saldo vencido de $2,500. Queda al corriente.', fecha: '30 Dic 2025', hora: '11:15 AM' },
  ]);
  const [nuevaNota, setNuevaNota] = useState('');
  const [fotos, setFotos] = useState([
    { id: 1, emoji: '🏪', fecha: '3 Ene 2026' },
    { id: 2, emoji: '🏬', fecha: '30 Dic 2025' },
    { id: 3, emoji: '🏢', fecha: '20 Dic 2025' },
  ]);
  const [gpsCoordinates, setGpsCoordinates] = useState({ lat: 25.6866, lng: -100.3161 });
  const [gpsAccuracy, setGpsAccuracy] = useState(12);
  const [gpsCaptureDate, setGpsCaptureDate] = useState('15 Dic 2025');

  const handleCheckIn = () => {
    setCheckedIn(true);
    const now = new Date();
    setCheckInTime(now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }));
    
    // Simular captura de coordenadas GPS actuales
    const simulatedLat = 25.6866 + (Math.random() - 0.5) * 0.01;
    const simulatedLng = -100.3161 + (Math.random() - 0.5) * 0.01;
    const simulatedAccuracy = Math.floor(Math.random() * 20) + 5;
    
    setGpsCoordinates({ lat: simulatedLat, lng: simulatedLng });
    setGpsAccuracy(simulatedAccuracy);
    setGpsCaptureDate(now.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' }));
    
    // Notificar al componente padre sobre el check-in
    if (onCheckIn) {
      onCheckIn(true);
    }
  };

  const handleCheckOut = () => {
    alert('✅ Check-Out realizado. Visita finalizada.');
    // Notificar al componente padre sobre el check-out
    if (onCheckIn) {
      onCheckIn(false);
    }
    if (onBack) onBack();
  };
  
  const handleNoVisitar = () => {
    // Navegar a la pantalla de Registro No Visita
    if (onNavigate) {
      onNavigate('no-visitar');
    }
  };

  const handleAgregarNota = () => {
    if (nuevaNota.trim()) {
      const now = new Date();
      const nuevaNotaObj = {
        id: notas.length + 1,
        texto: nuevaNota,
        fecha: now.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' }),
        hora: now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
      };
      setNotas([nuevaNotaObj, ...notas]);
      setNuevaNota('');
    }
  };

  const handleEditarContacto = () => {
    setEditandoContacto(true);
  };

  const handleGuardarContacto = () => {
    // Validar email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (datosContacto.email && !emailRegex.test(datosContacto.email)) {
      alert('Por favor ingresa un correo electrónico válido');
      return;
    }

    // Validar teléfono básico (al menos 10 dígitos)
    const phoneDigits = datosContacto.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      alert('Por favor ingresa un teléfono válido (mínimo 10 dígitos)');
      return;
    }

    setEditandoContacto(false);
    alert('✅ Datos de contacto actualizados correctamente');
  };

  const handleCancelarEdicion = () => {
    // Restaurar valores originales
    setDatosContacto({
      contacto: 'José Martínez',
      phone: '81 1234 5678',
      email: 'jose.martinez@abarrotes.com'
    });
    setEditandoContacto(false);
  };

  const handleTomarFoto = () => {
    const emojis = ['🏪', '🏬', '🏢', '🛒', '📦', '🏭', '🏗️', '🏛️'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const now = new Date();
    const nuevaFoto = {
      id: fotos.length + 1,
      emoji: randomEmoji,
      fecha: now.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    setFotos([nuevaFoto, ...fotos]);
    setMostrarCamara(false);
    alert('📸 Foto capturada exitosamente');
  };

  const clienteData = cliente || {
    name: 'Abarrotes Don José',
    id: 'CLI-001',
    address: 'Av. Juárez 234',
    colonia: 'Col. Centro, C.P. 64000',
    ciudad: 'Monterrey, N.L.',
    time: '9:30 AM',
    distance: '2.3 km',
    amount: '$2,450',
    phone: '81 1234 5678',
    contacto: 'José Martínez',
    email: 'jose.martinez@abarrotes.com',
  };

  return (
    <MobileFrame title="Detalle del Cliente" showBack onBack={onBack} statusBar={true}>
      <div style={{ padding: 16, paddingBottom: 80 }}>
        {/* Tarjeta Principal del Cliente */}
        <Card style={{
          marginBottom: 16,
          backgroundColor: noVisitar ? `${colors.danger}05` : (checkedIn ? `${colors.success}10` : colors.white),
          border: noVisitar ? `2px solid ${colors.danger}` : (checkedIn ? `2px solid ${colors.success}` : 'none')
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              backgroundColor: noVisitar ? colors.danger : (checkedIn ? colors.success : colors.primary),
              color: colors.white,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              fontWeight: 700
            }}>
              {noVisitar ? <X size={28} /> : (checkedIn ? <CheckCircle size={28} /> : 'DJ')}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 600, color: colors.gray800 }}>
                {clienteData.name}
              </div>
              <div style={{ fontSize: 12, color: colors.gray500 }}>
                {clienteData.id} • Cliente desde 2023
              </div>
              {checkedIn && (
                <div style={{ fontSize: 12, color: colors.success, fontWeight: 600, marginTop: 4 }}>
                  ✓ En visita desde {checkInTime}
                </div>
              )}
              {noVisitar && (
                <div style={{ fontSize: 12, color: colors.danger, fontWeight: 600, marginTop: 4 }}>
                  ✗ Marcado como No Visitado
                </div>
              )}
            </div>
          </div>

          {noVisitar ? (
            <div style={{
              padding: 12,
              backgroundColor: `${colors.danger}10`,
              borderRadius: 8,
              textAlign: 'center',
              color: colors.danger,
              fontSize: 13,
              fontWeight: 600
            }}>
              ⚠️ Este cliente fue marcado como "No Visitado" hoy
            </div>
          ) : !checkedIn ? (
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="primary" icon={<MapPin size={18} />} onClick={handleCheckIn} style={{ flex: 1 }}>
                Hacer Check-In
              </Button>
              <Button variant="secondary" icon={<X size={18} />} onClick={handleNoVisitar}>
                No Visitar
              </Button>
            </div>
          ) : (
            <Button variant="success" icon={<CheckCircle size={18} />} onClick={handleCheckOut} style={{ width: '100%' }}>
              Finalizar Visita (Check-Out)
            </Button>
          )}
        </Card>

        {/* Métricas Rápidas */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <Card style={{ textAlign: 'center' }}>
            <MapPin size={20} color={colors.primary} style={{ margin: '0 auto' }} />
            <div style={{ fontSize: 11, color: colors.gray500, marginTop: 4 }}>Distancia</div>
            <div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>{clienteData.distance}</div>
          </Card>
          <Card style={{ textAlign: 'center' }}>
            <Clock size={20} color={colors.accent} style={{ margin: '0 auto' }} />
            <div style={{ fontSize: 11, color: colors.gray500, marginTop: 4 }}>Hora sugerida</div>
            <div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>{clienteData.time}</div>
          </Card>
        </div>

        {/* Botón Ver Historial Completo */}
        <Button 
          variant="secondary" 
          icon={<FileText size={18} />} 
          onClick={() => {
            if (onNavigate) {
              onNavigate('historial');
            }
          }}
          style={{ width: '100%', marginBottom: 16 }}
        >
          Ver Historial Completo
        </Button>

        {/* Dirección */}
        <Card style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            <MapPin size={18} color={colors.gray600} />
            Dirección
          </div>
          <div style={{ fontSize: 14, color: colors.gray700, lineHeight: 1.5 }}>
            {clienteData.address}<br />
            {clienteData.colonia}<br />
            {clienteData.ciudad}
          </div>
          <Button variant="secondary" icon={<Navigation size={16} />} style={{ marginTop: 12, fontSize: 12, padding: '6px 12px' }}>
            Abrir en Maps
          </Button>
        </Card>

        {/* Coordenadas GPS */}
        <Card style={{ marginBottom: 16, backgroundColor: colors.gray50 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Navigation size={18} color={colors.primary} />
            Coordenadas GPS
            {checkedIn && (
              <Badge variant="success" style={{ marginLeft: 'auto', fontSize: 10 }}>
                Actualizado
              </Badge>
            )}
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ fontSize: 11, color: colors.gray500, minWidth: 70 }}>Latitud:</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: colors.gray800, fontFamily: 'monospace' }}>
                {gpsCoordinates.lat.toFixed(6)}°
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ fontSize: 11, color: colors.gray500, minWidth: 70 }}>Longitud:</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: colors.gray800, fontFamily: 'monospace' }}>
                {gpsCoordinates.lng.toFixed(6)}°
              </div>
            </div>
            
            <div style={{ borderTop: `1px solid ${colors.gray200}`, marginTop: 4, paddingTop: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11 }}>
                <div style={{ color: colors.gray500 }}>
                  Precisión: <span style={{ fontWeight: 600, color: colors.gray700 }}>±{gpsAccuracy}m</span>
                </div>
                <div style={{ color: colors.gray500 }}>
                  Capturado: <span style={{ fontWeight: 600, color: colors.gray700 }}>{gpsCaptureDate}</span>
                </div>
              </div>
            </div>
            
            {!checkedIn && (
              <div style={{ 
                backgroundColor: colors.warning + '15', 
                border: `1px solid ${colors.warning}40`, 
                borderRadius: 6, 
                padding: 10, 
                marginTop: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                <AlertCircle size={16} color={colors.warning} />
                <div style={{ fontSize: 11, color: colors.gray700 }}>
                  Las coordenadas se actualizarán al hacer check-in
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Información de Contacto */}
        <Card style={{ marginBottom: 16 }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 12 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Phone size={18} style={{ color: colors.purple500 }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: colors.gray900 }}>
                Contacto
              </span>
            </div>
            {!editandoContacto ? (
              <Button 
                variant="secondary" 
                icon={<Edit size={14} />} 
                onClick={handleEditarContacto}
                disabled={noVisitar}
                style={{ 
                  fontSize: 11, 
                  padding: '4px 8px',
                  opacity: noVisitar ? 0.5 : 1,
                  cursor: noVisitar ? 'not-allowed' : 'pointer'
                }}
              >
                Editar
              </Button>
            ) : (
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={handleCancelarEdicion}
                  style={{
                    padding: '6px 12px',
                    background: colors.gray100,
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontSize: 12,
                    fontWeight: 500,
                    color: colors.gray700
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleGuardarContacto}
                  style={{
                    padding: '6px 12px',
                    background: colors.purple500,
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontSize: 12,
                    fontWeight: 500,
                    color: 'white'
                  }}
                >
                  Guardar
                </button>
              </div>
            )}
          </div>

          {!editandoContacto ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontSize: 13, color: colors.gray700 }}>
                <strong>Encargado:</strong> {datosContacto.contacto}
              </div>
              <div style={{ fontSize: 13, color: colors.gray700, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Phone size={14} color={colors.gray500} />
                {datosContacto.phone}
              </div>
              <div style={{ fontSize: 13, color: colors.gray700, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Mail size={14} color={colors.gray500} />
                {datosContacto.email}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ 
                  fontSize: 12, 
                  color: colors.gray600, 
                  display: 'block', 
                  marginBottom: 6,
                  fontWeight: 500 
                }}>
                  Encargado
                </label>
                <input
                  type="text"
                  value={datosContacto.contacto}
                  onChange={(e) => setDatosContacto({ ...datosContacto, contacto: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `1px solid ${colors.gray300}`,
                    borderRadius: 8,
                    fontSize: 13,
                    fontFamily: 'inherit',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Nombre del encargado"
                />
              </div>
              <div>
                <label style={{ 
                  fontSize: 12, 
                  color: colors.gray600, 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: 4,
                  marginBottom: 6,
                  fontWeight: 500
                }}>
                  <Phone size={14} />
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={datosContacto.phone}
                  onChange={(e) => setDatosContacto({ ...datosContacto, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `1px solid ${colors.gray300}`,
                    borderRadius: 8,
                    fontSize: 13,
                    fontFamily: 'inherit',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  placeholder="81 1234 5678"
                />
              </div>
              <div>
                <label style={{ 
                  fontSize: 12, 
                  color: colors.gray600, 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: 4,
                  marginBottom: 6,
                  fontWeight: 500
                }}>
                  <Mail size={14} />
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={datosContacto.email}
                  onChange={(e) => setDatosContacto({ ...datosContacto, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `1px solid ${colors.gray300}`,
                    borderRadius: 8,
                    fontSize: 13,
                    fontFamily: 'inherit',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  placeholder="correo@ejemplo.com"
                />
              </div>
            </div>
          )}
        </Card>

        {/* Fotos del Establecimiento */}
        <Card style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Camera size={18} color={colors.gray600} />
              Fotos ({fotos.length})
            </span>
            <Button 
              variant="primary" 
              icon={<Camera size={14} />} 
              onClick={() => setMostrarCamara(true)}
              disabled={noVisitar}
              style={{ 
                fontSize: 11, 
                padding: '4px 8px',
                opacity: noVisitar ? 0.5 : 1,
                cursor: noVisitar ? 'not-allowed' : 'pointer'
              }}
            >
              Tomar Foto
            </Button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {fotos.map(foto => (
              <div key={foto.id} style={{
                aspectRatio: '1',
                backgroundColor: colors.gray100,
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
                cursor: 'pointer'
              }}>
                {foto.emoji}
              </div>
            ))}
          </div>
        </Card>

        {/* Notas */}
        <Card>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Edit size={18} color={colors.gray600} />
            Notas de Visita ({notas.length})
          </div>

          {/* Agregar nueva nota */}
          <div style={{ marginBottom: 16 }}>
            <textarea
              value={nuevaNota}
              onChange={(e) => setNuevaNota(e.target.value)}
              placeholder="Agregar una nota sobre esta visita..."
              style={{
                width: '100%',
                minHeight: 60,
                padding: 10,
                border: `1px solid ${colors.gray300}`,
                borderRadius: 8,
                fontSize: 13,
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
            <Button 
              variant="primary" 
              icon={<Plus size={16} />} 
              onClick={handleAgregarNota}
              style={{ marginTop: 8, fontSize: 12, padding: '6px 12px' }}
              disabled={!nuevaNota.trim()}
            >
              Agregar Nota
            </Button>
          </div>

          {/* Lista de notas */}
          <div style={{ maxHeight: 300, overflowY: 'auto' }}>
            {notas.map(nota => (
              <div key={nota.id} style={{
                padding: 12,
                backgroundColor: colors.gray50,
                borderRadius: 8,
                marginBottom: 8,
                borderLeft: `3px solid ${colors.primary}`
              }}>
                <div style={{ fontSize: 13, color: colors.gray800, marginBottom: 6 }}>
                  {nota.texto}
                </div>
                <div style={{ fontSize: 11, color: colors.gray500 }}>
                  {nota.fecha} • {nota.hora}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Navegación inferior */}
      <MobileBottomNav 
        active={currentScreen}
        onNavigate={onNavigate}
        notificationCount={notificationCount}
        items={navItems || [
          { id: 'home', label: 'Inicio', icon: <MapPin size={20} /> },
          { id: 'clientes', label: 'Clientes', icon: <MapPin size={20} /> },
          { id: 'pedido', label: 'Pedido', icon: <Clock size={20} /> },
          { id: 'inventario', label: 'Inventario', icon: <Camera size={20} /> },
          { id: 'notificaciones', label: 'Alertas', icon: <MapPin size={20} /> },
        ]}
      />

      {/* Modal de Cámara */}
      {mostrarCamara && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 40,
          overflow: 'hidden'
        }}>
          {/* Header de la cámara */}
          <div style={{
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(10px)'
          }}>
            <button
              onClick={() => setMostrarCamara(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 14,
                fontWeight: 500
              }}
            >
              <X size={20} />
              Cerrar
            </button>
            <div style={{ color: 'white', fontSize: 14, fontWeight: 600 }}>
              Tomar Foto
            </div>
            <div style={{ width: 60 }} /> {/* Spacer */}
          </div>

          {/* Vista de cámara emulada */}
          <div style={{
            flex: 1,
            position: 'relative',
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            {/* Grid pattern para simular vista de cámara */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(255,255,255,0.03) 49px, rgba(255,255,255,0.03) 50px),
                repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(255,255,255,0.03) 49px, rgba(255,255,255,0.03) 50px)
              `
            }} />

            {/* Simulación de edificio/tienda */}
            <div style={{
              fontSize: 120,
              opacity: 0.7,
              filter: 'blur(2px)',
              animation: 'pulse 2s infinite'
            }}>
              🏪
            </div>

            {/* Overlay con guías de cámara */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              height: '60%',
              border: '2px solid rgba(255, 255, 255, 0.5)',
              borderRadius: 12,
              pointerEvents: 'none'
            }}>
              {/* Esquinas de enfoque */}
              <div style={{
                position: 'absolute',
                top: -2,
                left: -2,
                width: 20,
                height: 20,
                borderTop: '3px solid white',
                borderLeft: '3px solid white'
              }} />
              <div style={{
                position: 'absolute',
                top: -2,
                right: -2,
                width: 20,
                height: 20,
                borderTop: '3px solid white',
                borderRight: '3px solid white'
              }} />
              <div style={{
                position: 'absolute',
                bottom: -2,
                left: -2,
                width: 20,
                height: 20,
                borderBottom: '3px solid white',
                borderLeft: '3px solid white'
              }} />
              <div style={{
                position: 'absolute',
                bottom: -2,
                right: -2,
                width: 20,
                height: 20,
                borderBottom: '3px solid white',
                borderRight: '3px solid white'
              }} />
            </div>

            {/* Indicador de enfoque */}
            <div style={{
              position: 'absolute',
              top: 20,
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(34, 197, 94, 0.9)',
              color: 'white',
              padding: '6px 12px',
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: 'white',
                animation: 'blink 1s infinite'
              }} />
              Enfocado
            </div>
          </div>

          {/* Controles de la cámara */}
          <div style={{
            padding: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(0, 0, 0, 0.9)'
          }}>
            {/* Botón Gallery/Previews */}
            <button
              style={{
                width: 50,
                height: 50,
                borderRadius: 8,
                border: '2px solid rgba(255, 255, 255, 0.5)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: 20,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div style={{ fontSize: 24 }}>
                {fotos[0]?.emoji || '🏪'}
              </div>
            </button>

            {/* Botón Capturar */}
            <button
              onClick={handleTomarFoto}
              style={{
                width: 70,
                height: 70,
                borderRadius: '50%',
                border: '4px solid white',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                transition: 'all 0.2s'
              }}
            >
              <div style={{
                width: 54,
                height: 54,
                borderRadius: '50%',
                backgroundColor: 'white'
              }} />
            </button>

            {/* Botón Flip/Opciones */}
            <button
              style={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                border: '2px solid rgba(255, 255, 255, 0.5)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Camera size={24} />
            </button>
          </div>

          <style>{`
            @keyframes pulse {
              0%, 100% { transform: scale(1); opacity: 0.7; }
              50% { transform: scale(1.05); opacity: 0.85; }
            }
            @keyframes blink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.3; }
            }
          `}</style>
        </div>
      )}
    </MobileFrame>
  );
};
