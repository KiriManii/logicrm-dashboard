// src/utils/automationRules.ts
import { notifyNewLead, notifyShipmentDelay, notifyShipmentDelivered } from '../services/webhook';
import { Lead, Shipment } from '../types';

interface Rule<T> {
  condition: (data: T) => boolean;
  action: (data: T) => Promise<void>;
  name: string;
}

// Lead automation rules
export const leadRules: Rule<Lead>[] = [
  {
    name: 'New Lead Notification',
    condition: (lead) => lead.status === 'new',
    action: async (lead) => {
      await notifyNewLead(lead);
    }
  },
  {
    name: 'High-Value Lead Alert',
    condition: (lead) => lead.email.endsWith('.com') && lead.firstName.length > 3,
    action: async (lead) => {
      // This is a mock condition to demonstrate rule flexibility
      await notifyNewLead(lead);
    }
  }
];

// Shipment automation rules
export const shipmentRules: Rule<Shipment>[] = [
  {
    name: 'Delayed Shipment Alert',
    condition: (shipment) => {
      if (!shipment.expectedDelivery) return false;
      const now = new Date();
      return shipment.status !== 'delivered' && shipment.expectedDelivery < now;
    },
    action: async (shipment) => {
      await notifyShipmentDelay(shipment);
    }
  },
  {
    name: 'Delivery Confirmation',
    condition: (shipment) => shipment.status === 'delivered',
    action: async (shipment) => {
      await notifyShipmentDelivered(shipment);
    }
  }
];

// Process rules for a given data item
export const processRules = async <T>(rules: Rule<T>[], data: T): Promise<void> => {
  for (const rule of rules) {
    try {
      if (rule.condition(data)) {
        await rule.action(data);
        console.log(`Rule "${rule.name}" executed successfully`);
      }
    } catch (error) {
      console.error(`Error executing rule "${rule.name}":`, error);
    }
  }
};
