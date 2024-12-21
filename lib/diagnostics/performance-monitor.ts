export interface PerformanceMetrics {
  memoryUsage: number;
  loadTime: number;
  firstPaint: number;
  firstContentfulPaint: number;
}

export function getPerformanceMetrics(): PerformanceMetrics {
  const memory = (performance as any).memory || {};
  const timing = performance.timing || {};
  
  return {
    memoryUsage: memory.usedJSHeapSize || 0,
    loadTime: timing.loadEventEnd - timing.navigationStart || 0,
    firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0,
    firstContentfulPaint: performance.getEntriesByType('paint')[1]?.startTime || 0,
  };
}