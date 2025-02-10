import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { motion } from 'framer-motion';
import { FaTachometerAlt, FaDatabase, FaCogs, FaChartLine, FaRunning, FaBars, FaClipboardList, FaTimes } from 'react-icons/fa';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [activeMenu, setActiveMenu] = useState("Training");
  const [datasets, setDatasets] = useState([]);
  const [candleLength, setCandleLength] = useState("15min");
  const [tradingPair, setTradingPair] = useState("BTCUSD");
  const [endDate, setEndDate] = useState("");
  const [intervalLength, setIntervalLength] = useState("");
  const [logs, setLogs] = useState(""); // To hold the log data
  const [isTraining, setIsTraining] = useState(false); // To manage the training state


  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const addDataset = () => {
    if (!endDate || !intervalLength) return;
    const unixTime = Math.floor(new Date(endDate).getTime() / 1000);
    const datasetString = `${candleLength}_${tradingPair}_${unixTime}_${intervalLength}`;
    setDatasets([...datasets, datasetString]);
  };

  const removeDataset = (index) => {
    setDatasets(datasets.filter((_, i) => i !== index));
  };

  const totalCandles = datasets.reduce((sum, dataset) => {
    const parts = dataset.split("_");
    return sum + parseInt(parts[3], 10);
  }, 0);


  const handleTrainButtonClick = async () => {
  setIsTraining(true); // Indicate training is in progress
  setLogs(""); // Clear previous logs

  try {
    // Simulate calling the backend to start the training process
    const response = await fetch("/api/train", { method: "POST" });  // Adjust the URL to your backend endpoint
    const data = await response.json();

    // Assuming backend sends logs as a response in chunks or events
    if (data && data.logs) {
      // Update logs from the backend (could be updated in real-time)
      setLogs((prevLogs) => prevLogs + "\n" + data.logs);
    }
  } catch (error) {
    console.error("Training failed:", error);
    setLogs("Error: Unable to start training.");
  } finally {
    setIsTraining(false); // Indicate training is complete
  }
};


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
                  {activeTab === 0 && (
                    <div>
                      <div className="flex gap-4 mb-4">
                        <select className="bg-gray-800 p-2 rounded" value={candleLength} onChange={(e) => setCandleLength(e.target.value)}>
                          <option>15min</option>
                          <option>1hour</option>
                          <option>4hour</option>
                          <option>1day</option>
                        </select>
                        <select className="bg-gray-800 p-2 rounded" value={tradingPair} onChange={(e) => setTradingPair(e.target.value)}>
                          <option>BTCUSD</option>
                          <option>XRPUSD</option>
                          <option>ETHUSD</option>
                          <option>LTCUSD</option>
                        </select>
                        <input type="date" className="bg-gray-800 p-2 rounded" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        <input type="number" placeholder="Interval Length" className="bg-gray-800 p-2 rounded" value={intervalLength} onChange={(e) => setIntervalLength(e.target.value)} />
                        <button onClick={addDataset} className="bg-yellow-500 p-2 rounded">Add</button>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-bold">Selected Datasets</h2>
                        <span className="text-yellow-400">Total Candles: {totalCandles}</span>
                      </div>
                      <div className="bg-gray-900 p-4 rounded overflow-y-auto max-h-40">
                        {datasets.map((dataset, index) => (
                          <div key={index} className="p-2 border-b border-gray-700 flex justify-between items-center">
                            <span>{dataset}</span>
                            <button onClick={() => removeDataset(index)} className="text-red-500 hover:text-red-700">
                              <FaTimes />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {activeTab === 1 && (
                      <div className="grid grid-cols-3 gap-4 border-r border-gray-600">
                        {/* Column 1 */}
                        <div className="p-4">
                          <div>Total Candles: {totalCandles}</div>
                          <div className="mt-4 flex space-x-4"> {/* Flex container for X and Y inputs */}
                            <div>
                              <label htmlFor="x-input" className="block">Lookback (X):</label>
                              <input id="x-input" type="number" defaultValue={10} className="bg-gray-800 mt-1 p-2 rounded w-full" />
                            </div>
                            <div>
                              <label htmlFor="y-input" className="block">Lookforward (Y):</label>
                              <input id="y-input" type="number" defaultValue={1} className="bg-gray-800 mt-1 p-2 rounded w-full" />
                            </div>
                          </div>

                        <div>Samples after slicing: {1000}</div> {/* Replace M with the dynamic value */}
                        </div>

                        {/* Column 2 */}
                        <div className="p-4 border-l border-gray-600">


                          <div className="mt-4 flex space-x-4"> {/* Flex container for Return Mean and Return Interval */}
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <label htmlFor="return-mean" className="block">Return Mean:</label>
                                <a href="/help" target="_blank" className="ml-2 text-blue-500 hover:underline">
                                  <span className="text-xl">?</span>
                                </a>
                              </div>
                              <input id="return-mean" type="number" className="bg-gray-800 mt-1 p-2 rounded w-full" />
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <label htmlFor="return-interval" className="block">Return Interval:</label>
                                <a href="/help" target="_blank" className="ml-2 text-blue-500 hover:underline">
                                  <span className="text-xl">?</span>
                                </a>
                              </div>
                              <input id="return-interval" type="number" className="bg-gray-800 mt-1 p-2 rounded w-full" />
                            </div>
                          </div>
                          <div>Samples after filtering: {1000}</div>
                        </div>


                        {/* Column 3 */}
                        <div className="p-4 border-l border-gray-600">
                          {/* You can add content to this column as needed */}
                        </div>
                      </div>
                    )}

                    {activeTab === 2 && (  // Assuming the "Hyperparameter" tab is activated when activeTab === 2
                      <div className="grid grid-cols-4 gap-4 p-4 border-r border-gray-600">
                        {/* Layer 1 Input */}
                        <div>
                          <label htmlFor="layer1" className="block">Layer 1:</label>
                          <input id="layer1" type="number" defaultValue={20} type="number" className="bg-gray-800 mt-1 p-2 rounded w-full" />
                        </div>

                        {/* Layer 2 Input */}
                        <div>
                          <label htmlFor="layer2" className="block">Layer 2:</label>
                          <input id="layer2" type="number" defaultValue={15} type="number" className="bg-gray-800 mt-1 p-2 rounded w-full"  />
                        </div>

                        {/* Dropout Input */}
                        <div>
                          <label htmlFor="dropout" className="block">Dropout:</label>
                          <input id="dropout" type="number" defaultValue={0.2} step="0.01" className="bg-gray-800 mt-1 p-2 rounded w-full" />
                        </div>

                        {/* Learning Rate Input */}
                        <div>
                          <label htmlFor="learn-rate" className="block">Learning Rate:</label>
                          <input id="learn-rate" type="number" defaultValue={0.1} step="0.0001" className="bg-gray-800 mt-1 p-2 rounded w-full"  />
                        </div>

                        {/* N Epochs Input */}
                        <div>
                          <label htmlFor="n-epochs" className="block">N Epochs:</label>
                          <input id="n-epochs" type="number" defaultValue={300} className="bg-gray-800 mt-1 p-2 rounded w-full"  />
                        </div>
                      </div>
                    )}

                    {activeTab === 3 && (  // Training Tab
                      <div className="p-4">
                        {/* Train Button */}
                        <button
                          onClick={handleTrainButtonClick}
                          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
                          disabled={isTraining}
                        >
                          {isTraining ? "Training..." : "Train"}
                        </button>

                        {/* Log Output */}
                        <div className="mt-4">
                          <label htmlFor="log-output" className="block text-lg">Training Logs:</label>
                          <textarea
                            id="log-output"
                            value={logs}
                            readOnly
                            className="mt-2 w-full p-2 border rounded h-40 bg-gray-100 text-black"
                            placeholder="Logs will be displayed here..."
                          />
                        </div>
                      </div>
                    )}
                </div>
              </div>
              <div className="bg-gray-700 p-4 shadow-lg rounded-lg flex">Bottom Panel - Console Logs</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
