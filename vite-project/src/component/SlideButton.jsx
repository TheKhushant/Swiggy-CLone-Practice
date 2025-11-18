// SlideButton.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

const SlideButton = ({ direction, onClick, disabled = false }) => {
  const isPrev = direction === 'prev';
  const Icon = isPrev ? FaArrowLeft : FaArrowRight;

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.1 }}
      whileTap={{ scale: disabled ? 1 : 0.9 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center w-12 h-12 rounded-full
        backdrop-blur-sm border transition-all duration-300
        ${
          disabled
            ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white/80 border-gray-300 text-gray-700 hover:bg-white hover:border-orange-500 hover:text-orange-500 shadow-lg hover:shadow-xl'
        }
      `}
      aria-label={isPrev ? 'Previous slide' : 'Next slide'}
    >
      <Icon className="text-lg" />
    </motion.button>
  );
};

export default SlideButton;