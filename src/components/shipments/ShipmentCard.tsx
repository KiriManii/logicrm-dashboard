// src/components/shipments/ShipmentCard.tsx
import React from 'react';
import { Shipment } from '../../types';
import { Clock, MapPin } from 'lucide-react';

interface ShipmentCardProps {
  shipment: Shipment;
  onClick?: (shipment: Shipment) => void;
}

const ShipmentCard: React.FC<ShipmentCardProps> = ({ shipment, onClick }) => {
  const handleClick = () => {
    if (onClick) onClick(shipment);
  };
  
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-4 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleClick}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {shipment.customerName}
        </h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          shipment.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
          shipment.status === 'in_transit' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
          shipment.status === 'delayed' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
        }`}>
          {shipment.status.replace('_', ' ')}
        </span>
      </div>
      
      <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        <p className="flex items-center mt-1">
          <span className="font-medium mr-2">Tracking:</span> {shipment.trackingNumber}
        </p>
        <p className="flex items-center mt-1">
          <MapPin size={16} className="mr-1" />
          <span className="font-medium mr-2">From:</span> {shipment.origin}
        </p>
        <p className="flex items-center mt-1">
          <MapPin size={16} className="mr-1" /> 
          <span className="font-medium mr-2">To:</span> {shipment.destination}
        </p>
        <p className="flex items-center mt-1">
          <span className="font-medium mr-2">Carrier:</span> {shipment.carrier}
        </p>
      </div>
      
      {shipment.expectedDelivery && (
        <div className="mt-3 flex items-center text-xs text-gray-500 dark:text-gray-400">
          <Clock size={14} className="mr-1" />
          Expected Delivery: {shipment.expectedDelivery.toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

export default React.memo(ShipmentCard);
