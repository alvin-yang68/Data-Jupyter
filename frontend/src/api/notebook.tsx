import client from "./index";
import { CellExecutionResult } from "../types";

export async function startSession(databaseURIs: string[]): Promise<void> {
  const response = await client.post("/api/notebook/start", databaseURIs);
  return response.data;
}

interface RunCellPayload {
  databaseModel: string | null;
  selectedDataset: string;
  editorContent: string;
}

export async function runCell(
  payload: RunCellPayload
): Promise<CellExecutionResult> {
  const { databaseModel, ...request } = payload;

  const response = await client.post(`/api/${databaseModel}/run`, request);
  return response.data;
}

type RowsData = Record<string, unknown>[];

export async function loadRows(
  startIndex: number,
  stopIndex: number
): Promise<RowsData> {
  const response = await client.get(
    `/api/notebook/table?startIndex=${startIndex}&stopIndex=${stopIndex}`
  );
  return response.data;
}

export async function resetSessionContext(): Promise<void> {
  const response = await client.get("/api/reset");
  return response.data;
}
