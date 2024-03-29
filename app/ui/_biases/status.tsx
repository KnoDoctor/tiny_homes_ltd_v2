import { ReactElement, ElementType } from 'react';
import {
  CheckIcon,
  ClockIcon,
  PencilIcon,
  XCircleIcon,
  DocumentCheckIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface StatusConfig {
  [key: string]: {
    bgColor: string;
    textColor: string;
    Icon?: ElementType; // Adjusted type
    label: string;
  };
}

const statusConfig: StatusConfig = {
  draft: {
    bgColor: 'bg-gray-50',
    textColor: 'text-gray-500',
    Icon: PencilIcon,
    label: 'Draft',
  },
  in_progress: {
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    Icon: ClockIcon,
    label: 'In Progress',
  },
  finalized: {
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-600',
    Icon: CheckIcon,
    label: 'Finalized',
  },
  cancelled: {
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
    Icon: XCircleIcon,
    label: 'Cancelled',
  },
  complete: {
    bgColor: 'bg-green-50',
    textColor: 'text-green-600',
    Icon: DocumentCheckIcon,
    label: 'Complete',
  },
};

interface BiasStatusProps {
  status: keyof StatusConfig;
}

export default function BiasStatus({ status }: BiasStatusProps): ReactElement {
  const { bgColor, textColor, Icon, label } = statusConfig[status] || {
    bgColor: '',
    textColor: '',
    label: '',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        bgColor,
        textColor,
      )}
    >
      {label}
      {Icon && <Icon className="ml-1 h-4 w-4" />}
    </span>
  );
}
