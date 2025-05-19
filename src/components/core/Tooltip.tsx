// src/components/core/Tooltip.tsx
import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = 'top',
  delay = 300,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const showTooltip = () => {
    timerRef.current = setTimeout(() => {
      setIsVisible(true);
      updatePosition();
    }, delay);
  };
  
  const hideTooltip = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsVisible(false);
  };
  
  const updatePosition = () => {
    if (!targetRef.current || !tooltipRef.current) return;
    
    const targetRect = targetRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    
    let x = 0;
    let y = 0;
    
    switch (position) {
      case 'top':
        x = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
        y = targetRect.top - tooltipRect.height - 8;
        break;
      case 'right':
        x = targetRect.right + 8;
        y = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
        break;
      case 'bottom':
        x = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
        y = targetRect.bottom + 8;
        break;
      case 'left':
        x = targetRect.left - tooltipRect.width - 8;
        y = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
        break;
    }
    
    // Make sure tooltip doesn't go off screen
    const padding = 10;
    x = Math.max(padding, Math.min(x, window.innerWidth - tooltipRect.width - padding));
    y = Math.max(padding, Math.min(y, window.innerHeight - tooltipRect.height - padding));
    
    setCoords({ x, y });
  };
  
  // Update position on window resize
  useEffect(() => {
    if (isVisible) {
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition);
      
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition);
      };
    }
  }, [isVisible]);
  
  // Position classes based on position prop
  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
  };
  
  // Arrow classes based on position
  const arrowClasses = {
    top: 'bottom-[-5px] left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent',
    right: 'left-[-5px] top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent',
    bottom: 'top-[-5px] left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent',
    left: 'right-[-5px] top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent',
  };
  
  return (
    <div className="relative inline-block" ref={targetRef}>
      <div
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        {children}
      </div>
      
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`
            fixed z-50 px-2 py-1 text-xs font-medium
            text-white bg-gray-900 dark:bg-gray-700 rounded shadow-sm
            max-w-xs pointer-events-none
            ${className}
          `}
          style={{ left: `${coords.x}px`, top: `${coords.y}px` }}
        >
          {content}
          <div className={`absolute w-0 h-0 border-4 ${arrowClasses[position]}`}></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
