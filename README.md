# SIVR - Sistema Integrado de Venta en Ruta

## 🎯 Arquitectura de 3 Aplicaciones Independientes

Este proyecto está dividido en **3 aplicaciones independientes** que pueden ejecutarse por separado:

### 📱 1. **Preventa Mobile** (Puerto 3001)
Aplicación móvil para vendedores de preventa con:
- Gestión de clientes y rutas
- Toma de pedidos
- Gestión de inventario
- Centro de notificaciones
- Sincronización offline

### 🚚 2. **Reparto Mobile** (Puerto 3002)
Aplicación móvil para repartidores con:
- Carga de vehículo
- Entrega de productos
- Cobranza
- Devoluciones
- Liquidación de ruta

### 💻 3. **Panel Web** (Puerto 3003)
Panel administrativo web con:
- Dashboard de métricas
- Planificación de rutas
- Monitoreo en tiempo real
- Gestión de clientes y productos
- Reportes y análisis

---

## 🚀 Comandos para Ejecutar

### Ejecutar una aplicación específica:

```bash
# Preventa Mobile
npm run dev:preventa

# Reparto Mobile
npm run dev:reparto

# Panel Web
npm run dev:web
```

### Ejecutar todas las aplicaciones simultáneamente:

```bash
npm run dev:all
```

### Ejecutar el sistema unificado original:

```bash
npm run dev
```

---

## 📦 Build para Producción

### Build individual:

```bash
# Preventa
npm run build:preventa

# Reparto
npm run build:reparto

# Panel Web
npm run build:web
```

### Build de todas las aplicaciones:

```bash
npm run build:all
```

Los builds se generarán en:
- `dist/preventa/`
- `dist/reparto/`
- `dist/web/`

---

## 🏗️ Estructura del Proyecto

```
sivr-mockups/
├── src/
│   ├── shared/                  # Código compartido
│   │   ├── colors.js           # Paleta de colores
│   │   ├── MobileComponents.jsx # Componentes móviles
│   │   └── NotificationService.jsx # Servicio de notificaciones
│   ├── preventa/               # App Preventa
│   │   ├── main.jsx           # Entry point
│   │   └── components/        # Componentes específicos
│   ├── reparto/               # App Reparto
│   │   ├── main.jsx          # Entry point
│   │   └── components/       # Componentes específicos
│   └── web/                  # Panel Web
│       ├── main.jsx         # Entry point
│       └── components/      # Componentes específicos
├── preventa.html            # HTML para Preventa
├── reparto.html            # HTML para Reparto
├── web.html               # HTML para Panel Web
├── index.html            # HTML unificado (original)
└── package.json         # Scripts y dependencias
```

---

## 🔧 Instalación

```bash
# Instalar dependencias
npm install

# Instalar concurrently para ejecutar múltiples apps
npm install concurrently --save-dev
```

---

## 🌐 URLs de Acceso

Cuando ejecutes las aplicaciones, estarán disponibles en:

- **Preventa**: http://localhost:3001/preventa.html
- **Reparto**: http://localhost:3002/reparto.html
- **Panel Web**: http://localhost:3003/web.html
- **Unificado**: http://localhost:5173/

---

## ✨ Características

### Compartido entre todas las apps:
- ✅ Sistema de notificaciones con persistencia
- ✅ Paleta de colores consistente
- ✅ Componentes reutilizables
- ✅ Sincronización en tiempo real
- ✅ Diseño responsive

### Preventa Mobile:
- ✅ Centro de notificaciones con búsqueda
- ✅ Panel de estadísticas
- ✅ Gestión de clientes
- ✅ Toma de pedidos
- ✅ Inventario móvil

### Reparto Mobile:
- ✅ Carga de vehículo
- ✅ Navegación de entregas
- ✅ Cobranza integrada
- ✅ Gestión de devoluciones
- ✅ Liquidación de ruta

### Panel Web:
- ✅ Dashboard completo
- ✅ Planificación inteligente
- ✅ Monitoreo GPS
- ✅ Reportes avanzados
- ✅ Gestión administrativa

---

## 🎨 Personalización

Cada aplicación tiene su propio gradiente de fondo:
- **Preventa**: Morado (667eea → 764ba2)
- **Reparto**: Rosa-Rojo (f093fb → f5576c)
- **Panel Web**: Gris claro (#f8fafc)

Puedes modificar los colores en los archivos HTML respectivos.

---

## 🔄 Migración desde el Sistema Unificado

Si necesitas migrar datos o componentes del sistema unificado original (`mockups-sivr.jsx`):

1. Los componentes compartidos ya están extraídos en `src/shared/`
2. El servicio de notificaciones está en `src/shared/NotificationService.jsx`
3. Puedes seguir usando el sistema unificado con `npm run dev`

---

## 📝 Notas de Desarrollo

- **Hot Module Replacement (HMR)**: Activo en modo desarrollo
- **TypeScript**: No configurado aún (puedes agregarlo)
- **Estado global**: Usar Context API o estado local según necesidades
- **API Backend**: Preparado para integración con endpoints REST

---

## 🤝 Contribución

Para agregar nuevos módulos:

1. Crea el componente en la carpeta correspondiente
2. Importa los componentes compartidos desde `src/shared/`
3. Actualiza el `main.jsx` de la aplicación
4. Prueba con el comando `npm run dev:[app]`

---

## 📞 Soporte

Para preguntas o issues:
- Revisa la documentación en `/docs`
- Consulta los comentarios en el código
- Verifica los módulos completados en el README principal

---

**¡Disfruta desarrollando con SIVR! 🚀**
