export interface DataEntity {
  raw: string;
  html: string;
  console: string;
}

export interface CellEntity {
  id: number;
  execStatus: number | string;
  editorContent: string;
}
