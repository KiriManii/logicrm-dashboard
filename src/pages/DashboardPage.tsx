import React from 'react';
import MetricsGrid from '../components/metrics/MetricsGrid';
import Card from '../components/core/Card';
import { useLeads } from '../hooks/useLeads';
import { useShipments } from '../hooks/useShipments';
// Removed formatDistance import since we're not using it

const DashboardPage: React.FC = () => {
  const { data: leadsData } = useLeads(5, 1);
  const { data: shipmentData } = useShipments(1, 5);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
        <div>
          <select className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500">
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="this_week">This Week</option>
            <option value="this_month">This Month</option>
            <option value="this_quarter">This Quarter</option>
            <option value="this_year">This Year</option>
          </select>
        </div>
      </div>
      
      <MetricsGrid />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Recent Leads">
          <div className="space-y-4">
            {leadsData?.leads?.map((lead) => (
              <div key={lead.id} className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{lead.firstName} {lead.lastName}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{lead.email}</p>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
            
            {!leadsData?.leads?.length && (
              <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                No recent leads available
              </div>
            )}
          </div>
        </Card>
        
        <Card title="Active Shipments">
          <div className="space-y-4">
            {shipmentData?.shipments?.map((shipment) => (
              <div key={shipment.id} className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {shipment.customerName.split('(')[0]}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {shipment.status === 'delivered' ? 'Delivered' :
                     shipment.status === 'in_transit' ? 'In Transit' :
                     shipment.status === 'processing' ? 'Processing' : 'Delayed'}
                  </p>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 text-right">
                  <p>{shipment.trackingNumber}</p>
                  <p>{shipment.expectedDelivery ? new Date(shipment.expectedDelivery).toLocaleDateString() : 'N/A'}</p>
                </div>
              </div>
            ))}
            
            {!shipmentData?.shipments?.length && (
              <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                No active shipments available
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
