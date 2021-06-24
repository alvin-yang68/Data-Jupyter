import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectDatabaseModel } from '../slices/notebook';

export default function NavBar(): React.ReactElement {
  const dispatch = useDispatch();

  return (
    <nav className="flex flex-row items-center py-1 bg-blue-600 border-b-8 border-blue-200">
      <div className="flex flex-row items-center gap-6 text-white">
        <Link
          to="/"
          onClick={() => dispatch(selectDatabaseModel(null))}
          className="no-underline py-2 px-8 hover:text-gray-300"
        >
          <h1 className="font-bold text-3xl">Data Jupyter</h1>
        </Link>

        <Link
          to="/postgresql"
          className="underline py-2 text-blue-200 hover:text-white"
        >
          <h1 className="font-bold text-l">PostgreSQL</h1>
        </Link>

        <Link
          to="/mongodb"
          className="underline py-2 text-blue-200 hover:text-white"
        >
          <h1 className="font-bold text-l">MongoDB</h1>
        </Link>
      </div>
    </nav>
  );
}
