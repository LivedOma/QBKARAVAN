import React, { useState } from 'react';
import { Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { colors } from '../../shared/colors.js';
import { Button } from '../../shared/SharedComponents.jsx';

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
    
    console.log('Intentando login con:', formData);

    // Simulación de autenticación
    setTimeout(() => {
      console.log('Comparando:', {
        usuario: formData.usuario,
        password: formData.password,
        usuarioMatch: formData.usuario === 'admin',
        passwordMatch: formData.password === 'admin123'
      });
      
      // TODO: Reemplazar con llamada real a API
      if (formData.usuario === 'admin' && formData.password === 'admin123') {
        console.log('Login exitoso! Guardando en localStorage...');
        
        // Guardar token o sesión
        if (recordarme) {
          localStorage.setItem('sivr_remember', 'true');
        }
        localStorage.setItem('sivr_token', 'demo-token-12345');
        localStorage.setItem('sivr_user', JSON.stringify({
          id: 1,
          nombre: 'Administrador',
          usuario: formData.usuario,
          rol: 'admin'
        }));
        
        console.log('Llamando onLogin...');
        if (onLogin) {
          onLogin();
        } else {
          console.error('onLogin no está definido!');
        }
      } else {
        console.log('Credenciales incorrectas');
        setError('Usuario o contraseña incorrectos');
        setCargando(false);
      }
    }, 1000);
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 8,
    border: `1px solid ${colors.gray300}`,
    fontSize: 14,
    outline: 'none',
    transition: 'all 0.2s ease',
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
        borderRadius: 16,
        padding: 48,
        width: '100%',
        maxWidth: 440,
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        {/* Logo y título */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accentLight} 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: `0 10px 30px ${colors.accent}40`,
          }}>
            <LogIn size={40} color={colors.white} />
          </div>
          <h1 style={{
            fontSize: 28,
            fontWeight: 700,
            color: colors.primary,
            margin: '0 0 8px 0',
          }}>SIVR</h1>
          <p style={{
            fontSize: 14,
            color: colors.textSecondary,
            margin: 0,
          }}>Sistema Integral de Venta en Ruta</p>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: `1px solid ${colors.danger}`,
            borderRadius: 8,
            padding: '12px 16px',
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <AlertCircle size={20} color={colors.danger} />
            <span style={{ fontSize: 14, color: colors.danger }}>{error}</span>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          {/* Campo Usuario */}
          <div style={{ marginBottom: 20 }}>
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
          <div style={{ marginBottom: 20 }}>
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
                  paddingRight: 48,
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
                  padding: 8,
                  display: 'flex',
                  alignItems: 'center',
                  color: colors.gray400,
                }}
              >
                {mostrarPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Recordarme y Olvidé mi contraseña */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 32,
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
                  width: 16,
                  height: 16,
                  cursor: 'pointer',
                  accentColor: colors.accent,
                }}
              />
              Recordarme
            </label>
            <a href="#" style={{
              fontSize: 14,
              color: colors.accent,
              textDecoration: 'none',
              fontWeight: 600,
            }}>
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {/* Botón de Login */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={cargando}
            style={{
              background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accentLight} 100%)`,
              fontSize: 16,
              fontWeight: 700,
              height: 50,
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
          </Button>
        </form>

        {/* Información de ayuda */}
        <div style={{
          marginTop: 32,
          padding: 16,
          backgroundColor: colors.gray50,
          borderRadius: 8,
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: 12,
            color: colors.textSecondary,
            margin: '0 0 8px 0',
          }}>
            ¿Necesitas ayuda para acceder?
          </p>
          <a href="#" style={{
            fontSize: 13,
            color: colors.accent,
            textDecoration: 'none',
            fontWeight: 600,
          }}>
            Contacta al administrador
          </a>
        </div>

        {/* Demo credentials */}
        <div style={{
          marginTop: 20,
          padding: 12,
          backgroundColor: '#fef3c7',
          borderRadius: 8,
          border: `1px solid ${colors.warning}`,
        }}>
          <p style={{
            fontSize: 12,
            color: colors.gray700,
            margin: '0 0 4px 0',
            fontWeight: 600,
          }}>
            🔐 Credenciales de prueba:
          </p>
          <p style={{
            fontSize: 11,
            color: colors.gray600,
            margin: 0,
            fontFamily: 'monospace',
          }}>
            Usuario: <strong>admin</strong> / Contraseña: <strong>admin123</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
