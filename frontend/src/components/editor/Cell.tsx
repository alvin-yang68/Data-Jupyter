import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-chrome';

import { AppState } from '../../store';
import { Cell as CellEntity } from '../../entities';

interface IProps {
  cellId: number;
}

function Cell({ cellId }: IProps): React.ReactElement {
  const [editorContent, setEditorContent] = useState('');
  const cell = useSelector<AppState, CellEntity | undefined>((state) => state.editor.cells.find((c) => c.id === cellId));

  return (
    <div className="flex flex-col bg-white rounded overflow-hidden shadow-md relative hover:shadow-lg">
      <div className="flex justify-between items-center pb-4">
        <span className="italic font-semibold text-2xl ml-2">{`[ ${cell ? cell.runOrder : ' '} ]`}</span>
        <svg data-tip="Delete" data-for="topButtons" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 hover:text-red-600 m-2 cursor-pointer outline-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <div style={{ width: '98%' }} className="ring-4 ring-gray-400 focus-within:ring-blue-500 self-center">
        <AceEditor
          width="100%"
          mode="python"
          theme="chrome"
          showGutter={false}
          fontSize={16}
          minLines={1}
          maxLines={100}
          onChange={(value: string) => setEditorContent(value)}
          wrapEnabled
        />
      </div>
      <div className="flex justify-end items-center pt-2">
        <svg data-tip="Run All Above" data-for="bottomButtons" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500 hover:text-blue-700 hover:bg-gray-100 m-2 cursor-pointer outline-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
        </svg>
        <svg data-tip="Run" data-for="bottomButtons" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500 hover:text-blue-700 hover:bg-gray-100 m-2 cursor-pointer outline-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}

export default Cell;
