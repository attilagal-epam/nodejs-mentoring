import * as publicHolidaysService from './public-holidays.service';
import { deHolidays, deNextHolidays } from './mocks.ts/de-holidays-2024';
import axios from 'axios';

describe('Public Holidays Service', () => {
  describe('getListOfPublicHolidays', () => {
    it('should return a list of shortened public holidays for valid year and country', async () => {
      const result = await publicHolidaysService.getListOfPublicHolidays(2024, 'DE');
      expect(result).toEqual(deHolidays);
    });

    it('should throw an error for unsupported country', async () => {  
        try {
            await publicHolidaysService.getListOfPublicHolidays(2024, 'UnsupportedCountry');
        } catch (error: any) {
            expect(error.message).toBe('Country provided is not supported, received: UnsupportedCountry');
        }
    });

    it('should throw an error for invalid year', async () => {
        try {
            await publicHolidaysService.getListOfPublicHolidays(1999, 'DE');
        } catch (error: any) {
            expect(error.message).toBe('Year provided not the current, received: 1999');
        }
    });

    it('should return an empty array on error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValue(new Error('Network Error'));
      const result = await publicHolidaysService.getListOfPublicHolidays(2024, 'DE');
      expect(result).toEqual([]);
      jest.restoreAllMocks();
    });
  });

  describe('checkIfTodayIsPublicHoliday', () => {
    it('should return true if today is a public holiday', async () => {
      const result = await publicHolidaysService.checkIfTodayIsPublicHoliday('DE');
      const isInHolidays = deHolidays.some(holiday => holiday.date === new Date().toISOString().split('T')[0]);
      expect(result).toBe(isInHolidays);
    });
  });

  describe('getNextPublicHolidays', () => {
    it('should return a list of shortened next public holidays for valid country', async () => {
      const result = await publicHolidaysService.getNextPublicHolidays('DE');
      expect(result).toEqual(deNextHolidays);
    });
  });
});