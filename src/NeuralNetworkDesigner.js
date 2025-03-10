import React, { useState } from "react";
import layerimgtext from './assets/in_features_text_layer.png';  // Adjust path based on file location
import layerimg from './assets/in_layer.png'

const NeuralNetworkDesigner = ({ NN, deleteLayer, layers, updateLayer, updateSettings, addLayer, handleLayerChange }) => {

  // 🟢 Handle adding a new layer
  const handleAddLayer = () => {
    const newLayer = { neurons: 10, dropout: 0.5, activation: "relu" };
    addLayer(newLayer);  // Directly call parent's addLayer prop
  };

  // ❌ Handle deletion of a layer
const handleDeleteLayer = (index) => {
  deleteLayer(index);  // Call the deleteLayer function from props
};


  // ⚙️ Handle settings changes (learn rate, batch size, epochs)
  const handleSettingsChange = (key, value) => {
    updateSettings({ [key]: value });  // Use parent's updateSettings directly
  };

  return (
    <div
      style={{
        display: "flex", flexDirection: "column", gap: "8px", padding: "15px",
        backgroundColor: "#101827", borderRadius: "8px", width: "300px"
      }}
    >
      <h3 style={{ color: "#facc14", fontSize: "16px", marginBottom: "10px" }}>
        Neural Network Designer
      </h3>

      {/* Settings Inputs for learn rate, batch size, and epochs */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <label style={{ color: "white", fontSize: "12px", width: "70px" }}>Learn Rate</label>
          <input
            type="number" step="0.01"
            value={NN.learnRate}  // Access learnRate from NN
            onChange={(e) => handleSettingsChange("learnRate", e.target.value)}
            placeholder="0.01"
            style={{ padding: "4px", fontSize: "12px", borderRadius: "3px",
            border: "1px solid #444", backgroundColor: "#1f2937", color: "#fff", flex: 1 }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <label style={{ color: "white", fontSize: "12px", width: "70px" }}>Batch Size</label>
          <input
            type="number"
            value={NN.batchSize}  // Access batchSize from NN
            onChange={(e) => handleSettingsChange("batchSize", e.target.value)}
            placeholder="32"
            style={{ padding: "4px", fontSize: "12px", borderRadius: "3px",
            border: "1px solid #444", backgroundColor: "#1f2937", color: "#fff", flex: 1 }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <label style={{ color: "white", fontSize: "12px", width: "70px" }}>Epochs</label>
          <input
            type="number"
            value={NN.epochs}  // Access epochs from NN
            onChange={(e) => handleSettingsChange("epochs", e.target.value)}
            placeholder="100"
            style={{ padding: "4px", fontSize: "12px", borderRadius: "3px",
            border: "1px solid #444", backgroundColor: "#1f2937", color: "#fff", flex: 1 }}
          />
        </div>
      </div>

      {/* Input layer */}
      <div style={{
        display: "flex", alignItems: "center", padding: "6px",
        backgroundColor: "#1e1e1e", borderRadius: "5px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)" }} >
        <div style={{
          width: "200px", height: "20px", backgroundColor: "#3a3a3a",
          borderRadius: "3px", marginRight: "10px"}}>
          <img src={layerimgtext} alt="Custom"
            style={{ width: "80%", height: "60%" }} />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "5px" }}>
          <input type="number"
            placeholder="Lookback (in. neurons)"
            style={{ padding: "4px", fontSize: "12px", borderRadius: "3px",
            border: "1px solid #444", backgroundColor: "#333", color: "#fff" }} />
        </div>
      </div>

      {/* Layer inputs */}
      {layers.map((layer, index) => (
        <div key={index} style={{
          display: "flex", alignItems: "center", padding: "6px",
          backgroundColor: "#1e1e1e", borderRadius: "5px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)" }} >
          <div style={{
            width: "200px", height: "20px", backgroundColor: "#3a3a3a",
            borderRadius: "3px", marginRight: "10px"}}>
            <img src={layerimg} alt="Custom"
              style={{ width: "80%", height: "50%" }} />
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "5px" }}>
            <input
              type="number" value={layer.neurons}
              onChange={(e) => updateLayer(index, "neurons", e.target.value)}
              placeholder="Neurons"
              style={{ padding: "4px", fontSize: "12px", borderRadius: "3px",
              border: "1px solid #444", backgroundColor: "#333", color: "#fff" }} />
            <input
              type="number" step="0.1" value={layer.dropout}
              onChange={(e) => updateLayer(index, "dropout", e.target.value)}
              placeholder="Dropout"
              style={{ padding: "4px", fontSize: "12px", borderRadius: "3px",
              border: "1px solid #444", backgroundColor: "#333", color: "#fff" }} />
            <div style={{ display: "flex", alignItems: "center" }}>
              <select
                value={layer.activation}
                onChange={(e) => updateLayer(index, "activation", e.target.value)}
                style={{ padding: "4px", fontSize: "12px", borderRadius: "3px",
                border: "1px solid #444", backgroundColor: "#333", color: "#fff", flex: 1 }}>
                <option value="relu">ReLU</option>
                <option value="sigmoid">Sigmoid</option>
                <option value="tanh">None</option>
              </select>
              <span
                onClick={() => handleDeleteLayer(index)}
                style={{ marginLeft: "5px", cursor: "pointer", color: "#f55", fontSize: "16px",
                  padding: "2px 5px", borderRadius: "3px", backgroundColor: "#442222" }}>
                ❌
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* Output layer */}
      <div style={{
        display: "flex", alignItems: "center", padding: "6px",
        backgroundColor: "#1e1e1e", borderRadius: "5px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)" }} >
        <div style={{
          width: "200px", height: "20px", backgroundColor: "#3a3a3a",
          borderRadius: "3px", marginRight: "10px"}}>
          <img src={layerimgtext} alt="Custom"
            style={{ width: "80%", height: "60%" }} />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "5px" }}>
          <input type="number"
            placeholder="Lookforw (pred. average)"
            style={{ padding: "4px", fontSize: "12px", borderRadius: "3px",
            border: "1px solid #444", backgroundColor: "#333", color: "#fff" }} />
        </div>
      </div>

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
