import Plotly from 'plotly.js-dist';

const plotCandlestickChart = (data) => {
  const trace = {
    x: data.dates,  // Array of dates (or timestamps)
    close: data.close,  // Array of close values
    high: data.high,    // Array of high values
    low: data.low,      // Array of low values
    open: data.open,    // Array of open values
    type: 'candlestick',
    name: 'Candlestick Chart',
    increasing: { line: { color: 'green' } },
    decreasing: { line: { color: 'red' } },
  };

  const layout = {
    title: 'Candlestick Chart',
    xaxis: {
      title: 'Date',
      rangeslider: { visible: false },
    },
    yaxis: {
      title: 'Price',
    },
  };

  const chartData = [trace];
  Plotly.newPlot('candlestick-chart', chartData, layout);
};

// Example usage
plotCandlestickChart({
  dates: ['2025-01-01', '2025-01-02', '2025-01-03'], // Array of date strings
  open: [50000, 51000, 52000],
  high: [51000, 51500, 52500],
  low: [49000, 50000, 51000],
  close: [50500, 51200, 52200],
});
