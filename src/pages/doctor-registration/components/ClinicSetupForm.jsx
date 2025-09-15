import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';


const ClinicSetupForm = ({ formData, onFormChange, errors }) => {
  const [showMultipleLocations, setShowMultipleLocations] = useState(false);

  const clinicTypeOptions = [
    { value: 'private-practice', label: 'Private Practice' },
    { value: 'hospital', label: 'Hospital' },
    { value: 'clinic-chain', label: 'Clinic Chain' },
    { value: 'nursing-home', label: 'Nursing Home' },
    { value: 'diagnostic-center', label: 'Diagnostic Center' }
  ];

  const consultationModeOptions = [
    { value: 'in-person', label: 'In-Person Only' },
    { value: 'teleconsultation', label: 'Teleconsultation Only' },
    { value: 'both', label: 'Both In-Person & Teleconsultation' }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'
  ];

  const daysOfWeek = [
    { id: 'monday', label: 'Monday' },
    { id: 'tuesday', label: 'Tuesday' },
    { id: 'wednesday', label: 'Wednesday' },
    { id: 'thursday', label: 'Thursday' },
    { id: 'friday', label: 'Friday' },
    { id: 'saturday', label: 'Saturday' },
    { id: 'sunday', label: 'Sunday' }
  ];

  const handleInputChange = (field, value) => {
    onFormChange('clinicSetup', { ...formData, [field]: value });
  };

  const handleOperatingHoursChange = (day, field, value) => {
    const updatedHours = {
      ...formData?.operatingHours,
      [day]: {
        ...formData?.operatingHours?.[day],
        [field]: value
      }
    };
    handleInputChange('operatingHours', updatedHours);
  };

  const toggleDayAvailability = (day, isAvailable) => {
    const updatedHours = {
      ...formData?.operatingHours,
      [day]: {
        ...formData?.operatingHours?.[day],
        isAvailable,
        startTime: isAvailable ? '09:00' : '',
        endTime: isAvailable ? '17:00' : ''
      }
    };
    handleInputChange('operatingHours', updatedHours);
  };

  const addLocation = () => {
    const newLocation = {
      id: Date.now(),
      name: '',
      address: '',
      city: '',
      state: '',
      pinCode: '',
      phone: '',
      isPrimary: false
    };
    handleInputChange('additionalLocations', [...(formData?.additionalLocations || []), newLocation]);
  };

  const removeLocation = (locationId) => {
    const updatedLocations = formData?.additionalLocations?.filter(loc => loc?.id !== locationId);
    handleInputChange('additionalLocations', updatedLocations);
  };

  const updateLocation = (locationId, field, value) => {
    const updatedLocations = formData?.additionalLocations?.map(loc =>
      loc?.id === locationId ? { ...loc, [field]: value } : loc
    );
    handleInputChange('additionalLocations', updatedLocations);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 medical-shadow">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <span className="text-primary font-semibold">3</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Clinic Setup</h3>
          <p className="text-sm text-muted-foreground">Practice location and operating details</p>
        </div>
      </div>
      <div className="space-y-8">
        {/* Basic Clinic Information */}
        <div className="space-y-6">
          <h4 className="text-md font-medium text-card-foreground border-b border-border pb-2">
            Primary Clinic Information
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Clinic/Practice Name"
              type="text"
              placeholder="Enter clinic name"
              value={formData?.clinicName}
              onChange={(e) => handleInputChange('clinicName', e?.target?.value)}
              error={errors?.clinicName}
              required
            />

            <Select
              label="Clinic Type"
              options={clinicTypeOptions}
              value={formData?.clinicType}
              onChange={(value) => handleInputChange('clinicType', value)}
              error={errors?.clinicType}
              required
            />

            <div className="md:col-span-2">
              <Input
                label="Clinic Address"
                type="text"
                placeholder="Complete clinic address"
                value={formData?.clinicAddress}
                onChange={(e) => handleInputChange('clinicAddress', e?.target?.value)}
                error={errors?.clinicAddress}
                required
              />
            </div>

            <Input
              label="City"
              type="text"
              placeholder="Enter city"
              value={formData?.clinicCity}
              onChange={(e) => handleInputChange('clinicCity', e?.target?.value)}
              error={errors?.clinicCity}
              required
            />

            <Input
              label="State"
              type="text"
              placeholder="Enter state"
              value={formData?.clinicState}
              onChange={(e) => handleInputChange('clinicState', e?.target?.value)}
              error={errors?.clinicState}
              required
            />

            <Input
              label="PIN Code"
              type="text"
              placeholder="123456"
              value={formData?.clinicPinCode}
              onChange={(e) => handleInputChange('clinicPinCode', e?.target?.value)}
              error={errors?.clinicPinCode}
              pattern="[0-9]{6}"
              required
            />

            <Input
              label="Clinic Phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={formData?.clinicPhone}
              onChange={(e) => handleInputChange('clinicPhone', e?.target?.value)}
              error={errors?.clinicPhone}
              required
            />
          </div>
        </div>

        {/* Consultation Mode */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-card-foreground border-b border-border pb-2">
            Consultation Preferences
          </h4>
          
          <Select
            label="Consultation Mode"
            options={consultationModeOptions}
            value={formData?.consultationMode}
            onChange={(value) => handleInputChange('consultationMode', value)}
            error={errors?.consultationMode}
            description="Choose how you want to conduct consultations"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Consultation Fee (₹)"
              type="number"
              placeholder="500"
              value={formData?.consultationFee}
              onChange={(e) => handleInputChange('consultationFee', e?.target?.value)}
              error={errors?.consultationFee}
              min="0"
              required
            />

            <Input
              label="Follow-up Fee (₹)"
              type="number"
              placeholder="300"
              value={formData?.followupFee}
              onChange={(e) => handleInputChange('followupFee', e?.target?.value)}
              error={errors?.followupFee}
              min="0"
            />
          </div>
        </div>

        {/* Operating Hours */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-card-foreground border-b border-border pb-2">
            Operating Hours
          </h4>
          
          <div className="space-y-4">
            {daysOfWeek?.map((day) => {
              const dayData = formData?.operatingHours?.[day?.id] || { isAvailable: false, startTime: '', endTime: '' };
              
              return (
                <div key={day?.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg">
                  <div className="w-24">
                    <Checkbox
                      label={day?.label}
                      checked={dayData?.isAvailable}
                      onChange={(e) => toggleDayAvailability(day?.id, e?.target?.checked)}
                    />
                  </div>
                  {dayData?.isAvailable && (
                    <div className="flex items-center space-x-4 flex-1">
                      <Select
                        label="Start Time"
                        options={timeSlots?.map(time => ({ value: time, label: time }))}
                        value={dayData?.startTime}
                        onChange={(value) => handleOperatingHoursChange(day?.id, 'startTime', value)}
                        className="flex-1"
                      />
                      
                      <span className="text-muted-foreground">to</span>
                      
                      <Select
                        label="End Time"
                        options={timeSlots?.map(time => ({ value: time, label: time }))}
                        value={dayData?.endTime}
                        onChange={(value) => handleOperatingHoursChange(day?.id, 'endTime', value)}
                        className="flex-1"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Multiple Locations */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-md font-medium text-card-foreground">Additional Locations</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMultipleLocations(!showMultipleLocations)}
              iconName={showMultipleLocations ? 'ChevronUp' : 'ChevronDown'}
            >
              {showMultipleLocations ? 'Hide' : 'Add Multiple Locations'}
            </Button>
          </div>

          {showMultipleLocations && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Add additional clinic locations for multi-city practice
              </p>
              
              {formData?.additionalLocations?.map((location) => (
                <div key={location?.id} className="border border-border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium text-card-foreground">Location {location?.id}</h5>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLocation(location?.id)}
                      iconName="X"
                    >
                      Remove
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Location Name"
                      type="text"
                      placeholder="Branch name"
                      value={location?.name}
                      onChange={(e) => updateLocation(location?.id, 'name', e?.target?.value)}
                    />
                    
                    <Input
                      label="Phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={location?.phone}
                      onChange={(e) => updateLocation(location?.id, 'phone', e?.target?.value)}
                    />
                    
                    <div className="md:col-span-2">
                      <Input
                        label="Address"
                        type="text"
                        placeholder="Complete address"
                        value={location?.address}
                        onChange={(e) => updateLocation(location?.id, 'address', e?.target?.value)}
                      />
                    </div>
                    
                    <Input
                      label="City"
                      type="text"
                      placeholder="City"
                      value={location?.city}
                      onChange={(e) => updateLocation(location?.id, 'city', e?.target?.value)}
                    />
                    
                    <Input
                      label="PIN Code"
                      type="text"
                      placeholder="123456"
                      value={location?.pinCode}
                      onChange={(e) => updateLocation(location?.id, 'pinCode', e?.target?.value)}
                    />
                  </div>
                </div>
              ))}
              
              <Button
                variant="outline"
                onClick={addLocation}
                iconName="Plus"
                iconPosition="left"
              >
                Add Another Location
              </Button>
            </div>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="bg-muted/50 border border-border rounded-lg p-4">
          <div className="space-y-3">
            <Checkbox
              label="I agree to the Terms and Conditions"
              checked={formData?.agreeToTerms}
              onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
              error={errors?.agreeToTerms}
              required
            />
            
            <Checkbox
              label="I agree to the Privacy Policy"
              checked={formData?.agreeToPrivacy}
              onChange={(e) => handleInputChange('agreeToPrivacy', e?.target?.checked)}
              error={errors?.agreeToPrivacy}
              required
            />
            
            <Checkbox
              label="I consent to receive updates via email and SMS"
              checked={formData?.agreeToUpdates}
              onChange={(e) => handleInputChange('agreeToUpdates', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicSetupForm;