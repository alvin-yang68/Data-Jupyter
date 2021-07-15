import React from "react";
import { useDispatch } from "react-redux";

import { ModalMode } from "../../types";
import { toggleModal } from "../../slices/notebook";

interface IProps {
  title: string;
  children: React.ReactNode;
}

export default function Modal({ title, children }: IProps): React.ReactElement {
  const dispatch = useDispatch();

  return (
    <div className="bg-gray-400 h-screen w-screen flex justify-center items-center">
      <div className="mb-24 bg-white rounded shadow-lg w-2/12">
        <div className="border-b px-4 py-2 flex justify-between items-center">
          <h3 className="font-semibold text-lg uppercase">{title}</h3>
          <svg
            onClick={() => dispatch(toggleModal(ModalMode.None))}
            xmlns="http://www.w3.org/2000/svg"
            className="button-icon hover:text-red-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        {children}
      </div>
    </div>
  );
}
