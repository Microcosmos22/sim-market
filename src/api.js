// src/api.js
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://v2202501113287307394.goodsrv.de/api";

export async function getHistoricalData(startDateOrLastNcandles, tag, candleLength) {

      console.log(startDateOrLastNcandles);

      // Construct the query string for GET request
      const queryString = new URLSearchParams({
          start_date_or_lastNcandles: JSON.stringify(startDateOrLastNcandles),
          tradingPair: tag,
          candle_length: candleLength
      }).toString();

      // URL with query string
      const url = `${API_BASE_URL}/get_historical_data?${queryString}`;

      const response = await fetch(url, {method: "GET"});

      if (!response.ok) throw new Error("Failed to fetch historical data");

      return await response.json();

}

// Updated API request function to pass all layers and settings
export async function trainModel(NN, datasetStrings, max_total_return) {
    // Flatten the NN object into query parameters
    const queryString = new URLSearchParams({
        candle_length: NN.candle_length,
        epochs: NN.epochs,
        lookf: NN.lookf,
        lookb: NN.lookb,
        learn_rate: NN.learnRate,
        batch_size: NN.batchSize,
        max_total_return: max_total_return || 100,  // Provide a default if undefined
        layers: JSON.stringify(NN.layers),  // Serialize layers array as JSON string
        target_strings: datasetStrings.join(','),  // Join the dataset strings with commas
    }).toString();

    // Construct the URL
    const url = `http://localhost:5050/api/train_nnmodel?${queryString}`;

    // Send the request
    const response = await fetch(url, { method: "GET" });

    // Return the JSON response
    return await response.json();
}
