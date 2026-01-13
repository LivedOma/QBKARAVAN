import React, { useState } from 'react';
import { Map, Clock, RefreshCw, GripVertical, Filter, MapPin, CheckCircle, Navigation, Eye, Truck, Phone, Play, ChevronUp, ChevronDown, Package } from 'lucide-react';
import { colors } from '../../shared/colors.js';

const RutaDia = ({ onNavigate, onSelectEntrega }) => {
  const [showReordenar, setShowReordenar] = useState(false);
  const [entregas, setEntregas] = useState([
    { id: 1, cliente: 'Abarrotes Don José', direccion: 'Av. Juárez 234', productos: [{id: 1, name: 'Leche'}, {id: 2, name: 'Pan'}], monto: 2535, hora: '09:30', horaEstimada: '09:30', estado: 'pendiente', distancia: '2.3 km', devoluciones: 2, notasCredito: 450.00, cantidadNotasCredito: 1 },
    { id: 2, cliente: 'Minisuper La Esquina', direccion: 'Calle Morelos 156', productos: [{id: 1, name: 'Leche'}, {id: 2, name: 'Pan'}], monto: 4280, hora: '10:15', horaEstimada: '10:15', estado: 'pendiente', distancia: '1.8 km', devoluciones: 0, notasCredito: 0, cantidadNotasCredito: 0 },
    { id: 3, cliente: 'Tienda El Ahorro', direccion: 'Av. Hidalgo 789', productos: [{id: 1, name: 'Leche'}, {id: 2, name: 'Pan'}], monto: 1890, hora: '11:00', horaEstimada: '11:00', estado: 'pendiente', distancia: '3.1 km', devoluciones: 1, notasCredito: 280.00, cantidadNotasCredito: 1 },
    { id: 4, cliente: 'Abarrotes San Miguel', direccion: 'Calle Allende 432', productos: [{id: 1, name: 'Leche'}, {id: 2, name: 'Pan'}], monto: 5670, hora: '11:45', horaEstimada: '11:45', estado: 'pendiente', distancia: '2.7 km', devoluciones: 0, notasCredito: 0, cantidadNotasCredito: 0 },
    { id: 5, cliente: 'Super Los Pinos', direccion: 'Av. Revolución 901', productos: [{id: 1, name: 'Leche'}, {id: 2, name: 'Pan'}], monto: 3420, hora: '12:30', horaEstimada: '12:30', estado: 'pendiente', distancia: '4.2 km', devoluciones: 3, notasCredito: 670.00, cantidadNotasCredito: 2 },
    { id: 6, cliente: 'Tienda Guadalupe', direccion: 'Calle Zaragoza 234', productos: [{id: 1, name: 'Leche'}, {id: 2, name: 'Pan'}], monto: 2180, hora: '13:15', horaEstimada: '13:15', estado: 'pendiente', distancia: '1.5 km', devoluciones: 0, notasCredito: 0, cantidadNotasCredito: 0 },
  ]);

  const totalEntregas = entregas.length;
  const entregasCompletadas = entregas.filter(e => e.estado === 'completada').length;
  const totalProductos = entregas.reduce((sum, e) => sum + (e.productos?.length || 0), 0);
  const totalMonto = entregas.reduce((sum, e) => sum + e.monto, 0);
  const distanciaTotal = entregas.reduce((sum, e) => sum + parseFloat(e.distancia), 0).toFixed(1);
  const progreso = (entregasCompletadas / totalEntregas) * 100;

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newEntregas = [...entregas];
    [newEntregas[index - 1], newEntregas[index]] = [newEntregas[index], newEntregas[index - 1]];
    setEntregas(newEntregas);
  };

  const handleMoveDown = (index) => {
    if (index === entregas.length - 1) return;
    const newEntregas = [...entregas];
    [newEntregas[index], newEntregas[index + 1]] = [newEntregas[index + 1], newEntregas[index]];
    setEntregas(newEntregas);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.gray50,
      paddingBottom: 20
    }}>
      {/* Header con resumen de ruta */}
      <div style={{
        padding: 16,
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
        color: 'white'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>Unidad 07 - NLR-4521</div>
            <div style={{ fontSize: 20, fontWeight: 700, marginTop: 4 }}>Ruta Reparto Norte</div>
          </div>
          <button style={{
            padding: '6px 12px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}>
            <Map size={16} />
            Mapa
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, opacity: 0.8 }}>Entregas</div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{totalEntregas}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, opacity: 0.8 }}>Productos</div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{totalProductos}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, opacity: 0.8 }}>Distancia</div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{distanciaTotal} km</div>
          </div>
          <div>
            <div style={{ fontSize: 11, opacity: 0.8 }}>Monto</div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>${(totalMonto / 1000).toFixed(1)}k</div>
          </div>
        </div>

        <div style={{
          marginTop: 16,
          padding: '8px 12px',
          background: 'rgba(255,255,255,0.15)',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Clock size={16} />
            <span style={{ fontSize: 13 }}>Tiempo estimado: 4h 30min</span>
          </div>
          <div style={{
            padding: '3px 8px',
            backgroundColor: 'rgba(76, 175, 80, 0.9)',
            borderRadius: 4,
            fontSize: 10,
            fontWeight: 600
          }}>
            Optimizada
          </div>
        </div>
      </div>

      {/* Barra de progreso */}
      <div style={{
        padding: '12px 16px',
        background: colors.gray50,
        borderBottom: `1px solid ${colors.gray200}`
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: colors.gray700 }}>
            Progreso del día
          </span>
          <span style={{ fontSize: 12, fontWeight: 600, color: colors.primary }}>
            {entregasCompletadas} de {totalEntregas} completadas
          </span>
        </div>
        <div style={{
          height: 6,
          backgroundColor: colors.gray200,
          borderRadius: 3,
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${progreso}%`,
            backgroundColor: colors.primary,
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Controles */}
      <div style={{
        padding: '12px 16px',
        display: 'flex',
        gap: 8,
        borderBottom: `1px solid ${colors.gray200}`,
        backgroundColor: 'white'
      }}>
        <button style={{
          padding: '8px 12px',
          borderRadius: 8,
          border: `1px solid ${colors.gray300}`,
          backgroundColor: 'white',
          fontSize: 12,
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 4
        }}>
          <RefreshCw size={16} />
          Optimizar
        </button>
        <button
          onClick={() => setShowReordenar(!showReordenar)}
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: `1px solid ${colors.gray300}`,
            backgroundColor: showReordenar ? colors.primary : 'white',
            color: showReordenar ? 'white' : colors.gray700,
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}
        >
          <GripVertical size={16} />
          {showReordenar ? 'Guardar' : 'Reordenar'}
        </button>
        <button style={{
          padding: '8px 12px',
          borderRadius: 8,
          border: `1px solid ${colors.gray300}`,
          backgroundColor: 'white',
          fontSize: 12,
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 4
        }}>
          <Filter size={16} />
          Filtrar
        </button>
      </div>

      {/* Lista de entregas */}
      <div style={{ padding: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: colors.gray500, marginBottom: 12 }}>
          {totalEntregas - entregasCompletadas} ENTREGAS PENDIENTES
        </div>

        {entregas.map((entrega, index) => (
          <div
            key={entrega.id}
            style={{
              backgroundColor: 'white',
              padding: 16,
              borderRadius: 12,
              marginBottom: 12,
              borderLeft: `4px solid ${
                entrega.estado === 'completada' ? colors.success :
                entrega.estado === 'en-proceso' ? colors.warning :
                colors.primary
              }`,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', gap: 12 }}>
              {/* Número de secuencia */}
              <div style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: entrega.estado === 'completada' ? colors.success :
                           entrega.estado === 'en-proceso' ? colors.warning : colors.primary,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 16,
                flexShrink: 0
              }}>
                {index + 1}
              </div>

              {/* Información de la entrega */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>
                      {entrega.cliente}
                    </div>
                    <div style={{ fontSize: 12, color: colors.gray500, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <MapPin size={12} />
                      {entrega.direccion}
                    </div>
                  </div>
                  {entrega.estado === 'completada' && (
                    <CheckCircle size={20} color={colors.success} />
                  )}
                </div>

                {/* Detalles */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 8,
                  marginBottom: 12,
                  padding: '8px 0'
                }}>
                  <div>
                    <div style={{ fontSize: 10, color: colors.gray400 }}>Productos</div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{entrega.productos?.length || 0}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: colors.gray400 }}>Monto</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: colors.success }}>
                      ${entrega.monto.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: colors.gray400 }}>Hora</div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{entrega.hora}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: colors.gray400 }}>Distancia</div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{entrega.distancia}</div>
                  </div>
                </div>

                {/* Acciones */}
                <div style={{ display: 'flex', gap: 6 }}>
                  {showReordenar ? (
                    <>
                      <button
                        onClick={() => handleMoveUp(index)}
                        disabled={index === 0}
                        style={{
                          flex: 1,
                          padding: '6px 8px',
                          borderRadius: 6,
                          border: `1px solid ${colors.gray300}`,
                          backgroundColor: index === 0 ? colors.gray100 : 'white',
                          fontSize: 11,
                          fontWeight: 600,
                          cursor: index === 0 ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 3,
                          opacity: index === 0 ? 0.5 : 1
                        }}
                      >
                        <ChevronUp size={14} />
                        Subir
                      </button>
                      <button
                        onClick={() => handleMoveDown(index)}
                        disabled={index === entregas.length - 1}
                        style={{
                          flex: 1,
                          padding: '6px 8px',
                          borderRadius: 6,
                          border: `1px solid ${colors.gray300}`,
                          backgroundColor: index === entregas.length - 1 ? colors.gray100 : 'white',
                          fontSize: 11,
                          fontWeight: 600,
                          cursor: index === entregas.length - 1 ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 3,
                          opacity: index === entregas.length - 1 ? 0.5 : 1
                        }}
                      >
                        <ChevronDown size={14} />
                        Bajar
                      </button>
                    </>
                  ) : (
                    <>
                      <button style={{
                        flex: 1,
                        padding: '6px 8px',
                        borderRadius: 6,
                        border: `1px solid ${colors.gray300}`,
                        backgroundColor: 'white',
                        fontSize: 11,
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 3
                      }}>
                        <Navigation size={14} />
                        Navegar
                      </button>
                      <button style={{
                        flex: 1,
                        padding: '6px 8px',
                        borderRadius: 6,
                        border: `1px solid ${colors.gray300}`,
                        backgroundColor: 'white',
                        fontSize: 11,
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 3
                      }}>
                        <Eye size={14} />
                        Ver Pedido
                      </button>
                      <button
                        onClick={() => onSelectEntrega(entrega)}
                        style={{
                          flex: 1,
                          padding: '6px 8px',
                          borderRadius: 6,
                          border: 'none',
                          backgroundColor: colors.primary,
                          color: 'white',
                          fontSize: 11,
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 3
                        }}
                      >
                        <Truck size={14} />
                        Iniciar
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Estado vacío */}
        {entregas.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: colors.gray500
          }}>
            <Package size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
              No hay entregas programadas
            </div>
            <div style={{ fontSize: 14 }}>
              Las entregas del día aparecerán aquí
            </div>
          </div>
        )}
      </div>

      {/* Footer con acciones */}
      {entregas.length > 0 && (
        <div style={{
          padding: 16,
          background: 'white',
          borderTop: `1px solid ${colors.gray200}`,
          display: 'flex',
          gap: 8,
          marginTop: 16
        }}>
          <button style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: 10,
            border: `1px solid ${colors.gray300}`,
            backgroundColor: 'white',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6
          }}>
            <Phone size={18} />
            Llamar Siguiente
          </button>
          <button
            onClick={() => onSelectEntrega(entregas[0])}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: 10,
              border: 'none',
              backgroundColor: colors.primary,
              color: 'white',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6
            }}
          >
            <Play size={18} />
            Comenzar Ruta
          </button>
        </div>
      )}
    </div>
  );
};

export default RutaDia;
