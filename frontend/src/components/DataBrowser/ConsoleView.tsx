import React from "react";
import { useSelector } from "react-redux";

import { AppState } from "../../store";

export default function ConsoleView(): React.ReactElement {
  const consoleOutput = useSelector<AppState, string>(
    (state) => state.browser.console
  );

  return (
    <div className="px-4 w-full flex-grow bg-gray-50 border border-gray-300 block text-left overflow-scroll">
      <span className="font-mono">{consoleOutput}</span>
    </div>
  );
}
