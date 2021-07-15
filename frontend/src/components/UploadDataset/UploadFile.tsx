import React from "react";

const uploadCloudIcon = (
  <svg
    className="w-8 h-8"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
  >
    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
  </svg>
);

const documentIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

interface IProps {
  value: File | null;
  onChange: (data: File) => void;
  accept?: string;
}

export default function UploadFile({
  value,
  onChange,
  accept,
}: IProps): React.ReactElement {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    onChange(e.target.files[0]);
  };

  return (
    <div className="mx-auto w-64">
      <label
        htmlFor="file"
        className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue-600 rounded-lg shadow-lg tracking-wide uppercase border border-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white"
      >
        {value ? documentIcon : uploadCloudIcon}
        <span className="mt-2 text-base leading-normal">
          {value?.name || "Browse File"}
        </span>
        <input
          id="file"
          type="file"
          name="dataset"
          onChange={handleChange}
          accept={accept}
          className="hidden"
        />
      </label>
    </div>
  );
}
