// TopRest.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Slider from '../component/Slider';
import { useTopRestaurants } from '../hooks/useTopRestaurants';

const TopRest = () => {
  const { data, loading, error, retry } = useTopRestaurants();

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Failed to load restaurants
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={retry}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Top Restaurant Chains in Nagpur
        </h2>
        
        <Slider 
          restaurants={data} 
          loading={loading} 
        />
      </motion.div>
    </section>
  );
};

export default TopRest;