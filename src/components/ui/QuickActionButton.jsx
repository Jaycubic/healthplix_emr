import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Button from './Button';

const QuickActionButton = ({ onAction }) => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  const getContextualActions = () => {
    const currentPath = location?.pathname;
    
    switch (currentPath) {
      case '/patient-management':
        return [
          { 
            id: 'new-patient', 
            label: 'New Patient', 
            icon: 'UserPlus',
            color: 'primary'
          },
          { 
            id: 'import-patients', 
            label: 'Import Data', 
            icon: 'Upload',
            color: 'secondary'
          }
        ];
      
      case '/patient-records':
        return [
          { 
            id: 'new-record', 
            label: 'New Record', 
            icon: 'FileText',
            color: 'primary'
          },
          { 
            id: 'quick-prescription', 
            label: 'Quick Prescription', 
            icon: 'Pill',
            color: 'accent'
          }
        ];
      
      case '/prescription-editor':
        return [
          { 
            id: 'new-prescription', 
            label: 'New Prescription', 
            icon: 'Plus',
            color: 'primary'
          },
          { 
            id: 'drug-interaction', 
            label: 'Check Interactions', 
            icon: 'AlertTriangle',
            color: 'warning'
          }
        ];
      
      default:
        return [
          { 
            id: 'new-patient', 
            label: 'New Patient', 
            icon: 'UserPlus',
            color: 'primary'
          },
          { 
            id: 'quick-prescription', 
            label: 'Quick Prescription', 
            icon: 'Pill',
            color: 'accent'
          },
          { 
            id: 'emergency', 
            label: 'Emergency', 
            icon: 'Phone',
            color: 'error'
          }
        ];
    }
  };

  const actions = getContextualActions();

  const handleActionClick = (actionId) => {
    setIsExpanded(false);
    if (onAction) {
      onAction(actionId);
    }
    
    // Default action handlers
    switch (actionId) {
      case 'new-patient': console.log('Opening new patient form...');
        break;
      case 'quick-prescription': console.log('Opening quick prescription modal...');
        break;
      case 'new-record': console.log('Creating new patient record...');
        break;
      case 'drug-interaction': console.log('Opening drug interaction checker...');
        break;
      case 'emergency': console.log('Initiating emergency protocol...');
        break;
      default:
        console.log(`Action ${actionId} triggered`);
    }
  };

  const getButtonVariant = (color) => {
    switch (color) {
      case 'primary': return 'default';
      case 'secondary': return 'secondary';
      case 'accent': return 'outline';
      case 'warning': return 'outline';
      case 'error': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <>
      {/* Desktop Position */}
      <div className="fixed bottom-6 right-6 z-75 hidden lg:block">
        <div className="flex flex-col items-end space-y-3">
          {/* Action Menu */}
          {isExpanded && (
            <div className="flex flex-col space-y-2 animate-slide-in-from-bottom">
              {actions?.map((action) => (
                <Button
                  key={action?.id}
                  variant={getButtonVariant(action?.color)}
                  size="sm"
                  onClick={() => handleActionClick(action?.id)}
                  iconName={action?.icon}
                  iconPosition="left"
                  className="medical-shadow-md whitespace-nowrap"
                >
                  {action?.label}
                </Button>
              ))}
            </div>
          )}
          
          {/* Main Action Button */}
          <Button
            variant="default"
            size="lg"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? 'X' : 'Plus'}
            className="w-14 h-14 rounded-full medical-shadow-lg hover:scale-105 medical-transition"
          />
        </div>
      </div>
      {/* Mobile Position */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-75 lg:hidden">
        <div className="flex flex-col items-center space-y-3">
          {/* Action Menu */}
          {isExpanded && (
            <div className="flex flex-row space-x-2 animate-slide-in-from-bottom">
              {actions?.slice(0, 3)?.map((action) => (
                <Button
                  key={action?.id}
                  variant={getButtonVariant(action?.color)}
                  size="sm"
                  onClick={() => handleActionClick(action?.id)}
                  iconName={action?.icon}
                  className="medical-shadow-md"
                />
              ))}
            </div>
          )}
          
          {/* Main Action Button */}
          <Button
            variant="default"
            size="lg"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? 'X' : 'Plus'}
            className="w-12 h-12 rounded-full medical-shadow-lg"
          />
        </div>
      </div>
      {/* Backdrop */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-70 bg-black bg-opacity-25"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
};

export default QuickActionButton;