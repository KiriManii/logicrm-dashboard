// src/components/core/Avatar.tsx
import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  className?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  name,
  size = 'md',
  shape = 'circle',
  className = '',
  status
}) => {
  // Size classes
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-md',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  };
  
  // Shape classes
  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-md'
  };
  
  // Get initials from name
  const getInitials = () => {
    if (!name) return '?';
    
    const nameArray = name.split(' ');
    if (nameArray.length === 1) {
      return nameArray[0].charAt(0).toUpperCase();
    }
    
    return (nameArray[0].charAt(0) + nameArray[nameArray.length - 1].charAt(0)).toUpperCase();
  };
  
  // Status indicator colors
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500'
  };
  
  return (
    <div className="relative inline-block">
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`${sizeClasses[size]} ${shapeClasses[shape]} object-cover border border-gray-200 dark:border-gray-700 ${className}`}
        />
      ) : (
        <div className={`${sizeClasses[size]} ${shapeClasses[shape]} flex items-center justify-center bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-medium ${className}`}>
          {getInitials()}
        </div>
      )}
      
      {status && (
        <span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white dark:ring-gray-800 ${statusColors[status]}`}></span>
      )}
    </div>
  );
};

export default Avatar;
