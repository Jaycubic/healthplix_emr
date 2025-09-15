import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LabResultsViewer = ({ patient }) => {
  const [selectedTest, setSelectedTest] = useState('glucose');
  const [viewMode, setViewMode] = useState('trends');
  const [selectedReport, setSelectedReport] = useState(null);

  const labResults = [
    {
      id: 1,
      date: '2024-09-10',
      testName: 'Comprehensive Metabolic Panel',
      doctor: 'Dr. Sarah Johnson',
      status: 'completed',
      reportUrl: '/reports/cmp-2024-09-10.pdf',
      results: {
        glucose: { value: 95, unit: 'mg/dL', range: '70-100', status: 'normal' },
        creatinine: { value: 1.0, unit: 'mg/dL', range: '0.6-1.2', status: 'normal' },
        bun: { value: 15, unit: 'mg/dL', range: '7-20', status: 'normal' },
        sodium: { value: 140, unit: 'mEq/L', range: '136-145', status: 'normal' },
        potassium: { value: 4.2, unit: 'mEq/L', range: '3.5-5.0', status: 'normal' },
        chloride: { value: 102, unit: 'mEq/L', range: '98-107', status: 'normal' }
      },
      interpretation: 'All metabolic parameters within normal limits. Kidney function stable.'
    },
    {
      id: 2,
      date: '2024-08-15',
      testName: 'Lipid Profile',
      doctor: 'Dr. Sarah Johnson',
      status: 'completed',
      reportUrl: '/reports/lipid-2024-08-15.pdf',
      results: {
        totalCholesterol: { value: 185, unit: 'mg/dL', range: '<200', status: 'normal' },
        hdl: { value: 55, unit: 'mg/dL', range: '>40', status: 'normal' },
        ldl: { value: 110, unit: 'mg/dL', range: '<100', status: 'borderline' },
        triglycerides: { value: 120, unit: 'mg/dL', range: '<150', status: 'normal' }
      },
      interpretation: 'Lipid profile shows improvement. LDL slightly elevated but within acceptable range.'
    },
    {
      id: 3,
      date: '2024-07-20',
      testName: 'HbA1c',
      doctor: 'Dr. Michael Chen',
      status: 'completed',
      reportUrl: '/reports/hba1c-2024-07-20.pdf',
      results: {
        hba1c: { value: 6.8, unit: '%', range: '<7.0', status: 'normal' }
      },
      interpretation: 'Diabetes control excellent. Continue current management.'
    },
    {
      id: 4,
      date: '2024-06-25',
      testName: 'Complete Blood Count',
      doctor: 'Dr. Sarah Johnson',
      status: 'completed',
      reportUrl: '/reports/cbc-2024-06-25.pdf',
      results: {
        hemoglobin: { value: 14.2, unit: 'g/dL', range: '12.0-16.0', status: 'normal' },
        hematocrit: { value: 42.5, unit: '%', range: '36-46', status: 'normal' },
        wbc: { value: 7200, unit: '/μL', range: '4500-11000', status: 'normal' },
        platelets: { value: 285000, unit: '/μL', range: '150000-450000', status: 'normal' }
      },
      interpretation: 'Complete blood count within normal parameters.'
    },
    {
      id: 5,
      date: '2024-05-30',
      testName: 'Thyroid Function Tests',
      doctor: 'Dr. Sarah Johnson',
      status: 'completed',
      reportUrl: '/reports/thyroid-2024-05-30.pdf',
      results: {
        tsh: { value: 2.1, unit: 'mIU/L', range: '0.4-4.0', status: 'normal' },
        t4: { value: 8.5, unit: 'μg/dL', range: '4.5-12.0', status: 'normal' },
        t3: { value: 150, unit: 'ng/dL', range: '80-200', status: 'normal' }
      },
      interpretation: 'Thyroid function normal. No intervention required.'
    }
  ];

  // Create trend data for charts
  const trendData = {
    glucose: [
      { date: '2024-05-30', value: 98, time: 'May 30' },
      { date: '2024-06-25', value: 102, time: 'Jun 25' },
      { date: '2024-07-20', value: 96, time: 'Jul 20' },
      { date: '2024-08-15', value: 94, time: 'Aug 15' },
      { date: '2024-09-10', value: 95, time: 'Sep 10' }
    ],
    hba1c: [
      { date: '2024-03-15', value: 7.2, time: 'Mar 15' },
      { date: '2024-05-30', value: 6.9, time: 'May 30' },
      { date: '2024-07-20', value: 6.8, time: 'Jul 20' }
    ],
    cholesterol: [
      { date: '2024-05-30', value: 195, time: 'May 30' },
      { date: '2024-08-15', value: 185, time: 'Aug 15' }
    ],
    creatinine: [
      { date: '2024-05-30', value: 1.1, time: 'May 30' },
      { date: '2024-06-25', value: 1.0, time: 'Jun 25' },
      { date: '2024-08-15', value: 1.0, time: 'Aug 15' },
      { date: '2024-09-10', value: 1.0, time: 'Sep 10' }
    ]
  };

  const testTypes = [
    { key: 'glucose', label: 'Glucose', unit: 'mg/dL', color: '#E53935' },
    { key: 'hba1c', label: 'HbA1c', unit: '%', color: '#0066CC' },
    { key: 'cholesterol', label: 'Total Cholesterol', unit: 'mg/dL', color: '#10B981' },
    { key: 'creatinine', label: 'Creatinine', unit: 'mg/dL', color: '#F59E0B' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'text-success bg-success/10 border-success/20';
      case 'borderline': return 'text-warning bg-warning/10 border-warning/20';
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'low': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const renderTrendChart = () => {
    const data = trendData?.[selectedTest] || [];
    const testType = testTypes?.find(t => t?.key === selectedTest);
    
    if (data?.length === 0) {
      return (
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          <div className="text-center">
            <Icon name="TrendingUp" size={48} className="mx-auto mb-2" />
            <p>No trend data available for {testType?.label}</p>
          </div>
        </div>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="time" 
            stroke="#6B7280"
            fontSize={12}
          />
          <YAxis 
            stroke="#6B7280"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value) => [`${value} ${testType?.unit}`, testType?.label]}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={testType?.color} 
            strokeWidth={3}
            dot={{ fill: testType?.color, strokeWidth: 2, r: 5 }}
            activeDot={{ r: 7, stroke: testType?.color, strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const renderReportDetails = (report) => {
    return (
      <div className="bg-card border border-border rounded-lg medical-shadow">
        <div className="p-6">
          {/* Report Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-card-foreground mb-1">
                {report?.testName}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>{report?.doctor}</span>
                <span>• {new Date(report.date)?.toLocaleDateString()}</span>
                <span className={`px-2 py-1 rounded-full border ${getStatusColor(report?.status)}`}>
                  {report?.status?.toUpperCase()}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="Download">
                Download PDF
              </Button>
              <Button variant="outline" size="sm" iconName="Printer">
                Print
              </Button>
            </div>
          </div>

          {/* Test Results */}
          <div className="mb-6">
            <h4 className="font-medium text-card-foreground mb-4">Test Results</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(report?.results)?.map(([key, result]) => (
                <div key={key} className="bg-muted rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-card-foreground capitalize">
                      {key?.replace(/([A-Z])/g, ' $1')?.trim()}
                    </h5>
                    <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(result?.status)}`}>
                      {result?.status?.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Value:</span>
                      <span className="font-medium text-card-foreground">
                        {result?.value} {result?.unit}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Range:</span>
                      <span className="text-sm text-muted-foreground">{result?.range}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interpretation */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="FileText" size={20} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-primary mb-2">Clinical Interpretation</h4>
                <p className="text-sm text-card-foreground">{report?.interpretation}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
          <button
            onClick={() => setViewMode('trends')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium medical-transition ${
              viewMode === 'trends' ?'bg-card text-card-foreground medical-shadow' :'text-muted-foreground hover:text-card-foreground'
            }`}
          >
            <Icon name="TrendingUp" size={16} />
            <span>Trends</span>
          </button>
          <button
            onClick={() => setViewMode('reports')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium medical-transition ${
              viewMode === 'reports' ?'bg-card text-card-foreground medical-shadow' :'text-muted-foreground hover:text-card-foreground'
            }`}
          >
            <Icon name="FileText" size={16} />
            <span>Reports</span>
          </button>
        </div>

        <Button variant="outline" iconName="Upload">
          Upload Report
        </Button>
      </div>
      {/* Trends View */}
      {viewMode === 'trends' && (
        <div className="space-y-6">
          {/* Test Type Selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {testTypes?.map((test) => (
              <button
                key={test?.key}
                onClick={() => setSelectedTest(test?.key)}
                className={`p-4 rounded-lg border medical-transition text-left ${
                  selectedTest === test?.key
                    ? 'border-primary bg-primary/5 text-primary' :'border-border bg-card hover:border-primary/50 text-card-foreground'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: test?.color }}
                  ></div>
                  <span className="font-medium text-sm">{test?.label}</span>
                </div>
                
                {selectedTest === test?.key && trendData?.[test?.key] && (
                  <div className="mt-2">
                    <div className="text-lg font-semibold">
                      {trendData?.[test?.key]?.[trendData?.[test?.key]?.length - 1]?.value} {test?.unit}
                    </div>
                    <div className="text-xs text-muted-foreground">Latest</div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Trend Chart */}
          <div className="bg-card border border-border rounded-lg medical-shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">
                  {testTypes?.find(t => t?.key === selectedTest)?.label} Trends
                </h3>
                <p className="text-sm text-muted-foreground">
                  Track changes over time
                </p>
              </div>
            </div>
            
            {renderTrendChart()}
          </div>
        </div>
      )}
      {/* Reports View */}
      {viewMode === 'reports' && (
        <div className="space-y-4">
          {selectedReport ? (
            <div>
              <Button 
                variant="ghost" 
                onClick={() => setSelectedReport(null)}
                iconName="ArrowLeft"
                iconPosition="left"
                className="mb-4"
              >
                Back to Reports
              </Button>
              {renderReportDetails(labResults?.find(r => r?.id === selectedReport))}
            </div>
          ) : (
            <>
              {labResults?.map((report) => (
                <div 
                  key={report?.id}
                  className="bg-card border border-border rounded-lg medical-shadow cursor-pointer hover:border-primary/50 medical-transition"
                  onClick={() => setSelectedReport(report?.id)}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-card-foreground">
                            {report?.testName}
                          </h4>
                          <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(report?.status)}`}>
                            {report?.status?.toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                          <span>{report?.doctor}</span>
                          <span>• {new Date(report.date)?.toLocaleDateString()}</span>
                          <span>• {Object.keys(report?.results)?.length} parameters</span>
                        </div>
                        
                        <p className="text-sm text-card-foreground line-clamp-2">
                          {report?.interpretation}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <Button variant="ghost" size="sm" iconName="Download">
                          PDF
                        </Button>
                        <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {labResults?.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="TestTube" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-card-foreground mb-2">
                    No lab reports found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    This patient has no lab results recorded yet.
                  </p>
                  <Button variant="outline" iconName="Upload">
                    Upload First Report
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LabResultsViewer;