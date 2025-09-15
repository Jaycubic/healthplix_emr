import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OTPVerification = ({ onBack, onVerificationSuccess }) => {
  const navigate = useNavigate();
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [totpCode, setTotpCode] = useState('');
  const [verificationMethod, setVerificationMethod] = useState('otp'); // 'otp' or 'totp'
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Mock OTP and TOTP codes
  const mockOTP = '123456';
  const mockTOTP = '789012';

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleOTPChange = (index, value) => {
    if (value?.length > 1) return;
    
    const newOTP = [...otpCode];
    newOTP[index] = value;
    setOtpCode(newOTP);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput?.focus();
    }
    
    setError('');
  };

  const handleKeyDown = (index, e) => {
    if (e?.key === 'Backspace' && !otpCode?.[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const enteredOTP = otpCode?.join('');
    
    if (enteredOTP?.length !== 6) {
      setError('Please enter complete 6-digit OTP');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (enteredOTP === mockOTP) {
        onVerificationSuccess();
        navigate('/doctor-dashboard');
      } else {
        setError(`Invalid OTP. Use ${mockOTP} for testing`);
      }
    } catch (error) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyTOTP = async () => {
    if (totpCode?.length !== 6) {
      setError('Please enter complete 6-digit TOTP code');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (totpCode === mockTOTP) {
        onVerificationSuccess();
        navigate('/doctor-dashboard');
      } else {
        setError(`Invalid TOTP code. Use ${mockTOTP} for testing`);
      }
    } catch (error) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = () => {
    setResendTimer(30);
    setCanResend(false);
    setOtpCode(['', '', '', '', '', '']);
    setError('');
    // Mock OTP resend
    console.log('OTP resent successfully');
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Shield" size={32} className="text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Two-Factor Authentication
        </h2>
        <p className="text-sm text-muted-foreground">
          Complete your secure login with additional verification
        </p>
      </div>
      {/* Verification Method Toggle */}
      <div className="flex bg-muted rounded-lg p-1 mb-6">
        <button
          onClick={() => setVerificationMethod('otp')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium medical-transition ${
            verificationMethod === 'otp' ?'bg-background text-foreground medical-shadow' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          SMS/Email OTP
        </button>
        <button
          onClick={() => setVerificationMethod('totp')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium medical-transition ${
            verificationMethod === 'totp' ?'bg-background text-foreground medical-shadow' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          Authenticator App
        </button>
      </div>
      {/* OTP Verification */}
      {verificationMethod === 'otp' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Enter 6-digit OTP
            </label>
            <div className="flex space-x-2 justify-center">
              {otpCode?.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOTPChange(index, e?.target?.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-lg font-semibold border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary medical-transition"
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              OTP sent to your registered email/phone
            </p>
          </div>

          {/* Resend OTP */}
          <div className="text-center">
            {canResend ? (
              <button
                onClick={handleResendOTP}
                className="text-sm text-primary hover:text-primary/80 medical-transition"
              >
                Resend OTP
              </button>
            ) : (
              <p className="text-sm text-muted-foreground">
                Resend OTP in {resendTimer}s
              </p>
            )}
          </div>

          <Button
            onClick={handleVerifyOTP}
            variant="default"
            size="lg"
            loading={isLoading}
            iconName="Shield"
            iconPosition="left"
            className="w-full"
          >
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </Button>
        </div>
      )}
      {/* TOTP Verification */}
      {verificationMethod === 'totp' && (
        <div className="space-y-6">
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Smartphone" size={20} className="text-primary mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">
                  Authenticator App
                </h4>
                <p className="text-xs text-muted-foreground">
                  Open your authenticator app (Google Authenticator, Authy, etc.) and enter the 6-digit code
                </p>
              </div>
            </div>
          </div>

          <Input
            label="Enter TOTP Code"
            type="text"
            inputMode="numeric"
            maxLength="6"
            placeholder="000000"
            value={totpCode}
            onChange={(e) => {
              setTotpCode(e?.target?.value?.replace(/\D/g, ''));
              setError('');
            }}
            className="text-center text-lg font-mono tracking-widest"
          />

          <Button
            onClick={handleVerifyTOTP}
            variant="default"
            size="lg"
            loading={isLoading}
            iconName="Shield"
            iconPosition="left"
            className="w-full"
          >
            {isLoading ? 'Verifying...' : 'Verify Code'}
          </Button>
        </div>
      )}
      {/* Error Message */}
      {error && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-3 mt-4">
          <div className="flex items-start space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error mt-0.5 flex-shrink-0" />
            <p className="text-sm text-error">{error}</p>
          </div>
        </div>
      )}
      {/* Back Button */}
      <div className="mt-6 text-center">
        <Button
          variant="ghost"
          onClick={onBack}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Back to Login
        </Button>
      </div>
    </div>
  );
};

export default OTPVerification;