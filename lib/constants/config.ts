export const APP_CONFIG = {
  title: "Ask the Founding Fathers",
  description: "Engage in enlightened discourse with America's founding generation",
  author: "StackBlitz",
  version: "1.0.0",
} as const;

export const EDITOR_CONFIG = {
  minHeight: "200px",
  placeholder: "Present your inquiry...",
  headingLevels: [2, 3],
} as const;

export const PDF_CONFIG = {
  filename: "founding-father-response",
  format: "a4",
  margin: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  },
  fonts: {
    title: {
      size: 24,
      family: "times",
      style: "bold",
    },
    heading: {
      size: 14,
      family: "times",
      style: "bold",
    },
    body: {
      size: 12,
      family: "times",
      style: "normal",
    },
  },
} as const;