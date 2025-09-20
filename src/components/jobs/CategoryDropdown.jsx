import { ChevronIcon } from '../common/Icons';
import React from "react";

export const CategoryDropdown = ({ categories, config, isOpen, onToggle, onCategoryToggle, error }) => (
    <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
            Category Included *
        </label>

        <div className="relative">
            <DropdownTrigger
                categories={categories}
                config={config}
                isOpen={isOpen}
                onClick={onToggle}
                error={error}
                onCategoryToggle={onCategoryToggle}
            />
            {isOpen && (
                <DropdownOptions
                    categories={categories}
                    config={config}
                    onCategoryToggle={onCategoryToggle}
                />
            )}
            <CategoryTags categories={categories} config={config} onCategoryToggle={onCategoryToggle} />
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
);

const DropdownTrigger = ({ categories, config, isOpen, onClick, error, onCategoryToggle }) => (
    <div
        onClick={onClick}
        className={`w-full px-3 py-2 border rounded-md cursor-pointer bg-white flex items-center justify-between ${
            error ? 'border-red-500' : 'border-gray-300'
        }`}
    >
        <div
            className="flex-1 flex flex-wrap gap-1"
            onClick={(e) => e.stopPropagation()} // prevent closing dropdown when removing
        >
                <span className="text-gray-500">Select categories</span>
        </div>

        <ChevronIcon isOpen={isOpen} />
    </div>
);

const CategoryTags = ({ categories, config, onCategoryToggle }) => (
    <div className="flex flex-wrap gap-0">
        {categories.map(category => (
            <span
                key={category}
                className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${config.getCategoryColor(category)}`}
            >
                {category}
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onCategoryToggle(category);
                    }}
                    className="ml-1 text-red-600 hover:text-red-800 font-bold"
                >
                    ✕
                </button>
            </span>
        ))}
    </div>
);

const DropdownOptions = ({ categories, config, onCategoryToggle }) => (
    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
        <div className="p-2 space-y-1">
            {config.categoryOptions.map(category => {
                const isSelected = categories.includes(category);
                const colorClass = isSelected
                    ? config.getCategoryColor(category)
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200';

                return (
                    <div
                        key={category}
                        onClick={() => onCategoryToggle(category)}
                        className={`flex items-center p-2 rounded cursor-pointer transition-all ${colorClass}`}
                    >
                        <span className="text-sm font-medium">
                            {category} {isSelected && '✓'}
                        </span>
                    </div>
                );
            })}
        </div>
    </div>
);
