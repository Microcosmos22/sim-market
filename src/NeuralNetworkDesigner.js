import React from "react";
import { Tabs, Tab } from '@mui/material';
import { useState, useEffect } from 'react';
import { FaTachometerAlt, FaDatabase, FaCogs, FaChartLine, FaRunning, FaBars, FaClipboardList, FaTimes } from 'react-icons/fa';


const NeuralNetworkDesigner = () => {
  const [settings, setSettings] = useState({
    learnRate: 0.001,
    batchSize: 32,
    epochs: 10
  });

  const [layers, setLayers] = useState([
    { neurons: 10, dropout: 0.5, activation: "relu" }
  ]);

  const handleAddLayer = () => {
    setLayers([
      ...layers,
      { neurons: 10, dropout: 0.5, activation: "relu" }
    ]);
  };

  const handleLayerChange = (index, key, value) => {
    const updatedLayers = layers.map((layer, i) =>
      i === index ? { ...layer, [key]: value } : layer
    );
    setLayers(updatedLayers);
  };

    const handleDeleteLayer = (index) => {
      const updatedLayers = layers.filter((_, i) => i !== index);
      setLayers(updatedLayers);
    };

    // Handler for learn rate, batch size, and epochs
    const handleSettingsChange = (key, value) => {
      setSettings(prev => ({ ...prev, [key]: value }));
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "15px", backgroundColor: "#2b2b2b", borderRadius: "8px", width: "300px" }}>
        <h3 style={{ color: "#fff", fontSize: "16px", marginBottom: "10px" }}>Design Your Neural Network</h3>

        {/* New input fields for learn rate, batch size, and epochs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <label style={{ color: "#bbb", fontSize: "12px", width: "70px" }}>Learn Rate</label>
            <input
              type="number"
              step="0.0001"
              value={settings.learnRate}
              onChange={(e) => handleSettingsChange("learnRate", e.target.value)}
              placeholder="0.001"
              style={{ padding: "4px", fontSize: "12px", borderRadius: "3px", border: "1px solid #444", backgroundColor: "#333", color: "#fff", flex: 1 }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <label style={{ color: "#bbb", fontSize: "12px", width: "70px" }}>Batch Size</label>
            <input
              type="number"
              value={settings.batchSize}
              onChange={(e) => handleSettingsChange("batchSize", e.target.value)}
              placeholder="32"
              style={{ padding: "4px", fontSize: "12px", borderRadius: "3px", border: "1px solid #444", backgroundColor: "#333", color: "#fff", flex: 1 }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <label style={{ color: "#bbb", fontSize: "12px", width: "70px" }}>Epochs</label>
            <input
              type="number"
              value={settings.epochs}
              onChange={(e) => handleSettingsChange("epochs", e.target.value)}
              placeholder="10"
              style={{ padding: "4px", fontSize: "12px", borderRadius: "3px", border: "1px solid #444", backgroundColor: "#333", color: "#fff", flex: 1 }}
            />
          </div>
        </div>


        {layers.map((layer, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "6px",
              backgroundColor: "#1e1e1e",
              borderRadius: "5px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)"
            }}
          >
            {/* Placeholder for future images */}
            <div style={{
              width: "30px",
              height: "30px",
              backgroundColor: "#3a3a3a",
              borderRadius: "3px",
              marginRight: "10px"
            }}>
              {/* Image placeholder */}
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "5px" }}>
              <input
                type="number"
                value={layer.neurons}
                onChange={(e) => handleLayerChange(index, "neurons", e.target.value)}
                placeholder="Neurons"
                style={{ padding: "4px", fontSize: "12px", borderRadius: "3px", border: "1px solid #444", backgroundColor: "#333", color: "#fff" }}
              />
              <input
                type="number"
                step="0.1"
                value={layer.dropout}
                onChange={(e) => handleLayerChange(index, "dropout", e.target.value)}
                placeholder="Dropout"
                style={{ padding: "4px", fontSize: "12px", borderRadius: "3px", border: "1px solid #444", backgroundColor: "#333", color: "#fff" }}
              />
              <div style={{ display: "flex", alignItems: "center" }}>
                <select
                  value={layer.activation}
                  onChange={(e) => handleLayerChange(index, "activation", e.target.value)}
                  style={{ padding: "4px", fontSize: "12px", borderRadius: "3px", border: "1px solid #444", backgroundColor: "#333", color: "#fff", flex: 1 }}
                >
                  <option value="relu">ReLU</option>
                  <option value="sigmoid">Sigmoid</option>
                  <option value="tanh">Tanh</option>
                  <option value="softmax">Softmax</option>
                </select>
                <span
                  onClick={() => handleDeleteLayer(index)}
                  style={{
                    marginLeft: "5px",
                    cursor: "pointer",
                    color: "#f55",
                    fontSize: "16px",
                    padding: "2px 5px",
                    borderRadius: "3px",
                    backgroundColor: "#442222"
                  }}
                >
                  ❌
                </span>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={handleAddLayer}
          style={{
            padding: "6px 10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "10px"
          }}
        >
          + Add Layer
        </button>
      </div>
    );
};

export default NeuralNetworkDesigner;
