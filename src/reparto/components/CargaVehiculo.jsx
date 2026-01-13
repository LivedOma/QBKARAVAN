import React, { useState } from 'react';
import { Truck, CheckCircle, AlertCircle, Camera, X } from 'lucide-react';
import { colors } from '../../shared/colors.js';

const CargaVehiculo = ({ onNavigate, onCompletarCarga }) => {
  const [productos, setProductos] = useState([
    { id: 1, name: 'Leche Entera 1L', qty: 120, loaded: 0, status: 'pending', code: '7501234567890' },
    { id: 2, name: 'Yogurt Natural 1kg', qty: 48, loaded: 0, status: 'pending', code: '7501234567891' },
    { id: 3, name: 'Queso Panela 400g', qty: 36, loaded: 0, status: 'pending', code: '7501234567892' },
    { id: 4, name: 'Crema Ácida 500ml', qty: 24, loaded: 0, status: 'pending', code: '7501234567893' },
    { id: 5, name: 'Mantequilla 250g', qty: 18, loaded: 0, status: 'pending', code: '7501234567894' },
  ]);

  const [showScanModal, setShowScanModal] = useState(false);
  const [scanning, setScanning] = useState(false);

  const totalProductos = productos.length;
  const productosCompletos = productos.filter(p => p.status === 'complete').length;
  const progreso = (productosCompletos / totalProductos) * 100;

  const handleCargarProducto = (id) => {
    setProductos(productos.map(p => 
      p.id === id ? { ...p, loaded: p.qty, status: 'complete' } : p
    ));
  };

  const handleScanSimulado = () => {
    setScanning(true);
    setTimeout(() => {
      // Simula escaneo y carga automática del primer producto pendiente
      const pendiente = productos.find(p => p.status !== 'complete');
      if (pendiente) {
        handleCargarProducto(pendiente.id);
        alert(`Producto escaneado: ${pendiente.name}\n✓ Cargado exitosamente`);
      }
      setScanning(false);
      setShowScanModal(false);
    }, 2000);
  };

  const todasCargasCompletas = productos.every(p => p.status === 'complete');

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.gray50,
      paddingBottom: 20
    }}>
      {/* Header con info del vehículo */}
      <div style={{
        background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 100%)`,
        padding: 16,
        color: 'white',
        marginBottom: 16
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <Truck size={32} />
          <div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>Vehículo Asignado</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>Unidad 07 - NLR-4521</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, opacity: 0.8 }}>Productos</div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>156</div>
          </div>
          <div>
            <div style={{ fontSize: 11, opacity: 0.8 }}>Entregas</div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>18</div>
          </div>
          <div>
            <div style={{ fontSize: 11, opacity: 0.8 }}>Valor</div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>$45,320</div>
          </div>
        </div>
      </div>

      {/* Botón de escaneo */}
      <div style={{ padding: '0 16px', marginBottom: 16 }}>
        <button 
          onClick={() => setShowScanModal(true)}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: 8,
            border: 'none',
            backgroundColor: colors.primary,
            color: 'white',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8
        }}>
          <Camera size={18} />
          Escanear Producto
        </button>
      </div>

      {/* Lista de productos */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: colors.gray500, marginBottom: 8 }}>
          PRODUCTOS POR CARGAR ({productosCompletos} de {totalProductos})
        </div>
        
        {productos.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: 'white',
              padding: 16,
              borderRadius: 12,
              marginBottom: 8,
              borderLeft: `4px solid ${
                item.status === 'complete' ? colors.success :
                item.status === 'partial' ? colors.warning :
                colors.gray300
              }`,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>
                  {item.name}
                </div>
                <div style={{ fontSize: 12, color: colors.gray500 }}>
                  {item.loaded} / {item.qty} unidades
                  {item.status === 'partial' && (
                    <span style={{ color: colors.warning, marginLeft: 8 }}>
                      • Faltante: {item.qty - item.loaded}
                    </span>
                  )}
                </div>
              </div>
              {item.status === 'complete' ? (
                <CheckCircle size={24} color={colors.success} />
              ) : item.status === 'partial' ? (
                <AlertCircle size={24} color={colors.warning} />
              ) : (
                <button
                  onClick={() => handleCargarProducto(item.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    border: 'none',
                    backgroundColor: colors.primary,
                    color: 'white',
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cargar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer con progreso y botón */}
      <div style={{
        padding: 16,
        backgroundColor: 'white',
        borderTop: `1px solid ${colors.gray200}`,
        marginTop: 16
      }}>
        {/* Barra de progreso */}
        <div style={{ marginBottom: 8 }}>
          <div style={{
            height: 8,
            backgroundColor: colors.gray200,
            borderRadius: 4,
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${progreso}%`,
              backgroundColor: colors.success,
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: 12,
          fontSize: 12
        }}>
          <span style={{ color: colors.gray500 }}>{progreso.toFixed(0)}% cargado</span>
          <span style={{ fontWeight: 600 }}>{productosCompletos} de {totalProductos} productos</span>
        </div>
        
        <button
          onClick={() => {
            if (todasCargasCompletas && onCompletarCarga) {
              onCompletarCarga();
            }
          }}
          disabled={!todasCargasCompletas}
          style={{
            width: '100%',
            padding: '14px 20px',
            borderRadius: 12,
            border: 'none',
            backgroundColor: todasCargasCompletas ? colors.success : colors.gray300,
            color: 'white',
            fontSize: 16,
            fontWeight: 600,
            cursor: todasCargasCompletas ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            opacity: todasCargasCompletas ? 1 : 0.6
          }}
        >
          <CheckCircle size={20} />
          Confirmar Carga Completa
        </button>
      </div>

      {/* Modal de Escaneo - Estilo Android */}
      {showScanModal && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: colors.gray900,
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header oscuro con controles */}
          <div style={{
            padding: '12px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)'
          }}>
            <button
              onClick={() => setShowScanModal(false)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={28} color="white" strokeWidth={2} />
            </button>
            <div style={{
              color: 'white',
              fontSize: 16,
              fontWeight: 500
            }}>
              Escanear código de barras
            </div>
            <div style={{ width: 44 }} /> {/* Spacer para centrar título */}
          </div>

          {/* Área de vista de cámara */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Overlay semi-transparente con recorte */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)'
            }} />

            {/* Marco de escaneo central */}
            <div style={{
              position: 'relative',
              zIndex: 2,
              width: '85%',
              maxWidth: 320,
              height: 160,
              border: '3px solid white',
              borderRadius: 12,
              boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              {/* Esquinas del marco (estilo Android) */}
              <div style={{ position: 'absolute', top: -3, left: -3, width: 40, height: 40, borderTop: `5px solid ${colors.success}`, borderLeft: `5px solid ${colors.success}`, borderRadius: '12px 0 0 0' }} />
              <div style={{ position: 'absolute', top: -3, right: -3, width: 40, height: 40, borderTop: `5px solid ${colors.success}`, borderRight: `5px solid ${colors.success}`, borderRadius: '0 12px 0 0' }} />
              <div style={{ position: 'absolute', bottom: -3, left: -3, width: 40, height: 40, borderBottom: `5px solid ${colors.success}`, borderLeft: `5px solid ${colors.success}`, borderRadius: '0 0 0 12px' }} />
              <div style={{ position: 'absolute', bottom: -3, right: -3, width: 40, height: 40, borderBottom: `5px solid ${colors.success}`, borderRight: `5px solid ${colors.success}`, borderRadius: '0 0 12px 0' }} />

              {/* Línea de escaneo animada */}
              {scanning && (
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: 3,
                  backgroundColor: colors.success,
                  boxShadow: `0 0 15px ${colors.success}`,
                  animation: 'scan 2s ease-in-out infinite'
                }} />
              )}
            </div>

            {/* Instrucciones */}
            <div style={{
              position: 'absolute',
              bottom: 140,
              left: 0,
              right: 0,
              textAlign: 'center',
              color: 'white',
              padding: '0 24px',
              zIndex: 3
            }}>
              {scanning ? (
                <>
                  <div style={{ 
                    fontSize: 18, 
                    fontWeight: 600,
                    marginBottom: 8
                  }}>
                    Escaneando...
                  </div>
                  <div style={{ 
                    fontSize: 14, 
                    opacity: 0.9
                  }}>
                    Mantenga el código dentro del marco
                  </div>
                </>
              ) : (
                <>
                  <div style={{ 
                    fontSize: 16, 
                    fontWeight: 500,
                    marginBottom: 8
                  }}>
                    Coloque el código de barras dentro del marco
                  </div>
                  <div style={{ 
                    fontSize: 13, 
                    opacity: 0.8
                  }}>
                    El escaneo se realizará automáticamente
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Footer con botón de acción */}
          <div style={{
            padding: 24,
            paddingBottom: 32,
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            flexDirection: 'column',
            gap: 12
          }}>
            <button
              onClick={handleScanSimulado}
              disabled={scanning}
              style={{
                width: '100%',
                padding: '16px 24px',
                borderRadius: 50,
                border: 'none',
                backgroundColor: scanning ? colors.gray600 : 'white',
                color: scanning ? colors.gray300 : colors.gray900,
                fontSize: 16,
                fontWeight: 600,
                cursor: scanning ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                boxShadow: scanning ? 'none' : '0 4px 12px rgba(255,255,255,0.2)'
              }}
            >
              <Camera size={22} />
              {scanning ? 'Escaneando...' : 'Iniciar Escaneo'}
            </button>
            
            <div style={{
              textAlign: 'center',
              color: 'rgba(255,255,255,0.7)',
              fontSize: 12
            }}>
              Toque el botón para simular el escaneo
            </div>
          </div>

          {/* Estilos para animación de línea de escaneo */}
          <style>{`
            @keyframes scan {
              0%, 100% { transform: translateY(-80px); }
              50% { transform: translateY(80px); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default CargaVehiculo;
