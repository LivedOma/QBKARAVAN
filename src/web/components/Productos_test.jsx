import React from 'react';
import { colors } from '../../shared/colors.js';
import WebHeader from './WebHeader.jsx';

const Productos = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.gray50 }}>
      <WebHeader 
        title="Productos" 
        subtitle="Gestión de catálogo de productos"
      />
      <div style={{ padding: 32 }}>
        <div style={{
          padding: 40,
          backgroundColor: colors.white,
          borderRadius: 12,
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: 24, marginBottom: 16 }}>Módulo de Productos</h2>
          <p style={{ color: colors.gray600 }}>Componente simplificado de prueba</p>
        </div>
      </div>
    </div>
  );
};

export default Productos;
