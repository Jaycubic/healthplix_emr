import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PersonalInfoForm = ({ formData, onFormChange, errors }) => {
  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  const titleOptions = [
    { value: 'dr', label: 'Dr.' },
    { value: 'prof', label: 'Prof.' },
    { value: 'mr', label: 'Mr.' },
    { value: 'ms', label: 'Ms.' }
  ];

  const handleInputChange = (field, value) => {
    onFormChange('personalInfo', { ...formData, [field]: value });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 medical-shadow">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <span className="text-primary font-semibold">1</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Personal Information</h3>
          <p className="text-sm text-muted-foreground">Basic details and contact information</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Title"
          options={titleOptions}
          value={formData?.title}
          onChange={(value) => handleInputChange('title', value)}
          error={errors?.title}
          required
        />

        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formData?.fullName}
          onChange={(e) => handleInputChange('fullName', e?.target?.value)}
          error={errors?.fullName}
          required
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="doctor@example.com"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          description="This will be your login email"
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="+91 98765 43210"
          value={formData?.phone}
          onChange={(e) => handleInputChange('phone', e?.target?.value)}
          error={errors?.phone}
          required
        />

        <Input
          label="Date of Birth"
          type="date"
          value={formData?.dateOfBirth}
          onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
          error={errors?.dateOfBirth}
          required
        />

        <Select
          label="Gender"
          options={genderOptions}
          value={formData?.gender}
          onChange={(value) => handleInputChange('gender', value)}
          error={errors?.gender}
          required
        />

        <div className="md:col-span-2">
          <Input
            label="Address Line 1"
            type="text"
            placeholder="Street address, building name"
            value={formData?.addressLine1}
            onChange={(e) => handleInputChange('addressLine1', e?.target?.value)}
            error={errors?.addressLine1}
            required
          />
        </div>

        <Input
          label="Address Line 2"
          type="text"
          placeholder="Area, landmark (optional)"
          value={formData?.addressLine2}
          onChange={(e) => handleInputChange('addressLine2', e?.target?.value)}
        />

        <Input
          label="City"
          type="text"
          placeholder="Enter city"
          value={formData?.city}
          onChange={(e) => handleInputChange('city', e?.target?.value)}
          error={errors?.city}
          required
        />

        <Input
          label="State"
          type="text"
          placeholder="Enter state"
          value={formData?.state}
          onChange={(e) => handleInputChange('state', e?.target?.value)}
          error={errors?.state}
          required
        />

        <Input
          label="PIN Code"
          type="text"
          placeholder="123456"
          value={formData?.pinCode}
          onChange={(e) => handleInputChange('pinCode', e?.target?.value)}
          error={errors?.pinCode}
          pattern="[0-9]{6}"
          required
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;