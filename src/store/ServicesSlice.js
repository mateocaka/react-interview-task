import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const API_BASE_URL = 'http://localhost:3001';
const MOCK_ITEMS = [
    { nr: 1, item: 'G42295', quantity: 10, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { nr: 2, item: 'M721', quantity: 83, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { nr: 3, item: 'M94796', quantity: 31, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { nr: 4, item: 'S25907', quantity: 47, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { nr: 5, item: 'A68446', quantity: 52, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { nr: 6, item: 'F3786', quantity: 10, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { nr: 7, item: 'R69895', quantity: 30, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { nr: 8, item: 'A29259', quantity: 32, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { nr: 9, item: 'A41878', quantity: 16, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { nr: 10, item: 'A37244', quantity: 13, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { nr: 11, item: 'M89319', quantity: 10, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
];


const createApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;

const createMockData = (service) => ({
    items: MOCK_ITEMS.map(item => ({
        ...item,
        item: `${service}_${item.item}`
    }))
});


export const fetchItems = createAsyncThunk(
    'items/fetchItems',
    async (service, { rejectWithValue }) => {
        try {
            const response = await fetch(createApiUrl(`/inventory/${encodeURIComponent(service)}`));

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.warn(`Failed to fetch items for ${service}, using mock data`);
            return createMockData(service);
        }
    }
);

export const addItem = createAsyncThunk(
    'items/addItem',
    async ({ service, item }, { getState, rejectWithValue }) => {
        try {
            const response = await fetch(createApiUrl('/inventory'));

            if (!response.ok) {
                throw new Error('Failed to fetch inventory');
            }

            const categories = await response.json();
            const category = categories[service];

            if (!category) {
                throw new Error('Category not found');
            }

            const newItem = {
                nr: category.items.length + 1,
                ...validateItemData(item)
            };

            category.items.push(newItem);

            const patchResponse = await fetch(createApiUrl('/inventory'), {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ [service]: category }),
            });

            if (!patchResponse.ok) {
                throw new Error('Failed to update inventory');
            }

            const updated = await patchResponse.json();
            return updated[service].items;
        } catch (error) {
            console.warn(`Failed to add item to ${service}, using mock behavior`);
            return handleMockAddItem(getState(), item);
        }
    }
);

export const updateItem = createAsyncThunk(
    'items/updateItem',
    async ({ service, updatedItem }, { getState, rejectWithValue }) => {
        try {
            const response = await fetch(createApiUrl('/inventory'));

            if (!response.ok) {
                throw new Error('Failed to fetch inventory');
            }

            const categories = await response.json();
            const category = categories[service];

            if (!category) {
                throw new Error('Category not found');
            }

            const itemIndex = category.items.findIndex(item => item.nr === updatedItem.nr);

            if (itemIndex === -1) {
                throw new Error('Item not found');
            }

            category.items[itemIndex] = validateItemData(updatedItem);

            const patchResponse = await fetch(createApiUrl('/inventory'), {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ [service]: category }),
            });

            if (!patchResponse.ok) {
                throw new Error('Failed to update inventory');
            }

            const updated = await patchResponse.json();
            return updated[service].items;
        } catch (error) {
            console.warn(`Failed to update item in ${service}, using mock behavior`);
            return handleMockUpdateItem(getState(), updatedItem);
        }
    }
);


const validateItemData = (item) => ({
    item: item.item || 'New Item',
    quantity: Number(item.quantity) || 0,
    description: item.description || '',
    notes: item.notes || '',
    ...(item.nr && { nr: item.nr })
});

const handleMockAddItem = (state, item) => {
    const currentItems = state.items.items || [];
    const newItem = {
        nr: currentItems.length + 1,
        ...validateItemData(item)
    };
    return [...currentItems, newItem];
};

const handleMockUpdateItem = (state, updatedItem) => {
    const currentItems = state.items.items || [];
    return currentItems.map(item =>
        item.nr === updatedItem.nr ? { ...item, ...validateItemData(updatedItem) } : item
    );
};


const initialState = {
    selectedService: null,
    items: [],
    status: 'idle',
    error: null,
};


const servicesSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setSelectedService: (state, action) => {
            state.selectedService = action.payload;


            if (action.payload === null) {
                state.items = [];
                state.status = 'idle';
                state.error = null;
            }
        },

        clearError: (state) => {
            state.error = null;
        },

        clearSelectedService: (state) => {
            state.selectedService = null;
            state.items = [];
            state.status = 'idle';
            state.error = null;
        },

        resetState: () => initialState,
    },

    extraReducers: (builder) => {
        builder

            .addCase(fetchItems.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.items || [];
                state.error = null;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error?.message || 'Failed to fetch items';
            })


            .addCase(addItem.pending, (state) => {
                state.error = null;
            })
            .addCase(addItem.fulfilled, (state, action) => {
                state.items = action.payload || [];
                state.error = null;
            })
            .addCase(addItem.rejected, (state, action) => {
                state.error = action.payload || 'Failed to add item';
            })


            .addCase(updateItem.pending, (state) => {
                state.error = null;
            })
            .addCase(updateItem.fulfilled, (state, action) => {
                state.items = action.payload || [];
                state.error = null;
            })
            .addCase(updateItem.rejected, (state, action) => {
                state.error = action.payload || 'Failed to update item';
            });
    },
});


export const selectSelectedService = (state) => state.items.selectedService;
export const selectItems = (state) => state.items.items;
export const selectItemsStatus = (state) => state.items.status;
export const selectItemsError = (state) => state.items.error;


export const {
    setSelectedService,
    clearError,
    clearSelectedService,
    resetState
} = servicesSlice.actions;


export default servicesSlice.reducer;