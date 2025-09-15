import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const DocumentGallery = ({ patient }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  const documents = [
    {
      id: 1,
      name: 'Comprehensive Metabolic Panel Report',
      category: 'lab-reports',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2024-09-10',
      uploadedBy: 'Dr. Sarah Johnson',
      description: 'Complete metabolic panel including glucose, creatinine, and electrolytes',
      url: '/documents/cmp-report-2024-09-10.pdf',
      thumbnail: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=300&fit=crop',
      tags: ['glucose', 'creatinine', 'electrolytes', 'kidney-function']
    },
    {
      id: 2,
      name: 'ECG Report - Normal Sinus Rhythm',
      category: 'diagnostic-images',
      type: 'pdf',
      size: '1.8 MB',
      uploadDate: '2024-08-15',
      uploadedBy: 'Dr. Sarah Johnson',
      description: 'Electrocardiogram showing normal sinus rhythm with no acute changes',
      url: '/documents/ecg-report-2024-08-15.pdf',
      thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
      tags: ['ecg', 'cardiac', 'rhythm', 'normal']
    },
    {
      id: 3,
      name: 'Chest X-Ray - PA View',
      category: 'diagnostic-images',
      type: 'jpg',
      size: '3.2 MB',
      uploadDate: '2024-07-20',
      uploadedBy: 'Dr. Michael Chen',
      description: 'Posterior-anterior chest radiograph showing clear lung fields',
      url: '/documents/chest-xray-2024-07-20.jpg',
      thumbnail: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop',
      tags: ['chest', 'xray', 'lungs', 'clear']
    },
    {
      id: 4,
      name: 'Insurance Card - Front',
      category: 'insurance',
      type: 'jpg',
      size: '1.1 MB',
      uploadDate: '2024-06-25',
      uploadedBy: 'Reception Staff',
      description: 'Patient insurance card front side for billing verification',
      url: '/documents/insurance-card-front.jpg',
      thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop',
      tags: ['insurance', 'billing', 'verification']
    },
    {
      id: 5,
      name: 'Prescription History Summary',
      category: 'prescriptions',
      type: 'pdf',
      size: '890 KB',
      uploadDate: '2024-06-15',
      uploadedBy: 'Dr. Sarah Johnson',
      description: 'Complete prescription history for the past 12 months',
      url: '/documents/prescription-history-2024.pdf',
      thumbnail: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
      tags: ['prescriptions', 'medications', 'history']
    },
    {
      id: 6,
      name: 'Vaccination Record',
      category: 'medical-records',
      type: 'pdf',
      size: '1.5 MB',
      uploadDate: '2024-05-30',
      uploadedBy: 'Dr. Sarah Johnson',
      description: 'Complete vaccination history including COVID-19 and routine immunizations',
      url: '/documents/vaccination-record.pdf',
      thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
      tags: ['vaccination', 'immunization', 'covid', 'preventive']
    },
    {
      id: 7,
      name: 'Allergy Test Results',
      category: 'lab-reports',
      type: 'pdf',
      size: '2.1 MB',
      uploadDate: '2024-05-15',
      uploadedBy: 'Dr. Michael Chen',
      description: 'Comprehensive allergy panel testing for environmental and food allergens',
      url: '/documents/allergy-test-2024-05-15.pdf',
      thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
      tags: ['allergy', 'testing', 'environmental', 'food']
    },
    {
      id: 8,
      name: 'Consent Form - Teleconsultation',
      category: 'consent-forms',
      type: 'pdf',
      size: '650 KB',
      uploadDate: '2024-04-20',
      uploadedBy: 'Reception Staff',
      description: 'Signed consent form for teleconsultation services',
      url: '/documents/teleconsult-consent.pdf',
      thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop',
      tags: ['consent', 'teleconsultation', 'legal']
    }
  ];

  const categories = [
    { key: 'all', label: 'All Documents', icon: 'FileText', count: documents?.length },
    { key: 'lab-reports', label: 'Lab Reports', icon: 'TestTube', count: documents?.filter(d => d?.category === 'lab-reports')?.length },
    { key: 'diagnostic-images', label: 'Diagnostic Images', icon: 'Image', count: documents?.filter(d => d?.category === 'diagnostic-images')?.length },
    { key: 'prescriptions', label: 'Prescriptions', icon: 'Pill', count: documents?.filter(d => d?.category === 'prescriptions')?.length },
    { key: 'medical-records', label: 'Medical Records', icon: 'Heart', count: documents?.filter(d => d?.category === 'medical-records')?.length },
    { key: 'insurance', label: 'Insurance', icon: 'Shield', count: documents?.filter(d => d?.category === 'insurance')?.length },
    { key: 'consent-forms', label: 'Consent Forms', icon: 'FileCheck', count: documents?.filter(d => d?.category === 'consent-forms')?.length }
  ];

  const getFileIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'pdf': return 'FileText';
      case 'jpg': case'jpeg': case'png': return 'Image';
      case 'doc': case'docx': return 'FileText';
      default: return 'File';
    }
  };

  const getFileColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'pdf': return 'text-error bg-error/10';
      case 'jpg': case'jpeg': case'png': return 'text-success bg-success/10';
      case 'doc': case'docx': return 'text-primary bg-primary/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const filteredDocuments = selectedCategory === 'all' 
    ? documents 
    : documents?.filter(d => d?.category === selectedCategory);

  const renderDocumentCard = (document) => {
    return (
      <div 
        key={document?.id}
        className="bg-card border border-border rounded-lg medical-shadow hover:border-primary/50 medical-transition cursor-pointer"
        onClick={() => setSelectedDocument(document)}
      >
        {viewMode === 'grid' ? (
          <>
            {/* Thumbnail */}
            <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
              <Image
                src={document?.thumbnail}
                alt={document?.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getFileColor(document?.type)}`}>
                  <Icon name={getFileIcon(document?.type)} size={12} className="mr-1" />
                  {document?.type?.toUpperCase()}
                </span>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-4">
              <h4 className="font-semibold text-card-foreground mb-2 line-clamp-2">
                {document?.name}
              </h4>
              
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {document?.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{document?.size}</span>
                <span>{new Date(document.uploadDate)?.toLocaleDateString()}</span>
              </div>
              
              <div className="mt-2 text-xs text-muted-foreground">
                Uploaded by {document?.uploadedBy}
              </div>
            </div>
          </>
        ) : (
          <div className="p-4">
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getFileColor(document?.type)}`}>
                <Icon name={getFileIcon(document?.type)} size={24} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-card-foreground mb-1">
                  {document?.name}
                </h4>
                
                <p className="text-sm text-muted-foreground mb-2">
                  {document?.description}
                </p>
                
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>{document?.size}</span>
                  <span>• {new Date(document.uploadDate)?.toLocaleDateString()}</span>
                  <span>• {document?.uploadedBy}</span>
                </div>
                
                {document?.tags && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {document?.tags?.slice(0, 3)?.map((tag) => (
                      <span key={tag} className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                    {document?.tags?.length > 3 && (
                      <span className="text-muted-foreground text-xs">
                        +{document?.tags?.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" iconName="Download" />
                <Button variant="ghost" size="sm" iconName="Share" />
                <Button variant="ghost" size="sm" iconName="MoreVertical" />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderDocumentModal = () => {
    if (!selectedDocument) return null;

    return (
      <div className="fixed inset-0 z-100 flex items-center justify-center">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={() => setSelectedDocument(null)}
        />
        {/* Modal */}
        <div className="relative bg-card border border-border rounded-lg medical-shadow-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-card-foreground mb-1">
                {selectedDocument?.name}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>{selectedDocument?.size}</span>
                <span>• {new Date(selectedDocument.uploadDate)?.toLocaleDateString()}</span>
                <span>• {selectedDocument?.uploadedBy}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <Button variant="outline" size="sm" iconName="Download">
                Download
              </Button>
              <Button variant="outline" size="sm" iconName="Share">
                Share
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setSelectedDocument(null)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="space-y-6">
              {/* Preview */}
              <div className="bg-muted rounded-lg p-8 text-center">
                <div className={`w-24 h-24 rounded-lg mx-auto mb-4 flex items-center justify-center ${getFileColor(selectedDocument?.type)}`}>
                  <Icon name={getFileIcon(selectedDocument?.type)} size={48} />
                </div>
                <p className="text-muted-foreground mb-4">
                  Document preview not available. Click download to view the full document.
                </p>
                <Button variant="outline" iconName="Download">
                  Download {selectedDocument?.type?.toUpperCase()}
                </Button>
              </div>
              
              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-card-foreground mb-3">Document Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">File Type:</span>
                      <span className="text-card-foreground">{selectedDocument?.type?.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">File Size:</span>
                      <span className="text-card-foreground">{selectedDocument?.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Upload Date:</span>
                      <span className="text-card-foreground">
                        {new Date(selectedDocument.uploadDate)?.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Uploaded By:</span>
                      <span className="text-card-foreground">{selectedDocument?.uploadedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <span className="text-card-foreground capitalize">
                        {selectedDocument?.category?.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-card-foreground mb-3">Description</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {selectedDocument?.description}
                  </p>
                  
                  {selectedDocument?.tags && (
                    <>
                      <h4 className="font-medium text-card-foreground mb-3">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedDocument?.tags?.map((tag) => (
                          <span key={tag} className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Document Gallery</h3>
          <p className="text-sm text-muted-foreground">
            Manage patient documents and medical files
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md medical-transition ${
                viewMode === 'grid' ?'bg-card text-card-foreground medical-shadow' :'text-muted-foreground hover:text-card-foreground'
              }`}
            >
              <Icon name="Grid3X3" size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md medical-transition ${
                viewMode === 'list' ?'bg-card text-card-foreground medical-shadow' :'text-muted-foreground hover:text-card-foreground'
              }`}
            >
              <Icon name="List" size={16} />
            </button>
          </div>
          
          <Button variant="outline" iconName="Upload">
            Upload Document
          </Button>
        </div>
      </div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories?.map((category) => (
          <button
            key={category?.key}
            onClick={() => setSelectedCategory(category?.key)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium medical-transition ${
              selectedCategory === category?.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-card-foreground'
            }`}
          >
            <Icon name={category?.icon} size={16} />
            <span>{category?.label}</span>
            <span className="bg-current/20 text-current px-1.5 py-0.5 rounded text-xs">
              {category?.count}
            </span>
          </button>
        ))}
      </div>
      {/* Documents Grid/List */}
      <div className={
        viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' :'space-y-4'
      }>
        {filteredDocuments?.length > 0 ? (
          filteredDocuments?.map(renderDocumentCard)
        ) : (
          <div className="col-span-full text-center py-12">
            <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-card-foreground mb-2">
              No documents found
            </h3>
            <p className="text-muted-foreground mb-4">
              {selectedCategory === 'all' ?'This patient has no documents uploaded yet.'
                : `No ${categories?.find(c => c?.key === selectedCategory)?.label?.toLowerCase()} found for this patient.`
              }
            </p>
            <Button variant="outline" iconName="Upload">
              Upload First Document
            </Button>
          </div>
        )}
      </div>
      {/* Document Modal */}
      {renderDocumentModal()}
    </div>
  );
};

export default DocumentGallery;