# Overview:
# The program below uses the values as defined in Task 1. It first begins by taking the probabilites in T1 and expanding them
# to be able to span over increments of 15 (since there are 4 segments of 15 in an hour) we expand the arrival probabilities by 4.
# I then took the values of T2 and performed a conversion to kWh to allow me to perform the correct power demand calculations
# I use the power_demand to calculate the actual max power demand and the total energy cosumed giving me the ability to calculate the 
# required subequent values for the task.

# The program iterates over every tick, and finds the "time in day" by perfoming the modulo operation, it then uses the random method
# in NumPy to see if a car "arrives". If it does, a random energy demand is also generated based on the probabilities of T2 and the subsequent chargepoint gets a charging time
# if the chargepoint is not free the power demand is updaed, and once the charging is "complete", the charger is free for allocation again.
# This happends for every charge point for every tick

import numpy as np

def run_simulation(num_chargepoints=20, intervals=35040, charging_speed=11, km_to_kwh_conversion=0.18, arrival_probabilities_per_hour=None, charging_demands_km=None, charging_probabilities=None):
    # Default values for arrival probabilities if not changed
    if arrival_probabilities_per_hour is None:
        arrival_probabilities_per_hour = np.array([
            0.0094, 0.0094, 0.0094, 0.0094,
            0.0094, 0.0094, 0.0094, 0.0094,
            0.0283, 0.0283, 0.0566, 0.0566,
            0.0566, 0.0755, 0.0755, 0.0755,
            0.1038, 0.1038, 0.1038, 0.0472,
            0.0472, 0.0472, 0.0094, 0.0094
        ])

    # Default values for charging demands and probabilities if not changed
    if charging_demands_km is None:
        charging_demands_km = np.array([0, 5, 10, 20, 30, 50, 100, 200, 300])
    
    # Set default values for charging probabilities if not provided
    if charging_probabilities is None:
        charging_probabilities = np.array([0.3431, 0.049, 0.098, 0.1176, 0.0882, 0.1176, 0.1078, 0.049, 0.0294])

    # Expand hourly probabilities to 15-minute intervals
    arrival_probabilities = np.repeat(arrival_probabilities_per_hour, 4)

    # Normalize charging probabilities if they do not sum to exactly 1
    if not np.isclose(np.sum(charging_probabilities), 1):
        charging_probabilities = charging_probabilities / np.sum(charging_probabilities)

    # Convert charging demands from km to kWh
    charging_demands_kwh = charging_demands_km * km_to_kwh_conversion

    # Initialize values
    chargepoints, power_demand, energy_consumed, actual_max_power_demand = np.zeros(num_chargepoints), np.zeros(intervals), 0, 0

    # Simulation loop to iterate through each interval
    for interval in range(intervals):
        interval_in_day = interval % 96

        for charger in range(num_chargepoints):
            if chargepoints[charger] == 0:  # Charger is free
                if np.random.rand() < arrival_probabilities[interval_in_day]:  # Check if an EV arrives
                    energy_need_kwh = np.random.choice(charging_demands_kwh, p=charging_probabilities)  # Determine energy need
                    charging_time = int(energy_need_kwh / charging_speed) * 4  # Convert hours to 15-minute intervals
                    chargepoints[charger] = charging_time

            if chargepoints[charger] > 0:
                # Charger is occupied
                power_demand[interval] += charging_speed
                chargepoints[charger] -= 1

        # Update actual max power demand
        actual_max_power_demand = max(actual_max_power_demand, power_demand[interval])
        # Accumulate total energy
        energy_consumed += power_demand[interval] * (15 / 60)  # Convert power to energy

    # Calculate results
    total_energy_consumed_kwh = energy_consumed
    concurrency_factor = actual_max_power_demand / (num_chargepoints * charging_speed)

    return {
        "total_energy_consumed_kwh": total_energy_consumed_kwh,
        "theoretical_max_power_demand_kw": num_chargepoints * charging_speed,
        "actual_max_power_demand_kw": actual_max_power_demand,
        "concurrency_factor": concurrency_factor
    }

if __name__ == '__main__':
    # Run simulation with default parameters and print results
    results = run_simulation()
    print("Total Energy Consumed (kWh):", results["total_energy_consumed_kwh"])
    print("Theoretical Maximum Power Demand (kW):", results["theoretical_max_power_demand_kw"])
    print("Actual Maximum Power Demand (kW):", results["actual_max_power_demand_kw"])
    print("Concurrency Factor:", results["concurrency_factor"])
