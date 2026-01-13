// ===================== NOTIFICATION SERVICE (OPTIMIZADO) =====================
// Sistema centralizado de notificaciones con persistencia localStorage
// Incluye: auto-limpieza, estadísticas, búsqueda, filtros, y triggers automáticos

const NotificationService = {
  // Configuración
  config: {
    maxNotifications: 50, // Máximo de notificaciones en memoria
    maxAgeDays: 30, // Días antes de auto-eliminar notificaciones antiguas
    persistenceKey: 'sivr_notifications', // Key para localStorage
    soundEnabled: true, // Sonido habilitado por defecto
    vibrationEnabled: true, // Vibración habilitada por defecto
    autoCleanup: true // Auto-limpieza de notificaciones antiguas
  },

  // Estado en memoria
  notifications: [],
  subscribers: [],
  unreadCount: 0,
  stats: {
    total: 0,
    porTipo: { ruta: 0, pedido: 0, producto: 0, mensaje: 0 },
    porPrioridad: { urgente: 0, alta: 0, media: 0, baja: 0 },
    leidas: 0,
    noLeidas: 0
  },

  // Inicializar con notificaciones de ejemplo y cargar desde localStorage
  init() {
    // Intentar cargar desde localStorage
    const saved = this.loadFromStorage();
    
    if (saved && saved.length > 0) {
      this.notifications = saved;
    } else {
      // Si no hay guardadas, usar notificaciones de ejemplo
      this.notifications = [
        {
          id: 1,
          tipo: 'ruta',
          titulo: 'Nueva ruta asignada',
          mensaje: 'Se te ha asignado la ruta "Centro-Norte-05" para hoy',
          timestamp: new Date().toISOString(),
          leida: false,
          prioridad: 'alta',
          origen: 'sistema',
          metadata: { rutaId: 'CN-05', clientesCount: 15 }
        },
        {
          id: 2,
          tipo: 'pedido',
          titulo: 'Pedido modificado',
          mensaje: 'Cliente "Abarrotes La Esquina" cambió cantidades en PED-2026-0145',
          timestamp: new Date(Date.now() - 3600000 * 3.75).toISOString(),
          leida: false,
          prioridad: 'alta',
          origen: 'pedido',
          metadata: { pedidoId: 'PED-2026-0145', clienteId: 'CLI-123' }
        },
        {
          id: 3,
          tipo: 'producto',
          titulo: '¡Productos próximos a caducar!',
          mensaje: '8 productos en tu inventario caducan en menos de 7 días',
          timestamp: new Date(Date.now() - 3600000 * 8).toISOString(),
          leida: false,
          prioridad: 'urgente',
          origen: 'inventario',
          metadata: { productosCount: 8, diasMinimo: 7 }
        },
        {
          id: 4,
          tipo: 'mensaje',
          titulo: 'Mensaje del supervisor',
          mensaje: 'Recuerda actualizar tu inventario antes de iniciar ruta',
          timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
          leida: true,
          prioridad: 'media',
          origen: 'comunicacion',
          metadata: { supervisorId: 'SUP-001' }
        },
      ];
    }
    
    // Auto-limpieza de notificaciones antiguas
    if (this.config.autoCleanup) {
      this.cleanupOldNotifications();
    }
    
    this.updateUnreadCount();
    this.updateStats();
    this.saveToStorage();
  },

  // Guardar en localStorage
  saveToStorage() {
    try {
      localStorage.setItem(this.config.persistenceKey, JSON.stringify(this.notifications));
    } catch (e) {
      console.warn('No se pudo guardar notificaciones en localStorage:', e);
    }
  },

  // Cargar desde localStorage
  loadFromStorage() {
    try {
      const saved = localStorage.getItem(this.config.persistenceKey);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('No se pudo cargar notificaciones desde localStorage:', e);
      return [];
    }
  },

  // Limpiar notificaciones antiguas
  cleanupOldNotifications() {
    const maxAge = this.config.maxAgeDays * 24 * 60 * 60 * 1000; // Convertir días a ms
    const now = Date.now();
    const before = this.notifications.length;
    
    this.notifications = this.notifications.filter(n => {
      const age = now - new Date(n.timestamp).getTime();
      return age < maxAge;
    });
    
    const removed = before - this.notifications.length;
    if (removed > 0) {
      console.log(`Auto-limpieza: eliminadas ${removed} notificaciones antiguas`);
    }
  },

  // Actualizar estadísticas
  updateStats() {
    this.stats.total = this.notifications.length;
    this.stats.leidas = this.notifications.filter(n => n.leida).length;
    this.stats.noLeidas = this.notifications.filter(n => !n.leida).length;
    
    // Por tipo
    this.stats.porTipo = {
      ruta: this.notifications.filter(n => n.tipo === 'ruta').length,
      pedido: this.notifications.filter(n => n.tipo === 'pedido').length,
      producto: this.notifications.filter(n => n.tipo === 'producto').length,
      mensaje: this.notifications.filter(n => n.tipo === 'mensaje').length
    };
    
    // Por prioridad
    this.stats.porPrioridad = {
      urgente: this.notifications.filter(n => n.prioridad === 'urgente').length,
      alta: this.notifications.filter(n => n.prioridad === 'alta').length,
      media: this.notifications.filter(n => n.prioridad === 'media').length,
      baja: this.notifications.filter(n => n.prioridad === 'baja').length
    };
  },

  // Reproducir sonido de notificación
  playNotificationSound() {
    if (!this.config.soundEnabled) return;
    
    try {
      // En un entorno real, se usaría new Audio('/notification.mp3').play()
      // Aquí simulamos con beep del navegador
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      gainNode.gain.value = 0.1;
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
      console.warn('No se pudo reproducir sonido:', e);
    }
  },

  // Vibrar dispositivo
  vibrateDevice() {
    if (!this.config.vibrationEnabled) return;
    
    try {
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]); // Patrón de vibración
      }
    } catch (e) {
      console.warn('No se pudo vibrar dispositivo:', e);
    }
  },

  // Agregar notificación con optimizaciones
  addNotification(notif) {
    const newNotif = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      leida: false,
      prioridad: 'media',
      origen: 'sistema',
      ...notif
    };
    
    this.notifications.unshift(newNotif);
    
    // Limitar a máximo de notificaciones
    if (this.notifications.length > this.config.maxNotifications) {
      this.notifications = this.notifications.slice(0, this.config.maxNotifications);
    }
    
    this.updateUnreadCount();
    this.updateStats();
    this.saveToStorage();
    this.notify();
    
    // Feedback sensorial
    this.playNotificationSound();
    this.vibrateDevice();
    
    return newNotif;
  },

  // Marcar como leída
  markAsRead(id) {
    const notif = this.notifications.find(n => n.id === id);
    if (notif && !notif.leida) {
      notif.leida = true;
      this.updateUnreadCount();
      this.updateStats();
      this.saveToStorage();
      this.notify();
    }
  },

  // Marcar todas como leídas
  markAllAsRead() {
    this.notifications.forEach(n => n.leida = true);
    this.updateUnreadCount();
    this.updateStats();
    this.saveToStorage();
    this.notify();
  },

  // Eliminar notificación
  removeNotification(id) {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.updateUnreadCount();
    this.updateStats();
    this.saveToStorage();
    this.notify();
  },
  
  // Eliminar todas las notificaciones
  clearAll() {
    this.notifications = [];
    this.updateUnreadCount();
    this.updateStats();
    this.saveToStorage();
    this.notify();
  },

  // Obtener conteo de no leídas
  updateUnreadCount() {
    this.unreadCount = this.notifications.filter(n => !n.leida).length;
  },

  // Obtener notificaciones por tipo
  getByType(tipo) {
    return this.notifications.filter(n => n.tipo === tipo);
  },
  
  // Obtener notificaciones por prioridad
  getByPriority(prioridad) {
    return this.notifications.filter(n => n.prioridad === prioridad);
  },
  
  // Buscar notificaciones
  search(query) {
    if (!query || query.trim() === '') return this.notifications;
    
    const q = query.toLowerCase();
    return this.notifications.filter(n => 
      n.titulo.toLowerCase().includes(q) || 
      n.mensaje.toLowerCase().includes(q)
    );
  },
  
  // Filtrar notificaciones (combinado)
  filter({ tipo, prioridad, leida, desde, hasta }) {
    let filtered = [...this.notifications];
    
    if (tipo) {
      filtered = filtered.filter(n => n.tipo === tipo);
    }
    
    if (prioridad) {
      filtered = filtered.filter(n => n.prioridad === prioridad);
    }
    
    if (leida !== undefined) {
      filtered = filtered.filter(n => n.leida === leida);
    }
    
    if (desde) {
      const desdeTime = new Date(desde).getTime();
      filtered = filtered.filter(n => new Date(n.timestamp).getTime() >= desdeTime);
    }
    
    if (hasta) {
      const hastaTime = new Date(hasta).getTime();
      filtered = filtered.filter(n => new Date(n.timestamp).getTime() <= hastaTime);
    }
    
    return filtered;
  },
  
  // Obtener estadísticas
  getStats() {
    return { ...this.stats };
  },
  
  // Configurar opciones
  setConfig(options) {
    this.config = { ...this.config, ...options };
  },

  // Suscribirse a cambios
  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  },

  // Notificar cambios
  notify() {
    this.subscribers.forEach(callback => callback(this.notifications, this.unreadCount));
  },

  // Triggers automáticos
  triggers: {
    // Nueva ruta asignada
    onRutaAsignada(rutaData) {
      NotificationService.addNotification({
        tipo: 'ruta',
        titulo: 'Nueva ruta asignada',
        mensaje: `Se te ha asignado la ruta "${rutaData.nombre}" con ${rutaData.clientes} clientes`,
        prioridad: 'alta',
        origen: 'planificacion',
        metadata: { rutaId: rutaData.id, clientesCount: rutaData.clientes }
      });
    },

    // Cambios en pedido
    onPedidoModificado(pedidoData) {
      NotificationService.addNotification({
        tipo: 'pedido',
        titulo: 'Pedido modificado',
        mensaje: `Cliente "${pedidoData.cliente}" cambió cantidades en ${pedidoData.id}`,
        prioridad: 'alta',
        origen: 'pedido',
        metadata: { pedidoId: pedidoData.id, clienteId: pedidoData.clienteId }
      });
    },

    // Productos por caducar
    onProductosCaducar(productosData) {
      NotificationService.addNotification({
        tipo: 'producto',
        titulo: '¡Productos próximos a caducar!',
        mensaje: `${productosData.count} productos caducan en menos de ${productosData.dias} días`,
        prioridad: 'urgente',
        origen: 'inventario',
        metadata: { productosCount: productosData.count, diasMinimo: productosData.dias }
      });
    },

    // Mensaje de supervisor
    onMensajeSupervisor(mensajeData) {
      NotificationService.addNotification({
        tipo: 'mensaje',
        titulo: 'Mensaje del supervisor',
        mensaje: `${mensajeData.supervisor}: "${mensajeData.mensaje.substring(0, 50)}..."`,
        prioridad: 'alta',
        origen: 'comunicacion',
        metadata: { supervisorId: mensajeData.supervisorId, mensajeId: mensajeData.id }
      });
    }
  }
};

// Inicializar el servicio
NotificationService.init();

export default NotificationService;
