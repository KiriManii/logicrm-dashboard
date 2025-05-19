import axios from 'axios';
import createApiClient from './apiClient';
import { Lead, Deal, Contact } from '../types';
import environmentConfig from '../config/environment';

// Create an API client for HubSpot
const hubspotClient = createApiClient('https://api.hubspot.com/crm/v3');

// For development, we'll mock the API calls
const useMockData = true;

// Realistic mock data for development
const mockLeads: Lead[] = [
  {
    id: 'lead-1',
    firstName: 'James',
    lastName: 'Wilson',
    email: 'james.wilson@techinnovate.com',
    phone: '+1-202-555-0134',
    status: 'new',
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 86400000).toISOString()
  },
  {
    id: 'lead-2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sjohnson@globallogistics.net',
    phone: '+1-310-555-8976',
    status: 'contacted',
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 86400000).toISOString()
  },
  {
    id: 'lead-3',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@pacificfreight.com',
    phone: '+1-415-555-3421',
    status: 'qualified',
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 8 * 86400000).toISOString()
  },
  {
    id: 'lead-4',
    firstName: 'Emily',
    lastName: 'Roberts',
    email: 'eroberts@fastdistribution.co',
    phone: '+1-512-555-7654',
    status: 'new',
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 86400000).toISOString()
  },
  {
    id: 'lead-5',
    firstName: 'David',
    lastName: 'Nguyen',
    email: 'dnguyen@expresscargo.org',
    phone: '+1-213-555-9045',
    status: 'contacted',
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 86400000).toISOString()
  },
  {
    id: 'lead-6',
    firstName: 'Patricia',
    lastName: 'Garcia',
    email: 'patricia.garcia@shipforward.com',
    phone: '+1-619-555-2389',
    status: 'qualified',
    createdAt: new Date(Date.now() - 15 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 86400000).toISOString()
  },
  {
    id: 'lead-7',
    firstName: 'Robert',
    lastName: 'Kim',
    email: 'rkim@translogistics.net',
    phone: '+1-253-555-6721',
    status: 'lost',
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 25 * 86400000).toISOString()
  },
  {
    id: 'lead-8',
    firstName: 'Jennifer',
    lastName: 'Taylor',
    email: 'jennifer.taylor@swiftdeliver.co.uk',
    phone: '+44-20-5551-8756',
    status: 'new',
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 86400000).toISOString()
  },
  {
    id: 'lead-9',
    firstName: 'Thomas',
    lastName: 'Martinez',
    email: 'tmartinez@cargolink.mx',
    phone: '+52-55-5555-4321',
    status: 'contacted',
    createdAt: new Date(Date.now() - 9 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 86400000).toISOString()
  },
  {
    id: 'lead-10',
    firstName: 'Lisa',
    lastName: 'Anderson',
    email: 'lisa.anderson@freightforce.ca',
    phone: '+1-604-555-1122',
    status: 'new',
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 86400000).toISOString()
  },
  {
    id: 'lead-11',
    firstName: 'Kevin',
    lastName: 'Lee',
    email: 'kevin.lee@asiaroutes.co.jp',
    phone: '+81-3-5555-6543',
    status: 'contacted',
    createdAt: new Date(Date.now() - 12 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 9 * 86400000).toISOString()
  },
  {
    id: 'lead-12',
    firstName: 'Jessica',
    lastName: 'Brown',
    email: 'jbrown@logicon.com',
    phone: '+1-312-555-8832',
    status: 'qualified',
    createdAt: new Date(Date.now() - 20 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 15 * 86400000).toISOString()
  }
];

// Get leads with pagination
export const getLeads = async (limit = 10, page = 1): Promise<{ leads: Lead[], total: number }> => {
  if (useMockData) {
    // Use mock data for development
    const startIndex = (page - 1) * limit;
    const paginatedLeads = mockLeads.slice(startIndex, startIndex + limit);
    
    return {
      leads: paginatedLeads,
      total: mockLeads.length
    };
  }
  
  // In production, use the real API
  const after = page > 1 ? (page - 1) * limit : undefined;
  const response = await hubspotClient.get('/objects/contacts', {
    params: { 
      limit, 
      after, 
      properties: ['firstname', 'lastname', 'email', 'phone', 'lead_status'] 
    },
    headers: {
      'Authorization': `Bearer ${environmentConfig.apiKeys.hubspot}`
    }
  });
  
  return {
    leads: response.data.results.map(mapHubspotContactToLead),
    total: response.data.total
  };
};

// Create a new lead
export const createLead = async (lead: Partial<Lead>): Promise<Lead> => {
  if (useMockData) {
    // Create a mock lead
    const newLead: Lead = {
      id: `lead-${mockLeads.length + 1}`,
      firstName: lead.firstName || '',
      lastName: lead.lastName || '',
      email: lead.email || '',
      phone: lead.phone || '',
      status: lead.status || 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // In a real app, we would add this to the database
    mockLeads.unshift(newLead);
    
    return newLead;
  }
  
  // In production, use the real API
  const properties = {
    firstname: lead.firstName,
    lastname: lead.lastName,
    email: lead.email,
    phone: lead.phone,
    lead_status: lead.status
  };
  
  const response = await hubspotClient.post('/objects/contacts', 
    { properties },
    {
      headers: {
        'Authorization': `Bearer ${environmentConfig.apiKeys.hubspot}`
      }
    }
  );
  
  return mapHubspotContactToLead(response.data);
};

// Helper function to map HubSpot data to our application types
const mapHubspotContactToLead = (contact: any): Lead => ({
  id: contact.id,
  firstName: contact.properties.firstname || '',
  lastName: contact.properties.lastname || '',
  email: contact.properties.email || '',
  phone: contact.properties.phone || '',
  status: contact.properties.lead_status || 'new',
  createdAt: contact.createdAt || new Date().toISOString(),
  updatedAt: contact.updatedAt || new Date().toISOString()
});
