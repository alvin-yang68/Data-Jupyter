import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';

enum Mode {
  Raw = 'RAW',
  Table = 'TABLE',
}

function DataBrowser(): React.ReactElement {
  const [browserMode, setBrowserMode] = useState(Mode.Raw);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setBrowserMode(Mode.Raw === e.currentTarget.name ? Mode.Raw : Mode.Table);
  };

  const codeEditor = (
    <AceEditor
      width="100%"
      mode="json"
      theme="monokai"
      readOnly
      fontSize={16}
      minLines={64}
      maxLines={300}
      showPrintMargin={false}
    />
  );

  return (
    <div className="px-4 max-w-4xl min-h-screen">
      <div className="bg-gray-50 border border-b-0 border-gray-300 rounded-t-md text-left">
        <button type="button" name={Mode.Raw} onClick={handleClick} className={`py-2 px-4 inline-block font-semibold ${(browserMode === Mode.Raw) ? 'text-blue-600' : 'text-gray-400'}`}>Raw</button>
        <button type="button" name={Mode.Table} onClick={handleClick} className={`py-2 px-4 inline-block font-semibold ${(browserMode === Mode.Table) ? 'text-blue-600' : 'text-gray-400'}`}>Table</button>
      </div>
      {browserMode === Mode.Raw && codeEditor}
    </div>
  );
}

export default DataBrowser;
