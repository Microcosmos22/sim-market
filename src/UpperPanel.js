import { Tabs, Tab } from '@mui/material';
import { useState, useEffect } from 'react';
import analysis from './analysis';  // Assuming analysis includes the necessary functions like displayCorrelationMatrix, etc.
import { PlotFeatureTimeseries } from './analysis'; // Importing PlotFeatureTimeseries directly


const UpperPanel = (chosen_data) => {
  const [activeTab, setActiveTab] = useState(0);
  const [correlationMatrixDiv, setCorrelationMatrixDiv] = useState(null);
  const [boxplotsDiv, setBoxplotsDiv] = useState(null);
  const [candleDivs, setCandlechartDiv] = useState([]);
  const [featuresDiv, setFeaturesDiv] = useState([]);

  // Handle tab changes
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Re-Generate plots whenever chosen_data changes
  useEffect(() => {
    async function fetchData() {
      if (chosen_data.length > 0) {
        console.log('Plotter fetched chosen data size:', chosen_data.length);

        const newCandleDivs = chosen_data.map((dataset, index) => {
        return analysis.displayCandlechart(dataset.data, dataset.time, dataset.tradingPair);
        });

        setCandlechartDiv(newCandleDivs);

        // Update the state with the new HTML containing the figures
        //setCandlechartDiv();
        //setCorrelationMatrixDiv(analysis.displayCorrelationMatrix(dataset.features)); // Store the correlation matrix div
        //setBoxplotsDiv(analysis.displayBoxplots(dataset.features)); // Store the boxplots div

        // Using PlotFeatureTimeseries as a proper React component
        //setFeaturesDiv(<PlotFeatureTimeseries features={features} time={time} />);
     }
    }

    // Only call fetchData when features or data change
    fetchData();
  }, [chosen_data]); // Now it will re-run when `features`, `data`, or `time` change

  return (
    <div className="bg-gray-700 p-4 shadow-lg rounded-lg flex flex-col">
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
          ))) : (<div>No plotting divs were generated</div>)}
          </div>


        )}{activeTab === 1 && (
          <div>
        <div>{featuresDiv}</div> {/* This renders PlotFeatureTimeseries */}
        </div>
      )}{activeTab === 2 && (

      <div className="my-4">
        <h3 className="text-xl text-yellow-400">Boxplots</h3>
        <div>{boxplotsDiv}</div> {/* Inject the boxplots content */}
      </div>

    )}{activeTab === 3 && (
          <div className="bg-gray-800 p-4 rounded-lg overflow-y-auto" style={{ maxHeight: '400px' }}>
            {/* Display Data Quality content with a scroll bar */}
            <div>
              {/* Correlation Matrix */}
              <div className="my-4">
                <h3 className="text-xl text-yellow-400">Correlation Matrix</h3>
                <div>{correlationMatrixDiv}</div> {/* Inject the correlation matrix content */}
              </div>


            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpperPanel;
