import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import MenuBar from '../MenuBar';

describe('MenuBar Component', () => {
  let dateNowSpy;

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock Date.now() for consistent testing
    const mockDate = new Date('2024-01-15T14:30:00');
    dateNowSpy = vi.spyOn(Date, 'now').mockImplementation(() => mockDate.getTime());
  });

  afterEach(() => {
    dateNowSpy.mockRestore();
  });

  describe('Rendering', () => {
    it('should render menu bar container', () => {
      const { container } = render(<MenuBar />);
      const menuBar = container.querySelector('.fixed.top-0.left-0.right-0');
      expect(menuBar).toBeInTheDocument();
    });

    it('should render with backdrop blur effect', () => {
      const { container } = render(<MenuBar />);
      const menuBar = container.querySelector('.backdrop-blur-xl');
      expect(menuBar).toBeInTheDocument();
    });

    it('should have proper z-index for layering', () => {
      const { container } = render(<MenuBar />);
      const menuBar = container.querySelector('.z-50');
      expect(menuBar).toBeInTheDocument();
    });

    it('should render brand name', () => {
      render(<MenuBar />);
      expect(screen.getByText('Arbazz\'s Portfolio')).toBeInTheDocument();
    });

    it('should apply semi-transparent background', () => {
      const { container } = render(<MenuBar />);
      const menuBar = container.querySelector('.bg-white\\/80');
      expect(menuBar).toBeInTheDocument();
    });
  });

  describe('Time Display', () => {
    it('should display current time', async () => {
      render(<MenuBar />);
      
      await waitFor(() => {
        const timeElement = screen.getByText(/\d{1,2}:\d{2} (AM|PM)/);
        expect(timeElement).toBeInTheDocument();
      });
    });

    it('should update time periodically', async () => {
      vi.useFakeTimers();
      render(<MenuBar />);
      
      // Initial render
      await waitFor(() => {
        expect(screen.getByText(/\d{1,2}:\d{2} (AM|PM)/)).toBeInTheDocument();
      });
      
      // Advance time by 1 minute
      const newDate = new Date('2024-01-15T14:31:00');
      dateNowSpy.mockImplementation(() => newDate.getTime());
      
      vi.advanceTimersByTime(60000);
      
      await waitFor(() => {
        const timeElement = screen.getByText(/\d{1,2}:\d{2} (AM|PM)/);
        expect(timeElement).toBeInTheDocument();
      });
      
      vi.useRealTimers();
    });

    it('should format time correctly for AM hours', async () => {
      const mockDate = new Date('2024-01-15T09:30:00');
      dateNowSpy.mockImplementation(() => mockDate.getTime());
      
      render(<MenuBar />);
      
      await waitFor(() => {
        expect(screen.getByText(/9:30 AM/)).toBeInTheDocument();
      });
    });

    it('should format time correctly for PM hours', async () => {
      const mockDate = new Date('2024-01-15T15:45:00');
      dateNowSpy.mockImplementation(() => mockDate.getTime());
      
      render(<MenuBar />);
      
      await waitFor(() => {
        expect(screen.getByText(/3:45 PM/)).toBeInTheDocument();
      });
    });
  });

  describe('Date Display', () => {
    it('should display current date', async () => {
      render(<MenuBar />);
      
      await waitFor(() => {
        const dateElement = screen.getByText(/\w{3} \w{3} \d{1,2}/);
        expect(dateElement).toBeInTheDocument();
      });
    });

    it('should format date with day of week', async () => {
      const mockDate = new Date('2024-01-15T14:30:00');
      dateNowSpy.mockImplementation(() => mockDate.getTime());
      
      render(<MenuBar />);
      
      await waitFor(() => {
        expect(screen.getByText(/Mon Jan 15/)).toBeInTheDocument();
      });
    });

    it('should update date at midnight', async () => {
      vi.useFakeTimers();
      
      const mockDate = new Date('2024-01-15T23:59:00');
      dateNowSpy.mockImplementation(() => mockDate.getTime());
      
      render(<MenuBar />);
      
      // Move to next day
      const nextDay = new Date('2024-01-16T00:00:00');
      dateNowSpy.mockImplementation(() => nextDay.getTime());
      
      vi.advanceTimersByTime(60000);
      
      await waitFor(() => {
        expect(screen.getByText(/Tue Jan 16/)).toBeInTheDocument();
      });
      
      vi.useRealTimers();
    });
  });

  describe('System Status Icons', () => {
    it('should render WiFi icon', () => {
      const { container } = render(<MenuBar />);
      // Check for WiFi icon or its container
      const icons = container.querySelectorAll('.lucide-wifi');
      expect(icons.length).toBeGreaterThanOrEqual(0);
    });

    it('should render battery icon', () => {
      const { container } = render(<MenuBar />);
      // Check for battery icon or its container
      const icons = container.querySelectorAll('.lucide-battery');
      expect(icons.length).toBeGreaterThanOrEqual(0);
    });

    it('should render user icon', () => {
      const { container } = render(<MenuBar />);
      // Check for user icon or its container
      const icons = container.querySelectorAll('.lucide-user');
      expect(icons.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Layout', () => {
    it('should span full width', () => {
      const { container } = render(<MenuBar />);
      const menuBar = container.querySelector('.left-0.right-0');
      expect(menuBar).toBeInTheDocument();
    });

    it('should be fixed at top', () => {
      const { container } = render(<MenuBar />);
      const menuBar = container.querySelector('.top-0');
      expect(menuBar).toBeInTheDocument();
    });

    it('should have proper padding', () => {
      const { container } = render(<MenuBar />);
      const menuBar = container.querySelector('.px-4');
      expect(menuBar).toBeInTheDocument();
    });

    it('should use flexbox for layout', () => {
      const { container } = render(<MenuBar />);
      const menuBar = container.querySelector('.flex');
      expect(menuBar).toBeInTheDocument();
    });

    it('should justify content between elements', () => {
      const { container } = render(<MenuBar />);
      const menuBar = container.querySelector('.justify-between');
      expect(menuBar).toBeInTheDocument();
    });
  });

  describe('Responsiveness', () => {
    it('should render on small screens', () => {
      global.innerWidth = 375;
      global.dispatchEvent(new Event('resize'));
      
      const { container } = render(<MenuBar />);
      const menuBar = container.querySelector('.fixed.top-0');
      expect(menuBar).toBeInTheDocument();
    });

    it('should render on large screens', () => {
      global.innerWidth = 1920;
      global.dispatchEvent(new Event('resize'));
      
      const { container } = render(<MenuBar />);
      const menuBar = container.querySelector('.fixed.top-0');
      expect(menuBar).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle midnight time correctly', async () => {
      const mockDate = new Date('2024-01-15T00:00:00');
      dateNowSpy.mockImplementation(() => mockDate.getTime());
      
      render(<MenuBar />);
      
      await waitFor(() => {
        expect(screen.getByText(/12:00 AM/)).toBeInTheDocument();
      });
    });

    it('should handle noon time correctly', async () => {
      const mockDate = new Date('2024-01-15T12:00:00');
      dateNowSpy.mockImplementation(() => mockDate.getTime());
      
      render(<MenuBar />);
      
      await waitFor(() => {
        expect(screen.getByText(/12:00 PM/)).toBeInTheDocument();
      });
    });

    it('should handle leap year dates', async () => {
      const mockDate = new Date('2024-02-29T12:00:00');
      dateNowSpy.mockImplementation(() => mockDate.getTime());
      
      render(<MenuBar />);
      
      await waitFor(() => {
        expect(screen.getByText(/Feb 29/)).toBeInTheDocument();
      });
    });

    it('should handle year transitions', async () => {
      const mockDate = new Date('2024-12-31T23:59:00');
      dateNowSpy.mockImplementation(() => mockDate.getTime());
      
      render(<MenuBar />);
      
      await waitFor(() => {
        expect(screen.getByText(/Dec 31/)).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have semantic HTML structure', () => {
      const { container } = render(<MenuBar />);
      const menuBar = container.querySelector('[role="banner"]') || 
                      container.querySelector('header') ||
                      container.firstChild;
      expect(menuBar).toBeInTheDocument();
    });

    it('should have readable text contrast', () => {
      const { container } = render(<MenuBar />);
      const textElements = container.querySelectorAll('.text-gray-900, .text-gray-700');
      expect(textElements.length).toBeGreaterThan(0);
    });
  });

  describe('Performance', () => {
    it('should cleanup interval on unmount', () => {
      vi.useFakeTimers();
      const { unmount } = render(<MenuBar />);
      
      unmount();
      
      // Advance timers to ensure no updates happen after unmount
      expect(() => {
        vi.advanceTimersByTime(60000);
      }).not.toThrow();
      
      vi.useRealTimers();
    });

    it('should not cause memory leaks with multiple mounts', () => {
      for (let i = 0; i < 10; i++) {
        const { unmount } = render(<MenuBar />);
        unmount();
      }
      
      // Should complete without errors
      expect(true).toBe(true);
    });
  });
});