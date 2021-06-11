import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import { AppState } from '../store';

enum Mode {
  Raw = 'RAW',
  Table = 'TABLE',
  Console = 'CONSOLE',
}

function DataBrowser(): React.ReactElement {
  const [browserMode, setBrowserMode] = useState(Mode.Raw);
  const rawData = useSelector<AppState, string>((state) => (
    state.notebook.results
      ? state.notebook.results.raw
      : ''
  ));
  const tableData = useSelector<AppState, string>((state) => (
    state.notebook.results
      ? state.notebook.results.table
      : ''
  ));
  const consoleOutput = useSelector<AppState, string>((state) => (
    state.notebook.results
      ? state.notebook.results.console
      : ''
  ));

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setBrowserMode(e.currentTarget.name as Mode);
  };

  const codeView = useMemo(() => (
    <AceEditor
      width="100%"
      mode="json"
      theme="monokai"
      readOnly
      fontSize={16}
      minLines={39}
      maxLines={39}
      showPrintMargin={false}
      value={rawData}
    />
  ), [rawData]);

  const tableView = useMemo(() => (
    <div className="px-4 w-full h-80vh bg-gray-50 border border-gray-300 block rounded-md whitespace-nowrap overflow-scroll">
      <ReactMarkdown remarkPlugins={[gfm]}>
        {tableData}
      </ReactMarkdown>
    </div>
  ), [tableData]);

  const consoleView = (
    <div className="px-4 w-full h-80vh bg-gray-50 border border-gray-300 block rounded-md text-left overflow-scroll">
      <span className="font-mono">{consoleOutput}</span>
    </div>
  );

  return (
    <div className="px-4 max-w-4xl min-h-screen">
      <div className="py-2">
        <h1 className="font-bold text-3xl uppercase p-4">Data Browser</h1>
      </div>
      <div className="bg-gray-50 border border-gray-300 rounded-t-md text-left">
        <button type="button" name={Mode.Raw} onClick={handleClick} className={`py-2 px-4 inline-block font-semibold ${(browserMode === Mode.Raw) ? 'text-blue-600' : 'text-gray-400'}`}>Raw</button>
        <button type="button" name={Mode.Table} onClick={handleClick} className={`py-2 px-4 inline-block font-semibold ${(browserMode === Mode.Table) ? 'text-blue-600' : 'text-gray-400'}`}>Table</button>
        <button type="button" name={Mode.Console} onClick={handleClick} className={`py-2 px-4 inline-block font-semibold ${(browserMode === Mode.Console) ? 'text-blue-600' : 'text-gray-400'}`}>Console</button>
      </div>
      {browserMode === Mode.Raw && codeView}
      {browserMode === Mode.Table && tableView}
      {browserMode === Mode.Console && consoleView}
    </div>
  );
}

export default DataBrowser;
