import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { motion } from 'framer-motion';
import { FaTachometerAlt, FaDatabase, FaCogs, FaChartLine, FaRunning, FaBars, FaClipboardList } from 'react-icons/fa';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [activeMenu, setActiveMenu] = useState("Training");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      {/* Header Bar */}
      <header className="bg-gray-900 p-4 flex items-center justify-between shadow-md">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white text-2xl">
          <FaBars />
        </button>
        <h1 className="text-xl font-bold">Sim Market</h1>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Expandable Menu Panel */}
        {isMenuOpen && (
          <motion.div
            className="bg-gray-800 w-56 p-4 flex flex-col gap-4"
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
        <div className="flex-1 grid grid-rows-3 gap-4 p-4">
          {activeMenu === "Training" && (
            <>
              <div className="bg-gray-700 p-4 shadow-lg rounded-lg flex">Top Panel - Live Plot</div>
              <div className="bg-gray-700 p-4 shadow-lg rounded-lg flex flex-col">
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  textColor="inherit"
                  TabIndicatorProps={{ style: { background: 'yellow' } }}
                  className="mb-4"
                >
                  <Tab label="Datasets" />
                  <Tab label="Pre-processing" />
                  <Tab label="Hyperparameters" />
                  <Tab label="Plots" />
                </Tabs>
                <div className="mt-4">
                  {activeTab === 0 && <div>Dataset Management Tools</div>}
                  {activeTab === 1 && <div>Pre-processing Options Here</div>}
                  {activeTab === 2 && <div>Hyperparameter Settings with Train Button</div>}
                  {activeTab === 3 && <div>Overfit and Epoch Error Plots</div>}
                </div>
              </div>
              <div className="bg-gray-700 p-4 shadow-lg rounded-lg flex">Bottom Panel - Console Logs</div>
            </>
          )}

          {activeMenu === "Tracking" && (
            <div className="grid grid-cols-2 grid-rows-2 gap-4 flex-1">
              <div className="bg-gray-700 p-4 shadow-lg rounded-lg">Panel 1</div>
              <div className="bg-gray-700 p-4 shadow-lg rounded-lg">Panel 2</div>
              <div className="bg-gray-700 p-4 shadow-lg rounded-lg">Panel 3</div>
              <div className="bg-gray-700 p-4 shadow-lg rounded-lg">Panel 4</div>
            </div>
          )}

          {activeMenu === "Account" && (
            <div className="flex-1 flex justify-center items-center">
              <button className="bg-blue-500 p-4 rounded-lg text-white">Login with Google</button>
            </div>
          )}

          {activeMenu === "Trader Simulation" && (
            <>
              <div className="bg-gray-700 p-4 shadow-lg rounded-lg flex">Top Panel - Trader Overview</div>
              <div className="bg-gray-700 p-4 shadow-lg rounded-lg flex">Center Panel - Trading Analysis</div>
              <div className="bg-gray-700 p-4 shadow-lg rounded-lg flex">Bottom Panel - Market Data</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
