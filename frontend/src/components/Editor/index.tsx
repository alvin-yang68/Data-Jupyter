import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../../store';
import TopBar from './TopBar';
import Cell from './Cell';
import { range } from '../../utils';

export default function Editor(): React.ReactElement {
  const numOfCells = useSelector<AppState, number>((state) => state.editor.cells.length);

  const [focusedCellIndex, setFocusedCellIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col">
      <TopBar
        numOfCells={numOfCells}
        focusedCellIndex={focusedCellIndex}
        setFocusedCellIndex={setFocusedCellIndex}
      />
      <div className="px-4 max-w-4xl h-80vh bg-gray-50 border border-gray-300 block rounded-md text-left overflow-y-scroll">
        <div className="flex flex-col m-2 gap-4">
          {range(numOfCells).map((i) => <Cell key={i} index={i} setFocusedCellIndex={setFocusedCellIndex} />)}
        </div>
      </div>
    </div>
  );
}
