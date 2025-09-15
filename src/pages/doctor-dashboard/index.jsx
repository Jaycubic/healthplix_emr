import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MedicalAlertBanner from '../../components/ui/MedicalAlertBanner';
import QuickActionButton from '../../components/ui/QuickActionButton';
import SessionTimeoutWarning from '../../components/ui/SessionTimeoutWarning';
import KPICard from './components/KPICard';
import AppointmentCard from './components/AppointmentCard';
import RecentActivityCard from './components/RecentActivityCard';
import NotificationAlert from './components/NotificationAlert';
import QuickActionPanel from './components/QuickActionPanel';
import AnalyticsChart from './components/AnalyticsChart';
import CalendarWidget from './components/CalendarWidget';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showSessionWarning, setShowSessionWarning] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [alerts, setAlerts] = useState([]);

  // Mock data for KPI cards
  const kpiData = [
    {
      title: "Today\'s Appointments",
      value: "12",
      subtitle: "3 pending confirmations",
      icon: "Calendar",
      color: "primary",
      trend: { direction: "up", value: "+2", isPositive: true }
    },
    {
      title: "Pending Prescriptions",
      value: "8",
      subtitle: "Awaiting review",
      icon: "Pill",
      color: "warning",
      trend: { direction: "down", value: "-3", isPositive: true }
    },
    {
      title: "Teleconsultations",
      value: "5",
      subtitle: "2 scheduled today",
      icon: "Video",
      color: "accent",
      trend: { direction: "up", value: "+1", isPositive: true }
    },
    {
      title: "Patient Visits",
      value: "47",
      subtitle: "This week",
      icon: "Users",
      color: "success",
      trend: { direction: "up", value: "+12%", isPositive: true }
    }
  ];

  // Mock appointments data
  const todayAppointments = [
    {
      id: "apt001",
      patientName: "Sarah Johnson",
      patientId: "P12345",
      time: "09:00",
      date: "2025-09-15",
      type: "In-Person",
      status: "Confirmed",
      duration: 30,
      reason: "Routine Checkup"
    },
    {
      id: "apt002",
      patientName: "Michael Chen",
      patientId: "P12346",
      time: "10:30",
      date: "2025-09-15",
      type: "Teleconsultation",
      status: "Confirmed",
      duration: 20,
      reason: "Follow-up consultation"
    },
    {
      id: "apt003",
      patientName: "Emily Davis",
      patientId: "P12347",
      time: "14:00",
      date: "2025-09-15",
      type: "In-Person",
      status: "Pending",
      duration: 45,
      reason: "Diabetes management"
    },
    {
      id: "apt004",
      patientName: "Robert Wilson",
      patientId: "P12348",
      time: "15:30",
      date: "2025-09-15",
      type: "Teleconsultation",
      status: "Confirmed",
      duration: 25,
      reason: "Hypertension review"
    }
  ];

  // Mock recent activities
  const recentActivities = [
    {
      id: "act001",
      type: "prescription",
      title: "Prescription Created",
      description: "Created prescription for hypertension management",
      patientName: "John Smith",
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      metadata: { prescriptionCount: 3 }
    },
    {
      id: "act002",
      type: "consultation",
      title: "Teleconsultation Completed",
      description: "Video consultation session completed successfully",
      patientName: "Maria Garcia",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      metadata: { duration: 25 }
    },
    {
      id: "act003",
      type: "lab_result",
      title: "Lab Results Reviewed",
      description: "Blood work results reviewed and documented",
      patientName: "David Brown",
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      metadata: { labTests: 5 }
    },
    {
      id: "act004",
      type: "record_update",
      title: "Patient Record Updated",
      description: "Medical history and vitals updated",
      patientName: "Lisa Anderson",
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
    }
  ];

  // Mock analytics data
  const prescriptionPatternData = [
    { name: 'Mon', value: 12 },
    { name: 'Tue', value: 19 },
    { name: 'Wed', value: 15 },
    { name: 'Thu', value: 22 },
    { name: 'Fri', value: 18 },
    { name: 'Sat', value: 8 },
    { name: 'Sun', value: 5 }
  ];

  const patientRetentionData = [
    { name: 'New Patients', value: 35 },
    { name: 'Returning Patients', value: 65 },
    { name: 'Follow-ups', value: 45 },
    { name: 'Referrals', value: 15 }
  ];

  const visitVolumeData = [
    { name: 'Jan', value: 145 },
    { name: 'Feb', value: 162 },
    { name: 'Mar', value: 178 },
    { name: 'Apr', value: 195 },
    { name: 'May', value: 210 },
    { name: 'Jun', value: 225 }
  ];

  useEffect(() => {
    // Initialize notifications and alerts
    const initialNotifications = [
      {
        id: "notif001",
        type: "ddi_alert",
        severity: "critical",
        title: "Drug Interaction Alert",
        message: "High severity interaction detected between Warfarin and Aspirin",
        timestamp: new Date(Date.now() - 900000),
        details: {
          patientName: "John Smith",
          medication: "Warfarin + Aspirin",
          interaction: "Increased bleeding risk"
        },
        actionLabel: "Review Prescription"
      },
      {
        id: "notif002",
        type: "appointment_reminder",
        severity: "medium",
        title: "Appointment Reminder",
        message: "Upcoming teleconsultation in 15 minutes",
        timestamp: new Date(Date.now() - 300000),
        details: {
          patientName: "Michael Chen",
          appointmentTime: new Date(Date.now() + 900000)
        },
        actionLabel: "Join Call"
      }
    ];

    const initialAlerts = [
      {
        id: "alert001",
        severity: "warning",
        title: "System Maintenance",
        message: "Scheduled maintenance window tonight from 11 PM to 1 AM IST. Please save your work.",
        details: {
          patientName: null,
          medication: null,
          interaction: null
        },
        actions: [
          {
            label: "Learn More",
            variant: "outline",
            onClick: () => console.log("Learn more clicked")
          }
        ]
      }
    ];

    setNotifications(initialNotifications);
    setAlerts(initialAlerts);

    // Simulate session timeout warning after 5 minutes
    const sessionTimer = setTimeout(() => {
      setShowSessionWarning(true);
    }, 300000); // 5 minutes

    return () => clearTimeout(sessionTimer);
  }, []);

  const handleKPICardClick = (title) => {
    switch (title) {
      case "Today's Appointments": navigate('/patient-management');
        break;
      case "Pending Prescriptions":
        navigate('/prescription-editor');
        break;
      case "Teleconsultations":
        console.log('Opening teleconsultation interface...');
        break;
      case "Patient Visits":
        navigate('/patient-records');
        break;
      default:
        break;
    }
  };

  const handleAppointmentAction = (action, appointment) => {
    switch (action) {
      case 'view': navigate('/patient-records', { state: { patientId: appointment?.patientId } });
        break;
      case 'start': console.log('Starting teleconsultation for:', appointment?.patientName);
        break;
      default:
        break;
    }
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'new-prescription': navigate('/prescription-editor');
        break;
      case 'schedule-appointment': console.log('Opening appointment scheduler...');
        break;
      case 'start-teleconsultation': console.log('Starting teleconsultation...');
        break;
      case 'patient-search': navigate('/patient-management');
        break;
      default:
        break;
    }
  };

  const handleNotificationAction = (notification) => {
    switch (notification?.type) {
      case 'ddi_alert': navigate('/prescription-editor');
        break;
      case 'appointment_reminder': console.log('Joining teleconsultation...');
        break;
      default:
        break;
    }
  };

  const handleNotificationDismiss = (notificationId) => {
    setNotifications(prev => prev?.filter(n => n?.id !== notificationId));
  };

  const handleAlertDismiss = (alertId) => {
    setAlerts(prev => prev?.filter(a => a?.id !== alertId));
  };

  const handleDateSelect = (date) => {
    console.log('Selected date:', date);
  };

  const handleViewCalendar = () => {
    console.log('Opening full calendar view...');
  };

  const handleExtendSession = async () => {
    console.log('Extending session...');
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleLogout = () => {
    navigate('/doctor-login');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggleCollapse={setSidebarCollapsed} 
      />
      <main className={`pt-16 pb-20 lg:pb-6 medical-transition ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
      }`}>
        {/* Medical Alert Banner */}
        <MedicalAlertBanner 
          alerts={alerts}
          onDismiss={handleAlertDismiss}
        />

        <div className="p-6 space-y-6">
          {/* Welcome Section */}
          <div className="bg-card border border-border rounded-lg p-6 medical-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-card-foreground mb-2">
                  Good morning, Dr. Sarah Johnson
                </h1>
                <p className="text-muted-foreground">
                  Today is {new Date()?.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}. You have {todayAppointments?.length} appointments scheduled.
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Current Time</p>
                <p className="text-lg font-semibold text-card-foreground">
                  {new Date()?.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true 
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiData?.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi?.title}
                value={kpi?.value}
                subtitle={kpi?.subtitle}
                icon={kpi?.icon}
                color={kpi?.color}
                trend={kpi?.trend}
                onClick={() => handleKPICardClick(kpi?.title)}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Appointments and Activities */}
            <div className="lg:col-span-2 space-y-6">
              {/* Today's Appointments */}
              <div className="bg-card border border-border rounded-lg p-6 medical-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-card-foreground">Today's Appointments</h2>
                  <span className="text-sm text-muted-foreground">
                    {todayAppointments?.length} scheduled
                  </span>
                </div>
                
                <div className="space-y-4">
                  {todayAppointments?.map((appointment) => (
                    <AppointmentCard
                      key={appointment?.id}
                      appointment={appointment}
                      onViewDetails={(apt) => handleAppointmentAction('view', apt)}
                      onStartConsultation={(apt) => handleAppointmentAction('start', apt)}
                    />
                  ))}
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-card border border-border rounded-lg p-6 medical-shadow">
                <h2 className="text-lg font-semibold text-card-foreground mb-4">Recent Activities</h2>
                
                <div className="space-y-2">
                  {recentActivities?.map((activity) => (
                    <RecentActivityCard
                      key={activity?.id}
                      activity={activity}
                    />
                  ))}
                </div>
              </div>

              {/* Analytics Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnalyticsChart
                  type="bar"
                  data={prescriptionPatternData}
                  title="Weekly Prescriptions"
                  subtitle="Prescription patterns this week"
                  height={250}
                />
                
                <AnalyticsChart
                  type="line"
                  data={visitVolumeData}
                  title="Patient Visit Trends"
                  subtitle="Monthly visit volume"
                  height={250}
                />
              </div>
            </div>

            {/* Right Column - Quick Actions, Notifications, Calendar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <QuickActionPanel onAction={handleQuickAction} />

              {/* Notifications */}
              {notifications?.length > 0 && (
                <div className="bg-card border border-border rounded-lg p-6 medical-shadow">
                  <h3 className="text-lg font-semibold text-card-foreground mb-4">Notifications</h3>
                  
                  <div className="space-y-4">
                    {notifications?.map((notification) => (
                      <NotificationAlert
                        key={notification?.id}
                        notification={notification}
                        onDismiss={handleNotificationDismiss}
                        onAction={handleNotificationAction}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Calendar Widget */}
              <CalendarWidget
                appointments={todayAppointments}
                onDateSelect={handleDateSelect}
                onViewCalendar={handleViewCalendar}
              />

              {/* Patient Retention Chart */}
              <AnalyticsChart
                type="pie"
                data={patientRetentionData}
                title="Patient Distribution"
                subtitle="Current month breakdown"
                height={300}
              />
            </div>
          </div>
        </div>
      </main>
      {/* Quick Action Button */}
      <QuickActionButton onAction={handleQuickAction} />
      {/* Session Timeout Warning */}
      <SessionTimeoutWarning
        isVisible={showSessionWarning}
        timeRemaining={300}
        onExtendSession={handleExtendSession}
        onLogout={handleLogout}
        onClose={() => setShowSessionWarning(false)}
      />
    </div>
  );
};

export default DoctorDashboard;