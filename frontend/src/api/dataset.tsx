import client from './index';
import { DataEntity } from '../entities';

export async function updateBrowser(selectedDataset: string, editorContent: string): Promise<DataEntity> {
  // const response = await client.post('/compute', { selectedDataset, editorContent });
  // return response.data;
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('test');
      resolve({
        raw: editorContent, html: 'Test', console: 'Test',
      });
    }, 3000);
  });
}
