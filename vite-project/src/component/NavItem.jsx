// NavItem.jsx
import React from 'react';
import { motion } from 'framer-motion';

const NavItem = ({ icon, name, sup }) => {
  return (
    <motion.div
      whileHover={{ y: -1 }}
      whileTap={{ y: 0 }}
      className="relative group"
    >
      <button className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-orange-500 transition-colors font-medium">
        <span className="text-lg">{icon}</span>
        <span>{name}</span>
        {sup && (
          <sup className="text-xs text-orange-500 font-bold ml-1">{sup}</sup>
        )}
      </button>
      
      {/* Hover underline effect */}
      <motion.div
        className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"
        initial={false}
      />
    </motion.div>
  );
};

export default NavItem;