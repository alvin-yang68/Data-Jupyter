import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-chrome";

import { AppState } from "../../store";
import { changeCell } from "../../slices/editor";

interface IProps {
  index: number;
  setFocusedCellIndex: (value: number) => void;
}

function Cell({ index, setFocusedCellIndex }: IProps): React.ReactElement {
  const dispatch = useDispatch();

  const execStatus = useSelector<AppState, string | number>(
    (state) => state.editor.cells[index].execStatus
  );

  const cellContent = useSelector<AppState, string>(
    (state) => state.editor.cells[index].editorContent
  );

  const numOfLines = useSelector<AppState, number>(
    (state) => state.editor.cells[index].numOfLines
  );

  const hasError = useSelector<AppState, boolean>(
    (state) => state.editor.cells[index].errorStatus
  );

  const islastExecuted = useSelector<AppState, boolean>(
    (state) => state.editor.lastExecutedCellId === state.editor.cells[index].id
  );

  const hasUpdatedBrowser = useSelector<AppState, boolean>(
    (state) => state.editor.updateBrowserCellId === state.editor.cells[index].id
  );

  // Determine color of the cell's left border.
  let leftBorder = "";
  if (islastExecuted) leftBorder = "border-l-4 border-green-500";
  if (hasUpdatedBrowser) leftBorder = "border-l-4 border-blue-500";
  if (hasError) leftBorder = "border-l-4 border-red-500";

  return (
    <div
      className={`flex flex-col p-2 ${leftBorder} rounded shadow-md relative hover:shadow-lg focus-within:shadow-lg overflow-hidden`}
    >
      <div className="flex flex-row justify-between items-start">
        <span className="text-lg mr-4 min-w-max">{`[${execStatus}]: `}</span>
        <div
          style={{ width: "96%" }}
          className={`mt-2 ring-4 ring-gray-400 ${
            numOfLines <= 5
              ? "focus-within:ring-blue-500"
              : "focus-within:ring-yellow-500"
          } relative`}
        >
          <AceEditor
            width="100%"
            mode="python"
            theme="chrome"
            showGutter={false}
            fontSize={16}
            minLines={1}
            maxLines={15}
            value={cellContent}
            onFocus={() => setFocusedCellIndex(index)}
            onChange={(value: string) => dispatch(changeCell({ index, value }))}
            wrapEnabled
          />
        </div>
      </div>
    </div>
  );
}

export default Cell;
