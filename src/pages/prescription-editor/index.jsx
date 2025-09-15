import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import QuickActionButton from '../../components/ui/QuickActionButton';
import MedicalAlertBanner from '../../components/ui/MedicalAlertBanner';

// Import components
import DrugSearchPanel from './components/DrugSearchPanel';
import PrescriptionList from './components/PrescriptionList';
import DrugInteractionPanel from './components/DrugInteractionPanel';
import PatientInfoCard from './components/PatientInfoCard';
import QuickPrescriptionMode from './components/QuickPrescriptionMode';

const PrescriptionEditor = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [isQuickMode, setIsQuickMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock patient data
  const mockPatient = {
    id: 'PAT001',
    name: 'Rajesh Kumar',
    gender: 'Male',
    dateOfBirth: '1985-03-15',
    phone: '+91 9876543210',
    email: 'rajesh.kumar@email.com',
    lastVisit: '2024-09-10',
    allergies: [
      { name: 'Penicillin', severity: 'high', reaction: 'Anaphylaxis' },
      { name: 'Aspirin', severity: 'moderate', reaction: 'Skin rash' }
    ],
    conditions: ['Type 2 Diabetes', 'Hypertension', 'Hyperlipidemia'],
    currentMedications: [
      { name: 'Metformin', dosage: '500mg BD' },
      { name: 'Amlodipine', dosage: '5mg OD' },
      { name: 'Atorvastatin', dosage: '20mg OD' }
    ],
    vitals: {
      bloodPressure: '140/90',
      heartRate: '78',
      weight: '75',
      temperature: '98.6'
    }
  };

  // Mock alerts
  const mockAlerts = [
    {
      id: 'alert_001',
      severity: 'warning',
      title: 'Drug Interaction Alert',
      message: 'Potential interaction detected between prescribed medications',
      details: {
        patientName: 'Rajesh Kumar',
        interaction: 'Metformin + Atorvastatin'
      }
    }
  ];

  useEffect(() => {
    // Simulate loading patient data
    setIsLoading(true);
    setTimeout(() => {
      setSelectedPatient(mockPatient);
      setAlerts(mockAlerts);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleDrugSelect = (drug) => {
    const newPrescription = {
      ...drug,
      id: `prescription_${Date.now()}`,
      dosage: '',
      frequency: '',
      duration: '',
      route: 'Oral',
      instructions: '',
      addedAt: new Date()
    };
    
    setPrescriptions(prev => [...prev, newPrescription]);
  };

  const handleUpdatePrescription = (prescriptionId, updates) => {
    setPrescriptions(prev => prev?.map(p => 
      p?.id === prescriptionId ? { ...p, ...updates } : p
    ));
  };

  const handleRemovePrescription = (prescriptionId) => {
    setPrescriptions(prev => prev?.filter(p => p?.id !== prescriptionId));
  };

  const handleOverrideInteraction = (interactionId, reason) => {
    console.log('Interaction overridden:', interactionId, reason);
    // Handle interaction override logic
  };

  const handleQuickPrescription = (prescription) => {
    setPrescriptions(prev => [...prev, prescription]);
    setIsQuickMode(false);
  };

  const handleSavePrescription = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Show success message
      console.log('Prescription saved successfully');
    }, 1500);
  };

  const handleExportPDF = () => {
    console.log('Exporting prescription as PDF...');
    // Handle PDF export logic
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'new-prescription':
        setIsQuickMode(true);
        break;
      case 'drug-interaction':
        // Scroll to interaction panel
        document.getElementById('interaction-panel')?.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        console.log(`Quick action: ${actionId}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggleCollapse={setIsSidebarCollapsed} 
      />
      <main className={`pt-16 pb-20 lg:pb-8 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
      }`}>
        {/* Medical Alert Banner */}
        <MedicalAlertBanner 
          alerts={alerts}
          onDismiss={(alertId) => setAlerts(prev => prev?.filter(a => a?.id !== alertId))}
        />

        <div className="p-4 lg:p-6 max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                <Link to="/doctor-dashboard" className="hover:text-primary">Dashboard</Link>
                <Icon name="ChevronRight" size={16} />
                <span>Prescription Editor</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                Prescription Editor
              </h1>
              <p className="text-muted-foreground mt-1">
                Create and manage patient prescriptions with real-time safety checks
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button
                variant="outline"
                onClick={handleExportPDF}
                iconName="Download"
                disabled={prescriptions?.length === 0}
              >
                Export PDF
              </Button>
              <Button
                variant="default"
                onClick={handleSavePrescription}
                loading={isLoading}
                iconName="Save"
                disabled={prescriptions?.length === 0}
              >
                Save Prescription
              </Button>
            </div>
          </div>

          {/* Quick Prescription Mode */}
          <div className="mb-6">
            <QuickPrescriptionMode
              isActive={isQuickMode}
              onToggle={() => setIsQuickMode(!isQuickMode)}
              onQuickPrescription={handleQuickPrescription}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - Patient Info & Drug Search */}
            <div className="xl:col-span-1 space-y-6">
              {/* Patient Information */}
              <PatientInfoCard
                patient={selectedPatient}
                onChangePatient={() => console.log('Change patient clicked')}
              />

              {/* Drug Search Panel */}
              <DrugSearchPanel
                onDrugSelect={handleDrugSelect}
                selectedDrugs={prescriptions}
              />
            </div>

            {/* Middle Column - Prescription List */}
            <div className="xl:col-span-1">
              <PrescriptionList
                prescriptions={prescriptions}
                onUpdatePrescription={handleUpdatePrescription}
                onRemovePrescription={handleRemovePrescription}
              />
            </div>

            {/* Right Column - Drug Interactions */}
            <div className="xl:col-span-1" id="interaction-panel">
              <DrugInteractionPanel
                prescriptions={prescriptions}
                patientAllergies={selectedPatient?.allergies || []}
                onOverrideInteraction={handleOverrideInteraction}
              />
            </div>
          </div>

          {/* Mobile Stacked Layout */}
          <div className="xl:hidden mt-8">
            {/* Prescription Summary for Mobile */}
            {prescriptions?.length > 0 && (
              <div className="bg-card border border-border rounded-lg medical-shadow p-4 mb-6">
                <h3 className="text-lg font-semibold text-card-foreground mb-3">
                  Prescription Summary
                </h3>
                <div className="space-y-2">
                  {prescriptions?.map((prescription, index) => (
                    <div key={prescription?.id} className="flex items-center justify-between p-2 bg-muted rounded">
                      <div>
                        <span className="font-medium text-card-foreground">
                          {index + 1}. {prescription?.brandName}
                        </span>
                        <p className="text-sm text-muted-foreground">
                          {prescription?.dosage} {prescription?.frequency && `• ${prescription?.frequency}`}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemovePrescription(prescription?.id)}
                        iconName="X"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Bar for Mobile */}
          <div className="lg:hidden fixed bottom-16 left-0 right-0 bg-card border-t border-border p-4">
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={handleExportPDF}
                disabled={prescriptions?.length === 0}
                iconName="Download"
                className="flex-1"
              >
                Export
              </Button>
              <Button
                variant="default"
                onClick={handleSavePrescription}
                loading={isLoading}
                disabled={prescriptions?.length === 0}
                iconName="Save"
                className="flex-1"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </main>
      {/* Quick Action Button */}
      <QuickActionButton onAction={handleQuickAction} />
    </div>
  );
};

export default PrescriptionEditor;