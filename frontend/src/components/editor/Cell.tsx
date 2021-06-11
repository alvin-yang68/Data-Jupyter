import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-chrome';

import { AppState } from '../../store';
import { changeCell, focusCell } from '../../slices/editor';
import { CellEntity } from '../../entities';

interface IProps {
  id: number;
}

function Cell({ id }: IProps): React.ReactElement {
  const dispatch = useDispatch();
  const cell = useSelector<AppState, CellEntity | undefined>((state) => (
    state.editor.cells.find((c) => c.id === id)));

  return (
    <div className="flex flex-row justify-between items-start p-2 rounded overflow-hidden shadow-md relative hover:shadow-lg">
      <span className="italic text-lg mr-4 min-w-max">{`[${cell?.execStatus ? cell.execStatus : ' '}]: `}</span>
      <div style={{ width: '93%' }} className="mt-2 ring-4 ring-gray-400 focus-within:ring-blue-500 relative">
        <AceEditor
          width="100%"
          mode="python"
          theme="chrome"
          showGutter={false}
          fontSize={16}
          minLines={1}
          maxLines={100}
          onFocus={() => dispatch(focusCell(cell?.id))}
          onChange={(value: string) => dispatch(changeCell(value))}
          wrapEnabled
        />
      </div>
    </div>
  );
}

export default Cell;
