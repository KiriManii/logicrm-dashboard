// src/pages/SettingsPage.tsx
import React, { useState } from 'react';
import Card from '../components/core/Card';
import Button from '../components/core/Button';
import { useTheme } from '../contexts/ThemeContext';
import { useNotifications } from '../contexts/NotificationContext';
import { Bell, Moon, Sun } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { addNotification } = useNotifications();
  const [webhookUrl, setWebhookUrl] = useState('https://hooks.zapier.com/hooks/catch/123456/abcdef/');
  const [notificationSettings, setNotificationSettings] = useState({
    newLeads: true,
    shipmentUpdates: true,
    deliveryDelays: true,
    customerActivity: false,
    systemAlerts: true
  });
  
  const handleNotificationToggle = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const handleSaveWebhook = () => {
    // In a real app, this would save to an API
    addNotification({
      title: 'Settings Updated',
      message: 'Webhook URL has been saved successfully.',
      type: 'success'
    });
  };
  
  const handleSaveNotifications = () => {
    // In a real app, this would save to an API
    addNotification({
      title: 'Settings Updated',
      message: 'Notification preferences have been saved successfully.',
      type: 'success'
    });
  };
  
  const handleTestNotification = () => {
    addNotification({
      title: 'Test Notification',
      message: 'This is a test notification from settings.',
      type: 'info'
    });
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Appearance">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Theme</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Choose between light and dark theme
                </p>
              </div>
              <Button
                variant="outline"
                onClick={toggleTheme}
                leftIcon={theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              >
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </Button>
            </div>
          </div>
        </Card>
        
        <Card title="Webhook Integration">
          <div className="space-y-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Set up webhook URL for external integrations with Zapier, Make, or other automation tools.
            </p>
            
            <div>
              <label htmlFor="webhook-url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Webhook URL
              </label>
              <input
                id="webhook-url"
                type="text"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div className="flex justify-end">
              <Button 
                variant="primary" 
                onClick={handleSaveWebhook}
              >
                Save
              </Button>
            </div>
          </div>
        </Card>
        
        <Card title="Notification Preferences">
          <div className="space-y-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Configure which system events should generate notifications.
            </p>
            
            <div className="space-y-3">
              {Object.entries(notificationSettings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <label htmlFor={`notification-${key}`} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </label>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id={`notification-${key}`}
                      checked={value}
                      onChange={() => handleNotificationToggle(key as keyof typeof notificationSettings)}
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white dark:bg-gray-300 border-4 appearance-none cursor-pointer"
                    />
                    <label
                      htmlFor={`notification-${key}`}
                      className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                        value ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    ></label>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={handleTestNotification}
                leftIcon={<Bell size={16} />}
              >
                Test Notification
              </Button>
              
              <Button 
                variant="primary" 
                onClick={handleSaveNotifications}
              >
                Save Preferences
              </Button>
            </div>
          </div>
        </Card>
        
        <Card title="Account Information">
          <div className="space-y-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage your account details and preferences.
            </p>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Your Information</h3>
              <div className="mt-2 space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Name:</span> Test User
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Email:</span> test@example.com
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Role:</span> Administrator
                </p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button variant="outline">
                Edit Profile
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
