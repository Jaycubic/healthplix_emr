import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustBadges = [
    {
      id: 'medical-council',
      title: 'Medical Council Registered',
      description: 'Verified healthcare platform',
      icon: 'Shield',
      color: 'text-success'
    },
    {
      id: 'hipaa-compliant',
      title: 'HIPAA Compliant',
      description: 'Patient data protection',
      icon: 'Lock',
      color: 'text-primary'
    },
    {
      id: 'disha-certified',
      title: 'DISHA Guidelines',
      description: 'Telemedicine compliance',
      icon: 'CheckCircle',
      color: 'text-accent'
    },
    {
      id: 'iso-certified',
      title: 'ISO 27001 Certified',
      description: 'Information security standard',
      icon: 'Award',
      color: 'text-warning'
    }
  ];

  const securityFeatures = [
    'End-to-end encryption',
    'Multi-factor authentication',
    'Audit trail logging',
    'Regular security updates'
  ];

  return (
    <div className="space-y-6">
      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-3">
        {trustBadges?.map((badge) => (
          <div
            key={badge?.id}
            className="bg-card border border-border rounded-lg p-3 medical-shadow hover:medical-shadow-md medical-transition"
          >
            <div className="flex items-start space-x-2">
              <Icon name={badge?.icon} size={16} className={`${badge?.color} mt-0.5 flex-shrink-0`} />
              <div className="min-w-0">
                <h4 className="text-xs font-medium text-card-foreground leading-tight">
                  {badge?.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5 leading-tight">
                  {badge?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Security Features */}
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="ShieldCheck" size={18} className="text-primary" />
          <h3 className="text-sm font-medium text-foreground">
            Enterprise Security
          </h3>
        </div>
        <ul className="space-y-1">
          {securityFeatures?.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Icon name="Check" size={12} className="text-success flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Compliance Statement */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground leading-relaxed">
          HealthPlix EMR is designed to meet healthcare industry standards for data security, 
          patient privacy, and regulatory compliance. Your medical data is protected with 
          bank-grade security measures.
        </p>
      </div>
      {/* Support Contact */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <Icon name="HelpCircle" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-xs font-medium text-primary mb-1">
              Need Help?
            </h4>
            <p className="text-xs text-primary/80">
              Contact our 24/7 technical support team
            </p>
            <div className="flex items-center space-x-3 mt-2">
              <a
                href="tel:+91-8000-123-456"
                className="text-xs text-primary hover:text-primary/80 medical-transition"
              >
                📞 +91-8000-123-456
              </a>
              <a
                href="mailto:support@healthplix.com"
                className="text-xs text-primary hover:text-primary/80 medical-transition"
              >
                ✉️ Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;