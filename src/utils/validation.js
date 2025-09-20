export const validateJobData = (jobData) => {
    const errors = {};

    if (!jobData.name?.trim()) {
        errors.name = 'Project name is required';
    }

    if (!jobData.categories?.length) {
        errors.categories = 'At least one category must be selected';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

export const validateItemData = (itemData) => {
    const errors = {};

    if (!itemData.item?.trim()) {
        errors.item = 'Item name is required';
    }

    if (!itemData.quantity || itemData.quantity < 0) {
        errors.quantity = 'Valid quantity is required';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};