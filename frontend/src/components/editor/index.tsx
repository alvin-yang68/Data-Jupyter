import React, { useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import { AppState, dispatch } from '../../store';
import {
  addCell,
  deleteCell,
  swapCell,
  performRunCell,
} from '../../slices/editor';
import { performSaveCheckpoint } from '../../slices/checkpoint';
import { toggleCheckpointModal } from '../../slices/notebook';
import TopBar from './TopBar';
import Cell from './Cell';
import { range } from '../../utils';

export default function Editor(): React.ReactElement {
  const numOfCells = useSelector<AppState, number>((state) => state.editor.cells.length);

  const [focusedCellIndex, setFocusedCellIndex] = useState<number | null>(null);

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
    dispatch(performSaveCheckpoint());
  };

  const handleLoadCheckpoint = () => {
    dispatch(toggleCheckpointModal(true));
  };

  return (
    <div className="flex flex-col">
      <div className="py-2">
        <h1 className="font-bold text-3xl uppercase p-4">Editor</h1>
      </div>
      <TopBar
        handleAddCell={handleAddCell}
        handleDeleteCell={handleDeleteCell}
        handleMoveUpCell={handleMoveUpCell}
        handleMoveDownCell={handleMoveDownCell}
        handleRunCell={handleRunCell}
        handleRunAllCells={handleRunAllCells}
        handleSaveCheckpoint={handleSaveCheckpoint}
        handleLoadCheckpoint={handleLoadCheckpoint}
      />
      <div className="px-4 max-w-4xl h-80vh bg-gray-50 border border-gray-300 block rounded-md text-left overflow-y-scroll">
        <div className="flex flex-col m-2 gap-4">
          {range(numOfCells).map((i) => <Cell key={i} index={i} setFocusedCellIndex={setFocusedCellIndex} />)}
        </div>
      </div>
    </div>
  );
}
