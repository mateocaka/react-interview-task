import React from 'react';
export const GoBackButton = ({ onGoBack }) => (
    <footer className="p-6 border-t border-gray-200">
        <button
            onClick={onGoBack}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-md font-medium text-sm flex items-center justify-center space-x-2 transition-colors duration-200"
            aria-label="Go back to home"
        >
            <span>←</span>
            <span>Go Back</span>
        </button>
    </footer>
);