import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AppointmentCard = ({ appointment, onViewDetails, onStartConsultation }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'cancelled':
        return 'bg-error/10 text-error border-error/20';
      case 'completed':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  const getConsultationTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'teleconsultation':
        return 'Video';
      case 'in-person':
        return 'User';
      case 'follow-up':
        return 'RefreshCw';
      default:
        return 'Calendar';
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const time = new Date(`2000-01-01T${timeString}`);
    return time?.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  };

  const isUpcoming = () => {
    const now = new Date();
    const appointmentTime = new Date(`${appointment.date}T${appointment.time}`);
    return appointmentTime > now;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 medical-shadow hover:medical-shadow-md medical-transition">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Icon name="User" size={18} color="white" />
          </div>
          <div>
            <h4 className="font-medium text-card-foreground">{appointment?.patientName}</h4>
            <p className="text-sm text-muted-foreground">ID: {appointment?.patientId}</p>
          </div>
        </div>
        
        <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(appointment?.status)}`}>
          {appointment?.status}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={14} className="text-muted-foreground" />
          <span className="text-card-foreground">{formatTime(appointment?.time)}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name={getConsultationTypeIcon(appointment?.type)} size={14} className="text-muted-foreground" />
          <span className="text-card-foreground">{appointment?.type}</span>
        </div>
        
        {appointment?.duration && (
          <div className="flex items-center space-x-2">
            <Icon name="Timer" size={14} className="text-muted-foreground" />
            <span className="text-card-foreground">{appointment?.duration} min</span>
          </div>
        )}
        
        {appointment?.reason && (
          <div className="flex items-center space-x-2">
            <Icon name="FileText" size={14} className="text-muted-foreground" />
            <span className="text-card-foreground truncate">{appointment?.reason}</span>
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails?.(appointment)}
          iconName="Eye"
          iconPosition="left"
          className="flex-1"
        >
          View Details
        </Button>
        
        {isUpcoming() && appointment?.type?.toLowerCase() === 'teleconsultation' && (
          <Button
            variant="default"
            size="sm"
            onClick={() => onStartConsultation?.(appointment)}
            iconName="Video"
            iconPosition="left"
            className="flex-1"
          >
            Start Call
          </Button>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;