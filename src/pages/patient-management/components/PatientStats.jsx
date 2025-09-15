import React from 'react';
import Icon from '../../../components/AppIcon';

const PatientStats = ({ stats = {} }) => {
  const defaultStats = {
    totalPatients: 313,
    newThisMonth: 23,
    scheduledToday: 12,
    overdueAppointments: 8,
    highRiskPatients: 15,
    activePatients: 287,
    ...stats
  };

  const statCards = [
    {
      title: 'Total Patients',
      value: defaultStats?.totalPatients,
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '+12 this month',
      changeType: 'positive'
    },
    {
      title: 'New This Month',
      value: defaultStats?.newThisMonth,
      icon: 'UserPlus',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: '+5 from last month',
      changeType: 'positive'
    },
    {
      title: 'Scheduled Today',
      value: defaultStats?.scheduledToday,
      icon: 'Calendar',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      change: '3 completed',
      changeType: 'neutral'
    },
    {
      title: 'Overdue Appointments',
      value: defaultStats?.overdueAppointments,
      icon: 'AlertTriangle',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      change: '-2 from yesterday',
      changeType: 'positive'
    },
    {
      title: 'High Risk Patients',
      value: defaultStats?.highRiskPatients,
      icon: 'AlertCircle',
      color: 'text-error',
      bgColor: 'bg-error/10',
      change: 'Requires attention',
      changeType: 'warning'
    },
    {
      title: 'Active Patients',
      value: defaultStats?.activePatients,
      icon: 'Activity',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '91.7% of total',
      changeType: 'neutral'
    }
  ];

  const getChangeColor = (changeType) => {
    switch (changeType) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      case 'warning':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getChangeIcon = (changeType) => {
    switch (changeType) {
      case 'positive':
        return 'TrendingUp';
      case 'negative':
        return 'TrendingDown';
      case 'warning':
        return 'AlertTriangle';
      default:
        return 'Minus';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {statCards?.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-4 medical-shadow hover:medical-shadow-md medical-transition"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 ${stat?.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
            <Icon 
              name={getChangeIcon(stat?.changeType)} 
              size={14} 
              className={getChangeColor(stat?.changeType)}
            />
          </div>
          
          <div className="space-y-1">
            <p className="text-2xl font-bold text-card-foreground">
              {stat?.value?.toLocaleString()}
            </p>
            <p className="text-sm font-medium text-card-foreground">
              {stat?.title}
            </p>
            <p className={`text-xs ${getChangeColor(stat?.changeType)}`}>
              {stat?.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PatientStats;