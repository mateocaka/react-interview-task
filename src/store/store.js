import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './jobsSlice';
import itemsReducer from './servicesSlice';
import configReducer from './configSlice';

const store = configureStore({
    reducer: {
        jobs: jobsReducer,
        items: itemsReducer,
        config: configReducer,
    },
});

export default store;