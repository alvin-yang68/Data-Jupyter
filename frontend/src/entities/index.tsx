export type Data = {
  dataRaw: string;
  dataTabular: string;
}

export type Cell = {
  id: number;
  editor: string;
  data: Data;
}
