import React from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const PatientContextHeader = ({ 
  patient, 
  onClose, 
  showActions = true,
  className = "" 
}) => {
  if (!patient) return null;

  const getAgeFromDOB = (dob) => {
    if (!dob) return 'N/A';
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today?.getFullYear() - birthDate?.getFullYear();
    const monthDiff = today?.getMonth() - birthDate?.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today?.getDate() < birthDate?.getDate())) {
      age--;
    }
    
    return age;
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical': case'severe':
        return 'text-error bg-error/10 border-error';
      case 'moderate':
        return 'text-warning bg-warning/10 border-warning';
      case 'mild': case'low':
        return 'text-success bg-success/10 border-success';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const formatAllergies = (allergies) => {
    if (!allergies || allergies?.length === 0) return 'None known';
    return allergies?.slice(0, 3)?.map(allergy => allergy?.name || allergy)?.join(', ') + 
           (allergies?.length > 3 ? ` +${allergies?.length - 3} more` : '');
  };

  return (
    <div className={`bg-card border border-border rounded-lg medical-shadow p-4 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          {/* Patient Avatar */}
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="User" size={24} color="white" />
          </div>
          
          {/* Patient Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-lg font-semibold text-card-foreground truncate">
                {patient?.name || 'Unknown Patient'}
              </h2>
              
              {patient?.gender && (
                <span className="text-sm text-muted-foreground px-2 py-1 bg-muted rounded">
                  {patient?.gender}
                </span>
              )}
              
              <span className="text-sm text-muted-foreground px-2 py-1 bg-muted rounded">
                Age {getAgeFromDOB(patient?.dateOfBirth)}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {/* Patient ID */}
              <div>
                <span className="text-muted-foreground">ID:</span>
                <span className="ml-2 font-mono text-card-foreground">
                  {patient?.id || patient?.patientId || 'N/A'}
                </span>
              </div>
              
              {/* Contact */}
              <div>
                <span className="text-muted-foreground">Contact:</span>
                <span className="ml-2 text-card-foreground">
                  {patient?.phone || patient?.email || 'N/A'}
                </span>
              </div>
              
              {/* Last Visit */}
              <div>
                <span className="text-muted-foreground">Last Visit:</span>
                <span className="ml-2 text-card-foreground">
                  {patient?.lastVisit ? new Date(patient.lastVisit)?.toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        {showActions && (
          <div className="flex items-center space-x-2 flex-shrink-0">
            <Button variant="outline" size="sm" iconName="FileText">
              Records
            </Button>
            <Button variant="outline" size="sm" iconName="Pill">
              Prescribe
            </Button>
            {onClose && (
              <Button variant="ghost" size="icon" onClick={onClose}>
                <Icon name="X" size={16} />
              </Button>
            )}
          </div>
        )}
      </div>
      {/* Critical Information */}
      {(patient?.allergies || patient?.conditions || patient?.medications) && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            {/* Allergies */}
            {patient?.allergies && (
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="AlertTriangle" size={14} className="text-error" />
                  <span className="font-medium text-card-foreground">Allergies</span>
                </div>
                <p className="text-muted-foreground">
                  {formatAllergies(patient?.allergies)}
                </p>
              </div>
            )}
            
            {/* Chronic Conditions */}
            {patient?.conditions && (
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Heart" size={14} className="text-warning" />
                  <span className="font-medium text-card-foreground">Conditions</span>
                </div>
                <p className="text-muted-foreground">
                  {Array.isArray(patient?.conditions) 
                    ? patient?.conditions?.slice(0, 2)?.join(', ') + 
                      (patient?.conditions?.length > 2 ? ` +${patient?.conditions?.length - 2}` : '')
                    : patient?.conditions
                  }
                </p>
              </div>
            )}
            
            {/* Current Medications */}
            {patient?.medications && (
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Pill" size={14} className="text-primary" />
                  <span className="font-medium text-card-foreground">Medications</span>
                </div>
                <p className="text-muted-foreground">
                  {Array.isArray(patient?.medications)
                    ? `${patient?.medications?.length} active medications`
                    : patient?.medications
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Risk Indicators */}
      {patient?.riskLevel && (
        <div className="mt-3 flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Risk Level:</span>
          <span className={`text-xs px-2 py-1 rounded-full border ${getSeverityColor(patient?.riskLevel)}`}>
            {patient?.riskLevel?.toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
};

export default PatientContextHeader;