import { EditorState } from '../slices/editor';
import { BrowserState } from '../slices/browser';

export enum BrowserMode {
  Raw = 'Raw',
  Table = 'Table',
  Console = 'Console',
}

export enum DatabaseModel {
  Mongodb = 'mongodb',
  Psql = 'psql',
}

export enum ModalMode {
  SaveCheckpoint = 'Save Checkpoint',
  LoadCheckpoint = 'Load Checkpoint',
  None = 'None',
}

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
  name: string;
  editorState: EditorState;
  browserState: BrowserState;
  databaseModel: DatabaseModel;
  selectedDataset: string;
}

export interface CheckpointMeta {
  id: string;
  name: string;
}
