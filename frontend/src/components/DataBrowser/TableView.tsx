import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import { AppState } from '../../store';

export default function TableView(): React.ReactElement {
  const tableData = useSelector<AppState, string>((state) => (state.browser.table));

  const tableView = useMemo(() => (
    <div className="px-4 w-full h-80vh bg-gray-50 border border-gray-300 block rounded-md whitespace-nowrap overflow-scroll">
      <ReactMarkdown remarkPlugins={[gfm]}>
        {tableData}
      </ReactMarkdown>
    </div>
  ), [tableData]);

  return tableView;
}
