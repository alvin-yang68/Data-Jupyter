import React from 'react';

import { dispatch } from '../../store';
import { setError } from '../../slices/status';

interface IProps {
    message: string;
}

export default function Error({ message }: IProps): React.ReactElement {
  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-10 flex justify-center items-center m-1 font-medium py-1 px-2 rounded-md text-red-700 bg-red-100 border border-red-400 ">
      <div slot="avatar">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-alert-octagon w-5 h-5 mx-2">
          <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <div className="text-xl font-normal  max-w-full flex-initial">

        {message}

      </div>
      <div className="flex flex-auto flex-row-reverse">
        <svg onClick={() => dispatch(setError(null))} xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x cursor-pointer hover:text-red-400 rounded-full w-5 h-5 ml-2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>
    </div>
  );
}
