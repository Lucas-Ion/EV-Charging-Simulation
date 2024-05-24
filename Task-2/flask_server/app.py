from flask import Flask, request, jsonify
from charging_sim import run_simulation
import numpy as np
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)

    @app.route('/run_simulation', methods=['POST'])
    def simulation():
        data = request.json
        # Retrieve parameters from the request, with default values if not provided
        num_chargepoints = data.get('num_chargepoints', 20)
        arrival_multiplier = data.get('arrival_multiplier', 1.0)
        car_consumption = data.get('car_consumption', 18)
        charging_power = data.get('charging_power', 11)

        # Define arrival probabilities per hour and apply the arrival multiplier
        arrival_probabilities_per_hour = np.array([
            0.0094, 0.0094, 0.0094, 0.0094,
            0.0094, 0.0094, 0.0094, 0.0094,
            0.0283, 0.0283, 0.0566, 0.0566,
            0.0566, 0.0755, 0.0755, 0.0755,
            0.1038, 0.1038, 0.1038, 0.0472,
            0.0472, 0.0472, 0.0094, 0.0094
        ]) * arrival_multiplier

        # Define charging demands and probabilities
        charging_demands_km = np.array([0, 5, 10, 20, 30, 50, 100, 200, 300])
        charging_probabilities = np.array([0.3431, 0.049, 0.098, 0.1176, 0.0882, 0.1176, 0.1078, 0.049, 0.0294])

        # Run the simulation with the provided parameters
        results = run_simulation(
            num_chargepoints=num_chargepoints,
            charging_speed=charging_power,
            km_to_kwh_conversion=car_consumption / 100,
            arrival_probabilities_per_hour=arrival_probabilities_per_hour,
            charging_demands_km=charging_demands_km,
            charging_probabilities=charging_probabilities
        )

        # Return the simulation results as a JSON response
        return jsonify(results)

    return app

if __name__ == '__main__':
    # Create the Flask app and run it in debug mode
    app = create_app()
    app.run(debug=True)
