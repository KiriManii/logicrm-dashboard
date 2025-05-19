// src/components/shipments/ShipmentTimeline.tsx
import React from 'react';
import { TrackingStatus } from '../../types';

interface ShipmentTimelineProps {
  trackingHistory: TrackingStatus[];
  isLoading?: boolean;
}

const ShipmentTimeline: React.FC<ShipmentTimelineProps> = ({ 
  trackingHistory, 
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!trackingHistory || trackingHistory.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500 dark:text-gray-400">
        No tracking information available
      </div>
    );
  }

  // Sort tracking events by timestamp (newest first)
  const sortedHistory = [...trackingHistory].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {sortedHistory.map((event, index) => (
          <li key={index}>
            <div className="relative pb-8">
              {index !== sortedHistory.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                  aria-hidden="true"
                ></span>
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-gray-800 ${
                    index === 0 ? 'bg-primary-500' : 'bg-gray-400 dark:bg-gray-600'
                  }`}>
                    <svg
                      className="h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {event.status}
                    </p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {event.timestamp.toLocaleString()} at {event.location}
                    </p>
                  </div>
                  <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    <p>{event.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShipmentTimeline;
