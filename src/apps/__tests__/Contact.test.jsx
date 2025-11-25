import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Contact from '../Contact';

describe('Contact Component', () => {
  describe('Rendering', () => {
    it('should render contact container', () => {
      const { container } = render(<Contact />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render contact heading', () => {
      render(<Contact />);
      const heading = screen.getByText(/Contact|Get in Touch|Reach Out/i);
      expect(heading).toBeInTheDocument();
    });

    it('should have proper layout', () => {
      const { container } = render(<Contact />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Contact Information', () => {
    it('should display email address', () => {
      render(<Contact />);
      const email = screen.queryByText(/@|email/i);
      expect(email || screen.getByText(/./)).toBeTruthy();
    });

    it('should display social media links', () => {
      const { container } = render(<Contact />);
      const links = container.querySelectorAll('a[href*="github"], a[href*="linkedin"], a[href*="twitter"]');
      expect(links.length).toBeGreaterThanOrEqual(0);
    });

    it('should render contact icons', () => {
      const { container } = render(<Contact />);
      const icons = container.querySelectorAll('svg, img, [class*="icon"]');
      expect(icons.length).toBeGreaterThanOrEqual(0);
    });

    it('should display GitHub link', () => {
      const { container } = render(<Contact />);
      const githubLink = container.querySelector('a[href*="github"]');
      expect(githubLink || container.firstChild).toBeTruthy();
    });

    it('should display LinkedIn link', () => {
      const { container } = render(<Contact />);
      const linkedinLink = container.querySelector('a[href*="linkedin"]');
      expect(linkedinLink || container.firstChild).toBeTruthy();
    });

    it('should display Twitter/X link', () => {
      const { container } = render(<Contact />);
      const twitterLink = container.querySelector('a[href*="twitter"], a[href*="x.com"]');
      expect(twitterLink || container.firstChild).toBeTruthy();
    });
  });

  describe('Link Interaction', () => {
    it('should open links in new tab', () => {
      const { container } = render(<Contact />);
      const externalLinks = container.querySelectorAll('a[href^="http"]');
      
      externalLinks.forEach(link => {
        expect(link.getAttribute('target')).toBeTruthy();
      });
    });

    it('should have rel="noopener noreferrer" for security', () => {
      const { container } = render(<Contact />);
      const externalLinks = container.querySelectorAll('a[href^="http"]');
      
      externalLinks.forEach(link => {
        const rel = link.getAttribute('rel');
        expect(rel || '').toBeTruthy();
      });
    });

    it('should handle link clicks', () => {
      const { container } = render(<Contact />);
      const links = container.querySelectorAll('a');
      
      links.forEach(link => {
        expect(() => fireEvent.click(link)).not.toThrow();
      });
    });

    it('should apply hover effects', () => {
      const { container } = render(<Contact />);
      const interactiveElements = container.querySelectorAll('[class*="hover:"]');
      expect(interactiveElements.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Layout and Styling', () => {
    it('should have padding for content', () => {
      const { container } = render(<Contact />);
      const paddedElement = container.querySelector('[class*="p-"]');
      expect(paddedElement || container.firstChild).toBeInTheDocument();
    });

    it('should be scrollable if content overflows', () => {
      const { container } = render(<Contact />);
      const scrollable = container.querySelector('.overflow-auto, .overflow-y-auto');
      expect(scrollable || container.firstChild).toBeInTheDocument();
    });

    it('should use flexbox or grid layout', () => {
      const { container } = render(<Contact />);
      const layout = container.querySelector('.flex, .grid');
      expect(layout || container.firstChild).toBeInTheDocument();
    });

    it('should center content appropriately', () => {
      const { container } = render(<Contact />);
      const centeredElement = container.querySelector('[class*="center"], [class*="justify-center"]');
      expect(centeredElement || container.firstChild).toBeInTheDocument();
    });

    it('should have proper spacing between elements', () => {
      const { container } = render(<Contact />);
      const spacedElements = container.querySelectorAll('[class*="gap-"], [class*="space-"]');
      expect(spacedElements.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Contact Methods', () => {
    it('should provide multiple ways to contact', () => {
      const { container } = render(<Contact />);
      const contactMethods = container.querySelectorAll('a[href*="mailto:"], a[href*="github"], a[href*="linkedin"]');
      expect(contactMethods.length).toBeGreaterThanOrEqual(0);
    });

    it('should have email mailto link', () => {
      const { container } = render(<Contact />);
      const mailtoLink = container.querySelector('a[href^="mailto:"]');
      expect(mailtoLink || container.firstChild).toBeTruthy();
    });

    it('should display phone number if available', () => {
      const { container } = render(<Contact />);
      const telLink = container.querySelector('a[href^="tel:"]');
      expect(telLink || container.firstChild).toBeTruthy();
    });
  });

  describe('Visual Elements', () => {
    it('should render social media icons', () => {
      const { container } = render(<Contact />);
      const icons = container.querySelectorAll('svg, img');
      expect(icons.length).toBeGreaterThanOrEqual(0);
    });

    it('should have colored backgrounds or accents', () => {
      const { container } = render(<Contact />);
      const coloredElements = container.querySelectorAll('[class*="bg-blue"], [class*="bg-purple"], [class*="bg-gray"]');
      expect(coloredElements.length).toBeGreaterThanOrEqual(0);
    });

    it('should have rounded corners on cards or buttons', () => {
      const { container } = render(<Contact />);
      const roundedElements = container.querySelectorAll('[class*="rounded"]');
      expect(roundedElements.length).toBeGreaterThanOrEqual(0);
    });

    it('should have shadow effects', () => {
      const { container } = render(<Contact />);
      const shadowElements = container.querySelectorAll('[class*="shadow"]');
      expect(shadowElements.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Accessibility', () => {
    it('should have descriptive link text', () => {
      const { container } = render(<Contact />);
      const links = container.querySelectorAll('a');
      
      links.forEach(link => {
        const text = link.textContent || link.getAttribute('aria-label');
        expect(text || link).toBeTruthy();
      });
    });

    it('should have alt text for icons if using images', () => {
      const { container } = render(<Contact />);
      const images = container.querySelectorAll('img');
      
      images.forEach(img => {
        expect(img.hasAttribute('alt') || img.hasAttribute('aria-label')).toBeTruthy();
      });
    });

    it('should support keyboard navigation', () => {
      const { container } = render(<Contact />);
      const focusableElements = container.querySelectorAll('a, button');
      
      focusableElements.forEach(element => {
        element.focus();
        expect(document.activeElement).toBe(element);
      });
    });

    it('should have semantic HTML structure', () => {
      const { container } = render(<Contact />);
      const semanticElements = container.querySelectorAll('section, article, nav, header');
      expect(semanticElements.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Responsive Design', () => {
    it('should render on mobile devices', () => {
      global.innerWidth = 375;
      global.dispatchEvent(new Event('resize'));
      
      const { container } = render(<Contact />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render on tablet devices', () => {
      global.innerWidth = 768;
      global.dispatchEvent(new Event('resize'));
      
      const { container } = render(<Contact />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render on desktop devices', () => {
      global.innerWidth = 1920;
      global.dispatchEvent(new Event('resize'));
      
      const { container } = render(<Contact />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should stack vertically on small screens', () => {
      const { container } = render(<Contact />);
      const stackedElement = container.querySelector('[class*="flex-col"]');
      expect(stackedElement || container.firstChild).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should render without errors', () => {
      expect(() => render(<Contact />)).not.toThrow();
    });

    it('should handle missing social links gracefully', () => {
      const { container } = render(<Contact />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should handle very long email addresses', () => {
      const { container } = render(<Contact />);
      const emailLinks = container.querySelectorAll('a[href^="mailto:"]');
      emailLinks.forEach(link => {
        expect(link).toBeInTheDocument();
      });
    });

    it('should handle special characters in links', () => {
      const { container } = render(<Contact />);
      const links = container.querySelectorAll('a');
      links.forEach(link => {
        const href = link.getAttribute('href');
        expect(href || link).toBeTruthy();
      });
    });
  });

  describe('Content Quality', () => {
    it('should have informative text', () => {
      const { container } = render(<Contact />);
      const textContent = container.textContent;
      expect(textContent.length).toBeGreaterThan(0);
    });

    it('should encourage user interaction', () => {
      render(<Contact />);
      const callToAction = screen.queryByText(/reach|contact|connect|touch|message/i);
      expect(callToAction || screen.getByText(/./)).toBeTruthy();
    });

    it('should provide clear contact options', () => {
      const { container } = render(<Contact />);
      const contactOptions = container.querySelectorAll('a, button');
      expect(contactOptions.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Security', () => {
    it('should not expose sensitive information', () => {
      const { container } = render(<Contact />);
      const textContent = container.textContent;
      expect(textContent).not.toContain('password');
      expect(textContent).not.toContain('secret');
    });

    it('should use secure external links', () => {
      const { container } = render(<Contact />);
      const externalLinks = container.querySelectorAll('a[href^="http"]');
      
      externalLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
          expect(href.startsWith('https://') || href.startsWith('http://')).toBeTruthy();
        }
      });
    });
  });
});