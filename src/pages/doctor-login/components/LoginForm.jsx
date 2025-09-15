import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LoginForm = ({ onLoginSuccess, onShowOTP }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for testing
  const mockCredentials = {
    email: 'doctor@healthplix.com',
    phone: '+91-9876543210',
    password: 'Doctor@123'
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.emailOrPhone?.trim()) {
      newErrors.emailOrPhone = 'Email or phone number is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/;
      
      if (!emailRegex?.test(formData?.emailOrPhone) && !phoneRegex?.test(formData?.emailOrPhone?.replace(/[-\s]/g, ''))) {
        newErrors.emailOrPhone = 'Please enter a valid email or phone number';
      }
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check mock credentials
      const isValidEmail = formData?.emailOrPhone === mockCredentials?.email;
      const isValidPhone = formData?.emailOrPhone === mockCredentials?.phone;
      const isValidPassword = formData?.password === mockCredentials?.password;
      
      if ((isValidEmail || isValidPhone) && isValidPassword) {
        onShowOTP();
      } else {
        setErrors({
          general: `Invalid credentials. Use ${mockCredentials?.email} or ${mockCredentials?.phone} with password ${mockCredentials?.password}`
        });
      }
    } catch (error) {
      setErrors({
        general: 'Login failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Mock forgot password flow
    alert('Password reset link would be sent to your registered email/phone');
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email/Phone Input */}
        <Input
          label="Email or Phone Number"
          type="text"
          name="emailOrPhone"
          placeholder="Enter your email or phone number"
          value={formData?.emailOrPhone}
          onChange={handleInputChange}
          error={errors?.emailOrPhone}
          required
          className="w-full"
        />

        {/* Password Input */}
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            className="w-full pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground medical-transition"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>

        {/* General Error */}
        {errors?.general && (
          <div className="bg-error/10 border border-error/20 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error mt-0.5 flex-shrink-0" />
              <p className="text-sm text-error">{errors?.general}</p>
            </div>
          </div>
        )}

        {/* Login Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          loading={isLoading}
          iconName="LogIn"
          iconPosition="left"
          className="w-full"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>

        {/* Forgot Password */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-primary hover:text-primary/80 medical-transition"
          >
            Forgot your password?
          </button>
        </div>

        {/* Registration Link */}
        <div className="text-center pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-2">
            New to HealthPlix EMR?
          </p>
          <Button
            variant="outline"
            onClick={() => navigate('/doctor-registration')}
            iconName="UserPlus"
            iconPosition="left"
            className="w-full"
          >
            Register as Doctor
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;