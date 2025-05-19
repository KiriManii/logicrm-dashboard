// src/types/index.ts

// CRM Types
export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Deal {
  id: string;
  name: string;
  stage: string;
  amount: number;
  closeDate: string;
  owner: string;
  probability: number;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  createdAt: string;
  updatedAt: string;
}

// Shipment Types
export interface Shipment {
  id: string;
  customerName: string;
  customerEmail: string;
  origin: string;
  destination: string;
  status: string;
  carrier: string;
  trackingNumber: string;
  createdAt: Date;
  expectedDelivery?: Date;
}

export interface TrackingStatus {
  status: string;
  location: string;
  timestamp: Date;
  description: string;
}

// User Type
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

// Notification Type
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}
