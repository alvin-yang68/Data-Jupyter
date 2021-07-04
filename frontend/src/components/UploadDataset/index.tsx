import React, { useState } from 'react';

import { DatabaseModel } from '../../types';
import { dispatch } from '../../store';
import { selectDatabaseModel } from '../../slices/notebook';
import { setError } from '../../slices/status';
import DatabaseSelect from './DatabaseSelect';

export default function UploadDataset(): React.ReactElement {
  const [selection, setSelection] = useState<DatabaseModel>(DatabaseModel.Mongodb);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(selectDatabaseModel(selection));
    dispatch(setError(null));
  };

  return <DatabaseSelect selection={selection} setSelection={setSelection} />;
}
