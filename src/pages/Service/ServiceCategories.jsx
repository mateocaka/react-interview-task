import { CategoryButton } from "./CategoryButton.jsx";
import React from 'react';

export const ServiceCategories = ({ categories, selected, onSelectService }) => (
    <div className="flex-1 p-6">
        <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                Service Categories
            </h3>
        </div>
        <nav className="space-y-2" aria-label="Service categories">
            {categories.map((categoryName) => (
                <CategoryButton
                    key={categoryName}
                    categoryName={categoryName}
                    isSelected={selected === categoryName}
                    onClick={() => onSelectService(categoryName)}
                />
            ))}
        </nav>
    </div>
);