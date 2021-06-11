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
