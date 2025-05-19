// src/components/customers/CustomerProfile.tsx
import React from 'react';
import { Contact } from '../../types';
import Card from '../core/Card';

interface CustomerProfileProps {
  customer: Contact;
}

const CustomerProfile: React.FC<CustomerProfileProps> = ({ customer }) => {
  return (
    <Card title="Customer Information">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</h3>
            <p className="mt-1 text-lg font-medium text-gray-900 dark:text-white">
              {customer.firstName} {customer.lastName}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Company</h3>
            <p className="mt-1 text-lg font-medium text-gray-900 dark:text-white">
              {customer.company}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
            <p className="mt-1 text-lg font-medium text-gray-900 dark:text-white">
              {customer.email}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</h3>
            <p className="mt-1 text-lg font-medium text-gray-900 dark:text-white">
              {customer.phone}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Customer Since</h3>
            <p className="mt-1 text-lg font-medium text-gray-900 dark:text-white">
              {new Date(customer.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CustomerProfile;
