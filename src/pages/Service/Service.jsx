import React,{ useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
    setSelectedService,
    fetchItems,
    addItem,
    updateItem,
    clearError,
    clearSelectedService
} from '../../store/ServicesSlice.js';
import Sidebar from './Sidebar.jsx';
import ServiceTable from '../../components/Service/ServiceTable.jsx';
import ServiceFormModal from '../../components/Service/ServiceFormModal.jsx';
import NoServiceSelected from '../../components/Service/NoServiceSelected.jsx';
import ErrorBoundary from '../../components/common/ErrorBoundary.jsx';

const Service = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const { selectedService, items, status, error } = useSelector(state => state.items);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [search, setSearch] = useState('');


    useEffect(() => {
        dispatch(clearSelectedService());
    }, [dispatch]);

    const handleSelectService = (service) => {
        dispatch(clearError());
        dispatch(setSelectedService(service));
        dispatch(fetchItems(service));
    };

    const handleSaveItem = async (itemData) => {
        if (!selectedService) {
            alert('Please select a service first');
            return;
        }

        try {
            const action = itemToEdit
                ? updateItem({ service: selectedService, updatedItem: { ...itemToEdit, ...itemData } })
                : addItem({ service: selectedService, item: itemData });

            await dispatch(action).unwrap();
            handleCloseModal();
        } catch (error) {
            console.error('Error saving item:', error);
            alert(`Failed to save item: ${error.message || error}`);
        }
    };

    const handleEditItem = (item) => {
        setItemToEdit(item);
        setIsModalOpen(true);
    };

    const handleCreateItem = () => {
        if (!selectedService) {
            alert('Please select a service first');
            return;
        }
        setItemToEdit(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setItemToEdit(null);
        dispatch(clearError());
    };

    const filteredItems = items?.filter(item =>
        item.item?.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase())
    ) || [];

    if (status === 'loading') {
        return <LoadingState />;
    }

    return (
        <ErrorBoundary>
            <div className="flex min-h-screen bg-gray-50">
                <Sidebar
                    onSelectService={handleSelectService}
                    selected={selectedService}
                />

                <main className="flex-1">
                    <Header
                        selectedService={selectedService}
                        itemsCount={items?.length || 0}
                        search={search}
                        onSearchChange={setSearch}
                        onCreateItem={handleCreateItem}
                    />

                    {error && <ErrorAlert error={error} onClear={() => dispatch(clearError())} />}

                    <div className="p-6">
                        <ContentArea
                            selectedService={selectedService}
                            status={status}
                            error={error}
                            filteredItems={filteredItems}
                            items={items}
                            onEditItem={handleEditItem}
                            onRetry={() => dispatch(fetchItems(selectedService))}
                        />
                    </div>
                </main>

                {isModalOpen && (
                    <ServiceFormModal
                        onSave={handleSaveItem}
                        onCancel={handleCloseModal}
                        itemToEdit={itemToEdit}
                    />
                )}
            </div>
        </ErrorBoundary>
    );
};


const LoadingState = () => (
    <div className="flex min-h-screen bg-gray-50">
        <div className="w-64 bg-white border-r border-gray-200"></div>
        <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading items...</p>
            </div>
        </div>
    </div>
);

const Header = ({ selectedService, itemsCount, search, onSearchChange, onCreateItem }) => (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <h1 className="text-xl font-semibold text-gray-900">Data Grid</h1>


            </div>
            <div className="flex items-center space-x-4">
                <SearchInput value={search} onChange={onSearchChange} />

            </div>


        </div>
    </div>
);

const SearchInput = ({ value, onChange }) => (
    <div className="w-64">
        <input
            type="text"
            placeholder="Search items..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
    </div>
);

const CreateButton = ({ onClick }) => (
    <button
        onClick={onClick}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors flex items-center space-x-2"
    >
        <span>+</span>
        <span>Create</span>
    </button>
);

const ErrorAlert = ({ error, onClear }) => (
    <div className="mx-6 mt-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            <div className="flex justify-between items-center">
                <span className="text-sm">{error}</span>
                <button
                    onClick={onClear}
                    className="text-red-500 hover:text-red-700 text-lg"
                >
                    ×
                </button>
            </div>
        </div>
    </div>
);

const ContentArea = ({ selectedService, status, error, filteredItems, items, onEditItem, onRetry }) => {
    if (!selectedService) {
        return <NoServiceSelected />;
    }

    if (status === 'failed') {
        return <FailedState error={error} onRetry={onRetry} />;
    }

    if (filteredItems.length === 0) {
        return <EmptyState hasItems={items?.length > 0} />;
    }

    return <ServiceTable items={filteredItems} onEdit={onEditItem} />;
};

const FailedState = ({ error, onRetry }) => (
    <div className="flex flex-col items-center justify-center h-96 bg-red-50 rounded-lg border border-red-200">
        <div className="text-red-500 text-4xl mb-4">⚠️</div>
        <h3 className="text-lg font-medium text-red-900 mb-2">Error Loading Items</h3>
        <p className="text-red-700 text-sm mb-4">{error}</p>
        <button
            onClick={onRetry}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm"
        >
            Try Again
        </button>
    </div>
);

const EmptyState = ({ hasItems }) => (
    <div className="flex flex-col items-center justify-center h-96 bg-white rounded-lg border border-gray-200">
        <div className="text-center">
            <div className="text-6xl mb-4"></div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-500 text-sm">
                {hasItems ? "Try adjusting your search terms" : "Create your first item to get started"}
            </p>
        </div>
    </div>
);

export default Service;