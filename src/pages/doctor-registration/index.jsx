import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import RegistrationProgress from './components/RegistrationProgress';
import PersonalInfoForm from './components/PersonalInfoForm';
import ProfessionalCredentialsForm from './components/ProfessionalCredentialsForm';
import ClinicSetupForm from './components/ClinicSetupForm';
import VerificationStatus from './components/VerificationStatus';

const DoctorRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [errors, setErrors] = useState({});

  // Form data state
  const [formData, setFormData] = useState({
    personalInfo: {
      title: '',
      fullName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pinCode: ''
    },
    professionalCredentials: {
      licenseNumber: '',
      medicalCouncil: '',
      primarySpecialty: '',
      experience: '',
      degree: '',
      medicalCollege: '',
      graduationYear: '',
      registrationYear: '',
      licenseDocument: null,
      degreeDocument: null,
      identityDocument: null,
      photoDocument: null
    },
    clinicSetup: {
      clinicName: '',
      clinicType: '',
      clinicAddress: '',
      clinicCity: '',
      clinicState: '',
      clinicPinCode: '',
      clinicPhone: '',
      consultationMode: '',
      consultationFee: '',
      followupFee: '',
      operatingHours: {
        monday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
        tuesday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
        wednesday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
        thursday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
        friday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
        saturday: { isAvailable: true, startTime: '09:00', endTime: '13:00' },
        sunday: { isAvailable: false, startTime: '', endTime: '' }
      },
      additionalLocations: [],
      agreeToTerms: false,
      agreeToPrivacy: false,
      agreeToUpdates: false
    }
  });

  // Mock verification data
  const [verificationData, setVerificationData] = useState({
    email: { status: 'pending', message: 'Verification email sent to your registered email address' },
    phone: { status: 'pending', message: 'OTP verification pending' },
    license: { status: 'pending', message: 'Medical license under review by verification team' },
    degree: { status: 'pending', message: 'Medical degree certificate under review' },
    identity: { status: 'pending', message: 'Government ID verification in progress' },
    kyc: { status: 'pending', message: 'Complete KYC verification pending' }
  });

  const registrationSteps = [
    {
      id: 1,
      title: 'Personal Information',
      description: 'Basic details and contact information',
      status: currentStep > 1 ? 'verified' : currentStep === 1 ? 'current' : 'pending'
    },
    {
      id: 2,
      title: 'Professional Credentials',
      description: 'Medical license and qualifications',
      status: currentStep > 2 ? 'verified' : currentStep === 2 ? 'current' : 'pending'
    },
    {
      id: 3,
      title: 'Clinic Setup',
      description: 'Practice location and operating details',
      status: currentStep > 3 ? 'verified' : currentStep === 3 ? 'current' : 'pending'
    }
  ];

  const handleFormChange = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
    
    // Clear errors for the changed section
    setErrors(prev => ({
      ...prev,
      ...Object.keys(data)?.reduce((acc, key) => ({ ...acc, [key]: '' }), {})
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        const personalInfo = formData?.personalInfo;
        if (!personalInfo?.title) newErrors.title = 'Title is required';
        if (!personalInfo?.fullName) newErrors.fullName = 'Full name is required';
        if (!personalInfo?.email) newErrors.email = 'Email is required';
        if (!personalInfo?.phone) newErrors.phone = 'Phone number is required';
        if (!personalInfo?.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!personalInfo?.gender) newErrors.gender = 'Gender is required';
        if (!personalInfo?.addressLine1) newErrors.addressLine1 = 'Address is required';
        if (!personalInfo?.city) newErrors.city = 'City is required';
        if (!personalInfo?.state) newErrors.state = 'State is required';
        if (!personalInfo?.pinCode) newErrors.pinCode = 'PIN code is required';
        break;
        
      case 2:
        const credentials = formData?.professionalCredentials;
        if (!credentials?.licenseNumber) newErrors.licenseNumber = 'License number is required';
        if (!credentials?.medicalCouncil) newErrors.medicalCouncil = 'Medical council is required';
        if (!credentials?.primarySpecialty) newErrors.primarySpecialty = 'Primary specialty is required';
        if (!credentials?.experience) newErrors.experience = 'Experience is required';
        if (!credentials?.degree) newErrors.degree = 'Medical degree is required';
        if (!credentials?.medicalCollege) newErrors.medicalCollege = 'Medical college is required';
        if (!credentials?.graduationYear) newErrors.graduationYear = 'Graduation year is required';
        if (!credentials?.registrationYear) newErrors.registrationYear = 'Registration year is required';
        if (!credentials?.licenseDocument) newErrors.licenseDocument = 'License document is required';
        if (!credentials?.degreeDocument) newErrors.degreeDocument = 'Degree document is required';
        if (!credentials?.identityDocument) newErrors.identityDocument = 'Identity document is required';
        if (!credentials?.photoDocument) newErrors.photoDocument = 'Professional photo is required';
        break;
        
      case 3:
        const clinicSetup = formData?.clinicSetup;
        if (!clinicSetup?.clinicName) newErrors.clinicName = 'Clinic name is required';
        if (!clinicSetup?.clinicType) newErrors.clinicType = 'Clinic type is required';
        if (!clinicSetup?.clinicAddress) newErrors.clinicAddress = 'Clinic address is required';
        if (!clinicSetup?.clinicCity) newErrors.clinicCity = 'City is required';
        if (!clinicSetup?.clinicState) newErrors.clinicState = 'State is required';
        if (!clinicSetup?.clinicPinCode) newErrors.clinicPinCode = 'PIN code is required';
        if (!clinicSetup?.clinicPhone) newErrors.clinicPhone = 'Clinic phone is required';
        if (!clinicSetup?.consultationMode) newErrors.consultationMode = 'Consultation mode is required';
        if (!clinicSetup?.consultationFee) newErrors.consultationFee = 'Consultation fee is required';
        if (!clinicSetup?.agreeToTerms) newErrors.agreeToTerms = 'You must agree to terms and conditions';
        if (!clinicSetup?.agreeToPrivacy) newErrors.agreeToPrivacy = 'You must agree to privacy policy';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful submission
      console.log('Registration submitted:', formData);
      setShowVerification(true);
      
      // Simulate verification updates
      setTimeout(() => {
        setVerificationData(prev => ({
          ...prev,
          email: { status: 'verified', message: 'Email successfully verified' },
          phone: { status: 'verified', message: 'Phone number verified via OTP' }
        }));
      }, 3000);
      
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResubmit = (documentType) => {
    console.log('Resubmitting document:', documentType);
    // Handle document resubmission
  };

  const renderCurrentStep = () => {
    if (showVerification) {
      return (
        <VerificationStatus
          verificationData={verificationData}
          onResubmit={handleResubmit}
        />
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoForm
            formData={formData?.personalInfo}
            onFormChange={handleFormChange}
            errors={errors}
          />
        );
      case 2:
        return (
          <ProfessionalCredentialsForm
            formData={formData?.professionalCredentials}
            onFormChange={handleFormChange}
            errors={errors}
          />
        );
      case 3:
        return (
          <ClinicSetupForm
            formData={formData?.clinicSetup}
            onFormChange={handleFormChange}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-border medical-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/doctor-login" className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Icon name="Heart" size={24} color="white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-primary">HealthPlix</span>
                <span className="text-xs text-text-secondary">EMR System</span>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Already have an account?</span>
              <Link to="/doctor-login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <RegistrationProgress
                currentStep={showVerification ? 4 : currentStep}
                totalSteps={3}
                steps={registrationSteps}
              />
            </div>
          </div>

          {/* Form Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Page Header */}
              {!showVerification && (
                <div className="text-center lg:text-left">
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    Doctor Registration
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Join HealthPlix EMR and digitize your medical practice
                  </p>
                </div>
              )}

              {/* Current Step Form */}
              {renderCurrentStep()}

              {/* Navigation Buttons */}
              {!showVerification && (
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  {currentStep > 1 && (
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      iconName="ChevronLeft"
                      iconPosition="left"
                      className="sm:w-auto"
                    >
                      Previous
                    </Button>
                  )}
                  
                  <div className="flex-1" />
                  
                  <Button
                    variant="default"
                    onClick={handleNext}
                    loading={isSubmitting}
                    iconName={currentStep === 3 ? "Check" : "ChevronRight"}
                    iconPosition="right"
                    className="sm:w-auto"
                  >
                    {currentStep === 3 
                      ? (isSubmitting ? 'Submitting...' : 'Submit for Review')
                      : 'Save & Continue'
                    }
                  </Button>
                </div>
              )}

              {/* Error Display */}
              {errors?.submit && (
                <div className="bg-error/10 border border-error/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="AlertTriangle" size={16} className="text-error" />
                    <p className="text-sm text-error">{errors?.submit}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-surface border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                  <Icon name="Heart" size={18} color="white" />
                </div>
                <span className="text-lg font-semibold text-primary">HealthPlix</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Comprehensive EMR solution for modern healthcare practices
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-card-foreground mb-3">Support</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Email: support@healthplix.com</p>
                <p>Phone: +91 80 4567 8900</p>
                <p>Hours: 9 AM - 6 PM IST</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-card-foreground mb-3">Legal</h3>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</a>
                <a href="#" className="text-muted-foreground hover:text-primary">Terms of Service</a>
                <a href="#" className="text-muted-foreground hover:text-primary">HIPAA Compliance</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} HealthPlix EMR. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DoctorRegistration;