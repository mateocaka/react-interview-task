import React from 'react';
export const CategoryButton = ({ categoryName, isSelected, onClick }) => (
    <button
        className={`w-full text-left py-2 px-4 rounded-md ${
            isSelected
                ? "bg-gray-200 text-gray-900"
                : "bg-white text-gray-700 hover:bg-gray-100"
        } transition-colors`}
        onClick={onClick}
    >
        {categoryName}
    </button>
);