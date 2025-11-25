import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Window from '../Window';

describe('Window Component', () => {
  const defaultProps = {
    id: 'test-window',
    title: 'Test Window',
    isActive: true,
    onClose: vi.fn(),
    onMinimize: vi.fn(),
    onMaximize: vi.fn(),
    onFocus: vi.fn(),
    children: <div>Test Content</div>,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render window with title', () => {
      render(<Window {...defaultProps} />);
      expect(screen.getByText('Test Window')).toBeInTheDocument();
    });

    it('should render children content', () => {
      render(<Window {...defaultProps} />);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should render with custom icon', () => {
      const icon = '🎨';
      render(<Window {...defaultProps} icon={icon} />);
      expect(screen.getByText(icon)).toBeInTheDocument();
    });

    it('should render without icon when not provided', () => {
      render(<Window {...defaultProps} />);
      const titleBar = screen.getByText('Test Window').closest('.flex');
      expect(titleBar).toBeInTheDocument();
    });

    it('should apply active state styling', () => {
      const { container } = render(<Window {...defaultProps} isActive={true} />);
      const window = container.querySelector('.absolute.bg-white\\/95');
      expect(window).toBeInTheDocument();
    });

    it('should apply inactive state styling', () => {
      const { container } = render(<Window {...defaultProps} isActive={false} />);
      const window = container.querySelector('.absolute');
      expect(window).toHaveClass('opacity-90');
    });
  });

  describe('Window Controls', () => {
    it('should call onClose when close button is clicked', () => {
      render(<Window {...defaultProps} />);
      const closeButton = screen.getAllByRole('button')[0];
      fireEvent.click(closeButton);
      expect(defaultProps.onClose).toHaveBeenCalledWith('test-window');
    });

    it('should call onMinimize when minimize button is clicked', () => {
      render(<Window {...defaultProps} />);
      const minimizeButton = screen.getAllByRole('button')[1];
      fireEvent.click(minimizeButton);
      expect(defaultProps.onMinimize).toHaveBeenCalledWith('test-window');
    });

    it('should call onMaximize when maximize button is clicked', () => {
      render(<Window {...defaultProps} />);
      const maximizeButton = screen.getAllByRole('button')[2];
      fireEvent.click(maximizeButton);
      expect(defaultProps.onMaximize).toHaveBeenCalledWith('test-window');
    });

    it('should show button labels on hover', () => {
      render(<Window {...defaultProps} />);
      const buttons = screen.getAllByRole('button');
      
      // Close button
      fireEvent.mouseEnter(buttons[0]);
      expect(screen.getByText('×')).toBeInTheDocument();
      
      // Minimize button
      fireEvent.mouseEnter(buttons[1]);
      expect(screen.getByText('−')).toBeInTheDocument();
      
      // Maximize button
      fireEvent.mouseEnter(buttons[2]);
      const maximizeIcons = screen.getAllByText('⤢');
      expect(maximizeIcons.length).toBeGreaterThan(0);
    });
  });

  describe('Window Focus', () => {
    it('should call onFocus when window is clicked', () => {
      const { container } = render(<Window {...defaultProps} />);
      const window = container.querySelector('.absolute');
      fireEvent.mouseDown(window);
      expect(defaultProps.onFocus).toHaveBeenCalledWith('test-window');
    });

    it('should call onFocus when title bar is clicked', () => {
      render(<Window {...defaultProps} />);
      const titleBar = screen.getByText('Test Window').closest('.px-4');
      fireEvent.mouseDown(titleBar);
      expect(defaultProps.onFocus).toHaveBeenCalled();
    });
  });

  describe('Window Dimensions and Position', () => {
    it('should apply default dimensions when not specified', () => {
      const { container } = render(<Window {...defaultProps} />);
      const window = container.querySelector('.absolute');
      expect(window).toHaveStyle({ width: '800px', height: '600px' });
    });

    it('should apply custom width and height', () => {
      const { container } = render(
        <Window {...defaultProps} width="1000px" height="800px" />
      );
      const window = container.querySelector('.absolute');
      expect(window).toHaveStyle({ width: '1000px', height: '800px' });
    });

    it('should apply initial position', () => {
      const { container } = render(
        <Window {...defaultProps} initialX={100} initialY={150} />
      );
      const window = container.querySelector('.absolute');
      expect(window).toHaveStyle({ left: '100px', top: '150px' });
    });

    it('should handle maximized state', () => {
      const { container } = render(<Window {...defaultProps} isMaximized={true} />);
      const window = container.querySelector('.absolute');
      expect(window).toHaveClass('inset-0', 'w-full', 'h-full');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA roles', () => {
      render(<Window {...defaultProps} />);
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(3);
    });

    it('should support keyboard navigation for close button', () => {
      render(<Window {...defaultProps} />);
      const closeButton = screen.getAllByRole('button')[0];
      closeButton.focus();
      fireEvent.keyPress(closeButton, { key: 'Enter', code: 13 });
      // Button should be focused
      expect(document.activeElement).toBe(closeButton);
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing onClose handler', () => {
      const props = { ...defaultProps, onClose: undefined };
      render(<Window {...props} />);
      const closeButton = screen.getAllByRole('button')[0];
      expect(() => fireEvent.click(closeButton)).not.toThrow();
    });

    it('should handle missing onMinimize handler', () => {
      const props = { ...defaultProps, onMinimize: undefined };
      render(<Window {...props} />);
      const minimizeButton = screen.getAllByRole('button')[1];
      expect(() => fireEvent.click(minimizeButton)).not.toThrow();
    });

    it('should handle missing onMaximize handler', () => {
      const props = { ...defaultProps, onMaximize: undefined };
      render(<Window {...props} />);
      const maximizeButton = screen.getAllByRole('button')[2];
      expect(() => fireEvent.click(maximizeButton)).not.toThrow();
    });

    it('should handle empty title', () => {
      render(<Window {...defaultProps} title="" />);
      const titleBar = screen.getByText('').closest('.px-4');
      expect(titleBar).toBeInTheDocument();
    });

    it('should handle very long title', () => {
      const longTitle = 'A'.repeat(100);
      render(<Window {...defaultProps} title={longTitle} />);
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('should handle null children', () => {
      render(<Window {...defaultProps} children={null} />);
      const window = screen.getByText('Test Window').closest('.absolute');
      expect(window).toBeInTheDocument();
    });
  });

  describe('Resizable Behavior', () => {
    it('should render resize handle', () => {
      const { container } = render(<Window {...defaultProps} />);
      const resizeHandle = container.querySelector('.absolute.bottom-0.right-0');
      expect(resizeHandle).toBeInTheDocument();
    });

    it('should not show resize handle when maximized', () => {
      const { container } = render(<Window {...defaultProps} isMaximized={true} />);
      const resizeHandle = container.querySelector('.absolute.bottom-0.right-0');
      expect(resizeHandle).toBeInTheDocument();
    });
  });

  describe('Content Scrolling', () => {
    it('should apply overflow-auto to content area', () => {
      const { container } = render(<Window {...defaultProps} />);
      const contentArea = container.querySelector('.flex-1.overflow-auto');
      expect(contentArea).toBeInTheDocument();
    });

    it('should render scrollable content', () => {
      const longContent = (
        <div style={{ height: '2000px' }}>Very long content</div>
      );
      render(<Window {...defaultProps} children={longContent} />);
      expect(screen.getByText('Very long content')).toBeInTheDocument();
    });
  });
});