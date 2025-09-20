import React from 'react';

const TABLE_COLUMNS = [
    { key: 'nr', label: 'Nr.', width: 'w-16' },
    { key: 'item', label: 'Item', width: 'w-32' },
    { key: 'quantity', label: 'Quantity', width: 'w-24' },
    { key: 'description', label: 'Description', width: 'flex-1' },
    { key: 'notes', label: 'Notes', width: 'flex-1' },
];

const ServiceTable = ({ items = [], onEdit }) => {
    if (!items.length) {
        return <EmptyTable />;
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
                <table className="min-w-full" role="table" aria-label="Service items">
                    <TableHeader />
                    <TableBody items={items} onEdit={onEdit} />
                </table>
            </div>
        </div>
    );
};

const EmptyTable = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
            <div className="text-6xl mb-4" role="img" aria-label="Empty box">📦</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-500">Create your first item to get started</p>
        </div>
    </div>
);

const TableHeader = () => (
    <thead>
    <tr className="border-b border-gray-200">
        {TABLE_COLUMNS.map(column => (
            <th
                key={column.key}
                className="px-6 py-4 text-left text-sm font-medium text-gray-900"
                scope="col"
            >
                {column.label}
            </th>
        ))}
    </tr>
    </thead>
);

const TableBody = ({ items, onEdit }) => (
    <tbody>
    {items.map(item => (
        <TableRow
            key={item.nr}
            item={item}
            onEdit={onEdit}
        />
    ))}
    </tbody>
);

const TableRow = ({ item, onEdit }) => (
    <tr
        className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
        onClick={() => onEdit(item)}
        role="button"
        tabIndex={0}
        aria-label={`Edit item ${item.item}`}
        onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onEdit(item);
            }
        }}
    >
        <TableCell value={item.nr} className="font-medium" />
        <TableCell value={item.item} className="font-medium" />
        <TableCell value={item.quantity} />
        <TableCell
            value={item.description}
            className="max-w-md"
            truncate
            title={item.description}
        />
        <TableCell
            value={item.notes || '-'}
            className="max-w-md text-gray-600"
            truncate
            title={item.notes}
        />
    </tr>
);

const TableCell = ({ value, className = '', truncate = false, title }) => (
    <td className="px-6 py-4">
        <div className={`text-sm text-gray-900 ${className}`}>
            {truncate ? (
                <div className="truncate" title={title}>
                    {value}
                </div>
            ) : (
                value
            )}
        </div>
    </td>
);

export default ServiceTable;