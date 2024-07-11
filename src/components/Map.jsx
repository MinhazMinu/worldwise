/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useNavigate } from 'react-router-dom';
import styles from './Map.module.css';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { UseCities } from '../contexts/CitiesContext.jsx';
import { useGeolocation } from '../hooks/useGeolocation.jsx';
import Button from './Button.jsx';
import { useUrlPositions } from '../hooks/useUrlPositions.jsx';
function Map() {
  const { cities } = UseCities();
  const [mapPosition, setMapPosition] = useState([38, -9]);

  const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation();

  const [mapLat, mapLng] = useUrlPositions();

  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([mapLat, mapLng]);
    }
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPosition) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    }
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition} disabled={isLoadingPosition}>
          {isLoadingPosition ? 'Loading...' : 'Use your positions'}
        </Button>
      )}
      <MapContainer center={mapPosition} zoom={1} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
        />

        {cities.map((city) => (
          <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
            <Popup>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter positions={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ positions }) {
  const map = useMap();
  map.setView(positions, 6);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
