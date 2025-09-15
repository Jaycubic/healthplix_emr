import React from 'react';
import Icon from '../../../components/AppIcon';

const RegistrationProgress = ({ currentStep, totalSteps, steps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="bg-card border border-border rounded-lg p-6 medical-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">Registration Progress</h3>
        <span className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-2 mb-6">
        <div 
          className="bg-primary h-2 rounded-full medical-transition"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      {/* Step Indicators */}
      <div className="space-y-4">
        {steps?.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isPending = stepNumber > currentStep;
          
          return (
            <div key={step?.id} className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isCompleted 
                  ? 'bg-success text-success-foreground' 
                  : isCurrent 
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
              }`}>
                {isCompleted ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <span className="text-sm font-medium">{stepNumber}</span>
                )}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${
                  isCurrent ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted-foreground'
                }`}>
                  {step?.title}
                </p>
                <p className="text-xs text-muted-foreground">{step?.description}</p>
              </div>
              {step?.status && (
                <div className={`px-2 py-1 rounded text-xs ${
                  step?.status === 'verified' 
                    ? 'bg-success/10 text-success border border-success/20'
                    : step?.status === 'pending' ?'bg-warning/10 text-warning border border-warning/20' :'bg-muted text-muted-foreground'
                }`}>
                  {step?.status}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RegistrationProgress;