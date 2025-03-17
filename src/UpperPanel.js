import { Tabs, Tab } from '@mui/material';
import { useState, useEffect } from 'react';
import analysis from './analysis';  // Assuming analysis includes the necessary functions like displayCorrelationMatrix, etc.
import { PlotFeatureTimeseries } from './analysis'; // Importing PlotFeatureTimeseries directly


const UpperPanel = ({chosen_data}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [correlationMatrixDivs, setCorrelationMatrixDiv] = useState([]);
  const [avgCorrDiv, setAvgCorrDiv] = useState(null);
  const [boxplotsDiv, setBoxplotsDiv] = useState(null);
  const [candleDivs, setCandlechartDiv] = useState([]);
  const [featuresDivs, setFeaturesDiv] = useState([]);

  // Handle tab changes
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };


  useEffect(() => {
    async function fetchData() {
      // Only proceed if chosen_data is not empty
      if (chosen_data.length > 0) {
        

        // Check if each dataset has the expected structure
        const newCandleDivs = chosen_data.map((dataset, index) => {
          // Ensure dataset.data and dataset.time are defined before using them
          if (dataset && dataset.data && dataset.time) {
            return analysis.displayCandlechart(dataset.data, dataset.time, dataset.tradingPair);
          } else {
            console.warn(`Dataset at index ${index} is missing required properties (data or time)`);
            return null; // Return null if the dataset is invalid, to skip rendering this item
          }
        }).filter(div => div !== null); // Remove null values if any

        const newfeaturesDivs = chosen_data.map((dataset, index) => {
          // Ensure dataset.features and dataset.time are defined
          if (dataset && dataset.features && dataset.time) {
            return (<PlotFeatureTimeseries features={dataset.features} time={dataset.time} />);
          } else {
            console.warn(`Dataset at index ${index} is missing required properties (features or time)`);
            return null;
          }
        }).filter(div => div !== null); // Remove null values

        const newCorrDivs = chosen_data.map((dataset, index) => {
          // Ensure dataset.features is defined before calling correlation_matrix
          if (dataset && dataset.features) {
            const matrix = analysis.correlation_matrix(dataset.features);
            return analysis.displayCorrelationMatrix(matrix);
          } else {
            console.warn(`Dataset at index ${index} is missing required properties (features)`);
            return null;
          }
        }).filter(div => div !== null); // Remove null values

        // Update state with valid divs
        setCandlechartDiv(newCandleDivs);
        setFeaturesDiv(newfeaturesDivs);
        setCorrelationMatrixDiv(newCorrDivs);
        //setAvgCorrDiv(computeAverageMatrix(newCorrDivs));
      } else {
        console.warn("No chosen data available to fetch.");
      }
    }

    fetchData(); // Call the function to fetch the data
  }, [chosen_data]); // Re-run whenever chosen_data changes

  function computeAverageMatrix(correlationMatrixDivs) {
  const numMatrices = correlationMatrixDivs.length;
  const numRows = correlationMatrixDivs[0].length;
  const numCols = correlationMatrixDivs[0][0].length;

  // Create a 2D array initialized with zeros
  const sumMatrix = Array.from({ length: numRows }, () => Array(numCols).fill(0));

  // Sum all matrices
  correlationMatrixDivs.forEach(matrix => {
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        sumMatrix[i][j] += matrix[i][j];
      }
    }
  });

  // Compute the average by dividing by the number of matrices
  const averageMatrix = sumMatrix.map(row => row.map(value => value / numMatrices));

  return averageMatrix;
}


  return (
    <div className="bg-gray-900 p-4 shadow-lg rounded-lg flex flex-col">
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        textColor="inherit"
        TabIndicatorProps={{ style: { background: 'yellow' } }}
        className="mb-4"
      >
        <Tab label="Candlestick Plot" />
        <Tab label="Technical Plot" />
        <Tab label="Technical Histogram" />
        <Tab label="Data Analysis" />
      </Tabs>

      <div className="mt-4 overflow-auto" style={{ maxHeight: '400px' }}> {/* Scrollable container */}
        {activeTab === 0 && (

          <div>
          {candleDivs.length > 0 ? (candleDivs.map((candleDiv, index) => (
            <div key={index}> {candleDiv} </div>
          ))) : (<div>No candlestick divs were generated</div>)}
          </div>


        )}{activeTab === 1 && (

        <div>
        {featuresDivs.length > 0 ? (featuresDivs.map((featuresDiv, index) => (
          <div key={index}> {featuresDiv} </div>
        ))) : (<div>No features divs were generated</div>)}
        </div>

      )}{activeTab === 2 && (

      <div className="my-4">
        <h3 className="text-xl text-yellow-400">Boxplots</h3>
        <div>{boxplotsDiv}</div> {/* Inject the boxplots content */}
      </div>

    )}{activeTab === 3 && (
          <div className="#2D3748 p-4 rounded-lg overflow-y-auto" style={{ maxHeight: '300px', maxWidth: '600px' }}>
            {/* Display Data Quality content with a scroll bar */}
            <div>
              {/* Correlation Matrix */}
              <div>
              {candleDivs.length > 0 ? (correlationMatrixDivs.map((correlationMatrixDiv, index) => (
                <div key={index}> {correlationMatrixDiv} </div>
              ))) : (<div>No candlestick divs were generated</div>)}
              </div>


            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpperPanel;
