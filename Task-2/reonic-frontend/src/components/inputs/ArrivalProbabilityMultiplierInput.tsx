import React from 'react';

interface ArrivalProbabilityMultiplierInputProps {
  value: number; // Value of the arrival probability multiplier
  onChange: (value: number) => void; // Function to handle value change
}

// Component for the arrival probability multipler input field
const ArrivalProbabilityMultiplierInput: React.FC<ArrivalProbabilityMultiplierInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="arrivalMultiplier" className="block text-sm font-medium text-gray-700">
        Arrival Probability Multiplier (%)
      </label>
      <input
        type="number"
        id="arrivalMultiplier"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))} // Handle input change
        className="mt-1 p-2 block w-full rounded-md border-zinc-300 shadow-lg focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black"
      />
    </div>
  );
};

export default ArrivalProbabilityMultiplierInput; // Export the component
