import React from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../../store';

export default function ConsoleView(): React.ReactElement {
  const error = useSelector<AppState, string | null>((state) => state.notebook.error);
  const selectedDataset = useSelector<AppState, string | null>((state) => state.notebook.selectedDataset);

  const consoleOutput = useSelector<AppState, string>((state) => (state.browser.console));

  return (
    <div className="px-4 w-full h-80vh bg-gray-50 border border-gray-300 block rounded-md text-left overflow-scroll">
      {error && <span className="py-2 text-red-500">{error}</span>}
      {(!selectedDataset) && '\nNo dataset selected. Please select a dataset first.'}
      <span className="font-mono">{consoleOutput}</span>
    </div>
  );
}
