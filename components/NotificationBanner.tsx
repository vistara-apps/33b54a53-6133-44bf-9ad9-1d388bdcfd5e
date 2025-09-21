'use client';

import { AlertCircle, Info, CheckCircle, X } from 'lucide-react';
import { useState } from 'react';

interface NotificationBannerProps {
  type: 'info' | 'warning' | 'success' | 'error';
  message: string;
  dismissible?: boolean;
  className?: string;
}

export function NotificationBanner({ 
  type, 
  message, 
  dismissible = true, 
  className = '' 
}: NotificationBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const getStyles = () => {
    switch (type) {
      case 'info':
        return {
          container: 'bg-blue-50 border-blue-200 text-blue-800',
          icon: Info,
          iconColor: 'text-blue-500'
        };
      case 'warning':
        return {
          container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
          icon: AlertCircle,
          iconColor: 'text-yellow-500'
        };
      case 'success':
        return {
          container: 'bg-green-50 border-green-200 text-green-800',
          icon: CheckCircle,
          iconColor: 'text-green-500'
        };
      case 'error':
        return {
          container: 'bg-red-50 border-red-200 text-red-800',
          icon: AlertCircle,
          iconColor: 'text-red-500'
        };
      default:
        return {
          container: 'bg-gray-50 border-gray-200 text-gray-800',
          icon: Info,
          iconColor: 'text-gray-500'
        };
    }
  };

  const styles = getStyles();
  const Icon = styles.icon;

  return (
    <div className={`
      ${styles.container} 
      border rounded-lg p-3 
      backdrop-blur-sm
      ${className}
    `}>
      <div className="flex items-start gap-3">
        <Icon size={20} className={`${styles.iconColor} flex-shrink-0 mt-0.5`} />
        <p className="flex-1 text-sm font-medium leading-relaxed">
          {message}
        </p>
        {dismissible && (
          <button
            onClick={() => setIsVisible(false)}
            className={`${styles.iconColor} hover:opacity-70 transition-opacity flex-shrink-0`}
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
