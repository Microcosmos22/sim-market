// src/api.js
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function fetchMachines() {
    const url = `${API_BASE_URL}/machines`; // API endpoint
    try {
        const response = await fetch(url, { method: "GET" });

        if (!response.ok) {
            console.error("Failed to fetch machine data. Status:", response.status);
            throw new Error("Failed to fetch machine data");
        }

        const data = await response.json(); // Parse response

        return {
            machines: data.machine_files || [], // Ensure array format
            scalers: data.scaler_files || []   // Ensure array format
        };
    } catch (error) {
        console.error("Error fetching machine data:", error);
        return { machines: [], scalers: [] }; // Return empty arrays on error
    }
}

export async function simulate_machines(sim_N, machine_strs){

  console.log(" Sim machines: ", machine_strs);
  console.log(" Steps: ", sim_N);

  const params = new URLSearchParams({
      sim_N: sim_N,
      machine_strs: machine_strs,
  }).toString();

  const url = `${API_BASE_URL}/simulate_machines?${params}`;
  const response = await fetch(url, {method: "GET"});
  console.log("API Call ", url);
  return await response.json();
}


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
        candle_length: NN.candleLength,
        epochs: NN.epochs,
        lookf: NN.lookf,
        lookb: NN.lookb,
        learn_rate: NN.learnRate,
        batch_size: NN.batchSize,
        max_total_return: max_total_return || 100,  // Provide a default if undefined
        layers: JSON.stringify(NN.layers),  // Serialize layers array as JSON string
    });

    console.log("API sending candle length ", NN.candleLength);
    console.log("API sending candle length ", params.get('candle_length'));

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
