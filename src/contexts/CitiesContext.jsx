import { createContext, useContext, useEffect, useState } from 'react';

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      setIsLoading(true);
      try {
        const res = await fetch('http://localhost:5000/cities');
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.error('Error fetching cities', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:5000/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      console.error('Error fetching cities', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:5000/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setCities([...cities, data]);
    } catch (error) {
      console.error('Error creating cities', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);
      await fetch(`http://localhost:5000/cities/${id}`, {
        method: 'DELETE',
      });
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (error) {
      console.error('Error deleting  city: ', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity, createCity, deleteCity }}>
      {children}
    </CitiesContext.Provider>
  );
}

function UseCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error('useCities must be used within a CitiesProvider');
  }
  return context;
}

export { CitiesProvider, UseCities };
