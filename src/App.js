import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from '@mui/material';
import { motion } from 'framer-motion';
import { FaTachometerAlt, FaDatabase, FaCogs, FaChartLine, FaRunning, FaBars, FaClipboardList, FaTimes } from 'react-icons/fa';
import * as api from "./api"; // Import all API functions
import BottomPanel from "./BottomPanel";
import Plotly from 'plotly.js-dist';
import UpperPanel from './UpperPanel'; // Adjust the path if needed
import LeftPanel from './LeftPanel'; // Adjust the path if needed


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
    <div className="flex flex-1 flex-col p-4 gap-4 overflow-auto">
    <div className="flex gap-4 flex-1">

      {/* Left Panel */}
      <div className="w-1/4 bg-gray-800 p-4 shadow-lg rounded-lg">
        <LeftPanel setResponseTrain={setResponseTrain} setChosenData={setChosenData} />
      </div>

      {/* Center Panel */}
      <div className="flex-1 bg-gray-800 p-4 shadow-lg rounded-lg">
        <UpperPanel chosen_data={chosen_data} />
      </div>

      {/* Right Panel - Set width to 1/12 or other proportion */}
      <div className="w-1/4 bg-gray-800 p-4 shadow-lg rounded-lg">
        <h1> Active Machines </h1>
      </div>

    </div>


      {/* Second Row: New Bottom Panel */}
      <div className="bg-gray-800 p-4 shadow-lg rounded-lg">
        {/* New Bottom Panel Below UpperPanel */}
        <div className="text-white">
          {/* You can place your new content here */}

        </div>
        <div className="w-1/4 bg-gray-800 p-4 shadow-lg rounded-lg">
          <BottomPanel response={response_train || { error: [], val: [] }} />
        </div>
      </div>
    </div>
  </div>
);

};

export default App;
