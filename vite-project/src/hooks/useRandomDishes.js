// hooks/useRandomDishes.js
import { useState, useRef } from 'react';

export const useRandomDishes = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Cache for storing fetched dishes per area
  const cache = useRef(new Map());

  const fetchDishes = async (area) => {
    // Return cached data if available
    if (cache.current.has(area)) {
      setDishes(cache.current.get(area));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch 3 random meals in parallel
      const responses = await Promise.all([
        fetch('https://www.themealdb.com/api/json/v1/1/random.php'),
        fetch('https://www.themealdb.com/api/json/v1/1/random.php'),
        fetch('https://www.themealdb.com/api/json/v1/1/random.php'),
      ]);

      // Check if all responses are OK
      const failedResponse = responses.find(res => !res.ok);
      if (failedResponse) {
        throw new Error(`HTTP error! status: ${failedResponse.status}`);
      }

      // Parse all responses
      const data = await Promise.all(
        responses.map(response => response.json())
      );

      // Transform data
      const dishData = data.map((item, index) => ({
        id: `${area}-${index}-${Date.now()}`,
        name: item.meals[0].strMeal,
        img: item.meals[0].strMealThumb,
        category: item.meals[0].strCategory,
      }));

      // Cache the results
      cache.current.set(area, dishData);
      setDishes(dishData);
    } catch (err) {
      setError('Failed to fetch dishes. Please try again.');
      console.error('Error fetching dishes:', err);
      setDishes([]);
    } finally {
      setLoading(false);
    }
  };

  const clearCache = () => {
    cache.current.clear();
  };

  return {
    dishes,
    loading,
    error,
    fetchDishes,
    clearCache,
  };
};