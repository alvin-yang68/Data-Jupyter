import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';

enum Mode {
  Raw = 'RAW',
  Table = 'TABLE',
  Console = 'CONSOLE',
}

function DataBrowser(): React.ReactElement {
  const [browserMode, setBrowserMode] = useState(Mode.Raw);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setBrowserMode(e.currentTarget.name as Mode);
  };

  const codeViewer = (
    <AceEditor
      width="100%"
      mode="json"
      theme="monokai"
      readOnly
      fontSize={16}
      minLines={49}
      maxLines={300}
      showPrintMargin={false}
    />
  );

  return (
    <div className="px-4 max-w-4xl min-h-screen">
      <div className="bg-gray-50 border border-b-0 border-gray-300 rounded-t-md text-left">
        <div className="border-gray-700 border-b-2">
          <button type="button" name={Mode.Raw} onClick={handleClick} className={`py-2 px-4 inline-block font-semibold ${(browserMode === Mode.Raw) ? 'text-blue-600' : 'text-gray-400'}`}>Raw</button>
          <button type="button" name={Mode.Table} onClick={handleClick} className={`py-2 px-4 inline-block font-semibold ${(browserMode === Mode.Table) ? 'text-blue-600' : 'text-gray-400'}`}>Table</button>
          <button type="button" name={Mode.Console} onClick={handleClick} className={`py-2 px-4 inline-block font-semibold ${(browserMode === Mode.Console) ? 'text-blue-600' : 'text-gray-400'}`}>Console</button>
        </div>
      </div>
      {browserMode === Mode.Raw && codeViewer}
    </div>
  );
}

export default DataBrowser;
