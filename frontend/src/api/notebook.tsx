import client from './index';
import { CellExecutionResult } from '../types';

type UpdateBrowserPayload = {
  databaseModel: string | null;
  selectedDataset: string;
  editorContent: string;
}

export async function updateBrowser(payload: UpdateBrowserPayload): Promise<CellExecutionResult> {
  const { databaseModel, ...request } = payload;

  const response = await client.post(`/api/${databaseModel}/run`, request);
  return response.data;
}

export async function resetSessionContext(): Promise<void> {
  const response = await client.get('/api/reset');
  return response.data;
}
