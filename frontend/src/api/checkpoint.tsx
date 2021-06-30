import client from './index';

import { Checkpoint, CheckpointMeta, DatabaseModel } from '../types';

export async function fetchCheckpoints(databaseModel: DatabaseModel): Promise<CheckpointMeta[]> {
  const response = await client.get(`/api/checkpoint?databaseModel=${databaseModel}`);
  return response.data;
}

export async function saveCheckpoint(payload: Checkpoint): Promise<void> {
  const response = await client.post(
    `/api/checkpoint?databaseModel=${payload.databaseModel}`,
    payload,
  );
  return response.data;
}

export async function loadCheckpoint(id: string): Promise<Checkpoint> {
  const response = await client.get(`/api/checkpoint/${id}`);
  return response.data;
}
