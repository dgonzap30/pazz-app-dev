import { useState, useEffect, RefObject } from 'react';

interface ScrollFadeState {
  showLeftFade: boolean;
  showRightFade: boolean;
}

/**
 * Hook to detect scroll position and show/hide fade indicators
 * @param ref - Reference to the scrollable element
 * @returns Object with showLeftFade and showRightFade boolean flags
 */
export const useScrollFade = (ref: RefObject<HTMLElement>): ScrollFadeState => {
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const checkScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = element;
      
      // Show left fade if scrolled more than 10px from start
      setShowLeftFade(scrollLeft > 10);
      
      // Show right fade if there's more content to scroll
      // Account for 10px threshold to handle rounding issues
      setShowRightFade(scrollLeft + clientWidth < scrollWidth - 10);
    };
    
    // Initial check
    checkScroll();
    
    // Listen for scroll events
    element.addEventListener('scroll', checkScroll, { passive: true });
    
    // Listen for resize events that might affect overflow
    const resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(element);
    
    return () => {
      element.removeEventListener('scroll', checkScroll);
      resizeObserver.disconnect();
    };
  }, [ref]);
  
  return { showLeftFade, showRightFade };
};