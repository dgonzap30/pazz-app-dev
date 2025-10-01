import { describe, test, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useScrollFade } from './useScrollFade';

// Mock ResizeObserver type
type MockResizeObserver = {
  observe: ReturnType<typeof vi.fn>;
  unobserve: ReturnType<typeof vi.fn>;
  disconnect: ReturnType<typeof vi.fn>;
};

describe('useScrollFade', () => {
  let mockElement: HTMLElement;
  let resizeObserverMock: MockResizeObserver;
  let resizeObserverCallback: ((entries: ResizeObserverEntry[], observer: ResizeObserver) => void);

  beforeEach(() => {
    // Create mock element
    mockElement = document.createElement('div');
    Object.defineProperties(mockElement, {
      scrollLeft: { value: 0, writable: true },
      scrollWidth: { value: 200, writable: true },
      clientWidth: { value: 100, writable: true },
    });

    // Mock ResizeObserver
    resizeObserverMock = {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    };
    
    global.ResizeObserver = vi.fn().mockImplementation((callback) => {
      resizeObserverCallback = callback;
      return resizeObserverMock;
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('returns no fades when element is null', () => {
    const ref = { current: null };
    const { result } = renderHook(() => useScrollFade(ref));
    
    expect(result.current.showLeftFade).toBe(false);
    expect(result.current.showRightFade).toBe(false);
  });

  test('shows right fade when content overflows and scrolled to start', () => {
    const ref = { current: mockElement };
    Object.defineProperty(mockElement, 'scrollLeft', { value: 0, writable: true });
    Object.defineProperty(mockElement, 'scrollWidth', { value: 200, writable: true });
    Object.defineProperty(mockElement, 'clientWidth', { value: 100, writable: true });
    
    const { result } = renderHook(() => useScrollFade(ref));
    
    expect(result.current.showLeftFade).toBe(false);
    expect(result.current.showRightFade).toBe(true);
  });

  test('shows left fade when scrolled from start', () => {
    const ref = { current: mockElement };
    Object.defineProperty(mockElement, 'scrollLeft', { value: 50, writable: true });
    
    const { result } = renderHook(() => useScrollFade(ref));
    
    expect(result.current.showLeftFade).toBe(true);
  });

  test('shows both fades when scrolled in middle', () => {
    const ref = { current: mockElement };
    Object.defineProperty(mockElement, 'scrollLeft', { value: 50, writable: true });
    Object.defineProperty(mockElement, 'scrollWidth', { value: 200, writable: true });
    Object.defineProperty(mockElement, 'clientWidth', { value: 100, writable: true });
    
    const { result } = renderHook(() => useScrollFade(ref));
    
    expect(result.current.showLeftFade).toBe(true);
    expect(result.current.showRightFade).toBe(true);
  });

  test('hides right fade when scrolled to end', () => {
    const ref = { current: mockElement };
    Object.defineProperty(mockElement, 'scrollLeft', { value: 100, writable: true });
    Object.defineProperty(mockElement, 'scrollWidth', { value: 200, writable: true });
    Object.defineProperty(mockElement, 'clientWidth', { value: 100, writable: true });
    
    const { result } = renderHook(() => useScrollFade(ref));
    
    expect(result.current.showLeftFade).toBe(true);
    expect(result.current.showRightFade).toBe(false);
  });

  test('shows no fades when content fits without scrolling', () => {
    const ref = { current: mockElement };
    Object.defineProperty(mockElement, 'scrollWidth', { value: 100, writable: true });
    Object.defineProperty(mockElement, 'clientWidth', { value: 100, writable: true });
    
    const { result } = renderHook(() => useScrollFade(ref));
    
    expect(result.current.showLeftFade).toBe(false);
    expect(result.current.showRightFade).toBe(false);
  });

  test('adds scroll event listener to element', () => {
    const addEventListenerSpy = vi.spyOn(mockElement, 'addEventListener');
    const ref = { current: mockElement };
    
    renderHook(() => useScrollFade(ref));
    
    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true });
  });

  test('sets up ResizeObserver to observe element', () => {
    const ref = { current: mockElement };
    
    renderHook(() => useScrollFade(ref));
    
    expect(resizeObserverMock.observe).toHaveBeenCalledWith(mockElement);
  });

  test('cleans up event listener and ResizeObserver on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(mockElement, 'removeEventListener');
    const ref = { current: mockElement };
    
    const { unmount } = renderHook(() => useScrollFade(ref));
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    expect(resizeObserverMock.disconnect).toHaveBeenCalled();
  });

  test('updates fades on scroll event', () => {
    const addEventListenerSpy = vi.spyOn(mockElement, 'addEventListener');
    const ref = { current: mockElement };
    const { result } = renderHook(() => useScrollFade(ref));
    
    expect(result.current.showLeftFade).toBe(false);
    
    // Simulate scroll
    Object.defineProperty(mockElement, 'scrollLeft', { value: 50, writable: true });
    const scrollHandler = addEventListenerSpy.mock.calls[0][1] as EventListener;
    
    act(() => {
      scrollHandler(new Event('scroll'));
    });
    
    expect(result.current.showLeftFade).toBe(true);
  });

  test('updates fades on resize', () => {
    const ref = { current: mockElement };
    const { result } = renderHook(() => useScrollFade(ref));
    
    // Initially shows right fade
    expect(result.current.showRightFade).toBe(true);
    
    // Simulate resize making content fit
    Object.defineProperty(mockElement, 'clientWidth', { value: 200, writable: true });
    
    act(() => {
      const mockEntry = {
        target: mockElement,
        contentRect: {} as DOMRectReadOnly,
        borderBoxSize: [],
        contentBoxSize: [],
        devicePixelContentBoxSize: [],
      } as ResizeObserverEntry;
      resizeObserverCallback([mockEntry], resizeObserverMock as unknown as ResizeObserver);
    });
    
    expect(result.current.showRightFade).toBe(false);
  });
});