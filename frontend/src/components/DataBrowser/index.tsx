import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../../store';
import { BrowserMode } from '../../types';
import RawView from './RawView';
import TableView from './TableView';
import ConsoleView from './ConsoleView';

interface IProps {
  modes: BrowserMode[];
}

export default function DataBrowser({ modes }: IProps): React.ReactElement {
  const loading = useSelector<AppState, boolean>((state) => state.status.loading);

  const [browserMode, setBrowserMode] = useState<BrowserMode>(modes[0]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setBrowserMode(e.currentTarget.name as BrowserMode);
  };

  const tabButtons = modes.map((mode) => (
    <button
      key={mode}
      type="button"
      name={mode}
      onClick={handleClick}
      className={`py-2 px-4 inline-block font-semibold ${(browserMode === mode) ? 'text-blue-600' : 'text-gray-400'}`}
    >
      {mode}
    </button>
  ));

  return (
    <div className="px-4 max-w-4xl min-h-screen">
      <div className="flex flex-row justify-between w-full bg-gray-50 border border-gray-300 rounded-t-md">
        <div className="text-left">
          {tabButtons}
        </div>
        {loading && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-700 m-2 outline-none animate-spin transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        )}
      </div>
      {browserMode === BrowserMode.Raw && <RawView />}
      {browserMode === BrowserMode.Table && <TableView />}
      {browserMode === BrowserMode.Console && <ConsoleView />}
    </div>
  );
}
