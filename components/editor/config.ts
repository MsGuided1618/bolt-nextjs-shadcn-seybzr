// Editor configuration constants
export const EDITOR_CONFIG = {
  placeholder: "Present your inquiry...",
  className: "prose prose-stone prose-invert max-w-none min-h-[200px] px-4 py-3 focus:outline-none text-stone-200",
  extensions: {
    immediatelyRender: true, // Enable immediate rendering
    history: {
      depth: 10,
      newGroupDelay: 300
    }
  }
} as const;