import client from './index';
import { CellExecutionResult } from '../entities';

export async function updateBrowser(editorContent: string): Promise<CellExecutionResult> {
  const response = await client.post('/api/browser', { editorContent });
  return response.data;
}
