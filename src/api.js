// src/api.js
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://v2202501113287307394.goodsrv.de:5050";

const fetchMachines = async () => {

    const url = `${API_BASE_URL}/machines`;
    const response = await fetch(url, {method: "GET"});

    if (!response.ok) throw new Error("Failed to fetch machine names");

    const machineStrings = await response.json(); // Parse the JSON response
    console.log("Calling  machine names"); // You can use the machineStrings here
    return machineStrings; // Return the list of machine filenames

};

export async function getHistoricalData(startDateOrLastNcandles, tag, candleLength) {

      console.log(startDateOrLastNcandles);

      // Construct the query string for GET request
      const params = new URLSearchParams({
          start_date_or_lastNcandles: JSON.stringify(startDateOrLastNcandles),
          tradingPair: tag,
          candle_length: candleLength
      }).toString();

      // URL with query string
      const url = `${API_BASE_URL}/get_historical_data?${params}`;

      const response = await fetch(url, {method: "GET"});

      if (!response.ok) throw new Error("Failed to fetch historical data");

      return await response.json();

}

export async function trainModel(NN, datasetStrings, max_total_return) {
    // Construct the query parameters using URLSearchParams
    const params = new URLSearchParams({
        candle_length: NN.candle_length,
        epochs: NN.epochs,
        lookf: NN.lookf,
        lookb: NN.lookb,
        learn_rate: NN.learnRate,
        batch_size: NN.batchSize,
        max_total_return: max_total_return || 100,  // Provide a default if undefined
        layers: JSON.stringify(NN.layers),  // Serialize layers array as JSON string
    });

    // Append each dataset string as a separate `target_strings` parameter
    datasetStrings.forEach((datasetString) => {
        params.append('target_strings', datasetString);
    });

    // Construct the final URL
    const url = `${API_BASE_URL}/train_nnmodel?${params.toString()}`;

    // Send the request
    const response = await fetch(url, { method: "GET" });

    // Return the JSON response
    return await response.json();
}
