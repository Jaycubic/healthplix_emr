import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MedicalHistoryTimeline = ({ patient }) => {
  const [expandedEntry, setExpandedEntry] = useState(null);
  const [filterType, setFilterType] = useState('all');

  const medicalHistory = [
    {
      id: 1,
      date: '2024-09-10',
      type: 'consultation',
      title: 'Regular Checkup',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      chiefComplaint: 'Routine cardiac evaluation and blood pressure monitoring',
      diagnosis: 'Hypertension - well controlled',
      treatment: `Patient continues on current antihypertensive regimen.\nLifestyle modifications reinforced.\nRegular monitoring advised.`,
      followUp: 'Follow-up in 3 months',
      vitals: {
        bp: '122/80',
        hr: '72',
        temp: '98.6°F',
        weight: '70.5 kg'
      },
      status: 'completed'
    },
    {
      id: 2,
      date: '2024-08-15',
      type: 'lab',
      title: 'Comprehensive Metabolic Panel',
      doctor: 'Dr. Sarah Johnson',
      results: `Glucose: 95 mg/dL (Normal)\nCreatinine: 1.0 mg/dL (Normal)\nTotal Cholesterol: 185 mg/dL (Optimal)\nHDL: 55 mg/dL (Good)\nLDL: 110 mg/dL (Near Optimal)`,
      interpretation: 'All values within normal limits. Lipid profile shows improvement.',
      status: 'completed'
    },
    {
      id: 3,
      date: '2024-07-20',
      type: 'prescription',
      title: 'Medication Adjustment',
      doctor: 'Dr. Sarah Johnson',
      medications: [
        { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '90 days' },
        { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', duration: '90 days' }
      ],
      notes: 'Adjusted Lisinopril dosage based on recent BP readings. Continue current diabetes management.',
      status: 'active'
    },
    {
      id: 4,
      date: '2024-06-25',
      type: 'consultation',
      title: 'Follow-up Visit',
      doctor: 'Dr. Michael Chen',
      specialty: 'Endocrinology',
      chiefComplaint: 'Diabetes management and HbA1c review',
      diagnosis: 'Type 2 Diabetes Mellitus - good control',
      treatment: `Continue current metformin therapy.\nDietary counseling provided.\nHome glucose monitoring reinforced.`,
      followUp: 'Follow-up in 3 months with lab work',
      vitals: {
        bp: '125/82',
        hr: '75',
        temp: '98.4°F',
        weight: '71.0 kg'
      },
      status: 'completed'
    },
    {
      id: 5,
      date: '2024-05-30',
      type: 'procedure',
      title: 'ECG and Echocardiogram',
      doctor: 'Dr. Sarah Johnson',
      procedure: 'Electrocardiogram and Transthoracic Echocardiogram',
      findings: `ECG: Normal sinus rhythm, no acute changes\nEcho: Normal left ventricular function, EF 60%\nNo significant valvular abnormalities`,
      recommendation: 'Continue current cardiac medications. Repeat echo in 1 year.',
      status: 'completed'
    }
  ];

  const entryTypes = [
    { key: 'all', label: 'All Records', icon: 'FileText' },
    { key: 'consultation', label: 'Consultations', icon: 'Stethoscope' },
    { key: 'lab', label: 'Lab Results', icon: 'TestTube' },
    { key: 'prescription', label: 'Prescriptions', icon: 'Pill' },
    { key: 'procedure', label: 'Procedures', icon: 'Activity' }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'consultation': return 'Stethoscope';
      case 'lab': return 'TestTube';
      case 'prescription': return 'Pill';
      case 'procedure': return 'Activity';
      default: return 'FileText';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'consultation': return 'text-primary bg-primary/10 border-primary/20';
      case 'lab': return 'text-success bg-success/10 border-success/20';
      case 'prescription': return 'text-accent bg-accent/10 border-accent/20';
      case 'procedure': return 'text-warning bg-warning/10 border-warning/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'active': return 'text-primary bg-primary/10';
      case 'pending': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const filteredHistory = filterType === 'all' 
    ? medicalHistory 
    : medicalHistory?.filter(entry => entry?.type === filterType);

  const toggleExpanded = (entryId) => {
    setExpandedEntry(expandedEntry === entryId ? null : entryId);
  };

  const renderEntryContent = (entry) => {
    const isExpanded = expandedEntry === entry?.id;

    return (
      <div className="bg-card border border-border rounded-lg medical-shadow">
        {/* Entry Header */}
        <div 
          className="p-4 cursor-pointer hover:bg-muted/50 medical-transition"
          onClick={() => toggleExpanded(entry?.id)}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${getTypeColor(entry?.type)}`}>
                <Icon name={getTypeIcon(entry?.type)} size={18} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-1">
                  <h4 className="font-semibold text-card-foreground">{entry?.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(entry?.status)}`}>
                    {entry?.status?.toUpperCase()}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>{entry?.doctor}</span>
                  {entry?.specialty && <span>• {entry?.specialty}</span>}
                  <span>• {new Date(entry.date)?.toLocaleDateString()}</span>
                </div>
                
                {entry?.chiefComplaint && !isExpanded && (
                  <p className="text-sm text-card-foreground mt-2 overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {entry?.chiefComplaint}
                  </p>
                )}
              </div>
            </div>
            
            <Icon 
              name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
              size={20} 
              className="text-muted-foreground flex-shrink-0 ml-2"
            />
          </div>
        </div>
        {/* Expanded Content */}
        {isExpanded && (
          <div className="px-4 pb-4 border-t border-border">
            <div className="pt-4 space-y-4">
              {/* Consultation Details */}
              {entry?.type === 'consultation' && (
                <>
                  {entry?.chiefComplaint && (
                    <div>
                      <h5 className="font-medium text-card-foreground mb-2">Chief Complaint</h5>
                      <p className="text-sm text-muted-foreground">{entry?.chiefComplaint}</p>
                    </div>
                  )}
                  
                  {entry?.vitals && (
                    <div>
                      <h5 className="font-medium text-card-foreground mb-2">Vital Signs</h5>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-muted rounded p-2">
                          <span className="text-xs text-muted-foreground">Blood Pressure</span>
                          <p className="font-medium text-card-foreground">{entry?.vitals?.bp}</p>
                        </div>
                        <div className="bg-muted rounded p-2">
                          <span className="text-xs text-muted-foreground">Heart Rate</span>
                          <p className="font-medium text-card-foreground">{entry?.vitals?.hr} bpm</p>
                        </div>
                        <div className="bg-muted rounded p-2">
                          <span className="text-xs text-muted-foreground">Temperature</span>
                          <p className="font-medium text-card-foreground">{entry?.vitals?.temp}</p>
                        </div>
                        <div className="bg-muted rounded p-2">
                          <span className="text-xs text-muted-foreground">Weight</span>
                          <p className="font-medium text-card-foreground">{entry?.vitals?.weight}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {entry?.diagnosis && (
                    <div>
                      <h5 className="font-medium text-card-foreground mb-2">Diagnosis</h5>
                      <p className="text-sm text-muted-foreground">{entry?.diagnosis}</p>
                    </div>
                  )}
                  
                  {entry?.treatment && (
                    <div>
                      <h5 className="font-medium text-card-foreground mb-2">Treatment Plan</h5>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">{entry?.treatment}</p>
                    </div>
                  )}
                  
                  {entry?.followUp && (
                    <div>
                      <h5 className="font-medium text-card-foreground mb-2">Follow-up</h5>
                      <p className="text-sm text-muted-foreground">{entry?.followUp}</p>
                    </div>
                  )}
                </>
              )}

              {/* Lab Results */}
              {entry?.type === 'lab' && (
                <>
                  {entry?.results && (
                    <div>
                      <h5 className="font-medium text-card-foreground mb-2">Results</h5>
                      <div className="bg-muted rounded p-3">
                        <pre className="text-sm text-card-foreground whitespace-pre-line font-mono">
                          {entry?.results}
                        </pre>
                      </div>
                    </div>
                  )}
                  
                  {entry?.interpretation && (
                    <div>
                      <h5 className="font-medium text-card-foreground mb-2">Interpretation</h5>
                      <p className="text-sm text-muted-foreground">{entry?.interpretation}</p>
                    </div>
                  )}
                </>
              )}

              {/* Prescription Details */}
              {entry?.type === 'prescription' && (
                <>
                  {entry?.medications && (
                    <div>
                      <h5 className="font-medium text-card-foreground mb-2">Medications</h5>
                      <div className="space-y-2">
                        {entry?.medications?.map((med, index) => (
                          <div key={index} className="bg-muted rounded p-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-card-foreground">{med?.name}</span>
                              <span className="text-sm text-muted-foreground">{med?.duration}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {med?.dosage} - {med?.frequency}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {entry?.notes && (
                    <div>
                      <h5 className="font-medium text-card-foreground mb-2">Notes</h5>
                      <p className="text-sm text-muted-foreground">{entry?.notes}</p>
                    </div>
                  )}
                </>
              )}

              {/* Procedure Details */}
              {entry?.type === 'procedure' && (
                <>
                  {entry?.procedure && (
                    <div>
                      <h5 className="font-medium text-card-foreground mb-2">Procedure</h5>
                      <p className="text-sm text-muted-foreground">{entry?.procedure}</p>
                    </div>
                  )}
                  
                  {entry?.findings && (
                    <div>
                      <h5 className="font-medium text-card-foreground mb-2">Findings</h5>
                      <div className="bg-muted rounded p-3">
                        <p className="text-sm text-card-foreground whitespace-pre-line">{entry?.findings}</p>
                      </div>
                    </div>
                  )}
                  
                  {entry?.recommendation && (
                    <div>
                      <h5 className="font-medium text-card-foreground mb-2">Recommendations</h5>
                      <p className="text-sm text-muted-foreground">{entry?.recommendation}</p>
                    </div>
                  )}
                </>
              )}

              {/* Actions */}
              <div className="flex items-center space-x-2 pt-2 border-t border-border">
                <Button variant="outline" size="sm" iconName="Download">
                  Export
                </Button>
                <Button variant="outline" size="sm" iconName="Share">
                  Share
                </Button>
                <Button variant="outline" size="sm" iconName="Edit">
                  Edit
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
      {/* Filter Tabs */}
      <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
        {entryTypes?.map((type) => (
          <button
            key={type?.key}
            onClick={() => setFilterType(type?.key)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium medical-transition ${
              filterType === type?.key
                ? 'bg-card text-card-foreground medical-shadow'
                : 'text-muted-foreground hover:text-card-foreground'
            }`}
          >
            <Icon name={type?.icon} size={16} />
            <span>{type?.label}</span>
          </button>
        ))}
      </div>
      {/* Timeline */}
      <div className="space-y-4">
        {filteredHistory?.length > 0 ? (
          filteredHistory?.map((entry, index) => (
            <div key={entry?.id} className="relative">
              {/* Timeline Line */}
              {index < filteredHistory?.length - 1 && (
                <div className="absolute left-5 top-16 w-0.5 h-full bg-border -z-10"></div>
              )}
              
              {renderEntryContent(entry)}
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-card-foreground mb-2">
              No {filterType === 'all' ? 'medical' : filterType} records found
            </h3>
            <p className="text-muted-foreground">
              {filterType === 'all' ?'This patient has no medical history recorded yet.'
                : `No ${filterType} records available for this patient.`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalHistoryTimeline;