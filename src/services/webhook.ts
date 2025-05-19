// src/services/webhook.ts
import axios from 'axios';
import environmentConfig from '../config/environment';

interface WebhookPayload {
  event: string;
  data: any;
}

export const triggerWebhook = async (payload: WebhookPayload): Promise<void> => {
  try {
    await axios.post(environmentConfig.webhooks.zapier, payload);
  } catch (error) {
    console.error('Failed to trigger webhook:', error);
    throw error;
  }
};

export const notifyNewLead = async (lead: any): Promise<void> => {
  await triggerWebhook({
    event: 'new_lead',
    data: {
      leadId: lead.id,
      name: `${lead.firstName} ${lead.lastName}`,
      email: lead.email,
      phone: lead.phone,
      timestamp: new Date().toISOString()
    }
  });
};

export const notifyShipmentDelay = async (shipment: any): Promise<void> => {
  await triggerWebhook({
    event: 'shipment_delay',
    data: {
      shipmentId: shipment.id,
      trackingNumber: shipment.trackingNumber,
      customerName: shipment.customerName,
      customerEmail: shipment.customerEmail,
      expectedDelivery: shipment.expectedDelivery,
      timestamp: new Date().toISOString()
    }
  });
};

export const notifyShipmentDelivered = async (shipment: any): Promise<void> => {
  await triggerWebhook({
    event: 'shipment_delivered',
    data: {
      shipmentId: shipment.id,
      trackingNumber: shipment.trackingNumber,
      customerName: shipment.customerName,
      customerEmail: shipment.customerEmail,
      deliveryTime: new Date().toISOString()
    }
  });
};
