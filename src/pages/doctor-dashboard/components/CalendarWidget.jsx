import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarWidget = ({ appointments = [], onDateSelect, onViewCalendar }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)?.getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1)?.getDay();
  };

  const getAppointmentsForDate = (date) => {
    const dateString = date?.toISOString()?.split('T')?.[0];
    return appointments?.filter(apt => apt?.date === dateString);
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate?.setMonth(prev?.getMonth() + direction);
      return newDate;
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date?.toDateString() === today?.toDateString();
  };

  const isWeekend = (date) => {
    let day = date?.getDay();
    return day === 0 || day === 6;
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days?.push(<div key={`empty-${i}`} className="h-8"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayAppointments = getAppointmentsForDate(date);
      const hasAppointments = dayAppointments?.length > 0;
      const todayClass = isToday(date) ? 'bg-primary text-primary-foreground' : '';
      const weekendClass = isWeekend(date) ? 'text-muted-foreground' : '';
      
      days?.push(
        <button
          key={day}
          onClick={() => onDateSelect?.(date)}
          className={`h-8 w-8 text-sm rounded-md hover:bg-muted medical-transition relative ${todayClass} ${weekendClass}`}
        >
          {day}
          {hasAppointments && (
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-accent rounded-full"></div>
          )}
        </button>
      );
    }

    return days;
  };

  const getUpcomingAppointments = () => {
    const today = new Date();
    return appointments?.filter(apt => new Date(apt.date) >= today)?.sort((a, b) => new Date(a.date) - new Date(b.date))?.slice(0, 3);
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const time = new Date(`2000-01-01T${timeString}`);
    return time?.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 medical-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">Calendar</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onViewCalendar}
          iconName="Calendar"
        >
          Full Calendar
        </Button>
      </div>
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateMonth(-1)}
        >
          <Icon name="ChevronLeft" size={16} />
        </Button>
        
        <h4 className="font-medium text-card-foreground">
          {currentDate?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h4>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateMonth(1)}
        >
          <Icon name="ChevronRight" size={16} />
        </Button>
      </div>
      {/* Calendar Grid */}
      <div className="mb-4">
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']?.map(day => (
            <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {renderCalendarDays()}
        </div>
      </div>
      {/* Upcoming Appointments */}
      <div className="pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-card-foreground mb-3">Upcoming Appointments</h4>
        
        {getUpcomingAppointments()?.length > 0 ? (
          <div className="space-y-2">
            {getUpcomingAppointments()?.map((appointment, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 hover:bg-muted/50 rounded-md medical-transition">
                <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-card-foreground truncate">
                    {appointment?.patientName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(appointment.date)?.toLocaleDateString()} at {formatTime(appointment?.time)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No upcoming appointments</p>
        )}
      </div>
    </div>
  );
};

export default CalendarWidget;