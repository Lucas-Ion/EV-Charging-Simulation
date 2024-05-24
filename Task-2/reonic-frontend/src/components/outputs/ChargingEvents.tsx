import React from 'react';

interface ChargingEventsProps {
  events: {
    daily: number;
    weekly: number;
    monthly: number;
    yearly: number;
  };
}

// Component to display the charging events
const ChargingEvents: React.FC<ChargingEventsProps> = ({ events }) => {
  return (
    <div className="p-4 bg-white rounded shadow-md text-center">
      <h2 className="text-xl font-bold mb-4">Charging Events</h2>
      <div className="mb-2">
        <strong>Daily:</strong> {Math.round(events.daily)} {/* Round the daily events to nearest whole number to stay realistc */}
      </div>
      <div className="mb-2">
        <strong>Weekly:</strong> {Math.round(events.weekly)} {/* Round the weekly events to nearest whole number to stay realistc */}
      </div>
      <div className="mb-2">
        <strong>Monthly:</strong> {Math.round(events.monthly)} {/* Round the monthly events to nearest whole number to stay realistc */}
      </div>
      <div className="mb-2">
        <strong>Yearly:</strong> {Math.round(events.yearly)} {/* Round the yearly events to nearest whole number to stay realistc */}
      </div>
    </div>
  );
};

export default ChargingEvents; // Export the component
