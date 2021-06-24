import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';

import { AppState } from '../../store';

export default function RawView(): React.ReactElement {
  const rawData = useSelector<AppState, string>((state) => (state.browser.raw));

  const codeView = useMemo(() => (
    <AceEditor
      width="100%"
      mode="json"
      theme="monokai"
      readOnly
      fontSize={16}
      minLines={39}
      maxLines={39}
      showPrintMargin={false}
      value={rawData}
    />
  ), [rawData]);

  return codeView;
}
