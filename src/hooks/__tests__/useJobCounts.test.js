
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useJobCounts } from '../useJobCounts';
import jobsReducer from '../../store/jobsSlice';
import React from 'react';
const createMockStore = (initialState) => {
    return configureStore({
        reducer: {
            jobs: jobsReducer,
        },
        preloadedState: initialState,
    });
};

describe('useJobCounts hook', () => {
    it('should return correct counts for different job statuses', () => {
        const mockJobs = [
            { id: '1', status: 'On Road' },
            { id: '2', status: 'On Road' },
            { id: '3', status: 'Completed' },
            { id: '4', status: 'Completed' },
            { id: '5', status: 'On Hold' },
        ];
        const store = createMockStore({
            jobs: { jobs: mockJobs, status: 'succeeded', error: null },
        });
        const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

        const { result } = renderHook(() => useJobCounts(), { wrapper });

        expect(result.current).toEqual({
            onRoad: 2,
            completed: 2,
            onHold: 1,
            total: 5,
        });
    });

    it('should return zero counts for empty job list', () => {
        const store = createMockStore({
            jobs: { jobs: [], status: 'succeeded', error: null },
        });
        const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

        const { result } = renderHook(() => useJobCounts(), { wrapper });

        expect(result.current).toEqual({
            onRoad: 0,
            completed: 0,
            onHold: 0,
            total: 0,
        });
    });
});