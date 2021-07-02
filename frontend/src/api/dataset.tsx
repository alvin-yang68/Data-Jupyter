import client from './index';

type UploadDatasetPayload = {
  databaseModel: string;
  file: FormData;
}

export async function uploadDataset(payload: UploadDatasetPayload): Promise<string> {
  const { databaseModel, file } = payload;

  const response = await client.post(`/api/${databaseModel}/upload`, file);
  return response.data;
}
