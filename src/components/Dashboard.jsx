import React from 'react';

export default function Dashboard({ 
  theme, toggleTheme, changeTheme, basemap, setBasemap, 
  layers, toggleLayer, surveyData, regionData,
  highPrecision, setHighPrecision, setSelectedLocation
}) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  
  const activePoints = surveyData ? surveyData.features.length : 0;
  const activeRegions = regionData ? regionData.features.length : 0;

  const basemapOptions = [
    { value: 'light', label: 'Light Positron (Bersih)' },
    { value: 'dark', label: 'Dark Matter (Presisi Tinggi)' },
    { value: 'satellite', label: 'Satelit (Realistis)' },
    { value: 'terrain', label: 'Google Terrain (Kontur Alam)' },
  ];

  const [collapsedGroups, setCollapsedGroups] = React.useState({
    'Kendala': false,
    'Dalam Proses': false,
    'Selesai': false
  });

  const toggleGroup = (status) => {
    setCollapsedGroups(prev => ({ ...prev, [status]: !prev[status] }));
  };

  const groupedSurveys = {
    'Kendala': [],
    'Dalam Proses': [],
    'Selesai': []
  };

  if (surveyData) {
    surveyData.features.forEach(f => {
      const status = f.properties.status;
      if (groupedSurveys[status]) {
        groupedSurveys[status].push(f);
      }
    });
  }

  return (
    <aside className="dashboard-panel">
      <header className="panel-header" style={{ position: 'relative' }}>
        <h1>Data Spasial</h1>
        <p>Dashboard Analisis Pemetaan</p>

        <button onClick={toggleTheme} className="theme-toggle-btn" title="Ubah Tema Gelap/Terang">
          {theme === 'light' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
          )}
        </button>
        
        <div className="basemap-control-section" style={{ marginTop: '16px' }}>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pilih Basemap</label>
          
          <div className="custom-select-container">
            <div 
              className="premium-select" 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <span>{basemapOptions.find(opt => opt.value === basemap)?.label}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            
            {isDropdownOpen && (
              <div className="custom-dropdown-menu">
                {basemapOptions.map(opt => (
                  <div 
                    key={opt.value} 
                    className={`custom-dropdown-item ${basemap === opt.value ? 'selected' : ''}`}
                    onClick={() => {
                      setBasemap(opt.value);
                      if (opt.value === 'dark') {
                        changeTheme('dark');
                      } else if (opt.value === 'light') {
                        changeTheme('light');
                      }
                      setIsDropdownOpen(false);
                    }}
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>
      
      <section className="layer-control-section">
        <h3>Overlay Data Lapangan</h3>
        <p className="section-desc">Pilih layer untuk menyederhanakan visualisasi data yang rumit.</p>
        
        <div className="layer-toggle">
          <label className="switch">
            <input type="checkbox" checked={layers.region} onChange={() => toggleLayer('region')} />
            <span className="slider round"></span>
          </label>
          <div className="layer-info">
            <span className="layer-name">Batas Wilayah Sektor</span>
            <span className="layer-detail">Polygon Area</span>
          </div>
        </div>

        <div className="layer-toggle">
          <label className="switch">
            <input type="checkbox" checked={layers.infrastructure} onChange={() => toggleLayer('infrastructure')} />
            <span className="slider round"></span>
          </label>
          <div className="layer-info">
            <span className="layer-name">Jaringan Infrastruktur</span>
            <span className="layer-detail">Jalur / Garis</span>
          </div>
        </div>

        <div className="layer-toggle">
          <label className="switch">
            <input type="checkbox" checked={layers.surveys} onChange={() => toggleLayer('surveys')} />
            <span className="slider round"></span>
          </label>
          <div className="layer-info">
            <span className="layer-name">Titik Survei Validasi</span>
            <span className="layer-detail">Koordinat Titik</span>
          </div>
        </div>
      </section>

      <section className="location-list-section" style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h3 style={{ marginBottom: '8px' }}>Daftar Titik Survei</h3>
        
        {Object.entries(groupedSurveys).map(([status, items]) => {
          if (items.length === 0) return null;
          const isCollapsed = collapsedGroups[status];
          const statusClass = status.replace(' ', '').toLowerCase();
          
          return (
            <div key={status} className="survey-group" style={{ marginBottom: '4px' }}>
              <div 
                className="group-header" 
                onClick={() => toggleGroup(status)}
              >
                <div className="group-header-left">
                  <span className={`status-dot status-${statusClass}-dot`}></span>
                  <span className="group-header-title">{status}</span>
                  <span className="group-header-count">({items.length})</span>
                </div>
                <svg className={`group-header-icon ${isCollapsed ? 'collapsed' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
              
              {!isCollapsed && (
                <ul className="interactive-list" style={{ marginTop: '8px', marginBottom: '8px' }}>
                  {items.map((feature, idx) => (
                    <li 
                      key={idx} 
                      onClick={() => setSelectedLocation && setSelectedLocation(feature)}
                      style={{ cursor: 'pointer' }}
                    >
                      <span className="loc-id">{feature.properties.id}</span>
                      <span className={`status-badge status-${statusClass}`}>
                        {feature.properties.status}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </section>

      <section className="stats-section">
        <div className="stat-card">
          <span className="stat-value">{activePoints}</span>
          <span className="stat-label">Titik Aktif</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{activeRegions}</span>
          <span className="stat-label">Sektor Terpetakan</span>
        </div>
      </section>

      <footer className="panel-footer">
        <button 
          className={`precision-badge ${highPrecision ? 'active' : ''}`} 
          onClick={() => setHighPrecision(!highPrecision)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="2"></circle><line x1="12" y1="2" x2="12" y2="4"></line><line x1="12" y1="20" x2="12" y2="22"></line><line x1="2" y1="12" x2="4" y2="12"></line><line x1="20" y1="12" x2="22" y2="12"></line></svg>
          High Precision Mode
        </button>
      </footer>
    </aside>
  );
}
