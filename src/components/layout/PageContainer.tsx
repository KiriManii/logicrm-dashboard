// src/components/layout/PageContainer.tsx
import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  actions?: React.ReactNode;
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  title,
  actions,
  className = '',
}) => {
  return (
    <div className={`container mx-auto px-4 py-6 ${className}`}>
      {(title || actions) && (
        <div className="flex justify-between items-center mb-6">
          {title && <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h1>}
          {actions && <div className="flex space-x-2">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export default PageContainer;
