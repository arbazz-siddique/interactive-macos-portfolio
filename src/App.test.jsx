import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App.jsx'

// Mock the components
vi.mock('#components', () => ({
  Navbar: () => <nav data-testid="navbar">Navbar</nav>,
  Welcome: () => <section data-testid="welcome">Welcome</section>
}))

describe('App Component', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<App />)
      expect(screen.getByRole('main')).toBeInTheDocument()
    })

    it('should render Navbar component', () => {
      render(<App />)
      expect(screen.getByTestId('navbar')).toBeInTheDocument()
    })

    it('should render Welcome component', () => {
      render(<App />)
      expect(screen.getByTestId('welcome')).toBeInTheDocument()
    })

    it('should render components in correct order', () => {
      const { container } = render(<App />)
      const main = container.querySelector('main')
      const children = Array.from(main?.children || [])
      
      expect(children.length).toBe(2)
      expect(children[0]).toHaveAttribute('data-testid', 'navbar')
      expect(children[1]).toHaveAttribute('data-testid', 'welcome')
    })
  })

  describe('Structure', () => {
    it('should have main element as root', () => {
      const { container } = render(<App />)
      const main = container.querySelector('main')
      
      expect(main).toBeInTheDocument()
      expect(main?.tagName).toBe('MAIN')
    })

    it('should contain exactly two child components', () => {
      const { container } = render(<App />)
      const main = container.querySelector('main')
      
      expect(main?.children.length).toBe(2)
    })
  })

  describe('Component Integration', () => {
    it('should properly integrate Navbar and Welcome', () => {
      render(<App />)
      
      const navbar = screen.getByTestId('navbar')
      const welcome = screen.getByTestId('welcome')
      
      expect(navbar).toBeInTheDocument()
      expect(welcome).toBeInTheDocument()
    })

    it('should maintain component hierarchy', () => {
      const { container } = render(<App />)
      const main = container.querySelector('main')
      
      expect(main).toContainElement(screen.getByTestId('navbar'))
      expect(main).toContainElement(screen.getByTestId('welcome'))
    })
  })

  describe('Edge Cases', () => {
    it('should handle multiple renders correctly', () => {
      const { rerender } = render(<App />)
      
      expect(() => {
        rerender(<App />)
        rerender(<App />)
      }).not.toThrow()
    })

    it('should render consistently', () => {
      const { container: container1 } = render(<App />)
      const { container: container2 } = render(<App />)
      
      expect(container1.querySelector('main')?.children.length)
        .toBe(container2.querySelector('main')?.children.length)
    })
  })

  describe('Accessibility', () => {
    it('should have proper semantic structure with main element', () => {
      render(<App />)
      const main = screen.getByRole('main')
      
      expect(main).toBeInTheDocument()
    })
  })
})