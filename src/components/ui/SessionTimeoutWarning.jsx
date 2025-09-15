import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const SessionTimeoutWarning = ({ 
  isVisible = false,
  timeRemaining = 300, // 5 minutes in seconds
  onExtendSession,
  onLogout,
  onClose
}) => {
  const [countdown, setCountdown] = useState(timeRemaining);
  const [isExtending, setIsExtending] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    setCountdown(timeRemaining);
    
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          if (onLogout) onLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible, timeRemaining, onLogout]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds?.toString()?.padStart(2, '0')}`;
  };

  const handleExtendSession = async () => {
    setIsExtending(true);
    try {
      if (onExtendSession) {
        await onExtendSession();
      }
      if (onClose) onClose();
    } catch (error) {
      console.error('Failed to extend session:', error);
    } finally {
      setIsExtending(false);
    }
  };

  const handleLogout = () => {
    if (onLogout) onLogout();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
      
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-lg medical-shadow-lg max-w-md w-full mx-4 animate-fade-in">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
              <Icon name="Clock" size={20} color="var(--color-warning)" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">
                Session Timeout Warning
              </h3>
              <p className="text-sm text-muted-foreground">
                Your session will expire soon
              </p>
            </div>
          </div>
          
          {/* Content */}
          <div className="mb-6">
            <div className="text-center mb-4">
              <div className="text-3xl font-mono font-bold text-warning mb-2">
                {formatTime(countdown)}
              </div>
              <p className="text-sm text-muted-foreground">
                Your session will automatically log out for security purposes.
                Any unsaved work may be lost.
              </p>
            </div>
            
            {/* Security Notice */}
            <div className="bg-muted rounded-lg p-3 mb-4">
              <div className="flex items-start space-x-2">
                <Icon name="Shield" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-card-foreground mb-1">
                    Medical Data Security
                  </p>
                  <p className="text-muted-foreground">
                    This timeout protects patient information in compliance with healthcare regulations.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Current Activity Warning */}
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-warning mb-1">
                    Unsaved Changes
                  </p>
                  <p className="text-warning/80">
                    Please save any prescription drafts or patient records before your session expires.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="default"
              onClick={handleExtendSession}
              loading={isExtending}
              iconName="RefreshCw"
              iconPosition="left"
              className="flex-1"
            >
              {isExtending ? 'Extending...' : 'Extend Session'}
            </Button>
            
            <Button
              variant="outline"
              onClick={handleLogout}
              iconName="LogOut"
              iconPosition="left"
              className="flex-1"
            >
              Logout Now
            </Button>
          </div>
          
          {/* Additional Options */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Auto-logout in {formatTime(countdown)}
              </span>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-muted-foreground hover:text-card-foreground"
              >
                Dismiss Warning
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionTimeoutWarning;