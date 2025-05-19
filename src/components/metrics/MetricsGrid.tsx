// src/components/metrics/MetricsGrid.tsx
import React from 'react';
import MetricsCard from './MetricsCard';
import { Users, Package, CreditCard, TrendingUp } from 'lucide-react';

const MetricsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <MetricsCard 
        title="Active Leads" 
        value="127" 
        change={12} 
        icon={<Users size={24} />} 
      />
      <MetricsCard 
        title="Active Shipments" 
        value="68" 
        change={-5} 
        icon={<Package size={24} />} 
      />
      <MetricsCard 
        title="Monthly Revenue" 
        value="$247,500" 
        change={8} 
        icon={<CreditCard size={24} />} 
      />
      <MetricsCard 
        title="Conversion Rate" 
        value="24.8%" 
        change={3} 
        icon={<TrendingUp size={24} />} 
      />
    </div>
  );
};

export default MetricsGrid;
