import { AIRTABLE_CONFIG } from '@/lib/config/airtable';

interface AirtableRecord {
  id: string;
  fields: Record<string, any>;
  createdTime: string;
}

export class AirtableService {
  private static instance: AirtableService;
  private baseUrl: string;
  private headers: HeadersInit;

  private constructor() {
    this.baseUrl = AIRTABLE_CONFIG.baseUrl;
    this.headers = {
      'Authorization': `Bearer ${AIRTABLE_CONFIG.apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  public static getInstance(): AirtableService {
    if (!AirtableService.instance) {
      AirtableService.instance = new AirtableService();
    }
    return AirtableService.instance;
  }

  async getRecords(baseId: string, tableName: string): Promise<AirtableRecord[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/${baseId}/${tableName}`,
        { headers: this.headers }
      );

      if (!response.ok) {
        throw new Error(`Airtable API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.records;
    } catch (error) {
      console.error('Error fetching Airtable records:', error);
      throw error;
    }
  }

  async createRecord(
    baseId: string, 
    tableName: string, 
    fields: Record<string, any>
  ): Promise<AirtableRecord> {
    try {
      const response = await fetch(
        `${this.baseUrl}/${baseId}/${tableName}`,
        {
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify({ fields }),
        }
      );

      if (!response.ok) {
        throw new Error(`Airtable API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating Airtable record:', error);
      throw error;
    }
  }

  async updateRecord(
    baseId: string,
    tableName: string,
    recordId: string,
    fields: Record<string, any>
  ): Promise<AirtableRecord> {
    try {
      const response = await fetch(
        `${this.baseUrl}/${baseId}/${tableName}/${recordId}`,
        {
          method: 'PATCH',
          headers: this.headers,
          body: JSON.stringify({ fields }),
        }
      );

      if (!response.ok) {
        throw new Error(`Airtable API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating Airtable record:', error);
      throw error;
    }
  }
}

export const airtableService = AirtableService.getInstance();