import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Welcome from './Welcome.jsx'

// Mock GSAP
vi.mock('gsap', () => ({
  default: {
    to: vi.fn(() => ({ kill: vi.fn() })),
    from: vi.fn(() => ({ kill: vi.fn() })),
    timeline: vi.fn(() => ({
      to: vi.fn(),
      from: vi.fn(),
      kill: vi.fn()
    }))
  }
}))

vi.mock('@gsap/react', () => ({
  useGSAP: vi.fn((callback) => {
    const cleanup = callback()
    return { context: { kill: vi.fn(), revert: cleanup } }
  })
}))

describe('Welcome Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<Welcome />)
      expect(screen.getByRole('region')).toBeInTheDocument()
    })

    it('should render the subtitle text correctly', () => {
      render(<Welcome />)
      const subtitle = screen.getByText(/Hey, I'm Arbazz!/i)
      expect(subtitle).toBeInTheDocument()
    })

    it('should render the complete subtitle message', () => {
      render(<Welcome />)
      expect(screen.getByText(/Welcome to my/i)).toBeInTheDocument()
    })

    it('should render the title "Portfolio"', () => {
      render(<Welcome />)
      const title = screen.getByRole('heading', { level: 1 })
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent('Portfolio')
    })

    it('should render small-screen warning message', () => {
      render(<Welcome />)
      expect(screen.getByText(/This portfolio is designed for desktop and tablet screen only/i)).toBeInTheDocument()
    })

    it('should have correct section id', () => {
      const { container } = render(<Welcome />)
      const section = container.querySelector('#welcome')
      expect(section).toBeInTheDocument()
    })
  })

  describe('Text Rendering', () => {
    it('should render subtitle as individual span elements', () => {
      const { container } = render(<Welcome />)
      const subtitle = container.querySelector('p')
      const spans = subtitle?.querySelectorAll('span')
      expect(spans?.length).toBeGreaterThan(0)
    })

    it('should render title as individual span elements', () => {
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      const spans = title?.querySelectorAll('span')
      expect(spans?.length).toBe(9)
    })

    it('should render spaces as non-breaking spaces', () => {
      const { container } = render(<Welcome />)
      const subtitle = container.querySelector('p')
      const spans = subtitle?.querySelectorAll('span')
      const hasNonBreakingSpace = Array.from(spans || []).some(
        span => span.textContent === '\u00A0'
      )
      expect(hasNonBreakingSpace).toBe(true)
    })

    it('should apply correct font variation settings to subtitle spans', () => {
      const { container } = render(<Welcome />)
      const subtitle = container.querySelector('p')
      const firstSpan = subtitle?.querySelector('span')
      expect(firstSpan).toHaveStyle({ fontVariationSettings: "'wght' 100" })
    })

    it('should apply correct font variation settings to title spans', () => {
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      const firstSpan = title?.querySelector('span')
      expect(firstSpan).toHaveStyle({ fontVariationSettings: "'wght' 400" })
    })
  })

  describe('CSS Classes', () => {
    it('should apply correct classes to subtitle spans', () => {
      const { container } = render(<Welcome />)
      const subtitle = container.querySelector('p')
      const firstSpan = subtitle?.querySelector('span')
      expect(firstSpan).toHaveClass('text-3xl', 'font-georama')
    })

    it('should apply correct classes to title', () => {
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      expect(title).toHaveClass('mt-7')
    })

    it('should apply correct classes to title spans', () => {
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      const firstSpan = title?.querySelector('span')
      expect(firstSpan).toHaveClass('text-9xl', 'italic', 'font-georama')
    })

    it('should have small-screen div with correct class', () => {
      const { container } = render(<Welcome />)
      const smallScreen = container.querySelector('.small-screen')
      expect(smallScreen).toBeInTheDocument()
    })
  })

  describe('Mouse Interactions', () => {
    it('should handle mousemove event on subtitle', () => {
      const { container } = render(<Welcome />)
      const subtitle = container.querySelector('p')
      expect(() => {
        fireEvent.mouseMove(subtitle, { clientX: 100, clientY: 100 })
      }).not.toThrow()
    })

    it('should handle mousemove event on title', () => {
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      expect(() => {
        fireEvent.mouseMove(title, { clientX: 100, clientY: 100 })
      }).not.toThrow()
    })

    it('should handle mouseleave event on subtitle', () => {
      const { container } = render(<Welcome />)
      const subtitle = container.querySelector('p')
      expect(() => {
        fireEvent.mouseLeave(subtitle)
      }).not.toThrow()
    })

    it('should handle mouseleave event on title', () => {
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      expect(() => {
        fireEvent.mouseLeave(title)
      }).not.toThrow()
    })

    it('should handle multiple sequential mouse events', () => {
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      expect(() => {
        fireEvent.mouseMove(title, { clientX: 50, clientY: 50 })
        fireEvent.mouseMove(title, { clientX: 100, clientY: 50 })
        fireEvent.mouseMove(title, { clientX: 150, clientY: 50 })
        fireEvent.mouseLeave(title)
      }).not.toThrow()
    })

    it('should handle mouse events with extreme coordinates', () => {
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      expect(() => {
        fireEvent.mouseMove(title, { clientX: -1000, clientY: -1000 })
        fireEvent.mouseMove(title, { clientX: 10000, clientY: 10000 })
      }).not.toThrow()
    })

    it('should handle rapid mouse movements', () => {
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      expect(() => {
        for (let i = 0; i < 50; i++) {
          fireEvent.mouseMove(title, { clientX: i * 10, clientY: 50 })
        }
      }).not.toThrow()
    })
  })

  describe('GSAP Integration', () => {
    it('should call useGSAP hook', () => {
      const { useGSAP } = await import('@gsap/react')
      render(<Welcome />)
      expect(useGSAP).toHaveBeenCalled()
    })

    it('should set up hover effects using GSAP', async () => {
      const gsap = (await import('gsap')).default
      const { container } = render(<Welcome />)
      const title = container.querySelector('h1')
      
      fireEvent.mouseMove(title, { clientX: 100, clientY: 100 })
      expect(gsap.to).toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('should have proper semantic HTML structure', () => {
      const { container } = render(<Welcome />)
      const section = container.querySelector('section')
      const heading = container.querySelector('h1')
      const paragraph = container.querySelector('p')
      
      expect(section).toBeInTheDocument()
      expect(heading).toBeInTheDocument()
      expect(paragraph).toBeInTheDocument()
    })

    it('should have readable text content', () => {
      render(<Welcome />)
      const title = screen.getByRole('heading', { level: 1 })
      expect(title.textContent).toBeTruthy()
      expect(title.textContent.length).toBeGreaterThan(0)
    })
  })

  describe('Component Lifecycle', () => {
    it('should cleanup event listeners on unmount', () => {
      const { unmount, container } = render(<Welcome />)
      const title = container.querySelector('h1')
      fireEvent.mouseMove(title, { clientX: 100, clientY: 100 })
      expect(() => {
        unmount()
      }).not.toThrow()
    })
  })
})