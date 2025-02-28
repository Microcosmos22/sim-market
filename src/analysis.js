import React from 'react';
import Plot from 'react-plotly.js'; // Assuming Plotly is installed
import Plotly from 'plotly.js-dist';
import { useState, useEffect } from 'react';

// Function to compute Pearson Correlation Matrix
export function correlation_matrix(features) {
  const n = features[0].length;
  let correlationMatrix = [];

  // Compute correlation between each pair of features
  for (let i = 0; i < n; i++) {
    let row = [];
    for (let j = 0; j < n; j++) {
      const corr = pearsonCorrelation(features[i], features[j]);
      row.push(corr);
    }
    correlationMatrix.push(row);
  }

  return correlationMatrix;
}

// Function to compute Pearson correlation between two arrays (features)
function pearsonCorrelation(x, y) {
  const meanX = x.reduce((acc, val) => acc + val, 0) / x.length;
  const meanY = y.reduce((acc, val) => acc + val, 0) / y.length;
  const numerator = x.reduce((acc, val, i) => acc + (val - meanX) * (y[i] - meanY), 0);
  const denominator = Math.sqrt(x.reduce((acc, val) => acc + Math.pow(val - meanX, 2), 0)) *
                      Math.sqrt(y.reduce((acc, val) => acc + Math.pow(val - meanY, 2), 0));
  return numerator / denominator;
}

// Function to create Boxplots (uses Plotly)
function displayBoxplots(features) {
  console.log("Compute Boxplots");

  const boxplotData = features.map((featureData, index) => ({
    y: featureData,
    type: 'box',
    name: `Feature ${index + 1}`,
    boxmean: 'sd', // Optionally include mean and standard deviation
    marker: {
      color: `hsl(${(index * 30) % 360}, 100%, 50%)` // Distinctive color for each box
    }
  }));

  const layout = {
    title: 'Boxplots of Features',
    xaxis: {
      title: 'Features',
      tickvals: Array.from({length: features.length}, (_, i) => i)
    },
    yaxis: {
      title: 'Value'
    }
  };

  return (
    <div className="chart-container" style={{ padding: '20px', backgroundColor: 'lightgray' }}>
      <h3 className="chart-title" style={{ color: 'black', textAlign: 'center' }}>Boxplots of Features</h3>
      <Plot data={boxplotData} layout={layout} />
    </div>
  );
}

// Function to display the correlation matrix as a table wrapped in a div
function displayCorrelationMatrix(matrix) {
  return (
    <div className="correlation-container" style={{ overflowY: 'scroll', height: '400px', backgroundColor: 'lightyellow', padding: '20px' }}>
      <h3 className="correlation-title" style={{ color: 'black', textAlign: 'center' }}>Correlation Matrix</h3>
      <table border="1" style={{ margin: '0 auto' }}>
        <thead>
          <tr><th></th>
            {matrix[0].map((_, index) => <th key={index}>Feature {index + 1}</th>)}
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>Feature {rowIndex + 1}</td>
              {row.map((val, colIndex) => (
                <td key={colIndex}>{val.toFixed(2)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Function to display Candlestick Chart
function displayCandlechart(data, time, tradingPair) {
  //const time = data.map(item => new Date(item[0])); // Convert timestamps to Date objects
  const open = data.map(item => item[1]);
  const high = data.map(item => item[2]);
  const low = data.map(item => item[3]);
  const close = data.map(item => item[4]);

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
    xaxis: {
      type: 'date',
      title: 'Time'
    },
    yaxis: {
      title: 'Price',
      autorange: true
    },
    plot_bgcolor: '#2D3748',
    paper_bgcolor: '#2D3748',
    font: { color: 'white' }
  };


  return (
    <div className="candlestick-container" style={{ padding: '20px', backgroundColor: 'bg-gray-800' }}>
      <h3 className="candlestick-title" style={{ color: 'white', textAlign: 'center' }}>{`${tradingPair} Candlestick Chart`}</h3>
      <Plot data={[candlestickTrace]} layout={layout} />
    </div>
  );
}
// Define your functional component correctly
export function PlotFeatureTimeseries({ features }) {
  // Create plot data without managing visibility manually
  const plotData = features[0].map((_, timeIndex) => ({
    x: features.map((featureData) => featureData[timeIndex][1]), // Extract time values (same for all features)
    y: features.map((featureData) => featureData[timeIndex][0]), // Extract feature values for each feature
    type: 'scatter',
    mode: 'lines',
    name: `Timestamp ${timeIndex + 1}`, // Set the name to be used in the legend
    // Plotly handles visibility via the 'legendonly' option
  }));

  console.log('features', features);

  // Plotly layout configuration
  const layout = {
    title: 'Time Series of 12 Features',
    xaxis: { title: 'Time', type: 'date' },
    yaxis: { title: 'Feature Value' },
    plot_bgcolor: '#f0f0f0',
    paper_bgcolor: '#f0f0f0',
    font: { color: 'black' },
    showlegend: true, // Enables the legend for toggling visibility
  };

  return (
    <div style={{ padding: '20px', backgroundColor: 'lightgray' }}>
      <h3 style={{ color: 'black', textAlign: 'center' }}>Time Series of Features</h3>

      {/* Plotly chart */}
      <Plot data={plotData} layout={layout} />
    </div>
  );
}

export default {
  displayCorrelationMatrix,
  displayBoxplots,
  displayCandlechart,
  PlotFeatureTimeseries
};
