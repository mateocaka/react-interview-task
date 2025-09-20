import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: [
        {
            name: 'Sidewalk Shed',
            color: 'bg-green-500 text-white',
            description: 'Sidewalk protection structures'
        },
        {
            name: 'Scaffold',
            color: 'bg-amber-500 text-white',
            description: 'Temporary construction platforms'
        },
        {
            name: 'Shoring',
            color: 'bg-purple-500 text-white',
            description: 'Structural support systems'
        }
    ],
    statuses: [
        {
            name: 'On Road',
            color: 'bg-yellow-400 text-white',
            description: 'Job is currently active'
        },
        {
            name: 'Completed',
            color: 'bg-green-500 text-white',
            description: 'Job has been finished'
        },
        {
            name: 'On Hold',
            color: 'bg-red-700 text-white',
            description: 'Job is temporarily paused'
        }
    ]
};

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        addCategory: (state, action) => {
            state.categories.push(action.payload);
        },
        removeCategory: (state, action) => {
            state.categories = state.categories.filter(cat => cat.name !== action.payload);
        },
        updateCategory: (state, action) => {
            const index = state.categories.findIndex(cat => cat.name === action.payload.oldName);
            if (index !== -1) {
                state.categories[index] = { ...state.categories[index], ...action.payload.updates };
            }
        }
    }
});

export const { addCategory, removeCategory, updateCategory } = configSlice.actions;
export default configSlice.reducer;