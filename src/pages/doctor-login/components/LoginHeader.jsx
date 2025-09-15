import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <Link to="/doctor-login" className="inline-flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl medical-shadow">
          <Icon name="Heart" size={28} color="white" />
        </div>
        <div className="text-left">
          <h1 className="text-2xl font-bold text-primary">HealthPlix</h1>
          <p className="text-sm text-muted-foreground">EMR System</p>
        </div>
      </Link>
      {/* Welcome Message */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Welcome Back, Doctor
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Sign in to access your patient records, prescriptions, and teleconsultation platform
        </p>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mb-6">
        <div className="text-center">
          <div className="text-lg font-semibold text-primary">50K+</div>
          <div className="text-xs text-muted-foreground">Doctors</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-accent">2M+</div>
          <div className="text-xs text-muted-foreground">Patients</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-success">99.9%</div>
          <div className="text-xs text-muted-foreground">Uptime</div>
        </div>
      </div>
      {/* Current Date & Time */}
      <div className="text-xs text-muted-foreground">
        {new Date()?.toLocaleDateString('en-IN', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })} • {new Date()?.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit'
        })}
      </div>
    </div>
  );
};

export default LoginHeader;