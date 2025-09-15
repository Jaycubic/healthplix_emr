import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VerificationStatus = ({ verificationData, onResubmit }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'text-success bg-success/10 border-success/20';
      case 'pending':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'rejected':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'rejected':
        return 'XCircle';
      default:
        return 'AlertCircle';
    }
  };

  const verificationItems = [
    {
      id: 'email',
      title: 'Email Verification',
      description: 'Verify your email address',
      status: verificationData?.email?.status || 'pending',
      message: verificationData?.email?.message
    },
    {
      id: 'phone',
      title: 'Phone Verification',
      description: 'Verify your phone number via OTP',
      status: verificationData?.phone?.status || 'pending',
      message: verificationData?.phone?.message
    },
    {
      id: 'license',
      title: 'Medical License',
      description: 'Medical license document verification',
      status: verificationData?.license?.status || 'pending',
      message: verificationData?.license?.message
    },
    {
      id: 'degree',
      title: 'Medical Degree',
      description: 'Medical degree certificate verification',
      status: verificationData?.degree?.status || 'pending',
      message: verificationData?.degree?.message
    },
    {
      id: 'identity',
      title: 'Identity Verification',
      description: 'Government ID proof verification',
      status: verificationData?.identity?.status || 'pending',
      message: verificationData?.identity?.message
    },
    {
      id: 'kyc',
      title: 'KYC Verification',
      description: 'Complete KYC verification process',
      status: verificationData?.kyc?.status || 'pending',
      message: verificationData?.kyc?.message
    }
  ];

  const overallStatus = verificationItems?.every(item => item?.status === 'verified') 
    ? 'verified' 
    : verificationItems?.some(item => item?.status === 'rejected')
      ? 'rejected' :'pending';

  const getOverallMessage = () => {
    switch (overallStatus) {
      case 'verified':
        return 'All verifications completed successfully. Your account is now active.';
      case 'rejected':
        return 'Some documents were rejected. Please review and resubmit the required documents.';
      default:
        return 'Your documents are under review. This process typically takes 24-48 hours.';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 medical-shadow">
      <div className="flex items-center space-x-3 mb-6">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          overallStatus === 'verified' 
            ? 'bg-success/10' 
            : overallStatus === 'rejected' ?'bg-error/10' :'bg-warning/10'
        }`}>
          <Icon 
            name={getStatusIcon(overallStatus)} 
            size={20} 
            className={
              overallStatus === 'verified' 
                ? 'text-success' 
                : overallStatus === 'rejected' ?'text-error' :'text-warning'
            } 
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Verification Status</h3>
          <p className="text-sm text-muted-foreground">Document and credential verification progress</p>
        </div>
      </div>
      {/* Overall Status */}
      <div className={`p-4 rounded-lg border mb-6 ${getStatusColor(overallStatus)}`}>
        <div className="flex items-start space-x-3">
          <Icon 
            name={getStatusIcon(overallStatus)} 
            size={20} 
            className="mt-0.5 flex-shrink-0"
          />
          <div>
            <p className="font-medium mb-1">
              {overallStatus === 'verified' ? 'Account Verified' : 
               overallStatus === 'rejected' ? 'Action Required' : 'Under Review'}
            </p>
            <p className="text-sm opacity-90">{getOverallMessage()}</p>
          </div>
        </div>
      </div>
      {/* Individual Verification Items */}
      <div className="space-y-4">
        {verificationItems?.map((item) => (
          <div key={item?.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon 
                name={getStatusIcon(item?.status)} 
                size={18} 
                className={
                  item?.status === 'verified' 
                    ? 'text-success' 
                    : item?.status === 'rejected' ?'text-error' :'text-warning'
                }
              />
              <div>
                <p className="font-medium text-card-foreground">{item?.title}</p>
                <p className="text-sm text-muted-foreground">{item?.description}</p>
                {item?.message && (
                  <p className="text-xs mt-1 text-muted-foreground">{item?.message}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(item?.status)}`}>
                {item?.status?.charAt(0)?.toUpperCase() + item?.status?.slice(1)}
              </span>
              
              {item?.status === 'rejected' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onResubmit && onResubmit(item?.id)}
                  iconName="RefreshCw"
                >
                  Resubmit
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Action Buttons */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex flex-col sm:flex-row gap-3">
          {overallStatus === 'verified' ? (
            <Button
              variant="default"
              iconName="ArrowRight"
              iconPosition="right"
              className="flex-1"
            >
              Continue to Dashboard
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                iconName="RefreshCw"
                iconPosition="left"
                className="flex-1"
              >
                Refresh Status
              </Button>
              
              {overallStatus === 'rejected' && (
                <Button
                  variant="default"
                  iconName="Upload"
                  iconPosition="left"
                  className="flex-1"
                >
                  Resubmit Documents
                </Button>
              )}
            </>
          )}
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Need help? Contact our support team at{' '}
            <a href="mailto:support@healthplix.com" className="text-primary hover:underline">
              support@healthplix.com
            </a>
          </p>
        </div>
      </div>
      {/* Verification Timeline */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-medium text-card-foreground mb-4">Verification Timeline</h4>
        <div className="space-y-3 text-sm">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-muted-foreground">Registration submitted - {new Date()?.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className={`w-2 h-2 rounded-full ${
              overallStatus !== 'pending' ? 'bg-success' : 'bg-warning'
            }`}></div>
            <span className="text-muted-foreground">
              Document review - {overallStatus !== 'pending' ? 'Completed' : 'In Progress'}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className={`w-2 h-2 rounded-full ${
              overallStatus === 'verified' ? 'bg-success' : 'bg-muted'
            }`}></div>
            <span className="text-muted-foreground">
              Account activation - {overallStatus === 'verified' ? 'Completed' : 'Pending'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationStatus;