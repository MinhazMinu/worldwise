import CityItem from './CityItem.jsx';
import styles from './CityList.module.css';
import Spinner from './Spinner.jsx';
import Message from './Message.jsx';
import { UseCities } from '../contexts/CitiesContext.jsx';
function CityList() {
  const { cities, isLoading } = UseCities();
  if (isLoading) return <Spinner />;

  if (!cities || !cities.length) return <Message message={'Add your first city by clicking on the map'} />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
