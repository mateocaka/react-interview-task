import React from "react";
export const ModalHeader = ({ title, onClose }) => (
    <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            aria-label="Close modal"
        >
            ×
        </button>
    </div>
);

export const InfoMessage = () => (
    <div className="flex items-start space-x-3 mb-6 p-3 bg-blue-50 rounded-lg">
        <div className="flex-shrink-0">
            <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                i
            </div>
        </div>
        <p className="text-sm text-gray-600">
            Informative piece of text that can be used regarding this modal.
        </p>
    </div>
);

export const NameField = ({ value, onChange, error }) => (
    <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
            Name *
        </label>
        <input
            type="text"
            id="name"
            name="name"
            value={value}
            onChange={onChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                error ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Type the jobsite's name"
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
);

export const StatusSelect = ({ value, options, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Status</label>
        <div className="relative">
            <select
                name="status"
                value={value}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
                {options.map(status => (
                    <option key={status} value={status}>{status}</option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    </div>
);

export const FormActions = ({ onCancel, isEditMode }) => (
    <div className="flex justify-end space-x-3 pt-6">
        <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors flex items-center space-x-2"
        >
            <span>Cancel Changes</span>
            <span>×</span>
        </button>
        <button
            type="submit"
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors flex items-center space-x-2"
        >
            <span>{isEditMode ? 'Save Changes' : 'Create'}</span>
            <span>✓</span>
        </button>
    </div>
);
