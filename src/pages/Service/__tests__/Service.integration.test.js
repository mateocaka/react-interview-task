
import React from 'react';
import { render, screen } from '@testing-library/react';
import ServiceFormModal from '../../../components/Service/ServiceFormModal';
import { createMockItem } from '../../../utils/testUtils';

const mockOnSave = jest.fn();
const mockOnCancel = jest.fn();

describe('ServiceFormModal', () => {
    it('renders edit mode with pre-filled data', () => {
        const mockItem = createMockItem({
            item: 'TestItem',
            quantity: 5
        });

        render(
            <ServiceFormModal
                onSave={mockOnSave}
                onCancel={mockOnCancel}
                itemToEdit={mockItem}
            />
        );

        expect(screen.getByDisplayValue('TestItem')).toBeInTheDocument();
        expect(screen.getByDisplayValue('5')).toBeInTheDocument();
    });
});
