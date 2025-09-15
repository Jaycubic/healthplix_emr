import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PatientVitalsChart = ({ patient }) => {
  const [selectedVital, setSelectedVital] = useState('bloodPressure');
  const [timeRange, setTimeRange] = useState('6months');

  const vitalsData = {
    bloodPressure: [
      { date: '2024-03-15', systolic: 120, diastolic: 80, time: 'Mar 15' },
      { date: '2024-04-15', systolic: 125, diastolic: 82, time: 'Apr 15' },
      { date: '2024-05-15', systolic: 118, diastolic: 78, time: 'May 15' },
      { date: '2024-06-15', systolic: 122, diastolic: 81, time: 'Jun 15' },
      { date: '2024-07-15', systolic: 119, diastolic: 79, time: 'Jul 15' },
      { date: '2024-08-15', systolic: 121, diastolic: 80, time: 'Aug 15' },
      { date: '2024-09-15', systolic: 123, diastolic: 82, time: 'Sep 15' }
    ],
    weight: [
      { date: '2024-03-15', value: 72.5, time: 'Mar 15' },
      { date: '2024-04-15', value: 71.8, time: 'Apr 15' },
      { date: '2024-05-15', value: 72.2, time: 'May 15' },
      { date: '2024-06-15', value: 71.5, time: 'Jun 15' },
      { date: '2024-07-15', value: 71.0, time: 'Jul 15' },
      { date: '2024-08-15', value: 70.8, time: 'Aug 15' },
      { date: '2024-09-15', value: 70.5, time: 'Sep 15' }
    ],
    heartRate: [
      { date: '2024-03-15', value: 72, time: 'Mar 15' },
      { date: '2024-04-15', value: 75, time: 'Apr 15' },
      { date: '2024-05-15', value: 68, time: 'May 15' },
      { date: '2024-06-15', value: 70, time: 'Jun 15' },
      { date: '2024-07-15', value: 73, time: 'Jul 15' },
      { date: '2024-08-15', value: 71, time: 'Aug 15' },
      { date: '2024-09-15', value: 69, time: 'Sep 15' }
    ],
    temperature: [
      { date: '2024-03-15', value: 98.6, time: 'Mar 15' },
      { date: '2024-04-15', value: 98.4, time: 'Apr 15' },
      { date: '2024-05-15', value: 98.7, time: 'May 15' },
      { date: '2024-06-15', value: 98.5, time: 'Jun 15' },
      { date: '2024-07-15', value: 98.8, time: 'Jul 15' },
      { date: '2024-08-15', value: 98.3, time: 'Aug 15' },
      { date: '2024-09-15', value: 98.6, time: 'Sep 15' }
    ]
  };

  const vitalTypes = [
    { key: 'bloodPressure', label: 'Blood Pressure', icon: 'Heart', unit: 'mmHg', color: '#E53935' },
    { key: 'weight', label: 'Weight', icon: 'Scale', unit: 'kg', color: '#0066CC' },
    { key: 'heartRate', label: 'Heart Rate', icon: 'Activity', unit: 'bpm', color: '#10B981' },
    { key: 'temperature', label: 'Temperature', icon: 'Thermometer', unit: '°F', color: '#F59E0B' }
  ];

  const timeRanges = [
    { key: '1month', label: '1M' },
    { key: '3months', label: '3M' },
    { key: '6months', label: '6M' },
    { key: '1year', label: '1Y' }
  ];

  const getCurrentVital = () => vitalTypes?.find(v => v?.key === selectedVital);
  const getCurrentData = () => vitalsData?.[selectedVital] || [];

  const getLatestReading = () => {
    const data = getCurrentData();
    if (data?.length === 0) return null;
    
    const latest = data?.[data?.length - 1];
    if (selectedVital === 'bloodPressure') {
      return `${latest?.systolic}/${latest?.diastolic}`;
    }
    return latest?.value;
  };

  const getVitalStatus = () => {
    const latest = getLatestReading();
    if (!latest) return { status: 'normal', color: 'text-muted-foreground' };

    switch (selectedVital) {
      case 'bloodPressure':
        const [sys, dia] = latest?.split('/')?.map(Number);
        if (sys > 140 || dia > 90) return { status: 'high', color: 'text-error' };
        if (sys < 90 || dia < 60) return { status: 'low', color: 'text-warning' };
        return { status: 'normal', color: 'text-success' };
      case 'weight':
        return { status: 'stable', color: 'text-success' };
      case 'heartRate':
        if (latest > 100) return { status: 'high', color: 'text-error' };
        if (latest < 60) return { status: 'low', color: 'text-warning' };
        return { status: 'normal', color: 'text-success' };
      default:
        return { status: 'normal', color: 'text-success' };
    }
  };

  const renderChart = () => {
    const data = getCurrentData();
    const vital = getCurrentVital();
    
    if (selectedVital === 'bloodPressure') {
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
              domain={['dataMin - 10', 'dataMax + 10']}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value, name) => [
                `${value} mmHg`,
                name === 'systolic' ? 'Systolic' : 'Diastolic'
              ]}
            />
            <Line 
              type="monotone" 
              dataKey="systolic" 
              stroke="#E53935" 
              strokeWidth={2}
              dot={{ fill: '#E53935', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#E53935', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="diastolic" 
              stroke="#F59E0B" 
              strokeWidth={2}
              dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#F59E0B', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
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
            domain={['dataMin - 5', 'dataMax + 5']}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value) => [`${value} ${vital?.unit}`, vital?.label]}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={vital?.color} 
            strokeWidth={2}
            dot={{ fill: vital?.color, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: vital?.color, strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const vitalStatus = getVitalStatus();

  return (
    <div className="bg-card border border-border rounded-lg medical-shadow">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground mb-1">
              Vital Signs Trends
            </h3>
            <p className="text-sm text-muted-foreground">
              Track patient vitals over time
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            {timeRanges?.map((range) => (
              <Button
                key={range?.key}
                variant={timeRange === range?.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeRange(range?.key)}
              >
                {range?.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Vital Type Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {vitalTypes?.map((vital) => (
            <button
              key={vital?.key}
              onClick={() => setSelectedVital(vital?.key)}
              className={`p-4 rounded-lg border medical-transition text-left ${
                selectedVital === vital?.key
                  ? 'border-primary bg-primary/5 text-primary' :'border-border bg-card hover:border-primary/50 text-card-foreground'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <Icon 
                  name={vital?.icon} 
                  size={20} 
                  color={selectedVital === vital?.key ? vital?.color : 'currentColor'}
                />
                <span className="font-medium text-sm">{vital?.label}</span>
              </div>
              
              {selectedVital === vital?.key && (
                <div className="mt-2">
                  <div className="text-lg font-semibold">
                    {getLatestReading()} {vital?.unit}
                  </div>
                  <div className={`text-xs font-medium ${vitalStatus?.color}`}>
                    {vitalStatus?.status?.toUpperCase()}
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Current Reading Summary */}
        <div className="bg-muted rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-card-foreground mb-1">
                Latest {getCurrentVital()?.label} Reading
              </h4>
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold text-card-foreground">
                  {getLatestReading()} {getCurrentVital()?.unit}
                </span>
                <span className={`text-sm font-medium px-2 py-1 rounded ${vitalStatus?.color} bg-current/10`}>
                  {vitalStatus?.status?.toUpperCase()}
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p className="text-sm font-medium text-card-foreground">
                {new Date()?.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="mb-4">
          {renderChart()}
        </div>

        {/* Chart Legend for Blood Pressure */}
        {selectedVital === 'bloodPressure' && (
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error rounded-full"></div>
              <span className="text-muted-foreground">Systolic</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-muted-foreground">Diastolic</span>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Download">
              Export Data
            </Button>
            <Button variant="outline" size="sm" iconName="Plus">
              Add Reading
            </Button>
          </div>
          
          <Button variant="ghost" size="sm" iconName="TrendingUp">
            View Detailed Analysis
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PatientVitalsChart;