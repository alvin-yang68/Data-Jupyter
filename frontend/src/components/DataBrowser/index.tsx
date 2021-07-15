import React, { useState } from "react";
import { useSelector } from "react-redux";

import { AppState } from "../../store";
import { BrowserMode } from "../../types";
import RawView from "./RawView";
import TableView from "./TableView";
import ConsoleView from "./ConsoleView";
import Resizer from "../generics/Resizer";

interface IProps {
  modes: BrowserMode[];
}

export default function DataBrowser({ modes }: IProps): React.ReactElement {
  const loading = useSelector<AppState, boolean>(
    (state) => state.status.loading
  );

  const [browserMode, setBrowserMode] = useState<BrowserMode>(modes[0]);

  const [dataBrowserHeight, setDataBrowserHeight] = useState<number>(60);

  const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setBrowserMode(e.currentTarget.name as BrowserMode);

    if (dataBrowserHeight === 60) {
      setDataBrowserHeight(830);
    }
  };

  const handleResize = (_: number, deltaY: number) => {
    const newHeight = dataBrowserHeight - deltaY;
    if (newHeight <= 830 && newHeight >= 35) {
      setDataBrowserHeight(newHeight);
    }
  };

  const handleResizerClick = () => {
    if (dataBrowserHeight !== 60) {
      setDataBrowserHeight(60);
    } else {
      setDataBrowserHeight(830);
    }
  };

  const tabButtons = modes.map((mode) => (
    <button
      key={mode}
      type="button"
      name={mode}
      onClick={handleTabClick}
      className={`py-2 px-4 inline-block font-semibold ${
        browserMode === mode ? "text-blue-600" : "text-gray-400"
      }`}
    >
      {mode}
    </button>
  ));

  return (
    <div
      style={{ height: dataBrowserHeight }}
      className="fixed container bottom-0 left-0 right-0 mx-auto"
    >
      <div className="h-full flex flex-col bg-white border border-gray-300 rounded-t-xl">
        {/* Resizer handle */}
        <Resizer
          onResize={handleResize}
          onClick={handleResizerClick}
          className="flex justify-center pt-3 cursor-pointer group focus:outline-none"
        >
          <span className="h-2 w-28 bg-gray-300 group-hover:bg-gray-400 rounded-xl" />
        </Resizer>

        {/* Tab buttons */}
        <div className="flex flex-row justify-between">
          <div className="text-left">{tabButtons}</div>
          {loading && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-blue-700 m-2 outline-none animate-spin transform rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          )}
        </div>

        {/* Data viewers & console */}
        {browserMode === BrowserMode.Raw && <RawView />}
        {browserMode === BrowserMode.Table && <TableView />}
        {browserMode === BrowserMode.Console && <ConsoleView />}
      </div>
    </div>
  );
}
