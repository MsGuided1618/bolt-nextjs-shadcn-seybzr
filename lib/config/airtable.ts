export const AIRTABLE_CONFIG = {
  apiKey: 'patqUjP2pzWFIIadX.c83f21f1a0dde5f86ca707e413b5d231bb144ef89352fb92a394c05d6619d621',
  baseUrl: 'https://api.airtable.com/v0',
  version: 'v0',
} as const;

// Image field configuration
export const AIRTABLE_IMAGE_CONFIG = {
  ANDREW_JACKSON: 'https://v5.airtableusercontent.com/v3/u/36/36/1734602400000/E-0UkIOJA0x-BNS_efGscw/O5cUWvxUX1nL3qzVnalDIRg7m8JKA9tBamfKwk-whTLaOd_RPNZBn8zbPBewsohHjvGk9G1gFlrq0rKxn9lh_fTjTX4Rpvv1AsvsJYfksZ3ECGUw-j6rPzxHil7gceyIN9IzCeHuU72HPNwVeL73Ag/WiDLFCAUyMNq5jyClpgvw3jjxaaes23Sn_MpYOtdZSQ',
} as const;

export interface AirtableFoundingFather {
  id: string;
  name: string;
  role: string;
  image: string;
  expertise: string[];
  beliefs: string[];
  description: string;
}

// These will be populated once you provide the Base ID
export const AIRTABLE_TABLES = {
  FOUNDING_FATHERS: {
    baseId: '', // To be filled with your Base ID
    tableName: 'Founding Fathers',
  },
} as const;