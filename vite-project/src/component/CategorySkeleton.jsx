// CategorySkeleton.jsx
import React from 'react';

const CategorySkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="aspect-square bg-gray-200 rounded-2xl mb-2" />
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto" />
        <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
      </div>
    </div>
  );
};

export default CategorySkeleton;