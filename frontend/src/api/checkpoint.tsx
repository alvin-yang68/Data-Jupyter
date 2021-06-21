import client from './index';

import { Checkpoint, CheckpointMeta } from '../entities';

export async function fetchCheckpoints(): Promise<CheckpointMeta[]> {
  const response = await client.get('/api/checkpoint');
  return response.data;
}

export async function saveCheckpoint(payload: Checkpoint): Promise<void> {
  const timestamp = new Date().toLocaleString();
  const response = await client.post('/api/checkpoint', { ...payload, timestamp });
  return response.data;
}

export async function loadCheckpoint(id: string): Promise<Checkpoint> {
  const response = await client.get(`/api/checkpoint/${id}`);
  return response.data;
}
