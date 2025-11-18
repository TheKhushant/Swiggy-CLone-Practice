// Sidebar.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AreaList from './AreaList';
import { useRandomDishes } from '../hooks/useRandomDishes';

const Sidebar = ({ isOpen, onClose }) => {
  const [selectedArea, setSelectedArea] = useState(null);
  const { dishes, loading, fetchDishes } = useRandomDishes();

  const handleAreaSelect = async (area) => {
    setSelectedArea(area);
    await fetchDishes(area);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm"
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 h-full w-96 max-w-full bg-white shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  Nearby Locations
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="text-2xl">×</span>
                </motion.button>
              </div>

              <AreaList
                selectedArea={selectedArea}
                onAreaSelect={handleAreaSelect}
              />

              {selectedArea && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Popular in {selectedArea}
                  </h3>
                  <div className="grid gap-4">
                    {loading ? (
                      Array.from({ length: 3 }).map((_, index) => (
                        <DishCardSkeleton key={index} />
                      ))
                    ) : dishes.length > 0 ? (
                      dishes.map((dish) => (
                        <DishCard key={dish.id} dish={dish} />
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No dishes found in this area
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const DishCardSkeleton = () => (
  <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg animate-pulse">
    <div className="w-20 h-20 bg-gray-200 rounded-lg" />
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
    </div>
  </div>
);

export default Sidebar;