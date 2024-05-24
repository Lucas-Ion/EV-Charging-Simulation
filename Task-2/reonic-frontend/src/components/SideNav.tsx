import React from 'react';
import ChargePointsInput from './inputs/ChargePointsInput';
import ArrivalProbabilityMultiplierInput from './inputs/ArrivalProbabilityMultiplierInput';
import CarConsumptionInput from './inputs/CarConsumptionInput';
import ChargingPowerInput from './inputs/ChargingPowerInput';
import logo from '../assets/Reonic.svg';

interface SideNavProps {
  numChargepoints: number;
  setNumChargepoints: (value: number) => void;
  arrivalMultiplier: number;
  setArrivalMultiplier: (value: number) => void;
  carConsumption: number;
  setCarConsumption: (value: number) => void;
  chargingPower: number;
  setChargingPower: (value: number) => void;
  handleSubmit: () => void;
  loading: boolean;
}

// Side navigation component
const SideNav: React.FC<SideNavProps> = ({
  numChargepoints,
  setNumChargepoints,
  arrivalMultiplier,
  setArrivalMultiplier,
  carConsumption,
  setCarConsumption,
  chargingPower,
  setChargingPower,
  handleSubmit,
  loading
}) => {
  return (
    <div className="h-screen bg-zinc-100 text-white p-4 flex flex-col items-center justify-center w-56">
      <div className="mb-8 w-full flex justify-center">
        <img src={logo} alt="Company Logo" className="max-w-full max-h-16" />
      </div>
      <div className="flex flex-col space-y-4 w-full">
        <ChargePointsInput value={numChargepoints} onChange={setNumChargepoints} />
        <ArrivalProbabilityMultiplierInput value={arrivalMultiplier} onChange={setArrivalMultiplier} />
        <CarConsumptionInput value={carConsumption} onChange={setCarConsumption} />
        <ChargingPowerInput value={chargingPower} onChange={setChargingPower} />
        <button 
          onClick={handleSubmit} 
          disabled={loading} 
          className="mt-4 p-2 bg-emerald-700 text-white rounded hover:bg-emerald-800 transition duration-300"
        >
          {loading ? 'Running...' : 'Run Simulation'}
        </button>
      </div>
    </div>
  );
};

export default SideNav; // Export the component
