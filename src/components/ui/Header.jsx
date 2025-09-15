import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const primaryNavItems = [
    { label: 'Dashboard', path: '/doctor-dashboard', icon: 'LayoutDashboard' },
    { label: 'Patients', path: '/patient-management', icon: 'Users' },
    { label: 'Records', path: '/patient-records', icon: 'FileText' },
    { label: 'Prescriptions', path: '/prescription-editor', icon: 'Pill' },
  ];

  const secondaryNavItems = [
    { label: 'Settings', path: '/settings', icon: 'Settings' },
    { label: 'Help', path: '/help', icon: 'HelpCircle' },
    { label: 'Profile', path: '/profile', icon: 'User' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border medical-shadow">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <Link to="/doctor-dashboard" className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="Heart" size={24} color="white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-primary">HealthPlix</span>
            <span className="text-xs text-text-secondary">EMR System</span>
          </div>
        </Link>

        {/* Primary Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {primaryNavItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium medical-transition ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-primary hover:bg-muted hover:text-primary'
              }`}
            >
              <Icon name={item?.icon} size={18} />
              <span>{item?.label}</span>
            </Link>
          ))}

          {/* More Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
              iconName="MoreHorizontal"
              className="ml-2"
            >
              More
            </Button>
            
            {isMoreMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg medical-shadow-md z-60">
                <div className="py-2">
                  {secondaryNavItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      onClick={() => setIsMoreMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted medical-transition"
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Icon name="Bell" size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full"></span>
          </Button>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-text-primary">Dr. Sarah Johnson</p>
              <p className="text-xs text-text-secondary">Cardiologist</p>
            </div>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="white" />
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
          >
            <Icon name="Menu" size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMoreMenuOpen && (
        <div className="md:hidden bg-surface border-t border-border">
          <nav className="px-4 py-3 space-y-1">
            {primaryNavItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => setIsMoreMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium medical-transition ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-primary hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </Link>
            ))}
            <hr className="my-2 border-border" />
            {secondaryNavItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => setIsMoreMenuOpen(false)}
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm text-text-primary hover:bg-muted medical-transition"
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
      {/* Overlay for mobile menu */}
      {isMoreMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden"
          onClick={() => setIsMoreMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;