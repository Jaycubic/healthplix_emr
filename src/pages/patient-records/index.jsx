import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PatientContextHeader from '../../components/ui/PatientContextHeader';
import MedicalAlertBanner from '../../components/ui/MedicalAlertBanner';
import QuickActionButton from '../../components/ui/QuickActionButton';

// Import all components
import PatientVitalsChart from './components/PatientVitalsChart';
import MedicalHistoryTimeline from './components/MedicalHistoryTimeline';
import PrescriptionHistory from './components/PrescriptionHistory';
import LabResultsViewer from './components/LabResultsViewer';
import AppointmentHistory from './components/AppointmentHistory';
import DocumentGallery from './components/DocumentGallery';

const PatientRecords = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('medical-history');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock patient data - in real app, this would come from API based on patient ID
  const mockPatient = {
    id: 'P001',
    patientId: 'HP-2024-001',
    name: 'Robert Johnson',
    gender: 'Male',
    dateOfBirth: '1975-03-15',
    phone: '+91 98765 43210',
    email: 'robert.johnson@email.com',
    lastVisit: '2024-09-10',
    allergies: [
      { name: 'Penicillin', severity: 'severe' },
      { name: 'Shellfish', severity: 'moderate' }
    ],
    conditions: ['Hypertension', 'Type 2 Diabetes'],
    medications: [
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' }
    ],
    riskLevel: 'moderate'
  };

  const mockAlerts = [
    {
      id: 1,
      severity: 'warning',
      title: 'Drug Interaction Alert',
      message: 'Patient has active prescription for Lisinopril. Monitor for potential interactions with new medications.',
      details: {
        patientName: 'Robert Johnson',
        medication: 'Lisinopril 10mg',
        interaction: 'ACE inhibitor - monitor potassium levels'
      },
      actions: [
        { label: 'Review Medications', variant: 'outline', onClick: () => setActiveTab('prescriptions') },
        { label: 'Dismiss', variant: 'ghost', onClick: () => handleDismissAlert(1) }
      ]
    },
    {
      id: 2,
      severity: 'info',
      title: 'Lab Results Available',
      message: 'New comprehensive metabolic panel results are ready for review.',
      details: {
        patientName: 'Robert Johnson'
      },
      actions: [
        { label: 'View Results', variant: 'outline', onClick: () => setActiveTab('lab-results') }
      ]
    }
  ];

  const tabs = [
    { 
      id: 'medical-history', 
      label: 'Medical History', 
      icon: 'FileText',
      description: 'SOAP encounters and clinical notes'
    },
    { 
      id: 'prescriptions', 
      label: 'Prescriptions', 
      icon: 'Pill',
      description: 'Medication history and adherence'
    },
    { 
      id: 'lab-results', 
      label: 'Lab Results', 
      icon: 'TestTube',
      description: 'Laboratory reports and trends'
    },
    { 
      id: 'vitals', 
      label: 'Vital Signs', 
      icon: 'Activity',
      description: 'Vital signs tracking and charts'
    },
    { 
      id: 'appointments', 
      label: 'Appointments', 
      icon: 'Calendar',
      description: 'Appointment history and scheduling'
    },
    { 
      id: 'documents', 
      label: 'Documents', 
      icon: 'FolderOpen',
      description: 'Medical documents and files'
    }
  ];

  useEffect(() => {
    // Simulate loading patient data
    const patientId = searchParams?.get('patientId');
    
    setTimeout(() => {
      setSelectedPatient(mockPatient);
      setAlerts(mockAlerts);
      setIsLoading(false);
    }, 1000);

    // Set initial tab from URL params
    const tab = searchParams?.get('tab');
    if (tab && tabs?.find(t => t?.id === tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // Update URL without navigation
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams?.set('tab', tabId);
    window.history?.replaceState({}, '', `${window.location?.pathname}?${newSearchParams}`);
  };

  const handleDismissAlert = (alertId) => {
    setAlerts(prev => prev?.filter(alert => alert?.id !== alertId));
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'new-record': navigate('/prescription-editor', { 
          state: { 
            patientId: selectedPatient?.id,
            mode: 'encounter' 
          } 
        });
        break;
      case 'quick-prescription': navigate('/prescription-editor', { 
          state: { 
            patientId: selectedPatient?.id,
            mode: 'prescription' 
          } 
        });
        break;
      case 'upload-document':
        setActiveTab('documents');
        break;
      default:
        console.log(`Quick action: ${actionId}`);
    }
  };

  const renderTabContent = () => {
    if (!selectedPatient) return null;

    switch (activeTab) {
      case 'medical-history':
        return <MedicalHistoryTimeline patient={selectedPatient} />;
      case 'prescriptions':
        return <PrescriptionHistory patient={selectedPatient} />;
      case 'lab-results':
        return <LabResultsViewer patient={selectedPatient} />;
      case 'vitals':
        return <PatientVitalsChart patient={selectedPatient} />;
      case 'appointments':
        return <AppointmentHistory patient={selectedPatient} />;
      case 'documents':
        return <DocumentGallery patient={selectedPatient} />;
      default:
        return <MedicalHistoryTimeline patient={selectedPatient} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading patient records...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Medical Alerts */}
      <MedicalAlertBanner 
        alerts={alerts} 
        onDismiss={handleDismissAlert}
      />
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Patient Context Header */}
        {selectedPatient && (
          <PatientContextHeader 
            patient={selectedPatient}
            showActions={true}
            onClose={() => navigate(-1)}
          />
        )}

        {/* Navigation Tabs */}
        <div className="bg-card border border-border rounded-lg medical-shadow">
          {/* Desktop Tabs */}
          <div className="hidden md:block border-b border-border">
            <nav className="flex space-x-8 px-6">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => handleTabChange(tab?.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm medical-transition ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-card-foreground hover:border-muted-foreground'
                  }`}
                >
                  <Icon name={tab?.icon} size={18} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Mobile Tab Selector */}
          <div className="md:hidden p-4 border-b border-border">
            <div className="relative">
              <select
                value={activeTab}
                onChange={(e) => handleTabChange(e?.target?.value)}
                className="w-full p-3 bg-muted border border-border rounded-lg text-card-foreground font-medium appearance-none pr-10"
              >
                {tabs?.map((tab) => (
                  <option key={tab?.id} value={tab?.id}>
                    {tab?.label}
                  </option>
                ))}
              </select>
              <Icon 
                name="ChevronDown" 
                size={20} 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
            </div>
            
            {/* Active Tab Description */}
            <div className="mt-3 flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name={tabs?.find(t => t?.id === activeTab)?.icon} size={16} />
              <span>{tabs?.find(t => t?.id === activeTab)?.description}</span>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>

        {/* Quick Actions for Mobile */}
        <div className="md:hidden">
          <div className="grid grid-cols-3 gap-3">
            <Button 
              variant="outline" 
              size="sm"
              iconName="FileText"
              onClick={() => handleQuickAction('new-record')}
            >
              New Record
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              iconName="Pill"
              onClick={() => handleQuickAction('quick-prescription')}
            >
              Prescribe
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              iconName="Upload"
              onClick={() => handleQuickAction('upload-document')}
            >
              Upload
            </Button>
          </div>
        </div>
      </div>
      {/* Quick Action Button */}
      <QuickActionButton onAction={handleQuickAction} />
    </div>
  );
};

export default PatientRecords;