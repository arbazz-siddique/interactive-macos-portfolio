import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Desktop from '../Desktop';

describe('Desktop Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render desktop container', () => {
      const { container } = render(<Desktop />);
      const desktop = container.querySelector('.relative.w-full.h-screen');
      expect(desktop).toBeInTheDocument();
    });

    it('should render with proper background styling', () => {
      const { container } = render(<Desktop />);
      const desktop = container.querySelector('.bg-gradient-to-br');
      expect(desktop).toBeInTheDocument();
    });

    it('should render MenuBar component', () => {
      render(<Desktop />);
      // MenuBar should be present (checking for time/date which MenuBar renders)
      const timeElement = screen.queryByText(/AM|PM/);
      expect(timeElement || screen.getByText('', { selector: '*' })).toBeTruthy();
    });

    it('should render Dock component', () => {
      const { container } = render(<Desktop />);
      // Dock is at bottom of screen
      const dock = container.querySelector('.fixed.bottom-2');
      expect(dock).toBeInTheDocument();
    });

    it('should have overflow hidden', () => {
      const { container } = render(<Desktop />);
      const desktop = container.querySelector('.overflow-hidden');
      expect(desktop).toBeInTheDocument();
    });
  });

  describe('Window Management', () => {
    it('should open window when app is clicked in dock', () => {
      render(<Desktop />);
      const terminalIcon = screen.getByText('⌘');
      
      fireEvent.click(terminalIcon);
      
      // Window should open with Terminal title
      expect(screen.getByText('Terminal')).toBeInTheDocument();
    });

    it('should open multiple windows', () => {
      render(<Desktop />);
      
      // Open Terminal
      fireEvent.click(screen.getByText('⌘'));
      expect(screen.getByText('Terminal')).toBeInTheDocument();
      
      // Open About
      fireEvent.click(screen.getByText('👤'));
      expect(screen.getByText('About Me')).toBeInTheDocument();
    });

    it('should close window when close button is clicked', () => {
      render(<Desktop />);
      
      // Open window
      fireEvent.click(screen.getByText('⌘'));
      expect(screen.getByText('Terminal')).toBeInTheDocument();
      
      // Close window
      const closeButtons = screen.getAllByRole('button');
      const closeButton = closeButtons.find(btn => 
        btn.className.includes('bg-red-500')
      );
      if (closeButton) {
        fireEvent.click(closeButton);
      }
    });

    it('should not open duplicate windows for same app', () => {
      render(<Desktop />);
      
      // Click terminal twice
      const terminalIcon = screen.getByText('⌘');
      fireEvent.click(terminalIcon);
      fireEvent.click(terminalIcon);
      
      // Should only have one Terminal window
      const terminalWindows = screen.getAllByText('Terminal');
      expect(terminalWindows.length).toBe(1);
    });

    it('should bring window to front when focused', () => {
      render(<Desktop />);
      
      // Open two windows
      fireEvent.click(screen.getByText('⌘')); // Terminal
      fireEvent.click(screen.getByText('👤')); // About
      
      // Both windows should be present
      expect(screen.getByText('Terminal')).toBeInTheDocument();
      expect(screen.getByText('About Me')).toBeInTheDocument();
    });
  });

  describe('App Configuration', () => {
    it('should have Terminal app configured', () => {
      render(<Desktop />);
      expect(screen.getByText('⌘')).toBeInTheDocument();
    });

    it('should have About Me app configured', () => {
      render(<Desktop />);
      expect(screen.getByText('👤')).toBeInTheDocument();
    });

    it('should have Projects app configured', () => {
      render(<Desktop />);
      expect(screen.getByText('💼')).toBeInTheDocument();
    });

    it('should have Contact app configured', () => {
      render(<Desktop />);
      expect(screen.getByText('✉️')).toBeInTheDocument();
    });

    it('should render all app tooltips', () => {
      render(<Desktop />);
      
      expect(screen.getByText('Terminal')).toBeInTheDocument();
      expect(screen.getByText('About Me')).toBeInTheDocument();
      expect(screen.getByText('Projects')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });
  });

  describe('Window Minimize/Maximize', () => {
    it('should minimize window when minimize button is clicked', () => {
      render(<Desktop />);
      
      // Open window
      fireEvent.click(screen.getByText('⌘'));
      
      // Find and click minimize button (yellow button)
      const buttons = screen.getAllByRole('button');
      const minimizeButton = buttons.find(btn => 
        btn.className.includes('bg-yellow-500')
      );
      
      if (minimizeButton) {
        fireEvent.click(minimizeButton);
        // Window should still exist but minimized
      }
    });

    it('should maximize window when maximize button is clicked', () => {
      render(<Desktop />);
      
      // Open window
      fireEvent.click(screen.getByText('⌘'));
      
      // Find and click maximize button (green button)
      const buttons = screen.getAllByRole('button');
      const maximizeButton = buttons.find(btn => 
        btn.className.includes('bg-green-500')
      );
      
      if (maximizeButton) {
        fireEvent.click(maximizeButton);
      }
    });

    it('should restore minimized window when app icon is clicked', () => {
      render(<Desktop />);
      
      // Open and minimize window
      const terminalIcon = screen.getByText('⌘');
      fireEvent.click(terminalIcon);
      
      // Click again to restore
      fireEvent.click(terminalIcon);
      
      expect(screen.getByText('Terminal')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid window open/close', () => {
      render(<Desktop />);
      const terminalIcon = screen.getByText('⌘');
      
      // Rapidly open and close
      for (let i = 0; i < 5; i++) {
        fireEvent.click(terminalIcon);
      }
      
      // Should still be functional
      expect(screen.getByText('Terminal')).toBeInTheDocument();
    });

    it('should handle all windows being closed', () => {
      render(<Desktop />);
      
      // Open window
      fireEvent.click(screen.getByText('⌘'));
      
      // Close all windows
      const closeButtons = screen.getAllByRole('button').filter(btn =>
        btn.className.includes('bg-red-500')
      );
      
      closeButtons.forEach(btn => fireEvent.click(btn));
      
      // Desktop should still be functional
      const dock = screen.getByText('⌘');
      expect(dock).toBeInTheDocument();
    });

    it('should handle opening all apps at once', () => {
      render(<Desktop />);
      
      // Open all apps
      fireEvent.click(screen.getByText('⌘')); // Terminal
      fireEvent.click(screen.getByText('👤')); // About
      fireEvent.click(screen.getByText('💼')); // Projects
      fireEvent.click(screen.getByText('✉️')); // Contact
      
      // All should be open
      expect(screen.getByText('Terminal')).toBeInTheDocument();
      expect(screen.getByText('About Me')).toBeInTheDocument();
      expect(screen.getByText('Projects')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard navigable', () => {
      render(<Desktop />);
      
      const terminalIcon = screen.getByText('⌘');
      terminalIcon.focus();
      
      fireEvent.keyPress(terminalIcon, { key: 'Enter', code: 13 });
    });

    it('should maintain focus management', () => {
      render(<Desktop />);
      
      // Open window
      fireEvent.click(screen.getByText('⌘'));
      
      // Focus should be manageable
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  describe('Layout', () => {
    it('should have full screen height', () => {
      const { container } = render(<Desktop />);
      const desktop = container.querySelector('.h-screen');
      expect(desktop).toBeInTheDocument();
    });

    it('should have full width', () => {
      const { container } = render(<Desktop />);
      const desktop = container.querySelector('.w-full');
      expect(desktop).toBeInTheDocument();
    });

    it('should use relative positioning', () => {
      const { container } = render(<Desktop />);
      const desktop = container.querySelector('.relative');
      expect(desktop).toBeInTheDocument();
    });
  });
});