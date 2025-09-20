
import React from "react";
export const createMockItem = (overrides = {}) => ({
    item: 'MockItem',
    quantity: 1,
    description: 'Test description',
    notes: 'Test notes',
    ...overrides
});


import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

export const renderWithProviders = (
    ui,
    {
        preloadedState = {},
        store = configureStore({ reducer: (state) => state, preloadedState }),
        ...renderOptions
    } = {}
) => {
    const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
    return render(ui, { wrapper: Wrapper, ...renderOptions });
};
