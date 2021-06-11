import React from 'react';
import { Provider } from 'react-redux';

import { store } from './store';
import MainView from './views/MainView';

function App(): React.ReactElement {
  return (
    <Provider store={store}>
      <MainView />
    </Provider>
  );
}

export default App;
