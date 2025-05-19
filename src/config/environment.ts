// src/config/environment.ts
interface EnvironmentConfig {
  apiKeys: {
    hubspot: string;
    shipEngine: string;
  };
  webhooks: {
    zapier: string;
  };
  features: {
    darkMode: boolean;
    notifications: boolean;
    analytics: boolean;
  };
}

const environmentConfig: EnvironmentConfig = {
  apiKeys: {
    hubspot: import.meta.env.VITE_HUBSPOT_API_KEY || '',
    shipEngine: import.meta.env.VITE_SHIPENGINE_API_KEY || '',
  },
  webhooks: {
    zapier: import.meta.env.VITE_WEBHOOK_URL || '',
  },
  features: {
    darkMode: true,
    notifications: true,
    analytics: import.meta.env.MODE === 'production',
  },
};

export default environmentConfig;
