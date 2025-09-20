import React,{ useState, useEffect } from 'react';
import { useAppConfig } from '../../hooks/useAppConfig';
import { validateJobData } from '../../utils/validation';
import { ModalHeader, InfoMessage, NameField, StatusSelect, FormActions } from './JobFormComponents';
import { CategoryDropdown } from './CategoryDropdown';
const JobFormModal = ({ onSave, onCancel, jobToEdit, isEditMode }) => {
    const config = useAppConfig();
    const [formData, setFormData] = useState({
        name: '',
        categories: [],
        status: config.statusOptions[0] || 'On Road',
    });
    const [errors, setErrors] = useState({});
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const defaultStatus = config.statusOptions[0] || 'On Road';

        if (isEditMode && jobToEdit) {
            setFormData({
                name: jobToEdit.name || '',
                categories: jobToEdit.categories?.map(c => c.name || c) || [],
                status: jobToEdit.status || defaultStatus,
            });
        } else {
            setFormData({ name: '', categories: [], status: defaultStatus });
            setErrors({});
        }
    }, [isEditMode, jobToEdit, config.statusOptions]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleCategoryToggle = (category) => {
        const newCategories = formData.categories.includes(category)
            ? formData.categories.filter(c => c !== category)
            : [...formData.categories, category];

        setFormData(prev => ({ ...prev, categories: newCategories }));
        if (errors.categories) {
            setErrors(prev => ({ ...prev, categories: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validation = validateJobData(formData);

        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        onSave({
            name: formData.name.trim(),
            status: formData.status,
            categories: formData.categories
        });
    };

    return (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="p-6">
                    <ModalHeader
                        title={isEditMode ? 'Edit Project' : 'Create New Project'}
                        onClose={onCancel}
                    />
                    <InfoMessage />

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <NameField
                            value={formData.name}
                            onChange={handleInputChange}
                            error={errors.name}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <CategoryDropdown
                                categories={formData.categories}
                                config={config}
                                isOpen={isDropdownOpen}
                                onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
                                onCategoryToggle={handleCategoryToggle}
                                error={errors.categories}
                            />

                            <StatusSelect
                                value={formData.status}
                                options={config.statusOptions}
                                onChange={handleInputChange}
                            />
                        </div>

                        <FormActions onCancel={onCancel} isEditMode={isEditMode} />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JobFormModal;
