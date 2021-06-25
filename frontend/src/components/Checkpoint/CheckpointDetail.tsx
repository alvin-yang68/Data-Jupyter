import React, { SetStateAction } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../../store';
import { CheckpointMeta } from '../../types';

interface IProps {
    id: string;
    selectedId: string | null;
    setSelectedId: React.Dispatch<SetStateAction<string | null>>;
}

export default function CheckpointDetail({ id, selectedId, setSelectedId }: IProps): React.ReactElement {
  const checkpoint = useSelector<AppState, CheckpointMeta | undefined>((state) => (
    state.checkpoint.find((c) => c.id === id)
  ));

  return (
    <li onClick={() => setSelectedId(id)} className={`p-4 hover:bg-gray-100 cursor-pointer text-center ${selectedId === id && 'bg-gray-100'}`} role="presentation">
      {checkpoint?.timestamp}
    </li>
  );
}
