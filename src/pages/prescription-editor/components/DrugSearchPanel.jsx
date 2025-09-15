import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const DrugSearchPanel = ({ onDrugSelect, selectedDrugs = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showBrandGeneric, setShowBrandGeneric] = useState('both');
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  // Mock drug database
  const drugDatabase = [
    {
      id: 'drug_001',
      brandName: 'Crocin',
      genericName: 'Paracetamol',
      strength: '500mg',
      form: 'Tablet',
      manufacturer: 'GSK',
      category: 'Analgesic',
      indication: 'Pain relief, fever reduction',
      contraindications: ['Severe liver disease', 'Alcohol dependency'],
      sideEffects: ['Nausea', 'Skin rash', 'Liver toxicity (overdose)'],
      dosageInfo: {
        adult: '500mg-1g every 4-6 hours',
        pediatric: '10-15mg/kg every 4-6 hours',
        maximum: '4g/day'
      }
    },
    {
      id: 'drug_002',
      brandName: 'Augmentin',
      genericName: 'Amoxicillin + Clavulanic Acid',
      strength: '625mg',
      form: 'Tablet',
      manufacturer: 'GSK',
      category: 'Antibiotic',
      indication: 'Bacterial infections',
      contraindications: ['Penicillin allergy', 'Severe renal impairment'],
      sideEffects: ['Diarrhea', 'Nausea', 'Skin rash'],
      dosageInfo: {
        adult: '625mg twice daily',
        pediatric: '22.5mg/kg twice daily',
        maximum: '1.25g twice daily'
      }
    },
    {
      id: 'drug_003',
      brandName: 'Metformin',
      genericName: 'Metformin HCl',
      strength: '500mg',
      form: 'Tablet',
      manufacturer: 'Various',
      category: 'Antidiabetic',
      indication: 'Type 2 diabetes mellitus',
      contraindications: ['Renal impairment', 'Metabolic acidosis'],
      sideEffects: ['GI upset', 'Metallic taste', 'Lactic acidosis (rare)'],
      dosageInfo: {
        adult: '500mg twice daily with meals',
        pediatric: 'Not recommended <10 years',
        maximum: '2g/day'
      }
    },
    {
      id: 'drug_004',
      brandName: 'Atorvastatin',
      genericName: 'Atorvastatin Calcium',
      strength: '20mg',
      form: 'Tablet',
      manufacturer: 'Pfizer',
      category: 'Statin',
      indication: 'Hypercholesterolemia',
      contraindications: ['Active liver disease', 'Pregnancy'],
      sideEffects: ['Muscle pain', 'Liver enzyme elevation', 'Headache'],
      dosageInfo: {
        adult: '10-80mg once daily',
        pediatric: 'Not recommended',
        maximum: '80mg/day'
      }
    },
    {
      id: 'drug_005',
      brandName: 'Aspirin',
      genericName: 'Acetylsalicylic Acid',
      strength: '75mg',
      form: 'Tablet',
      manufacturer: 'Bayer',
      category: 'Antiplatelet',
      indication: 'Cardiovascular protection',
      contraindications: ['Active bleeding', 'Severe asthma'],
      sideEffects: ['GI bleeding', 'Tinnitus', 'Allergic reactions'],
      dosageInfo: {
        adult: '75-100mg once daily',
        pediatric: 'Avoid in <16 years',
        maximum: '300mg/day'
      }
    }
  ];

  useEffect(() => {
    if (searchTerm?.length >= 2) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        const filtered = drugDatabase?.filter(drug => {
          const searchLower = searchTerm?.toLowerCase();
          const brandMatch = drug?.brandName?.toLowerCase()?.includes(searchLower);
          const genericMatch = drug?.genericName?.toLowerCase()?.includes(searchLower);
          const categoryMatch = drug?.category?.toLowerCase()?.includes(searchLower);
          
          return brandMatch || genericMatch || categoryMatch;
        });
        setSearchResults(filtered);
        setShowResults(true);
        setIsSearching(false);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setShowResults(false);
      setIsSearching(false);
    }
  }, [searchTerm]);

  const handleDrugSelect = (drug) => {
    onDrugSelect(drug);
    setSearchTerm('');
    setShowResults(false);
  };

  const getDisplayName = (drug) => {
    switch (showBrandGeneric) {
      case 'brand':
        return drug?.brandName;
      case 'generic':
        return drug?.genericName;
      default:
        return `${drug?.brandName} (${drug?.genericName})`;
    }
  };

  const isAlreadySelected = (drugId) => {
    return selectedDrugs?.some(drug => drug?.id === drugId);
  };

  return (
    <div className="bg-card border border-border rounded-lg medical-shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">Drug Search</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Display:</span>
          <select
            value={showBrandGeneric}
            onChange={(e) => setShowBrandGeneric(e?.target?.value)}
            className="text-sm border border-border rounded px-2 py-1 bg-input"
          >
            <option value="both">Brand + Generic</option>
            <option value="brand">Brand Only</option>
            <option value="generic">Generic Only</option>
          </select>
        </div>
      </div>
      <div className="relative" ref={searchRef}>
        <Input
          type="text"
          placeholder="Search drugs by name, generic, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          className="pr-10"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {isSearching ? (
            <Icon name="Loader2" size={16} className="animate-spin text-muted-foreground" />
          ) : (
            <Icon name="Search" size={16} className="text-muted-foreground" />
          )}
        </div>

        {/* Search Results Dropdown */}
        {showResults && searchResults?.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg medical-shadow-md z-50 max-h-80 overflow-y-auto">
            {searchResults?.map((drug) => (
              <div
                key={drug?.id}
                className={`p-3 border-b border-border last:border-b-0 hover:bg-muted cursor-pointer medical-transition ${
                  isAlreadySelected(drug?.id) ? 'opacity-50' : ''
                }`}
                onClick={() => !isAlreadySelected(drug?.id) && handleDrugSelect(drug)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-popover-foreground">
                        {getDisplayName(drug)}
                      </h4>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {drug?.strength}
                      </span>
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                        {drug?.form}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {drug?.category} • {drug?.manufacturer}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {drug?.indication}
                    </p>
                  </div>
                  {isAlreadySelected(drug?.id) && (
                    <Icon name="Check" size={16} className="text-success" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {showResults && searchResults?.length === 0 && searchTerm?.length >= 2 && !isSearching && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg medical-shadow-md z-50 p-4 text-center">
            <Icon name="Search" size={24} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No drugs found for "{searchTerm}"</p>
          </div>
        )}
      </div>
      {/* Quick Add Templates */}
      <div className="mt-4">
        <h4 className="text-sm font-medium text-card-foreground mb-2">Quick Templates</h4>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDrugSelect(drugDatabase?.[0])}
            className="text-xs"
          >
            Pain Relief
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDrugSelect(drugDatabase?.[1])}
            className="text-xs"
          >
            Antibiotic
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDrugSelect(drugDatabase?.[2])}
            className="text-xs"
          >
            Diabetes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DrugSearchPanel;