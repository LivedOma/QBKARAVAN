import React, { useState } from 'react';
import { Download, FileText, XCircle, CheckCircle } from 'lucide-react';
import { MobileFrame, Card, Button } from '../../shared/MobileComponents.jsx';
import { colors } from '../../shared/colors.js';

const Badge = ({ children, color = 'success' }) => {
  const colorMap = {
    success: { bg: colors.success, text: colors.white },
    warning: { bg: colors.warning, text: colors.white },
    danger: { bg: colors.danger, text: colors.white },
  };
  const c = colorMap[color] || colorMap.success;
  return (
    <span style={{
      backgroundColor: c.bg,
      color: c.text,
      padding: '4px 10px',
      borderRadius: 12,
      fontSize: 11,
      fontWeight: 600,
    }}>
      {children}
    </span>
  );
};

export const HistorialCompleto = ({ cliente, onBack }) => {
  const [filterPeriod, setFilterPeriod] = useState('all');

  // Datos simulados del historial
  const totalVisits = 48;
  const successfulVisits = 42;
  const totalAmount = 45680;
  const avgTicket = totalAmount / successfulVisits;

  const allVisits = [
    {
      date: '05 Ene 2026',
      duration: 25,
      result: 'Pedido',
      amount: 1250,
      items: 15,
      payment: 'Crédito',
    },
    {
      date: '29 Dic 2025',
      duration: 18,
      result: 'Pedido',
      amount: 980,
      items: 12,
      payment: 'Contado',
    },
    {
      date: '22 Dic 2025',
      duration: 0,
      result: 'No visitado',
      reason: 'Cliente cerrado',
    },
    {
      date: '15 Dic 2025',
      duration: 22,
      result: 'Sin pedido',
      reason: 'No recibe pedido hoy',
    },
    {
      date: '08 Dic 2025',
      duration: 30,
      result: 'Pedido',
      amount: 1450,
      items: 18,
      payment: 'Crédito',
    },
    {
      date: '01 Dic 2025',
      duration: 15,
      result: 'Pedido',
      amount: 820,
      items: 10,
      payment: 'Contado',
    },
    {
      date: '24 Nov 2025',
      duration: 28,
      result: 'Pedido',
      amount: 1380,
      items: 16,
      payment: 'Crédito',
    },
    {
      date: '17 Nov 2025',
      duration: 0,
      result: 'No visitado',
      reason: 'Falta de tiempo',
    },
  ];

  const clientName = cliente?.name || 'Abarrotes Don José';
  const clientCode = cliente?.code || 'CLI-001';

  return (
    <MobileFrame title="Historial Completo" showBack onBack={onBack} statusBar={true}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          {/* Tarjeta del Cliente */}
          <Card style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: colors.primary,
                color: colors.white,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                fontWeight: 700
              }}>
                {clientName.substring(0, 2).toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 600, color: colors.gray800 }}>{clientName}</div>
                <div style={{ fontSize: 12, color: colors.gray500 }}>{clientCode} • Cliente desde 2023</div>
              </div>
            </div>
          </Card>

          {/* Métricas Generales */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <Card style={{ textAlign: 'center', backgroundColor: `${colors.primary}10` }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: colors.primary }}>{totalVisits}</div>
              <div style={{ fontSize: 11, color: colors.gray600, marginTop: 4 }}>Total Visitas</div>
            </Card>
            <Card style={{ textAlign: 'center', backgroundColor: `${colors.success}10` }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: colors.success }}>{successfulVisits}</div>
              <div style={{ fontSize: 11, color: colors.gray600, marginTop: 4 }}>Con Pedido</div>
            </Card>
            <Card style={{ textAlign: 'center', backgroundColor: `${colors.accent}10` }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: colors.accent }}>${totalAmount.toLocaleString()}</div>
              <div style={{ fontSize: 11, color: colors.gray600, marginTop: 4 }}>Venta Total</div>
            </Card>
            <Card style={{ textAlign: 'center', backgroundColor: `${colors.warning}10` }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: colors.warning }}>${Math.round(avgTicket).toLocaleString()}</div>
              <div style={{ fontSize: 11, color: colors.gray600, marginTop: 4 }}>Ticket Promedio</div>
            </Card>
          </div>

          {/* Filtros de Período */}
          <Card style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: colors.gray700, marginBottom: 12 }}>
              Filtrar por período
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: 'Todo' },
                { id: 'month', label: 'Este mes' },
                { id: 'week', label: 'Esta semana' },
                { id: 'custom', label: 'Personalizado' },
              ].map(period => (
                <button
                  key={period.id}
                  onClick={() => setFilterPeriod(period.id)}
                  style={{
                    padding: '6px 16px',
                    borderRadius: 20,
                    border: filterPeriod === period.id ? `2px solid ${colors.primary}` : `1px solid ${colors.gray300}`,
                    backgroundColor: filterPeriod === period.id ? `${colors.primary}10` : colors.white,
                    color: filterPeriod === period.id ? colors.primary : colors.gray600,
                    fontSize: 13,
                    fontWeight: filterPeriod === period.id ? 600 : 400,
                    cursor: 'pointer',
                  }}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </Card>

          {/* Header de Lista */}
          <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray700 }}>
              Últimas {allVisits.length} visitas
            </div>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 12px',
                borderRadius: 8,
                border: `1px solid ${colors.gray300}`,
                backgroundColor: colors.white,
                fontSize: 12,
                color: colors.gray600,
                cursor: 'pointer',
              }}
              onClick={() => alert('Exportar historial a Excel/PDF')}
            >
              <Download size={14} />
              Exportar
            </button>
          </div>

          {/* Lista de Visitas */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {allVisits.map((visit, i) => (
              <Card
                key={i}
                style={{
                  backgroundColor: visit.result === 'Pedido' ? colors.white : `${colors.gray50}`,
                  border: visit.result === 'Pedido' ? `1px solid ${colors.gray200}` : `1px solid ${colors.gray300}`,
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 8
                }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray800 }}>{visit.date}</div>
                    <div style={{ fontSize: 11, color: colors.gray500, marginTop: 2 }}>
                      {visit.duration > 0 ? `${visit.duration} minutos` : 'No visitado'}
                    </div>
                  </div>
                  <Badge
                    color={
                      visit.result === 'Pedido' ? 'success' :
                      visit.result === 'Sin pedido' ? 'warning' : 'danger'
                    }
                  >
                    {visit.result}
                  </Badge>
                </div>

                {visit.result === 'Pedido' ? (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: 8,
                    paddingTop: 8,
                    borderTop: `1px solid ${colors.gray100}`
                  }}>
                    <div>
                      <div style={{ fontSize: 10, color: colors.gray500 }}>Monto</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray800 }}>
                        ${visit.amount.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: colors.gray500 }}>Items</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray800 }}>{visit.items}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: colors.gray500 }}>Pago</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray800 }}>{visit.payment}</div>
                    </div>
                  </div>
                ) : (
                  <div style={{ paddingTop: 8, borderTop: `1px solid ${colors.gray100}` }}>
                    <div style={{ fontSize: 12, color: colors.gray600 }}>
                      <span style={{ fontWeight: 600 }}>Motivo:</span> {visit.reason}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MobileFrame>
  );
};
