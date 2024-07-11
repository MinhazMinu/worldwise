import { Link } from 'react-router-dom';
import styles from './CityItem.module.css';
import { UseCities } from '../contexts/CitiesContext.jsx';
function CityItem({ city }) {
  const { currentCity, deleteCity } = UseCities();
  const { cityName, emoji, date, id, position } = city;

  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }

  const formattedDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };
  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active'] : ''}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formattedDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
