import React, { useState } from 'react';
import { Package, DollarSign, Clock, RotateCcw, Tag, ChevronRight, LogIn, LogOut } from 'lucide-react';
import { colors } from '../../shared/colors.js';

const ResumenCliente = ({ cliente, onNavigate }) => {
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);

  const handleCheckIn = () => {
    const now = new Date();
    setCheckInTime(now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }));
  };

  const handleCheckOut = () => {
    const now = new Date();
    setCheckOutTime(now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }));
  };

  const handleIniciarPedido = () => {
    onNavigate('entrega', cliente);
  };

  const handleIniciarDevolucion = () => {
    onNavigate('devolucion-cliente', cliente);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.gray50,
      paddingBottom: 20
    }}>
      {/* Header del Cliente */}
      <div style={{
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
        padding: 20,
        color: 'white'
      }}>
        <div style={{ fontSize: 12, opacity: 0.9, marginBottom: 4 }}>Cliente</div>
        <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{cliente.cliente}</div>
        <div style={{ fontSize: 13, opacity: 0.9 }}>{cliente.direccion}</div>
        <div style={{ fontSize: 12, opacity: 0.8, marginTop: 4 }}>
          📍 {cliente.distancia}
        </div>
      </div>

      <div style={{ padding: 16 }}>
        {/* Cards de Información */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          marginBottom: 16
        }}>
          {/* Productos a Surtir */}
          <div style={{
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 12,
            boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
            border: `2px solid ${colors.primary}20`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Package size={20} color={colors.primary} />
              <div style={{ fontSize: 11, color: colors.gray600, fontWeight: 600 }}>PRODUCTOS</div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: colors.primary }}>
              {cliente.productos?.length || 0}
            </div>
            <div style={{ fontSize: 11, color: colors.gray500, marginTop: 2 }}>
              A surtir
            </div>
          </div>

          {/* Total a Cobrar */}
          <div style={{
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 12,
            boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
            border: `2px solid ${colors.success}20`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <DollarSign size={20} color={colors.success} />
              <div style={{ fontSize: 11, color: colors.gray600, fontWeight: 600 }}>COBRAR</div>
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: colors.success }}>
              ${cliente.monto?.toFixed(2) || '0.00'}
            </div>
            <div style={{ fontSize: 11, color: colors.gray500, marginTop: 2 }}>
              Total
            </div>
          </div>

          {/* Hora Estimada */}
          <div style={{
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 12,
            boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
            border: `2px solid ${colors.accent}20`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Clock size={20} color={colors.accent} />
              <div style={{ fontSize: 11, color: colors.gray600, fontWeight: 600 }}>HORA EST.</div>
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: colors.accent }}>
              {cliente.horaEstimada || '10:30'}
            </div>
            <div style={{ fontSize: 11, color: colors.gray500, marginTop: 2 }}>
              Entrega
            </div>
          </div>

          {/* Devoluciones */}
          <div style={{
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 12,
            boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
            border: `2px solid ${colors.warning}20`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <RotateCcw size={20} color={colors.warning} />
              <div style={{ fontSize: 11, color: colors.gray600, fontWeight: 600 }}>DEVOLUCIÓN</div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: colors.warning }}>
              {cliente.devoluciones || 0}
            </div>
            <div style={{ fontSize: 11, color: colors.gray500, marginTop: 2 }}>
              Productos
            </div>
          </div>
        </div>

        {/* Notas de Crédito */}
        {cliente.notasCredito && cliente.notasCredito > 0 && (
          <div style={{
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 12,
            boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
            marginBottom: 16,
            border: `2px solid ${colors.success}20`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: colors.success + '20',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Tag size={24} color={colors.success} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: colors.gray800 }}>
                    Notas de Crédito Disponibles
                  </div>
                  <div style={{ fontSize: 11, color: colors.gray500, marginTop: 2 }}>
                    {cliente.cantidadNotasCredito || 2} nota(s) • Cliente puede aplicar
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: colors.success }}>
                  ${cliente.notasCredito.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Botones Check-in/Check-out */}
        <div style={{
          backgroundColor: 'white',
          padding: 16,
          borderRadius: 12,
          boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
          marginBottom: 16
        }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray800, marginBottom: 12 }}>
            Registro de Visita
          </div>
          
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            {!checkInTime ? (
              <button
                onClick={handleCheckIn}
                style={{
                  flex: 1,
                  padding: '14px 16px',
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
                  gap: 8
                }}
              >
                <LogIn size={20} />
                Hacer Check-in
              </button>
            ) : (
              <div style={{
                flex: 1,
                padding: '10px 12px',
                borderRadius: 10,
                backgroundColor: `${colors.success}10`,
                border: `2px solid ${colors.success}`
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  justifyContent: 'center'
                }}>
                  <LogIn size={18} color={colors.success} />
                  <span style={{ fontSize: 14, fontWeight: 600, color: colors.success }}>
                    Check-in: {checkInTime}
                  </span>
                </div>
              </div>
            )}

            {checkInTime && !checkOutTime && (
              <button
                onClick={handleCheckOut}
                style={{
                  flex: 1,
                  padding: '14px 16px',
                  borderRadius: 10,
                  border: `2px solid ${colors.warning}`,
                  backgroundColor: 'white',
                  color: colors.warning,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8
                }}
              >
                <LogOut size={20} />
                Hacer Check-out
              </button>
            )}

            {checkOutTime && (
              <div style={{
                flex: 1,
                padding: '10px 12px',
                borderRadius: 10,
                backgroundColor: `${colors.warning}10`,
                border: `2px solid ${colors.warning}`
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  justifyContent: 'center'
                }}>
                  <LogOut size={18} color={colors.warning} />
                  <span style={{ fontSize: 14, fontWeight: 600, color: colors.warning }}>
                    Check-out: {checkOutTime}
                  </span>
                </div>
              </div>
            )}
          </div>

          {!checkInTime && (
            <div style={{
              padding: 12,
              backgroundColor: colors.blue + '10',
              borderRadius: 8,
              fontSize: 12,
              color: colors.gray700,
              border: `1px solid ${colors.blue}30`
            }}>
              📍 Registra tu llegada con el cliente para habilitar las acciones
            </div>
          )}
        </div>

        {/* Card de Acciones */}
        <div style={{
          backgroundColor: 'white',
          padding: 16,
          borderRadius: 12,
          boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
          marginBottom: 16
        }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray800, marginBottom: 12 }}>
            ¿Qué deseas hacer?
          </div>

          {/* Botón Hacer Pedido */}
          <button
            onClick={handleIniciarPedido}
            disabled={!checkInTime}
            style={{
              width: '100%',
              padding: '16px 20px',
              borderRadius: 12,
              border: 'none',
              backgroundColor: checkInTime ? colors.primary : colors.gray300,
              color: 'white',
              fontSize: 15,
              fontWeight: 600,
              cursor: checkInTime ? 'pointer' : 'not-allowed',
              marginBottom: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: checkInTime ? '0 4px 6px rgba(0,0,0,0.1)' : 'none',
              opacity: checkInTime ? 1 : 0.6
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Package size={22} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 15, fontWeight: 700 }}>Hacer Pedido</div>
                <div style={{ fontSize: 11, opacity: 0.9, marginTop: 2 }}>
                  Entregar {cliente.productos?.length || 0} productos
                </div>
              </div>
            </div>
            <ChevronRight size={20} />
          </button>

          {/* Botón Gestionar Devolución */}
          {cliente.devoluciones > 0 && (
            <button
              onClick={handleIniciarDevolucion}
              disabled={!checkInTime}
              style={{
                width: '100%',
                padding: '16px 20px',
                borderRadius: 12,
                border: `2px solid ${checkInTime ? colors.warning : colors.gray300}`,
                backgroundColor: 'white',
                color: checkInTime ? colors.warning : colors.gray400,
                fontSize: 15,
                fontWeight: 600,
                cursor: checkInTime ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                opacity: checkInTime ? 1 : 0.6
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <RotateCcw size={22} />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>Gestionar Devolución</div>
                  <div style={{ fontSize: 11, opacity: 0.8, marginTop: 2 }}>
                    Recibir {cliente.devoluciones} producto(s)
                  </div>
                </div>
              </div>
              <ChevronRight size={20} />
            </button>
          )}
        </div>

        {/* Información Adicional */}
        <div style={{
          padding: 14,
          backgroundColor: colors.gray100,
          borderRadius: 10,
          border: `1px solid ${colors.gray200}`
        }}>
          <div style={{ fontSize: 12, color: colors.gray600, marginBottom: 6 }}>
            <strong>Nota:</strong> Puedes completar ambas acciones en esta visita.
          </div>
          <div style={{ fontSize: 11, color: colors.gray500 }}>
            • El pedido y la devolución son independientes<br />
            • Regresarás a este resumen después de cada acción
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumenCliente;
