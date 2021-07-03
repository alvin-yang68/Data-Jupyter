import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar(): React.ReactElement {
  return (
    <nav className="fixed z-10 h-20 w-screen flex flex-row items-start py-1 bg-blue-600 border-t-8 border-blue-200">
      <div id="Logo" className="flex flex-row items-center gap-6 text-white">
        {/* Home page */}
        <Link to="/">
          <h1 className="py-2 px-8 font-bold text-4xl hover:text-gray-300 no-underline">
            Data Jupyter
          </h1>
        </Link>

        {/* Notebook (dropdown) */}
        <ul id="Notebook" className="dropdown flex flex-col">
          <li className="px-4 cursor-default">
            <h1 className="text-blue-200 text-2xl font-bold">Notebook</h1>
          </li>

          <div className="pt-16 dropdown-content absolute hidden text-blue-200">
            <Link to="/postgresql">
              <li className="px-4 border-t-2 border-blue-200 bg-blue-600 hover:bg-blue-800 hover:text-white">
                <h2 className="font-bold text-xl">PostgreSQL</h2>
              </li>
            </Link>

            <Link to="/mongodb">
              <li className="px-4 border-t-2 border-blue-200 bg-blue-600 hover:bg-blue-800 hover:text-white">
                <h2 className="font-bold text-xl">MongoDB</h2>
              </li>
            </Link>
          </div>
        </ul>

        {/* Dataset */}
        <Link to="/dataset">
          <h1 className="text-blue-200 hover:text-white text-2xl font-bold">Dataset</h1>
        </Link>

      </div>
    </nav>
  );
}
