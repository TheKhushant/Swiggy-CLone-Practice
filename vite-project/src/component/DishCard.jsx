// DishCard.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DishCard = ({ dish }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isEnlarged, setIsEnlarged] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -2 }}
        className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer bg-white"
        onClick={() => setIsEnlarged(true)}
      >
        {/* Image Container */}
        <div className="relative w-20 h-20 flex-shrink-0">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
          )}
          <img
            src={imageError ? '/images/dish-placeholder.jpg' : dish.img}
            alt={dish.name}
            loading="lazy"
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        {/* Dish Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-semibold text-gray-900 truncate">
            {dish.name}
          </h4>
          <p className="text-gray-600 text-sm mt-1">
            {dish.category || 'Popular Dish'}
          </p>
        </div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          className="text-orange-500 text-lg font-semibold"
        >
          →
        </motion.div>
      </motion.div>

      {/* Enlarged View Modal */}
      <AnimatePresence>
        {isEnlarged && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEnlarged(false)}
              className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
                <img
                  src={imageError ? '/images/dish-placeholder.jpg' : dish.img}
                  alt={dish.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {dish.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {dish.description || 'A delicious dish waiting to be enjoyed!'}
                  </p>
                  <button
                    onClick={() => setIsEnlarged(false)}
                    className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DishCard;