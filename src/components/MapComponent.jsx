import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMapEvents, useMap, ZoomControl, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet icon issues in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Precision Tracker Component
function PrecisionTracker({ highPrecision }) {
  const [coords, setCoords] = useState({ lat: -6.000000, lng: 106.000000 });
  
  useMapEvents({
    mousemove(e) {
      if (highPrecision) {
        setCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
      }
    }
  });

  if (!highPrecision) return null;

  return (
    <div className="precision-display">
      LAT: <span>{coords.lat.toFixed(6)}</span> &nbsp;|&nbsp; LNG: <span>{coords.lng.toFixed(6)}</span>
    </div>
  );
}

function MapController({ selectedLocation }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedLocation) {
      const [lng, lat] = selectedLocation.geometry.coordinates;
      map.flyTo([lat, lng], 18, {
        duration: 1.5,
        easeLinearity: 0.25
      });
    }
  }, [selectedLocation, map]);

  return null;
}

export default function MapComponent({ basemap, layers, highPrecision, surveyData, regionData, infrastructureData, selectedLocation }) {
  const mapCenter = [-6.19, 106.84];
  const mapZoom = 12;

  const getBasemapUrl = () => {
    switch (basemap) {
      case 'dark': return 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
      case 'satellite': return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      case 'terrain': return 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
      case 'light': default: return 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
    }
  };

  // Styles for GeoJSON
  const regionStyle = { color: '#3b82f6', weight: 2, opacity: 0.8, fillOpacity: 0.1 };
  const infrastructureStyle = (feature) => {
    const condition = feature.properties.condition;
    let color = '#10b981'; // Baik
    if (condition === 'Perlu Perbaikan') color = '#ef4444';
    if (condition === 'Dalam Proses') color = '#f59e0b';
    return { color, weight: 4, dashArray: condition === 'Dalam Proses' ? '5, 10' : '' };
  };

  const onEachSurveyPoint = (feature, layer) => {
    const { id, status, keterangan } = feature.properties;
    let statusColor = status === 'Selesai' ? '#10b981' : status === 'Kendala' ? '#ef4444' : '#f59e0b';
    
    layer.bindPopup(`
      <div style="font-family: Inter, sans-serif;">
        <h4 style="margin: 0 0 8px 0; color: ${statusColor};">${id}</h4>
        <p style="margin: 0; font-size: 13px;">Status: <strong>${status}</strong></p>
        <p style="margin: 4px 0 0 0; font-size: 13px; color: #666;">${keterangan}</p>
      </div>
    `);
  };

  return (
    <div className={`map-wrapper ${highPrecision ? 'precision-active' : ''}`}>
      <MapContainer center={mapCenter} zoom={mapZoom} zoomControl={false} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          url={getBasemapUrl()}
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        {layers.region && regionData && <GeoJSON data={regionData} style={regionStyle} />}
        {layers.infrastructure && infrastructureData && <GeoJSON data={infrastructureData} style={infrastructureStyle} />}
        {layers.surveys && surveyData && <GeoJSON data={surveyData} onEachFeature={onEachSurveyPoint} />}
        
        <MapController selectedLocation={selectedLocation} />
        <ZoomControl position="bottomright" />
        <PrecisionTracker highPrecision={highPrecision} />
      </MapContainer>
    </div>
  );
}
