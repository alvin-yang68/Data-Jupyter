import client from './index';
import { DataEntity } from '../entities';

export async function updateBrowser(editorContent: string): Promise<DataEntity> {
  const response = await client.post('/api/browser/update', { editorContent });
  return response.data;
}
