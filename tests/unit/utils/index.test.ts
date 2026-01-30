import { describe, it, expect } from 'vitest';
import { formatCurrency, calculateDiscount, slugify, truncate, isValidEmail } from '../../../src/lib/utils';

describe('Utility Functions', () => {
    describe('formatCurrency', () => {
        it('should format numbers to IDR currency', () => {
            // Using regex because of non-breaking spaces and specific Intl formatting
            expect(formatCurrency(10000)).toMatch(/Rp\s?10\.000/);
            expect(formatCurrency(1250500)).toMatch(/Rp\s?1\.250\.500/);
        });
    });

    describe('calculateDiscount', () => {
        it('should calculate correct discount percentage', () => {
            expect(calculateDiscount(100000, 80000)).toBe(20);
            expect(calculateDiscount(50000, 25000)).toBe(50);
            expect(calculateDiscount(0, 10000)).toBe(0);
        });
    });

    describe('slugify', () => {
        it('should convert text to URL-friendly slugs', () => {
            expect(slugify('Hello World')).toBe('hello-world');
            expect(slugify('iPhone 15 Pro Max!')).toBe('iphone-15-pro-max');
            expect(slugify('  Samsung Galaxy  ')).toBe('samsung-galaxy');
        });
    });

    describe('truncate', () => {
        it('should truncate text at specified length', () => {
            expect(truncate('Hello World', 5)).toBe('Hello...');
            expect(truncate('Short', 10)).toBe('Short');
        });
    });

    describe('isValidEmail', () => {
        it('should identify valid emails', () => {
            expect(isValidEmail('test@example.com')).toBe(true);
            expect(isValidEmail('user.name@domain.co.id')).toBe(true);
        });

        it('should identify invalid emails', () => {
            expect(isValidEmail('invalid-email')).toBe(false);
            expect(isValidEmail('test@')).toBe(false);
            expect(isValidEmail('@domain.com')).toBe(false);
        });
    });
});
