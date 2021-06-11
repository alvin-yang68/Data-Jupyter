import { EditorState } from '../slices/editor';

export interface DataEntity {
  raw: string;
  table: string;
  console: string;
}

export interface CellEntity {
  id: number;
  execStatus: number | string;
  editorContent: string;
}

export type CheckpointEntity= {
  editorState: EditorState;
  browserState: DataEntity;
  selectedDataset: string;
}

export type CheckpointDetailEntity = {
  id: string;
  timestamp: string;
}
