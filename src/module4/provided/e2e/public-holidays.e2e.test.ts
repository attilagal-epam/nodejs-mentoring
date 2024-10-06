import request from 'supertest';
import { PUBLIC_HOLIDAYS_API_URL } from '../config';
import { countryDodeNotFound404, deHolidays, deHolidays2024Raw, yearInvalid400 } from '../services/mocks.ts/de-holidays-2024';
import { title } from 'process';
import { trace } from 'console';

describe('Public Holidays E2E', () => {
  describe('/PublicHolidays/:year/:country', () => {
    it('should return a list of public holidays for valid year and country', async () => {
      const response = await request(PUBLIC_HOLIDAYS_API_URL)
        .get('/PublicHolidays/2024/DE')
        .expect(200);

      expect(response.body).toEqual(deHolidays2024Raw)
    })

    it('should return 404 unsupported country', async () => {
      const response = await request(PUBLIC_HOLIDAYS_API_URL)
        .get('/PublicHolidays/2024/UnsupportedCountry')
        .expect(404);

      expect(response.body).toEqual({
        status: 404,
        title: 'Not Found',
        traceId: expect.any(String),
        type: expect.any(String),
      });
    })

    it('should return 400 for invalid year', async () => {
      const response = await request(PUBLIC_HOLIDAYS_API_URL)
        .get('/PublicHolidays/invalidYear/DE')
        .expect(400)

      expect(response.body).toEqual({
        errors: {
          year: [
            "The value 'invalidYear' is not valid."
          ]
        },
        status: 400,
        title: "One or more validation errors occurred.",
        traceId: expect.any(String),
        type: expect.any(String),
      });
    })
  });
  

  describe('/IsTodayPublicHoliday/:country', () => {
    it('should return true if today is a public holiday', async () => {
      const isInHolidays = deHolidays.some(holiday => holiday.date === new Date().toISOString().split('T')[0]);
      const expectedStatus = isInHolidays ? 200 : 204;

      await request(PUBLIC_HOLIDAYS_API_URL)
        .get('/IsTodayPublicHoliday/DE')
        .expect(expectedStatus);
    });

    it('should return 404 for unsupported country', async () => {
      await request(PUBLIC_HOLIDAYS_API_URL)
        .get('/IsTodayPublicHoliday/unsupportedCountry')
        .expect(404);
    });
  });

});