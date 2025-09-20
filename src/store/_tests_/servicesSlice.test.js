import { configureStore } from '@reduxjs/toolkit';
import servicesReducer, {
    setSelectedService,
    clearError,
    clearSelectedService,
    fetchItems,
    addItem,
    updateItem
} from '../servicesSlice';

describe('servicesSlice', () => {
    let store;

    beforeEach(() => {
        store = configureStore({
            reducer: { items: servicesReducer }
        });
        fetch.mockClear();
    });

    describe('synchronous actions', () => {
        it('should handle setSelectedService', () => {
            store.dispatch(setSelectedService('Sidewalk Shed'));

            const state = store.getState().items;
            expect(state.selectedService).toBe('Sidewalk Shed');
        });

        it('should clear items when setting service to null', () => {

            store.dispatch(setSelectedService('Sidewalk Shed'));
            expect(store.getState().items.selectedService).toBe('Sidewalk Shed');


            store.dispatch(setSelectedService(null));
            const state = store.getState().items;

            expect(state.selectedService).toBeNull();
            expect(state.items).toEqual([]);
            expect(state.status).toBe('idle');
        });

        it('should handle clearError', () => {

            store.dispatch({ type: 'items/fetchItems/rejected', error: { message: 'Test error' } });
            expect(store.getState().items.error).toBe('Test error');


            store.dispatch(clearError());
            expect(store.getState().items.error).toBeNull();
        });

        it('should handle clearSelectedService', () => {

            store.dispatch(setSelectedService('Scaffold'));
            store.dispatch({
                type: 'items/fetchItems/fulfilled',
                payload: { items: [{ nr: 1, item: 'Test' }] }
            });


            store.dispatch(clearSelectedService());
            const state = store.getState().items;

            expect(state.selectedService).toBeNull();
            expect(state.items).toEqual([]);
            expect(state.status).toBe('idle');
            expect(state.error).toBeNull();
        });
    });

    describe('fetchItems async action', () => {
        it('should handle fetchItems.pending', () => {
            store.dispatch({ type: fetchItems.pending.type });
            const state = store.getState().items;

            expect(state.status).toBe('loading');
            expect(state.error).toBeNull();
        });

        it('should handle fetchItems.fulfilled', () => {
            const mockItems = [
                { nr: 1, item: 'Test Item 1', quantity: 10 },
                { nr: 2, item: 'Test Item 2', quantity: 20 }
            ];

            store.dispatch({
                type: fetchItems.fulfilled.type,
                payload: { items: mockItems }
            });

            const state = store.getState().items;
            expect(state.status).toBe('succeeded');
            expect(state.items).toEqual(mockItems);
            expect(state.error).toBeNull();
        });

        it('should handle fetchItems.rejected', () => {
            store.dispatch({
                type: fetchItems.rejected.type,
                error: { message: 'Network error' }
            });

            const state = store.getState().items;
            expect(state.status).toBe('failed');
            expect(state.error).toBe('Network error');
        });

        it('should fetch items successfully', async () => {
            const mockResponse = {
                items: [{ nr: 1, item: 'G42295', quantity: 10 }]
            };

            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse
            });

            await store.dispatch(fetchItems('Sidewalk Shed'));
            const state = store.getState().items;

            expect(state.status).toBe('succeeded');
            expect(state.items).toEqual(mockResponse.items);
        });

        it('should use mock data when fetch fails', async () => {
            fetch.mockRejectedValueOnce(new Error('Network error'));

            await store.dispatch(fetchItems('Sidewalk Shed'));
            const state = store.getState().items;

            expect(state.status).toBe('succeeded');
            expect(state.items).toHaveLength(11);
            expect(state.items[0].item).toContain('G42295');
        });
    });

    describe('addItem async action', () => {
        it('should add item successfully', async () => {
            const newItem = { item: 'New Item', quantity: 5, description: 'New desc' };
            const mockResponse = [
                { nr: 1, item: 'Existing', quantity: 10 },
                { nr: 2, ...newItem }
            ];

            fetch
                .mockResolvedValueOnce({
                    ok: true,
                    json: async () => ({ 'Sidewalk Shed': { items: [{ nr: 1, item: 'Existing', quantity: 10 }] } })
                })
                .mockResolvedValueOnce({
                    ok: true,
                    json: async () => ({ 'Sidewalk Shed': { items: mockResponse } })
                });

            await store.dispatch(addItem({ service: 'Sidewalk Shed', item: newItem }));
            const state = store.getState().items;

            expect(state.items).toEqual(mockResponse);
        });

        it('should use mock behavior when API fails', async () => {

            store.dispatch({
                type: fetchItems.fulfilled.type,
                payload: { items: [{ nr: 1, item: 'Existing', quantity: 10 }] }
            });

            fetch.mockRejectedValueOnce(new Error('API Error'));

            const newItem = { item: 'New Item', quantity: 5 };
            await store.dispatch(addItem({ service: 'Sidewalk Shed', item: newItem }));

            const state = store.getState().items;
            expect(state.items).toHaveLength(2);
            expect(state.items[1].item).toBe('New Item');
            expect(state.items[1].nr).toBe(2);
        });
    });
});