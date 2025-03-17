import React, { useState, useEffect, useReducer } from 'react';
import * as api from "./api"; // Import all API functions
import Tools from './Tools';

export default function TraderSimulation({ machines4sim, setMachines4sim }) {
  const [activeTab, setActiveTab] = useState("machines");
  const [filteredMachines, setFilteredMachines] = useState([]); // For display (str)
  const [selectedCandleLength, setSelectedCandleLength] = useState(""); // Selected candle length (string)
  const [selectedMachinesId, setselectedMachinesId] = useState([]); // To store selected machines
  const [selectedMachineStr, setSelectedMachineStr] = useState([]); // To store selected machines
  const commonCryptoPairs = ['BTC/USD','ETH/USD','BTC/ETH','BTC/USDT','ETH/USDT'];

  // Define a state variable to store the selected pair
  const [selectedPair, setSelectedPair] = useState('');

  const [simN, setSimN] = useState("");
  const [portfolios, setPortfolios] = useState([]);

  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  useEffect(() => {console.log(" Selected machines for simulation: ", selectedMachineStr)},[selectedMachineStr]);

  useEffect(() => {
    setFilteredMachines(machines4sim.machines);
  }, []); // Empty dependency array ensures this runs only on mount

  // FORCE RE-RENDER OF MACHINES LIST
  function forceRenderReducer(state) {
    return state + 1;   }
  const [_, dispatch] = useReducer(forceRenderReducer, 0);

  useEffect(() => {
    dispatch(); // Trigger the reducer to force a re-render
  }, [machines4sim]);
  const colors = Tools.generateColors(); // Generate the expanded color list

  // Handler function to update the selected pair
  const handleSelectChange = (event) => {
    const selectedPairTag = event.target.value;
    setSelectedPair(selectedPairTag);  // Update local state
    console.log('Selected Crypto Pair:', selectedPairTag);
    // You can also update a global variable or use context if needed
  };

  // Handle candle length selection
  const handleCandleLengthChange = (event) => {
    const selectedLen = event.target.value;
    setSelectedCandleLength(selectedLen); // Update the selected candle length

    // Initialize an array to hold the results
    const machineLen = machines4sim.machines.map(machine => {
      return Tools.findallsubstrings(machine, "candles", "2025", 0);  // Apply `findallsubstrings` to each string
    });

    if (selectedLen === ""){ // If none selected, show all machines4sim
      setFilteredMachines(machines4sim.machines);
      return;
    }else{
      const filteredMachinsa = machines4sim.machines.filter((machine, i) => machineLen[i] === selectedLen);
      setFilteredMachines(filteredMachinsa);
    }
    // Un-check all boxes
    setselectedMachinesId([]);
  };


  const handleCheckboxChange = (machineId, machine) => {

    setselectedMachinesId((prevSelected) => {
      let newselection;
      //console.log("Prev selected ", prevSelected);
      //console.log(" clicked ", machineId)

      if (prevSelected.includes(machineId)) {
        // If the machine is already selected, uncheck it (remove from list)
        newselection = prevSelected.filter((id) => id !== machineId);
      } else {
        // If the machine is not selected, check it (add to list)
        newselection = [...prevSelected, machineId];}

      console.log("Selected machine IDs for sim:", newselection);
      console.log("Filtered machines: ", filteredMachines);

      setSelectedMachineStr(filteredMachines.map((mstr, i) => {
        //console.log("machine: ", mstr);
        if (newselection.includes(i)) {
          return mstr;
        }
      }));


      return newselection;
    });
  };

  const handleSimulate = () => {
    console.log(" Simulate machines ", selectedMachineStr);
    setPortfolios(api.simulate_machines( simN, selectedPair, selectedMachineStr));

  }




  return (
    <div className="flex min-h-screen bg-black text-xs text-white">
      {/* Left Panel */}
      <div className="w-1/4 bg-gray-900 p-2 shadow-lg rounded-lg">
        <div className="mb-4">
          <div className="flex">
            <button
              onClick={() => setActiveTab("machines")}
              className={`flex-1 py-1 ${activeTab === "machines" ? "bg-gray-700" : "bg-gray-800"} text-white rounded-t`}
            >
              Machines
            </button>

            <button
              onClick={() => setActiveTab("strategy")}
              className={`flex-1 py-1 ${activeTab === "strategy" ? "bg-gray-700" : "bg-gray-800"} text-white rounded-t`}
            >
              Trader Strategy
            </button>
          </div>

          {activeTab === "machines" && (
            <div className="p-4">
              {/* Dropdown for Candle Lengths */}
              <div className="bg-gray-900 p-4 rounded-lg h-[150px] flex flex-col justify-between">
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">
                    Filter machines by candle length:
                  </label>

                  <div className="flex items-center">
                    <select
                      className="bg-gray-800 text-white p-1 rounded mb-4 flex-1"
                      value={selectedCandleLength}
                      onChange={handleCandleLengthChange}
                    >
                      <option value="">Show all</option>
                      <option value="1s">1sec</option>
                      <option value="15m">15min</option>
                      <option value="1h">1hour</option>
                      <option value="4h">4hour</option>
                    </select>

                    <span className="text-yellow-400 text-sm ml-2">Selected: {selectedCandleLength || "None"}</span>
                  </div>
                </div>

                <button onClick ={handleSimulate} className="bg-yellow-500 text-black font-bold py-2 px-4 rounded hover:bg-yellow-400">
                  Simulate Machines
                </button>
              </div>


              {/* Saved Machines List */}
              <div className="bg-gray-900 p-2 rounded text-xs max-h-[600px] overflow-x-auto overflow-y-auto">
              {filteredMachines && filteredMachines.length > 0 ? (


                  <div className="flex flex-col space-y-2">
                    {filteredMachines
                      .slice() // Create a copy to avoid mutating the original array
                      .sort() // Sort strings alphabetically
                      .map((machine, index) => {
                        if (!machine) return null; // Skip any undefined items

                        const machineColor = colors[index % colors.length];

                        return (
                          <div
                            key={index} // Use index as key for simplicity
                            className={`${machineColor}
                            } px-4 py-2 rounded flex items-center space-x-2 break-words`} // Apply color dynamically, ensure text wraps
                          >
                            {/* Checkbox for selecting/deselecting machine */}
                            <input
                              type="checkbox"
                              checked={selectedMachinesId.includes(index)}  // Check if machineId is in selectedMachines
                              onChange={() => handleCheckboxChange(index, machine)}  // Handle selection change
                              className="w-4 h-4"
                            />

                            {/* Machine name with wrapping for exactly 2 lines */}
                            <div className="break-words whitespace-normal">{machine}</div>
                          </div>
                        );})}
                  </div>
                  ) : (
                  <div className="text-gray-500">No saved machines found.</div>
                  )}
              </div>
          </div>
          )}

          {activeTab === "strategy" && (
            <div className="mt-2 space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs">Budget</label>
                <input
                  type="number"
                  placeholder="Budget"
                  className="bg-gray-800 border border-gray-600 p-1 rounded text-xs text-white w-24"
                />
              </div>
              <div className="flex justify-between items-center">
                <label className="text-xs">Stiffness</label>
                <input
                  type="number"
                  placeholder="Stiffness"
                  className="bg-gray-800 border border-gray-600 p-1 rounded text-xs text-white w-24"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Center Panel */}
      <div className="w-2/3 bg-gray-900 mx-2 p-2 shadow-lg rounded-lg">
        <h2 className="text-center text-lg mb-2">Trader Simulation</h2>
        <div className="grid grid-cols-3 gap-2 mb-4">
            {/* First Input - Ending Date */}
            <div>
              <label className="block text-xs mb-1">Ending Date</label>
              <input
                type="date"
                className="bg-gray-800 border border-gray-600 p-1 rounded text-xs text-white w-full"
                defaultValue={new Date().toISOString().split('T')[0]} // Set default date
              />
            </div>

            {/* Second Input - Candles Amount */}
            <div>
              <label className="block text-xs mb-1">Candles Amount</label>
              <input
                type="number"
                className="bg-gray-800 border border-gray-600 p-1 rounded text-xs text-white w-full"
                value={simN}
                onChange={(e) => setSimN(e.target.value)} // Update state when user types
              />
            </div>

            {/* Dropdown - Cryptocurrency Pair Selector */}
            <div>
              <label className="block text-xs mb-1">Select Crypto Pair</label>
              <select
                className="bg-gray-800 text-white p-1 rounded text-xs w-full"
                value={selectedPair}
                onChange={handleSelectChange}
              >
                <option value="">-- Choose a Pair --</option>
                <option value="BTC/USD">BTC/USD</option>
                <option value="ETH/USD">ETH/USD</option>
                <option value="BTC/ETH">BTC/ETH</option>
                <option value="BTC/USDT">BTC/USDT</option>
                <option value="ETH/USDT">ETH/USDT</option>
              </select>
            </div>
          </div>

        <button className="bg-gray-700 border border-gray-600 px-2 py-1 rounded text-xs mb-4">
          Select
        </button>
        <div className="bg-gray-800 p-2 rounded mb-4 text-xs text-white">
          Simulation result will appear here.
        </div>
        <button className="bg-yellow-500 p-2 rounded text-xs mb-4 text-gray-900">
          Simulate
        </button>
        <div className="bg-gray-800 p-2 rounded h-60 overflow-y-auto text-white">
          Plots area
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/6 bg-gray-900 p-2 shadow-lg rounded-lg">
        <div className="text-xs text-gray-400">Right Panel</div>
      </div>
    </div>
  );
}
