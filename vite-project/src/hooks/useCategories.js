// hooks/useCategories.js
import { useState, useEffect, useCallback, useRef } from 'react';

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cache = useRef({});

  const fetchCategories = useCallback(async () => {
    const cacheKey = 'categories';
    const now = Date.now();
    
    // Check cache validity
    if (cache.current[cacheKey] && (now - cache.current[cacheKey].timestamp < CACHE_DURATION)) {
      setCategories(cache.current[cacheKey].data);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Add timeout safeguard
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), 8000)
      );

      const fetchPromise = fetch('https://swiggy-api-molm.onrender.com/categories');
      
      const response = await Promise.race([fetchPromise, timeoutPromise]);
      
      if (!response.ok) {
        throw new Error(`Failed to load categories: ${response.status}`);
      }

      const data = await response.json();
      
      // Cache the data
      cache.current[cacheKey] = {
        data: data,
        timestamp: now
      };
      
      setCategories(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch categories');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const retry = useCallback(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    retry
  };
};