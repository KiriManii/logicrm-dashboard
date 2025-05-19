import React, { useState } from 'react';
import { useShipments, useShipmentTracking } from '../hooks/useShipments';
import ShipmentCard from '../components/shipments/ShipmentCard';
import ShipmentTimeline from '../components/shipments/ShipmentTimeline';
import Card from '../components/core/Card';
import Button from '../components/core/Button';
import { Shipment } from '../types';
import { Filter, X } from 'lucide-react';

const ShipmentsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(9);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  const { data, isLoading } = useShipments(currentPage, pageSize);
  const { data: trackingHistory, isLoading: isTrackingLoading } = useShipmentTracking(
    selectedShipment?.id || ''
  );
  
  const filteredShipments = data?.shipments?.filter((shipment: Shipment) => 
    statusFilter === 'all' || shipment.status === statusFilter
  ) || [];
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const handleShipmentClick = (shipment: Shipment) => {
    setSelectedShipment(shipment);
  };
  
  const handleCloseDetails = () => {
    setSelectedShipment(null);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Shipments</h1>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <Filter size={16} className="mr-2 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md shadow-sm py-1 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Statuses</option>
              <option value="processing">Processing</option>
              <option value="in_transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="delayed">Delayed</option>
            </select>
          </div>
        </div>
      </div>
      
      {selectedShipment ? (
        <Card 
          title={`Shipment Details - ${selectedShipment.trackingNumber}`}
          footer={
            <div className="flex justify-end">
              <Button 
                variant="outline" 
                onClick={handleCloseDetails}
                leftIcon={<X size={16} />}
              >
                Close Details
              </Button>
            </div>
          }
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Customer Information</h3>
                <p><span className="font-medium">Name:</span> {selectedShipment.customerName}</p>
                <p><span className="font-medium">Email:</span> {selectedShipment.customerEmail}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Shipment Information</h3>
                <p><span className="font-medium">Status:</span> {selectedShipment.status.replace('_', ' ')}</p>
                <p><span className="font-medium">Carrier:</span> {selectedShipment.carrier}</p>
                <p><span className="font-medium">Origin:</span> {selectedShipment.origin}</p>
                <p><span className="font-medium">Destination:</span> {selectedShipment.destination}</p>
                {selectedShipment.expectedDelivery && (
                  <p><span className="font-medium">Expected Delivery:</span> {selectedShipment.expectedDelivery.toLocaleDateString()}</p>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Tracking History</h3>
              <ShipmentTimeline
                trackingHistory={trackingHistory || []}
                isLoading={isTrackingLoading}
              />
            </div>
          </div>
        </Card>
      ) : (
        <>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredShipments.map((shipment: Shipment) => (
                <ShipmentCard
                  key={shipment.id}
                  shipment={shipment}
                  onClick={handleShipmentClick}
                />
              ))}
            </div>
          )}
          
          {data && (
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing {Math.min(filteredShipments.length, pageSize)} of {data.total || 0} shipments
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage * pageSize >= (data.total || 0)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShipmentsPage;
