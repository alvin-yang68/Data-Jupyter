export type Data = {
  dataRaw: string;
  dataTable: string;
}

export type Cell = {
  id: number;
  runOrder: number | null;
  editor: string;
  data: Data;
}
