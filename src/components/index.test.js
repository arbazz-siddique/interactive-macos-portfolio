import { describe, it, expect } from 'vitest'

describe('Components Index', () => {
  describe('Exports', () => {
    it('should export Navbar component', async () => {
      const { Navbar } = await import('./index.js')
      expect(Navbar).toBeDefined()
      expect(typeof Navbar).toBe('function')
    })

    it('should export Welcome component', async () => {
      const { Welcome } = await import('./index.js')
      expect(Welcome).toBeDefined()
      expect(typeof Welcome).toBe('function')
    })

    it('should have named exports', async () => {
      const exports = await import('./index.js')
      expect(exports).toHaveProperty('Navbar')
      expect(exports).toHaveProperty('Welcome')
    })
  })

  describe('Component Types', () => {
    it('should export Navbar as a React component', async () => {
      const { Navbar } = await import('./index.js')
      expect(Navbar).toBeDefined()
      expect(typeof Navbar).toBe('function')
    })

    it('should export Welcome as a React component', async () => {
      const { Welcome } = await import('./index.js')
      expect(Welcome).toBeDefined()
      expect(typeof Welcome).toBe('function')
    })
  })

  describe('Module Structure', () => {
    it('should be importable using destructuring', async () => {
      expect(async () => {
        const { Navbar, Welcome } = await import('./index.js')
        return { Navbar, Welcome }
      }).not.toThrow()
    })

    it('should resolve component imports correctly', async () => {
      const { Navbar, Welcome } = await import('./index.js')
      
      expect(Navbar).not.toBe(Welcome)
      expect(Navbar).toBeTruthy()
      expect(Welcome).toBeTruthy()
    })
  })
})