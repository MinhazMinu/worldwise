/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  return (
    <div className={styles.mapContainer} onClick={() => navigate('form')}>
      <h1>map</h1>
      postion lat: {lat}, lng:{lng}
    </div>
  );
}

export default Map;
