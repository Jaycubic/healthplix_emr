import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const DrugInteractionPanel = ({ prescriptions = [], patientAllergies = [], onOverrideInteraction }) => {
  const [interactions, setInteractions] = useState([]);
  const [allergyWarnings, setAllergyWarnings] = useState([]);
  const [overrideModal, setOverrideModal] = useState(null);
  const [overrideReason, setOverrideReason] = useState('');
  const [customReason, setCustomReason] = useState('');

  const overrideReasons = [
    { value: 'clinical_benefit', label: 'Clinical benefit outweighs risk' },
    { value: 'no_alternative', label: 'No suitable alternative available' },
    { value: 'patient_monitored', label: 'Patient will be closely monitored' },
    { value: 'dose_adjusted', label: 'Dose has been adjusted appropriately' },
    { value: 'temporary_use', label: 'Temporary use only' },
    { value: 'specialist_consultation', label: 'Specialist consultation obtained' },
    { value: 'custom', label: 'Other (specify)' }
  ];

  // Mock drug interactions database
  const interactionDatabase = [
    {
      drug1: 'Metformin',
      drug2: 'Atorvastatin',
      severity: 'moderate',
      description: 'Concurrent use may increase risk of muscle-related side effects',
      mechanism: 'Both drugs can cause muscle toxicity',
      clinicalEffect: 'Increased risk of myopathy and rhabdomyolysis',
      management: 'Monitor for muscle pain, weakness, or dark urine. Consider dose adjustment.',
      references: ['Drug Interaction Database 2024']
    },
    {
      drug1: 'Aspirin',
      drug2: 'Metformin',
      severity: 'low',
      description: 'Aspirin may enhance the hypoglycemic effect of metformin',
      mechanism: 'Aspirin can affect glucose metabolism',
      clinicalEffect: 'Potential for enhanced blood glucose lowering',
      management: 'Monitor blood glucose levels more frequently',
      references: ['Clinical Pharmacology Review 2024']
    },
    {
      drug1: 'Augmentin',
      drug2: 'Atorvastatin',
      severity: 'high',
      description: 'Amoxicillin may increase atorvastatin levels significantly',
      mechanism: 'Inhibition of CYP3A4 metabolism',
      clinicalEffect: 'Increased risk of statin-induced myopathy',
      management: 'Consider temporary discontinuation of statin or dose reduction',
      references: ['FDA Drug Safety Communication 2024']
    }
  ];

  // Mock allergy database
  const allergyDatabase = [
    {
      allergen: 'Penicillin',
      relatedDrugs: ['Amoxicillin', 'Augmentin', 'Ampicillin'],
      severity: 'high',
      reaction: 'Anaphylaxis, severe skin reactions'
    },
    {
      allergen: 'Aspirin',
      relatedDrugs: ['Acetylsalicylic Acid', 'Aspirin'],
      severity: 'moderate',
      reaction: 'Bronchospasm, skin rash'
    }
  ];

  useEffect(() => {
    checkInteractions();
    checkAllergies();
  }, [prescriptions, patientAllergies]);

  const checkInteractions = () => {
    const foundInteractions = [];
    
    for (let i = 0; i < prescriptions?.length; i++) {
      for (let j = i + 1; j < prescriptions?.length; j++) {
        const drug1 = prescriptions?.[i];
        const drug2 = prescriptions?.[j];
        
        const interaction = interactionDatabase?.find(int => 
          (int?.drug1 === drug1?.genericName && int?.drug2 === drug2?.genericName) ||
          (int?.drug1 === drug2?.genericName && int?.drug2 === drug1?.genericName)
        );
        
        if (interaction) {
          foundInteractions?.push({
            id: `${drug1?.id}_${drug2?.id}`,
            drug1: drug1,
            drug2: drug2,
            ...interaction,
            isOverridden: false
          });
        }
      }
    }
    
    setInteractions(foundInteractions);
  };

  const checkAllergies = () => {
    const warnings = [];
    
    prescriptions?.forEach(prescription => {
      patientAllergies?.forEach(allergy => {
        const allergyInfo = allergyDatabase?.find(a => a?.allergen === allergy?.name);
        if (allergyInfo && allergyInfo?.relatedDrugs?.includes(prescription?.genericName)) {
          warnings?.push({
            id: `${prescription?.id}_${allergy?.name}`,
            drug: prescription,
            allergy: allergy,
            severity: allergyInfo?.severity,
            reaction: allergyInfo?.reaction
          });
        }
      });
    });
    
    setAllergyWarnings(warnings);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'text-error bg-error/10 border-error';
      case 'moderate':
        return 'text-warning bg-warning/10 border-warning';
      case 'low':
        return 'text-success bg-success/10 border-success';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high':
        return 'AlertTriangle';
      case 'moderate':
        return 'AlertCircle';
      case 'low':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  const handleOverride = (interactionId) => {
    setOverrideModal(interactionId);
    setOverrideReason('');
    setCustomReason('');
  };

  const confirmOverride = () => {
    const finalReason = overrideReason === 'custom' ? customReason : overrideReason;
    
    if (finalReason && onOverrideInteraction) {
      onOverrideInteraction(overrideModal, finalReason);
    }
    
    // Update local state
    setInteractions(prev => prev?.map(int => 
      int?.id === overrideModal 
        ? { ...int, isOverridden: true, overrideReason: finalReason, overrideDate: new Date() }
        : int
    ));
    
    setOverrideModal(null);
    setOverrideReason('');
    setCustomReason('');
  };

  const totalAlerts = interactions?.filter(int => !int?.isOverridden)?.length + allergyWarnings?.length;

  return (
    <div className="bg-card border border-border rounded-lg medical-shadow">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-card-foreground">Safety Alerts</h3>
            {totalAlerts > 0 && (
              <span className="bg-error text-error-foreground text-xs px-2 py-1 rounded-full">
                {totalAlerts}
              </span>
            )}
          </div>
          <Button variant="outline" size="sm" iconName="Shield">
            Safety Check
          </Button>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {/* Allergy Warnings */}
        {allergyWarnings?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-card-foreground mb-3 flex items-center space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-error" />
              <span>Allergy Warnings</span>
            </h4>
            <div className="space-y-2">
              {allergyWarnings?.map((warning) => (
                <div
                  key={warning?.id}
                  className={`p-3 border rounded-lg ${getSeverityColor(warning?.severity)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Icon name={getSeverityIcon(warning?.severity)} size={16} />
                        <span className="font-medium">
                          {warning?.drug?.brandName} - Allergy Alert
                        </span>
                        <span className="text-xs uppercase px-2 py-1 rounded border">
                          {warning?.severity}
                        </span>
                      </div>
                      <p className="text-sm mb-1">
                        Patient is allergic to {warning?.allergy?.name}
                      </p>
                      <p className="text-xs opacity-80">
                        Possible reaction: {warning?.reaction}
                      </p>
                    </div>
                    <Button variant="destructive" size="sm">
                      Remove Drug
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Drug Interactions */}
        {interactions?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-card-foreground mb-3 flex items-center space-x-2">
              <Icon name="Zap" size={16} className="text-warning" />
              <span>Drug Interactions</span>
            </h4>
            <div className="space-y-3">
              {interactions?.map((interaction) => (
                <div
                  key={interaction?.id}
                  className={`p-4 border rounded-lg ${
                    interaction?.isOverridden 
                      ? 'bg-muted border-muted-foreground opacity-75' 
                      : getSeverityColor(interaction?.severity)
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name={getSeverityIcon(interaction?.severity)} size={16} />
                        <span className="font-medium">
                          {interaction?.drug1?.brandName} + {interaction?.drug2?.brandName}
                        </span>
                        <span className="text-xs uppercase px-2 py-1 rounded border">
                          {interaction?.severity} Risk
                        </span>
                        {interaction?.isOverridden && (
                          <span className="text-xs bg-muted-foreground text-white px-2 py-1 rounded">
                            Overridden
                          </span>
                        )}
                      </div>
                      <p className="text-sm mb-2">{interaction?.description}</p>
                      <div className="text-xs space-y-1">
                        <p><strong>Mechanism:</strong> {interaction?.mechanism}</p>
                        <p><strong>Clinical Effect:</strong> {interaction?.clinicalEffect}</p>
                        <p><strong>Management:</strong> {interaction?.management}</p>
                      </div>
                    </div>
                    
                    {!interaction?.isOverridden && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOverride(interaction?.id)}
                      >
                        Override
                      </Button>
                    )}
                  </div>
                  
                  {interaction?.isOverridden && (
                    <div className="pt-2 border-t border-muted-foreground/20">
                      <p className="text-xs text-muted-foreground">
                        <strong>Override Reason:</strong> {interaction?.overrideReason}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <strong>Date:</strong> {new Date(interaction.overrideDate)?.toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Alerts */}
        {totalAlerts === 0 && (
          <div className="text-center py-8">
            <Icon name="Shield" size={48} className="text-success mx-auto mb-4" />
            <h4 className="text-lg font-medium text-card-foreground mb-2">All Clear</h4>
            <p className="text-muted-foreground">
              No drug interactions or allergy warnings detected
            </p>
          </div>
        )}
      </div>
      {/* Override Modal */}
      {overrideModal && (
        <div className="fixed inset-0 z-1000 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setOverrideModal(null)} />
          <div className="relative bg-card border border-border rounded-lg medical-shadow-lg max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="AlertTriangle" size={20} className="text-warning" />
                <h3 className="text-lg font-semibold text-card-foreground">Override Interaction</h3>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Please provide a reason for overriding this drug interaction warning:
              </p>
              
              <div className="space-y-4">
                <Select
                  label="Override Reason"
                  options={overrideReasons}
                  value={overrideReason}
                  onChange={setOverrideReason}
                  placeholder="Select a reason"
                  required
                />
                
                {overrideReason === 'custom' && (
                  <textarea
                    value={customReason}
                    onChange={(e) => setCustomReason(e?.target?.value)}
                    placeholder="Please specify the reason..."
                    className="w-full text-sm border border-border rounded px-3 py-2 bg-input resize-none"
                    rows={3}
                    required
                  />
                )}
              </div>
              
              <div className="flex space-x-3 mt-6">
                <Button
                  variant="default"
                  onClick={confirmOverride}
                  disabled={!overrideReason || (overrideReason === 'custom' && !customReason)}
                  className="flex-1"
                >
                  Confirm Override
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setOverrideModal(null)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrugInteractionPanel;