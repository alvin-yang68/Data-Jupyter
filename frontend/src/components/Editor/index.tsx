import React, { useState } from "react";
import { useSelector } from "react-redux";

import type { Cell as CellEntity } from "../../types";
import { AppState } from "../../store";
import TopBar from "./TopBar";
import Cell from "./Cell";

export default function Editor(): React.ReactElement {
  const cells = useSelector<AppState, CellEntity[]>(
    (state) => state.editor.cells
  );

  const [focusedCellIndex, setFocusedCellIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col w-full">
      <TopBar
        numOfCells={cells.length}
        focusedCellIndex={focusedCellIndex}
        setFocusedCellIndex={setFocusedCellIndex}
      />
      <div className="px-4 h-80vh bg-gray-50 border border-gray-300 block rounded-md text-left overflow-y-scroll">
        <div className="flex flex-col m-2 gap-4">
          {cells.map((cell, i) => (
            <Cell
              key={cell.id}
              index={i}
              setFocusedCellIndex={setFocusedCellIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
