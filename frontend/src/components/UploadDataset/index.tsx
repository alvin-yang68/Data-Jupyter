import React, { useState } from "react";

import { DatabaseModel } from "../../types";
import { dispatch } from "../../store";
import { performUploadDataset } from "../../slices/notebook";
import { setError } from "../../slices/status";
import Select from "../generics/Select";
import UploadFile from "./UploadFile";

const acceptedFileMap = {
  [DatabaseModel.Mongodb]: ".txt",
  [DatabaseModel.Psql]: ".csv",
};

export default function UploadDataset(): React.ReactElement {
  const [databaseModel, setDatabaseModel] = useState<DatabaseModel>(
    DatabaseModel.Mongodb
  );

  const [file, setFile] = useState<File | null>(null);

  const handleSelectionChange = (data: string) => {
    setDatabaseModel(data as DatabaseModel);
  };

  const handleFileChange = (data: File) => {
    setFile(data);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!databaseModel) {
      dispatch(setError("No database model selected"));
      return;
    }

    if (!file) {
      dispatch(setError("No file to upload"));
      return;
    }

    // Attach file to a `FormData`, which sets an encoding type of "multipart/form-data"
    // on the HTTP response.
    const formData = new FormData();
    formData.append("file", file);

    dispatch(performUploadDataset({ databaseModel, formData })).then(() =>
      setFile(null)
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      <h3 className="font-bold text-xl p-4">1. Select a database model</h3>

      <Select
        options={Object.values(DatabaseModel)}
        value={databaseModel}
        onChange={handleSelectionChange}
      />

      <h3 className="font-bold text-xl p-4">
        {`2. Choose a ${acceptedFileMap[databaseModel]} file`}
      </h3>

      <UploadFile
        value={file}
        onChange={handleFileChange}
        accept={acceptedFileMap[databaseModel]}
      />

      <input
        type="submit"
        value="Upload"
        className="cursor-pointer button-relief"
      />
    </form>
  );
}
