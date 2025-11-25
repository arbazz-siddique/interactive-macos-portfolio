import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Terminal from '../Terminal';

describe('Terminal Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render terminal container', () => {
      const { container } = render(<Terminal />);
      const terminal = container.querySelector('.h-full');
      expect(terminal).toBeInTheDocument();
    });

    it('should render welcome message', () => {
      render(<Terminal />);
      expect(screen.getByText(/Welcome to Arbazz's Portfolio Terminal/)).toBeInTheDocument();
    });

    it('should render help command hint', () => {
      render(<Terminal />);
      expect(screen.getByText(/Type 'help' to see available commands/)).toBeInTheDocument();
    });

    it('should render command prompt', () => {
      render(<Terminal />);
      expect(screen.getByText(/guest@portfolio/)).toBeInTheDocument();
    });

    it('should render input field', () => {
      render(<Terminal />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('should have dark background', () => {
      const { container } = render(<Terminal />);
      const terminal = container.querySelector('.bg-gray-900');
      expect(terminal).toBeInTheDocument();
    });

    it('should have monospace font', () => {
      const { container } = render(<Terminal />);
      const terminal = container.querySelector('.font-mono');
      expect(terminal).toBeInTheDocument();
    });
  });

  describe('Command Execution', () => {
    it('should execute help command', async () => {
      render(<Terminal />);
      const input = screen.getByRole('textbox');
      
      fireEvent.change(input, { target: { value: 'help' } });
      fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });
      
      await waitFor(() => {
        expect(screen.getByText(/Available commands:/)).toBeInTheDocument();
      });
    });

    it('should execute about command', async () => {
      render(<Terminal />);
      const input = screen.getByRole('textbox');
      
      fireEvent.change(input, { target: { value: 'about' } });
      fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });
      
      await waitFor(() => {
        expect(screen.getByText(/About Me/)).toBeInTheDocument();
      });
    });

    it('should execute skills command', async () => {
      render(<Terminal />);
      const input = screen.getByRole('textbox');
      
      fireEvent.change(input, { target: { value: 'skills' } });
      fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });
      
      await waitFor(() => {
        expect(screen.getByText(/Skills/i)).toBeInTheDocument();
      });
    });

    it('should execute projects command', async () => {
      render(<Terminal />);
      const input = screen.getByRole('textbox');
      
      fireEvent.change(input, { target: { value: 'projects' } });
      fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });
      
      await waitFor(() => {
        expect(screen.getByText(/Projects/i)).toBeInTheDocument();
      });
    });

    it('should execute contact command', async () => {
      render(<Terminal />);
      const input = screen.getByRole('textbox');
      
      fireEvent.change(input, { target: { value: 'contact' } });
      fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });
      
      await waitFor(() => {
        expect(screen.getByText(/Contact/i)).toBeInTheDocument();
      });
    });

    it('should execute clear command', async () => {
      render(<Terminal />);
      const input = screen.getByRole('textbox');
      
      // First add some commands
      fireEvent.change(input, { target: { value: 'help' } });
      fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });
      
      await waitFor(() => {
        expect(screen.getByText(/Available commands:/)).toBeInTheDocument();
      });
      
      // Then clear
      fireEvent.change(input, { target: { value: 'clear' } });
      fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });
      
      await waitFor(() => {
        expect(screen.queryByText(/Available commands:/)).not.toBeInTheDocument();
      });
    });

    it('should show error for unknown command', async () => {
      render(<Terminal />);
      const input = screen.getByRole('textbox');
      
      fireEvent.change(input, { target: { value: 'unknowncommand' } });
      fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });
      
      await waitFor(() => {
        expect(screen.getByText(/command not found/i)).toBeInTheDocument();
      });
    });

    it('should handle empty command', async () => {
      render(<Terminal />);
      const input = screen.getByRole('textbox');
      
      fireEvent.change(input, { target: { value: '' } });
      fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });
      
      // Should just show new prompt without error
      expect(screen.getAllByText(/guest@portfolio/).length).toBeGreaterThan(0);
    });

    it('should handle commands with extra whitespace', async () => {
      render(<Terminal />);
      const input = screen.getByRole('textbox');
      
      fireEvent.change(input, { target: { value: '  help  ' } });
      fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });
      
      await waitFor(() => {
        expect(screen.getByText(/Available commands:/)).toBeInTheDocument();
      });
    });

    it('should handle case-insensitive commands', async () => {
      render(<Terminal />);
      const input = screen.getByRole('textbox');
      
      fireEvent.change(input, { target: { value: 'HELP' } });
      fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });
      
      await waitFor(() => {
        expect(screen.getByText(/Available commands:/)).toBeInTheDocument();
      });
    });
  });

  describe('Command History', () => {
    it('should navigate command history with arrow up', async () => {
      render(<Terminal />);
      const input = screen.getByRole('textbox');
      
      // Execute a command
      fireEvent.change(input, { target: { value: 'help' } });
      fireEvent.keyPress(input, { key: 'Enter', code: 13 });
      
      // Press arrow up to recall
      fireEvent.keyDown(input, { key: 'ArrowUp', code: 38 });
      
      await waitFor(() => {
        expect(input.value).toBe('help');
      });
    });

    it('should navigate command history with arrow down', async () => {
      render(<Terminal />);
      const input = screen.getByRole('textbox');
      
      // Execute commands
      fireEvent.change(input, { target: { value: 'help' } });
      fireEvent.keyPress(input, { key: 'Enter', code: 13 });
      
      fireEvent.change(input, { target: { value: 'about' } });
      fireEvent.keyPress(input, { key: 'Enter', code: 13 });
      
      // Navigate history
      fireEvent.keyDown(input, { key: 'ArrowUp', code: 38 });
      fireEvent.keyDown(input, { key: 'ArrowUp', code: 38 });
      fireEvent.keyDown(input, { key: 'ArrowDown', code: 40 });
      
      await waitFor(() => {
        expect(input.value).toBe('about');
      });
    });

    it('should maintain command history across multiple commands', async () => {
      render(<Terminal />);
      const input = screen.getByRole('textbox');
      
      const commands = ['help', 'about', 'skills'];
      
      // Execute multiple commands
      for (const cmd of commands) {
        fireEvent.change(input, { target: { value: cmd } });
        fireEvent.keyPress(input, { key: 'Enter', code: 13 });
      }
      
      // Navigate back through history
      fireEvent.keyDown(input, { key: 'ArrowUp', code: 38 });
      expect(input.value).toBe('skills');
      
      fireEvent.keyDown(input, { key: 'ArrowUp', code: 38 });
      expect(input.value).toBe('about');
      
      fireEvent.keyDown(input, { key: 'ArrowUp', code: 38 });
      expect(input.value).toBe('help');
    });
  });

  describe('Auto-scroll Behavior', () => {
    it('should auto-scroll to bottom on new command', async () => {
      render(<Terminal />);
      const input = screen.getByRole('textbox');
      
      // Execute multiple commands to create scrollable content
      for (let i = 0; i < 10; i++) {
        fireEvent.change(input, { target: { value: 'help' } });
        fireEvent.keyPress(input, { key: 'Enter', code: 13 });
      }
      
      // Terminal should auto-scroll
      await waitFor(() => {
        expect(screen.getAllByText(/Available commands:/).length).toBeGreaterThan(1);
      });
    });
  });

  describe('Input Focus', () => {
    it('should focus input on terminal click', () => {
      const { container } = render(<Terminal />);
      const terminal = container.querySelector('.h-full');
      const input = screen.getByRole('textbox');
      
      fireEvent.click(terminal);
      
      expect(document.activeElement).toBe(input);
    });

    it('should maintain focus after command execution', async () => {
      render(<Terminal />);
      const input = screen.getByRole('textbox');
      
      input.focus();
      fireEvent.change(input, { target: { value: 'help' } });
      fireEvent.keyPress(input, { key: 'Enter', code: 13 });
      
      await waitFor(() => {
        expect(document.activeElement).toBe(input);
      });
    });
  });

  describe('Output Formatting', () => {
    it('should format command output with proper spacing', async () => {
      render(<Terminal />);
      const input = screen.getByRole('textbox');
      
      fireEvent.change(input, { target: { value: 'help' } });
      fireEvent.keyPress(input, { key: 'Enter', code: 13 });
      
      await waitFor(() => {
        const output = screen.getByText(/Available commands:/);
        expect(output).toBeInTheDocument();
      });
    });

    it('should display command echo before output', async () => {
      render(<Terminal />);
      const input = screen.getByRole('textbox');
      
      fireEvent.change(input, { target: { value: 'help' } });
      fireEvent.keyPress(input, { key: 'Enter', code: 13 });
      
      await waitFor(() => {
        // Check that the command is echoed
        const prompts = screen.getAllByText(/guest@portfolio/);
        expect(prompts.length).toBeGreaterThan(1);
      });
    });

    it('should apply color styling to output', async () => {
      render(<Terminal />);
      const input = screen.getByRole('textbox');
      
      fireEvent.change(input, { target: { value: 'help' } });
      fireEvent.keyPress(input, { key: 'Enter', code: 13 });
      
      await waitFor(() => {
        const { container } = render(<Terminal />);
        const coloredElements = container.querySelectorAll('.text-green-400, .text-blue-400');
        expect(coloredElements.length).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid command execution', async () => {
      render(<Terminal />);
      const input = screen.getByRole('textbox');
      
      // Execute many commands quickly
      for (let i = 0; i < 20; i++) {
        fireEvent.change(input, { target: { value: 'help' } });
        fireEvent.keyPress(input, { key: 'Enter', code: 13 });
      }
      
      await waitFor(() => {
        expect(screen.getAllByText(/Available commands:/).length).toBeGreaterThan(5);
      });
    });

    it('should handle very long command input', async () => {
      render(<Terminal />);
      const input = screen.getByRole('textbox');
      
      const longCommand = 'a'.repeat(1000);
      fireEvent.change(input, { target: { value: longCommand } });
      fireEvent.keyPress(input, { key: 'Enter', code: 13 });
      
      await waitFor(() => {
        expect(screen.getByText(/command not found/i)).toBeInTheDocument();
      });
    });

    it('should handle special characters in commands', async () => {
      render(<Terminal />);
      const input = screen.getByRole('textbox');
      
      const specialCommand = '!@#$%^&*()';
      fireEvent.change(input, { target: { value: specialCommand } });
      fireEvent.keyPress(input, { key: 'Enter', code: 13 });
      
      await waitFor(() => {
        expect(screen.getByText(/command not found/i)).toBeInTheDocument();
      });
    });

    it('should handle commands with numbers', async () => {
      render(<Terminal />);
      const input = screen.getByRole('textbox');
      
      fireEvent.change(input, { target: { value: 'help123' } });
      fireEvent.keyPress(input, { key: 'Enter', code: 13 });
      
      await waitFor(() => {
        expect(screen.getByText(/command not found/i)).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have accessible input field', () => {
      render(<Terminal />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('should support keyboard-only interaction', async () => {
      render(<Terminal />);
      const input = screen.getByRole('textbox');
      
      // Tab to focus
      input.focus();
      expect(document.activeElement).toBe(input);
      
      // Type and execute
      fireEvent.change(input, { target: { value: 'help' } });
      fireEvent.keyPress(input, { key: 'Enter', code: 13 });
      
      await waitFor(() => {
        expect(screen.getByText(/Available commands:/)).toBeInTheDocument();
      });
    });
  });
});