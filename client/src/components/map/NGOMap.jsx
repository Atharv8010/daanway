import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { nagpurNGOs } from '../../utils/ngoData';
import './NGOMap.css';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const NGOMap = () => {
  const [ngos, setNgos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Load NGO data
    setNgos(nagpurNGOs);

    // Try to get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.log('Could not get user location:', error);
        }
      );
    }
  }, []);

  const filteredNGOs = selectedCategory === 'all' 
    ? ngos 
    : ngos.filter(ngo => ngo.categories.includes(selectedCategory));

  const categories = [
    { value: 'all', label: 'All NGOs', icon: '🏢' },
    { value: 'food', label: 'Food', icon: '🍲' },
    { value: 'clothes', label: 'Clothes', icon: '👕' },
    { value: 'books', label: 'Books', icon: '📚' },
    { value: 'toys', label: 'Toys', icon: '🧸' },
    { value: 'medicine', label: 'Medicine', icon: '💊' }
  ];

  // Nagpur center coordinates
  const nagpurCenter = [21.1458, 79.0882];

  return (
    <div className="ngo-map-wrapper">
      <div className="map-filters">
        <h3>Filter by Category:</h3>
        <div className="category-filters">
          {categories.map(cat => (
            <button
              key={cat.value}
              className={`category-filter-btn ${selectedCategory === cat.value ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.value)}
            >
              <span className="filter-icon">{cat.icon}</span>
              <span>{cat.label}</span>
              <span className="filter-count">
                ({cat.value === 'all' ? ngos.length : ngos.filter(n => n.categories.includes(cat.value)).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      <MapContainer
        center={userLocation || nagpurCenter}
        zoom={12}
        style={{ height: '100%', width: '100%', borderRadius: '12px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {userLocation && (
          <Marker position={userLocation}>
            <Popup>
              <div className="map-popup">
                <h4>📍 Your Location</h4>
              </div>
            </Popup>
          </Marker>
        )}

        {filteredNGOs.map((ngo, index) => (
          <Marker
            key={index}
            position={[ngo.location.coordinates[1], ngo.location.coordinates[0]]}
          >
            <Popup>
              <div className="map-popup">
                <h4>{ngo.name}</h4>
                <p className="popup-categories">
                  {ngo.categories.map(cat => {
                    const categoryIcons = {
                      food: '🍲',
                      clothes: '👕',
                      books: '📚',
                      toys: '🧸',
                      medicine: '💊'
                    };
                    return <span key={cat} className="popup-cat-icon">{categoryIcons[cat]}</span>;
                  })}
                </p>
                <p className="popup-address">
                  📍 {ngo.address.street}, {ngo.address.city}
                </p>
                <p className="popup-phone">📞 {ngo.phone}</p>
                {ngo.email && <p className="popup-email">📧 {ngo.email}</p>}
                <p className="popup-rating">⭐ {ngo.rating}</p>
                {ngo.description && (
                  <p className="popup-description">{ngo.description}</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default NGOMap;