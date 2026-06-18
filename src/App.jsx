import { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent';
import Dashboard from './components/Dashboard';
import Legend from './components/Legend';

function App() {
  const [theme, setTheme] = useState('light');
  const [basemap, setBasemap] = useState('light'); // light, dark, satellite, terrain
  const [layers, setLayers] = useState({
    region: true,
    infrastructure: true,
    surveys: true,
  });
  const [highPrecision, setHighPrecision] = useState(false);
  
  const [surveyData, setSurveyData] = useState(null);
  const [regionData, setRegionData] = useState(null);
  const [infrastructureData, setInfrastructureData] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Load GeoJSON data on mount
  useEffect(() => {
    fetch('/data/surveys.geojson').then(res => res.json()).then(data => setSurveyData(data));
    fetch('/data/regions.geojson').then(res => res.json()).then(data => setRegionData(data));
    fetch('/data/infrastructure.geojson').then(res => res.json()).then(data => setInfrastructureData(data));
  }, []);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    changeTheme(newTheme);
    
    // Auto-switch basemap to match theme
    if (newTheme === 'dark') {
      setBasemap('dark');
    } else {
      setBasemap('light');
    }
  };

  // Ensure body has the correct class on initial mount
  useEffect(() => {
    changeTheme(theme);
  }, []);

  const toggleLayer = (layerName) => {
    setLayers(prev => ({ ...prev, [layerName]: !prev[layerName] }));
  };

  return (
    <div className={`webgis-container ${theme}-theme`}>
      <Dashboard 
        theme={theme}
        toggleTheme={toggleTheme}
        changeTheme={changeTheme}
        basemap={basemap}
        setBasemap={setBasemap}
        layers={layers}
        toggleLayer={toggleLayer}
        surveyData={surveyData}
        regionData={regionData}
        highPrecision={highPrecision}
        setHighPrecision={setHighPrecision}
        setSelectedLocation={setSelectedLocation}
      />
      <MapComponent 
        basemap={basemap}
        layers={layers}
        highPrecision={highPrecision}
        surveyData={surveyData}
        regionData={regionData}
        infrastructureData={infrastructureData}
        selectedLocation={selectedLocation}
      />
      <Legend />
    </div>
  );
}

export default App;
