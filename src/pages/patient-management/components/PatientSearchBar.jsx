import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const PatientSearchBar = ({ onSearch, onClear, searchValue = '' }) => {
  const [searchTerm, setSearchTerm] = useState(searchValue);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Mock patient suggestions for typeahead
  const mockSuggestions = [
    { id: 'P001', name: 'John Smith', phone: '+91-9876543210', type: 'name' },
    { id: 'P002', name: 'Sarah Johnson', phone: '+91-9876543211', type: 'name' },
    { id: 'P003', name: 'Michael Brown', phone: '+91-9876543212', type: 'name' },
    { id: 'P004', name: 'Emily Davis', phone: '+91-9876543213', type: 'name' },
    { id: 'P005', name: 'David Wilson', phone: '+91-9876543214', type: 'name' }
  ];

  useEffect(() => {
    if (searchTerm?.length >= 2) {
      const filtered = mockSuggestions?.filter(patient =>
        patient?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        patient?.phone?.includes(searchTerm) ||
        patient?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion?.name);
    setShowSuggestions(false);
    if (onSearch) {
      onSearch(suggestion?.name);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setShowSuggestions(false);
    if (onClear) {
      onClear();
    }
  };

  const handleKeyDown = (e) => {
    if (e?.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-3">
        <div className="relative flex-1">
          <Input
            type="search"
            placeholder="Search patients by name, phone, or ID..."
            value={searchTerm}
            onChange={(e) => handleSearch(e?.target?.value)}
            onKeyDown={handleKeyDown}
            className="pl-10"
          />
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
            >
              <Icon name="X" size={14} />
            </Button>
          )}
        </div>
        
        <Button variant="outline" iconName="Filter">
          Filters
        </Button>
        
        <Button variant="outline" iconName="Download">
          Export
        </Button>
      </div>
      {/* Typeahead Suggestions */}
      {showSuggestions && suggestions?.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover border border-border rounded-lg medical-shadow-md max-h-60 overflow-y-auto">
          {suggestions?.map((suggestion) => (
            <div
              key={suggestion?.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="flex items-center justify-between px-4 py-3 hover:bg-muted cursor-pointer medical-transition"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={14} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-popover-foreground">
                    {suggestion?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {suggestion?.phone} • ID: {suggestion?.id}
                  </p>
                </div>
              </div>
              <Icon name="ArrowRight" size={14} className="text-muted-foreground" />
            </div>
          ))}
        </div>
      )}
      {/* Overlay to close suggestions */}
      {showSuggestions && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </div>
  );
};

export default PatientSearchBar;