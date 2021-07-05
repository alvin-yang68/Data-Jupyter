import React from 'react';

interface IProps {
  options: string[];
  value: string;
  onChange: (data: string) => void;
}

export default function Select({ options, value, onChange }: IProps): React.ReactElement {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  const renderOptions = options.map((option) => (
    <option
      key={option}
      value={option}
      className="ml-2 inline-block"
    >
      {option}
    </option>
  ));

  return (
    <select
      value={value}
      onChange={handleChange}
      className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
    >
      {renderOptions}
    </select>
  );
}
