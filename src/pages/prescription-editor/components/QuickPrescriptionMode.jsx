import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const QuickPrescriptionMode = ({ isActive, onToggle, onQuickPrescription }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [customDrug, setCustomDrug] = useState('');
  const [quickDosage, setQuickDosage] = useState('');
  const [quickFrequency, setQuickFrequency] = useState('');
  const [quickDuration, setQuickDuration] = useState('');
  const [timer, setTimer] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const quickTemplates = [
    {
      value: 'pain_relief',
      label: 'Pain Relief',
      drug: 'Paracetamol 500mg',
      dosage: '1 tablet',
      frequency: 'twice_daily',
      duration: '3_days',
      instructions: 'Take after meals'
    },
    {
      value: 'fever',
      label: 'Fever',
      drug: 'Paracetamol 500mg',
      dosage: '1 tablet',
      frequency: 'thrice_daily',
      duration: '5_days',
      instructions: 'Take when fever is above 100°F'
    },
    {
      value: 'cough_cold',
      label: 'Cough & Cold',
      drug: 'Cetirizine 10mg',
      dosage: '1 tablet',
      frequency: 'once_daily',
      duration: '7_days',
      instructions: 'Take at bedtime'
    },
    {
      value: 'acidity',
      label: 'Acidity',
      drug: 'Pantoprazole 40mg',
      dosage: '1 tablet',
      frequency: 'once_daily',
      duration: '14_days',
      instructions: 'Take 30 minutes before breakfast'
    },
    {
      value: 'antibiotic',
      label: 'Antibiotic Course',
      drug: 'Amoxicillin 500mg',
      dosage: '1 capsule',
      frequency: 'thrice_daily',
      duration: '7_days',
      instructions: 'Complete the full course'
    }
  ];

  const frequencyOptions = [
    { value: 'once_daily', label: 'Once Daily (OD)' },
    { value: 'twice_daily', label: 'Twice Daily (BD)' },
    { value: 'thrice_daily', label: 'Thrice Daily (TDS)' },
    { value: 'four_times', label: 'Four Times Daily (QID)' }
  ];

  const durationOptions = [
    { value: '3_days', label: '3 Days' },
    { value: '5_days', label: '5 Days' },
    { value: '7_days', label: '1 Week' },
    { value: '14_days', label: '2 Weeks' },
    { value: '30_days', label: '1 Month' }
  ];

  useEffect(() => {
    let interval = null;
    if (isActive && isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer => timer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, isTimerActive, timer]);

  const startTimer = () => {
    setTimer(30);
    setIsTimerActive(true);
  };

  const handleTemplateSelect = (templateValue) => {
    const template = quickTemplates?.find(t => t?.value === templateValue);
    if (template) {
      setSelectedTemplate(templateValue);
      setCustomDrug(template?.drug);
      setQuickDosage(template?.dosage);
      setQuickFrequency(template?.frequency);
      setQuickDuration(template?.duration);
    }
  };

  const handleQuickCreate = () => {
    const template = quickTemplates?.find(t => t?.value === selectedTemplate);
    const prescription = {
      id: `quick_${Date.now()}`,
      brandName: customDrug?.split(' ')?.[0],
      genericName: customDrug?.split(' ')?.[0],
      strength: customDrug?.includes('mg') ? customDrug?.match(/\d+mg/)?.[0] : '500mg',
      form: 'Tablet',
      dosage: quickDosage,
      frequency: quickFrequency,
      duration: quickDuration,
      instructions: template?.instructions || 'As directed',
      isQuickPrescription: true,
      createdAt: new Date()
    };

    if (onQuickPrescription) {
      onQuickPrescription(prescription);
    }

    // Reset form
    setSelectedTemplate('');
    setCustomDrug('');
    setQuickDosage('');
    setQuickFrequency('');
    setQuickDuration('');
    setIsTimerActive(false);
    setTimer(30);
  };

  const isFormValid = customDrug && quickDosage && quickFrequency && quickDuration;

  if (!isActive) {
    return (
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
              <Icon name="Zap" size={20} color="white" />
            </div>
            <div>
              <h3 className="font-medium text-card-foreground">Quick Prescription Mode</h3>
              <p className="text-sm text-muted-foreground">Create prescriptions in under 30 seconds</p>
            </div>
          </div>
          <Button variant="default" onClick={onToggle} iconName="Zap">
            Enable Quick Mode
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-accent/10 border-2 border-accent rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
            <Icon name="Zap" size={20} color="white" />
          </div>
          <div>
            <h3 className="font-medium text-card-foreground">Quick Prescription Mode</h3>
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground">30-second prescription creation</p>
              {isTimerActive && (
                <span className="text-sm font-mono bg-accent text-white px-2 py-1 rounded">
                  {timer}s
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {!isTimerActive && (
            <Button variant="outline" size="sm" onClick={startTimer} iconName="Timer">
              Start Timer
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={onToggle} iconName="X">
            Exit
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Quick Templates */}
        <div>
          <h4 className="text-sm font-medium text-card-foreground mb-3">Quick Templates</h4>
          <div className="grid grid-cols-1 gap-2">
            {quickTemplates?.map((template) => (
              <button
                key={template?.value}
                onClick={() => handleTemplateSelect(template?.value)}
                className={`p-3 text-left border rounded-lg medical-transition ${
                  selectedTemplate === template?.value
                    ? 'border-accent bg-accent/10 text-accent' :'border-border hover:border-accent/50 hover:bg-accent/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{template?.label}</span>
                  {selectedTemplate === template?.value && (
                    <Icon name="Check" size={16} className="text-accent" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {template?.drug} - {template?.dosage} {template?.frequency?.replace('_', ' ')}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Form */}
        <div>
          <h4 className="text-sm font-medium text-card-foreground mb-3">Prescription Details</h4>
          <div className="space-y-3">
            <Input
              label="Drug Name"
              type="text"
              value={customDrug}
              onChange={(e) => setCustomDrug(e?.target?.value)}
              placeholder="e.g., Paracetamol 500mg"
              required
            />

            <Input
              label="Dosage"
              type="text"
              value={quickDosage}
              onChange={(e) => setQuickDosage(e?.target?.value)}
              placeholder="e.g., 1 tablet"
              required
            />

            <Select
              label="Frequency"
              options={frequencyOptions}
              value={quickFrequency}
              onChange={setQuickFrequency}
              placeholder="Select frequency"
              required
            />

            <Select
              label="Duration"
              options={durationOptions}
              value={quickDuration}
              onChange={setQuickDuration}
              placeholder="Select duration"
              required
            />

            <Button
              variant="default"
              onClick={handleQuickCreate}
              disabled={!isFormValid}
              iconName="Plus"
              fullWidth
              className="mt-4"
            >
              Add to Prescription
            </Button>
          </div>
        </div>
      </div>
      {/* Progress Indicator */}
      {isTimerActive && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-muted-foreground">Time remaining</span>
            <span className="font-mono text-accent">{timer} seconds</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-accent h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(timer / 30) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickPrescriptionMode;