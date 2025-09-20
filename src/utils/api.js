import ErrorBoundary from '../components/common/ErrorBoundary.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import ErrorMessage from '../components/common/ErrorMessage.jsx';
import NoServiceSelected from '../components/Service/NoServiceSelected.jsx';
import useDebounce from '../hooks/useDebounce.js';
import useLocalStorage from '../hooks/useLocalStorage.js';
import {useJobCounts} from '../hooks/useJobCounts.js';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const createApiClient = () => {
    const baseHeaders = {
        'Content-Type': 'application/json',
    };

    const handleResponse = async (response) => {
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`API Error: ${response.status} - ${error}`);
        }
        return response.json();
    };

    return {
        get: async (endpoint) => {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'GET',
                headers: baseHeaders,
            });
            return handleResponse(response);
        },

        post: async (endpoint, data) => {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: baseHeaders,
                body: JSON.stringify(data),
            });
            return handleResponse(response);
        },

        patch: async (endpoint, data) => {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'PATCH',
                headers: baseHeaders,
                body: JSON.stringify(data),
            });
            return handleResponse(response);
        },

        delete: async (endpoint) => {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'DELETE',
                headers: baseHeaders,
            });
            return handleResponse(response);
        },
    };
};

export { ErrorBoundary, LoadingSpinner, ErrorMessage, NoServiceSelected, useDebounce, useLocalStorage, useJobCounts };