import CountryItem from './CountryItem.jsx';
import styles from './CountryList.module.css';
import Spinner from './Spinner.jsx';
import Message from './Message.jsx';
import { UseCities } from '../contexts/CitiesContext.jsx';
function CountryList() {
  const { cities, isLoading } = UseCities();

  if (isLoading) return <Spinner />;

  if (!cities || !cities.length) return <Message message={'Add your first city by clicking on the map'} />;

  // return each unique object based on unique country from the list of cities
  const countries = cities.reduce(function (acc, city) {
    const country = acc.find((c) => c.country === city.country);
    if (!country) {
      acc.push({
        id: city.id,
        country: city.country,
        emoji: city.emoji,
      });
    }
    return acc;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.id} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
