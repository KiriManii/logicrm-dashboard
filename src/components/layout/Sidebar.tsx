// src/components/layout/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Package,
  UserCircle,
  Settings,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  className?: string;
}

interface MenuItemBase {
  label: string;
  icon: React.ReactNode;
}

interface SimpleMenuItem extends MenuItemBase {
  path: string;
}

interface SubmenuItem {
  path: string;
  label: string;
}

interface ExpandableMenuItem extends MenuItemBase {
  id: string;
  submenu: SubmenuItem[];
}

type MenuItem = SimpleMenuItem | ExpandableMenuItem;

const Sidebar: React.FC<SidebarProps> = ({ isOpen, className = '' }) => {
  const [expandedMenus, setExpandedMenus] = React.useState<Record<string, boolean>>({
    shipments: false,
  });

  const toggleMenu = (menu: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const menuItems: MenuItem[] = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/leads', label: 'Leads', icon: <Users size={20} /> },
    {
      id: 'shipments',
      label: 'Shipments',
      icon: <Package size={20} />,
      submenu: [
        { path: '/shipments', label: 'Active Shipments' },
        { path: '/shipments/history', label: 'Shipment History' },
      ],
    },
    { path: '/customers', label: 'Customers', icon: <UserCircle size={20} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const baseStyles = `
    h-screen overflow-y-auto 
    bg-white dark:bg-gray-800 
    border-r border-gray-200 dark:border-gray-700
    transition-all duration-300 ease-in-out
    ${className}
  `;

  const closedStyles =
    'fixed inset-y-0 left-0 z-30 w-0 -translate-x-full lg:static lg:w-64 lg:translate-x-0';

  const openStyles = 'fixed inset-y-0 left-0 z-30 w-64 translate-x-0';

  return (
    <aside className={`${baseStyles} ${isOpen ? openStyles : closedStyles}`}>
      <div className="px-4 py-4">
        <div className="space-y-4">
          {menuItems.map((item) => {
            // Render expandable menu
            if ('submenu' in item) {
              const isExpanded = expandedMenus[item.id] || false;
              return (
                <div key={item.id}>
                  <button
                    onClick={() => toggleMenu(item.id)}
                    className="flex items-center justify-between w-full px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  >
                    <div className="flex items-center">
                      <span className="mr-3 text-gray-500 dark:text-gray-400">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>

                  {isExpanded && (
                    <div className="ml-6 mt-2 space-y-2">
                      {item.submenu.map((subitem) => (
                        <NavLink
                          key={subitem.path}
                          to={subitem.path}
                          className={({ isActive }) => `
                            block px-4 py-2 text-sm rounded-md
                            ${
                              isActive
                                ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }
                          `}
                        >
                          {subitem.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            // Render simple link menu
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center px-4 py-2 rounded-md
                  ${
                    isActive
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                `}
              >
                <span className="mr-3 text-current">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

