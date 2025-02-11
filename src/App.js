import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { motion } from 'framer-motion';
import { FaTachometerAlt, FaDatabase, FaCogs, FaChartLine, FaRunning, FaBars, FaClipboardList, FaTimes } from 'react-icons/fa';
import * as api from "./api"; // Import all API functions
import Plotly from 'plotly.js-dist';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true); // Default menu expanded
  const [activeTab, setActiveTab] = useState(0);
  const [activeMenu, setActiveMenu] = useState("Training");
  const [datasets, setDatasets] = useState([]);
  const [candleLength, setCandleLength] = useState("1hour");
  const [tradingPair, setTradingPair] = useState("BTCUSD");
  const [endDate, setEndDate] = useState(getTodayDate());
  const [logs, setLogs] = useState(""); // To hold the log data
  const [isTraining, setIsTraining] = useState(false); // To manage the training state
  const [isSaving, setIsSaving] = useState(false); // To manage the training state
  const [intervalLength, setIntervalLength] = useState(3000); // Default value is 10

  const [epochs, setEpochs] = useState(300); // To hold the log data
  const [lookf, setlookf] = useState(1); // To hold the log data
  const [lookb, setlookb] = useState(10);
  const [dropout, setDropout] = useState(0.2);
  const [learn_rate, setLearnRate] = useState(0.1);
  const [layer1, setLayer1] = useState(20);
  const [layer2, setLayer2] = useState(15);
  const [batchsize, setBatchsize] = useState(64);
  const [max_tot_return, setMax_tot_return] = useState(0.3);


  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  function getTodayDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }


  const addDataset = async () => {
    if (!endDate || !intervalLength) return;
    let formattedEndDate = endDate + " 00:00:00";

    console.log("Candle Length:", candleLength);
    console.log("Trading Pair:", tradingPair);
    console.log("End Date:", endDate);
    console.log("Interval Length:", intervalLength);

    try {
      const response = await api.getHistoricalData([formattedEndDate, intervalLength], tradingPair, candleLength);

      const { timestamps, data } = response;

      console.log(data);

      // data as """ (time, open, high, low, close, volume, close_time etc.) """
      const time = data.map(item => item[0]); // Convert timestamps to Date objects
      const open = data.map(item => item[1]);
      const high = data.map(item => item[2]);
      const low = data.map(item => item[3]);
      const close = data.map(item => item[4]);

      // Limit the data to the first 10 candles
      //console.log(time.slice(0, 10));
      console.log("open");
      console.log(open.slice(0, 10));
      console.log("high");
      console.log(high.slice(0, 10));
      console.log("low");
      console.log(low.slice(0, 10));
      console.log("close");
      console.log(close.slice(0, 10));


      // Plot with Plotly
      const candlestickTrace = {
        x: time,
        open: open,
        high: high,
        low: low,
        close: close,
        type: 'candlestick',
        name: tradingPair
      };

      const layout = {
        title: `${tradingPair} Candlestick Chart`,
        xaxis: { type: 'date', title: 'Time' },
        yaxis: {
        title: 'Price',
        autorange: true, // This will adjust the Y-axis to the data automatically
      },
        plot_bgcolor: '#2D3748', // Same background as upper panel
        paper_bgcolor: '#2D3748', // Same background as upper panel
        font: { color: 'white' }
      };

      Plotly.newPlot("candlestickChart", [candlestickTrace], layout);

      // Add dataset string to list
      const datasetString = `${candleLength}_${tradingPair}_${endDate}_${intervalLength}`;
      setDatasets([...datasets, datasetString]);

    } catch (error) {
      console.error("Error fetching historical data:", error);
    }
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
  setLogs("Training..."); // Clear previous logs

  try {
    const response = await api.trainModel(epochs, lookf, lookb, dropout, learn_rate, layer1, layer2, batchsize, max_tot_return);  // Adjust the URL to your backend endpoint



  } catch (error) {
    console.error("Training failed:", error);
    setLogs("Error: Unable to start training.");
  } finally {
    setIsTraining(false); // Indicate training is complete
  }
};

const handleSaveMachineClick = async () => {
  console.log("test");
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

              {/* Upper Panels */}
              <div className="bg-gray-700 p-4 shadow-lg rounded-lg flex">
                <div id="candlestickChart" className="mt-4" style={{ width: '100%', height: '400px' }}></div>
              </div>

              {/* Center Panels */}
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
                  <Tab label="Training" />
                </Tabs>
                <div className="mt-4">
                  {activeTab === 0 && (
                    <div>
                      <div className="flex gap-4 mb-4">
                        <select className="bg-gray-800 p-2 rounded" value={candleLength} onChange={(e) => setCandleLength(e.target.value)}>
                          <option>15min</option>
                          <option>1hour</option>
                          <option>4hour</option>
                        </select>
                        <select className="bg-gray-800 p-2 rounded" value={tradingPair} onChange={(e) => setTradingPair(e.target.value)}>
                          <option>BTCUSD</option>
                          <option>XRPUSD</option>
                          <option>ETHUSD</option>
                          <option>LTCUSD</option>
                        </select>
                        <input type="date" className="bg-gray-800 p-2 rounded" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        <input type="number" placeholder="Interval Length" className="bg-gray-800 p-2 rounded" value={intervalLength} onChange={(e) => setIntervalLength(e.target.value)} />
                        <button onClick={addDataset} className="bg-yellow-500 p-2 rounded">Fetch Binance</button>
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
                              <input id="x-input" type="number" value={lookb} className="bg-gray-800 mt-1 p-2 rounded w-full" />
                            </div>
                            <div>
                              <label htmlFor="y-input" className="block">Lookforward (Y):</label>
                              <input id="y-input" type="number" value={lookf} className="bg-gray-800 mt-1 p-2 rounded w-full" />
                            </div>
                          </div>

                        <div>Samples after slicing: {1000}</div> {/* Replace M with the dynamic value */}
                        </div>

                        {/* Column 2 */}
                        <div className="p-4 border-l border-gray-600">


                          <div className="mt-4 flex space-x-4"> {/* Flex container for Return Mean and Return Interval */}
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <label htmlFor="return-mean" className="block">Max. interval return:</label>
                                <a href="/help" target="_blank" className="ml-2 text-blue-500 hover:underline">
                                  <span className="text-xl">?</span>
                                </a>
                              </div>
                              <input id="return-mean" type="number" className="bg-gray-800 mt-1 p-2 rounded w-full" value={max_tot_return} /></div>


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
                          <input id="layer1" type="number" value={layer1} type="number" className="bg-gray-800 mt-1 p-2 rounded w-full" />
                        </div>

                        {/* Layer 2 Input */}
                        <div>
                          <label htmlFor="layer2" className="block">Layer 2:</label>
                          <input id="layer2" type="number" value={layer2} type="number" className="bg-gray-800 mt-1 p-2 rounded w-full"  />
                        </div>

                        {/* Dropout Input */}
                        <div>
                          <label htmlFor="dropout" className="block">Dropout:</label>
                          <input id="dropout" type="number" value={dropout} step="0.01" className="bg-gray-800 mt-1 p-2 rounded w-full" />
                        </div>

                        {/* Learning Rate Input */}
                        <div>
                          <label htmlFor="learn-rate" className="block">Learning Rate:</label>
                          <input id="learn-rate" type="number" value={learn_rate} step="0.0001" className="bg-gray-800 mt-1 p-2 rounded w-full"  />
                        </div>

                        {/* N Epochs Input */}
                        <div>
                          <label htmlFor="n-epochs" className="block">N Epochs:</label>
                          <input id="n-epochs" type="number" value={epochs} className="bg-gray-800 mt-1 p-2 rounded w-full"  />
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

                        <button
                          onClick={handleSaveMachineClick}
                          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
                          disabled={isSaving}
                        >
                          {isSaving ? "Saving..." : "Save Machine for Tracking"}
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
