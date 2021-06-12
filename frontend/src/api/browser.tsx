import client from './index';
import { DataEntity } from '../entities';

interface UpdateBrowserResult extends DataEntity {
  cellError: boolean;
  browserUpdated: boolean;
}

export async function updateBrowser(editorContent: string): Promise<UpdateBrowserResult> {
  const response = await client.post('/api/browser', { editorContent });
  return response.data;
}
