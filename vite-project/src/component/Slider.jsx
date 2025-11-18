// Slider.jsx
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import SlideButton from './SlideButton';
import SkeletonCard from './SkeletonCard';
import Card from './Card';

const Slider = ({ restaurants, loading }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(4);

  // Responsive card count
  useEffect(() => {
    const updateCardsToShow = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardsToShow(1);
      } else if (width < 768) {
        setCardsToShow(2);
      } else if (width < 1024) {
        setCardsToShow(3);
      } else {
        setCardsToShow(4);
      }
    };

    updateCardsToShow();
    const debouncedResize = debounce(updateCardsToShow, 250);
    window.addEventListener('resize', debouncedResize);
    
    return () => window.removeEventListener('resize', debouncedResize);
  }, []);

  const maxSlide = Math.max(0, Math.ceil(restaurants.length / cardsToShow) - 1);
  const canGoNext = currentSlide < maxSlide;
  const canGoPrev = currentSlide > 0;

  const nextSlide = useCallback(() => {
    if (canGoNext) {
      setCurrentSlide(prev => prev + 1);
    } else {
      setCurrentSlide(0); // Loop to start
    }
  }, [canGoNext]);

  const prevSlide = useCallback(() => {
    if (canGoPrev) {
      setCurrentSlide(prev => prev - 1);
    } else {
      setCurrentSlide(maxSlide); // Loop to end
    }
  }, [canGoPrev, maxSlide]);

  // Auto-scroll
  useEffect(() => {
    if (restaurants.length === 0) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide, restaurants.length]);

  // Swipe handlers for mobile
  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    trackMouse: true,
  });

  // Calculate visible restaurants for current slide
  const visibleRestaurants = useMemo(() => {
    const start = currentSlide * cardsToShow;
    return restaurants.slice(start, start + cardsToShow);
  }, [restaurants, currentSlide, cardsToShow]);

  // Navigation dots
  const totalDots = Math.ceil(restaurants.length / cardsToShow);

  if (loading) {
    return (
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: cardsToShow }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" {...swipeHandlers}>
      {/* Slider Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          {/* Navigation Dots */}
          <div className="flex space-x-2">
            {Array.from({ length: totalDots }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-orange-500 w-6'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex space-x-3">
          <SlideButton
            direction="prev"
            onClick={prevSlide}
            disabled={!canGoPrev && !(maxSlide > 0)}
          />
          <SlideButton
            direction="next"
            onClick={nextSlide}
            disabled={!canGoNext && !(maxSlide > 0)}
          />
        </div>
      </div>

      {/* Slider Content */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {visibleRestaurants.map((restaurant, index) => (
              <Card
                key={`${restaurant.id}-${index}`}
                {...restaurant}
                className="transform hover:scale-105 transition-transform duration-300"
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// Debounce utility
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export default Slider;