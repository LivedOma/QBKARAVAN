import React, { useState } from 'react';
import { Package, AlertTriangle, History, TrendingDown, TrendingUp, ArrowRightLeft, Camera, Clock } from 'lucide-react';
import { colors } from '../../shared/colors.js';

const InventarioRuta = ({ onNavigate }) => {
  const [tabActiva, setTabActiva] = useState('inventario'); // inventario | alertas | historial

  const [productos, setProductos] = useState([
    {
      id: 'PROD-001',
      codigo: 'LEC-1000',
      nombre: 'Leche Entera 1L',
      categoria: 'Lácteos',
      stockInicial: 120,
      stockActual: 87,
      vendidos: 28,
      devueltos: 2,
      mermas: 1,
      caducidad: '15 Ene 2025',
      diasParaCaducar: 7,
      alertaCaducidad: true,
      lote: 'L20241215'
    },
    {
      id: 'PROD-002',
      codigo: 'YOG-500',
      nombre: 'Yogurt Natural 1kg',
      categoria: 'Lácteos',
      stockInicial: 80,
      stockActual: 45,
      vendidos: 32,
      devueltos: 1,
      mermas: 2,
      caducidad: '18 Ene 2025',
      diasParaCaducar: 10,
      alertaCaducidad: false,
      lote: 'L20241218'
    },
    {
      id: 'PROD-003',
      codigo: 'QUE-400',
      nombre: 'Queso Panela 400g',
      categoria: 'Lácteos',
      stockInicial: 60,
      stockActual: 18,
      vendidos: 38,
      devueltos: 3,
      mermas: 1,
      caducidad: '10 Ene 2025',
      diasParaCaducar: 2,
      alertaCaducidad: true,
      lote: 'L20241210'
    },
    {
      id: 'PROD-004',
      codigo: 'CRE-250',
      nombre: 'Crema Natural 250ml',
      categoria: 'Lácteos',
      stockInicial: 50,
      stockActual: 32,
      vendidos: 15,
      devueltos: 0,
      mermas: 3,
      caducidad: '20 Ene 2025',
      diasParaCaducar: 12,
      alertaCaducidad: false,
      lote: 'L20241220'
    }
  ]);

  const [historialMovimientos, setHistorialMovimientos] = useState([
    {
      id: 'MOV-001',
      tipo: 'venta',
      producto: 'Leche Entera 1L',
      cantidad: 12,
      cliente: 'Abarrotes Don José',
      fecha: '08 Ene 2025 09:30',
      repartidor: 'Juan Pérez'
    },
    {
      id: 'MOV-002',
      tipo: 'merma',
      producto: 'Crema Natural 250ml',
      cantidad: 3,
      motivo: 'Envase dañado',
      fecha: '08 Ene 2025 10:15',
      repartidor: 'Juan Pérez'
    },
    {
      id: 'MOV-003',
      tipo: 'devolucion',
      producto: 'Queso Panela 400g',
      cantidad: 3,
      motivo: 'Producto próximo a caducar',
      fecha: '08 Ene 2025 11:00',
      repartidor: 'Juan Pérez'
    },
    {
      id: 'MOV-004',
      tipo: 'ajuste',
      producto: 'Yogurt Natural 1kg',
      cantidad: 2,
      motivo: 'Conteo incorrecto',
      fecha: '08 Ene 2025 12:30',
      repartidor: 'Juan Pérez'
    },
    {
      id: 'MOV-005',
      tipo: 'transferencia',
      producto: 'Leche Entera 1L',
      cantidad: 5,
      destino: 'Ruta 08',
      fecha: '08 Ene 2025 13:45',
      repartidor: 'Juan Pérez'
    }
  ]);

  const [showMermaModal, setShowMermaModal] = useState(false);
  const [showAjusteModal, setShowAjusteModal] = useState(false);
  const [showTransferenciaModal, setShowTransferenciaModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const motivosMerma = [
    'Envase dañado',
    'Producto derramado',
    'Caducidad vencida',
    'Temperatura inadecuada',
    'Rechazo por calidad',
    'Otro'
  ];

  const productosConAlerta = productos.filter(p => p.alertaCaducidad);
  const stockTotal = productos.reduce((acc, p) => acc + p.stockActual, 0);
  const mermasTotal = productos.reduce((acc, p) => acc + p.mermas, 0);

  const handleRegistrarMerma = (producto) => {
    setProductoSeleccionado({ ...producto, cantidadMerma: 1, motivoMerma: '', fotoMerma: null, observacionesMerma: '' });
    setShowMermaModal(true);
  };

  const handleConfirmarMerma = () => {
    if (!productoSeleccionado.motivoMerma) {
      alert('Selecciona un motivo de merma');
      return;
    }
    if (!productoSeleccionado.fotoMerma) {
      alert('Captura una foto de evidencia');
      return;
    }

    setProductos(productos.map(p =>
      p.id === productoSeleccionado.id
        ? {
          ...p,
          stockActual: p.stockActual - productoSeleccionado.cantidadMerma,
          mermas: p.mermas + productoSeleccionado.cantidadMerma
        }
        : p
    ));

    setHistorialMovimientos([
      {
        id: `MOV-${Date.now()}`,
        tipo: 'merma',
        producto: productoSeleccionado.nombre,
        cantidad: productoSeleccionado.cantidadMerma,
        motivo: productoSeleccionado.motivoMerma,
        fecha: new Date().toLocaleString('es-MX', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        repartidor: 'Juan Pérez'
      },
      ...historialMovimientos
    ]);

    setShowMermaModal(false);
    setProductoSeleccionado(null);
    alert('Merma registrada exitosamente');
  };

  const handleRegistrarAjuste = (producto) => {
    setProductoSeleccionado({ ...producto, cantidadAjuste: 0, tipoAjuste: 'incremento', motivoAjuste: '', observacionesAjuste: '' });
    setShowAjusteModal(true);
  };

  const handleConfirmarAjuste = () => {
    if (!productoSeleccionado.motivoAjuste) {
      alert('Ingresa un motivo de ajuste');
      return;
    }
    if (productoSeleccionado.cantidadAjuste === 0) {
      alert('Ingresa una cantidad de ajuste');
      return;
    }

    const ajuste = productoSeleccionado.tipoAjuste === 'incremento'
      ? productoSeleccionado.cantidadAjuste
      : -productoSeleccionado.cantidadAjuste;

    setProductos(productos.map(p =>
      p.id === productoSeleccionado.id
        ? { ...p, stockActual: p.stockActual + ajuste }
        : p
    ));

    setHistorialMovimientos([
      {
        id: `MOV-${Date.now()}`,
        tipo: 'ajuste',
        producto: productoSeleccionado.nombre,
        cantidad: Math.abs(ajuste),
        motivo: productoSeleccionado.motivoAjuste,
        fecha: new Date().toLocaleString('es-MX', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        repartidor: 'Juan Pérez'
      },
      ...historialMovimientos
    ]);

    setShowAjusteModal(false);
    setProductoSeleccionado(null);
    alert('Ajuste registrado exitosamente');
  };

  const handleRegistrarTransferencia = (producto) => {
    setProductoSeleccionado({ ...producto, cantidadTransferencia: 1, rutaDestino: '', observacionesTransferencia: '' });
    setShowTransferenciaModal(true);
  };

  const handleConfirmarTransferencia = () => {
    if (!productoSeleccionado.rutaDestino) {
      alert('Selecciona una ruta de destino');
      return;
    }
    if (productoSeleccionado.cantidadTransferencia > productoSeleccionado.stockActual) {
      alert('No hay suficiente stock disponible');
      return;
    }

    setProductos(productos.map(p =>
      p.id === productoSeleccionado.id
        ? { ...p, stockActual: p.stockActual - productoSeleccionado.cantidadTransferencia }
        : p
    ));

    setHistorialMovimientos([
      {
        id: `MOV-${Date.now()}`,
        tipo: 'transferencia',
        producto: productoSeleccionado.nombre,
        cantidad: productoSeleccionado.cantidadTransferencia,
        destino: productoSeleccionado.rutaDestino,
        fecha: new Date().toLocaleString('es-MX', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        repartidor: 'Juan Pérez'
      },
      ...historialMovimientos
    ]);

    setShowTransferenciaModal(false);
    setProductoSeleccionado(null);
    alert('Transferencia registrada exitosamente');
  };

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      backgroundColor: colors.gray50,
      paddingBottom: 20,
      overflow: 'hidden'
    }}>
      <div style={{ padding: 16 }}>
        {/* Header con Métricas */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <div style={{
            flex: 1,
            backgroundColor: 'white',
            padding: '12px 8px',
            borderRadius: 10,
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: 11, color: colors.gray500, marginBottom: 4 }}>Stock Actual</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: colors.primary }}>{stockTotal}</div>
          </div>
          <div style={{
            flex: 1,
            backgroundColor: 'white',
            padding: '12px 8px',
            borderRadius: 10,
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: 11, color: colors.gray500, marginBottom: 4 }}>Alertas</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: colors.danger }}>{productosConAlerta.length}</div>
          </div>
          <div style={{
            flex: 1,
            backgroundColor: 'white',
            padding: '12px 8px',
            borderRadius: 10,
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: 11, color: colors.gray500, marginBottom: 4 }}>Mermas</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: colors.warning }}>{mermasTotal}</div>
          </div>
        </div>

        {/* Tabs de Navegación */}
        <div style={{
          display: 'flex',
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 4,
          marginBottom: 16,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <button
            onClick={() => setTabActiva('inventario')}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: 6,
              border: 'none',
              backgroundColor: tabActiva === 'inventario' ? colors.primary : 'transparent',
              color: tabActiva === 'inventario' ? 'white' : colors.gray600,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6
            }}
          >
            <Package size={16} />
            Inventario
          </button>
          <button
            onClick={() => setTabActiva('alertas')}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: 6,
              border: 'none',
              backgroundColor: tabActiva === 'alertas' ? colors.primary : 'transparent',
              color: tabActiva === 'alertas' ? 'white' : colors.gray600,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6
            }}
          >
            <AlertTriangle size={16} />
            Alertas
            {productosConAlerta.length > 0 && (
              <span style={{
                backgroundColor: colors.danger,
                color: 'white',
                fontSize: 10,
                fontWeight: 700,
                padding: '2px 6px',
                borderRadius: 10
              }}>
                {productosConAlerta.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setTabActiva('historial')}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: 6,
              border: 'none',
              backgroundColor: tabActiva === 'historial' ? colors.primary : 'transparent',
              color: tabActiva === 'historial' ? 'white' : colors.gray600,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6
            }}
          >
            <History size={16} />
            Historial
          </button>
        </div>

        {/* Tab: INVENTARIO */}
        {tabActiva === 'inventario' && (
          <>
            <div style={{ fontSize: 12, fontWeight: 600, color: colors.gray500, marginBottom: 12 }}>
              PRODUCTOS EN RUTA
            </div>
            {productos.map((producto) => (
              <div
                key={producto.id}
                style={{
                  backgroundColor: 'white',
                  padding: 16,
                  borderRadius: 12,
                  marginBottom: 12,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  border: producto.alertaCaducidad ? `2px solid ${colors.danger}` : '1px solid transparent'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: colors.gray800 }}>{producto.nombre}</div>
                    <div style={{ fontSize: 11, color: colors.gray600, marginTop: 2 }}>
                      {producto.codigo} • Lote {producto.lote}
                    </div>
                  </div>
                  {producto.alertaCaducidad && (
                    <div style={{
                      padding: '4px 8px',
                      borderRadius: 4,
                      fontSize: 10,
                      fontWeight: 600,
                      backgroundColor: `${colors.danger}20`,
                      color: colors.danger,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4
                    }}>
                      <AlertTriangle size={12} />
                      {producto.diasParaCaducar}d
                    </div>
                  )}
                </div>

                <div style={{
                  padding: 12,
                  backgroundColor: colors.gray50,
                  borderRadius: 8,
                  marginBottom: 12
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 12 }}>
                    <div>
                      <span style={{ color: colors.gray500 }}>Stock inicial:</span>
                      <span style={{ fontWeight: 600, marginLeft: 4 }}>{producto.stockInicial}</span>
                    </div>
                    <div>
                      <span style={{ color: colors.gray500 }}>Stock actual:</span>
                      <span style={{ fontWeight: 700, marginLeft: 4, color: colors.primary }}>{producto.stockActual}</span>
                    </div>
                    <div>
                      <span style={{ color: colors.gray500 }}>Vendidos:</span>
                      <span style={{ fontWeight: 600, marginLeft: 4, color: colors.success }}>{producto.vendidos}</span>
                    </div>
                    <div>
                      <span style={{ color: colors.gray500 }}>Devueltos:</span>
                      <span style={{ fontWeight: 600, marginLeft: 4, color: colors.warning }}>{producto.devueltos}</span>
                    </div>
                    <div>
                      <span style={{ color: colors.gray500 }}>Mermas:</span>
                      <span style={{ fontWeight: 600, marginLeft: 4, color: colors.danger }}>{producto.mermas}</span>
                    </div>
                    <div>
                      <span style={{ color: colors.gray500 }}>Caducidad:</span>
                      <span style={{ fontWeight: 600, marginLeft: 4 }}>{producto.caducidad}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    onClick={() => handleRegistrarMerma(producto)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: 6,
                      border: 'none',
                      backgroundColor: `${colors.danger}10`,
                      color: colors.danger,
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 4
                    }}
                  >
                    <TrendingDown size={14} />
                    Merma
                  </button>
                  <button
                    onClick={() => handleRegistrarAjuste(producto)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: 6,
                      border: 'none',
                      backgroundColor: `${colors.warning}10`,
                      color: colors.warning,
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 4
                    }}
                  >
                    <TrendingUp size={14} />
                    Ajuste
                  </button>
                  <button
                    onClick={() => handleRegistrarTransferencia(producto)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: 6,
                      border: 'none',
                      backgroundColor: `${colors.primary}10`,
                      color: colors.primary,
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 4
                    }}
                  >
                    <ArrowRightLeft size={14} />
                    Transfer
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Tab: ALERTAS */}
        {tabActiva === 'alertas' && (
          <>
            <div style={{ fontSize: 12, fontWeight: 600, color: colors.gray500, marginBottom: 12 }}>
              PRODUCTOS CON ALERTA
            </div>
            {productosConAlerta.length === 0 ? (
              <div style={{
                backgroundColor: 'white',
                padding: 40,
                borderRadius: 12,
                textAlign: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <AlertTriangle size={48} color={colors.gray300} style={{ marginBottom: 12 }} />
                <div style={{ fontSize: 14, color: colors.gray500 }}>No hay alertas de productos</div>
              </div>
            ) : (
              productosConAlerta.map((producto) => (
                <div
                  key={producto.id}
                  style={{
                    backgroundColor: 'white',
                    padding: 16,
                    borderRadius: 12,
                    marginBottom: 12,
                    border: `2px solid ${colors.danger}`,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'start', gap: 12, marginBottom: 12 }}>
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: 8,
                      backgroundColor: `${colors.danger}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <AlertTriangle size={24} color={colors.danger} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: colors.danger,
                        marginBottom: 4
                      }}>
                        ⚠️ ALERTA DE CADUCIDAD
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{producto.nombre}</div>
                      <div style={{ fontSize: 12, color: colors.gray600 }}>{producto.codigo} • Lote {producto.lote}</div>
                    </div>
                  </div>

                  <div style={{
                    backgroundColor: `${colors.danger}10`,
                    padding: 12,
                    borderRadius: 8,
                    marginBottom: 12
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: colors.gray600 }}>Fecha de caducidad:</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: colors.danger }}>{producto.caducidad}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 12, color: colors.gray600 }}>Días restantes:</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: colors.danger }}>{producto.diasParaCaducar} días</span>
                    </div>
                  </div>

                  <div style={{
                    backgroundColor: colors.gray50,
                    padding: 10,
                    borderRadius: 8,
                    fontSize: 12,
                    marginBottom: 12
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ color: colors.gray600 }}>Stock actual:</span>
                      <span style={{ fontWeight: 600 }}>{producto.stockActual} unidades</span>
                    </div>
                  </div>

                  <div style={{
                    padding: 10,
                    backgroundColor: `${colors.primary}08`,
                    borderRadius: 8,
                    fontSize: 11,
                    color: colors.gray700
                  }}>
                    <div style={{ fontWeight: 600, marginBottom: 4, color: colors.primary }}>💡 Recomendación:</div>
                    Considera priorizar la venta de este producto o coordinar su devolución al centro de distribución.
                  </div>
                </div>
              ))
            )}
          </>
        )}

        {/* Tab: HISTORIAL */}
        {tabActiva === 'historial' && (
          <>
            <div style={{ fontSize: 12, fontWeight: 600, color: colors.gray500, marginBottom: 12 }}>
              MOVIMIENTOS DEL DÍA
            </div>
            {historialMovimientos.map((movimiento, index) => (
              <div
                key={movimiento.id}
                style={{
                  backgroundColor: 'white',
                  padding: 16,
                  borderRadius: 12,
                  marginBottom: 12,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  borderLeft: `4px solid ${movimiento.tipo === 'venta' ? colors.success :
                    movimiento.tipo === 'merma' ? colors.danger :
                      movimiento.tipo === 'devolucion' ? colors.warning :
                        movimiento.tipo === 'ajuste' ? colors.primary :
                          colors.gray400
                    }`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      borderRadius: 4,
                      fontSize: 10,
                      fontWeight: 600,
                      backgroundColor: movimiento.tipo === 'venta' ? `${colors.success}20` :
                        movimiento.tipo === 'merma' ? `${colors.danger}20` :
                          movimiento.tipo === 'devolucion' ? `${colors.warning}20` :
                            movimiento.tipo === 'ajuste' ? `${colors.primary}20` :
                              `${colors.gray400}20`,
                      color: movimiento.tipo === 'venta' ? colors.success :
                        movimiento.tipo === 'merma' ? colors.danger :
                          movimiento.tipo === 'devolucion' ? colors.warning :
                            movimiento.tipo === 'ajuste' ? colors.primary :
                              colors.gray600,
                      marginBottom: 6
                    }}>
                      {movimiento.tipo.toUpperCase()}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{movimiento.producto}</div>
                    <div style={{ fontSize: 12, color: colors.gray600 }}>
                      Cantidad: <span style={{ fontWeight: 600 }}>{movimiento.cantidad} unidades</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: colors.gray500, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={12} />
                    {movimiento.fecha}
                  </div>
                </div>

                {movimiento.cliente && (
                  <div style={{ fontSize: 12, color: colors.gray600, marginTop: 8 }}>
                    Cliente: <span style={{ fontWeight: 600 }}>{movimiento.cliente}</span>
                  </div>
                )}

                {movimiento.motivo && (
                  <div style={{
                    marginTop: 8,
                    padding: 8,
                    backgroundColor: colors.gray50,
                    borderRadius: 6,
                    fontSize: 11,
                    color: colors.gray700
                  }}>
                    <span style={{ fontWeight: 600 }}>Motivo:</span> {movimiento.motivo}
                  </div>
                )}

                {movimiento.destino && (
                  <div style={{
                    marginTop: 8,
                    padding: 8,
                    backgroundColor: `${colors.primary}08`,
                    borderRadius: 6,
                    fontSize: 11,
                    color: colors.gray700
                  }}>
                    <span style={{ fontWeight: 600 }}>Destino:</span> {movimiento.destino}
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {/* Modal de Registro de Merma */}
        {showMermaModal && productoSeleccionado && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: 16,
            overflowY: 'auto'
          }}>
            <div style={{
              position: 'relative',
              backgroundColor: colors.white,
              borderRadius: 12,
              padding: 24,
              width: '100%',
              maxWidth: 400,
              maxHeight: '85vh',
              overflowY: 'auto'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <TrendingDown size={24} color={colors.danger} />
                <h3 style={{ margin: 0, fontSize: 18 }}>Registrar Merma</h3>
              </div>

              <div style={{
                backgroundColor: colors.gray50,
                padding: 12,
                borderRadius: 8,
                marginBottom: 16
              }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{productoSeleccionado.nombre}</div>
                <div style={{ fontSize: 12, color: colors.gray600, marginTop: 2 }}>
                  Stock disponible: <span style={{ fontWeight: 600 }}>{productoSeleccionado.stockActual} unidades</span>
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: colors.gray700, marginBottom: 6 }}>
                  Cantidad de Merma *
                </label>
                <input
                  type="number"
                  value={productoSeleccionado.cantidadMerma}
                  onChange={(e) => setProductoSeleccionado({ ...productoSeleccionado, cantidadMerma: parseInt(e.target.value) || 0 })}
                  min="1"
                  max={productoSeleccionado.stockActual}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: `1px solid ${colors.gray300}`,
                    fontSize: 16,
                    fontWeight: 600
                  }}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: colors.gray700, marginBottom: 6 }}>
                  Motivo de Merma *
                </label>
                <select
                  value={productoSeleccionado.motivoMerma}
                  onChange={(e) => setProductoSeleccionado({ ...productoSeleccionado, motivoMerma: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: `1px solid ${colors.gray300}`,
                    fontSize: 13
                  }}
                >
                  <option value="">Selecciona un motivo</option>
                  {motivosMerma.map((motivo) => (
                    <option key={motivo} value={motivo}>{motivo}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: colors.gray700, marginBottom: 6 }}>
                  Foto de Evidencia *
                </label>
                <button
                  onClick={() => setProductoSeleccionado({ ...productoSeleccionado, fotoMerma: `foto_merma_${Date.now()}.jpg` })}
                  style={{
                    width: '100%',
                    padding: productoSeleccionado.fotoMerma ? '16px' : '40px 20px',
                    borderRadius: 12,
                    border: productoSeleccionado.fotoMerma ? `2px solid ${colors.success}` : `2px dashed ${colors.gray300}`,
                    backgroundColor: productoSeleccionado.fotoMerma ? `${colors.success}08` : colors.gray50,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8
                  }}
                >
                  <Camera size={productoSeleccionado.fotoMerma ? 24 : 32} color={productoSeleccionado.fotoMerma ? colors.success : colors.gray400} />
                  <span style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: productoSeleccionado.fotoMerma ? colors.success : colors.gray600
                  }}>
                    {productoSeleccionado.fotoMerma ? '✓ Foto Capturada' : 'Capturar Foto'}
                  </span>
                </button>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: colors.gray700, marginBottom: 6 }}>
                  Observaciones (opcional)
                </label>
                <textarea
                  value={productoSeleccionado.observacionesMerma}
                  onChange={(e) => setProductoSeleccionado({ ...productoSeleccionado, observacionesMerma: e.target.value })}
                  placeholder="Agrega detalles adicionales..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: `1px solid ${colors.gray300}`,
                    fontSize: 13,
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={handleConfirmarMerma}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    borderRadius: 8,
                    border: 'none',
                    backgroundColor: colors.danger,
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Confirmar Merma
                </button>
                <button
                  onClick={() => {
                    setShowMermaModal(false);
                    setProductoSeleccionado(null);
                  }}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    borderRadius: 8,
                    border: `1px solid ${colors.gray300}`,
                    backgroundColor: 'white',
                    color: colors.gray700,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Ajuste de Inventario */}
        {showAjusteModal && productoSeleccionado && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: 16,
            overflowY: 'auto'
          }}>
            <div style={{
              position: 'relative',
              backgroundColor: colors.white,
              borderRadius: 12,
              padding: 24,
              width: '100%',
              maxWidth: 400,
              maxHeight: '85vh',
              overflowY: 'auto'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <TrendingUp size={24} color={colors.warning} />
                <h3 style={{ margin: 0, fontSize: 18 }}>Ajuste de Inventario</h3>
              </div>

              <div style={{
                backgroundColor: colors.gray50,
                padding: 12,
                borderRadius: 8,
                marginBottom: 16
              }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{productoSeleccionado.nombre}</div>
                <div style={{ fontSize: 12, color: colors.gray600, marginTop: 2 }}>
                  Stock actual: <span style={{ fontWeight: 600 }}>{productoSeleccionado.stockActual} unidades</span>
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: colors.gray700, marginBottom: 6 }}>
                  Tipo de Ajuste *
                </label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => setProductoSeleccionado({ ...productoSeleccionado, tipoAjuste: 'incremento' })}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: 8,
                      border: `2px solid ${productoSeleccionado.tipoAjuste === 'incremento' ? colors.success : colors.gray300}`,
                      backgroundColor: productoSeleccionado.tipoAjuste === 'incremento' ? `${colors.success}10` : 'white',
                      color: productoSeleccionado.tipoAjuste === 'incremento' ? colors.success : colors.gray600,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    + Incremento
                  </button>
                  <button
                    onClick={() => setProductoSeleccionado({ ...productoSeleccionado, tipoAjuste: 'decremento' })}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: 8,
                      border: `2px solid ${productoSeleccionado.tipoAjuste === 'decremento' ? colors.danger : colors.gray300}`,
                      backgroundColor: productoSeleccionado.tipoAjuste === 'decremento' ? `${colors.danger}10` : 'white',
                      color: productoSeleccionado.tipoAjuste === 'decremento' ? colors.danger : colors.gray600,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    - Decremento
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: colors.gray700, marginBottom: 6 }}>
                  Cantidad *
                </label>
                <input
                  type="number"
                  value={productoSeleccionado.cantidadAjuste}
                  onChange={(e) => setProductoSeleccionado({ ...productoSeleccionado, cantidadAjuste: parseInt(e.target.value) || 0 })}
                  min="1"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: `1px solid ${colors.gray300}`,
                    fontSize: 16,
                    fontWeight: 600
                  }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: colors.gray700, marginBottom: 6 }}>
                  Motivo del Ajuste *
                </label>
                <textarea
                  value={productoSeleccionado.motivoAjuste}
                  onChange={(e) => setProductoSeleccionado({ ...productoSeleccionado, motivoAjuste: e.target.value })}
                  placeholder="Ej: Conteo incorrecto, producto encontrado..."
                  rows={2}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: `1px solid ${colors.gray300}`,
                    fontSize: 13,
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={handleConfirmarAjuste}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    borderRadius: 8,
                    border: 'none',
                    backgroundColor: colors.warning,
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Confirmar Ajuste
                </button>
                <button
                  onClick={() => {
                    setShowAjusteModal(false);
                    setProductoSeleccionado(null);
                  }}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    borderRadius: 8,
                    border: `1px solid ${colors.gray300}`,
                    backgroundColor: 'white',
                    color: colors.gray700,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Transferencia */}
        {showTransferenciaModal && productoSeleccionado && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: 16,
            overflowY: 'auto'
          }}>
            <div style={{
              position: 'relative',
              backgroundColor: colors.white,
              borderRadius: 12,
              padding: 24,
              width: '100%',
              maxWidth: 400,
              maxHeight: '85vh',
              overflowY: 'auto'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <ArrowRightLeft size={24} color={colors.primary} />
                <h3 style={{ margin: 0, fontSize: 18 }}>Transferir a Otra Ruta</h3>
              </div>

              <div style={{
                backgroundColor: colors.gray50,
                padding: 12,
                borderRadius: 8,
                marginBottom: 16
              }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{productoSeleccionado.nombre}</div>
                <div style={{ fontSize: 12, color: colors.gray600, marginTop: 2 }}>
                  Stock disponible: <span style={{ fontWeight: 600 }}>{productoSeleccionado.stockActual} unidades</span>
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: colors.gray700, marginBottom: 6 }}>
                  Ruta de Destino *
                </label>
                <select
                  value={productoSeleccionado.rutaDestino}
                  onChange={(e) => setProductoSeleccionado({ ...productoSeleccionado, rutaDestino: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: `1px solid ${colors.gray300}`,
                    fontSize: 13
                  }}
                >
                  <option value="">Selecciona una ruta</option>
                  <option value="Ruta 08">Ruta 08 - Carlos López</option>
                  <option value="Ruta 09">Ruta 09 - María García</option>
                  <option value="Ruta 10">Ruta 10 - Pedro Martínez</option>
                  <option value="Centro de Distribución">Centro de Distribución</option>
                </select>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: colors.gray700, marginBottom: 6 }}>
                  Cantidad a Transferir *
                </label>
                <input
                  type="number"
                  value={productoSeleccionado.cantidadTransferencia}
                  onChange={(e) => setProductoSeleccionado({ ...productoSeleccionado, cantidadTransferencia: parseInt(e.target.value) || 0 })}
                  min="1"
                  max={productoSeleccionado.stockActual}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: `1px solid ${colors.gray300}`,
                    fontSize: 16,
                    fontWeight: 600
                  }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: colors.gray700, marginBottom: 6 }}>
                  Observaciones (opcional)
                </label>
                <textarea
                  value={productoSeleccionado.observacionesTransferencia}
                  onChange={(e) => setProductoSeleccionado({ ...productoSeleccionado, observacionesTransferencia: e.target.value })}
                  placeholder="Motivo de la transferencia..."
                  rows={2}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: `1px solid ${colors.gray300}`,
                    fontSize: 13,
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={handleConfirmarTransferencia}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    borderRadius: 8,
                    border: 'none',
                    backgroundColor: colors.primary,
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Confirmar Transferencia
                </button>
                <button
                  onClick={() => {
                    setShowTransferenciaModal(false);
                    setProductoSeleccionado(null);
                  }}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    borderRadius: 8,
                    border: `1px solid ${colors.gray300}`,
                    backgroundColor: 'white',
                    color: colors.gray700,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventarioRuta;
