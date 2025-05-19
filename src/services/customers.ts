import { Contact } from '../types';

// Realistic mock customer data
const mockCustomers: Contact[] = [
  {
    id: 'cust-1',
    firstName: 'John',
    lastName: 'Peterson',
    email: 'john.peterson@acmecorp.com',
    phone: '+1-415-555-1234',
    company: 'Acme Corporation',
    createdAt: new Date(Date.now() - 365 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 86400000).toISOString()
  },
  {
    id: 'cust-2',
    firstName: 'Maria',
    lastName: 'Rodriguez',
    email: 'maria.rodriguez@globexinc.com',
    phone: '+1-212-555-5678',
    company: 'Globex Industries',
    createdAt: new Date(Date.now() - 300 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 15 * 86400000).toISOString()
  },
  {
    id: 'cust-3',
    firstName: 'Alexander',
    lastName: 'Wong',
    email: 'alexander.wong@umbrellacorp.com',
    phone: '+1-604-555-9012',
    company: 'Umbrella Corporation',
    createdAt: new Date(Date.now() - 250 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 86400000).toISOString()
  },
  {
    id: 'cust-4',
    firstName: 'Sophia',
    lastName: 'Patel',
    email: 'sophia.patel@nakatomi.co.jp',
    phone: '+81-3-5555-3456',
    company: 'Nakatomi Trading',
    createdAt: new Date(Date.now() - 200 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 20 * 86400000).toISOString()
  },
  {
    id: 'cust-5',
    firstName: 'Andre',
    lastName: 'Dupont',
    email: 'andre.dupont@weylandcorp.com',
    phone: '+33-1-5555-7890',
    company: 'Weyland Corporation',
    createdAt: new Date(Date.now() - 180 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 86400000).toISOString()
  },
  {
    id: 'cust-6',
    firstName: 'Olivia',
    lastName: 'Smith',
    email: 'olivia.smith@soylentinc.com',
    phone: '+1-312-555-2345',
    company: 'Soylent Incorporated',
    createdAt: new Date(Date.now() - 150 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 25 * 86400000).toISOString()
  },
  {
    id: 'cust-7',
    firstName: 'Raj',
    lastName: 'Patel',
    email: 'raj.patel@masranigroup.com',
    phone: '+91-22-5555-6789',
    company: 'Masrani Global',
    createdAt: new Date(Date.now() - 120 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 18 * 86400000).toISOString()
  },
  {
    id: 'cust-8',
    firstName: 'Emma',
    lastName: 'Larsson',
    email: 'emma.larsson@tyrellinc.se',
    phone: '+46-8-5555-0123',
    company: 'Tyrell Inc.',
    createdAt: new Date(Date.now() - 100 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 86400000).toISOString()
  },
  {
    id: 'cust-9',
    firstName: 'Carlos',
    lastName: 'Mendoza',
    email: 'carlos.mendoza@virtucon.mx',
    phone: '+52-55-5555-4567',
    company: 'Virtucon Industries',
    createdAt: new Date(Date.now() - 80 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 86400000).toISOString()
  },
  {
    id: 'cust-10',
    firstName: 'Amara',
    lastName: 'Okafor',
    email: 'amara.okafor@waystar.ng',
    phone: '+234-1-5555-8901',
    company: 'Waystar Royco',
    createdAt: new Date(Date.now() - 60 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 86400000).toISOString()
  }
];

export const getCustomers = async (limit = 10, page = 1): Promise<{ customers: Contact[], total: number }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const startIndex = (page - 1) * limit;
  const paginatedCustomers = mockCustomers.slice(startIndex, startIndex + limit);
  
  return {
    customers: paginatedCustomers,
    total: mockCustomers.length
  };
};

export const getCustomerById = async (id: string): Promise<Contact | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const customer = mockCustomers.find(c => c.id === id);
  return customer || null;
};
