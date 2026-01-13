import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { colors } from '../../shared/colors.js';

const StatCard = ({ icon, label, value, trend, color }) => (
  <div style={{
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: `${color}15`,
        color: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {icon}
      </div>
      {trend && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          fontSize: 12,
          fontWeight: 600,
          color: trend > 0 ? colors.success : colors.danger
        }}>
          {trend > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <div>
      <div style={{ fontSize: 12, color: colors.gray500, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 700, color: colors.gray800 }}>{value}</div>
    </div>
  </div>
);

export default StatCard;
