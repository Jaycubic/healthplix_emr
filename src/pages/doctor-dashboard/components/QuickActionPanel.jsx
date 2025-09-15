import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActionPanel = ({ onAction }) => {
  const quickActions = [
    {
      id: 'new-prescription',
      label: 'New Prescription',
      icon: 'Pill',
      variant: 'default',
      description: 'Create prescription for patient'
    },
    {
      id: 'schedule-appointment',
      label: 'Schedule Appointment',
      icon: 'Calendar',
      variant: 'outline',
      description: 'Book new patient appointment'
    },
    {
      id: 'start-teleconsultation',
      label: 'Start Teleconsultation',
      icon: 'Video',
      variant: 'secondary',
      description: 'Begin video consultation'
    },
    {
      id: 'patient-search',
      label: 'Find Patient',
      icon: 'Search',
      variant: 'outline',
      description: 'Search patient records'
    }
  ];

  const handleActionClick = (actionId) => {
    if (onAction) {
      onAction(actionId);
    }
    
    // Default action handlers
    switch (actionId) {
      case 'new-prescription': console.log('Opening prescription editor...');
        break;
      case 'schedule-appointment': console.log('Opening appointment scheduler...');
        break;
      case 'start-teleconsultation': console.log('Starting teleconsultation...');
        break;
      case 'patient-search': console.log('Opening patient search...');
        break;
      default:
        console.log(`Action ${actionId} triggered`);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 medical-shadow">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions?.map((action) => (
          <Button
            key={action?.id}
            variant={action?.variant}
            onClick={() => handleActionClick(action?.id)}
            iconName={action?.icon}
            iconPosition="left"
            className="h-auto p-4 flex-col items-start text-left"
          >
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-medium">{action?.label}</span>
            </div>
            <span className="text-xs opacity-75">{action?.description}</span>
          </Button>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Use keyboard shortcuts: Alt+P (Prescription), Alt+A (Appointment), Alt+V (Video)
        </p>
      </div>
    </div>
  );
};

export default QuickActionPanel;