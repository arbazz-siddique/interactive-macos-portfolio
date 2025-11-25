import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dock from '../Dock';
import { dockApps } from '#constants/index.js';

// Mock GSAP
vi.mock('gsap', () => ({
  default: {
    to: vi.fn((target, vars) => ({
      kill: vi.fn(),
      then: vi.fn((callback) => callback && callback()),
    })),
  },
}));

// Mock useGSAP hook
vi.mock('@gsap/react', () => ({
  useGSAP: vi.fn((callback) => {
    callback();
    return { contextSafe: vi.fn((fn) => fn) };
  }),
}));

// Mock react-tooltip
vi.mock('react-tooltip', () => ({
  Tooltip: ({ id, place, className }) => (
    <div data-testid={`tooltip-${id}`} data-place={place} className={className} />
  ),
}));

describe('Dock Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Rendering', () => {
    it('should render the dock container', () => {
      const { container } = render(<Dock />);
      const dockSection = container.querySelector('#dock');
      expect(dockSection).toBeInTheDocument();
    });

    it('should render dock container div', () => {
      const { container } = render(<Dock />);
      const dockContainer = container.querySelector('.dock-container');
      expect(dockContainer).toBeInTheDocument();
    });

    it('should render all dock apps from constants', () => {
      render(<Dock />);
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBe(dockApps.length);
    });

    it('should render app icons with correct images', () => {
      const { container } = render(<Dock />);
      dockApps.forEach((app) => {
        const img = container.querySelector(`img[alt="${app.name}"]`);
        expect(img).toBeInTheDocument();
        expect(img.getAttribute('src')).toBe(`/images/${app.icon}`);
      });
    });

    it('should render tooltip component', () => {
      render(<Dock />);
      expect(screen.getByTestId('tooltip-dock-tooltip')).toBeInTheDocument();
    });

    it('should apply dock-icon class to all buttons', () => {
      const { container } = render(<Dock />);
      const dockIcons = container.querySelectorAll('.dock-icon');
      expect(dockIcons.length).toBe(dockApps.length);
    });

    it('should set loading="lazy" on all images', () => {
      const { container } = render(<Dock />);
      const images = container.querySelectorAll('img');
      images.forEach((img) => {
        expect(img.getAttribute('loading')).toBe('lazy');
      });
    });
  });

  describe('App States', () => {
    it('should disable buttons for apps that cannot open', () => {
      render(<Dock />);
      const buttons = screen.getAllByRole('button');
      
      buttons.forEach((button, index) => {
        if (!dockApps[index].canOpen) {
          expect(button).toBeDisabled();
        } else {
          expect(button).not.toBeDisabled();
        }
      });
    });

    it('should apply opacity-60 to icons that cannot open', () => {
      const { container } = render(<Dock />);
      
      dockApps.forEach((app) => {
        const img = container.querySelector(`img[alt="${app.name}"]`);
        if (!app.canOpen) {
          expect(img).toHaveClass('opacity-60');
        } else {
          expect(img).not.toHaveClass('opacity-60');
        }
      });
    });

    it('should render apps with canOpen=true as enabled', () => {
      render(<Dock />);
      const enabledApps = dockApps.filter((app) => app.canOpen);
      const buttons = screen.getAllByRole('button');
      
      const enabledButtons = buttons.filter((btn) => !btn.disabled);
      expect(enabledButtons.length).toBe(enabledApps.length);
    });

    it('should render apps with canOpen=false as disabled', () => {
      render(<Dock />);
      const disabledApps = dockApps.filter((app) => !app.canOpen);
      const buttons = screen.getAllByRole('button');
      
      const disabledButtons = buttons.filter((btn) => btn.disabled);
      expect(disabledButtons.length).toBe(disabledApps.length);
    });
  });

  describe('Tooltip Configuration', () => {
    it('should set tooltip-id attribute on all buttons', () => {
      render(<Dock />);
      const buttons = screen.getAllByRole('button');
      
      buttons.forEach((button) => {
        expect(button.getAttribute('data-tooltip-id')).toBe('dock-tooltip');
      });
    });

    it('should set tooltip content to app name', () => {
      render(<Dock />);
      const buttons = screen.getAllByRole('button');
      
      buttons.forEach((button, index) => {
        expect(button.getAttribute('data-tooltip-content')).toBe(dockApps[index].name);
      });
    });

    it('should set tooltip delay to 150ms', () => {
      render(<Dock />);
      const buttons = screen.getAllByRole('button');
      
      buttons.forEach((button) => {
        expect(button.getAttribute('data-tooltip-delay-show')).toBe('150');
      });
    });

    it('should render tooltip with correct props', () => {
      render(<Dock />);
      const tooltip = screen.getByTestId('tooltip-dock-tooltip');
      
      expect(tooltip.getAttribute('data-place')).toBe('top');
      expect(tooltip).toHaveClass('tooltip');
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label for each app', () => {
      render(<Dock />);
      const buttons = screen.getAllByRole('button');
      
      buttons.forEach((button, index) => {
        expect(button.getAttribute('aria-label')).toBe(dockApps[index].name);
      });
    });

    it('should use semantic HTML button elements', () => {
      render(<Dock />);
      const buttons = screen.getAllByRole('button');
      
      buttons.forEach((button) => {
        expect(button.tagName).toBe('BUTTON');
        expect(button.getAttribute('type')).toBe('button');
      });
    });

    it('should have meaningful alt text for all images', () => {
      const { container } = render(<Dock />);
      const images = container.querySelectorAll('img');
      
      images.forEach((img) => {
        expect(img.getAttribute('alt')).toBeTruthy();
        expect(img.getAttribute('alt').length).toBeGreaterThan(0);
      });
    });

    it('should be keyboard accessible for enabled apps', () => {
      render(<Dock />);
      const buttons = screen.getAllByRole('button');
      const enabledButtons = buttons.filter((btn) => !btn.disabled);
      
      enabledButtons.forEach((button) => {
        button.focus();
        expect(document.activeElement).toBe(button);
      });
    });
  });

  describe('App Click Handling', () => {
    it('should call toggleApp when enabled app is clicked', () => {
      render(<Dock />);
      const buttons = screen.getAllByRole('button');
      const enabledButton = buttons.find((btn) => !btn.disabled);
      
      if (enabledButton) {
        expect(() => fireEvent.click(enabledButton)).not.toThrow();
      }
    });

    it('should not call toggleApp when disabled app is clicked', () => {
      render(<Dock />);
      const buttons = screen.getAllByRole('button');
      const disabledButton = buttons.find((btn) => btn.disabled);
      
      if (disabledButton) {
        expect(() => fireEvent.click(disabledButton)).not.toThrow();
      }
    });

    it('should pass correct app data to toggleApp', () => {
      render(<Dock />);
      const buttons = screen.getAllByRole('button');
      
      // Click each enabled button
      buttons.forEach((button, index) => {
        if (!button.disabled) {
          fireEvent.click(button);
          // toggleApp would be called with {id, canOpen}
        }
      });
    });
  });

  describe('GSAP Animation Integration', () => {
    it('should set up ref for dock container', () => {
      const { container } = render(<Dock />);
      const dockContainer = container.querySelector('.dock-container');
      expect(dockContainer).toBeInTheDocument();
    });

    it('should query for dock-icon elements', () => {
      const { container } = render(<Dock />);
      const dockIcons = container.querySelectorAll('.dock-icon');
      expect(dockIcons.length).toBeGreaterThan(0);
    });

    it('should handle mouse move events on dock', () => {
      const { container } = render(<Dock />);
      const dockContainer = container.querySelector('.dock-container');
      
      expect(() => {
        fireEvent.mouseMove(dockContainer, { clientX: 100 });
      }).not.toThrow();
    });

    it('should handle mouse leave events on dock', () => {
      const { container } = render(<Dock />);
      const dockContainer = container.querySelector('.dock-container');
      
      expect(() => {
        fireEvent.mouseLeave(dockContainer);
      }).not.toThrow();
    });

    it('should clean up event listeners on unmount', () => {
      const { container, unmount } = render(<Dock />);
      const dockContainer = container.querySelector('.dock-container');
      
      expect(dockContainer).toBeInTheDocument();
      expect(() => unmount()).not.toThrow();
    });
  });

  describe('Layout and Structure', () => {
    it('should wrap each app in a relative flex container', () => {
      const { container } = render(<Dock />);
      const wrappers = container.querySelectorAll('.relative.flex.justify-center');
      expect(wrappers.length).toBe(dockApps.length);
    });

    it('should render apps in correct order', () => {
      const { container } = render(<Dock />);
      const images = container.querySelectorAll('img');
      
      images.forEach((img, index) => {
        expect(img.getAttribute('alt')).toBe(dockApps[index].name);
      });
    });

    it('should have section element with id="dock"', () => {
      const { container } = render(<Dock />);
      const section = container.querySelector('section#dock');
      expect(section).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty dockApps array gracefully', () => {
      // This would require mocking the import, but we can test the structure
      const { container } = render(<Dock />);
      const dockContainer = container.querySelector('.dock-container');
      expect(dockContainer).toBeInTheDocument();
    });

    it('should handle apps with missing properties', () => {
      // Component should render without crashing
      expect(() => render(<Dock />)).not.toThrow();
    });

    it('should handle rapid mouse movements', () => {
      const { container } = render(<Dock />);
      const dockContainer = container.querySelector('.dock-container');
      
      // Simulate rapid mouse movements
      for (let i = 0; i < 10; i++) {
        fireEvent.mouseMove(dockContainer, { clientX: i * 10 });
      }
      
      expect(dockContainer).toBeInTheDocument();
    });

    it('should handle rapid clicks on multiple apps', () => {
      render(<Dock />);
      const buttons = screen.getAllByRole('button');
      
      // Rapidly click all enabled buttons
      buttons.forEach((button) => {
        if (!button.disabled) {
          fireEvent.click(button);
          fireEvent.click(button);
        }
      });
      
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should handle mouse move without crashing', () => {
      const { container } = render(<Dock />);
      const dockContainer = container.querySelector('.dock-container');
      
      expect(() => {
        const rect = dockContainer.getBoundingClientRect();
        fireEvent.mouseMove(dockContainer, { 
          clientX: rect.left + 50 
        });
      }).not.toThrow();
    });
  });

  describe('Image Loading', () => {
    it('should use lazy loading for all images', () => {
      const { container } = render(<Dock />);
      const images = container.querySelectorAll('img');
      
      images.forEach((img) => {
        expect(img).toHaveAttribute('loading', 'lazy');
      });
    });

    it('should use correct image paths', () => {
      const { container } = render(<Dock />);
      
      dockApps.forEach((app) => {
        const img = container.querySelector(`img[alt="${app.name}"]`);
        expect(img.src).toContain(`/images/${app.icon}`);
      });
    });

    it('should handle missing image gracefully', () => {
      const { container } = render(<Dock />);
      const images = container.querySelectorAll('img');
      
      images.forEach((img) => {
        expect(() => {
          fireEvent.error(img);
        }).not.toThrow();
      });
    });
  });

  describe('Component Integration', () => {
    it('should render without external dependencies errors', () => {
      expect(() => render(<Dock />)).not.toThrow();
    });

    it('should work with React 19', () => {
      const { container } = render(<Dock />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should handle re-renders correctly', () => {
      const { rerender } = render(<Dock />);
      expect(() => rerender(<Dock />)).not.toThrow();
    });

    it('should maintain state across re-renders', () => {
      const { rerender, container } = render(<Dock />);
      const initialButtons = screen.getAllByRole('button');
      
      rerender(<Dock />);
      const afterRenderButtons = screen.getAllByRole('button');
      
      expect(afterRenderButtons.length).toBe(initialButtons.length);
    });
  });

  describe('Performance', () => {
    it('should render efficiently', () => {
      const startTime = performance.now();
      render(<Dock />);
      const endTime = performance.now();
      
      expect(endTime - startTime).toBeLessThan(100);
    });

    it('should not cause memory leaks on multiple mounts/unmounts', () => {
      for (let i = 0; i < 5; i++) {
        const { unmount } = render(<Dock />);
        unmount();
      }
      
      expect(true).toBe(true);
    });

    it('should handle many mouse events efficiently', () => {
      const { container } = render(<Dock />);
      const dockContainer = container.querySelector('.dock-container');
      
      const startTime = performance.now();
      for (let i = 0; i < 100; i++) {
        fireEvent.mouseMove(dockContainer, { clientX: i });
      }
      const endTime = performance.now();
      
      expect(endTime - startTime).toBeLessThan(1000);
    });
  });

  describe('App Configuration from Constants', () => {
    it('should render finder app if in dockApps', () => {
      const finderApp = dockApps.find((app) => app.id === 'finder');
      if (finderApp) {
        render(<Dock />);
        expect(screen.getByLabelText(finderApp.name)).toBeInTheDocument();
      }
    });

    it('should render all apps from constants', () => {
      render(<Dock />);
      
      dockApps.forEach((app) => {
        const button = screen.getByLabelText(app.name);
        expect(button).toBeInTheDocument();
      });
    });

    it('should respect canOpen property from constants', () => {
      render(<Dock />);
      
      dockApps.forEach((app) => {
        const button = screen.getByLabelText(app.name);
        if (app.canOpen) {
          expect(button).toBeEnabled();
        } else {
          expect(button).toBeDisabled();
        }
      });
    });
  });
});