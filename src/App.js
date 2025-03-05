import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from '@mui/material';
import { motion } from 'framer-motion';
import { FaTachometerAlt, FaDatabase, FaCogs, FaChartLine, FaRunning, FaBars, FaClipboardList, FaTimes } from 'react-icons/fa';
import * as api from "./api"; // Import all API functions
import BottomPanel from "./BottomPanel";
import Plotly from 'plotly.js-dist';
import UpperPanel from './UpperPanel'; // Adjust the path if needed
import LeftPanel from './LeftPanel'; // Adjust the path if needed
import TraderSimulation from './TraderSimulation'; // Import TraderSimulation

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true); // Default menu expanded
  const [activeMenu, setActiveMenu] = useState("Training");
  const [response_train, setResponseTrain] = useState([]);
  const [chosen_data, setChosenData] = useState([]);

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
          <TraderSimulation />
        ) : (
          <div className="flex gap-4 flex-1">
            <div className="w-1/3 bg-gray-800 p-4 shadow-lg rounded-lg">
              <LeftPanel setResponseTrain={setResponseTrain} setChosenData={setChosenData} />
            </div>
            <div className="flex-1 bg-gray-800 p-4 shadow-lg rounded-lg">
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
