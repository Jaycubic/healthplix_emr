import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const MedicalAlertBanner = ({ alerts = [], onDismiss }) => {
  const [dismissedAlerts, setDismissedAlerts] = useState(new Set());

  const activeAlerts = alerts?.filter(alert => !dismissedAlerts?.has(alert?.id));

  const handleDismiss = (alertId) => {
    setDismissedAlerts(prev => new Set([...prev, alertId]));
    if (onDismiss) {
      onDismiss(alertId);
    }
  };

  const getAlertStyles = (severity) => {
    switch (severity) {
      case 'critical':
        return {
          container: 'bg-error/10 border-error text-error-foreground',
          icon: 'AlertTriangle',
          iconColor: 'var(--color-error)'
        };
      case 'warning':
        return {
          container: 'bg-warning/10 border-warning text-warning-foreground',
          icon: 'AlertCircle',
          iconColor: 'var(--color-warning)'
        };
      case 'info':
        return {
          container: 'bg-primary/10 border-primary text-primary-foreground',
          icon: 'Info',
          iconColor: 'var(--color-primary)'
        };
      default:
        return {
          container: 'bg-muted border-border text-muted-foreground',
          icon: 'Bell',
          iconColor: 'var(--color-muted-foreground)'
        };
    }
  };

  if (activeAlerts?.length === 0) return null;

  return (
    <div className="sticky top-0 z-100 space-y-2 p-4 bg-background/95 backdrop-blur-sm">
      {activeAlerts?.map((alert) => {
        const styles = getAlertStyles(alert?.severity);
        
        return (
          <div
            key={alert?.id}
            className={`flex items-start space-x-3 p-4 border rounded-lg medical-shadow ${styles?.container} animate-slide-in-from-top`}
          >
            <Icon 
              name={styles?.icon} 
              size={20} 
              color={styles?.iconColor}
              className="flex-shrink-0 mt-0.5"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-medium mb-1">{alert?.title}</h4>
                  <p className="text-sm opacity-90">{alert?.message}</p>
                  
                  {alert?.details && (
                    <div className="mt-2 text-xs opacity-75">
                      <p><strong>Patient:</strong> {alert?.details?.patientName}</p>
                      {alert?.details?.medication && (
                        <p><strong>Medication:</strong> {alert?.details?.medication}</p>
                      )}
                      {alert?.details?.interaction && (
                        <p><strong>Interaction:</strong> {alert?.details?.interaction}</p>
                      )}
                    </div>
                  )}
                  
                  {alert?.actions && alert?.actions?.length > 0 && (
                    <div className="flex items-center space-x-2 mt-3">
                      {alert?.actions?.map((action, index) => (
                        <Button
                          key={index}
                          variant={action?.variant || 'outline'}
                          size="xs"
                          onClick={action?.onClick}
                        >
                          {action?.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDismiss(alert?.id)}
                  className="flex-shrink-0 ml-2 opacity-60 hover:opacity-100"
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MedicalAlertBanner;