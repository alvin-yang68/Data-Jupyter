import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import NavBar from './components/NavBar';
import ErrorAlert from './components/ErrorAlert';
import { DatabaseModel } from './types';
import HomeView from './views/HomeView';
import NotebookView from './views/NotebookView';

export default function App(): React.ReactElement {
  return (
    <div className="h-screen w-screen flex flex-col">
      <NavBar />

      <main className="mt-16">
        <Switch>
          <Route exact path={['/', '/index']}>
            <HomeView />
          </Route>

          <Route exact path="/postgresql">
            <NotebookView key="postgresql" databaseModel={DatabaseModel.Psql} />
          </Route>

          <Route exact path="/mongodb">
            <NotebookView key="mongodb" databaseModel={DatabaseModel.Mongodb} />
          </Route>
        </Switch>
      </main>

      <ErrorAlert />
    </div>
  );
}
