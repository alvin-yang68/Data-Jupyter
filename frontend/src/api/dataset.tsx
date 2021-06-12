import client from './index';
import { DataEntity } from '../entities';

export async function loadDataset(selectedDataset: string): Promise<DataEntity> {
  const response = await client.get(`/api/dataset/${selectedDataset}`);
  return response.data;
}
