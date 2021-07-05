import React from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../../store';
import Error from './Error';
import Success from './Success';

export default function AlertBox(): React.ReactElement {
  const error = useSelector<AppState, {timestamp: number, message: string} | null>(
    (state) => state.status.error,
  );

  const success = useSelector<AppState, {timestamp: number, message: string} | null>(
    (state) => state.status.success,
  );

  return (
    <div className={`transition duration-200 ease-in-out ${error || success ? 'opacity-100' : 'opacity-0'}`}>
      {!!error && <Error message={error.message} />}
      {!!success && <Success message={success.message} />}
    </div>
  );
}
