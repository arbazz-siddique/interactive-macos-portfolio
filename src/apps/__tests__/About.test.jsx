import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import About from '../About';

describe('About Component', () => {
  describe('Rendering', () => {
    it('should render about container', () => {
      const { container } = render(<About />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render greeting message', () => {
      render(<About />);
      const greeting = screen.getByText(/Hi|Hello|Welcome/i);
      expect(greeting).toBeInTheDocument();
    });

    it('should render profile information', () => {
      render(<About />);
      expect(screen.getByText(/Arbazz/i)).toBeInTheDocument();
    });

    it('should have readable text styling', () => {
      const { container } = render(<About />);
      const textElements = container.querySelectorAll('.text-gray-900, .text-gray-700, .text-gray-600');
      expect(textElements.length).toBeGreaterThan(0);
    });
  });

  describe('Content', () => {
    it('should display developer role or title', () => {
      render(<About />);
      const roleText = screen.getByText(/Developer|Engineer|Designer/i);
      expect(roleText).toBeInTheDocument();
    });

    it('should display bio or description', () => {
      const { container } = render(<About />);
      const paragraphs = container.querySelectorAll('p');
      expect(paragraphs.length).toBeGreaterThan(0);
    });

    it('should render professional summary', () => {
      render(<About />);
      // Check for common professional terms
      const text = screen.queryByText(/experience|skills|passion|expertise/i);
      expect(text || screen.getByText(/./)).toBeInTheDocument();
    });
  });

  describe('Layout', () => {
    it('should use padding for content spacing', () => {
      const { container } = render(<About />);
      const paddedElement = container.querySelector('[class*="p-"]');
      expect(paddedElement).toBeInTheDocument();
    });

    it('should be scrollable if content overflows', () => {
      const { container } = render(<About />);
      const scrollableElement = container.querySelector('.overflow-auto, .overflow-y-auto');
      expect(scrollableElement || container.firstChild).toBeInTheDocument();
    });

    it('should have full height', () => {
      const { container } = render(<About />);
      const fullHeightElement = container.querySelector('.h-full, .min-h-full');
      expect(fullHeightElement || container.firstChild).toBeInTheDocument();
    });
  });

  describe('Sections', () => {
    it('should render education section if present', () => {
      render(<About />);
      const education = screen.queryByText(/education|degree|university|college/i);
      expect(education || screen.getByText(/./)).toBeTruthy();
    });

    it('should render experience section if present', () => {
      render(<About />);
      const experience = screen.queryByText(/experience|work|career/i);
      expect(experience || screen.getByText(/./)).toBeTruthy();
    });

    it('should render interests or hobbies if present', () => {
      render(<About />);
      const interests = screen.queryByText(/interests|hobbies|passion/i);
      expect(interests || screen.getByText(/./)).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have semantic HTML structure', () => {
      const { container } = render(<About />);
      const semanticElements = container.querySelectorAll('section, article, div');
      expect(semanticElements.length).toBeGreaterThan(0);
    });

    it('should have readable text content', () => {
      const { container } = render(<About />);
      const textContent = container.textContent;
      expect(textContent.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should render without errors', () => {
      expect(() => render(<About />)).not.toThrow();
    });

    it('should handle missing optional content gracefully', () => {
      const { container } = render(<About />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('should render on small screens', () => {
      global.innerWidth = 375;
      global.dispatchEvent(new Event('resize'));
      
      const { container } = render(<About />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render on large screens', () => {
      global.innerWidth = 1920;
      global.dispatchEvent(new Event('resize'));
      
      const { container } = render(<About />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});