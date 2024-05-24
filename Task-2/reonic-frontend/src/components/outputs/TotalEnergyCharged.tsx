import React from 'react';

interface TotalEnergyChargedProps {
  energy: number; // Total energy charged in kWh
}

// Component to display the total energy charged
const TotalEnergyCharged: React.FC<TotalEnergyChargedProps> = ({ energy }) => {
  return (
    <div className="p-4 bg-white rounded shadow-md text-center">
      <h2 className="text-xl font-bold mb-2">Total Energy Charged</h2>
      <p className="text-lg">{energy.toFixed(2)} kWh</p> {/* Display the energy with 2 decimal places */}
    </div>
  );
};

export default TotalEnergyCharged; // Export the component
