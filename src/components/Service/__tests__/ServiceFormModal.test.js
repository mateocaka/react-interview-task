import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ServiceFormModal from '../ServiceFormModal';
import { createMockItem } from '../../../utils/testUtils';

describe('ServiceFormModal', () => {
    const mockOnSave = jest.fn();
    const mockOnCancel = jest.fn();
    const user = userEvent.setup();

    beforeEach(() => {
        mockOnSave.mockClear();
        mockOnCancel.mockClear();
    });

    it('renders create mode correctly', () => {
        render(<ServiceFormModal onSave={mockOnSave} onCancel={mockOnCancel} itemToEdit={null} />);

        expect(screen.getByText('Service Item')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter item name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter quantity')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter description')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter notes')).toBeInTheDocument();
    });

    it('renders edit mode with pre-filled data', () => {
        const mockItem = createMockItem();

        render(<ServiceFormModal onSave={mockOnSave} onCancel={mockOnCancel} itemToEdit={mockItem} />);

        expect(screen.getByDisplayValue(mockItem.item)).toBeInTheDocument();
        expect(screen.getByDisplayValue(String(mockItem.quantity))).toBeInTheDocument();
        expect(screen.getByDisplayValue(mockItem.description)).toBeInTheDocument();
        expect(screen.getByDisplayValue(mockItem.notes)).toBeInTheDocument();
    });

    it('validates required fields', async () => {
        render(<ServiceFormModal onSave={mockOnSave} onCancel={mockOnCancel} itemToEdit={null} />);

        const saveButton = screen.getByRole('button', { name: /save changes/i });
        await user.click(saveButton);

        await waitFor(() => {
            expect(screen.getByText('Please enter a Service name')).toBeInTheDocument();
            expect(screen.getByText('Please enter a valid quantity')).toBeInTheDocument();
        });

        expect(mockOnSave).not.toHaveBeenCalled();
    });

    it('submits valid form data', async () => {
        render(<ServiceFormModal onSave={mockOnSave} onCancel={mockOnCancel} itemToEdit={null} />);

        await user.type(screen.getByPlaceholderText('Enter item name'), 'Test Item');
        await user.type(screen.getByPlaceholderText('Enter quantity'), '10');
        await user.type(screen.getByPlaceholderText('Enter description'), 'Test description');

        const saveButton = screen.getByRole('button', { name: /save changes/i });
        await user.click(saveButton);

        await waitFor(() => {
            expect(mockOnSave).toHaveBeenCalledWith({
                item: 'Test Item',
                quantity: 10,
                description: 'Test description',
                notes: '',
            });
        });
    });

    it('calls onCancel when cancel button is clicked', async () => {
        render(<ServiceFormModal onSave={mockOnSave} onCancel={mockOnCancel} itemToEdit={null} />);

        const cancelButton = screen.getByRole('button', { name: /cancel changes/i });
        await user.click(cancelButton);

        expect(mockOnCancel).toHaveBeenCalled();
    });

    it('calls onCancel when close button is clicked', async () => {
        render(<ServiceFormModal onSave={mockOnSave} onCancel={mockOnCancel} itemToEdit={null} />);

        const closeButton = screen.getByLabelText('Close modal');
        await user.click(closeButton);

        expect(mockOnCancel).toHaveBeenCalled();
    });

    it('clears validation errors when user starts typing', async () => {
        render(<ServiceFormModal onSave={mockOnSave} onCancel={mockOnCancel} itemToEdit={null} />);


        const saveButton = screen.getByRole('button', { name: /save changes/i });
        await user.click(saveButton);

        await waitFor(() => {
            expect(screen.getByText('Please enter a Service name')).toBeInTheDocument();
        });


        const itemInput = screen.getByPlaceholderText('Enter item name');
        await user.type(itemInput, 'Test');

        await waitFor(() => {
            expect(screen.queryByText('Please enter a Service name')).not.toBeInTheDocument();
        });
    });
});
