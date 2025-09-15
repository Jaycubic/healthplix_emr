import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PrescriptionHistory = ({ patient }) => {
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const prescriptionHistory = [
    {
      id: 1,
      date: '2024-09-10',
      doctor: 'Dr. Sarah Johnson',
      status: 'active',
      medications: [
        {
          name: 'Lisinopril',
          genericName: 'Lisinopril',
          dosage: '10mg',
          frequency: 'Once daily',
          duration: '90 days',
          instructions: 'Take with or without food. Monitor blood pressure regularly.',
          quantity: 90,
          refills: 2,
          daysSupply: 90,
          interactions: []
        },
        {
          name: 'Metformin',
          genericName: 'Metformin HCl',
          dosage: '500mg',
          frequency: 'Twice daily',
          duration: '90 days',
          instructions: 'Take with meals to reduce stomach upset.',
          quantity: 180,
          refills: 2,
          daysSupply: 90,
          interactions: []
        }
      ],
      diagnosis: 'Hypertension, Type 2 Diabetes',
      notes: 'Continue current regimen. Monitor BP and glucose levels.',
      totalCost: '₹450',
      pharmacy: 'Apollo Pharmacy',
      adherence: 95
    },
    {
      id: 2,
      date: '2024-07-20',
      doctor: 'Dr. Sarah Johnson',
      status: 'completed',
      medications: [
        {
          name: 'Lisinopril',
          genericName: 'Lisinopril',
          dosage: '5mg',
          frequency: 'Once daily',
          duration: '90 days',
          instructions: 'Take at the same time each day.',
          quantity: 90,
          refills: 1,
          daysSupply: 90,
          interactions: []
        },
        {
          name: 'Metformin',
          genericName: 'Metformin HCl',
          dosage: '500mg',
          frequency: 'Twice daily',
          duration: '90 days',
          instructions: 'Take with breakfast and dinner.',
          quantity: 180,
          refills: 1,
          daysSupply: 90,
          interactions: []
        }
      ],
      diagnosis: 'Hypertension, Type 2 Diabetes',
      notes: 'Dosage adjustment for Lisinopril based on BP readings.',
      totalCost: '₹420',
      pharmacy: 'MedPlus',
      adherence: 88
    },
    {
      id: 3,
      date: '2024-05-15',
      doctor: 'Dr. Michael Chen',
      status: 'completed',
      medications: [
        {
          name: 'Atorvastatin',
          genericName: 'Atorvastatin Calcium',
          dosage: '20mg',
          frequency: 'Once daily at bedtime',
          duration: '30 days',
          instructions: 'Take at bedtime. Avoid grapefruit juice.',
          quantity: 30,
          refills: 0,
          daysSupply: 30,
          interactions: ['Warfarin - Monitor INR closely']
        }
      ],
      diagnosis: 'Hyperlipidemia',
      notes: 'Short course to evaluate tolerance. Follow-up with lipid panel.',
      totalCost: '₹180',
      pharmacy: 'Apollo Pharmacy',
      adherence: 100
    },
    {
      id: 4,
      date: '2024-03-10',
      doctor: 'Dr. Sarah Johnson',
      status: 'discontinued',
      medications: [
        {
          name: 'Amlodipine',
          genericName: 'Amlodipine Besylate',
          dosage: '5mg',
          frequency: 'Once daily',
          duration: '30 days',
          instructions: 'Take at the same time each day.',
          quantity: 30,
          refills: 0,
          daysSupply: 30,
          interactions: []
        }
      ],
      diagnosis: 'Hypertension',
      notes: 'Discontinued due to ankle swelling. Switched to Lisinopril.',
      totalCost: '₹120',
      pharmacy: 'Local Pharmacy',
      adherence: 75,
      discontinuedReason: 'Adverse reaction - peripheral edema'
    }
  ];

  const statusOptions = [
    { key: 'all', label: 'All Prescriptions', count: prescriptionHistory?.length },
    { key: 'active', label: 'Active', count: prescriptionHistory?.filter(p => p?.status === 'active')?.length },
    { key: 'completed', label: 'Completed', count: prescriptionHistory?.filter(p => p?.status === 'completed')?.length },
    { key: 'discontinued', label: 'Discontinued', count: prescriptionHistory?.filter(p => p?.status === 'discontinued')?.length }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10 border-success/20';
      case 'completed': return 'text-primary bg-primary/10 border-primary/20';
      case 'discontinued': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getAdherenceColor = (adherence) => {
    if (adherence >= 90) return 'text-success';
    if (adherence >= 70) return 'text-warning';
    return 'text-error';
  };

  const filteredPrescriptions = filterStatus === 'all' 
    ? prescriptionHistory 
    : prescriptionHistory?.filter(p => p?.status === filterStatus);

  const renderPrescriptionCard = (prescription) => {
    const isSelected = selectedPrescription === prescription?.id;

    return (
      <div 
        key={prescription?.id}
        className={`bg-card border rounded-lg medical-shadow cursor-pointer medical-transition ${
          isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/50'
        }`}
        onClick={() => setSelectedPrescription(isSelected ? null : prescription?.id)}
      >
        {/* Prescription Header */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h4 className="font-semibold text-card-foreground">
                  Prescription #{prescription?.id}
                </h4>
                <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(prescription?.status)}`}>
                  {prescription?.status?.toUpperCase()}
                </span>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>{prescription?.doctor}</span>
                <span>• {new Date(prescription.date)?.toLocaleDateString()}</span>
                <span>• {prescription?.medications?.length} medication{prescription?.medications?.length > 1 ? 's' : ''}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {prescription?.adherence && (
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Adherence</p>
                  <p className={`text-sm font-medium ${getAdherenceColor(prescription?.adherence)}`}>
                    {prescription?.adherence}%
                  </p>
                </div>
              )}
              
              <Icon 
                name={isSelected ? 'ChevronUp' : 'ChevronDown'} 
                size={20} 
                className="text-muted-foreground"
              />
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">Diagnosis:</span>
              <p className="font-medium text-card-foreground truncate">{prescription?.diagnosis}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Total Cost:</span>
              <p className="font-medium text-card-foreground">{prescription?.totalCost}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Pharmacy:</span>
              <p className="font-medium text-card-foreground truncate">{prescription?.pharmacy}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Medications:</span>
              <p className="font-medium text-card-foreground">
                {prescription?.medications?.map(m => m?.name)?.join(', ')?.substring(0, 20)}
                {prescription?.medications?.map(m => m?.name)?.join(', ')?.length > 20 ? '...' : ''}
              </p>
            </div>
          </div>
        </div>
        {/* Expanded Details */}
        {isSelected && (
          <div className="border-t border-border p-4">
            <div className="space-y-4">
              {/* Medications List */}
              <div>
                <h5 className="font-medium text-card-foreground mb-3">Medications</h5>
                <div className="space-y-3">
                  {prescription?.medications?.map((med, index) => (
                    <div key={index} className="bg-muted rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h6 className="font-medium text-card-foreground">{med?.name}</h6>
                          <p className="text-sm text-muted-foreground">{med?.genericName}</p>
                        </div>
                        <div className="text-right text-sm">
                          <p className="font-medium text-card-foreground">{med?.dosage}</p>
                          <p className="text-muted-foreground">{med?.frequency}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-2">
                        <div>
                          <span className="text-muted-foreground">Duration:</span>
                          <p className="font-medium text-card-foreground">{med?.duration}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Quantity:</span>
                          <p className="font-medium text-card-foreground">{med?.quantity}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Refills:</span>
                          <p className="font-medium text-card-foreground">{med?.refills}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Days Supply:</span>
                          <p className="font-medium text-card-foreground">{med?.daysSupply}</p>
                        </div>
                      </div>
                      
                      <div className="mb-2">
                        <span className="text-muted-foreground text-sm">Instructions:</span>
                        <p className="text-sm text-card-foreground">{med?.instructions}</p>
                      </div>
                      
                      {med?.interactions && med?.interactions?.length > 0 && (
                        <div className="bg-warning/10 border border-warning/20 rounded p-2">
                          <div className="flex items-start space-x-2">
                            <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-warning mb-1">Drug Interactions</p>
                              {med?.interactions?.map((interaction, idx) => (
                                <p key={idx} className="text-sm text-warning/80">{interaction}</p>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-card-foreground mb-2">Doctor's Notes</h5>
                  <p className="text-sm text-muted-foreground bg-muted rounded p-3">
                    {prescription?.notes}
                  </p>
                </div>
                
                {prescription?.discontinuedReason && (
                  <div>
                    <h5 className="font-medium text-card-foreground mb-2">Discontinuation Reason</h5>
                    <p className="text-sm text-error bg-error/10 rounded p-3">
                      {prescription?.discontinuedReason}
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 pt-2 border-t border-border">
                <Button variant="outline" size="sm" iconName="Download">
                  Download PDF
                </Button>
                <Button variant="outline" size="sm" iconName="Printer">
                  Print
                </Button>
                <Button variant="outline" size="sm" iconName="RefreshCw">
                  Refill
                </Button>
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
      {/* Prescription List */}
      <div className="space-y-4">
        {filteredPrescriptions?.length > 0 ? (
          filteredPrescriptions?.map(renderPrescriptionCard)
        ) : (
          <div className="text-center py-12">
            <Icon name="Pill" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-card-foreground mb-2">
              No {filterStatus === 'all' ? '' : filterStatus} prescriptions found
            </h3>
            <p className="text-muted-foreground">
              {filterStatus === 'all' ?'This patient has no prescription history recorded yet.'
                : `No ${filterStatus} prescriptions available for this patient.`
              }
            </p>
          </div>
        )}
      </div>
      {/* Summary Stats */}
      {filteredPrescriptions?.length > 0 && (
        <div className="bg-muted rounded-lg p-4">
          <h4 className="font-medium text-card-foreground mb-3">Prescription Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Total Prescriptions:</span>
              <p className="font-medium text-card-foreground">{prescriptionHistory?.length}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Active Medications:</span>
              <p className="font-medium text-card-foreground">
                {prescriptionHistory?.filter(p => p?.status === 'active')?.reduce((sum, p) => sum + p?.medications?.length, 0)}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Average Adherence:</span>
              <p className="font-medium text-card-foreground">
                {Math.round(prescriptionHistory?.reduce((sum, p) => sum + (p?.adherence || 0), 0) / prescriptionHistory?.length)}%
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Total Spent:</span>
              <p className="font-medium text-card-foreground">
                ₹{prescriptionHistory?.reduce((sum, p) => sum + parseInt(p?.totalCost?.replace('₹', '')), 0)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrescriptionHistory;