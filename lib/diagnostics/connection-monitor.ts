export interface ConnectionStatus {
  online: boolean;
  type: string | null;
  downlink: number | null;
  rtt: number | null;
}

export function getConnectionStatus(): ConnectionStatus {
  const connection = (navigator as any).connection || {};
  
  return {
    online: navigator.onLine,
    type: connection.effectiveType || null,
    downlink: connection.downlink || null,
    rtt: connection.rtt || null,
  };
}