import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PrescriptionList = ({ prescriptions = [], onUpdatePrescription, onRemovePrescription }) => {
  const [editingId, setEditingId] = useState(null);

  const frequencyOptions = [
    { value: 'once_daily', label: 'Once Daily (OD)' },
    { value: 'twice_daily', label: 'Twice Daily (BD)' },
    { value: 'thrice_daily', label: 'Thrice Daily (TDS)' },
    { value: 'four_times', label: 'Four Times Daily (QID)' },
    { value: 'as_needed', label: 'As Needed (PRN)' },
    { value: 'before_meals', label: 'Before Meals (AC)' },
    { value: 'after_meals', label: 'After Meals (PC)' },
    { value: 'at_bedtime', label: 'At Bedtime (HS)' }
  ];

  const durationOptions = [
    { value: '3_days', label: '3 Days' },
    { value: '5_days', label: '5 Days' },
    { value: '7_days', label: '1 Week' },
    { value: '14_days', label: '2 Weeks' },
    { value: '30_days', label: '1 Month' },
    { value: '90_days', label: '3 Months' },
    { value: 'continuous', label: 'Continuous' }
  ];

  const handleEdit = (prescriptionId) => {
    setEditingId(prescriptionId);
  };

  const handleSave = (prescriptionId) => {
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleFieldUpdate = (prescriptionId, field, value) => {
    onUpdatePrescription(prescriptionId, { [field]: value });
  };

  const formatFrequency = (frequency) => {
    const option = frequencyOptions?.find(opt => opt?.value === frequency);
    return option ? option?.label : frequency;
  };

  const formatDuration = (duration) => {
    const option = durationOptions?.find(opt => opt?.value === duration);
    return option ? option?.label : duration;
  };

  if (prescriptions?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg medical-shadow p-8 text-center">
        <Icon name="Pill" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-card-foreground mb-2">No Medications Added</h3>
        <p className="text-muted-foreground">
          Search and add medications to create a prescription
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg medical-shadow">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-card-foreground">
            Prescription ({prescriptions?.length} medications)
          </h3>
          <Button variant="outline" size="sm" iconName="Download">
            Export PDF
          </Button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {prescriptions?.map((prescription, index) => (
          <div key={prescription?.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                    {index + 1}
                  </span>
                  <h4 className="font-medium text-card-foreground">
                    {prescription?.brandName}
                  </h4>
                  <span className="text-sm text-muted-foreground">
                    ({prescription?.genericName})
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>{prescription?.strength}</span>
                  <span>•</span>
                  <span>{prescription?.form}</span>
                  <span>•</span>
                  <span>{prescription?.category}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {editingId === prescription?.id ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSave(prescription?.id)}
                      iconName="Check"
                    >
                      Save
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCancel}
                      iconName="X"
                    />
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(prescription?.id)}
                      iconName="Edit"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemovePrescription(prescription?.id)}
                      iconName="Trash2"
                      className="text-error hover:text-error"
                    />
                  </>
                )}
              </div>
            </div>

            {/* Prescription Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {/* Dosage */}
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 block">
                  Dosage
                </label>
                {editingId === prescription?.id ? (
                  <Input
                    type="text"
                    value={prescription?.dosage || ''}
                    onChange={(e) => handleFieldUpdate(prescription?.id, 'dosage', e?.target?.value)}
                    placeholder="e.g., 1 tablet"
                    className="text-sm"
                  />
                ) : (
                  <p className="text-sm text-card-foreground font-medium">
                    {prescription?.dosage || 'Not specified'}
                  </p>
                )}
              </div>

              {/* Frequency */}
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 block">
                  Frequency
                </label>
                {editingId === prescription?.id ? (
                  <Select
                    options={frequencyOptions}
                    value={prescription?.frequency || ''}
                    onChange={(value) => handleFieldUpdate(prescription?.id, 'frequency', value)}
                    placeholder="Select frequency"
                  />
                ) : (
                  <p className="text-sm text-card-foreground font-medium">
                    {formatFrequency(prescription?.frequency) || 'Not specified'}
                  </p>
                )}
              </div>

              {/* Duration */}
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 block">
                  Duration
                </label>
                {editingId === prescription?.id ? (
                  <Select
                    options={durationOptions}
                    value={prescription?.duration || ''}
                    onChange={(value) => handleFieldUpdate(prescription?.id, 'duration', value)}
                    placeholder="Select duration"
                  />
                ) : (
                  <p className="text-sm text-card-foreground font-medium">
                    {formatDuration(prescription?.duration) || 'Not specified'}
                  </p>
                )}
              </div>

              {/* Route */}
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 block">
                  Route
                </label>
                {editingId === prescription?.id ? (
                  <Input
                    type="text"
                    value={prescription?.route || 'Oral'}
                    onChange={(e) => handleFieldUpdate(prescription?.id, 'route', e?.target?.value)}
                    placeholder="e.g., Oral"
                    className="text-sm"
                  />
                ) : (
                  <p className="text-sm text-card-foreground font-medium">
                    {prescription?.route || 'Oral'}
                  </p>
                )}
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 block">
                Special Instructions
              </label>
              {editingId === prescription?.id ? (
                <textarea
                  value={prescription?.instructions || ''}
                  onChange={(e) => handleFieldUpdate(prescription?.id, 'instructions', e?.target?.value)}
                  placeholder="Add special instructions..."
                  className="w-full text-sm border border-border rounded px-3 py-2 bg-input resize-none"
                  rows={2}
                />
              ) : (
                <p className="text-sm text-card-foreground">
                  {prescription?.instructions || 'No special instructions'}
                </p>
              )}
            </div>

            {/* Dosage Calculator Helper */}
            {prescription?.dosageInfo && (
              <div className="mt-3 p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Calculator" size={14} className="text-primary" />
                  <span className="text-xs font-medium text-primary">Dosage Guidelines</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Adult:</span>
                    <span className="ml-1 text-card-foreground">{prescription?.dosageInfo?.adult}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Pediatric:</span>
                    <span className="ml-1 text-card-foreground">{prescription?.dosageInfo?.pediatric}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Max:</span>
                    <span className="ml-1 text-card-foreground">{prescription?.dosageInfo?.maximum}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrescriptionList;