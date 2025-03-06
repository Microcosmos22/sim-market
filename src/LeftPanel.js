import { Tabs, Tab } from '@mui/material';
import { useState, useEffect } from 'react';
import * as api from "./api"; // Import all API functions
import { FaTachometerAlt, FaDatabase, FaCogs, FaChartLine, FaRunning, FaBars, FaClipboardList, FaTimes } from 'react-icons/fa';
import NeuralNetworkDesigner from './NeuralNetworkDesigner';


const LeftPanel = ({setResponseTrain, setChosenData}) => {

  const [max_tot_return, setMax_tot_return] = useState(99999);
  const [activeTab, setActiveTab] = useState(0);
  const [candleLength, setCandleLength] = useState("1hour");
  const [tradingPair, setTradingPair] = useState("BTCUSD");
  const [endDate, setEndDate] = useState(getTodayDate());
  const [selectedIndices, setSelectedIndices] = useState([]); // To track selected checkboxes
  const [intervalLength, setIntervalLength] = useState(1000); // Default value is 10
  const [logs, setLogs] = useState(""); // To hold the log data
  const [isTraining, setIsTraining] = useState(false); // To manage the training state
  const [isSaving, setIsSaving] = useState(false); // To manage the training state
  const [response_data, setResponseData] = useState([]);
  const [datasets, setDatasets] = useState([]); // Only the stringname

  // Centralize State Management Here
    const [layers, setLayers] = useState([
      { neurons: 20, dropout: 0.2, activation: "relu" },
      { neurons: 15, dropout: 0.2, activation: "relu" },
    ]);

    const [NN, setNN] = useState({
      lookf: 5,
      lookb: 10,
      learnRate: 0.01,
      batchSize: 64,
      epochs: 100,
      layers: layers,
    });

    // 🛠️ Update Layer
    const updateLayer = (index, key, value) => {
      const updatedLayers = layers.map((layer, i) =>
        i === index ? { ...layer, [key]: value } : layer
      );
      setLayers(updatedLayers);
      setNN((prevNN) => ({
        ...prevNN,
        layers: updatedLayers, // Correctly update layers
      }));
    };

    // 🛠️ Update Settings
    const updateSettings = (newSettings) => {
      setNN((prevNN) => ({
        ...prevNN,
        ...newSettings, // Merge new settings with existing NN
      }));
    };

    // 🛠️ Add New Layer
    const addLayer = () => {
      const newLayer = { neurons: 10, dropout: 0.5, activation: "relu" };
      const updatedLayers = [...layers, newLayer];
      setLayers(updatedLayers);
      setNN((prevNN) => ({
        ...prevNN,
        layers: updatedLayers, // Update layers in NN
      }));
    };

    // 🛠️ Handle Layer Changes
    const handleLayerChange = (index, key, value) => {
      updateLayer(index, key, value);
    };


  const handleCheckboxChange = (index) => {
     setSelectedIndices((prevSelectedIndices) => {
       const newSelectedIndices = prevSelectedIndices.includes(index)
         ? prevSelectedIndices.filter((i) => i !== index) // Deselect
         : [...prevSelectedIndices, index]; // Select

       const newSelectedDatasets = newSelectedIndices.map(i => response_data[i]);
       setChosenData(newSelectedDatasets); // Update the actual datasets
       return newSelectedIndices;
     });
   };


   useEffect(() => {
     console.log(`N Datasets generated: ${response_data.length}`);
   }, [response_data]); // Only runs when response_data changes

   useEffect(() => {
     console.log('Selected Indices:', selectedIndices);
   }, [selectedIndices]);


  const addDataset = async () => {
    if (!endDate || !intervalLength) return;
    let formattedEndDate = endDate + " 00:00:00";

    try {
      // The API response will be used for plotting. Further calculations continue
      // with python and the server-saved Datasets.
      // The datasets will be preserved for each logging session and deleted after.

      const response_api = await api.getHistoricalData([formattedEndDate, intervalLength], tradingPair, candleLength);
      const datasetString = `${candleLength}_${tradingPair}_${endDate}_${intervalLength}`;

      setDatasets(prev => [...prev, datasetString]);
      setResponseData(prev => [...prev, {target: response_api.target, features: response_api.features, data: response_api.data, time: response_api.timestamps, tradingPair: tradingPair}])


    } catch (error) {
      console.error("Error fetching historical data:", error);
    }};


function getTodayDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

const handleSaveMachineClick = async () => {
  return 0;
}


const handleTrainButtonClick = async () => {
  setIsTraining(true); // Indicate training is in progress

  console.log("Training with NN: ", NN);

  try {
    const response_train = await api.trainModel(NN, max_tot_return);  // Adjust the URL to your backend endpoint
    setResponseTrain(response_train);
    const backendLogs = response_train.log || "";// Ensure it’s a string even if the backend does not return logs
    setLogs(prevLogs => prevLogs + "\n" + "Training machine in the Python Backend: "); // Append the backend logs to the current logs
    setLogs(prevLogs => prevLogs + "\n" + backendLogs); // Append the backend logs to the current logs

  } finally {
    setIsTraining(false); // Indicate training is complete
  }};

  const removeDataset = (index) => {
    setDatasets(datasets.filter((_, i) => i !== index));
  };

  const totalCandles = datasets.reduce((sum, dataset) => {
    const parts = dataset.split("_");
    return sum + parseInt(parts[3], 10);
  }, 0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
  <div className="bg-gray-900 p-2 shadow-lg rounded-lg flex flex-col text-xs w-[300px]">

    <div className="flex flex-wrap gap-2 mb-2">
  {/* Row 1: First two tabs */}
  <button
      onClick={() => setActiveTab(0)}
      className={`flex-1 py-1 ${activeTab === 0 ? "bg-gray-700" : "bg-gray-800"} text-white rounded-t text-xs`}
  >
      Datasets
  </button>
  <button
      onClick={() => setActiveTab(1)}
      className={`flex-1 py-1 ${activeTab === 1 ? "bg-gray-700" : "bg-gray-800"} text-white rounded-t text-xs`}
  >
      Pre-processing
  </button>

  {/* Row 2: Next two tabs */}
  <button
      onClick={() => setActiveTab(2)}
      className={`flex-1 py-1 ${activeTab === 2 ? "bg-gray-700" : "bg-gray-800"} text-white rounded-t text-xs`}
  >
      Neural network
  </button>
  <button
      onClick={() => setActiveTab(3)}
      className={`flex-1 py-1 ${activeTab === 3 ? "bg-gray-700" : "bg-gray-800"} text-white rounded-t text-xs`}
  >
      Training
  </button>
  </div>
      <div className="mt-2">
        {activeTab === 0 && (
          <div>
          <div className="flex flex-wrap gap-2 mb-2">
            {/* First Row - Dropdowns */}
            <div className="w-full sm:w-auto">
              <select className="bg-gray-800 border border-gray-600 p-1 rounded text-xs" value={candleLength} onChange={(e) => setCandleLength(e.target.value)}>
                <option>15min</option>
                <option>1hour</option>
                <option>4hour</option>
              </select>
            </div>

            <div className="w-full sm:w-auto">
              <select className="bg-gray-800 border border-gray-600 p-1 rounded text-xs" value={tradingPair} onChange={(e) => setTradingPair(e.target.value)}>
                <option>BTCUSD</option>
                <option>XRPUSD</option>
                <option>ETHUSD</option>
                <option>LTCUSD</option>
              </select>
            </div>

              {/* Second Row - Inputs and Button */}
              <div className="w-full sm:w-auto">
                <input type="date" className="bg-gray-800 border border-gray-600 p-1 rounded text-xs" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>

              <div className="w-full sm:w-auto">
                <input type="number" placeholder="Interval Length" className="bg-gray-800 border border-gray-600 p-1 rounded-lg text-xs" value={intervalLength} onChange={(e) => setIntervalLength(e.target.value)} />
              </div>

              <div className="w-full sm:w-auto">
                <button onClick={addDataset} className="bg-yellow-500  p-1 rounded text-xs">Get Data</button>
              </div>
            </div>

            <div className="flex justify-between items-center mb-1">
              <h2 className="text-xs font-bold">Selected Datasets</h2>
              <span className="text-yellow-400 text-xs">Total Candles: {totalCandles}</span>
            </div>
            <div className="bg-gray-900 p-2 rounded overflow-y-auto max-h-40 text-xs">
              {datasets.map((dataset, index) => (
                <div key={index} className="p-1 border-b border-gray-700 flex justify-between items-center">
                  <span>{dataset}</span>
                  <input type="checkbox" checked={selectedIndices.includes(index)} onChange={() => handleCheckboxChange(index)} className="ml-1" />
                  <button onClick={() => removeDataset(index)} className="text-red-500 hover:text-red-700 ml-1">
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 1 && (
          <div className="grid grid-cols-2 gap-2 border-r border-gray-600 text-xs">
            {/* Column 1 */}
            <div className="p-2">
              <div>Total Candles: {totalCandles}</div>
              <div>Samples after slicing: {1000}</div>
            </div>

            {/* Column 2 */}
            <div className="p-2 border-l border-gray-600 text-xs">
              <div className="mt-2 flex space-x-2">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor="return-mean" className="block text-xs">Max. interval return:</label>
                    <a href="/help" target="_blank" className="ml-1 text-blue-500 hover:underline">
                      <span className="text-sm">?</span>
                    </a>
                  </div>
                  <input id="return-mean" type="number" className="bg-gray-800 border border-gray-600 mt-1 p-1 rounded w-full text-xs" value={max_tot_return} onChange={(e) => setMax_tot_return(e.target.value)} />
                </div>
              </div>
              <div>Samples after filtering: {1000}</div>
            </div>
          </div>
        )}
        {activeTab === 2 && (
            <div className="w-full bg-gray-900 p-2 shadow-lg rounded-lg overflow-auto">
            <NeuralNetworkDesigner NN={NN} layers={layers} updateLayer={updateLayer}
              updateSettings={updateSettings} addLayer={addLayer} handleLayerChange={handleLayerChange}/> </div>

        )}

        {activeTab === 3 && (
          <div className="p-2 text-xs">
            {/* Train Button */}
            <button
              onClick={handleTrainButtonClick}
              className="bg-yellow-500 text-white p-1 rounded hover:bg-blue-600 disabled:bg-gray-300 text-xs mr-2"  // Add mr-2 for margin-right
              disabled={isTraining}
            >
              {isTraining ? "Training..." : "Train"}
            </button>

            <button
              onClick={handleSaveMachineClick}
              className="bg-yellow-500 text-white p-1 rounded hover:bg-blue-600 disabled:bg-gray-300 text-xs"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Machine"}
            </button>

            {/* Log Output */}
            <div className="mt-2">
              <label htmlFor="log-output" className="block text-xs">Training Logs:</label>
              <textarea
                id="log-output"
                value={logs}
                readOnly
                className="mt-1 w-full p-1 border rounded h-32 bg-gray-100 text-black text-xs"
                placeholder="Logs will be displayed here..."
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );


};

export default LeftPanel;
