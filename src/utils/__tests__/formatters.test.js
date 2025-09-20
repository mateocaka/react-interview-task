import { formatJobId, formatItemCount, truncateText } from '../formatters';

describe('formatter utilities', () => {
    describe('formatJobId', () => {
        it('should truncate long job IDs', () => {
            const longId = '52281104-754c-4da5-8b07-06f9425c66e6';
            const result = formatJobId(longId);

            expect(result).toBe('52281104...');
        });

        it('should keep short job IDs unchanged', () => {
            const shortId = '12345';
            const result = formatJobId(shortId);

            expect(result).toBe('12345');
        });

        it('should handle exactly 8 character IDs', () => {
            const eightCharId = '12345678';
            const result = formatJobId(eightCharId);

            expect(result).toBe('12345678');
        });
    });

    describe('formatItemCount', () => {
        it('should handle singular count', () => {
            expect(formatItemCount(1)).toBe('1 item');
        });

        it('should handle plural count', () => {
            expect(formatItemCount(5)).toBe('5 items');
            expect(formatItemCount(0)).toBe('0 items');
            expect(formatItemCount(100)).toBe('100 items');
        });
    });

    describe('truncateText', () => {
        it('should truncate long text', () => {
            const longText = 'This is a very long text that should be truncated';
            const result = truncateText(longText, 20);

            expect(result).toBe('This is a very long ...');
        });

        it('should keep short text unchanged', () => {
            const shortText = 'Short text';
            const result = truncateText(shortText, 20);

            expect(result).toBe('Short text');
        });

        it('should handle empty text', () => {
            expect(truncateText('', 20)).toBe('');
            expect(truncateText(null, 20)).toBe('');
            expect(truncateText(undefined, 20)).toBe('');
        });

        it('should use default maxLength', () => {
            const longText = 'a'.repeat(60);
            const result = truncateText(longText);

            expect(result).toHaveLength(53); // 50 chars + '...'
        });
    });
});