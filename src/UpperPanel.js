import { Tabs, Tab } from '@mui/material';
import { useState, useEffect } from 'react';
//import { displayCorrelationMatrix, displayBoxplots, displayCandlechart } from './analysis';
import analysis from './analysis';


const UpperPanel = ({target, features, data, tradingPair}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [correlationMatrixDiv, setCorrelationMatrixDiv] = useState(null);
  const [boxplotsDiv, setBoxplotsDiv] = useState(null);
  const [candleDiv, setCandlechartDiv] = useState(null);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

    // Effect to fetch and update plots whenever features or data change
    useEffect(() => {
      async function fetchData() {
        if (features.length > 0) {
          console.log("Fetching plots to UpperPanel...");

          // Call plotting methods with updated data
          const corr = analysis.displayCorrelationMatrix(features);
          const box = analysis.displayBoxplots(features);
          const candlechart = analysis.displayCandlechart(data);

          // Update the state with the new HTML containing the figures
          setCandlechartDiv(candlechart);
          setCorrelationMatrixDiv(corr); // Store the correlation matrix div
          setBoxplotsDiv(box); // Store the boxplots div

          console.log('Correlation:', corr);
        }
      }

      // Only call fetchData when features or data change
      fetchData();
    }, [features, data]);  // Now it will re-run when `features` or `data` change

  return (
    <div className="bg-gray-700 p-4 shadow-lg rounded-lg flex flex-col">

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        textColor="inherit"
        TabIndicatorProps={{ style: { background: 'yellow' } }}
        className="mb-4"
      >
        <Tab label="Candlestick Data" />
        <Tab label="Data Analysis" />
      </Tabs>

      <div className="mt-4 overflow-auto" style={{ maxHeight: '400px' }}> {/* Scrollable container */}
        {activeTab === 0 && (
          <div>{candleDiv}</div>
        )}

        {activeTab === 1 && (
          <div className="bg-gray-800 p-4 rounded-lg overflow-y-auto" style={{ maxHeight: '400px' }}>
            {/* Display Data Quality content with a scroll bar */}
            <div>
              {/* Correlation Matrix */}
              <div className="my-4">
                <h3 className="text-xl text-yellow-400">Correlation Matrix</h3>
                <div>{correlationMatrixDiv}</div> {/* Inject the correlation matrix content */}
              </div>

              {/* Boxplots */}
              <div className="my-4">
                <h3 className="text-xl text-yellow-400">Boxplots</h3>
                <div>{boxplotsDiv}</div> {/* Inject the boxplots content */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpperPanel;
