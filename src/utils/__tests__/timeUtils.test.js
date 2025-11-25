import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { formatTime, formatDate, getGreeting } from '../timeUtils';
import dayjs from 'dayjs';

describe('timeUtils', () => {
  describe('formatTime', () => {
    it('should format time in 12-hour format with AM', () => {
      const date = new Date('2024-01-15T09:30:00');
      const result = formatTime(date);
      expect(result).toBe('9:30 AM');
    });

    it('should format time in 12-hour format with PM', () => {
      const date = new Date('2024-01-15T14:45:00');
      const result = formatTime(date);
      expect(result).toBe('2:45 PM');
    });

    it('should handle midnight correctly', () => {
      const date = new Date('2024-01-15T00:00:00');
      const result = formatTime(date);
      expect(result).toBe('12:00 AM');
    });

    it('should handle noon correctly', () => {
      const date = new Date('2024-01-15T12:00:00');
      const result = formatTime(date);
      expect(result).toBe('12:00 PM');
    });

    it('should pad single-digit minutes with zero', () => {
      const date = new Date('2024-01-15T09:05:00');
      const result = formatTime(date);
      expect(result).toBe('9:05 AM');
    });

    it('should handle 11:59 PM correctly', () => {
      const date = new Date('2024-01-15T23:59:00');
      const result = formatTime(date);
      expect(result).toBe('11:59 PM');
    });

    it('should work with Date objects created from timestamps', () => {
      const timestamp = 1705315800000; // Some arbitrary timestamp
      const date = new Date(timestamp);
      const result = formatTime(date);
      expect(result).toMatch(/^\d{1,2}:\d{2} (AM|PM)$/);
    });

    it('should handle edge case of 1:00 AM', () => {
      const date = new Date('2024-01-15T01:00:00');
      const result = formatTime(date);
      expect(result).toBe('1:00 AM');
    });

    it('should handle edge case of 1:00 PM', () => {
      const date = new Date('2024-01-15T13:00:00');
      const result = formatTime(date);
      expect(result).toBe('1:00 PM');
    });
  });

  describe('formatDate', () => {
    it('should format date in day-of-week, month day format', () => {
      const date = new Date('2024-01-15T12:00:00');
      const result = formatDate(date);
      expect(result).toBe('Mon Jan 15');
    });

    it('should handle different days of the week', () => {
      const dates = [
        { date: new Date('2024-01-14T12:00:00'), expected: 'Sun Jan 14' },
        { date: new Date('2024-01-15T12:00:00'), expected: 'Mon Jan 15' },
        { date: new Date('2024-01-16T12:00:00'), expected: 'Tue Jan 16' },
        { date: new Date('2024-01-17T12:00:00'), expected: 'Wed Jan 17' },
        { date: new Date('2024-01-18T12:00:00'), expected: 'Thu Jan 18' },
        { date: new Date('2024-01-19T12:00:00'), expected: 'Fri Jan 19' },
        { date: new Date('2024-01-20T12:00:00'), expected: 'Sat Jan 20' },
      ];

      dates.forEach(({ date, expected }) => {
        expect(formatDate(date)).toBe(expected);
      });
    });

    it('should handle different months', () => {
      const months = [
        { date: new Date('2024-01-15T12:00:00'), month: 'Jan' },
        { date: new Date('2024-02-15T12:00:00'), month: 'Feb' },
        { date: new Date('2024-03-15T12:00:00'), month: 'Mar' },
        { date: new Date('2024-04-15T12:00:00'), month: 'Apr' },
        { date: new Date('2024-05-15T12:00:00'), month: 'May' },
        { date: new Date('2024-06-15T12:00:00'), month: 'Jun' },
        { date: new Date('2024-07-15T12:00:00'), month: 'Jul' },
        { date: new Date('2024-08-15T12:00:00'), month: 'Aug' },
        { date: new Date('2024-09-15T12:00:00'), month: 'Sep' },
        { date: new Date('2024-10-15T12:00:00'), month: 'Oct' },
        { date: new Date('2024-11-15T12:00:00'), month: 'Nov' },
        { date: new Date('2024-12-15T12:00:00'), month: 'Dec' },
      ];

      months.forEach(({ date, month }) => {
        const result = formatDate(date);
        expect(result).toContain(month);
      });
    });

    it('should handle first day of month', () => {
      const date = new Date('2024-01-01T12:00:00');
      const result = formatDate(date);
      expect(result).toContain('Jan 1');
    });

    it('should handle last day of month', () => {
      const date = new Date('2024-01-31T12:00:00');
      const result = formatDate(date);
      expect(result).toContain('Jan 31');
    });

    it('should handle leap year date', () => {
      const date = new Date('2024-02-29T12:00:00');
      const result = formatDate(date);
      expect(result).toContain('Feb 29');
    });
  });

  describe('getGreeting', () => {
    let dateSpy;

    beforeEach(() => {
      // Create a spy for Date constructor
      dateSpy = vi.spyOn(global, 'Date');
    });

    afterEach(() => {
      dateSpy.mockRestore();
    });

    it('should return "Good morning" for early morning hours (0-4)', () => {
      const mockDate = new Date('2024-01-15T03:00:00');
      dateSpy.mockImplementation(() => mockDate);
      expect(getGreeting()).toBe('Good morning');
    });

    it('should return "Good morning" for morning hours (5-11)', () => {
      const times = [5, 6, 7, 8, 9, 10, 11];
      times.forEach(hour => {
        const mockDate = new Date(`2024-01-15T${String(hour).padStart(2, '0')}:00:00`);
        dateSpy.mockImplementation(() => mockDate);
        expect(getGreeting()).toBe('Good morning');
      });
    });

    it('should return "Good afternoon" for afternoon hours (12-17)', () => {
      const times = [12, 13, 14, 15, 16, 17];
      times.forEach(hour => {
        const mockDate = new Date(`2024-01-15T${hour}:00:00`);
        dateSpy.mockImplementation(() => mockDate);
        expect(getGreeting()).toBe('Good afternoon');
      });
    });

    it('should return "Good evening" for evening hours (18-23)', () => {
      const times = [18, 19, 20, 21, 22, 23];
      times.forEach(hour => {
        const mockDate = new Date(`2024-01-15T${hour}:00:00`);
        dateSpy.mockImplementation(() => mockDate);
        expect(getGreeting()).toBe('Good evening');
      });
    });

    it('should handle exact hour boundaries', () => {
      // Test boundary at 5:00 AM
      let mockDate = new Date('2024-01-15T04:59:59');
      dateSpy.mockImplementation(() => mockDate);
      expect(getGreeting()).toBe('Good morning');

      mockDate = new Date('2024-01-15T05:00:00');
      dateSpy.mockImplementation(() => mockDate);
      expect(getGreeting()).toBe('Good morning');

      // Test boundary at 12:00 PM
      mockDate = new Date('2024-01-15T11:59:59');
      dateSpy.mockImplementation(() => mockDate);
      expect(getGreeting()).toBe('Good morning');

      mockDate = new Date('2024-01-15T12:00:00');
      dateSpy.mockImplementation(() => mockDate);
      expect(getGreeting()).toBe('Good afternoon');

      // Test boundary at 6:00 PM
      mockDate = new Date('2024-01-15T17:59:59');
      dateSpy.mockImplementation(() => mockDate);
      expect(getGreeting()).toBe('Good afternoon');

      mockDate = new Date('2024-01-15T18:00:00');
      dateSpy.mockImplementation(() => mockDate);
      expect(getGreeting()).toBe('Good evening');
    });

    it('should handle midnight correctly', () => {
      const mockDate = new Date('2024-01-15T00:00:00');
      dateSpy.mockImplementation(() => mockDate);
      expect(getGreeting()).toBe('Good morning');
    });
  });
});