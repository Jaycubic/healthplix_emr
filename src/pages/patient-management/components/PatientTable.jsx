import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PatientTable = ({ patients = [], onPatientAction, sortConfig, onSort }) => {
  const [selectedPatients, setSelectedPatients] = useState(new Set());

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedPatients(new Set(patients.map(p => p.id)));
    } else {
      setSelectedPatients(new Set());
    }
  };

  const handleSelectPatient = (patientId, checked) => {
    const newSelected = new Set(selectedPatients);
    if (checked) {
      newSelected?.add(patientId);
    } else {
      newSelected?.delete(patientId);
    }
    setSelectedPatients(newSelected);
  };

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-primary" />
      : <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  const handleSort = (column) => {
    if (onSort) {
      onSort(column);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'scheduled':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'cancelled':
        return 'bg-error/10 text-error border-error/20';
      case 'no-show':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getRiskLevelColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'high':
        return 'bg-error/10 text-error border-error/20';
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'low':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const calculateAge = (dob) => {
    if (!dob) return 'N/A';
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today?.getFullYear() - birthDate?.getFullYear();
    const monthDiff = today?.getMonth() - birthDate?.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today?.getDate() < birthDate?.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <div className="bg-card border border-border rounded-lg medical-shadow overflow-hidden">
      {/* Bulk Actions Bar */}
      {selectedPatients?.size > 0 && (
        <div className="bg-primary/5 border-b border-border px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-card-foreground">
                {selectedPatients?.size} patient{selectedPatients?.size > 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="Calendar">
                Schedule Appointments
              </Button>
              <Button variant="outline" size="sm" iconName="MessageSquare">
                Send WhatsApp
              </Button>
              <Button variant="outline" size="sm" iconName="Mail">
                Send Email
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedPatients(new Set())}
                iconName="X"
              >
                Clear
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedPatients?.size === patients?.length && patients?.length > 0}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              <th 
                className="text-left px-4 py-3 cursor-pointer hover:bg-muted medical-transition"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-card-foreground">Patient Name</span>
                  {getSortIcon('name')}
                </div>
              </th>
              <th 
                className="text-left px-4 py-3 cursor-pointer hover:bg-muted medical-transition"
                onClick={() => handleSort('age')}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-card-foreground">Age/Gender</span>
                  {getSortIcon('age')}
                </div>
              </th>
              <th className="text-left px-4 py-3">
                <span className="text-sm font-medium text-card-foreground">Contact</span>
              </th>
              <th 
                className="text-left px-4 py-3 cursor-pointer hover:bg-muted medical-transition"
                onClick={() => handleSort('lastVisit')}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-card-foreground">Last Visit</span>
                  {getSortIcon('lastVisit')}
                </div>
              </th>
              <th className="text-left px-4 py-3">
                <span className="text-sm font-medium text-card-foreground">Status</span>
              </th>
              <th className="text-left px-4 py-3">
                <span className="text-sm font-medium text-card-foreground">Risk Level</span>
              </th>
              <th className="text-center px-4 py-3">
                <span className="text-sm font-medium text-card-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {patients?.map((patient) => (
              <tr 
                key={patient?.id} 
                className="border-b border-border hover:bg-muted/30 medical-transition"
              >
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedPatients?.has(patient?.id)}
                    onChange={(e) => handleSelectPatient(patient?.id, e?.target?.checked)}
                    className="rounded border-border"
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="User" size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-card-foreground">
                        {patient?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ID: {patient?.id}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <p className="text-sm text-card-foreground">
                      {calculateAge(patient?.dateOfBirth)} years
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {patient?.gender}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <p className="text-sm text-card-foreground">
                      {patient?.phone}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {patient?.email}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <p className="text-sm text-card-foreground">
                    {formatDate(patient?.lastVisit)}
                  </p>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(patient?.status)}`}>
                    {patient?.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getRiskLevelColor(patient?.riskLevel)}`}>
                    {patient?.riskLevel}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onPatientAction('view-records', patient)}
                      title="View Records"
                    >
                      <Icon name="FileText" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onPatientAction('new-prescription', patient)}
                      title="New Prescription"
                    >
                      <Icon name="Pill" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onPatientAction('schedule-appointment', patient)}
                      title="Schedule Appointment"
                    >
                      <Icon name="Calendar" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card Layout */}
      <div className="lg:hidden">
        {patients?.map((patient) => (
          <div key={patient?.id} className="border-b border-border p-4 last:border-b-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedPatients?.has(patient?.id)}
                  onChange={(e) => handleSelectPatient(patient?.id, e?.target?.checked)}
                  className="rounded border-border"
                />
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">
                    {patient?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ID: {patient?.id}
                  </p>
                </div>
              </div>
              <div className="flex space-x-1">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(patient?.status)}`}>
                  {patient?.status}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
              <div>
                <span className="text-muted-foreground">Age/Gender:</span>
                <p className="text-card-foreground">
                  {calculateAge(patient?.dateOfBirth)} years, {patient?.gender}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Last Visit:</span>
                <p className="text-card-foreground">
                  {formatDate(patient?.lastVisit)}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Phone:</span>
                <p className="text-card-foreground">{patient?.phone}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Risk Level:</span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getRiskLevelColor(patient?.riskLevel)}`}>
                  {patient?.riskLevel}
                </span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPatientAction('view-records', patient)}
                iconName="FileText"
                iconPosition="left"
                className="flex-1"
              >
                Records
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPatientAction('new-prescription', patient)}
                iconName="Pill"
                iconPosition="left"
                className="flex-1"
              >
                Prescribe
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPatientAction('schedule-appointment', patient)}
                iconName="Calendar"
                iconPosition="left"
                className="flex-1"
              >
                Schedule
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {patients?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-card-foreground mb-2">
            No patients found
          </h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or add a new patient.
          </p>
          <Button 
            variant="default" 
            iconName="UserPlus"
            onClick={() => onPatientAction('add-patient')}
          >
            Add New Patient
          </Button>
        </div>
      )}
    </div>
  );
};

export default PatientTable;