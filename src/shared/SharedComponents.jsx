import React from 'react';
import { colors } from './colors.js';

// ===================== COMPONENTES COMPARTIDOS =====================

export const Card = ({ children, style, onClick }) => (
  <div onClick={onClick} style={{
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    cursor: onClick ? 'pointer' : 'default',
    ...style,
  }}>{children}</div>
);

export const Badge = ({ children, color = 'primary', size = 'sm' }) => {
  const colorMap = {
    primary: { bg: colors.primaryLight, text: colors.white },
    success: { bg: colors.success, text: colors.white },
    warning: { bg: colors.warning, text: colors.white },
    danger: { bg: colors.danger, text: colors.white },
    gray: { bg: colors.gray200, text: colors.gray700 },
    accent: { bg: colors.accent, text: colors.white },
  };
  const c = colorMap[color];
  return (
    <span style={{
      backgroundColor: c.bg,
      color: c.text,
      padding: size === 'sm' ? '2px 8px' : '4px 12px',
      borderRadius: 12,
      fontSize: size === 'sm' ? 10 : 12,
      fontWeight: 600,
      display: 'inline-block',
    }}>{children}</span>
  );
};

export const Button = ({ children, variant = 'primary', size = 'md', icon, fullWidth, onClick, disabled, style }) => {
  const variants = {
    primary: { bg: colors.primary, text: colors.white, border: 'none' },
    secondary: { bg: colors.gray200, text: colors.gray700, border: 'none' },
    outline: { bg: 'transparent', text: colors.primary, border: `1px solid ${colors.primary}` },
    danger: { bg: colors.danger, text: colors.white, border: 'none' },
    success: { bg: colors.success, text: colors.white, border: 'none' },
  };
  
  const sizes = {
    sm: { padding: '8px 12px', fontSize: 12 },
    md: { padding: '10px 16px', fontSize: 14 },
    lg: { padding: '14px 20px', fontSize: 16 },
  };
  
  const v = variants[variant];
  const s = sizes[size];
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: v.bg,
        color: v.text,
        border: v.border,
        ...s,
        borderRadius: 8,
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        width: fullWidth ? '100%' : 'auto',
        transition: 'all 0.2s ease',
        ...style,
      }}
    >
      {icon}
      {children}
    </button>
  );
};

export const ProgressBar = ({ value, max, color = colors.success }) => (
  <div style={{
    width: '100%',
    height: 8,
    backgroundColor: colors.gray200,
    borderRadius: 4,
    overflow: 'hidden',
  }}>
    <div style={{
      width: `${(value / max) * 100}%`,
      height: '100%',
      backgroundColor: color,
      transition: 'width 0.3s ease',
    }} />
  </div>
);

export const CircularBadge = ({ number, color = colors.accent, size = 48 }) => (
  <div style={{
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.white,
    fontWeight: 700,
    fontSize: size / 2.67,
  }}>
    {number}
  </div>
);

export const GradientHeader = ({ children, style }) => (
  <div style={{
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
    padding: 16,
    color: colors.white,
    ...style,
  }}>
    {children}
  </div>
);
