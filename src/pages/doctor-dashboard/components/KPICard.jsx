import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, subtitle, icon, trend, color = 'primary', onClick }) => {
  const getColorClasses = (colorType) => {
    switch (colorType) {
      case 'success':
        return 'bg-success/10 text-success border-success/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'error':
        return 'bg-error/10 text-error border-error/20';
      case 'accent':
        return 'bg-accent/10 text-accent border-accent/20';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    if (trend?.direction === 'up') return 'TrendingUp';
    if (trend?.direction === 'down') return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (!trend) return 'text-muted-foreground';
    if (trend?.direction === 'up' && trend?.isPositive) return 'text-success';
    if (trend?.direction === 'down' && !trend?.isPositive) return 'text-success';
    if (trend?.direction === 'up' && !trend?.isPositive) return 'text-error';
    if (trend?.direction === 'down' && trend?.isPositive) return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <div 
      className={`bg-card border border-border rounded-lg p-6 medical-shadow hover:medical-shadow-md medical-transition ${
        onClick ? 'cursor-pointer hover:border-primary/30' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-2xl font-bold text-card-foreground">{value}</h3>
            {trend && (
              <div className={`flex items-center space-x-1 text-sm ${getTrendColor()}`}>
                <Icon name={getTrendIcon()} size={14} />
                <span>{trend?.value}</span>
              </div>
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(color)}`}>
          <Icon name={icon} size={24} />
        </div>
      </div>
    </div>
  );
};

export default KPICard;