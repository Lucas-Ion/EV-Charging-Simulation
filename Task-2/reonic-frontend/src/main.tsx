import ReactDOM from 'react-dom/client'; 
import './index.css'; 
import App from './App'; 
import { Chart, registerables } from 'chart.js'; 

// Register all the components of Chart.js
Chart.register(...registerables);

// Render the App component into the root element
ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
);
