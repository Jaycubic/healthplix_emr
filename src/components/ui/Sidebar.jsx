import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(!isCollapsed);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/doctor-dashboard',
      icon: 'LayoutDashboard',
      description: 'Practice overview and daily metrics',
      shortcut: 'Alt+1'
    },
    {
      label: 'Patients',
      path: '/patient-management',
      icon: 'Users',
      description: 'Patient directory and management',
      shortcut: 'Alt+2'
    },
    {
      label: 'Patient Records',
      path: '/patient-records',
      icon: 'FileText',
      description: 'Medical history and records',
      shortcut: 'Alt+3'
    },
    {
      label: 'Prescriptions',
      path: '/prescription-editor',
      icon: 'Pill',
      description: 'Create and manage prescriptions',
      shortcut: 'Alt+4'
    }
  ];

  const quickActions = [
    { label: 'New Patient', icon: 'UserPlus', action: 'new-patient' },
    { label: 'Quick Prescription', icon: 'Plus', action: 'quick-prescription' },
    { label: 'Emergency Alert', icon: 'AlertTriangle', action: 'emergency' }
  ];

  const isActivePath = (path) => location?.pathname === path;

  const handleToggle = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    if (onToggleCollapse) {
      onToggleCollapse(!newState);
    }
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'new-patient':
        // Navigate to patient creation
        break;
      case 'quick-prescription':
        // Open prescription modal
        break;
      case 'emergency':
        // Trigger emergency protocol
        break;
      default:
        break;
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen bg-surface border-r border-border medical-shadow transition-all duration-300 ${
          isExpanded ? 'w-60' : 'w-16'
        } hidden lg:block`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {isExpanded && (
              <Link to="/doctor-dashboard" className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                  <Icon name="Heart" size={18} color="white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-primary">HealthPlix</span>
                  <span className="text-xs text-text-secondary">EMR System</span>
                </div>
              </Link>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggle}
              className={`${!isExpanded ? 'mx-auto' : ''}`}
            >
              <Icon name={isExpanded ? 'ChevronLeft' : 'ChevronRight'} size={16} />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`group flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium medical-transition ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground medical-shadow'
                    : 'text-text-primary hover:bg-muted hover:text-primary'
                }`}
                title={!isExpanded ? `${item?.label} (${item?.shortcut})` : ''}
              >
                <Icon name={item?.icon} size={20} />
                {isExpanded && (
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="truncate">{item?.label}</span>
                      <span className="text-xs opacity-60">{item?.shortcut}</span>
                    </div>
                    <p className="text-xs opacity-75 truncate mt-0.5">{item?.description}</p>
                  </div>
                )}
              </Link>
            ))}
          </nav>

          {/* Quick Actions */}
          {isExpanded && (
            <div className="p-4 border-t border-border">
              <h3 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-3">
                Quick Actions
              </h3>
              <div className="space-y-2">
                {quickActions?.map((action) => (
                  <Button
                    key={action?.action}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuickAction(action?.action)}
                    iconName={action?.icon}
                    iconPosition="left"
                    className="w-full justify-start text-text-primary hover:text-primary"
                  >
                    {action?.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* User Profile */}
          <div className="p-4 border-t border-border">
            {isExpanded ? (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={18} color="white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">Dr. Sarah Johnson</p>
                  <p className="text-xs text-text-secondary truncate">Cardiologist</p>
                </div>
                <Button variant="ghost" size="icon">
                  <Icon name="Settings" size={16} />
                </Button>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-border lg:hidden">
        <nav className="flex items-center justify-around px-2 py-2">
          {navigationItems?.slice(0, 3)?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg text-xs font-medium medical-transition ${
                isActivePath(item?.path)
                  ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-primary'
              }`}
            >
              <Icon name={item?.icon} size={20} />
              <span className="truncate">{item?.label}</span>
            </Link>
          ))}
          
          {/* More Menu for Mobile */}
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center space-y-1 px-3 py-2 text-xs font-medium text-text-secondary hover:text-primary"
          >
            <Icon name="MoreHorizontal" size={20} />
            <span>More</span>
          </Button>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;