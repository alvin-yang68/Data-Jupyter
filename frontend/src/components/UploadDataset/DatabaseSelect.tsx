import React from 'react';

import { DatabaseModel } from '../../types';

interface IProps {
  selection: DatabaseModel;
  setSelection: React.Dispatch<React.SetStateAction<DatabaseModel>>;
}

export default function DatabaseSelect({ selection, setSelection }: IProps): React.ReactElement {
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelection(DatabaseModel[e.target.value as keyof typeof DatabaseModel]);
  };

  return (
    <select
      value={selection}
      onChange={handleSelectionChange}
      className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
    >
      <option
        key={DatabaseModel.Mongodb}
        value={DatabaseModel.Mongodb}
        className="ml-2 inline-block"
      >
        {DatabaseModel.Mongodb}
      </option>

      <option
        key={DatabaseModel.Psql}
        value={DatabaseModel.Psql}
        className="ml-2 inline-block"
      >
        {DatabaseModel.Psql}
      </option>

    </select>
  );
}
