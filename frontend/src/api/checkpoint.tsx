import client from './index';

import { CheckpointEntity, CheckpointDetailEntity } from '../entities';

export async function fetchCheckpoints(): Promise<CheckpointDetailEntity[]> {
  const response = await client.get('/api/checkpoint/');
  return response.data;
}

export async function saveCheckpoint(payload: CheckpointEntity): Promise<void> {
  const timestamp = new Date().toLocaleString();
  const response = await client.post('/api/checkpoint/', { ...payload, timestamp });
  return response.data;
}

export async function loadCheckpoint(id: string): Promise<CheckpointEntity> {
  const response = await client.get(`/api/checkpoint/${id}`);
  return response.data;
}
