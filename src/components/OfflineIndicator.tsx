
import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, AlertCircle } from 'lucide-react';
import { Capacitor } from '@capacitor/core';
import { Card } from '@/components/ui/card';

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineContent, setShowOfflineContent] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineContent(false);
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineContent(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check initial state
    if (!navigator.onLine) {
      setShowOfflineContent(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Show full offline screen for mobile apps when offline
  if (!isOnline && Capacitor.isNativePlatform() && showOfflineContent) {
    return (
      <div className="fixed inset-0 bg-gray-900/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="p-8 max-w-sm w-full text-center bg-white dark:bg-gray-800 shadow-2xl">
          <div className="mb-6">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <WifiOff className="text-red-600 dark:text-red-400" size={32} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              You're Offline
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Your habits are saved locally and will sync when you're back online.
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <AlertCircle size={16} />
            <span>Offline mode active</span>
          </div>
        </Card>
      </div>
    );
  }

  // Show small indicator for web or when online
  if (!isOnline) {
    return (
      <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg animate-bounce z-40">
        <WifiOff size={16} />
        <span className="text-sm font-medium">Offline</span>
      </div>
    );
  }

  return null;
};

export default OfflineIndicator;
