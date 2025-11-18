// hooks/useTopRestaurants.js
import { useState, useEffect, useCallback, useRef } from 'react';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useTopRestaurants = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cache = useRef({});

  const fetchTopRestaurants = useCallback(async () => {
    const cacheKey = 'top-restaurants';
    const now = Date.now();
    
    // Check cache validity
    if (cache.current[cacheKey] && (now - cache.current[cacheKey].timestamp < CACHE_DURATION)) {
      setData(cache.current[cacheKey].data);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Add timeout safeguard
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );

      const fetchPromise = fetch('https://swiggy-api-molm.onrender.com/top-restaurant-chains');
      
      const response = await Promise.race([fetchPromise, timeoutPromise]);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiData = await response.json();
      
      // Cache the data
      cache.current[cacheKey] = {
        data: apiData,
        timestamp: now
      };
      
      setData(apiData);
    } catch (err) {
      setError(err.message || 'Failed to fetch restaurants');
      console.error('Error fetching restaurants:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const retry = useCallback(() => {
    fetchTopRestaurants();
  }, [fetchTopRestaurants]);

  useEffect(() => {
    fetchTopRestaurants();
  }, [fetchTopRestaurants]);

  return {
    data,
    loading,
    error,
    retry
  };
};