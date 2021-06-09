import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';

import { AppState } from '../../store';
import { Cell as CellEntity } from '../../entities';
import Cell from './Cell';

function CellsList(): React.ReactElement {
  const cells = useSelector<AppState, CellEntity[]>((state) => state.editor.cells);

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [cells]);

  return (
    <div className="px-4 max-w-4xl max-h-screen bg-gray-50 border border-gray-300 block rounded-md text-left">
      <div className="flex flex-row">
        <button type="submit" className="button mx-2" data-tip="Add New" data-for="topButtons">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 items-center justify-center" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button type="submit" className="button" data-tip="Run All" data-for="topButtons">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 items-center justify-center" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col m-2 mt-6 mb-6 gap-4">
        <Cell cellId={0} />
      </div>
      <ReactTooltip id="topButtons" place="top" effect="solid" />
      <ReactTooltip id="bottomButtons" place="bottom" effect="solid" />
    </div>
  );
}

export default CellsList;
