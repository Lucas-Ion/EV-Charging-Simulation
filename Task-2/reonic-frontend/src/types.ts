// Parameters for the simulation
export interface SimulationParams {
    num_chargepoints: number;
    arrival_multiplier: number;
    car_consumption: number;
    charging_power: number;
  }
  
  // Structure for charging events
  export interface ChargingEvents {
    daily: number;
    weekly: number;
    monthly: number;
    yearly: number;
  }
  
  // Results of the simulation
  export interface SimulationResults {
    total_energy_consumed_kwh: number;
    theoretical_max_power_demand_kw: number;
    actual_max_power_demand_kw: number;
    concurrency_factor: number;
    daily_power_demand: number[];
    exemplary_day: number[];
    charging_events: ChargingEvents;
  }
  