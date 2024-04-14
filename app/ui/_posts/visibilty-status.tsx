import React from 'react';

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface VisibilityStatusProps {
  status: boolean | null;
}

const VisibilityStatus = ({ status }: VisibilityStatusProps) => {
  return (
    <>
      {status ? (
        <EyeIcon className="w-6 text-stone-800" />
      ) : (
        <EyeSlashIcon className="w-6 text-stone-300" />
      )}
    </>
  );
};

export default VisibilityStatus;
