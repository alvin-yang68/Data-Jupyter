import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-chrome';

import { AppState } from '../../store';
import { changeCell, focusCell } from '../../slices/editor';

interface IProps {
  id: number;
}

function Cell({ id }: IProps): React.ReactElement {
  const dispatch = useDispatch();
  const execStatus = useSelector<AppState, string | number>((state) => (
    state.editor.cells.find((c) => c.id === id)?.execStatus || ' '
  ));
  const errorStatus = useSelector<AppState, boolean>((state) => (
    state.editor.cells.find((c) => c.id === id)?.errorStatus || false
  ));
  const editorContent = useSelector<AppState, string>((state) => (
    state.editor.cells.find((c) => c.id === id)?.editorContent || ''
  ));
  const numOfLines = useSelector<AppState, number>((state) => (
    state.editor.cells.find((c) => c.id === id)?.numOfLines || 0
  ));
  const lastExecutedCellId = useSelector<AppState, number | null>((state) => (
    state.editor.lastExecutedCellId
  ));
  const updateBrowserCellId = useSelector<AppState, number | null>((state) => (
    state.editor.updateBrowserCellId
  ));

  let leftBorder = '';
  if (updateBrowserCellId && updateBrowserCellId === id) leftBorder = 'border-l-4 border-blue-500';
  if (lastExecutedCellId && lastExecutedCellId === id) leftBorder = 'border-l-4 border-green-500';
  if (errorStatus) leftBorder = 'border-l-4 border-red-500';

  return (
    <div className={`flex flex-col p-2 ${leftBorder} rounded shadow-md relative hover:shadow-lg overflow-hidden`}>
      <div className="flex flex-row justify-between items-start">
        <span className="text-lg mr-4 min-w-max">{`[${execStatus}]: `}</span>
        <div style={{ width: '93%' }} className={`mt-2 ring-4 ring-gray-400 ${numOfLines <= 5 ? 'focus-within:ring-blue-500' : 'focus-within:ring-yellow-500'} relative`}>
          <AceEditor
            width="100%"
            mode="python"
            theme="chrome"
            showGutter={false}
            fontSize={16}
            minLines={1}
            maxLines={15}
            value={editorContent}
            onFocus={() => dispatch(focusCell(id))}
            onChange={(value: string) => dispatch(changeCell(value))}
            wrapEnabled
          />
        </div>
      </div>
      {numOfLines > 5 && <span className="mt-2 text-yellow-500 text-right font-bold">Recommended maximum number of lines is 5</span>}
    </div>
  );
}

export default Cell;
