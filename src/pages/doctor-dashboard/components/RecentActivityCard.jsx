import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivityCard = ({ activity }) => {
  const getActivityIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'prescription':
        return 'Pill';
      case 'consultation':
        return 'Video';
      case 'record_update':
        return 'FileText';
      case 'lab_result':
        return 'TestTube';
      case 'appointment':
        return 'Calendar';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'prescription':
        return 'text-accent';
      case 'consultation':
        return 'text-primary';
      case 'record_update':
        return 'text-warning';
      case 'lab_result':
        return 'text-success';
      case 'appointment':
        return 'text-secondary';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="flex items-start space-x-3 p-3 hover:bg-muted/50 rounded-lg medical-transition">
      <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${getActivityColor(activity?.type)}`}>
        <Icon name={getActivityIcon(activity?.type)} size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-card-foreground mb-1">
              {activity?.title}
            </p>
            <p className="text-sm text-muted-foreground">
              {activity?.description}
            </p>
            {activity?.patientName && (
              <p className="text-xs text-muted-foreground mt-1">
                Patient: {activity?.patientName}
              </p>
            )}
          </div>
          
          <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
            {formatTimeAgo(activity?.timestamp)}
          </span>
        </div>
        
        {activity?.metadata && (
          <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
            {activity?.metadata?.prescriptionCount && (
              <span>{activity?.metadata?.prescriptionCount} medications</span>
            )}
            {activity?.metadata?.duration && (
              <span>{activity?.metadata?.duration} min session</span>
            )}
            {activity?.metadata?.labTests && (
              <span>{activity?.metadata?.labTests} tests</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivityCard;