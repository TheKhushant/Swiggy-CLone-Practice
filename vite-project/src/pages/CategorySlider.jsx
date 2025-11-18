// CategorySlider.jsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import CategoryCard from "../component/CategoryCard";
import SliderButton from "../component/SliderButton";
import CategorySkeleton from "../component/CategorySkeleton";
import { useCategories } from "../hooks/useCategories";

const CategorySlider = () => {
  const { categories, loading, error, retry } = useCategories();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(6);

  // Responsive card count
  useEffect(() => {
    const updateCardsToShow = () => {
      const width = window.innerWidth;
      if (width < 640) setCardsToShow(2);
      else if (width < 768) setCardsToShow(3);
      else if (width < 1024) setCardsToShow(4);
      else if (width < 1280) setCardsToShow(5);
      else setCardsToShow(6);
    };

    updateCardsToShow();
    const onResize = debounce(updateCardsToShow, 200);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Reverse the categories
  const reversedCategories = useMemo(() => {
    return [...categories].reverse();
  }, [categories]);

  // max index uses reversed list
  const maxIndex = Math.max(
    0,
    Math.ceil(reversedCategories.length / cardsToShow) - 1
  );

  const canGoNext = currentIndex < maxIndex;
  const canGoPrev = currentIndex > 0;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-scroll
  useEffect(() => {
    if (categories.length === 0) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [nextSlide, categories.length]);

  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    trackMouse: true,
    delta: 50,
  });

  // DISPLAY ITEMS IN REVERSE ORDER + LOOP
  const visibleCategories = useMemo(() => {
    const start = currentIndex * cardsToShow;
    const slice = reversedCategories.slice(start, start + cardsToShow);

    if (slice.length === cardsToShow) return slice;

    const missing = cardsToShow - slice.length;
    return [...slice, ...reversedCategories.slice(0, missing)];
  }, [reversedCategories, currentIndex, cardsToShow]);

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h2 className="text-xl font-bold mb-4">Failed to load categories</h2>
        <button
          onClick={retry}
          className="bg-orange-500 px-6 py-2 text-white rounded-lg"
        >
          Try Again
        </button>
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
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Order our best food options</h2>

          {/* Progress Dots */}
          {categories.length > 0 && (
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-orange-500 w-6"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Buttons */}
              <div className="flex space-x-2">
                <SliderButton
                  direction="prev"
                  onClick={prevSlide}
                  disabled={!canGoPrev && !(maxIndex > 0)}
                />
                <SliderButton
                  direction="next"
                  onClick={nextSlide}
                  disabled={!canGoNext && !(maxIndex > 0)}
                />
              </div>
            </div>
          )}
        </div>

        {/* Slider */}
        <div {...swipeHandlers}>
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {Array.from({ length: cardsToShow }).map((_, index) => (
                <CategorySkeleton key={index} />
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
              >
                {visibleCategories.map((category, index) => (
                  <CategoryCard
                    key={`${category.id}-${index}`}
                    category={category}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </motion.div>
      <hr className="my-8" />
    </section>
  );
};

// Debounce
const debounce = (func, wait) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => func(...args), wait);
  };
};

export default CategorySlider;
