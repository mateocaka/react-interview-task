import React, { useEffect, useState } from 'react';

const ServiceFormModal = ({ onSave, onCancel, itemToEdit }) => {
    const [formData, setFormData] = useState({
        item: '',
        quantity: '',
        description: '',
        notes: '',
    });
    const [errors, setErrors] = useState({});

    const isEditMode = !!itemToEdit;

    useEffect(() => {
        if (itemToEdit) {
            setFormData({
                item: itemToEdit.item || '',
                quantity:
                    typeof itemToEdit.quantity === 'number'
                        ? String(itemToEdit.quantity)
                        : itemToEdit.quantity || '',
                description: itemToEdit.description || '',
                notes: itemToEdit.notes || '',
                nr: itemToEdit.nr,
            });
        } else {
            setFormData({
                item: '',
                quantity: '',
                description: '',
                notes: '',
            });
        }
        setErrors({});
    }, [itemToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));


        setErrors((prev) => {
            if (!prev[name]) return prev;
            const copy = { ...prev };
            delete copy[name];
            return copy;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!formData.item?.trim()) {
            newErrors.item = 'Please enter a Service name';
        }


        if (formData.quantity === '' || Number(formData.quantity) < 0 || Number.isNaN(Number(formData.quantity))) {
            newErrors.quantity = 'Please enter a valid quantity';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const submitData = {
            item: formData.item.trim(),
            quantity: Number(formData.quantity),
            description: formData.description?.trim() || '',
            notes: formData.notes?.trim() || '',
        };

        if (isEditMode && formData.nr) {
            submitData.nr = formData.nr;
        }

        onSave(submitData);
    };

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-96">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">Service Item</h2>
                        <button
                            onClick={onCancel}
                            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                            aria-label="Close modal"
                        >
                            ×
                        </button>
                    </div>

                    {   }
                    <div className="flex items-start space-x-3 mb-6 p-3 bg-blue-50 rounded-lg">
                        <div className="flex-shrink-0">
                            <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                i
                            </div>
                        </div>
                        <p className="text-sm text-gray-600">
                            Informative piece of text that can be used regarding this modal.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {   }
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">Item</label>
                            <input
                                name="item"
                                value={formData.item}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter item name"
                            />
                            {errors.item && <p className="text-red-500 text-sm mt-1">{errors.item}</p>}
                        </div>

                        {   }
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">Quantity</label>
                            <input
                                name="quantity"
                                type="number"
                                value={formData.quantity}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                min="0"
                                placeholder="Enter quantity"
                            />
                            {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
                        </div>

                        {   }
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows="3"
                                placeholder="Enter description"
                            />
                        </div>

                        {   }
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">Notes</label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows="2"
                                placeholder="Enter notes"
                            />
                        </div>

                        {   }
                        <div className="flex justify-end space-x-3 pt-6">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors flex items-center space-x-2"
                            >
                                <span>Cancel Changes</span>
                                <span>×</span>
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors flex items-center space-x-2"
                            >
                                <span>Save Changes</span>
                                <span>✓</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ServiceFormModal;
