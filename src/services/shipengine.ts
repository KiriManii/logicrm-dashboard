import createApiClient from './apiClient';
import { Shipment, TrackingStatus } from '../types';
import environmentConfig from '../config/environment';

// Create API client
const shipEngineClient = createApiClient('https://api.shipengine.com/v1');

// For development, we'll mock the API calls
const useMockData = true;

// Realistic mock shipment data
const mockShipments: Shipment[] = [
  {
    id: 'shipment-1',
    customerName: 'John Peterson (Acme Corporation)',
    customerEmail: 'john.peterson@acmecorp.com',
    origin: 'San Francisco, CA',
    destination: 'Boston, MA',
    status: 'in_transit',
    carrier: 'FedEx',
    trackingNumber: 'FDX029384561',
    createdAt: new Date(Date.now() - 3 * 86400000),
    expectedDelivery: new Date(Date.now() + 2 * 86400000)
  },
  {
    id: 'shipment-2',
    customerName: 'Maria Rodriguez (Globex Industries)',
    customerEmail: 'maria.rodriguez@globexinc.com',
    origin: 'New York, NY',
    destination: 'Chicago, IL',
    status: 'delivered',
    carrier: 'UPS',
    trackingNumber: 'UPS6748921307',
    createdAt: new Date(Date.now() - 8 * 86400000),
    expectedDelivery: new Date(Date.now() - 1 * 86400000)
  },
  {
    id: 'shipment-3',
    customerName: 'Alexander Wong (Umbrella Corporation)',
    customerEmail: 'alexander.wong@umbrellacorp.com',
    origin: 'Vancouver, BC',
    destination: 'Toronto, ON',
    status: 'processing',
    carrier: 'USPS',
    trackingNumber: 'USPS8267391054',
    createdAt: new Date(Date.now() - 1 * 86400000),
    expectedDelivery: new Date(Date.now() + 5 * 86400000)
  },
  {
    id: 'shipment-4',
    customerName: 'Sophia Patel (Nakatomi Trading)',
    customerEmail: 'sophia.patel@nakatomi.co.jp',
    origin: 'Tokyo, Japan',
    destination: 'Los Angeles, CA',
    status: 'delayed',
    carrier: 'DHL',
    trackingNumber: 'DHL3901746582',
    createdAt: new Date(Date.now() - 5 * 86400000),
    expectedDelivery: new Date(Date.now() + 3 * 86400000)
  },
  {
    id: 'shipment-5',
    customerName: 'Andre Dupont (Weyland Corporation)',
    customerEmail: 'andre.dupont@weylandcorp.com',
    origin: 'Paris, France',
    destination: 'London, UK',
    status: 'in_transit',
    carrier: 'FedEx',
    trackingNumber: 'FDX192837465',
    createdAt: new Date(Date.now() - 4 * 86400000),
    expectedDelivery: new Date(Date.now() + 1 * 86400000)
  },
  {
    id: 'shipment-6',
    customerName: 'Olivia Smith (Soylent Incorporated)',
    customerEmail: 'olivia.smith@soylentinc.com',
    origin: 'Chicago, IL',
    destination: 'Denver, CO',
    status: 'delivered',
    carrier: 'UPS',
    trackingNumber: 'UPS1234567890',
    createdAt: new Date(Date.now() - 10 * 86400000),
    expectedDelivery: new Date(Date.now() - 3 * 86400000)
  },
  {
    id: 'shipment-7',
    customerName: 'Raj Patel (Masrani Global)',
    customerEmail: 'raj.patel@masranigroup.com',
    origin: 'Mumbai, India',
    destination: 'San Francisco, CA',
    status: 'processing',
    carrier: 'DHL',
    trackingNumber: 'DHL9876543210',
    createdAt: new Date(Date.now() - 2 * 86400000),
    expectedDelivery: new Date(Date.now() + 6 * 86400000)
  },
  {
    id: 'shipment-8',
    customerName: 'Emma Larsson (Tyrell Inc.)',
    customerEmail: 'emma.larsson@tyrellinc.se',
    origin: 'Stockholm, Sweden',
    destination: 'Berlin, Germany',
    status: 'in_transit',
    carrier: 'FedEx',
    trackingNumber: 'FDX5647382910',
    createdAt: new Date(Date.now() - 5 * 86400000),
    expectedDelivery: new Date(Date.now() + 2 * 86400000)
  },
  {
    id: 'shipment-9',
    customerName: 'Carlos Mendoza (Virtucon Industries)',
    customerEmail: 'carlos.mendoza@virtucon.mx',
    origin: 'Mexico City, Mexico',
    destination: 'Miami, FL',
    status: 'delayed',
    carrier: 'USPS',
    trackingNumber: 'USPS1029384756',
    createdAt: new Date(Date.now() - 7 * 86400000),
    expectedDelivery: new Date(Date.now() + 2 * 86400000)
  },
  {
    id: 'shipment-10',
    customerName: 'Amara Okafor (Waystar Royco)',
    customerEmail: 'amara.okafor@waystar.ng',
    origin: 'Lagos, Nigeria',
    destination: 'London, UK',
    status: 'delivered',
    carrier: 'DHL',
    trackingNumber: 'DHL4958372610',
    createdAt: new Date(Date.now() - 12 * 86400000),
    expectedDelivery: new Date(Date.now() - 4 * 86400000)
  }
];

const mockTrackingHistory: Record<string, TrackingStatus[]> = {};
mockShipments.forEach(shipment => {
  const history: TrackingStatus[] = [];
  const daysInTransit = Math.floor(Math.random() * 5) + 1;
  
  if (shipment.status === 'delivered') {
    history.push({
      status: 'Order Processed',
      location: shipment.origin,
      timestamp: new Date(shipment.createdAt.getTime()),
      description: 'Your order has been processed and is ready for shipment.'
    });
    
    history.push({
      status: 'Picked Up',
      location: shipment.origin,
      timestamp: new Date(shipment.createdAt.getTime() + 24 * 60 * 60 * 1000),
      description: `Package picked up by ${shipment.carrier} courier.`
    });
    
    let transitPoint = '';
    if (shipment.origin.includes('Tokyo') || shipment.origin.includes('Mumbai')) {
      transitPoint = 'Dubai, UAE';
    } else if (shipment.origin.includes('Paris') || shipment.origin.includes('Stockholm')) {
      transitPoint = 'Frankfurt, Germany';
    } else if (shipment.origin.includes('Lagos')) {
      transitPoint = 'Addis Ababa, Ethiopia';
    } else if (shipment.origin.includes('San Francisco')) {
      transitPoint = 'Chicago, IL';
    } else if (shipment.origin.includes('New York')) {
      transitPoint = 'Columbus, OH';
    } else {
      transitPoint = 'Memphis, TN';
    }
    
    history.push({
      status: 'In Transit',
      location: transitPoint,
      timestamp: new Date(shipment.createdAt.getTime() + 48 * 60 * 60 * 1000),
      description: 'Package is in transit to the destination.'
    });
    
    history.push({
      status: 'Out for Delivery',
      location: shipment.destination,
      timestamp: new Date((shipment.expectedDelivery?.getTime() ?? Date.now()) - 12 * 60 * 60 * 1000),
      description: 'Package is out for delivery.'
    });
    
    history.push({
      status: 'Delivered',
      location: shipment.destination,
      timestamp: new Date(shipment.expectedDelivery?.getTime() ?? Date.now()),
      description: 'Package has been delivered. Signed by: J. Smith'
    });
  } else if (shipment.status === 'delayed') {
    history.push({
      status: 'Order Processed',
      location: shipment.origin,
      timestamp: new Date(shipment.createdAt.getTime()),
      description: 'Your order has been processed and is ready for shipment.'
    });
    
    history.push({
      status: 'Picked Up',
      location: shipment.origin,
      timestamp: new Date(shipment.createdAt.getTime() + 24 * 60 * 60 * 1000),
      description: `Package picked up by ${shipment.carrier} courier.`
    });
    
    let transitPoint = '';
    let delayReason = '';
    
    if (shipment.origin.includes('Tokyo') || shipment.origin.includes('Mumbai')) {
      transitPoint = 'Dubai, UAE';
      delayReason = 'Customs clearance delay.';
    } else if (shipment.origin.includes('Paris') || shipment.origin.includes('Stockholm')) {
      transitPoint = 'Frankfurt, Germany';
      delayReason = 'Operational delay due to weather conditions.';
    } else if (shipment.origin.includes('Lagos')) {
      transitPoint = 'Addis Ababa, Ethiopia';
      delayReason = 'Processing delay at transit facility.';
    } else {
      transitPoint = 'Memphis, TN';
      delayReason = 'Clearance delay - Additional information required.';
    }
    
    history.push({
      status: 'In Transit',
      location: transitPoint,
      timestamp: new Date(shipment.createdAt.getTime() + 48 * 60 * 60 * 1000),
      description: 'Package is in transit to the destination.'
    });
    
    history.push({
      status: 'Delayed',
      location: transitPoint,
      timestamp: new Date(shipment.createdAt.getTime() + 72 * 60 * 60 * 1000),
      description: delayReason
    });
  } else if (shipment.status === 'in_transit') {
    history.push({
      status: 'Order Processed',
      location: shipment.origin,
      timestamp: new Date(shipment.createdAt.getTime()),
      description: 'Your order has been processed and is ready for shipment.'
    });
    
    history.push({
      status: 'Picked Up',
      location: shipment.origin,
      timestamp: new Date(shipment.createdAt.getTime() + 24 * 60 * 60 * 1000),
      description: `Package picked up by ${shipment.carrier} courier.`
    });
    
    let transitPoint = '';
    
    if (shipment.origin.includes('Tokyo') || shipment.origin.includes('Mumbai')) {
      transitPoint = 'Dubai, UAE';
    } else if (shipment.origin.includes('Paris') || shipment.origin.includes('Stockholm')) {
      transitPoint = 'Frankfurt, Germany';
    } else if (shipment.origin.includes('Lagos')) {
      transitPoint = 'Addis Ababa, Ethiopia';
    } else if (shipment.origin.includes('San Francisco')) {
      transitPoint = 'Chicago, IL';
    } else if (shipment.origin.includes('New York')) {
      transitPoint = 'Columbus, OH';
    } else {
      transitPoint = 'Memphis, TN';
    }
    
    history.push({
      status: 'In Transit',
      location: transitPoint,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      description: 'Package is in transit to the destination.'
    });
  } else if (shipment.status === 'processing') {
    history.push({
      status: 'Order Processed',
      location: shipment.origin,
      timestamp: new Date(shipment.createdAt.getTime()),
      description: 'Your order has been processed and is ready for shipment.'
    });
  }
  
  mockTrackingHistory[shipment.id] = history;
});

export const getShipments = async (page = 1, pageSize = 20): Promise<{ shipments: Shipment[], total: number }> => {
  if (useMockData) {
    const startIndex = (page - 1) * pageSize;
    const paginatedShipments = mockShipments.slice(startIndex, startIndex + pageSize);
    
    return {
      shipments: paginatedShipments,
      total: mockShipments.length
    };
  }
  
  const response = await shipEngineClient.get('/shipments', {
    params: { page, page_size: pageSize },
    headers: {
      'API-Key': environmentConfig.apiKeys.shipEngine
    }
  });
  
  return {
    shipments: response.data.shipments.map(mapShipEngineShipment),
    total: response.data.total
  };
};

export const getShipmentTracking = async (shipmentId: string): Promise<TrackingStatus[]> => {
  if (useMockData) {
    return mockTrackingHistory[shipmentId] || [];
  }
  
  const response = await shipEngineClient.get(`/shipments/${shipmentId}/tracking`, {
    headers: {
      'API-Key': environmentConfig.apiKeys.shipEngine
    }
  });
  
  return response.data.tracking_history.map((event: any) => ({
    status: event.status_description,
    location: event.location,
    timestamp: new Date(event.timestamp),
    description: event.description
  }));
};

const mapShipEngineShipment = (shipment: any): Shipment => ({
  id: shipment.id,
  customerName: `${shipment.ship_to.name}`,
  customerEmail: shipment.ship_to.email || '',
  origin: `${shipment.ship_from.city}, ${shipment.ship_from.state_province}`,
  destination: `${shipment.ship_to.city}, ${shipment.ship_to.state_province}`,
  status: shipment.status,
  carrier: shipment.carrier_id,
  trackingNumber: shipment.tracking_number,
  createdAt: new Date(shipment.created_at),
  expectedDelivery: shipment.expected_delivery ? new Date(shipment.expected_delivery) : undefined
});
