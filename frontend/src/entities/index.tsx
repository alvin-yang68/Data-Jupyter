import { EditorState } from '../slices/editor';
import { BrowserState } from '../slices/browser';

export interface Dataset {
  raw?: string;
  table?: string;
  console?: string;
}

export interface CellExecutionResult extends Dataset {
  hasCellError: boolean;
  shouldUpdateBrowser: boolean;
}

export interface Cell {
  id: number;
  execStatus: number | string;
  errorStatus: boolean;
  editorContent: string;
  numOfLines: number;
}

export interface Checkpoint {
  editorState: EditorState;
  browserState: BrowserState;
  selectedDataset: string;
}

export interface CheckpointMeta {
  id: string;
  timestamp: string;
}
