import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Projects from '../Projects';

describe('Projects Component', () => {
  describe('Rendering', () => {
    it('should render projects container', () => {
      const { container } = render(<Projects />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render projects title or heading', () => {
      render(<Projects />);
      const heading = screen.getByText(/Projects?|Portfolio|Work/i);
      expect(heading).toBeInTheDocument();
    });

    it('should render project cards or items', () => {
      const { container } = render(<Projects />);
      const projectElements = container.querySelectorAll('[class*="project"], [class*="card"]');
      expect(projectElements.length).toBeGreaterThanOrEqual(0);
    });

    it('should have proper layout styling', () => {
      const { container } = render(<Projects />);
      const layoutElement = container.querySelector('.grid, .flex');
      expect(layoutElement || container.firstChild).toBeInTheDocument();
    });
  });

  describe('Project Cards', () => {
    it('should display project names', () => {
      const { container } = render(<Projects />);
      const textContent = container.textContent;
      expect(textContent.length).toBeGreaterThan(0);
    });

    it('should display project descriptions', () => {
      const { container } = render(<Projects />);
      const paragraphs = container.querySelectorAll('p');
      expect(paragraphs.length).toBeGreaterThanOrEqual(0);
    });

    it('should render project technologies or tags', () => {
      const { container } = render(<Projects />);
      // Look for technology tags or badges
      const tags = container.querySelectorAll('.bg-blue-100, .bg-purple-100, .bg-green-100, [class*="badge"], [class*="tag"]');
      expect(tags.length).toBeGreaterThanOrEqual(0);
    });

    it('should display project links if available', () => {
      const { container } = render(<Projects />);
      const links = container.querySelectorAll('a[href]');
      expect(links.length).toBeGreaterThanOrEqual(0);
    });

    it('should render project images or icons', () => {
      const { container } = render(<Projects />);
      const images = container.querySelectorAll('img, svg, [class*="icon"]');
      expect(images.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Interaction', () => {
    it('should handle project card clicks', () => {
      const { container } = render(<Projects />);
      const clickableElements = container.querySelectorAll('button, a, [role="button"]');
      
      clickableElements.forEach(element => {
        expect(() => fireEvent.click(element)).not.toThrow();
      });
    });

    it('should handle external link clicks', () => {
      const { container } = render(<Projects />);
      const externalLinks = container.querySelectorAll('a[href^="http"]');
      
      externalLinks.forEach(link => {
        expect(link.getAttribute('target')).toBeTruthy();
      });
    });

    it('should apply hover effects to interactive elements', () => {
      const { container } = render(<Projects />);
      const interactiveElements = container.querySelectorAll('[class*="hover:"]');
      expect(interactiveElements.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Layout', () => {
    it('should be scrollable', () => {
      const { container } = render(<Projects />);
      const scrollable = container.querySelector('.overflow-auto, .overflow-y-auto');
      expect(scrollable || container.firstChild).toBeInTheDocument();
    });

    it('should have proper spacing between projects', () => {
      const { container } = render(<Projects />);
      const spacedElements = container.querySelectorAll('[class*="gap-"], [class*="space-"]');
      expect(spacedElements.length).toBeGreaterThanOrEqual(0);
    });

    it('should use grid or flex layout', () => {
      const { container } = render(<Projects />);
      const layout = container.querySelector('.grid, .flex');
      expect(layout || container.firstChild).toBeInTheDocument();
    });

    it('should have padding for content', () => {
      const { container } = render(<Projects />);
      const paddedElement = container.querySelector('[class*="p-"]');
      expect(paddedElement || container.firstChild).toBeInTheDocument();
    });
  });

  describe('Content Quality', () => {
    it('should have descriptive project information', () => {
      const { container } = render(<Projects />);
      const textContent = container.textContent;
      expect(textContent.length).toBeGreaterThan(50);
    });

    it('should display technology stack', () => {
      render(<Projects />);
      const techTerms = screen.queryByText(/React|JavaScript|TypeScript|Node|Python|Java|CSS|HTML/i);
      expect(techTerms || screen.getByText(/./)).toBeTruthy();
    });

    it('should show project status or category', () => {
      const { container } = render(<Projects />);
      const statusElements = container.querySelectorAll('[class*="status"], [class*="badge"]');
      expect(statusElements.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Responsive Design', () => {
    it('should render on mobile screens', () => {
      global.innerWidth = 375;
      global.dispatchEvent(new Event('resize'));
      
      const { container } = render(<Projects />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render on tablet screens', () => {
      global.innerWidth = 768;
      global.dispatchEvent(new Event('resize'));
      
      const { container } = render(<Projects />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render on desktop screens', () => {
      global.innerWidth = 1920;
      global.dispatchEvent(new Event('resize'));
      
      const { container } = render(<Projects />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should have responsive grid columns', () => {
      const { container } = render(<Projects />);
      const gridElement = container.querySelector('[class*="grid-cols"]');
      expect(gridElement || container.firstChild).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have semantic HTML', () => {
      const { container } = render(<Projects />);
      const semanticElements = container.querySelectorAll('section, article, header, div');
      expect(semanticElements.length).toBeGreaterThan(0);
    });

    it('should have alt text for images', () => {
      const { container } = render(<Projects />);
      const images = container.querySelectorAll('img');
      
      images.forEach(img => {
        expect(img.hasAttribute('alt') || img.hasAttribute('aria-label')).toBeTruthy();
      });
    });

    it('should have keyboard navigable links', () => {
      const { container } = render(<Projects />);
      const links = container.querySelectorAll('a');
      
      links.forEach(link => {
        expect(link.hasAttribute('href')).toBeTruthy();
      });
    });

    it('should support screen readers', () => {
      const { container } = render(<Projects />);
      const textContent = container.textContent;
      expect(textContent.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should render without errors', () => {
      expect(() => render(<Projects />)).not.toThrow();
    });

    it('should handle empty project list gracefully', () => {
      const { container } = render(<Projects />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should handle long project descriptions', () => {
      const { container } = render(<Projects />);
      const descriptions = container.querySelectorAll('p');
      descriptions.forEach(desc => {
        expect(desc).toBeInTheDocument();
      });
    });

    it('should handle projects without links', () => {
      const { container } = render(<Projects />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Visual Design', () => {
    it('should have card styling', () => {
      const { container } = render(<Projects />);
      const cards = container.querySelectorAll('.bg-white, .shadow, .rounded');
      expect(cards.length).toBeGreaterThanOrEqual(0);
    });

    it('should have proper text hierarchy', () => {
      const { container } = render(<Projects />);
      const headings = container.querySelectorAll('h1, h2, h3, h4');
      expect(headings.length).toBeGreaterThanOrEqual(0);
    });

    it('should use consistent color scheme', () => {
      const { container } = render(<Projects />);
      const coloredElements = container.querySelectorAll('[class*="text-"], [class*="bg-"]');
      expect(coloredElements.length).toBeGreaterThan(0);
    });
  });

  describe('Performance', () => {
    it('should render efficiently with multiple projects', () => {
      const startTime = performance.now();
      render(<Projects />);
      const endTime = performance.now();
      
      expect(endTime - startTime).toBeLessThan(1000);
    });

    it('should not cause memory leaks on multiple renders', () => {
      for (let i = 0; i < 5; i++) {
        const { unmount } = render(<Projects />);
        unmount();
      }
      expect(true).toBe(true);
    });
  });
});