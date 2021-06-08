import React, { useState } from 'react';

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

  return (
    <div className="px-4 max-w-4xl mx-auto min-h-screen">
      <div className="bg-gray-50 border border-b-0 border-gray-300 top-0 left-0 right-0 block rounded-t-md text-left">
        <button type="button" name={Mode.Raw} onClick={handleClick} className={`py-2 px-4 inline-block font-semibold ${(browserMode === Mode.Raw) ? 'text-blue-600' : 'text-gray-400'}`}>Raw</button>
        <button type="button" name={Mode.Table} onClick={handleClick} className={`py-2 px-4 inline-block font-semibold ${(browserMode === Mode.Table) ? 'text-blue-600' : 'text-gray-400'}`}>Table</button>
      </div>
    </div>
  );
}

export default DataBrowser;
