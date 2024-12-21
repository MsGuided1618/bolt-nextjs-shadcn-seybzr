export const COLORS = {
  primary: {
    DEFAULT: '#8B4513',
    light: '#A65D2E',
    dark: '#5C2E0E',
  },
  gold: {
    DEFAULT: '#BF9B30',
    light: '#D4B04A',
    dark: '#8C7125',
  },
  background: {
    DEFAULT: '#1C1917',
    light: '#292524',
    dark: '#0C0A09',
  },
  parchment: {
    DEFAULT: '#F5E6D3',
    light: '#FFF3E0',
    dark: '#E6D0B8',
  },
} as const;

export const GRADIENTS = {
  primary: 'from-stone-900 via-stone-800 to-[#2C1810]',
  chat: 'from-stone-900/95 via-stone-800/95 to-stone-800/95',
  parchment: 'from-transparent via-[#8B4513]/5 to-[#8B4513]/10',
} as const;