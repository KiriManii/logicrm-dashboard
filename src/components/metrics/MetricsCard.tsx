// src/components/metrics/MetricsCard.tsx
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

type MetricsCardProps = {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  className?: string;
};

const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  change,
  icon,
  className = '',
}) => {
  const isPositive = change && change > 0;
  
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${className}`} data-testid="metrics-card">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        {icon && <div className="text-primary-600 dark:text-primary-400">{icon}</div>}
      </div>
      <div className="mt-2">
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
      </div>
      {change !== undefined && (
        <div className="mt-2 flex items-center">
          {isPositive ? (
            <ArrowUp className="w-4 h-4 text-green-500" data-testid="arrow-up-icon" />
          ) : (
            <ArrowDown className="w-4 h-4 text-red-500" data-testid="arrow-down-icon" />
          )}
          <span className={`text-sm ml-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {Math.abs(change)}%
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">vs last period</span>
        </div>
      )}
    </div>
  );
};

export default MetricsCard;
