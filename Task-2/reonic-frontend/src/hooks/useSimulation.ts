import { useState } from 'react';
import axios from 'axios';
import { SimulationParams, SimulationResults } from '../types';

// Custom hook for simulation logic
const useSimulation = () => {
  // State to store simultion results
  const [results, setResults] = useState<SimulationResults | null>(null);
  // State to manage loading state
  const [loading, setLoading] = useState(false);

  // Function to run the simulation
  const runSimulation = async (params: SimulationParams) => {
    setLoading(true); // Set loading to true before the request
    try {
      // Make POST request to actually run the simulation
      const response = await axios.post('http://127.0.0.1:5000/run_simulation', params);
      setResults(response.data); // Set the results state with the response data
    } catch (error) {
      console.error('Simulation error:', error); // Log any errors
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  };

  // Return the results, runSimulation function, and loading state
  return { results, runSimulation, loading };
};

export default useSimulation; // Export the hook
