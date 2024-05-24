import React from 'react';

interface ChargePointsInputProps {
  value: number; // Value of the number of charge points
  onChange: (value: number) => void; // Function to handle value change
}

// Component for the charge points input field
const ChargePointsInput: React.FC<ChargePointsInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="chargepoints" className="block text-sm font-medium text-gray-700">
        Number of Charge Points
      </label>
      <input
        type="number"
        id="chargepoints"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))} // Handle input change
        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-lg focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black"
      />
    </div>
  );
};

export default ChargePointsInput; // Export the component
