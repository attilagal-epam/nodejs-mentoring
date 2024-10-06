import { validateInput, shortenPublicHoliday } from './helpers';
import { SUPPORTED_COUNTRIES } from './config';
import { PublicHoliday } from './types';

describe('helpers', () => {
    describe('validateInput', () => {
    it('should return true for valid country and year', () => {
        const input = { year: new Date().getFullYear(), country: SUPPORTED_COUNTRIES[0] };
        expect(validateInput(input)).toBe(true);
    });

    it('should throw an error for unsupported country', () => {
        const input = { year: new Date().getFullYear(), country: 'UnsupportedCountry' };
        expect(() => validateInput(input)).toThrow('Country provided is not supported, received: UnsupportedCountry');
    });

    it('should throw an error for invalid year', () => {
        const input = { year: 1999, country: SUPPORTED_COUNTRIES[0] };
        expect(() => validateInput(input)).toThrow('Year provided not the current, received: 1999');
    });
    });

    describe('shortenPublicHoliday', () => {
    it('should return a shortened public holiday object', () => {
        const holiday: PublicHoliday = {
        name: 'New Year\'s Day',
        localName: 'Neujahrstag',
        date: '2023-01-01',
        countryCode: 'DE',
        fixed: true,
        global: true,
        counties: null,
        launchYear: 1967,
        types: ['Public'],
        };

        const expected = {
        name: 'New Year\'s Day',
        localName: 'Neujahrstag',
        date: '2023-01-01',
        };

        expect(shortenPublicHoliday(holiday)).toEqual(expected);
    });
    });
});