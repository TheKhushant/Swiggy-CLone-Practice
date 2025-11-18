import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function CategoryCard({ category }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const imageUrl = `https://swiggy-api-molm.onrender.com/images/${category.image}`;
  const fallbackImage = '/images/category-placeholder.jpg';

  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        y: -4
      }}
      whileTap={{ scale: 0.95 }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
        {/* Image Container */}
        <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse rounded-2xl" />
          )}
          
          <img
            src={imageError ? fallbackImage : imageUrl}
            alt={category.name}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
        
        {/* Category Name */}
        <div className="p-4 text-center bg-gradient-to-b from-white to-gray-50">
          <h3 className="font-bold text-gray-900 text-sm line-clamp-2 group-hover:text-orange-600 transition-colors duration-300 tracking-tight">
            {category.name}
          </h3>
        </div>

        {/* Hover Border Effect */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-orange-500/20 transition-all duration-300 pointer-events-none" />
      </div>
    </motion.div>
  );
}
