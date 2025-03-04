import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from '@mui/material';
import { motion } from 'framer-motion';
import { FaTachometerAlt, FaDatabase, FaCogs, FaChartLine, FaRunning, FaBars, FaClipboardList, FaTimes } from 'react-icons/fa';
import * as api from "./api"; // Import all API functions
import BottomPanel from "./BottomPanel";
import Plotly from 'plotly.js-dist';
import UpperPanel from './UpperPanel'; // Adjust the path if needed
import CenterPanel from './CenterPanel'; // Adjust the path if needed


const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true); // Default menu expanded
  const [activeMenu, setActiveMenu] = useState("Training");
  const [response_train, setResponseTrain] = useState([]);
  const [chosen_data, setChosenData] = useState([]);







  return (
  <div className="h-screen bg-black text-white flex flex-col overflow-y-auto">
    {/* Header Bar */}
    <header className="bg-gray-900 p-4 flex items-center justify-between shadow-md">


      {/* Menu Links */}
      <div className="flex space-x-4">
        <button onClick={() => setActiveMenu("Dashboard")} className="text-white hover:text-yellow-400 flex items-center gap-2">
          <FaTachometerAlt /> Dashboard
        </button>
        <button onClick={() => setActiveMenu("Datasets")} className="text-white hover:text-yellow-400 flex items-center gap-2">
          <FaDatabase /> Datasets
        </button>
        <button onClick={() => setActiveMenu("Training")} className="text-white hover:text-yellow-400 flex items-center gap-2">
          <FaCogs /> Training
        </button>
        <button onClick={() => setActiveMenu("Account")} className="text-white hover:text-yellow-400 flex items-center gap-2">
          <FaRunning /> Account
        </button>
        <button onClick={() => setActiveMenu("Trader Simulation")} className="text-white hover:text-yellow-400 flex items-center gap-2">
          <FaChartLine /> Trader Simulation
        </button>
        <button onClick={() => setActiveMenu("Tracking")} className="text-white hover:text-yellow-400 flex items-center gap-2">
          <FaClipboardList /> Tracking
        </button>
      </div>
      <h1 className="text-xl font-bold">Sim Market</h1>
    </header>

    {/* Main Content */}
    <div className="flex flex-1 overflow-auto">
      {/* Main Panels */}
      <div className="flex-1 flex flex-col gap-4 p-4 overflow-y-auto">
        {activeMenu === "Training" && (
          <>
            {/* Upper Panels */}
            <UpperPanel chosen_data={chosen_data} />

            {/* Left Panels */}
            <CenterPanel setResponseTrain={setResponseTrain} setChosenData={setChosenData} />

            {/* Right Panel */}
            <div className="bg-gray-700 p-4 shadow-lg rounded-lg">
              <BottomPanel response={response_train || { error: [], val: [] }} />
            </div>
          </>
        )}
      </div>
    </div>
  </div>
);

};

export default App;
