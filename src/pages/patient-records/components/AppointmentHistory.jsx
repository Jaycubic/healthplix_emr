import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AppointmentHistory = ({ patient }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const appointments = [
    {
      id: 1,
      date: '2024-09-15',
      time: '10:00 AM',
      type: 'follow-up',
      status: 'scheduled',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      reason: 'Blood pressure monitoring and medication review',
      duration: 30,
      location: 'Clinic Room 201',
      notes: 'Patient requested morning appointment. Bring recent BP readings.',
      reminderSent: true,
      cost: '₹500'
    },
    {
      id: 2,
      date: '2024-09-10',
      time: '2:30 PM',
      type: 'consultation',
      status: 'completed',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      reason: 'Regular checkup and cardiac evaluation',
      duration: 45,
      location: 'Clinic Room 201',
      notes: 'Routine cardiac assessment completed. Patient stable.',
      vitals: {
        bp: '122/80',
        hr: '72',
        temp: '98.6°F',
        weight: '70.5 kg'
      },
      diagnosis: 'Hypertension - well controlled',
      prescription: 'Continued current medications',
      followUp: 'Follow-up in 3 months',
      cost: '₹750'
    },
    {
      id: 3,
      date: '2024-08-20',
      time: '11:15 AM',
      type: 'teleconsultation',
      status: 'completed',
      doctor: 'Dr. Michael Chen',
      specialty: 'Endocrinology',
      reason: 'Diabetes management consultation',
      duration: 25,
      location: 'Video Call',
      notes: 'Discussed HbA1c results and dietary modifications.',
      diagnosis: 'Type 2 Diabetes - good control',
      prescription: 'Continue Metformin, dietary counseling provided',
      followUp: 'Lab work in 3 months',
      cost: '₹400'
    },
    {
      id: 4,
      date: '2024-08-15',
      time: '9:00 AM',
      type: 'procedure',
      status: 'completed',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      reason: 'ECG and Echocardiogram',
      duration: 60,
      location: 'Procedure Room A',
      notes: 'Cardiac imaging and electrical activity assessment.',
      results: 'ECG: Normal sinus rhythm. Echo: Normal LV function, EF 60%',
      recommendation: 'Continue current cardiac medications',
      cost: '₹1200'
    },
    {
      id: 5,
      date: '2024-07-25',
      time: '3:45 PM',
      type: 'consultation',
      status: 'cancelled',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      reason: 'Medication adjustment consultation',
      duration: 30,
      location: 'Clinic Room 201',
      notes: 'Patient cancelled due to family emergency.',
      cancellationReason: 'Family emergency',
      cancellationDate: '2024-07-24',
      refundAmount: '₹500'
    },
    {
      id: 6,
      date: '2024-07-10',
      time: '4:00 PM',
      type: 'consultation',
      status: 'no-show',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      reason: 'Follow-up visit',
      duration: 30,
      location: 'Clinic Room 201',
      notes: 'Patient did not show up for scheduled appointment.',
      noShowFee: '₹200'
    }
  ];

  const statusOptions = [
    { key: 'all', label: 'All Appointments', count: appointments?.length },
    { key: 'scheduled', label: 'Scheduled', count: appointments?.filter(a => a?.status === 'scheduled')?.length },
    { key: 'completed', label: 'Completed', count: appointments?.filter(a => a?.status === 'completed')?.length },
    { key: 'cancelled', label: 'Cancelled', count: appointments?.filter(a => a?.status === 'cancelled')?.length },
    { key: 'no-show', label: 'No Show', count: appointments?.filter(a => a?.status === 'no-show')?.length }
  ];

  const appointmentTypes = {
    consultation: { icon: 'Stethoscope', color: 'text-primary bg-primary/10' },
    'follow-up': { icon: 'RefreshCw', color: 'text-success bg-success/10' },
    teleconsultation: { icon: 'Video', color: 'text-accent bg-accent/10' },
    procedure: { icon: 'Activity', color: 'text-warning bg-warning/10' },
    emergency: { icon: 'AlertTriangle', color: 'text-error bg-error/10' }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'text-primary bg-primary/10 border-primary/20';
      case 'completed': return 'text-success bg-success/10 border-success/20';
      case 'cancelled': return 'text-error bg-error/10 border-error/20';
      case 'no-show': return 'text-warning bg-warning/10 border-warning/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const filteredAppointments = filterStatus === 'all' 
    ? appointments 
    : appointments?.filter(a => a?.status === filterStatus);

  const renderAppointmentCard = (appointment) => {
    const isSelected = selectedAppointment === appointment?.id;
    const typeConfig = appointmentTypes?.[appointment?.type] || appointmentTypes?.consultation;

    return (
      <div 
        key={appointment?.id}
        className={`bg-card border rounded-lg medical-shadow cursor-pointer medical-transition ${
          isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/50'
        }`}
        onClick={() => setSelectedAppointment(isSelected ? null : appointment?.id)}
      >
        {/* Appointment Header */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start space-x-3 flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${typeConfig?.color}`}>
                <Icon name={typeConfig?.icon} size={18} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-1">
                  <h4 className="font-semibold text-card-foreground capitalize">
                    {appointment?.type?.replace('-', ' ')}
                  </h4>
                  <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(appointment?.status)}`}>
                    {appointment?.status?.toUpperCase()?.replace('-', ' ')}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                  <span>{appointment?.doctor}</span>
                  <span>• {appointment?.specialty}</span>
                  <span>• {appointment?.cost}</span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-card-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span>{new Date(appointment.date)?.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>{appointment?.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span>{appointment?.location}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Icon 
              name={isSelected ? 'ChevronUp' : 'ChevronDown'} 
              size={20} 
              className="text-muted-foreground flex-shrink-0 ml-2"
            />
          </div>

          <div className="text-sm text-card-foreground">
            <span className="text-muted-foreground">Reason: </span>
            {appointment?.reason}
          </div>
        </div>
        {/* Expanded Details */}
        {isSelected && (
          <div className="border-t border-border p-4">
            <div className="space-y-4">
              {/* Basic Information */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Duration:</span>
                  <p className="font-medium text-card-foreground">{appointment?.duration} minutes</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Cost:</span>
                  <p className="font-medium text-card-foreground">{appointment?.cost}</p>
                </div>
                {appointment?.reminderSent && (
                  <div>
                    <span className="text-muted-foreground">Reminder:</span>
                    <p className="font-medium text-success">Sent</p>
                  </div>
                )}
              </div>

              {/* Notes */}
              {appointment?.notes && (
                <div>
                  <h5 className="font-medium text-card-foreground mb-2">Notes</h5>
                  <p className="text-sm text-muted-foreground bg-muted rounded p-3">
                    {appointment?.notes}
                  </p>
                </div>
              )}

              {/* Completed Appointment Details */}
              {appointment?.status === 'completed' && (
                <>
                  {appointment?.vitals && (
                    <div>
                      <h5 className="font-medium text-card-foreground mb-2">Vital Signs</h5>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-muted rounded p-2">
                          <span className="text-xs text-muted-foreground">Blood Pressure</span>
                          <p className="font-medium text-card-foreground">{appointment?.vitals?.bp}</p>
                        </div>
                        <div className="bg-muted rounded p-2">
                          <span className="text-xs text-muted-foreground">Heart Rate</span>
                          <p className="font-medium text-card-foreground">{appointment?.vitals?.hr} bpm</p>
                        </div>
                        <div className="bg-muted rounded p-2">
                          <span className="text-xs text-muted-foreground">Temperature</span>
                          <p className="font-medium text-card-foreground">{appointment?.vitals?.temp}</p>
                        </div>
                        <div className="bg-muted rounded p-2">
                          <span className="text-xs text-muted-foreground">Weight</span>
                          <p className="font-medium text-card-foreground">{appointment?.vitals?.weight}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {appointment?.diagnosis && (
                    <div>
                      <h5 className="font-medium text-card-foreground mb-2">Diagnosis</h5>
                      <p className="text-sm text-muted-foreground">{appointment?.diagnosis}</p>
                    </div>
                  )}

                  {appointment?.prescription && (
                    <div>
                      <h5 className="font-medium text-card-foreground mb-2">Prescription</h5>
                      <p className="text-sm text-muted-foreground">{appointment?.prescription}</p>
                    </div>
                  )}

                  {appointment?.results && (
                    <div>
                      <h5 className="font-medium text-card-foreground mb-2">Results</h5>
                      <p className="text-sm text-muted-foreground">{appointment?.results}</p>
                    </div>
                  )}

                  {appointment?.recommendation && (
                    <div>
                      <h5 className="font-medium text-card-foreground mb-2">Recommendations</h5>
                      <p className="text-sm text-muted-foreground">{appointment?.recommendation}</p>
                    </div>
                  )}

                  {appointment?.followUp && (
                    <div>
                      <h5 className="font-medium text-card-foreground mb-2">Follow-up</h5>
                      <p className="text-sm text-muted-foreground">{appointment?.followUp}</p>
                    </div>
                  )}
                </>
              )}

              {/* Cancelled Appointment Details */}
              {appointment?.status === 'cancelled' && (
                <div className="bg-error/10 border border-error/20 rounded p-3">
                  <div className="flex items-start space-x-2">
                    <Icon name="X" size={16} className="text-error mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-error mb-1">Cancellation Details</p>
                      <p className="text-sm text-error/80 mb-1">
                        Reason: {appointment?.cancellationReason}
                      </p>
                      <p className="text-sm text-error/80">
                        Cancelled on: {new Date(appointment.cancellationDate)?.toLocaleDateString()}
                      </p>
                      {appointment?.refundAmount && (
                        <p className="text-sm text-error/80">
                          Refund: {appointment?.refundAmount}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* No Show Details */}
              {appointment?.status === 'no-show' && (
                <div className="bg-warning/10 border border-warning/20 rounded p-3">
                  <div className="flex items-start space-x-2">
                    <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-warning mb-1">No Show</p>
                      <p className="text-sm text-warning/80">
                        Patient did not attend the scheduled appointment.
                      </p>
                      {appointment?.noShowFee && (
                        <p className="text-sm text-warning/80">
                          No-show fee: {appointment?.noShowFee}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center space-x-2 pt-2 border-t border-border">
                {appointment?.status === 'scheduled' && (
                  <>
                    <Button variant="outline" size="sm" iconName="Edit">
                      Reschedule
                    </Button>
                    <Button variant="outline" size="sm" iconName="X">
                      Cancel
                    </Button>
                    <Button variant="outline" size="sm" iconName="MessageSquare">
                      Send Reminder
                    </Button>
                  </>
                )}
                
                {appointment?.status === 'completed' && (
                  <>
                    <Button variant="outline" size="sm" iconName="Download">
                      Download Report
                    </Button>
                    <Button variant="outline" size="sm" iconName="RefreshCw">
                      Book Follow-up
                    </Button>
                  </>
                )}
                
                <Button variant="outline" size="sm" iconName="Share">
                  Share
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Status Filter */}
      <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
        {statusOptions?.map((option) => (
          <button
            key={option?.key}
            onClick={() => setFilterStatus(option?.key)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium medical-transition ${
              filterStatus === option?.key
                ? 'bg-card text-card-foreground medical-shadow'
                : 'text-muted-foreground hover:text-card-foreground'
            }`}
          >
            <span>{option?.label}</span>
            <span className="bg-current/20 text-current px-1.5 py-0.5 rounded text-xs">
              {option?.count}
            </span>
          </button>
        ))}
      </div>
      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments?.length > 0 ? (
          filteredAppointments?.map(renderAppointmentCard)
        ) : (
          <div className="text-center py-12">
            <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-card-foreground mb-2">
              No {filterStatus === 'all' ? '' : filterStatus} appointments found
            </h3>
            <p className="text-muted-foreground mb-4">
              {filterStatus === 'all' ?'This patient has no appointment history recorded yet.'
                : `No ${filterStatus} appointments available for this patient.`
              }
            </p>
            <Button variant="outline" iconName="Plus">
              Schedule Appointment
            </Button>
          </div>
        )}
      </div>
      {/* Summary Stats */}
      {filteredAppointments?.length > 0 && (
        <div className="bg-muted rounded-lg p-4">
          <h4 className="font-medium text-card-foreground mb-3">Appointment Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Total Appointments:</span>
              <p className="font-medium text-card-foreground">{appointments?.length}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Completed:</span>
              <p className="font-medium text-card-foreground">
                {appointments?.filter(a => a?.status === 'completed')?.length}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">No-show Rate:</span>
              <p className="font-medium text-card-foreground">
                {Math.round((appointments?.filter(a => a?.status === 'no-show')?.length / appointments?.length) * 100)}%
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Total Spent:</span>
              <p className="font-medium text-card-foreground">
                ₹{appointments?.filter(a => a?.status === 'completed')?.reduce((sum, a) => sum + parseInt(a?.cost?.replace('₹', '')), 0)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentHistory;