import { useState } from 'react';

export default function TraderSimulation() {
    const [activeTab, setActiveTab] = useState("strategy");

    return (
        <div className="flex min-h-screen bg-gray-800 text-xs text-white">
            {/* Left Panel */}
            <div className="w-1/6 bg-gray-900 p-2 shadow-lg rounded-lg">
                <div className="mb-4">
                    <div className="flex">
                        <button
                            onClick={() => setActiveTab("strategy")}
                            className={`flex-1 py-1 ${activeTab === "strategy" ? "bg-gray-700" : "bg-gray-800"} text-white rounded-t`}
                        >
                            Trader Strategy
                        </button>
                        <button
                            onClick={() => setActiveTab("machines")}
                            className={`flex-1 py-1 ${activeTab === "machines" ? "bg-gray-700" : "bg-gray-800"} text-white rounded-t`}
                        >
                            Machines
                        </button>
                    </div>

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
                {/* Placeholder for right panel content */}
                <div className="text-xs text-gray-400">
                    Right Panel
                </div>
            </div>
        </div>
    );
}
