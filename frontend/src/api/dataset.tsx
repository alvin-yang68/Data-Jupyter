import client from './index';
import { Dataset } from '../entities';

export async function loadDataset(selectedDataset: string): Promise<Dataset> {
  const response = await client.get(`/api/dataset/${selectedDataset}`);
  return response.data;
}
