import { DatabaseModel } from '../types';
import client from './index';

export async function fetchDatasets(databaseModel: string): Promise<string[]> {
  const response = await client.get(`/api/${databaseModel}/dataset`);
  return response.data;
}

export type UploadDatasetPayload = {
  databaseModel: DatabaseModel;
  formData: FormData;
}

export async function uploadDataset(payload: UploadDatasetPayload): Promise<string> {
  const { databaseModel, formData } = payload;

  const response = await client.post(`/api/${databaseModel}/dataset`, formData);
  return response.data;
}
