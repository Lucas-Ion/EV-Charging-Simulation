import React from 'react';

interface ChargingPowerInputProps {
  value: number; // Value of the charging power
  onChange: (value: number) => void; // Function to handle value change
}

// Component for charging power input field
const ChargingPowerInput: React.FC<ChargingPowerInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="chargingPower" className="block text-sm font-medium text-gray-700">
        Charging Power (kW)
      </label>
      <input
        type="number"
        id="chargingPower"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))} // Handle input change
        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-lg focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black"
      />
    </div>
  );
};

export default ChargingPowerInput; // Export the component
