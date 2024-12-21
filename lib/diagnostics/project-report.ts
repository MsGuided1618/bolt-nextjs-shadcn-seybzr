import { version } from '../../package.json';

export interface ProjectReport {
  version: string;
  structure: {
    organization: string[];
    improvements: string[];
  };
  performance: {
    optimizations: string[];
    warnings: string[];
  };
  security: {
    recommendations: string[];
  };
}

export const generateProjectReport = (): ProjectReport => ({
  version: version,
  structure: {
    organization: [
      "✅ Proper modular architecture with clear separation of concerns",
      "✅ Consistent file naming conventions",
      "✅ Well-organized component hierarchy",
      "✅ Clear data flow patterns",
      "✅ Type-safe API implementations"
    ],
    improvements: [
      "Consider implementing proper error boundaries",
      "Add proper loading states for data fetching",
      "Implement proper test coverage",
      "Add proper documentation for components and utilities"
    ]
  },
  performance: {
    optimizations: [
      "Implement proper code splitting",
      "Add proper caching strategies",
      "Optimize image loading with proper sizing",
      "Implement proper lazy loading for components"
    ],
    warnings: [
      "Multiple re-renders in form components",
      "Large bundle size due to unused exports",
      "Unnecessary prop drilling in some components"
    ]
  },
  security: {
    recommendations: [
      "Implement proper input sanitization",
      "Add proper CSRF protection",
      "Implement proper rate limiting",
      "Add proper content security policies"
    ]
  }
});