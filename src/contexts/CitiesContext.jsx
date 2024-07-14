import { createContext, useContext, useEffect, useReducer } from 'react';

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'cities/loaded':
      return { ...state, cities: action.payload, isLoading: false };

    case 'city/Loaded':
      return { ...state, currentCity: action.payload, isLoading: false };

    case 'cities/created':
      return { ...state, cities: [...state.cities, action.payload], isLoading: false };
    case 'cities/deleted':
      return { ...state, cities: state.cities.filter((city) => city.id !== action.payload), isLoading: false };

    case 'rejected':
      return { ...state, error: action.payload, isLoading: false };

    default:
      throw new Error('Unknown action type');
  }
}

function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(reducer, initialState);

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch('http://localhost:5000/cities');
        const data = await res.json();
        dispatch({ type: 'cities/loaded', payload: data });
      } catch (error) {
        dispatch({ type: 'rejected', payload: 'There was an error loading data...' + error.message });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      dispatch({ type: 'loading' });
      const res = await fetch(`http://localhost:5000/cities/${id}`);
      const data = await res.json();
      dispatch({ type: 'city/Loaded', payload: data });
    } catch (error) {
      dispatch({ type: 'rejected', payload: 'Error in fetching city...' + error.message });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`http://localhost:5000/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      dispatch({ type: 'cities/created', payload: data });
    } catch (error) {
      dispatch({ type: 'rejected', payload: 'Error in creating city...' + error.message });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: 'loading' });
    try {
      await fetch(`http://localhost:5000/cities/${id}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'cities/deleted', payload: id });
    } catch (error) {
      dispatch({ type: 'rejected', payload: 'Error in deleting city...' + error.message });
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
