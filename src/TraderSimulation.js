import React, { useState, useEffect } from 'react';
import * as api from "./api"; // Import all API functions

export default function TraderSimulation({machines4sim, setMachines4sim}) {
    const [activeTab, setActiveTab] = useState("strategy");
    const [filteredMachines, setFilteredMachines] = useState([]);  // Filtered list based on candle length
    const [selectedCandleLength, setSelectedCandleLength] = useState("");  // Selected candle length


    // Filter machines automatically if machines4sim changes
    useEffect(() => {
        if (machines4sim) {
            filterMachines(machines4sim.machines, selectedCandleLength);  // Filter based on candle length
        }
    }, [machines4sim, selectedCandleLength]);

    // Function to filter machines based on selected candle length
    const filterMachines = (machines, candleLength) => {
        if (candleLength) {
            const filtered = machines.filter(machine => machine.includes(candleLength));
            setFilteredMachines(filtered);  // Update the state with the filtered machines
        } else {
            setFilteredMachines(machines);  // Show all machines if no filter is selected
        }
    };

    // Handle candle length selection
    const handleCandleLengthChange = (event) => {
        const selectedLength = event.target.value;
        setSelectedCandleLength(selectedLength);  // Update the selected candle length
    };

    return (
        <div className="flex min-h-screen bg-black text-xs text-white">
            {/* Left Panel */}
            <div className="w-1/6 bg-gray-900 p-2 shadow-lg rounded-lg">
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
                            <label className="block mb-2 text-sm font-medium text-white">Filter machines by candle length:</label>
                            <select
                                className="bg-gray-800 text-white p-1 rounded mb-4"
                                value={selectedCandleLength}
                                onChange={handleCandleLengthChange}
                            >
                                <option value="">Show all</option>
                                <option value="1sec">1s</option>
                                <option value="15min">15m</option>
                                <option value="1hour">1h</option>
                                <option value="4hour">4h</option>
                            </select>

                            {/* Saved Machines List */}
                            <div className="mt-4">
                              <h3 className="text-xs font-bold mb-1">Saved Machines:</h3>
                              <div className="bg-gray-900 p-2 rounded text-xs max-h-32 overflow-y-auto">
                                {machines4sim?.machines?.length > 0 ? (
                                  <div className="flex flex-col space-y-2">
                                    {machines4sim.machines.map((machine, index) => (
                                      <div key={index} className="bg-gray-800 px-2 py-1 rounded">
                                        {machine}
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="text-gray-500">No saved machines found.</div>
                                )}
                              </div>
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
                <div className="grid grid-cols-2 gap-2 mb-4">
                    <div>
                        <label className="block text-xs mb-1">Ending Date</label>
                        <input
                            type="date"
                            className="bg-gray-800 border border-gray-600 p-1 rounded text-xs text-white w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-xs mb-1">Candles Amount</label>
                        <input
                            type="number"
                            className="bg-gray-800 border border-gray-600 p-1 rounded text-xs text-white w-full"
                        />
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
                <div className="text-xs text-gray-400">
                    Right Panel
                </div>
            </div>
        </div>
    );
}
