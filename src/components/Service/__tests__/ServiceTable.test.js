import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ServiceTable from '../ServiceTable';

describe('ServiceTable', () => {
    const mockOnEdit = jest.fn();

    const mockItems = [
        { nr: 1, item: 'Hammer', quantity: 5, description: 'Tool for nails', notes: 'Heavy' },
        { nr: 2, item: 'Screwdriver', quantity: 10, description: 'Flat head', notes: '' },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders empty state when no items are provided', () => {
        render(<ServiceTable items={[]} onEdit={mockOnEdit} />);

        expect(screen.getByText('No items found')).toBeInTheDocument();
        expect(screen.getByText('Create your first item to get started')).toBeInTheDocument();
        expect(screen.getByRole('img', { name: 'Empty box' })).toBeInTheDocument();
    });

    it('renders all table headers from TABLE_COLUMNS', () => {
        render(<ServiceTable items={mockItems} onEdit={mockOnEdit} />);

        expect(screen.getByRole('table', { name: 'Service items' })).toBeInTheDocument();

        const headers = ['Nr.', 'Item', 'Quantity', 'Description', 'Notes'];
        headers.forEach(header => {
            expect(screen.getByText(header)).toBeInTheDocument();
        });
    });

    it('renders table rows with item data', () => {
        render(<ServiceTable items={mockItems} onEdit={mockOnEdit} />);

        mockItems.forEach(item => {
            expect(screen.getByText(item.item)).toBeInTheDocument();
            expect(screen.getByText(item.quantity.toString())).toBeInTheDocument();
        });
    });

    it('calls onEdit when a row is clicked', () => {
        render(<ServiceTable items={mockItems} onEdit={mockOnEdit} />);

        const row = screen.getByLabelText(`Edit item ${mockItems[0].item}`);
        fireEvent.click(row);

        expect(mockOnEdit).toHaveBeenCalledWith(mockItems[0]);
    });

    it('calls onEdit when pressing Enter on a row', () => {
        render(<ServiceTable items={mockItems} onEdit={mockOnEdit} />);

        const row = screen.getByLabelText(`Edit item ${mockItems[0].item}`);
        fireEvent.keyDown(row, { key: 'Enter' });

        expect(mockOnEdit).toHaveBeenCalledWith(mockItems[0]);
    });

    it('truncates long text and sets title attribute', () => {
        const longDescription = 'a'.repeat(100);
        const longNotes = 'b'.repeat(80);

        const item = { nr: 3, item: 'Wrench', quantity: 2, description: longDescription, notes: longNotes };

        render(<ServiceTable items={[item]} onEdit={mockOnEdit} />);

        const descriptionCell = screen.getByTitle(longDescription);
        const notesCell = screen.getByTitle(longNotes);

        expect(descriptionCell).toBeInTheDocument();
        expect(notesCell).toBeInTheDocument();
    });
});
