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
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white text-2xl">
          <FaBars />
        </button>
        <h1 className="text-xl font-bold">Sim Market</h1>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-auto">
        {/* Expandable Menu Panel */}
        {isMenuOpen && (
          <motion.div
            className="bg-gray-800 w-56 p-4 flex flex-col gap-4 overflow-y-auto"
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button className="text-white hover:text-yellow-400 flex items-center gap-2" onClick={() => setActiveMenu("Dashboard")}>
              <FaTachometerAlt /> Dashboard
            </button>
            <button className="text-white hover:text-yellow-400 flex items-center gap-2" onClick={() => setActiveMenu("Datasets")}>
              <FaDatabase /> Datasets
            </button>
            <button className="text-white hover:text-yellow-400 flex items-center gap-2" onClick={() => setActiveMenu("Training")}>
              <FaCogs /> Training
            </button>
            <button className="text-white hover:text-yellow-400 flex items-center gap-2" onClick={() => setActiveMenu("Account")}>
              <FaRunning /> Account
            </button>
            <button className="text-white hover:text-yellow-400 flex items-center gap-2" onClick={() => setActiveMenu("Trader Simulation")}>
              <FaChartLine /> Trader Simulation
            </button>
            <button className="text-white hover:text-yellow-400 flex items-center gap-2" onClick={() => setActiveMenu("Tracking")}>
              <FaClipboardList /> Tracking
            </button>
          </motion.div>
        )}

        {/* Main Panels */}
        <div className="flex-1 flex flex-col gap-4 p-4 overflow-y-auto">
          {activeMenu === "Training" && (
            <>
              {/* Upper Panels */}
              <UpperPanel chosen_data = {chosen_data} />

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
