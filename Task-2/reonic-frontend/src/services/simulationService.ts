import axios from "axios";

// Define the parameters for the simulation
export interface SimulationParams {
  num_chargepoints: number;
  arrival_multiplier: number;
  car_consumption: number;
  charging_power: number;
}

// Define the results of the simulation
export interface SimulationResults {
  total_energy_consumed_kwh: number;
  theoretical_max_power_demand_kw: number;
  actual_max_power_demand_kw: number;
  concurrency_factor: number;
  power_demand_over_time: number[];
  exemplary_day: number[];
  charging_events: { period: string; count: number }[];
}

// Function to run the simulation with provided params
export const runSimulation = async (params: SimulationParams): Promise<SimulationResults> => {
  const response = await axios.post<SimulationResults>('http://127.0.0.1:5000/run_simulation', params);
  return response.data; // Return the simulation results
};
