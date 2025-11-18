// AreaList.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AreaList = ({ selectedArea, onAreaSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const nagpurAreas = [
    'Dharampeth',
    'Sitabuldi',
    'Civil Lines',
    'Wardha Road',
    'Mahal',
    'Sadar',
    'Pratap Nagar',
    'Manish Nagar',
    'Besa',
    'Koradi',
    'Kamptee',
    'Hingna',
  ];

  const filteredAreas = nagpurAreas.filter(area =>
    area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search areas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          🔍
        </div>
      </div>

      {/* Areas List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredAreas.map((area, index) => (
          <motion.div
            key={area}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onAreaSelect(area)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                selectedArea === area
                  ? 'bg-orange-50 border-2 border-orange-500 text-orange-700'
                  : 'bg-gray-50 border-2 border-transparent text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="font-medium">{area}</span>
              {selectedArea === area && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-2 text-orange-500"
                >
                  ✓
                </motion.span>
              )}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AreaList;