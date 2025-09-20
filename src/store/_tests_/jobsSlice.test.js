jest.mock('uuid', () => ({
    v4: jest.fn(() => 'mocked-uuid-value')
}));

import { configureStore } from '@reduxjs/toolkit';
import jobsReducer, { fetchJobs, addJob, updateJob, clearError } from '../jobsSlice';

describe('jobsSlice', () => {
    let store;

    beforeEach(() => {

        store = configureStore({
            reducer: { jobs: jobsReducer },
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({
                    serializableCheck: false,
                    immutableCheck: false,
                }),
        });
        fetch.mockClear();
    });

    it('should handle initial state', () => {
        const state = store.getState().jobs;
        expect(state).toEqual({
            jobs: [],
            status: 'idle',
            error: null
        });
    });

    it('should handle clearError', () => {
        store.dispatch({ type: 'jobs/fetchJobs/rejected', error: { message: 'Test error' } });
        store.dispatch(clearError());

        expect(store.getState().jobs.error).toBeNull();
    });

    describe('fetchJobs', () => {
        it('should fetch jobs successfully', async () => {
            const mockJobs = [
                { id: '1', name: 'Job 1', status: 'On Road', categories: [] },
                { id: '2', name: 'Job 2', status: 'Completed', categories: [] }
            ];

            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockJobs
            });

            await store.dispatch(fetchJobs());
            const state = store.getState().jobs;

            expect(state.status).toBe('succeeded');
            expect(state.jobs).toEqual(mockJobs);
            expect(state.error).toBeNull();
        });

        it('should use mock data when API fails', async () => {
            fetch.mockRejectedValueOnce(new Error('Network error'));

            await store.dispatch(fetchJobs());
            const state = store.getState().jobs;

            expect(state.status).toBe('succeeded');
            expect(state.jobs.length).toBeGreaterThan(0);
            expect(state.jobs[0]).toHaveProperty('name');
        });
    });

    describe('addJob', () => {
        it('should add job successfully', async () => {
            const newJob = { name: 'New Job', categories: ['Sidewalk Shed'], status: 'On Road' };
            const expectedJob = {
                id: 'mocked-uuid-value',
                ...newJob,
                categories: [{ name: 'Sidewalk Shed', items: [] }]
            };

            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => expectedJob
            });

            await store.dispatch(addJob(newJob));
            const state = store.getState().jobs;

            expect(state.jobs).toHaveLength(1);
            expect(state.jobs[0]).toMatchObject({
                name: 'New Job',
                status: 'On Road',
                categories: [{ name: 'Sidewalk Shed', items: [] }]
            });
        });

        it('should use mock behavior when API fails', async () => {
            const newJob = { name: 'New Job', categories: ['Sidewalk Shed'], status: 'On Road' };

            fetch.mockRejectedValueOnce(new Error('API Error'));

            await store.dispatch(addJob(newJob));
            const state = store.getState().jobs;

            expect(state.jobs).toHaveLength(1);
            expect(state.jobs[0].name).toBe('New Job');
        });
    });
});