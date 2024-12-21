import { airtableService } from './airtable';
import { AIRTABLE_TABLES } from '@/lib/config/airtable';
import type { FoundingFather } from '@/lib/data/founding-fathers/types';

export async function getFoundingFathersFromAirtable(): Promise<FoundingFather[]> {
  try {
    const records = await airtableService.getRecords(
      AIRTABLE_TABLES.FOUNDING_FATHERS.baseId,
      AIRTABLE_TABLES.FOUNDING_FATHERS.tableName
    );

    return records.map(record => ({
      id: record.id,
      name: record.fields.name,
      role: record.fields.role,
      image: record.fields.image[0].url, // Assuming image is an attachment field
      expertise: record.fields.expertise.split(',').map((s: string) => s.trim()),
      beliefs: record.fields.beliefs.split(',').map((s: string) => s.trim()),
      description: record.fields.description,
    }));
  } catch (error) {
    console.error('Error fetching founding fathers from Airtable:', error);
    throw error;
  }
}

export async function updateFoundingFatherImage(
  founderId: string,
  imageUrl: string
): Promise<void> {
  try {
    await airtableService.updateRecord(
      AIRTABLE_TABLES.FOUNDING_FATHERS.baseId,
      AIRTABLE_TABLES.FOUNDING_FATHERS.tableName,
      founderId,
      { image: [{ url: imageUrl }] }
    );
  } catch (error) {
    console.error('Error updating founding father image:', error);
    throw error;
  }
}