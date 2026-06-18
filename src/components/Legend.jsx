import React, { useState } from 'react';

export default function Legend() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <button 
        className="legend-toggle-btn collapsed" 
        onClick={() => setIsOpen(true)}
        title="Buka Legenda"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
      </button>
    );
  }

  return (
    <div className="map-legend">
      <div className="legend-header">
        <h4>Legenda Peta</h4>
        <button 
          className="legend-close-btn" 
          onClick={() => setIsOpen(false)}
          title="Sembunyikan Legenda"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      <div className="legend-section">
        <h5>Batas Sektor</h5>
        <div className="legend-item"><span className="legend-color" style={{background: 'rgba(59, 130, 246, 0.2)', border: '2px solid #3b82f6'}}></span> Area Sektor</div>
      </div>
      <div className="legend-section">
        <h5>Infrastruktur</h5>
        <div className="legend-item"><span className="legend-line" style={{background: '#10b981'}}></span> Baik</div>
        <div className="legend-item"><span className="legend-line" style={{background: '#f59e0b', borderBottom: '2px dashed #000'}}></span> Dalam Proses</div>
        <div className="legend-item"><span className="legend-line" style={{background: '#ef4444'}}></span> Perlu Perbaikan</div>
      </div>
      <div className="legend-section">
        <h5>Titik Survei</h5>
        <div className="legend-item"><span className="legend-dot" style={{background: '#10b981'}}></span> Selesai</div>
        <div className="legend-item"><span className="legend-dot" style={{background: '#f59e0b'}}></span> Proses</div>
        <div className="legend-item"><span className="legend-dot" style={{background: '#ef4444'}}></span> Kendala</div>
      </div>
    </div>
  );
}
