export interface EnvironmentConfig {
  nodeEnv: string;
  nextVersion: string;
  reactVersion: string;
  buildTime: string;
  deploymentUrl: string | null;
}

export const getEnvironmentConfig = (): EnvironmentConfig => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  nextVersion: process.env.NEXT_VERSION || '14.1.0',
  reactVersion: process.env.REACT_VERSION || '18.2.0',
  buildTime: new Date().toISOString(),
  deploymentUrl: process.env.VERCEL_URL || null,
});