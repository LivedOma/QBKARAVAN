import React from 'react';
import { ChevronLeft, Wifi } from 'lucide-react';
import { colors } from './colors.js';

// ===================== COMPONENTES MÓVILES =====================
export const MobileFrame = ({ children, title, showBack, onBack, rightAction, statusBar = true }) => (
  <div style={{
    width: 375,
    height: 780,
    backgroundColor: colors.gray50,
    borderRadius: 40,
    border: `12px solid ${colors.gray900}`,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)',
  }}>
    {statusBar && (
      <div style={{
        height: 44,
        backgroundColor: colors.primary,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        color: colors.white,
        fontSize: 12,
        fontWeight: 600,
      }}>
        <span>9:41</span>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <Wifi size={14} />
          <div style={{ width: 24, height: 10, border: `1px solid ${colors.white}`, borderRadius: 2, position: 'relative' }}>
            <div style={{ width: '80%', height: '100%', backgroundColor: colors.success, borderRadius: 1 }} />
          </div>
        </div>
      </div>
    )}
    {title && (
      <div style={{
        height: 56,
        backgroundColor: colors.primary,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: 12,
      }}>
        {showBack && (
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: colors.white, cursor: 'pointer', padding: 4 }}>
            <ChevronLeft size={24} />
          </button>
        )}
        <span style={{ color: colors.white, fontSize: 18, fontWeight: 600, flex: 1 }}>{title}</span>
        {rightAction}
      </div>
    )}
    <div style={{ flex: 1, overflow: 'hidden', paddingBottom: 64, position: 'relative' }}>
      <div style={{ height: '100%', overflow: 'auto' }}>{children}</div>
    </div>
  </div>
);

export const MobileBottomNav = ({ active, onNavigate, items, notificationCount = 0 }) => (
  <div style={{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: colors.white,
    borderTop: `1px solid ${colors.gray200}`,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 8,
    zIndex: 100,
  }}>
    {items.map((item, i) => (
      <button
        key={i}
        onClick={() => !item.disabled && onNavigate(item.id)}
        disabled={item.disabled}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          background: 'none',
          border: 'none',
          cursor: item.disabled ? 'not-allowed' : 'pointer',
          color: item.disabled ? colors.gray300 : (active === item.id ? colors.primary : colors.gray400),
          fontSize: 10,
          fontWeight: 600,
          padding: 8,
          position: 'relative',
          opacity: item.disabled ? 0.4 : 1,
        }}
      >
        <div style={{ position: 'relative' }}>
          {item.icon}
          {item.id === 'notificaciones' && notificationCount > 0 && (
            <div style={{
              position: 'absolute',
              top: -6,
              right: -8,
              backgroundColor: colors.danger,
              color: colors.white,
              fontSize: 9,
              fontWeight: 700,
              borderRadius: 10,
              padding: '2px 5px',
              minWidth: 18,
              height: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `2px solid ${colors.white}`,
            }}>
              {notificationCount > 9 ? '9+' : notificationCount}
            </div>
          )}
        </div>
        <span>{item.label}</span>
      </button>
    ))}
  </div>
);

export const Card = ({ children, style, onClick }) => (
  <div
    onClick={onClick}
    style={{
      backgroundColor: colors.white,
      borderRadius: 12,
      padding: 16,
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      ...style,
    }}
  >
    {children}
  </div>
);

export const Button = ({ children, variant = 'primary', icon, onClick, style, disabled }) => {
  const variants = {
    primary: { bg: colors.primary, color: colors.white, border: colors.primary },
    secondary: { bg: colors.white, color: colors.primary, border: colors.primary },
    success: { bg: colors.success, color: colors.white, border: colors.success },
    warning: { bg: colors.warning, color: colors.white, border: colors.warning },
    danger: { bg: colors.danger, color: colors.white, border: colors.danger },
    accent: { bg: colors.accent, color: colors.white, border: colors.accent },
  };

  const v = variants[variant] || variants.primary;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: v.bg,
        color: v.color,
        border: `2px solid ${v.border}`,
        borderRadius: 8,
        padding: '12px 20px',
        fontSize: 14,
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
    >
      {icon}
      {children}
    </button>
  );
};
