import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProfessionalCredentialsForm = ({ formData, onFormChange, errors }) => {
  const [uploadPreviews, setUploadPreviews] = useState({});

  const specialtyOptions = [
    { value: 'general-practice', label: 'General Practice' },
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'endocrinology', label: 'Endocrinology' },
    { value: 'dermatology', label: 'Dermatology' },
    { value: 'orthopedics', label: 'Orthopedics' },
    { value: 'pediatrics', label: 'Pediatrics' },
    { value: 'gynecology', label: 'Gynecology' },
    { value: 'neurology', label: 'Neurology' },
    { value: 'psychiatry', label: 'Psychiatry' },
    { value: 'ophthalmology', label: 'Ophthalmology' },
    { value: 'ent', label: 'ENT (Ear, Nose, Throat)' },
    { value: 'radiology', label: 'Radiology' },
    { value: 'anesthesiology', label: 'Anesthesiology' },
    { value: 'emergency-medicine', label: 'Emergency Medicine' },
    { value: 'internal-medicine', label: 'Internal Medicine' }
  ];

  const experienceOptions = [
    { value: '0-2', label: '0-2 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '6-10', label: '6-10 years' },
    { value: '11-15', label: '11-15 years' },
    { value: '16-20', label: '16-20 years' },
    { value: '20+', label: '20+ years' }
  ];

  const handleInputChange = (field, value) => {
    onFormChange('professionalCredentials', { ...formData, [field]: value });
  };

  const handleFileUpload = (field, event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      handleInputChange(field, file);
      
      // Create preview for images
      if (file?.type?.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadPreviews(prev => ({
            ...prev,
            [field]: e?.target?.result
          }));
        };
        reader?.readAsDataURL(file);
      } else {
        setUploadPreviews(prev => ({
          ...prev,
          [field]: null
        }));
      }
    }
  };

  const removeFile = (field) => {
    handleInputChange(field, null);
    setUploadPreviews(prev => ({
      ...prev,
      [field]: null
    }));
  };

  const FileUploadField = ({ field, label, description, accept, required = false }) => (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-card-foreground mb-2">
          {label} {required && <span className="text-error">*</span>}
        </label>
        {description && (
          <p className="text-xs text-muted-foreground mb-3">{description}</p>
        )}
      </div>

      {formData?.[field] ? (
        <div className="border border-border rounded-lg p-4 bg-muted/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {uploadPreviews?.[field] ? (
                <Image
                  src={uploadPreviews?.[field]}
                  alt="Document preview"
                  className="w-12 h-12 object-cover rounded border"
                />
              ) : (
                <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
                  <Icon name="FileText" size={20} className="text-primary" />
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-card-foreground">
                  {formData?.[field]?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(formData?.[field]?.size / 1024 / 1024)?.toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeFile(field)}
              iconName="X"
            >
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 medical-transition">
          <Icon name="Upload" size={24} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground mb-2">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-muted-foreground">
            PDF, JPG, PNG up to 10MB
          </p>
          <input
            type="file"
            accept={accept}
            onChange={(e) => handleFileUpload(field, e)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      )}
      
      {errors?.[field] && (
        <p className="text-sm text-error">{errors?.[field]}</p>
      )}
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg p-6 medical-shadow">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <span className="text-primary font-semibold">2</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Professional Credentials</h3>
          <p className="text-sm text-muted-foreground">Medical license and qualification details</p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Medical License Number"
            type="text"
            placeholder="Enter license number"
            value={formData?.licenseNumber}
            onChange={(e) => handleInputChange('licenseNumber', e?.target?.value)}
            error={errors?.licenseNumber}
            description="As per Medical Council registration"
            required
          />

          <Input
            label="Medical Council"
            type="text"
            placeholder="e.g., Medical Council of India"
            value={formData?.medicalCouncil}
            onChange={(e) => handleInputChange('medicalCouncil', e?.target?.value)}
            error={errors?.medicalCouncil}
            required
          />

          <Select
            label="Primary Specialty"
            options={specialtyOptions}
            value={formData?.primarySpecialty}
            onChange={(value) => handleInputChange('primarySpecialty', value)}
            error={errors?.primarySpecialty}
            searchable
            required
          />

          <Select
            label="Years of Experience"
            options={experienceOptions}
            value={formData?.experience}
            onChange={(value) => handleInputChange('experience', value)}
            error={errors?.experience}
            required
          />

          <Input
            label="Medical Degree"
            type="text"
            placeholder="e.g., MBBS, MD, MS"
            value={formData?.degree}
            onChange={(e) => handleInputChange('degree', e?.target?.value)}
            error={errors?.degree}
            required
          />

          <Input
            label="Medical College"
            type="text"
            placeholder="Name of medical college"
            value={formData?.medicalCollege}
            onChange={(e) => handleInputChange('medicalCollege', e?.target?.value)}
            error={errors?.medicalCollege}
            required
          />

          <Input
            label="Graduation Year"
            type="number"
            placeholder="YYYY"
            value={formData?.graduationYear}
            onChange={(e) => handleInputChange('graduationYear', e?.target?.value)}
            error={errors?.graduationYear}
            min="1950"
            max={new Date()?.getFullYear()}
            required
          />

          <Input
            label="Registration Year"
            type="number"
            placeholder="YYYY"
            value={formData?.registrationYear}
            onChange={(e) => handleInputChange('registrationYear', e?.target?.value)}
            error={errors?.registrationYear}
            min="1950"
            max={new Date()?.getFullYear()}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUploadField
            field="licenseDocument"
            label="Medical License Document"
            description="Upload clear copy of your medical license"
            accept=".pdf,.jpg,.jpeg,.png"
            required
          />

          <FileUploadField
            field="degreeDocument"
            label="Medical Degree Certificate"
            description="Upload your medical degree certificate"
            accept=".pdf,.jpg,.jpeg,.png"
            required
          />

          <FileUploadField
            field="identityDocument"
            label="Government ID Proof"
            description="Aadhaar Card, PAN Card, or Passport"
            accept=".pdf,.jpg,.jpeg,.png"
            required
          />

          <FileUploadField
            field="photoDocument"
            label="Professional Photo"
            description="Recent passport-size photograph"
            accept=".jpg,.jpeg,.png"
            required
          />
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-primary mb-1">Document Verification</p>
              <p className="text-primary/80">
                All uploaded documents will be verified by our medical verification team. 
                This process typically takes 24-48 hours. You will receive email updates on the verification status.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCredentialsForm;