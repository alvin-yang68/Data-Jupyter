import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import AutoSizer from "react-virtualized-auto-sizer";

import { AppState } from "../../store";
import { loadRows } from "../../api/notebook";
import VirtualTable, { Data } from "../generics/VirtualTable";

export default function TableView(): React.ReactElement {
  const rowCount = useSelector<AppState, number>(
    (state) => state.browser.tableRowCount
  );

  const headers = useSelector<AppState, string[]>(
    (state) => state.browser.tableHeaders,
    shallowEqual
  );

  /** The Row component. This should be a table row.
   *  Note that we don't use the `style` that regular `react-window` examples pass in. */
  const renderRows = ({
    index,
    data,
  }: {
    index: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: Data<Record<string, any>>;
  }) => {
    const row = data.get(index);

    return (
      <tr>
        {/** Make sure table rows are the same height as what was passed into the list... */}
        {headers.map((header) => (
          <td style={{ height: "36px" }} key={header}>
            {row ? row[header] : "Loading..."}
          </td>
        ))}
      </tr>
    );
  };

  return (
    // This `div` is needed to prevent `AutoSizer` from greedily taking up
    // space due to `flex-col` (which can cause infinite loop).
    <div className="h-full w-full">
      <AutoSizer>
        {({ height, width }) => (
          <VirtualTable
            height={height}
            width={width}
            itemCount={rowCount}
            itemSize={36}
            loadItems={loadRows}
            minimumBatchSize={500}
            threshold={50}
            header={
              // Make the header sticky.
              <thead style={{ position: "sticky", top: 0 }}>
                <tr>
                  {headers.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
            }
            row={renderRows}
          />
        )}
      </AutoSizer>
    </div>
  );
}
