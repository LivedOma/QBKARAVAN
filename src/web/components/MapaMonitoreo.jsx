import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { colors } from '../../shared/colors.js';

// Fix para los iconos de Leaflet en entornos de bundling
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Iconos personalizados para diferentes estados
const createCustomIcon = (color, status) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
      ">
        ${status === 'En ruta' ? '🚗' : status === 'Detenido' ? '⏸️' : status === 'Entrega' ? '📦' : '🏁'}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

const MapaMonitoreo = ({ vendedores = [], center = [19.4326, -99.1332], zoom = 12 }) => {
  useEffect(() => {
    // Cleanup cuando se desmonta el componente
    return () => {
      // Limpieza si es necesaria
    };
  }, []);

  const getColorPorEstado = (estado) => {
    switch (estado) {
      case 'En ruta': return colors.success;
      case 'Detenido': return colors.warning;
      case 'Entrega': return colors.primary;
      case 'Offline': return colors.gray400;
      default: return colors.gray400;
    }
  };

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ 
        height: '100%', 
        width: '100%', 
        borderRadius: '8px',
        zIndex: 0
      }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {vendedores.map((vendedor) => {
        if (!vendedor.ubicacion || !vendedor.ubicacion.lat || !vendedor.ubicacion.lng) {
          return null;
        }

        const color = getColorPorEstado(vendedor.estado);
        
        return (
          <React.Fragment key={vendedor.id}>
            {/* Marcador del vendedor */}
            <Marker
              position={[vendedor.ubicacion.lat, vendedor.ubicacion.lng]}
              icon={createCustomIcon(color, vendedor.estado)}
            >
              <Popup>
                <div style={{ minWidth: 200 }}>
                  <div style={{ 
                    fontWeight: 600, 
                    fontSize: 14, 
                    marginBottom: 8,
                    color: colors.gray900
                  }}>
                    {vendedor.nombre}
                  </div>
                  <div style={{ fontSize: 12, color: colors.gray600, marginBottom: 4 }}>
                    <strong>Estado:</strong> <span style={{ color }}>{vendedor.estado}</span>
                  </div>
                  <div style={{ fontSize: 12, color: colors.gray600, marginBottom: 4 }}>
                    <strong>Ruta:</strong> {vendedor.ruta}
                  </div>
                  <div style={{ fontSize: 12, color: colors.gray600, marginBottom: 4 }}>
                    <strong>Ventas:</strong> {vendedor.ventasHoy} / {vendedor.pedidos}
                  </div>
                  <div style={{ fontSize: 12, color: colors.gray600, marginBottom: 4 }}>
                    <strong>Última actualización:</strong> {vendedor.ultimaActualizacion || 'Hace 2 min'}
                  </div>
                  {vendedor.bateria && (
                    <div style={{ fontSize: 12, color: colors.gray600 }}>
                      <strong>Batería:</strong> {vendedor.bateria}
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
            
            {/* Círculo de cobertura opcional */}
            {vendedor.estado === 'En ruta' && (
              <Circle
                center={[vendedor.ubicacion.lat, vendedor.ubicacion.lng]}
                radius={500}
                pathOptions={{
                  color: color,
                  fillColor: color,
                  fillOpacity: 0.1,
                  weight: 2,
                  opacity: 0.4
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </MapContainer>
  );
};

export default MapaMonitoreo;
