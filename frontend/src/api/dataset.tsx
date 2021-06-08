import client from './index';
import { Data } from '../entities';

type InitialSession = {
  data: Data;
  sessionState: string;
}

export async function fetchDataset(payload: string): Promise<InitialSession> {
  const response = await client.get(`/dataset?name=${payload}`);
  return response.data;
}
