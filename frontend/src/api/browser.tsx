import client from './index';
import { CellExecutionResult } from '../entities';

type UpdateBrowserPayload = {
  selectedDataset: string;
  editorContent: string;
}

export async function updateBrowser(payload: UpdateBrowserPayload): Promise<CellExecutionResult> {
  const response = await client.post('/api/run', payload);
  return response.data;
}
