import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PatientInfoCard = ({ patient, onChangePatient }) => {
  if (!patient) {
    return (
      <div className="bg-card border border-border rounded-lg medical-shadow p-6 text-center">
        <Icon name="UserPlus" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-card-foreground mb-2">No Patient Selected</h3>
        <p className="text-muted-foreground mb-4">
          Please select a patient to create a prescription
        </p>
        <Button variant="default" iconName="Search">
          Select Patient
        </Button>
      </div>
    );
  }

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

  const formatAllergies = (allergies) => {
    if (!allergies || allergies?.length === 0) return 'None known';
    return allergies?.map(allergy => allergy?.name || allergy)?.join(', ');
  };

  const formatConditions = (conditions) => {
    if (!conditions || conditions?.length === 0) return 'None recorded';
    return conditions?.slice(0, 3)?.join(', ') + (conditions?.length > 3 ? ` +${conditions?.length - 3} more` : '');
  };

  return (
    <div className="bg-card border border-border rounded-lg medical-shadow">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-card-foreground">Patient Information</h3>
          <Button variant="outline" size="sm" onClick={onChangePatient} iconName="RefreshCw">
            Change Patient
          </Button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start space-x-4 mb-4">
          {/* Patient Avatar */}
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="User" size={32} color="white" />
          </div>
          
          {/* Patient Details */}
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-xl font-semibold text-card-foreground">
                {patient?.name}
              </h2>
              <span className="text-sm text-muted-foreground px-2 py-1 bg-muted rounded">
                {patient?.gender}
              </span>
              <span className="text-sm text-muted-foreground px-2 py-1 bg-muted rounded">
                Age {getAgeFromDOB(patient?.dateOfBirth)}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Patient ID:</span>
                <span className="ml-2 font-mono text-card-foreground">{patient?.id}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Phone:</span>
                <span className="ml-2 text-card-foreground">{patient?.phone}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Email:</span>
                <span className="ml-2 text-card-foreground">{patient?.email}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Last Visit:</span>
                <span className="ml-2 text-card-foreground">
                  {patient?.lastVisit ? new Date(patient.lastVisit)?.toLocaleDateString() : 'First visit'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Critical Information */}
        <div className="space-y-4">
          {/* Allergies */}
          <div className="p-3 bg-error/5 border border-error/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="AlertTriangle" size={16} className="text-error" />
              <span className="font-medium text-error">Allergies</span>
            </div>
            <p className="text-sm text-card-foreground">
              {formatAllergies(patient?.allergies)}
            </p>
          </div>

          {/* Current Conditions */}
          <div className="p-3 bg-warning/5 border border-warning/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Heart" size={16} className="text-warning" />
              <span className="font-medium text-warning">Current Conditions</span>
            </div>
            <p className="text-sm text-card-foreground">
              {formatConditions(patient?.conditions)}
            </p>
          </div>

          {/* Current Medications */}
          {patient?.currentMedications && patient?.currentMedications?.length > 0 && (
            <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Pill" size={16} className="text-primary" />
                <span className="font-medium text-primary">Current Medications</span>
              </div>
              <div className="space-y-1">
                {patient?.currentMedications?.slice(0, 3)?.map((med, index) => (
                  <p key={index} className="text-sm text-card-foreground">
                    • {med?.name} - {med?.dosage}
                  </p>
                ))}
                {patient?.currentMedications?.length > 3 && (
                  <p className="text-sm text-muted-foreground">
                    +{patient?.currentMedications?.length - 3} more medications
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Vital Signs */}
          {patient?.vitals && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {patient?.vitals?.bloodPressure && (
                <div className="text-center p-2 bg-muted rounded">
                  <p className="text-xs text-muted-foreground">Blood Pressure</p>
                  <p className="text-sm font-medium text-card-foreground">
                    {patient?.vitals?.bloodPressure}
                  </p>
                </div>
              )}
              {patient?.vitals?.heartRate && (
                <div className="text-center p-2 bg-muted rounded">
                  <p className="text-xs text-muted-foreground">Heart Rate</p>
                  <p className="text-sm font-medium text-card-foreground">
                    {patient?.vitals?.heartRate} bpm
                  </p>
                </div>
              )}
              {patient?.vitals?.weight && (
                <div className="text-center p-2 bg-muted rounded">
                  <p className="text-xs text-muted-foreground">Weight</p>
                  <p className="text-sm font-medium text-card-foreground">
                    {patient?.vitals?.weight} kg
                  </p>
                </div>
              )}
              {patient?.vitals?.temperature && (
                <div className="text-center p-2 bg-muted rounded">
                  <p className="text-xs text-muted-foreground">Temperature</p>
                  <p className="text-sm font-medium text-card-foreground">
                    {patient?.vitals?.temperature}°F
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
          <Button variant="outline" size="sm" iconName="FileText">
            View Records
          </Button>
          <Button variant="outline" size="sm" iconName="History">
            Prescription History
          </Button>
          <Button variant="outline" size="sm" iconName="Calendar">
            Schedule Follow-up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PatientInfoCard;