import React from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import ReactTooltip from 'react-tooltip';

import { ModalMode } from '../../types';
import { dispatch } from '../../store';
import {
  addCell,
  deleteCell,
  swapCell,
  performRunCell,
} from '../../slices/editor';
import { toggleModal } from '../../slices/notebook';
import { range } from '../../utils';

interface IProps {
  numOfCells: number;
  focusedCellIndex: number | null;
  setFocusedCellIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function TopBar({
  numOfCells,
  focusedCellIndex,
  setFocusedCellIndex,
}: IProps): React.ReactElement {
  const handleAddCell = () => dispatch(addCell(focusedCellIndex));

  const handleDeleteCell = () => {
    dispatch(deleteCell(focusedCellIndex));
    setFocusedCellIndex(null);
  };

  const handleMoveUpCell = () => {
    if (focusedCellIndex !== null && focusedCellIndex > 0) {
      dispatch(swapCell({ focusedCellIndex, step: -1 }));
      setFocusedCellIndex(focusedCellIndex - 1);
    }
  };

  const handleMoveDownCell = () => {
    if (focusedCellIndex !== null && focusedCellIndex < (numOfCells - 1)) {
      dispatch(swapCell({ focusedCellIndex, step: 1 }));
      setFocusedCellIndex(focusedCellIndex + 1);
    }
  };

  const handleRunCell = () => {
    if (focusedCellIndex !== null) {
      // Run the focused cell.
      dispatch(performRunCell(focusedCellIndex));
    } else {
      // Run the last cell.
      dispatch(performRunCell(numOfCells - 1));
    }
  };

  const handleRunAllCells = async () => {
    for (const index of range(numOfCells)) {
      try {
        const result = await dispatch(performRunCell(index));
        const { hasCellError } = unwrapResult(result);

        // Stop running subsequent cells if there is an error.
        if (hasCellError) break;
      } catch (e) {
        break;
      }
    }
  };

  const handleSaveCheckpoint = () => {
    dispatch(toggleModal(ModalMode.SaveCheckpoint));
  };

  const handleLoadCheckpoint = () => {
    dispatch(toggleModal(ModalMode.LoadCheckpoint));
  };

  return (
    <div className="px-4 max-w-4xl max-h-screen bg-gray-50 border border-gray-300 rounded-md text-left">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <svg onClick={handleAddCell} data-tip="Add New Cell" data-for="topButtons" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500 hover:text-blue-700 hover:bg-gray-200 m-2 cursor-pointer outline-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <svg onClick={handleDeleteCell} data-tip="Delete Cell" data-for="topButtons" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500 hover:text-red-700 hover:bg-gray-200 m-2 cursor-pointer outline-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <svg onClick={handleMoveUpCell} data-tip="Move Cell Up" data-for="topButtons" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500 hover:text-blue-700 hover:bg-gray-200 m-2 cursor-pointer outline-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
          </svg>
          <svg onClick={handleMoveDownCell} data-tip="Move Cell Down" data-for="topButtons" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500 hover:text-blue-700 hover:bg-gray-200 m-2 cursor-pointer outline-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
          </svg>
          <svg onClick={handleRunCell} data-tip="Run Cell" data-for="topButtons" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500 hover:text-blue-700 hover:bg-gray-200 m-2 cursor-pointer outline-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <svg onClick={handleRunAllCells} data-tip="Run All Cells" data-for="topButtons" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500 hover:text-blue-700 hover:bg-gray-200 m-2 cursor-pointer outline-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </div>
        <div className="flex flex-row">
          <svg onClick={handleSaveCheckpoint} xmlns="http://www.w3.org/2000/svg" data-tip="Save Checkpoint" data-for="topButtons" className="h-7 w-7 text-blue-500 hover:text-blue-700 hover:bg-gray-200 m-2 cursor-pointer outline-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <svg onClick={handleLoadCheckpoint} xmlns="http://www.w3.org/2000/svg" data-tip="Load Checkpoint" data-for="topButtons" className="h-7 w-7 text-blue-500 hover:text-blue-700 hover:bg-gray-200 m-2 cursor-pointer outline-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
        </div>
      </div>
      <ReactTooltip id="topButtons" place="top" effect="solid" />
    </div>
  );
}
