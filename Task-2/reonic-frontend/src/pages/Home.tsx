import React, { useState, useCallback } from 'react';
import SideNav from '../components/SideNav';
import useSimulation from '../hooks/useSimulation';
import TotalEnergyCharged from '../components/outputs/TotalEnergyCharged';
import ChargingValuesChart from '../components/outputs/ChargingValuesChart';
import ExemplaryDayChart from '../components/outputs/ExemplaryDayChart';
import ChargingEvents from '../components/outputs/ChargingEvents';
import Layout from '../components/Layout';
import errorIcon from '../assets/error-icon.svg';
import { GridLoader } from 'react-spinners';

import { SimulationParams, ChargingEvents as ChargingEventsType } from '../types';

// Type guard to check if an object is of type ChargingEvents since can cause errors if not corect
const isChargingEvents = (events: unknown): events is ChargingEventsType => {
  return (
    typeof events === 'object' &&
    events !== null &&
    typeof (events as ChargingEventsType).daily === 'number' &&
    typeof (events as ChargingEventsType).weekly === 'number' &&
    typeof (events as ChargingEventsType).monthly === 'number' &&
    typeof (events as ChargingEventsType).yearly === 'number'
  );
};

// Home component
const Home: React.FC = () => {
  // State variables for the input fields and errors
  const [numChargepoints, setNumChargepoints] = useState<number>(20);
  const [arrivalMultiplier, setArrivalMultiplier] = useState<number>(100);
  const [carConsumption, setCarConsumption] = useState<number>(18);
  const [chargingPower, setChargingPower] = useState<number>(11);
  const [errors, setErrors] = useState<string[]>([]);
  const [localLoading, setLocalLoading] = useState<boolean>(false);
  const { runSimulation, results, loading } = useSimulation();

  // Validate inputs function
  const validateInputs = (): string[] => {
    const validationErrors: string[] = [];

    if (numChargepoints <= 0) validationErrors.push('Number of charge points must be greater than 0.');
    if (arrivalMultiplier < 20 || arrivalMultiplier > 200) validationErrors.push('Arrival probability multiplier must be between 20% and 200%.');
    if (carConsumption <= 0) validationErrors.push('Car consumption must be greater than 0.');
    if (chargingPower <= 0) validationErrors.push('Charging power must be greater than 0.');

    return validationErrors;
  };

  // Handle submit function
  const handleSubmit = useCallback(async () => {
    const validationErrors = validateInputs();

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    setLocalLoading(true);
    if (loading) return; // Prevent multiple submissions

    const params: SimulationParams = { 
      num_chargepoints: numChargepoints, 
      arrival_multiplier: arrivalMultiplier / 100, 
      car_consumption: carConsumption, 
      charging_power: chargingPower 
    };
    await runSimulation(params);
    setLocalLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numChargepoints, arrivalMultiplier, carConsumption, chargingPower, runSimulation, loading]);


  return (
    <Layout>
      <div className="flex min-h-screen bg-gray-100">
        {/* Side Navigation */}
        <SideNav
          numChargepoints={numChargepoints}
          setNumChargepoints={setNumChargepoints}
          arrivalMultiplier={arrivalMultiplier}
          setArrivalMultiplier={setArrivalMultiplier}
          carConsumption={carConsumption}
          setCarConsumption={setCarConsumption}
          chargingPower={chargingPower}
          setChargingPower={setChargingPower}
          handleSubmit={handleSubmit}
          loading={loading || localLoading}
        />

        {/* Main Content Area */}
        <div className="flex-grow p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {errors.length > 0 && (
            <div className="col-span-1 md:col-span-2 p-4 bg-red-100 text-red-700 rounded flex items-center">
              <img src={errorIcon} alt="Error" className="w-6 h-6 mr-2" />
              <div>
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            </div>
          )}
          {results && !localLoading ? (
            <>
              <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-4 rounded shadow-md">
                  <ChargingValuesChart data={results.daily_power_demand} />
                </div>
                <div className="bg-white p-4 rounded shadow-md">
                  <ExemplaryDayChart data={results.exemplary_day} />
                </div>
              </div>
              <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-4 rounded shadow-md flex flex-col items-center justify-center">
                  <TotalEnergyCharged energy={results.total_energy_consumed_kwh} />
                  <div className="p-4 bg-white rounded shadow-md mt-4 text-center">
                    <h2 className="text-xl font-bold mb-2">Actual Maximum Power Demand</h2>
                    <p className="text-lg">{results.actual_max_power_demand_kw.toFixed(2)} kW</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded shadow-md flex flex-col items-center justify-center">
                  {isChargingEvents(results.charging_events) && (
                    <ChargingEvents events={results.charging_events} />
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center h-full">
              <GridLoader size={15} color={"#047857"} loading={loading || localLoading} />
              {!loading && !localLoading && <p className="mt-4 text-gray-700">No results to display. Please run a simulation first.</p>}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home; // Export HOme
