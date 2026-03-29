import '@testing-library/jest-dom'

// Node 25 exposes a built-in localStorage that lacks .clear()/.getItem()/.setItem().
// Replace it with a proper in-memory implementation for tests.
const localStorageMock = (() => {
  let store = {}
  return {
    getItem: (key) => (key in store ? store[key] : null),
    setItem: (key, value) => { store[key] = String(value) },
    removeItem: (key) => { delete store[key] },
    clear: () => { store = {} },
    get length() { return Object.keys(store).length },
    key: (i) => Object.keys(store)[i] ?? null,
  }
})()

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  writable: true,
})
