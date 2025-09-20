import { useSelector } from 'react-redux';
import { useMemo } from 'react';

export const useAppConfig = () => {
    const { categories, statuses } = useSelector(state => state.config);

    const config = useMemo(() => ({
        categories,
        statuses,
        categoryOptions: categories.map(cat => cat.name),
        statusOptions: statuses.map(status => status.name),
        categoryColors: categories.reduce((acc, cat) => {
            acc[cat.name] = cat.color;
            return acc;
        }, {}),
        statusColors: statuses.reduce((acc, status) => {
            acc[status.name] = status.color;
            return acc;
        }, {}),
        getCategoryByName: (name) => categories.find(cat => cat.name === name),
        getStatusByName: (name) => statuses.find(status => status.name === name),
        getCategoryColor: (name) => {
            const category = categories.find(cat => cat.name === name);
            return category?.color || 'bg-gray-500 text-white';
        },
        getStatusColor: (name) => {
            const status = statuses.find(s => s.name === name);
            return status?.color || 'bg-gray-500 text-white';
        }
    }), [categories, statuses]);

    return config;
};