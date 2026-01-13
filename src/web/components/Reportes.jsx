import React, { useState } from 'react';
import { BarChart3, TrendingUp, DollarSign, Package, Users, Truck, Calendar, Download, FileText, PieChart, Activity, Target, Award, ShoppingCart, MapPin } from 'lucide-react';
import { colors } from '../../shared/colors.js';
import { Card, Badge, Button } from '../../shared/SharedComponents.jsx';
import WebHeader from './WebHeader.jsx';

const Reportes = () => {
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState('mes');
  const [reporteSeleccionado, setReporteSeleccionado] = useState('general');

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: colors.gray50
    }}>
      <WebHeader 
        title="Reportes y Análisis"
        subtitle="Visualiza métricas y estadísticas del negocio"
      />

      <div style={{ padding: 24 }}>
        {/* Selectores de período */}
        <Card style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              {['hoy', 'semana', 'mes', 'trimestre', 'año'].map(periodo => (
                <button
                  key={periodo}
                  onClick={() => setPeriodoSeleccionado(periodo)}
                  style={{
                    padding: '10px 20px',
                    border: `1px solid ${periodoSeleccionado === periodo ? colors.primary : colors.gray300}`,
                    backgroundColor: periodoSeleccionado === periodo ? colors.primary : 'white',
                    color: periodoSeleccionado === periodo ? 'white' : colors.gray600,
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    textTransform: 'capitalize'
                  }}
                >
                  {periodo === 'hoy' ? 'Hoy' : periodo === 'semana' ? 'Semana' : 
                   periodo === 'mes' ? 'Mes' : periodo === 'trimestre' ? 'Trimestre' : 'Año'}
                </button>
              ))}
            </div>
            
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="outline" icon={<Calendar size={16} />}>
                Personalizado
              </Button>
              <Button variant="primary" icon={<Download size={16} />}>
                Exportar Reporte
              </Button>
            </div>
          </div>
        </Card>

        {/* KPIs Principales */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: 16, 
          marginBottom: 24 
        }}>
          <KPICard
            icon={<DollarSign size={28} />}
            title="Ventas Totales"
            value="$328,450"
            change="+12.5%"
            positive={true}
            color={colors.success}
          />
          <KPICard
            icon={<ShoppingCart size={28} />}
            title="Pedidos"
            value="1,247"
            change="+8.3%"
            positive={true}
            color={colors.primary}
          />
          <KPICard
            icon={<Users size={28} />}
            title="Clientes Activos"
            value="189"
            change="-2.1%"
            positive={false}
            color={colors.accent}
          />
          <KPICard
            icon={<Package size={28} />}
            title="Productos Vendidos"
            value="8,432"
            change="+15.7%"
            positive={true}
            color={colors.warning}
          />
        </div>

        {/* Selector de tipo de reporte */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24, overflowX: 'auto' }}>
          {[
            { id: 'general', label: 'General', icon: BarChart3 },
            { id: 'ventas', label: 'Ventas', icon: DollarSign },
            { id: 'clientes', label: 'Clientes', icon: Users },
            { id: 'productos', label: 'Productos', icon: Package },
            { id: 'rutas', label: 'Rutas', icon: Truck },
            { id: 'cobranza', label: 'Cobranza', icon: Target }
          ].map(tipo => (
            <button
              key={tipo.id}
              onClick={() => setReporteSeleccionado(tipo.id)}
              style={{
                padding: '12px 24px',
                border: `2px solid ${reporteSeleccionado === tipo.id ? colors.primary : colors.gray300}`,
                backgroundColor: reporteSeleccionado === tipo.id ? colors.primary + '10' : 'white',
                color: reporteSeleccionado === tipo.id ? colors.primary : colors.gray600,
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                whiteSpace: 'nowrap'
              }}
            >
              <tipo.icon size={18} />
              {tipo.label}
            </button>
          ))}
        </div>

        {/* Contenido según tipo de reporte */}
        {reporteSeleccionado === 'general' && <ReporteGeneral periodo={periodoSeleccionado} />}
        {reporteSeleccionado === 'ventas' && <ReporteVentas periodo={periodoSeleccionado} />}
        {reporteSeleccionado === 'clientes' && <ReporteClientes periodo={periodoSeleccionado} />}
        {reporteSeleccionado === 'productos' && <ReporteProductos periodo={periodoSeleccionado} />}
        {reporteSeleccionado === 'rutas' && <ReporteRutas periodo={periodoSeleccionado} />}
        {reporteSeleccionado === 'cobranza' && <ReporteCobranza periodo={periodoSeleccionado} />}
      </div>
    </div>
  );
};

// Componente KPI Card
const KPICard = ({ icon, title, value, change, positive, color }) => (
  <Card style={{ padding: 20 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
      <div style={{
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: color + '20',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {React.cloneElement(icon, { color })}
      </div>
      <div style={{
        padding: '4px 8px',
        borderRadius: 6,
        backgroundColor: positive ? colors.success + '20' : colors.danger + '20',
        color: positive ? colors.success : colors.danger,
        fontSize: 12,
        fontWeight: 600,
        height: 'fit-content',
        display: 'flex',
        alignItems: 'center',
        gap: 4
      }}>
        <TrendingUp size={12} style={{ transform: positive ? 'none' : 'rotate(180deg)' }} />
        {change}
      </div>
    </div>
    <div style={{ fontSize: 13, color: colors.gray500, marginBottom: 4 }}>
      {title}
    </div>
    <div style={{ fontSize: 28, fontWeight: 700, color: colors.gray800 }}>
      {value}
    </div>
  </Card>
);

// Reporte General
const ReporteGeneral = ({ periodo }) => {
  return (
    <div>
      {/* Gráfica de Ventas */}
      <Card style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>
            📈 Tendencia de Ventas
          </h3>
          <Badge color="primary">Último {periodo}</Badge>
        </div>
        
        <div style={{ height: 300, backgroundColor: colors.gray50, borderRadius: 8, padding: 20, position: 'relative' }}>
          {/* Simulación de gráfica de líneas */}
          <svg width="100%" height="100%" viewBox="0 0 800 260">
            {/* Grid lines */}
            {[0, 1, 2, 3, 4, 5].map(i => (
              <line
                key={i}
                x1="0"
                y1={i * 52}
                x2="800"
                y2={i * 52}
                stroke={colors.gray200}
                strokeWidth="1"
              />
            ))}
            
            {/* Línea de ventas */}
            <polyline
              points="0,200 100,180 200,150 300,160 400,120 500,100 600,90 700,70 800,60"
              fill="none"
              stroke={colors.primary}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Área bajo la línea */}
            <polygon
              points="0,200 100,180 200,150 300,160 400,120 500,100 600,90 700,70 800,60 800,260 0,260"
              fill={colors.primary}
              opacity="0.1"
            />
            
            {/* Puntos */}
            {[
              [0, 200], [100, 180], [200, 150], [300, 160], 
              [400, 120], [500, 100], [600, 90], [700, 70], [800, 60]
            ].map((point, i) => (
              <circle
                key={i}
                cx={point[0]}
                cy={point[1]}
                r="5"
                fill={colors.primary}
              />
            ))}
          </svg>
          
          {/* Labels */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 12, color: colors.gray500 }}>
            <span>Lun</span>
            <span>Mar</span>
            <span>Mié</span>
            <span>Jue</span>
            <span>Vie</span>
            <span>Sáb</span>
            <span>Dom</span>
          </div>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginBottom: 24 }}>
        {/* Top Productos */}
        <Card>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
            🏆 Top 5 Productos
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { nombre: 'Refresco Cola 600ml', ventas: 245, monto: 7350, color: colors.primary },
              { nombre: 'Agua Natural 1L', ventas: 320, monto: 4800, color: colors.success },
              { nombre: 'Galletas Choco 300g', ventas: 180, monto: 5400, color: colors.warning },
              { nombre: 'Pan Dulce Tradicional', ventas: 150, monto: 3750, color: colors.accent },
              { nombre: 'Jabón Líquido 500ml', ventas: 95, monto: 3325, color: colors.danger }
            ].map((producto, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{idx + 1}. {producto.nombre}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: colors.primary }}>
                    ${producto.monto.toLocaleString()}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1, height: 8, backgroundColor: colors.gray200, borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{
                      width: `${(producto.ventas / 320) * 100}%`,
                      height: '100%',
                      backgroundColor: producto.color,
                      transition: 'width 0.5s'
                    }} />
                  </div>
                  <span style={{ fontSize: 12, color: colors.gray500, minWidth: 60 }}>
                    {producto.ventas} uds
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Distribución por Zona */}
        <Card>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
            🗺️ Ventas por Zona
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { zona: 'Norte', ventas: 98450, porcentaje: 30, color: colors.primary },
              { zona: 'Sur', ventas: 85320, porcentaje: 26, color: colors.success },
              { zona: 'Centro', ventas: 78650, porcentaje: 24, color: colors.warning },
              { zona: 'Oriente', ventas: 66030, porcentaje: 20, color: colors.accent }
            ].map((zona, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: zona.color
                    }} />
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{zona.zona}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: colors.primary }}>
                      ${(zona.ventas / 1000).toFixed(0)}K
                    </div>
                    <div style={{ fontSize: 11, color: colors.gray500 }}>
                      {zona.porcentaje}%
                    </div>
                  </div>
                </div>
                <div style={{ height: 10, backgroundColor: colors.gray200, borderRadius: 5, overflow: 'hidden' }}>
                  <div style={{
                    width: `${zona.porcentaje}%`,
                    height: '100%',
                    backgroundColor: zona.color,
                    transition: 'width 0.5s'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Resumen de Operaciones */}
      <Card>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
          📊 Resumen de Operaciones
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          <StatItem label="Pedidos Completados" value="1,247" icon="✅" color={colors.success} />
          <StatItem label="Entregas a Tiempo" value="95%" icon="🚚" color={colors.primary} />
          <StatItem label="Tasa de Devolución" value="2.3%" icon="↩️" color={colors.warning} />
          <StatItem label="Satisfacción Cliente" value="4.8/5" icon="⭐" color={colors.accent} />
        </div>
      </Card>
    </div>
  );
};

// Reporte de Ventas
const ReporteVentas = ({ periodo }) => {
  const ventas = [
    { fecha: '2024-01-09', pedidos: 45, monto: 12850, tickets: 285.56 },
    { fecha: '2024-01-08', pedidos: 52, monto: 15420, tickets: 296.54 },
    { fecha: '2024-01-07', pedidos: 38, monto: 10890, tickets: 286.58 },
    { fecha: '2024-01-06', pedidos: 41, monto: 11750, tickets: 286.59 },
    { fecha: '2024-01-05', pedidos: 48, monto: 13940, tickets: 290.42 }
  ];

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        <Card style={{ padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 36, fontWeight: 700, color: colors.primary }}>$64.9K</div>
          <div style={{ fontSize: 13, color: colors.gray500, marginTop: 4 }}>Total Ventas</div>
        </Card>
        <Card style={{ padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 36, fontWeight: 700, color: colors.success }}>224</div>
          <div style={{ fontSize: 13, color: colors.gray500, marginTop: 4 }}>Total Pedidos</div>
        </Card>
        <Card style={{ padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 36, fontWeight: 700, color: colors.warning }}>$289.73</div>
          <div style={{ fontSize: 13, color: colors.gray500, marginTop: 4 }}>Ticket Promedio</div>
        </Card>
      </div>

      <Card>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
          Detalle Diario de Ventas
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${colors.gray200}`, backgroundColor: colors.gray50 }}>
              <th style={{ padding: 12, textAlign: 'left', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Fecha</th>
              <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Pedidos</th>
              <th style={{ padding: 12, textAlign: 'right', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Monto Total</th>
              <th style={{ padding: 12, textAlign: 'right', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Ticket Promedio</th>
              <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Tendencia</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta, idx) => (
              <tr key={idx} style={{ borderBottom: `1px solid ${colors.gray100}` }}>
                <td style={{ padding: 12, fontSize: 14 }}>{venta.fecha}</td>
                <td style={{ padding: 12, textAlign: 'center', fontSize: 14, fontWeight: 600 }}>{venta.pedidos}</td>
                <td style={{ padding: 12, textAlign: 'right', fontSize: 15, fontWeight: 700, color: colors.primary }}>
                  ${venta.monto.toLocaleString()}
                </td>
                <td style={{ padding: 12, textAlign: 'right', fontSize: 14 }}>
                  ${venta.tickets.toFixed(2)}
                </td>
                <td style={{ padding: 12, textAlign: 'center' }}>
                  <TrendingUp size={18} color={colors.success} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

// Reporte de Clientes
const ReporteClientes = ({ periodo }) => {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <Card style={{ padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: colors.primary }}>189</div>
          <div style={{ fontSize: 13, color: colors.gray500, marginTop: 4 }}>Clientes Totales</div>
        </Card>
        <Card style={{ padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: colors.success }}>165</div>
          <div style={{ fontSize: 13, color: colors.gray500, marginTop: 4 }}>Clientes Activos</div>
        </Card>
        <Card style={{ padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: colors.warning }}>12</div>
          <div style={{ fontSize: 13, color: colors.gray500, marginTop: 4 }}>Nuevos este mes</div>
        </Card>
        <Card style={{ padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: colors.accent }}>$1,738</div>
          <div style={{ fontSize: 13, color: colors.gray500, marginTop: 4 }}>Valor Promedio</div>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
        <Card>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
            👥 Top 10 Clientes
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { nombre: 'Abarrotes Don José', compras: 45, monto: 128450 },
              { nombre: 'Mini Super El Sol', compras: 38, monto: 95320 },
              { nombre: 'Tienda La Esquina', compras: 35, monto: 87650 },
              { nombre: 'Comercial Pérez', compras: 32, monto: 78030 },
              { nombre: 'Abarrotes María', compras: 28, monto: 65420 }
            ].map((cliente, idx) => (
              <div key={idx} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: 12,
                backgroundColor: colors.gray50,
                borderRadius: 8
              }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{idx + 1}. {cliente.nombre}</div>
                  <div style={{ fontSize: 12, color: colors.gray500 }}>{cliente.compras} compras</div>
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: colors.primary }}>
                  ${(cliente.monto / 1000).toFixed(1)}K
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
            📊 Segmentación de Clientes
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { categoria: 'Premium (>$5K/mes)', cantidad: 12, porcentaje: 6.3, color: colors.success },
              { categoria: 'Alto Valor ($2-5K/mes)', cantidad: 35, porcentaje: 18.5, color: colors.primary },
              { categoria: 'Medio ($1-2K/mes)', cantidad: 78, porcentaje: 41.3, color: colors.warning },
              { categoria: 'Bajo (<$1K/mes)', cantidad: 64, porcentaje: 33.9, color: colors.gray400 }
            ].map((seg, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{seg.categoria}</span>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{seg.cantidad} clientes</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1, height: 10, backgroundColor: colors.gray200, borderRadius: 5, overflow: 'hidden' }}>
                    <div style={{
                      width: `${seg.porcentaje}%`,
                      height: '100%',
                      backgroundColor: seg.color
                    }} />
                  </div>
                  <span style={{ fontSize: 12, color: colors.gray500, minWidth: 40 }}>{seg.porcentaje}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

// Reporte de Productos
const ReporteProductos = ({ periodo }) => {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <Card style={{ padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: colors.primary }}>8,432</div>
          <div style={{ fontSize: 13, color: colors.gray500, marginTop: 4 }}>Unidades Vendidas</div>
        </Card>
        <Card style={{ padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: colors.success }}>285</div>
          <div style={{ fontSize: 13, color: colors.gray500, marginTop: 4 }}>Productos Activos</div>
        </Card>
        <Card style={{ padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: colors.warning }}>$42.5K</div>
          <div style={{ fontSize: 13, color: colors.gray500, marginTop: 4 }}>Valor Inventario</div>
        </Card>
        <Card style={{ padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: colors.accent }}>68%</div>
          <div style={{ fontSize: 13, color: colors.gray500, marginTop: 4 }}>Margen Promedio</div>
        </Card>
      </div>

      <Card>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
          📦 Análisis por Categoría
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${colors.gray200}`, backgroundColor: colors.gray50 }}>
              <th style={{ padding: 12, textAlign: 'left', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Categoría</th>
              <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Productos</th>
              <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Unidades</th>
              <th style={{ padding: 12, textAlign: 'right', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Ventas</th>
              <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>% del Total</th>
            </tr>
          </thead>
          <tbody>
            {[
              { categoria: 'Bebidas', productos: 85, unidades: 3250, ventas: 45280, porcentaje: 32 },
              { categoria: 'Dulces', productos: 120, unidades: 2180, ventas: 38650, porcentaje: 27 },
              { categoria: 'Abarrotes', productos: 45, unidades: 1850, ventas: 28940, porcentaje: 21 },
              { categoria: 'Limpieza', productos: 35, unidades: 1152, ventas: 18580, porcentaje: 13 }
            ].map((cat, idx) => (
              <tr key={idx} style={{ borderBottom: `1px solid ${colors.gray100}` }}>
                <td style={{ padding: 12, fontSize: 14, fontWeight: 600 }}>{cat.categoria}</td>
                <td style={{ padding: 12, textAlign: 'center', fontSize: 14 }}>{cat.productos}</td>
                <td style={{ padding: 12, textAlign: 'center', fontSize: 14 }}>{cat.unidades.toLocaleString()}</td>
                <td style={{ padding: 12, textAlign: 'right', fontSize: 15, fontWeight: 700, color: colors.primary }}>
                  ${cat.ventas.toLocaleString()}
                </td>
                <td style={{ padding: 12, textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                    <div style={{ width: 60, height: 6, backgroundColor: colors.gray200, borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ width: `${cat.porcentaje}%`, height: '100%', backgroundColor: colors.primary }} />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{cat.porcentaje}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

// Reporte de Rutas
const ReporteRutas = ({ periodo }) => {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <Card style={{ padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: colors.primary }}>48</div>
          <div style={{ fontSize: 13, color: colors.gray500, marginTop: 4 }}>Rutas Completadas</div>
        </Card>
        <Card style={{ padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: colors.success }}>95%</div>
          <div style={{ fontSize: 13, color: colors.gray500, marginTop: 4 }}>Eficiencia</div>
        </Card>
        <Card style={{ padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: colors.warning }}>1,245</div>
          <div style={{ fontSize: 13, color: colors.gray500, marginTop: 4 }}>Entregas Totales</div>
        </Card>
        <Card style={{ padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: colors.accent }}>2.8km</div>
          <div style={{ fontSize: 13, color: colors.gray500, marginTop: 4 }}>Distancia Promedio</div>
        </Card>
      </div>

      <Card>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
          🚚 Desempeño por Ruta
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${colors.gray200}`, backgroundColor: colors.gray50 }}>
              <th style={{ padding: 12, textAlign: 'left', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Ruta</th>
              <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Entregas</th>
              <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Completadas</th>
              <th style={{ padding: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Eficiencia</th>
              <th style={{ padding: 12, textAlign: 'right', fontSize: 13, fontWeight: 600, color: colors.gray600 }}>Monto</th>
            </tr>
          </thead>
          <tbody>
            {[
              { ruta: 'Ruta Norte-01', entregas: 28, completadas: 27, eficiencia: 96.4, monto: 15280 },
              { ruta: 'Ruta Sur-02', entregas: 32, completadas: 30, eficiencia: 93.8, monto: 18450 },
              { ruta: 'Ruta Centro-03', entregas: 25, completadas: 25, eficiencia: 100, monto: 12890 },
              { ruta: 'Ruta Oriente-01', entregas: 22, completadas: 21, eficiencia: 95.5, monto: 11230 }
            ].map((ruta, idx) => (
              <tr key={idx} style={{ borderBottom: `1px solid ${colors.gray100}` }}>
                <td style={{ padding: 12, fontSize: 14, fontWeight: 600 }}>{ruta.ruta}</td>
                <td style={{ padding: 12, textAlign: 'center', fontSize: 14 }}>{ruta.entregas}</td>
                <td style={{ padding: 12, textAlign: 'center', fontSize: 14 }}>{ruta.completadas}</td>
                <td style={{ padding: 12, textAlign: 'center' }}>
                  <Badge color={ruta.eficiencia >= 95 ? 'success' : 'warning'}>
                    {ruta.eficiencia}%
                  </Badge>
                </td>
                <td style={{ padding: 12, textAlign: 'right', fontSize: 15, fontWeight: 700, color: colors.primary }}>
                  ${ruta.monto.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

// Reporte de Cobranza
const ReporteCobranza = ({ periodo }) => {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <Card style={{ padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: colors.warning }}>$23.1K</div>
          <div style={{ fontSize: 13, color: colors.gray500, marginTop: 4 }}>Por Cobrar</div>
        </Card>
        <Card style={{ padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: colors.danger }}>$10.4K</div>
          <div style={{ fontSize: 13, color: colors.gray500, marginTop: 4 }}>Vencido</div>
        </Card>
        <Card style={{ padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: colors.success }}>$4.8K</div>
          <div style={{ fontSize: 13, color: colors.gray500, marginTop: 4 }}>Cobrado Hoy</div>
        </Card>
        <Card style={{ padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: colors.primary }}>15</div>
          <div style={{ fontSize: 13, color: colors.gray500, marginTop: 4 }}>Días Promedio</div>
        </Card>
      </div>

      <Card>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
          💰 Antigüedad de Saldos
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { rango: 'Corriente', monto: 8420, porcentaje: 36.4, color: colors.success },
            { rango: '1-30 días', monto: 6550, porcentaje: 28.4, color: colors.warning },
            { rango: '31-60 días', monto: 4150, porcentaje: 18.0, color: colors.danger },
            { rango: '61-90 días', monto: 2890, porcentaje: 12.5, color: colors.danger },
            { rango: '>90 días', monto: 1090, porcentaje: 4.7, color: colors.danger }
          ].map((item, idx) => (
            <div key={idx}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{item.rango}</span>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: colors.primary }}>
                    ${item.monto.toLocaleString()}
                  </div>
                  <div style={{ fontSize: 11, color: colors.gray500 }}>{item.porcentaje}%</div>
                </div>
              </div>
              <div style={{ height: 12, backgroundColor: colors.gray200, borderRadius: 6, overflow: 'hidden' }}>
                <div style={{
                  width: `${item.porcentaje}%`,
                  height: '100%',
                  backgroundColor: item.color
                }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// Componente auxiliar StatItem
const StatItem = ({ label, value, icon, color }) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{ fontSize: 32, marginBottom: 8 }}>{icon}</div>
    <div style={{ fontSize: 24, fontWeight: 700, color, marginBottom: 4 }}>{value}</div>
    <div style={{ fontSize: 12, color: colors.gray500 }}>{label}</div>
  </div>
);

export default Reportes;
