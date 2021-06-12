import { EditorState } from '../slices/editor';

export interface DataEntity {
  raw: string;
  table: string;
  console: string;
}

export interface CellEntity {
  id: number;
  execStatus: number | string;
  errorStatus: boolean;
  editorContent: string;
  numOfLines: number;
}

export interface CheckpointEntity {
  editorState: EditorState;
  browserState: DataEntity;
  selectedDataset: string;
}

export interface CheckpointDetailEntity {
  id: string;
  timestamp: string;
}
