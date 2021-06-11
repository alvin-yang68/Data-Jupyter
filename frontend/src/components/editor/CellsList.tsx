import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';

import { AppState } from '../../store';
import {
  addCell,
  deleteCell,
  performRunAllCells,
  performRunCell,
  moveCell,
} from '../../slices/editor';
import { performLoadCheckpoint, performSaveCheckpoint } from '../../slices/checkpoint';
import { toggleCheckpointModal } from '../../slices/notebook';
import Cell from './Cell';

function CellsList(): React.ReactElement {
  const dispatch = useDispatch();
  const cellIds = useSelector<AppState, number[]>((state) => state.editor.cells.map((cell) => cell.id), shallowEqual);

  const handleLoadCheckpoint = () => {
    dispatch(toggleCheckpointModal(true));
    dispatch(performLoadCheckpoint);
  };

  return (
    <div className="flex flex-col">
      <div className="py-2">
        <h1 className="font-bold text-3xl uppercase p-4">Editor</h1>
      </div>
      <div className="px-4 max-w-4xl max-h-screen bg-gray-50 border border-gray-300 block rounded-md text-left">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <svg onClick={() => dispatch(addCell())} data-tip="Add New" data-for="topButtons" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500 hover:text-blue-700 hover:bg-gray-200 m-2 cursor-pointer outline-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <svg onClick={() => dispatch(deleteCell())} data-tip="Delete Selected" data-for="topButtons" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500 hover:text-red-700 hover:bg-gray-200 m-2 cursor-pointer outline-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <svg onClick={() => dispatch(moveCell(-1))} data-tip="Move Up" data-for="topButtons" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500 hover:text-blue-700 hover:bg-gray-200 m-2 cursor-pointer outline-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
            </svg>
            <svg onClick={() => dispatch(moveCell(+1))} data-tip="Move Down" data-for="topButtons" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500 hover:text-blue-700 hover:bg-gray-200 m-2 cursor-pointer outline-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
            </svg>
            <svg onClick={() => dispatch(performRunCell())} data-tip="Run Selected" data-for="topButtons" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500 hover:text-blue-700 hover:bg-gray-200 m-2 cursor-pointer outline-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <svg onClick={() => dispatch(performRunAllCells())} data-tip="Run All" data-for="topButtons" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500 hover:text-blue-700 hover:bg-gray-200 m-2 cursor-pointer outline-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </div>
          <div className="flex flex-row">
            <svg onClick={() => dispatch(performSaveCheckpoint())} xmlns="http://www.w3.org/2000/svg" data-tip="Save Checkpoint" data-for="topButtons" className="h-7 w-7 text-blue-500 hover:text-blue-700 hover:bg-gray-200 m-2 cursor-pointer outline-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <svg onClick={handleLoadCheckpoint} xmlns="http://www.w3.org/2000/svg" data-tip="Load Checkpoint" data-for="topButtons" className="h-7 w-7 text-blue-500 hover:text-blue-700 hover:bg-gray-200 m-2 cursor-pointer outline-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
          </div>
        </div>
      </div>
      <div className="px-4 max-w-4xl h-80vh bg-gray-50 border border-gray-300 block rounded-md text-left overflow-y-scroll">
        <div className="flex flex-col m-2 gap-4">
          {cellIds.map((id) => <Cell key={id} id={id} />)}
        </div>
      </div>
      <ReactTooltip id="topButtons" place="top" effect="solid" />

    </div>
  );
}

export default CellsList;
