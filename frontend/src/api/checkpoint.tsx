import client from './index';

import { DataEntity, CheckpointEntity, CheckpointDetailEntity } from '../entities';
import { EditorState } from '../slices/editor';

export async function fetchCheckpoints(): Promise<CheckpointDetailEntity[]> {
  const response = await client.get('/api/checkpoint/');
  return response.data;
}

type CheckpointPayload = {
  editorState: EditorState;
  browserState: DataEntity;
  selectedDataset: string;
}

export async function saveCheckpoint(payload: CheckpointPayload): Promise<void> {
  const timestamp = new Date().toLocaleString();
  const response = await client.post('/api/checkpoint/', { ...payload, timestamp });
  return response.data;
}

export async function loadCheckpoint(id: string): Promise<CheckpointEntity> {
  const response = await client.get(`/api/checkpoint/${id}`);
  return response.data;
}
