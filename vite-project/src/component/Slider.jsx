// Slider.jsx
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "./Card"; // ⬅ use same Card component

const Slider = ({ restaurants = [], loading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(4);

  // Responsive cards
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setCardsToShow(1);
      else if (w < 768) setCardsToShow(2);
      else if (w < 1024) setCardsToShow(3);
      else setCardsToShow(4);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(
    0,
    Math.ceil(restaurants.length / cardsToShow) - 1
  );

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  // Auto scroll
  useEffect(() => {
    if (!restaurants.length) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, restaurants.length]);

  // Proper wrapped visible items
  const visibleItems = useMemo(() => {
    const start = currentIndex * cardsToShow;
    const slice = restaurants.slice(start, start + cardsToShow);

    if (slice.length === cardsToShow) return slice;

    const remaining = cardsToShow - slice.length;
    return [...slice, ...restaurants.slice(0, remaining)];
  }, [restaurants, currentIndex, cardsToShow]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: cardsToShow }).map((_, i) => (
          <div key={i} className="h-48 bg-gray-200 animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      {/* Slider content animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.35 }}
          className="
            grid grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            gap-6
          "
        >
          {visibleItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="
                transform 
                hover:scale-105 
                transition-transform 
                duration-300
              "
            >
              <Card {...item} />
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="
          absolute left-0 top-1/2 -translate-y-1/2 
          bg-white shadow-md hover:shadow-lg 
          w-10 h-10 rounded-full 
          flex items-center justify-center
          hover:bg-gray-100 transition
          z-10
        "
      >
        ❮
      </button>

      <button
        onClick={nextSlide}
        className="
          absolute right-0 top-1/2 -translate-y-1/2 
          bg-white shadow-md hover:shadow-lg 
          w-10 h-10 rounded-full 
          flex items-center justify-center
          hover:bg-gray-100 transition
          z-10
        "
      >
        ❯
      </button>
    </div>
  );
};

export default Slider;
