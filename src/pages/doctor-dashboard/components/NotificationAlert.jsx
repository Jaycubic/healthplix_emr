import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationAlert = ({ notification, onDismiss, onAction }) => {
  const getSeverityStyles = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return {
          container: 'bg-error/10 border-error/20 text-error',
          icon: 'AlertTriangle',
          iconColor: 'var(--color-error)'
        };
      case 'high':
        return {
          container: 'bg-warning/10 border-warning/20 text-warning',
          icon: 'AlertCircle',
          iconColor: 'var(--color-warning)'
        };
      case 'medium':
        return {
          container: 'bg-primary/10 border-primary/20 text-primary',
          icon: 'Info',
          iconColor: 'var(--color-primary)'
        };
      case 'low':
        return {
          container: 'bg-success/10 border-success/20 text-success',
          icon: 'CheckCircle',
          iconColor: 'var(--color-success)'
        };
      default:
        return {
          container: 'bg-muted border-border text-muted-foreground',
          icon: 'Bell',
          iconColor: 'var(--color-muted-foreground)'
        };
    }
  };

  const getNotificationTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'ddi_alert':
        return 'AlertTriangle';
      case 'appointment_reminder':
        return 'Calendar';
      case 'lab_result':
        return 'TestTube';
      case 'prescription_alert':
        return 'Pill';
      case 'system_update':
        return 'Settings';
      default:
        return 'Bell';
    }
  };

  const styles = getSeverityStyles(notification?.severity);

  return (
    <div className={`border rounded-lg p-4 medical-shadow ${styles?.container}`}>
      <div className="flex items-start space-x-3">
        <Icon 
          name={getNotificationTypeIcon(notification?.type)} 
          size={20} 
          color={styles?.iconColor}
          className="flex-shrink-0 mt-0.5"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="text-sm font-medium mb-1">{notification?.title}</h4>
              <p className="text-sm opacity-90 mb-2">{notification?.message}</p>
              
              {notification?.details && (
                <div className="text-xs opacity-75 space-y-1">
                  {notification?.details?.patientName && (
                    <p><strong>Patient:</strong> {notification?.details?.patientName}</p>
                  )}
                  {notification?.details?.medication && (
                    <p><strong>Medication:</strong> {notification?.details?.medication}</p>
                  )}
                  {notification?.details?.interaction && (
                    <p><strong>Interaction:</strong> {notification?.details?.interaction}</p>
                  )}
                  {notification?.details?.appointmentTime && (
                    <p><strong>Time:</strong> {new Date(notification.details.appointmentTime)?.toLocaleString()}</p>
                  )}
                </div>
              )}
              
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs opacity-60">
                  {new Date(notification.timestamp)?.toLocaleString()}
                </span>
                
                <div className="flex items-center space-x-2">
                  {notification?.actionLabel && (
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => onAction?.(notification)}
                    >
                      {notification?.actionLabel}
                    </Button>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => onDismiss?.(notification?.id)}
                    iconName="X"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationAlert;