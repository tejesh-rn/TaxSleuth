import React from 'react';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: 'valid' | 'invalid' | 'warning';
  text: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, text }) => {
  const statusConfig = {
    valid: {
      colors: "bg-emerald-100 text-emerald-800",
      Icon: CheckCircle2
    },
    invalid: {
      colors: "bg-red-100 text-red-800",
      Icon: XCircle
    },
    warning: {
      colors: "bg-amber-100 text-amber-800",
      Icon: AlertCircle
    }
  };

  const { colors, Icon } = statusConfig[status];

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium ${colors}`}>
      <Icon className="w-3.5 h-3.5 mr-1" />
      {text}
    </span>
  );
};


