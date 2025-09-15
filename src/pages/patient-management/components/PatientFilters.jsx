import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const PatientFilters = ({ onFiltersChange, activeFilters = {} }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: activeFilters?.dateRange || '',
    appointmentStatus: activeFilters?.appointmentStatus || '',
    condition: activeFilters?.condition || '',
    ageRange: activeFilters?.ageRange || '',
    gender: activeFilters?.gender || '',
    ...activeFilters
  });

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const appointmentStatusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'scheduled', label: 'Scheduled (45)' },
    { value: 'completed', label: 'Completed (128)' },
    { value: 'cancelled', label: 'Cancelled (12)' },
    { value: 'no-show', label: 'No Show (8)' },
    { value: 'rescheduled', label: 'Rescheduled (23)' }
  ];

  const conditionOptions = [
    { value: '', label: 'All Conditions' },
    { value: 'diabetes', label: 'Diabetes (34)' },
    { value: 'hypertension', label: 'Hypertension (56)' },
    { value: 'heart-disease', label: 'Heart Disease (23)' },
    { value: 'asthma', label: 'Asthma (18)' },
    { value: 'arthritis', label: 'Arthritis (29)' },
    { value: 'obesity', label: 'Obesity (41)' }
  ];

  const ageRangeOptions = [
    { value: '', label: 'All Ages' },
    { value: '0-18', label: 'Children (0-18)' },
    { value: '19-35', label: 'Young Adults (19-35)' },
    { value: '36-55', label: 'Adults (36-55)' },
    { value: '56-70', label: 'Seniors (56-70)' },
    { value: '70+', label: 'Elderly (70+)' }
  ];

  const genderOptions = [
    { value: '', label: 'All Genders' },
    { value: 'male', label: 'Male (142)' },
    { value: 'female', label: 'Female (168)' },
    { value: 'other', label: 'Other (3)' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFiltersChange) {
      onFiltersChange(newFilters);
    }
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      dateRange: '',
      appointmentStatus: '',
      condition: '',
      ageRange: '',
      gender: ''
    };
    setFilters(clearedFilters);
    if (onFiltersChange) {
      onFiltersChange(clearedFilters);
    }
  };

  const getActiveFilterCount = () => {
    return Object.values(filters)?.filter(value => value !== '')?.length;
  };

  return (
    <div className="bg-card border border-border rounded-lg medical-shadow">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={18} className="text-primary" />
          <h3 className="text-sm font-medium text-card-foreground">
            Patient Filters
          </h3>
          {getActiveFilterCount() > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear All
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
          </Button>
        </div>
      </div>
      {/* Filter Controls */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Date Range Filter */}
            <Select
              label="Visit Date Range"
              options={dateRangeOptions}
              value={filters?.dateRange}
              onChange={(value) => handleFilterChange('dateRange', value)}
              className="w-full"
            />

            {/* Appointment Status Filter */}
            <Select
              label="Appointment Status"
              options={appointmentStatusOptions}
              value={filters?.appointmentStatus}
              onChange={(value) => handleFilterChange('appointmentStatus', value)}
              className="w-full"
            />

            {/* Medical Condition Filter */}
            <Select
              label="Medical Condition"
              options={conditionOptions}
              value={filters?.condition}
              onChange={(value) => handleFilterChange('condition', value)}
              searchable
              className="w-full"
            />

            {/* Age Range Filter */}
            <Select
              label="Age Range"
              options={ageRangeOptions}
              value={filters?.ageRange}
              onChange={(value) => handleFilterChange('ageRange', value)}
              className="w-full"
            />

            {/* Gender Filter */}
            <Select
              label="Gender"
              options={genderOptions}
              value={filters?.gender}
              onChange={(value) => handleFilterChange('gender', value)}
              className="w-full"
            />

            {/* Custom Date Range */}
            {filters?.dateRange === 'custom' && (
              <div className="md:col-span-2 lg:col-span-1">
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="date"
                    label="From Date"
                    value={filters?.fromDate || ''}
                    onChange={(e) => handleFilterChange('fromDate', e?.target?.value)}
                  />
                  <Input
                    type="date"
                    label="To Date"
                    value={filters?.toDate || ''}
                    onChange={(e) => handleFilterChange('toDate', e?.target?.value)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Quick Filter Tags */}
          <div className="pt-4 border-t border-border">
            <p className="text-sm font-medium text-card-foreground mb-3">Quick Filters</p>
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'high-risk', label: 'High Risk Patients', count: 12 },
                { key: 'overdue', label: 'Overdue Appointments', count: 8 },
                { key: 'new-patients', label: 'New This Month', count: 23 },
                { key: 'frequent', label: 'Frequent Visitors', count: 34 },
                { key: 'chronic', label: 'Chronic Conditions', count: 67 }
              ]?.map((tag) => (
                <Button
                  key={tag?.key}
                  variant="outline"
                  size="sm"
                  onClick={() => handleFilterChange('quickFilter', tag?.key)}
                  className={`${
                    filters?.quickFilter === tag?.key 
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : ''
                  }`}
                >
                  {tag?.label} ({tag?.count})
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientFilters;