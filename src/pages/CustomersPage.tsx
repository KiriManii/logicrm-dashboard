import React, { useState } from 'react';
import { useCustomers, useCustomer } from '../hooks/useCustomers';
import CustomerProfile from '../components/customers/CustomerProfile';
import Button from '../components/core/Button';
import Card from '../components/core/Card';
import { Contact } from '../types';
import { ArrowLeft, Search } from 'lucide-react';

const CustomersPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data, isLoading } = useCustomers(pageSize, currentPage);
  const { data: selectedCustomer, isLoading: isCustomerLoading } = useCustomer(selectedCustomerId || '');
  
  const filteredCustomers = data?.customers?.filter((customer: Contact) => {
    if (!searchTerm) return true;
    
    const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
    const email = customer.email.toLowerCase();
    const company = customer.company.toLowerCase();
    const search = searchTerm.toLowerCase();
    
    return fullName.includes(search) || email.includes(search) || company.includes(search);
  }) || [];
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const handleCustomerSelect = (id: string) => {
    setSelectedCustomerId(id);
  };
  
  const handleBackToList = () => {
    setSelectedCustomerId(null);
  };
  
  if (selectedCustomerId && selectedCustomer) {
    return (
      <div className="space-y-6">
        <div className="flex items-center">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleBackToList}
            leftIcon={<ArrowLeft size={16} />}
            className="mr-4"
          >
            Back to Customers
          </Button>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {selectedCustomer.firstName} {selectedCustomer.lastName}
          </h1>
        </div>
        
        {isCustomerLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <CustomerProfile customer={selectedCustomer} />
        )}
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Customers</h1>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-2 pl-10 pr-4 block w-full focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Company
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Customer Since
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredCustomers.map((customer: Contact) => (
                  <tr 
                    key={customer.id} 
                    onClick={() => handleCustomerSelect(customer.id)}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {customer.firstName} {customer.lastName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{customer.company}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{customer.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{customer.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(customer.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
      
      {data && (
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, data.total || 0)} of {data.total || 0} customers
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
    </div>
  );
};

export default CustomersPage;
