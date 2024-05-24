import React from 'react';

interface CarConsumptionInputProps {
  value: number; // Value of the car's consumption
  onChange: (value: number) => void; // Function to handle value change
}

// Component for the car consumption input field
const CarConsumptionInput: React.FC<CarConsumptionInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="carConsumption" className="block text-sm font-medium text-gray-700">
        Car Consumption (kWh/100 km)
      </label>
      <input
        type="number"
        id="carConsumption"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))} // Handle input change
        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-lg focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-black"
      />
    </div>
  );
};

export default CarConsumptionInput; // Export the component
