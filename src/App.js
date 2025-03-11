import React, { useState, useEffect } from 'react';
import { FaTachometerAlt, FaCogs, FaChartLine, FaClipboardList } from 'react-icons/fa';
import * as api from "./api"; // Import all API functions
import BottomPanel from "./BottomPanel";
import UpperPanel from './UpperPanel'; // Adjust the path if needed
import LeftPanel from './LeftPanel'; // Adjust the path if needed
import TraderSimulation from './TraderSimulation'; // Import TraderSimulation

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true); // Default menu expanded
  const [activeMenu, setActiveMenu] = useState("Training");
  const [response_train, setResponseTrain] = useState([]);

  const [chosen_data, setChosenData] = useState([]);
  const [chosen_datastrings, setChosenDataStrings] = useState([]);

  const [datasetStrings, setDatasetsStrings] = useState([]); // Only the stringname

  const [machines4sim, setMachines4sim] = useState({ machines: [], scalers: [] }); // Initialize with empty lists for "machines" and "scalers"


  useEffect(() => {
    // This will run every time chosen_dataStrings changes
    console.log('chosen_dataStrings has been updated:', chosen_datastrings);
  }, [chosen_datastrings]);


  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-y-auto">
      <header className="bg-gray-900 p-4 flex items-center justify-between shadow-md">
        <div className="flex space-x-4">
          <button onClick={() => setActiveMenu("Dashboard")} className={`text-white hover:text-yellow-400 flex items-center gap-2 ${activeMenu === "Dashboard" ? "text-yellow-400" : ""}`}>
            <FaTachometerAlt /> Dashboard
          </button>
          <button onClick={() => setActiveMenu("Training")} className={`text-white hover:text-yellow-400 flex items-center gap-2 ${activeMenu === "Training" ? "text-yellow-400" : ""}`}>
            <FaCogs /> Training
          </button>
          <button onClick={() => setActiveMenu("Trader Simulation")} className={`text-white hover:text-yellow-400 flex items-center gap-2 ${activeMenu === "Trader Simulation" ? "text-yellow-400" : ""}`}>
            <FaChartLine /> Trader Simulation
          </button>
          <button onClick={() => setActiveMenu("Tracking")} className={`text-white hover:text-yellow-400 flex items-center gap-2 ${activeMenu === "Tracking" ? "text-yellow-400" : ""}`}>
            <FaClipboardList /> Live Trading
          </button>
        </div>
        <h1 className="text-xl font-bold">Sim Market</h1>
      </header>

      <div className="flex flex-1 flex-col p-4 gap-4 overflow-auto">
        {activeMenu === "Trader Simulation" ? (
          <TraderSimulation
            machines4sim={machines4sim}
            datasetStrings={datasetStrings}
          />
            ) : (
          <div className="flex gap-4 flex-1">
            <div className="w-[380px] bg-gray-900 p-4 shadow-lg rounded-lg">
            <LeftPanel
              machines4sim = {machines4sim}
              setMachines4sim={setMachines4sim}
              datasetStrings={datasetStrings}
              setDatasetsStrings={setDatasetsStrings}
              setResponseTrain={setResponseTrain}
              setChosenData={setChosenData}
              chosen_datastrings = {chosen_datastrings}
              setChosenDataStrings={setChosenDataStrings}
              />
            </div>
            <div className="flex-1 bg-gray-900 p-4 shadow-lg rounded-lg">
              <UpperPanel chosen_data={chosen_data} />
            </div>
          </div>
        )}
        <div className="bg-gray-800 p-4 shadow-lg rounded-lg">
          <div className="text-white"></div>
          <div className="w-1/4 bg-gray-800 p-4 shadow-lg rounded-lg">
            <BottomPanel response={response_train || { error: [], val: [] }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
