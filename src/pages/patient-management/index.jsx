import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MedicalAlertBanner from '../../components/ui/MedicalAlertBanner';
import QuickActionButton from '../../components/ui/QuickActionButton';
import PatientSearchBar from './components/PatientSearchBar';
import PatientFilters from './components/PatientFilters';
import PatientTable from './components/PatientTable';
import PatientStats from './components/PatientStats';
import PatientPagination from './components/PatientPagination';

const PatientManagement = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [selectedPatients, setSelectedPatients] = useState(new Set());

  // Mock patient data
  const mockPatients = [
    {
      id: 'P001',
      name: 'Rajesh Kumar',
      dateOfBirth: '1985-03-15',
      gender: 'male',
      phone: '+91-9876543210',
      email: 'rajesh.kumar@email.com',
      lastVisit: '2024-09-10',
      status: 'scheduled',
      riskLevel: 'low',
      conditions: ['Diabetes', 'Hypertension'],
      allergies: [{ name: 'Penicillin', severity: 'high' }]
    },
    {
      id: 'P002',
      name: 'Priya Sharma',
      dateOfBirth: '1992-07-22',
      gender: 'female',
      phone: '+91-9876543211',
      email: 'priya.sharma@email.com',
      lastVisit: '2024-09-12',
      status: 'completed',
      riskLevel: 'medium',
      conditions: ['Asthma'],
      allergies: []
    },
    {
      id: 'P003',
      name: 'Amit Patel',
      dateOfBirth: '1978-11-08',
      gender: 'male',
      phone: '+91-9876543212',
      email: 'amit.patel@email.com',
      lastVisit: '2024-08-28',
      status: 'no-show',
      riskLevel: 'high',
      conditions: ['Heart Disease', 'Diabetes'],
      allergies: [{ name: 'Aspirin', severity: 'medium' }]
    },
    {
      id: 'P004',
      name: 'Sunita Devi',
      dateOfBirth: '1965-05-12',
      gender: 'female',
      phone: '+91-9876543213',
      email: 'sunita.devi@email.com',
      lastVisit: '2024-09-14',
      status: 'completed',
      riskLevel: 'medium',
      conditions: ['Arthritis', 'Hypertension'],
      allergies: []
    },
    {
      id: 'P005',
      name: 'Vikram Singh',
      dateOfBirth: '1990-01-30',
      gender: 'male',
      phone: '+91-9876543214',
      email: 'vikram.singh@email.com',
      lastVisit: '2024-09-11',
      status: 'scheduled',
      riskLevel: 'low',
      conditions: [],
      allergies: []
    },
    {
      id: 'P006',
      name: 'Meera Joshi',
      dateOfBirth: '1988-09-18',
      gender: 'female',
      phone: '+91-9876543215',
      email: 'meera.joshi@email.com',
      lastVisit: '2024-09-13',
      status: 'cancelled',
      riskLevel: 'low',
      conditions: ['Migraine'],
      allergies: [{ name: 'Sulfa drugs', severity: 'high' }]
    },
    {
      id: 'P007',
      name: 'Arjun Reddy',
      dateOfBirth: '1982-12-05',
      gender: 'male',
      phone: '+91-9876543216',
      email: 'arjun.reddy@email.com',
      lastVisit: '2024-09-09',
      status: 'completed',
      riskLevel: 'high',
      conditions: ['Obesity', 'Sleep Apnea'],
      allergies: []
    },
    {
      id: 'P008',
      name: 'Kavya Nair',
      dateOfBirth: '1995-04-25',
      gender: 'female',
      phone: '+91-9876543217',
      email: 'kavya.nair@email.com',
      lastVisit: '2024-09-15',
      status: 'scheduled',
      riskLevel: 'low',
      conditions: [],
      allergies: []
    }
  ];

  // Mock medical alerts
  const mockAlerts = [
    {
      id: 'alert-1',
      severity: 'warning',
      title: 'Overdue Appointments',
      message: '8 patients have overdue appointments requiring follow-up.',
      details: {
        patientName: 'Multiple Patients',
        interaction: 'Appointment scheduling required'
      },
      actions: [
        {
          label: 'View List',
          variant: 'outline',
          onClick: () => console.log('View overdue appointments')
        },
        {
          label: 'Send Reminders',
          variant: 'default',
          onClick: () => console.log('Send appointment reminders')
        }
      ]
    }
  ];

  // Filter and sort patients
  const getFilteredAndSortedPatients = () => {
    let filtered = mockPatients;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered?.filter(patient =>
        patient?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        patient?.phone?.includes(searchTerm) ||
        patient?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        patient?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    // Apply other filters
    if (filters?.appointmentStatus) {
      filtered = filtered?.filter(patient => patient?.status === filters?.appointmentStatus);
    }

    if (filters?.riskLevel) {
      filtered = filtered?.filter(patient => patient?.riskLevel === filters?.riskLevel);
    }

    if (filters?.gender) {
      filtered = filtered?.filter(patient => patient?.gender === filters?.gender);
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      let aValue = a?.[sortConfig?.key];
      let bValue = b?.[sortConfig?.key];

      if (sortConfig?.key === 'name') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      } else if (sortConfig?.key === 'lastVisit') {
        aValue = new Date(aValue || '1900-01-01');
        bValue = new Date(bValue || '1900-01-01');
      } else if (sortConfig?.key === 'age') {
        aValue = new Date()?.getFullYear() - new Date(a.dateOfBirth)?.getFullYear();
        bValue = new Date()?.getFullYear() - new Date(b.dateOfBirth)?.getFullYear();
      }

      if (aValue < bValue) {
        return sortConfig?.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig?.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  };

  const filteredPatients = getFilteredAndSortedPatients();
  const totalPages = Math.ceil(filteredPatients?.length / itemsPerPage);
  const paginatedPatients = filteredPatients?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig?.key === key && prevConfig?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handlePatientAction = (action, patient) => {
    switch (action) {
      case 'view-records': navigate('/patient-records', { state: { patientId: patient?.id } });
        break;
      case 'new-prescription': navigate('/prescription-editor', { state: { patientId: patient?.id } });
        break;
      case 'schedule-appointment': console.log('Schedule appointment for:', patient?.name);
        break;
      case 'add-patient': console.log('Add new patient');
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'new-patient': console.log('Opening new patient registration form...');
        break;
      case 'import-patients': console.log('Opening patient import dialog...');
        break;
      default:
        console.log(`Quick action: ${actionId}`);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggleCollapse={setSidebarCollapsed} 
      />
      <main className={`pt-16 pb-20 lg:pb-6 medical-transition ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
      }`}>
        <div className="p-6 space-y-6">
          {/* Medical Alerts */}
          <MedicalAlertBanner 
            alerts={mockAlerts} 
            onDismiss={(alertId) => console.log('Dismiss alert:', alertId)} 
          />

          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Patient Management</h1>
              <p className="text-muted-foreground">
                Manage your patient database, appointments, and medical records
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                iconName="Upload"
                onClick={() => handleQuickAction('import-patients')}
              >
                Import Patients
              </Button>
              <Button 
                variant="default" 
                iconName="UserPlus"
                onClick={() => handleQuickAction('new-patient')}
              >
                Add New Patient
              </Button>
            </div>
          </div>

          {/* Patient Statistics */}
          <PatientStats />

          {/* Search Bar */}
          <PatientSearchBar 
            onSearch={handleSearch}
            onClear={() => handleSearch('')}
            searchValue={searchTerm}
          />

          {/* Filters */}
          <PatientFilters 
            onFiltersChange={handleFiltersChange}
            activeFilters={filters}
          />

          {/* Results Summary */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredPatients?.length === mockPatients?.length 
                ? `Showing all ${filteredPatients?.length} patients`
                : `Showing ${filteredPatients?.length} of ${mockPatients?.length} patients`
              }
            </p>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" iconName="RefreshCw">
                Refresh
              </Button>
              <Button variant="ghost" size="sm" iconName="Settings">
                View Options
              </Button>
            </div>
          </div>

          {/* Patient Table */}
          <PatientTable 
            patients={paginatedPatients}
            onPatientAction={handlePatientAction}
            sortConfig={sortConfig}
            onSort={handleSort}
          />

          {/* Pagination */}
          <PatientPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredPatients?.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      </main>
      {/* Quick Action Button */}
      <QuickActionButton onAction={handleQuickAction} />
    </div>
  );
};

export default PatientManagement;