import React from 'react';
import Plot from 'react-plotly.js'; // Assuming Plotly is installed
import Plotly from 'plotly.js-dist';
import { useState, useEffect } from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, Cell } from 'recharts';


function correlation_matrix(features) {
  if (features.length > 0) {
    const n = features[0].length;
    let correlationMatrix = [];

    console.log("looping until n", n);

    // Compute correlation between each pair of features
    for (let i = 0; i < n; i++) {
      let row = [];
      for (let j = 0; j < n; j++) {
        const column_i = features.map(row => row[i]);
        const column_j = features.map(row => row[j]);
        const corr = pearsonCorrelation(column_i, column_j);
        row.push(corr);
      }
      correlationMatrix.push(row);
    }

    console.log("correlation matrix", correlationMatrix)
    return correlationMatrix;
  }}

// Function to compute Pearson correlation between two arrays (features)
function pearsonCorrelation(x, y) {
  const meanX = x.reduce((acc, val) => acc + val, 0) / x.length;
  const meanY = y.reduce((acc, val) => acc + val, 0) / y.length;
  const numerator = x.reduce((acc, val, i) => acc + (val - meanX) * (y[i] - meanY), 0);
  const denominator = Math.sqrt(x.reduce((acc, val) => acc + Math.pow(val - meanX, 2), 0)) *
                      Math.sqrt(y.reduce((acc, val) => acc + Math.pow(val - meanY, 2), 0));
  return numerator / denominator;
}

// Function to display the correlation matrix as a table wrapped in a div
function displayCorrelationMatrix(matrix) {
  const data = [];

  // Prepare data for heatmap
  matrix.forEach((row, rowIndex) => {
    row.forEach((val, colIndex) => {
      data.push({
        x: colIndex + 1,
        y: rowIndex + 1,
        value: val,
      });
    });
  });

  // Custom square marker
  const CustomSquare = (props) => {
    const { cx, cy, fill } = props;
    const size = 80;  // Adjust this for bigger or smaller squares
    return (
      <rect
        x={cx - size / 2} y={cy - size / 2} width={size} height={size} fill={fill} stroke="#eee"/>
    );
  };

  // Determine color based on correlation value
  const getColor = (value) => {
  
  // Define color stops for diverging colormap
  const negativeColor = [49, 130, 189];  // Blue for negative (-1)
  const neutralColor = [255, 255, 255];  // White for 0
  const positiveColor = [222, 45, 38];   // Red for positive (+1)

  let r, g, b;

  if (value < 0) {
    // Interpolate between negativeColor and neutralColor
    const ratio = (value + 1);  // Transform range [-1, 0] to [0, 1]
    r = Math.round(negativeColor[0] * (1 - ratio) + neutralColor[0] * ratio);
    g = Math.round(negativeColor[1] * (1 - ratio) + neutralColor[1] * ratio);
    b = Math.round(negativeColor[2] * (1 - ratio) + neutralColor[2] * ratio);
  } else {
    // Interpolate between neutralColor and positiveColor
    const ratio = value;  // Range [0, 1]
    r = Math.round(neutralColor[0] * (1 - ratio) + positiveColor[0] * ratio);
    g = Math.round(neutralColor[1] * (1 - ratio) + positiveColor[1] * ratio);
    b = Math.round(neutralColor[2] * (1 - ratio) + positiveColor[2] * ratio);
  }

  return `rgb(${r},${g},${b})`;
};


  return (
    <div className="correlation-container" style={{ padding: '20px', backgroundColor: '#2D3748' }}>
      <h3 className="correlation-title" style={{ color: 'yellow', textAlign: 'center' }}>Correlation Matrix Heatmap</h3>
      <ResponsiveContainer width="100%" height={500}>
        <ScatterChart>
          <XAxis type="number" dataKey="x" name="Feature" tickFormatter={(tick) => `F${tick}`} />
          <YAxis type="number" dataKey="y" name="Feature" tickFormatter={(tick) => `F${tick}`} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div style={{ backgroundColor: '#2D3748', padding: '5px', border: '1px solid black' }}>
                  <p>{`Feature ${payload[0].payload.y} vs Feature ${payload[0].payload.x}`}</p>
                  <p>{`Correlation: ${payload[0].payload.value.toFixed(2)}`}</p>
                </div>
              );
            }
            return null;
          }} />
          <Scatter data={data} shape={<CustomSquare />}>
            {data.map((point, index) => (
              <Cell key={`cell-${index}`} fill={getColor(point.value)} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

// Function to create Boxplots (uses Plotly)
function displayBoxplots(chosen_data) {
  console.log("Compute Boxplots from chosen_data:", chosen_data.length, chosen_data[0].length);
  const features = chosen_data[0].features;
  console.log("Chosen features:", chosen_data[0].features);
  console.log("Features:", features);
  console.log("Type of features:", typeof features);
  console.log("Is Array:", Array.isArray(features));
  //chosen_data.map((features, index) => ({

  console.log("Features:", features);
  console.log("First element of features:", features[0]);

  //features.map((featureData, index) => (console.log(featureData)));

  console.log("Features:", features);
  console.log("First element of features:", features[0]);

  const boxplotData = features.map((featureData, index) => ({
    y: featureData.map(valuePair => valuePair[0]),  // ✔️ Extract only the values, ignoring time if present
    type: 'box',
    name: `Feature ${index + 1}`,
    boxmean: 'sd',  // Optional mean and standard deviation
    marker: {
      color: `hsl(${(index * 30) % 360}, 100%, 50%)`  // Distinctive color for each box
    }
}));

  console.log("boxplot shape", boxplotData);



  const layout = {
    title: 'Boxplots of Features',
    xaxis: {
      title: 'Features',
      tickvals: Array.from({ length: features.length }, (_, i) => i + 1),  // ✔️ Starting from 1 for readability
      ticktext: features.map((_, i) => `Feature ${i + 1}`)  // ✔️ Labels like Feature 1, Feature 2, ...
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
export function PlotFeatureTimeseries({ features, time }) {
  // For ONE Dataset, it creates the div and plot for all features over time

  const featureNames = ["SMA20", "SMA50", "RSI", "Bb width", "Momentum", "Volume", "Stat K", "Stat D", "MACDdiff", "month", "week", "day"];

  // Loop through features
  const plotData = features.map((_, featureIndex) => {
    return {
        x: Array.from({ length: features.length }, (_, timeIndex) => timeIndex), // Running time index as x-axis
        y: Array.from({ length: features.length }, (_, timeIndex) => features[timeIndex][featureIndex]), // Actual values at each timestep
        type: 'scatter',
        mode: 'lines',
        name: featureNames[featureIndex] || `Feature ${featureIndex + 1}`, // Use manual names or default
        line: { shape: 'linear' },
            };
        });


  // Layout configuration for Plotly
  const layout = {
    title: 'Time Series of 12 Features',
    xaxis: {
      title: 'Timestep',
      showgrid: true,
      zeroline: false,
    },
    yaxis: {
      title: 'Feature Value',
    },
    plot_bgcolor: '#2D3748',
    paper_bgcolor: '#2D3748',
    font: { color: 'white' },
    showlegend: true, // Ensures the legend is visible
  };

  return (
    <div style={{ padding: '20px', backgroundColor: 'bg-gray-800' }}>
      <h3 style={{ color: 'white', textAlign: 'center' }}>Time Series of Features</h3>

      {/* Plotly chart */}
      <Plot data={plotData} layout={layout} />
    </div>
  );
}

export default {
  correlation_matrix,
  displayCorrelationMatrix,
  displayBoxplots,
  displayCandlechart,
  PlotFeatureTimeseries
};
