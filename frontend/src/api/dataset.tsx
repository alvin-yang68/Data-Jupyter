import client from './index';
import { DataEntity } from '../entities';

export async function loadDataset(selectedDataset: string): Promise<DataEntity> {
  const response = await client.post('/api/v1/load', { selectedDataset });
  return response.data;
}

export async function updateBrowser(editorContent: string): Promise<DataEntity> {
  const response = await client.post('/api/v1/update', { editorContent });
  return response.data;
}
