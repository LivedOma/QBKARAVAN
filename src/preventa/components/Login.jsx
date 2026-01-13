import React, { useState } from 'react';
import { Eye, EyeOff, LogIn, AlertCircle, Truck } from 'lucide-react';
import { colors } from '../../shared/colors.js';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    usuario: '',
    password: ''
  });
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [recordarme, setRecordarme] = useState(false);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (!formData.usuario.trim()) {
      setError('Por favor ingresa tu usuario');
      return;
    }
    if (!formData.password) {
      setError('Por favor ingresa tu contraseña');
      return;
    }

    setCargando(true);
    
    console.log('Preventa - Intentando login con:', formData);

    // Simulación de autenticación
    setTimeout(() => {
      console.log('Preventa - Comparando credenciales');
      
      // Credenciales para preventistas
      const validUsers = {
        'preventista': { password: 'prev123', nombre: 'Juan Pérez', rol: 'Preventista' },
        'vendedor': { password: 'vend123', nombre: 'María García', rol: 'Vendedor' },
        'admin': { password: 'admin123', nombre: 'Administrador', rol: 'Supervisor' }
      };

      const user = validUsers[formData.usuario];
      
      if (user && formData.password === user.password) {
        console.log('Preventa - Login exitoso!');
        
        // Guardar token o sesión
        if (recordarme) {
          localStorage.setItem('sivr_preventa_remember', 'true');
        }
        localStorage.setItem('sivr_preventa_token', `preventa-token-${Date.now()}`);
        localStorage.setItem('sivr_preventa_user', JSON.stringify({
          id: Math.floor(Math.random() * 1000),
          nombre: user.nombre,
          usuario: formData.usuario,
          rol: user.rol
        }));
        
        console.log('Preventa - Llamando onLogin...');
        if (onLogin) {
          onLogin();
        } else {
          console.error('Preventa - onLogin no está definido!');
        }
      } else {
        console.log('Preventa - Credenciales incorrectas');
        setError('Usuario o contraseña incorrectos');
        setCargando(false);
      }
    }, 1000);
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: 12,
    border: `2px solid ${colors.gray300}`,
    fontSize: 16,
    outline: 'none',
    transition: 'all 0.2s ease',
    backgroundColor: colors.white,
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
      padding: 20,
    }}>
      <div style={{
        backgroundColor: colors.white,
        borderRadius: 24,
        padding: '32px 24px',
        width: '100%',
        maxWidth: 400,
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        {/* Logo y título */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 70,
            height: 70,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accentLight} 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: `0 10px 30px ${colors.accent}40`,
          }}>
            <Truck size={36} color={colors.white} />
          </div>
          <h1 style={{
            fontSize: 26,
            fontWeight: 700,
            color: colors.primary,
            margin: '0 0 6px 0',
          }}>Preventa SIVR</h1>
          <p style={{
            fontSize: 13,
            color: colors.textSecondary,
            margin: 0,
          }}>App para Preventistas</p>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: `2px solid ${colors.danger}`,
            borderRadius: 12,
            padding: '12px 14px',
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <AlertCircle size={20} color={colors.danger} />
            <span style={{ fontSize: 13, color: colors.danger, fontWeight: 500 }}>{error}</span>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          {/* Campo Usuario */}
          <div style={{ marginBottom: 18 }}>
            <label style={{
              display: 'block',
              fontSize: 14,
              fontWeight: 600,
              color: colors.gray700,
              marginBottom: 8,
            }}>Usuario</label>
            <input
              type="text"
              placeholder="Ingresa tu usuario"
              value={formData.usuario}
              onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
              style={{
                ...inputStyle,
                borderColor: error && !formData.usuario ? colors.danger : colors.gray300,
              }}
              onFocus={(e) => e.target.style.borderColor = colors.accent}
              onBlur={(e) => e.target.style.borderColor = colors.gray300}
            />
          </div>

          {/* Campo Password */}
          <div style={{ marginBottom: 18 }}>
            <label style={{
              display: 'block',
              fontSize: 14,
              fontWeight: 600,
              color: colors.gray700,
              marginBottom: 8,
            }}>Contraseña</label>
            <div style={{ position: 'relative' }}>
              <input
                type={mostrarPassword ? 'text' : 'password'}
                placeholder="Ingresa tu contraseña"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                style={{
                  ...inputStyle,
                  paddingRight: 50,
                  borderColor: error && !formData.password ? colors.danger : colors.gray300,
                }}
                onFocus={(e) => e.target.style.borderColor = colors.accent}
                onBlur={(e) => e.target.style.borderColor = colors.gray300}
              />
              <button
                type="button"
                onClick={() => setMostrarPassword(!mostrarPassword)}
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 10,
                  display: 'flex',
                  alignItems: 'center',
                  color: colors.gray400,
                }}
              >
                {mostrarPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>
          </div>

          {/* Recordarme */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
              fontSize: 14,
              color: colors.gray700,
            }}>
              <input
                type="checkbox"
                checked={recordarme}
                onChange={(e) => setRecordarme(e.target.checked)}
                style={{
                  width: 18,
                  height: 18,
                  cursor: 'pointer',
                  accentColor: colors.accent,
                }}
              />
              Recordarme
            </label>
          </div>

          {/* Botón de Login */}
          <button
            type="submit"
            disabled={cargando}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: 12,
              border: 'none',
              background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accentLight} 100%)`,
              color: colors.white,
              fontSize: 16,
              fontWeight: 700,
              cursor: cargando ? 'not-allowed' : 'pointer',
              opacity: cargando ? 0.7 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              boxShadow: `0 4px 12px ${colors.accent}40`,
              transition: 'all 0.2s ease',
            }}
          >
            {cargando ? (
              <span>Iniciando sesión...</span>
            ) : (
              <>
                <LogIn size={20} />
                <span>Iniciar Sesión</span>
              </>
            )}
          </button>
        </form>

        {/* Información de ayuda */}
        <div style={{
          marginTop: 24,
          padding: 14,
          backgroundColor: colors.gray50,
          borderRadius: 12,
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: 12,
            color: colors.textSecondary,
            margin: '0 0 6px 0',
          }}>
            ¿Problemas para acceder?
          </p>
          <a href="#" style={{
            fontSize: 13,
            color: colors.accent,
            textDecoration: 'none',
            fontWeight: 600,
          }}>
            Contacta a tu supervisor
          </a>
        </div>

        {/* Demo credentials */}
        <div style={{
          marginTop: 16,
          padding: 12,
          backgroundColor: '#fef3c7',
          borderRadius: 12,
          border: `2px solid ${colors.warning}`,
        }}>
          <p style={{
            fontSize: 11,
            color: colors.gray700,
            margin: '0 0 6px 0',
            fontWeight: 600,
          }}>
            🔐 Credenciales de prueba:
          </p>
          <div style={{
            fontSize: 10,
            color: colors.gray600,
            fontFamily: 'monospace',
            lineHeight: 1.6,
          }}>
            <div><strong>preventista</strong> / prev123</div>
            <div><strong>vendedor</strong> / vend123</div>
            <div><strong>admin</strong> / admin123</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
