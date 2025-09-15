import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import OTPVerification from './components/OTPVerification';
import TrustSignals from './components/TrustSignals';

const DoctorLogin = () => {
  const [currentStep, setCurrentStep] = useState('login'); // 'login' or 'otp'
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setCurrentStep('otp');
  };

  const handleShowOTP = () => {
    setCurrentStep('otp');
  };

  const handleVerificationSuccess = () => {
    setIsAuthenticated(true);
    // Navigation to dashboard is handled in OTPVerification component
  };

  const handleBackToLogin = () => {
    setCurrentStep('login');
  };

  return (
    <>
      <Helmet>
        <title>Doctor Login - HealthPlix EMR</title>
        <meta name="description" content="Secure login for licensed medical practitioners to access HealthPlix EMR system with multi-factor authentication" />
        <meta name="keywords" content="doctor login, EMR, electronic medical records, healthcare, telemedicine" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <div className="flex min-h-screen">
          {/* Left Panel - Login Form */}
          <div className="flex-1 flex items-center justify-center px-4 py-8 lg:px-8">
            <div className="w-full max-w-md">
              <LoginHeader />
              
              {currentStep === 'login' && (
                <LoginForm
                  onLoginSuccess={handleLoginSuccess}
                  onShowOTP={handleShowOTP}
                />
              )}
              
              {currentStep === 'otp' && (
                <OTPVerification
                  onBack={handleBackToLogin}
                  onVerificationSuccess={handleVerificationSuccess}
                />
              )}
            </div>
          </div>

          {/* Right Panel - Trust Signals & Security Info */}
          <div className="hidden lg:flex lg:w-96 bg-muted/30 border-l border-border">
            <div className="flex flex-col justify-center px-8 py-12 w-full">
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Trusted by Healthcare Professionals
                </h3>
                <p className="text-sm text-muted-foreground">
                  Join thousands of doctors who trust HealthPlix EMR for secure, 
                  efficient patient care and practice management.
                </p>
              </div>

              <TrustSignals />

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  © {new Date()?.getFullYear()} HealthPlix Technologies Pvt Ltd. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Trust Signals */}
        <div className="lg:hidden px-4 pb-8">
          <div className="max-w-md mx-auto">
            <TrustSignals />
          </div>
        </div>

        {/* Background Pattern */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </>
  );
};

export default DoctorLogin;