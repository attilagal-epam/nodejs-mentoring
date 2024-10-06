import axios from 'axios';
import { getListOfPublicHolidays, checkIfTodayIsPublicHoliday, getNextPublicHolidays } from './public-holidays.service';
import { validateInput, shortenPublicHoliday } from '../helpers';
import { PublicHoliday } from '../types';

jest.mock('axios');
jest.mock('../helpers');

describe('Public Holidays Service', () => {
  const mockPublicHoliday: PublicHoliday = {
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getListOfPublicHolidays', () => {
    it('should return a list of shortened public holidays for valid year and country', async () => {
      (axios.get as jest.Mock).mockResolvedValue({ data: [mockPublicHoliday] });
      (shortenPublicHoliday as jest.Mock).mockReturnValue({
        name: 'New Year\'s Day',
        localName: 'Neujahrstag',
        date: '2023-01-01',
      });

      const result = await getListOfPublicHolidays(2023, 'DE');
      expect(validateInput).toHaveBeenCalledWith({ year: 2023, country: 'DE' });
      expect(result).toEqual([{
        name: 'New Year\'s Day',
        localName: 'Neujahrstag',
        date: '2023-01-01',
      }]);
    });

    it('should return an empty array on error', async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error('Network Error'));

      const result = await getListOfPublicHolidays(2023, 'DE');
      expect(result).toEqual([]);
    });
  });

  describe('checkIfTodayIsPublicHoliday', () => {
    it('should return true if today is a public holiday', async () => {
      (axios.get as jest.Mock).mockResolvedValue({ status: 200 });

      const result = await checkIfTodayIsPublicHoliday('DE');
      expect(validateInput).toHaveBeenCalledWith({ country: 'DE' });
      expect(result).toBe(true);
    });

    it('should return false on error', async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error('Network Error'));

      const result = await checkIfTodayIsPublicHoliday('DE');
      expect(result).toBe(false);
    });
  });

  describe('getNextPublicHolidays', () => {
    it('should return a list of shortened next public holidays for valid country', async () => {
      (axios.get as jest.Mock).mockResolvedValue({ data: [mockPublicHoliday] });
      (shortenPublicHoliday as jest.Mock).mockReturnValue({
        name: 'New Year\'s Day',
        localName: 'Neujahrstag',
        date: '2023-01-01',
      });

      const result = await getNextPublicHolidays('DE');
      expect(validateInput).toHaveBeenCalledWith({ country: 'DE' });
      expect(result).toEqual([{
        name: 'New Year\'s Day',
        localName: 'Neujahrstag',
        date: '2023-01-01',
      }]);
    });

    it('should return an empty array on error', async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error('Network Error'));

      const result = await getNextPublicHolidays('DE');
      expect(result).toEqual([]);
    });
  });
});