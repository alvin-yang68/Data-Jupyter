import { EditorState } from '../slices/editor';
import { BrowserState } from '../slices/browser';

export enum BrowserMode {
  Raw = 'Raw',
  Table = 'Table',
  Console = 'Console',
}

export enum ModalMode {
  SaveCheckpoint = 'Save Checkpoint',
  LoadCheckpoint = 'Load Checkpoint',
  None = 'None',
}

export enum DatabaseModel {
  Mongodb = 'mongodb',
  Psql = 'psql',
}

export interface CellExecutionResult {
  raw?: string;
  table?: string;
  console?: string;
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
  name: string;
  editorState: EditorState;
  browserState: BrowserState;
  databaseModel: string;
  selectedDataset: string;
}

export interface CheckpointMeta {
  id: string;
  name: string;
}
