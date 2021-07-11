import React from 'react';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import { AppState } from '../../store';

export default function TableView(): React.ReactElement {
  const tableData = useSelector<AppState, string>((state) => (state.browser.table));

  return (
    <div className="px-4 w-full flex-grow bg-gray-50 border border-gray-300 block whitespace-nowrap overflow-scroll">
      <ReactMarkdown remarkPlugins={[gfm]}>
        {tableData}
      </ReactMarkdown>
    </div>
  );
}
