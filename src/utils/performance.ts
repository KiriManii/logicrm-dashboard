// src/utils/performance.ts
interface PerformanceMetrics {
  timeToFirstByte: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  timeToInteractive: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
}

export const capturePerformanceMetrics = (): Partial<PerformanceMetrics> => {
  const metrics: Partial<PerformanceMetrics> = {};
  
  // Time to First Byte
  const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  if (navigationEntry) {
    metrics.timeToFirstByte = navigationEntry.responseStart;
  }
  
  // First Contentful Paint
  const paintEntries = performance.getEntriesByType('paint');
  const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
  if (fcpEntry) {
    metrics.firstContentfulPaint = fcpEntry.startTime;
  }
  
  // In a real implementation, we would use PerformanceObserver for LCP, FID, and CLS
  // This is a simplified version
  
  return metrics;
};

export const reportPerformanceMetrics = (metrics: Partial<PerformanceMetrics>): void => {
  // In a real implementation, this would send data to an analytics service
  console.log('Performance metrics:', metrics);
  
  // Example implementation with a beacon
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/performance', JSON.stringify(metrics));
  } else {
    fetch('/api/performance', {
      method: 'POST',
      body: JSON.stringify(metrics),
      keepalive: true
    });
  }
};

export const initializePerformanceMonitoring = (): void => {
  // Monitor page load performance
  window.addEventListener('load', () => {
    // Use setTimeout to ensure all metrics are available
    setTimeout(() => {
      const metrics = capturePerformanceMetrics();
      reportPerformanceMetrics(metrics);
    }, 1000);
  });
  
  // Monitor performance on route changes (for SPA)
  // In a real app, this would hook into the router
  const originalPushState = history.pushState;
  history.pushState = function(...args) {
    originalPushState.apply(this, args);
    
    // Reset performance metrics
    performance.clearMarks();
    performance.clearMeasures();
    
    // Capture new metrics after the page settles
    setTimeout(() => {
      const metrics = capturePerformanceMetrics();
      reportPerformanceMetrics(metrics);
    }, 1000);
  };
};
