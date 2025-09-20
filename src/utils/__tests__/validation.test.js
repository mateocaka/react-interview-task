import { validateJobData, validateItemData } from '../validation';

describe('validation utilities', () => {
    describe('validateJobData', () => {
        it('should validate correct job data', () => {
            const validJob = {
                name: 'Test Job',
                categories: ['Sidewalk Shed'],
                status: 'On Road'
            };

            const result = validateJobData(validJob);

            expect(result.isValid).toBe(true);
            expect(result.errors).toEqual({});
        });

        it('should reject job without name', () => {
            const invalidJob = {
                name: '',
                categories: ['Sidewalk Shed'],
                status: 'On Road'
            };

            const result = validateJobData(invalidJob);

            expect(result.isValid).toBe(false);
            expect(result.errors.name).toBe('Project name is required');
        });

        it('should reject job without categories', () => {
            const invalidJob = {
                name: 'Test Job',
                categories: [],
                status: 'On Road'
            };

            const result = validateJobData(invalidJob);

            expect(result.isValid).toBe(false);
            expect(result.errors.categories).toBe('At least one category must be selected');
        });

        it('should handle multiple validation errors', () => {
            const invalidJob = {
                name: '   ',
                categories: [],
                status: 'On Road'
            };

            const result = validateJobData(invalidJob);

            expect(result.isValid).toBe(false);
            expect(result.errors.name).toBe('Project name is required');
            expect(result.errors.categories).toBe('At least one category must be selected');
        });
    });

    describe('validateItemData', () => {
        it('should validate correct item data', () => {
            const validItem = {
                item: 'Test Item',
                quantity: 10,
                description: 'Test description'
            };

            const result = validateItemData(validItem);

            expect(result.isValid).toBe(true);
            expect(result.errors).toEqual({});
        });

        it('should reject item without name', () => {
            const invalidItem = {
                item: '',
                quantity: 10,
                description: 'Test description'
            };

            const result = validateItemData(invalidItem);

            expect(result.isValid).toBe(false);
            expect(result.errors.item).toBe('Item name is required');
        });

        it('should reject item with invalid quantity', () => {
            const invalidItem = {
                item: 'Test Item',
                quantity: -5,
                description: 'Test description'
            };

            const result = validateItemData(invalidItem);

            expect(result.isValid).toBe(false);
            expect(result.errors.quantity).toBe('Valid quantity is required');
        });

        it('should reject item with zero quantity', () => {
            const invalidItem = {
                item: 'Test Item',
                quantity: 0,
                description: 'Test description'
            };

            const result = validateItemData(invalidItem);

            expect(result.isValid).toBe(false);
            expect(result.errors.quantity).toBe('Valid quantity is required');
        });
    });
});
